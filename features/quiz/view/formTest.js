import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const options = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
];

const CorrectOptionIndex = 3; // Index of the correct option (zero-based)

const Form = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (index) => {
    {selectedOption !== index ? (setSelectedOption(index)) : (setSelectedOption(null))};
  };

  const renderOptions = () => {
    return options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.optionButton,
          selectedOption === index && styles.selectedOptionButton,
        ]}
        onPress={() => handleOptionPress(index)}
      >
        {selectedOption === index ? (
          <View style={styles.selectedOption}>
            <MaterialIcons name="check" size={24} color="#FFF" />
          </View>
        ) : (
          <View style={styles.emptyOption} />
        )}
        <Text
          style={[
            styles.optionText,
            selectedOption === index && styles.selectedOptionText,
          ]}
        >
          {option}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>Select the correct option:</Text>
      {renderOptions()}
      <Text style={styles.selectedOptionText}>
        Selected Option: {selectedOption !== null ? options[selectedOption] : 'None'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    width: 200,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedOptionButton: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  selectedOption: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyOption: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
});

export default Form;
