const dbcon = require('../models/dbConnection');
const dao = require('../models/userDao');

beforeAll(function(){
    dbcon.connect();
});

afterAll(async function () {
    await dao.deleteAll();
});

beforeEach(async function () {
    await dao.deleteAll();
});

test('Create new user test', async function (){
    let newUser = { first_name: "Molly", last_name: "Ohare",
                    account_type: "admin", email: "molly@gmail.com",
                    password: "abc123"
    };
    let created = await dao.create(newUser);
    expect(created.first_name).toBe(newUser.first_name);
    expect(created.last_name).toBe(newUser.last_name);
    expect(created.email).toBe(newUser.email);
    expect(created.account_type).toBe(newUser.account_type);
    expect(created.password).toBe(newUser.password);
});

test('User log in', async function() {
    let newUser = { first_name: "Molly", last_name: "Ohare",
                    account_type: "admin", email: "molly@gmail.com",
                    password: "abc123"
    };
    let created = await dao.create(newUser);
    let user = await dao.login(created.email, created.password);
    expect(user.email).toBe(created.email);
    expect(user.password).toBe(created.password);
});
