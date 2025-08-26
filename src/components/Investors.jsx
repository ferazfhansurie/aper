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
import { useNavigate } from 'react-router-dom';
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

  const bgColor = useColorModeValue('white', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  // Get investors from hierarchical service
  const getInvestors = () => {
    const investorsArray = [];
    for (const [id, investor] of hierarchicalService.investors) {
      investorsArray.push({
        ...investor,
        id: id
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

  useEffect(() => {
    filterInvestors();
  }, [searchTerm, selectedCategory, selectedLocation, selectedAffiliation, investors]);

  const filterInvestors = () => {
    let filtered = investors;

    if (searchTerm) {
      filtered = filtered.filter(investor =>
        investor.investorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        investor.chineseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        investor.firmCategory?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(investor => investor.firmCategory === selectedCategory);
    }

    if (selectedLocation) {
      filtered = filtered.filter(investor => investor.firmLocation === selectedLocation);
    }

    if (selectedAffiliation) {
      filtered = filtered.filter(investor => investor.affiliation === selectedAffiliation);
    }

    setFilteredInvestors(filtered);
    setCurrentPage(1);
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

  const navigateToCompany = (companyName) => {
    navigate('/companies');
    toast({
      title: 'Navigating to Companies',
      description: `Search for "${companyName}" to find the specific company`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const navigateToFunds = () => {
    navigate('/funds');
    toast({
      title: 'Navigating to Funds',
      description: 'View all funds in the system',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const getCategoryOptions = () => {
    const categories = [...new Set(investors.map(investor => investor.firmCategory).filter(Boolean))];
    return categories;
  };

  const getLocationOptions = () => {
    const locations = [...new Set(investors.map(investor => investor.firmLocation).filter(Boolean))];
    return locations;
  };

  const getAffiliationOptions = () => {
    const affiliations = [...new Set(investors.map(investor => investor.affiliation).filter(Boolean))];
    return affiliations;
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
            
            {/* Header */}
            <Box textAlign="center">
              <Heading size="lg" color="blue.600" mb={2}>
                Investors
              </Heading>
              <Text color="gray.600" fontSize="lg">
                Manage and explore investor information from the hierarchical data structure
              </Text>
            </Box>



            {/* Statistics */}
            <Grid templateColumns={{ base: "1fr", lg: "repeat(4, 1fr)" }} gap={6}>
              <Card bg="blue.50" shadow="md">
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel color="blue.700">Total Investors</StatLabel>
                    <StatNumber color="blue.800">{investors.length}</StatNumber>
                    <StatHelpText color="blue.600">In the system</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg="green.50" shadow="md">
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel color="green.700">Venture Capital</StatLabel>
                    <StatNumber color="green.800">
                      {investors.filter(i => i.firmCategory === 'Venture Capital').length}
                    </StatNumber>
                    <StatHelpText color="green.600">VC firms</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg="purple.50" shadow="md">
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel color="purple.700">Growth Equity</StatLabel>
                    <StatNumber color="purple.800">
                      {investors.filter(i => i.firmCategory === 'Growth Equity').length}
                    </StatNumber>
                    <StatHelpText color="purple.600">Growth investors</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg="orange.50" shadow="md">
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel color="orange.700">Countries</StatLabel>
                    <StatNumber color="orange.800">
                      {getLocationOptions().length}
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
                      placeholder="Search investors by name, category, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>

                  {/* Filter Row */}
                  <HStack spacing={4} wrap="wrap">
                    <Box minW="200px">
                      <Text fontSize="sm" color="gray.600" mb={2}>Firm Category</Text>
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
                      <Text fontSize="sm" color="gray.600" mb={2}>Location</Text>
                      <Select
                        placeholder="All Locations"
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                      >
                        {getLocationOptions().map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </Select>
                    </Box>

                    <Box minW="200px">
                      <Text fontSize="sm" color="gray.600" mb={2}>Affiliation</Text>
                      <Select
                        placeholder="All Affiliations"
                        value={selectedAffiliation}
                        onChange={(e) => setSelectedAffiliation(e.target.value)}
                      >
                        {getAffiliationOptions().map(affiliation => (
                          <option key={affiliation} value={affiliation}>{affiliation}</option>
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
                Showing {filteredInvestors.length} of {investors.length} investors
              </Text>
              <Text color="gray.600">
                Page {currentPage} of {totalPages}
              </Text>
            </HStack>

            {/* Investors Table */}
            <Card shadow="lg">
              <CardBody>
                <Box overflowX="auto">
                  <Table variant="simple" size="sm">
                    <Thead>
                      <Tr>
                        <Th>Investor Name</Th>
                        <Th>Chinese Name</Th>
                        <Th>Firm Category</Th>
                        <Th>Location</Th>
                        <Th>Affiliation</Th>
                        <Th>Website</Th>
                        <Th>Related Companies</Th>
                        <Th>Related Deals</Th>
                        <Th>Related Funds</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {paginatedInvestors.map((investor) => {
                        // Get related data for this investor
                        const relatedCompanies = hierarchicalService.getInvestorRelatedCompanies(investor.id) || [];
                        const relatedDeals = hierarchicalService.getInvestorRelatedDeals(investor.id) || [];
                        const relatedFunds = hierarchicalService.getInvestorRelatedFunds(investor.id) || [];
                        
                        return (
                        <Tr key={investor.id} _hover={{ bg: 'gray.50' }}>
                          <Td>
                            <VStack align="start" spacing={1}>
                              <Text fontWeight="medium">{investor.investorName}</Text>
                              <Text fontSize="xs" color="gray.500">
                                ID: {investor.id}
                              </Text>
                            </VStack>
                          </Td>
                          <Td>
                            <Text fontSize="sm">{investor.chineseName || '-'}</Text>
                          </Td>
                          <Td>
                            <Badge colorScheme="blue">{investor.firmCategory || '-'}</Badge>
                          </Td>
                          <Td>
                            <Text fontSize="sm">{investor.firmLocation || '-'}</Text>
                          </Td>
                          <Td>
                            <Badge 
                              colorScheme={
                                investor.affiliation === 'Independent' ? 'green' : 
                                investor.affiliation === 'Corporate' ? 'purple' : 'orange'
                              }
                            >
                              {investor.affiliation || '-'}
                            </Badge>
                          </Td>
                          <Td>
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
                          <Td>
                            <VStack align="start" spacing={1}>
                              {relatedCompanies.length > 0 ? (
                                relatedCompanies.slice(0, 3).map((company, idx) => (
                                  <Link
                                    key={company.id}
                                    color="blue.500"
                                    fontSize="xs"
                                    onClick={() => navigate(`/companies?highlight=${company.id}`)}
                                    _hover={{ textDecoration: 'underline' }}
                                    cursor="pointer"
                                  >
                                    {company.displayedName || company.company}
                                  </Link>
                                ))
                              ) : (
                                <Text fontSize="xs" color="gray.400">-</Text>
                              )}
                              {relatedCompanies.length > 3 && (
                                <Text fontSize="xs" color="gray.500">
                                  +{relatedCompanies.length - 3} more
                                </Text>
                              )}
                            </VStack>
                          </Td>
                          <Td>
                            <VStack align="start" spacing={1}>
                              {relatedDeals.length > 0 ? (
                                relatedDeals.slice(0, 3).map((deal, idx) => (
                                  <Link
                                    key={deal.id}
                                    color="purple.500"
                                    fontSize="xs"
                                    onClick={() => navigate(`/deals?highlight=${deal.id}`)}
                                    _hover={{ textDecoration: 'underline' }}
                                    cursor="pointer"
                                  >
                                    {deal.fundingRound || deal.dealId || `Deal ${deal.id}`}
                                  </Link>
                                ))
                              ) : (
                                <Text fontSize="xs" color="gray.400">-</Text>
                              )}
                              {relatedDeals.length > 3 && (
                                <Text fontSize="xs" color="gray.500">
                                  +{relatedDeals.length - 3} more
                                </Text>
                              )}
                            </VStack>
                          </Td>
                          <Td>
                            <VStack align="start" spacing={1}>
                              {relatedFunds.length > 0 ? (
                                relatedFunds.slice(0, 3).map((fund, idx) => (
                                  <Link
                                    key={fund.id}
                                    color="green.500"
                                    fontSize="xs"
                                    onClick={() => navigate(`/funds?highlight=${fund.id}`)}
                                    _hover={{ textDecoration: 'underline' }}
                                    cursor="pointer"
                                  >
                                    {fund.fundName || fund.displayedName}
                                  </Link>
                                ))
                              ) : (
                                <Text fontSize="xs" color="gray.400">-</Text>
                              )}
                              {relatedFunds.length > 3 && (
                                <Text fontSize="xs" color="gray.500">
                                  +{relatedFunds.length - 3} more
                                </Text>
                              )}
                            </VStack>
                          </Td>
                          <Td>
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
                  Related Data
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
                    colorScheme="purple"
                    variant="outline"
                    leftIcon={<DollarSign />}
                    onClick={() => navigate('/funds')}
                  >
                    View Funds ({hierarchicalService.funds.size})
                  </Button>
                  <Button
                    colorScheme="green"
                    variant="outline"
                    leftIcon={<Users />}
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

      {/* Investor Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Investor Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedInvestor && (
              <VStack spacing={4} align="stretch">
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Investor Name</Text>
                    <Text>{selectedInvestor.investorName}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Chinese Name</Text>
                    <Text>{selectedInvestor.chineseName || '-'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Firm Category</Text>
                    <Text>{selectedInvestor.firmCategory || '-'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Location</Text>
                    <Text>{selectedInvestor.firmLocation || '-'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Affiliation</Text>
                    <Text>{selectedInvestor.affiliation || '-'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Website</Text>
                    <Text>{selectedInvestor.website || '-'}</Text>
                  </Box>
                </Grid>
                
                <Box>
                  <Text fontWeight="bold" color="gray.600">Latest Name</Text>
                  <Text>{selectedInvestor.latestName || 'No alternative name'}</Text>
                </Box>

                <Box>
                  <Text fontWeight="bold" color="gray.600">Subsidiary Of</Text>
                  <Text>{selectedInvestor.subsidiaryOf || 'Not a subsidiary'}</Text>
                </Box>

                <Box>
                  <Text fontWeight="bold" color="gray.600">Remarks</Text>
                  <Text>{selectedInvestor.remarks || 'No additional remarks.'}</Text>
                </Box>

                {/* Related Data Links in Modal */}
                <Box bg="gray.50" p={4} borderRadius="md">
                  <Text fontWeight="bold" color="gray.700" mb={3}>
                    Related Data Links
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
                      colorScheme="purple"
                      variant="outline"
                      onClick={navigateToFunds}
                    >
                      View Managed Funds
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="green"
                      variant="outline"
                      onClick={() => navigate('/deals')}
                    >
                      View Investment Deals
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

export default Investors;
