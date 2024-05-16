const { Router } = require("express");
const usersController = require("../controllers/users.controller");
const verifyToken = require("../../../middlewares/verify-token");

const usersRouter = Router();

usersRouter.get("/", verifyToken, usersController.findAll);

module.exports = usersRouter;
