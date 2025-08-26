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
  Badge,
  Card,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
  Flex,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Table as TableIcon, 
  Link, 
  FileText, 
  Users, 
  Building2, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Database as DatabaseIcon,
  Server,
  Cloud
} from 'lucide-react';
import API_ENDPOINTS from '../config/api';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const DatabaseSchema = () => {
  const [schemaData, setSchemaData] = useState(null);
  const [migrationStats, setMigrationStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    fetchSchemaData();
  }, []);

  const fetchSchemaData = async () => {
    try {
      const [schemaResponse, migrationResponse] = await Promise.all([
        fetch(API_ENDPOINTS.SCHEMA),
        fetch(API_ENDPOINTS.MIGRATION_STATS)
      ]);
      
      if (schemaResponse.ok) {
        const schemaData = await schemaResponse.json();
        setSchemaData(schemaData);
      }
      
      if (migrationResponse.ok) {
        const migrationData = await migrationResponse.json();
        setMigrationStats(migrationData);
      }
    } catch (error) {
      console.error('Error fetching schema data:', error);
    } finally {
      setLoading(false);
    }
  };

  const MigrationOverview = () => (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="xl"
      mb={6}
    >
      <CardBody>
        <Heading size="lg" mb={6} color="blue.600">
          🚀 Database Migration Successfully Completed
        </Heading>
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mb={6}>
          <GridItem>
            <Box textAlign="center" p={4} bg="blue.50" borderRadius="lg">
              <Icon as={Database} boxSize={8} color="blue.500" mb={2} />
              <Stat>
                <StatNumber color="blue.600" fontSize="2xl">
                  {migrationStats?.totalTables || 0}
                </StatNumber>
                <StatLabel color="blue.600">Tables Migrated</StatLabel>
                <StatHelpText>From Access to PostgreSQL</StatHelpText>
              </Stat>
            </Box>
          </GridItem>
          
          <GridItem>
            <Box textAlign="center" p={4} bg="green.50" borderRadius="lg">
              <Icon as={TableIcon} boxSize={8} color="green.500" mb={2} />
              <Stat>
                <StatNumber color="green.600" fontSize="2xl">
                  {migrationStats?.totalRows || 0}
                </StatNumber>
                <StatLabel color="green.600">Total Rows</StatLabel>
                <StatHelpText>Data Successfully Transferred</StatHelpText>
              </Stat>
            </Box>
          </GridItem>
          
          <GridItem>
            <Box textAlign="center" p={4} bg="purple.50" borderRadius="lg">
              <Icon as={CheckCircle} boxSize={8} color="purple.500" mb={2} />
              <Stat>
                <StatNumber color="purple.600" fontSize="2xl">
                  {migrationStats?.tablesWithData || 0}
                </StatNumber>
                <StatLabel color="purple.600">Active Tables</StatLabel>
                <StatHelpText>With Migrated Data</StatHelpText>
              </Stat>
            </Box>
          </GridItem>
        </Grid>

        <Alert status="success" borderRadius="lg" mb={4}>
          <AlertIcon />
          <Box>
            <AlertTitle>Migration Complete!</AlertTitle>
            <AlertDescription>
              Successfully migrated from Microsoft Access (.accdb/.mdb) to Neon PostgreSQL with preserved schema relationships and data integrity.
            </AlertDescription>
          </Box>
        </Alert>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
          <Box p={4} bg="gray.50" borderRadius="lg">
            <HStack mb={2}>
              <Icon as={Server} color="red.500" />
              <Text fontWeight="bold" color="red.600">Before: Microsoft Access</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">
              • Offline database files (.accdb/.mdb)<br/>
              • Limited concurrent access<br/>
              • Windows-only compatibility<br/>
              • Complex data extraction
            </Text>
          </Box>
          
          <Box p={4} bg="gray.50" borderRadius="lg">
            <HStack mb={2}>
              <Icon as={Cloud} color="green.500" />
              <Text fontWeight="bold" color="green.600">After: Neon PostgreSQL</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">
              • Cloud-hosted database<br/>
              • Unlimited concurrent access<br/>
              • Cross-platform compatibility<br/>
              • Modern SQL interface
            </Text>
          </Box>
        </Grid>
      </CardBody>
    </MotionCard>
  );

  const TableRelationships = () => (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="xl"
      mb={6}
    >
      <CardBody>
        <Heading size="md" mb={4} color="blue.600">
          🔗 Key Table Relationships
        </Heading>
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          {/* Core Business Tables */}
          <Box>
            <Heading size="sm" mb={3} color="blue.500">Core Business Entities</Heading>
            <VStack spacing={3} align="stretch">
              <Box p={3} bg="blue.50" borderRadius="lg" border="1px solid" borderColor="blue.200">
                <HStack>
                  <Icon as={Users} color="blue.500" />
                  <Text fontWeight="medium">investor_profile</Text>
                  <Badge colorScheme="blue" size="sm">Investors</Badge>
                </HStack>
                <Text fontSize="xs" color="gray.600" mt={1}>
                  Primary investor information and profiles
                </Text>
              </Box>
              
              <Box p={3} bg="green.50" borderRadius="lg" border="1px solid" borderColor="green.200">
                <HStack>
                  <Icon as={Building2} color="green.500" />
                  <Text fontWeight="medium">company</Text>
                  <Badge colorScheme="green" size="sm">Portfolio Companies</Badge>
                </HStack>
                <Text fontSize="xs" color="gray.600" mt={1}>
                  Companies receiving investments
                </Text>
              </Box>
              
              <Box p={3} bg="purple.50" borderRadius="lg" border="1px solid" borderColor="purple.200">
                <HStack>
                  <Icon as={TrendingUp} color="purple.500" />
                  <Text fontWeight="medium">firm_location</Text>
                  <Badge colorScheme="purple" size="sm">Deals & Locations</Badge>
                </HStack>
                <Text fontSize="xs" color="gray.600" mt={1}>
                  Investment deals and firm locations
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* Supporting Tables */}
          <Box>
            <Heading size="sm" mb={3} color="orange.500">Supporting Data Tables</Heading>
            <VStack spacing={3} align="stretch">
              <Box p={3} bg="orange.50" borderRadius="lg" border="1px solid" borderColor="orange.200">
                <HStack>
                  <Icon as={FileText} color="orange.500" />
                  <Text fontWeight="medium">factiva_data</Text>
                  <Badge colorScheme="orange" size="sm">Market Data</Badge>
                </HStack>
                <Text fontSize="xs" color="gray.600" mt={1}>
                  Financial market information
                </Text>
              </Box>
              
              <Box p={3} bg="teal.50" borderRadius="lg" border="1px solid" borderColor="teal.200">
                <HStack>
                  <Icon as={Database} color="teal.500" />
                  <Text fontWeight="medium">doculibrary</Text>
                  <Badge colorScheme="teal" size="sm">Documents</Badge>
                </HStack>
                <Text fontSize="xs" color="gray.600" mt={1}>
                  Document management system
                </Text>
              </Box>
              
              <Box p={3} bg="pink.50" borderRadius="lg" border="1px solid" borderColor="pink.200">
                <HStack>
                  <Icon as={Link} color="pink.500" />
                  <Text fontWeight="medium">link_* tables</Text>
                  <Badge colorScheme="pink" size="sm">Relationships</Badge>
                </HStack>
                <Text fontSize="xs" color="gray.600" mt={1}>
                  Cross-reference and linking tables
                </Text>
              </Box>
            </VStack>
          </Box>
        </Grid>

        <Divider my={6} />
        
        <Box>
          <Heading size="sm" mb={3} color="gray.600">Relationship Flow</Heading>
          <HStack spacing={4} justify="center" flexWrap="wrap">
            <Box p={2} bg="blue.100" borderRadius="md">
              <Text fontSize="sm" fontWeight="medium">Investors</Text>
            </Box>
            <Icon as={ArrowRight} color="gray.400" />
            <Box p={2} bg="purple.100" borderRadius="md">
              <Text fontSize="sm" fontWeight="medium">Deals</Text>
            </Box>
            <Icon as={ArrowRight} color="gray.400" />
            <Box p={2} bg="green.100" borderRadius="md">
              <Text fontSize="sm" fontWeight="medium">Companies</Text>
            </Box>
          </HStack>
        </Box>
      </CardBody>
    </MotionCard>
  );

  const TableDetails = () => (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="xl"
    >
      <CardBody>
        <Heading size="md" mb={4} color="blue.600">
          📊 Detailed Table Information
        </Heading>
        
        {migrationStats?.tableDetails && (
          <Accordion allowMultiple>
            {migrationStats.tableDetails.map((table, index) => (
              <AccordionItem key={index}>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <HStack>
                      <Icon as={TableIcon} color="blue.500" />
                      <Text fontWeight="medium">{table.name}</Text>
                      <Badge colorScheme={table.rows > 0 ? "green" : "gray"} size="sm">
                        {table.rows} rows
                      </Badge>
                      <Badge colorScheme="blue" size="sm">
                        {table.columns} columns
                      </Badge>
                    </HStack>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Box p={3} bg="gray.50" borderRadius="md">
                    <Text fontSize="sm" color="gray.600">
                      <strong>Table Name:</strong> {table.name}<br/>
                      <strong>Columns:</strong> {table.columns}<br/>
                      <strong>Rows:</strong> {table.rows.toLocaleString()}<br/>
                      <strong>Status:</strong> {table.rows > 0 ? 'Active with Data' : 'Schema Only'}
                    </Text>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardBody>
    </MotionCard>
  );

  if (loading) {
    return (
      <Container maxW="1400px" py={8}>
        <Skeleton height="200px" borderRadius="xl" mb={6} />
        <Skeleton height="300px" borderRadius="xl" mb={6} />
        <Skeleton height="400px" borderRadius="xl" />
      </Container>
    );
  }

  return (
    <Container maxW="1400px" py={8}>
      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        mb={8}
      >
        <Heading size="2xl" color="blue.600" mb={2}>
          Database Schema & Relationships
        </Heading>
        <Text color="gray.600" fontSize="lg">
          Explore the successfully migrated database structure from Microsoft Access to Neon PostgreSQL
        </Text>
      </MotionBox>

      <MigrationOverview />
      <TableRelationships />
      <TableDetails />
    </Container>
  );
};

export default DatabaseSchema;
