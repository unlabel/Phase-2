const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const MainPage = require("../../src/components/pages/MainPage");

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
  const сomponent = React.createElement(MainPage);
  const html = ReactDOMServer.renderToString(сomponent);
  res.send(html);
});

module.exports = mainRouter;
