"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conectGenerateQR = exports.conectEnviarNotificaciones = exports.checkReadQr = void 0;
var _whatsappWeb = require("whatsapp-web.js");
var _dateformatter = require("../utils/dateformatter");
var _qrcode = _interopRequireDefault(require("qrcode"));
var _keys = _interopRequireDefault(require("../database/keys"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Configura correctamente el pool para PostgreSQL.

var clientInstance = new _whatsappWeb.Client({
  authTimeoutMs: 20000,
  takeoverOnConflict: true,
  authStrategy: new _whatsappWeb.LocalAuth({
    clientId: "session"
  }),
  restartOnAuthFail: true,
  puppeteer: {
    ignoreDefaultArgs: ["--enable-automation", "--disable-dev-shm-usage"],
    headless: true,
    args: ["--no-sandbox", "--disable-gpu-driver-bug-workarounds", "--disable-setuid-sandbox", "--unhandled-rejections=strict", "--disable-dev-shm-usage", "--disable-accelerated-2d-canvas", "--no-first-run", "--no-zygote", "--disable-gpu", "--log-level=3", "--no-default-browser-check", "--disable-site-isolation-trials", "--no-experiments", "--ignore-gpu-blacklist", "--ignore-certificate-errors", "--ignore-certificate-errors-spki-list", "--disable-extensions", "--disable-default-apps", "--enable-features=NetworkService", "--disable-webgl", "--disable-threaded-animation", "--disable-threaded-scrolling", "--disable-in-process-stack-traces", "--disable-histogram-customizer", "--disable-gl-extensions", "--disable-composited-antialiasing", "--disable-canvas-aa", "--disable-3d-apis", "--disable-accelerated-jpeg-decoding", "--disable-accelerated-mjpeg-decode", "--disable-app-list-dismiss-on-blur", "--disable-accelerated-video-decode"]
  }
});
process.on("unhandledRejection", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(reason) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
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
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(error) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
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
var isReady = false;

// 
var qrCodeData = "";
clientInstance.on("ready", function () {
  console.log("¡Cliente de WhatsApp listo!");
  isReady = true;
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
clientInstance.on("disconnected", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
  var sessionDir;
  return _regeneratorRuntime().wrap(function _callee3$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        console.log("Cliente desconectado.");
        clientReady = false;
        _context3.prev = 2;
        _context3.prev = 3;
        _context3.prev = 4;
        _context3.next = 7;
        return clientInstance.destroy();
      case 7:
        console.log("Cliente destruido.");
        _context3.next = 28;
        break;
      case 10:
        _context3.prev = 10;
        _context3.t0 = _context3["catch"](4);
        if (!(_context3.t0.code === "EBUSY")) {
          _context3.next = 27;
          break;
        }
        console.warn("Erro EBUSY ao destruir cliente para o usu\xE1rio. Recurso ocupado ou bloqueado.");
        // Aguarda um curto período e tenta novamente
        _context3.next = 16;
        return new Promise(function (resolve) {
          return setTimeout(resolve, 1000);
        });
      case 16:
        _context3.prev = 16;
        console.log("Tentando destruir novamente o cliente para o usu\xE1rio ");
        _context3.next = 20;
        return clientInstance.destroy();
      case 20:
        _context3.next = 25;
        break;
      case 22:
        _context3.prev = 22;
        _context3.t1 = _context3["catch"](16);
        console.warn("Tentativa final de destruir cliente para o usu\xE1rio  falhou:", _context3.t1);
      case 25:
        _context3.next = 28;
        break;
      case 27:
        console.warn("Erro inesperado ao destruir cliente para o usu\xE1rio ", _context3.t0);
      case 28:
        if (!(reason === "NAVIGATION" || reason === "LOGOUT")) {
          _context3.next = 42;
          break;
        }
        sessionDir = path.join("./wwebjs_auth", "session-session"); // Verificar se a pasta existe
        _context3.next = 32;
        return fs.stat(sessionDir)["catch"](function () {
          return false;
        });
      case 32:
        if (!_context3.sent) {
          _context3.next = 42;
          break;
        }
        _context3.prev = 33;
        _context3.next = 36;
        return fs.rm(sessionDir, {
          recursive: true,
          force: true
        });
      case 36:
        console.log("Pasta da sess\xE3o exclu\xEDda com sucesso para o usu\xE1rio ");
        _context3.next = 42;
        break;
      case 39:
        _context3.prev = 39;
        _context3.t2 = _context3["catch"](33);
        console.log("Erro ao excluir a pasta da sess\xE3o para o usu\xE1rio  ".concat(_context3.t2.message));
      case 42:
        _context3.prev = 42;
        _context3.next = 45;
        return clientInstance.initialize();
      case 45:
        return _context3.finish(42);
      case 46:
        _context3.prev = 46;
        _context3.next = 49;
        return clientInstance.initialize();
      case 49:
        return _context3.finish(46);
      case 50:
      case "end":
        return _context3.stop();
    }
  }, _callee3, null, [[2,, 46, 50], [3,, 42, 46], [4, 10], [16, 22], [33, 39]]);
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
var checkReadQr = exports.checkReadQr = function checkReadQr(req, res) {
  res.json({
    isRead: isReady
  });
  if (isReady) return;
};
var conectEnviarNotificaciones = exports.conectEnviarNotificaciones = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body, turnos, mensajeBase, _iterator, _step, turno, idTurno, numero, fullPhoneNumber, result, turnoData, formattedDate, mensaje, chatId;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
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