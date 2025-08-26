import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Button,
  Text,
  IconButton,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';

import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';
import Slide3 from './slides/Slide3';
import Slide4 from './slides/Slide4';
import Slide5 from './slides/Slide5';
import Slide6 from './slides/Slide6';
import Slide7 from './slides/Slide7';
import Slide8 from './slides/Slide8';
import Slide9 from './slides/Slide9';
import Slide10 from './slides/Slide10';
import Slide11 from './slides/Slide11';
import Slide12 from './slides/Slide12';

const MotionBox = motion(Box);

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');

  const slides = [
    { component: Slide1, title: "Executive Summary" },
    { component: Slide2, title: "Technology Stack & Why We Chose It" },
    { component: Slide3, title: "Core Components Developed" },
    { component: Slide4, title: "Technical Architecture" },
    { component: Slide5, title: "Database Schema & Migration" },
    { component: Slide6, title: "Current Portal Features" },
    { component: Slide7, title: "Phase 1b: Detailed Scoping" },
    { component: Slide8, title: "Phase 2: Development Roadmap" },
    { component: Slide9, title: "Phase 3: AI Research Assistant" },
    { component: Slide10, title: "Value Proposition & ROI" },
    { component: Slide11, title: "Risk Management" },
    { component: Slide12, title: "Questions & Discussion" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="1400px">
        {/* Slide Navigation */}
        <Flex justify="space-between" align="center" mb={8}>
          <Button
            onClick={prevSlide}
            leftIcon={<ChevronLeftIcon />}
            variant="ghost"
            size="lg"
            _hover={{ bg: 'rgba(0, 0, 0, 0.1)' }}
          >
            Previous
          </Button>
          
          <VStack spacing={2}>
            <Text fontSize="2xl" fontWeight="bold" color="blue.600">
              APER Data Centralization & AI Research Portal
            </Text>
            <Text fontSize="lg" color="gray.600">
              Phase 1b: Detailed Scoping & Technical Analysis
            </Text>
          </VStack>
          
          <Button
            onClick={nextSlide}
            rightIcon={<ChevronRightIcon />}
            variant="ghost"
            size="lg"
            _hover={{ bg: 'rgba(0, 0, 0, 0.1)' }}
          >
            Next
          </Button>
        </Flex>

        {/* Slide Counter */}
        <Flex justify="center" mb={6}>
          <HStack spacing={2}>
            {slides.map((_, index) => (
              <Box
                key={index}
                w={3}
                h={3}
                borderRadius="full"
                bg={index === currentSlide ? 'blue.500' : 'gray.300'}
                cursor="pointer"
                onClick={() => goToSlide(index)}
                _hover={{ bg: index === currentSlide ? 'blue.600' : 'gray.400' }}
                transition="all 0.2s"
              />
            ))}
          </HStack>
        </Flex>

        {/* Current Slide */}
        <AnimatePresence mode="wait">
          <MotionBox
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Box
              bg={cardBg}
              borderRadius="2xl"
              p={8}
              boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
              backdropFilter="blur(20px)"
              border="1px solid rgba(255, 255, 255, 0.2)"
            >
              <CurrentSlideComponent />
            </Box>
          </MotionBox>
        </AnimatePresence>

        {/* Slide Navigation Footer */}
        <Flex justify="space-between" align="center" mt={8}>
          <Text fontSize="sm" color="gray.500">
            Slide {currentSlide + 1} of {slides.length}
          </Text>
          
          <HStack spacing={4}>
            <Button
              onClick={prevSlide}
              variant="outline"
              size="sm"
              isDisabled={currentSlide === 0}
            >
              ← Previous
            </Button>
            <Button
              onClick={nextSlide}
              variant="outline"
              size="sm"
              isDisabled={currentSlide === slides.length - 1}
            >
              Next →
            </Button>
          </HStack>
          
          <Text fontSize="sm" color="gray.500">
            {slides[currentSlide].title}
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Presentation;
