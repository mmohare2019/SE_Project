import React from "react";
import { View } from "react-native";
import Header from "../../component/header";
import LogoutButton from "../../component/logoutButton";
import CustomButton from "../../component/button";
import axios from "axios";

const baseUrl = "http://10.0.2.2:3000";


export default function PlayerHome({navigation, route}) {
  const player = route.params;

  // Render the team page 
  async function onPickTeam() {
    navigation.navigate('PickTeam', player);
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
    <Header label={"Player Home"}/>

    <View>
      <CustomButton label={"Pick team"} onPress={onPickTeam}/>
      <CustomButton label={"View schedule"} onPress={onViewSchedule}/>
      <CustomButton label={"View standings"} onPress={onViewSchedule}/>
      <CustomButton label={"View playoff schedule"} onPress={onViewPlayoff}/>
      <LogoutButton onPress={onLogout}/>
    </View>

  </>)

}