const dbcon = require('./dbConnection');
const dao = require('./userDao');

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
    //expect(user.email).toBe(created.email);
    expect(user.password).toBe(created.password);
});


test ("search user by their id", async function() {
    let newUser = { first_name: "Molly", last_name: "Ohare",
    account_type: "admin", email: "molly@gmail.com",
    password: "abc123"
    };
    let created = await dao.create(newUser);
    let search = await dao.searchUser(created._id);
    expect(search.first_name).toBe(created.first_name);
    expect(search.last_name).toBe(created.last_name);
    expect(search.password).toBe(created.password);
});


test("Return users", async function () {
    let newUser = { first_name: "Molly", last_name: "Ohare",
    account_type: "admin", email: "molly@gmail.com",
    password: "abc123"
    };
    let created = await dao.create(newUser);

    let newUser2 = { first_name: "Molly", last_name: "Ohare",
    account_type: "admin", email: "molly@gmail.com",
    password: "abc123"
    };
    let created2 = await dao.create(newUser2);

    let ids = [created._id, created2._id];

    let ret = await dao.returnUsers(ids);
    expect(ret[0]._id).toStrictEqual(ids[0]);
    expect(ret[1]._id).toStrictEqual(ids[1]);
    
});

