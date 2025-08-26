# APER Data Centralization Portal

A modern, sleek database portal designed for Asia Private Equity Centre Limited (APER) to centralize and manage investment data across the Asia Pacific region.

## 🚀 Features

### Core Functionality
- **Centralized Database**: PostgreSQL-ready architecture with dummy data for demo
- **Investor Management**: Track private equity firms, venture capital, and growth equity investors
- **Portfolio Companies**: Manage investee information with industry and location data
- **Deal Pipeline**: Monitor investment deals, valuations, and status tracking
- **Global Search**: Cross-entity search across investors, companies, and deals
- **Analytics Dashboard**: Visual charts and statistics for data insights

### Design Features
- **Glassmorphic UI**: Modern, translucent design with backdrop blur effects
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Dark Theme**: Elegant dark gradient background with high contrast elements

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Chakra UI**: Component library with custom glassmorphic theme
- **Framer Motion**: Smooth animations and transitions
- **React Router**: Client-side routing for SPA experience
- **Recharts**: Data visualization and charting library
- **Lucide React**: Modern icon library

### Backend
- **Node.js**: Server runtime environment
- **Express.js**: Web application framework
- **CORS**: Cross-origin resource sharing support
- **Modular Architecture**: Clean separation of concerns

### Database (Demo)
- **Dummy Data Service**: Simulated database with realistic investment data
- **PostgreSQL Ready**: Architecture designed for Neon database integration
- **RESTful API**: Clean API endpoints for all data operations

## 📊 Data Structure

### Investors
- ID, Name, Type (PE/VC/Growth Equity)
- Region, AUM, Focus Areas, Status
- Creation Date

### Portfolio Companies (Investees)
- ID, Company Name (English & Chinese)
- Industry, Location, Website
- Investment Amount, Date, Status
- Description

### Deals
- Deal ID, Name, Type (Series A/B/C, Growth Equity)
- Sector, Size, Valuation, Status
- Region, Date, Investor & Investee IDs

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd research
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the application**
   ```bash
   npm run build
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - API Health: http://localhost:3000/health

### Development Mode

For development with hot reloading:
```bash
npm run dev
```

## 📁 Project Structure

```
research/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx          # Main dashboard with charts
│   │   ├── Navigation.jsx         # Navigation component
│   │   ├── Investors.jsx          # Investor management
│   │   ├── Investees.jsx          # Portfolio companies
│   │   ├── Deals.jsx              # Deal pipeline
│   │   └── SearchResults.jsx      # Global search results
│   ├── App.jsx                    # Main application component
│   └── main.jsx                   # Application entry point
├── server/
│   ├── index.mjs                  # Express server
│   ├── routes/
│   │   └── api.mjs                # API endpoints
│   └── services/
│       └── database.mjs           # Database service (dummy data)
├── dist/                          # Built application
└── package.json                   # Dependencies and scripts
```

## 🔌 API Endpoints

### Dashboard
- `GET /api/dashboard` - Dashboard statistics and metrics

### Investors
- `GET /api/investors` - List all investors
- `GET /api/investors/:id` - Get investor by ID

### Portfolio Companies
- `GET /api/investees` - List all investees
- `GET /api/investees/:id` - Get investee by ID

### Deals
- `GET /api/deals` - List all deals
- `GET /api/deals/:id` - Get deal by ID

### Search
- `GET /api/search?q=<query>` - Search across all entities

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradients (#667eea to #764ba2)
- **Glassmorphic**: rgba(255, 255, 255, 0.1) with backdrop blur
- **Accents**: Blue, Green, Purple, Teal for different entity types

### Typography
- **Font**: Inter (system fallback)
- **Headings**: Bold, white text
- **Body**: Regular weight with opacity variations

### Components
- **Cards**: Translucent with subtle borders
- **Buttons**: Ghost variants with hover effects
- **Tables**: Clean, readable data presentation
- **Modals**: Consistent with main design theme

## 🔮 Future Enhancements

### Phase 2 - Production Database
- **Neon PostgreSQL**: Real database integration
- **Data Migration**: Import existing APER data
- **User Authentication**: Role-based access control
- **Data Validation**: Input validation and sanitization

### Phase 3 - AI Research Assistant
- **Natural Language Queries**: AI-powered data exploration
- **Insight Generation**: Automated report generation
- **Predictive Analytics**: Investment trend analysis
- **Integration**: Embed into existing APER website

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet**: Adaptive layouts for medium screens
- **Desktop**: Full-featured experience with charts
- **Touch Friendly**: Optimized for touch interactions

## 🚀 Performance Features

- **Code Splitting**: Dynamic imports for better performance
- **Lazy Loading**: Components load on demand
- **Optimized Builds**: Vite for fast development and builds
- **Efficient Rendering**: React optimization techniques

## 🔒 Security Considerations

- **CORS Configuration**: Proper cross-origin handling
- **Input Validation**: Server-side data validation
- **API Rate Limiting**: Protection against abuse
- **Secure Headers**: Security best practices

## 📈 Analytics & Monitoring

- **Health Checks**: `/health` endpoint for monitoring
- **Error Handling**: Comprehensive error logging
- **Performance Metrics**: Response time tracking
- **User Analytics**: Usage pattern analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software developed for APER.

## 📞 Support

For technical support or questions, please contact the development team.

---

**Built with ❤️ for APER Data Centralization Initiative**
