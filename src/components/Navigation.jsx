import React, { useState } from 'react';
import logoUrl from "../assets/logo.png";
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  IconButton,
  Collapse,
  useDisclosure,
  Image
} from '@chakra-ui/react';
import { 
  Search, 
  ChevronDown, 
  Database, 
  Building2, 
  Users, 
  TrendingUp, 
  Globe, 
  PiggyBank,
  PieChart,
  BarChart3,
  Layers,
  Network,
  Brain,
  Menu as MenuIcon,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();
  const bgColor = 'white';
  const textColor = 'blue.600';
  const borderColor = 'blue.200';

  const isActive = (path) => location.pathname === path;

  const mainMenuItems = [
    {
      label: 'Overview',
      path: '/',
      icon: Database,
      description: 'APER Dashboard & Analytics'
    },
    {
      label: 'Core Entities',
      icon: Layers,
      description: 'Main data tables',
      submenu: [
        { label: 'Funds', path: '/funds', icon: PiggyBank, description: 'PE Fund Management' },
        { label: 'Investors', path: '/investors', icon: Users, description: 'Institutional Investors' },
        { label: 'Companies', path: '/companies', icon: Building2, description: 'Investee Companies' },
        { label: 'Deals', path: '/deals', icon: TrendingUp, description: 'Investment Transactions' },
        { label: 'Valuations', path: '/valuations', icon: BarChart3, description: 'Company Valuations' }
      ]
    },
    {
      label: 'Geographic',
      icon: Globe,
      description: 'Regional & Country Data',
      submenu: [
        { label: 'Countries', path: '/countries', icon: Globe, description: 'Country Information' },
        { label: 'Regions', path: '/regions', icon: Globe, description: 'Regional Focus' },
        { label: 'Cross-Border', path: '/cross-border', icon: Network, description: 'International Deals' }
      ]
    },
    {
      label: 'Sectors',
      icon: PieChart,
      description: 'Industry & Technology',
      submenu: [
        { label: 'Industries', path: '/industries', icon: Building2, description: 'Industry Sectors' },
        { label: 'Technology', path: '/technology', icon: Brain, description: 'Tech Categories' },
        { label: 'Healthcare', path: '/healthcare', icon: Users, description: 'Healthcare Focus' },
        { label: 'Real Estate', path: '/real-estate', icon: Building2, description: 'Property & Infrastructure' }
      ]
    },
    {
      label: 'Relationships',
      icon: Network,
      description: 'Data Connections & Links',
      submenu: [
        { label: 'Fund-Company Links', path: '/fund-company-links', icon: Network, description: 'Investment Relationships' },
        { label: 'Investor-Fund Links', path: '/investor-fund-links', icon: Network, description: 'LP-GP Relationships' },
        { label: 'Deal Participants', path: '/deal-participants', icon: Network, description: 'Deal Stakeholders' },
        { label: 'Affiliate Networks', path: '/affiliate-networks', icon: Network, description: 'Company Affiliations' }
      ]
    },
    {
      label: 'Research AI',
      path: '/research-ai',
      icon: Brain,
      description: 'AI-Powered Research Assistant'
    }
  ];

  const renderMenuItem = (item) => {
    if (item.submenu) {
      return (
        <Menu key={item.label}>
          <MenuButton
            as={Button}
            variant="ghost"
            color={textColor}
            _hover={{ bg: 'blue.50' }}
            _active={{ bg: 'blue.100' }}
            rightIcon={<ChevronDown size={16} />}
            size="lg"
            px={4}
          >
            <HStack spacing={2}>
              <item.icon size={20} />
              <Text>{item.label}</Text>
            </HStack>
          </MenuButton>
          <MenuList bg="white" border="1px solid" borderColor="blue.200" shadow="xl">
            {item.submenu.map((subItem) => (
              <MenuItem
                key={subItem.path}
                as={Link}
                to={subItem.path}
                icon={<subItem.icon size={16} />}
                _hover={{ bg: 'blue.50' }}
                py={3}
              >
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold" color="blue.800">{subItem.label}</Text>
                  <Text fontSize="xs" color="blue.600">{subItem.description}</Text>
                </VStack>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      );
    }

    return (
      <Button
        key={item.path}
        as={Link}
        to={item.path}
        variant={isActive(item.path) ? "solid" : "ghost"}
        bg={isActive(item.path) ? 'blue.600' : 'transparent'}
        color={isActive(item.path) ? 'white' : textColor}
        _hover={{ bg: isActive(item.path) ? 'blue.700' : 'blue.50' }}
        size="lg"
        px={4}
      >
        <HStack spacing={2}>
          <item.icon size={20} />
          <Text>{item.label}</Text>
        </HStack>
      </Button>
    );
  };

  return (
    <Box bg={bgColor} boxShadow="lg" position="sticky" top={0} zIndex={1000} borderBottom="1px solid" borderColor={borderColor}>
      <Flex
        maxW="1400px"
        mx="auto"
        px={4}
        py={3}
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <Box 
          display="flex" 
          alignItems="center" 
          px={6} 
          py={4}
          minW="300px"
          bg="white"
  
        >
          <Image 
            src={logoUrl}
            alt="APER Logo" 
            height="60px"
            objectFit="contain"
            fallback={
              <VStack spacing={1} align="center">
                <Text fontSize="2xl" fontWeight="bold" color="blue.700">
                  ASIA PRIVATE EQUITY
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="blue.600">
                  CENTRE LIMITED
                </Text>
                <Box 
                  w="120px" 
                  h="3px" 
                  bg="blue.300" 
                  borderRadius="full"
                  mt={1}
                />
              </VStack>
            }
          />
        </Box>

        {/* Desktop Navigation */}
        <HStack spacing={2} display={{ base: 'none', lg: 'flex' }}>
          {mainMenuItems.map(renderMenuItem)}
        </HStack>

        {/* Search Bar */}
        <Box flex={1} maxW="400px" mx={4} display={{ base: 'none', md: 'block' }}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search size={16} color="blue.400" />
            </InputLeftElement>
            <Input
              placeholder="Search funds, investors, companies, deals..."
              bg="blue.50"
              border="1px solid"
              borderColor="blue.200"
              color="blue.800"
              _placeholder={{ color: 'blue.400' }}
              _hover={{ bg: 'blue.100' }}
              _focus={{ bg: 'white', borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
            />
          </InputGroup>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          display={{ base: 'flex', lg: 'none' }}
          onClick={onToggle}
          icon={isOpen ? <X size={20} /> : <MenuIcon size={20} />}
          variant="ghost"
          color={textColor}
          aria-label="Toggle navigation menu"
        />
      </Flex>

      {/* Mobile Navigation */}
      <Collapse in={isOpen} animateOpacity>
        <Box
          bg="blue.50"
          borderTop="1px solid"
          borderColor="blue.200"
          display={{ base: 'block', lg: 'none' }}
        >
          <VStack spacing={0} align="stretch" p={4}>
            {mainMenuItems.map((item) => (
              <Box key={item.label}>
                {item.submenu ? (
                  <VStack align="stretch" spacing={0}>
                    <Text
                      fontSize="sm"
                      fontWeight="semibold"
                      color="blue.700"
                      mb={2}
                      mt={4}
                    >
                      {item.label}
                    </Text>
                    {item.submenu.map((subItem) => (
                      <Button
                        key={subItem.path}
                        as={Link}
                        to={subItem.path}
                        variant="ghost"
                        color="blue.600"
                        size="sm"
                        justifyContent="start"
                        pl={8}
                        _hover={{ bg: 'blue.100' }}
                      >
                        <HStack spacing={2}>
                          <subItem.icon size={16} />
                          <Text>{subItem.label}</Text>
                        </HStack>
                      </Button>
                    ))}
                  </VStack>
                ) : (
                  <Button
                    as={Link}
                    to={item.path}
                    variant="ghost"
                    color="blue.600"
                    size="sm"
                    justifyContent="start"
                    _hover={{ bg: 'blue.100' }}
                  >
                    <HStack spacing={2}>
                      <item.icon size={16} />
                      <Text>{item.label}</Text>
                    </HStack>
                  </Button>
                )}
              </Box>
            ))}
            
            {/* Mobile Search */}
            <Box mt={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Search size={16} color="blue.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search..."
                  bg="white"
                  border="1px solid"
                  borderColor="blue.200"
                  color="blue.800"
                  _placeholder={{ color: 'blue.400' }}
                />
              </InputGroup>
            </Box>
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Navigation;
