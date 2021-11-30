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

  const turnOn = () => {
      Alert.alert("Test", "Turn On");
    ;
  };


const HomeScreen = ({ route, navigation }) => {

  return (
    <View>
    <Button onPress={turnOn}>
      <Text>Turn On</Text>
    </Button>
    <Button>
      <Text>Turn Off</Text>
    </Button>
    </View>
  );
}

export default HomeScreen;