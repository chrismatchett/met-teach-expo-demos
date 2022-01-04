import React from "react"
import {Alert} from "react-native"
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
  NativeBaseProvider,
} from "native-base"

import { Client, Message } from 'react-native-paho-mqtt';

const HomeScreen = ({ route, navigation }) => {
  const [data, setData] = React.useState(null); 

  //Set up an in-memory alternative to global localStorage
  // const myStorage = {
  //   setItem: (key, item) => {
  //     myStorage[key] = item;
  //   },
  //   getItem: (key) => myStorage[key],
  //   removeItem: (key) => {
  //     delete myStorage[key];
  //   },
  // };
  
  // Create a client instance
  const client = new Client({ uri: 'ws://192.168.28.152:9001'});
  
  // set event handlers
  client.on('connectionLost', (responseObject) => {
    if (responseObject.errorCode !== 0) {
      setData(responseObject.errorMessage);
    }
  });
  client.on('messageReceived', (message) => {
    setData(message.payloadString);
  });
  
  // connect the client
  client.connect()
    .then(() => {
      // Once a connection has been made, make a subscription and send a message.
      //console.log('onConnect');
      //return client.subscribe('World');
      return client.publish('zigbee2mqtt/0x001788010b2efdb0/set', '{"STATE": "ON"}');
    })
    .then(() => {
      //const message = new Message('Hello');
      //message.destinationName = 'World';
      //client.send(message);
    })
    .catch((responseObject) => {
      if (responseObject.errorCode !== 0) {
        setData('onConnectionLost:' + responseObject.errorMessage);
      }
    })
  ;

/*   const turnOn = () => {

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "SharedAccessSignature sr=met-events.servicebus.windows.net&sig=Yuso42BOpx8hTF8iA9doxSwmc6wppl%2FivOTqdcqnaLk%3D&se=1638980611&skn=send");
    myHeaders.append("Content-Type", "application/atom+xml;type=entry;charset=utf-8");
    myHeaders.append("Host", "met-events.servicebus.windows.net");
    
    let raw = "{\"device-id\": \"1355\", \"action\": \"stop\"}";
    
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://met-events.servicebus.windows.net/nightclass/messages", requestOptions)
      //.then(response => response.text())
      .then(response => response.status)
      //.then(result => console.log(result))
      .then(result => setData(result))
      .catch(error =>  console.log('error', error));
  };

  const turnOff = () => {
    Alert.alert("Turn Off", "Off");
  }; */
    
  return (
    <View>
      <Button onPress={turnOn}>
        <Text>Turn On</Text>
      </Button>
      <Button onPress={turnOff}>
        <Text>Turn Off</Text>
      </Button>
      <Text>{data}</Text>
    </View>
  );
}

export default HomeScreen;