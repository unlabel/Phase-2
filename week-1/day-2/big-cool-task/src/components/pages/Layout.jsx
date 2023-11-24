const React = require("react");

module.exports = function Layout({ children, title = "Компании" }) {
  return (
    <div>
      <title>{title}</title>
      <h1>{title}</h1>
      {children}
    </div>
  );
};
