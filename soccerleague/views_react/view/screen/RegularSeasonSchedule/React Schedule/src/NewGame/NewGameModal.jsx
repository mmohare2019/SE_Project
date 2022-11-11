import React from 'react';

export const newGameModal= ({saving, closing}) => {
    const [title, setTitle]= useState('');
    const [error, setError]= useState(false);
    return (
        <>
        <div id="newGameModal">
            <h2>New Game</h2>
            <input 
                className= {error ? 'error' : ''}
                value= {title} 
                onChange= {g => setTitle(g.target.value)} 
                id="gameTitleInput" placeholder="Game Title"
            />

            <button 
            onClick= {() => {
                if (title)
                {
                    setError(false);
                    saving(title);
                }

                else
                    setError[true];
            }}
            id="saveButton">Save</button>

            <button 
                onClick= {closing}
                id="cancelButton">Cancel</button>
        </div>

        <div id="modalBackDrop"></div>
        </>
    );
};
