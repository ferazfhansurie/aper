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
  Code, 
  Zap, 
  Shield, 
  TrendingUp, 
  DollarSign,
  Users,
  Database,
  Globe,
  Cloud
} from 'lucide-react';

const MotionBox = motion(Box);

const Slide2 = () => {
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.1)');
  const borderColor = useColorModeValue('rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)');

  const techStack = [
    {
      category: "Frontend",
      technologies: [
        { name: "React 18", icon: Code, benefits: ["Latest features", "Concurrent rendering", "Improved performance"] },
        { name: "Chakra UI", icon: Users, benefits: ["Pre-built components", "Accessibility", "Consistent design"] },
        { name: "Framer Motion", icon: Zap, benefits: ["Smooth animations", "Micro-interactions", "Enhanced UX"] }
      ]
    },
    {
      category: "Backend",
      technologies: [
        { name: "Node.js", icon: Code, benefits: ["JavaScript runtime", "Fast development", "Large ecosystem"] },
        { name: "Express.js", icon: Code, benefits: ["Minimal framework", "Flexible routing", "Middleware support"] }
      ]
    },
    {
      category: "Database",
      technologies: [
        { name: "PostgreSQL", icon: Database, benefits: ["ACID compliance", "Complex queries", "JSON support"] },
        { name: "Neon/Supabase", icon: Cloud, benefits: ["Serverless", "Auto-scaling", "Built-in auth"] }
      ]
    }
  ];

  const reasons = [
    {
      icon: Zap,
      title: "Performance",
      description: "React's virtual DOM + Node.js event loop for optimal speed"
    },
    {
      icon: TrendingUp,
      title: "Scalability",
      description: "Serverless database + microservices architecture"
    },
    {
      icon: Users,
      title: "Developer Experience",
      description: "JavaScript everywhere, hot reloading, modern tooling"
    },
    {
      icon: DollarSign,
      title: "Cost-Effective",
      description: "Open-source tools, pay-per-use hosting model"
    }
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
            Technology Stack & Why We Chose It
          </Heading>
          <Text
            fontSize="lg"
            color="white"
            opacity={0.9}
            textAlign="center"
            maxW="800px"
          >
            Modern, scalable, and cost-effective technology choices for APER's data centralization needs
          </Text>
        </VStack>

        {/* Technology Stack Grid */}
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {techStack.map((category, categoryIndex) => (
            <GridItem key={categoryIndex}>
              <MotionBox
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.2 }}
                bg="rgba(255, 255, 255, 0.05)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                borderRadius="xl"
                p={6}
                h="full"
              >
                <VStack spacing={4} align="stretch" h="full">
                  <Heading size="md" color="white" textAlign="center">
                    {category.category}
                  </Heading>
                  <VStack spacing={3} align="stretch" flex={1}>
                    {category.technologies.map((tech, techIndex) => (
                      <Box
                        key={techIndex}
                        bg="rgba(255, 255, 255, 0.05)"
                        borderRadius="lg"
                        p={3}
                      >
                        <HStack spacing={3}>
                          <Icon as={tech.icon} color="blue.300" boxSize={5} />
                          <Text color="white" fontWeight="semibold">
                            {tech.name}
                          </Text>
                        </HStack>
                        <VStack spacing={1} mt={2} align="stretch">
                          {tech.benefits.map((benefit, benefitIndex) => (
                            <Text
                              key={benefitIndex}
                              color="white"
                              opacity={0.8}
                              fontSize="sm"
                              pl={8}
                            >
                              • {benefit}
                            </Text>
                          ))}
                        </VStack>
                      </Box>
                    ))}
                  </VStack>
                </VStack>
              </MotionBox>
            </GridItem>
          ))}
        </Grid>

        {/* Why This Stack Section */}
        <VStack spacing={6}>
          <Heading size="lg" color="white" textAlign="center">
            Why We Chose This Stack
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={6} w="full">
            {reasons.map((reason, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                bg="rgba(255, 255, 255, 0.05)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                borderRadius="xl"
                p={6}
              >
                <HStack spacing={4}>
                  <Icon as={reason.icon} color="green.300" boxSize={8} />
                  <VStack align="stretch" spacing={2}>
                    <Text color="white" fontWeight="bold" fontSize="lg">
                      {reason.title}
                    </Text>
                    <Text color="white" opacity={0.8}>
                      {reason.description}
                    </Text>
                  </VStack>
                </HStack>
              </MotionBox>
            ))}
          </Grid>
        </VStack>

        {/* Security & Performance Badges */}
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

export default Slide2;
