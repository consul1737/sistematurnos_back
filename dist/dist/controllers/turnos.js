"use strict";

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
var _keys = _interopRequireDefault(require("../database/keys"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
var _require = require('../utils/dateformatter'),
  formatearFechaDB = _require.formatearFechaDB;
var administrador = {};

// Crear un turno
administrador.crearTurno = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, id_paciente, fecha, hora, id_tratamiento, id_consultorio;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, id_paciente = _req$body.id_paciente, fecha = _req$body.fecha, hora = _req$body.hora, id_tratamiento = _req$body.id_tratamiento, id_consultorio = _req$body.id_consultorio;
          _context.prev = 1;
          _context.next = 4;
          return _keys["default"].query('INSERT INTO turnos (id_paciente, fecha, hora, id_tratamiento, id_consultorio) VALUES ($1, $2, $3, $4, $5)', [id_paciente, fecha, hora, id_tratamiento, id_consultorio]);
        case 4:
          res.status(200).json({
            message: 'El turno se creó correctamente'
          });
          _context.next = 11;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          console.error('Error al crear el turno:', _context.t0);

          // Verificar si el error es por violar la restricción UNIQUE
          if (_context.t0.code === '23505') {
            // Código de error de PostgreSQL para UNIQUE violation
            res.status(400).json({
              message: 'Ya existe un turno en este horario y consultorio'
            });
          } else {
            res.status(500).json({
              message: 'Error interno del servidor',
              error: _context.t0
            });
          }
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 7]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Leer un turno por ID
administrador.readTurno = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var id, resultado, turno;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id_turno;
          _context2.prev = 1;
          _context2.next = 4;
          return _keys["default"].query('SELECT * FROM turnos WHERE id_turno = $1', [id]);
        case 4:
          resultado = _context2.sent;
          if (!(resultado.rows.length === 0)) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Turno no encontrado'
          }));
        case 7:
          // Formatear la fecha antes de enviar al cliente
          turno = resultado.rows[0];
          turno.fecha = dateFormatter(turno.fecha); // Formatea el campo de fecha

          res.status(200).json(turno);
          _context2.next = 16;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](1);
          console.error('Error al leer el turno:', _context2.t0);
          res.status(500).json({
            message: 'Error interno del servidor',
            error: _context2.t0
          });
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 12]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
// Actualizar un turno
administrador.updateTurno = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, _req$body2, fecha, hora, id_consultorio;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id_turno;
          _req$body2 = req.body, fecha = _req$body2.fecha, hora = _req$body2.hora, id_consultorio = _req$body2.id_consultorio;
          _context3.prev = 2;
          _context3.next = 5;
          return _keys["default"].query('UPDATE turnos SET fecha = $1, hora = $2, id_consultorio = $3 WHERE id_turno = $4', [fecha, hora, id_consultorio, id]);
        case 5:
          res.status(200).json({
            message: 'El turno se actualizó correctamente',
            turno: {
              fecha: fecha,
              hora: hora,
              id_consultorio: id_consultorio
            }
          });
          _context3.next = 12;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](2);
          console.error('Error al actualizar el turno:', _context3.t0);

          // Verificar si el error es por violar la restricción UNIQUE
          if (_context3.t0.code === '23505') {
            res.status(400).json({
              message: 'Ya existe un turno en este horario y consultorio'
            });
          } else {
            res.status(500).json({
              message: 'Error interno del servidor',
              error: _context3.t0
            });
          }
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 8]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Eliminar un turno
administrador.deleteTurno = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id_turno;
          _context4.prev = 1;
          _context4.next = 4;
          return _keys["default"].query('DELETE FROM turnos WHERE id_turno = $1', [id]);
        case 4:
          res.status(200).json({
            message: 'El turno se eliminó correctamente'
          });
          _context4.next = 11;
          break;
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](1);
          console.error('Error al eliminar el turno:', _context4.t0);
          res.status(500).json({
            message: 'Error interno del servidor',
            error: _context4.t0
          });
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 7]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Obtener todos los turnos filtrados por id_consultorio
administrador.getTurnos = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id_consultorio, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id_consultorio = req.body.id_consultorio;
          _context5.prev = 1;
          _context5.next = 4;
          return _keys["default"].query('SELECT * FROM turnos WHERE id_consultorio = $1 ORDER BY fecha, hora', [id_consultorio]);
        case 4:
          result = _context5.sent;
          if (result.rows.length > 0) {
            res.status(200).json(result.rows);
          } else {
            res.status(404).json({
              message: 'No se encontraron turnos para este consultorio.'
            });
          }
          _context5.next = 12;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          console.error('Error al obtener los turnos:', _context5.t0);
          res.status(500).json({
            message: 'Error interno del servidor',
            error: _context5.t0
          });
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
administrador.getConsultorios = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var result;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _keys["default"].query('SELECT id_consultorio, nombre FROM consultorios');
        case 3:
          result = _context6.sent;
          res.status(200).json(result.rows);
          _context6.next = 10;
          break;
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            message: 'Error al obtener consultorios',
            error: _context6.t0.message
          });
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
administrador.getTratamientos = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _keys["default"].query('SELECT id_tratamiento, nombre FROM tratamientos');
        case 3:
          result = _context7.sent;
          res.status(200).json(result.rows);
          _context7.next = 10;
          break;
        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            message: 'Error al obtener tratamientos',
            error: _context7.t0.message
          });
        case 10:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
administrador.getPacientes = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var pacientes;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _keys["default"].query('SELECT id_paciente, nombre FROM pacientes');
        case 3:
          pacientes = _context8.sent;
          res.status(200).json(pacientes.rows);
          _context8.next = 10;
          break;
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          res.status(500).json({
            message: 'Error al obtener pacientes',
            error: _context8.t0.message
          });
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
administrador.getCalendarTurnos = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var fecha, query, turnos, turnosFormateados;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          fecha = req.query.fecha; // Obtener fecha desde la query parameter
          _context9.prev = 1;
          query = "\n      SELECT \n        t.id_turno,\n        t.fecha::date,\n        t.hora,\n        c.nombre AS consultorio,\n        p.nombre AS nombre_paciente,\n        p.telefono as telefono\n      FROM turnos t\n      INNER JOIN consultorios c ON t.id_consultorio = c.id_consultorio\n      INNER JOIN pacientes p ON t.id_paciente = p.id_paciente\n    ";
          if (fecha) {
            query += " WHERE t.fecha::date = $1";
          }

          // Obtener los turnos de la base de datos
          _context9.next = 6;
          return _keys["default"].query(query, fecha ? [fecha] : []);
        case 6:
          turnos = _context9.sent;
          // Formatear las fechas antes de enviar la respuesta
          turnosFormateados = turnos.rows.map(function (turno) {
            return _objectSpread(_objectSpread({}, turno), {}, {
              fecha: formatearFechaDB(turno.fecha) // Aplicar la función de formato
            });
          }); // Enviar los turnos con las fechas formateadas
          res.status(200).json(turnosFormateados);
          _context9.next = 14;
          break;
        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](1);
          res.status(500).json({
            message: 'Error al obtener turnos',
            error: _context9.t0.message
          });
        case 14:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 11]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
// administrador.enviarNotificaciones = async (req, res) => {
//   const { turnos, mensajeBase } = req.body;

//   if (!turnos || turnos.length === 0) {
//     return res.status(400).json({
//       message: 'Debe proporcionar al menos un turno para enviar mensajes.',
//     });
//   }

//   try {
//     for (const turno of turnos) {
//       const { idTurno, numero } = turno;

//       // Verificar formato del número
//       if (!numero || !/^\d+$/.test(numero)) {
//         console.warn(`Número inválido para el turno ${idTurno}: ${numero}`);
//         continue;
//       }

//       // Construir el número completo con el código de país desde la variable de entorno
//       const fullPhoneNumber = `${process.env.COUNTRY_CODE}${numero}`;

//       // Consultar detalles del turno desde la base de datos
//       const result = await pool.query(
//         `SELECT t.id_turno, p.nombre AS paciente, c.nombre AS consultorio, 
//                 tr.nombre AS tratamiento, t.fecha, t.hora 
//          FROM turnos t 
//          JOIN pacientes p ON t.id_paciente = p.id_paciente 
//          JOIN consultorios c ON t.id_consultorio = c.id_consultorio 
//          JOIN tratamientos tr ON t.id_tratamiento = tr.id_tratamiento 
//          WHERE t.id_turno = $1`,
//         [idTurno]
//       );

//       if (result.rows.length === 0) {
//         console.warn(`Turno no encontrado: ${idTurno}`);
//         continue;
//       }

//       const turnoData = result.rows[0];

//       // Personalizar el mensaje
//       const mensaje = mensajeBase
//         .replace('{PACIENTE}', turnoData.paciente)
//         .replace('{CONSULTORIO}', turnoData.consultorio)
//         .replace('{TRATAMIENTO}', turnoData.tratamiento)
//         .replace('{FECHA}', turnoData.fecha)
//         .replace('{HORA}', turnoData.hora);

//       // Enviar mensaje por WhatsApp
//       const chatId = `${fullPhoneNumber}@c.us`;
//       await client.sendMessage(chatId, mensaje);
//     }

//     res.status(200).json({ message: 'Mensajes enviados con éxito.' });
//   } catch (error) {
//     console.error('Error al enviar mensajes:', error);
//     res.status(500).json({
//       message: 'Error al enviar los mensajes.',
//       error: error.message,
//     });
//   }
// };

module.exports = administrador;