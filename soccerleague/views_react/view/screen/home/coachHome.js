import React from "react";
import { ScrollView } from "react-native";
import Header from "../../component/header";
import CustomButton from "../../component/button";
import LogoutButton from "../../component/logoutButton";
import axios from "axios";

const baseUrl = "http://10.0.2.2:3000";

export default function CoachHome({navigation, route}) {
  const coach = route.params;
  console.log("current coach logged in is", coach);

  async function onUpdateTeam() {
    navigation.navigate("UpdateTeamDetails", coach); 
  }

  async function onApprovePlayer() { 
    navigation.navigate('ApprovePlayer');
  }
  
  async function onViewSchedule() {
    navigation.navigate('ViewSchedule');
  }

  async function onViewStandings() {
    navigation.navigate('ViewStandings');
  }
 
  async function onViewPlayoff() {
    navigation.navigate('ViewPlayoffs');
  }

  async function onLogout() {
    navigation.navigate('AppHome');
  }

  return ( <>
    <Header label={"Coach Home"}/>

    <ScrollView>
      <CustomButton label={"Edit team details"} onPress={onUpdateTeam}/>
      <CustomButton label={"Approve player"} onPress={onApprovePlayer}/>
      <CustomButton label={"View schedule"} onPress={onViewSchedule}/>
      <CustomButton label={"View standings"} onPress={onViewStandings}/>
      <CustomButton label={"View playoff schedule"} onPress={onViewPlayoff}/>
      <LogoutButton onPress={onLogout}/>
    </ScrollView>

  </> )

}