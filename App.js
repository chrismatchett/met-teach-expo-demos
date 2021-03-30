import * as React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  
  let job = "Consultant"
  let companies = ["Liberyt IT", "PA Consulting", "Deloitte", "PwC"]
  let coworkers = {"name": "Frank", "job": "consultant"}

  let data = {myName: text, 
              myJob: "Wanga", 
              myCompanies: companies, 
              myCoworkers: coworkers}

  const [text, setText] = React.useState('');

  return (
      <View>
        <TextInput 
          placeholder='What is your name?' 
          value={text} // text const from line 13 
          onChangeText={text => setText(text)} // this is a shorthand way of writing js functions
        />
      <Button
        onPress={() => navigation.navigate('Welcome', data)}
        title="Go to Welcome Screen"
        color="#841584"
      />
      <Button
        onPress={() => navigation.navigate('Settings')}
        title="Go to Setting Screen"
        color="#841584"
      />
    </View>
  );
}

function WelcomeScreen({ route, navigation }) {

  const { myName, myJob, myCompanies, myCoworkers } = route.params;

  let strCompanies = []
  let counter = 1 

  for(let company of myCompanies){
    strCompanies.push(counter)
    counter = counter + 1
  }

  return (
    <View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Name {myName}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Occupation: {myJob}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Companies: {strCompanies}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Coworkers: {myCoworkers.name}</Text>
      </View>
    </View>
  );
}

function SettingsScreen({route, navigation}) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings</Text>
    </View>
  );
}

// this last section always needs to be in your App.js file
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
