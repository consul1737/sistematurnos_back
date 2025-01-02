const { format } = require('date-fns');

/**
 * Formatea una fecha al formato deseado
 * @param {Date|string} fecha - Fecha a formatear
 * @param {string} formato - Formato deseado (default: 'dd/MM/yyyy HH:mm')
 * @returns {string} Fecha formateada
 */
function formatearFecha(fecha, formato = 'dd/MM/yyyy HH:mm') {
  return format(new Date(fecha), formato);
}

module.exports = { formatearFecha };
