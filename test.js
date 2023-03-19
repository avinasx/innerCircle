const request = require('supertest');
const app = require('./app');


describe('CRUD APIs', () => {
    let personId;

    it('should create a new person', async () => {
        const data = { name: 'John Doe', age: 25 };
        const response = await request(app)
            .post('/person')
            .send(data);
        expect(response.status).toBe(200);
        expect(response.text).toBe('Person created successfully!');
    });

    it('should get all persons', async () => {
        const response = await request(app)
            .get('/person');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        personId = response.body[0]._id;
    });

    it('should update a person', async () => {
        const data = { name: 'Jane Doe', age: 30 };
        const response = await request(app)
            .put(`/person/${personId}`)
            .send(data);
        expect(response.status).toBe(200);
        expect(response.text).toBe('Person updated successfully!');
    });

    it('should delete a person', async () => {
        const response = await request(app)
            .delete(`/person/${personId}`);
        expect(response.status).toBe(200);
        expect(response.text).toBe('Person deleted successfully!');
    });
});

describe('Search API', () => {
    it('should search for persons by name or part of name', async () => {
        const response = await request(app)
            .get('/person?name=avi');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
