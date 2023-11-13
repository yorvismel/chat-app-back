const { Router } = require("express");
const router = Router();
const {
  createChatPersonal,
  getAllChats,
} = require("../controllers/controllerChat");

router.post("/chats/group/:userNameSend", async (req, res) => {
  const { message } = req.body;
  const { userNameSend } = req.params;

  try {
    if (!message || !userNameSend) {
      return res
        .status(400)
        .json({ message: "Falta información para crear el chat personal." });
    }

    const newPersonalChat = await createChatPersonal(req, res);

    return res.status(200).json(newPersonalChat);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error al crear el chat personal." });
  }
});

router.get("/chats/group", async (req, res) => {
  try {
    const allChats = await getAllChats(req, res);
    return res.status(200).json(allChats);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al recuperar los chats." });
  }
});

module.exports = router;
