"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crearArticulo = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var ArticulosServices = _interopRequireWildcard(require("./articulos.services"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var crearArticulo = exports.crearArticulo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, nombre, descripcion, categoria_id, precio_base, activo, articulo_tipo, ArticuloId;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, nombre = _req$body.nombre, descripcion = _req$body.descripcion, categoria_id = _req$body.categoria_id, precio_base = _req$body.precio_base, activo = _req$body.activo, articulo_tipo = _req$body.articulo_tipo;
          _context.next = 4;
          return ArticulosServices.crearArticulo({
            nombre: nombre,
            descripcion: descripcion,
            categoria_id: categoria_id,
            precio_base: precio_base,
            activo: activo,
            articulo_tipo: articulo_tipo
          });
        case 4:
          ArticuloId = _context.sent;
          res.status(201).json({
            message: 'Artículo creado correctamente',
            ArticuloId: ArticuloId
          });
          _context.next = 12;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error('Error al crear el artículo:', _context.t0.message);
          res.status(500).json({
            error: 'Error al crear el artículo'
          });
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function crearArticulo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();