const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usuariosPath = path.join(__dirname, "../data/usuarios.json");

function leerUsuarios() {
  const data = fs.readFileSync(usuariosPath, "utf-8");
  return JSON.parse(data);
}

function guardarUsuarios(usuarios) {
  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
}

function registrarUsuario(req, res) {
  const usuarios = leerUsuarios();
  const { nombre, email, password, rol } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({
      error: "Los campos nombre, email y password son obligatorios"
    });
  }

  const emailExiste = usuarios.some((usuario) => usuario.email === email);

  if (emailExiste) {
    return res.status(400).json({
      error: "El correo ya está registrado"
    });
  }

  const passwordEncriptada = bcrypt.hashSync(password, 10);

  const nuevoUsuario = {
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    nombre,
    email,
    password: passwordEncriptada,
    rol: rol || "usuario"
  };

  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);

  res.status(201).json({
    mensaje: "Usuario registrado correctamente",
    usuario: {
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol
    }
  });
}

function iniciarSesion(req, res) {
  const usuarios = leerUsuarios();
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Los campos email y password son obligatorios"
    });
  }

  const usuario = usuarios.find((u) => u.email === email);

  if (!usuario) {
    return res.status(401).json({
      error: "Credenciales incorrectas"
    });
  }

  const passwordValida = bcrypt.compareSync(password, usuario.password);

  if (!passwordValida) {
    return res.status(401).json({
      error: "Credenciales incorrectas"
    });
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h"
    }
  );

  res.status(200).json({
    mensaje: "Inicio de sesión correcto",
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    }
  });
}

module.exports = {
  registrarUsuario,
  iniciarSesion
};