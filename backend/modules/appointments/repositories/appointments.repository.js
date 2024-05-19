const database = require("../../../infra/db");
const User = require("../../users/models/user.model");
const Appointment = require("../models/appointment.model");
const { v4: uuidv4 } = require("uuid");

class AppointmentsRepository {
  async findAll() {
    await database.sync();
    const appointments = await Appointment.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    return appointments;
  }

  async findAllByUserId(userId) {
    await database.sync();
    const appointments = await Appointment.findAll({
      where: {
        userId,
      },
    });
    return appointments;
  }

  async findOne(id) {
    await database.sync();
    const appointment = await Appointment.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
        },
      ],
    });
    return appointment;
  }

  async create(appointment) {
    await database.sync();
    return await Appointment.create({
      ...appointment,
      id: uuidv4(),
    });
  }

  async update(id, appointment) {
    await database.sync();
    return await Appointment.update(appointment, {
      where: {
        id,
      },
    });
  }

  async delete(id) {
    await database.sync();
    await Appointment.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = new AppointmentsRepository();
