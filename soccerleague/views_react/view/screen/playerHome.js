import React from "react";
import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import MainStyle from "../MainStyle.style";
import FormStyle from "../Form.style";
import { viewSchedule, viewPlayoff, viewStandings } from "../component/homeScreen";
import axios from axios;

const baseUrl = "http://10.0.2.2:3000";

export default function PlayerHome() {

  // Render the team page 
  async function pickTeam() {
    const formData = new FormData(); 
    // request to endpoint to render other page 

  }

}

return ( <>
  <View>
    <Image
        source = {require("..\public\images\greenville_soccer.png")}>
    </Image>
  </View>
  <View style={FormStyle.groupView}>
      <Text style={MainStyle.emphasisText}> Player Home </Text>
  </View>
  <View>
    <TouchableOpacity style={FormStyle.formButton} 
      onPress={()=> pickTeam()}>
      <Text style={FormStyle.formButtonText}> Team sign-up </Text>
    </TouchableOpacity>
  </View>

  <View>
    <TouchableOpacity style={FormStyle.formButton} 
      onPress={()=> viewSchedule()}>
      <Text style={FormStyle.formButtonText}> View schedule </Text>
    </TouchableOpacity>
  </View>

  <View>
    <TouchableOpacity style={FormStyle.formButton} 
      onPress={()=> viewStandings()}>
      <Text style={FormStyle.formButtonText}> View standings </Text>
    </TouchableOpacity>
  </View>

  <View>
    <TouchableOpacity style={FormStyle.formButton} 
      onPress={()=> viewPlayoff()}>
      <Text style={FormStyle.formButtonText}> View playoff schedule </Text>
    </TouchableOpacity>
  </View>

</>)