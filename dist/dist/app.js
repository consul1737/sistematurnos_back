"use strict";

var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _connectHistoryApiFallback = _interopRequireDefault(require("connect-history-api-fallback"));
var _path = _interopRequireDefault(require("path"));
require("dotenv/config");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
// Corrección en el nombre del paquete

// Usa esta forma si trabajas con import

var app = (0, _express["default"])();

// Middlewares (código que se ejecuta antes de cualquier petición)
app.use((0, _morgan["default"])('tiny'));
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _expressFileupload["default"])({
  useTempFiles: true
})); // Corrección de "useTempfiles" a "useTempFiles"
// Corrección de "_dirname" a "__dirname"
// Corrección de "_dirname" a "__dirname"

// Routes
app.use('/', require('./routes/auth.routes'));
app.use('/', require('./routes/administrador.routes'));
app.use('/', require('./routes/pacientes.routes'));
app.use('/', require('./routes/whatsapp.routes'));
// middelword for veu
app.use((0, _connectHistoryApiFallback["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));

// Settings
app.set('port', process.env.PORT || 3003);
app.listen(app.get('port'), function () {
  console.log('Server on port ' + app.get('port'));
});