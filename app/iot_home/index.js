import React from "react"
import {Alert, FlatList} from "react-native"
import {
  View,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Button,
  Box,
  Text,
  Center,
  NativeBaseProvider
} from "native-base"

import { Client, Message } from 'react-native-paho-mqtt';

const HomeScreen = ({ route, navigation }) => {
const [data, setData] = React.useState("on"); 
const [devices, setDevices] = React.useState([])

//Set up an in-memory alternative to global localStorage
const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key];
  },
};

// Create a client instance
const client = new Client({ uri: 'ws://192.168.0.221:9001/', clientId: 'clientId', storage: myStorage });

// set event handlers
client.on('connectionLost', (responseObject) => {
  if (responseObject.errorCode !== 0) {
    console.log(responseObject.errorMessage);
  }
});
client.on('messageReceived', (message) => {
  let jsonDevices = JSON.parse(message.payloadString);
  //setDevices(jsonDevices.filter(device => device.definition != null)); 

  //console.log(message.payloadString.JSON);
  //console.log(result.length)
});

// connect the client
client.connect()
  .then(() => {
    // Once a connection has been made, make a subscription and send a message.
    console.log('onConnect');
    return client.subscribe('zigbee2mqtt/bridge/devices');
    //return client.publish('zigbee2mqtt/0x001788010b2efdb0/set', {"state": "off"})

  })
  .then(() => {
    const message = new Message(data);
    message.destinationName = 'zigbee2mqtt/0x001788010b2efdb0/set';
    client.send(message);
    //console.log(message)
  })
  .catch((responseObject) => {
    console.log(responseObject)
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
  })
;

function toggleLight(){
  setData("on")
}


  return (
    <View>
      <Button onPress={() => { setData("on")}}>
        <Text>Turn On</Text>
      </Button>
      <Button onPress={() => { setData("off")}}>
        <Text>Turn Off</Text>
      </Button>
      <Text>{data}</Text>
    </View>
  );
}

export default HomeScreen;