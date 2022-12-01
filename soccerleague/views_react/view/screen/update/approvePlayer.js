import React from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import Header from "../../component/header";
import axios from "axios";

const QueryString = require('query-string');

const baseUrl = "http://10.0.2.2:3000";


export default function ApprovePlayer({navigation, route}) {
    const [player_list, setPlayerList] = React.useState([]); 

    const team = route.params;
    console.log("Team in approve is", team);

    async function getPlayerInfo(pendings) {
        for( var i = 0; i < pendings.length; i++) {
            var id = pendings[i].player;
            axios.post(`${baseUrl}/account/lookup`, {
                id: id
          
            }).then(function (response) { 
                console.log(response.data);
          
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    axios.post(`${baseUrl}/pending/list`, {
        team: team
  
    }).then(function (response) {
        console.log("Players awaiting approval are", response.data);
        getPlayerInfo(response.data);
  
    }).catch(function (error) {
        console.log(error);
    });

    
    return (<>
        <Header label="Review the following player requests:" />
 
    </>)
}