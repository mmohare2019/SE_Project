const request = require('supertest');
const app = require('../app');

test('Render create account page', async () => {
    const res = await request(app).get('/account');
    expect(res.statusCode).toEqual(200);
});

test('Render log in page', async () => {
    const res = await request(app).get('/account/signin');
    expect(res.statusCode).toEqual(200);
});