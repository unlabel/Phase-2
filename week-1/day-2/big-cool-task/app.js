const express = require('express');

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

app.get('/', (request, resolve) => {
  resolve.send('Компании');
});

app.get('/auth/register', (req, res) => {
  res.send();
});

module.exports = { app };
