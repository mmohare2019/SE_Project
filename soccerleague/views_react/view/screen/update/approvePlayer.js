import React from "react";
import { SafeAreaView, FlatList, Alert } from "react-native";
import FlatlistStyle from "../../Flatlist.style";
import PlayerDisplay from "../../component/playerDisplay";
import Header from "../../component/header";
import axios from "axios";
const QueryString = require('query-string');
const baseUrl = "http://10.0.2.2:3000";

function extractPlayerIds(pendings) {
    var user_ids = []; 
    for (var i = 0; i < pendings.length; i++) {
        user_ids.push(pendings[i].player);
    }
    return user_ids;
} 

function onPress(player, coach) {
    console.log("player: ", player);
    console.log("team: ", coach);

    try {
        axios.post(`${baseUrl}/pending/delete`, QueryString.stringify ({
          player: player
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        });
        Alert.alert("Sucess - player deleted");
  
      } catch (error) {
          console.log(`Error:  ${error}`);
      }

    /*
    axios.post(`${baseUrl}/team/add`, {
        coach: coach,
        player: player
    }).then(function(response) {
        console.log("Player added to team", response.data);

        axios.post(`${baseUrl}/pending/delete`, {
            player: player
        }).then(function (response) {
            console.log("deleted player");
        }).catch(function (error) {
            console.log(error);
        });

    }).catch(function (error) {
        console.log(error);
    });
    */
}

export default function ApprovePlayer({navigation, route}) {
    const [player_list, setPlayerList] = React.useState([]); 
    const team = route.params;

    React.useEffect(() => {
        axios.post(`${baseUrl}/pending/list`, {
            team: team
        }).then(function (response) {
            console.log(response.data);

            const user_ids = extractPlayerIds(response.data);

            axios.post(`${baseUrl}/account/lookup`, {
                user_ids: user_ids
            }).then(function(response) {
                console.log("response.data in getPlayerInfo", response.data);
                setPlayerList(response.data);

            }).catch(function (error) {
                console.log(error);
            });
        })
        .catch(function (error) {
            console.log(error);
        });

    }, []); 

    const renderItem = ({ item }) => (
        <PlayerDisplay 
          onPress={() => onPress(item._id, team.coach)}
          first_name={item.first_name}
          last_name={item.last_name}
          email={item.email}
        />
    )

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