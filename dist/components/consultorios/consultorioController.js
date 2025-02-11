"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateConsultorio = exports.getConsultoriosConTratamientos = exports.getConsultorios = exports.getConsultorioTratamiento = exports.getConsultorioById = exports.deleteConsultorioTratamiento = exports.deleteConsultorio = exports.createConsultorio = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _keys = _interopRequireDefault(require("../database/keys"));
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var getConsultorios = exports.getConsultorios = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _keys["default"].query("SELECT * FROM consultorios");
        case 3:
          result = _context.sent;
          res.status(200).json(result.rows);
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: "Error al obtener consultorios",
            error: _context.t0.message
          });
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function getConsultorios(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getConsultorioTratamiento = exports.getConsultorioTratamiento = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _keys["default"].query("SELECT * FROM consultorio_tratamiento");
        case 3:
          result = _context2.sent;
          res.status(200).json(result.rows);
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: "Error al obtener consultorios",
            error: _context2.t0.message
          });
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function getConsultorioTratamiento(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var deleteConsultorioTratamiento = exports.deleteConsultorioTratamiento = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _keys["default"].query("DELETE FROM consultorio_tratamiento WHERE id_consultorio = $1", [req.params.id_consultorio]);
        case 3:
          result = _context3.sent;
          res.status(200).json(result.rows);
          _context3.next = 10;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: "Error al obtener consultorios",
            error: _context3.t0.message
          });
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function deleteConsultorioTratamiento(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// export const getTratamientos = async (req, res) => {
//   const id = req.params.id_consultorio; // Obtener el ID del consultorio desde los parámetros de la solicitud

//   try {
//     // Consulta SQL corregida con espacios y uso correcto de placeholders
//     const result = await pool.query(
//       "SELECT t.nombre AS tratamiento, t.descripcion FROM consultorio_tratamiento ct JOIN tratamientos t ON ct.id_tratamiento = t.id_tratamiento WHERE ct.id_consultorio = $1",
//       [id] // Pasar el valor de 'id' como un array
//     );

//     // Devolver los resultados como JSON
//     res.status(200).json(result.rows);
//   } catch (error) {
//     // Manejar errores y devolver un mensaje claro
//     res.status(500).json({
//       message: "Error al obtener tratamientos",
//       error: error.message,
//     });
//   }
// };

var getConsultoriosConTratamientos = exports.getConsultoriosConTratamientos = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _keys["default"].query("\n      SELECT \n        c.id_consultorio,\n        c.nombre AS nombre_consultorio,\n        COALESCE(\n          json_agg(\n            json_build_object(\n              'id_tratamiento', t.id_tratamiento,\n              'nombre', t.nombre,\n              'descripcion', t.descripcion,\n              'duracion', t.duracion,\n              'color', t.color,\n              'costo', t.costo\n            )\n          ) FILTER (WHERE t.id_tratamiento IS NOT NULL), '[]'\n        ) AS tratamientos\n      FROM \n        consultorios c\n      LEFT JOIN \n        consultorio_tratamiento ct ON c.id_consultorio = ct.id_consultorio\n      LEFT JOIN \n        tratamientos t ON ct.id_tratamiento = t.id_tratamiento\n      GROUP BY \n        c.id_consultorio, c.nombre;\n    ");
        case 3:
          result = _context4.sent;
          res.status(200).json(result.rows);
          _context4.next = 11;
          break;
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error("Error al obtener consultorios y tratamientos:", _context4.t0.message);
          res.status(500).json({
            message: "Error al obtener consultorios y tratamientos",
            error: _context4.t0.message
          });
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function getConsultoriosConTratamientos(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getConsultorioById = exports.getConsultorioById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id_consultorio;
          _context5.prev = 1;
          _context5.next = 4;
          return _keys["default"].query("SELECT * FROM consultorios WHERE id_consultorio = $1", [id]);
        case 4:
          result = _context5.sent;
          res.status(200).json(result.rows);
          _context5.next = 11;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          res.status(500).json({
            message: "Error al obtener consultorio",
            error: _context5.t0.message
          });
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return function getConsultorioById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var createConsultorio = exports.createConsultorio = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$body, nombre, tratamientos, result, id_consultorio, _iterator, _step, id_tratamiento, tratamientoId;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$body = req.body, nombre = _req$body.nombre, tratamientos = _req$body.tratamientos;
          console.log("Datos recibidos:", nombre, tratamientos); // <-- Agrega esto
          _context6.prev = 2;
          _context6.next = 5;
          return _keys["default"].query("INSERT INTO consultorios (nombre) VALUES ($1) RETURNING id_consultorio", [nombre]);
        case 5:
          result = _context6.sent;
          id_consultorio = result.rows[0].id_consultorio; // Asegúrate que 'tratamiento' no sea undefined o null antes de insertar
          // if (!tratamiento) {
          //   throw new Error("Tratamiento no proporcionado");
          // }
          // await pool.query(
          //   `INSERT INTO consultorio_tratamiento (id_consultorio, id_tratamiento) VALUES ($1, $2)`,
          //   [consultorioId, tratamiento]
          // );
          // Si hay tratamientos seleccionados, inserta las nuevas relaciones
          if (!(tratamientos && tratamientos.length > 0)) {
            _context6.next = 29;
            break;
          }
          _iterator = _createForOfIteratorHelper(tratamientos);
          _context6.prev = 9;
          _iterator.s();
        case 11:
          if ((_step = _iterator.n()).done) {
            _context6.next = 21;
            break;
          }
          id_tratamiento = _step.value;
          tratamientoId = parseInt(id_tratamiento, 10); // Convierte el ID a un número entero
          if (!isNaN(tratamientoId)) {
            _context6.next = 17;
            break;
          }
          console.error("ID de tratamiento inv\xE1lido: ".concat(id_tratamiento));
          return _context6.abrupt("continue", 19);
        case 17:
          _context6.next = 19;
          return _keys["default"].query("INSERT INTO consultorio_tratamiento (id_consultorio, id_tratamiento) VALUES ($1, $2)", [id_consultorio, tratamientoId] // Usa el ID convertido
          );
        case 19:
          _context6.next = 11;
          break;
        case 21:
          _context6.next = 26;
          break;
        case 23:
          _context6.prev = 23;
          _context6.t0 = _context6["catch"](9);
          _iterator.e(_context6.t0);
        case 26:
          _context6.prev = 26;
          _iterator.f();
          return _context6.finish(26);
        case 29:
          res.status(201).json({
            message: "Consultorio creado con éxito"
          });
          _context6.next = 36;
          break;
        case 32:
          _context6.prev = 32;
          _context6.t1 = _context6["catch"](2);
          console.error("Error en el servidor:", _context6.t1.message); // <-- Muestra el error en la consola
          res.status(500).json({
            message: "Error al crear el consultorio",
            error: _context6.t1.message
          });
        case 36:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[2, 32], [9, 23, 26, 29]]);
  }));
  return function createConsultorio(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var updateConsultorio = exports.updateConsultorio = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id_consultorio, _req$body2, nombre, tratamientos, result, _iterator2, _step2, id_tratamiento, tratamientoId;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          id_consultorio = req.params.id_consultorio; // ID del consultorio a actualizar
          _req$body2 = req.body, nombre = _req$body2.nombre, tratamientos = _req$body2.tratamientos;
          console.log("Datos recibidos:", id_consultorio, nombre, tratamientos);
          _context7.prev = 3;
          _context7.next = 6;
          return _keys["default"].query("UPDATE consultorios SET nombre = $1 WHERE id_consultorio = $2 RETURNING *", [nombre, id_consultorio]);
        case 6:
          result = _context7.sent;
          if (!(result.rowCount === 0)) {
            _context7.next = 9;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: "Consultorio no encontrado"
          }));
        case 9:
          console.log("Tratamiento:", tratamientos);

          // Elimina las relaciones existentes para este consultorio
          _context7.next = 12;
          return _keys["default"].query("DELETE FROM consultorio_tratamiento WHERE id_consultorio = $1", [id_consultorio]);
        case 12:
          if (!(tratamientos && tratamientos.length > 0)) {
            _context7.next = 34;
            break;
          }
          _iterator2 = _createForOfIteratorHelper(tratamientos);
          _context7.prev = 14;
          _iterator2.s();
        case 16:
          if ((_step2 = _iterator2.n()).done) {
            _context7.next = 26;
            break;
          }
          id_tratamiento = _step2.value;
          tratamientoId = parseInt(id_tratamiento, 10); // Convierte el ID a un número entero
          if (!isNaN(tratamientoId)) {
            _context7.next = 22;
            break;
          }
          console.error("ID de tratamiento inv\xE1lido: ".concat(id_tratamiento));
          return _context7.abrupt("continue", 24);
        case 22:
          _context7.next = 24;
          return _keys["default"].query("INSERT INTO consultorio_tratamiento (id_consultorio, id_tratamiento) VALUES ($1, $2)", [id_consultorio, tratamientoId] // Usa el ID convertido
          );
        case 24:
          _context7.next = 16;
          break;
        case 26:
          _context7.next = 31;
          break;
        case 28:
          _context7.prev = 28;
          _context7.t0 = _context7["catch"](14);
          _iterator2.e(_context7.t0);
        case 31:
          _context7.prev = 31;
          _iterator2.f();
          return _context7.finish(31);
        case 34:
          res.status(200).json({
            message: "Consultorio actualizado con éxito"
          });
          _context7.next = 41;
          break;
        case 37:
          _context7.prev = 37;
          _context7.t1 = _context7["catch"](3);
          console.error("Error al actualizar el consultorio:", _context7.t1.message);
          res.status(500).json({
            message: "Error al actualizar el consultorio",
            error: _context7.t1.message
          });
        case 41:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[3, 37], [14, 28, 31, 34]]);
  }));
  return function updateConsultorio(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var deleteConsultorio = exports.deleteConsultorio = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var id_consultorio, consultorioTratamientoResult, turnosResult, consultorioResult;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          id_consultorio = req.params.id_consultorio; // ID del consultorio a eliminar
          _context8.prev = 1;
          _context8.next = 4;
          return _keys["default"].query("SELECT * FROM consultorio_tratamiento WHERE id_consultorio = $1", [id_consultorio]);
        case 4:
          consultorioTratamientoResult = _context8.sent;
          if (!(consultorioTratamientoResult.rows.length > 0)) {
            _context8.next = 7;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            message: "El consultorio no puede ser eliminado ya que tiene tratamientos asociados"
          }));
        case 7:
          _context8.next = 9;
          return _keys["default"].query("SELECT * FROM turnos WHERE id_consultorio_tratamiento IN (\n        SELECT id_consultorio_tratamiento FROM consultorio_tratamiento WHERE id_consultorio = $1\n      )", [id_consultorio]);
        case 9:
          turnosResult = _context8.sent;
          if (!(turnosResult.rows.length > 0)) {
            _context8.next = 12;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            message: "El consultorio no puede ser eliminado ya que tiene turnos asignados"
          }));
        case 12:
          _context8.next = 14;
          return _keys["default"].query("DELETE FROM consultorios WHERE id_consultorio = $1 RETURNING *", [id_consultorio]);
        case 14:
          consultorioResult = _context8.sent;
          if (!(consultorioResult.rowCount === 0)) {
            _context8.next = 17;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: "Consultorio no encontrado"
          }));
        case 17:
          res.status(200).json({
            message: "Consultorio eliminado con éxito"
          });
          _context8.next = 24;
          break;
        case 20:
          _context8.prev = 20;
          _context8.t0 = _context8["catch"](1);
          console.error("Error al eliminar el consultorio:", _context8.t0.message);
          res.status(500).json({
            message: "Error al eliminar el consultorio",
            error: _context8.t0.message
          });
        case 24:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1, 20]]);
  }));
  return function deleteConsultorio(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();