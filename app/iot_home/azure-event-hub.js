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

const HomeScreen = ({ route, navigation }) => {
  const [data, setData] = React.useState(null); 

  const turnOn = () => {

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
  };
    
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