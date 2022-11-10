import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Header from "../component/header";
import CustomButton from "../component/button";
import LogoutButton from "../component/logoutButton";
import axios from "axios";

const baseUrl = "http://10.0.2.2:3000";

export default function ParentHome({navigation}) {
  // View schedule 
  async function onViewSchedule() {
    const formData = new FormData(); 
    // request to endpoint to render other page 
    
  }
    
  // View standings
  async function onViewStandings() {
    const formData = new FormData(); 
    // request to endpoint to render other page 
    
  }
    
  // View playoff schedule 
  async function onViewPlayoff() {
    const formData = new FormData(); 
    // request to endpoint to render other page 
    
  }

  // View live game 
  async function onViewLiveGame() {
    const formData = new FormData(); 
  }

  return ( <>
    <Header text={"Parent Home"}/>

    <View>
      <TouchableOpacity style={FormStyle.formButton} 
        onPress={()=> viewSchedule()}>
        <Text style={FormStyle.formButtonText}> View schedule </Text>
      </TouchableOpacity>
    </View>

    <View>
      <TouchableOpacity style={FormStyle.formButton} 
        onPress={()=> viewLiveGame()}>
        <Text style={FormStyle.formButtonText}> View live game </Text>
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

    <View>
        <TouchableOpacity style={FormStyle.formSubmitButton} 
          onPress={()=> onLogout()}>
          <Text style={FormStyle.formSubmitButtonText}> Log out </Text>
        </TouchableOpacity>
      </View>

  </>)

}
