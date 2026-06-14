const express = require("express");
const router = express.Router();

const verificarToken = require("../middlewares/authMiddleware");

const {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
  actualizarTarea,
  eliminarTarea
} = require("../controllers/tareasController");

// Rutas públicas
router.get("/", obtenerTareas);
router.get("/:id", obtenerTareaPorId);

// Rutas protegidas
router.post("/", verificarToken, crearTarea);
router.put("/:id", verificarToken, actualizarTarea);
router.delete("/:id", verificarToken, eliminarTarea);

module.exports = router;
