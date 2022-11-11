import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import FormStyle from "../../Form.style";
import Header from "../../component/header";
import FormField from "../../component/formField";
import PasswordFormField from "../../component/passwordForm";
//import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
const QueryString = require('query-string');

const baseUrl = "http://10.0.2.2:3000";

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
        console.log(response.data);

      } catch (error) {
          console.log(error.message);
      }
      
      navigation.navigate('LoginScreen');

  }

  return (<>
      <Header text={"Create Account"} />
     
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
