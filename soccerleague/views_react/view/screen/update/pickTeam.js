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

  React.useEffect(() => {
    axios.get(`${baseUrl}/team/display`).then((response) => {
      setTeamList(response.data);
      console.log("in axios", response.data);
    })
    .catch(error=> console.error(`Error: ${error}`));
  }, []);

  async function sendPlayer(team) {
    console.log("Team id is", team);
    try {
        const response = await axios.post(`${baseUrl}/team/update`, QueryString.stringify ({
          team: team
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
      });
      //console.log(response.data);
      //Alert.alert("Success - request sent to coach for approval!");

    } catch (error) {
        console.log(error.message);
    }
    
    navigation.navigate('PlayerHome');
  }

  const renderItem = ({ item }) => (
    <TeamDisplay 
      onPress={()=> sendPlayer(item._id)}
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
      <Text style={FormStyle.formButtonText}> Submit </Text>
    </TouchableOpacity>
  </>)
    
}