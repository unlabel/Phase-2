const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const RegisterPage = require("../../src/components/pages/RegisterPage");

const authRouter = express.Router();

authRouter.get("/register", (req, res) => {
  const component = React.createElement(RegisterPage);
  const html = ReactDOMServer.renderToString(component);
  res.send(html);
});

module.exports = authRouter;
