/*
  --This App connects to Iot Devices using Zigbee2MQTT as a Bridge--
  The code below sets up navigation between screens using react-navigation.
  The first Stack.Screen in NavigationConitainer will be the Home Screen.
*/

import React, { Component, useCallback, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens are places in separate files for readability
import HomeScreen from './app/iot_home';
import BridgeScreen from './app/iot_bridge';
import DeviceScreen from './app/iot_device';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="Bridge"
          component={BridgeScreen}
          options={{ title: 'Bridge' }}
        />
        <Stack.Screen
          name="Device"
          component={DeviceScreen}
          options={{ title: 'Device' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
