const path = require('path');
const fs = require('fs').promises;
const { existsSync } = require('fs');

const baseURL = 'http://localhost:3000';

describe('Маршруты', () => {
  describe('GET /css/style.css', () => {
    it('Статус код — 200, тип контента — строка/css', async () => {
      const response = await fetch(`${baseURL}/css/style.css`);

      expect(response.status).toEqual(200);
      expect(response.headers.get('Content-Type')).toMatch(/text\/css/);
    });
  });

  describe('GET /js/application.js', () => {
    it('Статус код — 200, тип контента — строка/javascript', async () => {
      const response = await fetch(`${baseURL}/js/application.js`);

      expect(response.status).toEqual(200);
      expect(response.headers.get('Content-Type')).toMatch(/text\/javascript/);
    });
  });

  describe('GET /img/icon-48x48.png', () => {
    it('Статус код — 200, тип контента — изображение/x-png', async () => {
      const response = await fetch(`${baseURL}/img/icon-48x48.png`);

      expect(response.status).toEqual(200);
      expect(response.headers.get('Content-Type')).toMatch(/image\/x-png/);
    });
  });
});

describe('Файлы', () => {
  describe('Файл app.js', () => {
    it('Не содержит нативного метода express.static()', async () => {
      const filePath = path.join(__dirname, '../app.js');
      const file = await fs.readFile(filePath, 'utf8');

      expect(file).not.toContain('express.static');
    });
  });

  describe('Файл serverConfig.js', () => {
    it('Не содержит нативного метода express.static()', async () => {
      const filePath = path.join(__dirname, '../config/serverConfig.js');
      const file = await fs.readFile(filePath, 'utf8');

      expect(file).not.toContain('express.static');
    });

    it('Использует промежуточное ПО staticMiddleware', async () => {
      const filePath = path.join(__dirname, '../config/serverConfig.js');
      const file = await fs.readFile(filePath, 'utf8');

      expect(file).toContain('app.use(staticMiddleware(\'public\'))');
    });
  });

  describe('Файл staticMiddleware.js', () => {
    it('Проверка наличия файла', async () => {
      const filePath = path.join(__dirname, '../middleware/staticMiddleware.js');
      const file = existsSync(filePath);

      expect(file).toEqual(true);
    });
  });
});
