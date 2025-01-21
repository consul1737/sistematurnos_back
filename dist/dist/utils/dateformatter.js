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
var formatearFechaDB = function formatearFechaDB(fecha) {
  var fechaObj = new Date(fecha); // Convierte la cadena de fecha en un objeto Date
  var year = fechaObj.getFullYear(); // Obtiene el año
  var month = String(fechaObj.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (y le suma 1 porque los meses en JS comienzan desde 0)
  var day = String(fechaObj.getDate()).padStart(2, '0'); // Obtiene el día

  return "".concat(year, "-").concat(month, "-").concat(day); // Devuelve la fecha en el formato YYYY-MM-DD
};
module.exports = {
  formatearFecha: formatearFecha,
  formatearFechaDB: formatearFechaDB
};