# Microsoft Access to Neon PostgreSQL Migration

This setup allows you to migrate data from Microsoft Access (.accdb/.mdb) files to your Neon PostgreSQL database using Mac-compatible tools.

## Prerequisites

### 1. Install mdbtools
```bash
brew install mdbtools
```

### 2. Install Node.js dependencies
```bash
npm install
```

### 3. Set up Neon PostgreSQL
- Create a Neon account at [neon.tech](https://neon.tech)
- Create a new project and database
- Get your connection string

## Configuration

### 1. Environment Setup
Copy the environment file and update it with your Neon credentials:
```bash
cp env.example .env
```

Edit `.env` and add your Neon connection string:
```bash
NEON_DATABASE_URL=postgresql://username:password@host:port/database
```

### 2. Migration Configuration
Edit `migration.config.js` to customize:
- Paths to your Access files
- Tables to migrate
- Batch size for inserts
- Output directories

## Migration Process

### Step 1: Export Access Data
Run the export script to extract data from your Access files:
```bash
chmod +x export-access-data.sh
./export-access-data.sh
```

This will:
- Create an `exports/` directory
- Export schema from each Access file to `schema.sql`
- Export each table to individual CSV files

### Step 2: Import to Neon
Run the migration script to import data into Neon:
```bash
node migrate.js
```

The script will:
- Connect to your Neon database
- Create tables based on the exported schema
- Import CSV data in batches
- Log progress and any errors

## File Structure

```
├── migration.config.js      # Migration configuration
├── migrate.js              # Main migration script
├── export-access-data.sh   # Access data export script
├── env.example             # Environment variables template
├── exports/                # Generated exports (created by export script)
│   ├── schema.sql         # Combined database schema
│   ├── table1.csv         # Table data exports
│   └── table2.csv
└── Dummy Database/         # Your Access files
    ├── Entrepreneur_20250414.accdb
    ├── Institutional Investor.mdb
    └── Library efile.accdb
```

## Troubleshooting

### Common Issues

1. **mdbtools not found**
   ```bash
   brew install mdbtools
   ```

2. **Connection failed to Neon**
   - Check your connection string in `.env`
   - Verify your Neon database is running
   - Check firewall/network settings

3. **Permission denied on export script**
   ```bash
   chmod +x export-access-data.sh
   ```

4. **CSV parsing errors**
   - Check CSV file encoding (should be UTF-8)
   - Verify CSV files were created properly
   - Check for special characters in data

### Debug Mode

Enable verbose logging in `migration.config.js`:
```javascript
verbose: true,
logProgress: true
```

## Data Types

The migration script automatically infers data types:
- **Numbers**: INTEGER or DECIMAL
- **Dates**: DATE (YYYY-MM-DD format)
- **Booleans**: BOOLEAN (true/false)
- **Text**: TEXT (default)

## Performance Tips

- Adjust `batchSize` in config for optimal performance
- Use smaller batches (100-500) for large tables
- Monitor Neon database performance during migration
- Consider running during off-peak hours

## Security Notes

- Never commit `.env` files to version control
- Use environment variables for sensitive data
- Consider using Neon's connection pooling for production
- Validate data before migration in production

## Support

If you encounter issues:
1. Check the console output for error messages
2. Verify all prerequisites are installed
3. Check file permissions and paths
4. Review the migration logs for specific errors
