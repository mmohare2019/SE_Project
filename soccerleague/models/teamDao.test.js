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
    let coach = await userDao.create(newCoach);
    const newTeam = {team_name: "Patriots", color: "blue", coach: coach};
    let created = await dao.create(newTeam);
    expect(created.team_name).toBe(newTeam.team_name);
    expect(created.color).toBe(newTeam.color);
});

test("Find team based on coach id", async function () {
    const newCoach = {first_name: "Molly", last_name: "Ohare",
    account_type: "coach", email: "molly@gmail.com",
    password: "abc123"};
    let coach = await userDao.create(newCoach);
    const newTeam = {team_name: "Patriots", color: "blue", coach: coach};
    let created = await dao.create(newTeam);

    let found = await dao.findTeam(created.coach);
    expect(found.team_name).toBe(newTeam.team_name);
    expect(found.color).toBe(newTeam.color);
});

test("Find team based on coach and update", async function () {
    const newCoach = {first_name: "Molly", last_name: "Ohare",
    account_type: "coach", email: "molly@gmail.com",
    password: "abc123"};
    let coach = await userDao.create(newCoach);

    const newTeam = {team_name: "Patriots", color: "blue", coach: coach};
    let created = await dao.create(newTeam);

    let update = {color : "red"};
    let afterUpdate = await dao.findAndUpdate(coach, update);
    //expect(afterUpdate.color).toBe("red");

});

test("Get all ", async function () {
    const newCoach = {first_name: "Molly", last_name: "Ohare",
    account_type: "coach", email: "molly@gmail.com",
    password: "abc123"};
    let coach = await userDao.create(newCoach);

    const newTeam = {team_name: "Patriots", color: "blue", coach: coach};
    let created = await dao.create(newTeam);

    let all = await dao.getAll();
    expect(all).not.toBe(null);
});

test("Add p1", async function () {
    const newCoach = {first_name: "Molly", last_name: "Ohare",
    account_type: "coach", email: "molly@gmail.com",
    password: "abc123"};
    let coach = await userDao.create(newCoach);

    const newTeam = {team_name: "Patriots", color: "blue", coach: coach};
    let created = await dao.create(newTeam);

    const newPlayer = {first_name: "Molly", last_name: "Ohare",
    account_type: "player", email: "molly1@gmail.com",
    password: "abc123"};
    let player = await userDao.create(newPlayer);

    let add = await dao.addPlayer1(coach, player);
    expect(add.coach).toStrictEqual(coach._id);
});

test("Add p2", async function () {
    const newCoach = {first_name: "Molly", last_name: "Ohare",
    account_type: "coach", email: "molly@gmail.com",
    password: "abc123"};
    let coach = await userDao.create(newCoach);

    const newTeam = {team_name: "Patriots", color: "blue", coach: coach};
    let created = await dao.create(newTeam);

    const newPlayer = {first_name: "Molly", last_name: "Ohare",
    account_type: "player", email: "molly1@gmail.com",
    password: "abc123"};
    let player = await userDao.create(newPlayer);

    let add = await dao.addPlayer2(coach, player);
    expect(add.coach).toStrictEqual(coach._id);
});

test("Add p3", async function () {
    const newCoach = {first_name: "Molly", last_name: "Ohare",
    account_type: "coach", email: "molly@gmail.com",
    password: "abc123"};
    let coach = await userDao.create(newCoach);

    const newTeam = {team_name: "Patriots", color: "blue", coach: coach};
    let created = await dao.create(newTeam);

    const newPlayer = {first_name: "Molly", last_name: "Ohare",
    account_type: "player", email: "molly1@gmail.com",
    password: "abc123"};
    let player = await userDao.create(newPlayer);

    let add = await dao.addPlayer3(coach, player);
    expect(add.coach).toStrictEqual(coach._id);
});

test("Add p4", async function () {
    const newCoach = {first_name: "Molly", last_name: "Ohare",
    account_type: "coach", email: "molly@gmail.com",
    password: "abc123"};
    let coach = await userDao.create(newCoach);

    const newTeam = {team_name: "Patriots", color: "blue", coach: coach};
    let created = await dao.create(newTeam);

    const newPlayer = {first_name: "Molly", last_name: "Ohare",
    account_type: "player", email: "molly1@gmail.com",
    password: "abc123"};
    let player = await userDao.create(newPlayer);

    let add = await dao.addPlayer4(coach, player);
    expect(add.coach).toStrictEqual(coach._id);
});

test("Add p5", async function () {
    const newCoach = {first_name: "Molly", last_name: "Ohare",
    account_type: "coach", email: "molly@gmail.com",
    password: "abc123"};
    let coach = await userDao.create(newCoach);

    const newTeam = {team_name: "Patriots", color: "blue", coach: coach};
    let created = await dao.create(newTeam);

    const newPlayer = {first_name: "Molly", last_name: "Ohare",
    account_type: "player", email: "molly1@gmail.com",
    password: "abc123"};
    let player = await userDao.create(newPlayer);

    let add = await dao.addPlayer5(coach, player);
    expect(add.coach).toStrictEqual(coach._id);
});

test("Add p6", async function () {
    const newCoach = {first_name: "Molly", last_name: "Ohare",
    account_type: "coach", email: "molly@gmail.com",
    password: "abc123"};
    let coach = await userDao.create(newCoach);

    const newTeam = {team_name: "Patriots", color: "blue", coach: coach};
    let created = await dao.create(newTeam);

    const newPlayer = {first_name: "Molly", last_name: "Ohare",
    account_type: "player", email: "molly1@gmail.com",
    password: "abc123"};
    let player = await userDao.create(newPlayer);

    let add = await dao.addPlayer6(coach, player);
    expect(add.coach).toStrictEqual(coach._id);
});