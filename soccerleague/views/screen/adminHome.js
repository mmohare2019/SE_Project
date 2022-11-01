import React from "react";
import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import MainStyle from "../MainStyle.style";
import FormStyle from "../Form.style";

   // include image from file path
   <View style={styles.container}>
      <Image style={styles.image} source={require(".../public/images/greenville_soccer.png")} />
   // Edit team button
    <View style={FormStyle.groupView}>
      <Text style={MainStyle.emphasisText}> Team </Text>
    </View>
    <View style={FormStyle.groupView}>
      <Text style={MainStyle.emphasisText}> Schedule </Text>
    </View>
    <View style={FormStyle.groupView}>
      <Text style={MainStyle.emphasisText}> Standings </Text>
    </View>
    <View style={FormStyle.groupView}>
      <Text style={MainStyle.emphasisText}> Playoffs </Text>
    </View>
    
        </>
}
