const express = require("express");
const serverConfig = require("./config/serverConfig");
const fs = require("fs").promises;
require("@babel/register");
const React = require("react");
const Layout = require("./src/components/pages/Layout");
const ReactDOMServer = require("react-dom/server");
const MainPage = require("./src/components/pages/MainPage");
const RegisterPage = require("./src/components/pages/RegisterPage");
const CompanyPage = require("./src/components/pages/CompanyPage");
const companiesData = require("./test-companies.json");

const app = express();
const PORT = 3000;

serverConfig(app);

app.get("/", (req, res) => {
  const сomponent = React.createElement(MainPage);
  const html = ReactDOMServer.renderToString(сomponent);
  res.send(html);
});

app.get("/auth/register", (req, res) => {
  const component = React.createElement(RegisterPage);
  const html = ReactDOMServer.renderToString(component);
  res.send(html);
});

app.get("/companies/:id", (req, res) => {
  const companyId = parseInt(req.params.id);
  const company = companiesData.find((c) => c.id === companyId);

  if (!company) {
    return res.status(404).send("Компания не найдена");
  }

  const component = ReactDOMServer.renderToString(CompanyPage({ company }));
  res.send(`<!DOCTYPE html>
             <html>
               <head>
                 <title>${company.name}</title>
               </head>
               <body>
                 ${component}
               </body>
             </html>`);
});

// app.get("/companies/:id", async (req, res) => {
//   try {
//     const rawData = await fs.readFile("./test-companies.json", "utf8");
//     const companies = JSON.parse(rawData);

//     const companyId = parseInt(req.params.id);

//     const company = companies.find((c) => c.id === companyId);

//     if (company) {
//       const component = React.createElement(CompanyCard, { company });
//       const html = ReactDOMServer.renderToString(component);
//       res.send(html);
//     } else {
//       res.status(404).send("Компания не найдена");
//     }
//   } catch (error) {
//     console.log("Ошибка: ", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.get("/auth/register", (request, response) => {
//   response.sendFile(__dirname + "/index.html");
// });

// app.post("/api/auth/register", (request, response) => {
//   const { email, password, password2 } = request.body;
//   let isRegistered = ["test@example.com"];

//   if (password !== password2) {
//     return response.status(400).json({
//       success: false,
//       message: "Пароли не совпадают"
//     });
//   }

//   if (isRegistered.includes(email)) {
//     return response.status(400).json({
//       success: false,
//       message: "Пользователь с таким email уже существует"
//     });
//   }

//   isRegistered.push(email);

//   response.status(200).json({
//     success: true,
//     message: `Пользователь ${email} зарегистрирован.`
//   });
// });

// app.get("/", (req, res) => {
//   res.send(`<p>Компании</p>
//   <form action="/api/companies" method="get">
//   <input name="search" placeholder="Искать здесь..." type="search">
//   <button type="submit">Поиск</button>
//   </form>`);
// });

// app.get("/api/companies", async (req, res) => {
//   const searchQuery = req.query.search;

//   try {
// const rawData = await fs.readFile("./test-companies.json", "utf8");
// const companies = JSON.parse(rawData);

//     const filteredCompanies = companies.filter((company) =>
//     company.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     if (filteredCompanies.length === 0) {
//       throw new Error("Компании не найдены");
//     }

//     res.status(200).json(filteredCompanies);
//   } catch (error) {
//     console.error("Ошибка при обработке запроса:", error);

//     res.status(500).json({ error: error.message || "Ошибка сервера" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

module.exports = { app };
