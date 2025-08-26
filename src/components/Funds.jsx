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
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();

  const bgColor = useColorModeValue('white', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  // Get funds from hierarchical service
  const getFunds = () => {
    const fundsArray = [];
    for (const [id, fund] of hierarchicalService.funds) {
      // Ensure we have proper fund names and meaningful data
      const fundName = fund.fundName || fund.displayedName || `Fund ${id}`;
      const category = fund.category || fund.focus || 'Unknown';
      const managementCompany = fund.fundMgtCompany || fund.displayedMgtCompany || 'Unknown';
      const country = fund.country || 'Unknown';
      
      // Get related data for this fund
      const relatedCompanies = hierarchicalService.getFundRelatedCompanies ? hierarchicalService.getFundRelatedCompanies(id) || [] : [];
      const relatedInvestors = hierarchicalService.getFundRelatedInvestors ? hierarchicalService.getFundRelatedInvestors(id) || [] : [];
      const relatedDeals = hierarchicalService.getFundRelatedDeals ? hierarchicalService.getFundRelatedDeals(id) || [] : [];
      
      fundsArray.push({
        ...fund,
        id: id,
        fundName: fundName,
        displayedName: fundName,
        category: category,
        fundMgtCompany: managementCompany,
        displayedMgtCompany: managementCompany,
        country: country,
        relatedCompanies: relatedCompanies,
        relatedInvestors: relatedInvestors,
        relatedDeals: relatedDeals
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

  // Check for highlight parameter in URL
  useEffect(() => {
    const highlightId = searchParams.get('highlight');
    if (highlightId) {
      // Find the fund and filter to show only that fund
      const fundIndex = funds.findIndex(fund => fund.id === highlightId);
      if (fundIndex !== -1) {
        const highlightedFund = funds[fundIndex];
        // Filter to show only the highlighted fund
        setFilteredFunds([highlightedFund]);
        setCurrentPage(1);
        // Set search term to help user see what's filtered
        setSearchTerm(highlightedFund.fundName || highlightedFund.displayedName || highlightId);
        toast({
          title: 'Fund Filtered',
          description: `Showing only: ${highlightedFund.fundName || highlightedFund.displayedName || highlightId}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }, [funds, searchParams, toast]);

  useEffect(() => {
    filterFunds();
  }, [searchTerm, selectedCategory, selectedStatus, selectedCountry, funds]);

  const filterFunds = () => {
    let filtered = funds;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(fund =>
        fund.fundName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fund.displayedName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fund.fundMgtCompany?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(fund => fund.category === selectedCategory);
    }

    // Apply status filter
    if (selectedStatus) {
      filtered = filtered.filter(fund => fund.status === selectedStatus);
    }

    // Apply country filter
    if (selectedCountry) {
      filtered = filtered.filter(fund => fund.country === selectedCountry);
    }

    setFilteredFunds(filtered);
    setCurrentPage(1);
  };

  // Clear all filters and show all funds
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedStatus('');
    setSelectedCountry('');
    setFilteredFunds(funds);
    setCurrentPage(1);
    // Clear URL parameters
    setSearchParams({});
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
    navigate(`/companies?highlight=${companyId}`);
    toast({
      title: 'Navigating to Company',
      description: 'Filtering to show the specific company',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const navigateToInvestor = (investorId) => {
    navigate(`/investors?highlight=${investorId}`);
    toast({
      title: 'Navigating to Investor',
      description: 'Filtering to show the specific investor',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const navigateToDeal = (dealId) => {
    navigate(`/deals?highlight=${dealId}`);
    toast({
      title: 'Navigating to Deal',
      description: 'Filtering to show the specific deal',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const getCategoryOptions = () => {
    const categories = [...new Set(funds.map(fund => fund.category).filter(Boolean))];
    return categories.sort();
  };

  const getStatusOptions = () => {
    const statuses = [...new Set(funds.map(fund => fund.status).filter(Boolean))];
    return statuses.sort();
  };

  const getCountryOptions = () => {
    const countries = [...new Set(funds.map(fund => fund.country).filter(Boolean))];
    return countries.sort();
  };

  const formatCurrency = (amount) => {
    if (!amount) return '$0';
    // The CSV data shows target sizes in millions, so multiply by 1M if the number is small
    let displayAmount = amount;
    if (amount < 1000 && amount > 0) {
      displayAmount = amount * 1000000; // Convert to actual USD amount
    }
    
    // Convert to millions if the number is large
    if (displayAmount >= 1000000) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        notation: 'compact',
        compactDisplay: 'short'
      }).format(displayAmount);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(displayAmount);
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
           

    

                  {/* Search and Filters */}
            <Card 
              bg="rgba(59, 130, 246, 0.05)"
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor="rgba(59, 130, 246, 0.2)"
              shadow="xl"
              borderRadius="2xl"
              overflow="hidden"
            >
              <CardBody p={4}>
                <VStack spacing={4} align="stretch">
                

                  {/* Search Bar */}
                  <Box>
                    <Text fontSize="xs" color="blue.600" mb={1} fontWeight="medium">
                      Search
                    </Text>
                    <InputGroup size="md">
                      <InputLeftElement pointerEvents="none">
                        <Search color="blue.400" size={18} />
                      </InputLeftElement>
                      <Input
                        placeholder="Search funds by name, management company, or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        bg="white"
                        border="1px solid"
                        borderColor="rgba(59, 130, 246, 0.2)"
                        _focus={{ 
                          boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.3)',
                          borderColor: 'blue.400'
                        }}
                        _hover={{ borderColor: 'blue.300' }}
                        borderRadius="lg"
                      />
                    </InputGroup>
                  </Box>

                  {/* Filters Row */}
                  <Box>
                    <Text fontSize="xs" color="blue.600" mb={2} fontWeight="medium">
                      Filters
                    </Text>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={3}>
                      <Box>
                        <Text fontSize="xs" color="blue.600" mb={1}>Category</Text>
                        <Select
                          size="sm"
                          placeholder="All Categories"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          bg="white"
                          border="1px solid"
                          borderColor="rgba(59, 130, 246, 0.2)"
                          _focus={{ borderColor: 'blue.400' }}
                          borderRadius="md"
                        >
                          {getCategoryOptions().map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </Select>
                      </Box>

                      <Box>
                        <Text fontSize="xs" color="blue.600" mb={1}>Status</Text>
                        <Select
                          size="sm"
                          placeholder="All Statuses"
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          bg="white"
                          border="1px solid"
                          borderColor="rgba(59, 130, 246, 0.2)"
                          _focus={{ borderColor: 'blue.400' }}
                          borderRadius="md"
                        >
                          {getStatusOptions().map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </Select>
                      </Box>

                      <Box>
                        <Text fontSize="xs" color="blue.600" mb={1}>Country</Text>
                        <Select
                          size="sm"
                          placeholder="All Countries"
                          value={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                          bg="white"
                          border="1px solid"
                          borderColor="rgba(59, 130, 246, 0.2)"
                          _focus={{ borderColor: 'blue.400' }}
                          borderRadius="md"
                        >
                          {getCountryOptions().map(country => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </Select>
                      </Box>
                    </Grid>
                  </Box>

                  {/* Action Buttons */}
                  <HStack spacing={3} justify="center" pt={1}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      leftIcon={<Download size={16} />}
                      onClick={exportToCSV}
                      bg="blue.500"
                      _hover={{ bg: 'blue.600' }}
                      _active={{ bg: 'blue.700' }}
                      borderRadius="lg"
                      px={6}
                    >
                      Export CSV
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="gray"
                      variant="outline"
                      onClick={clearFilters}
                      borderColor="rgba(59, 130, 246, 0.3)"
                      color="blue.600"
                      _hover={{ 
                        bg: 'rgba(59, 130, 246, 0.05)',
                        borderColor: 'blue.400'
                      }}
                      borderRadius="lg"
                      px={6}
                    >
                      Clear All Filters
                    </Button>
                  </HStack>

                  {/* Active Filters Summary */}
                  {(selectedCategory || selectedStatus || selectedCountry) && (
                    <Box>
                      <Text fontSize="xs" color="blue.600" mb={1} fontWeight="medium">
                        Active Filters
                      </Text>
                      <HStack spacing={1} wrap="wrap">
                        {selectedCategory && (
                          <Badge colorScheme="blue" variant="subtle" borderRadius="full" px={2} py={1} fontSize="xs">
                            Category: {selectedCategory}
                          </Badge>
                        )}
                        {selectedStatus && (
                          <Badge colorScheme="green" variant="subtle" borderRadius="full" px={2} py={1} fontSize="xs">
                            Status: {selectedStatus}
                          </Badge>
                        )}
                        {selectedCountry && (
                          <Badge colorScheme="purple" variant="subtle" borderRadius="full" px={2} py={1} fontSize="xs">
                            Country: {selectedCountry}
                          </Badge>
                        )}
                      </HStack>
                    </Box>
                  )}
                </VStack>
              </CardBody>
            </Card>

            {/* Results Summary */}
            <Card 
              bg="rgba(59, 130, 246, 0.05)"
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor="rgba(59, 130, 246, 0.2)"
              shadow="xl"
              borderRadius="2xl"
              overflow="hidden"
            >
              <CardBody p={4}>
                <HStack justify="space-between" align="center">
                  <VStack align="start" spacing={1}>
                    <Text fontSize="lg" fontWeight="bold" color="blue.700">
                      Fund Search Results
                    </Text>
                    <Text fontSize="sm" color="blue.500">
                      Showing {filteredFunds.length} of {funds.length} funds
                      {filteredFunds.length !== funds.length && ` (filtered from ${funds.length} total)`}
                    </Text>
                  </VStack>
                  <HStack spacing={3}>
                    <Badge colorScheme="blue" variant="subtle" fontSize="sm" px={3} py={1}>
                      {filteredFunds.length} Funds
                    </Badge>
                    {filteredFunds.length !== funds.length && (
                      <Badge colorScheme="green" variant="subtle" fontSize="sm" px={3} py={1}>
                        {funds.length - filteredFunds.length} Hidden
                      </Badge>
                    )}
                    <Text fontSize="sm" color="blue.600" fontWeight="medium">
                      Page {currentPage} of {totalPages}
                    </Text>
                  </HStack>
                </HStack>
              </CardBody>
            </Card>

                  {/* Funds Table */}
            <Card 
              bg="rgba(59, 130, 246, 0.05)"
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor="rgba(59, 130, 246, 0.2)"
              shadow="xl"
              borderRadius="2xl"
              overflow="hidden"
            >
              <CardBody p={0}>
                <Box overflowX="auto">
                  <Table variant="simple" size="sm">
                    <Thead position="sticky" top={0} bg="rgba(59, 130, 246, 0.1)" zIndex={1} borderBottom="1px solid" borderColor="rgba(59, 130, 246, 0.2)">
                      <Tr>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Fund Name</Th>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Management Company</Th>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Category</Th>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Country</Th>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Status</Th>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Target Size</Th>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Related Companies</Th>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Related Investors</Th>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Related Deals</Th>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {paginatedFunds.map((fund) => (
                        <Tr key={fund.id} _hover={{ bg: 'rgba(59, 130, 246, 0.05)' }} fontSize="xs" borderBottom="1px solid" borderColor="rgba(59, 130, 246, 0.1)" height="80px">
                          <Td px={3} py={3}>
                            <VStack align="start" spacing={1}>
                              <Text fontWeight="medium" noOfLines={2}>
                                {fund.fundName}
                              </Text>
                              <Text fontSize="xs" color="gray.500">
                                ID: {fund.id}
                              </Text>
                            </VStack>
                          </Td>
                          <Td px={3} py={3}>
                            <Text fontSize="sm" noOfLines={2}>{fund.chineseName || '-'}</Text>
                          </Td>
                          <Td px={3} py={3}>
                            <Badge colorScheme="green" noOfLines={1}>{fund.category}</Badge>
                          </Td>
                          <Td px={3} py={3}>
                            <Text fontSize="sm" noOfLines={1}>{fund.fundMgtCompany}</Text>
                          </Td>
                          <Td px={3} py={3}>
                            <Text fontSize="sm" noOfLines={1}>{formatCurrency(fund.fundSize)}</Text>
                          </Td>
                          <Td px={3} py={3}>
                            <Badge 
                              colorScheme={
                                fund.status === 'Active' ? 'green' : 
                                fund.status === 'Raising' ? 'blue' : 
                                fund.status === 'Closed' ? 'orange' : 'gray'
                              }
                              noOfLines={1}
                            >
                              {fund.status}
                            </Badge>
                          </Td>
                          <Td px={3} py={3}>
                            <Text fontSize="sm" noOfLines={1}>{fund.country}</Text>
                          </Td>
                          <Td px={3} py={3}>
                            <VStack align="start" spacing={1} maxH="60px" overflow="hidden">
                              {fund.relatedInvestors && fund.relatedInvestors.length > 0 ? (
                                <>
                                  {fund.relatedInvestors.slice(0, 2).map((investor, idx) => (
                                    <Link
                                      key={investor.id}
                                      color="blue.500"
                                      fontSize="xs"
                                      onClick={() => navigateToInvestor(investor.id)}
                                      _hover={{ textDecoration: 'underline' }}
                                      cursor="pointer"
                                      noOfLines={1}
                                    >
                                      {hierarchicalService.getEntityName('investor', investor.id)}
                                    </Link>
                                  ))}
                                  {fund.relatedInvestors.length > 2 && (
                                    <Button
                                      size="xs"
                                      variant="ghost"
                                      color="blue.500"
                                      onClick={() => {
                                        setSelectedFund(fund);
                                        onOpen();
                                      }}
                                    >
                                      +{fund.relatedInvestors.length - 2} more
                                    </Button>
                                  )}
                                </>
                              ) : (
                                <Text fontSize="xs" color="gray.400">-</Text>
                              )}
                            </VStack>
                          </Td>
                          <Td px={3} py={3}>
                            <VStack align="start" spacing={1} maxH="60px" overflow="hidden">
                              {fund.relatedCompanies && fund.relatedCompanies.length > 0 ? (
                                <>
                                  {fund.relatedCompanies.slice(0, 2).map((company, idx) => (
                                    <Link
                                      key={company.id}
                                      color="green.500"
                                      fontSize="xs"
                                      onClick={() => navigateToCompany(company.id)}
                                      _hover={{ textDecoration: 'underline' }}
                                      cursor="pointer"
                                      noOfLines={1}
                                    >
                                      {hierarchicalService.getEntityName('company', company.id)}
                                    </Link>
                                  ))}
                                  {fund.relatedCompanies.length > 2 && (
                                    <Button
                                      size="xs"
                                      variant="ghost"
                                      color="green.500"
                                      onClick={() => {
                                        setSelectedFund(fund);
                                        onOpen();
                                      }}
                                    >
                                      +{fund.relatedCompanies.length - 2} more
                                    </Button>
                                  )}
                                </>
                              ) : (
                                <Text fontSize="xs" color="gray.400">-</Text>
                              )}
                            </VStack>
                          </Td>
                          <Td px={3} py={3}>
                            <VStack align="start" spacing={1} maxH="60px" overflow="hidden">
                              {fund.relatedDeals && fund.relatedDeals.length > 0 ? (
                                <>
                                  {fund.relatedDeals.slice(0, 2).map((deal, idx) => (
                                    <Link
                                      key={deal.id}
                                      color="purple.500"
                                      fontSize="xs"
                                      onClick={() => navigateToDeal(deal.id)}
                                      _hover={{ textDecoration: 'underline' }}
                                      cursor="pointer"
                                      noOfLines={1}
                                    >
                                      {hierarchicalService.getEntityName('deal', deal.id)}
                                    </Link>
                                  ))}
                                  {fund.relatedDeals.length > 2 && (
                                    <Button
                                      size="xs"
                                      variant="ghost"
                                      color="purple.500"
                                      onClick={() => {
                                        setSelectedFund(fund);
                                        onOpen();
                                      }}
                                    >
                                      +{fund.relatedDeals.length - 2} more
                                    </Button>
                                  )}
                                </>
                              ) : (
                                <Text fontSize="xs" color="gray.400">-</Text>
                              )}
                            </VStack>
                          </Td>
                          <Td px={3} py={3}>
                            <IconButton
                              size="sm"
                              icon={<Eye />}
                              aria-label="View details"
                              onClick={() => openFundDetail(fund)}
                              colorScheme="blue"
                              variant="outline"
                            />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                    </Table>
                  </Box>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box 
                    bg="rgba(59, 130, 246, 0.05)"
                    borderTop="1px solid"
                    borderColor="rgba(59, 130, 246, 0.1)"
                    p={3}
                  >
                    <HStack justify="center" spacing={3}>
                      <Button
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        isDisabled={currentPage === 1}
                        colorScheme="blue"
                        variant="outline"
                        borderColor="rgba(59, 130, 246, 0.3)"
                        _hover={{ 
                          bg: 'rgba(59, 130, 246, 0.1)',
                          borderColor: 'blue.400'
                        }}
                        borderRadius="lg"
                        px={4}
                      >
                        Previous
                      </Button>
                      
                      <HStack spacing={2} align="center">
                        <Text fontSize="sm" color="blue.600" fontWeight="medium">
                          Page {currentPage} of {totalPages}
                        </Text>
                        <Text fontSize="xs" color="blue.500">
                          ({paginatedFunds.length} items per page)
                        </Text>
                      </HStack>
                      
                      <Button
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        isDisabled={currentPage === totalPages}
                        colorScheme="blue"
                        variant="outline"
                        borderColor="rgba(59, 130, 246, 0.3)"
                        _hover={{ 
                          bg: 'rgba(59, 130, 246, 0.1)',
                          borderColor: 'blue.400'
                        }}
                        borderRadius="lg"
                        px={4}
                      >
                        Next
                      </Button>
                    </HStack>
                  </Box>
                )}
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
                      onClick={() => navigate('/investors')}
                    >
                      View Fund Investors
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="purple"
                      variant="outline"
                      onClick={() => navigateToDeal()}
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
