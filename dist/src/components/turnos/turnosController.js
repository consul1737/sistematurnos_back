"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _keys = _interopRequireDefault(require("../database/keys"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// import { Client, LocalAuth } from "whatsapp-web.js";
var _require = require("../../utils/dateformatter"),
  formatearFecha = _require.formatearFecha;
var fromatearFecha = function fromatearFecha(fecha) {
  var fechaObj = new Date(fecha); // Convierte la cadena de fecha en un objeto Date
  var year = fechaObj.getFullYear(); // Obtiene el año
  var month = String(fechaObj.getMonth() + 1).padStart(2, "0"); // Obtiene el mes (y le suma 1 porque los meses en JS comienzan desde 0)
  var day = String(fechaObj.getDate()).padStart(2, "0"); // Obtiene el día

  return "".concat(year, "-").concat(month, "-").concat(day); // Devuelve la fecha en el formato YYYY-MM-DD
};
var administrador = {};

// Crear un turno
administrador.crearTurno = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, id_paciente, fecha, hora, estado, id_consultorio, id_tratamiento, id_consultorio_tratamiento;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, id_paciente = _req$body.id_paciente, fecha = _req$body.fecha, hora = _req$body.hora, estado = _req$body.estado, id_consultorio = _req$body.id_consultorio, id_tratamiento = _req$body.id_tratamiento; // console.log("Turno recibido:", req.body);
          _context.prev = 1;
          _context.next = 4;
          return _keys["default"].query("SELECT id_consultorio_tratamiento FROM consultorio_tratamiento WHERE id_consultorio = $1 AND id_tratamiento = $2", [id_consultorio, id_tratamiento]);
        case 4:
          id_consultorio_tratamiento = _context.sent;
          _context.next = 7;
          return _keys["default"].query("INSERT INTO turnos (id_paciente, fecha, hora, estado, id_consultorio_tratamiento) VALUES ($1, $2, $3, $4, $5)", [id_paciente, fecha, hora, estado, id_consultorio_tratamiento.rows[0].id_consultorio_tratamiento]);
        case 7:
          res.status(200).json({
            message: "El turno se creó correctamente"
          });
          _context.next = 14;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.error("Error al crear el turno:", _context.t0);

          // Verificar si el error es por violar la restricción UNIQUE
          if (_context.t0.code === "23505") {
            // Código de error de PostgreSQL para UNIQUE violation
            res.status(400).json({
              message: "Ya existe un turno en este horario y consultorio"
            });
          } else {
            res.status(500).json({
              message: "Error interno del servidor",
              error: _context.t0
            });
          }
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 10]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Leer un turno por ID
administrador.readTurno = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, resultado, turno;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id_turno;
          _context2.prev = 1;
          _context2.next = 4;
          return _keys["default"].query("SELECT * FROM turnos WHERE id_turno = $1", [id]);
        case 4:
          resultado = _context2.sent;
          if (!(resultado.rows.length === 0)) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: "Turno no encontrado"
          }));
        case 7:
          // Formatear la fecha antes de enviar al cliente
          turno = resultado.rows[0];
          turno.fecha = dateFormatter(turno.fecha); // Formatea el campo de fecha

          res.status(200).json(turno);
          _context2.next = 16;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](1);
          console.error("Error al leer el turno:", _context2.t0);
          res.status(500).json({
            message: "Error interno del servidor",
            error: _context2.t0
          });
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 12]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
// Actualizar un turno
administrador.updateTurno = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, _req$body2, id_paciente, fecha, hora, estado, id_consultorio, id_tratamiento, id_consultorio_tratamiento;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id_turno;
          _req$body2 = req.body, id_paciente = _req$body2.id_paciente, fecha = _req$body2.fecha, hora = _req$body2.hora, estado = _req$body2.estado, id_consultorio = _req$body2.id_consultorio, id_tratamiento = _req$body2.id_tratamiento;
          _context3.prev = 2;
          _context3.next = 5;
          return _keys["default"].query("SELECT id_consultorio_tratamiento FROM consultorio_tratamiento WHERE id_consultorio = $1 AND id_tratamiento = $2", [id_consultorio, id_tratamiento]);
        case 5:
          id_consultorio_tratamiento = _context3.sent;
          _context3.next = 8;
          return _keys["default"].query("UPDATE turnos SET id_paciente = $1, fecha = $2, hora = $3, estado = $4, id_consultorio_tratamiento = $5 WHERE id_turno = $6", [id_paciente, fecha, hora, estado, id_consultorio_tratamiento.rows[0].id_consultorio_tratamiento, id]);
        case 8:
          res.status(200).json({
            message: "El turno se actualizó correctamente",
            turno: {
              fecha: fecha,
              hora: hora,
              id_consultorio: id_consultorio
            }
          });
          _context3.next = 15;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](2);
          console.error("Error al actualizar el turno:", _context3.t0);

          // Verificar si el error es por violar la restricción UNIQUE
          if (_context3.t0.code === "23505") {
            res.status(400).json({
              message: "Ya existe un turno en este horario y consultorio"
            });
          } else {
            res.status(500).json({
              message: "Error interno del servidor",
              error: _context3.t0
            });
          }
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 11]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Eliminar un turno
administrador.deleteTurno = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id_turno;
          _context4.prev = 1;
          _context4.next = 4;
          return _keys["default"].query("DELETE FROM turnos WHERE id_turno = $1", [id]);
        case 4:
          res.status(200).json({
            message: "El turno se eliminó correctamente"
          });
          _context4.next = 11;
          break;
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](1);
          console.error("Error al eliminar el turno:", _context4.t0);
          res.status(500).json({
            message: "Error interno del servidor",
            error: _context4.t0
          });
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 7]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Obtener todos los turnos filtrados por id_consultorio
administrador.getTurnosById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id_consultorio, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id_consultorio = req.body.id_consultorio;
          _context5.prev = 1;
          _context5.next = 4;
          return _keys["default"].query("SELECT * FROM turnos WHERE id_consultorio = $1 ORDER BY fecha, hora", [id_consultorio]);
        case 4:
          result = _context5.sent;
          if (result.rows.length > 0) {
            res.status(200).json(result.rows);
          } else {
            res.status(404).json({
              message: "No se encontraron turnos para este consultorio."
            });
          }
          _context5.next = 12;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          console.error("Error al obtener los turnos:", _context5.t0);
          res.status(500).json({
            message: "Error interno del servidor",
            error: _context5.t0
          });
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// Obtener todos los turnos
administrador.getTurnos = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _keys["default"].query("SELECT * FROM turnos ORDER BY fecha, hora");
        case 3:
          result = _context6.sent;
          res.status(200).json(result.rows);
          _context6.next = 11;
          break;
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.error("Error al obtener los turnos:", _context6.t0);
          res.status(500).json({
            message: "Error interno del servidor",
            error: _context6.t0
          });
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
administrador.getPacientes = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var pacientes;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _keys["default"].query("SELECT id_paciente, nombre FROM pacientes");
        case 3:
          pacientes = _context7.sent;
          res.status(200).json(pacientes.rows);
          _context7.next = 10;
          break;
        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            message: "Error al obtener pacientes",
            error: _context7.t0.message
          });
        case 10:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
administrador.getCalendarTurnos = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var fecha, query, turnos, turnosFormateados;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          fecha = req.query.fecha; // Obtener fecha desde la query parameter
          _context8.prev = 1;
          query = "\n  SELECT \n  t.id_turno,\n  t.fecha::date,\n  t.hora,\n  t.estado,\n  p.id_paciente,\n  p.nombre AS nombre_paciente,\n  p.apellido AS apellido_paciente,\n  p.telefono AS telefono,\n  p.email AS email,\n  p.genero AS genero,\n  c.nombre AS nombre_consultorio,\n  c.id_consultorio,\n  tr.id_tratamiento,\n  tr.color AS color_tratamiento,\n  tr.nombre AS nombre_tratamiento,\n  tr.descripcion AS descripcion_tratamiento,\n  tr.duracion AS duracion_tratamiento,\n  tr.costo AS costo_tratamiento,\n  ct.id_consultorio_tratamiento\n\nFROM turnos t\nINNER JOIN pacientes p ON t.id_paciente = p.id_paciente\nLEFT JOIN consultorio_tratamiento ct ON t.id_consultorio_tratamiento = ct.id_consultorio_tratamiento\nLEFT JOIN consultorios c ON ct.id_consultorio = c.id_consultorio\nLEFT JOIN tratamientos tr ON ct.id_tratamiento = tr.id_tratamiento\n";
          if (fecha) {
            query += " WHERE t.fecha::date = $1";
          }
          // Obtener los turnos de la base de datos
          _context8.next = 6;
          return _keys["default"].query(query, fecha ? [fecha] : []);
        case 6:
          turnos = _context8.sent;
          // Formatear las fechas antes de enviar la respuesta
          turnosFormateados = turnos.rows.map(function (turno) {
            return _objectSpread(_objectSpread({}, turno), {}, {
              fecha: fromatearFecha(turno.fecha) // Aplicar la función de formato
            });
          }); // Enviar los turnos con las fechas formateadas
          res.status(200).json(turnosFormateados);
          _context8.next = 14;
          break;
        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](1);
          res.status(500).json({
            message: "Error al obtener turnos",
            error: _context8.t0.message
          });
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1, 11]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
module.exports = administrador;