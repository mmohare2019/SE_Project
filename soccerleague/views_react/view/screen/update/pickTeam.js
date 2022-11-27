import React from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import Header from "../../component/header";
import FormField from "../../component/formField";
import FormStyle from "../../Form.style";
import axios from "axios";
import { response } from "express";
import { get } from "mongoose";
const QueryString = require('query-string');

const baseUrl = "http://10.0.2.2:3000";

async function getTeams() {
    try {
        const response = await axios.get(`${baseUrl}/team/display`);
        console.log(typeof response);
        console.log("in try\t", response.data); 
        return response.data;

    } catch (error) {
            console.log(error.message);
    }
}

export default function PickTeam({navigation, route}) {
    
    let teams;
    (async () => {
        teams = await getTeams();
        console.log("waiting..", teams);
    })()

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
