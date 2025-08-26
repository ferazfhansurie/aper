import { Box, Heading, Button, FormControl, FormLabel, Input, HStack, Textarea, Select, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, SimpleGrid, Text, Divider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const ResultDetails = ({ selectedResult, handleUpdate, handleDelete, onClose }) => {
  const [fieldsConfig, setFieldsConfig] = useState([]);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch field configuration from Firebase
    const fetchFieldConfig = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/api/fields/config');
        const data = await response.json();
        setFieldsConfig(data);
      } catch (error) {
        console.error('Error fetching field configuration:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFieldConfig();
  }, []);

  useEffect(() => {
    // Initialize form data with selected result
    if (selectedResult) {
      setFormData(selectedResult);
    }
  }, [selectedResult]);

  const handleFieldChange = (fieldName, value) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value
    }));
  };

  const handleSave = () => {
    handleUpdate(selectedResult.id, formData);
  };

  // Group fields by category for better organization
  const getFieldGroups = () => {
    const groups = {
      'Company Information': ['Company', 'Company (Chinese)', 'Displayed Investee Name (English)', 'Background', 'Web site', 'Investee Established Year'],
      'Deal Details': ['Deal Nature', 'Stage of Investment', 'Deal Size_USD m', 'Deal Size_Local Currency m', 'Currency Code_PE Equity Amt', 'Invest Year', 'Invest Month'],
      'Location Information': ['Country Grouped at Investment Date', 'Country Region at Investment Date Level 2', 'Location at Investment Date'],
      'Industry Classification': ['Industry', 'SubIndustry', 'Macro Industry'],
      'Investors': ['Displayed Investor Name to Public', 'Investor Type'],
      'Other Information': []
    };
    
    // Create a set of all field names that are already categorized
    const categorizedFields = new Set();
    Object.values(groups).forEach(fields => {
      fields.forEach(field => categorizedFields.add(field));
    });
    
    // Add all other fields to 'Other Information'
    if (selectedResult) {
      Object.keys(selectedResult).forEach(field => {
        if (!categorizedFields.has(field)) {
          groups['Other Information'].push(field);
        }
      });
    }
    
    return groups;
  };

  const renderField = (field) => {
    // Skip rendering if field name is 'id' or field doesn't exist in formData
    if (field === 'id' || !formData.hasOwnProperty(field)) {
      return null;
    }
    
    const value = formData[field] || '';
    // Determine field type based on value or config
    const fieldConfig = fieldsConfig.find(f => f.name === field) || {};
    const fieldType = fieldConfig.type || 'text';
    
    return (
      <FormControl key={field} mb={4}>
        <FormLabel fontWeight="bold">{fieldConfig.label || field}</FormLabel>
        {fieldType === 'textarea' ? (
          <Textarea
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            height={fieldConfig.rows ? `${fieldConfig.rows * 24}px` : 'auto'}
          />
        ) : fieldType === 'number' ? (
          <NumberInput 
            value={value} 
            step={fieldConfig.step || 1}
            onChange={(valueString) => handleFieldChange(field, parseFloat(valueString))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        ) : fieldType === 'select' ? (
          <Select
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
          >
            {fieldConfig.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        ) : (
          <Input
            type={fieldType}
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
          />
        )}
      </FormControl>
    );
  };

  if (isLoading || !selectedResult) {
    return (
      <Box w="100%" p={6} bg="white" borderRadius="md" boxShadow="md">
        <Text>Loading details...</Text>
      </Box>
    );
  }

  const fieldGroups = getFieldGroups();

  return (
    <Box w="100%" p={6} bg="white" borderRadius="md" boxShadow="md" maxHeight="80vh" overflowY="auto">
      <Button mb={4} onClick={onClose}>Back to List</Button>
      <Heading size="md" mb={6}>
        {formData.Company || formData['Displayed Investee Name (English)'] || 'Company Details'}
      </Heading>

      {Object.entries(fieldGroups).map(([groupName, fields]) => (
        fields.length > 0 && (
          <Box key={groupName} mb={6}>
            <Heading size="sm" mb={3}>{groupName}</Heading>
            <SimpleGrid columns={[1, null, 2]} spacing={4}>
              {fields.map(field => renderField(field))}
            </SimpleGrid>
            <Divider mt={4} />
          </Box>
        )
      ))}

      <HStack spacing={4} mt={8}>
        <Button colorScheme="red" onClick={() => handleDelete(selectedResult.id)}>
          Delete
        </Button>
        <Button colorScheme="blue" onClick={handleSave}>
          Save Changes
        </Button>
      </HStack>
    </Box>
  );
};

export default ResultDetails;