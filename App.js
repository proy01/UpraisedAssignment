import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import HomePage from './features/home/view/HomePage';
import YourComponent from './features/quiz/view/quizTest';
import Form from './features/quiz/view/formTest';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        {/* <LinearGradient colors={['transparent', 'rgba(175, 156, 243, 1)']}  locations={[0.1, 0.7]} style={styles.background}>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </LinearGradient> */}
        {/* <HomePage /> */}
        <YourComponent />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    // backgroundColor: '#000',
  },
  // background: {
  //   flex: 1,
  //   width: '100%',
  //   // alignItems: 'center',
  //   // justifyContent: 'center',
  //   // height: 200,
  // }
});
