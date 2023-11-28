const React = require("react");

module.exports = function Layout({ children, title = "Компании" }) {
  return (
    <div>
      <title>{title}</title>
      <link rel="icon" href="./favicon.ico" type="image/x-icon" />
      <h1>{title}</h1>
      <link rel="stylesheet" href="./css/bootstrap.min.css" />
      <link rel="stylesheet" href="./css/style.css" />
      {children}
    </div>
  );
};
