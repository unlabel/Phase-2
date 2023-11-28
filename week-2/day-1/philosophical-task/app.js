// пакет для автоматической компиляции файлов (JSX > HTML)
require('@babel/register');
require('dotenv').config();

const express = require('express');
const mainRouter = require('./routes/main.routes');
const serverConfig = require('./config/serverConfig');

// инициализация приложения 'app'
const app = express();

// условное формирование порта
const PORT = process.env.PORT ?? 3000;

// конфигурация приложения
serverConfig(app);

// маршрутизация приложения
app.use('/', mainRouter);

// прослушивание порта приложения
app.listen(PORT, () => {
  console.log(`*** Server started at ${PORT} port ***`);
});
