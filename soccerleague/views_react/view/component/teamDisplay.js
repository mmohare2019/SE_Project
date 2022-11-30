import React from "react";
import { Text, View, } from 'react-native';
import FlatlistStyle from "../Flatlist.style";

export default function TeamDisplay({team_name, color}) {
    return (
        <View style={FlatlistStyle.item}>
            <Text style={FlatlistStyle.text}> Team name: {team_name} </Text>
            <Text style={FlatlistStyle.text}> Color: {color} </Text>
        </View>
    )
}