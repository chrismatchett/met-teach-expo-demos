import React, {useEffect, useState} from "react"
import {Alert, FlatList} from "react-native"
import {
  Container,
  Flatlist,
  Text,
  Button
} from "native-base"

import { Client, Message } from 'react-native-paho-mqtt';

const BridgeScreen = ({ route, navigation }) => {
 
  const [devices, setDevices] = useState([]);
  const {bridge} = route.params;

  let bridge_ws = 'ws://192.168.28.152:9001/';
  //const bridge_ws = 'ws://' + bridge + '/';
  
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
  const client = new Client({ uri: bridge_ws, clientId: 'clientId', storage: myStorage });

  useEffect(() => {

      // set event handlers
      client.on('connectionLost', (responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log(responseObject.errorMessage);
        }
      });

      client.on('messageReceived', (message) => {
        jsonDevices = JSON.parse(message.payloadString);
        jsonData = jsonDevices.filter(device => device.definition != null);
        //console.log(message.payloadString);
        setDevices(jsonData);
      });

      // connect the client
      client.connect()
        .then(() => {
          // Once a connection has been made, make a subscription.
          //console.log('onConnect');
          return client.subscribe('zigbee2mqtt/bridge/devices');
        })
        .catch((responseObject) => {
          console.log(responseObject)
          if (responseObject.errorCode !== 0) {
            console.log('onConnectionLost:' + responseObject.errorMessage);
          }
        });

  }, []);


  const renderItem = ({ item }) => (
    <Button onPress={() => navigation.navigate('Device', {bridge: bridge, device: item})} light>
      <Text>{item.friendly_name}</Text>
    </Button>
  );

  return ( 
    <Container>
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={item => item.friendly_name}
      />
    </Container>
  );
}


export default BridgeScreen;