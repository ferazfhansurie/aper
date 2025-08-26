import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Button,
  Text,
  IconButton,
  useColorModeValue,
  Progress,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import Slide1 from './presentation/Slide1';
import Slide2 from './presentation/Slide2';
import Slide3 from './presentation/Slide3';
import Slide4 from './presentation/Slide4';
import Slide5 from './presentation/Slide5';


const MotionBox = motion(Box);

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);

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
    { component: Slide11, title: "Risk Management & Security" },
    { component: Slide12, title: "Questions & Discussion" },
  ];

  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.1)');
  const borderColor = useColorModeValue('rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)');

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    if (isPlaying) {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        setAutoPlayInterval(null);
      }
      setIsPlaying(false);
    } else {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 8000); // 8 seconds per slide
      setAutoPlayInterval(interval);
      setIsPlaying(true);
    }
  };

  const resetPresentation = () => {
    setCurrentSlide(0);
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      setAutoPlayInterval(null);
    }
    setIsPlaying(false);
  };

  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <Box
      bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      minH="100vh"
      p={8}
      position="relative"
      overflow="hidden"
    >
      {/* Background Pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.1}
        backgroundImage="radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px)"
        backgroundSize="50px 50px"
        zIndex={0}
      />

      {/* Header */}
      <VStack spacing={6} position="relative" zIndex={1}>
        <Box
          bg={bgColor}
          backdropFilter="blur(20px)"
          border="1px solid"
          borderColor={borderColor}
          borderRadius="2xl"
          p={6}
          w="full"
          maxW="1400px"
          mx="auto"
        >
          <VStack spacing={4}>
            <Text
              fontSize="3xl"
              fontWeight="bold"
              color="white"
              textAlign="center"
            >
              APER Data Centralization & AI Research Portal
            </Text>
            <Text
              fontSize="xl"
              color="white"
              opacity={0.9}
              textAlign="center"
            >
              Phase 1b: Detailed Scoping & Technical Analysis
            </Text>
            
            {/* Progress Bar */}
            <Box w="full" bg="rgba(255,255,255,0.2)" borderRadius="full" h={2}>
              <Box
                bg="white"
                h="full"
                borderRadius="full"
                transition="width 0.5s ease"
                width={`${progress}%`}
              />
            </Box>
            
            {/* Slide Counter */}
            <Text color="white" fontSize="lg">
              Slide {currentSlide + 1} of {slides.length}
            </Text>
          </VStack>
        </Box>

        {/* Navigation Controls */}
        <HStack spacing={4}>
          <IconButton
            icon={<RotateCcw />}
            onClick={resetPresentation}
            bg={bgColor}
            backdropFilter="blur(20px)"
            border="1px solid"
            borderColor={borderColor}
            color="white"
            _hover={{ bg: 'rgba(255,255,255,0.2)' }}
            aria-label="Reset presentation"
          />
          
          <IconButton
            icon={<ChevronLeft />}
            onClick={prevSlide}
            bg={bgColor}
            backdropFilter="blur(20px)"
            border="1px solid"
            borderColor={borderColor}
            color="white"
            _hover={{ bg: 'rgba(255,255,255,0.2)' }}
            aria-label="Previous slide"
          />
          
          <IconButton
            icon={isPlaying ? <Pause /> : <Play />}
            onClick={toggleAutoPlay}
            bg={bgColor}
            backdropFilter="blur(20px)"
            border="1px solid"
            borderColor={borderColor}
            color="white"
            _hover={{ bg: 'rgba(255,255,255,0.2)' }}
            aria-label={isPlaying ? "Pause" : "Play"}
          />
          
          <IconButton
            icon={<ChevronRight />}
            onClick={nextSlide}
            bg={bgColor}
            backdropFilter="blur(20px)"
            border="1px solid"
            borderColor={borderColor}
            color="white"
            _hover={{ bg: 'rgba(255,255,255,0.2)' }}
            aria-label="Next slide"
          />
        </HStack>

        {/* Slide Navigation Dots */}
        <HStack spacing={2}>
          {slides.map((_, index) => (
            <Box
              key={index}
              w={3}
              h={3}
              borderRadius="full"
              bg={index === currentSlide ? "white" : "rgba(255,255,255,0.3)"}
              cursor="pointer"
              onClick={() => goToSlide(index)}
              transition="all 0.3s ease"
              _hover={{ bg: "rgba(255,255,255,0.6)" }}
            />
          ))}
        </HStack>
      </VStack>

      {/* Slide Content */}
      <Box
        mt={8}
        position="relative"
        zIndex={1}
        maxW="1400px"
        mx="auto"
      >
        <AnimatePresence mode="wait">
          <MotionBox
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {React.createElement(slides[currentSlide].component)}
          </MotionBox>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default Presentation;
