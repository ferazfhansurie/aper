import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  Select,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useToast,
  Container,
  Heading,
  Textarea,
  Code,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
  Tooltip,
  Divider,
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
  InputGroup,
  InputLeftElement,
  Spinner,
  Progress,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useClipboard,
  Kbd,
  Collapse
} from '@chakra-ui/react';
import { 
  DownloadIcon, 
  CopyIcon,
  SearchIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import VerticalHeader from './VerticalHeader';
import { hierarchicalService } from '../data/sampleData';

const QueryEditor = () => {
  const [selectedQuery, setSelectedQuery] = useState('');
  const [customFilters, setCustomFilters] = useState('');
  const [results, setResults] = useState(null);
  const [queryHistory, setQueryHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [queryPerformance, setQueryPerformance] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  const [executionTime, setExecutionTime] = useState(0);
  
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasCopied, onCopy } = useClipboard(JSON.stringify(results, null, 2));


  // Enhanced predefined queries with categories and complexity levels
  const predefinedQueries = [
    {
      id: 'deals_summary',
      name: 'Deal Summary View',
      description: 'View all deals with aggregated investor information',
      query: 'SELECT * FROM deals_summary_view',
      category: 'Deals',
      complexity: 'Basic',
      estimatedTime: '50ms',
      tags: ['deals', 'investors', 'summary']
    },
    {
      id: 'positions_detail',
      name: 'Investment Position Detail',
      description: 'View individual investment positions with investor details',
      query: 'SELECT * FROM investment_position_view',
      category: 'Positions',
      complexity: 'Intermediate',
      estimatedTime: '75ms',
      tags: ['positions', 'investments', 'detail']
    },
    {
      id: 'tech_companies',
      name: 'Technology Companies',
      description: 'Find all technology-focused companies',
      query: 'SELECT * FROM companies WHERE tech_category = true',
      category: 'Companies',
      complexity: 'Basic',
      estimatedTime: '30ms',
      tags: ['companies', 'technology', 'filter']
    },
    {
      id: 'vc_investors',
      name: 'Venture Capital Investors',
      description: 'List all venture capital investors',
      query: 'SELECT * FROM investors WHERE firm_category = "Venture Capital"',
      category: 'Investors',
      complexity: 'Basic',
      estimatedTime: '25ms',
      tags: ['investors', 'venture-capital', 'filter']
    },
    {
      id: 'large_deals',
      name: 'Large Deals (>$100M)',
      description: 'Find deals with total size over $100 million',
      query: 'SELECT * FROM deals WHERE total_deal_size > 100000000',
      category: 'Deals',
      complexity: 'Intermediate',
      estimatedTime: '60ms',
      tags: ['deals', 'large', 'filter', 'amount']
    },
    {
      id: 'lead_investors',
      name: 'Lead Investors',
      description: 'Show all lead investor positions',
      query: 'SELECT * FROM positions WHERE lead_investor = true',
      category: 'Positions',
      complexity: 'Basic',
      estimatedTime: '40ms',
      tags: ['positions', 'lead', 'investors']
    },
    {
      id: 'fund_performance',
      name: 'Fund Performance Analysis',
      description: 'Analyze fund performance metrics and returns',
      query: 'SELECT * FROM fund_performance_view',
      category: 'Funds',
      complexity: 'Advanced',
      estimatedTime: '120ms',
      tags: ['funds', 'performance', 'analysis', 'metrics']
    },
    {
      id: 'geographic_distribution',
      name: 'Geographic Distribution',
      description: 'View investments by geographic region',
      query: 'SELECT * FROM geographic_investment_view',
      category: 'Geography',
      complexity: 'Intermediate',
      estimatedTime: '80ms',
      tags: ['geography', 'distribution', 'regional']
    }
  ];

  // Enhanced query execution with performance monitoring
  const executeQuery = useCallback(async () => {
    if (!selectedQuery) {
      toast({
        title: 'No Query Selected',
        description: 'Please select a predefined query or enter a custom query',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    setErrorDetails(null);
    setQueryPerformance(null);
    const startTime = performance.now();
    
    try {
      let queryResults;
      
      // Execute based on query type
      switch (selectedQuery) {
        case 'deals_summary':
          queryResults = hierarchicalService.getDealSummaryView();
          break;
        case 'positions_detail':
          queryResults = hierarchicalService.getInvestmentPositionView();
          break;
        case 'tech_companies':
          queryResults = Array.from(hierarchicalService.companies.values())
            .filter(company => company.techCategory);
          break;
        case 'vc_investors':
          queryResults = Array.from(hierarchicalService.investors.values())
            .filter(investor => investor.firmCategory === 'Venture Capital');
          break;
        case 'large_deals':
          queryResults = hierarchicalService.getDealSummaryView()
            .filter(deal => deal.totalDealSize > 100000000);
          break;
        case 'lead_investors':
          queryResults = hierarchicalService.getInvestmentPositionView()
            .filter(position => position.leadInvestor);
          break;
        case 'fund_performance':
          queryResults = hierarchicalService.getFundPerformanceView?.() || [];
          break;
        case 'geographic_distribution':
          queryResults = hierarchicalService.getGeographicInvestmentView?.() || [];
          break;
        default:
          // Custom query handling
          queryResults = handleCustomQuery(selectedQuery);
      }

      const endTime = performance.now();
      const executionTimeMs = endTime - startTime;

      setResults(queryResults);
      setExecutionTime(executionTimeMs);
      
      // Performance metrics
      setQueryPerformance({
        executionTime: executionTimeMs,
        resultCount: Array.isArray(queryResults) ? queryResults.length : 0,
        memoryUsage: JSON.stringify(queryResults).length,
        complexity: predefinedQueries.find(q => q.id === selectedQuery)?.complexity || 'Unknown'
      });
      
      // Add to query history
      const queryInfo = {
        id: Date.now(),
        query: selectedQuery,
        timestamp: new Date().toLocaleTimeString(),
        resultCount: Array.isArray(queryResults) ? queryResults.length : 0,
        executionTime: executionTimeMs,
        success: true
      };
      setQueryHistory(prev => [queryInfo, ...prev.slice(0, 19)]);

      toast({
        title: 'Query Executed Successfully',
        description: `Retrieved ${Array.isArray(queryResults) ? queryResults.length : 0} results in ${executionTimeMs.toFixed(2)}ms`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

    } catch (error) {
      const endTime = performance.now();
      const executionTimeMs = endTime - startTime;
      
      setErrorDetails({
        message: error.message,
        stack: error.stack,
        executionTime: executionTimeMs
      });
      
      // Add failed query to history
      const queryInfo = {
        id: Date.now(),
        query: selectedQuery,
        timestamp: new Date().toLocaleTimeString(),
        resultCount: 0,
        executionTime: executionTimeMs,
        success: false,
        error: error.message
      };
      setQueryHistory(prev => [queryInfo, ...prev.slice(0, 19)]);

      toast({
        title: 'Query Execution Failed',
        description: error.message || 'Failed to execute query',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedQuery, toast]);

  // Populate sample data if not already populated
  useEffect(() => {
    if (hierarchicalService.companies.size === 0) {
      import('../data/sampleData.js').then(({ populateSampleData }) => {
        populateSampleData(hierarchicalService);
      });
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        if (selectedQuery && !isLoading) {
          executeQuery();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedQuery, isLoading, executeQuery]);

  const handleCustomQuery = (query) => {
    // Enhanced custom query parser with better error handling
    try {
    if (query.toLowerCase().includes('companies')) {
      return Array.from(hierarchicalService.companies.values());
    } else if (query.toLowerCase().includes('investors')) {
      return Array.from(hierarchicalService.investors.values());
    } else if (query.toLowerCase().includes('funds')) {
      return Array.from(hierarchicalService.funds.values());
    } else if (query.toLowerCase().includes('deals')) {
      return hierarchicalService.getDealSummaryView();
    } else {
      return hierarchicalService.getDealSummaryView();
      }
    } catch (error) {
      throw new Error(`Custom query parsing failed: ${error.message}`);
    }
  };

  const exportResults = () => {
    if (!results || !Array.isArray(results)) {
      toast({
        title: 'No Results to Export',
        description: 'Execute a query first to export results',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
    const headers = Object.keys(results[0] || {});
    const csvContent = [
      headers.join(','),
      ...results.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' ? `"${value}"` : value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `query_results_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Export Successful',
      description: `Exported ${results.length} results to CSV`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    } catch (error) {
    toast({
        title: 'Export Failed',
        description: `Failed to export results: ${error.message}`,
        status: 'error',
        duration: 3000,
      isClosable: true,
    });
    }
  };

  const getResultColumns = () => {
    if (!results || !Array.isArray(results) || results.length === 0) return [];
    return Object.keys(results[0]);
  };

  const formatValue = (value) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'number') {
      if (value > 1000000) return `$${(value / 1000000).toFixed(1)}M`;
      if (value > 1000) return `$${(value / 1000).toFixed(1)}K`;
      return value.toLocaleString();
    }
    return String(value);
  };

  const filteredQueries = predefinedQueries.filter(query =>
    query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    query.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    query.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );



  return (
    <Box bg="white" minH="100vh">
      
      <VerticalHeader />
      <Box ml={{ base: 0, lg: "280px" }} position="relative" zIndex={1}>
        <Container maxW="1400px" py={8}>
          <VStack spacing={8} align="stretch">
            
            {/* Header */}
            <Box textAlign="center" mb={8}>
              <Heading size="lg" color="blue.600" mb={2}>
                Query Editor
              </Heading>
              <Text color="gray.600" fontSize="lg">
                Explore the hierarchical data structure with SQL-like queries
              </Text>
            </Box>

                        {/* Statistics Cards */}
            <Grid templateColumns={{ base: "1fr", lg: "repeat(4, 1fr)" }} gap={6}>
              {[
                { label: 'Total Companies', value: hierarchicalService.companies.size, color: 'blue' },
                { label: 'Total Deals', value: hierarchicalService.deals.size, color: 'green' },
                { label: 'Total Positions', value: hierarchicalService.positions.size, color: 'purple' },
                { label: 'Total Investors', value: hierarchicalService.investors.size, color: 'orange' }
              ].map((stat, index) => (
                <Card key={index} shadow="md">
                  <CardBody textAlign="center">
                    <Stat>
                      <StatLabel color={`${stat.color}.700`}>{stat.label}</StatLabel>
                      <StatNumber color={`${stat.color}.800`}>{stat.value.toLocaleString()}</StatNumber>
                      <StatHelpText color={`${stat.color}.600`}>In the system</StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>
              ))}
            </Grid>

            {/* Query Interface */}
            <Card shadow="lg">
              <CardBody p={8}>
                <VStack spacing={6}>
                  {/* Search and Filter */}
                  <Box w="full">
                    <HStack justify="space-between" align="center" mb={4}>
                      <Text fontSize="lg" fontWeight="bold" color="blue.700">
                        Query Selection
                    </Text>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        rightIcon={showAdvanced ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      >
                        {showAdvanced ? 'Hide' : 'Show'} Advanced
                      </Button>
                    </HStack>
                    
                    <InputGroup>
                      <InputLeftElement>
                        <SearchIcon color="gray.400" />
                      </InputLeftElement>
                      <Input
                        placeholder="Search queries by name, description, or tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        size="lg"
                        borderColor="blue.200"
                        _hover={{ borderColor: 'blue.300' }}
                        _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                      />
                    </InputGroup>
                  </Box>

                  {/* Query Selection with Enhanced UI */}
                  <Box w="full">
                    <Select
                      placeholder="Choose a query to execute..."
                      value={selectedQuery}
                      onChange={(e) => setSelectedQuery(e.target.value)}
                      size="lg"
                      borderColor="blue.200"
                      _hover={{ borderColor: 'blue.300' }}
                      _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                    >
                      {filteredQueries.map(query => (
                        <option key={query.id} value={query.id}>
                          {query.name} - {query.description}
                        </option>
                      ))}
                    </Select>
                    
                    {selectedQuery && (
                      <Box mt={3} p={3} bg="blue.50" borderRadius="md" border="1px solid" borderColor="blue.100">
                        <HStack spacing={4} align="center">
                          <Badge colorScheme="blue" variant="subtle">
                            {predefinedQueries.find(q => q.id === selectedQuery)?.category}
                          </Badge>
                          <Badge colorScheme="green" variant="subtle">
                            {predefinedQueries.find(q => q.id === selectedQuery)?.complexity}
                          </Badge>
                          <Badge colorScheme="purple" variant="subtle">
                            Est. {predefinedQueries.find(q => q.id === selectedQuery)?.estimatedTime}
                          </Badge>
                        </HStack>
                      </Box>
                    )}
                  </Box>

                  {/* Advanced Options */}
                  <Collapse in={showAdvanced} animateOpacity>
                    <Box w="full" p={4} bg="gray.50" borderRadius="md">
                      <VStack spacing={4} align="stretch">
                        <Text fontSize="md" fontWeight="semibold" color="gray.700">
                          Advanced Query Options
                    </Text>
                        <VStack spacing={2} align="stretch">
                    <Textarea
                            placeholder="Enter additional filters, custom query logic, or SQL-like conditions..."
                      value={customFilters}
                      onChange={(e) => setCustomFilters(e.target.value)}
                            size="md"
                      borderColor="blue.200"
                      _hover={{ borderColor: 'blue.300' }}
                      _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                      rows={3}
                    />
                          {customFilters && (
                            <Text fontSize="xs" color="gray.500">
                              💡 Tip: Use keywords like 'companies', 'investors', 'deals', 'funds' for best results
                            </Text>
                          )}
                        </VStack>
                        <HStack spacing={3}>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            colorScheme="blue"
                            onClick={() => setCustomFilters('companies WHERE tech_category = true AND funding_round > 1000000')}
                          >
                            ⚙️ Quick Example
                          </Button>
                          <Button size="sm" variant="outline" colorScheme="green">
                            💾 Save Query
                          </Button>
                        </HStack>
                      </VStack>
                  </Box>
                  </Collapse>

                                    {/* Execute Button */}
                  <Button
                    colorScheme="blue"
                    size="lg"
                    onClick={executeQuery}
                    isLoading={isLoading}
                    loadingText="Executing Query..."
                    leftIcon="▶️"
                    px={8}
                    py={6}
                    fontSize="lg"
                    fontWeight="bold"
                  >
                    Execute Query
                  </Button>
                  <HStack spacing={2} fontSize="xs" color="gray.500" justify="center">
                    <Kbd>Ctrl</Kbd>
                    <Text>+</Text>
                    <Kbd>Enter</Kbd>
                    <Text>to execute</Text>
                  </HStack>

                  {/* Performance Indicator */}
                  {isLoading && (
                    <Box w="full" textAlign="center">
                      <VStack spacing={3}>
                        <Spinner size="lg" color="blue.500" thickness="3px" />
                        <Progress size="sm" isIndeterminate colorScheme="blue" borderRadius="full" />
                        <Text fontSize="sm" color="gray.600" fontWeight="medium">
                          Processing query... Please wait
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          This may take a few moments depending on query complexity
                        </Text>
                      </VStack>
                    </Box>
                  )}
                </VStack>
              </CardBody>
            </Card>

            {/* Error Display */}
            {errorDetails && (
              <Alert status="error" borderRadius="xl" bg="red.50" border="1px solid" borderColor="red.200">
                <AlertIcon />
                <Box>
                  <AlertTitle>Query Execution Failed</AlertTitle>
                  <AlertDescription>
                    {errorDetails.message}
                    <Button
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      ml={3}
                      onClick={onOpen}
                    >
                      View Details
                    </Button>
                  </AlertDescription>
                </Box>
              </Alert>
            )}

            {/* Results Display */}
            {results && (
              <Card shadow="lg">
                <CardBody p={8}>
                  <VStack spacing={6} align="stretch">
                    {/* Results Header with Performance Metrics */}
                    <Box>
                      <HStack justify="space-between" align="center" mb={4}>
                      <Box>
                          <Heading size="lg" color="blue.700" mb={2}>
                          Query Results
                        </Heading>
                          <HStack spacing={4} align="center">
                        <Text color="gray.600">
                          {Array.isArray(results) ? results.length : 0} results found
                        </Text>
                            {queryPerformance && (
                              <HStack spacing={3}>
                                <Badge colorScheme="green" variant="subtle">
                                  ⏱️
                                  {queryPerformance.executionTime.toFixed(2)}ms
                                </Badge>
                                <Badge colorScheme="blue" variant="subtle">
                                  🗄️ {queryPerformance.complexity}
                                </Badge>
                              </HStack>
                            )}
                          </HStack>
                      </Box>
                      
                      <HStack spacing={3}>
                        <Tooltip label="Copy results to clipboard">
                          <IconButton
                            icon={<CopyIcon />}
                              onClick={onCopy}
                            colorScheme="blue"
                            variant="outline"
                            aria-label="Copy results"
                              size="lg"
                          />
                        </Tooltip>
                        <Tooltip label="Export results to CSV">
                          <IconButton
                            icon={<DownloadIcon />}
                            onClick={exportResults}
                            colorScheme="green"
                            variant="outline"
                            aria-label="Export results"
                              size="lg"
                          />
                        </Tooltip>
                      </HStack>
                    </HStack>

                      {/* Performance Bar */}
                      {queryPerformance && (
                        <Box mt={4} p={4} bg="gray.50" borderRadius="md">
                          <HStack justify="space-between" mb={2}>
                            <Text fontSize="sm" fontWeight="medium" color="gray.700">
                              Query Performance
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              {queryPerformance.executionTime.toFixed(2)}ms execution time
                            </Text>
                          </HStack>
                          <Progress 
                            value={(queryPerformance.executionTime / 200) * 100} 
                            colorScheme={queryPerformance.executionTime < 100 ? 'green' : queryPerformance.executionTime < 150 ? 'yellow' : 'red'}
                            borderRadius="full"
                            size="sm"
                          />
                        </Box>
                      )}
                    </Box>

                    <Divider />

                    {/* Enhanced Results Tabs */}
                    <Tabs value={activeTab} onChange={setActiveTab} colorScheme="blue" variant="enclosed">
                      <TabList>
                        <Tab>
                          👁️ Table View
                        </Tab>
                        <Tab>
                          💻 JSON View
                        </Tab>
                      </TabList>
                      
                      <TabPanels>
                        <TabPanel>
                          <Box overflowX="auto">
                            <Table variant="simple" size="sm">
                              <Thead>
                                <Tr>
                                  {getResultColumns().map(column => (
                                    <Th key={column} color="blue.700" bg="blue.50">
                                      {column.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                    </Th>
                                  ))}
                                </Tr>
                              </Thead>
                              <Tbody>
                                {results.slice(0, 100).map((row, index) => (
                                  <Tr key={index} _hover={{ bg: 'blue.50' }} transition="background 0.2s">
                                    {getResultColumns().map(column => (
                                      <Td key={column}>
                                        {formatValue(row[column])}
                                      </Td>
                                    ))}
                                  </Tr>
                                ))}
                              </Tbody>
                            </Table>
                            {results.length > 100 && (
                              <Box textAlign="center" mt={4} p={3} bg="yellow.50" borderRadius="md">
                                <Text color="yellow.700" fontSize="sm">
                                  ⚠️ Showing first 100 results. Total: {results.length} results
                                </Text>
                                <Text color="yellow.600" fontSize="xs" mt={1}>
                                  Use export functionality to download all results
                              </Text>
                              </Box>
                            )}
                          </Box>
                        </TabPanel>
                        
                        <TabPanel>
                          <Box 
                            bg="gray.50" 
                            p={4} 
                            borderRadius="md" 
                            maxH="500px" 
                            overflowY="auto"
                            border="1px solid"
                            borderColor="gray.200"
                          >
                            <Code p={4} borderRadius="md" bg="white" display="block" w="full">
                              <pre style={{ fontSize: '12px', lineHeight: '1.4' }}>
                                {JSON.stringify(results, null, 2)}
                              </pre>
                            </Code>
                          </Box>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </VStack>
                </CardBody>
              </Card>
            )}

            {/* Query History */}
            {queryHistory.length > 0 && (
              <Card shadow="lg">
                <CardBody p={8}>
                  <VStack spacing={4} align="stretch">
                    <HStack justify="space-between" align="center">
                    <Heading size="md" color="blue.700">
                        📚 Query History
                    </Heading>
                      <Text fontSize="sm" color="gray.500">
                        Last {queryHistory.length} queries
                      </Text>
                    </HStack>
                    <VStack spacing={2} align="stretch">
                      {queryHistory.map((query) => (
                        <Box
                          key={query.id}
                          p={3}
                          bg={query.success ? "green.50" : "red.50"}
                          borderRadius="md"
                          border="1px solid"
                          borderColor={query.success ? "green.100" : "red.100"}
                          _hover={{ 
                            borderColor: query.success ? 'green.200' : 'red.200', 
                            bg: query.success ? 'green.100' : 'red.100'
                          }}
                          cursor="pointer"
                          onClick={() => setSelectedQuery(query.query)}
                        >
                          <HStack justify="space-between" align="center">
                            <VStack align="start" spacing={1}>
                              <HStack spacing={2} align="center">
                                <Icon 
                                  as={query.success ? CheckCircleIcon : WarningIcon} 
                                  color={query.success ? "green.500" : "red.500"}
                                />
                                <Text fontWeight="medium" color={query.success ? "green.700" : "red.700"}>
                              {query.query}
                            </Text>
                              </HStack>
                              <Text fontSize="xs" color="gray.500">
                                Executed at {query.timestamp}
                              </Text>
                            </VStack>
                            <HStack spacing={2}>
                              <Badge colorScheme={query.success ? "green" : "red"} variant="subtle">
                                {query.resultCount} results
                              </Badge>
                              <Badge colorScheme="blue" variant="subtle">
                                {query.executionTime.toFixed(2)}ms
                              </Badge>
                            </HStack>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            )}

            {/* Navigation Links */}
            <Card shadow="lg">
              <CardBody p={8}>
                <VStack spacing={4} align="stretch">
                  <Heading size="md" color="blue.700" textAlign="center">
                    Explore Related Data
                  </Heading>
                  <HStack spacing={4} wrap="wrap" justify="center">
                    {[
                      { name: 'Companies', count: hierarchicalService.companies.size, color: 'blue', path: '/companies' },
                      { name: 'Deals', count: hierarchicalService.deals.size, color: 'green', path: '/deals' },
                      { name: 'Investors', count: hierarchicalService.investors.size, color: 'purple', path: '/investors' },
                      { name: 'Funds', count: hierarchicalService.funds.size, color: 'orange', path: '/funds' }
                    ].map((item, index) => (
                                          <Button
                        key={index}
                        colorScheme={item.color}
                        variant="outline"
                        onClick={() => navigate(item.path)}
                        size="md"
                      >
                        {item.name} ({item.count.toLocaleString()})
                      </Button>
                    ))}
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Container>
      </Box>

      {/* Error Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader color="red.600">Query Error Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="bold" mb={2}>Error Message:</Text>
                <Text color="red.600" p={3} bg="red.50" borderRadius="md">
                  {errorDetails?.message}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold" mb={2}>Execution Time:</Text>
                <Text>{errorDetails?.executionTime.toFixed(2)}ms</Text>
              </Box>
              {errorDetails?.stack && (
                <Box>
                  <Text fontWeight="bold" mb={2}>Stack Trace:</Text>
                  <Code p={3} bg="gray.100" borderRadius="md" display="block" w="full" fontSize="xs">
                    <pre>{errorDetails.stack}</pre>
                  </Code>
                </Box>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default QueryEditor;
