import React from "react";
import './soccerleague/views/CoachFormsTeam/FormTeam.css';

class FormTeam extends React.Component
{
    constructor(options)
    {
        super(options);
        this.updateTeam= this.updateTeam.bind(this);
        this.teamBlur= this.teamBlur.bind(this);
        this.teamFocus= this.teamFocus.bind(this);
        this.state= {player: '', userInput: ''};
    }

    coachUpdatesTeam()
    {
        var arr= ["p1", "p2", "p3", "p4", "p5", "p6"];  // Teams will always have six players
        if (arr.includes(this.options.deleteCell))
            document.getElementById(this.options.deleteCell).value= '';
        
        if (arr.includes(this.options.duplicateCell))
        {
            var allTeams= document.querySelectorAll("input[type='text']");
            
            for (var i=0; i<allTeams.length; i++)
            {
                if (allTeams[i].value=== this.options.duplicateValue)
                {
                    allTeams[i].value= '';
                    break;
                }
                
                else if (allTeams[i].getAttribute('id')!== this.options.duplicateCell)
                {
                    allTeams[i].value= '';
                    break;
                }
            }
        }
        var allTeams= document.querySelectorAll("input[type='text']");

        for (var i=0; i<allTeams.length; i++)
        {
            if (allTeams[i].value== this.options.deletePlayer || allTeams[i].value== this.options.replacePlayer)
                allTeams[i].value= '';
        }

    }

    updateTeam(team)
    {
        this.setState({player: team.target.value});
        this.options.updateTeam(team.target.value);
    }

    teamBlur()
    {
        this.options.teamBlur(this.state.player, this.state.userInput);
    }

    teamFocus(team)
    {
        this.setState({userInput: team.target.getAttribute('id')});
        this.setState({player: team.target.value});
        this.options.teamFocus(team.target.value);
    }

    render()
    {
        return
        ( 
            <div id= "form-team">
                <div className="top">
                    <div className="player-in-team">
                        <i className="player icon"></i>
                        <input id="p1" type="text" onFocus={this.teamFocus} onChange={this.updateTeam} onBlur={this.teamBlur}/>
                    </div>

                    <div className="player-in-team">
                        <i className="bi-file-person"></i>
                        <input id="p2" type="text" onFocus={this.teamFocus} onChange={this.updateTeam} onBlur={this.teamBlur}/>
                    </div>

                    <div className="player-in-team">
                        <i className="bi-file-person"></i>
                        <input id="p3" type="text" onFocus={this.teamFocus} onChange={this.updateTeam} onBlur={this.teamBlur}/>
                    </div>

                    <div className="player-in-team">
                        <i className="bi-file-person"></i>
                        <input id="p4" type="text" onFocus={this.teamFocus} onChange={this.updateTeam} onBlur={this.teamBlur}/>
                    </div>

                    <div className="player-in-team">
                        <i className="bi-file-person"></i>
                        <input id="p5" type="text" onFocus={this.teamFocus} onChange={this.updateTeam} onBlur={this.teamBlur}/>
                    </div>

                    <div className="player-in-team">
                        <i className="bi-file-person"></i>
                        <input id="p6" type="text" onFocus={this.teamFocus} onChange={this.updateTeam} onBlur={this.teamBlur}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default FormTeam;
