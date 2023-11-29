const express = require("express");
global.TextEncoder = require("util").TextEncoder;
require("@babel/register");
const serverConfig = require("./config/serverConfig");
const mainRouter = require("./routes/views/main.routes");
const companiesRouter = require("./routes/views/companies.routes");
const authRouter = require("./routes/views/auth.routes");
const searchRouter = require("./routes/api/companies.routes");

const app = express();
app.set("port", 3000);

serverConfig(app);

app.use("/", mainRouter);
app.use("/companies", companiesRouter);
app.use("/api/companies", searchRouter);
app.use("/api/auth", authRouter);

app.use("/auth", authRouter);

app.use(express.static("public"));

app.listen(app.get("port"), () => {
  console.log("Сервер запущен на порту:", app.get("port"));
});

module.exports = { app };
