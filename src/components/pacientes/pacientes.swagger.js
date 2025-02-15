/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Endpoints relacionados con pacientes
 */

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Crea un nuevo paciente.
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del paciente.
 *               apellido:
 *                 type: string
 *                 description: Apellido del paciente.
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento del paciente (formato YYYY-MM-DD).
 *               genero:
 *                 type: string
 *                 enum: [Masculino, Femenino, Otro]
 *                 description: Género del paciente.
 *               telefono:
 *                 type: string
 *                 description: Teléfono del paciente.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del paciente.
 *               direccion:
 *                 type: string
 *                 description: Dirección del paciente.
 *             required:
 *               - nombre
 *               - apellido
 *               - fecha_nacimiento
 *               - genero
 *               - telefono
 *               - email
 *               - direccion
 *     responses:
 *       200:
 *         description: Paciente creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       500:
 *         description: Error al crear el paciente.
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
 * /pacientes:
 *   get:
 *     summary: Obtiene una lista de todos los pacientes.
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Lista de pacientes obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_paciente:
 *                     type: integer
 *                     description: ID del paciente.
 *                   nombre:
 *                     type: string
 *                     description: Nombre del paciente.
 *                   apellido:
 *                     type: string
 *                     description: Apellido del paciente.
 *                   fecha_nacimiento:
 *                     type: string
 *                     format: date
 *                     description: Fecha de nacimiento del paciente (formato YYYY-MM-DD).
 *                   genero:
 *                     type: string
 *                     enum: [Masculino, Femenino, Otro]
 *                     description: Género del paciente.
 *                   telefono:
 *                     type: string
 *                     description: Teléfono del paciente.
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: Correo electrónico del paciente.
 *                   direccion:
 *                     type: string
 *                     description: Dirección del paciente.
 *       500:
 *         description: Error al obtener la lista de pacientes.
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
 * /pacientes/{id_paciente}:
 *   delete:
 *     summary: Elimina un paciente por su ID.
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id_paciente
 *         required: true
 *         description: ID del paciente a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       500:
 *         description: Error al eliminar el paciente.
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
