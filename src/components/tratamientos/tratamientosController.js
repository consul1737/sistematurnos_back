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
    const { nombre, descripcion, duracion, costo } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !descripcion || !duracion || !costo) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        const result = await pool.query(
            'INSERT INTO tratamientos (nombre, descripcion, duracion, costo) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, descripcion, duracion, costo]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al crear tratamiento:", error.message);
        res.status(500).json({ message: 'Error al crear tratamiento', error: error.message });
    }
};

export const updateTratamiento = async (req, res) => {
    const id = req.params.id_tratamiento;
    const { nombre, descripcion } = req.body;
    try {
        const result = await pool.query('UPDATE tratamientos SET nombre = $1, descripcion = $2 WHERE id_tratamiento = $3 RETURNING *', [nombre, descripcion, id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar tratamiento', error: error.message });
    }
};

export const deleteTratamiento = async (req, res) => {
    const id = req.params.id_tratamiento;
    try {
        const result = await pool.query('DELETE FROM tratamientos WHERE id_tratamiento = $1 RETURNING *', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar tratamiento', error: error.message });
    }
};
