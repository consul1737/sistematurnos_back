import { Client, LocalAuth } from 'whatsapp-web.js';
import { formatearFecha } from '../utils/dateformatter';
import qrcode from 'qrcode';
import pool from '../database/keys'; // Configura correctamente el pool para PostgreSQL.

const clientInstance = new Client({
  authTimeoutMs: 20000,
  takeoverOnConflict: true,
  authStrategy: new LocalAuth({
    clientId: "session",
  }),
  restartOnAuthFail: true,
  puppeteer: {
    ignoreDefaultArgs: ["--enable-automation", "--disable-dev-shm-usage"],
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-gpu-driver-bug-workarounds",
      "--disable-setuid-sandbox",
      "--unhandled-rejections=strict",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
      "--log-level=3",
      "--no-default-browser-check",
      "--disable-site-isolation-trials",
      "--no-experiments",
      "--ignore-gpu-blacklist",
      "--ignore-certificate-errors",
      "--ignore-certificate-errors-spki-list",
      "--disable-extensions",
      "--disable-default-apps",
      "--enable-features=NetworkService",
      "--disable-webgl",
      "--disable-threaded-animation",
      "--disable-threaded-scrolling",
      "--disable-in-process-stack-traces",
      "--disable-histogram-customizer",
      "--disable-gl-extensions",
      "--disable-composited-antialiasing",
      "--disable-canvas-aa",
      "--disable-3d-apis",
      "--disable-accelerated-jpeg-decoding",
      "--disable-accelerated-mjpeg-decode",
      "--disable-app-list-dismiss-on-blur",
      "--disable-accelerated-video-decode",
    ],
  },
});

process.on("unhandledRejection", async (reason) => {
  if (
    typeof reason === "string" &&
    (reason.includes("Protocol Error:") || reason.includes("Target closed."))
  ) {
    await clientInstance.destroy();
    await fs.rmdir("./wwebjs_auth", { recursive: true });
  }
});
process.on("uncaughtException", async (error) => {
  if (
    error.message.includes("Protocol Error:") ||
    error.message.includes("Target closed.")
  ) {
    await clientInstance.destroy();
    await fs.rmdir("./wwebjs_auth", { recursive: true });
  }
});

// Variables estado para saber si esta pidiendo el qr
let qrRequested = false;

// 
let qrCodeData = "";

clientInstance.on("ready", () => {
  console.log("¡Cliente de WhatsApp listo!");
});


// Escuchar eventos del cliente
clientInstance.on("qr", (qr) => {

  // Verificar si se ha solicitado el QR
  if (qrRequested) {
    qrcode.toDataURL(qr, (err, url) => {
      if (err) {
        console.error('Error al generar el QR:', err);
        return;
      }
      qrCodeData = url;
      console.log('QR generado:', qrCodeData);
    })
  }
});

clientInstance.on("disconnected", async () => {
  console.log("Cliente desconectado.");
  clientReady = false;
  try {
    try {
      await clientInstance.destroy();
      console.log("Cliente destruido.");
    } catch (err) {
      if (err.code === "EBUSY") {
        console.warn(
          `Erro EBUSY ao destruir cliente para o usuário. Recurso ocupado ou bloqueado.`
        );
        // Aguarda um curto período e tenta novamente
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
          console.log(`Tentando destruir novamente o cliente para o usuário `);
          await clientInstance.destroy();
        } catch (retryErr) {
          console.warn(
            `Tentativa final de destruir cliente para o usuário  falhou:`,
            retryErr
          );
        }
      } else {
        console.warn(`Erro inesperado ao destruir cliente para o usuário `, err);
      }
    }
    if (reason === "NAVIGATION" || reason === "LOGOUT") {
      const sessionDir = path.join("./wwebjs_auth", `session-session`);

      // Verificar se a pasta existe
      if (await fs.stat(sessionDir).catch(() => false)) {
        try {
          await fs.rm(sessionDir, { recursive: true, force: true });
          console.log(
            `Pasta da sessão excluída com sucesso para o usuário `
          );
        } catch (err) {
          console.log(
            `Erro ao excluir a pasta da sessão para o usuário  ${err.message}`
          );
        }
      }
    }
  }
  finally {
    await clientInstance.initialize();
  }
});

clientInstance.on("error", (error) => {
  console.error(`Error in client`, error);
});


clientInstance.on("authenticated", () => {
  console.log("¡Cliente autenticado correctamente!");
});

clientInstance.on("auth_failure", (message) => {
  console.error("Falló la autenticación:", message);
  console.log("Intentando reiniciar el cliente...");
  clientInstance.destroy().then(() => clientInstance.initialize());
});

// Inicializar cliente
clientInstance.initialize();


// Controladores
const conectGenerateQR = (req, res) => {
  if (!qrCodeData) {
    qrRequested = true; // Aca marca que se ha solicitado el QR
    res.json({ message: 'QR solicitado, espere...' });
  } else {
    res.json({ qrCode: qrCodeData }); // Si ya existe un QR, se envia
  }

  // if (qrCodeData) {
  //   res.status(200).json({ qrCode: qrCodeData });
  // } else {
  //   res.status(500).json({ message: "Error al generar el QR" });
  // }
};

const conectEnviarNotificaciones = async (req, res) => {
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
