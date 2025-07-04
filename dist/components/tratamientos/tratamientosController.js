"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTratamiento = exports.getTratamientosPorConsultorio = exports.getTratamientos = exports.getTratamientoById = exports.deleteTratamiento = exports.createTratamiento = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _keys = _interopRequireDefault(require("../database/keys"));
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var getTratamientos = exports.getTratamientos = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _keys["default"].query("SELECT * FROM tratamientos");
        case 3:
          result = _context.sent;
          res.status(200).json(result.rows);
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: "Error al obtener tratamientos",
            error: _context.t0.message
          });
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function getTratamientos(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getTratamientoById = exports.getTratamientoById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id_tratamiento;
          _context2.prev = 1;
          _context2.next = 4;
          return _keys["default"].query("SELECT * FROM tratamientos WHERE id_tratamiento = $1", [id]);
        case 4:
          result = _context2.sent;
          res.status(200).json(result.rows);
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            message: "Error al obtener tratamiento",
            error: _context2.t0.message
          });
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return function getTratamientoById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Obtener tratamientos por ID de consultorio
var getTratamientosPorConsultorio = exports.getTratamientosPorConsultorio = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id_consultorio, query, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id_consultorio = req.params.id_consultorio;
          _context3.prev = 1;
          query = "\n      SELECT \n        t.id_tratamiento,\n        t.nombre AS nombre_tratamiento,\n        t.color,\n        t.duracion,\n        t.costo\n      FROM consultorio_tratamiento ct\n      INNER JOIN tratamientos t ON ct.id_tratamiento = t.id_tratamiento\n      WHERE ct.id_consultorio = $1\n    ";
          _context3.next = 5;
          return _keys["default"].query(query, [id_consultorio]);
        case 5:
          result = _context3.sent;
          res.status(200).json(result.rows);
          _context3.next = 13;
          break;
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](1);
          console.error("Error al obtener tratamientos por consultorio:", _context3.t0.message);
          res.status(500).json({
            message: "Error al obtener tratamientos",
            error: _context3.t0.message
          });
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 9]]);
  }));
  return function getTratamientosPorConsultorio(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var createTratamiento = exports.createTratamiento = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body, nombre, descripcion, duracion, costo, color, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, nombre = _req$body.nombre, descripcion = _req$body.descripcion, duracion = _req$body.duracion, costo = _req$body.costo, color = _req$body.color; // Validar que todos los campos estén presentes
          if (!(!nombre || !descripcion || !duracion || !costo)) {
            _context4.next = 3;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: "Todos los campos son obligatorios"
          }));
        case 3:
          _context4.prev = 3;
          _context4.next = 6;
          return _keys["default"].query("INSERT INTO tratamientos (nombre, descripcion, duracion, costo, color) VALUES ($1, $2, $3, $4, $5) RETURNING *", [nombre, descripcion, duracion, costo, color]);
        case 6:
          result = _context4.sent;
          res.status(201).json(result.rows[0]);
          _context4.next = 14;
          break;
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](3);
          console.error("Error al crear tratamiento:", _context4.t0.message);
          res.status(500).json({
            message: "Error al crear tratamiento",
            error: _context4.t0.message
          });
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 10]]);
  }));
  return function createTratamiento(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var updateTratamiento = exports.updateTratamiento = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, _req$body2, nombre, descripcion, duracion, costo, color, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id_tratamiento;
          _req$body2 = req.body, nombre = _req$body2.nombre, descripcion = _req$body2.descripcion, duracion = _req$body2.duracion, costo = _req$body2.costo, color = _req$body2.color;
          console.log("Datos recibidos:", id, nombre, descripcion, duracion, costo);
          _context5.prev = 3;
          _context5.next = 6;
          return _keys["default"].query("UPDATE tratamientos SET nombre = $1, descripcion = $2 , duracion = $3, costo = $4, color = $5 WHERE id_tratamiento = $6 RETURNING *", [nombre, descripcion, duracion, costo, color, id]);
        case 6:
          result = _context5.sent;
          res.status(200).json(result.rows[0]);
          _context5.next = 13;
          break;
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](3);
          res.status(500).json({
            message: "Error al actualizar tratamiento",
            error: _context5.t0.message
          });
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 10]]);
  }));
  return function updateTratamiento(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();
var deleteTratamiento = exports.deleteTratamiento = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, _yield$pool$query, consultorioTratamientos, _iterator, _step, row, _yield$pool$query2, turnosAsociados, tieneTurnosPendientes, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id_tratamiento;
          _context6.prev = 1;
          _context6.next = 4;
          return _keys["default"].query("SELECT id_consultorio_tratamiento FROM consultorio_tratamiento WHERE id_tratamiento = $1", [id]);
        case 4:
          _yield$pool$query = _context6.sent;
          consultorioTratamientos = _yield$pool$query.rows;
          // Paso 2: Verificar si alguno de estos tiene turnos asociados
          _iterator = _createForOfIteratorHelper(consultorioTratamientos);
          _context6.prev = 7;
          _iterator.s();
        case 9:
          if ((_step = _iterator.n()).done) {
            _context6.next = 21;
            break;
          }
          row = _step.value;
          _context6.next = 13;
          return _keys["default"].query("SELECT * FROM turnos WHERE id_consultorio_tratamiento = $1", [row.id_consultorio_tratamiento]);
        case 13:
          _yield$pool$query2 = _context6.sent;
          turnosAsociados = _yield$pool$query2.rows;
          if (!(turnosAsociados.length > 0)) {
            _context6.next = 19;
            break;
          }
          tieneTurnosPendientes = turnosAsociados.some(function (turno) {
            return turno.estado === "pendiente";
          });
          if (!tieneTurnosPendientes) {
            _context6.next = 19;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: "No se puede eliminar un tratamiento con turnos pendientes",
            details: turnosAsociados // Opcional: proporciona detalles de los turnos asociados
          }));
        case 19:
          _context6.next = 9;
          break;
        case 21:
          _context6.next = 26;
          break;
        case 23:
          _context6.prev = 23;
          _context6.t0 = _context6["catch"](7);
          _iterator.e(_context6.t0);
        case 26:
          _context6.prev = 26;
          _iterator.f();
          return _context6.finish(26);
        case 29:
          _context6.next = 31;
          return _keys["default"].query("DELETE FROM tratamientos WHERE id_tratamiento = $1 RETURNING *", [id]);
        case 31:
          result = _context6.sent;
          if (!(result.rowCount === 0)) {
            _context6.next = 34;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: "Tratamiento no encontrado"
          }));
        case 34:
          res.status(200).json(result.rows[0]);
          _context6.next = 41;
          break;
        case 37:
          _context6.prev = 37;
          _context6.t1 = _context6["catch"](1);
          console.error("Error al eliminar tratamiento:", _context6.t1.message);
          res.status(500).json({
            message: "Error al eliminar tratamiento",
            error: _context6.t1.message
          });
        case 41:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 37], [7, 23, 26, 29]]);
  }));
  return function deleteTratamiento(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();