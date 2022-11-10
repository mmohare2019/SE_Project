import React from "react";
import { Text, TouchableOpacity} from 'react-native';
import HomeStyle from "../Home.style";

export default function CustomButton({text, onPress}) {
    
    return (
        <TouchableOpacity style={HomeStyle.formButton} 
            onPress={onPress}>
            <Text style={HomeStyle.formButtonText}> {text} </Text>
        </TouchableOpacity>
    );
};