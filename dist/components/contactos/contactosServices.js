"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.obtenerTodosLosContactos = exports.obtenerContactoPorId = exports.eliminarContacto = exports.crearContacto = exports.actualizarContacto = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _postgres = require("../database/postgres.js");
var crearContacto = exports.crearContacto = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var nombre, apellido, email, telefono, direccion, ciudad_id, estado, observaciones, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          nombre = _ref.nombre, apellido = _ref.apellido, email = _ref.email, telefono = _ref.telefono, direccion = _ref.direccion, ciudad_id = _ref.ciudad_id, estado = _ref.estado, observaciones = _ref.observaciones;
          _context.next = 3;
          return _postgres.Pool.query("INSERT INTO crm_contactos (nombre, apellido, email, telefono, direccion, ciudad_id, estado, observaciones)\n         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)\n         RETURNING id", [nombre, apellido, email, telefono, direccion, ciudad_id, estado, observaciones]);
        case 3:
          result = _context.sent;
          return _context.abrupt("return", result.rows[0].id);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function crearContacto(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var obtenerContactoPorId = exports.obtenerContactoPorId = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _postgres.Pool.query("SELECT * FROM crm_contactos WHERE id = $1", [id]);
        case 2:
          result = _context2.sent;
          return _context2.abrupt("return", result.rows[0]);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function obtenerContactoPorId(_x2) {
    return _ref3.apply(this, arguments);
  };
}();
var obtenerTodosLosContactos = exports.obtenerTodosLosContactos = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _postgres.Pool.query("SELECT * FROM crm_contactos");
        case 2:
          result = _context3.sent;
          return _context3.abrupt("return", result.rows);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function obtenerTodosLosContactos() {
    return _ref4.apply(this, arguments);
  };
}();
var actualizarContacto = exports.actualizarContacto = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(id, _ref5) {
    var nombre, apellido, email, telefono, direccion, ciudad_id, estado, observaciones, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          nombre = _ref5.nombre, apellido = _ref5.apellido, email = _ref5.email, telefono = _ref5.telefono, direccion = _ref5.direccion, ciudad_id = _ref5.ciudad_id, estado = _ref5.estado, observaciones = _ref5.observaciones;
          _context4.next = 3;
          return _postgres.Pool.query("UPDATE crm_contactos SET\n            nombre = $1,\n            apellido = $2,\n            email = $3,\n            telefono = $4,\n            direccion = $5,\n            ciudad_id = $6,\n            estado = $7,\n            observaciones = $8\n         WHERE id = $9\n         RETURNING *", [nombre, apellido, email, telefono, direccion, ciudad_id, estado, observaciones, id]);
        case 3:
          result = _context4.sent;
          return _context4.abrupt("return", result.rows[0]);
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function actualizarContacto(_x3, _x4) {
    return _ref6.apply(this, arguments);
  };
}();
var eliminarContacto = exports.eliminarContacto = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _postgres.Pool.query("DELETE FROM crm_contactos WHERE id = $1", [id]);
        case 2:
          return _context5.abrupt("return", {
            mensaje: "Contacto eliminado correctamente."
          });
        case 3:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function eliminarContacto(_x5) {
    return _ref7.apply(this, arguments);
  };
}();