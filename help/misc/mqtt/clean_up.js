import React, {useEffect, useState, useCallback } from "react"
import {Alert, FlatList} from "react-native"
import {
  Container,
  Flatlist,
  Text
} from "native-base"

import { Client, Message } from 'react-native-paho-mqtt';

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

const BridgeScreen = ({ route, navigation }) => {
  const [test, setTest] = useState([]);
  const [devices, setDevices] = useState([]);
  const {bridge} = route.params;

  let bridge_ws = 'ws://192.168.28.152:9001/';
  //const bridge_ws = 'ws://' + bridge + '/';
  
  const client = useState(() => {
  	return new Client({ uri: bridge_ws, clientId: 'clientId', storage: myStorage });
  })
  
  const onConnectionError = useCallback((res) => {
  	const { errorCode, errorMessage } = res
  	if (errorCode !== 0) {
        console.log(errorMessage);
    }
  }, [])
  
  const onMessageReceived = useCallback((message) => {
  	const { payloadString } = message
  	const jsonDevices = JSON.parse(payloadString);
    const jsonData = jsonDevices.filter(device => device.definition != null);
    setTest(test => [...test, jsonData]);
  }, [])
  
  const renderItem = useCallback(({ item }) => {
  	return {
    	<Text>{item.friendly_name}</Text>
    }
  }, []);

  useEffect(() => {
    if(client){

      // set event handlers
      client.on('connectionLost', onConnectionError);
      client.on('messageReceived', onMessageReceived);
      
      async function run() {
      	try {
        	// connect the client
        	await client.connect()
          // Once a connection has been made, make a subscription.
          await client.subscribe('zigbee2mqtt/bridge/devices');
        }
        catch(ex) {
        	onConnectionError(ex)
        }
      }
      
      run();
    }
    
    return () => {
    	// useEffect clean up function
      // client.unsubscribe()
      // client.disconnect()
      // client.off('connectionLost', onConnectionLost);
      // client.off('messageReceived', onMessageReceived);
    }
  }, [client]);

  return (
    <Container>
      <FlatList
        data={test}
        renderItem={renderItem}
        keyExtractor={item => item.friendly_name}
      />
       <Text>{JSON.stringify(test)}</Text>
    </Container>
  );
}


export default BridgeScreen;