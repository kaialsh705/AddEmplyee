import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './routes/HomeStack'
import {
  SafeAreaView,
  ScrollView,
  View,Text
} from 'react-native';

function App() {
  return (
        <NavigationContainer>
          <HomeStack/>
        </NavigationContainer>
  );
}

export default App;
