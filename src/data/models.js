// Hierarchical Data Structure Models
// Based on Microsoft Access system transition

// Company Entity (Form 1a)
export const CompanyModel = {
  id: null, // Unique identifier
  identification: '', // Alternative ID
  company: '', // Company name
  chineseName: '', // Company name in Chinese
  displayedName: '', // Name displayed in database
  address1: '',
  address2: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  registeredAddress: '',
  localAddress: '', // Address in local language
  email: '',
  website: '',
  telCountryCode: '',
  tel: '',
  faxCountryCode: '',
  fax: '',
  listingStatus: '', // Listed, Unlisted, Private-to-public, Delisted
  stockCode: '',
  stockExchange: '',
  listedCountry: '',
  listedDate: '',
  delisted: false,
  delistedDate: '',
  industry: '', // Industry classification
  techCategory: '', // Tech (IT related only)
  aiCategory: '', // Artificial Intelligence Deal
  semiconductorCategory: '', // Semiconductor Deal
  batteryCategory: '', // Battery Deal
  evCategory: '', // Electric Vehicle Deal
  realEstateCategory: '', // Real Assets
  healthcareCategory: '', // Healthcare Deal
  sriFocus: '', // SRI Focus
  remarks: '',
  establishedYear: '',
  establishedMonth: '',
  background: '', // Company description
  includeInStockWatch: false,
  controllingStake: false,
  internetRelated: false,
  ecommerce: false,
  infrastructureDeal: false,
  realEstateDeal: false,
  // Metadata
  dateEntered: '',
  lastModified: '',
  updatedBy: ''
};

// Deal Entity (Investment Round)
export const DealModel = {
  id: null, // Unique identifier
  dealId: '', // Deal ID for reference
  companyId: null, // Link to Company
  // Deal Information
  disclosureDate: '', // When deal was disclosed
  disclosureMonth: '',
  disclosureYear: '',
  expectedCompletionDate: '',
  completionDate: '', // When deal was completed
  completionMonth: '',
  completionYear: '',
  fundingRound: '', // Series A, B, C, Buyout, Growth Equity, etc.
  stage: '', // Stage of Investment
  // Deal Size
  localCurrency: '',
  dealSize: 0, // Total deal size in local currency
  dealSizeUSD: 0, // Deal size in USD
  dealSizeType: '', // Range, Exact, etc.
  // Source information
  dealSizeSource: '',
  // Metadata
  dateEntered: '',
  lastModified: '',
  updatedBy: '',
  // Calculated fields
  totalPositions: 0,
  totalInvestors: 0
};

// Investment Position Entity (Individual Investor Stake)
export const InvestmentPositionModel = {
  id: null, // Unique identifier
  dealId: null, // Link to Deal
  companyId: null, // Link to Company
  investorId: null, // Link to Investor
  // Position Details
  positionDealSize: 0, // This investor's portion of the deal
  positionDealSizeUSD: 0, // Position size in USD
  equityStake: 0, // Percentage stake acquired
  equityStakeSource: '',
  // Investor Classification
  investorType: '', // PE, VC, Corporate, Institutional, etc.
  leadInvestor: false, // Is this the lead investor?
  // Deal Characteristics
  syndication: false, // Part of a syndicate?
  crossBorder: false, // Cross-border investment?
  local: false, // Local investor
  asia: false, // Asia-based investor
  foreign: false, // Foreign investor
  jointVenture: false, // Joint venture structure
  // Fund Information
  fundId: null, // Link to specific fund
  fundName: '',
  // Geographic Information
  investeeLocationAtInvestment: '', // Company location when investment was made
  // Metadata
  dateEntered: '',
  lastModified: '',
  updatedBy: ''
};

// Investor Entity (Form 4a)
export const InvestorModel = {
  id: null, // Unique identifier
  investorName: '', // English name
  chineseName: '', // Chinese name
  displayedName: '', // Name displayed in database
  legalName: '', // Legal entity name
  // Contact Information
  website: '',
  email: '',
  phone: '',
  // Origin & Location
  originCountry: '',
  // Firm Information
  firmCategory: '', // PE Firm, VC Firm, Corporate, etc.
  firmLocation: '', // Primary office location
  firmParentLocation: '', // Parent company location
  subsidiaryOf: null, // Link to parent investor
  // Investment Focus
  investmentFocus: '', // Primary investment focus
  geographicFocus: '', // Geographic investment focus
  industryFocus: '', // Industry focus areas
  // Fund Information
  fundCount: 0, // Number of funds managed
  totalAUM: 0, // Assets under management
  currency: 'USD',
  // Status
  status: 'Active', // Active, Inactive, etc.
  // Metadata
  founded: '',
  dateEntered: '',
  lastModified: '',
  updatedBy: '',
  remarks: ''
};

// Fund Entity
export const FundModel = {
  id: null, // Unique identifier
  fundName: '',
  displayedName: '',
  chineseName: '',
  fundMgtCompany: '',
  displayedMgtCompany: '',
  // Fund Details
  country: '',
  inceptionDate: '',
  category: '', // Venture Capital, Buyout, Growth, etc.
  geoFocus: '', // Geographic focus
  fundLife: '', // Fund life in years
  targetSize: 0, // Target fund size
  currency: 'USD',
  status: '', // Raising, Closed, etc.
  // Industry Focus
  industryFocus: '',
  sriFocus: '',
  // Financial Information
  capitalDeployed: 0,
  capitalAvailable: 0,
  vintageYear: '',
  // Metadata
  remarks: '',
  dateEntered: '',
  lastModified: '',
  updatedBy: ''
};

// Valuation Entity
export const ValuationModel = {
  id: null, // Unique identifier
  companyId: null, // Link to Company
  dealId: null, // Link to Deal (if applicable)
  // Valuation Details
  valuationDate: '',
  enterpriseValue: 0, // Enterprise value
  equityValue: 0, // Equity value
  currency: 'USD',
  // Valuation Ratios
  revenueRatio: 0, // P/R ratio
  ebitdaRatio: 0, // EV/EBITDA ratio
  ebitRatio: 0, // P/EBIT ratio
  peRatio: 0, // P/E ratio
  bookValueRatio: 0, // P/BV ratio
  // Source Information
  valuationSource: '',
  // Metadata
  remarks: '',
  dateEntered: '',
  lastModified: '',
  updatedBy: ''
};

// Relationship Models
export const CompanyDealLink = {
  id: null,
  companyId: null,
  dealId: null,
  relationshipType: 'primary' // primary, secondary, etc.
};

export const DealPositionLink = {
  id: null,
  dealId: null,
  positionId: null,
  relationshipType: 'primary' // primary, secondary, etc.
};

export const InvestorPositionLink = {
  id: null,
  investorId: null,
  positionId: null,
  relationshipType: 'primary' // primary, secondary, etc.
};

export const FundInvestorLink = {
  id: null,
  fundId: null,
  investorId: null,
  relationshipType: 'LP' // LP, GP, etc.
};

// Query Models for Different Perspectives
export const DealSummaryView = {
  // From Perspective of Deal - Every Deal is 1 row
  dealId: '',
  company: '',
  fundingRound: '',
  totalDealSize: 0,
  allInvestors: [], // Array of investor names
  dealDate: '',
  stage: '',
  industry: '',
  country: ''
};

export const InvestmentPositionView = {
  // From Perspective of Investment Position - Every Investment Position is 1 row
  investor: '',
  totalDealSize: 0, // Total deal size
  positionDealSize: 0, // This investor's portion
  company: '',
  fundingRound: '',
  dealDate: '',
  stage: '',
  industry: '',
  country: '',
  leadInvestor: false,
  equityStake: 0
};

// Data Type Definitions (as per Access system)
export const DataTypes = {
  TYPE_A: 'Text/date/numeric info', // Free-form input
  TYPE_B: 'Classification - reference to another table for dropdown options' // Lookup/reference
};

// Form Associations (as per Access system)
export const FormAssociations = {
  FORM_1A: 'Company update form',
  FORM_4A: 'Investor Name update form'
};

export default {
  CompanyModel,
  DealModel,
  InvestmentPositionModel,
  InvestorModel,
  FundModel,
  ValuationModel,
  CompanyDealLink,
  DealPositionLink,
  InvestorPositionLink,
  FundInvestorLink,
  DealSummaryView,
  InvestmentPositionView,
  DataTypes,
  FormAssociations
};
