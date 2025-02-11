"use strict";

var _require = require('date-fns'),
  format = _require.format;

/**
 * Formatea una fecha al formato deseado
 * @param {Date|string} fecha - Fecha a formatear
 * @param {string} formato - Formato deseado (default: 'dd/MM/yyyy HH:mm')
 * @returns {string} Fecha formateada
 */
function formatearFecha(fecha) {
  var formato = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dd/MM/yyyy';
  return format(new Date(fecha), formato);
}
module.exports = {
  formatearFecha: formatearFecha
};