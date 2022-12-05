import React from "react";
import { TouchableOpacity, Text, SafeAreaView, FlatList } from "react-native";
import Header from "../../component/header";
import RosterDisplay from "../../component/rosterDisplay";
import FormStyle from "../../Form.style";
import FlatlistStyle from "../../Flatlist.style";
import axios from "axios";
import { response } from "express";
const QueryString = require('query-string');

const baseUrl = "http://10.0.2.2:3000";

function extractPlayerIds(team) {
    var ids = []; 
    if (team.player1 != undefined) {
        ids.push(team.player1);
    }
    if (team.player2 != undefined) {
        ids.push(team.player2);
    }
    if (team.player3 != undefined) {
        ids.push(team.player3);
    }
    if (team.player4 != undefined) {
        ids.push(team.player4);
    }
    if (team.player5 != undefined) {
        ids.push(team.player5);
    }
    if (team.player6 != undefined) {
        ids.push(team.player6);
    }

    return ids; 
}

export default function ViewRoster({navigation, route}) {
    const coach = route.params.coach;
    const team = route.params.team;
    console.log("Coach logged in is: ", coach);
    console.log("Team is: ", team);

    const [player_list, setPlayerList] = React.useState([]);

    var ids = extractPlayerIds(team);
    console.log("Ids: ", ids);

    React.useEffect( () => {
        axios.post(`${baseUrl}/account/lookup`, {
            user_ids: ids
        }).then(function(response) {
            console.log("account lookup return: ", response.data);
            setPlayerList(response.data);

        }).catch(function (error) {
            console.log(error);
        });
    }, []);

    const renderItem = ({ item }) => (
        <RosterDisplay 
          first_name={item.first_name}
          last_name={item.last_name}
          email={item.email}
        />
    )

    async function handleSubmit() {
        navigation.navigate('CoachHome', {
            team: team, 
            coach: coach
        });
    }

    return (<>
        <Header label="Your roster:"/>

        <SafeAreaView style={FlatlistStyle.container}>
        <FlatList
            data={player_list}
            renderItem={renderItem}
            keyExtractor={item => item._id}
        />
        </SafeAreaView>

        <TouchableOpacity style={FormStyle.formButton} 
            onPress={()=> handleSubmit()}>
            <Text style={FormStyle.formButtonText}> Return home </Text>
        </TouchableOpacity>   
    </>)
}