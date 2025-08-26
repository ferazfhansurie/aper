import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const client = neon(process.env.DATABASE_URL);

// Database operations
export class DatabaseService {
  // Get all investors
  static async getInvestors() {
    try {
      const result = await client('SELECT * FROM investor_profile LIMIT 100');
      return result.map(row => ({
        id: row.id || row.investor_id || row.ID,
        name: row.investor_name || row.name || row.Name || 'N/A',
        type: row.investor_type || row.type || 'N/A',
        region: row.region || row.geography || 'N/A',
        aum: row.aum || row.assets_under_management || 'N/A',
        focus: row.focus || row.investment_focus || 'N/A',
        status: row.status || 'Active',
        createdAt: row.created_at || row.date_entered || 'N/A'
      }));
    } catch (error) {
      console.error('Error fetching investors:', error);
      return [];
    }
  }

  // Get all investees
  static async getInvestees() {
    try {
      const result = await client('SELECT * FROM company LIMIT 100');
      return result.map(row => ({
        id: row.id || row.company_id || row.ID,
        name: row.company_name || row.name || row.Name || 'N/A',
        chineseName: row.chinese_name || row.chineseName || 'N/A',
        industry: row.industry || row.sector || 'N/A',
        location: row.location || row.country || row.region || 'N/A',
        website: row.website || row.url || 'N/A',
        status: row.status || 'Portfolio Company',
        investmentDate: row.investment_date || row.date_entered || 'N/A',
        investmentAmount: row.investment_amount || row.amount || 'N/A',
        investorId: row.investor_id || 'N/A',
        description: row.description || row.remarks || 'N/A'
      }));
    } catch (error) {
      console.error('Error fetching investees:', error);
      return [];
    }
  }

  // Get all deals
  static async getDeals() {
    try {
      const result = await client('SELECT * FROM firm_location LIMIT 100');
      return result.map(row => ({
        id: row.id || row.firm_id || row.ID,
        dealName: row.firm_name || row.name || row.Name || 'N/A',
        investorId: row.investor_id || 'N/A',
        investeeId: row.company_id || 'N/A',
        dealType: row.deal_type || row.type || 'N/A',
        dealSize: row.deal_size || row.amount || 'N/A',
        dealDate: row.deal_date || row.date_entered || 'N/A',
        valuation: row.valuation || 'N/A',
        status: row.status || 'Active',
        sector: row.sector || row.industry || 'N/A',
        region: row.region || row.country || 'N/A'
      }));
    } catch (error) {
      console.error('Error fetching deals:', error);
      return [];
    }
  }

  // Get investee by ID
  static async getInvesteeById(id) {
    try {
      const result = await client('SELECT * FROM company WHERE id = $1 OR company_id = $1 OR ID = $1 LIMIT 1', [id]);
      if (result.length === 0) return null;
      
      const row = result[0];
      return {
        id: row.id || row.company_id || row.ID,
        name: row.company_name || row.name || row.Name || 'N/A',
        chineseName: row.chinese_name || row.chineseName || 'N/A',
        industry: row.industry || row.sector || 'N/A',
        location: row.location || row.country || row.region || 'N/A',
        website: row.website || row.url || 'N/A',
        status: row.status || 'Portfolio Company',
        investmentDate: row.investment_date || row.date_entered || 'N/A',
        investmentAmount: row.investment_amount || row.amount || 'N/A',
        investorId: row.investor_id || 'N/A',
        description: row.description || row.remarks || 'N/A'
      };
    } catch (error) {
      console.error('Error fetching investee by ID:', error);
      return null;
    }
  }

  // Get investor by ID
  static async getInvestorById(id) {
    try {
      const result = await client('SELECT * FROM investor_profile WHERE id = $1 OR investor_id = $1 OR ID = $1 LIMIT 1', [id]);
      if (result.length === 0) return null;
      
      const row = result[0];
      return {
        id: row.id || row.investor_id || row.ID,
        name: row.investor_name || row.name || row.Name || 'N/A',
        type: row.investor_type || row.type || 'N/A',
        region: row.region || row.geography || 'N/A',
        aum: row.aum || row.assets_under_management || 'N/A',
        focus: row.focus || row.investment_focus || 'N/A',
        status: row.status || 'Active',
        createdAt: row.created_at || row.date_entered || 'N/A'
      };
    } catch (error) {
      console.error('Error fetching investor by ID:', error);
      return null;
    }
  }

  // Get deal by ID
  static async getDealById(id) {
    try {
      const result = await client('SELECT * FROM firm_location WHERE id = $1 OR firm_id = $1 OR ID = $1 LIMIT 1', [id]);
      if (result.length === 0) return null;
      
      const row = result[0];
      return {
        id: row.id || row.firm_id || row.ID,
        dealName: row.firm_name || row.name || row.Name || 'N/A',
        investorId: row.investor_id || 'N/A',
        investeeId: row.company_id || 'N/A',
        dealType: row.deal_type || row.type || 'N/A',
        dealSize: row.deal_size || row.amount || 'N/A',
        dealDate: row.deal_date || row.date_entered || 'N/A',
        valuation: row.valuation || 'N/A',
        status: row.status || 'Active',
        sector: row.sector || row.industry || 'N/A',
        region: row.region || row.country || 'N/A'
      };
    } catch (error) {
      console.error('Error fetching deal by ID:', error);
      return null;
    }
  }

  // Search across all entities
  static async search(query) {
    try {
      const results = [];
      const searchTerm = query.toLowerCase();
      
      // Search investors
      const investors = await client('SELECT * FROM investor_profile LIMIT 50');
      investors.forEach(investor => {
        if (Object.values(investor).some(value => 
          String(value).toLowerCase().includes(searchTerm)
        )) {
          results.push({ 
            ...investor, 
            type: 'investor',
            displayName: investor.investor_name || investor.name || investor.Name || 'N/A'
          });
        }
      });
      
      // Search investees
      const investees = await client('SELECT * FROM company LIMIT 50');
      investees.forEach(investee => {
        if (Object.values(investee).some(value => 
          String(value).toLowerCase().includes(searchTerm)
        )) {
          results.push({ 
            ...investee, 
            type: 'investee',
            displayName: investee.company_name || investee.name || investee.Name || 'N/A'
          });
        }
      });
      
      // Search deals
      const deals = await client('SELECT * FROM firm_location LIMIT 50');
      deals.forEach(deal => {
        if (Object.values(deal).some(value => 
          String(value).toLowerCase().includes(searchTerm)
        )) {
          results.push({ 
            ...deal, 
            type: 'deal',
            displayName: deal.firm_name || deal.name || deal.Name || 'N/A'
          });
        }
      });
      
      return results.slice(0, 20); // Limit results
    } catch (error) {
      console.error('Error searching:', error);
      return [];
    }
  }

  // Get dashboard statistics
  static async getDashboardStats() {
    try {
      // Get real counts from migrated database
      const investorCount = await client('SELECT COUNT(*) as count FROM investor_profile');
      const companyCount = await client('SELECT COUNT(*) as count FROM company');
      const firmLocationCount = await client('SELECT COUNT(*) as count FROM firm_location');
      const factivaCount = await client('SELECT COUNT(*) as count FROM factiva_data');
      const doculibraryCount = await client('SELECT COUNT(*) as count FROM doculibrary');
      
      // Get recent data for charts
      const recentFirms = await client('SELECT * FROM firm_location ORDER BY id DESC LIMIT 5');
      const recentInvestors = await client('SELECT * FROM investor_profile ORDER BY id DESC LIMIT 5');
      
      // Get sector distribution from firm_location
      const sectors = await client('SELECT sector, COUNT(*) as count FROM firm_location WHERE sector IS NOT NULL GROUP BY sector ORDER BY count DESC LIMIT 5');
      
      // Get regional distribution
      const regions = await client('SELECT region, COUNT(*) as count FROM firm_location WHERE region IS NOT NULL GROUP BY region ORDER BY count DESC LIMIT 5');
      
      return {
        totalInvestors: parseInt(investorCount[0]?.count || 0),
        totalInvestees: parseInt(companyCount[0]?.count || 0),
        totalDeals: parseInt(firmLocationCount[0]?.count || 0),
        totalInvestment: 'Migrated Data',
        migratedTables: 116,
        totalRows: parseInt(investorCount[0]?.count || 0) + parseInt(companyCount[0]?.count || 0) + parseInt(firmLocationCount[0]?.count || 0),
        factivaRecords: parseInt(factivaCount[0]?.count || 0),
        doculibraryRecords: parseInt(doculibraryCount[0]?.count || 0),
        recentDeals: recentFirms.map(row => ({
          id: row.id || row.firm_id || row.ID,
          dealName: row.firm_name || row.name || row.Name || 'N/A',
          dealSize: row.deal_size || row.amount || 'N/A',
          dealDate: row.deal_date || row.date_entered || 'N/A',
          status: row.status || 'Active'
        })),
        topSectors: sectors.map(row => ({ sector: row.sector || 'Unknown', count: parseInt(row.count) })),
        regionalDistribution: regions.map(row => ({ region: row.region || 'Unknown', count: parseInt(row.count) }))
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        totalInvestors: 0,
        totalInvestees: 0,
        totalDeals: 0,
        totalInvestment: 'Error',
        migratedTables: 0,
        totalRows: 0,
        factivaRecords: 0,
        doculibraryRecords: 0,
        recentDeals: [],
        topSectors: [],
        regionalDistribution: []
      };
    }
  }

  // Get migration statistics
  static async getMigrationStats() {
    try {
      const tables = await client(`
        SELECT tablename, 
               (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.tablename AND table_schema = 'public') as column_count
        FROM pg_tables t 
        WHERE schemaname = 'public' 
        ORDER BY tablename
      `);
      
      const tableStats = await Promise.all(
        tables.map(async (table) => {
          try {
            const countResult = await client(`SELECT COUNT(*) as count FROM "${table.tablename}"`);
            return {
              name: table.tablename,
              columns: parseInt(table.column_count),
              rows: parseInt(countResult[0]?.count || 0)
            };
          } catch (error) {
            return {
              name: table.tablename,
              columns: parseInt(table.column_count),
              rows: 0
            };
          }
        })
      );
      
      return {
        totalTables: tables.length,
        tablesWithData: tableStats.filter(t => t.rows > 0).length,
        totalRows: tableStats.reduce((sum, t) => sum + t.rows, 0),
        tableDetails: tableStats.slice(0, 20) // Show first 20 tables
      };
    } catch (error) {
      console.error('Error fetching migration stats:', error);
      return {
        totalTables: 0,
        tablesWithData: 0,
        totalRows: 0,
        tableDetails: []
      };
    }
  }

  // Get schema information
  static async getSchemaInfo() {
    try {
      // Get basic table information
      const tables = await client(`
        SELECT tablename, 
               (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.tablename AND table_schema = 'public') as column_count
        FROM pg_tables t 
        WHERE schemaname = 'public' 
        ORDER BY tablename
      `);
      
      return {
        totalTables: tables.length,
        tables: tables.map(table => ({
          name: table.tablename,
          columns: parseInt(table.column_count)
        }))
      };
    } catch (error) {
      console.error('Error fetching schema info:', error);
      return {
        totalTables: 0,
        tables: []
      };
    }
  }
}
