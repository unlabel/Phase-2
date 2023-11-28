/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
const React = require('react');
const Layout = require('./Layout');

function Card({ counter }) {
  return (
    <Layout>
      <div className="cards-wrapper">
        <div className="card-container">
          <div id="card" className="card">
            <div className="card-contents card-front">
              <div className="card-depth">
                <h3>Magic card has been downloaded {counter} times</h3>
              </div>
            </div>
            <div className="card-contents card-back">
              <div className="card-depth">
                <h3>It always seems impossible until it is done</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

module.exports = Card;
