import AsyncStorage from '@react-native-async-storage/aysnc-storage';
import { useState } from 'react';

const StoreSeasonsHelper= ({seasons, setSeasons}) => {
    const handleClearSeasons= () => {
        setSeasons([]);
        AsyncStorage.setItem("storedSeasons", JSON.stringify([])).then(() => {
            setSeasons([]);
        }).catch(error => console.log(error));
    }

    const [modalVisible, setModalVisible]= useState(false);
    const [seasonInput, setSeasonInput]= useState();

    const handleAddSeasonInfo= (season) => {
        const newSeason= [...seasons, season];
        setSeasons(newSeason);
        setModalVisible(false);

        AsyncStorage.setItem("storedSeasons", JSON.stringify(newSeason)).then(() => {
            setSeasons(newSeason);
            setModalVisible(false);
        }).catch(error => console.log(error));
    }

    const [editSeason, setEditSeason]= useState(null);

    const handleClickEdit= (item) => {
        setEditSeason(item);
        setModalVisible(true);
        setSeasonInput(item.title);
    }

    const handleEditSeason= (editedSeason) => {
       const newSeason= [...seasons];
       const seasonIndex= seasons.findIndex((season) => season.seasonID=== editedSeason.seasonID);
       newSeason.splice(seasonIndex, 1, editedSeason);

       AsyncStorage.setItem("storedSeasons", JSON.stringify(newSeason)).then(() => {
            setSeasons(newSeason);
            setModalVisible(false);
            setEditSeason(null);
        }).catch(error => console.log(error));
    }

    return (
        <>
        </>
    )
}
