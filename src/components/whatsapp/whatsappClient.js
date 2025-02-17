import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode";

const clients = {};
const qrCodeData = "";

export const starWhatsapp = async (userId) => {
  if (clients[userId]) {
    return clients[userId];
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

  let qrRequested = false;
  let qrCodeData = "";

  clientInstance.on("ready", () => {
    console.log("¡Cliente de WhatsApp listo!" + clientInstance.info);
  });

  clientInstance.on("qr", (qr) => {
    qrcode.toDataURL(qr, (err, url) => {
      if (err) {
        console.error("Error al generar el QR:", err);
        return;
      }
      qrCodeData = url;
    });
  });

  clientInstance.on("disconnected", async () => {
    console.log("Cliente desconectado.");
    clientReady = false;
    try {
      await clientInstance.destroy();
      console.log("Cliente destruido.");
    } finally {
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

  await clientInstance.initialize();

  clients[userId] = clientInstance;

  clients[userId] = { instance: clientInstance, qrCodeData };
};

export const getClient = (userId) => {
  return clients[userId];
};

export const getQrCodeData = (userId) => {
  const client = clients[userId];
  return client ? client.qrCodeData : null; // Devuelve el código QR de este cliente
};
