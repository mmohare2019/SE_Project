import React, { useState } from "react";
import { ScrollView, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainStyle from "../MainStyle.style";
import FormStyle from "../Form.style";
import axios from "axios";
const QueryString = require('query-string');

const baseUrl = "http://10.0.2.2:3000";
const logo = require("./../../static/greenville_soccer.png");

export default function CreateAccount({navigation}) {
   const [first_name, setFirstName] = React.useState("");
   const [last_name, setLastName] = React.useState("");
   const [account_type, setAccountType] = React.useState("");
   const [email, setEmail] = React.useState("");
   const [password, setPassword] = React.useState("");

   async function handleSubmit(first_name, last_name, account_type, email, password){
      try {
         const response = await axios.post(`${baseUrl}/account`, QueryString.stringify ({
            first_name: first_name,
            last_name: last_name,
            account_type: account_type,
            email: email,
            password: password
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
      } catch (error) {
          console.log(error.message);
      }

  }

  return (<>
      <View style={FormStyle.container}>
            <Image style={FormStyle.logo} source={logo}/>
            <Text style={MainStyle.emphasisText}> Create Account </Text>
        </View>
     
      <ScrollView style={FormStyle.groupView}>
         <Text style={FormStyle.label}>First name:</Text>
         <TextInput onChangeText={setFirstName} style={FormStyle.input} autoCapitalize={false} />

         <Text style={FormStyle.label}>Last name:</Text>
         <TextInput onChangeText={setLastName} style={FormStyle.input} autoCapitalize={false} />

         <Text style={FormStyle.label}>Role (Admin, Player, Parent, Coach):</Text>
         <TextInput onChangeText={setAccountType} style={FormStyle.input} autoCapitalize={false} />

         <Text style={FormStyle.label}>Email:</Text>
         <TextInput onChangeText={setEmail} style={FormStyle.input} autoCapitalize={false} />

         <Text style={FormStyle.label}>Password:</Text>
         <TextInput onChangeText={setPassword} style={FormStyle.input} secureTextEntry={true} />

         <TouchableOpacity style={FormStyle.formButton} 
               onPress={()=> handleSubmit(email,password)}>
            <Text style={FormStyle.formButtonText}> Submit </Text>
         </TouchableOpacity>
      </ScrollView>
      </>
   );

}
