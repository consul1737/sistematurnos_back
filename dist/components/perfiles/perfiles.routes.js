"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var PerfilesController = _interopRequireWildcard(require("./perfilesController.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// Asegúrate de que el alias esté bien resuelto

var router = (0, _express.Router)();

// Crear perfil
router.post('/', PerfilesController.crearPerfil);

// Obtener todos los perfiles
router.get('/', PerfilesController.obtenerPerfiles);
// Obtener tipos de perfil
router.get('/tipos', PerfilesController.obtenerTiposPerfil);

// Obtener perfil por ID
router.get('/:id', PerfilesController.obtenerPerfilPorId);

// Actualizar perfil
router.put('/:id', PerfilesController.actualizarPerfil);

// Eliminar perfil
router["delete"]('/:id', PerfilesController.eliminarPerfil);
var _default = exports["default"] = router;