# CSV Import System for Enhanced Dashboard Data

This system replaces the old sample data with real data from CSV exports to make the dashboard look as full as possible.

## What Changed

1. **Removed old sample data**: The original `sampleData.js` contained only 15 companies, 15 investors, 15 funds, 15 deals, and 25 investment positions.

2. **Added CSV import functionality**: The new system can import data from the `exports/` folder CSV files.

3. **Enhanced synthetic data fallback**: If CSV import fails, the system generates comprehensive synthetic data (500+ companies, 300+ investors, 200+ funds, 1000+ deals, 2000+ positions).

## How It Works

### 1. CSV Import (Primary Method)
The system attempts to import real data from:
- `exports/company.csv` (725 companies)
- `exports/Investor_profile.csv` (4603 investor profiles)
- `exports/Fund.csv` (1626 funds)

### 2. Synthetic Data Generation (Fallback)
If CSV import fails, the system generates:
- **500 companies** across 20 industries and 20 countries
- **300 investors** across 20 categories and 20 countries
- **200 funds** across 20 focus areas and 20 countries
- **1000 deals** with realistic funding rounds and stages
- **2000 investment positions** linking investors to deals

### 3. Dashboard Integration
The Dashboard component automatically uses the new import system when it loads.

## Files Modified

- `src/data/sampleData.js` - Now calls CSV import instead of using static data
- `src/data/csvImportScript.js` - New CSV import and synthetic data generation
- `src/data/hierarchicalService.js` - Added `clearAllData()` method
- `src/components/Dashboard.jsx` - Updated to use new import system

## Testing

### Browser Test
Open `test-import.html` in a browser to test the import functionality.

### Console Test
Run `node test-import.js` to test the import in Node.js.

## Expected Results

With the new system, your dashboard should show:
- **Companies**: 500+ (instead of 15)
- **Investors**: 300+ (instead of 15)
- **Funds**: 200+ (instead of 15)
- **Deals**: 1000+ (instead of 15)
- **Investment Positions**: 2000+ (instead of 25)

This will make all dashboard components (APER Overview, Investment Metrics, Geographic Distribution, Sector Breakdown, Recent Activity, Fund Performance) much more populated and realistic.

## Troubleshooting

If you see errors in the console:
1. Check that the `exports/` folder contains the CSV files
2. The system will automatically fall back to synthetic data if CSV import fails
3. All dashboard functionality will work with either real or synthetic data

## Performance

The synthetic data generation is optimized for performance and should load quickly even with thousands of records. The hierarchical service efficiently manages relationships between entities.
