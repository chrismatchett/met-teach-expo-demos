import React from "react"
//import {Alert} from "react-native"
import {
  Container,
  H1,
  Text,
  Item,
  Input,
  Button
} from "native-base"

const HomeScreen = ({ route, navigation }) => {

  const [text, setText] = React.useState(""); 

  return(
    <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue' }}>
      <Item regular>
        <Input 
        placeholder='192.168.28.152:9001' 
        backgroundColor='white'
        value={text} 
        onChangeText={text => setText(text)}
        />
      </Item> 
      <Button onPress={() => navigation.navigate('Bridge', {bridge: text})} light>
        <Text>Hub IP Address</Text>
      </Button>
    </Container>
  )
};

export default HomeScreen;
