// This demo uses React Navigation
// We use React Navigation to manage navigation between screens in our App

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// break your screens out to separate pages for readability
import Book from './app/book';
import Home from './app/home';
import API from './app/api';

// this always needs to be in your App.js file for react navigation
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

  // method to load resources and make API calls for splashscreen
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
      return null
    }

  	return (
	    <NavigationContainer>
	      <Stack.Navigator>
	        <Stack.Screen name="Home" component={Home} />
	        <Stack.Screen name="API" component={API} />
          <Stack.Screen name="Book" component={Book} />
	      </Stack.Navigator>
	    </NavigationContainer>
	  );
	}
}

	// Put any code you need to prepare your app in these functions
	// for splashscreen
	async function performAPICalls() {}
	async function downloadAssets() {}

