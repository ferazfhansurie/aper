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
  useColorModeValue,
  Link
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

const Investors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedAffiliation, setSelectedAffiliation] = useState('');
  const [investors, setInvestors] = useState([]);
  const [filteredInvestors, setFilteredInvestors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const bgColor = useColorModeValue('white', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  // Get investors from hierarchical service
  const getInvestors = () => {
    const investorsArray = [];
    for (const [id, investor] of hierarchicalService.investors) {
      // Ensure we have a proper investor name
      const investorName = investor.investorName || investor.displayedName || investor.legalName || `Investor ${id}`;
      
      investorsArray.push({
        ...investor,
        id: id,
        investorName: investorName,
        displayedName: investorName
      });
    }
    return investorsArray;
  };

  useEffect(() => {
    // Populate sample data if not already populated
    if (hierarchicalService.companies.size === 0) {
      import('../data/sampleData.js').then(({ populateSampleData }) => {
        populateSampleData(hierarchicalService);
        const investorsData = getInvestors();
        setInvestors(investorsData);
        setFilteredInvestors(investorsData);
      });
    } else {
      const investorsData = getInvestors();
      setInvestors(investorsData);
      setFilteredInvestors(investorsData);
    }
  }, []);

  // Check for highlight parameter in URL
  useEffect(() => {
    const highlightId = searchParams.get('highlight');
    if (highlightId) {
      // Find the investor and filter to show only that investor
      const investorIndex = investors.findIndex(investor => investor.id === highlightId);
      if (investorIndex !== -1) {
        const highlightedInvestor = investors[investorIndex];
        // Filter to show only the highlighted investor
        setFilteredInvestors([highlightedInvestor]);
        setCurrentPage(1);
        // Set search term to help user see what's filtered
        setSearchTerm(highlightedInvestor.investorName || highlightedInvestor.displayedName || highlightId);
        toast({
          title: 'Investor Filtered',
          description: `Showing only: ${highlightedInvestor.investorName || highlightedInvestor.displayedName || highlightId}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }, [investors, searchParams, toast]);

  useEffect(() => {
    filterInvestors();
  }, [searchTerm, selectedCategory, selectedLocation, selectedAffiliation, investors]);

  const filterInvestors = () => {
    let filtered = investors;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(investor => {
        const name = investor.investorName || investor.displayedName || investor.legalName || '';
        const chineseName = investor.chineseName || '';
        const category = investor.firmCategory || '';
        const location = investor.firmLocation || '';
        
        return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               chineseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
               category.toLowerCase().includes(searchTerm.toLowerCase()) ||
               location.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(investor => investor.firmCategory === selectedCategory);
    }

    // Apply location filter
    if (selectedLocation) {
      filtered = filtered.filter(investor => investor.firmLocation === selectedLocation);
    }

    // Apply affiliation filter
    if (selectedAffiliation) {
      filtered = filtered.filter(investor => investor.affiliation === selectedAffiliation);
    }

    setFilteredInvestors(filtered);
    setCurrentPage(1);
  };

  // Clear all filters and show all investors
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLocation('');
    setSelectedAffiliation('');
    setFilteredInvestors(investors);
    setCurrentPage(1);
    // Clear URL parameters
    setSearchParams({});
  };

  const exportToCSV = () => {
    const headers = [
      'Investor ID', 'Investor Name', 'Chinese Name', 'Firm Category', 'Location', 'Affiliation',
      'Website', 'Subsidiary Of', 'Remarks'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredInvestors.map(investor => [
        investor.id,
        `"${investor.investorName || ''}"`,
        `"${investor.chineseName || ''}"`,
        `"${investor.firmCategory || ''}"`,
        `"${investor.firmLocation || ''}"`,
        `"${investor.affiliation || ''}"`,
        `"${investor.website || ''}"`,
        `"${investor.subsidiaryOf || ''}"`,
        `"${investor.remarks || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'investors_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Export successful',
      description: `Exported ${filteredInvestors.length} investors to CSV`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const openInvestorDetail = (investor) => {
    setSelectedInvestor(investor);
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

  const navigateToFund = (fundId) => {
    navigate(`/funds?highlight=${fundId}`);
    toast({
      title: 'Navigating to Fund',
      description: 'Filtering to show the specific fund',
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
    const categories = [...new Set(investors.map(investor => investor.firmCategory).filter(Boolean))];
    return categories.sort();
  };

  const getLocationOptions = () => {
    const locations = [...new Set(investors.map(investor => investor.firmLocation).filter(Boolean))];
    return locations.sort();
  };

  const getAffiliationOptions = () => {
    const affiliations = [...new Set(investors.map(investor => investor.affiliation).filter(Boolean))];
    return affiliations.sort();
  };

  const paginatedInvestors = filteredInvestors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredInvestors.length / itemsPerPage);

  return (
    <Box bg={bgColor} minH="100vh">
      <VerticalHeader />
      <Box ml={{ base: 0, lg: "280px" }}>
        <Container maxW="1400px" py={8}>
          <VStack spacing={8} align="stretch">
            
          

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
                        placeholder="Search investors by name, category, or location..."
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
                    <Text fontSize="sm" color="blue.600" mb={3} fontWeight="medium">
                      Filters
                    </Text>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={4}>
                      <Box>
                        <Text fontSize="xs" color="blue.600" mb={2}>Firm Category</Text>
                        <Select
                          size="md"
                          placeholder="All Categories"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          bg="white"
                          border="1px solid"
                          borderColor="rgba(59, 130, 246, 0.2)"
                          _focus={{ borderColor: 'blue.400' }}
                          borderRadius="lg"
                        >
                          {getCategoryOptions().map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </Select>
                      </Box>

                      <Box>
                        <Text fontSize="xs" color="blue.600" mb={2}>Location</Text>
                        <Select
                          size="md"
                          placeholder="All Locations"
                          value={selectedLocation}
                          onChange={(e) => setSelectedLocation(e.target.value)}
                          bg="white"
                          border="1px solid"
                          borderColor="rgba(59, 130, 246, 0.2)"
                          _focus={{ borderColor: 'blue.400' }}
                          borderRadius="lg"
                        >
                          {getLocationOptions().map(location => (
                            <option key={location} value={location}>{location}</option>
                          ))}
                        </Select>
                      </Box>

                      <Box>
                        <Text fontSize="xs" color="blue.600" mb={2}>Affiliation</Text>
                        <Select
                          size="md"
                          placeholder="All Affiliations"
                          value={selectedAffiliation}
                          onChange={(e) => setSelectedAffiliation(e.target.value)}
                          bg="white"
                          border="1px solid"
                          borderColor="rgba(59, 130, 246, 0.2)"
                          _focus={{ borderColor: 'blue.400' }}
                          borderRadius="lg"
                        >
                          {getAffiliationOptions().map(affiliation => (
                            <option key={affiliation} value={affiliation}>{affiliation}</option>
                          ))}
                        </Select>
                      </Box>
                    </Grid>
                  </Box>

                  {/* Action Buttons */}
                  <HStack spacing={4} justify="center" pt={2}>
                    <Button
                      size="md"
                      colorScheme="blue"
                      leftIcon={<Download size={18} />}
                      onClick={exportToCSV}
                      bg="blue.500"
                      _hover={{ bg: 'blue.600' }}
                      _active={{ bg: 'blue.700' }}
                      borderRadius="xl"
                      px={8}
                    >
                      Export CSV
                    </Button>
                    <Button
                      size="md"
                      colorScheme="gray"
                      variant="outline"
                      onClick={clearFilters}
                      borderColor="rgba(59, 130, 246, 0.3)"
                      color="blue.600"
                      _hover={{ 
                        bg: 'rgba(59, 130, 246, 0.05)',
                        borderColor: 'blue.400'
                      }}
                      borderRadius="xl"
                      px={8}
                    >
                      Clear All Filters
                    </Button>
                  </HStack>

                  {/* Active Filters Summary */}
                  {(selectedCategory || selectedLocation || selectedAffiliation) && (
                    <Box>
                      <Text fontSize="sm" color="blue.600" mb={2} fontWeight="medium">
                        Active Filters
                      </Text>
                      <HStack spacing={2} wrap="wrap">
                        {selectedCategory && (
                          <Badge colorScheme="blue" variant="subtle" borderRadius="full" px={3} py={1}>
                            Category: {selectedCategory}
                          </Badge>
                        )}
                        {selectedLocation && (
                          <Badge colorScheme="green" variant="subtle" borderRadius="full" px={3} py={1}>
                            Location: {selectedLocation}
                          </Badge>
                        )}
                        {selectedAffiliation && (
                          <Badge colorScheme="purple" variant="subtle" borderRadius="full" px={3} py={1}>
                            Affiliation: {selectedAffiliation}
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
                      Investor Search Results
                    </Text>
                    <Text fontSize="sm" color="blue.500">
                      Showing {filteredInvestors.length} of {investors.length} investors
                      {filteredInvestors.length !== investors.length && ` (filtered from ${investors.length} total)`}
                    </Text>
                  </VStack>
                  <HStack spacing={3}>
                    <Badge colorScheme="blue" variant="subtle" fontSize="sm" px={3} py={1}>
                      {filteredInvestors.length} Investors
                    </Badge>
                    {filteredInvestors.length !== investors.length && (
                      <Badge colorScheme="green" variant="subtle" fontSize="sm" px={3} py={1}>
                        {investors.length - filteredInvestors.length} Hidden
                      </Badge>
                    )}
                    <Text fontSize="sm" color="blue.600" fontWeight="medium">
                      Page {currentPage} of {totalPages}
                    </Text>
                  </HStack>
                </HStack>
              </CardBody>
            </Card>

            {/* Investors Table */}
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
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Investor Name</Th>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Chinese Name</Th>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Firm Category</Th>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Location</Th>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Affiliation</Th>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Website</Th>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Related Companies</Th>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Related Deals</Th>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Related Funds</Th>
                        <Th px={3} py={3} fontSize="xs" fontWeight="bold" color="blue.700">Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {paginatedInvestors.map((investor) => {
                        // Get related data for this investor
                        const relatedCompanies = hierarchicalService.getInvestorRelatedCompanies(investor.id) || [];
                        const relatedDeals = hierarchicalService.getInvestorRelatedDeals(investor.id) || [];
                        const relatedFunds = hierarchicalService.getInvestorRelatedFunds(investor.id) || [];
                        
                        return (
                        <Tr key={investor.id} _hover={{ bg: 'rgba(59, 130, 246, 0.05)' }} fontSize="xs" borderBottom="1px solid" borderColor="rgba(59, 130, 246, 0.1)" height="80px">
                          <Td px={3} py={3}>
                            <VStack align="start" spacing={1}>
                              <Text fontWeight="medium" noOfLines={2}>
                                {investor.investorName || investor.displayedName || investor.legalName || `Investor ${investor.id}`}
                              </Text>
                              <Text fontSize="xs" color="gray.500">
                                ID: {investor.id}
                              </Text>
                            </VStack>
                          </Td>
                          <Td px={3} py={3}>
                            <Text fontSize="sm" noOfLines={2}>{investor.chineseName || '-'}</Text>
                          </Td>
                          <Td px={3} py={3}>
                            <Badge colorScheme="blue" noOfLines={1}>{investor.firmCategory || '-'}</Badge>
                          </Td>
                          <Td px={3} py={3}>
                            <Text fontSize="sm" noOfLines={1}>{investor.firmLocation || '-'}</Text>
                          </Td>
                          <Td px={3} py={3}>
                            <Badge 
                              colorScheme={
                                investor.affiliation === 'Independent' ? 'green' : 
                                investor.affiliation === 'Corporate' ? 'purple' : 'orange'
                              }
                              noOfLines={1}
                            >
                              {investor.affiliation || '-'}
                            </Badge>
                          </Td>
                          <Td px={3} py={3}>
                            {investor.website ? (
                              <IconButton
                                size="sm"
                                icon={<ExternalLink />}
                                aria-label="Visit website"
                                onClick={() => window.open(investor.website, '_blank')}
                                colorScheme="green"
                                variant="outline"
                              />
                            ) : (
                              <Text fontSize="sm" color="gray.400">-</Text>
                            )}
                          </Td>
                          <Td px={3} py={3}>
                            <VStack align="start" spacing={1} maxH="60px" overflow="hidden">
                                {relatedCompanies.length > 0 ? (
                                  <>
                                    {relatedCompanies.slice(0, 2).map((company, idx) => (
                                      <Link
                                        key={company.id}
                                        color="blue.500"
                                        fontSize="xs"
                                        onClick={() => navigateToCompany(company.id)}
                                        _hover={{ textDecoration: 'underline' }}
                                        cursor="pointer"
                                        noOfLines={1}
                                      >
                                        {hierarchicalService.getEntityName('company', company.id)}
                                      </Link>
                                    ))}
                                    {relatedCompanies.length > 2 && (
                                      <Button
                                        size="xs"
                                        variant="ghost"
                                        color="blue.500"
                                        onClick={() => {
                                          setSelectedInvestor(investor);
                                          onOpen();
                                        }}
                                      >
                                        +{relatedCompanies.length - 2} more
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
                                {relatedDeals.length > 0 ? (
                                  <>
                                    {relatedDeals.slice(0, 2).map((deal, idx) => (
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
                                    {relatedDeals.length > 2 && (
                                      <Button
                                        size="xs"
                                        variant="ghost"
                                        color="purple.500"
                                        onClick={() => {
                                          setSelectedInvestor(investor);
                                          onOpen();
                                        }}
                                      >
                                        +{relatedDeals.length - 2} more
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
                                {relatedFunds.length > 0 ? (
                                  <>
                                    {relatedFunds.slice(0, 2).map((fund, idx) => (
                                      <Link
                                        key={fund.id}
                                        color="green.500"
                                        fontSize="xs"
                                        onClick={() => navigateToFund(fund.id)}
                                        _hover={{ textDecoration: 'underline' }}
                                        cursor="pointer"
                                        noOfLines={1}
                                      >
                                        {hierarchicalService.getEntityName('fund', fund.id)}
                                      </Link>
                                    ))}
                                    {relatedFunds.length > 2 && (
                                      <Button
                                        size="xs"
                                        variant="ghost"
                                        color="green.500"
                                        onClick={() => {
                                          setSelectedInvestor(investor);
                                          onOpen();
                                        }}
                                      >
                                        +{relatedFunds.length - 2} more
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
                              onClick={() => openInvestorDetail(investor)}
                              colorScheme="blue"
                              variant="outline"
                            />
                          </Td>
                        </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </Box>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box 
                    bg="rgba(59, 130, 246, 0.05)"
                    borderTop="1px solid"
                    borderColor="rgba(59, 130, 246, 0.1)"
                    p={4}
                  >
                    <HStack justify="center" spacing={4}>
                      <Button
                        size="md"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        isDisabled={currentPage === 1}
                        colorScheme="blue"
                        variant="outline"
                        borderColor="rgba(59, 130, 246, 0.3)"
                        _hover={{ 
                          bg: 'rgba(59, 130, 246, 0.1)',
                          borderColor: 'blue.400'
                        }}
                        borderRadius="xl"
                        px={6}
                      >
                        Previous
                      </Button>
                      
                      <HStack spacing={2} align="center">
                        <Text fontSize="sm" color="blue.600" fontWeight="medium">
                          Page {currentPage} of {totalPages}
                        </Text>
                        <Text fontSize="xs" color="blue.500">
                          ({paginatedInvestors.length} items per page)
                        </Text>
                      </HStack>
                      
                      <Button
                        size="md"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        isDisabled={currentPage === totalPages}
                        colorScheme="blue"
                        variant="outline"
                        borderColor="rgba(59, 130, 246, 0.3)"
                        _hover={{ 
                          bg: 'rgba(59, 130, 246, 0.1)',
                          borderColor: 'blue.400'
                        }}
                        borderRadius="xl"
                        px={6}
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

      {/* Investor Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <VStack align="start" spacing={2}>
              <Text fontSize="2xl" fontWeight="bold">
                {selectedInvestor?.investorName || selectedInvestor?.displayedName || selectedInvestor?.legalName || 'Unknown Investor'}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Investor Details & Relationships
              </Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedInvestor && (
              <VStack spacing={6} align="stretch">
                {/* Basic Investor Information */}
                <Card>
                  <CardHeader bg="blue.50">
                    <Heading size="md" color="blue.700">
                      Investor Information
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <Box>
                        <Text fontWeight="bold" color="gray.600">Investor Name</Text>
                        <Text>{selectedInvestor.investorName || selectedInvestor.displayedName || selectedInvestor.legalName || 'Unknown'}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" color="gray.600">Chinese Name</Text>
                        <Text>{selectedInvestor.chineseName || 'Not provided'}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" color="gray.600">Firm Category</Text>
                        <Badge colorScheme="blue">{selectedInvestor.firmCategory || 'Unknown'}</Badge>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" color="gray.600">Location</Text>
                        <Text>{selectedInvestor.firmLocation || 'Unknown'}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" color="gray.600">Affiliation</Text>
                        <Badge 
                          colorScheme={
                            selectedInvestor.affiliation === 'Independent' ? 'green' : 
                            selectedInvestor.affiliation === 'Corporate' ? 'purple' : 'orange'
                          }
                        >
                          {selectedInvestor.affiliation || 'Unknown'}
                        </Badge>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" color="gray.600">Website</Text>
                        {selectedInvestor.website ? (
                          <Link color="blue.500" href={selectedInvestor.website} isExternal>
                            {selectedInvestor.website} <ExternalLink size={14} />
                          </Link>
                        ) : (
                          <Text>Not provided</Text>
                        )}
                      </Box>
                    </Grid>
                    
                    {/* Additional Information */}
                    <Box mt={4} pt={4} borderTop="1px solid" borderColor="gray.200">
                      <Text fontWeight="bold" color="gray.700" mb={3}>Additional Information</Text>
                      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <Box>
                          <Text fontWeight="bold" color="gray.600">Latest Name</Text>
                          <Text>{selectedInvestor.latestName || selectedInvestor.displayedName || 'No alternative name'}</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="bold" color="gray.600">Subsidiary Of</Text>
                          <Text>{selectedInvestor.subsidiaryOf || 'Not a subsidiary'}</Text>
                        </Box>
                        <Box colSpan={2}>
                          <Text fontWeight="bold" color="gray.600">Remarks</Text>
                          <Text>{selectedInvestor.remarks || selectedInvestor.description || 'No additional remarks.'}</Text>
                        </Box>
                      </Grid>
                    </Box>
                  </CardBody>
                </Card>

                {/* Related Companies */}
                <Card>
                  <CardHeader bg="green.50">
                    <Heading size="md" color="green.700">
                      Related Companies ({hierarchicalService.getCompanyRelatedInvestors(selectedInvestor.id)?.length || 0})
                    </Heading>
                    <Text fontSize="sm" color="green.600">
                      All companies this investor has invested in
                    </Text>
                  </CardHeader>
                  <CardBody>
                    {hierarchicalService.getCompanyRelatedInvestors(selectedInvestor.id)?.length > 0 ? (
                      <VStack align="stretch" spacing={3}>
                        {hierarchicalService.getCompanyRelatedInvestors(selectedInvestor.id).map((company, idx) => (
                          <HStack key={company.id} justify="space-between" p={3} bg="gray.50" borderRadius="md">
                            <VStack align="start" spacing={1} flex={1}>
                              <Link
                                color="blue.500"
                                fontWeight="medium"
                                onClick={() => {
                                  onClose();
                                  navigateToCompany(company.id);
                                }}
                                _hover={{ textDecoration: 'underline' }}
                                cursor="pointer"
                              >
                                {hierarchicalService.getEntityName('company', company.id)}
                              </Link>
                              <HStack spacing={4} fontSize="xs" color="gray.500">
                                <Text>ID: {company.id}</Text>
                                {company.industry && (
                                  <Badge size="sm" colorScheme="blue">{company.industry}</Badge>
                                )}
                                {company.country && (
                                  <Text>📍 {company.country}</Text>
                                )}
                              </HStack>
                            </VStack>
                            <Button
                              size="sm"
                              colorScheme="blue"
                              variant="outline"
                              onClick={() => {
                                onClose();
                                navigateToCompany(company.id);
                              }}
                            >
                              View Details
                            </Button>
                          </HStack>
                        ))}
                      </VStack>
                    ) : (
                      <Text color="gray.500">No related companies found.</Text>
                    )}
                  </CardBody>
                </Card>

                {/* Related Deals */}
                <Card>
                  <CardHeader bg="purple.50">
                    <Heading size="md" color="purple.700">
                      Related Deals ({hierarchicalService.getInvestorRelatedDeals(selectedInvestor.id)?.length || 0})
                    </Heading>
                    <Text fontSize="sm" color="purple.600">
                      All investment deals this investor has participated in
                    </Text>
                  </CardHeader>
                  <CardBody>
                    {hierarchicalService.getInvestorRelatedDeals(selectedInvestor.id)?.length > 0 ? (
                      <VStack align="stretch" spacing={3}>
                        {hierarchicalService.getInvestorRelatedDeals(selectedInvestor.id).map((deal, idx) => (
                          <HStack key={deal.id} justify="space-between" p={3} bg="gray.50" borderRadius="md">
                            <VStack align="start" spacing={1} flex={1}>
                              <Link
                                color="purple.500"
                                fontWeight="medium"
                                onClick={() => {
                                  onClose();
                                  navigateToDeal(deal.id);
                                }}
                                _hover={{ textDecoration: 'underline' }}
                                cursor="pointer"
                              >
                                {hierarchicalService.getEntityName('deal', deal.id)}
                              </Link>
                              <HStack spacing={4} fontSize="xs" color="gray.500">
                                <Text>ID: {deal.id}</Text>
                                {deal.fundingRound && (
                                  <Badge size="sm" colorScheme="purple">{deal.fundingRound}</Badge>
                                )}
                                {deal.stage && (
                                  <Badge size="sm" colorScheme="orange">{deal.stage}</Badge>
                                )}
                                {deal.date && (
                                  <Text>📅 {deal.date}</Text>
                                )}
                              </HStack>
                            </VStack>
                            <Button
                              size="sm"
                              colorScheme="purple"
                              variant="outline"
                              onClick={() => {
                                onClose();
                                navigateToDeal(deal.id);
                              }}
                            >
                              View Details
                            </Button>
                          </HStack>
                        ))}
                      </VStack>
                    ) : (
                      <Text color="gray.500">No related deals found.</Text>
                    )}
                  </CardBody>
                </Card>

                {/* Related Funds */}
                <Card>
                  <CardHeader bg="orange.50">
                    <Heading size="md" color="orange.700">
                      Related Funds ({hierarchicalService.getInvestorRelatedFunds(selectedInvestor.id)?.length || 0})
                    </Heading>
                    <Text fontSize="sm" color="orange.600">
                      All funds this investor has invested in or managed
                    </Text>
                  </CardHeader>
                  <CardBody>
                    {hierarchicalService.getInvestorRelatedFunds(selectedInvestor.id)?.length > 0 ? (
                      <VStack align="stretch" spacing={3}>
                        {hierarchicalService.getInvestorRelatedFunds(selectedInvestor.id).map((fund, idx) => (
                          <HStack key={fund.id} justify="space-between" p={3} bg="gray.50" borderRadius="md">
                            <VStack align="start" spacing={1} flex={1}>
                              <Link
                                color="green.500"
                                fontWeight="medium"
                                onClick={() => {
                                  onClose();
                                  navigateToFund(fund.id);
                                }}
                                _hover={{ textDecoration: 'underline' }}
                                cursor="pointer"
                              >
                                {hierarchicalService.getEntityName('fund', fund.id)}
                              </Link>
                              <HStack spacing={4} fontSize="xs" color="gray.500">
                                <Text>ID: {fund.id}</Text>
                                {fund.category && (
                                  <Badge size="sm" colorScheme="green">{fund.category}</Badge>
                                )}
                                {fund.country && (
                                  <Text>📍 {fund.country}</Text>
                                )}
                              </HStack>
                            </VStack>
                            <Button
                              size="sm"
                              colorScheme="green"
                              variant="outline"
                              onClick={() => {
                                onClose();
                                navigateToFund(fund.id);
                              }}
                            >
                              View Details
                            </Button>
                          </HStack>
                        ))}
                      </VStack>
                    ) : (
                      <Text color="gray.500">No related funds found.</Text>
                    )}
                  </CardBody>
                </Card>
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

export default Investors;
