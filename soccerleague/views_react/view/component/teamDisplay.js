import React from "react";
import { Text, View, TouchableOpacity} from 'react-native';
import FlatlistStyle from "../Flatlist.style";

export default function TeamDisplay({team_name, color, onPress}) {
    return (
        <TouchableOpacity style={FlatlistStyle.item} onPress={onPress}>
            <Text style={FlatlistStyle.text}> Team name: {team_name} </Text>
            <Text style={FlatlistStyle.text}> Color: {color} </Text>
        </TouchableOpacity>
    )
}