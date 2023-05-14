import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export const RenderOptions = (props) => {
    return props.options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.optionButton,
          props.selectedOption === index && styles.selectedOptionButton,
        ]}
        onPress={() => props.onPress(index)}>
        {props.selectedOption === index ? (
          <View style={styles.selectedOption}>
            <MaterialIcons name="check" size={24} color="#FFF" />
          </View>
        ) : (
          <View style={styles.emptyOption} />
        )}
        <Text
          style={[
            styles.optionText,
            props.selectedOption === index && styles.selectedOptionText,
          ]}>
          {option}
        </Text>
      </TouchableOpacity>
    ));
  };

  const styles = StyleSheet.create({
    optionButton: {
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.9,
        height: 80,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        backgroundColor: '#F3F4FA',
        borderRadius: 20,
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
  })