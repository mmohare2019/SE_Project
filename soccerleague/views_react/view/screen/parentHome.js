import React from "react";
import { View } from "react-native";
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

  async function onLogout() {
    navigation.navigate('AppHome');
  }
  
  return ( <>
    <Header text={"Parent Home"}/>

    <View>
      <CustomButton text={"View live game"} onPress={onViewLiveGame}/>
      <CustomButton text={"View schedule"} onPress={onViewSchedule}/>
      <CustomButton text={"View standings"} onPress={onViewSchedule}/>
      <CustomButton text={"View playoff schedule"} onPress={onViewPlayoff}/>
      <LogoutButton onPress={onLogout}/>
    </View>

  </>)

}
