#!/usr/bin/env node

import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function fixTableNames() {
  const client = neon(process.env.DATABASE_URL);
  
  try {
    console.log('🔧 Fixing table names to lowercase...');
    
    // Get all table names
    const tablesResult = await client(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename
    `);
    
    if (tablesResult.length === 0) {
      console.log('✅ No tables found');
      return;
    }
    
    console.log(`📋 Found ${tablesResult.length} tables`);
    
    // Find tables that start with capital letters and should be renamed to lowercase
    const tablesToRename = [];
    
    for (const row of tablesResult) {
      const tableName = row.tablename;
      
      // Check if table name starts with capital letter and should be lowercase
      if (tableName[0] === tableName[0].toUpperCase() && 
          tableName !== tableName.toLowerCase() &&
          !tableName.includes(' ') && // Skip tables with spaces
          !tableName.startsWith('(') && // Skip tables starting with parentheses
          !tableName.startsWith('2nd') && // Skip tables starting with numbers
          !tableName.startsWith('fund -') && // Skip fund tables with dashes
          !tableName.startsWith('group -') && // Skip group tables with dashes
          !tableName.startsWith('institution') && // Skip institution tables
          !tableName.startsWith('investor') && // Skip investor tables
          !tableName.startsWith('keyword') && // Skip keyword tables
          !tableName.startsWith('link_') && // Skip link tables
          !tableName.startsWith('listed') && // Skip listed tables
          !tableName.startsWith('old ') && // Skip old tables
          !tableName.startsWith('paste') && // Skip paste tables
          !tableName.startsWith('rejected') && // Skip rejected tables
          !tableName.startsWith('stock_') && // Skip stock tables
          !tableName.startsWith('temp') && // Skip temp tables
          !tableName.startsWith('valuation') && // Skip valuation tables
          !tableName.includes('auxilliary') && // Skip auxilliary tables
          !tableName.includes('company') && // Skip company tables
          !tableName.includes('contact') && // Skip contact tables
          !tableName.includes('data log') && // Skip data log tables
          !tableName.includes('docu category') && // Skip docu category tables
          !tableName.includes('event_checkinfo') && // Skip event tables
          !tableName.includes('financier') && // Skip financier tables
          !tableName.includes('firm in docu') && // Skip firm in docu tables
          !tableName.includes('Sheet1') && // Skip Sheet1
          !tableName.includes('Supportdoculink')) { // Skip Supportdoculink
        
        const lowercaseName = tableName.toLowerCase();
        tablesToRename.push({
          oldName: tableName,
          newName: lowercaseName
        });
      }
    }
    
    if (tablesToRename.length === 0) {
      console.log('✅ No tables need renaming');
      return;
    }
    
    console.log(`🔍 Found ${tablesToRename.length} tables to rename:`);
    tablesToRename.forEach(table => console.log(`  - ${table.oldName} → ${table.newName}`));
    
    // Rename each table
    for (const table of tablesToRename) {
      console.log(`\n🔄 Renaming: ${table.oldName} → ${table.newName}`);
      
      try {
        // Check if the new name already exists
        const newNameExists = await client(`
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = $1
          ) as exists
        `, [table.newName]);
        
        if (newNameExists[0].exists) {
          console.log(`  ⚠️  Table ${table.newName} already exists, skipping rename`);
          continue;
        }
        
        // Rename the table
        await client(`ALTER TABLE "${table.oldName}" RENAME TO "${table.newName}"`);
        console.log(`  ✅ Successfully renamed ${table.oldName} to ${table.newName}`);
        
      } catch (error) {
        console.error(`  ❌ Error renaming ${table.oldName}: ${error.message}`);
      }
    }
    
    console.log('\n✅ Table renaming completed!');
    
    // Show final table count
    const finalTables = await client(`
      SELECT COUNT(*) as count 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `);
    
    console.log(`📊 Final table count: ${finalTables[0].count}`);
    
  } catch (error) {
    console.error('❌ Error fixing table names:', error.message);
  }
}

fixTableNames();
