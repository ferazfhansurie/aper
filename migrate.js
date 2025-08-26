#!/usr/bin/env node

import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { config } from './migration.config.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class DatabaseMigrator {
  constructor() {
    this.client = null;
    this.migrationStats = {
      tablesProcessed: 0,
      tablesSkipped: 0,
      totalRowsMigrated: 0,
      errors: []
    };
  }

  async connect() {
    try {
      console.log('🔌 Connecting to Neon PostgreSQL...');
      this.client = neon(config.neonConnectionString);
      console.log('✅ Connected to Neon PostgreSQL successfully');
    } catch (error) {
      console.error('❌ Failed to connect to Neon PostgreSQL:', error.message);
      throw error;
    }
  }

  async disconnect() {
    // Neon serverless client doesn't need explicit disconnection
    console.log('🔌 Disconnected from Neon PostgreSQL');
  }

  detectAvailableTables() {
    try {
      const csvFiles = fs.readdirSync(config.csvExportPath)
        .filter(file => file.endsWith('.csv'))
        .map(file => file.replace('.csv', ''));
      
      console.log(`📁 Found ${csvFiles.length} CSV files in exports directory`);
      
      // Remove duplicates by keeping only one version of each table name
      const uniqueTables = [];
      const seenNames = new Set();
      
      for (const tableName of csvFiles) {
        // Normalize table name to lowercase for comparison
        const normalizedName = tableName.toLowerCase();
        
        if (!seenNames.has(normalizedName)) {
          seenNames.add(normalizedName);
          uniqueTables.push(tableName);
        } else {
          console.log(`⚠️  Skipping duplicate table: ${tableName}`);
        }
      }
      
      console.log(`🔍 Found ${uniqueTables.length} unique tables after deduplication`);
      return uniqueTables;
    } catch (error) {
      console.error('❌ Error detecting available tables:', error.message);
      return [];
    }
  }

  generateCreateTableSQL(tableName, columns, sampleRow) {
    const columnDefinitions = columns.map(col => {
      const value = sampleRow[col];
      let dataType = 'TEXT'; // Default to TEXT for better compatibility
      
      // Conservative type inference - only use specific types for clear cases
      if (value !== null && value !== undefined && value !== '') {
        const trimmedValue = String(value).trim();
        
        // Only use INTEGER for clear numeric values without decimals
        if (/^\d+$/.test(trimmedValue) && trimmedValue.length < 10) {
          dataType = 'INTEGER';
        }
        // Only use DECIMAL for clear decimal numbers
        else if (/^\d+\.\d+$/.test(trimmedValue)) {
          dataType = 'DECIMAL(15,2)';
        }
        // Only use BOOLEAN for clear boolean values
        else if (trimmedValue.toLowerCase() === 'true' || trimmedValue.toLowerCase() === 'false') {
          dataType = 'BOOLEAN';
        }
        // Only use DATE for clear date formats
        else if (/^\d{4}-\d{2}-\d{2}/.test(trimmedValue) || /^\d{2}\/\d{2}\/\d{2}/.test(trimmedValue)) {
          dataType = 'DATE';
        }
        // Default to TEXT for everything else
        else {
          dataType = 'TEXT';
        }
      }
      
      return `"${col}" ${dataType}`;
    });

    return `CREATE TABLE IF NOT EXISTS "${tableName}" (
      ${columnDefinitions.join(',\n      ')},
      migrated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
  }

  async createSchema() {
    try {
      console.log('📋 Creating database schema...');
      
      // Read the schema file
      const schemaPath = path.join(config.csvExportPath, 'schema.sql');
      if (!fs.existsSync(schemaPath)) {
        console.log('⚠️  No schema.sql file found, will create tables from CSV headers');
        return;
      }
      
      const schemaContent = fs.readFileSync(schemaPath, 'utf8');
      
      // Split into individual statements and clean them up
      const statements = schemaContent
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))
        .map(stmt => {
          // Clean up problematic statements
          return stmt
            .replace(/multiple primary keys/g, 'PRIMARY KEY')
            .replace(/type "unknown_\w+"/g, 'TEXT')
            .replace(/unterminated quoted string.*$/, '')
            .replace(/syntax error.*$/, '');
        });
      
      console.log(`📝 Processing ${statements.length} schema statements...`);
      
      for (const statement of statements) {
        try {
          if (statement.trim().length > 0) {
            await this.client(statement);
          }
        } catch (error) {
          // Ignore "table already exists" errors
          if (!error.message.includes('already exists')) {
            console.warn(`⚠️  Schema statement warning: ${error.message}`);
          }
        }
      }
      
      console.log('✅ Schema creation completed');
    } catch (error) {
      console.error('❌ Error creating schema:', error.message);
    }
  }

  async migrateTable(tableName) {
    try {
      console.log(`📊 Migrating table: ${tableName}`);
      
      const csvPath = path.join(config.csvExportPath, `${tableName}.csv`);
      if (!fs.existsSync(csvPath)) {
        console.log(`⚠️  CSV file not found: ${csvPath}`);
        return;
      }
      
      // Read CSV and parse data
      const rows = [];
      const columns = [];
      
      return new Promise((resolve, reject) => {
        fs.createReadStream(csvPath)
          .pipe(csv())
          .on('headers', (headers) => {
            columns.push(...headers);
          })
          .on('data', (row) => {
            rows.push(row);
          })
          .on('end', async () => {
            try {
              if (rows.length === 0) {
                console.log(`ℹ️  No data found in ${tableName}.csv`);
                resolve();
                return;
              }
              
              // Limit to 1k rows as requested
              const limitedRows = rows.slice(0, 1000);
              console.log(`📊 Processing ${limitedRows.length} rows (limited from ${rows.length})`);
              
              // Create table if it doesn't exist
              const createTableSQL = this.generateCreateTableSQL(tableName, columns, limitedRows[0]);
              try {
                await this.client(createTableSQL);
              } catch (error) {
                if (!error.message.includes('already exists')) {
                  throw error;
                }
              }
              
              // Insert data in batches
              const batchSize = 100;
              let totalInserted = 0;
              
              for (let i = 0; i < limitedRows.length; i += batchSize) {
                const batch = limitedRows.slice(i, i + batchSize);
                const placeholders = batch.map((_, batchIndex) => 
                  `(${columns.map((_, colIndex) => `$${batchIndex * columns.length + colIndex + 1}`).join(', ')})`
                ).join(', ');
                
                try {
                  const values = batch.flatMap(row => 
                    columns.map(col => {
                      const value = row[col];
                      if (value === '' || value === undefined || value === null) {
                        return null;
                      }
                      return String(value);
                    })
                  );
                  
                  const insertSQL = `INSERT INTO "${tableName}" (${columns.map(col => `"${col}"`).join(', ')}) VALUES ${placeholders}`;
                  
                  await this.client(insertSQL, values);
                  totalInserted += batch.length;
                } catch (error) {
                  console.error(`❌ Failed to insert batch in ${tableName}: ${error.message}`);
                  // Continue with next batch instead of failing completely
                }
              }
              
              console.log(`✅ Migrated ${totalInserted} rows from ${tableName}`);
              this.migrationStats.totalRowsMigrated += totalInserted;
              this.migrationStats.tablesProcessed++;
              
              resolve();
            } catch (error) {
              reject(error);
            }
          })
          .on('error', reject);
      });
      
    } catch (error) {
      console.error(`❌ Error migrating table ${tableName}:`, error.message);
      this.migrationStats.errors.push({ table: tableName, error: error.message });
      this.migrationStats.tablesSkipped++;
    }
  }

  async migrate() {
    try {
      await this.connect();
      
      // Create schema first
      await this.createSchema();
      
      // Auto-detect tables to migrate from CSV files
      const availableTables = this.detectAvailableTables();
      console.log(`🔍 Found ${availableTables.length} tables to migrate:`, availableTables);
      
      // Migrate each detected table
      for (const tableName of availableTables) {
        await this.migrateTable(tableName);
      }
      
      // Print migration summary
      console.log('\n📊 Migration Summary:');
      console.log(`✅ Tables processed: ${this.migrationStats.tablesProcessed}`);
      console.log(`⚠️  Tables skipped: ${this.migrationStats.tablesSkipped}`);
      console.log(`📈 Total rows migrated: ${this.migrationStats.totalRowsMigrated}`);
      
      if (this.migrationStats.errors.length > 0) {
        console.log('\n❌ Errors encountered:');
        this.migrationStats.errors.forEach(error => {
          console.log(`  - ${error.table}: ${error.error}`);
        });
      }
      
    } catch (error) {
      console.error('❌ Migration failed:', error.message);
    } finally {
      await this.disconnect();
    }
  }
}

// Run migration
const migrator = new DatabaseMigrator();
migrator.migrate();
