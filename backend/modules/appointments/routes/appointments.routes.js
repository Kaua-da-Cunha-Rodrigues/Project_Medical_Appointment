const { Router } = require("express");
const appointmentsController = require("../controllers/appointments.controller");
const verifyToken = require("../../../middlewares/verify-token");

const appointmentsRouter = Router();

appointmentsRouter.get("/", verifyToken, appointmentsController.findAll);
appointmentsRouter.get("/:id", verifyToken, appointmentsController.findById);
appointmentsRouter.post("/", verifyToken, appointmentsController.create);
appointmentsRouter.put("/:id", verifyToken, appointmentsController.update);
appointmentsRouter.put(
  "/cancel/:id",
  verifyToken,
  appointmentsController.cancel
);
appointmentsRouter.put(
  "/done/:id",
  verifyToken,
  appointmentsController.conclude
);
appointmentsRouter.delete("/:id", verifyToken, appointmentsController.delete);

module.exports = appointmentsRouter;
