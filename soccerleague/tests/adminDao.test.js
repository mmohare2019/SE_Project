const dao = require('../models/adminDao');

test('Test read all', function(){
    let users = dao.readAll(); 
    expect(users.length).toBeGreaterThan(0);
});

test("Create user", function() {
    let newAdmin = {first_name: "Molly", last_name: "OHare", email:"mmohare@loyola.edu", password: "123456"};
    let beforeSize = dao.readAll().length;
    let saved = dao.create(newAdmin);
    let users = dao.readAll();
    expect(users.length).toBe(beforeSize+1);
    expect(users).toContain(saved);
});

