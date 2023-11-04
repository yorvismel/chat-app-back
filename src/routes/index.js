const { Router } = require("express");
const router = Router();
const express = require("express");
const path = require("path");

const routerUser = require("./routerUser");
const routerChatPersonal = require("./routeChat");
const { createPersonalChat } = require("../controllers/controllerChat");

router.post(
  "/chat/personal/:userNameSend/:userNameReceiver",
  createPersonalChat
);

router.use("/users", routerUser);

module.exports = router;
