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
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { CheckCircle, Target, Zap, Database } from 'lucide-react';

const MotionBox = motion(Box);

const Slide1 = () => {
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.1)');
  const borderColor = useColorModeValue('rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)');

  return (
    <Box
      bg={bgColor}
      backdropFilter="blur(20px)"
      border="1px solid"
      borderColor={borderColor}
      borderRadius="2xl"
      p={8}
      minH="600px"
      display="flex"
      alignItems="center"
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
            Executive Summary
          </Heading>
          <Text
            fontSize="xl"
            color="white"
            opacity={0.9}
            textAlign="center"
            maxW="800px"
          >
            APER is currently impeded by fragmented, offline data systems. 
            Juta Teknologi proposes a structured, three-phase modernization plan.
          </Text>
        </VStack>

        {/* Current State vs Solution */}
        <HStack spacing={8} justify="center" align="stretch">
          {/* Current State */}
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            bg="rgba(255, 0, 0, 0.1)"
            border="1px solid rgba(255, 0, 0, 0.3)"
            borderRadius="xl"
            p={6}
            flex={1}
            maxW="400px"
          >
            <VStack spacing={4} align="stretch">
              <HStack justify="center">
                <Icon as={Database} color="red.300" boxSize={8} />
                <Heading size="lg" color="red.300">
                  Current State
                </Heading>
              </HStack>
              <VStack spacing={3} align="stretch">
                <HStack>
                  <Icon as={CheckCircle} color="red.300" />
                  <Text color="white">Fragmented Microsoft Access databases</Text>
                </HStack>
                <HStack>
                  <Icon as={CheckCircle} color="red.300" />
                  <Text color="white">Offline data systems</Text>
                </HStack>
                <HStack>
                  <Icon as={CheckCircle} color="red.300" />
                  <Text color="white">Manual data entry and reporting</Text>
                </HStack>
                <HStack>
                  <Icon as={CheckCircle} color="red.300" />
                  <Text color="white">Limited accessibility and collaboration</Text>
                </HStack>
              </VStack>
            </VStack>
          </MotionBox>

          {/* Solution */}
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            bg="rgba(0, 255, 0, 0.1)"
            border="1px solid rgba(0, 255, 0, 0.3)"
            borderRadius="xl"
            p={6}
            flex={1}
            maxW="400px"
          >
            <VStack spacing={4} align="stretch">
              <HStack justify="center">
                <Icon as={Zap} color="green.300" boxSize={8} />
                <Heading size="lg" color="green.300">
                  Solution
                </Heading>
              </HStack>
              <VStack spacing={3} align="stretch">
                <HStack>
                  <Icon as={CheckCircle} color="green.300" />
                  <Text color="white">Centralized PostgreSQL database</Text>
                </HStack>
                <HStack>
                  <Icon as={CheckCircle} color="green.300" />
                  <Text color="white">Modern web portal integration</Text>
                </HStack>
                <HStack>
                  <Icon as={CheckCircle} color="green.300" />
                  <Text color="white">AI Research Assistant</Text>
                </HStack>
                <HStack>
                  <Icon as={CheckCircle} color="green.300" />
                  <Text color="white">Real-time collaboration</Text>
                </HStack>
              </VStack>
            </VStack>
          </MotionBox>
        </HStack>

        {/* Phase Status */}
        <VStack spacing={4}>
          <Heading size="lg" color="white" textAlign="center">
            Project Status
          </Heading>
          <HStack spacing={6} justify="center">
            <Badge
              colorScheme="green"
              variant="solid"
              px={4}
              py={2}
              fontSize="lg"
              borderRadius="full"
            >
              ✅ Phase 1 Complete
            </Badge>
            <Badge
              colorScheme="blue"
              variant="solid"
              px={4}
              py={2}
              fontSize="lg"
              borderRadius="full"
            >
              🔄 Phase 1b In Progress
            </Badge>
            <Badge
              colorScheme="gray"
              variant="solid"
              px={4}
              py={2}
              fontSize="lg"
              borderRadius="full"
            >
              ⏳ Phase 2 Pending
            </Badge>
            <Badge
              colorScheme="gray"
              variant="solid"
              px={4}
              py={2}
              fontSize="lg"
              borderRadius="full"
            >
              ⏳ Phase 3 Pending
            </Badge>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Slide1;
