"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = require("express");
var _pacientesController = _interopRequireDefault(require("./pacientesController"));
var router = (0, _express.Router)();

// Ruta para crear un nuevo paciente
router.post('/', _pacientesController["default"].CrearPaciente);

// Ruta para obtener la lista de pacientes
router.get('/', _pacientesController["default"].ObtenerPacientes);
// Ruta para eliminar un paciente 
router.route('/:id_paciente')["delete"](_pacientesController["default"].DeletePacientes);
module.exports = router;