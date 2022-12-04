import React from "react";
import { TouchableOpacity, Text, SafeAreaView, FlatList, Alert } from "react-native";
import Header from "../../component/header";
import TeamDisplay from "../../component/teamDisplay";
import FormStyle from "../../Form.style";
import FlatlistStyle from "../../Flatlist.style";
import axios from "axios";
import { response } from "express";
const QueryString = require('query-string');

const baseUrl = "http://10.0.2.2:3000";

export default function PickTeam({navigation, route}) {
  const [team_list, setTeamList] = React.useState([]); 

  const player = route.params.player;
  console.log("Player in pick team is ", player);

  React.useEffect(() => {
    axios.get(`${baseUrl}/team/display`).then((response) => {
      setTeamList(response.data);
      console.log("in axios", response.data);
    })
    .catch(error=> console.error(`Error: ${error}`));
  }, []);

  async function sendPlayer(team, player) {
    console.log("Team id is", team);
    console.log("Player to be sent is", player);

    try {
      const response = await axios.post(`${baseUrl}/pending/new`, QueryString.stringify ({
        team: team, 
        player: player
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      console.log("Player Received from controller is", response.data);
      Alert.alert("Success - request sent to coach for approval!");

    } catch (error) {
        console.log(`Error:  ${error}`);
    }
    
    navigation.navigate('PlayerHome');
  }

  const renderItem = ({ item }) => (
    <TeamDisplay 
      onPress={() => sendPlayer(item._id, player)}
      team_name={item.team_name}
      color={item.color}
    />
  );
    
  async function handleSubmit() {
    navigation.navigate('PlayerHome');
  }

  return (<>
    <Header label="Pick a team to join"/>

    <SafeAreaView style={FlatlistStyle.container}>
      <FlatList
        data={team_list}
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