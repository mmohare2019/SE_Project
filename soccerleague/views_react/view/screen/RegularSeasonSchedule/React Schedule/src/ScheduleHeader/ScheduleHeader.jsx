import React from 'react';

export const ScheduleHeader= (nextNav, previousNav, displayDate) => {
    return(
        <div id="header">
        <div id="displayMonth">{displayDate}</div>
        
        <div>
            <button onClick= {previousNav} id="backButton">Previous</button>
            <button onClick= {nextNav} id="nextButton">Next</button>
        </div>
    </div>
    );
};
