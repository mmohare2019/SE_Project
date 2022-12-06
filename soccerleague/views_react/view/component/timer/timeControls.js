import React from "react";
import {TouchableOpacity,View,Text,StyleSheet} from 'react-native';

export default function timeControls({
    status,
    handleStart,
    handleStop,
}){
    return(
        <View style={styles.row}>
        // start functionality
        <TouchableOpacity
            disabled={status===0 || status===1}
            style={(status===0 || status===1)?{...styles.button,opacity:0.5}:styles.button}
            onPress={handleStart}
        >
            <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
            disabled={status===-1}
            style={(status===-1)?{...styles.button,opacity:0.5}:styles.button}
            onPress={handleStop}
        >
            <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
        
    </View>
    )
}
const styles= StyleSheet.create({
    row:{
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        marginVertical:50,
        paddingHorizontal:50,
        width: '100%'
    },
    button:{
        paddingHorizontal:10,
        paddingVertical:10,
        backgroundColor:'gray',
        borderRadius:5
    },
    buttonText:{
        fontSize:20,
        color:'#ABD699',
        fontWeight:'bold',
    }
})
