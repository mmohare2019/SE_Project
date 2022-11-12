import React from "react";
import { Text, TouchableOpacity} from 'react-native';
import HomeStyle from "../Home.style";

export default function CustomButton({label, onPress}) {
    
    return (
        <TouchableOpacity style={HomeStyle.formButton} 
            onPress={onPress}>
            <Text style={HomeStyle.formButtonText}> {label} </Text>
        </TouchableOpacity>
    );
};