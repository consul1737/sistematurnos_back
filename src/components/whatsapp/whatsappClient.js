import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode";
import { getIO } from "../../config/socket";

export const clients = {};

export const startWhatsapp = async (userId, socketId) => {
  const io = getIO();
  console.log(`🔄 Iniciando WhatsApp para userId: ${userId}`);
  if (clients[userId]) {
    console.log(`✔ Cliente ya inicializado para userId: ${userId}`);
    clients[userId].socketId = socketId;
    io.to(socketId).emit("whatsapp-ready", { userId });
    return clients[userId].instance;
  }

  const clientInstance = new Client({
    authTimeoutMs: 20000,
    takeoverOnConflict: true,
    authStrategy: new LocalAuth({
      clientId: `session-${userId}`,
      dataPath: `whatsapp-js-session/${userId}`,
    }),
    restartOnAuthFail: true,
    puppeteer: {
      ignoreDefaultArgs: ["--enable-automation", "--disable-dev-shm-usage"],
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      // args: [
      //   "--no-sandbox",
      //   "--disable-gpu-driver-bug-workarounds",
      //   "--disable-setuid-sandbox",
      //   "--unhandled-rejections=strict",
      //   "--disable-dev-shm-usage",
      //   "--disable-accelerated-2d-canvas",
      //   "--no-first-run",
      //   "--no-zygote",
      //   "--disable-gpu",
      //   "--log-level=3",
      //   "--no-default-browser-check",
      //   "--disable-site-isolation-trials",
      //   "--no-experiments",
      //   "--ignore-gpu-blacklist",
      //   "--ignore-certificate-errors",
      //   "--ignore-certificate-errors-spki-list",
      //   "--disable-extensions",
      //   "--disable-default-apps",
      //   "--enable-features=NetworkService",
      //   "--disable-webgl",
      //   "--disable-threaded-animation",
      //   "--disable-threaded-scrolling",
      //   "--disable-in-process-stack-traces",
      //   "--disable-histogram-customizer",
      //   "--disable-gl-extensions",
      //   "--disable-composited-antialiasing",
      //   "--disable-canvas-aa",
      //   "--disable-3d-apis",
      //   "--disable-accelerated-jpeg-decoding",
      //   "--disable-accelerated-mjpeg-decode",
      //   "--disable-app-list-dismiss-on-blur",
      //   "--disable-accelerated-video-decode",
      // ],
    },
  });

  // process.on("unhandledRejection", async (reason) => {
  //   if (
  //     typeof reason === "string" &&
  //     (reason.includes("Protocol Error:") || reason.includes("Target closed."))
  //   ) {
  //     await clientInstance.destroy();
  //     await fs.rmdir("./wwebjs_auth", { recursive: true });
  //   }
  // });
  // process.on("uncaughtException", async (error) => {
  //   if (
  //     error.message.includes("Protocol Error:") ||
  //     error.message.includes("Target closed.")
  //   ) {
  //     await clientInstance.destroy();
  //     await fs.rmdir("./wwebjs_auth", { recursive: true });
  //   }
  // });

  clients[userId] = { instance: clientInstance, socketId };

  // Manejo de eventos
  clientInstance.on("ready", () => {
    console.log(`✅ WhatsApp listo para userId: ${userId}`);
    io.to(socketId).emit("whatsapp-ready", { userId });
  });

  clientInstance.on("qr", (qr) => {
    qrcode.toDataURL(qr, (err, url) => {
      if (err) {
        console.error("Error al generar el QR:", err);
        io.to(socketId).emit("whatsapp-error", {
          userId,
          error: "Error al generar el QR",
        });
      } else {
        io.to(socketId).emit("whatsapp-qr", { userId, qrCode: url });
      }
    });
  });

  clientInstance.on("disconnected", async () => {
    console.log(`⚠ Cliente desconectado para userId: ${userId}`);
    io.to(socketId).emit("whatsapp-disconnected", { userId });

    try {
      delete clients[userId];
      await clientInstance.destroy();
      console.log("🚫 Cliente destruido.");
    } finally {
      await clientInstance.initialize();
    }
  });

  clientInstance.on("error", (error) => {
    console.error(`❌ Error en el cliente de userId: ${userId}`, error);
    io.to(socketId).emit("whatsapp-error", { userId, error: error.message });
  });

  clientInstance.on("authenticated", () => {
    console.log(`🔒 Cliente autenticado para userId: ${userId}`);
    io.to(socketId).emit("whatsapp-authenticated", { userId });
  });

  clientInstance.on("auth_failure", async () => {
    console.error(
      `⛔ Fallo de autenticación en userId: ${userId}, reiniciando...`
    );
    await clientInstance.destroy();
    await fs.rm(`whatsapp-js-session/${userId}`, {
      recursive: true,
      force: true,
    });
    delete clients[userId];
    startWhatsapp(userId, socketId, io);
  });

  await clientInstance.initialize();
};

// Obtener cliente y su socketId
export const getClient = (userId) => clients[userId] || null;

// export const getQrCodeData = (userId) => {
//   const client = clients[userId];
//   return client ? client.qrCodeData : null; // Devuelve el código QR de este cliente
// };
