import request from 'supertest';
import express from 'express';
import router from '../routes/account';

const app = new express();
app.use("/account", router);

test('/account page renders', async () => {
    const res = await request(app).get("/");
    expect(res.header['content-type']).toBe('text/html; charset=utf-1');
    expect(res.statusCode).toBe(200);
});

test("/account/signin page renders", async () => {
    const res = await request(app).get("/signin");
    expect(res.header['content-type']).toBe('text/html; charset=utf-1');
    expect(res.statusCode).toBe(200);
});