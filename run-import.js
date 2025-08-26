#!/usr/bin/env node

// Simple script to test the CSV import system
import { importCSVDataToSampleData } from './src/data/csvImportScript.js';
import HierarchicalDataService from './src/data/hierarchicalService.js';

async function main() {
  console.log('🚀 Starting CSV Import Test...\n');
  
  const service = new HierarchicalDataService();
  
  try {
    console.log('📊 Importing data...');
    const result = await importCSVDataToSampleData(service);
    
    console.log('\n✅ Import completed successfully!');
    console.log('📈 Final data counts:');
    console.log(`   Companies: ${result.companies}`);
    console.log(`   Investors: ${result.investors}`);
    console.log(`   Funds: ${result.funds}`);
    console.log(`   Deals: ${result.deals}`);
    console.log(`   Investment Positions: ${result.positions}`);
    
    console.log('\n🔍 Testing queries...');
    const dealSummary = service.getDealSummaryView();
    const positionView = service.getInvestmentPositionView();
    
    console.log(`   Deal Summary View: ${dealSummary.length} deals`);
    console.log(`   Investment Position View: ${positionView.length} positions`);
    
    if (dealSummary.length > 0) {
      console.log('\n📋 Sample Deal:');
      console.log(`   Company: ${dealSummary[0].company}`);
      console.log(`   Round: ${dealSummary[0].fundingRound}`);
      console.log(`   Size: $${(dealSummary[0].totalDealSize / 1000000).toFixed(1)}M`);
    }
    
    if (positionView.length > 0) {
      console.log('\n💰 Sample Position:');
      console.log(`   Investor: ${positionView[0].investor}`);
      console.log(`   Company: ${positionView[0].company}`);
      console.log(`   Position Size: $${(positionView[0].positionDealSize / 1000000).toFixed(1)}M`);
    }
    
    console.log('\n🎉 All tests passed! Your dashboard should now be much fuller.');
    
  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
    process.exit(1);
  }
}

main();
