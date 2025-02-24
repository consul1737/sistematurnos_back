// import { Server } from "socket.io";
// import { requestQRController } from "@whatsapp/whatsappController";
// import { startWhatsapp, clients } from "@whatsapp/whatsappClient";

// let ioInstance = null;

// export default function configSocket(server) {
//   const io = new Server(server, {
//     cors: { origin: "http://localhost:8080", methods: ["GET", "POST"] },
//   });

//   ioInstance = io; // Asignar la instancia de io

//   io.on("connection", (socket) => {
//     console.log("Usuario conectado:", socket.id);

//     // Evento para inicializar WhatsApp
//     socket.on("initialize-whatsapp", (userId) => {
//       console.log(`Usuario ${userId} solicita iniciar WhatsApp`);
//       if (clients[userId]) {
//         // Actualizamos el socketId y avisamos que ya está listo
//         clients[userId].socketId = socket.id;
//         console.log(`Reasignado socketId para userId: ${userId}`);
//         io.to(socket.id).emit("whatsapp-ready", { userId });
//       } else {
//         // Iniciamos WhatsApp y pasamos un callback para el QR
//         startWhatsapp(userId, socket.id, (data) => {
//           io.to(socket.id).emit("whatsapp-qr", data);
//         });
//       }
//     });
//     socket.on("disconnect", () => {
//       console.log("Usuario desconectado:", socket.id);
//     });
//   });

//   return io;
// }

// export function getIO() {
//   return ioInstance;
// }
// archivo: socket-config.js
import { Server } from "socket.io";
import {
  startSession,
  resetQr,
  getSession,
  stopSession,
} from "../components/whatsapp/whatsapp";

export function initializeSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    // Cada cliente debe emitir su sessionId para crear o reintegrar la sesión
    socket.on("start-session", async (sessionId) => {
      try {
        await startSession(sessionId, socket);
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        socket.emit("error", "No se pudo iniciar la sesión.");
      }
    });

    socket.on("reset-qr", async (sessionId) => {
      try {
        await resetQr(sessionId, socket);
      } catch (error) {
        console.error("Error al reiniciar QR:", error);
        socket.emit("error", "No se pudo reiniciar el QR.");
      }
    });

    socket.on("send-message", async ({ sessionId, to, message }) => {
      const session = getSession(sessionId);
      if (session) {
        try {
          await session.sock.sendMessage(to, { text: message });
          socket.emit("message-status", `Mensaje enviado a ${to}`);
        } catch (error) {
          console.error("Error al enviar el mensaje:", error);
          socket.emit("error", "No se pudo enviar el mensaje.");
        }
      } else {
        socket.emit("error", "Sesión no encontrada.");
      }
    });

    socket.on("stop-session", async (sessionId) => {
      try {
        const session = getSession(sessionId);
        if (session) {
          await stopSession(sessionId, session.sock);
          socket.emit("stopped", `Sesión ${sessionId} detenida.`);
        } else {
          socket.emit("error", `No se encontró la sesión ${sessionId}.`);
        }
      } catch (error) {
        console.error("Error al detener la sesión:", error);
        socket.emit("error", "No se pudo detener la sesión.");
      }
    });

    socket.on("disconnect", () => {
      console.log(`Cliente desconectado: ${socket.id}`);
      // Opcional: podrías limpiar o detener la sesión asociada a este socket si ya no se necesita
    });
  });

  return io;
}
