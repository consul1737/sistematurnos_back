"use strict";

var _express = _interopRequireDefault(require("express"));
var _auth = _interopRequireDefault(require("../controllers/auth"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/signup", _auth["default"].signUp);
router.post("/signin", _auth["default"].signIn);
module.exports = router;