

import { Client, LocalAuth } from "whatsapp-web.js";

const client = new Client({
  authStrategy: new LocalAuth(), // Esto guardará la sesión automáticamente
});

client.on("qr", (qr) => {
  const qrcode = require("qrcode-terminal");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Cliente de WhatsApp está listo.");
});

client.on("auth_failure", (msg) => {
  console.error("Error de autenticación:", msg);
});

client.on("disconnected", () => {
  console.log("Cliente desconectado.");
});

client.initialize();

module.exports = { client };
