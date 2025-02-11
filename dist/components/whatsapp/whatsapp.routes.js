"use strict";

var _express = require("express");
var _whatsappController = require("./whatsappController");
var router = (0, _express.Router)();

// Ruta para generar el código QR
router.get("/generate-qr", _whatsappController.conectGenerateQR);

// Ruta para enviar notificaciones
router.post("/enviar-notificaciones", _whatsappController.conectEnviarNotificaciones);
module.exports = router;