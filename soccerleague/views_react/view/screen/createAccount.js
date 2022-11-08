import React from "react";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import MainStyle from "../MainStyle.style";
import FormStyle from "../Form.style";
import axios from axios;

const baseUrl = "http://10.0.2.2:3000";

export default function LoginScreen() {
   const [first_name, setFirstName] = React.useState("");
   const [last_name, setLastName] = React.useState("");
   const [account_type, setAccountType] = React.useState("");
   const [email, setEmail] = React.useState("");
   const [password, setPassword] = React.useState("");

   async function handleSubmit(first_name, last_name, account_type, email, password){
      const formData = new FormData();
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("account_type", account_type);
      formData.append("email", email);
      formData.append("password", password);

      console.log(formData);
      console.log(`${baseUrl}/account`);

      try {
          const response = await axios.post(`${baseUrl}/account`, formData);
          console.log(response.data);
      } catch (error) {
          console.log(error.message);
      }

  }

  return (<>
      <View>
         <Image
            source = {require("..\public\images\greenville_soccer.png")}>
         </Image>
      </View>
      <View style={FormStyle.groupView}>
         <Text style={MainStyle.emphasisText}> Create Account </Text>
      </View>
      <View style={FormStyle.groupView}>
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
      </View>
      </>
   );

}
