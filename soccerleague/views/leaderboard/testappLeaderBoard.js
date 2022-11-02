const LeaderBoard= require('./soccerleague/views/leaderboard');
const matches= [
    {
        homeTeam: 'Team1',
        awayTeam: 'Team2',
        homeTeamGoals: 4,
        awayTeamGoals: 2
    },

    {
        homeTeam: 'Team3',
        awayTeam: 'Team4',
        homeTeamGoals: 5,
        awayTeamGoals: 1
    },

    {
        homeTeam: 'Team5',
        awayTeam: 'Team6',
        homeTeamGoals: 2,
        awayTeamGoals: 2
    },
];

const lb= new LeaderBoard(matches);
const standings= lb.viewStanings();
console.log(standings);
