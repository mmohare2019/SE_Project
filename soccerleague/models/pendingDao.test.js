const dbcon = require('./dbConnection');
const dao = require('./pendingDao');
const userDao = require('./userDao');
const teamDao = require('./teamDao');

beforeAll(function(){
    dbcon.connect();
});


afterAll(async function () {
    await dao.deleteAll();
});


beforeEach(async function () {
    await dao.deleteAll();
});

test("Create a pending profile", async function () {
    const newPlayer = {first_name: "Molly", last_name: "Ohare",
    account_type: "player", email: "molly@gmail.com",
    password: "abc123"};
    let player = await userDao.create(newPlayer);

    const newTeam = {team_name: "Patriots", color: "blue"
    };
    let team = await teamDao.create(newTeam);

    const newPending = {player: player, team: team};
    let pending = await dao.create(newPending);
    expect(pending.player.first_name).toBe(newPlayer.first_name);
    expect(pending.player.last_name).toBe(newPlayer.last_name);
    expect(pending.player.account_type).toBe(newPlayer.account_type);
    expect(pending.player.email).toBe(newPlayer.email);
    expect(pending.player.password).toBe(newPlayer.password);
    expect(pending.team.team_name).toBe(team.team_name);
    expect(pending.team.color).toBe(team.color);
});

test("find pending profile based on team", async function () {
    const newPlayer = {first_name: "Molly", last_name: "Ohare",
    account_type: "player", email: "molly@gmail.com",
    password: "abc123"};
    let player = await userDao.create(newPlayer);

    const newTeam = {team_name: "Patriots", color: "blue"};
    let team = await teamDao.create(newTeam);

    const newPending = {player: player, team: team};
    let pending = await dao.create(newPending);

    let found = await dao.findPending(pending.team);
});

test("Delete pending by player", async function () {
    const newPlayer = {first_name: "Molly", last_name: "Ohare",
    account_type: "player", email: "molly@gmail.com",
    password: "abc123"};
    let player = await userDao.create(newPlayer);

    const newTeam = {team_name: "Patriots", color: "blue"
    };
    let team = await teamDao.create(newTeam);

    const newPending = {player: player, team: team};
    let pending = await dao.create(newPending);

    await dao.deletePending(player);
});