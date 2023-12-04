const request = require('supertest');

const baseURL = 'http://localhost:3000';

describe('Измени нижестоящие методы и/или маршруты на правильные, согласно REST архитектуре\n', () => {
  describe('GET /all-the-entries ', () => {
    it('Отображает на странице все сущности', async () => {
      const response = await request(baseURL).get('/');

      expect(response.statusCode).toEqual(302);
      expect(response.redirect).toBe(true);
      expect(response.headers.location).toMatch('/songs');
    });
  });

  describe('GET /show-one-entry/:id', () => {
    it('Отображает на странице одну сущность', async () => {
      const response = await request(baseURL).get('/songs/1');

      expect(response.statusCode).toEqual(200);
      expect(response.text).toMatch('Entry Details');
    });
  });

  describe('GET /new-entry-form', () => {
    it('Отображает на странице форму добавления сущности', async () => {
      const response = await request(baseURL).get('/songs/add-form');

      expect(response.statusCode).toEqual(200);
      expect(response.text).toMatch('Add new song to Karaoke');
    });
  });

  describe('POST /create-new-post', () => {
    it('Позволяет создать сущность', async () => {
      const body = {
        singer: 'Клава Кока',
        songTitle: 'Пьяную домой',
      };
      const response = await request(baseURL).post('/songs').send(body);

      expect(response.statusCode).toEqual(302);
      expect(response.redirect).toBe(true);
      expect(response.request._data).toStrictEqual(body);
    });
  });

  describe('GET /edit-one-entry-form/:id', () => {
    it('Отображает на странице форму изменения сущности', async () => {
      const response = await request(baseURL).get('/songs/edit-form/1');

      expect(response.statusCode).toEqual(200);
      expect(response.text).toMatch('Edit the Entry');
    });
  });

  describe('POST /update-entry/:id', () => {
    it('Позволяет изменить сущность', async () => {
      const response = await request(baseURL).put('/songs/1');

      expect(response.statusCode).toEqual(200);
    });
  });

  describe('GET /delete-entry/:id', () => {
    it('Позволяет удалить сущность', async () => {
      const response = await request(baseURL).delete('/songs/6');

      expect(response.statusCode).toEqual(200);
    });
  });
});
