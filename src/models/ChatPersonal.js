const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const uuid = uuidv4();

module.exports = (sequelize) => {
  sequelize.define(
    "ChatPersonal",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userNameSend: {
        type: DataTypes.TEXT,
        alowwNull: false,
      },
      userNameReceiver: {
        type: DataTypes.TEXT,
        alowwNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
