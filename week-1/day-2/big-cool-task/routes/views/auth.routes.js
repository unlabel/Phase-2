const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const RegisterPage = require("../../src/components/pages/RegisterPage");

const authRouter = express.Router();

authRouter
  .route("/register")
  .get((req, res) => {
    const component = React.createElement(RegisterPage);
    const html = ReactDOMServer.renderToString(component);
    res.send(html);
  })
  .post(express.urlencoded({ extended: true }), async (req, res) => {
    const { email, password, password2 } = req.body;
    let isRegistered = ["foo@bar.baz"];

    if (!email || !password || !password2) {
      return res.status(400).json({
        success: false,
        message: "Пожалуйста, заполните все поля"
      });
    }

    if (password !== password2) {
      return res.status(400).json({
        success: false,
        message: "Пароли не совпадают"
      });
    }

    if (password.length < 8) {
      return res.status(422).json({
        success: false,
        message: "Пароль должен быть не менее 8 символов"
      });
    }

    if (isRegistered.includes(email)) {
      return res.status(409).json({
        success: false,
        message: "Пользователь с таким email уже существует"
      });
    }

    isRegistered.push(email);

    res.status(201).json({
      success: true,
      message: `Пользователь ${email} зарегистрирован`
    });
  });

module.exports = authRouter;
