const express = require('express');
const ssr = require('../middleware/ssr');

const serverConfig = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(ssr);
};

module.exports = serverConfig;
