import * as React from 'react'
import { Alert, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeBaseProvider, Image, Button, Input, Heading, Container, Box, Center } from 'native-base'
import pizzaImage from './assets/pizza.jpg'

function HomeScreen({ navigation }) {
  
  const [userEmail, setEmailAddress] = React.useState('');
  const [storedEmail, setStoredEmail] = React.useState('');

  let onPress = () => {
    let params = { email: userEmail, exists: false }
    if(userEmail == '') {
      Alert.alert('Error!', 'You must provide a user email.', [
        {
          text: 'OK'
        }
      ]);
    }
    else if(userEmail == storedEmail) {
      params.exists = true
      navigation.navigate('Welcome', params)
    }
    else {
      setStoredEmail(userEmail)
      navigation.navigate('Welcome', params)
    }
  }

  return (
    <Center flex={1}>
      <Box w="100%" h="30%">
        <Image source={pizzaImage} h="300" alt="Pizza" />
      </Box>
      <Box w="100%" h="30%" p="10" bg="#fff" align="center">
        <Center>
          <Heading size="xl">Mario's Pizza</Heading>
          <Text size="lg">The best pizza in Belfast</Text>
        </Center>
      </Box>
      <Box w="100%" h="40%" p="10" bg="#808000">
        <Input
          placeholder='Email address'
          value={ userEmail }
          onChangeText={ email => setEmailAddress(email) }
          bg="#ffffff"
        />
        <Button 
          bg="#cccccc"
          size="md" 
          onPress={ onPress }>
          Get updates from Mario's Pizza
        </Button>
      </Box>
    </Center>
  );
}

function WelcomeScreen({ route }) {
  const { email, exists } = route.params

  return (
    <Center flex={1}>
      {!exists && <Heading size="xl">Welcome to Mario's</Heading>}
      {!exists && <Text size="lg">We will send updates to {email.toLowerCase().trim()}</Text>}
      {exists && <Text size="lg">{email.toLowerCase().trim()} is already in our mailing list</Text>}
    </Center>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={ HomeScreen } />
          <Stack.Screen name="Welcome" component={ WelcomeScreen } />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
