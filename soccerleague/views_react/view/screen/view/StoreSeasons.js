import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AsyncStorageStatic
} from 'react-native';

export default class StoreSeasons extends React.Component 
{
    render()
    {
        return (
            <View style= {styles.container}>
                <TouchableOpacity onPress={this.saveSeason}>
                    <Text>Save Season Data</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.displaySeason}>
                    <Text>Display Season Data</Text>
                </TouchableOpacity>
            </View>
        );
    }

    saveSeason()
    {
       let testSeason = 
       {
            seasonName: 'Fall 2022',
            champion: 'Green Team'
       }

       let season= 'Fall 2022';
       AsyncStorageStatic.setItem('season', JSON.stringify(testSeason));
    }

    displaySeason= async () => 
    {
        try {
            let season= await AsyncStorageStatic.getItem('season');
            let parsed= JSON.parse(season)
            alert(parsed.seasonName);
        }

        catch (error) {
            alert(error);
        }
    }

}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
