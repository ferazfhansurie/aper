#!/usr/bin/env node

import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function consolidateTables() {
  const client = neon(process.env.DATABASE_URL);
  
  try {
    console.log('🔧 Consolidating duplicate tables with different cases...');
    
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
    
    // Find duplicate tables (same name, different case)
    const tableNames = tablesResult.map(row => row.tablename);
    const duplicates = [];
    
    for (let i = 0; i < tableNames.length; i++) {
      for (let j = i + 1; j < tableNames.length; j++) {
        const name1 = tableNames[i];
        const name2 = tableNames[j];
        
        // Check if names are the same when normalized to lowercase
        if (name1.toLowerCase() === name2.toLowerCase() && name1 !== name2) {
          // Determine which is uppercase and which is lowercase
          const isUpper1 = name1 === name1.toUpperCase() || (name1[0] === name1[0].toUpperCase() && name1 !== name1.toLowerCase());
          const isUpper2 = name2 === name2.toUpperCase() || (name2[0] === name2[0].toUpperCase() && name2 !== name2.toLowerCase());
          
          if (isUpper1 && !isUpper2) {
            duplicates.push({ uppercase: name1, lowercase: name2 });
          } else if (isUpper2 && !isUpper1) {
            duplicates.push({ uppercase: name2, lowercase: name1 });
          } else {
            // If both are same case, pick the first one as "uppercase" for consistency
            duplicates.push({ uppercase: name1, lowercase: name2 });
          }
        }
      }
    }
    
    if (duplicates.length === 0) {
      console.log('✅ No duplicate tables found');
      return;
    }
    
    console.log(`🔍 Found ${duplicates.length} duplicate table pairs:`);
    duplicates.forEach(dup => console.log(`  - ${dup.uppercase} ↔ ${dup.lowercase}`));
    
    // Process each duplicate pair
    for (const dup of duplicates) {
      console.log(`\n🔄 Processing: ${dup.uppercase} → ${dup.lowercase}`);
      
      try {
        // Check if both tables exist
        const tableExists = await client(`
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = $1
          ) as exists
        `, [dup.uppercase]);
        
        if (!tableExists[0].exists) {
          console.log(`  ⚠️  Table ${dup.uppercase} doesn't exist, skipping`);
          continue;
        }
        
        // Get row counts for both tables
        const upperCount = await client(`SELECT COUNT(*) as count FROM "${dup.uppercase}"`);
        const lowerCount = await client(`SELECT COUNT(*) as count FROM "${dup.lowercase}"`);
        
        console.log(`  📊 ${dup.uppercase}: ${upperCount[0].count} rows`);
        console.log(`  📊 ${dup.lowercase}: ${lowerCount[0].count} rows`);
        
        // If uppercase table has data and lowercase doesn't, transfer the data
        if (upperCount[0].count > 0 && lowerCount[0].count === 0) {
          console.log(`  📤 Transferring data from ${dup.uppercase} to ${dup.lowercase}...`);
          
          // Get column names from both tables
          const upperColumns = await client(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = $1 
            ORDER BY ordinal_position
          `, [dup.uppercase]);
          
          const lowerColumns = await client(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = $1 
            ORDER BY ordinal_position
          `, [dup.lowercase]);
          
          // Find common columns
          const upperColNames = upperColumns.map(col => col.column_name);
          const lowerColNames = lowerColumns.map(col => col.column_name);
          const commonColumns = upperColNames.filter(col => lowerColNames.includes(col));
          
          if (commonColumns.length > 0) {
            console.log(`  🔗 Common columns: ${commonColumns.join(', ')}`);
            
            // Transfer data using common columns
            const columnList = commonColumns.map(col => `"${col}"`).join(', ');
            
            const transferSQL = `
              INSERT INTO "${dup.lowercase}" (${columnList})
              SELECT ${columnList} FROM "${dup.uppercase}"
            `;
            
            await client(transferSQL);
            
            // Verify transfer
            const newLowerCount = await client(`SELECT COUNT(*) as count FROM "${dup.lowercase}"`);
            console.log(`  ✅ Data transferred. ${dup.lowercase} now has ${newLowerCount[0].count} rows`);
          } else {
            console.log(`  ⚠️  No common columns found between tables`);
          }
        }
        
        // Drop the uppercase table
        console.log(`  🗑️  Dropping table ${dup.uppercase}...`);
        await client(`DROP TABLE IF EXISTS "${dup.uppercase}" CASCADE`);
        console.log(`  ✅ Dropped table ${dup.uppercase}`);
        
      } catch (error) {
        console.error(`  ❌ Error processing ${dup.uppercase}: ${error.message}`);
      }
    }
    
    console.log('\n✅ Table consolidation completed!');
    
    // Show final table count
    const finalTables = await client(`
      SELECT COUNT(*) as count 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `);
    
    console.log(`📊 Final table count: ${finalTables[0].count}`);
    
  } catch (error) {
    console.error('❌ Error consolidating tables:', error.message);
  }
}

consolidateTables();
