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

const getPersonalChatsByUsers = async (userName) => {
  try {
    const chats = await ChatPersonal.findAll({
      where: {
        [Op.or]: [{ userName: userName }],
      },
      include: [
        { model: Users, as: "sender", attributes: ["userName"] },
        { model: Users, as: "receiver", attributes: ["userName"] },
      ],
    });
    console.log(chats);
    return chats;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getPersonalChatsByUsers,
  createPersonalChat,
};
