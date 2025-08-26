import React from 'react';
import { Box, Container, Text, VStack, Heading } from '@chakra-ui/react';
import { Building2 } from 'lucide-react';

const RealEstate = () => {
  return (
    <Box 
      bg="linear-gradient(135deg, #2C478D 0%, #4A90E2 100%)" 
      minH="100vh" 
      py={8}
    >
      <Container maxW="1400px">
        <VStack spacing={4} align="center" justify="center" minH="80vh">
          <Box 
            p={4} 
            bg="rgba(255, 255, 255, 0.1)" 
            color="white" 
            borderRadius="lg"
            backdropFilter="blur(10px)"
            border="1px solid rgba(255, 255, 255, 0.2)"
          >
            <Building2 size={48} />
          </Box>
          <Heading size="xl" color="white">
            Real Estate
          </Heading>
          <Text fontSize="lg" color="rgba(255, 255, 255, 0.8)">
            Property & Infrastructure Investments
          </Text>
          <Text fontSize="md" color="rgba(255, 255, 255, 0.6)">
            Coming Soon - This page will show real estate data and relationships
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default RealEstate;
