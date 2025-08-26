import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  IconButton,
  Textarea,
  Card,
  CardBody,
  Badge,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Select,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { 
  Send, 
  Plus, 
  Database, 
  FileText, 
  Settings, 
  RefreshCw,
  Trash2,
  Edit,
  Eye,
  Download,
  Upload
} from 'lucide-react';
import VerticalHeader from './VerticalHeader';

const AIResearchAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your APER AI Research Assistant. I can help you with:\n\n• Querying your private equity database\n• Adding new data from article links\n• Updating existing records\n• Analyzing investment trends\n• Generating reports\n\nYou can also paste article URLs directly in our chat, and I\'ll extract relevant information for you!\n\nHow can I help you today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [crudAction, setCrudAction] = useState('create');
  const [newRecord, setNewRecord] = useState({});
  const [databaseTables] = useState([
    'Fund', 'Investor', 'Company', 'Deal', 'Valuation', 'Country', 'Region', 'Industry'
  ]);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const messagesEndRef = useRef(null);
  const toast = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Check if the message contains a URL
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = inputMessage.match(urlRegex);
    
    if (urls) {
      // Handle article URL extraction
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: `I found an article URL in your message! I'm analyzing the content and extracting relevant private equity information...\n\n📰 **Article Analysis Complete**\n\nI've identified the following key information:\n• **Company**: TechStart Inc.\n• **Funding Round**: Series B\n• **Amount**: $25M\n• **Investors**: Venture Capital Partners, Growth Fund\n• **Sector**: Technology - AI/ML\n\nWould you like me to:\n1. Add this as a new deal record?\n2. Update existing company information?\n3. Create new investor profiles?\n4. Just save the extracted data for review?`,
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 2000);
    } else {
      // Handle regular AI response
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: generateAIResponse(inputMessage),
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1500);
    }
  };

  const generateAIResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('fund') || lowerInput.includes('funds')) {
      return 'I found 1,627 funds in your database. The largest fund is GGV Capital IX Plus LP with $2.5B AUM. Would you like me to show you the top performing funds or help you add a new fund?';
    } else if (lowerInput.includes('investor') || lowerInput.includes('investors')) {
      return 'Your database contains 450 institutional investors. The most active investors include Blackstone, CVC Capital Partners, and KKR. I can help you analyze their investment patterns or add new investor data.';
    } else if (lowerInput.includes('company') || lowerInput.includes('companies')) {
      return 'I found 1,200 portfolio companies across various sectors. Technology companies represent 32% of your portfolio, followed by healthcare (19%) and real estate (15%). Need help analyzing specific sectors?';
    } else if (lowerInput.includes('deal') || lowerInput.includes('deals')) {
      return 'Your database shows 3,500 investment deals with a total value of $125.6B. The average deal size is $45.2M. I can help you track new deals or analyze deal flow patterns.';
    } else if (lowerInput.includes('add') || lowerInput.includes('create') || lowerInput.includes('new')) {
      return 'I can help you add new data! You can either:\n\n1. **Paste an article URL** - I\'ll extract information automatically\n2. **Tell me the details** - I\'ll help you create a new record\n3. **Use the CRUD panel** - For manual data entry\n\nWhat would you like to add?';
    } else if (lowerInput.includes('article') || lowerInput.includes('url') || lowerInput.includes('link')) {
      return 'Great! Just paste any article URL directly in our chat, and I\'ll automatically extract the relevant private equity information. I can identify companies, funding rounds, investors, and other key data points.';
    } else {
      return 'I understand you\'re asking about "' + userInput + '". I can help you query the database, add new information, or analyze existing data. Would you like me to:\n\n1. Search for specific records\n2. Add new data from an article (just paste the URL)\n3. Update existing information\n4. Generate a report';
    }
  };

  const handleCRUDAction = () => {
    toast({
      title: 'Success',
      description: `${crudAction} operation completed successfully`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Box bg="white" minH="100vh">
      <VerticalHeader />
      <Box ml={{ base: 0, lg: "280px" }} maxW="1200px" mx="auto" p={8}>
        {/* Header */}
        <Box 
          bg="rgba(59, 130, 246, 0.05)" 
          border="1px solid" 
          borderColor="rgba(59, 130, 246, 0.2)"
          borderRadius="2xl"
          p={8}
          mb={8}
          backdropFilter="blur(20px)"
        >
          <VStack spacing={6}>
            <Text fontSize="3xl" fontWeight="bold" color="blue.700">
              APER AI Research Assistant
            </Text>
            <Text fontSize="lg" color="blue.500" textAlign="center">
              Your intelligent database companion for private equity research and data management
            </Text>
            
            {/* Action Buttons */}
            <HStack spacing={6} flexWrap="wrap" justify="center">
              <Button
                leftIcon={<Plus />}
                colorScheme="blue"
                variant="solid"
                onClick={onOpen}
                bg="rgba(59, 130, 246, 0.9)"
                _hover={{ bg: "rgba(59, 130, 246, 1)" }}
                backdropFilter="blur(20px)"
                px={6}
                py={3}
              >
                Add New Data
              </Button>
              
              <Button
                leftIcon={<Database />}
                colorScheme="green"
                variant="outline"
                borderColor="green.400"
                color="green.600"
                _hover={{ bg: "green.50" }}
                px={6}
                py={3}
              >
                Database Schema
              </Button>
              
              <Button
                leftIcon={<FileText />}
                colorScheme="purple"
                variant="outline"
                borderColor="purple.400"
                color="purple.600"
                _hover={{ bg: "purple.50" }}
                px={6}
                py={3}
              >
                Generate Report
              </Button>
              
              <Button
                leftIcon={<RefreshCw />}
                colorScheme="orange"
                variant="outline"
                borderColor="orange.400"
                color="orange.600"
                _hover={{ bg: "orange.50" }}
                px={6}
                py={3}
              >
                Sync Data
              </Button>
            </HStack>
          </VStack>
        </Box>

        {/* Chat Interface */}
        <Card 
          bg="rgba(59, 130, 246, 0.05)" 
          border="1px solid" 
          borderColor="rgba(59, 130, 246, 0.2)"
          borderRadius="xl"
          h="600px"
          backdropFilter="blur(20px)"
        >
          <CardBody p={0} display="flex" flexDirection="column">
            {/* Messages */}
            <Box flex="1" overflowY="auto" p={8}>
              <VStack spacing={6} align="stretch">
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    alignSelf={message.type === 'user' ? 'flex-end' : 'flex-start'}
                    maxW="80%"
                  >
                    <Box
                      bg={message.type === 'user' ? 'blue.500' : 'white'}
                      color={message.type === 'user' ? 'white' : 'blue.700'}
                      p={5}
                      borderRadius="xl"
                      border="1px solid"
                      borderColor={message.type === 'user' ? 'blue.500' : 'rgba(59, 130, 246, 0.2)'}
                      boxShadow="lg"
                    >
                      <Text whiteSpace="pre-line">{message.content}</Text>
                      <Text fontSize="xs" color={message.type === 'user' ? 'blue.100' : 'blue.400'} mt={3}>
                        {message.timestamp}
                      </Text>
                    </Box>
                  </Box>
                ))}
                
                {isLoading && (
                  <Box alignSelf="flex-start" maxW="80%">
                    <Box
                      bg="white"
                      color="blue.700"
                      p={5}
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="rgba(59, 130, 246, 0.2)"
                      boxShadow="lg"
                    >
                      <HStack spacing={3}>
                        <Box className="typing-indicator">
                          <Box className="dot"></Box>
                          <Box className="dot"></Box>
                          <Box className="dot"></Box>
                        </Box>
                        <Text>AI is thinking...</Text>
                      </HStack>
                    </Box>
                  </Box>
                )}
                
                <div ref={messagesEndRef} />
              </VStack>
            </Box>

            {/* Input Area */}
            <Box p={8} borderTop="1px solid" borderColor="rgba(59, 130, 246, 0.2)">
              <VStack spacing={4}>
                <Text fontSize="sm" color="blue.600" textAlign="center">
                  💡 Tip: You can paste article URLs directly here for automatic data extraction!
                </Text>
                <HStack spacing={4} w="full">
                  <Textarea
                    placeholder="Ask me anything about your private equity data, or paste an article URL for automatic extraction..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    bg="white"
                    borderColor="blue.200"
                    _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px rgba(59, 130, 246, 0.2)" }}
                    resize="none"
                    rows={3}
                    p={4}
                  />
                  <IconButton
                    colorScheme="blue"
                    aria-label="Send message"
                    icon={<Send />}
                    onClick={handleSendMessage}
                    isDisabled={!inputMessage.trim() || isLoading}
                    bg="rgba(59, 130, 246, 0.9)"
                    _hover={{ bg: "rgba(59, 130, 246, 1)" }}
                    size="lg"
                    p={4}
                  />
                </HStack>
              </VStack>
            </Box>
          </CardBody>
        </Card>

        {/* CRUD Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent bg="rgba(255, 255, 255, 0.95)" backdropFilter="blur(20px)">
            <ModalHeader color="blue.700" p={6}>Add New Data</ModalHeader>
            <ModalCloseButton />
            <ModalBody p={6}>
              <VStack spacing={6}>
                <FormControl>
                  <FormLabel color="blue.700">Action Type</FormLabel>
                  <Select
                    value={crudAction}
                    onChange={(e) => setCrudAction(e.target.value)}
                    borderColor="blue.200"
                    p={3}
                  >
                    <option value="create">Create New Record</option>
                    <option value="update">Update Existing Record</option>
                    <option value="delete">Delete Record</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel color="blue.700">Target Table</FormLabel>
                  <Select
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    borderColor="blue.200"
                    p={3}
                  >
                    <option value="">Select a table</option>
                    {databaseTables.map(table => (
                      <option key={table} value={table}>{table}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel color="blue.700">Record Data (JSON)</FormLabel>
                  <Textarea
                    placeholder='{"name": "Example Fund", "aum": "1000000000", "region": "Asia"}'
                    value={JSON.stringify(newRecord, null, 2)}
                    onChange={(e) => {
                      try {
                        setNewRecord(JSON.parse(e.target.value));
                      } catch (error) {
                        // Handle invalid JSON
                      }
                    }}
                    borderColor="blue.200"
                    rows={6}
                    p={4}
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter p={6}>
              <Button colorScheme="blue" mr={3} onClick={handleCRUDAction} px={6} py={3}>
                {crudAction === 'create' ? 'Create' : crudAction === 'update' ? 'Update' : 'Delete'}
              </Button>
              <Button variant="ghost" onClick={onClose} px={6} py={3}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      <style jsx>{`
        .typing-indicator {
          display: flex;
          gap: 4px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #3B82F6;
          animation: bounce 1.4s infinite ease-in-out;
        }
        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </Box>
  );
};

export default AIResearchAssistant; 