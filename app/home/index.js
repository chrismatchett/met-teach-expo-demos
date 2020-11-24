import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';

export default class Home extends Component {

	render(){
		return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button
			  onPress={() => this.props.navigation.navigate("API")}
			  title="Go to API Page"
			/>
		</View>
		)		
	}

}
