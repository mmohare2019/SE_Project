import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MainStyle from "../MainStyle.style";
import FormStyle from "../Form.style";
import Timer from "../../../component/timer";
import { enterScore } from "../../../component/homeScreen";
import axios from axios;

const baseUrl = "http://10.0.2.2:3000";

// timer function uses comprehensive timer component
function DisplayTimer() {
  return (
    <View style={styles.container}>
      <Timer/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
