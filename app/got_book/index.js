import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Book extends Component {

	state = {
		book_name: this.props.route.params.name,
		book_media: this.props.route.params.mediaType,
		book_isbn: this.props.route.params.isbn
	}

	addBookToFavourites(name, mediaType, isbn){

		let data = {"name": name, "mediaType": mediaType, "isbn": isbn}
		let favourites

		// get the existing favourites from local storage
		const getFavourites = async () => {
		  try {
		    const stored_favourites = await AsyncStorage.getItem('@favourite_books')

		    // if there is nothing in local storage create an empty array to add to later
		    if(stored_favourites != null){
		    	favourites = JSON.parse(stored_favourites)
		    }  else {
		    	favourites = []
		    }
		    // now the local storage has been retrieved try to add a new item to localstorage
		    storeFavourites(favourites)
		  } catch(e) {
		    console.log(e)
		  }
		}

		const storeFavourites = async (favourites) => {
		  try {
		  	// add the new favourite to the data from local storage
		    favourites.push(data)
		    await AsyncStorage.setItem('@favourite_books', JSON.stringify(favourites))
		    // return to the home screen
				this.props.navigation.navigate("Home")
		  } catch (e) {
		    console.log(e)
		  }
		}

		// load the function which starts the process of getting favourites from local storage
		try{
			getFavourites()
		} catch(e) {
			//error
		}
		
	}

	render(){

		const {book_name, book_media, book_isbn} = this.state

		return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>{book_name}</Text>
			<Text>{book_media}</Text>
			<Text>{book_isbn}</Text>	
			<Button
			  // this is how we use react navigation from included pages
			  onPress={() => this.addBookToFavourites(book_name, book_media, book_isbn)}
			  title="Add to my favourites"
			/>
		</View>
		)		
	}
}
