const fs = require("fs");
const path = require("path");

const tareasPath = path.join(__dirname, "../data/tareas.json");

function leerTareas() {
  const data = fs.readFileSync(tareasPath, "utf-8");
  return JSON.parse(data);
}

function guardarTareas(tareas) {
  fs.writeFileSync(tareasPath, JSON.stringify(tareas, null, 2));
}

function obtenerTareas(req, res) {
  const tareas = leerTareas();
  res.status(200).json(tareas);
}

function obtenerTareaPorId(req, res) {
  const tareas = leerTareas();
  const id = parseInt(req.params.id);

  const tarea = tareas.find((t) => t.id === id);

  if (!tarea) {
    return res.status(404).json({
      error: "Tarea no encontrada"
    });
  }

  res.status(200).json(tarea);
}

function crearTarea(req, res) {
  const tareas = leerTareas();
  const { titulo, descripcion, estado, prioridad, asignadoA } = req.body;

  if (!titulo || !estado || !asignadoA) {
    return res.status(400).json({
      error: "Los campos titulo, estado y asignadoA son obligatorios"
    });
  }

  const estadosPermitidos = ["pendiente", "en progreso", "completada"];

  if (!estadosPermitidos.includes(estado)) {
    return res.status(400).json({
      error: "El estado debe ser: pendiente, en progreso o completada"
    });
  }

  const nuevaTarea = {
    id: tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1,
    titulo,
    descripcion: descripcion || "",
    estado,
    prioridad: prioridad || "media",
    asignadoA
  };

  tareas.push(nuevaTarea);
  guardarTareas(tareas);

  res.status(201).json({
    mensaje: "Tarea creada correctamente",
    tarea: nuevaTarea
  });
}

function actualizarTarea(req, res) {
  const tareas = leerTareas();
  const id = parseInt(req.params.id);

  const tarea = tareas.find((t) => t.id === id);

  if (!tarea) {
    return res.status(404).json({
      error: "Tarea no encontrada"
    });
  }

  const { titulo, descripcion, estado, prioridad, asignadoA } = req.body;

  const estadosPermitidos = ["pendiente", "en progreso", "completada"];

  if (estado && !estadosPermitidos.includes(estado)) {
    return res.status(400).json({
      error: "El estado debe ser: pendiente, en progreso o completada"
    });
  }

  tarea.titulo = titulo || tarea.titulo;
  tarea.descripcion = descripcion || tarea.descripcion;
  tarea.estado = estado || tarea.estado;
  tarea.prioridad = prioridad || tarea.prioridad;
  tarea.asignadoA = asignadoA || tarea.asignadoA;

  guardarTareas(tareas);

  res.status(200).json({
    mensaje: "Tarea actualizada correctamente",
    tarea
  });
}

function eliminarTarea(req, res) {
  let tareas = leerTareas();
  const id = parseInt(req.params.id);

  const tareaExiste = tareas.some((t) => t.id === id);

  if (!tareaExiste) {
    return res.status(404).json({
      error: "Tarea no encontrada"
    });
  }

  tareas = tareas.filter((t) => t.id !== id);
  guardarTareas(tareas);

  res.status(200).json({
    mensaje: "Tarea eliminada correctamente"
  });
}

module.exports = {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
  actualizarTarea,
  eliminarTarea
};