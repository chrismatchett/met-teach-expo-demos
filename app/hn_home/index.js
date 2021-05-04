import * as React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Button, Input} from 'native-base';

/*
const DATA = {
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
};
*/

const AskHN = ({ title }) => (
  <View>
    <Text>{title}</Text>
  </View>
);

export default function HomeScreen({ navigation }) {

	const [data, setData] = React.useState([]);

	const getData = (data) => {
		setData(data)
	}

	async function getMoviesFromApi() {
	  try {
	    let response = await fetch('https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty');
	    let responseJson = await response.json();
	    getData(responseJson)
	    //https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty
	  } catch (error) {
	    console.error(error);
	  }
	}

	getMoviesFromApi()

  const renderAskHN = ({ item }) => (
    <AskHN title={item} />
  );

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderAskHN}  // item, index, separator are keywords
        keyExtractor={item => item.id}
      />
    </Container>
  );
}




