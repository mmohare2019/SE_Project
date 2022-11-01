import React from "react";
import { Text, View } from "react-native";
import HelloWorld from "./view/component/HelloWorld";
import LoginScreen from "./view/screen/LoginScreen";
import { StyleSheet, Text, View, Image } from 'react-native';

// adding image
export default class App extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Image source = {require("./assets/soccerlogo.png")}/>
      </View>
    );
  }
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
