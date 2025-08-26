import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Text,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  Database,
  DollarSign, 
  PiggyBank, 
  Globe, 
  BarChart3
} from 'lucide-react';

const MotionCard = motion(Card);

const APEROverview = ({ data }) => {
  const bgColor = 'rgba(59, 130, 246, 0.05)';
  const borderColor = 'rgba(59, 130, 246, 0.2)';

  // Format numbers with proper rounding
  const formatNumber = (num) => {
    if (num === 0) return '0';
    if (num < 1) return num.toFixed(2);
    if (num < 10) return num.toFixed(1);
    return Math.round(num).toLocaleString();
  };

  // Format currency values
  const formatCurrency = (value) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}T`;
    } else if (value >= 1) {
      return `$${value.toFixed(1)}B`;
    } else {
      return `$${(value * 1000).toFixed(0)}M`;
    }
  };

  const StatCard = ({ title, value, subtitle, color = 'blue', badge, icon: Icon }) => (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="xl"
      backdropFilter="blur(20px)"
      _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
    >
      <CardBody p={6}>
        <VStack spacing={4} align="stretch">
          <HStack justify="center" spacing={3}>
            {Icon && (
              <Box
                p={2}
                bg={`${color}.100`}
                color={`${color}.600`}
                borderRadius="lg"
              >
                <Icon size={20} />
              </Box>
            )}
            <Text fontSize="lg" fontWeight="bold" color="blue.700" textAlign="center">
              {title}
            </Text>
          </HStack>
          
          <Stat>
            <StatNumber color="blue.600" fontSize="3xl" fontWeight="bold" textAlign="center">
              {value}
            </StatNumber>
            {subtitle && (
              <StatHelpText color="blue.500" fontSize="sm" textAlign="center">
                {subtitle}
              </StatHelpText>
            )}
            {badge && (
              <Box textAlign="center" mt={2}>
                <Badge colorScheme={badge.color || color} size="sm" variant="subtle">
                  {badge.text || badge}
                </Badge>
              </Box>
            )}
          </Stat>
        </VStack>
      </CardBody>
    </MotionCard>
  );

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Text fontSize="3xl" fontWeight="bold" color="blue.700" mb={2}>
            APER Database Overview
          </Text>
          <Text fontSize="lg" color="blue.500">
            Comprehensive view of Asia Pacific Private Equity market data
          </Text>
        </Box>

        {/* Main Stats Grid */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mb={8}>
          <StatCard
            title="Total AUM"
            value={formatCurrency(data.totalAUM)}
            subtitle="Assets under management"
            color="blue"
            icon={DollarSign}
            badge={{ text: "Growing", color: "green" }}
          />
          <StatCard
            title="Total Deals"
            value={data.totalDeals.toLocaleString()}
            subtitle="Investment transactions"
            color="purple"
            icon={Database}
            badge={{ text: "Active", color: "green" }}
          />
          <StatCard
            title="Total Companies"
            value={data.totalCompanies.toLocaleString()}
            subtitle="Portfolio companies"
            color="green"
            icon={Building2}
            badge={{ text: "Diverse", color: "blue" }}
          />
        </Grid>

  
      </VStack>
    </Box>
  );
};

export default APEROverview;
