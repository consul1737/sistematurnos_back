"use strict";

var express = require("express");
var _require = require("../controllers/whatsapp"),
  conectGenerateQR = _require.conectGenerateQR,
  conectEnviarNotificaciones = _require.conectEnviarNotificaciones,
  checkReadQr = _require.checkReadQr;
var router = express.Router();

// Ruta para generar el código QR
router.get("/generate-qr", conectGenerateQR);

//Ruta para ver si el cliente esta listo !!
router.get("/check-qr-status", checkReadQr);

// Ruta para enviar notificaciones
router.post("/enviar-notificaciones", conectEnviarNotificaciones);
module.exports = router;