
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const request = require('supertest');
const express = require('express');
const router = require('../routes/planets');

const app = express();
app.use('/api/planets', router);

describe('Planet ID Validation', () => {
  it('should return 400 for an invalid planet ID format (special characters)', async () => {
    const res = await request(app).get('/api/planets/!@#$');
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Invalid planet ID format');
  });

  it('should return 404 for a valid but non-existent planet ID', async () => {
    const res = await request(app).get('/api/planets/nonexistent');
    expect(res.statusCode).toEqual(404);
  });

  it('should return 200 for a valid and existing planet ID', async () => {
    const res = await request(app).get('/api/planets/earth');
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Earth');
  });
});
