// We download data in this screen from an API
// We then loop through the downloaded data

import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Button } from 'react-native';

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
      <View key={i + 1} style={{padding: 20}}>
        <View>
          <Text>
            {i + 1}
          </Text>
        </View>
        <View>
          <Text>
            {name}
          </Text>
        </View>
        <View>
          <Text>
            {mediaType}
          </Text>
        </View>
        <View>
          <Text>
            {isbn}
          </Text>
        </View>
        <View>
          <Button
            // this is how we use react navigation from included pages
            // we are passing the name, mediaType and isbn of each book to the Book Screen
            onPress={() => this.props.navigation.navigate("Book", {"name": name, "mediaType": mediaType, "isbn": isbn})}
            title="Select"
          />
        </View>
      </View>
    )
  }

  render() {
    const {books, loading, error} = this.state

    if (loading) {
      return (
        <View>
          <ActivityIndicator animating={true} />
        </View>
      )
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

    return (
      <ScrollView>
        {books.map(this.renderBooks)}
      </ScrollView>
    )
  }
}

