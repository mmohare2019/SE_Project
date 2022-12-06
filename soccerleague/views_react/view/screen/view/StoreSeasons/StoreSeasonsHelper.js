import { useState } from 'react';

const StoreSeasonsHelper= ({seasons, setSeasons}) => {
    const handleClearSeasons= () => {
        setSeasons([]);
    }

    const [modalVisible, setModalVisible]= useState(false);
    const [seasonInput, setSeasonInput]= useState();

    const handleAddSeasonInfo= (season) => {
        const newSeason= [...seasons, season];
        setSeasons(newSeason);
        setModalVisible(false);
    }
}
