function makePairings(teams) 
{
    if (teams.length%2==1)
        teams.push(null);

    const countTeams= teams.length;
    const matches= countTeams-1;
    const half= countTeams/2;

    const pairings= [];
    const playerPosition= players.map((_, i)=>i).slice(1);

    for (let match=0; match<matches; match++)
    {
        const roundRobinPair= [];
        const newlyAddedPlayer= [0].concat(playerPosition);

        const firstHalf= newlyAddedPlayer.slice(0, half);
        const secondHalf= newlyAddedPlayer.slice(half, countTeams).reverse();

        for (let i=0; i<firstHalf.length; i++)
        {
            pairings.push({
                team1: teams[firstHalf[i]],
                team2: teams[secondHalf[i]],
            });
        }
        playerPosition.push(playerPosition.shift());
        pairings.push(roundRobinPair);
    }
    return pairings;
}
