import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MainStyle from "../../MainStyle.style";
import FormStyle from "../../Form.style";
import axios from "axios";

const baseUrl = "http://10.0.2.2:3000";

export default function enterScore() 
{ 
  async function enterScore() 
  {
    const formData = new FormData();

  }

}
  class Counter extends React.Component {
      state = { count: 0 };
      increment = () => this.setState({count: this.state.count + 1});
      decrement = () => this.setState({count: this.state.count - 1});
      render() {
        
  return ( <>
    <View style={FormStyle.groupView}>
        <Text style={MainStyle.emphasisText}> Enter Score: </Text>
    </View>

    <View style={styles.container}>
      <TouchableOpacity onPress={this.decrement}>
        <Text style={styles.text}>-</Text>
      </TouchableOpacity>
        <Text style={styles.text}>{this.state.count}</Text>
      <TouchableOpacity onPress={this.increment}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>

    <View>
      <TouchableOpacity style={FormStyle.formButton} 
        onPress={()=> enterScore()}>
        <Text style={FormStyle.formButtonText}> Submit Score </Text>
      </TouchableOpacity>
    </View>
    </>)
  }
}