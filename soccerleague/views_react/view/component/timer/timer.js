import {useState,useEffect} from 'react'
import {View,StyleSheet} from 'react-native';
import TimeControls from './timeControls';
import TimeDisplay from './timeDisplay';

export default function Timer(){
    const [time,setTime] = useState(0);
    const [status,setStatus] = useState(-1)
    const reset=()=>{
    }
    const handleStart=()=>{
    }
    const handleStop=()=>{
    }
    return(
        <View style={styles.container}>
            <TimeDisplay time={time} />
            <Controls
                status={status}
                handleStart={handleStart}
                handleStop={handleStop}
            />
        </View>
    )
}
const styles= StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        width: '100%'
    },
})
