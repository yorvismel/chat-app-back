const { conn } = require("./src/db.js");
require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const server = require("./src/server.js");

const PORT = 3001;

const httpServer = http.createServer(server);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

conn.sync({ force: false }).then(() => {
  console.log("Base de datos conectada");
});

httpServer.listen(PORT, () => {
  console.log(`Servidor iniciado en ${PORT}`);
});

io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);
  socket.emit("message", "Hola, te has conectado correctamente.");

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });

  socket.on("chat message", (message) => {
    console.log(`Mensaje recibido: ${message}`);
    // Emitir el mensaje a todos los clientes, incluido el remitente
    io.emit("chat message", message);
  });
});
