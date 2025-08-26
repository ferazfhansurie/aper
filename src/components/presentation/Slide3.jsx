import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Badge,
  Icon,
  useColorModeValue,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Building2, 
  DollarSign, 
  Globe,
  PieChart,
  TrendingUp,
  Search
} from 'lucide-react';

const MotionBox = motion(Box);

const Slide3 = () => {
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.1)');
  const borderColor = useColorModeValue('rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)');

  const components = [
    {
      name: "Dashboard Analytics",
      icon: BarChart3,
      description: "Real-time metrics, charts, geographic distribution",
      features: ["Interactive charts", "Responsive design", "Live updates"],
      sampleData: "1,627 funds, 450 investors, 1,200 companies, 3,500 deals",
      color: "blue"
    },
    {
      name: "Investor Management",
      icon: Users,
      description: "Investor profiles, AUM, focus areas, regional distribution",
      features: ["Search & filter", "CRUD operations", "Status tracking"],
      sampleData: "PE firms, VC funds, growth equity, family offices",
      color: "green"
    },
    {
      name: "Portfolio Companies",
      icon: Building2,
      description: "Company details, investment amounts, industry classification",
      features: ["Multi-query system", "Export functionality", "Data validation"],
      sampleData: "Tech startups, healthcare companies, real estate firms",
      color: "purple"
    },
    {
      name: "Deal Pipeline",
      icon: DollarSign,
      description: "Transaction details, valuations, funding rounds, status",
      features: ["Deal tracking", "Participant management", "Timeline views"],
      sampleData: "Series A/B/C, growth equity, buyouts, exits",
      color: "orange"
    },
    {
      name: "Geographic Analysis",
      icon: Globe,
      description: "Country/region breakdown, cross-border investments",
      features: ["Interactive maps", "Regional comparisons", "Trend analysis"],
      sampleData: "Greater China, Southeast Asia, Japan, South Korea",
      color: "teal"
    },
    {
      name: "Sector Breakdown",
      icon: PieChart,
      description: "Industry classification, sector performance, growth trends",
      features: ["Sector-specific views", "Performance metrics", "Comparative analysis"],
      sampleData: "Technology, Healthcare, Real Estate, Infrastructure",
      color: "pink"
    }
  ];

  const stats = [
    { label: "Total Funds", value: "1,627", help: "Active investment vehicles" },
    { label: "Total Investors", value: "450", help: "PE firms & institutions" },
    { label: "Portfolio Companies", value: "1,200", help: "Investee companies" },
    { label: "Total Deals", value: "3,500", help: "Investment transactions" }
  ];

  return (
    <Box
      bg={bgColor}
      backdropFilter="blur(20px)"
      border="1px solid"
      borderColor={borderColor}
      borderRadius="2xl"
      p={8}
      minH="600px"
    >
      <VStack spacing={8} w="full" align="stretch">
        {/* Header */}
        <VStack spacing={4}>
          <Heading
            size="2xl"
            color="white"
            textAlign="center"
            fontWeight="bold"
          >
            Core Components Developed
          </Heading>
          <Text
            fontSize="lg"
            color="white"
            opacity={0.9}
            textAlign="center"
            maxW="800px"
          >
            Modern React web portal with comprehensive data management and analytics capabilities
          </Text>
        </VStack>

        {/* Key Statistics */}
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {stats.map((stat, index) => (
            <GridItem key={index}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                bg="rgba(255, 255, 255, 0.05)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                borderRadius="xl"
                p={6}
                textAlign="center"
              >
                <Stat>
                  <StatNumber color="white" fontSize="3xl" fontWeight="bold">
                    {stat.value}
                  </StatNumber>
                  <StatLabel color="white" opacity={0.9}>
                    {stat.label}
                  </StatLabel>
                  <StatHelpText color="white" opacity={0.7}>
                    {stat.help}
                  </StatHelpText>
                </Stat>
              </MotionBox>
            </GridItem>
          ))}
        </Grid>

        {/* Components Grid */}
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {components.map((component, index) => (
            <GridItem key={index}>
              <MotionBox
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                bg="rgba(255, 255, 255, 0.05)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                borderRadius="xl"
                p={6}
                h="full"
              >
                <VStack spacing={4} align="stretch" h="full">
                  <HStack spacing={3}>
                    <Icon 
                      as={component.icon} 
                      color={`${component.color}.300`} 
                      boxSize={8} 
                    />
                    <Heading size="md" color="white">
                      {component.name}
                    </Heading>
                  </HStack>
                  
                  <Text color="white" opacity={0.9}>
                    {component.description}
                  </Text>
                  
                  <VStack spacing={2} align="stretch">
                    <Text color="white" fontWeight="semibold" fontSize="sm">
                      Features:
                    </Text>
                    {component.features.map((feature, featureIndex) => (
                      <Text
                        key={featureIndex}
                        color="white"
                        opacity={0.8}
                        fontSize="sm"
                        pl={4}
                      >
                        • {feature}
                      </Text>
                    ))}
                  </VStack>
                  
                  <VStack spacing={2} align="stretch" mt="auto">
                    <Text color="white" fontWeight="semibold" fontSize="sm">
                      Sample Data:
                    </Text>
                    <Badge
                      colorScheme={component.color}
                      variant="solid"
                      px={3}
                      py={1}
                      fontSize="xs"
                      borderRadius="full"
                      textAlign="center"
                    >
                      {component.sampleData}
                    </Badge>
                  </VStack>
                </VStack>
              </MotionBox>
            </GridItem>
          ))}
        </Grid>

        {/* Technology Highlights */}
        <VStack spacing={4}>
          <Heading size="lg" color="white" textAlign="center">
            Built with Modern Technologies
          </Heading>
          <HStack spacing={6} justify="center" flexWrap="wrap">
            <Badge
              colorScheme="blue"
              variant="solid"
              px={4}
              py={2}
              fontSize="md"
              borderRadius="full"
            >
              ⚛️ React 18
            </Badge>
            <Badge
              colorScheme="teal"
              variant="solid"
              px={4}
              py={2}
              fontSize="md"
              borderRadius="full"
            >
              🎨 Chakra UI
            </Badge>
            <Badge
              colorScheme="purple"
              variant="solid"
              px={4}
              py={2}
              fontSize="md"
              borderRadius="full"
            >
              ✨ Framer Motion
            </Badge>
            <Badge
              colorScheme="green"
              variant="solid"
              px={4}
              py={2}
              fontSize="md"
              borderRadius="full"
            >
              📊 Recharts
            </Badge>
            <Badge
              colorScheme="orange"
              variant="solid"
              px={4}
              py={2}
              fontSize="md"
              borderRadius="full"
            >
              🔍 Lucide Icons
            </Badge>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Slide3;
