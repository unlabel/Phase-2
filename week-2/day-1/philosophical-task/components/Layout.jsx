/* eslint-disable react/prop-types */
const React = require('react');

function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/img/icon-48x48.png" />
        <link rel="apple-touch-icon" sizes="48x48" href="/img/icon-48x48.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/img/icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="96x96" href="/img/icon-96x96.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/img/icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/img/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="256x256" href="/img/icon-256x256.png" />
        <link rel="stylesheet" href="/css/style.css" />
        <script defer src="/js/application.js" />
        <title>Magic Card</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

module.exports = Layout;
