/**
 * @swagger
 * tags:
 *   name: WhatsApp
 *   description: Endpoints relacionados con la integración de WhatsApp
 */

/**
 * @swagger
 * /whatsapp/generate-qr:
 *   get:
 *     summary: Generar un código QR para iniciar sesión en WhatsApp.
 *     tags: [WhatsApp]
 *     responses:
 *       200:
 *         description: Código QR generado o solicitud de generación exitosa.
 *         content:
 *           application/json:
 *             oneOf:
 *               - schema:
 *                   type: object
 *                   properties:
 *                     qrCode:
 *                       type: string
 *                       description: URL del código QR en formato base64.
 *               - schema:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: Mensaje indicando que se ha solicitado el QR.
 *       500:
 *         description: Error al generar el código QR.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 */

/**
 * @swagger
 * /whatsapp/enviar-notificaciones:
 *   post:
 *     summary: Enviar notificaciones por WhatsApp a los pacientes.
 *     tags: [WhatsApp]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               turnos:
 *                 type: array
 *                 description: Lista de turnos para los cuales se enviarán las notificaciones.
 *                 items:
 *                   type: object
 *                   properties:
 *                     idTurno:
 *                       type: integer
 *                       description: ID del turno.
 *                     numero:
 *                       type: string
 *                       description: Número de teléfono del paciente (sin código de país).
 *               mensajeBase:
 *                 type: string
 *                 description: Plantilla del mensaje personalizado.
 *             required:
 *               - turnos
 *               - mensajeBase
 *     responses:
 *       200:
 *         description: Mensajes enviados con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       400:
 *         description: Error en la solicitud debido a datos incorrectos o faltantes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error interno del servidor al enviar los mensajes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                 error:
 *                   type: string
 *                   description: Detalles del error.
 */
