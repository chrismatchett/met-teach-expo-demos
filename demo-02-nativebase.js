// This demo uses Nativebase
// We use Nativebase to style our App

import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Content, Body, Left, Right, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Header>
          <Left style={{backgroundColor: 'silver'}}>
            <Text style={{color: '#ffffff'}}>Left</Text>
          </Left>
          <Body>
            <Text style={{color: '#ffffff'}}>My Header</Text>
          </Body>
          <Right style={{backgroundColor: 'silver'}}>
            <Text style={{color: '#ffffff'}}>Right</Text>
          </Right>
        </Header>
        <Content>
          <Grid>
            <Col>
              <Text>First Column</Text>
            </Col>
            <Col>
              <Text>Second Column</Text>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}