import pool from "@database/keys";

export const getTratamientos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tratamientos");
    res.status(200).json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener tratamientos", error: error.message });
  }
};

export const getTratamientoById = async (req, res) => {
  const id = req.params.id_tratamiento;
  try {
    const result = await pool.query(
      "SELECT * FROM tratamientos WHERE id_tratamiento = $1",
      [id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener tratamiento", error: error.message });
  }
};

// Obtener tratamientos por ID de consultorio
export const getTratamientosPorConsultorio = async (req, res) => {
  const { id_consultorio } = req.params;

  try {
    const query = `
      SELECT 
        t.id_tratamiento,
        t.nombre AS nombre_tratamiento,
        t.color,
        t.duracion,
        t.costo
      FROM consultorio_tratamiento ct
      INNER JOIN tratamientos t ON ct.id_tratamiento = t.id_tratamiento
      WHERE ct.id_consultorio = $1
    `;

    const result = await pool.query(query, [id_consultorio]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(
      "Error al obtener tratamientos por consultorio:",
      error.message
    );
    res
      .status(500)
      .json({ message: "Error al obtener tratamientos", error: error.message });
  }
};

export const createTratamiento = async (req, res) => {
  const { nombre, descripcion, duracion, costo, color } = req.body;

  // Validar que todos los campos estén presentes
  if (!nombre || !descripcion || !duracion || !costo) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO tratamientos (nombre, descripcion, duracion, costo, color) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombre, descripcion, duracion, costo, color]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear tratamiento:", error.message);
    res
      .status(500)
      .json({ message: "Error al crear tratamiento", error: error.message });
  }
};

export const updateTratamiento = async (req, res) => {
  const id = req.params.id_tratamiento;
  const { nombre, descripcion, duracion, costo, color } = req.body;

  console.log("Datos recibidos:", id, nombre, descripcion, duracion, costo);

  try {
    const result = await pool.query(
      "UPDATE tratamientos SET nombre = $1, descripcion = $2 , duracion = $3, costo = $4, color = $5 WHERE id_tratamiento = $6 RETURNING *",
      [nombre, descripcion, duracion, costo, color, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar tratamiento",
      error: error.message,
    });
  }
};

export const deleteTratamiento = async (req, res) => {
  const id = req.params.id_tratamiento;

  try {
    // Paso 1: Obtener todos los id_consultorio_tratamiento asociados al tratamiento
    const { rows: consultorioTratamientos } = await pool.query(
      "SELECT id_consultorio_tratamiento FROM consultorio_tratamiento WHERE id_tratamiento = $1",
      [id]
    );

    // Paso 2: Verificar si alguno de estos tiene turnos asociados
    for (const row of consultorioTratamientos) {
      const { rows: turnosAsociados } = await pool.query(
        "SELECT * FROM turnos WHERE id_consultorio_tratamiento = $1",
        [row.id_consultorio_tratamiento]
      );

      // Si hay turnos asociados, verificar si alguno está en estado "pendiente"
      if (turnosAsociados.length > 0) {
        const tieneTurnosPendientes = turnosAsociados.some(
          (turno) => turno.estado === "pendiente"
        );

        if (tieneTurnosPendientes) {
          return res.status(400).json({
            message:
              "No se puede eliminar un tratamiento con turnos pendientes",
            details: turnosAsociados, // Opcional: proporciona detalles de los turnos asociados
          });
        }
      }
    }

    // Paso 3: Eliminar el tratamiento si no hay turnos pendientes asociados
    const result = await pool.query(
      "DELETE FROM tratamientos WHERE id_tratamiento = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Tratamiento no encontrado" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error al eliminar tratamiento:", error.message);
    res.status(500).json({
      message: "Error al eliminar tratamiento",
      error: error.message,
    });
  }
};
