import React from 'react';

class FormTeamHome extends React.Component
{
    render()
    {
        return
        (
            <div className="form team home" id="home">
                <i className="close page"></i>
                <div className="header">
                    Begin adding players
                </div>

                <div className="content">
                    <div>Begin adding players to your team.</div>
                </div>

                <div className="actions">
                    <div className="sucessfully added button">
                    Player successfully added to team.
                    <i className="bi-award"></i>
                    </div>
                </div>

            </div>
        )
    }
}

export default FormTeamHome;
