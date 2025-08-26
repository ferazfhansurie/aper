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

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const bgColor = useColorModeValue('white', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  // Get companies from hierarchical service
  const getCompanies = () => {
    const companiesArray = [];
    for (const [id, company] of hierarchicalService.companies) {
      companiesArray.push({
        ...company,
        id: id
      });
    }
    return companiesArray;
  };

  useEffect(() => {
    // Populate sample data if not already populated
    if (hierarchicalService.companies.size === 0) {
      import('../data/sampleData.js').then(({ populateSampleData }) => {
        populateSampleData(hierarchicalService);
        const companiesData = getCompanies();
        setCompanies(companiesData);
        setFilteredCompanies(companiesData);
      });
    } else {
      const companiesData = getCompanies();
      setCompanies(companiesData);
      setFilteredCompanies(companiesData);
    }
  }, []);

  useEffect(() => {
    filterCompanies();
  }, [searchTerm, selectedIndustry, selectedStatus, selectedCountry, companies]);

  const filterCompanies = () => {
    let filtered = companies;

    if (searchTerm) {
      filtered = filtered.filter(company =>
        company.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.chineseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.displayedName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedIndustry) {
      filtered = filtered.filter(company => company.industry === selectedIndustry);
    }

    if (selectedStatus) {
      filtered = filtered.filter(company => company.listingStatus === selectedStatus);
    }

    if (selectedCountry) {
      filtered = filtered.filter(company => company.country === selectedCountry);
    }

    setFilteredCompanies(filtered);
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const headers = [
      'Company ID', 'Company Name', 'Chinese Name', 'Industry', 'Country', 'Listing Status',
      'Tech Category', 'AI Deal', 'Healthcare Deal', 'Website', 'Email'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredCompanies.map(company => [
        company.id,
        `"${company.companyName || ''}"`,
        `"${company.chineseName || ''}"`,
        `"${company.industry || ''}"`,
        `"${company.country || ''}"`,
        `"${company.listingStatus || ''}"`,
        company.techCategory ? 'Yes' : 'No',
        company.aiDeal ? 'Yes' : 'No',
        company.healthcareDeal ? 'Yes' : 'No',
        `"${company.website || ''}"`,
        `"${company.email || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'companies_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Export successful',
      description: `Exported ${filteredCompanies.length} companies to CSV`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const openCompanyDetail = (company) => {
    setSelectedCompany(company);
    onOpen();
  };

  const navigateToDeals = (companyName) => {
    navigate('/deals');
    toast({
      title: 'Navigating to Deals',
      description: `Search for deals involving "${companyName}"`,
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

  const getIndustryOptions = () => {
    const industries = [...new Set(companies.map(company => company.industry).filter(Boolean))];
    return industries;
  };

  const getStatusOptions = () => {
    const statuses = [...new Set(companies.map(company => company.listingStatus).filter(Boolean))];
    return statuses;
  };

  const getCountryOptions = () => {
    const countries = [...new Set(companies.map(company => company.country).filter(Boolean))];
    return countries;
  };

  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  return (
    <Box bg={bgColor} minH="100vh">
      <VerticalHeader />
      <Box ml={{ base: 0, lg: "280px" }}>
        <Container maxW="1400px" py={8}>
          <VStack spacing={8} align="stretch">
            
        {/* Header */}
            <Box textAlign="center">
              <Heading size="lg" color="blue.600" mb={2}>
                Companies
              </Heading>
              <Text color="gray.600" fontSize="lg">
                Manage and explore company information from the hierarchical data structure
              </Text>
            </Box>

   

            {/* Statistics */}
            <Grid templateColumns={{ base: "1fr", lg: "repeat(4, 1fr)" }} gap={6}>
              <Card bg="blue.50" shadow="md">
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel color="blue.700">Total Companies</StatLabel>
                    <StatNumber color="blue.800">{companies.length}</StatNumber>
                    <StatHelpText color="blue.600">In the system</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg="green.50" shadow="md">
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel color="green.700">Tech Companies</StatLabel>
                    <StatNumber color="green.800">
                      {companies.filter(c => c.techCategory).length}
                    </StatNumber>
                    <StatHelpText color="green.600">Technology focused</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg="purple.50" shadow="md">
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel color="purple.700">AI Companies</StatLabel>
                    <StatNumber color="purple.800">
                      {companies.filter(c => c.aiDeal).length}
                    </StatNumber>
                    <StatHelpText color="purple.600">AI focused</StatHelpText>
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
                      placeholder="Search companies by name, industry, or country..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>

                  {/* Filter Row */}
                  <HStack spacing={4} wrap="wrap">
                    <Box minW="200px">
                      <Text fontSize="sm" color="gray.600" mb={2}>Industry</Text>
                      <Select
                        placeholder="All Industries"
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                      >
                        {getIndustryOptions().map(industry => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </Select>
                    </Box>

                    <Box minW="200px">
                      <Text fontSize="sm" color="gray.600" mb={2}>Listing Status</Text>
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
                Showing {filteredCompanies.length} of {companies.length} companies
                    </Text>
              <Text color="gray.600">
                Page {currentPage} of {totalPages}
                    </Text>
                    </HStack>

            {/* Companies Table */}
            <Card shadow="lg">
              <CardBody>
                  <Box overflowX="auto">
                  <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                        <Th>Company Name</Th>
                        <Th>Chinese Name</Th>
                        <Th>Industry</Th>
                        <Th>Country</Th>
                        <Th>Status</Th>
                        <Th>Tech</Th>
                        <Th>Related Investors</Th>
                        <Th>Related Funds</Th>
                        <Th>Related Deals</Th>
                        <Th>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                      {paginatedCompanies.map((company) => {
                        // Get related data for this company
                        const relatedInvestors = hierarchicalService.getCompanyRelatedInvestors(company.id) || [];
                        const relatedFunds = hierarchicalService.getCompanyRelatedFunds(company.id) || [];
                        const relatedDeals = hierarchicalService.getCompanyDeals(company.id) || [];
                        
                        return (
                        <Tr key={company.id} _hover={{ bg: 'gray.50' }}>
                          <Td>
                            <VStack align="start" spacing={1}>
                              <Text fontWeight="medium">{company.companyName}</Text>
                              <Text fontSize="xs" color="gray.500">
                                ID: {company.id}
                              </Text>
                            </VStack>
                          </Td>
                          <Td>
                            <Text fontSize="sm">{company.chineseName || '-'}</Text>
                          </Td>
                          <Td>
                            <Badge colorScheme="blue">{company.industry || '-'}</Badge>
                            </Td>
                            <Td>
                            <Text fontSize="sm">{company.country || '-'}</Text>
                            </Td>
                            <Td>
                              <Badge 
                              colorScheme={
                                company.listingStatus === 'Listed' ? 'green' : 
                                company.listingStatus === 'Private' ? 'gray' : 'orange'
                              }
                            >
                              {company.listingStatus || '-'}
                              </Badge>
                            </Td>
                            <Td>
                            {company.techCategory ? (
                              <Badge colorScheme="purple">Tech</Badge>
                            ) : (
                              <Text fontSize="sm" color="gray.400">-</Text>
                            )}
                            </Td>
                            <Td>
                              <VStack align="start" spacing={1}>
                                {relatedInvestors.length > 0 ? (
                                  relatedInvestors.slice(0, 3).map((investor, idx) => (
                                    <Link
                                      key={investor.id}
                                      color="green.500"
                                      fontSize="xs"
                                      onClick={() => navigate(`/investors?highlight=${investor.id}`)}
                                      _hover={{ textDecoration: 'underline' }}
                                      cursor="pointer"
                                    >
                                      {investor.displayedName || investor.investorName}
                                    </Link>
                                  ))
                                ) : (
                                  <Text fontSize="xs" color="gray.400">-</Text>
                                )}
                                {relatedInvestors.length > 3 && (
                                  <Text fontSize="xs" color="gray.500">
                                    +{relatedInvestors.length - 3} more
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
                                      color="blue.500"
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
                            <HStack spacing={2}>
                                  <IconButton
                                    size="sm"
                                icon={<Eye />}
                                aria-label="View details"
                                onClick={() => openCompanyDetail(company)}
                                colorScheme="blue"
                                variant="outline"
                              />
                              {company.website && (
                                  <IconButton
                                    size="sm"
                                  icon={<ExternalLink />}
                                  aria-label="Visit website"
                                  onClick={() => window.open(company.website, '_blank')}
                                  colorScheme="green"
                                  variant="outline"
                                />
                              )}
                              </HStack>
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
                    colorScheme="green"
                    variant="outline"
                    leftIcon={<Users />}
                    onClick={() => navigate('/deals')}
                  >
                    View Deals ({hierarchicalService.deals.size})
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
                    colorScheme="blue"
                    variant="outline"
                    leftIcon={<Building2 />}
                    onClick={() => navigate('/investors')}
                  >
                    View Investors ({hierarchicalService.investors.size})
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

      {/* Company Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Company Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCompany && (
              <VStack spacing={4} align="stretch">
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Company Name</Text>
                    <Text>{selectedCompany.companyName}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Chinese Name</Text>
                    <Text>{selectedCompany.chineseName || '-'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Industry</Text>
                    <Text>{selectedCompany.industry || '-'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Country</Text>
                    <Text>{selectedCompany.country || '-'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Listing Status</Text>
                    <Text>{selectedCompany.listingStatus || '-'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Listed Date</Text>
                    <Text>{selectedCompany.listedDate || '-'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Tech Category</Text>
                    <Text>{selectedCompany.techCategory ? 'Yes' : 'No'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">SRI Focus</Text>
                    <Text>{selectedCompany.sriFocus || '-'}</Text>
                  </Box>
        </Grid>
                
                <Box>
                  <Text fontWeight="bold" color="gray.600">Specializations</Text>
                  <HStack spacing={2} wrap="wrap" mt={2}>
                    {selectedCompany.aiDeal && <Badge colorScheme="purple">AI</Badge>}
                    {selectedCompany.semiconductorDeal && <Badge colorScheme="blue">Semiconductor</Badge>}
                    {selectedCompany.batteryDeal && <Badge colorScheme="green">Battery</Badge>}
                    {selectedCompany.evDeal && <Badge colorScheme="teal">Electric Vehicle</Badge>}
                    {selectedCompany.realAssets && <Badge colorScheme="orange">Real Assets</Badge>}
                    {selectedCompany.healthcareDeal && <Badge colorScheme="red">Healthcare</Badge>}
                  </HStack>
                </Box>

                <Box>
                  <Text fontWeight="bold" color="gray.600">Contact Information</Text>
                  <VStack align="start" spacing={2} mt={2}>
                    <Text>Email: {selectedCompany.email || '-'}</Text>
                    <Text>Phone: {selectedCompany.tel || '-'}</Text>
                    <Text>Website: {selectedCompany.website || '-'}</Text>
                  </VStack>
                </Box>

                {/* Related Data Links in Modal */}
                <Box bg="gray.50" p={4} borderRadius="md">
                  <Text fontWeight="bold" color="gray.700" mb={3}>
                    Related Data Links
                  </Text>
                  <HStack spacing={3} wrap="wrap">
                    <Button
                      size="sm"
                      colorScheme="green"
                      variant="outline"
                      onClick={() => navigateToDeals(selectedCompany.companyName)}
                    >
                      View Company Deals
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      onClick={navigateToInvestors}
                    >
                      View All Investors
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="purple"
                      variant="outline"
                      onClick={() => navigate('/funds')}
                    >
                      View Investment Funds
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

export default Companies;
