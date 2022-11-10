import React from "react";
import { TouchableOpacity, View, Text } from 'react-native';
import FormStyle from "../Form.style";

export default function LogoutButton({onPress}) {
    return (
        <View>
            <TouchableOpacity style={FormStyle.formSubmitButton} 
                onPress={onPress}>
                <Text style={FormStyle.formSubmitButtonText}> Log out </Text>
            </TouchableOpacity>
        </View>
    );
};