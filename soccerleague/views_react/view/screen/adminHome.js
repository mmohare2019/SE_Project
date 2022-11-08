import React from "react";
import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import MainStyle from "../MainStyle.style";
import FormStyle from "../Form.style";
import axios from axios;

const baseUrl = "http://10.0.2.2:3000";

export default function AdminHome() {

// View schedule 
async function viewSchedule() {
  const formData = new FormData(); 
  // request to endpoint to render other page 

}

// View standings
async function viewStandings() {
  const formData = new FormData(); 
  // request to endpoint to render other page 

}

// View playoff schedule 
async function viewPlayoff() {
  const formData = new FormData(); 
  // request to endpoint to render other page 

}

}

return ( <>
  <View>
    <Image
        source = {require("C:\Users\mmoha\CS482\SE_Project\soccerleague\public\images\greenville_soccer.png")}>
    </Image>
  </View>
  <View style={FormStyle.groupView}>
      <Text style={MainStyle.emphasisText}> Admin Home </Text>
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