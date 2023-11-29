const React = require("react");
const Layout = require("./Layout");

module.exports = function MainPage() {
  return (
    <Layout>
      <form action="/api/companies" method="GET">
        <input type="text" name="search" />
        <br /> <br />
        <input type="submit" name="submit" value="Поиск" />
      </form>
    </Layout>
  );
};
