"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _keys = _interopRequireDefault(require("../database/keys"));
var authentication = {}; // Corrección de nombre

// Función para registrar un cliente
authentication.signUp = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, nombre, email, telefono, direccion, ciudad, pais, password, rol_id;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, nombre = _req$body.nombre, email = _req$body.email, telefono = _req$body.telefono, direccion = _req$body.direccion, ciudad = _req$body.ciudad, pais = _req$body.pais, password = _req$body.password, rol_id = _req$body.rol_id;
          _context.prev = 1;
          _context.next = 4;
          return _keys["default"].query('INSERT INTO usuarios(nombre, email, telefono, direccion, ciudad, pais, password, rol_id) VALUES ($1, $2, $3, $4, $5, $6, $7,$8)', [nombre, email, telefono, direccion, ciudad, pais, password, rol_id]);
        case 4:
          // Respuesta exitosa
          res.status(200).json({
            message: 'Ingreso bien'
          });
          _context.next = 11;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          console.log("Error al insertar", _context.t0);
          res.status(500).json({
            message: 'An error has occurred',
            error: _context.t0
          });
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 7]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Función para iniciar sesión
authentication.signIn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, email, password, usuario;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // Corrección de nombres
          _context2.prev = 1;
          _context2.next = 4;
          return _keys["default"].query('SELECT * FROM usuarios WHERE email=$1 AND password=$2',
          // Corrección en la consulta SQL
          [email, password]);
        case 4:
          _context2.next = 6;
          return _context2.sent.rows;
        case 6:
          usuario = _context2.sent;
          if (usuario.length > 0) {
            res.status(200).json({
              id: usuario[0].id,
              nombre: usuario[0].nombre,
              email: usuario[0].email
            });
          } else {
            res.status(200).json({
              message: "the user does not exist",
              NotFound: true
            });
          }
          _context2.next = 14;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);
          console.log("Error en signIn", _context2.t0);
          res.status(500).json({
            message: 'An error has occurred',
            error: _context2.t0
          });
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 10]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
module.exports = authentication; // Exportación con el nombre corregido