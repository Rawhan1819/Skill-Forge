#!/bin/bash

# Quiz Platform - Quick Setup Script
# This script automates the initial setup process

echo "🚀 Quiz Platform - Quick Setup"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm found: $(npm --version)${NC}"

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo -e "${YELLOW}⚠️  MySQL command not found. Please ensure MySQL is installed and running.${NC}"
    echo "Download from: https://www.mysql.com/downloads/"
else
    echo -e "${GREEN}✅ MySQL found${NC}"
fi

echo ""
echo "📦 Setting up project structure..."
echo ""

# Create directory structure if it doesn't exist
mkdir -p backend
mkdir -p frontend
mkdir -p database

echo -e "${GREEN}✅ Project directories created${NC}"

# Setup Backend
echo ""
echo "🔧 Setting up Backend..."
cd backend

if [ ! -f "package.json" ]; then
    npm init -y
    npm install express mysql2 bcrypt jsonwebtoken cors dotenv
    npm install --save-dev nodemon
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠️  package.json exists, running npm install...${NC}"
    npm install
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    cat > .env << EOF
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=quiz_platform
JWT_SECRET=$(openssl rand -base64 32)
FRONTEND_URL=http://localhost:3000
EOF
    echo -e "${GREEN}✅ .env file created${NC}"
    echo -e "${YELLOW}⚠️  Please update DB_PASSWORD in backend/.env${NC}"
else
    echo -e "${YELLOW}⚠️  .env file already exists${NC}"
fi

cd ..

# Setup Frontend
echo ""
echo "🎨 Setting up Frontend..."

if [ ! -d "frontend/node_modules" ]; then
    cd frontend
    
    # Check if it's a React app
    if [ ! -f "package.json" ]; then
        echo "Creating React app..."
        npx create-react-app .
    fi
    
    npm install lucide-react
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
    cd ..
else
    echo -e "${YELLOW}⚠️  Frontend node_modules exists${NC}"
    cd frontend
    npm install
    cd ..
fi

# Database setup instructions
echo ""
echo "🗄️  Database Setup Instructions:"
echo "================================"
echo ""
echo "1. Start MySQL server"
echo "2. Login to MySQL: mysql -u root -p"
echo "3. Create database: CREATE DATABASE quiz_platform;"
echo "4. Use database: USE quiz_platform;"
echo "5. Copy and paste the SQL schema from the artifacts"
echo ""
echo -e "${YELLOW}Would you like to create the database now? (y/n)${NC}"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo "Enter your MySQL root password:"
    mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS quiz_platform;"
    echo -e "${GREEN}✅ Database created${NC}"
    echo "Please run the schema.sql file manually to create tables"
fi

echo ""
echo "✨ Setup Complete!"
echo "=================="
echo ""
echo "Next Steps:"
echo "1. Update backend/.env with your MySQL password"
echo "2. Import the database schema (see Database Setup in README.md)"
echo "3. Start backend: cd backend && npm run dev"
echo "4. Start frontend: cd frontend && npm start"
echo ""
echo "📚 Check README.md for detailed instructions"
echo ""