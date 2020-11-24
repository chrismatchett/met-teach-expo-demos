// This demo tests our knowledge of Expo, Nativebase and React Navigation
// We will create two screens and pass data between our App's Home and Welcome screen

import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Grid, Row, Col, Button, Input, Item, Thumbnail, H1 } from 'native-base';

import logo from './assets/pizza.jpg';

function HomeScreen({ navigation }) {
  const [text, setText] = React.useState('');

  return (
    <Container>
        <Grid>
          <Row>
            <Col style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'olive'}}>
             <Image source={logo} style={{ width: 280, height: 180 }} /> 
            </Col>
          </Row>
          <Row>
            <Col style={{alignItems: 'center', justifyContent: 'center', padding: 20}}>
              <H1>Mario's Pizza</H1>
              <Text>The best pizza in Belfast</Text>
            </Col>
          </Row>
          <Row>
            <Col style={{alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: 'orangered'}}>
              <Item regular>
                <Input 
                  placeholder='Email address' 
                  backgroundColor='white'
                  value={text} 
                  onChangeText={text => setText(text)}
                />
              </Item> 
              <Button onPress={() => navigation.navigate('Welcome', {myEmail: text})} block light>
                <Text>Get updates from Mario's Pizza</Text>
              </Button>
            </Col>
          </Row>
        </Grid>

    </Container>
  );
}

function WelcomeScreen({ route, navigation }) {

  const { myEmail } = route.params;

  return (
    <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'orangered' }}>
      <H1>Welcome to Mario's</H1>
      <Text>We will send updates to {myEmail}</Text>
    </Container>
  );
}

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
