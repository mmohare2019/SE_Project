import React from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import Header from "../../component/header";
import FormField from "../../component/formField";
import FormStyle from "../../Form.style";
import axios from "axios";
import { response } from "express";
const QueryString = require('query-string');

const baseUrl = "http://10.0.2.2:3000";

export default function PickTeam({navigation, route}) {
 
    async function getTeams() {
        console.log("Get teams");
        try {
            const response = await axios.get(`${baseUrl}/team/display`);
            console.log(typeof response);
            console.log("in try\t", response.data);  
            team = response.data;
    
        } catch (error) {
            console.log(error.message);
        }
    
    }

    getTeams();
    console.log("My teams are\t", team);

    async function handleSubmit() {
        navigation.navigate('PlayerHome');
    }

    return (<>
        <Header label="Pick a team to join"/>

        <TouchableOpacity style={FormStyle.formButton} 
            onPress={()=> handleSubmit()}>
            <Text style={FormStyle.formButtonText}> Submit </Text>
        </TouchableOpacity>
    </>)
}