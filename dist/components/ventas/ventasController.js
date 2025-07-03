"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crearVenta = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var ventasService = _interopRequireWildcard(require("./ventas.services"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var crearVenta = exports.crearVenta = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, cliente_id, fecha, fecha_fin, modulo_id, estado, observaciones, total, caja_id, medio_pago, ventaId;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, cliente_id = _req$body.cliente_id, fecha = _req$body.fecha, fecha_fin = _req$body.fecha_fin, modulo_id = _req$body.modulo_id, estado = _req$body.estado, observaciones = _req$body.observaciones, total = _req$body.total, caja_id = _req$body.caja_id, medio_pago = _req$body.medio_pago; // Lógica delegada al service
          _context.next = 4;
          return ventasService.crearVenta({
            cliente_id: cliente_id,
            fecha: fecha,
            fecha_fin: fecha_fin,
            modulo_id: modulo_id,
            estado: estado,
            observaciones: observaciones,
            total: total,
            caja_id: caja_id,
            medio_pago: medio_pago
          });
        case 4:
          ventaId = _context.sent;
          res.status(201).json({
            message: 'Venta creada correctamente',
            ventaId: ventaId
          });
          _context.next = 12;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error('Error al crear venta:', _context.t0.message);
          res.status(500).json({
            error: 'Error al crear la venta'
          });
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function crearVenta(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();