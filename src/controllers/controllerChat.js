const { ChatPersonal } = require("../db.js");
const { Op } = require("sequelize");
const io = require("../../index.js");
console.log("este es el io :", io);
const { Users } = require("../db.js");

const createGroupChat = async (req, res) => {
  try {
    const { userNameSend } = req.params;
    const { message } = req.body;

    if (!userNameSend || !message) {
      return res
        .status(400)
        .json({ message: "Falta información para crear el chat grupal." });
    }

    const chatGroup = await ChatPersonal.create({
      message,
      userNameSend,
    });

    return res.status(200).json(chatGroup);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al crear el chat grupal." });
  }
};

const getAllChats = async (req, res) => {
  try {
    const allChats = await ChatPersonal.findAll();

    const processedIds = new Set();

    // Filtra los chats para evitar duplicados por ID
    const filteredChats = allChats.filter((chat) => {
      if (processedIds.has(chat.id)) {
        return false; // Si el ID ya ha sido procesado, no incluirlo
      }

      processedIds.add(chat.id); // Agrega el ID al conjunto

      return true; // Incluye el chat en la lista filtrada
    });

    // Formatea los chats
    const formattedChats = filteredChats.map((chat) => {
      const chatDate = new Date(chat.createdAt);

      const hours = chatDate.getHours().toString().padStart(2, "0");
      const minutes = chatDate.getMinutes().toString().padStart(2, "0");

      const formattedTime = `${hours}:${minutes}`;

      return {
        message: chat.message,
        userNameSend: chat.userNameSend,
        createdAt: formattedTime,
      };
    });

    return res.status(200).json(formattedChats);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al recuperar todos los chats personales." });
  }
};

module.exports = {
  createGroupChat,
  getAllChats,
};
