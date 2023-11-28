/* eslint-disable consistent-return */
// const React = require("react");
// const ReactDOMServer = require("react-dom/server");
const express = require("express");
global.TextEncoder = require("util").TextEncoder;
require("@babel/register");
const serverConfig = require("./config/serverConfig");
const mainRouter = require("./routes/views/main.routes");
const companiesRouter = require("./routes/views/companies.routes");
const authRouter = require("./routes/views/auth.routes");

const app = express();
app.set("port", 3000);

// console.log(app.locals);

serverConfig(app);

app.use("/", mainRouter);

app.use("/companies", companiesRouter);

app.use("/auth", authRouter);

app.use(express.static("public"));

app.listen(app.get("port"), () => {
  // eslint-disable-next-line no-console
  console.log("Сервер запущен на порту:", app.get("port"));
});

module.exports = { app };
