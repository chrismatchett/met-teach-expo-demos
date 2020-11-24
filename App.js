// This demo uses React Navigation
// We use React Navigation to manage navigation between screens in our App

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './app/home';
import API from './app/api';

// this last section always needs to be in your App.js file
const Stack = createStackNavigator();

export default class App extends Component {
  state = {
    appIsReady: false,
  }

  async componentDidMount() {
    // Prevent native splash screen from autohiding
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    this.prepareResources();
  }

  /**
   * Method that serves to load resources and make API calls
   */
  prepareResources = async () => {
    try {
      await performAPICalls();
      await downloadAssets();
    } catch (e) {
      console.warn(e);
    } finally {
      this.setState({ appIsReady: true }, async () => {
        await SplashScreen.hideAsync();
      });
    }
  };

	render(){
		if (!this.state.appIsReady) {
      return <View><Text>splash</Text></View>
    }

  	return (
	    <NavigationContainer>
	      <Stack.Navigator>
	        <Stack.Screen name="Home" component={Home} />
	        <Stack.Screen name="API" component={API} />
	      </Stack.Navigator>
	    </NavigationContainer>
	  );
	}
}

	// Put any code you need to prepare your app in these functions
	async function performAPICalls() {}
	async function downloadAssets() {}

