import { Router } from "express";
import { conectGenerateQR, conectEnviarNotificaciones } from "@whatsapp/whatsappController";

const router = Router();

// Ruta para generar el código QR
router.get("/generate-qr", conectGenerateQR);

// Ruta para enviar notificaciones
router.post("/enviar-notificaciones", conectEnviarNotificaciones);

module.exports = router;