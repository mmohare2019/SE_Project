import React from "react";
import { TouchableOpacity, Text, SafeAreaView, FlatList } from "react-native";
import Header from "../../component/header";
import TeamDisplay from "../../component/teamDisplay";
import RosterDisplay from "../../component/rosterDisplay";
import FormStyle from "../../Form.style";
import FlatlistStyle from "../../Flatlist.style";
import axios from "axios";
import { response } from "express";
const QueryString = require('query-string');

const baseUrl = "http://10.0.2.2:3000";

export default function ViewRoster({navigation, route}) {
    const coach = route.params.coach;
    console.log("Coach logged in is: ", coach);

    const [player_list, setPlayerList] = React.useState([]);


    React.useEffect( () => {

    }, []);

    const renderItem = ({ item }) => (
        <RosterDisplay 
          first_name={item.first_name}
          last_name={item.last_name}
          email={item.email}
        />
    )

    return (<>
        <Header label="Your roster:"/>

        <SafeAreaView style={FlatlistStyle.container}>
        <FlatList
            data={player_list}
            renderItem={renderItem}
            keyExtractor={item => item._id}
        />
        </SafeAreaView>   
    </>)
}