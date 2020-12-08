import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = { stored_favourites: false };
  }

	componentDidMount() {
		// load the data from local storage when the app starts
		this.getFavourites();
	}

	// get the data from local storage
	// update stored_favourites with the data retrieved
	getFavourites = async () => {
	  try {
	     const favourites = await AsyncStorage.getItem('@favourite_books');
	     this.setState({ stored_favourites: favourites });
	   } catch (error) {
	     console.log(error);
	   }
	}

	render(){

		// get stored_favourites from state
		const {stored_favourites} = this.state

		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>{stored_favourites}</Text>
				<Button
				// this is how we use react navigation from included pages
				onPress={() => this.props.navigation.navigate("API")}
				title="Go to API Screen"
				/>
			</View>
		)}
	}
