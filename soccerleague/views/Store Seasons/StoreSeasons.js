import AsyncStorage from '@react-native-async-storage/aysnc-storage';
import { useState } from 'react';

export default function StoreSeasons2()
{
    const [storageReady, setStorageReady]= useState(false);

    const exampleSeasons= [{
        season: "Fall 2019",
        champion: "Red Team",
        seasonID: "1"
        }, {
            season: "Fall 2021",
            champion: "Blue Team",
            seasonID: "2",
        }, {
            season: "Fall 2022",
            champion: "Green Team",
            seasonID: "3"
    }]

    const [season, setSeason]= useState(initializeSeasons);

    const loadSeasons= () => {
        AsyncStorage.getItem("storedSeasons").then(data => {
            if (data!== null)
                setSeason(JSON.parse(data))
        }).catch ((error) => console.log(error));
    }

    if (!storageReady)
    {
        return (
           startAsync= {loadSeasons}
           onFinish= {() => setStorageReady(true)}
           onError= {console.warn}
        )
    }

    return (
        <Container>
            <Home season= {season} setSeason= {setSeason}/>
        </Container>
    )
}
