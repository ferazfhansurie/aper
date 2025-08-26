import React from 'react';
import {
  VStack,
  Heading,
  Text,
  Box,
  HStack,
  Grid,
  GridItem,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionGrid = motion(Grid);

const Slide4 = () => {
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(26, 32, 44, 0.1)');

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const architectureLayers = [
    {
      name: "Presentation Layer",
      components: ["APER Website", "React Portal", "AI Assistant Interface"],
      color: "blue",
      description: "User-facing interfaces with glassmorphic design"
    },
    {
      name: "Application Layer",
      components: ["Node.js API", "Authentication Service", "Data Service", "Export Service"],
      color: "green",
      description: "Business logic and API endpoints"
    },
    {
      name: "Data Layer",
      components: ["PostgreSQL Database", "Redis Cache", "File Storage"],
      color: "purple",
      description: "Data persistence and caching"
    }
  ];

  const dataFlowSteps = [
    {
      step: 1,
      title: "User Request",
      description: "User interacts with APER website or portal",
      icon: "👤"
    },
    {
      step: 2,
      title: "API Gateway",
      description: "Request routed through secure API gateway",
      icon: "🚪"
    },
    {
      step: 3,
      title: "Authentication",
      description: "JWT token validation and role-based access control",
      icon: "🔐"
    },
    {
      step: 4,
      title: "Data Service",
      description: "Business logic processing and data operations",
      icon: "⚙️"
    },
    {
      step: 5,
      title: "Database",
      description: "PostgreSQL queries with connection pooling",
      icon: "🗄️"
    }
  ];

  const securityFeatures = [
    {
      icon: "🔒",
      title: "JWT Authentication",
      description: "Secure token-based authentication with refresh tokens"
    },
    {
      icon: "👥",
      title: "Role-Based Access",
      description: "Granular permissions based on user roles and data access levels"
    },
    {
      icon: "🔐",
      title: "Data Encryption",
      description: "AES-256 encryption for sensitive data at rest and in transit"
    },
    {
      icon: "📝",
      title: "Audit Logging",
      description: "Comprehensive logging of all user actions and data changes"
    }
  ];

  return (
    <MotionVStack
      spacing={8}
      align="stretch"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <MotionBox variants={itemVariants}>
        <Heading 
          size="2xl" 
          textAlign="center" 
          bgGradient="linear(to-r, teal.600, blue.600)"
          bgClip="text"
          mb={4}
        >
          Technical Architecture
        </Heading>
        <Text fontSize="lg" textAlign="center" color={textColor}>
          Detailed data flow and system architecture overview
        </Text>
      </MotionBox>

      {/* Architecture Diagram */}
      <MotionBox variants={itemVariants}>
        <Box
          bg="rgba(59, 130, 246, 0.1)"
          p={6}
          borderRadius="xl"
          border="1px solid rgba(59, 130, 246, 0.2)"
          backdropFilter="blur(10px)"
        >
          <Heading size="lg" color="blue.600" mb={6} textAlign="center">
            🏗️ System Architecture Overview
          </Heading>
          
          {/* Visual Architecture Representation */}
          <Box
            bg="white"
            p={8}
            borderRadius="xl"
            border="2px solid #e2e8f0"
            position="relative"
            overflow="hidden"
          >
            {/* APER Website Layer */}
            <Box
              bg="blue.50"
              p={4}
              borderRadius="lg"
              border="2px solid blue.200"
              textAlign="center"
              mb={4}
            >
              <Text fontWeight="bold" color="blue.700" fontSize="lg">
                🌐 APER Website (pedata.asiape.com)
              </Text>
              <Text fontSize="sm" color="blue.600" mt={2}>
                User Login | Data Display | AI Assistant
              </Text>
            </Box>

            {/* Connection Lines */}
            <Box position="relative" height="40px" display="flex" justifyContent="center">
              <Box
                w="2px"
                h="40px"
                bg="blue.300"
                position="relative"
              >
                <Box
                  position="absolute"
                  top="0"
                  left="-4px"
                  w="10px"
                  h="10px"
                  bg="blue.400"
                  borderRadius="full"
                />
                <Box
                  position="absolute"
                  bottom="0"
                  left="-4px"
                  w="10px"
                  h="10px"
                  bg="blue.400"
                  borderRadius="full"
                />
              </Box>
            </Box>

            {/* React Portal Layer */}
            <Box
              bg="green.50"
              p={4}
              borderRadius="lg"
              border="2px solid green.200"
              textAlign="center"
              mb={4}
            >
              <Text fontWeight="bold" color="green.700" fontSize="lg">
                ⚛️ React Portal (Node.js API)
              </Text>
              <Text fontSize="sm" color="green.600" mt={2}>
                Authentication | Data Service | Export Service
              </Text>
            </Box>

            {/* Connection Lines */}
            <Box position="relative" height="40px" display="flex" justifyContent="center">
              <Box
                w="2px"
                h="40px"
                bg="green.300"
                position="relative"
              >
                <Box
                  position="absolute"
                  top="0"
                  left="-4px"
                  w="10px"
                  h="10px"
                  bg="green.400"
                  borderRadius="full"
                />
                <Box
                  position="absolute"
                  bottom="0"
                  left="-4px"
                  w="10px"
                  h="10px"
                  bg="green.400"
                  borderRadius="full"
                />
              </Box>
            </Box>

            {/* Database Layer */}
            <Box
              bg="purple.50"
              p={4}
              borderRadius="lg"
              border="2px solid purple.200"
              textAlign="center"
            >
              <Text fontWeight="bold" color="purple.700" fontSize="lg">
                🗄️ PostgreSQL Database (Neon/Supabase)
              </Text>
              <Text fontSize="sm" color="purple.600" mt={2}>
                Core Tables | Link Tables | Audit Tables
              </Text>
            </Box>
          </Box>
        </Box>
      </MotionBox>

      {/* Data Flow Details */}
      <MotionBox variants={itemVariants}>
        <Box
          bg="rgba(0, 255, 0, 0.1)"
          p={6}
          borderRadius="xl"
          border="1px solid rgba(0, 255, 0, 0.2)"
          backdropFilter="blur(10px)"
        >
          <Heading size="lg" color="green.600" mb={6} textAlign="center">
            🔄 Data Flow Process
          </Heading>
          <Grid templateColumns="repeat(5, 1fr)" gap={4}>
            {dataFlowSteps.map((step, index) => (
              <GridItem key={index}>
                <VStack spacing={3} align="center">
                  <Box
                    w="50px"
                    h="50px"
                    borderRadius="full"
                    bg="green.500"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    fontWeight="bold"
                    fontSize="lg"
                  >
                    {step.step}
                  </Box>
                  <Text fontSize="2xl">{step.icon}</Text>
                  <Text fontWeight="bold" color={textColor} fontSize="sm" textAlign="center">
                    {step.title}
                  </Text>
                  <Text fontSize="xs" color={textColor} opacity={0.8} textAlign="center">
                    {step.description}
                  </Text>
                </VStack>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </MotionBox>

      {/* Security Measures */}
      <MotionBox variants={itemVariants}>
        <Box
          bg="rgba(168, 85, 247, 0.1)"
          p={6}
          borderRadius="xl"
          border="1px solid rgba(168, 85, 247, 0.2)"
          backdropFilter="blur(10px)"
        >
          <Heading size="lg" color="purple.500" mb={6} textAlign="center">
            🛡️ Security Measures & Data Protection
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {securityFeatures.map((feature, index) => (
              <GridItem key={index}>
                <HStack spacing={4}>
                  <Text fontSize="3xl">{feature.icon}</Text>
                  <Box>
                    <Text fontWeight="bold" color={textColor} mb={1}>
                      {feature.title}
                    </Text>
                    <Text fontSize="sm" color={textColor} opacity={0.8}>
                      {feature.description}
                    </Text>
                  </Box>
                </HStack>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </MotionBox>

      {/* Additional Features */}
      <MotionBox variants={itemVariants}>
        <Box
          bg="rgba(255, 165, 0, 0.1)"
          p={6}
          borderRadius="xl"
          border="1px solid rgba(255, 165, 0, 0.2)"
          backdropFilter="blur(10px)"
        >
          <Heading size="lg" color="orange.500" mb={4} textAlign="center">
            🚀 Additional Technical Features
          </Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <GridItem>
              <VStack spacing={2} align="center">
                <Text fontSize="2xl">⚡</Text>
                <Text fontWeight="bold" color={textColor}>Real-time Updates</Text>
                <Text fontSize="sm" color={textColor} opacity={0.8} textAlign="center">
                  WebSocket connections for live dashboard updates
                </Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack spacing={2} align="center">
                <Text fontSize="2xl">💾</Text>
                <Text fontWeight="bold" color={textColor}>Caching Layer</Text>
                <Text fontSize="sm" color={textColor} opacity={0.8} textAlign="center">
                  Redis caching for frequently accessed data
                </Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack spacing={2} align="center">
                <Text fontSize="2xl">🔄</Text>
                <Text fontWeight="bold" color={textColor}>Backup & Recovery</Text>
                <Text fontSize="sm" color={textColor} opacity={0.8} textAlign="center">
                  Automated daily backups with point-in-time recovery
                </Text>
              </VStack>
            </GridItem>
          </Grid>
        </Box>
      </MotionBox>
    </MotionVStack>
  );
};

export default Slide4;
