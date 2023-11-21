/**
 * @jest-environment jsdom
 */

const fetch = require('node-fetch');
require('@testing-library/jest-dom');

const baseURL = 'http://localhost:3000';

describe('Иконка сайта', () => {
  test('GET /favicon.ico должен возвращать иконку сайта', async () => {
    const res = await fetch(`${baseURL}/favicon.ico`);
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('image/x-icon');
  });
});

describe('Файлы стилей', () => {
  test('GET /css/style.css должен возвращать файл стилей', async () => {
    const res = await fetch(`${baseURL}/css/style.css`);
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/css');
  });

  test('GET /css/bootstrap.min.css должен возвращать файл стилей', async () => {
    const res = await fetch(`${baseURL}/css/bootstrap.min.css`);
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/css');
  });

  test('GET / должен инициировать GET запросы к файлам стилей', async () => {
    const res = await fetch(`${baseURL}/`);
    const html = await res.text();

    expect(html).toContain('css/style.css');
    expect(html).toContain('/css/bootstrap.min.css');
  });
});
