import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MainStyle from "../MainStyle.style";
import FormStyle from "../Form.style";
import axios from "axios";

const baseUrl = "http://10.0.2.2:3000";

export default function enterScore() 
{ 
  async function enterScore() 
  {
    const formData = new FormData();

  }

  return ( <>
    <View style={FormStyle.groupView}>
        <Text style={MainStyle.emphasisText}> Enter Score: </Text>
    </View>
    <View>
      <TouchableOpacity style={FormStyle.formButton} 
        onPress={()=> enterScore()}>
        <Text style={FormStyle.formButtonText}> Submit Score </Text>
      </TouchableOpacity>
    </View>

  </>)
}
