"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = require("express");
var _turnosController = _interopRequireDefault(require("./turnosController"));
var router = (0, _express.Router)();

// Rutas relacionadas con turnos
router.get("/", _turnosController["default"].getTurnos);
router.post("/", _turnosController["default"].crearTurno);
router.get("/calendario", _turnosController["default"].getCalendarTurnos);
router.route("/:id_turno").get(_turnosController["default"].readTurno).put(_turnosController["default"].updateTurno)["delete"](_turnosController["default"].deleteTurno);

// Rutas adicionales
// router.get('/consultorios', administrador.getConsultorios);
// router.get('/tratamientos', administrador.getTratamientos);
//router.get('/pacientes', administrador.getPacientes);

// Notificaciones
// router.post('/enviar-notificaciones', administrador.enviarNotificaciones);

module.exports = router;