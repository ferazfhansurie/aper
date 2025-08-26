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
  Globe,
  Link as LinkIcon
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import VerticalHeader from './VerticalHeader';
import { hierarchicalService } from '../data/sampleData';

const Deals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedRound, setSelectedRound] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedDealSize, setSelectedDealSize] = useState('');
  const [selectedInvestorType, setSelectedInvestorType] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
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
  const [searchParams, setSearchParams] = useSearchParams();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const glassBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
  const borderColor = useColorModeValue('rgba(226, 232, 240, 0.8)', 'rgba(45, 55, 72, 0.8)');

  // Get data from hierarchical service
  const getDeals = () => {
    const dealsArray = hierarchicalService.getDealSummaryView();
    // Ensure we have proper deal data with meaningful names
    return dealsArray.map(deal => ({
      ...deal,
      company: deal.company || deal.companyName || 'Unknown Company',
      industry: deal.industry || 'Other',
      country: deal.country || 'Unknown',
      dealId: deal.dealId || deal.id || `DEAL_${Math.floor(Math.random() * 99999) + 10000}`
    }));
  };

  const getPositions = () => {
    const positionsArray = hierarchicalService.getInvestmentPositionView();
    // Ensure we have proper position data with meaningful names
    return positionsArray.map(position => ({
      ...position,
      company: position.company || position.companyName || 'Unknown Company',
      investor: position.investor || position.investorName || 'Unknown Investor',
      fund: position.fund || position.fundName || 'Unknown Fund',
      industry: position.industry || 'Other',
      country: position.country || 'Unknown'
    }));
  };

  useEffect(() => {
    const dealsData = getDeals();
    const positionsData = getPositions();
    
    setDeals(dealsData);
    setPositions(positionsData);
    setFilteredDeals(dealsData);
    setFilteredPositions(positionsData);
  }, []);

  // Check for highlight parameter in URL
  useEffect(() => {
    const highlightId = searchParams.get('highlight');
    if (highlightId) {
      // Find the deal and filter to show only that deal
      const dealIndex = deals.findIndex(deal => deal.id === highlightId);
      if (dealIndex !== -1) {
        const highlightedDeal = deals[dealIndex];
        // Filter to show only the highlighted deal
        setFilteredDeals([highlightedDeal]);
        setCurrentPage(1);
        // Set search term to help user see what's filtered
        setSearchTerm(highlightedDeal.dealId || highlightedDeal.fundingRound || highlightId);
        toast({
          title: 'Deal Filtered',
          description: `Showing only: ${highlightedDeal.dealId || highlightedDeal.fundingRound || highlightId}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }, [deals, searchParams, toast]);

  useEffect(() => {
    filterData();
  }, [searchTerm, selectedStage, selectedRound, selectedCountry, selectedIndustry, selectedDealSize, selectedInvestorType, dateRange, deals, positions]);

  const filterData = () => {
    let filteredDealsData = deals;
    let filteredPositionsData = positions;

    // Apply search filter
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

    // Apply stage filter
    if (selectedStage) {
      filteredDealsData = filteredDealsData.filter(deal => deal.stage === selectedStage);
      filteredPositionsData = filteredPositionsData.filter(position => position.stage === selectedStage);
    }

    // Apply round filter
    if (selectedRound) {
      filteredDealsData = filteredDealsData.filter(deal => deal.fundingRound === selectedRound);
      filteredPositionsData = filteredPositionsData.filter(position => position.fundingRound === selectedRound);
    }

    // Apply country filter
    if (selectedCountry) {
      filteredDealsData = filteredDealsData.filter(deal => deal.country === selectedCountry);
      filteredPositionsData = filteredPositionsData.filter(position => position.country === selectedCountry);
    }

    // Apply industry filter
    if (selectedIndustry) {
      filteredDealsData = filteredDealsData.filter(deal => deal.industry === selectedIndustry);
      filteredPositionsData = filteredPositionsData.filter(position => position.industry === selectedIndustry);
    }

    // Apply deal size filter
    if (selectedDealSize) {
      const { min, max } = getDealSizeRange(selectedDealSize);
      filteredDealsData = filteredDealsData.filter(deal => {
        const amount = parseFloat(deal.amount) || 0;
        return amount >= min && amount < max;
      });
      filteredPositionsData = filteredPositionsData.filter(position => {
        const amount = parseFloat(position.amount) || 0;
        return amount >= min && amount < max;
      });
    }

    // Apply investor type filter (for positions view)
    if (selectedInvestorType && activeView === 'position') {
      filteredPositionsData = filteredPositionsData.filter(position => 
        position.investorType === selectedInvestorType || 
        position.investor?.toLowerCase().includes(selectedInvestorType.toLowerCase())
      );
    }

    // Apply date range filter
    if (dateRange.start || dateRange.end) {
      filteredDealsData = filteredDealsData.filter(deal => {
        const dealDate = new Date(deal.date || deal.dealDate || '');
        if (isNaN(dealDate.getTime())) return true;
        
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;
        
        if (startDate && dealDate < startDate) return false;
        if (endDate && dealDate > endDate) return false;
        return true;
      });
      
      filteredPositionsData = filteredPositionsData.filter(position => {
        const positionDate = new Date(position.date || position.investmentDate || '');
        if (isNaN(positionDate.getTime())) return true;
        
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;
        
        if (startDate && positionDate < startDate) return false;
        if (endDate && positionDate > endDate) return false;
        return true;
      });
    }

    setFilteredDeals(filteredDealsData);
    setFilteredPositions(filteredPositionsData);
    setCurrentPage(1);
  };

  // Clear all filters and show all deals/positions
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStage('');
    setSelectedRound('');
    setSelectedCountry('');
    setSelectedIndustry('');
    setSelectedDealSize('');
    setSelectedInvestorType('');
    setDateRange({ start: '', end: '' });
    setFilteredDeals(deals);
    setFilteredPositions(positions);
    setCurrentPage(1);
    // Clear URL parameters
    setSearchParams({});
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

  const getStageOptions = () => {
    const stages = [...new Set([...deals, ...positions].map(item => item.stage).filter(Boolean))];
    return stages.sort();
  };

  const getRoundOptions = () => {
    const rounds = [...new Set([...deals, ...positions].map(item => item.fundingRound).filter(Boolean))];
    return rounds.sort();
  };

  const getCountryOptions = () => {
    const countries = [...new Set([...deals, ...positions].map(item => item.country).filter(Boolean))];
    return countries.sort();
  };

  const getIndustryOptions = () => {
    const industries = [...new Set([...deals, ...positions].map(item => item.industry).filter(Boolean))];
    return industries.sort();
  };

  const getDealSizeOptions = () => {
    return [
      'Under $1M',
      '$1M - $5M', 
      '$5M - $10M',
      '$10M - $50M',
      '$50M - $100M',
      '$100M - $500M',
      '$500M - $1B',
      'Over $1B'
    ];
  };

  const getInvestorTypeOptions = () => {
    return [
      'Private Equity',
      'Venture Capital',
      'Growth Equity',
      'Angel Investor',
      'Corporate VC',
      'Family Office',
      'Sovereign Wealth Fund',
      'Pension Fund'
    ];
  };

  const getDealSizeRange = (dealSize) => {
    switch (dealSize) {
      case 'Under $1M': return { min: 0, max: 1 };
      case '$1M - $5M': return { min: 1, max: 5 };
      case '$5M - $10M': return { min: 5, max: 10 };
      case '$10M - $50M': return { min: 10, max: 50 };
      case '$50M - $100M': return { min: 50, max: 100 };
      case '$100M - $500M': return { min: 100, max: 500 };
      case '$500M - $1B': return { min: 500, max: 1000 };
      case 'Over $1B': return { min: 1000, max: Infinity };
      default: return { min: 0, max: Infinity };
    }
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
        <Container maxW="1400px" py={6}>
          <VStack spacing={6} align="stretch">
            
        

       
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
                        placeholder="Search deals by company, investor, funding round, or deal ID..."
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

                  {/* Primary Filters Row */}
                  <Box>
                    <Text fontSize="xs" color="blue.600" mb={2} fontWeight="medium">
                      Primary Filters
                    </Text>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={3}>
                      <Box>
                        <Text fontSize="xs" color="blue.600" mb={1}>Stage</Text>
                        <Select
                          size="sm"
                          placeholder="All Stages"
                          value={selectedStage}
                          onChange={(e) => setSelectedStage(e.target.value)}
                          bg="white"
                          border="1px solid"
                          borderColor="rgba(59, 130, 246, 0.2)"
                          _focus={{ borderColor: 'blue.400' }}
                          borderRadius="md"
                        >
                          {getStageOptions().map(stage => (
                            <option key={stage} value={stage}>{stage}</option>
                          ))}
                        </Select>
                      </Box>

                      <Box>
                        <Text fontSize="xs" color="blue.600" mb={1}>Funding Round</Text>
                        <Select
                          size="sm"
                          placeholder="All Rounds"
                          value={selectedRound}
                          onChange={(e) => setSelectedRound(e.target.value)}
                          bg="white"
                          border="1px solid"
                          borderColor="rgba(59, 130, 246, 0.2)"
                          _focus={{ borderColor: 'blue.400' }}
                          borderRadius="md"
                        >
                          {getRoundOptions().map(round => (
                            <option key={round} value={round}>{round}</option>
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

                      <Box>
                        <Text fontSize="xs" color="blue.600" mb={1}>Industry</Text>
                        <Select
                          size="sm"
                          placeholder="All Industries"
                          value={selectedIndustry}
                          onChange={(e) => setSelectedIndustry(e.target.value)}
                          bg="white"
                          border="1px solid"
                          borderColor="rgba(59, 130, 246, 0.2)"
                          _focus={{ borderColor: 'blue.400' }}
                          borderRadius="md"
                        >
                          {getIndustryOptions().map(industry => (
                            <option key={industry} value={industry}>{industry}</option>
                          ))}
                        </Select>
                      </Box>
                    </Grid>
                  </Box>

                  {/* Secondary Filters Row */}
                  <Box>
                    <Text fontSize="xs" color="blue.600" mb={2} fontWeight="medium">
                      Additional Filters
                    </Text>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={3}>
                      <Box>
                        <Text fontSize="xs" color="blue.600" mb={1}>Deal Size</Text>
                        <Select
                          size="sm"
                          placeholder="All Sizes"
                          value={selectedDealSize}
                          onChange={(e) => setSelectedDealSize(e.target.value)}
                          bg="white"
                          border="1px solid"
                          borderColor="rgba(59, 130, 246, 0.2)"
                          _focus={{ borderColor: 'blue.400' }}
                          borderRadius="md"
                        >
                          {getDealSizeOptions().map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </Select>
                      </Box>

                      <Box>
                        <Text fontSize="xs" color="blue.600" mb={1}>Investor Type</Text>
                        <Select
                          size="sm"
                          placeholder="All Types"
                          value={selectedInvestorType}
                          onChange={(e) => setSelectedInvestorType(e.target.value)}
                          bg="white"
                          border="1px solid"
                          borderColor="rgba(59, 130, 246, 0.2)"
                          _focus={{ borderColor: 'blue.400' }}
                          borderRadius="md"
                          isDisabled={activeView === 'deal'}
                        >
                          {getInvestorTypeOptions().map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </Select>
                      </Box>

                      <Box>
                        <Text fontSize="xs" color="blue.600" mb={1}>Date Range</Text>
                        <HStack spacing={2}>
                          <Input
                            type="date"
                            value={dateRange.start}
                            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                            size="sm"
                            bg="white"
                            border="1px solid"
                            borderColor="rgba(59, 130, 246, 0.2)"
                            _focus={{ borderColor: 'blue.400' }}
                            borderRadius="md"
                            placeholder="Start Date"
                          />
                          <Input
                            type="date"
                            value={dateRange.end}
                            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                            size="sm"
                            bg="white"
                            border="1px solid"
                            borderColor="rgba(59, 130, 246, 0.2)"
                            _focus={{ borderColor: 'blue.400' }}
                            borderRadius="md"
                            placeholder="End Date"
                          />
                        </HStack>
                      </Box>
                    </Grid>
                  </Box>

                  {/* Action Buttons */}
                  <HStack spacing={3} justify="center" pt={1}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      leftIcon={<Download size={16} />}
                      onClick={() => exportToCSV(activeView)}
                      bg="blue.500"
                      _hover={{ bg: 'blue.600' }}
                      _active={{ bg: 'blue.700' }}
                      borderRadius="lg"
                      px={6}
                    >
                      Export {activeView === 'deal' ? 'Deals' : 'Positions'}
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
                  {(selectedStage || selectedRound || selectedCountry || selectedIndustry || selectedDealSize || selectedInvestorType || dateRange.start || dateRange.end) && (
                    <Box>
                      <Text fontSize="xs" color="blue.600" mb={1} fontWeight="medium">
                        Active Filters
                      </Text>
                      <HStack spacing={1} wrap="wrap">
                        {selectedStage && (
                          <Badge colorScheme="blue" variant="subtle" borderRadius="full" px={2} py={1} fontSize="xs">
                            Stage: {selectedStage}
                          </Badge>
                        )}
                        {selectedRound && (
                          <Badge colorScheme="green" variant="subtle" borderRadius="full" px={2} py={1} fontSize="xs">
                            Round: {selectedRound}
                          </Badge>
                        )}
                        {selectedCountry && (
                          <Badge colorScheme="purple" variant="subtle" borderRadius="full" px={2} py={1} fontSize="xs">
                            Country: {selectedCountry}
                          </Badge>
                        )}
                        {selectedIndustry && (
                          <Badge colorScheme="orange" variant="subtle" borderRadius="full" px={2} py={1} fontSize="xs">
                            Industry: {selectedIndustry}
                          </Badge>
                        )}
                        {selectedDealSize && (
                          <Badge colorScheme="teal" variant="subtle" borderRadius="full" px={2} py={1} fontSize="xs">
                            Size: {selectedDealSize}
                          </Badge>
                        )}
                        {selectedInvestorType && (
                          <Badge colorScheme="pink" variant="subtle" borderRadius="full" px={2} py={1} fontSize="xs">
                            Investor: {selectedInvestorType}
                          </Badge>
                        )}
                        {(dateRange.start || dateRange.end) && (
                          <Badge colorScheme="cyan" variant="subtle" borderRadius="full" px={2} py={1} fontSize="xs">
                            Date: {dateRange.start || 'Any'} - {dateRange.end || 'Any'}
                          </Badge>
                        )}
                      </HStack>
                    </Box>
                  )}
                </VStack>
              </CardBody>
            </Card>

            {/* Dual View Tabs */}
            <Card 
              bg="rgba(59, 130, 246, 0.05)"
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor="rgba(59, 130, 246, 0.2)"
              shadow="xl"
              borderRadius="2xl"
              overflow="hidden"
            >
              <CardHeader bg="rgba(59, 130, 246, 0.1)" py={3} borderBottom="1px solid" borderColor="rgba(59, 130, 246, 0.1)">
                <HStack justify="space-between">
                  <Text fontSize="md" fontWeight="bold" color="blue.700">
                    Data Views
                  </Text>
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant={activeView === 'deal' ? 'solid' : 'outline'}
                      onClick={() => setActiveView('deal')}
                      bg={activeView === 'deal' ? 'blue.500' : 'transparent'}
                      color={activeView === 'deal' ? 'white' : 'blue.600'}
                      borderColor="blue.500"
                      _hover={{ 
                        bg: activeView === 'deal' ? 'blue.600' : 'rgba(59, 130, 246, 0.1)'
                      }}
                      borderRadius="lg"
                      px={4}
                    >
                      Deal Summary ({filteredDeals.length})
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="green"
                      variant={activeView === 'position' ? 'solid' : 'outline'}
                      onClick={() => setActiveView('position')}
                      bg={activeView === 'position' ? 'green.500' : 'transparent'}
                      color={activeView === 'position' ? 'white' : 'green.600'}
                      borderColor="green.500"
                      _hover={{ 
                        bg: activeView === 'position' ? 'green.600' : 'rgba(34, 197, 94, 0.1)'
                      }}
                      borderRadius="lg"
                      px={4}
                    >
                      Investment Position ({filteredPositions.length})
                    </Button>
                  </HStack>
                </HStack>
              </CardHeader>
              
              <CardBody p={0}>
                {activeView === 'deal' ? (
                  // Deal Summary View - Every Deal is 1 row
                  <Box>
                    {/* Results Summary */}
                    <Box 
                      bg="rgba(59, 130, 246, 0.05)"
                      borderBottom="1px solid"
                      borderColor="rgba(59, 130, 246, 0.1)"
                      p={3}
                    >
                      <HStack justify="space-between" align="center">
                        <VStack align="start" spacing={1}>
                          <Text fontSize="md" fontWeight="bold" color="blue.700">
                            Deal Summary Results
                          </Text>
                          <Text fontSize="xs" color="blue.500">
                            Showing {paginatedData.length} of {filteredDeals.length} deals
                            {filteredDeals.length !== deals.length && ` (filtered from ${deals.length} total)`}
                          </Text>
                        </VStack>
                        <HStack spacing={2}>
                          <Badge colorScheme="blue" variant="subtle" fontSize="xs" px={2} py={1}>
                            {filteredDeals.length} Deals
                          </Badge>
                          {filteredDeals.length !== deals.length && (
                            <Badge colorScheme="green" variant="subtle" fontSize="xs" px={2} py={1}>
                              {deals.length - filteredDeals.length} Hidden
                            </Badge>
                          )}
                        </HStack>
                      </HStack>
                    </Box>

                    <Box overflowX="auto" maxH="600px">
                      <Table variant="simple" size="sm">
                        <Thead position="sticky" top={0} bg="rgba(59, 130, 246, 0.1)" zIndex={1} borderBottom="1px solid" borderColor="rgba(59, 130, 246, 0.2)">
                          <Tr>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="blue.700">Deal ID</Th>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="blue.700">Company</Th>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="blue.700">Round</Th>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="blue.700">Total Size</Th>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="blue.700" maxW="150px">Investors</Th>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="blue.700">Stage</Th>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="blue.700">Industry</Th>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="blue.700">Related Companies</Th>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="blue.700">Related Investors</Th>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="blue.700">Related Funds</Th>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="blue.700">Actions</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {paginatedData.map((deal, index) => {
                            // Get related data for this deal
                            const relatedCompanies = hierarchicalService.getDealRelatedCompanies(deal.id) || [];
                            const relatedInvestors = hierarchicalService.getDealRelatedInvestors(deal.id) || [];
                            const relatedFunds = hierarchicalService.getDealRelatedFunds(deal.id) || [];
                            
                            return (
                            <Tr key={index} _hover={{ bg: 'rgba(59, 130, 246, 0.05)' }} fontSize="xs" borderBottom="1px solid" borderColor="rgba(59, 130, 246, 0.1)" height="70px">
                              <Td px={3} py={2} fontWeight="bold" fontSize="xs">{deal.dealId}</Td>
                              <Td px={3} py={2}>
                                <Button
                                  variant="link"
                                  color="blue.600"
                                  onClick={() => navigateToCompany(deal.id)}
                                  leftIcon={<Building2 size={14} />}
                                  size="xs"
                                  p={0}
                                  h="auto"
                                  minH="auto"
                                >
                                  {deal.company}
                                </Button>
                                <Text fontSize="xs" color="gray.500" mt={1} noOfLines={1}>{deal.chineseCompany}</Text>
                              </Td>
                              <Td px={3} py={2}>
                                <Badge colorScheme="blue" size="sm" fontSize="xs">{deal.fundingRound}</Badge>
                              </Td>
                              <Td px={3} py={2} fontWeight="bold" color="green.600" fontSize="xs">
                                {formatCurrency(deal.totalDealSize)}
                              </Td>
                              <Td px={3} py={2} maxW="150px">
                                <VStack spacing={1} align="start" maxH="50px" overflow="hidden">
                                  <Text fontSize="xs" maxW="150px" noOfLines={2} overflow="hidden">
                                    {(() => {
                                      if (!deal.allInvestors) return 'No investors';
                                      if (Array.isArray(deal.allInvestors)) {
                                        if (deal.allInvestors.length === 0) return 'No investors';
                                        // Filter out any non-string values and take first 2
                                        const validInvestors = deal.allInvestors.filter(inv => typeof inv === 'string' && inv.trim());
                                        if (validInvestors.length === 0) return 'No valid investors';
                                        return validInvestors.slice(0, 2).join(', ') + (validInvestors.length > 2 ? '...' : '');
                                      }
                                      // If it's not an array, try to convert it
                                      if (typeof deal.allInvestors === 'string') {
                                        return deal.allInvestors.length > 50 ? deal.allInvestors.substring(0, 50) + '...' : deal.allInvestors;
                                      }
                                      return 'Invalid data';
                                    })()}
                                  </Text>
                                  {deal.allInvestors && Array.isArray(deal.allInvestors) && deal.allInvestors.length > 2 && (
                                    <Button
                                      size="xs"
                                      variant="ghost"
                                      color="blue.500"
                                      onClick={() => {
                                        setSelectedDeal(deal);
                                        onOpen();
                                      }}
                                    >
                                      +{deal.allInvestors.length - 2} more
                                    </Button>
                                  )}
                                  <Text fontSize="xs" color="gray.500">
                                    {deal.totalInvestors || 0} investors
                                  </Text>
                                </VStack>
                              </Td>
                              <Td px={3} py={2}>
                                <Badge colorScheme="purple" size="sm" fontSize="xs">{deal.stage}</Badge>
                              </Td>
                              <Td px={3} py={2} fontSize="xs">{deal.industry}</Td>
                              <Td px={3} py={2}>
                                <VStack align="start" spacing={1} maxH="50px" overflow="hidden">
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
                                            setSelectedDeal(deal);
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
                              <Td px={3} py={2}>
                                <VStack align="start" spacing={1} maxH="50px" overflow="hidden">
                                  {relatedInvestors.length > 0 ? (
                                    <>
                                      {relatedInvestors.slice(0, 2).map((investor, idx) => (
                                        <Link
                                          key={investor.id}
                                          color="green.500"
                                          fontSize="xs"
                                          onClick={() => navigateToInvestor(investor.id)}
                                          _hover={{ textDecoration: 'underline' }}
                                          cursor="pointer"
                                          noOfLines={1}
                                        >
                                          {hierarchicalService.getEntityName('investor', investor.id)}
                                        </Link>
                                      ))}
                                      {relatedInvestors.length > 2 && (
                                        <Button
                                          size="xs"
                                          variant="ghost"
                                          color="green.500"
                                          onClick={() => {
                                            setSelectedDeal(deal);
                                            onOpen();
                                          }}
                                        >
                                          +{relatedInvestors.length - 2} more
                                        </Button>
                                      )}
                                    </>
                                  ) : (
                                    <Text fontSize="xs" color="gray.400">-</Text>
                                  )}
                                </VStack>
                              </Td>
                              <Td px={3} py={2}>
                                <VStack align="start" spacing={1} maxH="50px" overflow="hidden">
                                  {relatedFunds.length > 0 ? (
                                    <>
                                      {relatedFunds.slice(0, 2).map((fund, idx) => (
                                        <Link
                                          key={fund.id}
                                          color="purple.500"
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
                                          color="purple.500"
                                          onClick={() => {
                                            setSelectedDeal(deal);
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
                              <Td px={3} py={2}>
                                <IconButton
                                  size="xs"
                                  icon={<Eye size={14} />}
                                  aria-label="View deal details"
                                  onClick={() => openDealDetail(deal)}
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
                  </Box>
                ) : (
                  // Investment Position View - Every Investment Position is 1 row
                  <Box>
                    {/* Results Summary */}
                    <Box 
                      bg="rgba(34, 197, 94, 0.05)"
                      borderBottom="1px solid"
                      borderColor="rgba(34, 197, 94, 0.1)"
                      p={3}
                    >
                      <HStack justify="space-between" align="center">
                        <VStack align="start" spacing={1}>
                          <Text fontSize="md" fontWeight="bold" color="green.700">
                            Investment Position Results
                          </Text>
                          <Text fontSize="xs" color="green.500">
                            Showing {paginatedData.length} of {filteredPositions.length} positions
                            {filteredPositions.length !== positions.length && ` (filtered from ${positions.length} total)`}
                          </Text>
                        </VStack>
                        <HStack spacing={2}>
                          <Badge colorScheme="green" variant="subtle" fontSize="xs" px={2} py={1}>
                            {filteredPositions.length} Positions
                          </Badge>
                          {filteredPositions.length !== positions.length && (
                            <Badge colorScheme="blue" variant="subtle" fontSize="xs" px={2} py={1}>
                              {positions.length - filteredPositions.length} Hidden
                            </Badge>
                          )}
                        </HStack>
                      </HStack>
                    </Box>
                    
                    <Box overflowX="auto" maxH="600px">
                      <Table variant="simple" size="sm">
                        <Thead position="sticky" top={0} bg="rgba(34, 197, 94, 0.1)" zIndex={1} borderBottom="1px solid" borderColor="rgba(34, 197, 94, 0.2)">
                          <Tr>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="green.700">Position ID</Th>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="green.700">Investor</Th>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="green.700">Company</Th>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="green.700">Deal Size</Th>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="green.700">Position Size</Th>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="green.700">Round</Th>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="green.700">Lead</Th>
                            <Th px={3} py={2} fontSize="xs" fontWeight="bold" color="green.700">Actions</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {paginatedData.map((position, index) => (
                            <Tr key={index} _hover={{ bg: 'rgba(34, 197, 94, 0.05)' }} fontSize="xs" borderBottom="1px solid" borderColor="rgba(34, 197, 94, 0.1)" height="70px">
                              <Td px={3} py={2} fontSize="xs" color="gray.500">{position.positionId}</Td>
                              <Td px={3} py={2}>
                                <Button
                                  variant="link"
                                  color="green.600"
                                  onClick={() => navigateToInvestor(position.investorId)}
                                  leftIcon={<Users size={14} />}
                                  size="xs"
                                  p={0}
                                  h="auto"
                                  minH="auto"
                                >
                                  {position.investor}
                                </Button>
                                <Text fontSize="xs" color="gray.500" mt={1} noOfLines={1}>{position.chineseInvestor}</Text>
                              </Td>
                              <Td px={3} py={2}>
                                <Button
                                  variant="link"
                                  color="blue.600"
                                  onClick={() => navigateToCompany(position.companyId)}
                                  leftIcon={<Building2 size={14} />}
                                  size="xs"
                                  p={0}
                                  h="auto"
                                  minH="auto"
                                >
                                  {position.company}
                                </Button>
                                <Text fontSize="xs" color="gray.500" mt={1} noOfLines={1}>{position.chineseCompany}</Text>
                              </Td>
                              <Td px={3} py={2} color="gray.600" fontSize="xs">
                                {formatCurrency(position.totalDealSize)}
                              </Td>
                              <Td px={3} py={2} fontWeight="bold" color="blue.600" fontSize="xs">
                                {formatCurrency(position.positionDealSize)}
                              </Td>
                              <Td px={3} py={2}>
                                <Badge colorScheme="blue" size="sm" fontSize="xs">{position.fundingRound}</Badge>
                              </Td>
                              <Td px={3} py={2}>
                                {position.leadInvestor ? (
                                  <Badge colorScheme="green" size="sm" fontSize="xs">Lead</Badge>
                                ) : (
                                  <Badge colorScheme="gray" size="sm" fontSize="xs">Participant</Badge>
                                )}
                              </Td>
                              <Td px={3} py={2}>
                                <IconButton
                                  size="xs"
                                  icon={<Eye size={14} />}
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
                          ({paginatedData.length} items per page)
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

      {/* Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <VStack align="start" spacing={2}>
              <Text fontSize="2xl" fontWeight="bold">
                {selectedDeal ? `Deal: ${selectedDeal.dealId}` : `Position: ${selectedPosition?.positionId}`}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {selectedDeal ? 'Deal Details & Relationships' : 'Investment Position Details'}
              </Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedDeal ? (
              <VStack spacing={6} align="stretch">
                {/* Basic Deal Information */}
                <Card>
                  <CardHeader bg="blue.50">
                    <Heading size="md" color="blue.700">
                      Deal Information
                    </Heading>
                  </CardHeader>
                  <CardBody>
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
                        <Badge colorScheme="purple">{selectedDeal.fundingRound}</Badge>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" color="gray.600">Total Deal Size</Text>
                        <Text color="green.600" fontWeight="bold">{formatCurrency(selectedDeal.totalDealSize)}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" color="gray.600">Stage</Text>
                        <Badge colorScheme="orange">{selectedDeal.stage}</Badge>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" color="gray.600">Industry</Text>
                        <Badge colorScheme="blue">{selectedDeal.industry}</Badge>
                      </Box>
                    </Grid>
                    
                    {/* Additional Deal Information */}
                    <Box mt={4} pt={4} borderTop="1px solid" borderColor="gray.200">
                      <Text fontWeight="bold" color="gray.700" mb={3}>Additional Information</Text>
                      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <Box>
                          <Text fontWeight="bold" color="gray.600">Total Investors</Text>
                          <Text>{selectedDeal.totalInvestors || 'Unknown'}</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="bold" color="gray.600">Date</Text>
                          <Text>{selectedDeal.date || 'Not specified'}</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="bold" color="gray.600">Country</Text>
                          <Text>{selectedDeal.country || 'Not specified'}</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="bold" color="gray.600">Cross Border</Text>
                          <Badge colorScheme={selectedDeal.crossBorder ? 'red' : 'gray'}>
                            {selectedDeal.crossBorder ? 'Yes' : 'No'}
                          </Badge>
                        </Box>
                      </Grid>
                    </Box>
                  </CardBody>
                </Card>

                {/* All Investors */}
                <Card>
                  <CardHeader bg="green.50">
                    <Heading size="md" color="green.700">
                      All Investors ({selectedDeal.allInvestors?.length || 0})
                    </Heading>
                    <Text fontSize="sm" color="green.600">
                      All investors participating in this deal
                    </Text>
                  </CardHeader>
                  <CardBody>
                    {selectedDeal.allInvestors && selectedDeal.allInvestors.length > 0 ? (
                      <VStack align="stretch" spacing={3}>
                        {selectedDeal.allInvestors.map((investor, idx) => (
                          <HStack key={idx} justify="space-between" p={3} bg="gray.50" borderRadius="md">
                            <VStack align="start" spacing={1} flex={1}>
                              <Text fontWeight="medium" color="blue.600">
                                {typeof investor === 'string' ? investor : (investor.name || investor.id || 'Unknown')}
                              </Text>
                              <Text fontSize="xs" color="gray.500">
                                Investor #{idx + 1}
                              </Text>
                            </VStack>
                            <Button
                              size="sm"
                              colorScheme="blue"
                              variant="outline"
                              onClick={() => {
                                onClose();
                                // Navigate to investor if we have an ID
                                if (typeof investor === 'object' && investor.id) {
                                  navigateToInvestor(investor.id);
                                } else {
                                  navigate('/investors');
                                }
                              }}
                            >
                              View Details
                            </Button>
                          </HStack>
                        ))}
                      </VStack>
                    ) : (
                      <Text color="gray.500">No investors found for this deal.</Text>
                    )}
                  </CardBody>
                </Card>

                {/* Related Companies */}
                <Card>
                  <CardHeader bg="blue.50">
                    <Heading size="md" color="blue.700">
                      Related Companies ({hierarchicalService.getDealRelatedCompanies(selectedDeal.id)?.length || 0})
                    </Heading>
                    <Text fontSize="sm" color="blue.600">
                      Companies related to this deal
                    </Text>
                  </CardHeader>
                  <CardBody>
                    {hierarchicalService.getDealRelatedCompanies(selectedDeal.id)?.length > 0 ? (
                      <VStack align="stretch" spacing={3}>
                        {hierarchicalService.getDealRelatedCompanies(selectedDeal.id).map((company, idx) => (
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

                {/* Related Investors */}
                <Card>
                  <CardHeader bg="green.50">
                    <Heading size="md" color="green.700">
                      Related Investors ({hierarchicalService.getDealRelatedInvestors(selectedDeal.id)?.length || 0})
                    </Heading>
                    <Text fontSize="sm" color="green.600">
                      Investors directly involved in this deal
                    </Text>
                  </CardHeader>
                  <CardBody>
                    {hierarchicalService.getDealRelatedInvestors(selectedDeal.id)?.length > 0 ? (
                      <VStack align="stretch" spacing={3}>
                        {hierarchicalService.getDealRelatedInvestors(selectedDeal.id).map((investor, idx) => (
                          <HStack key={investor.id} justify="space-between" p={3} bg="gray.50" borderRadius="md">
                            <VStack align="start" spacing={1} flex={1}>
                              <Link
                                color="green.500"
                                fontWeight="medium"
                                onClick={() => {
                                  onClose();
                                  navigateToInvestor(investor.id);
                                }}
                                _hover={{ textDecoration: 'underline' }}
                                cursor="pointer"
                              >
                                {hierarchicalService.getEntityName('investor', investor.id)}
                              </Link>
                              <HStack spacing={4} fontSize="xs" color="gray.500">
                                <Text>ID: {investor.id}</Text>
                                {investor.firmCategory && (
                                  <Badge size="sm" colorScheme="blue">{investor.firmCategory}</Badge>
                                )}
                                {investor.firmLocation && (
                                  <Text>📍 {investor.firmLocation}</Text>
                                )}
                              </HStack>
                            </VStack>
                            <Button
                              size="sm"
                              colorScheme="green"
                              variant="outline"
                              onClick={() => {
                                onClose();
                                navigateToInvestor(investor.id);
                              }}
                            >
                              View Details
                            </Button>
                          </HStack>
                        ))}
                      </VStack>
                    ) : (
                      <Text color="gray.500">No related investors found.</Text>
                    )}
                  </CardBody>
                </Card>

                {/* Related Funds */}
                <Card>
                  <CardHeader bg="purple.50">
                    <Heading size="md" color="purple.700">
                      Related Funds ({hierarchicalService.getDealRelatedFunds(selectedDeal.id)?.length || 0})
                    </Heading>
                    <Text fontSize="sm" color="purple.600">
                      Funds involved in this deal
                    </Text>
                  </CardHeader>
                  <CardBody>
                    {hierarchicalService.getDealRelatedFunds(selectedDeal.id)?.length > 0 ? (
                      <VStack align="stretch" spacing={3}>
                        {hierarchicalService.getDealRelatedFunds(selectedDeal.id).map((fund, idx) => (
                          <HStack key={fund.id} justify="space-between" p={3} bg="gray.50" borderRadius="md">
                            <VStack align="start" spacing={1} flex={1}>
                              <Link
                                color="purple.500"
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
                              colorScheme="purple"
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
                      onClick={() => navigateToCompany(selectedPosition.companyId)}
                    >
                      View Company Details
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="green"
                      variant="outline"
                      onClick={() => navigateToInvestor(selectedPosition.investorId)}
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
