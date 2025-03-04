import pool from "../database/keys";

export const getConsultorios = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM consultorios");
    res.status(200).json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener consultorios", error: error.message });
  }
};

export const getConsultorioTratamiento = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM consultorio_tratamiento");
    res.status(200).json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener consultorios", error: error.message });
  }
};

export const deleteConsultorioTratamiento = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM consultorio_tratamiento WHERE id_consultorio = $1",
      [req.params.id_consultorio]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener consultorios", error: error.message });
  }
};

// export const getTratamientos = async (req, res) => {
//   const id = req.params.id_consultorio; // Obtener el ID del consultorio desde los parámetros de la solicitud

//   try {
//     // Consulta SQL corregida con espacios y uso correcto de placeholders
//     const result = await pool.query(
//       "SELECT t.nombre AS tratamiento, t.descripcion FROM consultorio_tratamiento ct JOIN tratamientos t ON ct.id_tratamiento = t.id_tratamiento WHERE ct.id_consultorio = $1",
//       [id] // Pasar el valor de 'id' como un array
//     );

//     // Devolver los resultados como JSON
//     res.status(200).json(result.rows);
//   } catch (error) {
//     // Manejar errores y devolver un mensaje claro
//     res.status(500).json({
//       message: "Error al obtener tratamientos",
//       error: error.message,
//     });
//   }
// };

export const getConsultoriosConTratamientos = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.id_consultorio,
        c.nombre AS nombre_consultorio,
        COALESCE(
          json_agg(
            json_build_object(
              'id_tratamiento', t.id_tratamiento,
              'nombre', t.nombre,
              'descripcion', t.descripcion,
              'duracion', t.duracion,
              'color', t.color,
              'costo', t.costo
            )
          ) FILTER (WHERE t.id_tratamiento IS NOT NULL), '[]'
        ) AS tratamientos
      FROM 
        consultorios c
      LEFT JOIN 
        consultorio_tratamiento ct ON c.id_consultorio = ct.id_consultorio
      LEFT JOIN 
        tratamientos t ON ct.id_tratamiento = t.id_tratamiento
      GROUP BY 
        c.id_consultorio, c.nombre;
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(
      "Error al obtener consultorios y tratamientos:",
      error.message
    );
    res.status(500).json({
      message: "Error al obtener consultorios y tratamientos",
      error: error.message,
    });
  }
};

export const getConsultorioById = async (req, res) => {
  const id = req.params.id_consultorio;
  try {
    const result = await pool.query(
      "SELECT * FROM consultorios WHERE id_consultorio = $1",
      [id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener consultorio", error: error.message });
  }
};

export const createConsultorio = async (req, res) => {
  const { nombre, tratamientos } = req.body;

  console.log("Datos recibidos:", nombre, tratamientos); // <-- Agrega esto

  try {
    const result = await pool.query(
      `INSERT INTO consultorios (nombre) VALUES ($1) RETURNING id_consultorio`,
      [nombre]
    );

    const id_consultorio = result.rows[0].id_consultorio;

    // Asegúrate que 'tratamiento' no sea undefined o null antes de insertar
    // if (!tratamiento) {
    //   throw new Error("Tratamiento no proporcionado");
    // }

    // await pool.query(
    //   `INSERT INTO consultorio_tratamiento (id_consultorio, id_tratamiento) VALUES ($1, $2)`,
    //   [consultorioId, tratamiento]
    // );
    // Si hay tratamientos seleccionados, inserta las nuevas relaciones
    if (tratamientos && tratamientos.length > 0) {
      for (const id_tratamiento of tratamientos) {
        const tratamientoId = parseInt(id_tratamiento, 10); // Convierte el ID a un número entero
        if (isNaN(tratamientoId)) {
          console.error(`ID de tratamiento inválido: ${id_tratamiento}`);
          continue; // Salta este tratamiento si el ID no es válido
        }
        await pool.query(
          `INSERT INTO consultorio_tratamiento (id_consultorio, id_tratamiento) VALUES ($1, $2)`,
          [id_consultorio, tratamientoId] // Usa el ID convertido
        );
      }
    }

    res.status(201).json({ message: "Consultorio creado con éxito" });
  } catch (error) {
    console.error("Error en el servidor:", error.message); // <-- Muestra el error en la consola
    res.status(500).json({
      message: "Error al crear el consultorio",
      error: error.message,
    });
  }
};

export const updateConsultorio = async (req, res) => {
  const { id_consultorio } = req.params;
  const { nombre, tratamientos } = req.body;

  console.log("Datos recibidos:", id_consultorio, nombre, tratamientos);

  try {
    // Verificar si hay turnos asociados a las relaciones de consultorio_tratamiento
    const turnosResult = await pool.query(
      `SELECT id_consultorio_tratamiento, id_tratamiento FROM consultorio_tratamiento 
       WHERE id_consultorio = $1 AND id_consultorio_tratamiento IN (
         SELECT id_consultorio_tratamiento FROM turnos
       )`,
      [id_consultorio]
    );

    const tratamientosConTurnos = turnosResult.rows.map(
      (row) => row.id_tratamiento
    );

    // Actualizar el nombre del consultorio
    const result = await pool.query(
      `UPDATE consultorios SET nombre = $1 WHERE id_consultorio = $2 RETURNING *`,
      [nombre, id_consultorio]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Consultorio no encontrado" });
    }

    // Eliminar relaciones de tratamientos que no tienen turnos asociados
    await pool.query(
      `DELETE FROM consultorio_tratamiento 
       WHERE id_consultorio = $1 AND id_tratamiento NOT IN (
         SELECT id_tratamiento FROM turnos 
         INNER JOIN consultorio_tratamiento USING (id_consultorio_tratamiento)
       )`,
      [id_consultorio]
    );

    // Insertar solo tratamientos nuevos (que no estén ya registrados)
    if (tratamientos && tratamientos.length > 0) {
      for (const id_tratamiento of tratamientos) {
        const tratamientoId = parseInt(id_tratamiento, 10);
        if (isNaN(tratamientoId)) {
          console.error(`ID de tratamiento inválido: ${id_tratamiento}`);
          continue;
        }

        // Verificamos si la relación ya existe
        const existResult = await pool.query(
          `SELECT 1 FROM consultorio_tratamiento 
           WHERE id_consultorio = $1 AND id_tratamiento = $2`,
          [id_consultorio, tratamientoId]
        );

        if (existResult.rowCount > 0) {
          console.log(
            `La relación consultorio ${id_consultorio} - tratamiento ${tratamientoId} ya existe`
          );
          continue;
        }

        // Insertamos la relación, si no existe
        await pool.query(
          `INSERT INTO consultorio_tratamiento (id_consultorio, id_tratamiento) 
           VALUES ($1, $2)`,
          [id_consultorio, tratamientoId]
        );
      }
    }

    res.status(200).json({ message: "Consultorio actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar el consultorio:", error.message);
    res.status(500).json({
      message: "Error al actualizar el consultorio",
      error: error.message,
    });
  }
};

export const deleteConsultorio = async (req, res) => {
  const { id_consultorio } = req.params; // ID del consultorio a eliminar

  try {
    // Verificar si el consultorio tiene relaciones en consultorio_tratamiento
    const consultorioTratamientoResult = await pool.query(
      `SELECT * FROM consultorio_tratamiento WHERE id_consultorio = $1`,
      [id_consultorio]
    );

    if (consultorioTratamientoResult.rows.length > 0) {
      return res.status(400).json({
        message:
          "El consultorio no puede ser eliminado ya que tiene tratamientos asociados",
      });
    }

    // Verificar si el consultorio tiene turnos asignados directamente en la tabla turnos
    const turnosResult = await pool.query(
      `SELECT * FROM turnos WHERE id_consultorio_tratamiento IN (
        SELECT id_consultorio_tratamiento FROM consultorio_tratamiento WHERE id_consultorio = $1
      )`,
      [id_consultorio]
    );

    if (turnosResult.rows.length > 0) {
      return res.status(400).json({
        message:
          "El consultorio no puede ser eliminado ya que tiene turnos asignados",
      });
    }

    // Eliminar el consultorio en la tabla consultorios
    const consultorioResult = await pool.query(
      `DELETE FROM consultorios WHERE id_consultorio = $1 RETURNING *`,
      [id_consultorio]
    );

    if (consultorioResult.rowCount === 0) {
      return res.status(404).json({ message: "Consultorio no encontrado" });
    }

    res.status(200).json({ message: "Consultorio eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el consultorio:", error.message);
    res.status(500).json({
      message: "Error al eliminar el consultorio",
      error: error.message,
    });
  }
};
