// Test script for CSV import functionality
import { importCSVDataToSampleData } from './src/data/csvImportScript.js';
import HierarchicalDataService from './src/data/hierarchicalService.js';

async function testImport() {
  console.log('Testing CSV import functionality...');
  
  const service = new HierarchicalDataService();
  
  try {
    const result = await importCSVDataToSampleData(service);
    
    console.log('Import completed successfully!');
    console.log('Final data counts:', result);
    
    // Test some queries
    console.log('\nTesting queries...');
    console.log('Deal summary view:', service.getDealSummaryView().length, 'deals');
    console.log('Investment position view:', service.getInvestmentPositionView().length, 'positions');
    
  } catch (error) {
    console.error('Import failed:', error);
  }
}

// Run the test
testImport();
