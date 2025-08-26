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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
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
  Globe,
  Link as LinkIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VerticalHeader from './VerticalHeader';
import { hierarchicalService } from '../data/sampleData';

const Deals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedRound, setSelectedRound] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [activeView, setActiveView] = useState('deal');
  const [deals, setDeals] = useState([]);
  const [positions, setPositions] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [filteredPositions, setFilteredPositions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const bgColor = useColorModeValue('white', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  // Get data from hierarchical service
  const getDeals = () => {
    return hierarchicalService.getDealSummaryView();
  };

  const getPositions = () => {
    return hierarchicalService.getInvestmentPositionView();
  };

  useEffect(() => {
    const dealsData = getDeals();
    const positionsData = getPositions();
    
    // Debug: Log the first deal to see the data structure
    if (dealsData.length > 0) {
      console.log('🔍 First deal data:', dealsData[0]);
      console.log('🔍 allInvestors field:', dealsData[0].allInvestors);
      console.log('🔍 allInvestors type:', typeof dealsData[0].allInvestors);
      console.log('🔍 allInvestors isArray:', Array.isArray(dealsData[0].allInvestors));
    }
    
    setDeals(dealsData);
    setPositions(positionsData);
    setFilteredDeals(dealsData);
    setFilteredPositions(positionsData);
  }, []);

  useEffect(() => {
    filterData();
  }, [searchTerm, selectedStage, selectedRound, selectedCountry, deals, positions]);

  const filterData = () => {
    let filteredDealsData = deals;
    let filteredPositionsData = positions;

    if (searchTerm) {
      filteredDealsData = deals.filter(deal =>
        deal.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.dealId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.fundingRound?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      filteredPositionsData = positions.filter(position =>
        position.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.investor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.fundingRound?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStage) {
      filteredDealsData = filteredDealsData.filter(deal => deal.stage === selectedStage);
      filteredPositionsData = filteredPositionsData.filter(position => position.stage === selectedStage);
    }

    if (selectedRound) {
      filteredDealsData = filteredDealsData.filter(deal => deal.fundingRound === selectedRound);
      filteredPositionsData = filteredPositionsData.filter(position => position.fundingRound === selectedRound);
    }

    if (selectedCountry) {
      filteredDealsData = filteredDealsData.filter(deal => deal.country === selectedCountry);
      filteredPositionsData = filteredPositionsData.filter(position => position.country === selectedCountry);
    }

    setFilteredDeals(filteredDealsData);
    setFilteredPositions(filteredPositionsData);
    setCurrentPage(1);
  };

  const exportToCSV = (viewType) => {
    let csvContent;
    let filename;
    
    if (viewType === 'deal') {
      csvContent = hierarchicalService.exportDealSummaryToCSV();
      filename = 'deals_summary_export.csv';
    } else {
      csvContent = hierarchicalService.exportInvestmentPositionToCSV();
      filename = 'investment_positions_export.csv';
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Export successful',
      description: `Exported ${viewType === 'deal' ? filteredDeals.length : filteredPositions.length} records to CSV`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const openDealDetail = (deal) => {
    setSelectedDeal(deal);
    onOpen();
  };

  const openPositionDetail = (position) => {
    setSelectedPosition(position);
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

  const navigateToInvestor = (investorName) => {
    navigate('/investors');
    toast({
      title: 'Navigating to Investors',
      description: `Search for "${investorName}" to find the specific investor`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const getStageOptions = () => {
    const stages = [...new Set([...deals, ...positions].map(item => item.stage).filter(Boolean))];
    return stages;
  };

  const getRoundOptions = () => {
    const rounds = [...new Set([...deals, ...positions].map(item => item.fundingRound).filter(Boolean))];
    return rounds;
  };

  const getCountryOptions = () => {
    const countries = [...new Set([...deals, ...positions].map(item => item.country).filter(Boolean))];
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

  const paginatedData = (activeView === 'deal' ? filteredDeals : filteredPositions).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil((activeView === 'deal' ? filteredDeals.length : filteredPositions.length) / itemsPerPage);

  return (
    <Box bg={bgColor} minH="100vh">
      <VerticalHeader />
      <Box ml={{ base: 0, lg: "280px" }}>
    <Container maxW="1400px" py={8}>
          <VStack spacing={8} align="stretch">
            
      {/* Header */}
            <Box textAlign="center">
              <Heading size="lg" color="blue.600" mb={2}>
                 Deals
        </Heading>
              <Text color="gray.600" fontSize="lg">
                Explore investment deals with dual-view reporting (Deal Summary vs Investment Position)
        </Text>
            </Box>


            {/* Statistics */}
            <Grid templateColumns={{ base: "1fr", lg: "repeat(4, 1fr)" }} gap={6}>
              <Card bg="blue.50" shadow="md">
                <CardBody textAlign="center">
              <Stat>
                    <StatLabel color="blue.700">Total Deals</StatLabel>
                    <StatNumber color="blue.800">{deals.length}</StatNumber>
                    <StatHelpText color="blue.600">Investment rounds</StatHelpText>
              </Stat>
            </CardBody>
              </Card>
              
              <Card bg="green.50" shadow="md">
                <CardBody textAlign="center">
              <Stat>
                    <StatLabel color="green.700">Total Positions</StatLabel>
                    <StatNumber color="green.800">{positions.length}</StatNumber>
                    <StatHelpText color="green.600">Individual stakes</StatHelpText>
              </Stat>
            </CardBody>
              </Card>
              
              <Card bg="purple.50" shadow="md">
                <CardBody textAlign="center">
              <Stat>
                    <StatLabel color="purple.700">Total Value</StatLabel>
                    <StatNumber color="purple.800">
                      {formatCurrency(deals.reduce((sum, deal) => sum + (deal.totalDealSize || 0), 0))}
                </StatNumber>
                    <StatHelpText color="purple.600">Combined deal value</StatHelpText>
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
                      placeholder="Search deals by company, investor, or funding round..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>

                  {/* Filter Row */}
                  <HStack spacing={4} wrap="wrap">
                    <Box minW="200px">
                      <Text fontSize="sm" color="gray.600" mb={2}>Stage</Text>
                      <Select
                        placeholder="All Stages"
                        value={selectedStage}
                        onChange={(e) => setSelectedStage(e.target.value)}
                      >
                        {getStageOptions().map(stage => (
                          <option key={stage} value={stage}>{stage}</option>
                        ))}
                      </Select>
                    </Box>

                    <Box minW="200px">
                      <Text fontSize="sm" color="gray.600" mb={2}>Funding Round</Text>
                      <Select
                        placeholder="All Rounds"
                        value={selectedRound}
                        onChange={(e) => setSelectedRound(e.target.value)}
                      >
                        {getRoundOptions().map(round => (
                          <option key={round} value={round}>{round}</option>
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
                      onClick={() => exportToCSV(activeView)}
                    >
                      Export {activeView === 'deal' ? 'Deals' : 'Positions'}
                    </Button>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>

            {/* Dual View Tabs */}
            <Card shadow="lg">
              <CardHeader bg="blue.50">
                <HStack justify="space-between">
                  <Heading size="md" color="blue.700">
                    🔄 Dual-View Reporting
                  </Heading>
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant={activeView === 'deal' ? 'solid' : 'outline'}
                      onClick={() => setActiveView('deal')}
                    >
                      Deal Summary ({filteredDeals.length})
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="green"
                      variant={activeView === 'position' ? 'solid' : 'outline'}
                      onClick={() => setActiveView('position')}
                    >
                      Investment Position ({filteredPositions.length})
                    </Button>
                  </HStack>
                </HStack>
              </CardHeader>
              
              <CardBody>
                {activeView === 'deal' ? (
                  // Deal Summary View - Every Deal is 1 row
                  <Box>
                    <Alert status="success" mb={4} borderRadius="md">
                      <AlertIcon />
                      <AlertTitle>Deal Summary View</AlertTitle>
                      <AlertDescription>
                        From Perspective of Deal - Every Deal is 1 row. This aggregates all investors for a single deal.
                      </AlertDescription>
                    </Alert>

          <Box overflowX="auto">
                      <Table variant="simple" size="sm">
                        <Thead>
                          <Tr>
                            <Th>Deal ID</Th>
                            <Th>Company</Th>
                            <Th>Round</Th>
                            <Th>Total Size</Th>
                            <Th maxW="200px">Investors</Th>
                            <Th>Stage</Th>
                            <Th>Industry</Th>
                            <Th>Actions</Th>
                          </Tr>
                        </Thead>
              <Tbody>
                          {paginatedData.map((deal, index) => (
                            <Tr key={index} _hover={{ bg: 'gray.50' }} fontSize="sm">
                              <Td fontWeight="bold">{deal.dealId}</Td>
                              <Td>
                                <Button
                                  variant="link"
                                  color="blue.600"
                                  onClick={() => navigateToCompany(deal.company)}
                                  leftIcon={<Building2 size={16} />}
                                >
                                  {deal.company}
                                </Button>
                                <Text fontSize="xs" color="gray.500">{deal.chineseCompany}</Text>
                              </Td>
                              <Td>
                                <Badge colorScheme="blue">{deal.fundingRound}</Badge>
                              </Td>
                              <Td fontWeight="bold" color="green.600">
                                {formatCurrency(deal.totalDealSize)}
                              </Td>
                              <Td>
                                <VStack spacing={1} align="start">
                                  <Text fontSize="sm" maxW="200px" noOfLines={2} overflow="hidden">
                                    {(() => {
                                      if (!deal.allInvestors) return 'No investors';
                                      if (Array.isArray(deal.allInvestors)) {
                                        if (deal.allInvestors.length === 0) return 'No investors';
                                        // Filter out any non-string values and take first 3
                                        const validInvestors = deal.allInvestors.filter(inv => typeof inv === 'string' && inv.trim());
                                        if (validInvestors.length === 0) return 'No valid investors';
                                        return validInvestors.slice(0, 3).join(', ') + (validInvestors.length > 3 ? '...' : '');
                                      }
                                      // If it's not an array, try to convert it
                                      if (typeof deal.allInvestors === 'string') {
                                        return deal.allInvestors.length > 50 ? deal.allInvestors.substring(0, 50) + '...' : deal.allInvestors;
                                      }
                                      return 'Invalid data';
                                    })()}
                                  </Text>
                                  <Text fontSize="xs" color="gray.500">
                                    {deal.totalInvestors || 0} investors
                                  </Text>
                                </VStack>
                              </Td>
                    <Td>
                                <Badge colorScheme="purple">{deal.stage}</Badge>
                              </Td>
                              <Td>{deal.industry}</Td>
                              <Td>
                                <IconButton
                                  size="sm"
                                  icon={<Eye />}
                                  aria-label="View deal details"
                                  onClick={() => openDealDetail(deal)}
                                  colorScheme="blue"
                                  variant="outline"
                                />
                    </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </Box>
                  </Box>
                ) : (
                  // Investment Position View - Every Investment Position is 1 row
                  <Box>
                    <Alert status="info" mb={4} borderRadius="md">
                      <AlertIcon />
                      <AlertTitle>Investment Position View</AlertTitle>
                      <AlertDescription>
                        From Perspective of Investment Position - Every Investment Position is 1 row. This shows individual investor stakes.
                      </AlertDescription>
                    </Alert>
                    
                    <Box overflowX="auto" maxH="600px">
                      <Table variant="simple" size="sm" colorScheme="blue">
                        <Thead>
                          <Tr>
                            <Th>Position ID</Th>
                            <Th>Investor</Th>
                            <Th>Company</Th>
                            <Th>Deal Size</Th>
                            <Th>Position Size</Th>
                            <Th>Round</Th>
                            <Th>Lead</Th>
                            <Th>Actions</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {paginatedData.map((position, index) => (
                            <Tr key={index} _hover={{ bg: 'gray.50' }}>
                              <Td fontSize="xs" color="gray.500">{position.positionId}</Td>
                              <Td>
                                <Button
                                  variant="link"
                                  color="green.600"
                                  onClick={() => navigateToInvestor(position.investor)}
                                  leftIcon={<Users size={16} />}
                                >
                                  {position.investor}
                                </Button>
                                <Text fontSize="xs" color="gray.500">{position.chineseInvestor}</Text>
                    </Td>
                    <Td>
                      <Button
                                  variant="link"
                                  color="blue.600"
                                  onClick={() => navigateToCompany(position.company)}
                                  leftIcon={<Building2 size={16} />}
                                >
                                  {position.company}
                      </Button>
                                <Text fontSize="xs" color="gray.500">{position.chineseCompany}</Text>
                              </Td>
                              <Td color="gray.600">
                                {formatCurrency(position.totalDealSize)}
                              </Td>
                              <Td fontWeight="bold" color="blue.600">
                                {formatCurrency(position.positionDealSize)}
                              </Td>
                              <Td>
                                <Badge colorScheme="blue">{position.fundingRound}</Badge>
                              </Td>
                              <Td>
                                {position.leadInvestor ? (
                                  <Badge colorScheme="green">Lead</Badge>
                                ) : (
                                  <Badge colorScheme="gray">Participant</Badge>
                                )}
                              </Td>
                              <Td>
                                <IconButton
                                  size="sm"
                                  icon={<Eye />}
                                  aria-label="View position details"
                                  onClick={() => openPositionDetail(position)}
                                  colorScheme="green"
                                  variant="outline"
                                />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
                  </Box>
                )}

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
                    onClick={() => navigate('/funds')}
                  >
                    View Funds ({hierarchicalService.funds.size})
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

      {/* Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedDeal ? 'Deal Details' : 'Investment Position Details'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedDeal ? (
              <VStack spacing={4} align="stretch">
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Deal ID</Text>
                    <Text>{selectedDeal.dealId}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Company</Text>
                    <Text>{selectedDeal.company}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Funding Round</Text>
                    <Text>{selectedDeal.fundingRound}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Total Deal Size</Text>
                    <Text color="green.600">{formatCurrency(selectedDeal.totalDealSize)}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Stage</Text>
                    <Text>{selectedDeal.stage}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Industry</Text>
                    <Text>{selectedDeal.industry}</Text>
                  </Box>
                </Grid>
                
                <Box>
                  <Text fontWeight="bold" color="gray.600">All Investors</Text>
                  <Text>{selectedDeal.allInvestors.join(', ')}</Text>
                </Box>

                <Box>
                  <Text fontWeight="bold" color="gray.600">Total Investors</Text>
                  <Text>{selectedDeal.totalInvestors}</Text>
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
                      onClick={() => navigateToCompany(selectedDeal.company)}
                    >
                      View Company Details
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="green"
                      variant="outline"
                      onClick={() => navigate('/investors')}
                    >
                      View All Investors
                    </Button>
                  </HStack>
                </Box>
              </VStack>
            ) : selectedPosition ? (
              <VStack spacing={4} align="stretch">
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Position ID</Text>
                    <Text>{selectedPosition.positionId}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Investor</Text>
                    <Text>{selectedPosition.investor}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Company</Text>
                    <Text>{selectedPosition.company}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Funding Round</Text>
                    <Text>{selectedPosition.fundingRound}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Deal Size</Text>
                    <Text color="gray.600">{formatCurrency(selectedPosition.totalDealSize)}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Position Size</Text>
                    <Text color="blue.600">{formatCurrency(selectedPosition.positionDealSize)}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Lead Investor</Text>
                    <Text>{selectedPosition.leadInvestor ? 'Yes' : 'No'}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.600">Equity Stake</Text>
                    <Text>{selectedPosition.equityStake || '-'}%</Text>
                  </Box>
                </Grid>

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
                      onClick={() => navigateToCompany(selectedPosition.company)}
                    >
                      View Company Details
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="green"
                      variant="outline"
                      onClick={() => navigateToInvestor(selectedPosition.investor)}
                    >
                      View Investor Details
                    </Button>
                  </HStack>
                </Box>
              </VStack>
            ) : null}
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

export default Deals;
