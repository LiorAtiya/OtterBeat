const request = require('supertest');
const baseURL = "http://localhost:3010/api"

describe('Test favorite routes', () => {

    it('Respond to the GET method', async () => {
        let response = await request(baseURL).get(`/favorite/all-song/1`);
        expect(response.statusCode).toBe(200);

        response = await request(baseURL).get(`/favorite/all-song/dsdsd`);
        expect(response.statusCode).toBe(500);
    });

    it('Respond to the GET method', async () => {
        let response = await request(baseURL).get(`/favorite/specific-song?userID=1&songID=1`);
        expect(response.statusCode).toBe(200);

        response = await request(baseURL).get(`/favorite/specific-song?userID=1&stam=1`);
        expect(response.statusCode).toBe(500);
    });

    it('Respond to the PUT method', async () => {
        const response = await request(baseURL).put(`/favorite/add`).send({userID: 3, songID: 8});
        expect(response.statusCode).toBe(200);
    });

    it('Respond to the DELETE method', async () => {
        const response = await request(baseURL).delete(`/favorite/remove`).send({userID: 3, songID: 8});
        expect(response.statusCode).toBe(200);
    });

});

// **** NEED TO ADD TESTS FOR FUNCTIONS & songs, management routes ******
