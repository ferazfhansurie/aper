import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react';
import { DownloadIcon, ViewIcon, SearchIcon } from '@chakra-ui/icons';
import { hierarchicalService, demonstrateDualViewReporting } from '../data/sampleData';
import VerticalHeader from './VerticalHeader';

const HierarchicalDemo = () => {
  const [activeView, setActiveView] = useState('deal');
  const [dealData, setDealData] = useState([]);
  const [positionData, setPositionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedInvestor, setSelectedInvestor] = useState(null);

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    loadData();
    // Demonstrate the dual-view reporting in console
    demonstrateDualViewReporting(hierarchicalService);
  }, []);

  const loadData = () => {
    setLoading(true);
    
    // Get both views of the data
    const deals = hierarchicalService.getDealSummaryView();
    const positions = hierarchicalService.getInvestmentPositionView();
    
    setDealData(deals);
    setPositionData(positions);
    setLoading(false);
  };

  const exportData = (viewType) => {
    let csvContent;
    let filename;
    
    if (viewType === 'deal') {
      csvContent = hierarchicalService.exportDealSummaryToCSV();
      filename = 'deal_summary_view.csv';
    } else {
      csvContent = hierarchicalService.exportInvestmentPositionToCSV();
      filename = 'investment_position_view.csv';
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

  const formatPercentage = (value) => {
    if (!value) return '0%';
    return `${value}%`;
  };

  return (
    <Box bg="white" minH="100vh">
      <VerticalHeader />
      <Box ml={{ base: 0, lg: "280px" }}>
        <Container maxW="1400px" py={8}>
          <VStack spacing={8} align="stretch">
            
            {/* Header */}
            <Box textAlign="center">
              <Heading size="lg" color="blue.600" mb={2}>
                Hierarchical Data Structure Demo
              </Heading>
              <Text color="gray.600" fontSize="lg">
                Demonstrating the Access system's dual-view reporting capability
              </Text>
            </Box>

            {/* Key Concepts Alert */}
            <Alert status="info" borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Key Concept: Dual-View Reporting</AlertTitle>
                <AlertDescription>
                  This system replicates your Access database's ability to view the same investment data from two perspectives: 
                  <strong> Deal Summary</strong> (one row per investment round) and <strong>Investment Position</strong> (one row per investor's stake).
                </AlertDescription>
              </Box>
            </Alert>

            {/* Statistics Cards */}
            <HStack spacing={6} justify="center">
              <Card bg={cardBg} shadow="md" minW="200px">
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel>Total Companies</StatLabel>
                    <StatNumber>{hierarchicalService.companies.size}</StatNumber>
                    <StatHelpText>In the system</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg={cardBg} shadow="md" minW="200px">
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel>Total Deals</StatLabel>
                    <StatNumber>{hierarchicalService.deals.size}</StatNumber>
                    <StatHelpText>Investment rounds</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg={cardBg} shadow="md" minW="200px">
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel>Total Positions</StatLabel>
                    <StatNumber>{hierarchicalService.positions.size}</StatNumber>
                    <StatHelpText>Individual stakes</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
              
              <Card bg={cardBg} shadow="md" minW="200px">
                <CardBody textAlign="center">
                  <Stat>
                    <StatLabel>Total Investors</StatLabel>
                    <StatNumber>{hierarchicalService.investors.size}</StatNumber>
                    <StatHelpText>Participating firms</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </HStack>

            {/* ABC Corp Example Card */}
            <Card bg={cardBg} shadow="md">
              <CardHeader>
                <Heading size="md" color="blue.600">
                  ABC Corp Example (From Access System Diagrams)
                </Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Text>
                    <strong>Scenario:</strong> "Capital A, Capital B and Capital C invested US$50M in ABC Corp's Series A Round"
                  </Text>
                  
                  <HStack spacing={8} justify="center">
                    <Box textAlign="center">
                      <Text fontWeight="bold" color="green.600">Deal Level</Text>
                      <Text fontSize="lg">ABC Corp Series A</Text>
                      <Text color="gray.600">Total: $50M</Text>
                    </Box>
                    
                    <Box textAlign="center">
                      <Text fontWeight="bold" color="blue.600">Position Level</Text>
                      <VStack spacing={1}>
                        <Text>Capital A: $30M (Lead)</Text>
                        <Text>Capital B: $10M</Text>
                        <Text>Capital C: $10M</Text>
                      </VStack>
                    </Box>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>

            {/* Dual View Tabs */}
            <Card bg={cardBg} shadow="md">
              <CardHeader>
                <HStack justify="space-between">
                  <Heading size="md" color="blue.600">
                    Dual-View Reporting
                  </Heading>
                  <HStack spacing={2}>
                    <Button
                      leftIcon={<DownloadIcon />}
                      colorScheme="blue"
                      variant="outline"
                      size="sm"
                      onClick={() => exportData(activeView)}
                    >
                      Export {activeView === 'deal' ? 'Deal Summary' : 'Position Detail'}
                    </Button>
                    <Button
                      leftIcon={<SearchIcon />}
                      colorScheme="green"
                      variant="outline"
                      size="sm"
                      onClick={loadData}
                    >
                      Refresh Data
                    </Button>
                  </HStack>
                </HStack>
              </CardHeader>
              
              <CardBody>
                <Tabs onChange={(index) => setActiveView(index === 0 ? 'deal' : 'position')}>
                  <TabList>
                    <Tab>
                      <HStack spacing={2}>
                        <ViewIcon />
                        <Text>Deal Summary View</Text>
                        <Badge colorScheme="green">{dealData.length}</Badge>
                      </HStack>
                    </Tab>
                    <Tab>
                      <HStack spacing={2}>
                        <ViewIcon />
                        <Text>Investment Position View</Text>
                        <Badge colorScheme="blue">{positionData.length}</Badge>
                      </HStack>
                    </Tab>
                  </TabList>

                  <TabPanels>
                    {/* Deal Summary View - Every Deal is 1 row */}
                    <TabPanel>
                      <Box>
                        <Alert status="success" mb={4} borderRadius="md">
                          <AlertIcon />
                          <AlertTitle>Deal Summary View</AlertTitle>
                          <AlertDescription>
                            From Perspective of Deal - Every Deal is 1 row. This aggregates all investors for a single deal.
                          </AlertDescription>
                        </Alert>
                        
                        <Table variant="simple" size="sm">
                          <Thead>
                            <Tr>
                              <Th>Deal ID</Th>
                              <Th>Company</Th>
                              <Th>Round</Th>
                              <Th>Total Size</Th>
                              <Th>All Investors</Th>
                              <Th>Stage</Th>
                              <Th>Industry</Th>
                              <Th>Country</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {dealData.map((deal, index) => (
                              <Tr key={index} _hover={{ bg: 'gray.50' }}>
                                <Td fontWeight="bold">{deal.dealId}</Td>
                                <Td>
                                  <VStack spacing={1} align="start">
                                    <Text fontWeight="medium">{deal.company}</Text>
                                    <Text fontSize="xs" color="gray.500">{deal.chineseCompany}</Text>
                                  </VStack>
                                </Td>
                                <Td>
                                  <Badge colorScheme="blue">{deal.fundingRound}</Badge>
                                </Td>
                                <Td fontWeight="bold" color="green.600">
                                  {formatCurrency(deal.totalDealSize)}
                                </Td>
                                <Td>
                                  <VStack spacing={1} align="start">
                                    <Text fontSize="sm">{deal.allInvestors.join(', ')}</Text>
                                    <Text fontSize="xs" color="gray.500">
                                      {deal.totalInvestors} investors
                                    </Text>
                                  </VStack>
                                </Td>
                                <Td>
                                  <Badge colorScheme="purple">{deal.stage}</Badge>
                                </Td>
                                <Td>{deal.industry}</Td>
                                <Td>{deal.country}</Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </Box>
                    </TabPanel>

                    {/* Investment Position View - Every Investment Position is 1 row */}
                    <TabPanel>
                      <Box>
                        <Alert status="info" mb={4} borderRadius="md">
                          <AlertIcon />
                          <AlertTitle>Investment Position View</AlertTitle>
                          <AlertDescription>
                            From Perspective of Investment Position - Every Investment Position is 1 row. This shows individual investor stakes.
                          </AlertDescription>
                        </Alert>
                        
                        <Table variant="simple" size="sm">
                          <Thead>
                            <Tr>
                              <Th>Position ID</Th>
                              <Th>Investor</Th>
                              <Th>Company</Th>
                              <Th>Deal Size</Th>
                              <Th>Position Size</Th>
                              <Th>Round</Th>
                              <Th>Lead</Th>
                              <Th>Stake</Th>
                              <Th>Type</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {positionData.map((position, index) => (
                              <Tr key={index} _hover={{ bg: 'gray.50' }}>
                                <Td fontSize="xs" color="gray.500">{position.positionId}</Td>
                                <Td>
                                  <VStack spacing={1} align="start">
                                    <Text fontWeight="medium">{position.investor}</Text>
                                    <Text fontSize="xs" color="gray.500">{position.chineseInvestor}</Text>
                                  </VStack>
                                </Td>
                                <Td>
                                  <VStack spacing={1} align="start">
                                    <Text fontWeight="medium">{position.company}</Text>
                                    <Text fontSize="xs" color="gray.500">{position.chineseCompany}</Text>
                                  </VStack>
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
                                <Td color="purple.600">
                                  {formatPercentage(position.equityStake)}
                                </Td>
                                <Td>
                                  <Badge colorScheme="orange">{position.investorType}</Badge>
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </CardBody>
            </Card>

            {/* Console Instructions */}
            <Card bg={cardBg} shadow="md">
              <CardHeader>
                <Heading size="md" color="orange.600">
                  Console Demonstration
                </Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Open your browser's developer console (F12) to see the hierarchical data structure in action. 
                  The system automatically demonstrates the dual-view reporting and hierarchical queries when this component loads.
                </Text>
                <Text mt={2} fontSize="sm" color="gray.600">
                  You'll see detailed logging of how the data flows from companies → deals → investment positions, 
                  and how the same data can be viewed from different perspectives.
                </Text>
              </CardBody>
            </Card>

          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default HierarchicalDemo;
