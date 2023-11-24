const React = require("react");

module.exports = function RegisterPage() {
  return (
    <>
      <title>Регистрация</title>
      <h1>Регистрация</h1>
      <form action="/api/auth/register" method="POST">
        <label htmlFor="name">Имя</label> <br />
        <input type="text" name="email" /> <br /> <br />
        <label htmlFor="password">Введите пароль</label>
        <br />
        <input type="text" name="password" /> <br /> <br />
        <label htmlFor="repeatPassord">Повторите пароль</label>
        <br />
        <input type="text" name="password2" /> <br /> <br />
        <input type="submit" name="submit" value="Отправить" />
      </form>
    </>
  );
};
