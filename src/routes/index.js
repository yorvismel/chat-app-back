const { Router } = require("express");
const router = Router();
const express = require("express");
const path = require("path");

const routerUser = require("./routerUser");
const routerChatPersonal = require("./routeChat");

router.use("/chat/personal", routerChatPersonal);
router.use("/users", routerUser);

module.exports = router;
