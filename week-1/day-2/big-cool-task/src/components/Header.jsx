const React = require("react");
const Layout = require("./pages/Layout");

module.exports = function Header() {
  return (
    <Layout>
      <a href="/">Главная</a>
      <a href="/auth/register">Регистрация</a>
    </Layout>
  );
};
