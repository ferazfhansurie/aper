import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Text,
  VStack,
  HStack,
  Badge,
  Progress,
  useColorModeValue,
  Grid,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  Trophy,
  TrendingUp,
  Target,
  Award
} from 'lucide-react';

const MotionCard = motion(Card);

const FundPerformance = ({ data }) => {
  const bgColor = 'rgba(59, 130, 246, 0.05)';
  const borderColor = 'rgba(59, 130, 246, 0.2)';

  // Filter out funds with no names or invalid data
  const validFunds = (data.topPerformers || []).filter(fund => 
    fund.name && 
    fund.name !== 'Unknown Fund' && 
    fund.name !== 'null' && 
    fund.name.trim() !== ''
  );

  // If no valid funds, show a message
  if (validFunds.length === 0) {
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
              <HStack justify="center" mb={2}>
                <Box
                  p={2}
                  bg="yellow.100"
                  color="yellow.600"
                  borderRadius="lg"
                >
                  <Trophy size={20} />
                </Box>
                <Text fontSize="xl" fontWeight="bold" color="gray.800">
                  Fund Performance
                </Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                Top performing funds by IRR and multiple
              </Text>
            </Box>
            <Box textAlign="center" p={8}>
              <Text fontSize="md" color="gray.500">
                No fund performance data available at the moment
              </Text>
            </Box>
          </VStack>
        </CardBody>
      </MotionCard>
    );
  }

  const getPerformanceColor = (irr) => {
    if (irr >= 25) return 'green';
    if (irr >= 20) return 'blue';
    if (irr >= 15) return 'yellow';
    return 'gray';
  };

  const getPerformanceBadge = (irr) => {
    if (irr >= 25) return 'Top Performer';
    if (irr >= 20) return 'Strong';
    if (irr >= 15) return 'Good';
    return 'Average';
  };

  const getMultipleColor = (multiple) => {
    if (multiple >= 3) return 'green';
    if (multiple >= 2.5) return 'blue';
    if (multiple >= 2) return 'yellow';
    return 'gray';
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
            <HStack justify="center" mb={2}>
              <Box
                p={2}
                bg="yellow.100"
                color="yellow.600"
                borderRadius="lg"
              >
                <Trophy size={20} />
              </Box>
              <Text fontSize="xl" fontWeight="bold" color="gray.800">
                Fund Performance
              </Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">
              Top performing funds by IRR and multiple
            </Text>
          </Box>

          {/* Top Performers */}
          <VStack spacing={4} align="stretch" flex="1">
            {validFunds.map((fund, index) => {
              const irrColor = getPerformanceColor(fund.irr);
              const multipleColor = getMultipleColor(fund.multiple);
              const isTop = index === 0;

              return (
                <MotionCard
                  key={fund.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  bg={isTop ? 'yellow.50' : 'white'}
                  border="1px solid"
                  borderColor={isTop ? 'yellow.200' : borderColor}
                  borderRadius="lg"
                  _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                >
                  <CardBody p={4}>
                    <VStack spacing={3} align="stretch">
                      {/* Fund Header */}
                      <HStack justify="space-between">
                        <HStack>
                          {isTop && (
                            <Box
                              p={1}
                              bg="yellow.100"
                              color="yellow.600"
                              borderRadius="md"
                            >
                              <Award size={16} />
                            </Box>
                          )}
                          <VStack align="start" spacing={0}>
                            <Text fontSize="sm" fontWeight="bold" color="gray.800">
                              {fund.name}
                            </Text>
                            <Text fontSize="xs" color="gray.600">
                              Fund Performance
                            </Text>
                          </VStack>
                        </HStack>
                        <Badge colorScheme={irrColor} variant="subtle" size="sm">
                          {getPerformanceBadge(fund.irr)}
                        </Badge>
                      </HStack>

                      {/* Performance Metrics */}
                      <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                        <Box p={3} bg={`${irrColor}.50`} borderRadius="md" border="1px solid" borderColor={`${irrColor}.200`}>
                          <VStack spacing={1} align="center">
                            <HStack>
                              <TrendingUp size={14} color={irrColor === 'green' ? 'green' : irrColor === 'blue' ? 'blue' : irrColor === 'yellow' ? 'orange' : 'gray'} />
                              <Text fontSize="xs" fontWeight="medium" color="gray.700">IRR</Text>
                            </HStack>
                            <Text fontSize="lg" fontWeight="bold" color="gray.800">
                              {fund.irr.toFixed(1)}%
                            </Text>
                            <Progress 
                              value={Math.min((fund.irr / 30) * 100, 100)} 
                              colorScheme={irrColor} 
                              size="xs" 
                              borderRadius="full"
                              w="100%"
                            />
                          </VStack>
                        </Box>

                        <Box p={3} bg={`${multipleColor}.50`} borderRadius="md" border="1px solid" borderColor={`${multipleColor}.200`}>
                          <VStack spacing={1} align="center">
                            <HStack>
                              <Target size={14} color={multipleColor === 'green' ? 'green' : multipleColor === 'blue' ? 'blue' : multipleColor === 'yellow' ? 'orange' : 'gray'} />
                              <Text fontSize="xs" fontWeight="medium" color="gray.700">Multiple</Text>
                            </HStack>
                            <Text fontSize="lg" fontWeight="bold" color="gray.800">
                              {fund.multiple.toFixed(1)}x
                            </Text>
                            <Progress 
                              value={Math.min((fund.multiple / 4) * 100, 100)} 
                              colorScheme={multipleColor} 
                              size="xs" 
                              borderRadius="full"
                              w="100%"
                            />
                          </VStack>
                        </Box>
                      </Grid>
                    </VStack>
                  </CardBody>
                </MotionCard>
              );
            })}
          </VStack>

          {/* Performance Summary */}
          <Box p={4} bg="gray.50" borderRadius="lg" border="1px solid" borderColor="gray.200">
            <VStack spacing={2} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="medium" color="gray.700">
                  Top Funds
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="gray.800">
                  {validFunds.length}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="medium" color="gray.700">
                  Avg IRR
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="gray.800">
                  {Math.round(validFunds.reduce((sum, fund) => sum + fund.irr, 0) / validFunds.length)}%
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="medium" color="gray.700">
                  Avg Multiple
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="gray.800">
                  {(validFunds.reduce((sum, fund) => sum + fund.multiple, 0) / validFunds.length).toFixed(1)}x
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="medium" color="gray.700">
                  Best Performer
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="gray.800">
                  {validFunds[0]?.name.split(' ').slice(0, 2).join(' ') || 'N/A'}
                </Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </CardBody>
    </MotionCard>
  );
};

export default FundPerformance;
