import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MainStyle from "../MainStyle.style";
import FormStyle from "../Form.style";
import Timer from "../../../component/Schedule";
import { enterScore } from "../../../component/homeScreen";

import axios from axios;

const baseUrl = "http://10.0.2.2:3000";

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4D4D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function ViewSchedule({navigation, route}) {
    const player= route.params.player;
    const parent= route.params.parent;
    const coach= route.params.coach;
    const admin= route.params.admin;

     async function handleSubmit() {
        navigation.navigate('PlayerHome', {
            player: player,
            email: email, 
            password: password
        });

        navigation.navigate('ParentHome', {
            parent: parent,
            email: email, 
            password: password
        });

        navigation.navigate('CoachHome', {
            coach: coach,
            email: email, 
            password: password
        });

        navigation.navigate('AdminHome', {
            admin: admin,
            email: email, 
            password: password
        });
     }

     return(<>
           <TouchableOpacity style={FormStyle.formButton} 
            onPress={()=> handleSubmit()}>
            <Text style={FormStyle.formButtonText}> View Schedule </Text>
        </TouchableOpacity>
     </>)
}
