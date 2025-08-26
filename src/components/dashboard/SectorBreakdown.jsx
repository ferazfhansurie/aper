import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Text,
  VStack,
  HStack,
  Progress,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  Building2,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

const MotionCard = motion(Card);

const SectorBreakdown = ({ data }) => {
  const bgColor = 'rgba(59, 130, 246, 0.05)';
  const borderColor = 'rgba(59, 130, 246, 0.2)';

  // Handle both array and object data structures
  let sectors = [];
  if (Array.isArray(data)) {
    sectors = data;
  } else if (typeof data === 'object' && data !== null) {
    sectors = Object.entries(data).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      ...value
    }));
  }

  // Filter out sectors with no data and ensure we have proper names
  const validSectors = sectors.filter(sector => 
    sector.name && 
    sector.name !== 'Unknown' && 
    sector.name !== 'null' && 
    sector.name !== 'Other' &&
    sector.deals > 0
  );

  // If no valid sectors, show a message
  if (validSectors.length === 0) {
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
                Sector Breakdown
              </Text>
              <Text fontSize="sm" color="blue.500">
                Investment distribution across industry sectors
              </Text>
            </Box>
            <Box textAlign="center" p={8}>
              <Text fontSize="md" color="gray.500">
                No sector data available at the moment
              </Text>
            </Box>
          </VStack>
        </CardBody>
      </MotionCard>
    );
  }

  // Calculate total deals and values
  const totalDeals = validSectors.reduce((sum, sector) => sum + sector.deals, 0);
  const totalValue = validSectors.reduce((sum, sector) => sum + sector.value, 0);

  const getSectorColor = (index) => {
    const colors = ['blue', 'green', 'purple', 'orange', 'teal', 'pink'];
    return colors[index % colors.length];
  };

  const getGrowthIcon = (growth) => {
    if (growth > 10) {
      return <TrendingUp size={16} color="green" />;
    } else if (growth < 5) {
      return <TrendingDown size={16} color="red" />;
    } else {
      return <Minus size={16} color="gray" />;
    }
  };

  const getGrowthColor = (growth) => {
    if (growth > 10) return 'green';
    if (growth < 5) return 'red';
    return 'gray';
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
              Sector Breakdown
            </Text>
            <Text fontSize="sm" color="blue.500">
              Investment distribution across industry sectors
            </Text>
          </Box>

          {/* Sector List */}
          <VStack spacing={4} align="stretch" flex="1">
            {validSectors.map((sector, index) => {
              const dealPercentage = Math.round((sector.deals / totalDeals) * 100);
              const valuePercentage = Math.round((sector.value / totalValue) * 100);
              const color = getSectorColor(index);

              return (
                <Box key={sector.name} p={4} bg={`${color}.50`} borderRadius="lg" border="1px solid" borderColor={`${color}.200`}>
                  <VStack spacing={3} align="stretch">
                    <HStack justify="space-between">
                      <HStack>
                        <Text fontSize="md" fontWeight="bold" color="blue.700">
                          {sector.name}
                        </Text>
                      </HStack>
                      <VStack align="end" spacing={1}>
                        <Text fontSize="sm" color="blue.600">
                          {sector.deals.toLocaleString()} deals
                        </Text>
                        <Text fontSize="sm" color="blue.600">
                          {formatValue(sector.value)}
                        </Text>
                        {sector.growth && (
                          <HStack spacing={1}>
                            {getGrowthIcon(sector.growth)}
                            <Text fontSize="xs" color={getGrowthColor(sector.growth)}>
                              {sector.growth}%
                            </Text>
                          </HStack>
                        )}
                      </VStack>
                    </HStack>

                    {/* Deal Count Progress */}
                    <Box>
                      <HStack justify="space-between" mb={1}>
                        <Text fontSize="xs" color="blue.600">Deal Volume</Text>
                        <Text fontSize="xs" color="blue.600">{dealPercentage}%</Text>
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
                        <Text fontSize="xs" color="blue.600">Investment Value</Text>
                        <Text fontSize="xs" color="blue.600">{valuePercentage}%</Text>
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
          <Box p={4} bg="rgba(59, 130, 246, 0.08)" borderRadius="lg" border="1px solid" borderColor="rgba(59, 130, 246, 0.2)">
            <VStack spacing={2} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="medium" color="blue.700">
                  Total Sectors
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="blue.600">
                  {validSectors.length}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="medium" color="blue.700">
                  Total Deals
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="blue.600">
                  {totalDeals.toLocaleString()}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="medium" color="blue.700">
                  Total Value
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="blue.600">
                  {formatValue(totalValue)}
                </Text>
              </HStack>
              {validSectors.some(s => s.growth) && (
                <HStack justify="space-between">
                  <Text fontSize="sm" fontWeight="medium" color="blue.700">
                    Avg Growth
                  </Text>
                  <Text fontSize="sm" fontWeight="bold" color="blue.600">
                    {Math.round(validSectors.reduce((sum, sector) => sum + (sector.growth || 0), 0) / validSectors.filter(s => s.growth).length)}%
                  </Text>
                </HStack>
              )}
            </VStack>
          </Box>
        </VStack>
      </CardBody>
    </MotionCard>
  );
};

export default SectorBreakdown;
