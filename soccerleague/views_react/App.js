import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppHome from "./view/screen/appHome";
import CreateAccount from "./view/screen/createAccount";
import LoginScreen from "./view/screen/loginScreen";
import AdminHome from "./view/screen/adminHome";


const Stack = createNativeStackNavigator(); 

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name= "AppHome" component={AppHome}/>
                <Stack.Screen name= "CreateAccount" component={CreateAccount}/>
                <Stack.Screen name= "LoginScreen" component={LoginScreen}/>
                <Stack.Screen name= "AdminHome" component={AdminHome}/>
            </Stack.Navigator>
        </NavigationContainer>
        
    );
}
export default App;