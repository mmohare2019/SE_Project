import {Text,StyleSheet,View} from 'react-native';

// time formatting and necessary conversion
export default function Time({time}){
    const transformMinutes=()=>{
        const convertedValue= Math.floor((time / 60000) % 60);
        const formattedValue=("0" +convertedValue).slice(-2)
        return formattedValue
    }

    const transformSeconds=()=>{
        const convertedValue= Math.floor((time / 1000) % 60);
        const formattedValue=("0" +convertedValue).slice(-2)
        return formattedValue
    }

    const transformMilliseconds=()=>{
        const convertedValue= Math.floor((time / 10) % 100);
        const formattedValue=("0" +convertedValue).slice(-2)
        return formattedValue
    }

    return(
        <View style={styles.row}>
            <Text style={styles.time}>
                {transformMinutes()} :
                <Text> </Text>{transformSeconds()} :
                <Text> </Text>{transformMilliseconds()}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    row:{
        display:'flex',
    },
    time:{
        fontSize:36,
        fontWeight:'bold',
        color:'#00000'
    }
})
