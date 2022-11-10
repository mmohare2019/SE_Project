import React from "react";
import { TouchableOpacity} from 'react-native';
import HomeStyle from "../Home.style";

export default function CustomButton(props) {
    
    return (
        <TouchableOpacity style={HomeStyle.formButton} 
            onPress={()=> props.funct }>
            <Text style={HomeStyle.formButtonText}> {props.txt} </Text>
        </TouchableOpacity>
    );
};