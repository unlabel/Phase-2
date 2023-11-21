const express = require('express');
const morgan = require('morgan');

const serverConfig = (app) => {
  // Парсинг JSON формата
  app.use(express.json());

  // Парсинг данных из HTML-форм
  app.use(express.urlencoded({ extended: true }));

  app.use(morgan('combined'));
};

module.exports = serverConfig;
