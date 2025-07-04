"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _contactosController = require("./contactosController.js");
var router = _express["default"].Router();
router.post("/", _contactosController.crearContactoController);
router.get("/", _contactosController.obtenerTodosLosContactosController);
router.get("/:id", _contactosController.obtenerContactoPorIdController);
router.put("/:id", _contactosController.actualizarContactoController);
router["delete"]("/:id", _contactosController.eliminarContactoController);
var _default = exports["default"] = router;