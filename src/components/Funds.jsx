import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Select,
  InputGroup,
  InputLeftElement,
  useToast,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Container,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  GridItem,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Link,
  useColorModeValue
} from '@chakra-ui/react';
import { 
  Search, 
  Download,
  Eye,
  ExternalLink,
  Building2,
  Users,
  DollarSign,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VerticalHeader from './VerticalHeader';
import { hierarchicalService } from '../data/sampleData';

const Funds = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [funds, setFunds] = useState([]);
  const [filteredFunds, setFilteredFunds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [selectedFund, setSelectedFund] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const bgColor = useColorModeValue('white', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  // Get funds from hierarchical service
  const getFunds = () => {
    const fundsArray = [];
    for (const [id, fund] of hierarchicalService.funds) {
      fundsArray.push({
        ...fund,
        id: id
      });
    }
    return fundsArray;
  };

  useEffect(() => {
    // Populate sample data if not already populated
    if (hierarchicalService.companies.size === 0) {
      import('../data/sampleData.js').then(({ populateSampleData }) => {
        populateSampleData(hierarchicalService);
        const fundsData = getFunds();
        setFunds(fundsData);
        setFilteredFunds(fundsData);
      });
    } else {
      const fundsData = getFunds();
      setFunds(fundsData);
      setFilteredFunds(fundsData);
    }
  }, []);

  useEffect(() => {
    filterFunds();
  }, [searchTerm, selectedCategory, selectedStatus, selectedCountry, funds]);

  const filterFunds = () => {
    let filtered = funds;

    if (searchTerm) {
      filtered = filtered.filter(fund =>
        fund.fundName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fund.displayedName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fund.fundMgtCompany?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(fund => fund.category === selectedCategory);
    }

    if (selectedStatus) {
      filtered = filtered.filter(fund => fund.status === selectedStatus);
    }

    if (selectedCountry) {
      filtered = filtered.filter(fund => fund.country === selectedCountry);
    }

    setFilteredFunds(filtered);
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const headers = [
      'Fund ID', 'Fund Name', 'Management Company', 'Category', 'Country', 'Status',
      'Target Size', 'Capital Deployed', 'Inception Date', 'Industry Focus'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredFunds.map(fund => [
        fund.id,
        `"${fund.fundName || ''}"`,
        `"${fund.fundMgtCompany || ''}"`,
        `"${fund.category || ''}"`,
        `"${fund.country || ''}"`,
        `"${fund.status || ''}"`,
        fund.targetSize || '',
        fund.capitalDeployed || '',
        `"${fund.inceptionDate || ''}"`,
        `"${fund.industryFocus || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'funds_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Export successful',
      description: `Exported ${filteredFunds.length} funds to CSV`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const openFundDetail = (fund) => {
    setSelectedFund(fund);
    onOpen();
  };

  const navigateToCompany = (companyId) => {
    navigate('/companies');
    // You could add a way to highlight the specific company
    toast({
      title: 'Navigating to Companies',
      description: 'Use the search to find the specific company',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const navigateToInvestors = () => {
    navigate('/investors');
    toast({
      title: 'Navigating to Investors',
      description: 'View all investors in the system',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const getCategoryOptions = () => {
    const categories = [...new Set(funds.map(fund => fund.category).filter(Boolean))];
    return categories;
  };

  const getStatusOptions = () => {
    const statuses = [...new Set(funds.map(fund => fund.status).filter(Boolean))];
    return statuses;
  };

  const getCountryOptions = () => {
    const countries = [...new Set(funds.map(fund => fund.country).filter(Boolean))];
    return countries;
  };

  const formatCurrency = (amount) => {
    if (!amount) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const paginatedFunds = filteredFunds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredFunds.length / itemsPerPage);

  return (
    <Box bg={bgColor} minH="100vh">
      <VerticalHeader />
      <Box ml={{ base: 0, lg: "280px" }}>
        <Container maxW="1400px" py={8}>
          <VStack spacing={8} align="stretch">
            
        {/* Header */}
            <Box textAlign="center">
              <Heading size="lg" color="blue.600" mb={2}>
                Funds
                </Heading>
              <Text color="gray.600" fontSize="lg">
                Manage and explore fund information from the hierarchical data structure
                    </Text>
                  </Box>

    


            {/* Statistics */}
            <Grid templateColumns={{ base: "1fr", lg: "repeat(4, 1fr)" }} gap={6}>
              <Card bg="blue.50" shadow="md">
                <CardBody textAlign="center">
                        <Stat>
                    <StatLabel color="blue.700">Total Funds</StatLabel>
                    <StatNumber color="blue.800">{funds.length}</StatNumber>
                    <StatHelpText color="blue.600">In the system</StatHelpText>
                        </Stat>
                </CardBody>
              </Card>
              
              <Card bg="green.50" shadow="md">
                <CardBody textAlign="center">
                        <Stat>
                    <StatLabel color="green.700">Active Funds</StatLabel>
                    <StatNumber color="green.800">
                      {funds.filter(f => f.status === 'Active').length}
                          </StatNumber>
                    <StatHelpText color="green.600">Currently active</StatHelpText>
                        </Stat>
                </CardBody>
              </Card>
              
              <Card bg="purple.50" shadow="md">
                <CardBody textAlign="center">
                        <Stat>
                    <StatLabel color="purple.700">Total AUM</StatLabel>
                    <StatNumber color="purple.800">
                      {formatCurrency(funds.reduce((sum, f) => sum + (f.totalAUM || 0), 0))}
                          </StatNumber>
                    <StatHelpText color="purple.600">Combined assets</StatHelpText>
                        </Stat>
                </CardBody>
              </Card>
              
              <Card bg="orange.50" shadow="md">
                <CardBody textAlign="center">
                        <Stat>
                    <StatLabel color="orange.700">Countries</StatLabel>
                    <StatNumber color="orange.800">
                      {getCountryOptions().length}
                          </StatNumber>
                    <StatHelpText color="orange.600">Geographic presence</StatHelpText>
                        </Stat>
                </CardBody>
              </Card>
                  </Grid>

                  {/* Search and Filters */}
            <Card shadow="lg">
              <CardBody>
                <VStack spacing={6}>
                  {/* Search Bar */}
                  <InputGroup size="lg">
                        <InputLeftElement pointerEvents="none">
                      <Search color="gray.400" />
                        </InputLeftElement>
                        <Input
                      placeholder="Search funds by name, management company, or category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </InputGroup>
                      
                  {/* Filter Row */}
                  <HStack spacing={4} wrap="wrap">
                    <Box minW="200px">
                      <Text fontSize="sm" color="gray.600" mb={2}>Category</Text>
                      <Select
                        placeholder="All Categories"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        {getCategoryOptions().map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </Select>
                    </Box>
                      
                    <Box minW="200px">
                      <Text fontSize="sm" color="gray.600" mb={2}>Status</Text>
                      <Select
                        placeholder="All Statuses"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        {getStatusOptions().map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </Select>
                    </Box>

                    <Box minW="200px">
                      <Text fontSize="sm" color="gray.600" mb={2}>Country</Text>
                      <Select
                        placeholder="All Countries"
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                      >
                        {getCountryOptions().map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </Select>
                    </Box>

                    <Button
                      colorScheme="blue"
                      leftIcon={<Download />}
                      onClick={exportToCSV}
                    >
                      Export CSV
                      </Button>
                    </HStack>
                </VStack>
              </CardBody>
            </Card>

            {/* Results Summary */}
            <HStack justify="space-between">
              <Text color="gray.600">
                Showing {filteredFunds.length} of {funds.length} funds
              </Text>
              <Text color="gray.600">
                Page {currentPage} of {totalPages}
              </Text>
            </HStack>

                  {/* Funds Table */}
            <Card shadow="lg">
              <CardBody>
                  <Box overflowX="auto">
                  <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                        <Th>Fund Name</Th>
                        <Th>Management Company</Th>
                        <Th>Category</Th>
                        <Th>Country</Th>
                        <Th>Status</Th>
                        <Th>Target Size</Th>
                        <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                      {paginatedFunds.map((fund) => (
                        <Tr key={fund.id} _hover={{ bg: 'gray.50' }}>
                          <Td>
                            <VStack align="start" spacing={1}>
                              <Text fontWeight="medium">{fund.fundName}</Text>
                              <Text fontSize="xs" color="gray.500">
                                ID: {fund.id}
                              </Text>
                            </VStack>
                          </Td>
                          <Td>
                            <Text fontSize="sm">{fund.fundMgtCompany || '-'}</Text>
                          </Td>
                          <Td>
                            <Badge colorScheme="blue">{fund.category || '-'}</Badge>
                          </Td>
                          <Td>
                            <Text fontSize="sm">{fund.country || '-'}</Text>
                          </Td>
                          <Td>
                            <Badge 
                              colorScheme={
                                fund.status === 'Active' ? 'green' : 
                                fund.status === 'Closed' ? 'gray' : 'orange'
                              }
                            >
                              {fund.status || '-'}
                              </Badge>
                            </Td>
                          <Td>
                            <Text fontSize="sm" color="green.600">
                              {formatCurrency(fund.targetSize)}
                            </Text>
                            </Td>
                            <Td>
                            <HStack spacing={2}>
                                  <IconButton
                                    size="sm"
                                icon={<Eye />}
                                aria-label="View details"
                                onClick={() => openFundDetail(fund)}
                                colorScheme="blue"
                                variant="outline"
                              />
                              {fund.website && (
                                  <IconButton
                                    size="sm"
                                  icon={<ExternalLink />}
                                  aria-label="Visit website"
                                  onClick={() => window.open(fund.website, '_blank')}
                                  colorScheme="green"
                                  variant="outline"
                                />
                              )}
                              </HStack>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>

                {/* Pagination */}
                {totalPages > 1 && (
                  <HStack justify="center" mt={6} spacing={2}>
                    <Button
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      isDisabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    <Text fontSize="sm" color="gray.600">
                      Page {currentPage} of {totalPages}
                    </Text>
                    
                    <Button
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      isDisabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </HStack>
                )}
              </CardBody>
            </Card>

            {/* Related Data Links */}
            <Card shadow="lg">
              <CardHeader bg="blue.50">
                <Heading size="md" color="blue.700">
                  🔗 Related Data
                </Heading>
              </CardHeader>
              <CardBody>
                <Text color="gray.600" mb={4}>
                  Explore related entities in the hierarchical data structure:
                </Text>
                <HStack spacing={4} wrap="wrap">
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    leftIcon={<Building2 />}
                    onClick={() => navigate('/companies')}
                  >
                    View Companies ({hierarchicalService.companies.size})
                  </Button>
                  <Button
                    colorScheme="green"
                    variant="outline"
                    leftIcon={<Users />}
                    onClick={() => navigate('/investors')}
                  >
                    View Investors ({hierarchicalService.investors.size})
                  </Button>
                  <Button
                    colorScheme="purple"
                    variant="outline"
                    leftIcon={<DollarSign />}
                    onClick={() => navigate('/deals')}
                  >
                    View Deals ({hierarchicalService.deals.size})
                  </Button>
                  <Button
                    colorScheme="orange"
                    variant="outline"
                    leftIcon={<Globe />}
                    onClick={() => navigate('/query-editor')}
                  >
                    Query Editor
                  </Button>
                </HStack>
              </CardBody>
            </Card>
          </VStack>
        </Container>
      </Box>

      {/* Fund Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Fund Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedFund && (
              <VStack spacing={4} align="stretch">
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Fund Name</Text>
                    <Text>{selectedFund.fundName}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Management Company</Text>
                    <Text>{selectedFund.fundMgtCompany || '-'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Category</Text>
                    <Text>{selectedFund.category || '-'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Country</Text>
                    <Text>{selectedFund.country || '-'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Status</Text>
                    <Text>{selectedFund.status || '-'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Inception Date</Text>
                    <Text>{selectedFund.inceptionDate || '-'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Target Size</Text>
                    <Text color="green.600">{formatCurrency(selectedFund.targetSize)}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Capital Deployed</Text>
                    <Text color="blue.600">{formatCurrency(selectedFund.capitalDeployed)}</Text>
                  </Box>
        </Grid>
                
                <Box>
                  <Text fontWeight="bold" color="gray.600">Industry Focus</Text>
                  <Text>{selectedFund.industryFocus || 'No industry focus specified.'}</Text>
                </Box>

                <Box>
                  <Text fontWeight="bold" color="gray.600">Geographic Focus</Text>
                  <Text>{selectedFund.geoFocus || 'No geographic focus specified.'}</Text>
                </Box>

                <Box>
                  <Text fontWeight="bold" color="gray.600">Remarks</Text>
                  <Text>{selectedFund.remarks || 'No additional remarks.'}</Text>
                </Box>

                {/* Related Data Links in Modal */}
                <Box bg="gray.50" p={4} borderRadius="md">
                  <Text fontWeight="bold" color="gray.700" mb={3}>
                    🔗 Related Data Links
                  </Text>
                  <HStack spacing={3} wrap="wrap">
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => navigateToCompany()}
                    >
                      View Related Companies
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="green"
                      variant="outline"
                      onClick={navigateToInvestors}
                    >
                      View Fund Investors
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="purple"
                      variant="outline"
                      onClick={() => navigate('/deals')}
                    >
                      View Fund Deals
                    </Button>
                  </HStack>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Funds;
