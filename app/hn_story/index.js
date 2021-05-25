import React, {useEffect} from 'react';
import { Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HTMLView from 'react-native-htmlview';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Content, Card, CardItem, Body} from 'native-base';

//AsyncStorage.removeItem('@storage_Key')

const StoryScreen = ({ route, navigation }) => {

  // set the state of default variables...in this case empty arrays until updated
  const {id} = route.params;
  const url = 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty'
  const [story, setStory] = React.useState("");


  const getStory = (story) => {
    setStory(story)
  }

  const getStoryFromHN = async() =>{
    try {

      let response = await fetch(url);
      let json = await response.json();
      getStory(json); 
    } catch (error) {
      Alert.alert("Error", error.message)
    }
  }

  getStoryFromHN()

  return (
    <Container>
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Text>{story.title}</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <HTMLView
                value={story.text}          
                onLinkPress={(url) => console.log('clicked link: ', url)}
              />
            </Body>
          </CardItem>
          <CardItem footer bordered>
            <Text>{story.by}</Text>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}

export default StoryScreen;



