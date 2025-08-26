// Sample Data Demonstrating Hierarchical Structure
// Now uses CSV import for maximum data coverage

import HierarchicalDataService from './hierarchicalService.js';
import { importCSVDataToSampleData } from './csvImportScript.js';

// Create the hierarchical service instance
export const hierarchicalService = new HierarchicalDataService();

// Populate the hierarchical service with CSV data
export async function populateSampleData(service) {
  try {
    console.log('Populating sample data using CSV import...');
    const result = await importCSVDataToSampleData(service);
    console.log('Sample data populated successfully!', result);
    return result;
  } catch (error) {
    console.error('Error populating sample data:', error);
    throw error;
  }
}

// Demonstrate the dual-view reporting capability
export function demonstrateDualViewReporting(service) {
  console.log('=== DUAL-VIEW REPORTING DEMONSTRATION ===');
  
  // Deal Summary View (one row per deal)
  const dealSummary = service.getDealSummaryView();
  console.log('Deal Summary View (one row per deal):', dealSummary.length, 'deals');
  console.log('Sample deal summary:', dealSummary[0]);
  
  // Investment Position View (one row per investor's stake)
  const positionView = service.getInvestmentPositionView();
  console.log('Investment Position View (one row per position):', positionView.length, 'positions');
  console.log('Sample position:', positionView[0]);
  
  console.log('=== END DEMONSTRATION ===');
}

// Export the service (will be populated when first accessed)
export default hierarchicalService;
