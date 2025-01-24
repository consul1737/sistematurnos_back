const { format } = require('date-fns');

/**
 * Formatea una fecha al formato deseado
 * @param {Date|string} fecha - Fecha a formatear
 * @param {string} formato - Formato deseado (default: 'dd/MM/yyyy HH:mm')
 * @returns {string} Fecha formateada
 */
function formatearFecha(fecha, formato = 'dd/MM/yyyy') {
  return format(new Date(fecha), formato);
}
const formatearFechaDB = (fecha) => {
  const fechaObj = new Date(fecha); // Convierte la cadena de fecha en un objeto Date
  const year = fechaObj.getFullYear(); // Obtiene el año
  const month = String(fechaObj.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (y le suma 1 porque los meses en JS comienzan desde 0)
  const day = String(fechaObj.getDate()).padStart(2, '0'); // Obtiene el día

  return `${year}-${month}-${day}`; // Devuelve la fecha en el formato YYYY-MM-DD
};

module.exports = { formatearFecha, formatearFechaDB };
