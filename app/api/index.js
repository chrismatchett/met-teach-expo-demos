import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';

export default class Api extends Component {

  state = {
    loading: true,
    error: false,
    books: [],
  }

  componentWillMount = async () => {
    try {
      const response = await fetch('https://www.anapioficeandfire.com/api/books')
      const books = await response.json()
      this.setState({loading: false, books})
    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }

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

