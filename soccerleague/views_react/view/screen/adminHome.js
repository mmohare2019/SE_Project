import React from "react";
import { View } from "react-native";
import Header from "../component/header";
import LogoutButton from "../component/logoutButton";
import CustomButton from "../component/button";
import axios from "axios";

const baseUrl = "http://10.0.2.2:3000";

export default function AdminHome({navigation}) {

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

  async function onLogout() {
    navigation.navigate('AppHome');
  }


  return ( <>
    <Header text={"Admin home"}/>

    <View>
      <CustomButton text={"View schedule"} onPress={onViewSchedule}/>
      <CustomButton text={"View standings"} onPress={onViewSchedule}/>
      <CustomButton text={"View playoff schedule"} onPress={onViewPlayoff}/>
      <LogoutButton onPress={onLogout}/>
    </View>

  </>)
}