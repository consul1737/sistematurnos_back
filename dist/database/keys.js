"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _pg = require("pg");
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv["default"].config();
var pool = new _pg.Pool({
  host: process.env.HOST,
  port: process.env.PORTDB,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});
var _default = exports["default"] = pool;