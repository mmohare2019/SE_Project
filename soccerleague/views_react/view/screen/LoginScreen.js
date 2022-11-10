import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FormStyle from "../Form.style";
import Header from "../component/header";
import FormField from "../component/formField";
import axios from "axios";
const QueryString = require('query-string');

const baseUrl = "http://10.0.2.2:3000";


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

        // evaluate which screen to display here 
        navigation.navigate('AdminHome');
    }

    return (<>
        <Header text={"Sign in"}/>

        <View style={FormStyle.groupView}>
            <FormField label={"Email: "} setFunction={setEmail}/>
            <FormField label={"Password: "} setFunction={setPassword}/>

            <TouchableOpacity style={FormStyle.formButton} 
                 onPress={()=> handleSubmit(email,password)}>
                <Text style={FormStyle.formButtonText}> Submit </Text>
            </TouchableOpacity>
        </View>
        </>
    );
}