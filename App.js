import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import HomePage from './features/home/view/HomePage';
import RenderQuestion from './features/quiz/view/renderQuestion';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <RenderQuestion id={1} />
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
