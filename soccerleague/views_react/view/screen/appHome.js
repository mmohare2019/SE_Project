import React from "react";
import { Image, Text, View } from "react-native";
import CustomButton from "../component/button";
import HomeStyle from "../Home.style";
const QueryString = require('query-string');

const baseUrl = "http://10.0.2.2:3000";
const logo = require("./../../static/greenville_soccer.png");

export default function AppHome({navigation}) {
    async function onCreateAccount() {
        navigation.navigate('CreateAccount');
    }

    async function onLoginAccount() {
        navigation.navigate('LoginScreen');
    }

    // Don't use header component here because the logo is slightly bigger on the home page!
    return (<>
        <View style={HomeStyle.container}>
            <Image style={HomeStyle.logo} source={logo}/>
            <Text style={HomeStyle.emphasisText}> Greenville Soccer League </Text>
        </View>

        <View style={HomeStyle.groupView}>
            <CustomButton text={"Create account"} onPress={onCreateAccount}/>
            <CustomButton text={"Sign in to account"} onPress={onLoginAccount}/>
        </View>
    </>);
}