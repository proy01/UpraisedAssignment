import 'react-native-gesture-handler';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './features/home/view/HomePage';
import GetQuiz from './features/quiz/GetQuiz';

import { MockServer } from './features/quiz/data/mockapi';
import GetScore from './features/score/view/getScore';

MockServer();

export default function App() {
  // This is the stack that manages navigation and allows for StackActions to take place throughout the app.
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name="Quiz" component={GetQuiz} options={{ headerShown: false }} />
          <Stack.Screen name="Score" component={GetScore} options={{ headerShown: false }} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});
