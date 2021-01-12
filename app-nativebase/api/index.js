// We download data in this screen from an API
// We then loop through the downloaded data

import React, { Component } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { Container, Header, Body, Content, Button, Card, CardItem, Icon, H3, Text } from 'native-base';

export default class Api extends Component {

  state = {
    loading: true,
    error: false,
    books: [],
  }

  componentWillMount = async () => {
    try {
      // fetch the url of api to get data
      const response = await fetch('https://www.anapioficeandfire.com/api/books')
      // wait for the data to download from the api website
      const books = await response.json()
      // now the data is downloaded we can stop the loading indicator and carry on
      this.setState({loading: false, books})
    } catch (e) {
      // we will let the user know there is an error
      this.setState({loading: false, error: true})
    }
  }

  // we can use a function here to loop over our data
  renderBooks = ({name, mediaType, isbn}, i) => {
    return (

      <Card>
        <CardItem header>
          <H3>
            {name}
          </H3>
        </CardItem>
         <CardItem>
          <Body>
          <Text>
            {mediaType}, {isbn}
          </Text>
          </Body>
          </CardItem>
        <CardItem footer>
          <Button
            // this is how we use react navigation from included pages
            // we are passing the name, mediaType and isbn of each book to the Book Screen
            onPress={() => this.props.navigation.navigate("Book", {"name": name, "mediaType": mediaType, "isbn": isbn})}
            iconRight
            bordered
          >
            <Text>{name}</Text>
            <Icon name='arrow-forward' />
          </Button>
        </CardItem>
      </Card>
    )
  }

  render() {
    const {books, loading, error} = this.state

    if (loading) {
      return (
        <Container>
          <Content style={{padding: 10}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </Content>
        </Container>
      )
    } else {
      return (
        <Container>
          <Content style={{padding: 10}}>
            {books.map(this.renderBooks)}
          </Content>
        </Container>
        )
      }      
    }

    if (error) {
      return (
        <View>
          <Text>
            Failed to load books!
          </Text>
        </View>
      )
    }


}

