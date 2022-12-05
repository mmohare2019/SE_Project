import React from "react";
import { Text, View } from 'react-native';
import FlatlistStyle from "../Flatlist.style";

export default function RosterDisplay({first_name, last_name, email }) {
    return (
        <View style={FlatlistStyle.item} >
            <Text style={FlatlistStyle.text}> First name: {first_name} </Text>
            <Text style={FlatlistStyle.text}> Last name: {last_name} </Text>
            <Text style={FlatlistStyle.text}> Email: {email} </Text>
        </View>
    )
}