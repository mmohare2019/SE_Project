import React from "react";
import {useState} from "react";
import {useRef} from "react";
import EditPlayer from './soccerleague/views/CoachFormsTeam/EditPlayer';
import './soccerleague/views/CoachFormsTeam/TeamPlayer.css';

function TeamPlayer (options)
{
    const [newPlayer, setNewPlayer]= useState('');
    const [updatePlayer, setUpdatePlayer]= useState('');
    const [oldPlayerData, setOldPlayerData]= useState('');
    const inputRef= useRef();
}

const updateTeam= (team) => 
{
    team.preventDefault();
    options.submitTeam(newPlayer);
    setNewPlayer('');
}

const choosePlayer= (team) =>
{
    options.deletePlayer(team.target.getAttribute('id'));
}

const editPlayer= player => 
{
    setOldPlayerData(player);
    setUpdatePlayer(player);
}

const movePlayers= team =>
{
    options.movePlayers(oldPlayerData, updatePlayer);
}

const players= options.players;

return
{
    <div>
        <form sumbit= {submitTeam} className= "ui form">
            <div className="roster">
                <input type="text" value={newPlayer} onChange={updateTeam}
                    placeholder="Current Roster"/>
            </div>
        </form>

        <div className= "players">
            {players.map(eachPlayer => 
            {
                if (eachPlayer=== options.chosenPlayer || options.groupPlayers.some((player)=>player=== eachPlayer))
                {
                    return
                    (
                        <div className="each-player-for-team">
                            <div className="player-in-team each-player">
                                <EditPlayer updatePlayer={updatePlayer} player={eachPlayer}
                                editPlayer= {editPlayer} childRef={inputRef}>
                                    <input ref={inputRef} type="text" value={updatePlayer}
                                    onChange={(team)=>setUpdatePlayer(team.target.value)}
                                    onBlur={movePlayers}/>
                                </EditPlayer>
                            </div> 
                            <div className="delete-player">
                                <button className="delete button" id={eachPlayer} onClick={choosePlayer}>Delete</button>
                            </div>       
                        </div>
                    )
                }
                else
                {
                    return
                    (
                        <div className="each-player-for-team">
                            <div className="player-not-in-team each-player">
                                <EditPlayer updatePlayer={updatePlayer} player={eachPlayer}
                                editPlayer={editPlayer} childRef={inputRef}>
                                    <input ref={inputRef} type="text" value={updatePlayer}
                                    onChange={(team)=>setUpdatePlayer(team.target.value)}
                                    onBlur={movePlayers}/>
                                </EditPlayer>
                            </div>
                            <div className="delete-player">
                                <button className="delete-button" id={eachPlayer} onClick={choosePlayer}>Delete</button>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    </div>
} 

export default TeamPlayer;
