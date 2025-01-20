const express = require("express");
const { conectGenerateQR, conectEnviarNotificaciones, checkReadQr } = require("../controllers/whatsapp");

const router = express.Router();

// Ruta para generar el código QR
router.get("/generate-qr", conectGenerateQR);

//Ruta para ver si el cliente esta listo !!
router.get("/check-qr-status", checkReadQr);

// Ruta para enviar notificaciones
router.post("/enviar-notificaciones", conectEnviarNotificaciones);

module.exports = router;
