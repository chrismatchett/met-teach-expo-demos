import React, {useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Button, Input, List, ListItem, Left, Right, Icon} from 'native-base';

//AsyncStorage.removeItem('@storage_Key')

const HomeScreen = ({ navigation }) => {

	const [ids, setIds] = React.useState([]);
  const [stories, setStories] = React.useState([]);
  const [read, setRead] = React.useState([]);

	const getIds = (ids) => {
		setIds(ids)
	}

  const getStories = (stories) => {
    setStories(stories)
  }

  const getRead = (read) => {
    setRead(read)
  }

  const loadRead = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      let arrRead = [];

      if(value !== null) {
        arrRead = JSON.parse(value)
      } else {
        arrRead = [];
      }
        getRead(arrRead);
    } catch(e) {
      //
    }

  }

  const storeRead = async (id) => {
    try {
      read.push(id);
      const jsonValue = JSON.stringify(read);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      //
    }

  }


  // fetch an array of ids for the 200 most popular stories on HN
  // loop through the ids of the top 10 stories
  // fetch each story using the top 10 ids 
	const getStoriesFromHN = async() =>{
	  try {
      let arrID = [];
      let arrStories = [];

	    let responseID = await fetch('https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty');
	    let responseIDjson = await responseID.json();

	    getIds(responseIDjson); // [27107919, 27111582, 27108910, 27109067...
      arrID = responseIDjson;

      for(let i = 0; i < 10; i++){
        let url = 'https://hacker-news.firebaseio.com/v0/item/'+ arrID[i]+'.json?print=pretty'
        let responseStory = await fetch(url);
        let responseStoryjson = await responseStory.json();
        arrStories.push(responseStoryjson) // {"by" : "dhouston", "descendants" : 71, "id" : 27107919...
      }

      getStories(arrStories);
      //Alert.alert("Stories", JSON.stringify(arrStories))

	  } catch (error) {
	    //
	  }
	}

  //loadRead()
	getStoriesFromHN()
  useEffect(() => {
    loadRead();
  }, []);

  const renderAskHN = ({ item }) => (
    <ListItem button onPress={() => storeRead(item.id)}>
      <Left>
        <Text>{item.id}</Text>
      </Left>
      <Right>
      {read.includes(item.id)
        ? <Icon name="book-outline" />
        : <Icon name="arrow-redo-outline" />
      }
        
      </Right>
    </ListItem>
  );

  return (
    <Container>
    <Text>{read}</Text>
      <List>
        <FlatList
          data={stories}
          renderItem={renderAskHN}  // item, index, separator are keywords
          keyExtractor={item => item.id.toString()}
        />
      </List>
    </Container>
  );
}

export default HomeScreen;



