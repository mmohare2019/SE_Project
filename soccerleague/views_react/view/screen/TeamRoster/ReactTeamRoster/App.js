import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';

const listTabs= [
    {
        status: 'All'
    },

    {
        status: 'Red Team'
    },

    {
        status: 'Blue Team'
    }
]

const data= [
    {
        name: 'John Doe',
        status: 'Blue Team'
    },
    {
        name: 'Jane Doe',
        status: 'Blue Team'
    },
    
    {
        name: 'Mary Jones',
        status: 'Red Team'
    },

    {
        name: 'Jack Smith',
        status: 'Red Team'
    }
]

const App= () =>
{
    const [status, setStatus]= useState('All')
    const [dataList, setDataList]= useState(data)

    const setStatusFilter= status => {
        if (status!== 'All')
            setDataList([...data.filter(e => e.status=== status)])
        else
            setDataList(data)
        
        setStatus(status)
    }

    const renderItem= ({item, index}) => {
        return (
            <>
            <View key= {index} style= {styles.itemContainer}></View>
            
            <View style= {styles.itemBody}>
                    <Text style= {styles.itemName}>{item.name}</Text>
            </View>

            <View style= {[
                styles.itemStatus, 
                {backgroundColor: item.status=== 'Red Team' ? '#38C928' : '#83E685'}]}>
                <Text>{item.status}</Text>
            </View>
            </>
        )
    }

    const separator= () => {
        return <View style= {{height: 1, backgroundColor: '#f1f1f1'}}/>
    }
    return (
    <SafeAreaView style= {styles.container}>
      <View style= {styles.listTabs}>
        {
            listTabs.map(e => (
                <TouchableOpacity 
                    style= {[styles.buttonTabs, status=== e.status && styles.activeButton]}
                    onPress= {() => setStatusFilter(e.status)}
                >
                    <Text style= {[styles.textTabs, status=== e.status && styles.activeTextTabs]}>
                        {e.status}
                    </Text>
                </TouchableOpacity>
            ))
        }
      </View>

      <FlatList
        data= {dataList}
        keyExtractor= {(e, i) => i.toString()}
        renderItem= {renderItem}
        ItemSeparatorComponent= {separator}
      />
    </SafeAreaView>
  );
}

export default App

const styles= StyleSheet.create({
  container: 
  {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },

  listTabs:
  {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20
  },

  buttonTabs:
  {
    width: Dimensions.get('window').width/3.5,
    flexDirection: 'row',  
    borderWidth: 0.5,
    borderColor: '#38C928',
    padding: 10,
    justifyContent: 'center'
  },

  textTabs:
  {
    fontSize: 16,
  },

  activeButton:
  {
    backgroundColor: '#83E685',
  },

  activeTextTabs:
  {
    color: '#FFFFFF',
  },
  
  itemContainer:
  {
    flexDirection: 'row',
    paddingVertical: 15
  },

  itemBody:
  {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },

  itemName:
  {
    fontWeight: 'bold',
    fontSize: 16 
  },

  itemStatus:
  {
    backgroundColor: 'green',
    paddingHorizontal: 6,
    justifyContent: 'center',
    right: 12
  }

})
