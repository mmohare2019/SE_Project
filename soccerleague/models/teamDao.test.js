const dbcon = require('./dbConnection');
const dao = require('./teamDao');
const userDao = require('./userDao');

beforeAll(function(){
    dbcon.connect();
});

afterAll(async function () {
    await dao.deleteAll();
});

beforeEach(async function () {
    await dao.deleteAll();
});

test('Create a new team', async function () {
    const newCoach = {first_name: "Molly", last_name: "Ohare",
    account_type: "coach", email: "molly@gmail.com",
    password: "abc123"};
    const newPlayer = {first_name: "Charlie", last_name: "Ohare",
    account_type: "player", email: "charlie@gmail.com",
    password: "abc123"};
    let coach = await userDao.create(newCoach);
    let player = await userDao.create(newPlayer);

    const newTeam = {team_name: "Patriots", color: "blue", 
                    coach: coach, player: player
    };
    let created = await dao.create(newTeam);
    expect(created.team_name).toBe(newTeam.team_name);
    expect(created.color).toBe(newTeam.color);
    expect(created.coach).toBe(coach);
    expect(created.player).toBe(player);
});

test("Finding a player's team", async function() {
    const newCoach = {first_name: "Molly", last_name: "Ohare",
    account_type: "coach", email: "molly@gmail.com",
    password: "abc123"};
    const newPlayer = {first_name: "Charlie", last_name: "Ohare",
    account_type: "player", email: "charlie@gmail.com",
    password: "abc123"};
    let coach = await userDao.create(newCoach);
    let player = await userDao.create(newPlayer);

    const newTeam = {team_name: "Patriots", color: "blue", 
                    coach: coach, player: player
    };
    let createdTeam = await dao.create(newTeam);

    let team = await dao.findMyTeam(player);
    expect(team.team_name).toBe(createdTeam.team_name);
    expect(team.color).toBe(createdTeam.color);
});