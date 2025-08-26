import React, { useState } from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Heading,
  Badge,
  Grid,
  GridItem,
  Button,
  Image,
  Flex,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Lock, 
  Unlock, 
  TrendingUp, 
  Globe, 
  Users,
  Building2,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const DataMigration = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTable, setSelectedTable] = useState(null);

  const migrationData = {
    investors: {
      before: [
        { id: 'INV001', name: 'Asia Growth Fund I', type: 'Private Equity', region: 'Asia Pacific', aum: '$500M' },
        { id: 'INV002', name: 'Southeast Asia Ventures', type: 'Venture Capital', region: 'Southeast Asia', aum: '$200M' },
        { id: 'INV003', name: 'Pacific Rim Capital', type: 'Growth Equity', region: 'Asia Pacific', aum: '$1.2B' }
      ],
      after: [
        { id: 'INV001', name: 'Asia Growth Fund I', type: 'Private Equity', region: 'Asia Pacific', aum: '$500M', status: 'Active', focus: 'Technology, Healthcare' },
        { id: 'INV002', name: 'Southeast Asia Ventures', type: 'Venture Capital', region: 'Southeast Asia', aum: '$200M', status: 'Active', focus: 'Fintech, E-commerce' },
        { id: 'INV003', name: 'Pacific Rim Capital', type: 'Growth Equity', region: 'Asia Pacific', aum: '$1.2B', status: 'Active', focus: 'Manufacturing, Logistics' }
      ]
    },
    investees: {
      before: [
        { id: 'COMP001', name: 'TechFlow Solutions', industry: 'Software & IT', location: 'Singapore', investment: '$15M' },
        { id: 'COMP002', name: 'HealthTech Innovations', industry: 'Healthcare Technology', location: 'Hong Kong', investment: '$25M' },
        { id: 'COMP003', name: 'Green Energy Systems', industry: 'Clean Energy', location: 'Malaysia', investment: '$30M' }
      ],
      after: [
        { id: 'COMP001', name: 'TechFlow Solutions', industry: 'Software & IT', location: 'Singapore', investment: '$15M', status: 'Portfolio Company', website: 'https://techflow.sg', description: 'AI-powered workflow automation platform' },
        { id: 'COMP002', name: 'HealthTech Innovations', industry: 'Healthcare Technology', location: 'Hong Kong', investment: '$25M', status: 'Portfolio Company', website: 'https://healthtech.hk', description: 'Digital health monitoring solutions' },
        { id: 'COMP003', name: 'Green Energy Systems', industry: 'Clean Energy', location: 'Malaysia', investment: '$30M', status: 'Portfolio Company', website: 'https://greenenergy.my', description: 'Renewable energy infrastructure' }
      ]
    },
    deals: {
      before: [
        { id: 'DEAL001', name: 'TechFlow Series B', type: 'Series B', size: '$15M', date: '2024-01-20' },
        { id: 'DEAL002', name: 'HealthTech Growth Round', type: 'Growth Equity', size: '$25M', date: '2024-02-15' },
        { id: 'DEAL003', name: 'Green Energy Infrastructure', type: 'Project Finance', size: '$30M', date: '2024-03-05' }
      ],
      after: [
        { id: 'DEAL001', name: 'TechFlow Series B', type: 'Series B', size: '$15M', date: '2024-01-20', valuation: '$150M', status: 'Closed', sector: 'Technology', region: 'Southeast Asia' },
        { id: 'DEAL002', name: 'HealthTech Growth Round', type: 'Growth Equity', size: '$25M', date: '2024-02-15', valuation: '$200M', status: 'Closed', sector: 'Healthcare', region: 'Greater China' },
        { id: 'DEAL003', name: 'Green Energy Infrastructure', type: 'Project Finance', size: '$30M', date: '2024-03-05', valuation: '$120M', status: 'Closed', sector: 'Energy', region: 'Southeast Asia' }
      ]
    }
  };

  const handleViewTable = (tableName) => {
    setSelectedTable(tableName);
    onOpen();
  };

  const renderBeforeAfterTable = (tableName) => {
    const data = migrationData[tableName];
    if (!data) return null;

    return (
      <Grid templateColumns="1fr 1fr" gap={6}>
        {/* Before */}
        <GridItem>
          <Card bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(20px)" borderRadius="xl">
            <CardBody>
              <HStack mb={4}>
                <Lock size={20} color="red" />
                <Heading size="md" color="white">
                  Before: Access Database
                </Heading>
              </HStack>
              <Box overflowX="auto">
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      {Object.keys(data.before[0]).map(key => (
                        <Th key={key} color="rgba(255, 255, 255, 0.7)" fontSize="xs">
                          {key.toUpperCase()}
                        </Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.before.map((row, index) => (
                      <Tr key={index}>
                        {Object.values(row).map((value, i) => (
                          <Td key={i} color="white" fontSize="xs">
                            {value}
                          </Td>
                        ))}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </CardBody>
          </Card>
        </GridItem>

        {/* After */}
        <GridItem>
          <Card bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(20px)" borderRadius="xl">
            <CardBody>
              <HStack mb={4}>
                <Unlock size={20} color="green" />
                <Heading size="md" color="white">
                  After: Modern Database
                </Heading>
              </HStack>
              <Box overflowX="auto">
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      {Object.keys(data.after[0]).map(key => (
                        <Th key={key} color="rgba(255, 255, 255, 0.7)" fontSize="xs">
                          {key.toUpperCase()}
                        </Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.after.map((row, index) => (
                      <Tr key={index}>
                        {Object.values(row).map((value, i) => (
                          <Td key={i} color="white" fontSize="xs">
                            {value}
                          </Td>
                        ))}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  };

  return (
    <Container maxW="1400px" py={8}>
      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        mb={8}
      >
        <HStack spacing={4} mb={4}>
          <Box
            p={3}
            bg="brand.500"
            borderRadius="lg"
            color="white"
          >
            <Database size={24} />
          </Box>
          <VStack align="start" spacing={1}>
            <Heading size="2xl" color="white">
              Data Migration Proof
            </Heading>
            <Text color="rgba(255, 255, 255, 0.8)" fontSize="lg">
              From Microsoft Access to Modern PostgreSQL Database
            </Text>
          </VStack>
        </HStack>
      </MotionBox>

      {/* Migration Overview */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mb={8}>
        <GridItem>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(20px)"
            borderRadius="xl"
          >
            <CardBody textAlign="center">
              <Lock size={32} color="red" style={{ margin: '0 auto 16px' }} />
              <Heading size="md" color="white" mb={2}>
                Before: Access Database
              </Heading>
              <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">
                Data locked in offline Microsoft Access files
              </Text>
            </CardBody>
          </MotionCard>
        </GridItem>

        <GridItem>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(20px)"
            borderRadius="xl"
          >
            <CardBody textAlign="center">
              <ArrowRight size={32} color="white" style={{ margin: '0 auto 16px' }} />
              <Heading size="md" color="white" mb={2}>
                Migration Process
              </Heading>
              <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">
                Structured data extraction and import
              </Text>
            </CardBody>
          </MotionCard>
        </GridItem>

        <GridItem>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(20px)"
            borderRadius="xl"
          >
            <CardBody textAlign="center">
              <Unlock size={32} color="green" style={{ margin: '0 auto 16px' }} />
              <Heading size="md" color="white" mb={2}>
                After: Modern Database
              </Heading>
              <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">
                Data accessible via web API and dashboard
              </Text>
            </CardBody>
          </MotionCard>
        </GridItem>
      </Grid>

      {/* Table Comparisons */}
      <VStack spacing={8} align="stretch">
        {/* Investors */}
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          bg="rgba(255, 255, 255, 0.1)"
          backdropFilter="blur(20px)"
          borderRadius="xl"
        >
          <CardBody>
            <HStack justify="space-between" mb={6}>
              <VStack align="start" spacing={1}>
                <Heading size="lg" color="white">
                  Investors Table Migration
                </Heading>
                <Text color="rgba(255, 255, 255, 0.7)">
                  Enhanced with status, focus areas, and creation dates
                </Text>
              </VStack>
              <Button
                colorScheme="brand"
                onClick={() => handleViewTable('investors')}
                leftIcon={<Users size={16} />}
              >
                View Details
              </Button>
            </HStack>
            {renderBeforeAfterTable('investors')}
          </CardBody>
        </MotionCard>

        {/* Investees */}
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          bg="rgba(255, 255, 255, 0.1)"
          backdropFilter="blur(20px)"
          borderRadius="xl"
        >
          <CardBody>
            <HStack justify="space-between" mb={6}>
              <VStack align="start" spacing={1}>
                <Heading size="lg" color="white">
                  Portfolio Companies Migration
                </Heading>
                <Text color="rgba(255, 255, 255, 0.7)">
                  Enhanced with websites, descriptions, and investment details
                </Text>
              </VStack>
              <Button
                colorScheme="brand"
                onClick={() => handleViewTable('investees')}
                leftIcon={<Building2 size={16} />}
              >
                View Details
              </Button>
            </HStack>
            {renderBeforeAfterTable('investees')}
          </CardBody>
        </MotionCard>

        {/* Deals */}
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          bg="rgba(255, 255, 255, 0.1)"
          backdropFilter="blur(20px)"
          borderRadius="xl"
        >
          <CardBody>
            <HStack justify="space-between" mb={6}>
              <VStack align="start" spacing={1}>
                <Heading size="lg" color="white">
                  Deals Table Migration
                </Heading>
                <Text color="rgba(255, 255, 255, 0.7)">
                  Enhanced with valuations, sectors, and regional data
                </Text>
              </VStack>
              <Button
                colorScheme="brand"
                onClick={() => handleViewTable('deals')}
                leftIcon={<TrendingUp size={16} />}
              >
                View Details
              </Button>
            </HStack>
            {renderBeforeAfterTable('deals')}
          </CardBody>
        </MotionCard>
      </VStack>

      {/* Benefits Section */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(20px)"
        borderRadius="xl"
        mt={8}
      >
        <CardBody>
          <Heading size="lg" color="white" mb={6}>
            Migration Benefits
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <GridItem>
              <VStack align="start" spacing={4}>
                <HStack>
                  <CheckCircle size={20} color="green" />
                  <Text color="white" fontWeight="medium">Real-time Access</Text>
                </HStack>
                <HStack>
                  <CheckCircle size={20} color="green" />
                  <Text color="white" fontWeight="medium">Enhanced Data Structure</Text>
                </HStack>
                <HStack>
                  <CheckCircle size={20} color="green" />
                  <Text color="white" fontWeight="medium">Web-based Interface</Text>
                </HStack>
                <HStack>
                  <CheckCircle size={20} color="green" />
                  <Text color="white" fontWeight="medium">API Integration</Text>
                </HStack>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack align="start" spacing={4}>
                <HStack>
                  <CheckCircle size={20} color="green" />
                  <Text color="white" fontWeight="medium">Advanced Analytics</Text>
                </HStack>
                <HStack>
                  <CheckCircle size={20} color="green" />
                  <Text color="white" fontWeight="medium">Multi-user Access</Text>
                </HStack>
                <HStack>
                  <CheckCircle size={20} color="green" />
                  <Text color="white" fontWeight="medium">Data Validation</Text>
                </HStack>
                <HStack>
                  <CheckCircle size={20} color="green" />
                  <Text color="white" fontWeight="medium">Scalable Architecture</Text>
                </HStack>
              </VStack>
            </GridItem>
          </Grid>
        </CardBody>
      </MotionCard>

      {/* Detailed Table Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent
          bg="rgba(255, 255, 255, 0.1)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(255, 255, 255, 0.2)"
        >
          <ModalHeader color="white">
            {selectedTable ? `${selectedTable.charAt(0).toUpperCase() + selectedTable.slice(1)} Table Migration Details` : 'Migration Details'}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            {selectedTable && renderBeforeAfterTable(selectedTable)}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default DataMigration;
