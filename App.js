// This demo uses React Navigation
// We use React Navigation to manage navigation between screens in our App

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './app/home';
import API from './app/api';

// this last section always needs to be in your App.js file
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="API" component={API} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
