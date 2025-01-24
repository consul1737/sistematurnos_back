const express = require("express");
const { conectGenerateQR, conectEnviarNotificaciones } = require("../controllers/whatsapp");

const router = express.Router();

// Ruta para generar el código QR
router.get("/generate-qr", conectGenerateQR);

// Ruta para enviar notificaciones
router.post("/enviar-notificaciones", conectEnviarNotificaciones);

module.exports = router;
