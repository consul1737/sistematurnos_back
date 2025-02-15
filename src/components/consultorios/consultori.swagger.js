/**
 * @swagger
 * tags:
 *   name: Consultorios
 *   description: Endpoints relacionados con consultorios y sus tratamientos
 */

/**
 * @swagger
 * /consultorios:
 *   get:
 *     summary: Obtener todos los consultorios.
 *     tags: [Consultorios]
 *     responses:
 *       200:
 *         description: Lista de consultorios obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_consultorio:
 *                     type: integer
 *                     description: ID del consultorio.
 *                   nombre:
 *                     type: string
 *                     description: Nombre del consultorio.
 *       500:
 *         description: Error al obtener los consultorios.
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
 *     summary: Crear un nuevo consultorio.
 *     tags: [Consultorios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del consultorio.
 *               tratamientos:
 *                 type: array
 *                 description: IDs de los tratamientos asociados al consultorio.
 *                 items:
 *                   type: integer
 *             required:
 *               - nombre
 *     responses:
 *       201:
 *         description: Consultorio creado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       500:
 *         description: Error al crear el consultorio.
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
 * /consultorios/tratamientos:
 *   get:
 *     summary: Obtener todos los consultorios con sus tratamientos asociados.
 *     tags: [Consultorios]
 *     responses:
 *       200:
 *         description: Lista de consultorios con tratamientos obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_consultorio:
 *                     type: integer
 *                     description: ID del consultorio.
 *                   nombre_consultorio:
 *                     type: string
 *                     description: Nombre del consultorio.
 *                   tratamientos:
 *                     type: array
 *                     description: Lista de tratamientos asociados.
 *                     items:
 *                       type: object
 *                       properties:
 *                         id_tratamiento:
 *                           type: integer
 *                           description: ID del tratamiento.
 *                         nombre:
 *                           type: string
 *                           description: Nombre del tratamiento.
 *                         descripcion:
 *                           type: string
 *                           description: Descripción del tratamiento.
 *                         duracion:
 *                           type: string
 *                           description: Duración del tratamiento.
 *                         color:
 *                           type: string
 *                           description: Color asociado al tratamiento.
 *                         costo:
 *                           type: number
 *                           description: Costo del tratamiento.
 *       500:
 *         description: Error al obtener los consultorios y tratamientos.
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
 * /consultorios/consultorio_tratamientos/:
 *   get:
 *     summary: Obtener todas las relaciones entre consultorios y tratamientos.
 *     tags: [Consultorios]
 *     responses:
 *       200:
 *         description: Lista de relaciones consultorio-tratamiento obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_consultorio:
 *                     type: integer
 *                     description: ID del consultorio.
 *                   id_tratamiento:
 *                     type: integer
 *                     description: ID del tratamiento.
 *       500:
 *         description: Error al obtener las relaciones consultorio-tratamiento.
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
 * /consultorios/{id_consultorio}:
 *   get:
 *     summary: Obtener un consultorio por su ID.
 *     tags: [Consultorios]
 *     parameters:
 *       - in: path
 *         name: id_consultorio
 *         required: true
 *         description: ID del consultorio a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Consultorio obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_consultorio:
 *                     type: integer
 *                     description: ID del consultorio.
 *                   nombre:
 *                     type: string
 *                     description: Nombre del consultorio.
 *       404:
 *         description: Consultorio no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error al obtener el consultorio.
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
 *     summary: Actualizar un consultorio existente.
 *     tags: [Consultorios]
 *     parameters:
 *       - in: path
 *         name: id_consultorio
 *         required: true
 *         description: ID del consultorio a actualizar.
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
 *                 description: Nuevo nombre del consultorio.
 *               tratamientos:
 *                 type: array
 *                 description: Nuevos IDs de los tratamientos asociados.
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Consultorio actualizado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       404:
 *         description: Consultorio no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error al actualizar el consultorio.
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
 *     summary: Eliminar un consultorio existente.
 *     tags: [Consultorios]
 *     parameters:
 *       - in: path
 *         name: id_consultorio
 *         required: true
 *         description: ID del consultorio a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Consultorio eliminado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       400:
 *         description: El consultorio no puede ser eliminado debido a restricciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       404:
 *         description: Consultorio no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error al eliminar el consultorio.
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
