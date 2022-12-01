import React from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import Header from "../../component/header";
import FormField from "../../component/formField";
import FormStyle from "../../Form.style";
import axios from "axios";
import { response } from "express";
const QueryString = require('query-string');

const baseUrl = "http://10.0.2.2:3000";
export default function ApprovePlayer({navigation, route}) {
    const [player, setPlayer] = React.useState([]); 

    const team = route.params;
    console.log("Team in approve is", team);

    axios.post(`${baseUrl}/pending/list`, {
        team: team
  
      }).then(function (response) {
        console.log("Players awaiting approval are", response.data);
  
      }).catch(function (error) {
        console.log(error);
      });

    return (<>
        <Header label="Review the following player requests:" />
    </>)
}