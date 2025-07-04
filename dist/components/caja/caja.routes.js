"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _cajaControllers = require("../caja/cajaControllers");
// src/routes/caja.routes.js

// asegurate que esté bien resuelto el alias

var router = (0, _express.Router)();
router.get("/", _cajaControllers.getVistaCaja); // Esto responde a /caja/ desde el archivo principal
var _default = exports["default"] = router;