/*class LeaderBoard {
    constructor(matches) {
        this.matches= matches;
        this.leaderboard= {};
    }

    viewStandings() {
        this.matches.forEach(match=> {
            const {homeTeam, awayTeam}= match;

        if (!this.leaderboard[homeTeam]) this.addLeaderBoard(homeTeam);
        if (!this.leaderboard[awayTeam]) this.addLeaderBoard(awayTeam);
        
        this.timesPlayed([homeTeam, awayTeam]);
        this.matchResults(match);
        this.matchGoals(homeTeam, match.homeTeamGoals, match.awayTeamGoals);
        this.matchGoals(awayTeam, match.awayTeamGoals, match.awayTeamGoals);
    });
    return this.leaderboard;
}

    addLeaderBoard(team) {
        this.leaderboard[team]= {
            gamesPlayed: 0,
            goalsScored: 0,
            won: 0,
            lost: 0,
            tied: 0,
        };
}

    timesPlayed(teams) {
        teams.forEach(team=> this.leaderboard[team].gamesPlayed++);
    }

    matchResults(match) {
        const {
            homeTeam, awayTeam, homeTeamGoals, awayTeamGoals
        }= match;

        if (homeTeamGoals> awayTeamGoals) {
            this.leaderboard[homeTeam].won++;
            this.leaderboard[awayTeam].lost++;
        }
    
        else if (homeTeamGoals< awayTeamGoals) {
            this.leaderboard[awayTeam].won++;
            this.leaderboard[homeTeam].won++;
        }

        else {
            this.leaderboard[homeTeam].tied++;
            this.leaderboard[awayTeam].tied++;
        }
    }

    matchGoals(team, scores) {
        this.leaderboard[team].goalsScored+=scores;
    }
}

module.exports= LeaderBoard;*/
