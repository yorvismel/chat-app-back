const { Router } = require("express");
const router = Router();
const {
  getAllChats,
  createGroupChat,
} = require("../controllers/controllerChat");

const userRoutes = require("./routerUser");
const chatRoutes = require("./routeChat");
router.post("/chats/group/:userNameSend", createGroupChat);
router.get("/chats/group", getAllChats);
router.get("users/:userName", userRoutes);
router.use("/users", userRoutes);

module.exports = router;
