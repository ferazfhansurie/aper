import { useState, useEffect, useRef } from 'react'
import * as XLSX from 'xlsx';
import ResultDetails from './ResultDetails';
import {
  Box,
  Container,
  Input,
  Button,
  Text,
  VStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Heading,
  Center,
  Divider,
  Spinner,
  HStack,
  Textarea,
  Avatar,
  Flex,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { ArrowForwardIcon, AttachmentIcon } from '@chakra-ui/icons';

const ResearchInterface = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [editableItems, setEditableItems] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Google Sheets data state
  const [pastResults, setPastResults] = useState([]);
  const [loadingPastResults, setLoadingPastResults] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [selectedResult, setSelectedResult] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  // Add these state variables near your other state declarations
const [importedFile, setImportedFile] = useState(null);
const [importedData, setImportedData] = useState([]);
const fileInputRef = useRef(null);

// Function to handle file selection
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    setImportedFile(file);
    readExcelFile(file);
  }
};

// Function to read Excel file
const readExcelFile = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Process the data
      if (jsonData.length > 0) {
        // Assuming first row is headers
        const headers = jsonData[0];
        const rows = jsonData.slice(1);
        
        // Convert to format compatible with your application
        const formattedData = rows.map((row) => {
          const item = {};
          headers.forEach((header, index) => {
            if (header) {
              item[header] = row[index] || '';
            }
          });
          return item;
        });
        
        setImportedData(formattedData);
        
        // Save to Firebase
        saveToFirebase(formattedData);
        
        toast({
          title: 'File imported successfully',
          description: `Imported ${formattedData.length} records from ${file.name}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error reading Excel file:', error);
      toast({
        title: 'Error importing file',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  reader.onerror = (error) => {
    console.error('FileReader error:', error);
    toast({
      title: 'Error reading file',
      description: 'There was an error reading the file',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };
  reader.readAsArrayBuffer(file);
};

// Function to save imported data to Firebase
const saveToFirebase = async (data) => {
  try {
    setLoadingPastResults(true);
    
    // Save each record to Firebase
    for (const record of data) {
      await fetch('http://localhost:3000/api/sheets/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
    }
    
    // Refresh the results after saving
    fetchPastResults();
    
    toast({
      title: 'Data saved to Firebase',
      description: `${data.length} records have been saved to the database`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  } catch (error) {
    toast({
      title: 'Error saving to Firebase',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  } finally {
    setLoadingPastResults(false);
  }
};

// Function to trigger file input click
const handleImportClick = () => {
  fileInputRef.current.click();
};
  // Add this near your other state variables
  const [savedQueries, setSavedQueries] = useState([
    { id: 1, name: "Excel_Investee invest details" },
    { id: 2, name: "Excel Data Sheet (invest details)" },
    { id: 3, name: "Excel Data Sheet (invest details) (Group by Company)" },
    { id: 4, name: "Excel Investor (invest ID)" }
  ]);
  const [activeQueryId, setActiveQueryId] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [queryInput, setQueryInput] = useState('');
  const [isSaveMode, setIsSaveMode] = useState(false);
  const [editingResult, setEditingResult] = useState(null);
  // Filtered results based on searchTerm
  const handleUpdate = async (id, updatedData) => {
    try {
      await fetch(`http://localhost:3000/api/results/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      fetchPastResults();
      toast({ title: 'Update successful', status: 'success' });
    } catch (error) {
      toast({ title: 'Update failed', status: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await fetch(`http://localhost:3000/api/results/${id}`, {
          method: 'DELETE'
        });
        fetchPastResults();
        toast({ title: 'Delete successful', status: 'success' });
      } catch (error) {
        toast({ title: 'Delete failed', status: 'error' });
      }
    }
  };

  const filteredResults = pastResults.filter(result =>
    Object.values(result)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Combined handler for search and save
  const handleSearchOrSave = () => {
    if (!isSaveMode) {
      // Search mode: filter results and switch to save mode
      setSearchTerm(queryInput);
      setIsSaveMode(true);
    } else {
      // Save mode: save query and reset
      if (!queryInput.trim()) return;
      const newQuery = {
        id: savedQueries.length + 1,
        name: queryInput
      };
      setSavedQueries([...savedQueries, newQuery]);
      setQueryInput('');
      setIsSaveMode(false);
      toast({
        title: 'Query Saved',
        description: 'Your query has been saved successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Reset save mode if input changes
  useEffect(() => {
    setIsSaveMode(false);
  }, [queryInput]);

  // Add this function to handle selecting a query
  const handleSelectQuery = (queryId) => {
    setActiveQueryId(queryId);
    // Here you would typically run the query against your data
    // For now, we'll just simulate selecting it
  };
  const handleViewResult = (result) => {
    setSelectedResult(result);
    setIsViewModalOpen(true);
  };

  // Add this function to close the view modal
  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedResult(null);
  };
  const validateUrl = (u) => {
    try {
      new URL(u);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchPastResults();
  }, []);

  const fetchPastResults = async () => {
    try {
      setLoadingPastResults(true);
      
      // Make sure your API endpoint is correctly configured to return Firebase data
      const response = await fetch('http://localhost:3000/api/sheets/results');
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform the data to ensure all fields are properly mapped
      const formattedResults = data.map(item => {
        return {
          ...item,  // Keep all original fields
          id: item.ID || item.id || '',  // Use ID field from collection
          company: item.Company || item.company || '',
          displayedInvesteeName: item['Displayed Investee Name (English)'] || item.displayedInvesteeName || '',
          companyChineseName: item['Company (Chinese)'] || item.companyChineseName || '',
          website: item['Web site'] || item.website || '',
          location: item.Location || item.location || ''
        };
      });
      
      setPastResults(formattedResults);
    } catch (error) {
      toast({
        title: 'Error fetching past results',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error fetching past results:', error);
    } finally {
      setLoadingPastResults(false);
    }
  };

  const handleSubmit = () => {
    if (!validateUrl(url)) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid URL starting with http:// or https://',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onOpen();
  };

  const handleConfirm = async () => {
    setLoading(true);
    onClose();
    try {
      const response = await fetch('http://localhost:3000/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) throw new Error(`Server responded with status: ${response.status}`);
      const data = await response.json();
      if (!data?.report?.trim()) {
        throw new Error('Empty result – not enough information to analyze.');
      }
      setResult(data);
      setMessages((m) => [
        ...m,
        { role: 'system', content: `Research completed for URL: ${url}` },
      ]);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    const userMessage = { role: 'user', content: newMessage };
    setMessages((m) => [...m, userMessage]);
    setNewMessage('');
    setChatLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: newMessage,
          context: result?.report || null,
          pastResults: pastResults,  // Include past results for context
          history: messages,
        }),
      });
      if (!response.ok) throw new Error('Failed to get response');
      const data = await response.json();
      
      // Handle database updates if the AI response includes them
      if (data.databaseUpdates) {
        await handleDatabaseUpdates(data.databaseUpdates);
      }
      
      setMessages((m) => [...m, { role: 'assistant', content: data.response }]);
      
      if (data.additionalUrls?.length) {
        toast({
          title: 'Additional Research Suggested',
          description: `AI suggests ${data.additionalUrls.length} more URLs.`,
          status: 'info',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: 'Chat Error',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setMessages((m) => [...m, { role: 'system', content: 'Error processing request.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing((e) => !e);
    if (!isEditing && result) {
      const initial = {};
      parseReport(result.report).forEach((section, si) =>
        section.items.forEach((it, ii) => {
          initial[`${si}-${ii}`] = it;
        })
      );
      setEditableItems(initial);
    }
  };

  const handleItemChange = (si, ii, val) => {
    const key = `${si}-${ii}`;
    setEditableItems((e) => ({ ...e, [key]: val }));
  };

  const handleSaveEdits = async () => {
    const sections = parseReport(result.report);
    const flattened = {};
    sections.forEach((sec) =>
      sec.items.forEach((item) => {
        const parts = item.split(':').map((p) => p.trim());
        if (parts.length >= 2) {
          flattened[parts[0]] = parts.slice(1).join(':');
        }
      })
    );
    flattened.url = url;
    flattened.timestamp = new Date().toISOString();

    try {
      const response = await fetch('http://localhost:3000/api/sheets/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flattened),
      });
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      toast({
        title: 'Saved',
        description: 'Results saved to Google Sheets.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchPastResults();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save to Google Sheets.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsEditing(false);
    }
  };

  const handleDatabaseUpdates = async (updates) => {
    try {
      const response = await fetch('http://localhost:3000/api/sheets/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      
      toast({
        title: 'Database Updated',
        description: 'The AI has updated the database with your requested changes.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Refresh the past results to show the updated data
      fetchPastResults();
    } catch (error) {
      toast({
        title: 'Update Error',
        description: 'Failed to update the database: ' + error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Center minH="100vh" bg="gray.50">
    <Container maxW="100%" p={0}>
      <VStack spacing={8} w="100%" p={4}>
     
          <Heading size="lg" textAlign="center">Research Assistant</Heading>

          {/* URL Input */}
          <Box w="100%" maxW="md">
            <Input
              placeholder="Enter URL to analyze..."
              size="lg"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              bg="white"
            />
            <Button
              mt={2}
              w="100%"
              colorScheme="blue"
              onClick={handleSubmit}
              isLoading={loading}
            >
              Analyze
            </Button>
          </Box>

          {/* Loading Spinner */}
          {loading && (
            <Center>
              <Spinner size="xl" color="blue.500" />
            </Center>
          )}

          {/* Tabs: always visible */}
          <Tabs variant="soft-rounded" colorScheme="blue" w="100%">
            <TabList justifyContent="center">
              <Tab isDisabled={!result}>Research Results</Tab>
              <Tab>Chat with AI</Tab>
              <Tab>Database</Tab>
            </TabList>

            <TabPanels>

              {/* Research Results TabPanel */}
              <TabPanel>
                {!result ? (
                  <Center p={6} bg="white" boxShadow="md" borderRadius="lg">
                    <Text color="gray.500">Analyze a URL first to see results.</Text>
                  </Center>
                ) : (
                  <Box bg="white" p={6} boxShadow="md" borderRadius="lg" overflowX="auto">
                    <Flex justify="flex-end" mb={4}>
                      <Button
                        size="sm"
                        colorScheme={isEditing ? 'green' : 'blue'}
                        onClick={isEditing ? handleSaveEdits : handleEditToggle}
                        mr={isEditing ? 2 : 0}
                      >
                        {isEditing ? 'Save Results' : 'Edit Results'}
                      </Button>
                      {isEditing && (
                        <Button size="sm" variant="outline" onClick={handleEditToggle}>
                          Cancel
                        </Button>
                      )}
                    </Flex>

                    {parseReport(result.report).map((section, si) => (
                      <Box key={si} mb={6}>
                        <Heading as="h3" size="md" mb={4} color="blue.700">
                          {section.title}
                        </Heading>
                        <Table variant="simple" size="sm">
                          <Tbody>
                            {section.items.map((item, ii) => {
                              const key = `${si}-${ii}`;
                              if (/^\d+\.\s+/.test(item)) {
                                return (
                                  <Tr key={key}>
                                    <Td colSpan={2} bg="gray.100">
                                      <Heading as="h4" size="sm">
                                        {isEditing
                                          ? (
                                            <Input
                                              value={editableItems[key] || item}
                                              onChange={(e) => handleItemChange(si, ii, e.target.value)}
                                              size="sm"
                                            />
                                          )
                                          : item}
                                      </Heading>
                                    </Td>
                                  </Tr>
                                );
                              }
                              const parts = item.split(':').map((p) => p.trim());
                              if (parts.length >= 2) {
                                const k = parts[0];
                                const v = parts.slice(1).join(':');
                                return (
                                  <Tr key={key}>
                                    <Td fontWeight="medium" w="40%">{k}</Td>
                                    <Td>
                                      {isEditing
                                        ? (
                                          <Input
                                            value={editableItems[key]?.split(':').slice(1).join(':').trim() || v}
                                            onChange={(e) => handleItemChange(si, ii, `${k}: ${e.target.value}`)}
                                            size="sm"
                                          />
                                        )
                                        : v}
                                    </Td>
                                  </Tr>
                                );
                              }
                              return (
                                <Tr key={key}>
                                  <Td colSpan={2}>
                                    {isEditing
                                      ? (
                                        <Input
                                          value={editableItems[key] || item}
                                          onChange={(e) => handleItemChange(si, ii, e.target.value)}
                                          size="sm"
                                        />
                                      )
                                      : item}
                                  </Td>
                                </Tr>
                              );
                            })}
                          </Tbody>
                        </Table>
                        {si < parseReport(result.report).length - 1 && <Divider my={4} />}
                      </Box>
                    ))}

                    <Center mt={4}>
                    
                      <Button colorScheme="green" onClick={handleSaveEdits}>
                        Save
                      </Button>
                    </Center>
                  </Box>
                )}
              </TabPanel>

              {/* Chat with AI TabPanel */}
              <TabPanel>
                <Box
                  bg="white"
                  p={4}
                  boxShadow="md"
                  borderRadius="lg"
                  h="500px"
                  display="flex"
                  flexDirection="column"
                >
                  <Box flex="1" overflowY="auto" mb={4}>
                    {messages.length === 0 ? (
                      <Center h="100%">
                        <Text color="gray.500">
                          Start chatting about your research or database results.
                        </Text>
                      </Center>
                    ) : (
                      messages.map((msg, idx) => (
                        <Flex
                          key={idx}
                          mb={4}
                          flexDirection={msg.role === 'user' ? 'row-reverse' : 'row'}
                          align="start"
                        >
                          <Avatar
                            size="sm"
                            name={
                              msg.role === 'user'
                                ? 'You'
                                : msg.role === 'assistant'
                                ? 'AI'
                                : 'System'
                            }
                            bg={
                              msg.role === 'user'
                                ? 'blue.500'
                                : msg.role === 'assistant'
                                ? 'green.500'
                                : 'gray.500'
                            }
                            mr={msg.role === 'user' ? 0 : 2}
                            ml={msg.role === 'user' ? 2 : 0}
                          />
                          <Box
                            p={3}
                            borderRadius="lg"
                            bg={
                              msg.role === 'user'
                                ? 'blue.100'
                                : msg.role === 'assistant'
                                ? 'green.100'
                                : 'gray.100'
                            }
                            maxW="80%"
                          >
                            <Text>{msg.content}</Text>
                          </Box>
                        </Flex>
                      ))
                    )}
                    {chatLoading && (
                      <Flex mb={4} align="start">
                        <Avatar size="sm" name="AI" bg="green.500" mr={2} />
                        <Box p={3} borderRadius="lg" bg="green.100">
                          <Spinner size="sm" mr={2} />
                          <Text as="span">Thinking...</Text>
                        </Box>
                      </Flex>
                    )}
                  </Box>
                  <HStack>
                    <Textarea
                      placeholder="Ask about research or database results..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      rows={2}
                      resize="none"
                    />
                    <IconButton
                      colorScheme="blue"
                      aria-label="Send"
                      icon={<ArrowForwardIcon />}
                      onClick={handleSendMessage}
                      isLoading={chatLoading}
                    />
                  </HStack>
                </Box>
              </TabPanel>

        
          

              {/* Past Results TabPanel */}
              <TabPanel>
              {selectedResult ? (
    <ResultDetails
      selectedResult={selectedResult}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      onClose={() => setSelectedResult(null)}
    />
  ) : (
                <Flex 
                
                  bg="white" 
                  boxShadow="md" 
                  borderRadius="lg" 
                  h="calc(100vh - 200px)"
                  w="100%"
                  overflow="hidden"
                >
                  {/* Left sidebar for saved queries */}
                  <Box 
                    w="250px" 
                    borderRightWidth="1px" 
                    p={3}
                    overflowY="auto"
                    h="100%"
                  >
                    <Heading size="sm" mb={3}>Queries</Heading>
                    <Box mb={3}>
                      <Input 
                        placeholder="Search..." 
                        size="sm" 
                        mb={2}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </Box>
                    <VStack align="stretch" spacing={1}>
                      {savedQueries
                        .filter(q => q.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(query => (
                          <Box 
                            key={query.id}
                            p={2}
                            borderRadius="md"
                            bg={activeQueryId === query.id ? "blue.100" : "transparent"}
                            _hover={{ bg: activeQueryId === query.id ? "blue.100" : "gray.100" }}
                            cursor="pointer"
                            onClick={() => handleSelectQuery(query.id)}
                            fontSize="sm"
                          >
                            <HStack>
                              <Box as="span" fontSize="xs" color="gray.500" mr={1}>
                                {query.id})
                              </Box>
                              <Text noOfLines={1}>{query.name}</Text>
                            </HStack>
                          </Box>
                        ))}
                    </VStack>
                  </Box>
                  
                  {/* Main content area */}
                  <Box flex="1" p={4} overflowY="auto" h="100%">
                    <VStack spacing={4} align="stretch">
                      {/* File import and query input */}
                      <HStack spacing={4} justify="space-between">
                        <HStack flex="1">
                          <HStack mb={0} w="100%">
                            <Input
                              placeholder="Enter query or search database..."
                              value={queryInput}
                              onChange={(e) => setQueryInput(e.target.value)}
                              onKeyDown={e => {
                                if (e.key === 'Enter') handleSearchOrSave();
                              }}
                              size="sm"
                            />
                            <Button colorScheme={isSaveMode ? "green" : "blue"} onClick={handleSearchOrSave} size="sm">
                              {isSaveMode ? "Save Query" : "Search"}
                            </Button>
                          </HStack>
                        </HStack>
                        <HStack>
                          <input
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                          />
                          <Button
                            leftIcon={<AttachmentIcon />}
                            size="sm"
                            onClick={handleImportClick}
                            colorScheme="green"
                          >
                            Import
                          </Button>
                        </HStack>
                      </HStack>
                      
                      {/* Display file info if imported */}
                      {importedFile && (
                        <Box p={2} bg="gray.50" borderRadius="md">
                          <HStack>
                            <Text fontSize="sm" fontWeight="medium">Imported file:</Text>
                            <Text fontSize="sm">{importedFile.name}</Text>
                            <Text fontSize="sm" color="gray.500">
                              ({(importedFile.size / 1024).toFixed(2)} KB)
                            </Text>
                          </HStack>
                        </Box>
                      )}

                      <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                        <Table variant="simple" size="sm">
                          <Thead>
                            <Tr>
                              <Th>ID</Th>
                              <Th>Company</Th>
                              <Th>Displayed Investee Name (English)</Th>
                              <Th>Company (Chinese)</Th>
                              <Th>Web site</Th>
                              <Th>Location</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {filteredResults.length > 0 ? (
                              filteredResults.map((result, index) => (
                                <Tr key={result.id || index} onClick={() => handleViewResult(result)}>
                                  <Td>{result.id || 'N/A'}</Td>
                                  <Td>{result.company || 'N/A'}</Td>
                                  <Td>{result.displayedInvesteeName || 'N/A'}</Td>
                                  <Td>{result.companyChineseName || 'N/A'}</Td>
                                  <Td>{result.website || 'N/A'}</Td>
                                  <Td>{result.location || 'N/A'}</Td>
                                  <Td>
        <Button size="sm" onClick={() => handleViewResult(result)}>
          View
        </Button>
      </Td>
                                </Tr>
                              ))
                            ) : (
                              <Tr>
                                <Td colSpan={6} textAlign="center">No results found.</Td>
                              </Tr>
                            )}
                          </Tbody>
                        </Table>
                      </Box>
                      
                      {/* Pagination controls */}
                      <Flex justify="space-between" align="center" fontSize="sm">
                        <Text>Records: 1-{pastResults.length} of {pastResults.length}</Text>
                        <HStack>
                          <Button size="xs" variant="outline">Previous</Button>
                          <Button size="xs" variant="outline">Next</Button>
                        </HStack>
                      </Flex>
                    </VStack>
                  </Box>
                </Flex>
                  )}
              </TabPanel>
            </TabPanels>
          </Tabs>
     {/* Confirmation Modal - Add this */}
     <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirm Analysis</ModalHeader>
              <ModalBody>
                Are you sure you want to analyze this URL?
                <Text fontWeight="bold" mt={2}>{url}</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleConfirm}>
                  Analyze
                </Button>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

        </VStack>
      </Container>
    </Center>
  );
};

export default ResearchInterface;

// Helper functions

const parseReport = (report) => {
  if (!report) return [];
  const majorSectionRegex = /^(\d+\.\s+\*\*[^\*]+\*\*)/gm;
  const sections = report.split(majorSectionRegex).filter(Boolean);
  const parsed = [];

  for (let i = 0; i < sections.length; i++) {
    if (majorSectionRegex.test(sections[i])) {
      const title = sections[i].replace(/\d+\.\s+\*\*/, '').replace(/\*\*/, '').trim();
      const content = (sections[i + 1] || '').trim();
      const lines = content
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l && !/^-{3,}$/.test(l));
      const items = lines.map((line) => line.replace(/\*\*/g, '').replace(/^-\s+/, ''));
      parsed.push({ title, items: items.length ? items : ['No details available'] });
      i++;
    }
  }

  if (!parsed.length && report) {
    parsed.push({
      title: 'Research Results',
      items: report
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l && !/^-{3,}$/.test(l)),
    });
  }

  return parsed;
};

const formatResultAsReport = (result) => {
  let report = '';
  report += '1. **Basic Company Information**\n';
  report += `- Deal ID: ${result['Deal ID'] || 'Not Available'}\n`;
  report += `- Company ID: ${result['Company ID'] || 'Not Available'}\n`;
  report += `- Displayed Investee Name: ${result['Displayed Investee Name'] || 'Not Available'}\n`;
  report += `- Website: ${result['Website'] || 'Not Available'}\n\n`;
  report += '2. **Location & Market Info**\n';
  report += `- Location at Investment Date: ${result['Location at Investment Date'] || 'Not Available'}\n`;
  report += `- Country Grouped at Investment Date: ${
    result['Country Grouped at Investment Date'] || 'Not Available'
  }\n`;
  report += `- Region: ${result['Region'] || 'Not Available'}\n`;
  report += `- Listing Status: ${result['Listing Status'] || 'Not Available'}\n\n`;
  return report;
};

// Placeholder for CSV export logic
const exportCsv = (report) => {
  // implement CSV export
};
