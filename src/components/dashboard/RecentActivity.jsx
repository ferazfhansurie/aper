import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Text,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  Clock,
  TrendingUp,
  DollarSign,
  Calendar
} from 'lucide-react';

const MotionCard = motion(Card);

const RecentActivity = ({ data }) => {
  const bgColor = 'rgba(59, 130, 246, 0.05)';
  const borderColor = 'rgba(59, 130, 246, 0.2)';

  const getActivityColor = (type) => {
    switch (type) {
      case 'Fund Closing':
        return 'green';
      case 'Investment':
        return 'blue';
      case 'Exit':
        return 'purple';
      case 'Fund Raising':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'Fund Closing':
        return <TrendingUp size={16} />;
      case 'Investment':
        return <DollarSign size={16} />;
      case 'Exit':
        return <TrendingUp size={16} />;
      case 'Fund Raising':
        return <DollarSign size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const formatAmount = (amount) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}B`;
    } else if (amount >= 1) {
      return `$${amount.toFixed(1)}B`;
    } else {
      return `$${(amount * 1000).toFixed(0)}M`;
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Recent';
      }
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      return 'Recent';
    }
  };

  const getTimeAgo = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Recently';
      }
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return '1 day ago';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
      return `${Math.floor(diffDays / 365)} years ago`;
    } catch (error) {
      return 'Recently';
    }
  };

  // Filter out activities with no data
  const validActivities = data.filter(activity => 
    activity.name && 
    activity.name !== 'Unknown' && 
    activity.name.trim() !== ''
  );

  // If no valid activities, show a message
  if (validActivities.length === 0) {
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
                Recent Activity
              </Text>
              <Text fontSize="sm" color="blue.500">
                Latest investment activities and updates
              </Text>
            </Box>
            <Box textAlign="center" p={8}>
              <Text fontSize="md" color="gray.500">
                No recent activity data available at the moment
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
              Recent Activity
            </Text>
            <Text fontSize="sm" color="blue.500">
              Latest investment activities and updates
            </Text>
          </Box>

          {/* Activity List */}
          <VStack spacing={4} align="stretch" flex="1">
            {validActivities.map((activity, index) => {
              const color = getActivityColor(activity.type);
              const Icon = getActivityIcon(activity.type);

              return (
                <MotionCard
                  key={`${activity.name}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  bg="white"
                  border="1px solid"
                  borderColor={`${color}.200`}
                  borderRadius="lg"
                  _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                >
                  <CardBody p={4}>
                    <VStack spacing={3} align="stretch">
                      <HStack justify="space-between">
                        <HStack spacing={3}>
                          <Box
                            p={2}
                            bg={`${color}.100`}
                            color={`${color}.600`}
                            borderRadius="md"
                          >
                            {Icon}
                          </Box>
                          <VStack align="start" spacing={0}>
                            <Text fontSize="md" fontWeight="bold" color="blue.700">
                              {activity.name}
                            </Text>
                            <Badge colorScheme={color} variant="subtle" size="sm">
                              {activity.type}
                            </Badge>
                          </VStack>
                        </HStack>
                        <VStack align="end" spacing={1}>
                          <Text fontSize="lg" fontWeight="bold" color="blue.600">
                            {formatAmount(activity.amount)}
                          </Text>
                          <Text fontSize="xs" color="blue.400">
                            {getTimeAgo(activity.date)}
                          </Text>
                        </VStack>
                      </HStack>
                    </VStack>
                  </CardBody>
                </MotionCard>
              );
            })}
          </VStack>

          {/* Summary Stats */}
          <Box p={4} bg="rgba(59, 130, 246, 0.08)" borderRadius="lg" border="1px solid" borderColor="rgba(59, 130, 246, 0.2)">
            <VStack spacing={2} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="medium" color="blue.700">
                  Total Activities
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="blue.600">
                  {validActivities.length}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="medium" color="blue.700">
                  Total Value
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="blue.600">
                  {formatAmount(validActivities.reduce((sum, activity) => sum + (activity.amount || 0), 0))}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="medium" color="blue.700">
                  Activity Types
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="blue.600">
                  {new Set(validActivities.map(activity => activity.type)).size}
                </Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </CardBody>
    </MotionCard>
  );
};

export default RecentActivity;
