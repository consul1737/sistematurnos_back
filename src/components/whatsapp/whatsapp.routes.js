// import { Router } from "express";
// import {
//   conectGenerateQR,
//   conectEnviarNotificaciones,
// } from "@whatsapp/whatsappController";

// const router = Router();

// // Ruta para generar el código QR
// router.get(
//   "/generate-qr",
//   (req, res, next) => {
//     const { userId } = req.query; // Obtén el ID del usuario desde los query parameters

//     if (!userId) {
//       return res
//         .status(400)
//         .json({ message: "Falta el ID del usuario", error: true });
//     }

//     // Asigna el ID del usuario a req.userId
//     req.userId = userId;
//     next();
//   },
//   conectGenerateQR
// );

// // Ruta para enviar notificaciones
// router.post("/enviar-notificaciones", conectEnviarNotificaciones);

// module.exports = router;
