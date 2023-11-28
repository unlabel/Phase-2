const express = require("express");
const ReactDOMServer = require("react-dom/server");
const CompanyPage = require("../../src/components/pages/CompanyPage");
const companiesData = require("../../test-companies.json");

const companiesRouter = express.Router();

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
