"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tratamientosController = require("./tratamientosController");
var router = (0, _express.Router)();
router.get("/", _tratamientosController.getTratamientos);
router.post("/", _tratamientosController.createTratamiento);
router.get("/tratamientosconsul/:id_consultorio", _tratamientosController.getTratamientosPorConsultorio);
router.route("/:id_tratamiento").get(_tratamientosController.getTratamientoById).put(_tratamientosController.updateTratamiento)["delete"](_tratamientosController.deleteTratamiento);
var _default = exports["default"] = router;