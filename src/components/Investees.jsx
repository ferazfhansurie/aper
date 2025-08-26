import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Button,
  useColorModeValue,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Search, Building2, MapPin, Calendar, TrendingUp, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import API_ENDPOINTS from '../config/api';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const Investees = () => {
  const [investees, setInvestees] = useState([]);
  const [filteredInvestees, setFilteredInvestees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvestee, setSelectedInvestee] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchInvestees();
  }, []);

  useEffect(() => {
    filterInvestees();
  }, [searchTerm, investees]);

  const fetchInvestees = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.INVESTEES);
      if (response.ok) {
        const data = await response.json();
        setInvestees(data);
        setFilteredInvestees(data);
      } else {
        console.error('Failed to fetch investees');
      }
    } catch (error) {
      console.error('Error fetching investees:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterInvestees = () => {
    if (!searchTerm.trim()) {
      setFilteredInvestees(investees);
      return;
    }

    const filtered = investees.filter(investee =>
      Object.values(investee).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredInvestees(filtered);
  };

  const handleViewInvestee = (investee) => {
    setSelectedInvestee(investee);
    onOpen();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Portfolio Company':
        return 'green';
      case 'Exited':
        return 'blue';
      case 'Under Review':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  const getIndustryColor = (industry) => {
    const colors = {
      'Software & IT': 'blue',
      'Healthcare Technology': 'green',
      'Clean Energy': 'teal',
      'Supply Chain': 'purple',
      'Fintech': 'cyan',
      'E-commerce': 'orange',
    };
    return colors[industry] || 'gray';
  };

  if (loading) {
    return (
      <Container maxW="1400px" py={8}>
        <VStack spacing={6} align="stretch">
          <Skeleton height="60px" borderRadius="xl" />
          <Skeleton height="400px" borderRadius="xl" />
        </VStack>
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
        <Heading size="2xl" color="white" mb={2}>
          Portfolio Companies
        </Heading>
        <Text color="rgba(255, 255, 255, 0.8)" fontSize="lg">
          Manage and view portfolio company information and investment details
        </Text>
      </MotionBox>

      {/* Stats Cards */}
      <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={6} mb={8}>
        <GridItem>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            borderRadius="xl"
          >
            <CardBody>
              <Stat>
                <StatLabel color="rgba(255, 255, 255, 0.7)" fontSize="sm">
                  Total Companies
                </StatLabel>
                <StatNumber color="white" fontSize="2xl" fontWeight="bold">
                  {investees.length}
                </StatNumber>
              </Stat>
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
            border="1px solid rgba(255, 255, 255, 0.2)"
            borderRadius="xl"
          >
            <CardBody>
              <Stat>
                <StatLabel color="rgba(255, 255, 255, 0.7)" fontSize="sm">
                  Active Portfolio
                </StatLabel>
                <StatNumber color="white" fontSize="2xl" fontWeight="bold">
                  {investees.filter(i => i.status === 'Portfolio Company').length}
                </StatNumber>
              </Stat>
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
            border="1px solid rgba(255, 255, 255, 0.2)"
            borderRadius="xl"
          >
            <CardBody>
              <Stat>
                <StatLabel color="rgba(255, 255, 255, 0.7)" fontSize="sm">
                  Total Investment
                </StatLabel>
                <StatNumber color="white" fontSize="2xl" fontWeight="bold">
                  $90M
                </StatNumber>
              </Stat>
            </CardBody>
          </MotionCard>
        </GridItem>
        <GridItem>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            borderRadius="xl"
          >
            <CardBody>
              <Stat>
                <StatLabel color="rgba(255, 255, 255, 0.7)" fontSize="sm">
                  Industries
                </StatLabel>
                <StatNumber color="white" fontSize="2xl" fontWeight="bold">
                  {new Set(investees.map(i => i.industry)).size}
                </StatNumber>
              </Stat>
            </CardBody>
          </MotionCard>
        </GridItem>
      </Grid>

      {/* Search and Table */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(255, 255, 255, 0.2)"
        borderRadius="xl"
      >
        <CardBody>
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="md" color="white">
              Company Directory
            </Heading>
            <InputGroup maxW="400px">
              <InputLeftElement pointerEvents="none">
                <Search size={18} color="rgba(255, 255, 255, 0.7)" />
              </InputLeftElement>
              <Input
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg="rgba(255, 255, 255, 0.1)"
                border="1px solid rgba(255, 255, 255, 0.2)"
                color="white"
                _placeholder={{ color: 'rgba(255, 255, 255, 0.5)' }}
                _focus={{
                  bg: 'rgba(255, 255, 255, 0.15)',
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                }}
                borderRadius="lg"
              />
            </InputGroup>
          </Flex>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th color="rgba(255, 255, 255, 0.7)">ID</Th>
                  <Th color="rgba(255, 255, 255, 0.7)">Company Name</Th>
                  <Th color="rgba(255, 255, 255, 0.7)">Industry</Th>
                  <Th color="rgba(255, 255, 255, 0.7)">Location</Th>
                  <Th color="rgba(255, 255, 255, 0.7)">Investment</Th>
                  <Th color="rgba(255, 255, 255, 0.7)">Status</Th>
                  <Th color="rgba(255, 255, 255, 0.7)">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredInvestees.map((investee) => (
                  <Tr key={investee.id} _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}>
                    <Td color="white" fontWeight="medium">{investee.id}</Td>
                    <Td>
                      <VStack align="start" spacing={1}>
                        <Text color="white" fontWeight="medium">{investee.name}</Text>
                        <Text color="rgba(255, 255, 255, 0.6)" fontSize="sm">
                          {investee.chineseName}
                        </Text>
                      </VStack>
                    </Td>
                    <Td>
                      <Badge colorScheme={getIndustryColor(investee.industry)} variant="subtle">
                        {investee.industry}
                      </Badge>
                    </Td>
                    <Td color="white">{investee.location}</Td>
                    <Td color="white" fontWeight="medium">{investee.investmentAmount}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(investee.status)} variant="subtle">
                        {investee.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <Button
                          size="sm"
                          variant="ghost"
                          color="white"
                          leftIcon={<Eye size={16} />}
                          onClick={() => handleViewInvestee(investee)}
                          _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                        >
                          View
                        </Button>
                        {investee.website && (
                          <Link href={investee.website} isExternal>
                            <Button
                              size="sm"
                              variant="ghost"
                              color="white"
                              leftIcon={<ExternalLink size={16} />}
                              _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                            >
                              Website
                            </Button>
                          </Link>
                        )}
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </MotionCard>

      {/* Investee Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent
          bg="rgba(255, 255, 255, 0.1)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(255, 255, 255, 0.2)"
        >
          <ModalHeader color="white">Company Details</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            {selectedInvestee && (
              <VStack spacing={4} align="stretch">
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem>
                    <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">ID</Text>
                    <Text color="white" fontWeight="medium">{selectedInvestee.id}</Text>
                  </GridItem>
                  <GridItem>
                    <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">Company Name</Text>
                    <Text color="white" fontWeight="medium">{selectedInvestee.name}</Text>
                  </GridItem>
                  <GridItem>
                    <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">Chinese Name</Text>
                    <Text color="white">{selectedInvestee.chineseName}</Text>
                  </GridItem>
                  <GridItem>
                    <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">Industry</Text>
                    <Badge colorScheme={getIndustryColor(selectedInvestee.industry)} variant="subtle">
                      {selectedInvestee.industry}
                    </Badge>
                  </GridItem>
                  <GridItem>
                    <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">Location</Text>
                    <Text color="white">{selectedInvestee.location}</Text>
                  </GridItem>
                  <GridItem>
                    <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">Status</Text>
                    <Badge colorScheme={getStatusColor(selectedInvestee.status)} variant="subtle">
                      {selectedInvestee.status}
                    </Badge>
                  </GridItem>
                  <GridItem>
                    <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">Investment Amount</Text>
                    <Text color="white" fontWeight="medium">{selectedInvestee.investmentAmount}</Text>
                  </GridItem>
                  <GridItem>
                    <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">Investment Date</Text>
                    <Text color="white">{selectedInvestee.investmentDate}</Text>
                  </GridItem>
                </Grid>
                <Box>
                  <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">Description</Text>
                  <Text color="white">{selectedInvestee.description}</Text>
                </Box>
                {selectedInvestee.website && (
                  <Box>
                    <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">Website</Text>
                    <Link href={selectedInvestee.website} isExternal color="blue.300">
                      {selectedInvestee.website}
                    </Link>
                  </Box>
                )}
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Investees;
