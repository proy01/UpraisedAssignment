import { View, Text, StyleSheet, Dimensions } from "react-native";
import * as Progress from 'react-native-progress';


export const NumberCircle = (props) => {
    return (
      <View style={styles.circle}>
        <Progress.Circle
          size={120}
          progress={props.current / props.total}
          thickness={8}
          color="#44B77B"
          unfilledColor="#F3F4FA"
          borderWidth={0}
          showsText
          strokeCap="round"
          formatText={() => (
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.currentPage}>{`${props.current}`}</Text>
              <Text style={styles.totalQuestion}>/{props.total}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    circle: {
        alignSelf: 'center',
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 3,
        borderRadius: Dimensions.get('window').width / 3 / 2,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -60,
      },
    currentPage: {
        fontSize: 40,
        fontWeight: 'bold',
        fontStyle: 'italic',
      },
      totalQuestion: {
        fontSize: 24,
        color: '#7C827E',
        fontWeight: 'bold',
        fontStyle: 'italic',
        alignSelf: 'flex-end',
      },
  })