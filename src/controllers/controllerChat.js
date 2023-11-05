const { ChatPersonal, Users } = require("../db.js");
const { Op } = require("sequelize");

const createPersonalChat = async (req, res) => {
  try {
    const { userNameSend, userNameReceiver } = req.params;
    const { message } = req.body;

    if (!userNameSend || !userNameReceiver || !message) {
      return res
        .status(400)
        .json({ message: "Falta información para crear el chat personal." });
    }

    const chatPersonal = await ChatPersonal.create({
      message,
      userNameReceiver,
      userNameSend,
    });

    return res.status(200).json(chatPersonal);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error al crear el chat personal." });
  }
};

const getAllChats = async (req, res) => {
  try {
    const allChats = await ChatPersonal.findAll();

    const formattedChats = allChats.map((chat) => {
      const date = new Date(chat.createdAt);
      const formattedDate = `${date.getHours()}:${String(
        date.getMinutes()
      ).padStart(2, "0")}`; // Formatea la fecha
      return {
        message: chat.message,
        userNameSend:
          chat.userNameSend || "Valor predeterminado si es undefined",
        createdAt: formattedDate,
      };
    });

    return res.status(200).json(formattedChats);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al recuperar los chats personales." });
  }
};

module.exports = {
  createPersonalChat,
  getAllChats,
};
