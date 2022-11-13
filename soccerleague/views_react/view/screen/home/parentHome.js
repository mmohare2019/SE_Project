import React from "react";
import { View } from "react-native";
import Header from "../../component/header";
import CustomButton from "../../component/button";
import LogoutButton from "../../component/logoutButton";
import axios from "axios";

const baseUrl = "http://10.0.2.2:3000";

export default function ParentHome({navigation}) {
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
    navigation.navigate('ViewPlayoffs');
  }

  // View live game 
  async function onViewLiveGame() {
  }

  async function onLogout() {
    navigation.navigate('AppHome');
  }
  
  return ( <>
    <Header label={"Parent Home"}/>

    <View>
      <CustomButton label={"View live game"} onPress={onViewLiveGame}/>
      <CustomButton label={"View schedule"} onPress={onViewSchedule}/>
      <CustomButton label={"View standings"} onPress={onViewStandings}/>
      <CustomButton label={"View playoff schedule"} onPress={onViewPlayoff}/>
      <LogoutButton onPress={onLogout}/>
    </View>

  </>)

}
