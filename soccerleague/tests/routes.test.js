const request = require('supertest');
const app = require('../app');
const sum = require('../sum'); 

test('Adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

test('Render create account page', async () => {
    const res = await request(app).get('/account');
    expect(res.statusCode).toEqual(200);
});

test('Render log in page', async () => {
    const res = await request(app).get('/account/signin');
    expect(res.statusCode).toEqual(200);
});