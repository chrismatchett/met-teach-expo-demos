import React, { Component } from 'react';
import { View, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Header, Body, Content, Button, Card, CardItem, Icon, H3, Text } from 'native-base';


import img_book from '../../assets/book.png'; 

export default class Book extends Component {

	state = {
		book_name: this.props.route.params.name,
		book_media: this.props.route.params.mediaType,
		book_isbn: this.props.route.params.isbn
	}



		// get the existing favourites from local storage
		storeFavourite = async (name, mediaType, isbn) => {

			let favourites
			let data = {"name": name, "mediaType": mediaType, "isbn": isbn}

		  try {
		    const stored_favourites = await AsyncStorage.getItem('@favourite_books')

		    // if there is nothing in local storage create an empty array to add to later
		    if(stored_favourites != null){
		    	favourites = JSON.parse(stored_favourites)
		    }  else {
		    	favourites = []
		    }
		    
		    // now the local storage has been retrieved try to add a new item to localstorage
		    try {
		  		// add the new favourite to the data from local storage
		    	favourites.push(data)
		    	await AsyncStorage.setItem('@favourite_books', JSON.stringify(favourites))
		    	// return to the home screen
					this.props.navigation.navigate("Home")
		  	} catch (e) {
		    	Alert.alert(JSON.stringify(e))
		  	}

		  } catch(e) {
		    	Alert.alert(JSON.stringify(e))
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
	            onPress={() => this.storeFavourite(book_name, book_media, book_isbn)}
	            bordered
	          >
	            <Text>Add to my favourites</Text>
	          </Button>
	        </CardItem>
	      </Card>
		)		
	}
}
