import { createServer } from "http";
import express from "express";
import configExpress from "./config/express.js";
import configRoutes from "./config/routes.js";
import { initializeSocket } from "./config/socket.js";

// Crea la aplicación Express
const app = express();

// Configura Express (middlewares, etc.)
configExpress(app);

// Configura las rutas
configRoutes(app);

// Crea el servidor HTTP
const server = createServer(app);

// Configura Socket.io
initializeSocket(server);

// Inicia el servidor
const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
