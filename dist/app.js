"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _connectHistoryApiFallback = _interopRequireDefault(require("connect-history-api-fallback"));
var _path = _interopRequireDefault(require("path"));
require("dotenv/config");
// Usa esta forma si trabajas con import

var app = (0, _express["default"])();

// Middlewares
app.use((0, _morgan["default"])('tiny'));
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _expressFileupload["default"])({
  useTempFiles: true
}));

// Routes
app.use('/', require('./routes/auth.routes'));
app.use('/', require('./routes/administrador.routes'));
app.use('/', require('./routes/pacientes.routes'));
app.use('/', require('./routes/whatsapp.route'));

// Middleware for Vue
app.use((0, _connectHistoryApiFallback["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));

// Settings

var PORT = process.env.PORT || 3003;
app.set('port', PORT);
app.listen(app.get('port'), function () {
  console.log("Server on port ".concat(app.get('port')));
});