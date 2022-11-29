import React, { Fragment } from "react";
import { TouchableOpacity, View, Text, SafeAreaView, FlatList } from "react-native";
import Header from "../../component/header";
import FormStyle from "../../Form.style";
import FlatlistStyle from "../../Flatlist.style";
import axios from "axios";
const QueryString = require('query-string');

const baseUrl = "http://10.0.2.2:3000";


const TeamDetails = ({ team_name, color }) => (
    <View style={FlatlistStyle.item}>
      <Text style={FlatlistStyle.text}> Team name: {team_name} </Text>
      <Text style={FlatlistStyle.text}> Color: {color} </Text>
    </View>
);

export default function PickTeam({navigation, route}) {
  const [team_list, setTeamList] = React.useState([]); 

  function setData(data) {
    setTeamList(data); 
  }
  
  React.useEffect(() => {
    axios.get(`${baseUrl}/team/display`).then((response) => {
      const MY_TEAMS = response.data;
      setData(MY_TEAMS);
      console.log("in axios", MY_TEAMS);
    })
    .catch(error=> console.error(`Error: ${error}`));
  }, []);
  

  const renderItem = ({ item }) => (
    <TeamDetails team_name={item.team_name} color={item.color}/>
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
