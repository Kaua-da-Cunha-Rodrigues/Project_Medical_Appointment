const Sequelize = require("sequelize");
const sequelize = require("../../../infra/db");

const User = sequelize.define("User", {
  id: {
    type: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return undefined;
    },
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.sync();

module.exports = User;
