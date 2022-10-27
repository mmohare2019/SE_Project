import request from 'supertest';
import express from 'express';
import router from '../routes/account';

const app = new express();
app.use("/account", router);

describe('Good routes', function () {
    test('responds to /account', async () => {
        const res = await request(app).get("/account");
        expect(res.header['content-type']).toBe('text/html; charset=utf-1');
        expect(res.statusCode).toBe(200);
    })

});