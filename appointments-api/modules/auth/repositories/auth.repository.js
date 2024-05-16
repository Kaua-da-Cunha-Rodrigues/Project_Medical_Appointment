const database = require("../../../infra/db");
const User = require("../../users/models/user.model");

class AuthRepository {
  async findByEmail(email) {
    await database.sync();
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}

module.exports = new AuthRepository();
