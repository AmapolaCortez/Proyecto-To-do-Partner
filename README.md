To do Partner

1. Descripción del proyecto: To do Partner es una aplicación web para la administración de tareas colaborativas, inspirada en herramientas tipo Trello. Su objetivo es apoyar la organización del trabajo en equipo mediante un tablero de tareas con estados, asignación de responsables y funcionalidades básicas de gestion
-------------------------------------------------------------------------------------------------------------------------------------------------------
2. Integrantes
* Amapola Cortez Carmona
* Jorge Gonzalez Dureo
* Renato Rodriguez Huenchullan
* Diego Zuleta Mallea
-------------------------------------------------------------------------------------------------------------------------------------------------------------
3. Tecnologías utilizadas
* Node.js
* Express.js
* JavaScript
* JSON como persistencia de datos
* Thunder Client para pruebas de API
* JWT para autenticación
* bcryptjs para encriptación de contraseñas
* CORS
* dotenv
-------------------------------------------------------------------------------------------------------------------------------------------------------------
4. Funcionalidades implementadas en la entrega 2
* Servidor backend con Node.js y Expres
* Registro de usuarios
* Inicio de sesión con generación de token JWT
* CRUD de tareas.
* Clasificación de tareas por estado: pendiente, en progreso y completada.
* Asignación de tareas a usuario
* Persistencia mediante archivos JSON
* Rutas protegidas con token para crear, editar y eliminar tareas.
* Estructura organizada en rutas, controladores, middlewares y datos
.............................................................................................................................................................
5. Estructura de la carpeta
  
Proyecto-To-do-Partner/
├---controllers/
│   ├── authController.js
│   ├── tareasController.js
│   └── usuariosController.j
├--- data/
│   ├── tareas.json
│   └── usuarios.json
├----middlewares/
│   └── authMiddleware.js
├---- routes/
│   ├── authRoutes.js
│   ├── tareasRoutes.js
│   └── usuariosRoutes.js
├---.gitignore
├----package.json
├--- package-lock.json
└---server.js
.............................................................................................................................................................
6. Instalación y ejecución

1. Clonar el repositorio:git clone URL_DEL_REPOSITORIO
2. Entrar a la carpeta del proyecto:cd Proyecto-To-do-Partner
3. Instalar dependencias:npm install
4. Crear un archivo  env con el siguiente contenido:
PORT=3000
JWT_SECRET=clave_secreta_to_do_partner
5. Ejecutar el servidor:npm start
6. Abrir en el navegador:http://localhost:3000
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
7. Entidades del sistema

Usuario
| Campo    | Tipo   | Descripción                        |
| -------- | ------ | ---------------------------------- |
| id       | Number | Identificador único del usuario    |
| nombre   | String | Nombre del usuario                 |
| email    | String | Correo electrónico                 |
| password | String | Contraseña encriptada              |
| rol      | String | Rol del usuario dentro del sistema |

Tarea
| Campo       | Tipo   | Descripción                         |
| ----------- | ------ | ----------------------------------- |
| id          | Number | Identificador único de la tarea     |
| titulo      | String | Título de la tarea                  |
| descripcion | String | Detalle de la tarea                 |
| estado      | String | pendiente, en progreso o completada |
| prioridad   | String | baja, media o alta                  |
| asignadoA   | String | Usuario responsable de la tarea     |
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Rutas de la api
Autenticación

| Método | Ruta               | Descripción                       |
| ------ | ------------------ | --------------------------------- |
| POST   | /api/auth/register | Registra un nuevo usuario         |
| POST   | /api/auth/login    | Inicia sesión y entrega token JWT |

Usuarios
| Método | Ruta          | Descripción                                            |
| ------ | ------------- | ------------------------------------------------------ |
| GET    | /api/usuarios | Lista los usuarios registrados sin mostrar contraseñas |

Tareas
| Método | Ruta            | Descripción              | Protección     |
| ------ | --------------- | ------------------------ | -------------- |
| GET    | /api/tareas     | Lista todas las tareas   | Pública        |
| GET    | /api/tareas/:id | Obtiene una tarea por ID | Pública        |
| POST   | /api/tareas     | Crea una nueva tarea     | Requiere token |
| PUT    | /api/tareas/:id | Actualiza una tarea      | Requiere token |
| DELETE | /api/tareas/:id | Elimina una tarea        | Requiere token |
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Estado del avance
El backend se encuentra funcional en entorno local. Se implementó autenticación básica con JWT, persistencia con archivos JSON y CRUD de tareas, ademas el frontend se encuentra en etapa inicial preparado para conectarse posteriormente al backend mediante peticiones HTTP
