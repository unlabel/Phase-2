/**
 * @jest-environment jsdom
 */

const fetch = require('node-fetch');
const path = require('path');
const { existsSync } = require('fs');
const fs = require('fs/promises');
const app = require('../app');

const baseURL = 'http://localhost:3000';

describe('Маршруты', () => {
  describe('GET /', () => {
    it('Статус код — 200, тип контента — строка', async () => {
      const response = await fetch(`${baseURL}/`);

      expect(response.status).toEqual(200);
      expect(response.headers.get('content-type')).toMatch(/text\/html/);
      const text = await response.text();
      expect(text).toMatch(/Компании/);
    });
  });
});

describe('Файлы', () => {
  describe('Файл package.json', () => {
    it("Проверка наличия скрипта запуска 'start'", async () => {
      const filePath = path.join(__dirname, '../package.json');
      const file = await fs.readFile(filePath, 'utf8');

      expect(file).toContain('"start": "node app.js"');
    });

    it("Проверка наличия скрипта запуска 'dev'", async () => {
      const filePath = path.join(__dirname, '../package.json');
      const file = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(file);

      expect(data.scripts.dev).toContain('nodemon app.js');
    });
  });

  describe('Файл app.js', () => {
    it('Проверка наличия файла', () => {
      const filePath = path.join(__dirname, '../app.js');
      const file = existsSync(filePath);

      expect(file).toEqual(true);
    });
  });
});
