const request = require('supertest');
const baseURL = "http://localhost:3010/api"

let validToken = ''

describe('Test authentication routes', () => {

    it('Respond to the POST method', async () => {

        let newUser = {
            name: 'test',
            email: 'test@gmail.com',
            is_premium: false,
            password: 1234
        }

        let response = await request(baseURL).post(`/auth/register`).send(newUser);
        expect(response.status).toBe(403);
        expect(response.text).toBe('\"Exist email\"');

        response = await request(baseURL).post(`/auth/register`).send({ name: 'lior' });
        expect(response.status).toBe(500);

        response = await request(baseURL).post(`/auth/login`).send(newUser);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('accessToken');

        validToken = response.body.accessToken

        newUser.email = 'try@gmail.com'
        response = await request(baseURL).post(`/auth/login`).send(newUser);
        expect(response.status).toBe(403);
        expect(response.text).toBe('\"Email Not Found\"');

        newUser.email = 'test@gmail.com'
        newUser.password = '123456'
        response = await request(baseURL).post(`/auth/login`).send(newUser);
        expect(response.status).toBe(403);
        expect(response.text).toBe('\"Invalid Password\"');

        response = await request(baseURL).post(`/auth/login`).send({});
        expect(response.status).toBe(403);
    });

    it('Respond to the GET method', async () => {
        let response = await request(baseURL).get(`/auth/info-user`).set('Authorization', `Bearer ${validToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name');

        const invalidToken = validToken + '1234'
        response = await request(baseURL).get(`/auth/info-user`).set('Authorization', `Bearer ${invalidToken}`);
        expect(response.status).toBe(403);

        response = await request(baseURL).get(`/auth/info-user`).set('Authorization', `Bearer `);
        expect(response.status).toBe(401);
    });
})

describe('Test favorite routes', () => {

    it('Respond to the GET method', async () => {
        let response = await request(baseURL).get(`/favorite/all-song`).set('Authorization', `Bearer ${validToken}`);
        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toHaveProperty('duration');

        response = await request(baseURL).get(`/favorite/all-song/trytest`).set('Authorization', `Bearer ${validToken}`);
        expect(response.statusCode).toBe(404);

        response = await request(baseURL).get(`/favorite/specific-song/?songID=2`).set('Authorization', `Bearer ${validToken}`);
        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toHaveProperty('song_id');
    });

    it('Respond to the PUT method', async () => {
        const response = await request(baseURL).put(`/favorite/add`).send({ songID: 8 }).set('Authorization', `Bearer ${validToken}`);
        expect(response.statusCode).toBe(200);
    });

    it('Respond to the DELETE method', async () => {
        const response = await request(baseURL).delete(`/favorite/remove`).send({ songID: 8 }).set('Authorization', `Bearer ${validToken}`);
        expect(response.statusCode).toBe(200);
    });

});

describe('Test management routes', () => {

    it('Respond to the GET method', async () => {
        let response = await request(baseURL).get(`/management/favorable-songs`);
        expect(response.statusCode).toBe(200);

        response = await request(baseURL).get(`/management/favorable-artists`);
        expect(response.statusCode).toBe(200);

        response = await request(baseURL).get(`/management/favorable-songs-decade`);
        expect(response.statusCode).toBe(200);

        response = await request(baseURL).get(`/management/longest-shortest-songs`);
        expect(response.statusCode).toBe(200);
    });

});

describe('Test songs routes', () => {

    it('Respond to the GET method', async () => {
        let response = await request(baseURL).get(`/songs/get-artists`);
        expect(response.statusCode).toBe(200);

        response = await request(baseURL).get(`/songs/get-songs-of-artist/1`);
        expect(response.statusCode).toBe(200);

        response = await request(baseURL).get(`/songs/get-songs-of-artist/5`);
        expect(response.statusCode).toBe(401);
    });

});

