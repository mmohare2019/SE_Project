import React from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import HelloWorld from "./view/component/HelloWorld";
import LoginScreen from "./view/screen/LoginScreen";
import MainStyle from "../MainStyle.style";
import FormStyle from "../Form.style";
import { StyleSheet, Text, View, Image } from 'react-native';

// initializing email and password use states
export default function LoginScreen() {
   const [email, setEmail] = React.useState("");
   const [password, setPassword] = React.useState("");
}

// styling with color and text
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4D4D4D4',
    alignItems: 'center',
    justifyContent: 'center',
   },
 
   image :{
    marginBottom: 35
 
  }
     
});

export default function App(){
    return (
        <LoginScreen />
    );
}
