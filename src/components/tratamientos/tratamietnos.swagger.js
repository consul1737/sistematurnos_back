/**
 * @swagger
 * tags:
 *   name: Tratamientos
 *   description: Endpoints relacionados con tratamientos
 */

/**
 * @swagger
 * /tratamientos:
 *   get:
 *     summary: Obtener todos los tratamientos.
 *     tags: [Tratamientos]
 *     responses:
 *       200:
 *         description: Lista de tratamientos obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_tratamiento:
 *                     type: integer
 *                     description: ID del tratamiento.
 *                   nombre:
 *                     type: string
 *                     description: Nombre del tratamiento.
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del tratamiento.
 *                   duracion:
 *                     type: string
 *                     description: Duración del tratamiento.
 *                   costo:
 *                     type: number
 *                     description: Costo del tratamiento.
 *                   color:
 *                     type: string
 *                     description: Color asociado al tratamiento.
 *       500:
 *         description: Error al obtener los tratamientos.
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
 *   post:
 *     summary: Crear un nuevo tratamiento.
 *     tags: [Tratamientos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del tratamiento.
 *               descripcion:
 *                 type: string
 *                 description: Descripción del tratamiento.
 *               duracion:
 *                 type: string
 *                 description: Duración del tratamiento.
 *               costo:
 *                 type: number
 *                 description: Costo del tratamiento.
 *               color:
 *                 type: string
 *                 description: Color asociado al tratamiento.
 *             required:
 *               - nombre
 *               - descripcion
 *               - duracion
 *               - costo
 *     responses:
 *       201:
 *         description: Tratamiento creado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_tratamiento:
 *                   type: integer
 *                   description: ID del tratamiento.
 *                 nombre:
 *                   type: string
 *                   description: Nombre del tratamiento.
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del tratamiento.
 *                 duracion:
 *                   type: string
 *                   description: Duración del tratamiento.
 *                 costo:
 *                   type: number
 *                   description: Costo del tratamiento.
 *                 color:
 *                   type: string
 *                   description: Color asociado al tratamiento.
 *       400:
 *         description: Faltan campos obligatorios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error al crear el tratamiento.
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

/**
 * @swagger
 * /tratamientos/tratamientosconsul/{id_consultorio}:
 *   get:
 *     summary: Obtener tratamientos por ID de consultorio.
 *     tags: [Tratamientos]
 *     parameters:
 *       - in: path
 *         name: id_consultorio
 *         required: true
 *         description: ID del consultorio.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de tratamientos asociados al consultorio obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_tratamiento:
 *                     type: integer
 *                     description: ID del tratamiento.
 *                   nombre_tratamiento:
 *                     type: string
 *                     description: Nombre del tratamiento.
 *                   color:
 *                     type: string
 *                     description: Color asociado al tratamiento.
 *                   duracion:
 *                     type: string
 *                     description: Duración del tratamiento.
 *                   costo:
 *                     type: number
 *                     description: Costo del tratamiento.
 *       500:
 *         description: Error al obtener los tratamientos.
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

/**
 * @swagger
 * /tratamientos/{id_tratamiento}:
 *   get:
 *     summary: Obtener un tratamiento por su ID.
 *     tags: [Tratamientos]
 *     parameters:
 *       - in: path
 *         name: id_tratamiento
 *         required: true
 *         description: ID del tratamiento a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tratamiento obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_tratamiento:
 *                     type: integer
 *                     description: ID del tratamiento.
 *                   nombre:
 *                     type: string
 *                     description: Nombre del tratamiento.
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del tratamiento.
 *                   duracion:
 *                     type: string
 *                     description: Duración del tratamiento.
 *                   costo:
 *                     type: number
 *                     description: Costo del tratamiento.
 *                   color:
 *                     type: string
 *                     description: Color asociado al tratamiento.
 *       404:
 *         description: Tratamiento no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error al obtener el tratamiento.
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
 *   put:
 *     summary: Actualizar un tratamiento existente.
 *     tags: [Tratamientos]
 *     parameters:
 *       - in: path
 *         name: id_tratamiento
 *         required: true
 *         description: ID del tratamiento a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nuevo nombre del tratamiento.
 *               descripcion:
 *                 type: string
 *                 description: Nueva descripción del tratamiento.
 *               duracion:
 *                 type: string
 *                 description: Nueva duración del tratamiento.
 *               costo:
 *                 type: number
 *                 description: Nuevo costo del tratamiento.
 *               color:
 *                 type: string
 *                 description: Nuevo color asociado al tratamiento.
 *     responses:
 *       200:
 *         description: Tratamiento actualizado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_tratamiento:
 *                   type: integer
 *                   description: ID del tratamiento.
 *                 nombre:
 *                   type: string
 *                   description: Nombre del tratamiento.
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del tratamiento.
 *                 duracion:
 *                   type: string
 *                   description: Duración del tratamiento.
 *                 costo:
 *                   type: number
 *                   description: Costo del tratamiento.
 *                 color:
 *                   type: string
 *                   description: Color asociado al tratamiento.
 *       404:
 *         description: Tratamiento no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error al actualizar el tratamiento.
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
 *   delete:
 *     summary: Eliminar un tratamiento existente.
 *     tags: [Tratamientos]
 *     parameters:
 *       - in: path
 *         name: id_tratamiento
 *         required: true
 *         description: ID del tratamiento a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tratamiento eliminado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_tratamiento:
 *                   type: integer
 *                   description: ID del tratamiento.
 *                 nombre:
 *                   type: string
 *                   description: Nombre del tratamiento.
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del tratamiento.
 *                 duracion:
 *                   type: string
 *                   description: Duración del tratamiento.
 *                 costo:
 *                   type: number
 *                   description: Costo del tratamiento.
 *                 color:
 *                   type: string
 *                   description: Color asociado al tratamiento.
 *       400:
 *         description: No se puede eliminar un tratamiento con turnos pendientes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                 details:
 *                   type: array
 *                   description: Detalles de los turnos asociados.
 *       404:
 *         description: Tratamiento no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error al eliminar el tratamiento.
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
