"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = require("express");
var _authController = _interopRequireDefault(require("./authController"));
var router = (0, _express.Router)();
router.post("/signup", _authController["default"].signUp);
router.post("/signin", _authController["default"].signIn);
module.exports = router;