"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _turnos = _interopRequireDefault(require("../controllers/turnos"));
var router = _express["default"].Router();

// Rutas relacionadas con turnos
router.post('/turnos', _turnos["default"].crearTurno);
router.get('/turnos/:id_turno', _turnos["default"].readTurno);
router.put('/turnos/:id_turno', _turnos["default"].updateTurno);
router["delete"]('/turnos/:id_turno', _turnos["default"].deleteTurno);
router.get('/turnos', _turnos["default"].getTurnos);

// Rutas adicionales
router.get('/consultorios', _turnos["default"].getConsultorios);
router.get('/tratamientos', _turnos["default"].getTratamientos);
router.get('/pacientes', _turnos["default"].getPacientes);
router.get('/Calendarturnos', _turnos["default"].getCalendarTurnos);

// Notificaciones
// router.post('/enviar-notificaciones', administrador.enviarNotificaciones);

module.exports = router;