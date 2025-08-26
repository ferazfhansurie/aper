# Hierarchical Data Structure Implementation

## Overview

This implementation replicates the **Microsoft Access system's hierarchical data structure** and **dual-view reporting capability** for investment data. The system allows you to view the same investment information from two different perspectives, just like your Access database.

## Key Concept: Dual-View Reporting

### View 1: Deal Summary (Every Deal is 1 row)
- **Purpose**: High-level overview of investment rounds
- **Structure**: One row per investment deal/round
- **Data**: Company, funding round, total deal size, all investors aggregated
- **Use Case**: Executive summaries, deal pipeline overviews

### View 2: Investment Position (Every Investment Position is 1 row)
- **Purpose**: Detailed breakdown of individual investor stakes
- **Structure**: One row per investor's position within a deal
- **Data**: Individual investor, their portion, equity stake, lead status
- **Use Case**: Detailed analysis, investor tracking, position management

## Data Model Hierarchy

```
Company (Investee)
├── Deal (Investment Round)
│   ├── Investment Position 1 (Investor A's stake)
│   ├── Investment Position 2 (Investor B's stake)
│   └── Investment Position 3 (Investor C's stake)
└── Deal (Next Investment Round)
    ├── Investment Position 1 (Investor X's stake)
    └── Investment Position 2 (Investor Y's stake)
```

## ABC Corp Example

**Scenario**: "Capital A, Capital B and Capital C invested US$50M in ABC Corp's Series A Round"

### Deal Level View
- **Company**: ABC Corp
- **Round**: Series A
- **Total Deal Size**: $50M
- **All Investors**: Capital A, Capital B, Capital C

### Position Level View
- **Position 1**: Capital A - $30M (Lead Investor, 15% equity)
- **Position 2**: Capital B - $10M (5% equity)
- **Position 3**: Capital C - $10M (5% equity)

## File Structure

### Core Models (`src/data/models.js`)
- `CompanyModel`: Company/Investee information (Form 1a)
- `DealModel`: Investment round details
- `InvestmentPositionModel`: Individual investor stakes
- `InvestorModel`: Investor information (Form 4a)
- `FundModel`: Fund details
- `ValuationModel`: Company valuations

### Service Layer (`src/data/hierarchicalService.js`)
- `HierarchicalDataService`: Core business logic
- Relationship management between entities
- Dual-view query methods
- CSV export functionality

### Sample Data (`src/data/sampleData.js`)
- Sample companies, investors, deals, and positions
- Auto-population of the service
- Demonstration functions

### Demo Component (`src/components/HierarchicalDemo.jsx`)
- Interactive demonstration of the dual-view system
- Real-time data switching between views
- Export capabilities for both views

## Key Methods

### Data Management
```javascript
// Add entities and automatically link them
addCompany(companyData)
addDeal(dealData, companyId)
addInvestmentPosition(positionData, dealId, investorId)
addInvestor(investorData)
```

### Query Methods
```javascript
// Get Deal Summary View (one row per deal)
getDealSummaryView(filters)

// Get Investment Position View (one row per position)
getInvestmentPositionView(filters)

// Get hierarchical relationships
getCompanyHierarchy(companyId)
getInvestorHierarchy(investorId)
```

### Export Methods
```javascript
// Export to CSV
exportDealSummaryToCSV(filters)
exportInvestmentPositionToCSV(filters)
```

## Usage Examples

### 1. View All Deals (Deal Summary)
```javascript
const deals = hierarchicalService.getDealSummaryView();
// Returns: [{ dealId, company, fundingRound, totalDealSize, allInvestors, ... }]
```

### 2. View All Positions (Investment Position)
```javascript
const positions = hierarchicalService.getInvestmentPositionView();
// Returns: [{ investor, company, totalDealSize, positionDealSize, ... }]
```

### 3. Get Company's Complete Investment History
```javascript
const companyHierarchy = hierarchicalService.getCompanyHierarchy(companyId);
// Returns: company with all deals and their positions
```

### 4. Get Investor's Complete Portfolio
```javascript
const investorHierarchy = hierarchicalService.getInvestorHierarchy(investorId);
// Returns: investor with all positions across different companies
```

## Data Types (As Per Access System)

### Type A: Text/Date/Numeric Info
- Free-form input fields
- Company names, addresses, descriptions
- Deal sizes, dates, percentages

### Type B: Classification/Reference
- Dropdown options from lookup tables
- Industry classifications, investor types
- Geographic regions, funding stages

## Form Associations (As Per Access System)

- **Form 1a**: Company update form (Company + Deal + Investment Position)
- **Form 4a**: Investor Name update form

## Benefits of This Implementation

### 1. **Replicates Access System Logic**
- Same data relationships and hierarchies
- Identical query perspectives
- Familiar data structure

### 2. **Modern Web Interface**
- Responsive React components
- Real-time data switching
- Interactive filtering and search

### 3. **Scalable Architecture**
- Service-oriented design
- Easy to extend with new entities
- Clean separation of concerns

### 4. **Export Capabilities**
- CSV export for both views
- Maintains data relationships
- Ready for external analysis

## Next Steps

### 1. **Integrate with Real Data**
- Connect to your existing CSV exports
- Implement database persistence
- Add real-time data updates

### 2. **Enhance Components**
- Build the Deals component using this structure
- Implement Companies component with deal history
- Create Investors component with position details

### 3. **Advanced Features**
- Add filtering and search capabilities
- Implement pagination for large datasets
- Add data validation and business rules

## Testing the System

1. **Navigate to**: `/hierarchical-demo`
2. **View the dual tabs**: Deal Summary vs Investment Position
3. **Check the console**: Detailed logging of data flow
4. **Export data**: Test CSV export functionality
5. **Explore relationships**: See how data connects across entities

## Console Demonstration

When you load the demo component, the system automatically logs:
- Data population process
- Dual-view reporting examples
- Hierarchical query demonstrations
- Relationship mapping details

Open your browser's developer console (F12) to see this in action.

---

This implementation provides the foundation for your transition from Microsoft Access to a modern web application while maintaining the exact same data relationships and reporting capabilities that your users are familiar with.
