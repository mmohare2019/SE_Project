import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FormStyle from "../../Form.style";
import Header from "../../component/header";
import FormField from "../../component/formField";
import PasswordFormField from "../../component/passwordForm";
import axios from "axios";
import { response } from "express";
const QueryString = require('query-string');

const baseUrl = "http://10.0.2.2:3000";

// change name
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

            if (response.data.account_type === "coach") { 
                navigation.navigate("CoachHome");
            }

            else if (response.data.account_type === "admin") {
                navigation.navigate("AdminHome");
            }

            else if (response.data.account_type === "parent") {
                navigation.navigate("ParentHome");
            }

            else {
                navigation.navigate("PlayerHome");
            }


        } catch (error) {
            console.log(error.message);
        }

    }

    return (<>
        <Header label={"Sign in"}/>

        <View style={FormStyle.groupView}>
            <FormField label={"Email: "} setFunction={setEmail}/>
            <PasswordFormField setFunction={setPassword}/>

            <TouchableOpacity style={FormStyle.formButton} 
                 onPress={()=> handleSubmit(email,password)}>
                <Text style={FormStyle.formButtonText}> Submit </Text>
            </TouchableOpacity>
        </View>
        </>
    );
}
