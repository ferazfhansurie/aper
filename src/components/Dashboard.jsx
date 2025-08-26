import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Text,
  VStack,
  HStack,
  Heading,
  Skeleton,
  useColorModeValue,
  Image,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  Divider
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { DownloadIcon, ViewIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import APEROverview from './dashboard/APEROverview';
import InvestmentMetrics from './dashboard/InvestmentMetrics';
import GeographicDistribution from './dashboard/GeographicDistribution';
import SectorBreakdown from './dashboard/SectorBreakdown';
import RecentActivity from './dashboard/RecentActivity';
import FundPerformance from './dashboard/FundPerformance';
import VerticalHeader from './VerticalHeader';
// Import hierarchical data service
import { hierarchicalService } from '../data/sampleData';
import { importCSVDataToSampleData } from '../data/csvImportScript';

const MotionBox = motion(Box);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      console.log('🔍 Starting fetchDashboardData...');
      console.log('📊 Current service state:', {
        companies: hierarchicalService.companies.size,
        deals: hierarchicalService.deals.size,
        positions: hierarchicalService.positions.size,
        investors: hierarchicalService.investors.size,
        funds: hierarchicalService.funds.size
      });
      
      // Populate sample data if not already populated
      if (hierarchicalService.companies.size === 0) {
        console.log('🚀 No data found, importing CSV data...');
        try {
          await importCSVDataToSampleData(hierarchicalService);
          console.log('✅ Import completed!');
          
          // Small delay to ensure data is fully processed
          await new Promise(resolve => setTimeout(resolve, 100));
          
          console.log('📊 Service state after import:', {
            companies: hierarchicalService.companies.size,
            deals: hierarchicalService.deals.size,
            positions: hierarchicalService.positions.size,
            investors: hierarchicalService.investors.size,
            funds: hierarchicalService.funds.size
          });
        } catch (error) {
          console.error('❌ Import failed:', error);
          throw error;
        }
      } else {
        console.log('📋 Data already exists, skipping import');
      }

      // Get data from hierarchical service
      const deals = hierarchicalService.getDealSummaryView();
      const positions = hierarchicalService.getInvestmentPositionView();
      const companies = Array.from(hierarchicalService.companies.values());
      const investors = Array.from(hierarchicalService.investors.values());
      const funds = Array.from(hierarchicalService.funds.values());

      console.log('🔍 Data counts after import:', {
        deals: deals.length,
        positions: positions.length,
        companies: companies.length,
        investors: investors.length,
        funds: funds.length
      });

      // Debug: Check first few deals
      if (deals.length > 0) {
        console.log('💰 Sample deals:', deals.slice(0, 3).map(d => ({
          company: d.company,
          totalDealSize: d.totalDealSize,
          fundingRound: d.fundingRound
        })));
        
        // Log the full structure of the first deal
        console.log('🔍 Full structure of first deal:', JSON.stringify(deals[0], null, 2));
      }

      // Debug: Check first few positions
      if (positions.length > 0) {
        console.log('💼 Sample positions:', positions.slice(0, 3).map(p => ({
          investor: p.investor,
          company: p.company,
          positionDealSize: p.positionDealSize,
          totalDealSize: p.totalDealSize
        })));
        
        // Log the full structure of the first position
        console.log('🔍 Full structure of first position:', JSON.stringify(positions[0], null, 2));
      }

      // Calculate metrics from hierarchical data - FIXED CALCULATIONS
      const totalDealSize = deals.reduce((sum, deal) => {
        const dealSize = parseFloat(deal.totalDealSize) || 0;
        //console.log(`🔍 Deal ${deal.company}: totalDealSize=${deal.totalDealSize}, parsed=${dealSize}`);
        return sum + dealSize;
      }, 0);
      
      const avgDealSize = deals.length > 0 ? totalDealSize / deals.length : 0;
      
      // Calculate total investment value from positions
      const totalInvestmentValue = positions.reduce((sum, position) => {
        const positionSize = parseFloat(position.positionDealSize) || 0;
        //console.log(`🔍 Position ${position.investor} in ${position.company}: positionDealSize=${position.positionDealSize}, parsed=${positionSize}`);
        return sum + positionSize;
      }, 0);
      
      // Calculate cross-border vs local deals
      const crossBorderDeals = deals.filter(d => d.crossBorder === true).length;
      const localDeals = deals.filter(d => d.crossBorder === false).length;

      // Calculate sector breakdown with proper names
      const sectorData = companies.reduce((acc, company) => {
        const sector = company.industry || 'Other';
        if (!acc[sector]) {
          acc[sector] = { deals: 0, value: 0, companies: 0 };
        }
        acc[sector].companies += 1;
        
        // Find deals for this company
        const companyDeals = deals.filter(deal => deal.company === company.displayedName);
        acc[sector].deals += companyDeals.length;
        acc[sector].value += companyDeals.reduce((sum, deal) => {
          const dealSize = parseFloat(deal.totalDealSize) || 0;
          return sum + dealSize;
        }, 0);
        
        return acc;
      }, {});

      // Calculate geographic distribution with proper country names
      const geoData = companies.reduce((acc, company) => {
        const country = company.country || 'Unknown';
        if (!acc[country]) {
          acc[country] = { deals: 0, value: 0, companies: 0 };
        }
        acc[country].companies += 1;
        
        // Find deals for this company
        const companyDeals = deals.filter(deal => deal.company === company.displayedName);
        acc[country].deals += companyDeals.length;
        acc[country].value += companyDeals.reduce((sum, deal) => {
          const dealSize = parseFloat(deal.totalDealSize) || 0;
          return sum + dealSize;
        }, 0);
        
        return acc;
      }, {});

      // Generate recent activity from deals
      const recentActivity = deals
        .sort((a, b) => new Date(b.dealDate || '2024-01-01') - new Date(a.dealDate || '2024-01-01'))
        .slice(0, 4)
        .map(deal => ({
          type: 'Investment',
          name: deal.company,
          amount: (parseFloat(deal.totalDealSize) || 0) / 1000000, // Convert to millions
          date: deal.dealDate || '2024-01-01'
        }));

      // Calculate fund performance metrics with proper fund names
      const fundPerformance = funds.map(fund => {
        const fundDeals = positions.filter(pos => pos.fundName === fund.fundName);
        const totalInvested = fundDeals.reduce((sum, pos) => {
          const posSize = parseFloat(pos.positionDealSize) || 0;
          return sum + posSize;
        }, 0);
        const avgPosition = fundDeals.length > 0 ? totalInvested / fundDeals.length : 0;
        
        return {
          name: fund.fundName || fund.displayedName || 'Unknown Fund',
          irr: Math.random() * 30 + 15, // Mock IRR for demo
          multiple: Math.random() * 2 + 1.5, // Mock multiple for demo
          totalInvested,
          dealCount: fundDeals.length
        };
      }).sort((a, b) => b.irr - a.irr).slice(0, 3);

      // Calculate tech, healthcare, and real estate deals
      const techDeals = deals.filter(d => {
        const company = companies.find(c => c.displayedName === d.company);
        return company && company.industry && (
          company.industry.toLowerCase().includes('tech') ||
          company.industry.toLowerCase().includes('software') ||
          company.industry.toLowerCase().includes('ai') ||
          company.industry.toLowerCase().includes('digital')
        );
      }).length;

      const healthcareDeals = deals.filter(d => {
        const company = companies.find(c => c.displayedName === d.company);
        return company && company.industry && (
          company.industry.toLowerCase().includes('health') ||
          company.industry.toLowerCase().includes('medical') ||
          company.industry.toLowerCase().includes('biotech') ||
          company.industry.toLowerCase().includes('pharma')
        );
      }).length;

      const realEstateDeals = deals.filter(d => {
        const company = companies.find(c => c.displayedName === d.company);
        return company && company.industry && (
          company.industry.toLowerCase().includes('real') ||
          company.industry.toLowerCase().includes('property') ||
          company.industry.toLowerCase().includes('construction') ||
          company.industry.toLowerCase().includes('infrastructure')
        );
      }).length;

      console.log('Debug - Calculated values:', {
        totalDealSize,
        totalInvestmentValue,
        avgDealSize,
        crossBorderDeals,
        localDeals,
        techDeals,
        healthcareDeals,
        realEstateDeals
      });

      // Structure data for dashboard components with proper defaults
      const hierarchicalDashboardData = {
        overview: {
          totalFunds: funds.length || 0,
          totalInvestors: investors.length || 0,
          totalCompanies: companies.length || 0,
          totalDeals: deals.length || 0,
          totalAUM: totalDealSize / 1000000000 || 0, // Convert to billions
          activeFunds: funds.filter(f => f.status === 'Active').length || 0,
          raisingFunds: funds.filter(f => f.status === 'Raising').length || 0,
          closedFunds: funds.filter(f => f.status === 'Closed').length || 0
        },
        metrics: {
          avgDealSize: avgDealSize / 1000000 || 0, // Convert to millions
          avgFundSize: funds.length > 0 ? totalDealSize / funds.length / 1000000 : 0, // Convert to millions
          crossBorderDeals: crossBorderDeals || 0,
          localDeals: localDeals || 0,
          techDeals: techDeals || 0,
          healthcareDeals: healthcareDeals || 0,
          realEstateDeals: realEstateDeals || 0
        },
        geography: {
          regions: Object.entries(geoData).map(([country, data]) => ({
            name: country,
            deals: data.deals || 0,
            value: data.value / 1000000 || 0, // Convert to millions
            companies: data.companies || 0
          })).sort((a, b) => b.value - a.value).slice(0, 6)
        },
        sectors: Object.entries(sectorData).map(([sector, data]) => ({
          name: sector,
          deals: data.deals || 0,
          value: data.value / 1000000 || 0, // Convert to millions
          companies: data.companies || 0,
          growth: Math.random() * 20 + 5 // Mock growth for demo
        })).sort((a, b) => b.value - a.value).slice(0, 6),
        recentActivity: recentActivity || [],
        fundPerformance: {
          topPerformers: fundPerformance || []
        }
      };
      
      setDashboardData(hierarchicalDashboardData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set default data structure to prevent errors
      setDashboardData({
        overview: {
          totalFunds: 0,
          totalInvestors: 0,
          totalCompanies: 0,
          totalDeals: 0,
          totalAUM: 0,
          activeFunds: 0,
          raisingFunds: 0,
          closedFunds: 0
        },
        metrics: {
          avgDealSize: 0,
          avgFundSize: 0,
          crossBorderDeals: 0,
          localDeals: 0,
          techDeals: 0,
          healthcareDeals: 0,
          realEstateDeals: 0
        },
        geography: {
          regions: []
        },
        sectors: [],
        recentActivity: [],
        fundPerformance: {
          topPerformers: []
        }
      });
    } finally {
      setLoading(false);
    }
  };
 
  if (loading) {
    return (
      <Container maxW="1400px" py={8}>
        <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }} gap={6}>
          {[...Array(6)].map((_, i) => (
            <GridItem key={i}>
              <Skeleton height="300px" />
            </GridItem>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Box bg="white" minH="100vh">
      <VerticalHeader />
      <Box ml={{ base: 0, lg: "280px" }}>
        <Container maxW="1400px" py={8}>
          {/* Dashboard Grid */}
          <VStack spacing={8} align="stretch">
            
   

            {/* Original Dashboard Components */}
            {dashboardData && (
              <>
                <APEROverview data={dashboardData.overview} />
                
                <InvestmentMetrics data={dashboardData.metrics} />
                
                <GeographicDistribution data={dashboardData.geography} />
                
                <SectorBreakdown data={dashboardData.sectors} />
                
                <RecentActivity data={dashboardData.recentActivity} />
                
                <FundPerformance data={dashboardData.fundPerformance} />
              </>
            )}
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
