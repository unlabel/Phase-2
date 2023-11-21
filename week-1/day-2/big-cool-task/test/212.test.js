/**
 * @jest-environment jsdom
 */

const fetch = require('node-fetch');
const app = require('../app');

const parser = new DOMParser();
const baseURL = 'http://localhost:3000';

describe('Форма регистрации', () => {
  test('GET /auth/register должен вернуть форму регистрации', async () => {
    const res = await fetch(`${baseURL}/auth/register`);
    const html = await res.text();
    const doc = parser.parseFromString(html, 'text/html');

    // Проверяем, есть ли в документе форма с нужным действием и методом
    const form = doc.querySelector('form');
    expect(form).toBeTruthy();
    expect(form.method.toLowerCase()).toBe('post');
    expect(form.action).toBe('/api/auth/register');

    // Проверяем, есть ли в форме нужные инпуты
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const password2Input = form.querySelector('input[name="password2"]');
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(password2Input).toBeTruthy();
  });

  test('Пароли совпадают', async () => {
    const res = await fetch(`${baseURL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password',
        password2: 'password'
      })
    });

    const data = await res.json();
    const isRegistered =
      data.success === true && data.message === 'Пользователь test@example.com зарегистрирован';
    const isAlreadyRegistered =
      data.success === false && data.message === 'Пользователь с таким email уже существует';
    expect(isRegistered || isAlreadyRegistered).toBe(true);
  });

  test('Пароли не совпадают', async () => {
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
    expect(data).toEqual({ success: false, message: 'Пароли не совпадают' });
  });
});

describe('Форма поиска', () => {
  test('GET / должен вернуть форму поиска', async () => {
    const res = await fetch(`${baseURL}/`);
    const html = await res.text();
    const doc = parser.parseFromString(html, 'text/html');

    // Проверяем, есть ли в документе форма с нужным действием и методом
    const form = doc.querySelector('form');
    expect(form).toBeTruthy();
    expect(form.method.toLowerCase()).toBe('get');
    expect(form.action).toBe('/api/companies');

    // Проверяем, есть ли в форме нужный инпут
    const input = form.querySelector('input[name="search"]');
    expect(input).toBeTruthy();
  });

  test('Поиск компаний, имя которых содержит "er"', async () => {
    const res = await fetch(`${baseURL}/api/companies?search=er`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);

    const text = JSON.stringify(data);
    expect(text).toContain('Burger Master');
    expect(text).toContain('Star Diner');
  });

  test('Поиск компаний, имя которых содержит "l"', async () => {
    const res = await fetch(`${baseURL}/api/companies?search=l`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);

    const text = JSON.stringify(data);
    expect(text).toContain('Tesla');
    expect(text).toContain('Apple');
  });
});
