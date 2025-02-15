/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints relacionados con autenticación
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Registra un nuevo usuario.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario.
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               telefono:
 *                 type: string
 *                 description: Teléfono del usuario.
 *               direccion:
 *                 type: string
 *                 description: Dirección del usuario.
 *               ciudad:
 *                 type: string
 *                 description: Ciudad del usuario.
 *               pais:
 *                 type: string
 *                 description: País del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *               rol_id:
 *                 type: integer
 *                 description: ID del rol del usuario.
 *             required:
 *               - nombre
 *               - email
 *               - password
 *               - rol_id
 *     responses:
 *       200:
 *         description: Registro exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       500:
 *         description: Error al registrar el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                 error:
 *                   type: object
 *                   description: Detalles del error.
 */

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Inicia sesión de un usuario.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso o usuario no encontrado.
 *         content:
 *           application/json:
 *             oneOf:
 *               - type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del usuario.
 *                   nombre:
 *                     type: string
 *                     description: Nombre del usuario.
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del usuario.
 *               - type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Mensaje indicando que el usuario no existe.
 *                   NotFound:
 *                     type: boolean
 *                     description: Indica si el usuario no fue encontrado.
 *       500:
 *         description: Error al iniciar sesión.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                 error:
 *                   type: object
 *                   description: Detalles del error.
 */
