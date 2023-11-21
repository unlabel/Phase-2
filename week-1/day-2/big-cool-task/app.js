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

app.get('/auth/register', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});
app.post('/auth/register', urlencodedParser, function (request, response) {
  if (!request.body) return response.sendStatus(400);
  console.log(request.body);
  response.send(
    `${request.body.userName} - ${request.body.password} - ${request.body.repeatPassword}`
  );
});

module.exports = { app };
