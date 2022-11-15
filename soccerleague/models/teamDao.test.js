const dbcon = require('./dbConnection');
const dao = require('./teamDao');
const userDao = require('./userDao');
const rosterDao = require('./rosterDao');

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
    const newRoster = {coach};
    let roster = await rosterDao.create(newRoster);

    const newTeam = {team_name: "Patriots", color: "blue", 
                    roster: roster
    };
    let created = await dao.create(newTeam);
    expect(created.team_name).toBe(newTeam.team_name);
    expect(created.color).toBe(newTeam.color);
    expect(created.roster).toBe(newTeam.roster);
});