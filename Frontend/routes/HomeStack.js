import React from 'react';
import {View, Text} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import Index from '../screens/Emplyee/Index'
const HomeStack = () =>{
  return(
    <Stack.Navigator
      animationEnabled={true}
        screenOptions={{
          headerShown: false,
        }}>
      <Stack.Screen
        name="Index"
        component={Index}
        options={{title: 'Index'}}
      />
    </Stack.Navigator>
  )
}
export default HomeStack
