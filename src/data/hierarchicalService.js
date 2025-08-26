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
  getDealSummaryView() {
    const dealSummaries = [];
    
    for (const [dealId, deal] of this.deals) {
      const company = this.companies.get(deal.companyId);
      const positions = this.getDealPositions(dealId);
      
      // Calculate totals
      let totalPositionSize = 0;
      const allInvestors = [];
      const seenInvestors = new Set();
      
      for (const position of positions) {
        totalPositionSize += position.positionDealSize || 0;
        
        if (position.investorId && !seenInvestors.has(position.investorId)) {
          const investor = this.investors.get(position.investorId);
          if (investor) {
            allInvestors.push(investor.investorName || investor.displayedName || position.investorId);
            seenInvestors.add(position.investorId);
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
        totalInvestors: allInvestors.length,
        totalPositions: positions.length
      };
      
        dealSummaries.push(dealSummary);
    }
    
    return dealSummaries;
  }

  // Output 2: From Perspective of Investment Position - Every Investment Position is 1 row
  getInvestmentPositionView() {
    const positionSummaries = [];
    
    for (const [positionId, position] of this.positions) {
      const company = this.companies.get(position.companyId);
      const investor = this.investors.get(position.investorId);
      const deal = this.deals.get(position.dealId);
      
      const positionSummary = {
          positionId: position.id,
        company: company ? company.displayedName : 'Unknown',
        chineseCompany: company ? company.chineseName : '',
        investor: investor ? investor.displayedName : 'Unknown',
        chineseInvestor: investor ? investor.chineseName : '',
        fundingRound: deal ? deal.fundingRound : '',
        stage: deal ? deal.stage : '',
        totalDealSize: deal ? (deal.dealSizeUSD || deal.dealSize || deal.totalDealSize || 0) : 0,
        positionDealSize: position.positionDealSizeUSD || position.positionDealSize || 0,
        equityStake: position.equityStake || 0,
        leadInvestor: position.leadInvestor || false,
        country: company ? company.country : '',
        industry: company ? company.industry : '',
        date: position.date || deal ? deal.completionDate : '',
        fundName: position.fund || position.fundName || '',
        fundId: position.fundId || null
      };
      
      positionSummaries.push(positionSummary);
    }
    
    return positionSummaries;
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
      // Check if position has fund information that matches the fund
      if (position.fund || position.fundName || position.fundId) {
        let fundMatch = false;
        
        // Check by fundId
        if (position.fundId === fundId) {
          fundMatch = true;
        }
        
        // Check by fund field (string)
        if (!fundMatch && position.fund) {
          const fund = this.funds.get(fundId);
          if (fund && (
            fund.fundName && (
              fund.fundName.includes(position.fund) || 
              fund.fundName === position.fund ||
              position.fund.includes(fund.fundName) ||
              fund.displayedName && (
                fund.displayedName.includes(position.fund) || 
                fund.displayedName === position.fund ||
                position.fund.includes(fund.displayedName)
              )
            )
          )) {
            fundMatch = true;
          }
        }
        
        // Check by fundName
        if (!fundMatch && position.fundName) {
          fundMatch = position.fundName === fundId || 
                     (position.fundName && position.fundName.includes(fundId)) ||
                     (fundId && fundId.includes(position.fundName));
        }
        
        if (fundMatch) {
          const company = this.companies.get(position.companyId);
          if (company && !relatedCompanies.find(c => c.id === company.id)) {
            relatedCompanies.push(company);
          }
        }
      }
    }
    return relatedCompanies;
  }

  // Get related investors for a fund
  getFundRelatedInvestors(fundId) {
    const relatedInvestors = [];
    for (const [positionId, position] of this.positions) {
      // Check if position has fund information that matches the fund
      if (position.fund || position.fundName || position.fundId) {
        let fundMatch = false;
        
        // Check by fundId
        if (position.fundId === fundId) {
          fundMatch = true;
        }
        
        // Check by fund field (string)
        if (!fundMatch && position.fund) {
          const fund = this.funds.get(fundId);
          if (fund && (
            fund.fundName && (
              fund.fundName.includes(position.fund) || 
              fund.fundName === position.fund ||
              position.fund.includes(fund.fundName) ||
              fund.displayedName && (
                fund.displayedName.includes(position.fund) || 
                fund.displayedName === position.fund ||
                position.fund.includes(fund.displayedName)
              )
            )
          )) {
            fundMatch = true;
          }
        }
        
        // Check by fundName
        if (!fundMatch && position.fundName) {
          fundMatch = position.fundName === fundId || 
                     (position.fundName && position.fundName.includes(fundId)) ||
                     (fundId && fundId.includes(position.fundName));
        }
        
        if (fundMatch) {
          const investor = this.investors.get(position.investorId);
          if (investor && !relatedInvestors.find(i => i.id === investor.id)) {
            relatedInvestors.push(investor);
          }
        }
      }
    }
    return relatedInvestors;
  }

  // Get related deals for a fund
  getFundRelatedDeals(fundId) {
    const relatedDeals = [];
    for (const [positionId, position] of this.positions) {
      // Check if position has fund information that matches the fund
      if (position.fund || position.fundName || position.fundId) {
        let fundMatch = false;
        
        // Check by fundId
        if (position.fundId === fundId) {
          fundMatch = true;
        }
        
        // Check by fund field (string)
        if (!fundMatch && position.fund) {
          const fund = this.funds.get(fundId);
          if (fund && (
            fund.fundName && (
              fund.fundName.includes(position.fund) || 
              fund.fundName === position.fund ||
              position.fund.includes(fund.fundName) ||
              fund.displayedName && (
                fund.displayedName.includes(position.fund) || 
                fund.displayedName === position.fund ||
                position.fund.includes(fund.displayedName)
              )
            )
          )) {
            fundMatch = true;
          }
        }
        
        // Check by fundName
        if (!fundMatch && position.fundName) {
          fundMatch = position.fundName === fundId || 
                     (position.fundName && position.fundName.includes(fundId)) ||
                     (fundId && fundId.includes(position.fundName));
        }
        
        if (fundMatch) {
          const deal = this.deals.get(position.dealId);
          if (deal && !relatedDeals.find(d => d.id === deal.id)) {
            relatedDeals.push(deal);
          }
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
      if (position.fund || position.fundName || position.fundId) {
        let fund = null;
        
        // First try to find by fundId if available
        if (position.fundId) {
          fund = this.funds.get(position.fundId);
        }
        
        // If not found by fundId, try to find by fund field (string)
        if (!fund && position.fund) {
          fund = Array.from(this.funds.values()).find(f => 
            f.fundName && (
              f.fundName.includes(position.fund) || 
              f.fundName === position.fund ||
              position.fund.includes(f.fundName) ||
              f.displayedName && (
                f.displayedName.includes(position.fund) || 
                f.displayedName === position.fund ||
                position.fund.includes(f.displayedName)
              )
            )
          );
        }
        
        // If not found by fund, try to find by fundName
        if (!fund && position.fundName) {
          fund = Array.from(this.funds.values()).find(f => 
            f.fundName && (
              f.fundName.includes(position.fundName) || 
              f.fundName === position.fundName ||
              position.fundName.includes(f.fundName)
            )
          );
        }
        
        // If still not found, try to find by management company
        if (!fund && position.fundMgtCompany) {
          fund = Array.from(this.funds.values()).find(f => 
            f.fundMgtCompany && (
              f.fundMgtCompany.includes(position.fundMgtCompany) || 
              f.fundMgtCompany === position.fundMgtCompany ||
              position.fundMgtCompany.includes(f.fundMgtCompany)
            )
          );
        }
        
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
        // Try multiple ways to find fund information
        if (position.fund || position.fundName || position.fundId) {
          let fund = null;
          
          // First try to find by fundId if available
          if (position.fundId) {
            fund = this.funds.get(position.fundId);
          }
          
          // If not found by fundId, try to find by fund field (string)
          if (!fund && position.fund) {
            fund = Array.from(this.funds.values()).find(f => 
              f.fundName && (
                f.fundName.includes(position.fund) || 
                f.fundName === position.fund ||
                position.fund.includes(f.fundName) ||
                f.displayedName && (
                  f.displayedName.includes(position.fund) || 
                  f.displayedName === position.fund ||
                  position.fund.includes(f.displayedName)
                )
              )
            );
          }
          
          // If not found by fund, try to find by fundName
          if (!fund && position.fundName) {
            fund = Array.from(this.funds.values()).find(f => 
              f.fundName && (
                f.fundName.includes(position.fundName) || 
                f.fundName === position.fundName ||
                position.fundName.includes(f.fundName)
              )
            );
          }
          
          // If still not found, try to find by management company
          if (!fund && position.fundMgtCompany) {
            fund = Array.from(this.funds.values()).find(f => 
              f.fundMgtCompany && (
                f.fundMgtCompany.includes(position.fundMgtCompany) || 
                f.fundMgtCompany === position.fundMgtCompany ||
                position.fundMgtCompany.includes(f.fundMgtCompany)
              )
            );
          }
          
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
      if (position.fund || position.fundName || position.fundId) {
        let fund = null;
        
        // First try to find by fundId if available
        if (position.fundId) {
          fund = this.funds.get(position.fundId);
        }
        
        // If not found by fundId, try to find by fund field (string)
        if (!fund && position.fund) {
          fund = Array.from(this.funds.values()).find(f => 
            f.fundName && (
              f.fundName.includes(position.fund) || 
              f.fundName === position.fund ||
              position.fund.includes(f.fundName) ||
              f.displayedName && (
                f.displayedName.includes(position.fund) || 
                f.displayedName === position.fund ||
                position.fund.includes(f.displayedName)
              )
            )
          );
        }
        
        // If not found by fund, try to find by fundName
        if (!fund && position.fundName) {
          fund = Array.from(this.funds.values()).find(f => 
            f.fundName && (
              f.fundName.includes(position.fundName) || 
              f.fundName === position.fundName ||
              position.fundName.includes(f.fundName)
            )
          );
        }
        
        // If still not found, try to find by management company
        if (!fund && position.fundMgtCompany) {
          fund = Array.from(this.funds.values()).find(f => 
            f.fundMgtCompany && (
              f.fundMgtCompany.includes(position.fundMgtCompany) || 
              f.fundMgtCompany === position.fundMgtCompany ||
              position.fundMgtCompany.includes(f.fundMgtCompany)
            )
          );
        }
        
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

  // Get entity name by ID
  getEntityName(entityType, entityId) {
    switch (entityType) {
      case 'company':
        const company = this.companies.get(entityId);
        return company ? (company.displayedName || company.company || company.companyName || `Company ${entityId}`) : `Company ${entityId}`;
      case 'investor':
        const investor = this.investors.get(entityId);
        if (investor) {
          // Try multiple name fields with better fallbacks
          const name = investor.displayedName || investor.investorName || investor.chineseName || investor.latestName;
          if (name && name.trim()) {
            return name;
          }
          // If no name found, create a descriptive ID
          return `Investor ${entityId}`;
        }
        return `Investor ${entityId}`;
      case 'fund':
        const fund = this.funds.get(entityId);
        if (fund) {
          const name = fund.fundName || fund.displayedName || fund.fundMgtCompany;
          if (name && name.trim()) {
            return name;
          }
          return `Fund ${entityId}`;
        }
        return `Fund ${entityId}`;
      case 'deal':
        const deal = this.deals.get(entityId);
        if (deal) {
          // Create a more descriptive deal identifier
          if (deal.dealId && deal.company) {
            return `${deal.dealId} - ${deal.company}`;
          } else if (deal.dealId) {
            return deal.dealId;
          } else if (deal.fundingRound && deal.company) {
            return `${deal.fundingRound} - ${deal.company}`;
          } else if (deal.fundingRound) {
            return deal.fundingRound;
          } else {
            return `Deal ${entityId}`;
          }
        }
        return `Deal ${entityId}`;
      default:
        return `Entity ${entityId}`;
    }
  }

  // Get entity by ID
  getEntity(entityType, entityId) {
    switch (entityType) {
      case 'company':
        return this.companies.get(entityId);
      case 'investor':
        return this.investors.get(entityId);
      case 'fund':
        return this.funds.get(entityId);
      case 'deal':
        return this.deals.get(entityId);
      default:
        return null;
    }
  }

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
