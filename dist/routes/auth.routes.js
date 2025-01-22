"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _auth = _interopRequireDefault(require("../controllers/auth"));
var router = _express["default"].Router();
router.post("/signup", _auth["default"].signUp);
router.post("/signin", _auth["default"].signIn);
module.exports = router;