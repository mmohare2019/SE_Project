import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import FormStyle from "../../Form.style";
import Header from "../../component/header";
import FormField from "../../component/formField";
import PasswordFormField from "../../component/passwordForm";
//import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import { response } from "express";
const QueryString = require('query-string');

const baseUrl = "http://10.0.2.2:3000";


async function makeRoster(user) {
   try {
      const response = await axios.post(`${baseUrl}/roster`, user.data);
      console.log("Roster created with coach");
      console.log(response.data);
      
      return response;

   } catch (error) {
      console.log("Problem with creating roster", error.message);
   }
}

async function makeTeam(roster) {
   try {
      const response = await axios.post(`${baseUrl}/team/initialize`, roster.data);
      console.log("Team created with coach");
      console.log(response.data);
      return response;
   } catch (error) {
      console.log("Problem with creating team", error.message);
   }

}

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
        console.log("Account created");
        console.log(response.data);

        // Set up roster for coach 
        if (response.data.account_type === "coach") {
            const res = await makeRoster(response);
            console.log("Roster");
            console.log(res.data);

            const resp = await makeTeam(res);
            console.log("Team");
            console.log(resp.data);
         }

      } catch (error) {
          console.log("Problem creating account", error.message);
      }

      navigation.navigate('LoginScreen');
  }

  return (<>
      <Header label={"Create Account"} />
     
      <ScrollView style={FormStyle.groupView}>
         <FormField label={"First name: "} setFunction={setFirstName}/>
         <FormField label={"Last name: "} setFunction={setLastName} />
         <FormField label={"Role (Admin, Player, Parent, Coach): "} setFunction={setAccountType}/>
         <FormField label={"Email: "} setFunction={setEmail}/>
         <PasswordFormField setFunction={setPassword}/>
         
         
         <TouchableOpacity style={FormStyle.formButton} 
               onPress={()=> handleSubmit(first_name, last_name, account_type, email, password)}>
            <Text style={FormStyle.formButtonText}> Submit </Text>
         </TouchableOpacity>
      </ScrollView>
      </>
   );

}
