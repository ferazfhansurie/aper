import React from 'react';
import {
  VStack,
  Heading,
  Text,
  Box,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ArrowRightIcon } from '@chakra-ui/icons';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const Slide1 = () => {
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const accentColor = useColorModeValue('blue.600', 'blue.400');

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

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
          bgGradient="linear(to-r, blue.600, purple.600)"
          bgClip="text"
          mb={4}
        >
          Executive Summary
        </Heading>
        <Text fontSize="lg" textAlign="center" color={textColor}>
          APER Data Centralization & AI Research Portal
        </Text>
      </MotionBox>

      {/* Current State */}
      <MotionBox variants={itemVariants}>
        <Box
          bg="rgba(255, 255, 255, 0.1)"
          p={6}
          borderRadius="xl"
          border="1px solid rgba(255, 255, 255, 0.2)"
          backdropFilter="blur(10px)"
        >
          <Heading size="md" color="red.500" mb={4}>
            🚨 Current State
          </Heading>
          <Text fontSize="lg" color={textColor}>
            APER is currently impeded by <strong>fragmented, offline data systems</strong> 
            using Microsoft Access databases, limiting data accessibility and analysis capabilities.
          </Text>
        </Box>
      </MotionBox>

      {/* Solution */}
      <MotionBox variants={itemVariants}>
        <Box
          bg="rgba(0, 255, 0, 0.1)"
          p={6}
          borderRadius="xl"
          border="1px solid rgba(0, 255, 0, 0.2)"
          backdropFilter="blur(10px)"
        >
          <Heading size="md" color="green.500" mb={4}>
            ✅ Our Solution
          </Heading>
          <Text fontSize="lg" color={textColor}>
            Juta Teknologi proposes a structured, three-phase modernization plan to 
            establish a <strong>centralized PostgreSQL database</strong> and 
            <strong> modern web portal</strong> with AI research capabilities.
          </Text>
        </Box>
      </MotionBox>

      {/* Phase Status */}
      <MotionBox variants={itemVariants}>
        <Box
          bg="rgba(59, 130, 246, 0.1)"
          p={6}
          borderRadius="xl"
          border="1px solid rgba(59, 130, 246, 0.2)"
          backdropFilter="blur(10px)"
        >
          <Heading size="md" color={accentColor} mb={4}>
            📊 Phase Status
          </Heading>
          <VStack spacing={4} align="stretch">
            <HStack spacing={4}>
              <CheckCircleIcon color="green.500" boxSize={6} />
              <Text fontSize="lg" color={textColor}>
                <strong>Phase 1:</strong> Complete - Initial discovery and technical analysis
              </Text>
            </HStack>
            <HStack spacing={4}>
              <ArrowRightIcon color="blue.500" boxSize={6} />
              <Text fontSize="lg" color={textColor}>
                <strong>Phase 1b:</strong> Detailed scoping, wireframes, and feature confirmation
              </Text>
            </HStack>
            <HStack spacing={4}>
              <Box w={6} h={6} borderRadius="full" bg="gray.300" />
              <Text fontSize="lg" color={textColor}>
                <strong>Phase 2:</strong> Database migration and portal development
              </Text>
            </HStack>
            <HStack spacing={4}>
              <Box w={6} h={6} borderRadius="full" bg="gray.300" />
              <Text fontSize="lg" color={textColor}>
                <strong>Phase 3:</strong> AI Research Assistant integration
              </Text>
            </HStack>
          </VStack>
        </Box>
      </MotionBox>

      {/* Goal */}
      <MotionBox variants={itemVariants}>
        <Box
          bg="rgba(168, 85, 247, 0.1)"
          p={6}
          borderRadius="xl"
          border="1px solid rgba(168, 85, 247, 0.2)"
          backdropFilter="blur(10px)"
        >
          <Heading size="md" color="purple.500" mb={4}>
            🎯 Phase 1b Goal
          </Heading>
          <Text fontSize="lg" color={textColor} textAlign="center">
            Detailed scoping: <strong>Wireframes</strong>, <strong>Database Schema</strong>, 
            <strong> API Contracts</strong>, and <strong>Feature Confirmation</strong>
          </Text>
        </Box>
      </MotionBox>
    </MotionVStack>
  );
};

export default Slide1;
