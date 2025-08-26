#!/bin/bash

# Export Microsoft Access Data to CSV and Schema
# This script uses mdbtools to extract data from .accdb and .mdb files

set -e  # Exit on any error

echo "🚀 Starting Microsoft Access data export..."

# Check if mdbtools is installed
if ! command -v mdb-schema &> /dev/null; then
    echo "❌ mdbtools not found. Please install it first:"
    echo "   brew install mdbtools"
    exit 1
fi

# Create exports directory
mkdir -p exports
echo "📁 Created exports directory"

# Function to export a single Access file
export_access_file() {
    local file_path="$1"
    local file_name=$(basename "$file_path" | sed 's/\.[^.]*$//')
    
    echo "📊 Processing: $file_name"
    
    # Export schema
    echo "  📋 Exporting schema..."
    mdb-schema "$file_path" postgres > "exports/${file_name}_schema.sql" 2>/dev/null || {
        echo "  ⚠️  Warning: Could not export schema for $file_name"
    }
    
    # Get list of tables
    local tables=$(mdb-tables -1 "$file_path" 2>/dev/null || echo "")
    
    if [ -z "$tables" ]; then
        echo "  ⚠️  No tables found in $file_name"
        return
    fi
    
    # Export each table to CSV
    echo "  📤 Exporting tables to CSV..."
    for table in $tables; do
        # Clean table name (remove spaces and special chars)
        local clean_table=$(echo "$table" | sed 's/[^a-zA-Z0-9_]/_/g')
        
        echo "    - $table -> ${clean_table}.csv"
        mdb-export "$file_path" "$table" > "exports/${clean_table}.csv" 2>/dev/null || {
            echo "    ⚠️  Warning: Could not export table $table"
        }
    done
    
    echo "  ✅ Completed export for $file_name"
}

# Process each Access file
for file in "./Dummy Database"/*.{accdb,mdb}; do
    if [ -f "$file" ]; then
        export_access_file "$file"
        echo ""
    fi
done

# Combine all schema files into one
echo "🔗 Combining schema files..."
cat exports/*_schema.sql > exports/schema.sql 2>/dev/null || {
    echo "⚠️  Warning: Could not combine schema files"
}

# Clean up individual schema files
rm -f exports/*_schema.sql

echo ""
echo "🎉 Export completed!"
echo "📁 Check the 'exports' directory for:"
echo "   - schema.sql (combined database schema)"
echo "   - *.csv files (table data)"
echo ""
echo "Next step: Run 'node migrate.js' to import data into Neon PostgreSQL"
