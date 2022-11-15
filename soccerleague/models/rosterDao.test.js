const dbcon = require('./dbConnection');
const userDao = require('./userDao');
const rosterDao = require('./rosterDao');

beforeAll(function(){
    dbcon.connect();
});

afterAll(async function () {
    await rosterDao.deleteAll();
});

beforeEach(async function () {
    await rosterDao.deleteAll();
});

test("Create a roster", async function () {
    const newCoach = {first_name: "Molly", last_name: "Ohare",
    account_type: "coach", email: "molly@gmail.com",
    password: "abc123"};
    const newPlayer = {first_name: "Caroline", last_name: "Ohare",
    account_type: "player", email: "caroline@gmail.com",
    password: "abc123"};
    let coach = await userDao.create(newCoach);
    let player1 = await userDao.create(newPlayer);
    const roster = {coach: coach, player: player1};

    let createdRoster= await rosterDao.create(roster);

    expect(createdRoster.coach).toBe(roster.coach);
    expect(createdRoster.player1).toBe(roster.player1);
});