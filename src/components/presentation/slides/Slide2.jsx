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

const Slide2 = () => {
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

  const techStacks = [
    {
      category: "Frontend",
      technologies: [
        { name: "React 18", version: "Latest", reason: "Concurrent rendering, improved performance" },
        { name: "Chakra UI", version: "v3", reason: "Pre-built components, accessibility, consistent design" },
        { name: "Framer Motion", version: "v11", reason: "Smooth animations, micro-interactions" }
      ],
      color: "blue"
    },
    {
      category: "Backend",
      technologies: [
        { name: "Node.js", version: "v20 LTS", reason: "JavaScript runtime, fast development, large ecosystem" },
        { name: "Express.js", version: "v4", reason: "Minimal framework, flexible routing, middleware support" }
      ],
      color: "green"
    },
    {
      category: "Database",
      technologies: [
        { name: "PostgreSQL", version: "v16", reason: "ACID compliance, complex queries, JSON support" },
        { name: "Neon/Supabase", version: "Latest", reason: "Serverless, auto-scaling, built-in auth" }
      ],
      color: "purple"
    }
  ];

  const benefits = [
    {
      icon: "⚡",
      title: "Performance",
      description: "React's virtual DOM + Node.js event loop for optimal speed"
    },
    {
      icon: "📈",
      title: "Scalability",
      description: "Serverless database + microservices architecture"
    },
    {
      icon: "👨‍💻",
      title: "Developer Experience",
      description: "JavaScript everywhere, hot reloading, modern tooling"
    },
    {
      icon: "💰",
      title: "Cost-Effective",
      description: "Open-source tools, pay-per-use hosting model"
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
          bgGradient="linear(to-r, green.600, blue.600)"
          bgClip="text"
          mb={4}
        >
          Technology Stack & Why We Chose It
        </Heading>
        <Text fontSize="lg" textAlign="center" color={textColor}>
          Modern, scalable, and cost-effective technology choices for APER's needs
        </Text>
      </MotionBox>

      {/* Technology Stacks */}
      <MotionGrid variants={itemVariants} templateColumns="repeat(3, 1fr)" gap={6}>
        {techStacks.map((stack, index) => (
          <GridItem key={index}>
            <Box
              bg={cardBg}
              p={6}
              borderRadius="xl"
              border="1px solid rgba(255, 255, 255, 0.2)"
              backdropFilter="blur(10px)"
              height="100%"
            >
              <Badge colorScheme={stack.color} fontSize="lg" mb={4} p={2}>
                {stack.category}
              </Badge>
              <VStack spacing={4} align="stretch">
                {stack.technologies.map((tech, techIndex) => (
                  <Box key={techIndex}>
                    <HStack justify="space-between" mb={2}>
                      <Text fontWeight="bold" color={textColor}>
                        {tech.name}
                      </Text>
                      <Badge variant="outline" colorScheme={stack.color}>
                        {tech.version}
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color={textColor} opacity={0.8}>
                      {tech.reason}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Box>
          </GridItem>
        ))}
      </MotionGrid>

      {/* Why This Stack */}
      <MotionBox variants={itemVariants}>
        <Box
          bg="rgba(59, 130, 246, 0.1)"
          p={6}
          borderRadius="xl"
          border="1px solid rgba(59, 130, 246, 0.2)"
          backdropFilter="blur(10px)"
        >
          <Heading size="lg" color="blue.600" mb={6} textAlign="center">
            🚀 Why This Technology Stack?
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {benefits.map((benefit, index) => (
              <GridItem key={index}>
                <HStack spacing={4}>
                  <Text fontSize="3xl">{benefit.icon}</Text>
                  <Box>
                    <Text fontWeight="bold" color={textColor} mb={1}>
                      {benefit.title}
                    </Text>
                    <Text fontSize="sm" color={textColor} opacity={0.8}>
                      {benefit.description}
                    </Text>
                  </Box>
                </HStack>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </MotionBox>

      {/* Technical Advantages */}
      <MotionBox variants={itemVariants}>
        <Box
          bg="rgba(168, 85, 247, 0.1)"
          p={6}
          borderRadius="xl"
          border="1px solid rgba(168, 85, 247, 0.2)"
          backdropFilter="blur(10px)"
        >
          <Heading size="lg" color="purple.500" mb={4} textAlign="center">
            🔧 Technical Advantages
          </Heading>
          <VStack spacing={4} align="stretch">
            <HStack spacing={4}>
              <Box w={3} h={3} borderRadius="full" bg="green.500" />
              <Text color={textColor}>
                <strong>Type Safety:</strong> Full TypeScript support for robust development
              </Text>
            </HStack>
            <HStack spacing={4}>
              <Box w={3} h={3} borderRadius="full" bg="green.500" />
              <Text color={textColor}>
                <strong>Testing:</strong> Comprehensive testing framework with Jest and React Testing Library
              </Text>
            </HStack>
            <HStack spacing={4}>
              <Box w={3} h={3} borderRadius="full" bg="green.500" />
              <Text color={textColor}>
                <strong>Security:</strong> JWT authentication, role-based access control, data encryption
              </Text>
            </HStack>
            <HStack spacing={4}>
              <Box w={3} h={3} borderRadius="full" bg="green.500" />
              <Text color={textColor}>
                <strong>Monitoring:</strong> Real-time performance monitoring and error tracking
              </Text>
            </HStack>
          </VStack>
        </Box>
      </MotionBox>
    </MotionVStack>
  );
};

export default Slide2;
