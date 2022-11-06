import React from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import MainStyle from "../MainStyle.style";
import FormStyle from "../Form.style";
import axios from "axios";

export default function LoginScreen(){
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleSubmit(pEmail, pPwd){
        const user = {login: pEmail, password: pPwd};
        // I would call a method from a different Layer
        
        console.log(JSON.stringify(user));
        alert( JSON.stringify(user) );
    }

    return (<>
        <View style={FormStyle.groupView}>
            <Text style={MainStyle.emphasisText}> Login </Text>
        </View>
        <View style={FormStyle.groupView}>
            <Text style={FormStyle.label}>Email:</Text>
            <TextInput onChangeText={setEmail} style={FormStyle.input} autoCapitalize={false} />

            <Text style={FormStyle.label}>Password:</Text>
            <TextInput onChangeText={setPassword} style={FormStyle.input} secureTextEntry={true} />

            <TouchableOpacity style={FormStyle.formButton} 
                 onPress={()=> handleSubmit(email,password)}>
                <Text style={FormStyle.formButtonText}> Submit </Text>
            </TouchableOpacity>
        </View>
        </>
    );
}