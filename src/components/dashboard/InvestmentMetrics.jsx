import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Text,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Globe,
  Building2,
  DollarSign,
  Percent,
  Zap,
  Target
} from 'lucide-react';

const MotionCard = motion(Card);

const InvestmentMetrics = ({ data }) => {
  const bgColor = 'rgba(59, 130, 246, 0.05)';
  const borderColor = 'rgba(59, 130, 246, 0.2)';

  const MetricCard = ({ title, value, subtitle, color = 'blue', progress, icon: Icon }) => (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="xl"
      backdropFilter="blur(20px)"
      _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
    >
      <CardBody p={6}>
        <VStack spacing={4} align="stretch">
          <HStack justify="center" spacing={3}>
            {Icon && (
              <Box
                p={2}
                bg={`${color}.100`}
                color={`${color}.600`}
                borderRadius="lg"
              >
                <Icon size={20} />
              </Box>
            )}
            <Text fontSize="lg" fontWeight="bold" color="blue.700" textAlign="center">
              {title}
            </Text>
          </HStack>
          
          <Stat>
            <StatNumber color="blue.600" fontSize="3xl" fontWeight="bold" textAlign="center" mb={2}>
              {value}
            </StatNumber>
            {subtitle && (
              <StatHelpText color="blue.500" fontSize="sm" textAlign="center" mb={3}>
                {subtitle}
              </StatHelpText>
            )}
            {progress && (
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="xs" color="blue.600">Progress</Text>
                  <Text fontSize="xs" color="blue.600">{progress}%</Text>
                </HStack>
                <Progress 
                  value={progress} 
                  colorScheme={color} 
                  size="sm" 
                  borderRadius="full"
                />
              </Box>
            )}
          </Stat>
        </VStack>
      </CardBody>
    </MotionCard>
  );

  const calculateProgress = (value, maxValue) => {
    return Math.round((value / maxValue) * 100);
  };

  // Format numbers with proper rounding
  const formatNumber = (num) => {
    if (num === 0) return '0';
    if (num < 1) return num.toFixed(2);
    if (num < 10) return num.toFixed(1);
    return Math.round(num).toLocaleString();
  };

  // Only show deal distribution if there are actual deals
  const hasDeals = data.crossBorderDeals > 0 || data.localDeals > 0;
  
  // Only show sector highlights if there are actual sector deals
  const hasSectorDeals = data.techDeals > 0 || data.healthcareDeals > 0 || data.realEstateDeals > 0;

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Text fontSize="2xl" fontWeight="bold" color="blue.700" mb={2}>
            Market Insights
          </Text>
          <Text fontSize="md" color="blue.500">
            Key performance indicators and deal analysis
          </Text>
        </Box>

        {/* Deal Size Metrics */}
        <MetricCard
          title="Average Deal Size"
          value={`$${formatNumber(data.avgDealSize)}M`}
          subtitle="Per investment transaction"
          color="green"
          progress={calculateProgress(data.avgDealSize, 100)}
          icon={DollarSign}
        />

        {/* Fund Size Metrics */}
        <MetricCard
          title="Average Fund Size"
          value={`$${formatNumber(data.avgFundSize)}M`}
          subtitle="Per private equity fund"
          color="blue"
          progress={calculateProgress(data.avgFundSize, 2000)}
          icon={Target}
        />

        {/* Deal Distribution - Only show if there are deals */}
        {hasDeals && (
          <Card bg={bgColor} border="1px solid" borderColor={borderColor} borderRadius="xl">
            <CardBody p={6}>
              <VStack spacing={4} align="stretch">
                <HStack justify="center" spacing={3}>
                  <Box
                    p={2}
                    bg="purple.100"
                    color="purple.600"
                    borderRadius="lg"
                  >
                    <Globe size={20} />
                  </Box>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800">
                    Deal Distribution
                  </Text>
                </HStack>
                
                <VStack spacing={3} align="stretch">
                  <HStack justify="space-between">
                    <HStack spacing={2}>
                      <Badge colorScheme="purple" variant="subtle">Cross-border</Badge>
                      <Text fontSize="sm" color="gray.600">Deals</Text>
                    </HStack>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800">
                      {data.crossBorderDeals.toLocaleString()}
                    </Text>
                  </HStack>
                  <Progress 
                    value={calculateProgress(data.crossBorderDeals, data.crossBorderDeals + data.localDeals)} 
                    colorScheme="purple" 
                    size="sm" 
                    borderRadius="full"
                  />
                  
                  <HStack justify="space-between">
                    <HStack spacing={2}>
                      <Badge colorScheme="blue" variant="subtle">Local</Badge>
                      <Text fontSize="sm" color="gray.600">Deals</Text>
                    </HStack>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800">
                      {data.localDeals.toLocaleString()}
                    </Text>
                  </HStack>
                  <Progress 
                    value={calculateProgress(data.localDeals, data.crossBorderDeals + data.localDeals)} 
                    colorScheme="blue" 
                    size="sm" 
                    borderRadius="full"
                  />
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Sector Highlights - Only show if there are sector deals */}
        {hasSectorDeals && (
          <Card bg={bgColor} border="1px solid" borderColor={borderColor} borderRadius="xl">
            <CardBody p={6}>
              <VStack spacing={4} align="stretch">
                <HStack justify="center" spacing={3}>
                  <Box
                    p={2}
                    bg="orange.100"
                    color="orange.600"
                    borderRadius="lg"
                  >
                    <Building2 size={20} />
                  </Box>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800">
                    Sector Highlights
                  </Text>
                </HStack>
                
                <VStack spacing={3} align="stretch">
                  {data.techDeals > 0 && (
                    <HStack justify="space-between">
                      <HStack spacing={2}>
                        <Badge colorScheme="blue" variant="subtle">Technology</Badge>
                        <Text fontSize="sm" color="gray.600">Deals</Text>
                      </HStack>
                      <Text fontSize="sm" fontWeight="bold" color="gray.800">
                        {data.techDeals.toLocaleString()}
                      </Text>
                    </HStack>
                  )}
                  
                  {data.healthcareDeals > 0 && (
                    <HStack justify="space-between">
                      <HStack spacing={2}>
                        <Badge colorScheme="green" variant="subtle">Healthcare</Badge>
                        <Text fontSize="sm" color="gray.600">Deals</Text>
                      </HStack>
                      <Text fontSize="sm" fontWeight="bold" color="gray.800">
                        {data.healthcareDeals.toLocaleString()}
                      </Text>
                    </HStack>
                  )}
                  
                  {data.realEstateDeals > 0 && (
                    <HStack justify="space-between">
                      <HStack spacing={2}>
                        <Badge colorScheme="orange" variant="subtle">Real Estate</Badge>
                        <Text fontSize="sm" color="gray.600">Deals</Text>
                      </HStack>
                      <Text fontSize="sm" fontWeight="bold" color="gray.800">
                        {data.realEstateDeals.toLocaleString()}
                      </Text>
                    </HStack>
                  )}
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>
    </Box>
  );
};

export default InvestmentMetrics;
