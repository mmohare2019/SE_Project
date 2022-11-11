import React from "react";
import { Text, View, TextInput} from 'react-native';
import FormStyle from "../Form.style";

export default function PasswordFormField({setFunction}) {
    return (
    <View>
        <Text style={FormStyle.label}> Password: </Text>
        <TextInput onChangeText={setFunction} style={FormStyle.input} autoCapitalize={false} secureTextEntry={true} />
    </View> 
    )
}