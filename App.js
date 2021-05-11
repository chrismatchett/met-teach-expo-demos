// This demo uses React Navigation
// We use React Navigation to manage navigation between screens in our App

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// break your screens out to separate pages for readability
import HomeScreen from './app/hn_home';

const Stack = createStackNavigator();
//<Stack.Screen name="Profile" component={ProfileScreen} />

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Top HN Stories' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
