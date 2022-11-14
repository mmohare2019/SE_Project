import React from 'react';

export const Day = ({day, onClick}) => {
    const className= `day ${day.value=== 'paddding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;
    return (
        <div onClick= {onClick} className={className}>
            {day.value=== 'padding' ? '' : day.value}
            {day.game && <div className='event{'>{day.game.title}</div>}
        </div>
    );
};
