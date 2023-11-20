const request = require('supertest');
const app = require('../app')

const baseURL = 'http://localhost:3000';

describe('GET /', () => {
  it('Should return status 404. Response — string.', async () => {
    const response = await request(baseURL).get('/');

    expect(response.statusCode).toEqual(404);
    expect(response.headers['content-type']).toMatch(/text\/html/);
    expect(response.text).toMatch(/Cannot GET \//);
  });
});

describe('GET /status', () => {
  it('Should return status 200. Response — string.', async () => {
    const response = await request(baseURL).get('/status');

    expect(response.statusCode).toEqual(200);
    expect(response.headers['content-type']).toMatch(/text\/html/);
    expect(response.text).toBe('HTTP server is working!');
  });
});

describe('GET /users', () => {
  it('Should return status 200. Response — JSON.', async () => {
    const response = await request(baseURL).get('/users');

    expect(response.statusCode).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.data).toBeTruthy();
    expect(response.body.error).toBe(null);
  });
});

describe('GET /home', () => {
  it('Should return status 200. Response — string.', async () => {
    const response = await request(baseURL).get('/home');

    expect(response.statusCode).toEqual(200);
    expect(response.headers['content-type']).toMatch(/text\/html/);
  });
});

describe('GET /css/cover.css', () => {
  it('Should return status 200. Response — string/css.', async () => {
    const response = await request(baseURL).get('/css/cover.css');

    expect(response.statusCode).toEqual(200);
    expect(response.headers['content-type']).toMatch(/text\/css/);
  });
});

describe('GET /css/style.css', () => {
  it('Should return status 200. Response — string/css.', async () => {
    const response = await request(baseURL).get('/css/style.css');

    expect(response.statusCode).toEqual(200);
    expect(response.headers['content-type']).toMatch(/text\/css/);
  });
});

describe('GET /click', () => {
  it('Should return status 302. Response — redirect.', async () => {
    const response = await request(baseURL).get('/click');

    expect(response.statusCode).toEqual(302);
    expect(response.headers.location).toMatch('https://elbrusboot.camp');
  });
});
