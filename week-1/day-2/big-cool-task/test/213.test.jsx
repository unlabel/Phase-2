/**
 * @jest-environment jsdom
 */

const { render, screen } = require('@testing-library/react');
const fetch = require('node-fetch');
require('@testing-library/jest-dom');
const React = require('react');

const MainPage = require('../components/pages/MainPage');
const CompanyCard = require('../components/CompanyCard');
const RegisterPage = require('../components/pages/RegisterPage');
const Layout = require('../components/pages/Layout');

const parser = new DOMParser();
const baseURL = 'http://localhost:3000';

describe('Компонент Layout', () => {
  test('Компонент должен корректно отображать title и children', () => {
    render(
      <Layout title="Test Title">
        <h1>Test Heading</h1>
        <p>Test Paragraph</p>
      </Layout>
    );

    // Проверка title
    expect(document.title).toBe('Test Title');

    // Проверка children
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
    expect(screen.getByText('Test Paragraph')).toBeInTheDocument();
  });
});

describe('Главная страница', () => {
  test('GET / должен возвращать страницу с заголовком "Компании"', async () => {
    const res = await fetch(`${baseURL}/`);
    const html = await res.text();
    const doc = parser.parseFromString(html, 'text/html');
    expect(doc.title).toBe('Компании');
  });

  test('Компонент MainPage должен корректно отображать содержимое', () => {
    const companies = [
      { id: 1, name: 'Test Company', type: 'Food', image: 'test.jpg' },
      { id: 2, name: 'Test Company 2', type: 'Cars', image: 'test2.jpg' }
    ];

    const page = render(<MainPage companies={companies} />);
    expect(page.baseElement.querySelector('h1')).toHaveTextContent('Компании');
    expect(page.baseElement.querySelector('form')).toBeInTheDocument();
    expect(page.baseElement.querySelector('input[name="search"]')).toBeInTheDocument();
  });

  test('Компонент CompanyCard должен корректно отображать содержимое', () => {
    const company = { name: 'Test Company', type: 'Food', image: 'test.jpg' };
    const page = render(<CompanyCard company={company} />);
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(page.baseElement.querySelector('img[src="test.jpg"]')).toBeInTheDocument();
  });
});

describe('Тестирование React-компонентов', () => {
  test('GET /auth/register должен возвращать страницу с заголовком "Регистрация"', async () => {
    const res = await fetch(`${baseURL}/auth/register`);
    const html = await res.text();
    const doc = parser.parseFromString(html, 'text/html');
    expect(doc.title).toBe('Регистрация');
  });

  test('Компонент RegisterPage должен корректно отображать содержимое', () => {
    const page = render(<RegisterPage />);
    expect(page.baseElement.querySelector('h1')).toHaveTextContent('Регистрация');
    expect(
      page.baseElement.querySelector('form[method=post][action="/api/auth/register"]')
    ).toBeInTheDocument();
    expect(page.baseElement.querySelector('input[name="email"]')).toBeInTheDocument();
    expect(page.baseElement.querySelector('input[name="password"]')).toBeInTheDocument();
    expect(page.baseElement.querySelector('input[name="password2"]')).toBeInTheDocument();
  });
});
