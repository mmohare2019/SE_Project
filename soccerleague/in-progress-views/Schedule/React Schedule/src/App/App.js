import React, { useState, useEffect } from 'react';
import { ScheduleHeader } from './src/ScheduleHeader';
import { ScheduleHeader } from './src/ScheduleHeader';
import { Day } from './Day';

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

    useEffect(() => {
        const weekdays= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dt= new Date();
        if (nav!== 0)
            dt.setMonth(new Date().getMonth()+nav);
        
        const day= dt.getDate();
        const month= dt.getMonth();
        const year= dt.getFullYear();

        const firstDayofMonth= new Date(year, month, 1);
        const daysInMonth= new Date(year, month+1, 0).getDate();

        const dateString= firstDayofMonth.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });

        setDisplayDate(`${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`);
        const paddingDays= weekdays.indexOf(dateString.split(', ')[0]);
        const daysArray= [];

        for (let i=1; i<=paddingDays+daysInMonth; i++)
        {
            const dayString= `${month+1}/${i-paddingDays}/${year}`; 

            if (i>paddingDays)
            {
                daysArray.push({
                    value: i-paddingDays,
                    game: gameForDate(dayString),
                    isCurrentDay: i-paddingDays=== day && nav=== 0,
                    date: dayString,
                });
            }
        
            else
            {   
                daysArray.push({
                    value: 'padding',
                    game: gameForDate(dayString),
                    isCurrentDay: false,
                    date: "",
                });
            }
        }
        setDays(daysArray);
    }, [games, nav]);

    return (
        <div id="container">
            <ScheduleHeader />
              

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
                            if (day.value!== 'padding')
                              setClicked(day.date);  
                        }}
                    />
                ))}
            </div>
        </div>
    );
};