const appointmentsRepository = require("../repositories/appointments.repository");
const authRepository = require("../../auth/repositories/auth.repository");

class AppointmentsController {
  async findAll(req, res) {
    // #swagger.tags = ["Appointments"]
    // #swagger.description = "Endpoint para obter a lista de consultas."

    try {
      const userDecoded = req.user;

      const user = await authRepository.findByEmail(userDecoded.email);

      const appointments =
        user && user.role !== "ADMIN"
          ? await appointmentsRepository.findAllByUserId(user.id)
          : await appointmentsRepository.findAll();

      /* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Appointments" },
          description: "Lista de consultas encontrada." 
      } */
      return res.status(200).json(appointments);
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }

  async findById(req, res) {
    // #swagger.tags = ["Appointments"]
    // #swagger.description = "Endpoint para obter uma consulta."

    // #swagger.parameters['id'] = { description: "Id da consulta" }
    const { id } = req.params;

    try {
      const appointment = await appointmentsRepository.findOne(id);

      if (!appointment) {
        /* #swagger.responses[404] = { 
            description: "Consulta não encontrada." 
        } */
        return res.status(404).json({ message: "Consulta não encontrada." });
      }

      /* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Appointment" },
          description: "Consulta encontrada." 
      } */
      return res.json(appointment);
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }

  async create(req, res) {
    // #swagger.tags = ["Appointments"]
    // #swagger.description = "Endpoint para cadastrar uma consulta."

    /* #swagger.parameters['Appointment'] = { 
        in: 'body',
        description: "Adicionando uma nova consulta.",
        schema: { $ref: "#/definitions/AddAppointment" }
    } */
    const appointment = req.body;
    const user = req.user;

    try {
      appointment.userId = user.userId;
      await appointmentsRepository.create(appointment);

      /* #swagger.responses[201] = { 
          description: "Consulta cadastrada." 
      } */
      return res.status(201).json();
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }

  async update(req, res) {
    // #swagger.tags = ["Appointments"]
    // #swagger.description = "Endpoint para atualizar uma consulta."

    // #swagger.parameters['id'] = { description: "Id da consulta" }
    const { id } = req.params;

    /* #swagger.parameters['Appointment'] = { 
        in: 'body',
        description: "Atualizando uma consulta.",
        schema: { $ref: "#/definitions/Appointment" }
    } */
    const appointment = req.body;

    try {
      const appointmentExists = await appointmentsRepository.findOne(id);

      if (!appointmentExists) {
        /* #swagger.responses[404] = { 
            description: "Consulta não encontrada." 
        } */
        return res.status(404).json({ message: "Consulta não encontrada." });
      }

      await appointmentsRepository.update(id, appointment);

      /* #swagger.responses[204] = { 
          description: "Consulta atualizada com sucesso." 
      } */
      return res.status(204).json();
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }

  async cancel(req, res) {
    // #swagger.tags = ["Appointments"]
    // #swagger.description = "Endpoint para cancelar uma consulta."

    // #swagger.parameters['id'] = { description: "Id da consulta" }
    const { id } = req.params;

    try {
      const appointment = await appointmentsRepository.findOne(id);

      if (!appointment) {
        /* #swagger.responses[404] = { 
            description: "Consulta não encontrada." 
        } */
        return res.status(404).json({ message: "Consulta não encontrada." });
      }

      if (appointment.status === "DONE") {
        /* #swagger.responses[404] = { 
            description: "Não é possível cancelar uma consulta concluída." 
        } */
        return res
          .status(400)
          .json({ message: "Não é possível cancelar uma consulta concluída." });
      }

      await appointmentsRepository.update(id, { status: "CANCELED" });

      /* #swagger.responses[204] = { 
          description: "Consulta cancelada com sucesso." 
      } */
      return res.status(204).json();
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }

  async conclude(req, res) {
    // #swagger.tags = ["Appointments"]
    // #swagger.description = "Endpoint para marcar uma consulta como concluída."

    // #swagger.parameters['id'] = { description: "Id da consulta" }
    const { id } = req.params;

    try {
      const appointment = await appointmentsRepository.findOne(id);

      if (!appointment) {
        /* #swagger.responses[404] = { 
            description: "Consulta não encontrada." 
        } */
        return res.status(404).json({ message: "Consulta não encontrada." });
      }

      if (appointment.status === "CANCELED") {
        /* #swagger.responses[404] = { 
            description: "Não é possível concluir uma consulta cancelada." 
        } */
        return res
          .status(400)
          .json({ message: "Não é possível concluir uma consulta cancelada." });
      }

      await appointmentsRepository.update(id, { status: "DONE" });

      /* #swagger.responses[204] = { 
          description: "Consulta concluída com sucesso." 
      } */
      return res.status(204).json();
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }

  async delete(req, res) {
    // #swagger.tags = ["Appointments"]
    // #swagger.description = "Endpoint para remover uma consulta."

    // #swagger.parameters['id'] = { description: "Id da consulta" }
    const { id } = req.params;

    try {
      const appointmentExists = await appointmentsRepository.findOne(id);

      if (!appointmentExists) {
        /* #swagger.responses[404] = { 
            description: "Consulta não encontrada." 
        } */
        return res.status(404).json({ message: "Consulta não encontrada." });
      }

      await appointmentsRepository.delete(id);

      /* #swagger.responses[204] = { 
          description: "Consulta removida com sucesso." 
      } */
      return res.status(204).json();
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }
}

module.exports = new AppointmentsController();
