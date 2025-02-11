"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
require("module-alias/register");
var _cors = _interopRequireDefault(require("cors"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _connectHistoryApiFallback = _interopRequireDefault(require("connect-history-api-fallback"));
var _path = _interopRequireDefault(require("path"));
require("dotenv/config");
var _consultorios = _interopRequireDefault(require("./components/consultorios/consultorios.routes"));
var _auth = _interopRequireDefault(require("./components/auth/auth.routes"));
var _turnos = _interopRequireDefault(require("./components/turnos/turnos.routes"));
var _pacientes = _interopRequireDefault(require("./components/pacientes/pacientes.routes"));
var _whatsapp = _interopRequireDefault(require("./components/whatsapp/whatsapp.routes"));
var _tratamientos = _interopRequireDefault(require("./components/tratamientos/tratamientos.routes"));
// Usa esta forma si trabajas con import

var app = (0, _express["default"])();

// Middlewares
app.use((0, _morgan["default"])("tiny"));
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _expressFileupload["default"])({
  useTempFiles: true
}));

// Middleware para Vue
app.use((0, _connectHistoryApiFallback["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, "public")));

// Importa las rutas usando los alias

// Rutas
app.use("/", _auth["default"]);
app.use("/", _whatsapp["default"]);
app.use("/turnos", _turnos["default"]);
app.use("/pacientes", _pacientes["default"]);
app.use("/consultorios", _consultorios["default"]);
app.use("/tratamientos", _tratamientos["default"]);

// Configuración del puerto
var PORT = process.env.PORT || 3003;
app.set("port", PORT);
app.listen(app.get("port"), function () {
  console.log("Server on port ".concat(app.get("port")));
});