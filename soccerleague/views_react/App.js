import React from "react";
import "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppHome from "./view/screen/home/appHome";
import CreateAccount from "./view/screen/account/createAccount";
import LoginScreen from "./view/screen/account/loginScreen";
import AdminHome from "./view/screen/home/adminHome";
import CoachHome from "./view/screen/home/coachHome";
import PlayerHome from "./view/screen/home/playerHome";
import ParentHome from "./view/screen/home/parentHome";
import UpdateTeamDetails from "./view/screen/update/updateTeamDetails";
import PickTeam from "./view/screen/update/pickTeam";
import ApprovePlayer from "./view/screen/update/approvePlayer";

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
                <Stack.Screen name= "UpdateTeamDetails" component={UpdateTeamDetails}/>
                <Stack.Screen name= "PickTeam" component={PickTeam}/>
                <Stack.Screen name= "ApprovePlayer" component={ApprovePlayer}/>
            </Stack.Navigator>
        </NavigationContainer>
        
    );
}
export default App;