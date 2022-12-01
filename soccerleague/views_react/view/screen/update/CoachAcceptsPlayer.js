import React, {useState} from 'react'
import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native'
import { PickOption } from './PickOption'

const CoachAcceptsPlayer= () => {
  const [choosePlayer, setChoosePlayer]= useState('Select Player');
  const [isPlayerVisible, setIsPlayerVisible]= useState(false);
  
  const changeOptionVisibility= (bool) => {
    setIsPlayerVisible(bool)
  }

  const setPlayer= (theOption) => {
    setChoosePlayer(theOption)
  }

  return (
    <SafeAreaView style= {styles.container}>
      <TouchableOpacity
        onPress= {() => changeOptionVisibility(true)} 
        style= {styles.touchableOpacity}
      >
        <Text style= {styles.text}>{choosePlayer}</Text>
      </TouchableOpacity>
      
      <Modal 
        transparent= {true}
        animationType= 'fade'
        visible= {isPlayerVisible}
        nRequestClose= {() => changeOptionVisibility(false)}
      >
        
        <PickOption
          changeOptionVisibility= {changeOptionVisibility}
          setPlayer= {setPlayer}
        />

      </Modal>
    </SafeAreaView>
  )

}

const styles= StyleSheet.create({
  container: 
  {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },

  text: 
  {
    marginVertical: 20,
    fontSize: 25,
  },

  touchableOpacity: 
  {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    marginHorizontal: 20
  }
});

export default CoachAcceptsPlayer;
