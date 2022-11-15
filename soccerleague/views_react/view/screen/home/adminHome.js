import React from "react";
import { View } from "react-native";
import Header from "../../component/header";
import LogoutButton from "../../component/logoutButton";
import CustomButton from "../../component/button";
import axios from "axios";

const baseUrl = "http://10.0.2.2:3000";

export default function AdminHome({navigation}) {
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
    <Header label={"Admin home"}/>

    <View>
      <CustomButton label={"View schedule"} onPress={onViewSchedule}/>
      <CustomButton label={"View standings"} onPress={onViewStandings}/>
      <CustomButton label={"View playoff schedule"} onPress={onViewPlayoff}/>
      <LogoutButton onPress={onLogout}/>
    </View>

  </>)
}