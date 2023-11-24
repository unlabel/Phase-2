const React = require("react");
const Layout = require("./Layout");

module.exports = function CompanyPage({ company }) {
  const { name, type, address, image } = company;

  return (
    <Layout title={name}>
      <div>
        <img src={image} alt={`${name} Logo`} />
        <h1>{name}</h1>
        <p>Type: {type}</p>
        <p>Address: {address}</p>
      </div>
    </Layout>
  );
};
