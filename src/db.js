require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST,  DB_NAME} = process.env;

const dbURL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;
console.log("URL de conexión a la base de datos:", dbURL); // Agregar este log
const sequelize = new Sequelize(dbURL, {
  logging: false,
  native: false,
});

// const sequelize = new Sequelize(DB_RENDER, {
//   logging: false,
//   native: false,
//   dialectOptions: {
//     ssl: true, // Deshabilitar la conexión SSL/TLS
//   },
// });

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Users, ChatPersonal } = sequelize.models;

Users.hasMany(ChatPersonal, { foreignKey: "senderId" });
ChatPersonal.belongsTo(Users, { as: "sender", foreignKey: "senderId" });

Users.hasMany(ChatPersonal, { foreignKey: "receiverId" });
ChatPersonal.belongsTo(Users, { as: "receiver", foreignKey: "receiverId" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
