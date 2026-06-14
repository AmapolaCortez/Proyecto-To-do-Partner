require("dotenv").config();

const express = require("express");
const cors = require("cors");

const tareasRoutes = require("./routes/tareasRoutes");
const authRoutes = require("./routes/authRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "API To do Partner funcionando correctamente"
  });
});

app.use("/api/tareas", tareasRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuariosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});