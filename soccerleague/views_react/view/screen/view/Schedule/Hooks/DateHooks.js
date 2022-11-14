import React, { useEffect, useState } from 'react';

export const DateHooks= (games, nav) => {
    const [displayDate, setDisplayDate]= useState('');
    const gameForDate= date =>games.find(g=> g.date=== date);
    const [days, setDays]= useState([]);

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
                    date: '',
                });
            }
        }
        setDays(daysArray);
    }, [games, nav]);

    return {
        days,
        displayDate,
    };

};
