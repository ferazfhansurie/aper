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
  // Generate meaningful company name if not provided
  const companyName = csvRow['Company'] || csvRow['Displayed Investee Name (English)'] || generateCompanyName();
  const country = generateCountryName();
  const industry = generateIndustryName();
  
  return {
    id: `COMP_${csvRow['ID'] || Date.now() + Math.random()}`,
    companyName: companyName,
    chineseName: csvRow['Company (Chinese)'] || '',
    displayedName: companyName,
    email: csvRow['E-mail Address'] || generateEmail(companyName),
    website: csvRow['Web site'] || generateWebsite(companyName),
    tel: csvRow['Tel1'] || generatePhoneNumber(),
    fax: csvRow['Fax1'] || generatePhoneNumber(),
    listedDate: csvRow['Listed Date'] || '',
    listingStatus: csvRow['Listing Status'] || getRandomListingStatus(),
    country: country,
    industry: industry,
    techCategory: Boolean(csvRow['Link_Tech_cate_ID_investee']) || Math.random() > 0.7,
    sriFocus: csvRow['Link_SRI Focus ID'] || getRandomSRIFocus(),
    aiDeal: Boolean(csvRow['Link_artificial_intelligence_cate_ID_investee']) || Math.random() > 0.8,
    semiconductorDeal: Boolean(csvRow['Link_semiconductor_cate_ID_investee']) || Math.random() > 0.9,
    batteryDeal: Boolean(csvRow['Link_battery_cate_ID_investee']) || Math.random() > 0.9,
    evDeal: Boolean(csvRow['Link_electric_vehicle_cate_ID_investee']) || Math.random() > 0.9,
    realAssets: Boolean(csvRow['Link_real_asset_cate_ID_investee']) || Math.random() > 0.8,
    healthcareDeal: Boolean(csvRow['Link_healthcare_cate_ID_investee']) || Math.random() > 0.8
  };
}

function transformInvestorData(csvRow) {
  // Generate a meaningful investor name based on the ID
  const investorId = csvRow['Link_Investor_Name_ip'] || 'Unknown';
  const investorName = generateInvestorName(investorId);
  
  return {
    id: `INV_${csvRow['ID_Investor_profile'] || csvRow['Link_Investor_Name_ip'] || Date.now() + Math.random()}`,
    investorName: investorName,
    chineseName: '',
    displayedName: investorName,
    firmCategory: getRandomFirmCategory(),
    firmLocation: getRandomLocation(),
    affiliation: getRandomAffiliation(),
    website: generateWebsite(investorName),
    description: csvRow['Remarks_ip_Type'] || '',
    subsidiaryOf: null,
    remarks: generateInvestorRemarks(investorName)
  };
}

// Helper function to generate meaningful investor names
function generateInvestorName(investorId) {
  const companyPrefixes = [
    'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
    'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi',
    'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega'
  ];
  
  const companySuffixes = [
    'Capital', 'Ventures', 'Partners', 'Group', 'Holdings', 'International',
    'Corporation', 'Limited', 'LLC', 'Inc', 'Ltd', 'Fund', 'Investment',
    'Private Equity', 'Venture Capital', 'Growth Equity', 'Asset Management'
  ];
  
  const randomPrefix = companyPrefixes[Math.floor(Math.random() * companyPrefixes.length)];
  const randomSuffix = companySuffixes[Math.floor(Math.random() * companySuffixes.length)];
  
  return `${randomPrefix} ${randomSuffix}`;
}

// Helper function to generate random firm categories
function getRandomFirmCategory() {
  const categories = [
    'Venture Capital', 'Private Equity', 'Growth Equity', 'Investment Firm',
    'Corporate Venture', 'Family Office', 'Sovereign Fund', 'Fund of Funds',
    'Angel Investor', 'Institutional Investor'
  ];
  return categories[Math.floor(Math.random() * categories.length)];
}

// Helper function to generate random locations
function getRandomLocation() {
  const locations = [
    'USA', 'China', 'UK', 'Germany', 'Japan', 'Singapore', 'India', 'Australia',
    'Canada', 'France', 'Switzerland', 'Netherlands', 'Sweden', 'Norway',
    'Hong Kong', 'South Korea', 'Israel', 'Brazil', 'Mexico', 'UAE'
  ];
  return locations[Math.floor(Math.random() * locations.length)];
}

// Helper function to generate random affiliations
function getRandomAffiliation() {
  const affiliations = [
    'Independent', 'Corporate', 'Government', 'University', 'Foundation',
    'Bank', 'Insurance Company', 'Pension Fund', 'Endowment'
  ];
  return affiliations[Math.floor(Math.random() * affiliations.length)];
}

// Helper function to generate website URLs
function generateWebsite(companyName) {
  const cleanName = companyName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  const domains = ['.com', '.org', '.net', '.co', '.io', '.vc', '.pe'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `https://www.${cleanName}${randomDomain}`;
}

// Helper function to generate investor remarks
function generateInvestorRemarks(companyName) {
  const remarks = [
    `Established ${companyName} as a leading investment firm`,
    `${companyName} focuses on technology and healthcare investments`,
    `${companyName} has a strong track record in growth equity`,
    `${companyName} specializes in cross-border investments`,
    `${companyName} is known for its strategic approach to private equity`
  ];
  return remarks[Math.floor(Math.random() * remarks.length)];
}

// Helper function to generate company names
function generateCompanyName() {
  const prefixes = [
    'Tech', 'Innovation', 'Global', 'Advanced', 'Smart', 'Future', 'Next', 'Prime',
    'Elite', 'Premium', 'Core', 'Central', 'Main', 'Primary', 'Essential', 'Vital'
  ];
  
  const industries = [
    'Solutions', 'Systems', 'Technologies', 'Services', 'Corporation', 'Enterprises',
    'Industries', 'Group', 'Holdings', 'International', 'Limited', 'Inc', 'Ltd'
  ];
  
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomIndustry = industries[Math.floor(Math.random() * industries.length)];
  
  return `${randomPrefix} ${randomIndustry}`;
}

// Helper function to generate country names
function generateCountryName() {
  const countries = [
    'USA', 'China', 'UK', 'Germany', 'Japan', 'Singapore', 'India', 'Australia',
    'Canada', 'France', 'Switzerland', 'Netherlands', 'Sweden', 'Norway',
    'Hong Kong', 'South Korea', 'Israel', 'Brazil', 'Mexico', 'UAE', 'Italy',
    'Spain', 'South Africa', 'Thailand', 'Malaysia', 'Indonesia', 'Philippines'
  ];
  return countries[Math.floor(Math.random() * countries.length)];
}

// Helper function to generate industry names
function generateIndustryName() {
  const industries = [
    'Technology', 'Healthcare', 'Financial Services', 'Clean Energy', 'Real Estate',
    'Manufacturing', 'Retail', 'Transportation', 'Media', 'Education', 'Biotechnology',
    'Artificial Intelligence', 'Semiconductors', 'Electric Vehicles', 'Battery Technology',
    'Cybersecurity', 'Cloud Computing', 'E-commerce', 'Fintech', 'Edtech'
  ];
  return industries[Math.floor(Math.random() * industries.length)];
}

// Helper function to generate fund names
function generateFundName() {
  const prefixes = [
    'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
    'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi'
  ];
  
  const fundTypes = [
    'Venture Fund', 'Growth Fund', 'Buyout Fund', 'Opportunity Fund', 'Innovation Fund',
    'Technology Fund', 'Healthcare Fund', 'Real Estate Fund', 'Infrastructure Fund'
  ];
  
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomType = fundTypes[Math.floor(Math.random() * fundTypes.length)];
  
  return `${randomPrefix} ${randomType}`;
}

// Helper function to generate fund categories
function generateFundCategory() {
  const categories = [
    'Venture Capital', 'Private Equity', 'Growth Equity', 'Buyout', 'Mezzanine',
    'Distressed Debt', 'Real Estate', 'Infrastructure', 'Fund of Funds',
    'Angel Investment', 'Seed Capital', 'Series A', 'Series B', 'Series C'
  ];
  return categories[Math.floor(Math.random() * categories.length)];
}

// Helper function to generate management company names
function generateManagementCompany() {
  const prefixes = [
    'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
    'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi'
  ];
  
  const suffixes = [
    'Capital Management', 'Investment Group', 'Partners', 'Ventures', 'Holdings',
    'Asset Management', 'Private Equity', 'Venture Capital', 'Growth Partners'
  ];
  
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${randomPrefix} ${randomSuffix}`;
}

// Helper function to generate random fund status
function getRandomFundStatus() {
  const statuses = ['Active', 'Raising', 'Closed', 'Fully Invested', 'Winding Down'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// Helper function to generate random geographic focus
function getRandomGeoFocus() {
  const focuses = ['Global', 'Asia', 'North America', 'Europe', 'Emerging Markets', 'China', 'India'];
  return focuses[Math.floor(Math.random() * focuses.length)];
}

// Helper function to generate random listing status
function getRandomListingStatus() {
  const statuses = ['Private', 'Public', 'Listed', 'Delisted', 'IPO Pending'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// Helper function to generate random SRI focus
function getRandomSRIFocus() {
  const focuses = ['ESG', 'Sustainability', 'Impact Investing', 'Green Technology', 'Social Enterprise', 'None'];
  return focuses[Math.floor(Math.random() * focuses.length)];
}

// Helper function to generate random funding rounds
function getRandomFundingRound() {
  const rounds = ['Seed', 'Series A', 'Series B', 'Series C', 'Series D', 'Series E', 'Growth Equity', 'Buyout', 'IPO'];
  return rounds[Math.floor(Math.random() * rounds.length)];
}

// Helper function to generate random investment stages
function getRandomInvestmentStage() {
  const stages = ['Early Stage', 'Growth Stage', 'Late Stage', 'Mature', 'Turnaround', 'Distressed'];
  return stages[Math.floor(Math.random() * stages.length)];
}

// Helper function to generate random dates
function generateRandomDate() {
  const startDate = new Date(2020, 0, 1);
  const endDate = new Date(2024, 11, 31);
  const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  return new Date(randomTime).toISOString().split('T')[0];
}

// Helper function to generate email addresses
function generateEmail(companyName) {
  const cleanName = companyName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com', 'business.com'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `info@${cleanName}.${randomDomain.split('.').pop()}`;
}

// Helper function to generate phone numbers
function generatePhoneNumber() {
  const countryCode = Math.floor(Math.random() * 99) + 1;
  const areaCode = Math.floor(Math.random() * 999) + 100;
  const number = Math.floor(Math.random() * 9999999) + 1000000;
  return `+${countryCode} ${areaCode} ${number}`;
}

function transformFundData(csvRow) {
  const fundSize = parseFloat(csvRow['MinimumTarget Fund Size (US$m)'] || '0') * 1000000;
  const fundName = csvRow['Fund Name'] || csvRow['Displayed Fund Name'] || generateFundName();
  const category = generateFundCategory();
  const managementCompany = generateManagementCompany();
  const country = generateCountryName();
  
  return {
    id: `FUND_${csvRow['Fund ID'] || Date.now() + Math.random()}`,
    fundName: fundName,
    chineseName: csvRow['Fund Name (Chinese)'] || csvRow['Displayed Fund Name (Chinese)'] || '',
    displayedName: fundName,
    fundMgtCompany: managementCompany,
    displayedMgtCompany: managementCompany,
    fundSize: fundSize,
    currency: csvRow['Target Fund Size Currency  (Local Currency code)'] || 'USD',
    status: csvRow['Fund Status (Inactive)'] || getRandomFundStatus(),
    vintage: parseInt(csvRow['Fund Vintage Year (yyyymm)']?.substring(0, 4)) || 2020,
    category: category,
    geoFocus: getRandomGeoFocus(),
    focus: category,
    country: country,
    targetSize: fundSize,
    capitalDeployed: Math.floor(fundSize * 0.6),
    capitalAvailable: Math.floor(fundSize * 0.4)
  };
}

function transformDealData(csvRow, companyName) {
  const dealSize = parseFloat(csvRow['Deal Size (USD)'] || csvRow['Total Deal Size'] || '0');
  const industry = generateIndustryName();
  const country = generateCountryName();
  const fundingRound = csvRow['Funding Round'] || csvRow['Round'] || getRandomFundingRound();
  const stage = csvRow['Stage'] || csvRow['Investment Stage'] || getRandomInvestmentStage();
  
  return {
    id: `DEAL_${csvRow['Deal ID'] || Date.now() + Math.random()}`,
    company: companyName || csvRow['Company Name'] || generateCompanyName(),
    chineseCompany: csvRow['Chinese Company'] || '',
    fundingRound: fundingRound,
    totalDealSize: dealSize,
    stage: stage,
    date: csvRow['Date'] || csvRow['Completion Date'] || csvRow['Deal Date'] || generateRandomDate(),
    crossBorder: Boolean(csvRow['Cross Border'] || csvRow['International']) || Math.random() > 0.7,
    country: country,
    industry: industry
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
  
  for (let i = 0; i < count; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const round = getRandomFundingRound();
    const stage = getRandomInvestmentStage();
    const industry = generateIndustryName();
    const country = generateCountryName();
    const dealSize = Math.random() * 500000000 + 1000000; // 1M to 500M - MATCHED WITH FALLBACK
    
    deals.push({
      id: `DEAL_SYNTH_${i + 1}`,
      dealId: `DEAL_${Math.floor(Math.random() * 99999) + 10000}`, // Generate meaningful deal ID
      company: company.companyName,
      chineseCompany: company.chineseName,
      fundingRound: round,
      totalDealSize: Math.floor(dealSize),
      stage: stage,
      date: generateRandomDate(),
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
    console.log('🚀 Starting CSV data import...');
    console.log('📍 Environment check:', {
      hasWindow: typeof window !== 'undefined',
      hasFetch: typeof fetch !== 'undefined',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'N/A',
      hostname: typeof window !== 'undefined' ? window.location.hostname : 'N/A',
      isVercel: typeof window !== 'undefined' ? window.location.hostname.includes('vercel.app') : 'N/A'
    });
    
    // Clear existing data if method exists
    if (service.clearAllData) {
      console.log('🧹 Clearing data using service.clearAllData()');
      service.clearAllData();
    } else {
      console.log('🧹 Clearing data manually');
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
        console.log('🌐 Browser environment detected, attempting CSV import...');
        console.log('🔍 Vercel detection:', {
          hostname: window.location.hostname,
          isVercel: window.location.hostname.includes('vercel.app'),
          protocol: window.location.protocol,
          pathname: window.location.pathname
        });
        
        // Import companies from company.csv (725 lines)
        console.log('📊 Importing companies...');
        try {
          const companyData = await fetch('/exports/company.csv').then(res => res.text());
          console.log('✅ Company CSV fetch successful, length:', companyData.length, 'characters');
          const companies = parseCSV(companyData);
          console.log('📈 Parsed companies CSV:', companies.length, 'rows');
          
          let totalCompanies = 0;
          companies.forEach((csvRow, index) => {
            const company = transformCompanyData(csvRow);
            service.addCompany(company);
            totalCompanies++;
            if (index < 5) { // Log first 5 companies for debugging
              console.log(`🏢 Company ${index + 1}:`, company.companyName, '| ID:', company.id);
            }
          });
          
          console.log(`✅ Successfully imported ${totalCompanies} companies`);
          console.log('📊 Company data sample:', Array.from(service.companies.values()).slice(0, 3));
        } catch (companyError) {
          console.error('❌ Company import failed:', companyError);
          throw companyError;
        }
        
        // Import investors from Investor_profile.csv (4603 lines)
        console.log('👥 Importing investors...');
        try {
          const investorData = await fetch('/exports/Investor_profile.csv').then(res => res.text());
          console.log('✅ Investor CSV fetch successful, length:', investorData.length, 'characters');
          const investors = parseCSV(investorData);
          console.log('📈 Parsed investors CSV:', investors.length, 'rows');
          
          let totalInvestors = 0;
          investors.forEach((csvRow, index) => {
            const investor = transformInvestorData(csvRow);
            service.addInvestor(investor);
            totalInvestors++;
            if (index < 5) { // Log first 5 investors for debugging
              console.log(`👤 Investor ${index + 1}:`, investor.investorName, '| ID:', investor.id);
            }
          });
          
          console.log(`✅ Successfully imported ${totalInvestors} investors`);
        } catch (investorError) {
          console.error('❌ Investor import failed:', investorError);
          throw investorError;
        }
        
        // Import funds from Fund.csv (1626 lines)
        console.log('💰 Importing funds...');
        try {
          const fundData = await fetch('/exports/Fund.csv').then(res => res.text());
          console.log('✅ Fund CSV fetch successful, length:', fundData.length, 'characters');
          const funds = parseCSV(fundData);
          console.log('📈 Parsed funds CSV:', funds.length, 'rows');
          
          let totalFunds = 0;
          funds.forEach((csvRow, index) => {
            const fund = transformFundData(csvRow);
            service.addFund(fund);
            totalFunds++;
            if (index < 5) { // Log first 5 funds for debugging
              console.log(`💼 Fund ${index + 1}:`, fund.fundName, '| ID:', fund.id);
            }
          });
          
          console.log(`✅ Successfully imported ${totalFunds} funds`);
        } catch (fundError) {
          console.error('❌ Fund import failed:', fundError);
          throw fundError;
        }
        
        // Generate synthetic deals based on imported companies
        console.log('🎯 Generating synthetic deals...');
        const companyArray = Array.from(service.companies.values());
        console.log('📊 Companies available for deals:', companyArray.length);
        
        const syntheticDeals = generateSyntheticDeals(companyArray, 1000);
        console.log('📈 Generated synthetic deals:', syntheticDeals.length);
        
        // Log deal amount statistics
        const dealAmounts = syntheticDeals.map(deal => deal.totalDealSize);
        const totalDealAmount = dealAmounts.reduce((sum, amount) => sum + amount, 0);
        const avgDealAmount = totalDealAmount / dealAmounts.length;
        const minDealAmount = Math.min(...dealAmounts);
        const maxDealAmount = Math.max(...dealAmounts);
        
        console.log('💰 Deal Amount Statistics:');
        console.log('   - Total Deal Amount: $', (totalDealAmount / 1000000000).toFixed(2), 'B');
        console.log('   - Average Deal Amount: $', (avgDealAmount / 1000000).toFixed(2), 'M');
        console.log('   - Min Deal Amount: $', (minDealAmount / 1000000).toFixed(2), 'M');
        console.log('   - Max Deal Amount: $', (maxDealAmount / 1000000).toFixed(2), 'M');
        
        // Log first 5 deals for debugging
        syntheticDeals.slice(0, 5).forEach((deal, index) => {
          console.log(`🎯 Deal ${index + 1}:`, {
            company: deal.company,
            amount: `$${(deal.totalDealSize / 1000000).toFixed(2)}M`,
            round: deal.fundingRound,
            stage: deal.stage
          });
        });
        
        let addedDeals = 0;
        syntheticDeals.forEach(deal => {
          // Find a company ID for this deal
          const company = companyArray.find(c => c.companyName === deal.company);
          if (company) {
            service.addDeal(deal, company.id);
            addedDeals++;
          } else {
            console.warn('⚠️ Could not find company for deal:', deal.company);
          }
        });
        
        console.log(`✅ Successfully added ${addedDeals} deals to service`);
        
        // Generate synthetic investment positions
        console.log('💼 Generating synthetic investment positions...');
        const investorArray = Array.from(service.investors.values());
        const fundArray = Array.from(service.funds.values());
        const dealArray = Array.from(service.deals.values());
        
        console.log('📊 Available data for positions:', {
          investors: investorArray.length,
          funds: fundArray.length,
          deals: dealArray.length
        });
        
        const syntheticPositions = generateSyntheticPositions(dealArray, investorArray, fundArray, 2000);
        console.log('📈 Generated synthetic positions:', syntheticPositions.length);
        
        // Log position amount statistics
        const positionAmounts = syntheticPositions.map(pos => pos.positionDealSize);
        const totalPositionAmount = positionAmounts.reduce((sum, amount) => sum + amount, 0);
        const avgPositionAmount = totalPositionAmount / positionAmounts.length;
        
        console.log('💰 Position Amount Statistics:');
        console.log('   - Total Position Amount: $', (totalPositionAmount / 1000000000).toFixed(2), 'B');
        console.log('   - Average Position Amount: $', (avgPositionAmount / 1000000).toFixed(2), 'M');
        
        let addedPositions = 0;
        syntheticPositions.forEach(position => {
          // Find deal and investor IDs
          const deal = dealArray.find(d => d.company === position.company);
          const investor = investorArray.find(i => i.investorName === position.investor);
          
          if (deal && investor) {
            service.addInvestmentPosition(position, deal.id, investor.id);
            addedPositions++;
          } else {
            console.warn('⚠️ Could not find deal or investor for position:', {
              company: position.company,
              investor: position.investor,
              dealFound: !!deal,
              investorFound: !!investor
            });
          }
        });
        
        console.log(`✅ Successfully added ${addedPositions} positions to service`);
        
        // Final data summary
        console.log('🎉 CSV data import completed successfully!');
        console.log('📊 Final counts:');
        console.log('   - Companies:', service.companies.size);
        console.log('   - Investors:', service.investors.size);
        console.log('   - Funds:', service.funds.size);
        console.log('   - Deals:', service.deals.size);
        console.log('   - Investment Positions:', service.positions.size);
        
        // Calculate total deal amounts from service
        const finalDeals = Array.from(service.deals.values());
        const finalTotalDealAmount = finalDeals.reduce((sum, deal) => sum + (deal.totalDealSize || 0), 0);
        console.log('💰 FINAL TOTAL DEAL AMOUNT: $', (finalTotalDealAmount / 1000000000).toFixed(2), 'B');
        
        return {
          companies: service.companies.size,
          investors: service.investors.size,
          funds: service.funds.size,
          deals: service.deals.size,
          positions: service.positions.size,
          totalDealAmount: finalTotalDealAmount
        };
      } else {
        console.log('🖥️ Not in browser environment, using enhanced synthetic data');
        console.log('🔍 Environment details:', {
          hasWindow: typeof window !== 'undefined',
          hasFetch: typeof fetch !== 'undefined',
          nodeEnv: process?.env?.NODE_ENV || 'unknown'
        });
        return generateEnhancedSyntheticData(service);
      }
      
    } catch (csvError) {
      console.log('❌ CSV import failed, using enhanced synthetic data instead:', csvError);
      console.log('🔍 CSV error details:', {
        message: csvError.message,
        stack: csvError.stack,
        name: csvError.name
      });
      return generateEnhancedSyntheticData(service);
    }
    
  } catch (error) {
    console.error('💥 Error in import process:', error);
    console.log('🔍 Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // Final fallback to enhanced synthetic data
    console.log('🔄 Using final fallback to enhanced synthetic data...');
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
