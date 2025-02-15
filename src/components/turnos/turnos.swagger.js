/**
 * @swagger
 * tags:
 *   name: Turnos
 *   description: Endpoints relacionados con la gestión de turnos
 */

/**
 * @swagger
 * /turnos:
 *   get:
 *     summary: Obtener todos los turnos.
 *     tags: [Turnos]
 *     responses:
 *       200:
 *         description: Lista de turnos obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_turno:
 *                     type: integer
 *                     description: ID del turno.
 *                   id_paciente:
 *                     type: integer
 *                     description: ID del paciente asociado al turno.
 *                   fecha:
 *                     type: string
 *                     description: Fecha del turno (formato YYYY-MM-DD).
 *                   hora:
 *                     type: string
 *                     description: Hora del turno.
 *                   estado:
 *                     type: string
 *                     description: Estado del turno (por ejemplo, "pendiente", "completado").
 *                   id_consultorio_tratamiento:
 *                     type: integer
 *                     description: ID de la relación consultorio-tratamiento.
 *       500:
 *         description: Error interno del servidor.
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
 *   post:
 *     summary: Crear un nuevo turno.
 *     tags: [Turnos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_paciente:
 *                 type: integer
 *                 description: ID del paciente.
 *               fecha:
 *                 type: string
 *                 description: Fecha del turno (formato YYYY-MM-DD).
 *               hora:
 *                 type: string
 *                 description: Hora del turno.
 *               estado:
 *                 type: string
 *                 description: Estado del turno (por ejemplo, "pendiente").
 *               id_consultorio:
 *                 type: integer
 *                 description: ID del consultorio.
 *               id_tratamiento:
 *                 type: integer
 *                 description: ID del tratamiento.
 *             required:
 *               - id_paciente
 *               - fecha
 *               - hora
 *               - estado
 *               - id_consultorio
 *               - id_tratamiento
 *     responses:
 *       200:
 *         description: El turno se creó correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       400:
 *         description: Ya existe un turno en este horario y consultorio.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error interno del servidor.
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
 * /turnos/calendario:
 *   get:
 *     summary: Obtener turnos para el calendario, opcionalmente filtrados por fecha.
 *     tags: [Turnos]
 *     parameters:
 *       - in: query
 *         name: fecha
 *         schema:
 *           type: string
 *         description: Fecha específica para filtrar los turnos (formato YYYY-MM-DD).
 *     responses:
 *       200:
 *         description: Lista de turnos formateados para el calendario obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_turno:
 *                     type: integer
 *                     description: ID del turno.
 *                   fecha:
 *                     type: string
 *                     description: Fecha del turno (formato YYYY-MM-DD).
 *                   hora:
 *                     type: string
 *                     description: Hora del turno.
 *                   estado:
 *                     type: string
 *                     description: Estado del turno.
 *                   nombre_paciente:
 *                     type: string
 *                     description: Nombre del paciente.
 *                   apellido_paciente:
 *                     type: string
 *                     description: Apellido del paciente.
 *                   telefono:
 *                     type: string
 *                     description: Teléfono del paciente.
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del paciente.
 *                   nombre_consultorio:
 *                     type: string
 *                     description: Nombre del consultorio.
 *                   color_tratamiento:
 *                     type: string
 *                     description: Color asociado al tratamiento.
 *                   nombre_tratamiento:
 *                     type: string
 *                     description: Nombre del tratamiento.
 *                   descripcion_tratamiento:
 *                     type: string
 *                     description: Descripción del tratamiento.
 *                   duracion_tratamiento:
 *                     type: string
 *                     description: Duración del tratamiento.
 *                   costo_tratamiento:
 *                     type: number
 *                     description: Costo del tratamiento.
 *       500:
 *         description: Error interno del servidor.
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
 * /turnos/{id_turno}:
 *   get:
 *     summary: Obtener un turno por su ID.
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id_turno
 *         required: true
 *         description: ID del turno a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turno obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_turno:
 *                   type: integer
 *                   description: ID del turno.
 *                 fecha:
 *                   type: string
 *                   description: Fecha del turno (formato YYYY-MM-DD).
 *                 hora:
 *                   type: string
 *                   description: Hora del turno.
 *                 estado:
 *                   type: string
 *                   description: Estado del turno.
 *                 id_consultorio_tratamiento:
 *                   type: integer
 *                   description: ID de la relación consultorio-tratamiento.
 *       404:
 *         description: Turno no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error interno del servidor.
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
 *   put:
 *     summary: Actualizar un turno existente.
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id_turno
 *         required: true
 *         description: ID del turno a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_paciente:
 *                 type: integer
 *                 description: Nuevo ID del paciente.
 *               fecha:
 *                 type: string
 *                 description: Nueva fecha del turno (formato YYYY-MM-DD).
 *               hora:
 *                 type: string
 *                 description: Nueva hora del turno.
 *               estado:
 *                 type: string
 *                 description: Nuevo estado del turno.
 *               id_consultorio:
 *                 type: integer
 *                 description: Nuevo ID del consultorio.
 *               id_tratamiento:
 *                 type: integer
 *                 description: Nuevo ID del tratamiento.
 *             required:
 *               - id_paciente
 *               - fecha
 *               - hora
 *               - estado
 *               - id_consultorio
 *               - id_tratamiento
 *     responses:
 *       200:
 *         description: Turno actualizado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                 turno:
 *                   type: object
 *                   properties:
 *                     fecha:
 *                       type: string
 *                       description: Fecha del turno.
 *                     hora:
 *                       type: string
 *                       description: Hora del turno.
 *                     id_consultorio:
 *                       type: integer
 *                       description: ID del consultorio.
 *       400:
 *         description: Ya existe un turno en este horario y consultorio.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       404:
 *         description: Turno no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error interno del servidor.
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
 *   delete:
 *     summary: Eliminar un turno existente.
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id_turno
 *         required: true
 *         description: ID del turno a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turno eliminado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       404:
 *         description: Turno no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error interno del servidor.
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
