import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  useColorModeValue,
  Card,
  CardBody,
  Heading,
  Badge,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { Search, Brain, TrendingUp, Users, Building2, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import API_ENDPOINTS from '../config/api';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const ResearchAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQueries, setSuggestedQueries] = useState([
    "Show me all technology investments in Singapore",
    "What's the total AUM of our investors?",
    "List companies in the healthcare sector",
    "Show recent deals above $20M",
    "Which regions have the most portfolio companies?",
    "Compare investment performance by sector"
  ]);
  const [dataInsights, setDataInsights] = useState(null);
  const messagesEndRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    // Initialize with welcome message
    setMessages([
      {
        id: 1,
        type: 'assistant',
        content: "Hello! I'm your AI Research Assistant. I can help you analyze investment data, answer questions about investors, portfolio companies, and deals. What would you like to know?",
        timestamp: new Date()
      }
    ]);
    
    // Load initial data insights
    loadDataInsights();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadDataInsights = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.DASHBOARD);
      const data = await response.json();
      setDataInsights(data);
    } catch (error) {
      console.error('Error loading data insights:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate AI response with data analysis
      const aiResponse = await generateAIResponse(inputMessage);
      
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get AI response. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = async (query) => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerQuery = query.toLowerCase();
    
    // Generate contextual responses based on query
    if (lowerQuery.includes('technology') || lowerQuery.includes('tech')) {
      return `Based on our database, I found several technology investments:\n\n` +
             `• **TechFlow Solutions** - AI workflow automation platform in Singapore\n` +
             `• **HealthTech Innovations** - Digital health monitoring in Hong Kong\n` +
             `• **LogiChain Solutions** - Blockchain supply chain platform in Thailand\n\n` +
             `Total technology investments: $60M across 3 companies. The sector shows strong growth potential in Southeast Asia.`;
    }
    
    if (lowerQuery.includes('aum') || lowerQuery.includes('assets under management')) {
      return `Here's the AUM breakdown for our investors:\n\n` +
             `• **Asia Growth Fund I**: $500M (Technology & Healthcare focus)\n` +
             `• **Southeast Asia Ventures**: $200M (Fintech & E-commerce focus)\n` +
             `• **Pacific Rim Capital**: $1.2B (Manufacturing & Logistics focus)\n\n` +
             `**Total AUM: $1.9B**\n\n` +
             `This represents significant capital available for investment across the Asia Pacific region.`;
    }
    
    if (lowerQuery.includes('healthcare') || lowerQuery.includes('health')) {
      return `Healthcare sector analysis:\n\n` +
             `• **HealthTech Innovations** - $25M investment in digital health monitoring\n` +
             `• **Location**: Hong Kong\n` +
             `• **Valuation**: $200M\n` +
             `• **Focus**: Remote patient monitoring and AI diagnostics\n\n` +
             `The healthcare sector represents 28% of our portfolio by value, showing strong investor confidence in digital health solutions.`;
    }
    
    if (lowerQuery.includes('singapore') || lowerQuery.includes('sg')) {
      return `Singapore investment overview:\n\n` +
             `• **TechFlow Solutions** - $15M Series B round\n` +
             `• **Industry**: Software & IT\n` +
             `• **Valuation**: $150M\n` +
             `• **Status**: Active portfolio company\n\n` +
             `Singapore continues to be a key hub for technology investments in Southeast Asia, with strong government support for innovation.`;
    }
    
    if (lowerQuery.includes('recent') || lowerQuery.includes('latest')) {
      return `Recent investment activity:\n\n` +
             `• **LogiChain Solutions** - $20M Series A (March 2024)\n` +
             `• **Green Energy Systems** - $30M Project Finance (March 2024)\n` +
             `• **HealthTech Innovations** - $25M Growth Round (February 2024)\n` +
             `• **TechFlow Solutions** - $15M Series B (January 2024)\n\n` +
             `Total recent investments: $90M across 4 deals. Strong momentum in Q1 2024.`;
    }
    
    if (lowerQuery.includes('region') || lowerQuery.includes('geography')) {
      return `Geographic distribution of investments:\n\n` +
             `• **Southeast Asia**: 3 deals ($65M total)\n` +
             `• **Greater China**: 1 deal ($25M total)\n\n` +
             `**Top locations**:\n` +
             `1. Singapore - Technology hub\n` +
             `2. Malaysia - Clean energy focus\n` +
             `3. Thailand - Supply chain innovation\n` +
             `4. Hong Kong - Healthcare technology\n\n` +
             `The region shows diverse investment opportunities across multiple sectors.`;
    }

    // Default response
    return `I understand you're asking about "${query}". Let me search our database for relevant information.\n\n` +
           `I can help you with:\n` +
           `• Investment analysis and trends\n` +
           `• Portfolio company information\n` +
           `• Investor profiles and AUM\n` +
           `• Deal pipeline and valuations\n` +
           `• Sector and regional analysis\n\n` +
           `Try asking about specific sectors, regions, or investment amounts for more detailed insights.`;
  };

  const handleSuggestedQuery = (query) => {
    setInputMessage(query);
  };

  const renderMessage = (message) => {
    const isUser = message.type === 'user';
    
    return (
      <MotionBox
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        alignSelf={isUser ? 'flex-end' : 'flex-start'}
        maxW="80%"
      >
        <HStack spacing={3} align="start" justify={isUser ? 'flex-end' : 'flex-start'}>
          {!isUser && (
            <Avatar
              size="sm"
              bg="brand.500"
              icon={<Brain size={16} />}
            />
          )}
          <Card
            bg={isUser ? 'accent.500' : 'rgba(255, 255, 255, 0.1)'}
            color="white"
            borderRadius="lg"
            maxW="100%"
          >
            <CardBody p={4}>
              <Text whiteSpace="pre-line">{message.content}</Text>
              <Text fontSize="xs" color="rgba(255, 255, 255, 0.6)" mt={2}>
                {message.timestamp.toLocaleTimeString()}
              </Text>
            </CardBody>
          </Card>
          {isUser && (
            <Avatar
              size="sm"
              bg="accent.500"
              name="You"
            />
          )}
        </HStack>
      </MotionBox>
    );
  };

  return (
    <Container maxW="1400px" py={8}>
      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        mb={8}
      >
        <HStack spacing={4} mb={4}>
          <Box
            p={3}
            bg="brand.500"
            borderRadius="lg"
            color="white"
          >
            <Brain size={24} />
          </Box>
          <VStack align="start" spacing={1}>
            <Heading size="2xl" color="white">
              AI Research Assistant
            </Heading>
            <Text color="rgba(255, 255, 255, 0.8)" fontSize="lg">
              Get intelligent insights from your investment database
            </Text>
          </VStack>
        </HStack>
      </MotionBox>

      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
        {/* Chat Interface */}
        <GridItem>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            borderRadius="xl"
            h="600px"
            display="flex"
            flexDirection="column"
          >
            <CardBody p={0} display="flex" flexDirection="column" h="100%">
              {/* Chat Header */}
              <Box p={4} borderBottom="1px solid rgba(255, 255, 255, 0.1)">
                <HStack justify="space-between">
                  <Heading size="md" color="white">
                    Research Chat
                  </Heading>
                  <Badge colorScheme="green" variant="subtle">
                    AI Online
                  </Badge>
                </HStack>
              </Box>

              {/* Messages */}
              <Box flex="1" overflowY="auto" p={4} spacing={4}>
                <VStack spacing={4} align="stretch">
                  {messages.map(renderMessage)}
                  {isLoading && (
                    <HStack spacing={3} align="start">
                      <Avatar
                        size="sm"
                        bg="brand.500"
                        icon={<Brain size={16} />}
                      />
                      <Card bg="rgba(255, 255, 255, 0.1)" color="white" borderRadius="lg">
                        <CardBody p={4}>
                          <HStack>
                            <Spinner size="sm" color="white" />
                            <Text>Analyzing your query...</Text>
                          </HStack>
                        </CardBody>
                      </Card>
                    </HStack>
                  )}
                  <div ref={messagesEndRef} />
                </VStack>
              </Box>

              {/* Input */}
              <Box p={4} borderTop="1px solid rgba(255, 255, 255, 0.1)">
                <HStack>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Search size={18} color="rgba(255, 255, 255, 0.7)" />
                    </InputLeftElement>
                    <Input
                      placeholder="Ask about investments, companies, or trends..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
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
                  <IconButton
                    colorScheme="brand"
                    aria-label="Send message"
                    icon={<Send size={18} />}
                    onClick={handleSendMessage}
                    isLoading={isLoading}
                    borderRadius="lg"
                  />
                </HStack>
              </Box>
            </CardBody>
          </MotionCard>
        </GridItem>

        {/* Sidebar */}
        <GridItem>
          <VStack spacing={6} align="stretch">
            {/* Suggested Queries */}
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
                <Heading size="md" color="white" mb={4}>
                  Suggested Queries
                </Heading>
                <VStack spacing={3} align="stretch">
                  {suggestedQueries.map((query, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      textAlign="left"
                      justifyContent="flex-start"
                      color="white"
                      _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                      onClick={() => handleSuggestedQuery(query)}
                      borderRadius="lg"
                      p={3}
                    >
                      <Text fontSize="sm" noOfLines={2}>
                        {query}
                      </Text>
                    </Button>
                  ))}
                </VStack>
              </CardBody>
            </MotionCard>

            {/* Quick Stats */}
            {dataInsights && (
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
                  <Heading size="md" color="white" mb={4}>
                    Quick Stats
                  </Heading>
                  <VStack spacing={3} align="stretch">
                    <HStack justify="space-between">
                      <HStack>
                        <Users size={16} color="rgba(255, 255, 255, 0.7)" />
                        <Text color="rgba(255, 255, 255, 0.8)" fontSize="sm">Investors</Text>
                      </HStack>
                      <Text color="white" fontWeight="bold">{dataInsights.totalInvestors}</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <HStack>
                        <Building2 size={16} color="rgba(255, 255, 255, 0.7)" />
                        <Text color="rgba(255, 255, 255, 0.8)" fontSize="sm">Companies</Text>
                      </HStack>
                      <Text color="white" fontWeight="bold">{dataInsights.totalInvestees}</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <HStack>
                        <TrendingUp size={16} color="rgba(255, 255, 255, 0.7)" />
                        <Text color="rgba(255, 255, 255, 0.8)" fontSize="sm">Deals</Text>
                      </HStack>
                      <Text color="white" fontWeight="bold">{dataInsights.totalDeals}</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <HStack>
                        <BarChart3 size={16} color="rgba(255, 255, 255, 0.7)" />
                        <Text color="rgba(255, 255, 255, 0.8)" fontSize="sm">Total Value</Text>
                      </HStack>
                      <Text color="white" fontWeight="bold">{dataInsights.totalInvestment}</Text>
                    </HStack>
                  </VStack>
                </CardBody>
              </MotionCard>
            )}

            {/* AI Capabilities */}
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
                <Heading size="md" color="white" mb={4}>
                  AI Capabilities
                </Heading>
                <VStack spacing={3} align="stretch">
                  <HStack>
                    <Lightbulb size={16} color="accent.500" />
                    <Text color="white" fontSize="sm">Investment Analysis</Text>
                  </HStack>
                  <HStack>
                    <TrendingUp size={16} color="accent.500" />
                    <Text color="white" fontSize="sm">Trend Identification</Text>
                  </HStack>
                  <HStack>
                    <Database size={16} color="accent.500" />
                    <Text color="white" fontSize="sm">Data Insights</Text>
                  </HStack>
                  <HStack>
                    <FileText size={16} color="accent.500" />
                    <Text color="white" fontSize="sm">Report Generation</Text>
                  </HStack>
                </VStack>
              </CardBody>
            </MotionCard>
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default ResearchAssistant;
