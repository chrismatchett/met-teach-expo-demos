import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';

export default class Book extends Component {
	
	render(){

		const book_name = this.props.route.params.name
		const book_media = this.props.route.params.mediaType
		const book_isbn = this.props.route.params.isbn

		return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>{book_name}</Text>
			<Text>{book_media}</Text>
			<Text>{book_isbn}</Text>	
			<Button
			  // this is how we use react navigation from included pages
			  onPress={() => this.props.navigation.navigate("Home")}
			  title="Add to my favourites"
			/>
		</View>
		)		
	}
}
