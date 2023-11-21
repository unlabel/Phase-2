/**
 * @jest-environment jsdom
 */

const { render } = require('@testing-library/react');
const fetch = require('node-fetch');
require('@testing-library/jest-dom');
const React = require('react');

const CompanyPage = require('../components/pages/CompanyPage');
const Header = require('../components/Header');
const CompanyCard = require('../components/CompanyCard');

const parser = new DOMParser();
const baseURL = 'http://localhost:3000';

describe('Страница компании', () => {
  test('GET /companies/:id должен возвращать страницу с названием соответствующей компании в заголовке', async () => {
    const res = await fetch(`${baseURL}/companies/6`);
    const html = await res.text();
    const doc = parser.parseFromString(html, 'text/html');
    expect(doc.title).toBe('Star Diner');
  });

  test('Компонент CompanyPage должен корректно отображать содержимое', () => {
    const company = { name: 'Test Company', type: 'Food', image: 'test.jpg' };
    const page = render(<CompanyPage company={company} />);
    expect(page.baseElement.querySelector('h1')).toHaveTextContent('Test Company');
    expect(page.baseElement.querySelector('img[src="test.jpg"]')).toBeInTheDocument();
    expect(page.baseElement.textContent).toContain('Food');
  });
});

describe('Навигация', () => {
  test('Компонент Header должен корректно отображать содержимое', () => {
    const page = render(<Header />);
    expect(page.baseElement.querySelector('a[href="/"]')).toBeVisible();
    expect(page.baseElement.querySelector('a[href="/auth/register"]')).toHaveTextContent(
      'Регистрация'
    );
  });

  test('Компонент CompanyCard должен содержать ссылку на страницу компании', () => {
    const company = { id: 999, name: 'Test Company', type: 'Food', image: 'test.jpg' };
    const card = render(<CompanyCard company={company} />);
    expect(card.baseElement.querySelector('a[href="/companies/999"]')).toBeVisible();
  });
});
