const express = require("express");
const serverConfig = require("./config/serverConfig");
const fs = require("fs").promises;

const app = express();
const PORT = 3000;

serverConfig(app);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

app.get("/auth/register", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.post("/api/auth/register", (request, response) => {
  const { email, password, password2 } = request.body;
  let isRegistered = ["test@example.com"];

  if (password !== password2) {
    return response.status(400).json({
      success: false,
      message: "Пароли не совпадают"
    });
  }

  if (isRegistered.includes(email)) {
    return response.status(400).json({
      success: false,
      message: "Пользователь с таким email уже существует"
    });
  }

  isRegistered.push(email);

  response.status(200).json({
    success: true,
    message: `Пользователь ${email} зарегистрирован.`
  });
});

app.get("/", (req, res) => {
  res.send(`<p>Компании</p>
    <form action="/api/companies" method="get">
        <input name="search" placeholder="Искать здесь..." type="search">
        <button type="submit">Поиск</button>
    </form>`);
});

app.get("/api/companies", async (req, res) => {
  const searchQuery = req.query.search;

  try {
    const rawData = await fs.readFile("./test-companies.json", "utf8");
    const companies = JSON.parse(rawData);

    const filteredCompanies = companies.filter((company) =>
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

module.exports = { app };
