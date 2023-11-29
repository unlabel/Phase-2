const express = require("express");
const companiesData = require("../../test-companies.json");

const searchRouter = express.Router();

searchRouter.get("/", (req, res) => {
  const searchQuery = req.query.search;

  try {
    const filteredCompanies = companiesData.filter((company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredCompanies.length === 0) {
      throw new Error("Компании не найдены");
    }

    // Возвращаем результат поиска в виде JSON
    res.status(200).json(filteredCompanies);
  } catch (error) {
    console.error("Ошибка при обработке запроса:", error);

    res.status(500).json({ error: error.message || "Ошибка сервера" });
  }
});

module.exports = searchRouter;
