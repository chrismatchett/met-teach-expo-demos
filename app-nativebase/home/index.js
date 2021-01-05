import React, { Component } from 'react';
import { View, SafeAreaView, FlatList} from 'react-native';
import { Container, Header, Body, Content, Button, List, ListItem, H3, Text } from 'native-base';
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

	// create a nice display for Flatlist
  renderItem = ({ item }) => {
    return(<ListItem><Text>{item.name}</Text></ListItem>);
  };

	render(){

		// get stored_favourites from state
		const {stored_favourites} = this.state
		let arrStoredFavourites = JSON.parse(stored_favourites)

		return (
    <Container>
    	<Content>
    		<H3 style={{padding: 20}}>My Favourite GOT Books</H3>
    		<List>
		      <FlatList
		        data={arrStoredFavourites}
		        renderItem={this.renderItem}
		        keyExtractor={item => item.isbn}
		      />
	      </List>
				<Button
					// this is how we use react navigation from included pages
					onPress={() => this.props.navigation.navigate("API")}
					transparent
					style={{marginTop: 10, padding: 5}}
				>
				<Text>View all the GOT Books</Text>
				</Button>
			</Content>
    </Container>
		)}
	}
