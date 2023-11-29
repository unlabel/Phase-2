const express = require("express");
const ReactDOMServer = require("react-dom/server");
const CompanyPage = require("../../src/components/pages/CompanyPage");
const companiesData = require("../../test-companies.json");
const fs = require("fs").promises;

const companiesRouter = express.Router();

companiesRouter.get("/api/companies", async (req, res) => {
  const searchQuery = req.query.search;

  try {
    const filteredCompanies = companiesData.filter((company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredCompanies.length === 0) {
      throw new Error("Компании не найдены");
    }

    res.status(200).json(filteredCompanies);
  } catch (error) {
    console.error("Ошибка при обработке запроса:", error);

    res.status(500).json({ error: error.message || "Ошибка сервера" });
  }
});

// Роут для отображения списка всех компаний
companiesRouter.get("/", (req, res) => {
  const allCompanies = companiesData.map(
    (company) => `<li><a href="/companies/${company.id}">${company.name}</a></li>`
  );

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>All Companies</title>
      </head>
      <body>
        <h1>All Companies</h1>
        <ul>${allCompanies.join("")}</ul>
      </body>
    </html>
  `;

  res.send(html);
});

// Роут для отображения информации о компании по ID
companiesRouter.get("/:id", (req, res) => {
  const companyId = parseInt(req.params.id, 10);
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

module.exports = companiesRouter;
