const React = require("react");

module.exports = function CompanyCard({ company }) {
  return (
    <div>
      <h2>{company.name}</h2>
      <p>{company.type}</p>
      <img src={company.image} alt={company.name} />
      <a href={`/companies/${company.id}`}>Ссылка на страницу компании</a>
    </div>
  );
};
