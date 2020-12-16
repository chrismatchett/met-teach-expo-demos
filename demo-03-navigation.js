// This demo uses React Navigation
// We use React Navigation to manage navigation between screens in our App

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Button, Input, Item } from 'native-base';

function HomeScreen({ navigation }) {
  // this is React wizardy...it's called a state hook
  // text is a state and setText is a function to change text
  const [text, setText] = React.useState('');

  return (
    // In Button below react-navigation uses the onPress property
    // {() => navigation.navigate('Welcome', {myName: text})}
    // 'Welcome' is the screen referenced in line 52
    // {myName: text} allows you you to send data between pages
    // In this case the value of the text variable in line 11
    <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Item regular>
        <Input 
          placeholder='What is your name?' 
          value={text} // text const from line 13 
          onChangeText={text => setText(text)} // this is a shorthand way of writing js functions
        />
      </Item> 
      <Button onPress={() => navigation.navigate('Welcome', {myName: text, MyName: text})} block bordered primary>
        <Text>Submit</Text>
      </Button>
    </Container>
  );
}

function WelcomeScreen({ route, navigation }) {

  const { myName } = route.params;

  return (
    <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome {myName}</Text>
    </Container>
  );
}

// this last section always needs to be in your App.js file
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
