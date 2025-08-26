import React from 'react';
import {
  VStack,
  Heading,
  Text,
  Box,
  HStack,
  Grid,
  GridItem,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionGrid = motion(Grid);

const Slide3 = () => {
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(26, 32, 44, 0.1)');

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const components = [
    {
      icon: "📊",
      title: "Dashboard Analytics",
      description: "Real-time metrics, charts, geographic distribution",
      features: ["Interactive charts", "Responsive design", "Live updates"],
      sampleData: "1,627 funds, 450 investors, 1,200 companies, 3,500 deals",
      color: "blue"
    },
    {
      icon: "👥",
      title: "Investor Management",
      description: "Investor profiles, AUM, focus areas, regional distribution",
      features: ["Search & filter", "CRUD operations", "Status tracking"],
      sampleData: "PE firms, VC funds, growth equity, family offices",
      color: "green"
    },
    {
      icon: "🏭",
      title: "Portfolio Companies",
      description: "Company details, investment amounts, industry classification",
      features: ["Multi-query system", "Export functionality", "Data validation"],
      sampleData: "Tech startups, healthcare companies, real estate firms",
      color: "purple"
    },
    {
      icon: "💰",
      title: "Deal Pipeline",
      description: "Transaction details, valuations, funding rounds, status",
      features: ["Deal tracking", "Participant management", "Timeline views"],
      sampleData: "Series A/B/C, growth equity, buyouts, exits",
      color: "orange"
    },
    {
      icon: "🌏",
      title: "Geographic Analysis",
      description: "Country/region breakdown, cross-border investments",
      features: ["Interactive maps", "Regional comparisons", "Trend analysis"],
      sampleData: "Greater China, Southeast Asia, Japan, South Korea",
      color: "teal"
    },
    {
      icon: "🏗️",
      title: "Sector Breakdown",
      description: "Industry classification, sector performance, growth trends",
      features: ["Sector-specific views", "Performance metrics", "Comparative analysis"],
      sampleData: "Technology, Healthcare, Real Estate, Infrastructure",
      color: "pink"
    }
  ];

  const overviewStats = [
    { label: "Total Funds", value: "1,627", help: "Active investment vehicles" },
    { label: "Total Investors", value: "450", help: "PE firms & institutions" },
    { label: "Total Companies", value: "1,200", help: "Portfolio companies" },
    { label: "Total Deals", value: "3,500", help: "Investment transactions" }
  ];

  return (
    <MotionVStack
      spacing={8}
      align="stretch"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <MotionBox variants={itemVariants}>
        <Heading 
          size="2xl" 
          textAlign="center" 
          bgGradient="linear(to-r, purple.600, pink.600)"
          bgClip="text"
          mb={4}
        >
          Core Components Developed
        </Heading>
        <Text fontSize="lg" textAlign="center" color={textColor}>
          What we've built so far with real data examples and features
        </Text>
      </MotionBox>

      {/* Overview Stats */}
      <MotionBox variants={itemVariants}>
        <Box
          bg="rgba(59, 130, 246, 0.1)"
          p={6}
          borderRadius="xl"
          border="1px solid rgba(59, 130, 246, 0.2)"
          backdropFilter="blur(10px)"
        >
          <Heading size="lg" color="blue.600" mb={6} textAlign="center">
            📈 System Overview - Current Data Scale
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {overviewStats.map((stat, index) => (
              <GridItem key={index}>
                <Stat textAlign="center">
                  <StatNumber fontSize="3xl" color="blue.600" fontWeight="bold">
                    {stat.value}
                  </StatNumber>
                  <StatLabel color={textColor} fontSize="lg">
                    {stat.label}
                  </StatLabel>
                  <StatHelpText color={textColor} opacity={0.8}>
                    {stat.help}
                  </StatHelpText>
                </Stat>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </MotionBox>

      {/* Core Components Grid */}
      <MotionGrid variants={itemVariants} templateColumns="repeat(2, 1fr)" gap={6}>
        {components.map((component, index) => (
          <GridItem key={index}>
            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              border="1px solid rgba(255, 255, 255, 0.2)"
              backdropFilter="blur(10px)"
              height="100%"
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-4px)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            >
              {/* Header */}
              <HStack spacing={4} mb={4}>
                <Text fontSize="4xl">{component.icon}</Text>
                <Box>
                  <Heading size="md" color={textColor} mb={1}>
                    {component.title}
                  </Heading>
                  <Badge colorScheme={component.color} variant="outline">
                    {component.features.length} Features
                  </Badge>
                </Box>
              </HStack>

              {/* Description */}
              <Text color={textColor} mb={4} fontSize="sm">
                {component.description}
              </Text>

              {/* Features */}
              <Box mb={4}>
                <Text fontWeight="bold" color={textColor} mb={2} fontSize="sm">
                  Key Features:
                </Text>
                <VStack spacing={1} align="stretch">
                  {component.features.map((feature, featureIndex) => (
                    <HStack key={featureIndex} spacing={2}>
                      <Box w={2} h={2} borderRadius="full" bg={`${component.color}.500`} />
                      <Text fontSize="xs" color={textColor} opacity={0.8}>
                        {feature}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              {/* Sample Data */}
              <Box
                bg={`${component.color}.50`}
                p={3}
                borderRadius="md"
                border={`1px solid ${component.color}.200`}
              >
                <Text fontSize="xs" color={`${component.color}.700`} fontWeight="bold" mb={1}>
                  Sample Data:
                </Text>
                <Text fontSize="xs" color={`${component.color}.600`}>
                  {component.sampleData}
                </Text>
              </Box>
            </Box>
          </GridItem>
        ))}
      </MotionGrid>

      {/* Technical Implementation */}
      <MotionBox variants={itemVariants}>
        <Box
          bg="rgba(168, 85, 247, 0.1)"
          p={6}
          borderRadius="xl"
          border="1px solid rgba(168, 85, 247, 0.2)"
          backdropFilter="blur(10px)"
        >
          <Heading size="lg" color="purple.500" mb={4} textAlign="center">
            🔧 Technical Implementation Details
          </Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <GridItem>
              <VStack spacing={2} align="center">
                <Text fontSize="2xl">⚡</Text>
                <Text fontWeight="bold" color={textColor}>Performance</Text>
                <Text fontSize="sm" color={textColor} opacity={0.8} textAlign="center">
                  React 18 concurrent features, optimized re-renders, lazy loading
                </Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack spacing={2} align="center">
                <Text fontSize="2xl">🔒</Text>
                <Text fontWeight="bold" color={textColor}>Security</Text>
                <Text fontSize="sm" color={textColor} opacity={0.8} textAlign="center">
                  JWT authentication, role-based access, data encryption, audit logging
                </Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack spacing={2} align="center">
                <Text fontSize="2xl">📱</Text>
                <Text fontWeight="bold" color={textColor}>Responsive</Text>
                <Text fontSize="sm" color={textColor} opacity={0.8} textAlign="center">
                  Mobile-first design, progressive web app features, offline support
                </Text>
              </VStack>
            </GridItem>
          </Grid>
        </Box>
      </MotionBox>
    </MotionVStack>
  );
};

export default Slide3;
