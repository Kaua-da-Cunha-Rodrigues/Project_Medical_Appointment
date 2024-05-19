const usersRepository = require("../repositories/users.repository");

class UsersController {
  async findAll(req, res) {
    // #swagger.tags = ["Users"]
    // #swagger.description = "Endpoint para listagem usuários."

    try {
      /* #swagger.responses[201] = { 
          schema: { $ref: "#/definitions/Users" },
          description: "Lista de usuários encontrada." 
      } */
      const users = await usersRepository.findAll();
      const mappedUsers = users.map((user) => {
        return {
          id: user.id,
          name: user.name,
        };
      });

      return res.status(200).json(mappedUsers);
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }
}

module.exports = new UsersController();
