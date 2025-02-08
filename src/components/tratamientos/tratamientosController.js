import pool from '@database/keys';

export const getTratamientos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tratamientos');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tratamientos', error: error.message });
    }
};

export const getTratamientoById = async (req, res) => {
    const id = req.params.id_tratamiento;
    try {
        const result = await pool.query('SELECT * FROM tratamientos WHERE id_tratamiento = $1', [id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tratamiento', error: error.message });
    }
};

export const createTratamiento = async (req, res) => {
    const { nombre, descripcion, duracion, costo, color } = req.body;


    // Validar que todos los campos estén presentes
    if (!nombre || !descripcion || !duracion || !costo) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        const result = await pool.query(
            'INSERT INTO tratamientos (nombre, descripcion, duracion, costo, color) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, descripcion, duracion, costo, color]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al crear tratamiento:", error.message);
        res.status(500).json({ message: 'Error al crear tratamiento', error: error.message });
    }
};

export const updateTratamiento = async (req, res) => {
    const id = req.params.id_tratamiento;
    const { nombre, descripcion, duracion, costo, color } = req.body;

    console.log("Datos recibidos:", id, nombre, descripcion, duracion, costo);

    try {
        const result = await pool.query('UPDATE tratamientos SET nombre = $1, descripcion = $2 , duracion = $3, costo = $4, color = $5 WHERE id_tratamiento = $6 RETURNING *', [nombre, descripcion, duracion, costo, color, id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar tratamiento', error: error.message });
    }
};

export const deleteTratamiento = async (req, res) => {
    const id = req.params.id_tratamiento;

    try {

        const asociaciones = await pool.query('SELECT *   FROM consultorio_tratamiento WHERE id_tratamiento = $1', [id]);

        if (asociaciones.rows.length > 0) {
            return res.status(400).json({
                message: 'No se puede eliminar un tratamiento asociado a un consultorio',
                details: asociaciones.rows, // Opcional: proporciona detalles de las asociaciones
            });
        }
        const result = await pool.query('DELETE FROM tratamientos WHERE id_tratamiento = $1 RETURNING *', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar tratamiento', error: error.message });
    }
};
