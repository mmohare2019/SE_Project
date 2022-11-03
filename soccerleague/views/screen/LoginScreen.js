import React from "react";
import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import MainStyle from "../MainStyle.style";
import FormStyle from "../Form.style";
import axios from "axios";

// initializing email and password use states
export default function LoginScreen() {
   const [email, setEmail] = React.useState("");
   const [password, setPassword] = React.useState("");
}

return()<>
   // include image from file path
   <View style={styles.container}>
      <Image style={styles.image} source={require(".../public/images/greenville_soccer.png")} />
   // login button
    <View style={FormStyle.groupView}>
      <Text style={MainStyle.emphasisText}> Login </Text>
    </View>
    <View style={FormStyle.groupView}>
       // email text input
       <Text style={FormStyle.label}>Email:</Text>
       <TextInput onChangeText={setEmail} style={FormStyle.input} autoCapitalize={false} />
       // password text inout with secure entry
       <Text style={FormStyle.label}>Password:</Text>
       <TextInput onChangeText={setPassword} style={FormStyle.input} secureTextEntry={true} />

            // submit button is dimmed when pressed
            <TouchableOpacity style={FormStyle.formButton} 
                 onPress={()=> handleSubmit(email,password)}>
                <Text style={FormStyle.formButtonText}> Submit </Text>
            </TouchableOpacity>
        </View>
        </>
   );
}
