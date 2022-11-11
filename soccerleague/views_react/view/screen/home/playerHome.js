import React from "react";
import { View } from "react-native";
import Header from "../../component/header";
import LogoutButton from "../../component/logoutButton";
import CustomButton from "../../component/button";
import axios from "axios";

const baseUrl = "http://10.0.2.2:3000";


export default function PlayerHome({navigation}) {

  // Render the team page 
  async function onPickTeam() {

  }

  // View schedule 
  async function onViewSchedule() {
    navigation.navigate('ViewSchedule');
  }
  
  // View standings
  async function onViewStandings() { 
    navigation.navigate('ViewStandings');
  }
  
  // View playoff schedule 
  async function onViewPlayoff() {
    navigation.navigate('ViewPlayoffs')
  }

  async function onLogout() {
    navigation.navigate('AppHome');
  }

  return ( <>
    <Header text={"Player Home"}/>

    <View>
      <CustomButton text={"Pick team"} onPress={onPickTeam}/>
      <CustomButton text={"View schedule"} onPress={onViewSchedule}/>
      <CustomButton text={"View standings"} onPress={onViewSchedule}/>
      <CustomButton text={"View playoff schedule"} onPress={onViewPlayoff}/>
      <LogoutButton onPress={onLogout}/>
    </View>

  </>)

}