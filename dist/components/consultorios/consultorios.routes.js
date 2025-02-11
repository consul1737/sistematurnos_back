"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _consultorioController = require("./consultorioController");
var router = (0, _express.Router)();
router.get("/", _consultorioController.getConsultorios);
router.post("/", _consultorioController.createConsultorio);
router.get("/tratamientos", _consultorioController.getConsultoriosConTratamientos);
router.get("/consultorio_tratamientos/", _consultorioController.getConsultorioTratamiento);
// router.get("/tratamientos/:id", getTratamientos);

router.route("/:id_consultorio").get(_consultorioController.getConsultorioById).put(_consultorioController.updateConsultorio)["delete"](_consultorioController.deleteConsultorio);
var _default = exports["default"] = router;