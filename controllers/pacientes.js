import pool from '../database/keys';

const AdminPacientes = {};

// Función para formatear fechas
const formatearFecha = (fecha) => {
  const fechaObj = new Date(fecha); // Convierte la cadena de fecha en un objeto Date
  const year = fechaObj.getFullYear(); // Obtiene el año
  const month = String(fechaObj.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (y le suma 1 porque los meses en JS comienzan desde 0)
  const day = String(fechaObj.getDate()).padStart(2, '0'); // Obtiene el día

  return `${year}-${month}-${day}`; // Devuelve la fecha en el formato YYYY-MM-DD
};

// Crear un paciente
AdminPacientes.CrearPaciente = async (req, res) => {
  const { nombre, apellido, fecha_nacimiento, genero, telefono, email, direccion } = req.body;

  try {
    // Consulta para insertar un nuevo cliente en la base de datos
    await pool.query(
      'INSERT INTO pacientes(nombre, apellido, fecha_nacimiento, genero, telefono, email, direccion) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [nombre, apellido, fecha_nacimiento, genero, telefono, email, direccion]
    );

    // Respuesta exitosa
    res.status(200).json({
      message: 'Paciente creado exitosamente',
    });
  } catch (error) {
    console.log('Error al insertar', error);
    res.status(500).json({
      message: 'An error has occurred',
      error,
    });
  }
};

// Obtener todos los pacientes
AdminPacientes.ObtenerPacientes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pacientes'); // Consulta para obtener todos los pacientes

    // Formatear las fechas de los pacientes antes de enviarlos
    const pacientesFormateados = result.rows.map(paciente => ({
      ...paciente,
      fecha_nacimiento: formatearFecha(paciente.fecha_nacimiento),
    }));

    // Enviar los datos formateados al frontend
    res.status(200).json(pacientesFormateados);
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).json({ message: 'An error has occurred', error });
  }
};

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
