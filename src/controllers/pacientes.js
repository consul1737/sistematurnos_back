import pool from '../database/keys';
import { formatearFechaDB } from '../utils/dateformatter';

const AdminPacientes = {};


// Obtener todos los pacientes GET
AdminPacientes.ObtenerPacientes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pacientes'); // Consulta para obtener todos los pacientes

    // Formatear las fechas de los pacientes antes de enviarlos
    const pacientesFormateados = result.rows.map(paciente => ({
      ...paciente,
      fecha_nacimiento: formatearFechaDB(paciente.fecha_nacimiento),
    }));

    // Enviar los datos formateados al frontend
    res.status(200).json(pacientesFormateados);
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).json({ message: 'An error has occurred', error });
  }
};

AdminPacientes.ObtenerPacientePorId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM pacientes WHERE id_paciente = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Paciente no encontrado',
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener paciente:', error);
    res.status(500).json({
      message: 'Error al obtener paciente',
      error,
    });
  }
};

// Crear un paciente POST
AdminPacientes.CrearPaciente = async (req, res) => {
  const { nombre, apellido, fecha_nacimiento, genero, telefono, email, direccion } = req.body;

  try {
    // Consulta para insertar un nuevo cliente en la base de datos
    const result = await pool.query(
      'INSERT INTO pacientes(nombre, apellido, fecha_nacimiento, genero, telefono, email, direccion) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_paciente',
      [nombre, apellido, fecha_nacimiento, genero, telefono, email, direccion]
    );

    // Si no se ha insertado ningún paciente, lanzar un error
    if (result.rowCount === 0) {
      throw new Error('No se pudo crear el paciente.');
    }

    const idPaciente = result.rows[0].id_paciente;
    // Respuesta exitosa
    res.status(200).json({
      message: 'Paciente creado exitosamente',
      id_paciente: idPaciente,
    });
  } catch (error) {
    console.log('Error al insertar', error);
    res.status(500).json({
      message: 'An error has occurred',
      error,
    });
  }
};

// Editar un paciente PUT
AdminPacientes.EditarPacientes = async (req, res) => {
  const { id_paciente, nombre, apellido, fecha_nacimiento, genero, telefono, email, direccion } = req.body;
  try {
    await pool.query(
      'UPDATE pacientes SET nombre = $1, apellido = $2, fecha_nacimiento = $3, genero = $4, telefono = $5, email = $6, direccion = $7 WHERE id_paciente = $8',
      [nombre, apellido, fecha_nacimiento, genero, telefono, email, direccion, id_paciente]
    );
    res.status(200).json({
      message: 'Paciente actualizado exitosamente',
    });
  } catch (error) {
    console.log('Error al actualizar', error);
    res.status(500).json({
      message: 'An error has occurred',
      error,
    });
  }
}
// Eliminar un paciente DELETE
AdminPacientes.DeletePacientes = async (req, res) => {
  const id = req.params.id_paciente;
  try {
    await pool.query('DELETE FROM pacientes WHERE id_paciente = $1', [id]);
    res.status(200).json({
      message: 'El paciente se eliminó correctamente',
    });
  } catch (error) {
    console.error('Error al eliminar el turno:', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error,
    });
  }
};

module.exports = AdminPacientes;
