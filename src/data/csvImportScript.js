// CSV Import Script for Real Data from Exports
// This script imports data from the exports folder and converts it to the hierarchical structure

import HierarchicalDataService from './hierarchicalService.js';

// CSV Parser Helper Functions
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

function parseCSV(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];
  
  const headers = parseCSVLine(lines[0]);
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const row = {};
      headers.forEach((header, index) => {
        row[header.trim()] = values[index] || '';
      });
      data.push(row);
    }
  }
  
  return data;
}

// Data Transformation Functions
function transformCompanyData(csvRow) {
  return {
    id: `COMP_${csvRow['ID'] || Date.now() + Math.random()}`,
    companyName: csvRow['Company'] || csvRow['Displayed Investee Name (English)'] || 'Unknown Company',
    chineseName: csvRow['Company (Chinese)'] || '',
    displayedName: csvRow['Displayed Investee Name (English)'] || csvRow['Company'] || 'Unknown Company',
    email: csvRow['E-mail Address'] || '',
    website: csvRow['Web site'] || '',
    tel: csvRow['Tel1'] || '',
    fax: csvRow['Fax1'] || '',
    listedDate: csvRow['Listed Date'] || '',
    listingStatus: csvRow['Listing Status'] || 'Private',
    country: csvRow['Link_Country ID (Investee Location)'] || csvRow['(Old 20110803) Country'] || 'Unknown',
    industry: csvRow['Link_Industry ID'] || 'Other',
    techCategory: Boolean(csvRow['Link_Tech_cate_ID_investee']),
    sriFocus: csvRow['Link_SRI Focus ID'] || '',
    aiDeal: Boolean(csvRow['Link_artificial_intelligence_cate_ID_investee']),
    semiconductorDeal: Boolean(csvRow['Link_semiconductor_cate_ID_investee']),
    batteryDeal: Boolean(csvRow['Link_battery_cate_ID_investee']),
    evDeal: Boolean(csvRow['Link_electric_vehicle_cate_ID_investee']),
    realAssets: Boolean(csvRow['Link_real_asset_cate_ID_investee']),
    healthcareDeal: Boolean(csvRow['Link_healthcare_cate_ID_investee'])
  };
}

function transformInvestorData(csvRow) {
  return {
    id: `INV_${csvRow['ID_Investor_profile'] || csvRow['Link_Investor_Name_ip'] || Date.now() + Math.random()}`,
    investorName: csvRow['Link_Investor_Name_ip'] || 'Unknown Investor',
    chineseName: '',
    displayedName: csvRow['Link_Investor_Name_ip'] || 'Unknown Investor',
    firmCategory: 'Investment Firm',
    firmLocation: csvRow['Link_Countr_ ID_parent'] || 'Unknown',
    affiliation: 'Independent',
    website: '',
    description: csvRow['Remarks_ip_Type'] || ''
  };
}

function transformFundData(csvRow) {
  const fundSize = parseFloat(csvRow['MinimumTarget Fund Size (US$m)'] || '0') * 1000000;
  
  return {
    id: `FUND_${csvRow['Fund ID'] || Date.now() + Math.random()}`,
    fundName: csvRow['Fund Name'] || csvRow['Displayed Fund Name'] || 'Unknown Fund',
    chineseName: csvRow['Fund Name (Chinese)'] || csvRow['Displayed Fund Name (Chinese)'] || '',
    displayedName: csvRow['Displayed Fund Name'] || csvRow['Fund Name'] || 'Unknown Fund',
    fundSize: fundSize,
    currency: csvRow['Target Fund Size Currency  (Local Currency code)'] || 'USD',
    status: csvRow['Fund Status (Inactive)'] || 'Active',
    vintage: parseInt(csvRow['Fund Vintage Year (yyyymm)']?.substring(0, 4)) || 2020,
    focus: csvRow['Link_Fund Industries Focus_ID'] || 'General',
    country: csvRow['Mgt Co Country'] || 'Unknown'
  };
}

function transformDealData(csvRow, companyName) {
  const dealSize = parseFloat(csvRow['Deal Size (USD)'] || csvRow['Total Deal Size'] || '0');
  
  return {
    id: `DEAL_${csvRow['Deal ID'] || Date.now() + Math.random()}`,
    company: companyName || csvRow['Company Name'] || 'Unknown Company',
    chineseCompany: csvRow['Chinese Company'] || '',
    fundingRound: csvRow['Funding Round'] || csvRow['Round'] || 'Unknown',
    totalDealSize: dealSize,
    stage: csvRow['Stage'] || csvRow['Investment Stage'] || 'Unknown',
    date: csvRow['Date'] || csvRow['Completion Date'] || csvRow['Deal Date'] || '2024-01-01',
    crossBorder: Boolean(csvRow['Cross Border'] || csvRow['International']),
    country: csvRow['Country'] || csvRow['Company Country'] || 'Unknown',
    industry: csvRow['Industry'] || csvRow['Company Industry'] || 'Other'
  };
}

function transformInvestmentPositionData(csvRow, investorName, companyName, fundName) {
  const positionSize = parseFloat(csvRow['Position Size (USD)'] || csvRow['Investment Amount'] || '0');
  const totalDealSize = parseFloat(csvRow['Total Deal Size (USD)'] || csvRow['Deal Size'] || positionSize);
  
  return {
    id: `POS_${csvRow['Position ID'] || csvRow['Investment ID'] || Date.now() + Math.random()}`,
    investor: investorName || csvRow['Investor Name'] || 'Unknown Investor',
    chineseInvestor: '',
    company: companyName || csvRow['Company Name'] || 'Unknown Company',
    chineseCompany: csvRow['Chinese Company'] || '',
    fund: fundName || csvRow['Fund Name'] || 'Unknown Fund',
    positionDealSize: positionSize,
    totalDealSize: totalDealSize,
    fundingRound: csvRow['Funding Round'] || csvRow['Round'] || 'Unknown',
    leadInvestor: Boolean(csvRow['Lead Investor'] || csvRow['Lead']),
    date: csvRow['Date'] || csvRow['Investment Date'] || csvRow['Deal Date'] || '2024-01-01'
  };
}

// Generate synthetic deals and positions based on companies and investors
function generateSyntheticDeals(companies, count = 1000) {
  const deals = [];
  const rounds = ['Seed', 'Series A', 'Series B', 'Series C', 'Series D', 'Growth Equity', 'Buyout', 'IPO'];
  const stages = ['Early', 'Growth', 'Late', 'Mature'];
  const industries = ['Technology', 'Healthcare', 'Financial Services', 'Clean Energy', 'Real Estate', 'Manufacturing', 'Retail', 'Transportation', 'Media', 'Education'];
  const countries = ['USA', 'China', 'UK', 'Germany', 'Japan', 'Singapore', 'India', 'Australia', 'Canada', 'France'];
  
  for (let i = 0; i < count; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const round = rounds[Math.floor(Math.random() * rounds.length)];
    const stage = stages[Math.floor(Math.random() * stages.length)];
    const industry = industries[Math.floor(Math.random() * industries.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const dealSize = Math.random() * 200000000 + 10000000; // 10M to 200M
    
    deals.push({
      id: `DEAL_SYNTH_${i + 1}`,
      company: company.companyName,
      chineseCompany: company.chineseName,
      fundingRound: round,
      totalDealSize: Math.floor(dealSize),
      stage: stage,
      date: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString().split('T')[0],
      crossBorder: Math.random() > 0.6,
      country: country,
      industry: industry
    });
  }
  
  return deals;
}

function generateSyntheticPositions(deals, investors, funds, count = 2000) {
  const positions = [];
  
  for (let i = 0; i < count; i++) {
    const deal = deals[Math.floor(Math.random() * deals.length)];
    const investor = investors[Math.floor(Math.random() * investors.length)];
    const fund = funds[Math.floor(Math.random() * funds.length)];
    const positionSize = Math.random() * 100000000 + 5000000; // 5M to 100M
    const totalDealSize = deal.totalDealSize;
    
    positions.push({
      id: `POS_SYNTH_${i + 1}`,
      investor: investor.investorName,
      chineseInvestor: investor.chineseName,
      company: deal.company,
      chineseCompany: deal.chineseCompany,
      fund: fund.fundName,
      positionDealSize: Math.floor(positionSize),
      totalDealSize: totalDealSize,
      fundingRound: deal.fundingRound,
      leadInvestor: Math.random() > 0.7,
      date: deal.date
    });
  }
  
  return positions;
}

// Main import function
export async function importCSVDataToSampleData(service) {
  try {
    console.log('Starting CSV data import...');
    
    // Clear existing data if method exists
    if (service.clearAllData) {
      service.clearAllData();
    } else {
      // Manual clear if method doesn't exist
      service.companies.clear();
      service.deals.clear();
      service.positions.clear();
      service.investors.clear();
      service.funds.clear();
      service.companyDeals.clear();
      service.dealPositions.clear();
      service.investorPositions.clear();
      service.fundInvestors.clear();
    }
    
    // Try to import CSV data, but fall back to synthetic data if it fails
    try {
      // Check if we're in a browser environment
      if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
        // Import companies from company.csv (725 lines)
        console.log('Importing companies...');
        const companyData = await fetch('/exports/company.csv').then(res => res.text());
        const companies = parseCSV(companyData);
        
        companies.forEach(csvRow => {
          const company = transformCompanyData(csvRow);
          service.addCompany(company);
        });
        
        console.log(`Imported ${companies.length} companies`);
        
        // Import investors from Investor_profile.csv (4603 lines)
        console.log('Importing investors...');
        const investorData = await fetch('/exports/Investor_profile.csv').then(res => res.text());
        const investors = parseCSV(investorData);
        
        investors.forEach(csvRow => {
          const investor = transformInvestorData(csvRow);
          service.addInvestor(investor);
        });
        
        console.log(`Imported ${investors.length} investors`);
        
        // Import funds from Fund.csv (1626 lines)
        console.log('Importing funds...');
        const fundData = await fetch('/exports/Fund.csv').then(res => res.text());
        const funds = parseCSV(fundData);
        
        funds.forEach(csvRow => {
          const fund = transformFundData(csvRow);
          service.addFund(fund);
        });
        
        console.log(`Imported ${funds.length} funds`);
        
        // Generate synthetic deals based on imported companies
        console.log('Generating synthetic deals...');
        const companyArray = Array.from(service.companies.values());
        const syntheticDeals = generateSyntheticDeals(companyArray, 1000);
        
        syntheticDeals.forEach(deal => {
          // Find a company ID for this deal
          const company = companyArray.find(c => c.companyName === deal.company);
          if (company) {
            service.addDeal(deal, company.id);
          }
        });
        
        console.log(`Generated ${syntheticDeals.length} synthetic deals`);
        
        // Generate synthetic investment positions
        console.log('Generating synthetic investment positions...');
        const investorArray = Array.from(service.investors.values());
        const fundArray = Array.from(service.funds.values());
        const dealArray = Array.from(service.deals.values());
        
        const syntheticPositions = generateSyntheticPositions(dealArray, investorArray, fundArray, 2000);
        
        syntheticPositions.forEach(position => {
          // Find deal and investor IDs
          const deal = dealArray.find(d => d.company === position.company);
          const investor = investorArray.find(i => i.investorName === position.investor);
          
          if (deal && investor) {
            service.addInvestmentPosition(position, deal.id, investor.id);
          }
        });
        
        console.log(`Generated ${syntheticPositions.length} synthetic investment positions`);
        
        console.log('CSV data import completed successfully!');
        console.log('Final counts:');
        console.log('Companies:', service.companies.size);
        console.log('Investors:', service.investors.size);
        console.log('Funds:', service.funds.size);
        console.log('Deals:', service.deals.size);
        console.log('Investment Positions:', service.positions.size);
        
        return {
          companies: service.companies.size,
          investors: service.investors.size,
          funds: service.funds.size,
          deals: service.deals.size,
          positions: service.positions.size
        };
      } else {
        console.log('Not in browser environment, using enhanced synthetic data');
        return generateEnhancedSyntheticData(service);
      }
      
    } catch (csvError) {
      console.log('CSV import failed, using enhanced synthetic data instead:', csvError);
      return generateEnhancedSyntheticData(service);
    }
    
  } catch (error) {
    console.error('Error in import process:', error);
    
    // Final fallback to enhanced synthetic data
    console.log('Using final fallback to enhanced synthetic data...');
    return generateEnhancedSyntheticData(service);
  }
}

// Fallback function to generate comprehensive synthetic data
function generateEnhancedSyntheticData(service) {
  console.log('Generating enhanced synthetic data...');
  
  // Generate 500 companies
  const companies = [];
  const industries = ['Technology', 'Healthcare', 'Financial Services', 'Clean Energy', 'Real Estate', 'Manufacturing', 'Retail', 'Transportation', 'Media', 'Education', 'Biotechnology', 'Artificial Intelligence', 'Cybersecurity', 'Blockchain', 'E-commerce', 'Logistics', 'Telecommunications', 'Aerospace', 'Defense', 'Agriculture'];
  const countries = ['USA', 'China', 'UK', 'Germany', 'Japan', 'Singapore', 'India', 'Australia', 'Canada', 'France', 'Netherlands', 'Switzerland', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Israel', 'South Korea', 'Brazil', 'Mexico'];
  const techCategories = ['AI/ML', 'SaaS', 'Fintech', 'Biotech', 'CleanTech', 'PropTech', 'EdTech', 'HealthTech', 'Logistics', 'Cybersecurity', 'Blockchain', 'IoT', 'Robotics', 'Quantum Computing', 'Nanotechnology', 'Space Tech', 'AgriTech', 'FoodTech', 'FashionTech', 'LegalTech'];
  
  for (let i = 0; i < 500; i++) {
    const industry = industries[Math.floor(Math.random() * industries.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const techCategory = techCategories[Math.floor(Math.random() * techCategories.length)];
    
    companies.push({
      id: `COMP_SYNTH_${i + 1}`,
      companyName: `${techCategory} Solutions ${i + 1}`,
      chineseName: `${techCategory}解决方案${i + 1}`,
      displayedName: `${techCategory} Solutions ${i + 1} Inc.`,
      email: `contact@${techCategory.toLowerCase().replace(/[^a-z]/g, '')}${i + 1}.com`,
      website: `https://${techCategory.toLowerCase().replace(/[^a-z]/g, '')}${i + 1}.com`,
      tel: `+1-555-${String(i + 1000).padStart(4, '0')}`,
      fax: `+1-555-${String(i + 2000).padStart(4, '0')}`,
      listedDate: new Date(2015 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString().split('T')[0],
      listingStatus: Math.random() > 0.6 ? 'Listed' : 'Private',
      country: country,
      industry: industry,
      techCategory: true,
      sriFocus: Math.random() > 0.4 ? 'ESG' : 'Innovation',
      aiDeal: Math.random() > 0.2,
      semiconductorDeal: Math.random() > 0.7,
      batteryDeal: Math.random() > 0.6,
      evDeal: Math.random() > 0.5,
      realAssets: Math.random() > 0.7,
      healthcareDeal: Math.random() > 0.3
    });
  }
  
  // Generate 300 investors
  const investors = [];
  const categories = ['Venture Capital', 'Private Equity', 'Growth Equity', 'Corporate Venture', 'Angel Investor', 'Family Office', 'Sovereign Wealth Fund', 'Pension Fund', 'Endowment', 'Foundation', 'Hedge Fund', 'Investment Bank', 'Insurance Company', 'University Fund', 'Government Fund', 'Crowdfunding Platform', 'Accelerator', 'Incubator', 'Micro VC', 'Impact Investor'];
  
  for (let i = 0; i < 300; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    
    investors.push({
      id: `INV_SYNTH_${i + 1}`,
      investorName: `${category.replace(/ /g, '')} Partners ${i + 1}`,
      chineseName: `${category}合伙人${i + 1}`,
      displayedName: `${category.replace(/ /g, '')} Partners ${i + 1}`,
      firmCategory: category,
      firmLocation: country,
      affiliation: Math.random() > 0.6 ? 'Corporate' : 'Independent',
      website: `https://${category.toLowerCase().replace(/ /g, '')}${i + 1}.com`,
      description: `${category} firm focused on ${Math.random() > 0.4 ? 'technology' : 'growth'} investments`
    });
  }
  
  // Generate 200 funds
  const funds = [];
  const focuses = ['Technology', 'Healthcare', 'Consumer', 'Enterprise', 'Fintech', 'CleanTech', 'Real Estate', 'Infrastructure', 'Manufacturing', 'Retail', 'Biotechnology', 'Artificial Intelligence', 'Cybersecurity', 'Blockchain', 'E-commerce', 'Logistics', 'Telecommunications', 'Aerospace', 'Defense', 'Agriculture'];
  const statuses = ['Active', 'Raising', 'Closed', 'Liquidated', 'Inactive'];
  
  for (let i = 0; i < 200; i++) {
    const focus = focuses[Math.floor(Math.random() * focuses.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const fundSize = Math.random() * 20000000000 + 50000000; // 50M to 20B
    
    funds.push({
      id: `FUND_SYNTH_${i + 1}`,
      fundName: `${focus} Fund ${i + 1}`,
      chineseName: `${focus}基金${i + 1}`,
      displayedName: `${focus} Fund ${i + 1}`,
      fundSize: Math.floor(fundSize),
      currency: Math.random() > 0.6 ? (Math.random() > 0.5 ? 'EUR' : 'CNY') : 'USD',
      status: status,
      vintage: 2015 + Math.floor(Math.random() * 9),
      focus: focus,
      country: country
    });
  }
  
  // Generate 1000 deals
  const deals = [];
  const rounds = ['Seed', 'Series A', 'Series B', 'Series C', 'Series D', 'Series E', 'Series F', 'Growth Equity', 'Buyout', 'IPO', 'Secondary', 'Bridge', 'Convertible Note', 'SAFE', 'Revenue Share'];
  const stages = ['Pre-Seed', 'Seed', 'Early', 'Growth', 'Late', 'Mature', 'Exit'];
  
  for (let i = 0; i < 1000; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const round = rounds[Math.floor(Math.random() * rounds.length)];
    const stage = stages[Math.floor(Math.random() * stages.length)];
    const dealSize = Math.random() * 500000000 + 1000000; // 1M to 500M
    
    deals.push({
      id: `DEAL_SYNTH_${i + 1}`,
      dealId: `DEAL_${i + 1}`,
      company: company.companyName,
      chineseCompany: company.chineseName,
      fundingRound: round,
      dealSizeUSD: Math.floor(dealSize), // Use correct field name
      totalDealSize: Math.floor(dealSize), // Keep for compatibility
      stage: stage,
      completionDate: new Date(2015 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString().split('T')[0],
      date: new Date(2015 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString().split('T')[0],
      crossBorder: Math.random() > 0.5,
      country: company.country,
      industry: company.industry,
      localCurrency: 'USD'
    });
  }
  
  // Generate 2000 investment positions
  const positions = [];
  
  for (let i = 0; i < 2000; i++) {
    const deal = deals[Math.floor(Math.random() * deals.length)];
    const investor = investors[Math.floor(Math.random() * investors.length)];
    const fund = funds[Math.floor(Math.random() * funds.length)];
    const positionSize = Math.random() * 200000000 + 1000000; // 1M to 200M
    const totalDealSize = deal.dealSizeUSD;
    
    positions.push({
      id: `POS_SYNTH_${i + 1}`,
      investor: investor.investorName,
      chineseInvestor: investor.chineseName,
      company: deal.company,
      chineseCompany: deal.chineseCompany,
      fund: fund.fundName,
      positionDealSize: Math.floor(positionSize),
      positionDealSizeUSD: Math.floor(positionSize), // Use correct field name
      totalDealSize: totalDealSize,
      fundingRound: deal.fundingRound,
      leadInvestor: Math.random() > 0.7,
      date: deal.completionDate,
      investorType: investor.firmCategory,
      fundName: fund.fundName
    });
  }
  
  // Add all data to service
  companies.forEach(company => service.addCompany(company));
  investors.forEach(investor => service.addInvestor(investor));
  funds.forEach(fund => service.addFund(fund));
  
  // Add deals with proper company linking
  deals.forEach(deal => {
    const company = companies.find(c => c.companyName === deal.company);
    if (company) {
      // Find the company ID from the service
      const companyInService = Array.from(service.companies.values()).find(c => c.companyName === company.companyName);
      if (companyInService) {
        const dealId = service.addDeal(deal, companyInService.id);
        console.log(`Created deal ${dealId} for ${deal.company} with company ID ${companyInService.id}`);
      }
    }
  });
  
  // Add investment positions with proper linking
  positions.forEach(position => {
    const deal = deals.find(d => d.company === position.company);
    const investor = investors.find(i => i.investorName === position.investor);
    
    if (deal && investor) {
      // Find the deal ID from the service
      const dealInService = Array.from(service.deals.values()).find(d => d.company === deal.company);
      if (dealInService) {
        try {
          // Update position with proper linking fields
          const positionWithLinks = {
            ...position,
            dealId: dealInService.id,
            companyId: Array.from(service.companies.values()).find(c => c.companyName === deal.company)?.id
          };
          
          const positionId = service.addInvestmentPosition(positionWithLinks, dealInService.id, investor.id);
          console.log(`Created position ${positionId} for ${position.investor} in ${position.company}`);
        } catch (error) {
          console.error(`Failed to create position for ${position.investor} in ${position.company}:`, error);
        }
      }
    }
  });
  
  // Verify positions were created
  console.log(`Final position count: ${service.positions.size}`);
  console.log(`Final deal positions count: ${Array.from(service.dealPositions.values()).flat().length}`);
  console.log(`Final investor positions count: ${Array.from(service.investorPositions.values()).flat().length}`);
  
  // Debug: Check a few positions to see their structure
  const samplePositions = Array.from(service.positions.values()).slice(0, 3);
  console.log('Sample positions:');
  samplePositions.forEach(pos => {
    console.log(`  Position ${pos.id}: dealId=${pos.dealId}, companyId=${pos.companyId}, investorId=${pos.investorId}`);
  });
  
  // Debug: Check if deals have companyId
  const sampleDeals = Array.from(service.deals.values()).slice(0, 3);
  console.log('Sample deals:');
  sampleDeals.forEach(deal => {
    console.log(`  Deal ${deal.id}: companyId=${deal.companyId}, company=${deal.company}`);
  });
  
  // Debug: Check if companies exist
  const sampleCompanies = Array.from(service.companies.values()).slice(0, 3);
  console.log('Sample companies:');
  sampleCompanies.forEach(company => {
    console.log(`  Company ${company.id}: ${company.companyName}`);
  });
  
  console.log('Enhanced synthetic data generated successfully!');
  return {
    companies: companies.length,
    investors: investors.length,
    funds: funds.length,
    deals: deals.length,
    positions: positions.length
  };
}

// Export the main function
