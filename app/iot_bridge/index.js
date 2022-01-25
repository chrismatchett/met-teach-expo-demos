/*
  --This App connects to Iot Devices using Zigbee2MQTT as a Bridge--
  The code below connects to the Zigbee2MQTT Bridge using Web Sockets.
  If the connection is successful a JSON list of devices is requested from the Bridge.
  Flatlist is used to loop over each of the device's returned from the Bridge.
  A button is created using the friendly_name of each device.
  Each button stores a JSON object with device specific details.
  The button can then send the device's details to the next Screen. 
*/

import React, {useEffect, useState} from "react"
import {FlatList} from "react-native";
import {
  Container,
  Text,
  Button
} from "native-base"

import { Client, Message } from 'react-native-paho-mqtt';

const BridgeScreen = ({route, navigation}) => {
 
  const [devices, setDevices] = useState([]);
  const {bridge} = route.params;

  //The URI is specified to make testing easier
  let bridge_ws = 'ws://192.168.28.152:9001/';
  //Use this URI when testing is over 
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
  
  //Create a client instance of the Web Socket / MQTT connection
  const client = new Client({ uri: bridge_ws, clientId: 'clientId', storage: myStorage });

  //We use useEffect() to stop the Screen re-rendering everytime we update the devices array
  //Putting [] as the second parameter of useEffect means this code only runs when the Screen
  //is first loaded
  useEffect(() => {

    //Set event handlers
      client.on('connectionLost', (responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log(responseObject.errorMessage);
        }
      });
      client.on('messageReceived', (message) => {
        //Message is the list of device received from the Bridge
        let jsonDevices = JSON.parse(message.payloadString);
        //We filter the device specific data
        jsonData = jsonDevices.filter(device => device.definition != null);
        //We update the devices array
        setDevices(jsonData);
      });

      //Connect the client
      client.connect()
        .then(() => {
          //Once a connection has been made, make a subscription.
          return client.subscribe('zigbee2mqtt/bridge/devices');
        })
        .catch((responseObject) => {
          console.log(responseObject)
          if (responseObject.errorCode !== 0) {
            console.log('onConnectionLost:' + responseObject.errorMessage);
          }
        });

  }, []);

  //This code runs for each item in the devices array
  //We pass in an object with two keys to navigation
  //bridge - the initial Bridge URI
  //device - device specific information received from MQTT
  const renderItem = ({item}) => (
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