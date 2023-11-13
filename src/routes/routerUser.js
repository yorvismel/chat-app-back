const { Router } = require("express");
const {
  postUser,
  getAllUsers,

  updateUserById,
  deleteUserById,
  getUserByName,
} = require("../controllers/controllerUser");
const router = Router();

router.post("/", async (req, res) => {
  const { id, userName } = req.body;
  try {
    const newUser = await postUser({
      id,
      userName,
    });
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const updatedUser = await updateUserById(id, userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
});

router.get("/", async (req, res) => {
  const allUsers = await getAllUsers();
  console.log(allUsers);
  try {
    res.status(200).json(allUsers);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.get("/:userName", async (req, res) => {
  const { userName } = req.params;
  try {
    const userByName = await getUserByName(userName);

    if (!userByName) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json(userByName);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("Error interno del servidor al obtener el usuario");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteUserById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
});

module.exports = router;
