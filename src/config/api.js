// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  // Dashboard and Migration
  DASHBOARD: `${API_BASE_URL}/api/dashboard`,
  MIGRATION_STATS: `${API_BASE_URL}/api/migration-stats`,
  SCHEMA: `${API_BASE_URL}/api/schema`,
  
  // Core Data
  INVESTORS: `${API_BASE_URL}/api/investors`,
  INVESTEES: `${API_BASE_URL}/api/investees`,
  DEALS: `${API_BASE_URL}/api/deals`,
  SEARCH: `${API_BASE_URL}/api/search`,
  
  // Research and Sheets (legacy endpoints)
  SHEETS_SAVE: `${API_BASE_URL}/api/sheets/save`,
  SHEETS_UPDATE: `${API_BASE_URL}/api/sheets/update`,
  SHEETS_RESULTS: `${API_BASE_URL}/api/sheets/results`,
  RESEARCH: `${API_BASE_URL}/api/research`,
  CHAT: `${API_BASE_URL}/api/chat`,
  RESULTS: `${API_BASE_URL}/api/results`,
  FIELDS_CONFIG: `${API_BASE_URL}/api/fields/config`,
};

export default API_ENDPOINTS;
