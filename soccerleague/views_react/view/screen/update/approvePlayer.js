import React from "react";
import { SafeAreaView, FlatList } from "react-native";
import FlatlistStyle from "../../Flatlist.style";
import PlayerDisplay from "../../component/playerDisplay";
import Header from "../../component/header";
import axios from "axios";
const QueryString = require('query-string');
const baseUrl = "http://10.0.2.2:3000";


function onPress() {
    console.log("Hello world");
}

export default function ApprovePlayer({navigation, route}) {
    const [player_list, setPlayerList] = React.useState([]); 

    const team = route.params;
    console.log("Team in approve is", team);

    async function getPlayerInfo(pendings) {
       var user_ids = [];
        for (var i = 0; i < pendings.length; i++) {
            user_ids.push(pendings[i].player);
        }

        axios.post(`${baseUrl}/account/lookup`, {
            user_ids: user_ids
        }).then(function(response) {
            console.log("response.data in getPlayerInfo", response.data);
            return response.data;
        }).catch(function (error) {
            console.log(error);
        });
    }

    const renderItem = ({ item }) => (
        <PlayerDisplay 
          onPress={() => onPress}
          first_name={item.first_name}
          last_name={item.last_name}
          email={item.email}
        />
    )

    // make this async 
    React.useEffect(() => {
        axios.post(`${baseUrl}/pending/list`, {
            team: team
      
        }).then(async function (response) {
            console.log("Players awaiting approval are", response.data);
            var display = await getPlayerInfo(response.data);
            console.log("display: ", display);
            setPlayerList(display);
      
        }).catch(function (error) {
            console.log(error);
        });
    }, []);
    
    return (<>
        <Header label="Review the following player requests:" />

        <SafeAreaView style={FlatlistStyle.container}>
        <FlatList
            data={player_list}
            renderItem={renderItem}
            keyExtractor={item => item._id}
        />
        </SafeAreaView>     
    </>)
}