// Migration Configuration
// Update these paths and settings before running the migration

export const config = {
  // Paths to Microsoft Access files in Dummy Database folder
  accessFiles: [
    './Dummy Database/Entrepreneur_20250414.accdb',
    './Dummy Database/Institutional Investor.mdb',
    './Dummy Database/Library efile.accdb'
  ],
  
  // Output paths for schema and exports
  schemaOutputPath: './exports/schema.sql',
  csvExportPath: './exports',
  
  // Neon PostgreSQL connection string
  // Format: postgresql://username:password@host:port/database
  get neonConnectionString() {
    return process.env.DATABASE_URL || 'postgresql://username:password@host:port/database';
  },
  
  // Tables to migrate - will be auto-detected from exported CSV files
  tablesToMigrate: [], // Empty array means auto-detect all tables
  
  // Batch size for bulk inserts
  batchSize: 1000,
  
  // Logging options
  verbose: true,
  logProgress: true
};

export default config;
