import React from 'react'
import 
{
    StyleSheet, Text, View, 
    TouchableOpacity, Dimensions, ScrollView
} 
from 'react-native'

const OPTIONS= ['Accept Player', 'Deny Player']
const WIDTH= Dimensions.get('window').width;
const HEIGHT= Dimensions.get('window').height;

const PickOption= (options) => {
    const onPressOption= (theOption) => {
        options.changeOptionVisibility(false);
        options.setPlayer(theOption);
    }

    const theOption= OPTIONS.map((item, index) => {
        return (
            <TouchableOpacity
                style= {styles.theOption}
                key= {index}
                onPress= {() => onPressOption(item)}
            >
                <Text style= {styles.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })

    return (
        <TouchableOpacity
            onPress= {() => options.changeOptionVisibility(false)}
            style= {styles.container}
        >
            <View style= {[styles.modal, {width: WIDTH-20, height: HEIGHT/2}]}>
                <ScrollView>
                    {theOption}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    container: 
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modal:
    {
       backgroundColor: 'white', 
       borderRadius: 10
    },

    theOption: 
    {
        alignItems: 'flex-start'
    },

    text: 
    {
       margin: 20,
       fontSize: 20,
       fontWeight: 'bold'
    }
})

export {PickOption}
