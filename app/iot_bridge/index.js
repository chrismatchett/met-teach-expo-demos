/*
  --This App connects to Iot Devices using Zigbee2MQTT as a Bridge--
  The code below connects to the Zigbee2MQTT Bridge using Web Sockets.
  If the connection is successful a JSON list of devices is requested from the Bridge.
  FlatList is used to loop over each of the device's returned from the Bridge.
  A Button is created using the friendly_name of each device.
  Each button stores a JSON object with device specific details.
  The Button can send the device's details to the next Screen.
  An example the JSON data recieved from the Bridge is included at the end sent from the BridgeScreen.  
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
  //let bridge_ws = 'ws://192.168.0.221:9001/';
  //Use this URI when testing is over 
  const bridge_ws = 'ws://' + bridge + '/';
  
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

/*
[
  {
    "definition": null,
    "endpoints": {
      "1": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "2": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "3": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "4": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "5": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "6": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "8": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "10": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "11": {
        "bindings": [],
        "clusters": {
          "input": [
            "ssIasAce"
          ],
          "output": [
            "ssIasZone",
            "ssIasWd"
          ]
        },
        "configured_reportings": [],
        "scenes": []
      },
      "12": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "13": {
        "bindings": [],
        "clusters": {
          "input": [
            "genOta"
          ],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "47": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "110": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      },
      "242": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": []
        },
        "configured_reportings": [],
        "scenes": []
      }
    },
    "friendly_name": "Coordinator",
    "ieee_address": "0x00124b0024c9ec84",
    "interview_completed": true,
    "interviewing": false,
    "network_address": 0,
    "supported": false,
    "type": "Coordinator"
  },
  {
    "date_code": "20201012",
    "definition": {
      "description": "Hue white A60 bulb B22 bluetooth",
      "exposes": [
        {
          "features": [
            {
              "access": 7,
              "description": "On/off state of this light",
              "name": "state",
              "property": "state",
              "type": "binary",
              "value_off": "OFF",
              "value_on": "ON",
              "value_toggle": "TOGGLE"
            },
            {
              "access": 7,
              "description": "Brightness of this light",
              "name": "brightness",
              "property": "brightness",
              "type": "numeric",
              "value_max": 254,
              "value_min": 0
            }
          ],
          "type": "light"
        },
        {
          "access": 2,
          "description": "Triggers an effect on the light (e.g. make light blink for a few seconds)",
          "name": "effect",
          "property": "effect",
          "type": "enum",
          "values": [
            "blink",
            "breathe",
            "okay",
            "channel_change",
            "finish_effect",
            "stop_effect"
          ]
        },
        {
          "access": 1,
          "description": "Link quality (signal strength)",
          "name": "linkquality",
          "property": "linkquality",
          "type": "numeric",
          "unit": "lqi",
          "value_max": 255,
          "value_min": 0
        }
      ],
      "model": "9290018217",
      "options": [
        {
          "access": 2,
          "description": "Controls the transition time (in seconds) of on/off, brightness, color temperature (if applicable) and color (if applicable) changes. Defaults to `0` (no transition).",
          "name": "transition",
          "property": "transition",
          "type": "numeric",
          "value_min": 0
        }
      ],
      "supports_ota": true,
      "vendor": "Philips"
    },
    "endpoints": {
      "11": {
        "bindings": [],
        "clusters": {
          "input": [
            "genBasic",
            "genIdentify",
            "genGroups",
            "genScenes",
            "genOnOff",
            "genLevelCtrl",
            "touchlink",
            "manuSpecificSamsungAccelerometer"
          ],
          "output": [
            "genOta"
          ]
        },
        "configured_reportings": [],
        "scenes": []
      },
      "242": {
        "bindings": [],
        "clusters": {
          "input": [],
          "output": [
            "greenPower"
          ]
        },
        "configured_reportings": [],
        "scenes": []
      }
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
    "type": "Router"
  }
]
*/