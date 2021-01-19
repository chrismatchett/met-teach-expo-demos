import React, { Component } from 'react';
import { View, SafeAreaView, FlatList, Alert} from 'react-native';
import { Container, Header, Body, Content, Button, Icon, List, ListItem, H3, Text } from 'native-base';
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

	componentDidUpdate() {
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

	removeBook = async(book) => {
	    try{
	        let books = await AsyncStorage.getItem('@favourite_books');
	        let arrBooks = JSON.parse(books)
	        
	        alteredBooks = arrBooks.filter(function(e){
	        	return e.name !== book.name
					})

					// 'Alert' is a good way to test your code.
	        // Comment out the AsyncStorage.setItem and this.setState
	        // code until you are happy that book and alteredBooks 
	        // have the values you expect.
					// Alert.alert("Altered", JSON.stringify({book: book, altered: alteredBooks}))

	        AsyncStorage.setItem('@favourite_books', JSON.stringify(alteredBooks));
	        this.setState({
	           books:alteredBooks
	        })
	    }
	    catch(error){
	        Alert.alert("Error", JSON.stringify(error))
	    }
	}

	// create a nice display for Flatlist
  renderItem = ({ item }) => {
    return(
    	<ListItem>
    		<Text>{item.name}</Text>
				<Button
					// this is how we use react navigation from included pages
					onPress={() => this.removeBook(item)}
					iconLeft
					transparent
				>
				<Icon name='trash' style={{fontSize: 24, color: 'gray'}} />
				<Text>&nbsp;</Text>
				</Button>
    	</ListItem>
    	)
  }

  renderFooter = () => {
  	return(
			<Button
				// this is how we use react navigation from included pages
				onPress={() => this.props.navigation.navigate("API")}
				block
			>
			<Text>View all the GOT Books</Text>
			</Button> 
		) 	
  }

	render(){

		// get stored_favourites from state
		const {stored_favourites} = this.state
		let arrStoredFavourites = JSON.parse(stored_favourites)

		return (
    <Container>

    		<H3 style={{padding: 20}}>My Favourite GOT Books</H3>
		      <FlatList
		        data={arrStoredFavourites}
		        renderItem={this.renderItem}
		        keyExtractor={item => item.isbn}
		        ListFooterComponent={this.renderFooter}
		      />


    </Container>
		)}
	}
