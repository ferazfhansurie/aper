import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  VStack,
  Text,
  Image,
  HStack,
  Collapse,
  IconButton,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import logoUrl from "../assets/logo.png";

const VerticalHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMounted = useRef(false);
  
  // Load expanded sections from localStorage on component mount
  const [expandedSections, setExpandedSections] = useState(() => {
    const saved = localStorage.getItem('verticalHeaderExpandedSections');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse saved expanded sections:', e);
      }
    }
    return {
      core: false,
      geographic: false,
      sectors: false,
      relations: false,
    };
  });

  // Save expanded sections to localStorage whenever they change
  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('verticalHeaderExpandedSections', JSON.stringify(expandedSections));
    }
  }, [expandedSections]);

  // Mark component as mounted
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const navigationSections = [
    {
      id: 'query',
      label: 'Query',
      path: '/query-editor',
      items: []
    },
    {
      id: 'overview',
      label: 'Overview',
      path: '/',
      items: []
    },

    {
      id: 'core',
      label: 'Core Entities',
      items: [
        { path: '/funds', label: 'Funds' },
        { path: '/investors', label: 'Investors' },
        { path: '/companies', label: 'Companies' },
        { path: '/deals', label: 'Deals' },
        { path: '/valuations', label: 'Valuations' },
      ]
    },
    {
      id: 'geographic',
      label: 'Geographic',
      items: [
        { path: '/countries', label: 'Countries' },
        { path: '/regions', label: 'Regions' },
        { path: '/cross-border', label: 'Cross Border' },
      ]
    },
    {
      id: 'sectors',
      label: 'Sectors',
      items: [
        { path: '/industries', label: 'Industries' },
        { path: '/technology', label: 'Technology' },
        { path: '/healthcare', label: 'Healthcare' },
        { path: '/real-estate', label: 'Real Estate' },
      ]
    },
    {
      id: 'relations',
      label: 'Relations',
      items: [
        { path: '/fund-company-links', label: 'Fund-Company Links' },
        { path: '/investor-fund-links', label: 'Investor-Fund Links' },
        { path: '/deal-participants', label: 'Deal Participants' },
        { path: '/affiliate-networks', label: 'Affiliate Networks' },
      ]
    },
    {
      id: 'ai',
      label: 'AI Research Assistant',
      path: '/research-ai',
      items: []
    },
  ];

  const toggleSection = (sectionId) => {
    console.log(`Toggling section: ${sectionId}, current state:`, expandedSections[sectionId]);
    setExpandedSections(prev => {
      const newState = {
        ...prev,
        [sectionId]: !prev[sectionId]
      };
      console.log(`New state for ${sectionId}:`, newState[sectionId]);
      return newState;
    });
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const isSectionActive = (section) => {
    if (section.path) {
      return isActive(section.path);
    }
    return section.items.some(item => isActive(item.path));
  };

  // Auto-expand sections when navigating to their child pages
  useEffect(() => {
    if (!isMounted.current) return; // Don't run on initial mount
    
    setExpandedSections(prev => {
      const newExpandedSections = { ...prev };
      let hasChanges = false;

      navigationSections.forEach(section => {
        if (section.items.length > 0) {
          const hasActiveChild = section.items.some(item => isActive(item.path));
          if (hasActiveChild && !prev[section.id]) {
            newExpandedSections[section.id] = true;
            hasChanges = true;
          }
        }
      });

      return hasChanges ? newExpandedSections : prev;
    });
  }, [location.pathname]); // Only depend on location changes

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      h="100vh"
      w="280px"
      bg="white"
      borderRight="2px solid"
      borderColor="blue.200"
      shadow="xl"
      zIndex={1000}
      display={{ base: 'none', lg: 'block' }}
      overflowY="auto"
    >
      <VStack spacing={4} align="stretch" p={4} h="full">
        {/* Logo Section */}
        <Box 
          textAlign="center" 
          py={4}
          borderBottom="1px solid"
          borderColor="blue.100"
          cursor="pointer"
          onClick={() => navigate('/')}
          _hover={{ bg: 'blue.50' }}
          borderRadius="lg"
          transition="all 0.2s"
        >
          <Image 
            src={logoUrl}
            alt="APER Logo" 
            height="60px"
            objectFit="contain"
            mx="auto"
            fallback={
              <VStack spacing={2} align="center">
                <Text fontSize="xl" fontWeight="bold" color="blue.700">
                  ASIA PRIVATE EQUITY
                </Text>
                <Text fontSize="md" fontWeight="bold" color="blue.600">
                  CENTRE LIMITED
                </Text>
                <Box 
                  w="100px" 
                  h="2px" 
                  bg="blue.300" 
                  borderRadius="full"
                  mt={1}
                />
              </VStack>
            }
          />
        </Box>

        {/* Navigation Sections */}
        <VStack spacing={2} align="stretch" flex="1">
          {navigationSections.map((section) => (
            <Box key={section.id}>
              {/* Section Header */}
              <Box
                p={3}
                bg={isSectionActive(section) ? "blue.50" : expandedSections[section.id] ? "blue.25" : "white"}
                borderRadius="lg"
                border="1px solid"
                borderColor={isSectionActive(section) ? "blue.200" : expandedSections[section.id] ? "blue.150" : "blue.100"}
                cursor="pointer"
                _hover={{ bg: "blue.50" }}
                transition="all 0.2s"
                onClick={() => {
                  if (section.path) {
                    navigate(section.path);
                  } else {
                    toggleSection(section.id);
                  }
                }}
              >
                <HStack justify="space-between">
                  <Text fontSize="sm" fontWeight="medium" color={isSectionActive(section) ? "blue.700" : "blue.600"}>
                    {section.label}
                  </Text>
                  {section.items.length > 0 && (
                    <IconButton
                      size="xs"
                      variant="ghost"
                      icon={expandedSections[section.id] ? <ChevronDownIcon /> : <ChevronRightIcon />}
                      aria-label={`Toggle ${section.label}`}
                      color="blue.500"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSection(section.id);
                      }}
                    />
                  )}
                </HStack>
              </Box>

              {/* Section Items */}
              {section.items.length > 0 && (
                <Collapse in={expandedSections[section.id]} animateOpacity>
                  <VStack spacing={1} align="stretch" ml={4} mt={2}>
                    {section.items.map((item) => (
                      <Box
                        key={item.path}
                        p={2}
                        pl={4}
                        bg={isActive(item.path) ? "blue.100" : "transparent"}
                        borderRadius="md"
                        border="1px solid"
                        borderColor={isActive(item.path) ? "blue.200" : "transparent"}
                        cursor="pointer"
                        _hover={{ bg: "blue.50" }}
                        transition="all 0.2s"
                        onClick={() => navigate(item.path)}
                      >
                        <Text fontSize="xs" fontWeight="medium" color={isActive(item.path) ? "blue.700" : "blue.600"}>
                          {item.label}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                </Collapse>
              )}
            </Box>
          ))}
        </VStack>

        {/* Footer Section */}
        <Box 
          textAlign="center" 
          py={3}
          borderTop="1px solid"
          borderColor="blue.100"
        >
          <Text fontSize="xs" color="blue.400">
            APER Dashboard v1.0
          </Text>
          <Text fontSize="xs" color="blue.400">
            © 2024 APER Centre
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default VerticalHeader;
