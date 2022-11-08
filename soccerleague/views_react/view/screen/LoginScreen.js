import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import MainStyle from "../MainStyle.style";
import FormStyle from "../Form.style";
import axios from "axios";

const baseUrl = "http://10.0.2.2:3000";

export default function LoginScreen(){
    const [email, setEmail] = useState("tester1@example.com");
    const [password, setPassword] = useState("123");

    async function handleSubmit(email, pswd){
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", pswd);

        console.log(formData);
        console.log(`${baseUrl}/account/signin`);

        try {
            const response = await axios.post(`${baseUrl}/account/signin`, formData);
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