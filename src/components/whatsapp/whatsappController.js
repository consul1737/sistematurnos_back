import { formatearFecha } from "../../utils/dateformatter";
import pool from "../database/keys"; // Configura correctamente el pool para PostgreSQL.
import { getClient } from "./whatsappClient";

// export const initializeWhatsappController = async (userId, socket) => {
//   try {
//     await startWhatsapp(userId, socket);
//     socket.emit("whatsapp-initialized", { userId });
//   } catch (error) {
//     console.error("Error al inicializar WhatsApp:", error);
//     socket.emit("whatsapp-error", { userId, error: error.message });
//   }
// };

import { getIO } from "../../config/socket";

export const requestQRController = async (userId, socketId) => {
  const io = getIO(); // Obtener la instancia de io

  try {
    const client = getClient(userId);

    if (!client) {
      if (io && socketId) {
        io.to(socketId).emit("whatsapp-error", {
          userId,
          error: "Cliente no inicializado",
        });
      } else {
        console.error("io o socketId no están definidos");
      }
      return;
    }

    console.log(`Solicitando QR para userId: ${userId}`);

    if (io && socketId) {
      io.to(socketId).emit("whatsapp-qr-refresh", { userId });
    } else {
      console.error("io o socketId no están definidos");
    }
  } catch (error) {
    console.error("Error al solicitar el QR:", error);
    if (io && socketId) {
      io.to(socketId).emit("whatsapp-error", { userId, error: error.message });
    } else {
      console.error("io o socketId no están definidos");
    }
  }
};
//export const conectGenerateQR = async (req, res) => {
//   const { userId } = req; // Obtén el userId desde el middleware

//   try {
//     // Inicializa el cliente y obtén el código QR
//     const { qrCode } = await starWhatsapp(userId);

//     if (!qrCode) {
//       return res
//         .status(400)
//         .json({ message: "No se pudo generar el código QR." });
//     }

//     res.status(200).json({
//       message: "Código QR generado exitosamente",
//       qrCode,
//     });
//   } catch (error) {
//     console.error("Error en conectGenerateQR:", error);
//     res.status(500).json({
//       message: "Error al generar el código QR",
//       error: error.message,
//     });
//   }
// };

export const conectEnviarNotificaciones = async (req, res) => {
  const { turnos, mensajeBase } = req.body;
  console.log("Turnos recibidos:", turnos);

  if (!turnos || turnos.length === 0) {
    console.warn("No se proporcionaron turnos en la solicitud.");
    return res.status(400).json({
      message: "Debe proporcionar al menos un turno para enviar mensajes.",
    });
  }

  try {
    // Esperar a que el cliente esté listo antes de enviar los mensajes
    // await ensureClientReady();

    for (const turno of turnos) {
      const { idTurno, numero } = turno;

      // Verificar formato del número
      if (!numero || !/^\d+$/.test(numero)) {
        console.warn(`Número inválido para el turno ${idTurno}: ${numero}`);
        console.warn(`Número inválido para el turno ${idTurno}: ${numero}`);
        continue;
      }

      // Construir el número completo con el código de país desde la variable de entorno
      const fullPhoneNumber = `${process.env.COUNTRY_CODE}${numero}`;
      console.log(`Número de teléfono completo: ${fullPhoneNumber}`);

      // Consultar detalles del turno desde la base de datos
      const result = await pool.query(
        `SELECT t.id_turno, p.nombre AS paciente, c.nombre AS consultorio, 
                tr.nombre AS tratamiento, t.fecha, t.hora 
         FROM turnos t 
         JOIN pacientes p ON t.id_paciente = p.id_paciente 
         JOIN consultorios c ON t.id_consultorio = c.id_consultorio 
         JOIN tratamientos tr ON t.id_tratamiento = tr.id_tratamiento 
         WHERE t.id_turno = $1`,
        [idTurno]
      );

      if (result.rows.length === 0) {
        console.warn(`Turno no encontrado: ${idTurno}`);
        continue;
      }

      const turnoData = result.rows[0];
      console.log(`Datos del turno: ${JSON.stringify(turnoData)}`);

      //** se crea el mensaje personalizado** //
      // Formatear la fecha
      const formattedDate = formatearFecha(turnoData.fecha);

      // Personalizar el mensaje
      const mensaje = mensajeBase
        .replace("{PACIENTE}", turnoData.paciente)
        .replace("{CONSULTORIO}", turnoData.consultorio)
        .replace("{TRATAMIENTO}", turnoData.tratamiento)
        .replace("{FECHA}", formattedDate)
        .replace("{HORA}", turnoData.hora);

      console.log(`Mensaje personalizado: ${mensaje}`);

      console.log(
        "Estado del cliente antes de enviar mensaje:",
        clientInstance.info
      );
      console.log(
        "¿Está el cliente completamente listo?",
        clientInstance.isReady
      );

      // Enviar mensaje por WhatsApp
      const chatId = `${fullPhoneNumber}@c.us`;
      console.log(
        "Estado del cliente antes de enviar mensaje:",
        clientInstance.info
      );

      await clientInstance.sendMessage(chatId, mensaje);
      console.log(`Mensaje enviado al número: ${fullPhoneNumber}`);
    }

    res.status(200).json({ message: "Mensajes enviados con éxito." });
  } catch (error) {
    console.error("Error al enviar mensajes:", error);
    res.status(500).json({
      message: "Error al enviar los mensajes.",
      error: error.message,
    });
  }
};

// Exportar los controladores
