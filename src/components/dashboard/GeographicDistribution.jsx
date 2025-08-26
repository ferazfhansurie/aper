import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Text,
  VStack,
  HStack,
  Progress,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  Globe,
  MapPin,
  TrendingUp
} from 'lucide-react';

const MotionCard = motion(Card);

const GeographicDistribution = ({ data }) => {
  const bgColor = 'rgba(59, 130, 246, 0.05)';
  const borderColor = 'rgba(59, 130, 246, 0.2)';

  // Calculate total deals and values for percentage calculations
  const totalDeals = data.regions.reduce((sum, region) => sum + region.deals, 0);
  const totalValue = data.regions.reduce((sum, region) => sum + region.value, 0);

  const getRegionColor = (index) => {
    const colors = ['blue', 'green', 'purple', 'orange', 'teal', 'pink'];
    return colors[index % colors.length];
  };

  const formatValue = (value) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}B`;
    } else if (value >= 1) {
      return `$${value.toFixed(1)}B`;
    } else {
      return `$${(value * 1000).toFixed(0)}M`;
    }
  };

  // Filter out regions with no data and ensure we have proper names
  const validRegions = data.regions.filter(region => 
    region.name && 
    region.name !== 'Unknown' && 
    region.name !== 'null' && 
    region.deals > 0
  );

  // If no valid regions, show a message
  if (validRegions.length === 0) {
    return (
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        bg={bgColor}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="xl"
        h="full"
      >
        <CardBody p={6}>
          <VStack spacing={6} align="stretch" h="full" justify="center">
            <Box textAlign="center">
              <Text fontSize="xl" fontWeight="bold" color="blue.700" mb={2}>
                Geographic Distribution
              </Text>
              <Text fontSize="sm" color="blue.500">
                Investment activity across regions
              </Text>
            </Box>
            <Box textAlign="center" p={8}>
              <Text fontSize="md" color="gray.500">
                No geographic data available at the moment
              </Text>
            </Box>
          </VStack>
        </CardBody>
      </MotionCard>
    );
  }

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="xl"
      h="full"
    >
      <CardBody p={6}>
        <VStack spacing={6} align="stretch" h="full">
          {/* Header */}
          <Box textAlign="center">
            <Text fontSize="xl" fontWeight="bold" color="blue.700" mb={2}>
              Geographic Distribution
            </Text>
            <Text fontSize="sm" color="blue.500">
              Investment activity across regions
            </Text>
          </Box>

          {/* Regional Breakdown */}
          <VStack spacing={4} align="stretch" flex="1">
            {validRegions.map((region, index) => {
              const dealPercentage = Math.round((region.deals / totalDeals) * 100);
              const valuePercentage = Math.round((region.value / totalValue) * 100);
              const color = getRegionColor(index);

              return (
                <Box key={region.name} p={4} bg={`${color}.50`} borderRadius="lg" border="1px solid" borderColor={`${color}.200`}>
                  <VStack spacing={3} align="stretch">
                    <HStack justify="space-between">
                      <HStack>
                        <Box
                          p={1}
                          bg={`${color}.100`}
                          color={`${color}.600`}
                          borderRadius="md"
                        >
                          <MapPin size={16} />
                        </Box>
                        <Text fontSize="md" fontWeight="bold" color="blue.700">
                          {region.name}
                        </Text>
                      </HStack>
                      <Box textAlign="right">
                        <Text fontSize="sm" fontWeight="bold" color="blue.700">
                          {region.deals.toLocaleString()} deals
                        </Text>
                        <Text fontSize="xs" color="blue.600">
                          {formatValue(region.value)}
                        </Text>
                      </Box>
                    </HStack>

                    {/* Deal Count Progress */}
                    <Box>
                      <HStack justify="space-between" mb={1}>
                        <Text fontSize="xs" color="gray.600">Deal Volume</Text>
                        <Text fontSize="xs" color="gray.600">{dealPercentage}%</Text>
                      </HStack>
                      <Progress 
                        value={dealPercentage} 
                        colorScheme={color} 
                        size="sm" 
                        borderRadius="full"
                      />
                    </Box>

                    {/* Value Progress */}
                    <Box>
                      <HStack justify="space-between" mb={1}>
                        <Text fontSize="xs" color="gray.600">Investment Value</Text>
                        <Text fontSize="xs" color="gray.600">{valuePercentage}%</Text>
                      </HStack>
                      <Progress 
                        value={valuePercentage} 
                        colorScheme={color} 
                        size="sm" 
                        borderRadius="full"
                        opacity={0.7}
                      />
                    </Box>
                  </VStack>
                </Box>
              );
            })}
          </VStack>

          {/* Summary Stats */}
          <Box p={4} bg="gray.50" borderRadius="lg" border="1px solid" borderColor="gray.200">
            <VStack spacing={2} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="medium" color="gray.700">
                  Total Deals
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="gray.800">
                  {totalDeals.toLocaleString()}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="medium" color="gray.700">
                  Total Value
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="gray.800">
                  {formatValue(totalValue)}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="medium" color="gray.700">
                  Regions Covered
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="gray.800">
                  {validRegions.length}
                </Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </CardBody>
    </MotionCard>
  );
};

export default GeographicDistribution;
