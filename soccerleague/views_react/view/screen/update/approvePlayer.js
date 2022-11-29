import React from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import Header from "../../component/header";
import FormField from "../../component/formField";
import FormStyle from "../../Form.style";
import axios from "axios";
import { response } from "express";
const QueryString = require('query-string');

const baseUrl = "http://10.0.2.2:3000";
export default function ApprovePlayer({navigation, route}) {
    
    return (<>
        <Header label="Review the following player requests:" />
    </>)
}