import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Heading,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Flex,
  Skeleton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  Link,
  Divider,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Search, Users, Building2, TrendingUp, Eye, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import API_ENDPOINTS from '../config/api';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_ENDPOINTS.SEARCH}?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error performing search:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      performSearch(searchTerm.trim());
    }
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'investor':
        return Users;
      case 'investee':
        return Building2;
      case 'deal':
        return TrendingUp;
      default:
        return Users;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'investor':
        return 'blue';
      case 'investee':
        return 'green';
      case 'deal':
        return 'purple';
      default:
        return 'gray';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
      case 'Portfolio Company':
      case 'Closed':
        return 'green';
      case 'Pending':
        return 'yellow';
      case 'Inactive':
      case 'Cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  const renderSearchResult = (item) => {
    const Icon = getTypeIcon(item.type);
    
    return (
      <MotionCard
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(255, 255, 255, 0.2)"
        borderRadius="xl"
        cursor="pointer"
        _hover={{ 
          bg: 'rgba(255, 255, 255, 0.15)',
          transform: 'translateY(-2px)',
          transition: 'all 0.2s'
        }}
        onClick={() => handleViewItem(item)}
      >
        <CardBody>
          <HStack spacing={4} align="start">
            <Box
              p={3}
              bg={`${getTypeColor(item.type)}.500`}
              borderRadius="lg"
              color="white"
            >
              <Icon size={20} />
            </Box>
            <Box flex="1">
              <HStack justify="space-between" mb={2}>
                <VStack align="start" spacing={1}>
                  <Text color="white" fontWeight="bold" fontSize="lg">
                    {item.name || item.dealName || item.company}
                  </Text>
                  <Badge colorScheme={getTypeColor(item.type)} variant="subtle">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Badge>
                </VStack>
                {item.status && (
                  <Badge colorScheme={getStatusColor(item.status)} variant="subtle">
                    {item.status}
                  </Badge>
                )}
              </HStack>
              
              <VStack align="start" spacing={1}>
                {item.type === 'investor' && (
                  <>
                    <Text color="rgba(255, 255, 255, 0.8)" fontSize="sm">
                      {item.type} • {item.region} • {item.aum}
                    </Text>
                    <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">
                      Focus: {item.focus}
                    </Text>
                  </>
                )}
                
                {item.type === 'investee' && (
                  <>
                    <Text color="rgba(255, 255, 255, 0.8)" fontSize="sm">
                      {item.industry} • {item.location} • {item.investmentAmount}
                    </Text>
                    <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm" noOfLines={2}>
                      {item.description}
                    </Text>
                  </>
                )}
                
                {item.type === 'deal' && (
                  <>
                    <Text color="rgba(255, 255, 255, 0.8)" fontSize="sm">
                      {item.dealType} • {item.sector} • {item.dealSize}
                    </Text>
                    <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">
                      {item.region} • {item.dealDate}
                    </Text>
                  </>
                )}
              </VStack>
            </Box>
          </HStack>
        </CardBody>
      </MotionCard>
    );
  };

  if (loading) {
    return (
      <Container maxW="1400px" py={8}>
        <VStack spacing={6} align="stretch">
          <Skeleton height="60px" borderRadius="xl" />
          <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} height="200px" borderRadius="xl" />
            ))}
          </Grid>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="1400px" py={8}>
      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        mb={8}
      >
        <HStack mb={4}>
          <RouterLink to="/">
            <Button
              variant="ghost"
              color="white"
              leftIcon={<ArrowLeft size={20} />}
              _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
            >
              Back to Dashboard
            </Button>
          </RouterLink>
        </HStack>
        
        <Heading size="2xl" color="white" mb={2}>
          Search Results
        </Heading>
        <Text color="rgba(255, 255, 255, 0.8)" fontSize="lg">
          Found {searchResults.length} results for "{searchTerm}"
        </Text>
      </MotionBox>

      {/* Search Bar */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        mb={8}
      >
        <form onSubmit={handleSearch}>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <Search size={20} color="rgba(255, 255, 255, 0.7)" />
            </InputLeftElement>
            <Input
              placeholder="Search investors, investees, deals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg="rgba(255, 255, 255, 0.1)"
              border="1px solid rgba(255, 255, 255, 0.2)"
              color="white"
              _placeholder={{ color: 'rgba(255, 255, 255, 0.5)' }}
              _focus={{
                bg: 'rgba(255, 255, 255, 0.15)',
                borderColor: 'rgba(255, 255, 255, 0.4)',
              }}
              borderRadius="xl"
            />
          </InputGroup>
        </form>
      </MotionBox>

      {/* Results Summary */}
      {searchResults.length > 0 && (
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          mb={6}
        >
          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}>
            <GridItem>
              <Card bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(20px)" borderRadius="lg">
                <CardBody p={4}>
                  <Stat>
                    <StatLabel color="rgba(255, 255, 255, 0.7)" fontSize="sm">Total Results</StatLabel>
                    <StatNumber color="white" fontSize="xl">{searchResults.length}</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem>
              <Card bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(20px)" borderRadius="lg">
                <CardBody p={4}>
                  <Stat>
                    <StatLabel color="rgba(255, 255, 255, 0.7)" fontSize="sm">Investors</StatLabel>
                    <StatNumber color="white" fontSize="xl">
                      {searchResults.filter(r => r.type === 'investor').length}
                    </StatNumber>
                  </Stat>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem>
              <Card bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(20px)" borderRadius="lg">
                <CardBody p={4}>
                  <Stat>
                    <StatLabel color="rgba(255, 255, 255, 0.7)" fontSize="sm">Companies</StatLabel>
                    <StatNumber color="white" fontSize="xl">
                      {searchResults.filter(r => r.type === 'investee').length}
                    </StatNumber>
                  </Stat>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem>
              <Card bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(20px)" borderRadius="lg">
                <CardBody p={4}>
                  <Stat>
                    <StatLabel color="rgba(255, 255, 255, 0.7)" fontSize="sm">Deals</StatLabel>
                    <StatNumber color="white" fontSize="xl">
                      {searchResults.filter(r => r.type === 'deal').length}
                    </StatNumber>
                  </Stat>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </MotionBox>
      )}

      {/* Search Results */}
      {searchResults.length > 0 ? (
        <VStack spacing={4} align="stretch">
          {searchResults.map((item, index) => (
            <Box key={`${item.id}-${index}`}>
              {renderSearchResult(item)}
            </Box>
          ))}
        </VStack>
      ) : (
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            borderRadius="xl"
          >
            <CardBody textAlign="center" py={12}>
              <Search size={48} color="rgba(255, 255, 255, 0.3)" style={{ margin: '0 auto 16px' }} />
              <Heading size="md" color="white" mb={2}>
                No results found
              </Heading>
              <Text color="rgba(255, 255, 255, 0.7)">
                Try adjusting your search terms or browse our database sections
              </Text>
            </CardBody>
          </Card>
        </MotionBox>
      )}

      {/* Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent
          bg="rgba(255, 255, 255, 0.1)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(255, 255, 255, 0.2)"
        >
          <ModalHeader color="white">
            {selectedItem?.type?.charAt(0).toUpperCase() + selectedItem?.type?.slice(1)} Details
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            {selectedItem && (
              <VStack spacing={4} align="stretch">
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  {Object.entries(selectedItem).map(([key, value]) => {
                    if (key === 'type') return null;
                    if (key === 'description' && value) {
                      return (
                        <GridItem key={key} colSpan={2}>
                          <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">{key}</Text>
                          <Text color="white">{value}</Text>
                        </GridItem>
                      );
                    }
                    return (
                      <GridItem key={key}>
                        <Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">{key}</Text>
                        <Text color="white" fontWeight="medium">{value}</Text>
                      </GridItem>
                    );
                  })}
                </Grid>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default SearchResults;
