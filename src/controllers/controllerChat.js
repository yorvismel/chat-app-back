const { ChatPersonal, Users } = require("../db.js");
const { Op } = require("sequelize");

const createPersonalChat = async ({ message, userName }) => {
  try {
    const chatPersonal = await ChatPersonal.create({
      message,
      userName,
    });

    return chatPersonal;
  } catch (error) {
    res.status(500).json({ error: "Error de servidor" });
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
