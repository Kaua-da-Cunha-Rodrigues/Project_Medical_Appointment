const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../appointments-api/infra/database.sqlite",
});

module.exports = sequelize;
