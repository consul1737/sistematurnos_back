"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _pacientes = _interopRequireDefault(require("../controllers/pacientes"));
var router = _express["default"].Router();

// Ruta para crear un nuevo paciente
router.post('/Adminpacientes', _pacientes["default"].CrearPaciente);

// Ruta para obtener la lista de pacientes
router.get('/Adminpacientes', _pacientes["default"].ObtenerPacientes);
// Ruta para eliminar un paciente 
router["delete"]('/AdminPacientes/:id_paciente', _pacientes["default"].DeletePacientes);
module.exports = router;