/*
  --This App connects to Iot Devices using Zigbee2MQTT as a Bridge--
  The code below collects the URI of the Bridge.
  The user experience could be improved by storing the URI in local storage.
*/

import React, {useEffect, useState} from "react"
import {
  Container,
  H1,
  Text,
  Item,
  Input,
  Button
} from "native-base"

const HomeScreen = ({route, navigation}) => {

  const [text, setText] = useState(""); 

  return(
    <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue' }}>
      <Item regular>
        <Input 
        placeholder='192.168.28.152:9001' 
        backgroundColor='white'
        value={text} 
        onChangeText={text => setText(text)}
        />
      </Item> 
      <Button onPress={() => navigation.navigate('Bridge', {bridge: text})} light>
        <Text>Bridge IP Address</Text>
      </Button>
    </Container>
  )
};

export default HomeScreen;
