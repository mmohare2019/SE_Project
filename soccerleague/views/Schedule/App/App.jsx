import React, { useState, useEffect } from 'react';
import { ScheduleHeader } from './ScheduleHeader';
import { ScheduleHeader } from './ScheduleHeader';
import { Day } from './Day';
import { NewGameModal } from './NewGameModal';
import { DeleteGameModal } from './DeleteGameModal';
import { DateHooks } from './DateHooks';

export const App= () => {
    const [nav, setNav]= useState(0);
    const [clicked, setClicked]= useState();
    const [games, setGames]= useState(
        localStorage.getItem('games') ? 
        JSON.parse(localStorage.getItem('games')) : []);

    const gameForDate= date =>games.find(g=> g.date=== date);

    useEffect(() => {
        localStorage.setItem('games', JSON.stringify(games));
    }, [games]);

    const {days, displayDate}= DateHooks(games, nav);

    return (
        <>
        <div id="container">
            <ScheduleHeader 
                displayDate= {displayDate}
                nextNav= {() => setNav(nav+1)}
                previousNav= {() => setNav(nav-1)}
            />
              

            <div id="weekdays">
                <div>Sunday</div>
                <div>Monday</div>
                <div>Tuesday</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Friday</div>
                <div>Saturday</div>
            </div>

            <div id="calendar">
                {days.map((d, index) => (
                    <Day 
                        key= {index}
                        day= {d}
                        onClick= {() => {
                            if (d.value!== 'padding')
                              setClicked(d.date);  
                        }}
                    />
                ))}
            </div>
        </div>
        
        {
            clicked && !gameForDate(clicked) &&
            <NewGameModal
                closing= {() => setClicked(null)}
                saving= {title => {
                    setGames([...games, {title, date: clicked}]);
                    setClicked(null);
                }}
            />
        }

        {
            clicked && gameForDate(clicked) &&
            <DeleteGameModal 
                gameText= {gameForDate(clicked).title}
                closing= {() => setClicked(null)}
                deleting= {() => {
                    setGames(games.filter(g => g.date !== clicked));
                    setClicked(null);
                }}
            />
        }
        </>
    );
};
