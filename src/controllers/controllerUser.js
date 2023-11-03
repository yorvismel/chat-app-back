const { Users, ReportUser, Events, ReviewUser } = require("../db");

const postUser = async ({ userName }) => {
  try {
    const [user, created] = await Users.findOrCreate({
      where: { userName },
      defaults: {
        userName,
      },
    });

    if (!created) {
      throw new Error("El usuario con este nombre de usuario ya existe.");
    }

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const allUsers = await Users.findAll();
    return allUsers;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await Users.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const updateUserById = async (id, userData) => {
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return { message: "User no encontrado" };
    }
    await user.update(userData);
    const updatedUser = await Users.findByPk(id);
    return updatedUser;
  } catch (error) {
    res.status(500).json({ error: "Error de servidor" });
  }
};

const deleteUserById = async (id) => {
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return { message: "Usuario no encontrado" };
    }
    await user.destroy();
    return { message: "Usuario eliminado" };
  } catch (error) {
    res.status(500).json({ error: "Error de servidor" });
  }
};

module.exports = {
  postUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
