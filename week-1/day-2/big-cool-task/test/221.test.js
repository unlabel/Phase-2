/**
 * @jest-environment jsdom
 */

const fetch = require('node-fetch');

const baseURL = 'http://localhost:3000';

describe('Регистрация', () => {
  describe('Обработчик POST /auth/register отправляет:', () => {
    beforeEach(() => {});

    test('400 Bad Request, если пароли не совпадают', async () => {
      const res = await fetch(`${baseURL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password',
          password2: 'different'
        })
      });
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data).toEqual({ success: false, message: 'Пароли не совпадают' });
    });

    test('400 Bad Request, если какое-либо из полей не заполнено', async () => {
      const res = await fetch(`${baseURL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: '',
          password: '',
          password2: ''
        })
      });
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data).toEqual({ success: false, message: 'Пожалуйста, заполните все поля' });
    });

    test('422 Unprocessable Entity, если пароль < 8 символов', async () => {
      const res = await fetch(`${baseURL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: '123',
          password2: '123'
        })
      });
      const data = await res.json();

      expect(res.status).toBe(422);
      expect(data).toEqual({ success: false, message: 'Пароль должен быть не менее 8 символов' });
    });

    describe('Flaky tests, do not run', () => {
      // Эти тесты нестабильные (flaky).
      // Пока они зависят от состояния `app.locals`.
      // Интересуешься тестированием? Умеешь изолировать тесты?
      // Отправь PR с улучшением этих тестов :D
      // (отдельно от своего решения)

      test('409 Conflict, если пользователь с таким email уже существует', async () => {
        const user = {
          email: 'foo@bar.baz',
          password: 'password',
          password2: 'password'
        };

        const res1 = await fetch(`${baseURL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        });
        const data1 = await res1.json();

        const res2 = await fetch(`${baseURL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        });
        const data2 = await res2.json();

        expect(res2.status).toBe(409);
        expect(data1.success).toBe(true);
        expect(data2).toEqual({
          success: false,
          message: 'Пользователь с таким email уже существует'
        });
      });

      test('201 Created, если пользователь успешно зарегистрирован', async () => {
        const res = await fetch(`${baseURL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'my@success.com',
            password: 'so-great-much-success-wow',
            password2: 'so-great-much-success-wow'
          })
        });
        const data = await res.json();

        expect(res.status).toBe(201);
        expect(data).toEqual({
          success: true,
          message: 'Пользователь my@success.com зарегистрирован'
        });
      });
    });
  });
});
