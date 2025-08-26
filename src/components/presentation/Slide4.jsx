import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Badge,
  Icon,
  useColorModeValue,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Code, 
  Database, 
  Shield, 
  Zap,
  Users,
  Cloud,
  ArrowRight
} from 'lucide-react';

const MotionBox = motion(Box);

const Slide4 = () => {
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.1)');
  const borderColor = useColorModeValue('rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)');

  const architectureLayers = [
    {
      name: "APER Website",
      description: "pedata.asiape.com",
      components: ["User Login", "Data Display", "AI Assistant"],
      icon: Globe,
      color: "blue"
    },
    {
      name: "React Portal",
      description: "Node.js API Backend",
      components: ["Authentication", "Data Service", "Export Service"],
      icon: Code,
      color: "green"
    },
    {
      name: "PostgreSQL Database",
      description: "Neon/Supabase",
      components: ["Core Tables", "Link Tables", "Audit Tables"],
      icon: Database,
      color: "purple"
    }
  ];

  const dataFlow = [
    {
      step: "1",
      title: "User Request",
      description: "User interacts with APER website",
      icon: Users
    },
    {
      step: "2",
      title: "API Gateway",
      description: "Request routed through secure gateway",
      icon: Shield
    },
    {
      step: "3",
      title: "Authentication",
      description: "JWT/OAuth token validation",
      icon: Shield
    },
    {
      step: "4",
      title: "Data Service",
      description: "Business logic and data processing",
      icon: Code
    },
    {
      step: "5",
      title: "Database",
      description: "PostgreSQL query execution",
      icon: Database
    }
  ];

  const securityFeatures = [
    "JWT Token Authentication",
    "Role-based Access Control",
    "API Rate Limiting",
    "Data Encryption at Rest",
    "Secure HTTPS Communication",
    "Input Validation & Sanitization",
    "Audit Logging",
    "Regular Security Updates"
  ];

  return (
    <Box
      bg={bgColor}
      backdropFilter="blur(20px)"
      border="1px solid"
      borderColor={borderColor}
      borderRadius="2xl"
      p={8}
      minH="600px"
    >
      <VStack spacing={8} w="full" align="stretch">
        {/* Header */}
        <VStack spacing={4}>
          <Heading
            size="2xl"
            color="white"
            textAlign="center"
            fontWeight="bold"
          >
            Technical Architecture
          </Heading>
          <Text
            fontSize="lg"
            color="white"
            opacity={0.9}
            textAlign="center"
            maxW="800px"
          >
            Secure, scalable architecture ensuring optimal performance and data integrity
          </Text>
        </VStack>

        {/* Architecture Layers */}
        <VStack spacing={6}>
          <Heading size="lg" color="white" textAlign="center">
            System Architecture Layers
          </Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={6} w="full">
            {architectureLayers.map((layer, index) => (
              <GridItem key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  bg="rgba(255, 255, 255, 0.05)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  borderRadius="xl"
                  p={6}
                  h="full"
                  textAlign="center"
                >
                  <VStack spacing={4} align="stretch" h="full">
                    <Icon 
                      as={layer.icon} 
                      color={`${layer.color}.300`} 
                      boxSize={12} 
                      mx="auto"
                    />
                    <Heading size="md" color="white">
                      {layer.name}
                    </Heading>
                    <Text color="white" opacity={0.8} fontSize="sm">
                      {layer.description}
                    </Text>
                    <VStack spacing={2} align="stretch" mt="auto">
                      {layer.components.map((component, compIndex) => (
                        <Badge
                          key={compIndex}
                          colorScheme={layer.color}
                          variant="solid"
                          px={3}
                          py={1}
                          fontSize="xs"
                          borderRadius="full"
                        >
                          {component}
                        </Badge>
                      ))}
                    </VStack>
                  </VStack>
                </MotionBox>
              </GridItem>
            ))}
          </Grid>
        </VStack>

        {/* Data Flow */}
        <VStack spacing={6}>
          <Heading size="lg" color="white" textAlign="center">
            Data Flow & Processing
          </Heading>
          <Box
            bg="rgba(255, 255, 255, 0.05)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            borderRadius="xl"
            p={6}
            w="full"
          >
            <Grid templateColumns="repeat(5, 1fr)" gap={4} w="full">
              {dataFlow.map((flow, index) => (
                <GridItem key={index}>
                  <VStack spacing={3} align="center">
                    <Box
                      bg="rgba(255, 255, 255, 0.1)"
                      borderRadius="full"
                      p={3}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={flow.icon} color="white" boxSize={6} />
                    </Box>
                    <Text color="white" fontWeight="bold" textAlign="center">
                      {flow.step}
                    </Text>
                    <Text color="white" fontSize="sm" textAlign="center">
                      {flow.title}
                    </Text>
                    <Text color="white" opacity={0.7} fontSize="xs" textAlign="center">
                      {flow.description}
                    </Text>
                  </VStack>
                  {index < dataFlow.length - 1 && (
                    <Box
                      position="absolute"
                      right="-20px"
                      top="50%"
                      transform="translateY(-50%)"
                      color="white"
                      opacity={0.5}
                    >
                      <Icon as={ArrowRight} boxSize={6} />
                    </Box>
                  )}
                </GridItem>
              ))}
            </Grid>
          </Box>
        </VStack>

        {/* Security Features */}
        <VStack spacing={6}>
          <Heading size="lg" color="white" textAlign="center">
            Security & Performance Features
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap={4} w="full">
            {securityFeatures.map((feature, index) => (
              <GridItem key={index}>
                <MotionBox
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  bg="rgba(255, 255, 255, 0.05)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  borderRadius="lg"
                  p={4}
                  textAlign="center"
                >
                  <Text color="white" fontSize="sm">
                    {feature}
                  </Text>
                </MotionBox>
              </GridItem>
            ))}
          </Grid>
        </VStack>

        {/* Performance Highlights */}
        <HStack spacing={6} justify="center">
          <Badge
            colorScheme="green"
            variant="solid"
            px={4}
            py={2}
            fontSize="md"
            borderRadius="full"
          >
            🔒 Enterprise Security
          </Badge>
          <Badge
            colorScheme="blue"
            variant="solid"
            px={4}
            py={2}
            fontSize="md"
            borderRadius="full"
          >
            ⚡ High Performance
          </Badge>
          <Badge
            colorScheme="purple"
            variant="solid"
            px={4}
            py={2}
            fontSize="md"
            borderRadius="full"
          >
            📱 Mobile Responsive
          </Badge>
          <Badge
            colorScheme="teal"
            variant="solid"
            px={4}
            py={2}
            fontSize="md"
            borderRadius="full"
          >
            🌐 Scalable Architecture
          </Badge>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Slide4;
