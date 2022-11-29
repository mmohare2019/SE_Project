import React, { Fragment } from "react";
import { TouchableOpacity, View, Text, SafeAreaView, FlatList } from "react-native";
import Header from "../../component/header";
import FormStyle from "../../Form.style";
import FlatlistStyle from "../../Flatlist.style";
import axios from "axios";
const QueryString = require('query-string');

const baseUrl = "http://10.0.2.2:3000";

const TEAMS = [
  {
    _id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    team_name: 'Team 1',
    color: 'blue',
  },
  {
    _id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    team_name: 'Team 2',
    color: 'yellow',
  },
  {
    _id: '58694a0f-3da1-471f-bd96-145571e29d72',
    team_name: 'Team 3',
    color: 'red',
  },
];

const Item = ({ team_name, color }) => (
    <View style={FlatlistStyle.item}>
      <Text style={FlatlistStyle.text}> Team name: {team_name} </Text>
      <Text style={FlatlistStyle.text}> Color: {color} </Text>
    </View>
);
  
var team;

export default function PickTeam({navigation, route}) {
  const [team_list, setTeamList] = React.useState([]); 

    //var teams;
    /*
    (async () => {
        const TEAMS = await getTeams();
        console.log("waiting..", TEAMS);
    })()
    */
   /*
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
    */

  function setData(data) {
    setTeamList(data); 
  }


  axios.get(`${baseUrl}/team/display`).then((response) => {
    const MY_TEAMS = response.data;
    setData(MY_TEAMS);
    console.log("in axios", MY_TEAMS);
  })
  .catch(error=> console.error(`Error: ${error}`));

  //console.log(MY_TEAMS);

  //console.log("my teams", MY_TEAMS);
  const renderItem = ({ item }) => (
    <Item team_name={item.team_name} color={item.color}/>
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
        keyExtractor={item => item._id}cd 
      />
    </SafeAreaView>        

    <TouchableOpacity style={FormStyle.formButton} 
      onPress={()=> handleSubmit()}>
      <Text style={FormStyle.formButtonText}> Submit </Text>
    </TouchableOpacity>
  </>)
    
}
