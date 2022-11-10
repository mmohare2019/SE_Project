import React from "react";
import { ScrollView, View } from "react-native";
import Header from "../component/header";
import CustomButton from "../component/button";
import LogoutButton from "../component/logoutButton";
import axios from "axios";

const baseUrl = "http://10.0.2.2:3000";

export default function CoachHome({navigation}) {
  async function onUpdateTeam() {
    const formData = new FormData(); 
  }


  async function onAdmitPlayer() {
    const formData = new FormData(); 
  }
  
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
    <Header text={"Coach Home"}/>

    <ScrollView>
      <CustomButton text={"Edit team details"} onPress={onUpdateTeam}/>
      <CustomButton text={"Admit player"} onPress={onAdmitPlayer}/>
      <CustomButton text={"View schedule"} onPress={onViewSchedule}/>
      <CustomButton text={"View standings"} onPress={onViewSchedule}/>
      <CustomButton text={"View playoff schedule"} onPress={onViewPlayoff}/>
      <LogoutButton onPress={onLogout}/>
    </ScrollView>

  </> )

}