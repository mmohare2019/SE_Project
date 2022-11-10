import React from "react";
import { Image, View, Text } from 'react-native';
import FormStyle from "../Form.style";
import MainStyle from "../MainStyle.style";

const logo = require("./../../static/greenville_soccer.png");

// Displays the logo and name of the page 
export default function Header( {text}) {
    return (
        <View style={FormStyle.container}>
        <Image style={FormStyle.logo} source={logo}/>
        <Text style={MainStyle.emphasisText}> {text} </Text>
      </View>
    )
}
    
