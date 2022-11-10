import React from "react";
import { Text, View, TextInput} from 'react-native';
import FormStyle from "../Form.style";

export default function FormField({label, setFunction}) {
    return (
    <View>
        <Text style={FormStyle.label}> {label} </Text>
        <TextInput onChangeText={setFunction} style={FormStyle.input} autoCapitalize={false} />
    </View> 
    )
}