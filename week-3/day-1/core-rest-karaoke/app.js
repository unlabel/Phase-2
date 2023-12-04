require('@babel/register');

// Фреймворк веб-приложений.
const express = require('express');

const app = express();
// HTTP request logger middleware for node.js.
// Логгирование деталей запросов.
const morgan = require('morgan');
const path = require('path');

const PORT = 3000;

// Тут должно быть подключение к БД (загляни в './db/connect')

// Обработка POST запросов.
// urlencoded.
app.use(express.urlencoded({ extended: true }));
// json.
app.use(express.json());

// Импорт маршрутов.
const indexRouter = require('./routes/index.routes');
const entriesRouter = require('./routes/entries.routes');

// Подключаем логгирование запросов
app.use(morgan('dev'));

// Подключаем статику
app.use(express.static(path.join(__dirname, 'public')));

// Подключаем импортированные роутеры с определенным url префиксом.
// FIXME: Нужно задавать разные префиксы для каждого роутера. В таком виде оставлять НЕЛЬЗЯ.
app.use('/', indexRouter);
app.use('/', entriesRouter);

app.listen(PORT, () => {
  console.log(`Server started port: ${PORT}`);
});
