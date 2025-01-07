import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import dotenv from 'dotenv/config';
import qrcode from 'qrcode';
import { pool } from '../database/keys'; // Configura correctamente el pool para PostgreSQL.

const clientInstance = new Client({
  authStrategy: new LocalAuth(), // Usa LocalAuth para autenticación sin escaneo QR
});

let qrCodeData = null;

// Escuchar eventos del cliente
clientInstance.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
  qrCodeData = qr; // Guardar el último QR recibidonpm r
});

clientInstance.on("ready", () => {
  console.log("¡Cliente de WhatsApp listo!");
});

clientInstance.on("authenticated", () => {
  console.log("¡Cliente autenticado correctamente!");
});

clientInstance.on("disconnected", () => {
  console.log("¡Cliente desconectado!");
});

// Esperar a que el cliente esté completamente listo antes de hacer cualquier operación
const ensureClientReady = async () => {
  return new Promise((resolve, reject) => {
    if (clientInstance.info && clientInstance.info.wid) {
      resolve(true);
    } else {
      clientInstance.once("ready", () => resolve(true));
      clientInstance.once("auth_failure", (message) => reject(message));
    }
  });
};

// Inicializar cliente
clientInstance.initialize();

// Controladores
const conectGenerateQR = (req, res) => {
  if (qrCodeData) {
    qrcode.toDataURL(qrCodeData, (err, url) => {
      if (err) {
        console.error("Error al generar QR:", err);
        res.status(500).send("Error al generar QR");
      } else {
        res.json({ qrCode: url }); // Enviar QR como base64
      }
    });
  } else {
    res.status(404).send("QR no disponible aún. Por favor, intente nuevamente.");
  }
};

const conectEnviarNotificaciones = async (req, res) => {
  const { turnos, mensajeBase } = req.body;

  if (!turnos || turnos.length === 0) {
    console.warn("No se proporcionaron turnos en la solicitud.");
    return res.status(400).json({
      message: "Debe proporcionar al menos un turno para enviar mensajes.",
    });
  }

  try {
    // Esperar a que el cliente esté listo antes de enviar los mensajes
    await ensureClientReady();

    for (const turno of turnos) {
      const { idTurno, numero } = turno;

      // Verificar formato del número
      if (!numero || !/^\d+$/.test(numero)) {
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
         WHERE t.id_turno = $1`, [idTurno]
      );

      if (result.rows.length === 0) {
        console.warn(`Turno no encontrado: ${idTurno}`);
        continue;
      }

      const turnoData = result.rows[0];
      console.log(`Datos del turno: ${JSON.stringify(turnoData)}`);

      // Personalizar el mensaje
      const mensaje = mensajeBase
        .replace("{PACIENTE}", turnoData.paciente)
        .replace("{CONSULTORIO}", turnoData.consultorio)
        .replace("{TRATAMIENTO}", turnoData.tratamiento)
        .replace("{FECHA}", turnoData.fecha)
        .replace("{HORA}", turnoData.hora);

      console.log(`Mensaje personalizado: ${mensaje}`);
     
      console.log("Estado del cliente antes de enviar mensaje:", clientInstance.info);
      console.log("¿Está el cliente completamente listo?", clientInstance.isReady);

      // Enviar mensaje por WhatsApp
      const chatId = `${fullPhoneNumber}@c.us`;
      console.log("Estado del cliente antes de enviar mensaje:", clientInstance.info);

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
export { conectGenerateQR, conectEnviarNotificaciones };
