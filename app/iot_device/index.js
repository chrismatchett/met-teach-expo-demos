/*
  --This App connects to Iot Devices using Zigbee2MQTT as a Bridge--
  The code below receives Device data from the BridgeScreen.
  This data is then used to create an array of device features.
  A Toggle button has been created for the Philips Hue Light Bulb.
  An example the JSON data sent from BridgeScreen is included at the end. 
*/

import React, {useEffect, useState} from "react"
import {FlatList} from "react-native"
import {
  Container,
  Text,
  Button,
  H1
} from "native-base"

import {Client, Message} from 'react-native-paho-mqtt';

const DeviceScreen = ({ route, navigation }) => {
 
  const [exposes, setExposes] = useState([]);
  const {bridge, device} = route.params;
 
  //let bridge_ws = 'ws://192.168.0.221:9001/';
  const bridge_ws = 'ws://' + bridge + '/';

  //When the Screen loads make an array of the device's features e.g. on/off/toggle
  useEffect(() => {
    setExposes(device.definition.exposes[0].features)
    //console.log(exposes)
  }, []);
  
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

  //This function toggles the device on and off
  const toggleLight = (str_message, friendly_name) => {

    let destination = 'zigbee2mqtt/' + friendly_name + '/set';

    //Set event handlers
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage);
      }
    });

    client.on('messageReceived', (message) => {
      console.log(message.payloadString);
    });

    //Connect the client
    client.connect()
    .then(() => {
      //Send message to the Bridge
      const message = new Message(str_message);
      message.destinationName = destination;
      client.send(message); 
    })
    .then(() => {
      //It is important to disconnect from the Web Socket
      //If you don't only the first Button click will work
      client.disconnect();
    })
    .catch((responseObject) => {
      console.log(responseObject)
      if (responseObject.errorCode !== 0) {
        console.log('onConnectionLost:' + responseObject.errorMessage);
      }
    });
  }

  const renderItem = ({ item }) => (
    <Container>
      <Text>{JSON.stringify(item)}</Text>
      <Button onPress={()=>toggleLight(item.value_toggle, device.friendly_name)} light>
        <Text>{item.value_toggle}</Text>
      </Button>
    </Container>
  );

  return ( 
    <Container>
      <H1>{device.definition.description}</H1>
      <FlatList
        data={exposes}
        renderItem={renderItem}
        
      />
    </Container>
  );
}

export default DeviceScreen;

/*
Object {
  "date_code": "20201012",
  "definition": Object {
    "description": "Hue white A60 bulb B22 bluetooth",
    "exposes": Array [
      Object {
        "features": Array [
          Object {
            "access": 7,
            "description": "On/off state of this light",
            "name": "state",
            "property": "state",
            "type": "binary",
            "value_off": "OFF",
            "value_on": "ON",
            "value_toggle": "TOGGLE",
          },
          Object {
            "access": 7,
            "description": "Brightness of this light",
            "name": "brightness",
            "property": "brightness",
            "type": "numeric",
            "value_max": 254,
            "value_min": 0,
          },
        ],
        "type": "light",
      },
      Object {
        "access": 2,
        "description": "Triggers an effect on the light (e.g. make light blink for a few seconds)",
        "name": "effect",
        "property": "effect",
        "type": "enum",
        "values": Array [
          "blink",
          "breathe",
          "okay",
          "channel_change",
          "finish_effect",
          "stop_effect",
        ],
      },
      Object {
        "access": 1,
        "description": "Link quality (signal strength)",
        "name": "linkquality",
        "property": "linkquality",
        "type": "numeric",
        "unit": "lqi",
        "value_max": 255,
        "value_min": 0,
      },
    ],
    "model": "9290018217",
    "options": Array [
      Object {
        "access": 2,
        "description": "Controls the transition time (in seconds) of on/off, brightness, color temperature (if applicable) and color (if applicable) changes. Defaults to `0` (no transition).",
        "name": "transition",
        "property": "transition",
        "type": "numeric",
        "value_min": 0,
      },
    ],
    "supports_ota": true,
    "vendor": "Philips",
  },
  "endpoints": Object {
    "11": Object {
      "bindings": Array [],
      "clusters": Object {
        "input": Array [
          "genBasic",
          "genIdentify",
          "genGroups",
          "genScenes",
          "genOnOff",
          "genLevelCtrl",
          "touchlink",
          "manuSpecificSamsungAccelerometer",
        ],
        "output": Array [
          "genOta",
        ],
      },
      "configured_reportings": Array [],
      "scenes": Array [],
    },
    "242": Object {
      "bindings": Array [],
      "clusters": Object {
        "input": Array [],
        "output": Array [
          "greenPower",
        ],
      },
      "configured_reportings": Array [],
      "scenes": Array [],
    },
  },
  "friendly_name": "0x001788010b2efdb0",
  "ieee_address": "0x001788010b2efdb0",
  "interview_completed": true,
  "interviewing": false,
  "manufacturer": "Signify Netherlands B.V.",
  "model_id": "LWA012",
  "network_address": 32320,
  "power_source": "Mains (single phase)",
  "software_build_id": "1.76.10",
  "supported": true,
  "type": "Router",
}
*/