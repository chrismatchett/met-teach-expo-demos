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
  Alert.alert("Turn On", "On");
};

const turnOff = () => {
  Alert.alert("Turn Off", "Off");
};

const HomeScreen = ({ route, navigation }) => {
  return (
    <View>
    <Button onPress={turnOn}>
      <Text>Turn On</Text>
    </Button>
    <Button onPress={turnOff}>
      <Text>Turn Off</Text>
    </Button>
    </View>
  );
}

export default HomeScreen;