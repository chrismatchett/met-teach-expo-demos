// This demo uses React Navigation
// We use React Navigation to manage navigation between screens in our App

import React, { Component, useCallback, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// break your screens out to separate pages for readability
import HomeScreen from './app/hn_home';
import StoryScreen from './app/hn_story';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Top 10 HN Stories' }}
        />
        <Stack.Screen
          name="Story"
          component={StoryScreen}
          options={{ title: 'Story' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
