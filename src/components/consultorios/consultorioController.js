import pool from "../database/keys";

export const getConsultorios = async (req, res) => {
    try {
        const result = await pool.query("SELECT id_consultorio, nombre FROM consultorios");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener consultorios", error: error.message });
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
        // Consulta SQL para obtener consultorios y sus tratamientos
        const result = await pool.query(`
            SELECT 
                c.id_consultorio,
                c.nombre AS nombre_consultorio,
                c.color AS color_consultorio,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id_tratamiento', t.id_tratamiento,
                        'nombre', t.nombre,
                        'descripcion', t.descripcion
                    )
                ) FILTER (WHERE t.id_tratamiento IS NOT NULL) AS tratamientos
            FROM 
                consultorios c
            LEFT JOIN 
                consultorio_tratamiento ct ON c.id_consultorio = ct.id_consultorio
            LEFT JOIN 
                tratamientos t ON ct.id_tratamiento = t.id_tratamiento
            GROUP BY 
                c.id_consultorio, c.nombre;
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
        const result = await pool.query("SELECT * FROM consultorios WHERE id_consultorio = $1", [id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener consultorio", error: error.message });
    }
};
export const createConsultorio = async (req, res) => {
    const { nombre, color, tratamiento } = req.body;

    console.log('Datos recibidos:', nombre, color, tratamiento);  // <-- Agrega esto

    try {
        const result = await pool.query(
            `INSERT INTO consultorios (nombre, color) VALUES ($1, $2) RETURNING id_consultorio`,
            [nombre, color]
        );

        const consultorioId = result.rows[0].id_consultorio;

        // Asegúrate que 'tratamiento' no sea undefined o null antes de insertar
        if (!tratamiento) {
            throw new Error('Tratamiento no proporcionado');
        }

        await pool.query(
            `INSERT INTO consultorio_tratamiento (id_consultorio, id_tratamiento) VALUES ($1, $2)`,
            [consultorioId, tratamiento]
        );

        res.status(201).json({ message: 'Consultorio creado con éxito' });
    } catch (error) {
        console.error('Error en el servidor:', error.message);  // <-- Muestra el error en la consola
        res.status(500).json({
            message: "Error al crear el consultorio",
            error: error.message,
        });
    }
};


export const updateConsultorio = async (req, res) => {
    const id = req.params.id_consultorio;
    const { nombre } = req.body;
    try {
        const result = await pool.query("UPDATE consultorios SET nombre = $1 WHERE id_consultorio = $2 RETURNING *", [nombre, id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar consultorio", error: error.message });
    }
};

export const deleteConsultorio = async (req, res) => {
    const id = req.params.id_consultorio;
    try {
        const result = await pool.query("DELETE FROM consultorios WHERE id_consultorio = $1 RETURNING *", [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar consultorio", error: error.message });
    }
};

