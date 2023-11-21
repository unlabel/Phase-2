const express = require('express');
const serverConfig = require('./config/serverConfig');

const app = express();
const PORT = 3000;

serverConfig(app);
const urlencodedParser = express.urlencoded({ extended: false });

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

app.get('/', (request, resolve) => {
  resolve.send('Компании');
});

app.get('/auth/register', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

app.post('/api/auth/register', urlencodedParser, (request, response) => {
  const { email, password, password2 } = request.body;

  if (password !== password2) {
    return response.status(400).json({
      success: false,
      message: 'Пароли не совпадают'
    });
  }

  response.status(200).json({
    success: true,
    message: `Пользователь ${email} зарегистрирован.`
  });
});

module.exports = { app };
