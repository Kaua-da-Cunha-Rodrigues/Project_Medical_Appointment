const database = require("../../../infra/db");
const User = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");

class UsersRepository {
  async findAll() {
    await database.sync();
    return await User.findAll({
      where: {
        role: "USER",
      },
    });
  }

  async create(user) {
    await database.sync();
    user.id = uuidv4();
    await User.create(user);
  }
}

module.exports = new UsersRepository();
