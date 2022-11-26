import React from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import Header from "../../component/header";
import FormField from "../../component/formField";
import FormStyle from "../../Form.style";
import axios from "axios";
import { response } from "express";
const QueryString = require('query-string');

const baseUrl = "http://10.0.2.2:3000";

export default function UpdateTeamDetails({navigation, route}) {
    const [team_name, setTeamName] = React.useState("");
    const [color, setColor] = React.useState("");

    const coach = route.params;
    //console.log("Coach in update\t", coach);

    async function handleSubmit(team_name, color){
        try {
           const response = await axios.post(`${baseUrl}/team/update`, QueryString.stringify ({
                //coach: coach,
                team_name: team_name,
                color: color
          }), {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              }
          });
          console.log(response.data);
          Alert.alert("Success - team details updated!");

        } catch (error) {
            console.log(error.message);
        }
        
        navigation.navigate('CoachHome');
  
    }

    return (<>
        <Header label="Edit team details"/>
    
        <View>
            <FormField label="Enter team name: " setFunction={setTeamName}/>
            <FormField label="Enter team color: " setFunction={setColor}/>

            <TouchableOpacity style={FormStyle.formButton} 
                onPress={()=> handleSubmit(team_name, color)}>
                <Text style={FormStyle.formButtonText}> Submit </Text>
            </TouchableOpacity>
        </View>
    </>)
}