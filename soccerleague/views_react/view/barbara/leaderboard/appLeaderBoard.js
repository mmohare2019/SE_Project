const LeaderBoard= require('./soccerleague/in-progress-views/leaderboard');
const matches= [
    {
        homeTeam: String,
        awayTeam: String,
        homeTeamGoals: int,
        awayTeamGoals: int
    }
];

const lb= new LeaderBoard(matches);
const standings= lb.viewStanings();
console.log(standings)
