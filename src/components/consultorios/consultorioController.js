import pool from "../database/keys";

export const getConsultorios = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id_consultorio, nombre FROM consultorios"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener consultorios", error: error.message });
  }
};

export const getTratamientos = async (req, res) => {
  const id = req.params.id_consultorio; // Obtener el ID del consultorio desde los parámetros de la solicitud

  try {
    // Consulta SQL corregida con espacios y uso correcto de placeholders
    const result = await pool.query(
      "SELECT t.nombre AS tratamiento, t.descripcion FROM consultorio_tratamiento ct JOIN tratamientos t ON ct.id_tratamiento = t.id_tratamiento WHERE ct.id_consultorio = $1",
      [id] // Pasar el valor de 'id' como un array
    );

    // Devolver los resultados como JSON
    res.status(200).json(result.rows);
  } catch (error) {
    // Manejar errores y devolver un mensaje claro
    res.status(500).json({
      message: "Error al obtener tratamientos",
      error: error.message,
    });
  }
};

export const getConsultoriosConTratamientos = async (req, res) => {
  try {
    // Consulta SQL para obtener consultorios y su tratamiento asociado
    const result = await pool.query(`
            SELECT 
                c.id_consultorio,
                c.nombre AS nombre_consultorio,
                c.color AS color_consultorio,
                t.id_tratamiento,
                t.nombre AS nombre_tratamiento,
                t.descripcion AS descripcion_tratamiento
            FROM 
                consultorios c
            LEFT JOIN 
                consultorio_tratamiento ct ON c.id_consultorio = ct.id_consultorio
            LEFT JOIN 
                tratamientos t ON ct.id_tratamiento = t.id_tratamiento;
        `);

    // Devolver los resultados como JSON
    res.status(200).json(result.rows);
  } catch (error) {
    // Manejar errores y devolver un mensaje claro
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
  const { nombre, color, tratamiento } = req.body;

  console.log("Datos recibidos:", nombre, color, tratamiento); // <-- Agrega esto

  try {
    const result = await pool.query(
      `INSERT INTO consultorios (nombre, color) VALUES ($1, $2) RETURNING id_consultorio`,
      [nombre, color]
    );

    const consultorioId = result.rows[0].id_consultorio;

    // Asegúrate que 'tratamiento' no sea undefined o null antes de insertar
    if (!tratamiento) {
      throw new Error("Tratamiento no proporcionado");
    }

    await pool.query(
      `INSERT INTO consultorio_tratamiento (id_consultorio, id_tratamiento) VALUES ($1, $2)`,
      [consultorioId, tratamiento]
    );

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
  const { id_consultorio } = req.params; // ID del consultorio a actualizar
  const { nombre, color, tratamiento } = req.body;

  console.log("Datos recibidos:", id_consultorio, nombre, color, tratamiento);

  try {
    // Actualiza los datos básicos del consultorio
    const result = await pool.query(
      `UPDATE consultorios SET nombre = $1, color = $2 WHERE id_consultorio = $3 RETURNING *`,
      [nombre, color, id_consultorio]
    );
    console.log(result.rows);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Consultorio no encontrado" });
    }

    console.log("Tratamiento:", tratamiento);

    // Si se proporciona un tratamiento, actualiza la relación
    if (tratamiento !== undefined) {
      // Elimina las relaciones existentes para este consultorio
      await pool.query(
        `DELETE FROM consultorio_tratamiento WHERE id_consultorio = $1`,
        [id_consultorio]
      );

      // Inserta la nueva relación si el tratamiento no es null
      if (tratamiento) {
        await pool.query(
          `INSERT INTO consultorio_tratamiento (id_consultorio, id_tratamiento) VALUES ($1, $2)`,
          [id_consultorio, tratamiento]
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

  const result = await pool.query(
    `SELECT estado FROM turnos WHERE id_consultorio = $1`,
    [id_consultorio]
  );

  // Verificar si el consultorio tiene turnos
  if (result.estado === "pendiente") {
    return res
      .status(400)
      .json({ message: "El consultorio no puede ser eliminado ya que tiene turnos asignados" });
  }

  try {
    // Primero, elimina las relaciones en la tabla consultorio_tratamiento
    await pool.query(
      `DELETE FROM consultorio_tratamiento WHERE id_consultorio = $1`,
      [id_consultorio]
    );

    // Luego, elimina el consultorio en la tabla consultorios
    const result = await pool.query(
      `DELETE FROM consultorios WHERE id_consultorio = $1 RETURNING *`,
      [id_consultorio]
    );

    if (result.rowCount === 0) {
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
