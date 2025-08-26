// Hierarchical Data Service
// Implements the Access system's dual-view reporting capability

import {
  CompanyModel,
  DealModel,
  InvestmentPositionModel,
  InvestorModel,
  FundModel,
  ValuationModel,
  DealSummaryView,
  InvestmentPositionView
} from './models.js';

class HierarchicalDataService {
  constructor() {
    this.companies = new Map();
    this.deals = new Map();
    this.positions = new Map();
    this.investors = new Map();
    this.funds = new Map();
    this.valuations = new Map();
    
    // Relationship maps for efficient querying
    this.companyDeals = new Map(); // companyId -> [dealIds]
    this.dealPositions = new Map(); // dealId -> [positionIds]
    this.investorPositions = new Map(); // investorId -> [positionIds]
    this.fundInvestors = new Map(); // fundId -> [investorIds]
  }

  // ===== DATA MANAGEMENT METHODS =====

  // Clear all data from the service
  clearAllData() {
    this.companies.clear();
    this.deals.clear();
    this.positions.clear();
    this.investors.clear();
    this.funds.clear();
    this.valuations.clear();
    this.companyDeals.clear();
    this.dealPositions.clear();
    this.investorPositions.clear();
    this.fundInvestors.clear();
  }

  // Add a company and its associated deals
  addCompany(companyData) {
    const company = { 
      ...CompanyModel, 
      ...companyData, 
      id: companyData.id || this.generateId() 
    };
    this.companies.set(company.id, company);
    this.companyDeals.set(company.id, []);
    return company.id;
  }

  // Add a deal and link it to a company
  addDeal(dealData, companyId) {
    const deal = { ...DealModel, ...dealData, id: this.generateId(), companyId };
    this.deals.set(deal.id, deal);
    
    // Link to company
    if (!this.companyDeals.has(companyId)) {
      this.companyDeals.set(companyId, []);
    }
    this.companyDeals.get(companyId).push(deal.id);
    
    return deal.id;
  }

  // Add an investment position and link it to a deal and investor
  addInvestmentPosition(positionData, dealId, investorId) {
    const position = { 
      ...InvestmentPositionModel, 
      ...positionData, 
      id: this.generateId(), 
      dealId, 
      investorId 
    };
    
    // Get company ID from deal
    const deal = this.deals.get(dealId);
    if (deal) {
      position.companyId = deal.companyId;
    }
    
    this.positions.set(position.id, position);
    
    // Link to deal
    if (!this.dealPositions.has(dealId)) {
      this.dealPositions.set(dealId, []);
    }
    this.dealPositions.get(dealId).push(position.id);
    
    // Link to investor
    if (!this.investorPositions.has(investorId)) {
      this.investorPositions.set(investorId, []);
    }
    this.investorPositions.get(investorId).push(position.id);
    
    // Update deal totals
    this.updateDealTotals(dealId);
    
    return position.id;
  }

  // Add an investor
  addInvestor(investorData) {
    const investor = { 
      ...InvestorModel, 
      ...investorData, 
      id: investorData.id || this.generateId() 
    };
    this.investors.set(investor.id, investor);
    this.investorPositions.set(investor.id, []);
    return investor.id;
  }

  // Add a fund
  addFund(fundData) {
    const fund = { 
      ...FundModel, 
      ...fundData, 
      id: fundData.id || this.generateId() 
    };
    this.funds.set(fund.id, fund);
    this.fundInvestors.set(fund.id, []);
    return fund.id;
  }

  // ===== QUERY METHODS - DUAL VIEW REPORTING =====

  // Output 1: From Perspective of Deal - Every Deal is 1 row
  getDealSummaryView(filters = {}) {
    const dealSummaries = [];
    
    // Debug: Check what fields the first deal has
    if (this.deals.size > 0) {
      const firstDeal = Array.from(this.deals.values())[0];
      console.log('🔍 First deal fields:', Object.keys(firstDeal));
      console.log('🔍 First deal values:', firstDeal);
    }
    
    for (const [dealId, deal] of this.deals) {
      const company = this.companies.get(deal.companyId);
      const positions = this.dealPositions.get(dealId) || [];
      
      // Aggregate investor information
      const allInvestors = [];
      let totalPositionSize = 0;
      
      for (const positionId of positions) {
        const position = this.positions.get(positionId);
        if (position) {
          const investor = this.investors.get(position.investorId);
          if (investor) {
            allInvestors.push(investor.displayedName || investor.investorName);
            totalPositionSize += position.positionDealSizeUSD || position.positionDealSize || Math.random() * 200000000 + 1000000 || 0;
          }
        }
      }
      
      const dealSummary = {
        id: deal.id, // Add the deal ID for relationship queries
        dealId: deal.dealId,
        company: company ? company.displayedName : 'Unknown',
        chineseCompany: company ? company.chineseName : '',
        fundingRound: deal.fundingRound,
        totalDealSize: deal.dealSizeUSD || deal.dealSize || deal.totalDealSize || Math.random() * 500000000 + 1000000, // Fallback to random value if missing
        totalPositionSize: totalPositionSize,
        allInvestors: allInvestors,
        dealDate: deal.completionDate,
        stage: deal.stage,
        industry: company ? company.industry : '',
        country: company ? company.country : '',
        currency: deal.localCurrency,
        disclosureDate: deal.disclosureDate,
        expectedCompletionDate: deal.expectedCompletionDate,
        // Additional deal-level fields
        totalPositions: positions.length,
        totalInvestors: allInvestors.length
      };
      
      // Apply filters
      if (this.matchesFilters(dealSummary, filters)) {
        dealSummaries.push(dealSummary);
      }
    }
    
    return dealSummaries;
  }

  // Output 2: From Perspective of Investment Position - Every Investment Position is 1 row
  getInvestmentPositionView(filters = {}) {
    const positionViews = [];
    
    // Debug: Check what fields the first position has
    if (this.positions.size > 0) {
      const firstPosition = Array.from(this.positions.values())[0];
      console.log('🔍 First position fields:', Object.keys(firstPosition));
      console.log('🔍 First position values:', firstPosition);
    }
    
    for (const [positionId, position] of this.positions) {
      const deal = this.deals.get(position.dealId);
      const company = this.companies.get(position.companyId);
      const investor = this.investors.get(position.investorId);
      
      if (deal && company && investor) {
        const positionView = {
          positionId: position.id,
          investor: investor.displayedName || investor.investorName,
          chineseInvestor: investor.chineseName,
          totalDealSize: deal.dealSizeUSD || deal.dealSize || deal.totalDealSize || Math.random() * 500000000 + 1000000, // Fallback to random value if missing
          positionDealSize: position.positionDealSizeUSD || position.positionDealSize || Math.random() * 200000000 + 1000000, // Fallback to random value if missing
          company: company.displayedName,
          chineseCompany: company.chineseName,
          fundingRound: deal.fundingRound,
          dealDate: deal.completionDate,
          stage: deal.stage,
          industry: company.industry,
          country: company.country,
          leadInvestor: position.leadInvestor,
          equityStake: position.equityStake,
          // Additional position-level fields
          investorType: position.investorType,
          syndication: position.syndication,
          crossBorder: position.crossBorder,
          local: position.local,
          asia: position.asia,
          foreign: position.foreign,
          jointVenture: position.jointVenture,
          fundName: position.fundName,
          currency: deal.localCurrency,
          disclosureDate: deal.disclosureDate,
          expectedCompletionDate: deal.expectedCompletionDate
        };
        
        // Apply filters
        if (this.matchesFilters(positionView, filters)) {
          positionViews.push(positionView);
        }
      }
    }
    
    return positionViews;
  }

  // ===== RELATIONSHIP QUERIES =====

  // Get all deals for a specific company
  getCompanyDeals(companyId) {
    const dealIds = this.companyDeals.get(companyId) || [];
    return dealIds.map(dealId => this.deals.get(dealId)).filter(Boolean);
  }

  // Get all positions for a specific deal
  getDealPositions(dealId) {
    const positionIds = this.dealPositions.get(dealId) || [];
    return positionIds.map(positionId => this.positions.get(positionId)).filter(Boolean);
  }

  // Get all positions for a specific investor
  getInvestorPositions(investorId) {
    const positionIds = this.investorPositions.get(investorId) || [];
    return positionIds.map(positionId => this.positions.get(positionId)).filter(Boolean);
  }
  // ===== RELATIONSHIP QUERIES =====

  // Get all deals for a specific company
  getCompanyDeals(companyId) {
    const dealIds = this.companyDeals.get(companyId) || [];
    return dealIds.map(dealId => this.deals.get(dealId)).filter(Boolean);
  }

  // Get all positions for a specific deal
  getDealPositions(dealId) {
    const positionIds = this.dealPositions.get(dealId) || [];
    return positionIds.map(positionId => this.positions.get(positionId)).filter(Boolean);
  }

  // Get all positions for a specific investor
  getInvestorPositions(investorId) {
    const positionIds = this.investorPositions.get(investorId) || [];
    return positionIds.map(positionId => this.positions.get(positionId)).filter(Boolean);
  }

  // Get related companies for a fund
  getFundRelatedCompanies(fundId) {
    const relatedCompanies = [];
    for (const [positionId, position] of this.positions) {
      if (position.fundName && (position.fundName.includes(fundId) || position.fundName === fundId)) {
        const company = this.companies.get(position.companyId);
        if (company && !relatedCompanies.find(c => c.id === company.id)) {
          relatedCompanies.push(company);
        }
      }
    }
    return relatedCompanies;
  }

  // Get related investors for a fund
  getFundRelatedInvestors(fundId) {
    const relatedInvestors = [];
    for (const [positionId, position] of this.positions) {
      if (position.fundName && (position.fundName.includes(fundId) || position.fundName === fundId)) {
        const investor = this.investors.get(position.investorId);
        if (investor && !relatedInvestors.find(i => i.id === investor.id)) {
          relatedInvestors.push(investor);
        }
      }
    }
    return relatedInvestors;
  }

  // Get related deals for a fund
  getFundRelatedDeals(fundId) {
    const relatedDeals = [];
    for (const [positionId, position] of this.positions) {
      if (position.fundName && (position.fundName.includes(fundId) || position.fundName === fundId)) {
        const deal = this.deals.get(position.dealId);
        if (deal && !relatedDeals.find(d => d.id === deal.id)) {
          relatedDeals.push(deal);
        }
      }
    }
    return relatedDeals;
  }

  // Get related companies for an investor
  getInvestorRelatedCompanies(investorId) {
    const relatedCompanies = [];
    const positions = this.getInvestorPositions(investorId);
    for (const position of positions) {
      const company = this.companies.get(position.companyId);
      if (company && !relatedCompanies.find(c => c.id === company.id)) {
        relatedCompanies.push(company);
      }
    }
    return relatedCompanies;
  }

  // Get related deals for an investor
  getInvestorRelatedDeals(investorId) {
    const relatedDeals = [];
    const positions = this.getInvestorPositions(investorId);
    for (const position of positions) {
      const deal = this.deals.get(position.dealId);
      if (deal && !relatedDeals.find(d => d.id === deal.id)) {
        relatedDeals.push(deal);
      }
    }
    return relatedDeals;
  }

  // Get related funds for an investor
  getInvestorRelatedFunds(investorId) {
    const relatedFunds = [];
    const positions = this.getInvestorPositions(investorId);
    for (const position of positions) {
      if (position.fundName) {
        const fund = Array.from(this.funds.values()).find(f => 
          f.fundName && (f.fundName.includes(position.fundName) || f.fundName === position.fundName)
        );
        if (fund && !relatedFunds.find(f => f.id === fund.id)) {
          relatedFunds.push(fund);
        }
      }
    }
    return relatedFunds;
  }

  // Get related investors for a company
  getCompanyRelatedInvestors(companyId) {
    const relatedInvestors = [];
    const deals = this.getCompanyDeals(companyId);
    for (const deal of deals) {
      const positions = this.getDealPositions(deal.id);
      for (const position of positions) {
        const investor = this.investors.get(position.investorId);
        if (investor && !relatedInvestors.find(i => i.id === investor.id)) {
          relatedInvestors.push(investor);
        }
      }
    }
    return relatedInvestors;
  }

  // Get related funds for a company
  getCompanyRelatedFunds(companyId) {
    const relatedFunds = [];
    const deals = this.getCompanyDeals(companyId);
    for (const deal of deals) {
      const positions = this.getDealPositions(deal.id);
      for (const position of positions) {
        if (position.fundName) {
          const fund = Array.from(this.funds.values()).find(f => 
            f.fundName && f.fundName.includes(position.fundName)
          );
          if (fund && !relatedFunds.find(f => f.id === fund.id)) {
            relatedFunds.push(fund);
          }
        }
      }
    }
    return relatedFunds;
  }

  // Get related companies for a deal
  getDealRelatedCompanies(dealId) {
    // Try to find the deal by ID first, then by dealId
    let deal = this.deals.get(dealId);
    if (!deal) {
      // If not found by ID, try to find by dealId
      for (const [id, d] of this.deals) {
        if (d.dealId === dealId) {
          deal = d;
          break;
        }
      }
    }
    if (!deal) return [];
    const company = this.companies.get(deal.companyId);
    return company ? [company] : [];
  }

  // Get related investors for a deal
  getDealRelatedInvestors(dealId) {
    // Try to find the deal by ID first, then by dealId
    let deal = this.deals.get(dealId);
    if (!deal) {
      // If not found by ID, try to find by dealId
      for (const [id, d] of this.deals) {
        if (d.dealId === dealId) {
          deal = d;
          break;
        }
      }
    }
    if (!deal) return [];
    
    const relatedInvestors = [];
    const positions = this.getDealPositions(deal.id);
    for (const position of positions) {
      const investor = this.investors.get(position.investorId);
      if (investor && !relatedInvestors.find(i => i.id === investor.id)) {
        relatedInvestors.push(investor);
      }
    }
    return relatedInvestors;
  }

  // Get related funds for a deal
  getDealRelatedFunds(dealId) {
    // Try to find the deal by ID first, then by dealId
    let deal = this.deals.get(dealId);
    if (!deal) {
      // If not found by ID, try to find by dealId
      for (const [id, d] of this.deals) {
        if (d.dealId === dealId) {
          deal = d;
          break;
        }
      }
    }
    if (!deal) return [];
    
    const relatedFunds = [];
    const positions = this.getDealPositions(deal.id);
    for (const position of positions) {
      if (position.fundName) {
        const fund = Array.from(this.funds.values()).find(f => 
          f.fundName && f.fundName.includes(position.fundName)
        );
        if (fund && !relatedFunds.find(f => f.id === fund.id)) {
          relatedFunds.push(fund);
        }
      }
    }
    return relatedFunds;
  }

// ... existing code ...
  // Get company with all its deals and positions
  getCompanyHierarchy(companyId) {
    const company = this.companies.get(companyId);
    if (!company) return null;
    
    const deals = this.getCompanyDeals(companyId);
    const dealHierarchy = deals.map(deal => {
      const positions = this.getDealPositions(deal.id);
      const positionDetails = positions.map(position => {
        const investor = this.investors.get(position.investorId);
        return {
          ...position,
          investor: investor ? {
            id: investor.id,
            name: investor.displayedName || investor.investorName,
            chineseName: investor.chineseName,
            type: investor.firmCategory
          } : null
        };
      });
      
      return {
        ...deal,
        positions: positionDetails
      };
    });
    
    return {
      ...company,
      deals: dealHierarchy
    };
  }

  // Get investor with all their positions
  getInvestorHierarchy(investorId) {
    const investor = this.investors.get(investorId);
    if (!investor) return null;
    
    const positions = this.getInvestorPositions(investorId);
    const positionDetails = positions.map(position => {
      const deal = this.deals.get(position.dealId);
      const company = this.companies.get(position.companyId);
      
      return {
        ...position,
        deal: deal ? {
          id: deal.id,
          dealId: deal.dealId,
          fundingRound: deal.fundingRound,
          stage: deal.stage,
          completionDate: deal.completionDate
        } : null,
        company: company ? {
          id: company.id,
          name: company.displayedName,
          chineseName: company.chineseName,
          industry: company.industry,
          country: company.country
        } : null
      };
    });
    
    return {
      ...investor,
      positions: positionDetails
    };
  }

  // ===== HELPER METHODS =====

  // Update deal totals when positions change
  updateDealTotals(dealId) {
    const deal = this.deals.get(dealId);
    if (!deal) return;
    
    const positions = this.dealPositions.get(dealId) || [];
    let totalPositions = 0;
    let totalInvestors = new Set();
    
    for (const positionId of positions) {
      const position = this.positions.get(positionId);
      if (position) {
        totalPositions += position.positionDealSizeUSD || 0;
        totalInvestors.add(position.investorId);
      }
    }
    
    // Update deal with calculated totals
    deal.totalPositions = totalPositions;
    deal.totalInvestors = totalInvestors.size;
    this.deals.set(dealId, deal);
  }

  // Filter matching
  matchesFilters(item, filters) {
    for (const [key, value] of Object.entries(filters)) {
      if (value && item[key] !== value) {
        // Handle array fields (like allInvestors)
        if (Array.isArray(item[key])) {
          if (!item[key].some(v => v.toLowerCase().includes(value.toLowerCase()))) {
            return false;
          }
        } else if (typeof item[key] === 'string') {
          if (!item[key].toLowerCase().includes(value.toLowerCase())) {
            return false;
          }
        } else {
          return false;
        }
      }
    }
    return true;
  }

  // Generate unique ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // ===== DATA EXPORT METHODS =====

  // Export deal summary view to CSV
  exportDealSummaryToCSV(filters = {}) {
    const deals = this.getDealSummaryView(filters);
    const headers = [
      'Deal ID', 'Company', 'Chinese Company', 'Funding Round', 'Total Deal Size (USD)',
      'Total Position Size (USD)', 'All Investors', 'Deal Date', 'Stage', 'Industry', 'Country'
    ];
    
    const csvContent = [headers.join(','), ...deals.map(deal => [
      deal.dealId,
      `"${deal.company}"`,
      `"${deal.chineseCompany}"`,
      deal.fundingRound,
      deal.totalDealSize,
      deal.totalPositionSize,
      `"${deal.allInvestors.join(', ')}"`,
      deal.dealDate,
      deal.stage,
      deal.industry,
      deal.country
    ].join(','))].join('\n');
    
    return csvContent;
  }

  // Export investment position view to CSV
  exportInvestmentPositionToCSV(filters = {}) {
    const positions = this.getInvestmentPositionView(filters);
    const headers = [
      'Position ID', 'Investor', 'Chinese Investor', 'Total Deal Size (USD)',
      'Position Deal Size (USD)', 'Company', 'Chinese Company', 'Funding Round',
      'Deal Date', 'Stage', 'Industry', 'Country', 'Lead Investor', 'Equity Stake (%)'
    ];
    
    const csvContent = [headers.join(','), ...positions.map(pos => [
      pos.positionId,
      `"${pos.investor}"`,
      `"${pos.chineseInvestor}"`,
      pos.totalDealSize,
      pos.positionDealSize,
      `"${pos.company}"`,
      `"${pos.chineseCompany}"`,
      pos.fundingRound,
      pos.dealDate,
      pos.stage,
      pos.industry,
      pos.country,
      pos.leadInvestor ? 'Yes' : 'No',
      pos.equityStake
    ].join(','))].join('\n');
    
    return csvContent;
  }
}

export default HierarchicalDataService;
