import React from "react";
import "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppHome from "./view/screen/appHome";
import CreateAccount from "./view/screen/createAccount";
import LoginScreen from "./view/screen/loginScreen";
import AdminHome from "./view/screen/adminHome";
import CoachHome from "./view/screen/coachHome";
import PlayerHome from "./view/screen/playerHome";
import ParentHome from "./view/screen/parentHome";

const Stack = createNativeStackNavigator(); 

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name= "AppHome" component={AppHome}/>
                <Stack.Screen name= "CreateAccount" component={CreateAccount}/>
                <Stack.Screen name= "LoginScreen" component={LoginScreen}/>
                <Stack.Screen name= "AdminHome" component={AdminHome}/>
                <Stack.Screen name= "CoachHome" component={CoachHome}/>
                <Stack.Screen name= "PlayerHome" component={PlayerHome}/>
                <Stack.Screen name= "ParentHome" component={ParentHome}/>
            </Stack.Navigator>
        </NavigationContainer>
        
    );
}
export default App;