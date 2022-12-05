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
            console.log("Signed into the following account:")
            console.log(response.data);

            if (response.data.account_type === "coach") { 
                navigation.navigate("CoachHome", {
                    coach: response.data._id
                });
            }

            else if (response.data.account_type === "admin") {
                navigation.navigate("AdminHome", {
                    admin: response.data._id
                });
            }

            else if (response.data.account_type === "parent") {
                navigation.navigate("ParentHome", {
                    parent: response.data._id
                });
            }

            else {
                navigation.navigate("PlayerHome", {
                    player: response.data._id
                });
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
