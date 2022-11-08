const dbcon = require("../models/dbConnection");
const admin = require("../models/userDao");

beforeAll(function(){
    dbcon.connect();
});

afterAll(async function(){
    await admin.deleteAll(); 
    dbcon.disconnect(); 
});

beforeEach(async function(){
    await admin.deleteAll(); 
});

// not in this file 
test('Create a new admin', async function() {
    let entered = {first_name: "Molly", last_name: "OHare", account_type:"admin", email:"molly@loyola.edu", password: "1234567"};
    await admin.create(entered);
});