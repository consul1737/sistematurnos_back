"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conectGenerateQR = exports.conectEnviarNotificaciones = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _whatsappWeb = require("whatsapp-web.js");
var _dateformatter = require("../utils/dateformatter");
var _qrcode = _interopRequireDefault(require("qrcode"));
var _keys = _interopRequireDefault(require("../database/keys"));
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var _n = 0,
        F = function F() {};
      return {
        s: F,
        n: function n() {
          return _n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[_n++]
          };
        },
        e: function e(r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function s() {
      t = t.call(r);
    },
    n: function n() {
      var r = t.next();
      return a = r.done, r;
    },
    e: function e(r) {
      u = !0, o = r;
    },
    f: function f() {
      try {
        a || null == t["return"] || t["return"]();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
// Configura correctamente el pool para PostgreSQL.

var clientInstance = new _whatsappWeb.Client({
  authTimeoutMs: 20000,
  takeoverOnConflict: true,
  authStrategy: new _whatsappWeb.LocalAuth({
    clientId: "session",
    dataPath: 'whatsapp-js-session'
  }),
  restartOnAuthFail: true,
  puppeteer: {
    ignoreDefaultArgs: ["--enable-automation", "--disable-dev-shm-usage"],
    headless: true,
    args: ["--no-sandbox", "--disable-gpu-driver-bug-workarounds", "--disable-setuid-sandbox", "--unhandled-rejections=strict", "--disable-dev-shm-usage", "--disable-accelerated-2d-canvas", "--no-first-run", "--no-zygote", "--disable-gpu", "--log-level=3", "--no-default-browser-check", "--disable-site-isolation-trials", "--no-experiments", "--ignore-gpu-blacklist", "--ignore-certificate-errors", "--ignore-certificate-errors-spki-list", "--disable-extensions", "--disable-default-apps", "--enable-features=NetworkService", "--disable-webgl", "--disable-threaded-animation", "--disable-threaded-scrolling", "--disable-in-process-stack-traces", "--disable-histogram-customizer", "--disable-gl-extensions", "--disable-composited-antialiasing", "--disable-canvas-aa", "--disable-3d-apis", "--disable-accelerated-jpeg-decoding", "--disable-accelerated-mjpeg-decode", "--disable-app-list-dismiss-on-blur", "--disable-accelerated-video-decode"]
  }
});
process.on("unhandledRejection", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(reason) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(typeof reason === "string" && (reason.includes("Protocol Error:") || reason.includes("Target closed.")))) {
            _context.next = 5;
            break;
          }
          _context.next = 3;
          return clientInstance.destroy();
        case 3:
          _context.next = 5;
          return fs.rmdir("./wwebjs_auth", {
            recursive: true
          });
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
process.on("uncaughtException", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(error) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(error.message.includes("Protocol Error:") || error.message.includes("Target closed."))) {
            _context2.next = 5;
            break;
          }
          _context2.next = 3;
          return clientInstance.destroy();
        case 3:
          _context2.next = 5;
          return fs.rmdir("./wwebjs_auth", {
            recursive: true
          });
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());

// Variables estado para saber si esta pidiendo el qr
var qrRequested = false;

// 
var qrCodeData = "";
clientInstance.on("ready", function () {
  console.log("¡Cliente de WhatsApp listo!");
});

// Escuchar eventos del cliente
clientInstance.on("qr", function (qr) {
  // Verificar si se ha solicitado el QR
  if (qrRequested) {
    _qrcode["default"].toDataURL(qr, function (err, url) {
      if (err) {
        console.error('Error al generar el QR:', err);
        return;
      }
      qrCodeData = url;
      console.log('QR generado:', qrCodeData);
    });
  }
});
clientInstance.on("disconnected", /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3() {
  var sessionDir;
  return _regenerator["default"].wrap(function _callee3$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        console.log("Cliente desconectado.");
        // clientReady = false;
        _context3.prev = 1;
        _context3.prev = 2;
        _context3.next = 5;
        return clientInstance.destroy();
      case 5:
        console.log("Cliente destruido.");
        _context3.next = 26;
        break;
      case 8:
        _context3.prev = 8;
        _context3.t0 = _context3["catch"](2);
        if (!(_context3.t0.code === "EBUSY")) {
          _context3.next = 25;
          break;
        }
        console.warn("Erro EBUSY ao destruir cliente para o usu\xE1rio. Recurso ocupado ou bloqueado.");
        // Aguarda um curto período e tenta novamente
        _context3.next = 14;
        return new Promise(function (resolve) {
          return setTimeout(resolve, 1000);
        });
      case 14:
        _context3.prev = 14;
        console.log("Tentando destruir novamente o cliente para o usu\xE1rio ");
        _context3.next = 18;
        return clientInstance.destroy();
      case 18:
        _context3.next = 23;
        break;
      case 20:
        _context3.prev = 20;
        _context3.t1 = _context3["catch"](14);
        console.warn("Tentativa final de destruir cliente para o usu\xE1rio  falhou:", _context3.t1);
      case 23:
        _context3.next = 26;
        break;
      case 25:
        console.warn("Erro inesperado ao destruir cliente para o usu\xE1rio ", _context3.t0);
      case 26:
        if (!(reason === "NAVIGATION" || reason === "LOGOUT")) {
          _context3.next = 41;
          break;
        }
        sessionDir = path.join("./wwebjs_auth", "session-session");
        a;
        // Verificar se a pasta existe
        _context3.next = 31;
        return fs.stat(sessionDir)["catch"](function () {
          return false;
        });
      case 31:
        if (!_context3.sent) {
          _context3.next = 41;
          break;
        }
        _context3.prev = 32;
        _context3.next = 35;
        return fs.rm(sessionDir, {
          recursive: true,
          force: true
        });
      case 35:
        console.log("Pasta da sess\xE3o exclu\xEDda com sucesso para o usu\xE1rio ");
        _context3.next = 41;
        break;
      case 38:
        _context3.prev = 38;
        _context3.t2 = _context3["catch"](32);
        console.log("Erro ao excluir a pasta da sess\xE3o para o usu\xE1rio  ".concat(_context3.t2.message));
      case 41:
        _context3.prev = 41;
        _context3.next = 44;
        return clientInstance.initialize();
      case 44:
        return _context3.finish(41);
      case 45:
      case "end":
        return _context3.stop();
    }
  }, _callee3, null, [[1,, 41, 45], [2, 8], [14, 20], [32, 38]]);
})));
clientInstance.on("error", function (error) {
  console.error("Error in client", error);
});
clientInstance.on("authenticated", function () {
  console.log("¡Cliente autenticado correctamente!");
});
clientInstance.on("auth_failure", function (message) {
  console.error("Falló la autenticación:", message);
  console.log("Intentando reiniciar el cliente...");
  clientInstance.destroy().then(function () {
    return clientInstance.initialize();
  });
});

// Inicializar cliente
clientInstance.initialize();

// Controladores
var conectGenerateQR = exports.conectGenerateQR = function conectGenerateQR(req, res) {
  if (!qrCodeData) {
    qrRequested = true; // Aca marca que se ha solicitado el QR
    res.json({
      message: 'QR solicitado, espere...'
    });
  } else {
    res.json({
      qrCode: qrCodeData
    }); // Si ya existe un QR, se envia
  }

  // if (qrCodeData) {
  //   res.status(200).json({ qrCode: qrCodeData });
  // } else {
  //   res.status(500).json({ message: "Error al generar el QR" });
  // }
};
var conectEnviarNotificaciones = exports.conectEnviarNotificaciones = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body, turnos, mensajeBase, _iterator, _step, turno, idTurno, numero, fullPhoneNumber, result, turnoData, formattedDate, mensaje, chatId;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, turnos = _req$body.turnos, mensajeBase = _req$body.mensajeBase;
          console.log("Turnos recibidos:", turnos);
          if (!(!turnos || turnos.length === 0)) {
            _context4.next = 5;
            break;
          }
          console.warn("No se proporcionaron turnos en la solicitud.");
          return _context4.abrupt("return", res.status(400).json({
            message: "Debe proporcionar al menos un turno para enviar mensajes."
          }));
        case 5:
          _context4.prev = 5;
          // Esperar a que el cliente esté listo antes de enviar los mensajes
          // await ensureClientReady();
          _iterator = _createForOfIteratorHelper(turnos);
          _context4.prev = 7;
          _iterator.s();
        case 9:
          if ((_step = _iterator.n()).done) {
            _context4.next = 37;
            break;
          }
          turno = _step.value;
          idTurno = turno.idTurno, numero = turno.numero; // Verificar formato del número
          if (!(!numero || !/^\d+$/.test(numero))) {
            _context4.next = 15;
            break;
          }
          console.warn("N\xFAmero inv\xE1lido para el turno ".concat(idTurno, ": ").concat(numero));
          return _context4.abrupt("continue", 35);
        case 15:
          // Construir el número completo con el código de país desde la variable de entorno
          fullPhoneNumber = "".concat(process.env.COUNTRY_CODE).concat(numero);
          console.log("N\xFAmero de tel\xE9fono completo: ".concat(fullPhoneNumber));

          // Consultar detalles del turno desde la base de datos
          _context4.next = 19;
          return _keys["default"].query("SELECT t.id_turno, p.nombre AS paciente, c.nombre AS consultorio, \n                tr.nombre AS tratamiento, t.fecha, t.hora \n         FROM turnos t \n         JOIN pacientes p ON t.id_paciente = p.id_paciente \n         JOIN consultorios c ON t.id_consultorio = c.id_consultorio \n         JOIN tratamientos tr ON t.id_tratamiento = tr.id_tratamiento \n         WHERE t.id_turno = $1", [idTurno]);
        case 19:
          result = _context4.sent;
          if (!(result.rows.length === 0)) {
            _context4.next = 23;
            break;
          }
          console.warn("Turno no encontrado: ".concat(idTurno));
          return _context4.abrupt("continue", 35);
        case 23:
          turnoData = result.rows[0];
          console.log("Datos del turno: ".concat(JSON.stringify(turnoData)));

          //** se crea el mensaje personalizado** //
          // Formatear la fecha
          formattedDate = (0, _dateformatter.formatearFecha)(turnoData.fecha); // Personalizar el mensaje
          mensaje = mensajeBase.replace("{PACIENTE}", turnoData.paciente).replace("{CONSULTORIO}", turnoData.consultorio).replace("{TRATAMIENTO}", turnoData.tratamiento).replace("{FECHA}", formattedDate).replace("{HORA}", turnoData.hora);
          console.log("Mensaje personalizado: ".concat(mensaje));
          console.log("Estado del cliente antes de enviar mensaje:", clientInstance.info);
          console.log("¿Está el cliente completamente listo?", clientInstance.isReady);

          // Enviar mensaje por WhatsApp
          chatId = "".concat(fullPhoneNumber, "@c.us");
          console.log("Estado del cliente antes de enviar mensaje:", clientInstance.info);
          _context4.next = 34;
          return clientInstance.sendMessage(chatId, mensaje);
        case 34:
          console.log("Mensaje enviado al n\xFAmero: ".concat(fullPhoneNumber));
        case 35:
          _context4.next = 9;
          break;
        case 37:
          _context4.next = 42;
          break;
        case 39:
          _context4.prev = 39;
          _context4.t0 = _context4["catch"](7);
          _iterator.e(_context4.t0);
        case 42:
          _context4.prev = 42;
          _iterator.f();
          return _context4.finish(42);
        case 45:
          res.status(200).json({
            message: "Mensajes enviados con éxito."
          });
          _context4.next = 52;
          break;
        case 48:
          _context4.prev = 48;
          _context4.t1 = _context4["catch"](5);
          console.error("Error al enviar mensajes:", _context4.t1);
          res.status(500).json({
            message: "Error al enviar los mensajes.",
            error: _context4.t1.message
          });
        case 52:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[5, 48], [7, 39, 42, 45]]);
  }));
  return function conectEnviarNotificaciones(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

// Exportar los controladores