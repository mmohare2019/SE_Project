// yarn add react-native-modal-datetime-picker
import React, {Component} from 'react';

import 
{
    Text,
    View,
    StyleSheet,
    AppRegistry,
    TouchableOpacity
} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default class GamesCalendar extends Component
{
    constructor()
    {
       super()
       this.state= 
       {
            isVisible: false,
            chosenDate: ''
       }
    }

    handlePicker= () => {
        this.setState({
            isVisible: false
        })
    }

    showPicker= () => {
        this.setState({
            isVisible: true
        })
    }

    hidePicker= (datetime) => {
        this.setState({
            isVisible: false,
            chosenDate: moment(datetime).format('MMMM, Do YYYY HH:mm')
        })
    }

    render()
    {
        return (
            <View style= {styles.container}>
                <Text>

                </Text>

                <TouchableOpacity style= {styles.button} onPress= {this.showPicker}>
                    <Text style= {styles.text}>Show Schedule</Text>
                </TouchableOpacity>

            <DateTimePicker
                isVisible= {this.state.isVisible}
                onConfirm= {this.handlePicker}
                onCancel= {this.hidePicker}
                mode= {'datetime'}
                datePickerModeAndroid= {'spinner'}
                is24Hour= {false}
            />
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container: 
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
    },

    button:
    {
        width: 250,
        height: 50,
        backgroundColor: '#0ba32a',
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 15
    },

    text:
    {
        fontSize: 18,
        color: 'white',
        textAlign: 'center' 
    }
})
