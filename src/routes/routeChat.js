const { Router } = require("express");
const io = require("../../index.js");
const {
  
  createPersonalChat,
  getAllChats
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

router.get("/", async (req, res) => {
  try {
    const allChats = await getAllChats(req, res); 
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al recuperar los chats." });
  }
});



module.exports = router;
