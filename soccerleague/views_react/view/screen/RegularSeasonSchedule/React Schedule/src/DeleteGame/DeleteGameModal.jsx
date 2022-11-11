import React from 'react';

export const DeleteGameModal= ({deleting, gameText, closing}) => {
    return(
        <>
            <div id="deleteGameModal">
                <h2>Game</h2>
                <p id="gameText">{gameText}</p>

                <button onClick= {deleting} id="deleteButton">Delete</button>
                <button onClick= {closing} id="closeButton">Close</button>
            </div>
            <div id="modalBackDrop"></div>
        </>
    );
};
