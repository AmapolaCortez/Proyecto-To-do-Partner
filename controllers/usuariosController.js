const fs = require("fs");
const path = require("path");

const usuariosPath = path.join(__dirname, "../data/usuarios.json");

function leerUsuarios() {
  const data = fs.readFileSync(usuariosPath, "utf-8");
  return JSON.parse(data);
}

function obtenerUsuarios(req, res) {
  const usuarios = leerUsuarios();

  const usuariosSinPassword = usuarios.map((usuario) => ({
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol
  }));

  res.status(200).json(usuariosSinPassword);
}

module.exports = {
  obtenerUsuarios
};