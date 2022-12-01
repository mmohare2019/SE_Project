import React from "react";
import { Text, View, TouchableOpacity} from 'react-native';
import FlatlistStyle from "../Flatlist.style";

export default function PlayerDisplay({first_name, last_name, email, onPress}) {
    return (
        <TouchableOpacity style={FlatlistStyle.item} onPress={onPress}>
            <Text style={FlatlistStyle.text}> First name: {first_name} </Text>
            <Text style={FlatlistStyle.text}> Last name: {last_name} </Text>
            <Text style={FlatlistStyle.text}> Email: {email} </Text>
        </TouchableOpacity>
    )
}