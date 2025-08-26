#!/bin/bash

# Setup script for Microsoft Access to Neon migration

echo "🚀 Setting up Microsoft Access to Neon migration..."

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew not found. Please install it first:"
    echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    exit 1
fi

# Install mdbtools
echo "📦 Installing mdbtools..."
brew install mdbtools

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Make export script executable
echo "🔧 Making export script executable..."
chmod +x export-access-data.sh

# Create exports directory
echo "📁 Creating exports directory..."
mkdir -p exports

# Copy environment file
if [ ! -f .env ]; then
    echo "📋 Copying environment file..."
    cp env.example .env
    echo "⚠️  Please edit .env and add your Neon database connection string"
else
    echo "✅ Environment file already exists"
fi

echo ""
echo "🎉 Setup completed!"
echo ""
echo "Next steps:"
echo "1. Edit .env and add your Neon database connection string"
echo "2. Run: ./export-access-data.sh"
echo "3. Run: node migrate.js"
echo ""
echo "For detailed instructions, see MIGRATION_README.md"
