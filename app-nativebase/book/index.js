import React, { Component } from 'react';
import { View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Header, Body, Content, Button, Card, CardItem, Icon, H3, Text } from 'native-base';


import img_book from '../../assets/book.png'; 

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
	      <Card>
	        <CardItem header>
	          <H3>
	            {book_name}
	          </H3>
	        </CardItem>
            <CardItem cardBody>
              <Image source={img_book} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
	         <CardItem>
	          <Body>
	          <Text>
	            {book_media}, {book_isbn}
	          </Text>
	          </Body>
	          </CardItem>
	        <CardItem footer>
	          <Button
	            // this is how we use react navigation from included pages
	            // we are passing the name, mediaType and isbn of each book to the Book Screen
	            onPress={() => this.props.navigation.navigate("Book", {"name": book_name, "mediaType": book_media, "isbn": book_isbn})}
	            bordered
	          >
	            <Text>Add to my favourites</Text>
	          </Button>
	        </CardItem>
	      </Card>
		)		
	}
}
