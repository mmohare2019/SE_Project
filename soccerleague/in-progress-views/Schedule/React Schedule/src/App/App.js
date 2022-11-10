import React, {useState, useEffect} from 'react';

export const App= () => {
    const [nav, setNav]= useState(0);
    const [clicked, setClicked]= useState();
    const [displayDate, setDisplayDate]= useState('');
    const [days, setDays]= useState();
    const [games, setGames]= useState(
        localStorage.getItem('games') ? 
        JSON.parse(localStorage.getItem('games')) : []);

    const gameForDate= date =>games.find(g=> g.date=== date);

    useEffect(() => {
        localStorage.setItem('games', JSON.stringify(games));
    }, [games]);

    return (<></>);
};
