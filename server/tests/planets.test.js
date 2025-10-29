const request = require('supertest');
const { app, server } = require('../index');

afterAll((done) => {
  server.close(done);
});

describe('GET /api/planets', () => {
  it('should return all planets', async () => {
    const res = await request(app).get('/api/planets');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(13); // Updated to include dwarf planets
  });
});

describe('GET /api/planets/:id', () => {
  it('should return a single planet', async () => {
    const res = await request(app).get('/api/planets/earth');
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Earth');
  });

  it('should return 404 for a non-existent planet', async () => {
    const res = await request(app).get('/api/planets/marsupial');
    expect(res.statusCode).toEqual(404);
  });
});
