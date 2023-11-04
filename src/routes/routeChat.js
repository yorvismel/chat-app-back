const { Router } = require("express");
const io = require("../../index.js");
const {
  getPersonalChatsByUsers,
  createPersonalChat,
} = require("../controllers/controllerChat.js");

const router = Router();

router.post("/:userNameSend/:userNameReceiver", async (req, res) => {
  const message = req.body.message;
  const userNameSend = req.params.userNameSend;
  const userNameReceiver = req.params.userNameReceiver;

  try {
    console.log("userNameReceiver:", userNameReceiver);
    console.log("Message:", message);
    console.log("userNameSend:", userNameSend);

    if (!userNameReceiver || !message || !userNameSend) {
      throw Error("Falta información para crear el chat personal.");
    }

    const newPersonalChat = await createPersonalChat({
      userNameSend,
      message,
      userNameReceiver,
    });

    return res.status(200).json(newPersonalChat);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error al crear el chat personal." });
  }
});

router.get("/:userName", async (req, res) => {
  const userName = req.params.userName;

  try {
    if (!userName) {
      throw Error("Falta información para obtener el chat personal.");
    }

    const personalChats = await getPersonalChatsByUsers(userName);
    console.log(personalChats);
    return res.status(200).json(personalChats);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error al obtener los chats personales." });
  }
});

module.exports = router;
