import React from "react";
import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import MainStyle from "../MainStyle.style";
import FormStyle from "../Form.style";
import axios from axios;

const baseUrl = "http://10.0.2.2:3000";

export default function CoachHome() {
  
}

return ( <>
  <View>
    <Image
        source = {require("..\public\images\greenville_soccer.png")}>
    </Image>
  </View>
  <View style={FormStyle.groupView}>
    <Text style={MainStyle.emphasisText}> Coach Home </Text>
  </View>

</> )
