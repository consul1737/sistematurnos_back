import { json } from 'express';
import pool from '../database/keys';
import moment from 'moment';
// import { Client, LocalAuth } from "whatsapp-web.js";
const { formatearFecha } = require('../../utils/dateformatter');
import fs from "fs";

const fromatearFecha = (fecha) => {
  const fechaObj = new Date(fecha); // Convierte la cadena de fecha en un objeto Date
  const year = fechaObj.getFullYear(); // Obtiene el año
  const month = String(fechaObj.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (y le suma 1 porque los meses en JS comienzan desde 0)
  const day = String(fechaObj.getDate()).padStart(2, '0'); // Obtiene el día

  return `${year}-${month}-${day}`; // Devuelve la fecha en el formato YYYY-MM-DD
};



const administrador = {};

// Crear un turno
administrador.crearTurno = async (req, res) => {
  const { id_paciente, fecha, hora, id_tratamiento, id_consultorio } = req.body;
  try {
    // Intentar insertar un turno, respetando la restricción UNIQUE
    await pool.query(
      'INSERT INTO turnos (id_paciente, fecha, hora, id_tratamiento, id_consultorio) VALUES ($1, $2, $3, $4, $5)',
      [id_paciente, fecha, hora, id_tratamiento, id_consultorio]
    );

    res.status(200).json({
      message: 'El turno se creó correctamente',
    });
  } catch (error) {
    console.error('Error al crear el turno:', error);

    // Verificar si el error es por violar la restricción UNIQUE
    if (error.code === '23505') { // Código de error de PostgreSQL para UNIQUE violation
      res.status(400).json({
        message: 'Ya existe un turno en este horario y consultorio',
      });
    } else {
      res.status(500).json({
        message: 'Error interno del servidor',
        error,
      });
    }
  }
};

// Leer un turno por ID
administrador.readTurno = async (req, res) => {
  const id = req.params.id_turno;
  try {
    const resultado = await pool.query('SELECT * FROM turnos WHERE id_turno = $1', [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        message: 'Turno no encontrado',
      });
    }

    // Formatear la fecha antes de enviar al cliente
    const turno = resultado.rows[0];
    turno.fecha = dateFormatter(turno.fecha); // Formatea el campo de fecha

    res.status(200).json(turno);
  } catch (error) {
    console.error('Error al leer el turno:', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error,
    });
  }
};
// Actualizar un turno
administrador.updateTurno = async (req, res) => {
  const id = req.params.id_turno;
  const { fecha, hora, id_consultorio } = req.body;

  try {
    // Intentar actualizar un turno, respetando la restricción UNIQUE
    await pool.query(
      'UPDATE turnos SET fecha = $1, hora = $2, id_consultorio = $3 WHERE id_turno = $4',
      [fecha, hora, id_consultorio, id]
    );

    res.status(200).json({
      message: 'El turno se actualizó correctamente',
      turno: { fecha, hora, id_consultorio },
    });
  } catch (error) {
    console.error('Error al actualizar el turno:', error);

    // Verificar si el error es por violar la restricción UNIQUE
    if (error.code === '23505') {
      res.status(400).json({
        message: 'Ya existe un turno en este horario y consultorio',
      });
    } else {
      res.status(500).json({
        message: 'Error interno del servidor',
        error,
      });
    }
  }
};

// Eliminar un turno
administrador.deleteTurno = async (req, res) => {
  const id = req.params.id_turno;
  try {
    await pool.query('DELETE FROM turnos WHERE id_turno = $1', [id]);
    res.status(200).json({
      message: 'El turno se eliminó correctamente',
    });
  } catch (error) {
    console.error('Error al eliminar el turno:', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error,
    });
  }
};

// Obtener todos los turnos filtrados por id_consultorio
administrador.getTurnos = async (req, res) => {
  const { id_consultorio } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM turnos WHERE id_consultorio = $1 ORDER BY fecha, hora',
      [id_consultorio]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: 'No se encontraron turnos para este consultorio.' });
    }
  } catch (error) {
    console.error('Error al obtener los turnos:', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error,
    });
  }
};


administrador.getPacientes = async (req, res) => {
  try {
    const pacientes = await pool.query('SELECT id_paciente, nombre FROM pacientes');
    res.status(200).json(pacientes.rows);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener pacientes',
      error: error.message
    });
  }
};

administrador.getCalendarTurnos = async (req, res) => {
  const { fecha } = req.query;  // Obtener fecha desde la query parameter

  try {
    let query = `
      SELECT 
        t.id_turno,
        t.fecha::date,
        t.hora,
        c.nombre AS consultorio,
        p.nombre AS nombre_paciente,
        p.apellido AS apellido_paciente,
        p.telefono as telefono
      FROM turnos t
      INNER JOIN consultorios c ON t.id_consultorio = c.id_consultorio
      INNER JOIN pacientes p ON t.id_paciente = p.id_paciente
    `;

    if (fecha) {
      query += ` WHERE t.fecha::date = $1`;
    }

    // Obtener los turnos de la base de datos
    const turnos = await pool.query(query, fecha ? [fecha] : []);

    // Formatear las fechas antes de enviar la respuesta
    const turnosFormateados = turnos.rows.map(turno => ({
      ...turno,
      fecha: fromatearFecha(turno.fecha)  // Aplicar la función de formato
    }));

    // Enviar los turnos con las fechas formateadas
    res.status(200).json(turnosFormateados);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener turnos', error: error.message });
  }
};

module.exports = administrador;
