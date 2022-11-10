import React, {useState} from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import MainStyle from "../MainStyle.style";
import FormStyle from "../Form.style";
import axios from "axios";
const QueryString = require('query-string');

const baseUrl = "http://10.0.2.2:3000";
const logo = require("./../../static/greenville_soccer.png");


export default function LoginScreen({navigation}){
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function handleSubmit(email, password){
        try {
            const response = await axios.post(`${baseUrl}/account/signin`, QueryString.stringify ({
                email: email,
                password: password
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }

        navigation.navigate('AdminHome');
    }

    return (<>
        <View style={FormStyle.container}>
            <Image style={FormStyle.logo} source={logo}/>
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