import * as React from 'react';
import { View, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Button, Input, Item } from 'native-base';

export default function HomeScreen({ navigation }) {


  // this is React wizardy...it's called a state hook
  const [data, setData] = React.useState([]);

	const getData = (data) => {
		setData(data)
	}

	async function getMoviesFromApi() {
	  try {
	    let response = await fetch('https://reactnative.dev/movies.json');
	    let responseJson = await response.json();
	    getData(responseJson.movies)
	  } catch (error) {
	    Alert.alert("Error", JSON.stringify(error));
	  }
	}

	getMoviesFromApi()

  return (
    <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Text>{JSON.stringify(data[0])}</Text>
    </Container>
  );
}