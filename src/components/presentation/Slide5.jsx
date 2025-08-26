
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
  Code,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  Database, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Link,
  Users,
  Building2,
  DollarSign
} from 'lucide-react';

const MotionBox = motion(Box);

const Slide5 = () => {
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.1)');
  const borderColor = useColorModeValue('rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)');

  const currentStructure = [
    {
      issue: "162+ Tables",
      description: "Complex naming conventions",
      icon: AlertTriangle,
      color: "red"
    },
    {
      issue: "Link Tables",
      description: "Many-to-many relationships",
      icon: Link,
      color: "orange"
    },
    {
      issue: "Historical Data",
      description: "Multiple versions (2013, 2014, 2024)",
      icon: FileText,
      color: "yellow"
    },
    {
      issue: "Mixed Data Types",
      description: "Text, boolean, numeric fields",
      icon: Database,
      color: "purple"
    }
  ];

  const keyTables = [
    {
      category: "Core Entities",
      tables: [
        { name: "Investor", description: "PE firms, VC funds, family offices" },
        { name: "Investee", description: "Portfolio companies" },
        { name: "Deal", description: "Investment transactions" },
        { name: "Fund", description: "Investment vehicles" }
      ]
    },
    {
      category: "Link Tables",
      tables: [
        { name: "Link_Investor_Deal", description: "Who invested in what" },
        { name: "Link_Fund_Company", description: "Fund portfolio companies" },
        { name: "Link_Country_Region", description: "Geographic relationships" }
      ]
    },
    {
      category: "Supporting Tables",
      tables: [
        { name: "Country", description: "Geographic data" },
        { name: "Industry", description: "Sector classification" },
        { name: "Valuation", description: "Financial metrics" },
        { name: "Status", description: "Deal and entity status" }
      ]
    }
  ];

  const migrationSteps = [
    {
      step: "1",
      title: "Data Extraction",
      description: "Export Access data to CSV format",
      icon: FileText
    },
    {
      step: "2",
      title: "Data Cleaning",
      description: "Remove duplicates, standardize formats",
      icon: CheckCircle
    },
    {
      step: "3",
      title: "Schema Mapping",
      description: "Map Access fields to PostgreSQL structure",
      icon: ArrowRight
    },
    {
      step: "4",
      title: "Data Validation",
      description: "Ensure data integrity and relationships",
      icon: CheckCircle
    },
    {
      step: "5",
      title: "Testing",
      description: "Verify data accuracy in staging environment",
      icon: CheckCircle
    }
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
            Database Schema Analysis & Migration Strategy
          </Heading>
          <Text
            fontSize="lg"
            color="white"
            opacity={0.9}
            textAlign="center"
            maxW="800px"
          >
            Comprehensive analysis of current Microsoft Access structure and strategic migration to PostgreSQL
          </Text>
        </VStack>

        {/* Current Structure Issues */}
        <VStack spacing={6}>
          <Heading size="lg" color="white" textAlign="center">
            Current Microsoft Access Structure Issues
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={6} w="full">
            {currentStructure.map((issue, index) => (
              <GridItem key={index}>
                <MotionBox
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  bg="rgba(255, 255, 255, 0.05)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  borderRadius="xl"
                  p={6}
                >
                  <HStack spacing={4}>
                    <Icon as={issue.icon} color={`${issue.color}.300`} boxSize={8} />
                    <VStack align="stretch" spacing={2}>
                      <Text color="white" fontWeight="bold" fontSize="lg">
                        {issue.issue}
                      </Text>
                      <Text color="white" opacity={0.8}>
                        {issue.description}
                      </Text>
                    </VStack>
                  </HStack>
                </MotionBox>
              </GridItem>
            ))}
          </Grid>
        </VStack>

        {/* Key Tables Identified */}
        <VStack spacing={6}>
          <Heading size="lg" color="white" textAlign="center">
            Key Tables Identified
          </Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={6} w="full">
            {keyTables.map((category, categoryIndex) => (
              <GridItem key={categoryIndex}>
                <MotionBox
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.2 }}
                  bg="rgba(255, 255, 255, 0.05)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  borderRadius="xl"
                  p={6}
                  h="full"
                >
                  <VStack spacing={4} align="stretch" h="full">
                    <Heading size="md" color="white" textAlign="center">
                      {category.category}
                    </Heading>
                    <VStack spacing={3} align="stretch" flex={1}>
                      {category.tables.map((table, tableIndex) => (
                        <Box
                          key={tableIndex}
                          bg="rgba(255, 255, 255, 0.05)"
                          borderRadius="lg"
                          p={3}
                        >
                          <Text color="white" fontWeight="semibold">
                            {table.name}
                          </Text>
                          <Text color="white" opacity={0.8} fontSize="sm">
                            {table.description}
                          </Text>
                        </Box>
                      ))}
                    </VStack>
                  </VStack>
                </MotionBox>
              </GridItem>
            ))}
          </Grid>
        </VStack>

        {/* Migration Strategy */}
        <VStack spacing={6}>
          <Heading size="lg" color="white" textAlign="center">
            Migration Strategy
          </Heading>
          <Box
            bg="rgba(255, 255, 255, 0.05)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            borderRadius="xl"
            p={6}
            w="full"
          >
            <Grid templateColumns="repeat(5, 1fr)" gap={4} w="full">
              {migrationSteps.map((step, index) => (
                <GridItem key={index}>
                  <VStack spacing={3} align="center">
                    <Box
                      bg="rgba(255, 255, 255, 0.1)"
                      borderRadius="full"
                      p={3}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={step.icon} color="white" boxSize={6} />
                    </Box>
                    <Text color="white" fontWeight="bold" textAlign="center">
                      {step.step}
                    </Text>
                    <Text color="white" fontSize="sm" textAlign="center">
                      {step.title}
                    </Text>
                    <Text color="white" opacity={0.7} fontSize="xs" textAlign="center">
                      {step.description}
                    </Text>
                  </VStack>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </VStack>

        {/* PostgreSQL Schema Example */}
        <VStack spacing={4}>
          <Heading size="lg" color="white" textAlign="center">
            PostgreSQL Schema Design Example
          </Heading>
          <Box
            bg="rgba(0, 0, 0, 0.3)"
            borderRadius="xl"
            p={6}
            w="full"
            overflowX="auto"
          >
            <Code
              color="green.300"
              fontSize="sm"
              display="block"
              whiteSpace="pre"
            >
{`-- Core tables with proper relationships
CREATE TABLE investors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    region VARCHAR(100),
    aum DECIMAL(15,2),
    focus_areas TEXT[],
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Link tables for many-to-many relationships
CREATE TABLE investor_deals (
    investor_id INTEGER REFERENCES investors(id),
    deal_id INTEGER REFERENCES deals(id),
    role VARCHAR(100),
    investment_amount DECIMAL(15,2),
    equity_stake DECIMAL(5,2),
    PRIMARY KEY (investor_id, deal_id)
);`}
            </Code>
          </Box>
        </VStack>

        {/* Migration Benefits */}
        <HStack spacing={6} justify="center">
          <Badge
            colorScheme="green"
            variant="solid"
            px={4}
            py={2}
            fontSize="md"
            borderRadius="full"
          >
            🔄 ACID Compliance
          </Badge>
          <Badge
            colorScheme="blue"
            variant="solid"
            px={4}
            py={2}
            fontSize="md"
            borderRadius="full"
          >
            📊 Complex Queries
          </Badge>
          <Badge
            colorScheme="purple"
            variant="solid"
            px={4}
            py={2}
            fontSize="md"
            borderRadius="full"
          >
            🚀 Performance
          </Badge>
          <Badge
            colorScheme="teal"
            variant="solid"
            px={4}
            py={2}
            fontSize="md"
            borderRadius="full"
          >
            🔒 Data Integrity
          </Badge>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Slide5;