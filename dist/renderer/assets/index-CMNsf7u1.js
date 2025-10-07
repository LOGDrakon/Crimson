function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$1 = Symbol.for("react.element"), n$3 = Symbol.for("react.portal"), p$4 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t$1 = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$1(a) {
  if (null === a || "object" !== typeof a) return null;
  a = z$1 && a[z$1] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$1 = {};
function E$1(a, b, e2) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e2 || B$1;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E$1.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E$1.prototype;
function G$1(a, b, e2) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e2 || B$1;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = true;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$2(a, b, e2) {
  var d, c4 = {}, k2 = null, h = null;
  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J.call(b, d) && !L$1.hasOwnProperty(d) && (c4[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g) c4.children = e2;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++) f2[m2] = arguments[m2 + 2];
    c4.children = f2;
  }
  if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c4[d] && (c4[d] = g[d]);
  return { $$typeof: l$1, type: a, key: k2, ref: h, props: c4, _owner: K$1.current };
}
function N$1(a, b) {
  return { $$typeof: l$1, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$1(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l$1;
}
function escape(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P$1 = /\/+/g;
function Q$1(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function R$1(a, b, e2, d, c4) {
  var k2 = typeof a;
  if ("undefined" === k2 || "boolean" === k2) a = null;
  var h = false;
  if (null === a) h = true;
  else switch (k2) {
    case "string":
    case "number":
      h = true;
      break;
    case "object":
      switch (a.$$typeof) {
        case l$1:
        case n$3:
          h = true;
      }
  }
  if (h) return h = a, c4 = c4(h), a = "" === d ? "." + Q$1(h, 0) : d, I$1(c4) ? (e2 = "", null != a && (e2 = a.replace(P$1, "$&/") + "/"), R$1(c4, b, e2, "", function(a2) {
    return a2;
  })) : null != c4 && (O$1(c4) && (c4 = N$1(c4, e2 + (!c4.key || h && h.key === c4.key ? "" : ("" + c4.key).replace(P$1, "$&/") + "/") + a)), b.push(c4)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I$1(a)) for (var g = 0; g < a.length; g++) {
    k2 = a[g];
    var f2 = d + Q$1(k2, g);
    h += R$1(k2, b, e2, f2, c4);
  }
  else if (f2 = A$1(a), "function" === typeof f2) for (a = f2.call(a), g = 0; !(k2 = a.next()).done; ) k2 = k2.value, f2 = d + Q$1(k2, g++), h += R$1(k2, b, e2, f2, c4);
  else if ("object" === k2) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$1(a, b, e2) {
  if (null == a) return a;
  var d = [], c4 = 0;
  R$1(a, d, "", "", function(a2) {
    return b.call(e2, a2, c4++);
  });
  return d;
}
function T$1(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
    }, function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status) return a._result.default;
  throw a._result;
}
var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
function X$1() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$1, forEach: function(a, b, e2) {
  S$1(a, function() {
    b.apply(this, arguments);
  }, e2);
}, count: function(a) {
  var b = 0;
  S$1(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S$1(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$1(a)) throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$4;
react_production_min.Profiler = r;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q$1;
react_production_min.Suspense = w;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
react_production_min.act = X$1;
react_production_min.cloneElement = function(a, b, e2) {
  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C$1({}, a.props), c4 = a.key, k2 = a.ref, h = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k2 = b.ref, h = K$1.current);
    void 0 !== b.key && (c4 = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
    for (f2 in b) J.call(b, f2) && !L$1.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2) d.children = e2;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++) g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l$1, type: a.type, key: c4, ref: k2, props: d, _owner: h };
};
react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t$1, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = M$2;
react_production_min.createFactory = function(a) {
  var b = M$2.bind(null, a);
  b.type = a;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: v$1, render: a };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a) {
  return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
};
react_production_min.memo = function(a, b) {
  return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
};
react_production_min.startTransition = function(a) {
  var b = V$1.transition;
  V$1.transition = {};
  try {
    a();
  } finally {
    V$1.transition = b;
  }
};
react_production_min.unstable_act = X$1;
react_production_min.useCallback = function(a, b) {
  return U$1.current.useCallback(a, b);
};
react_production_min.useContext = function(a) {
  return U$1.current.useContext(a);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a) {
  return U$1.current.useDeferredValue(a);
};
react_production_min.useEffect = function(a, b) {
  return U$1.current.useEffect(a, b);
};
react_production_min.useId = function() {
  return U$1.current.useId();
};
react_production_min.useImperativeHandle = function(a, b, e2) {
  return U$1.current.useImperativeHandle(a, b, e2);
};
react_production_min.useInsertionEffect = function(a, b) {
  return U$1.current.useInsertionEffect(a, b);
};
react_production_min.useLayoutEffect = function(a, b) {
  return U$1.current.useLayoutEffect(a, b);
};
react_production_min.useMemo = function(a, b) {
  return U$1.current.useMemo(a, b);
};
react_production_min.useReducer = function(a, b, e2) {
  return U$1.current.useReducer(a, b, e2);
};
react_production_min.useRef = function(a) {
  return U$1.current.useRef(a);
};
react_production_min.useState = function(a) {
  return U$1.current.useState(a);
};
react_production_min.useSyncExternalStore = function(a, b, e2) {
  return U$1.current.useSyncExternalStore(a, b, e2);
};
react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React$2 = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f$2 = reactExports, k$2 = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n$2 = f$2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$3 = { key: true, ref: true, __self: true, __source: true };
function q(c4, a, g) {
  var b, d = {}, e2 = null, h = null;
  void 0 !== g && (e2 = "" + g);
  void 0 !== a.key && (e2 = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a) m$1.call(a, b) && !p$3.hasOwnProperty(b) && (d[b] = a[b]);
  if (c4 && c4.defaultProps) for (b in a = c4.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k$2, type: c4, key: e2, ref: h, props: d, _owner: n$2.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a, b) {
    var c4 = a.length;
    a.push(b);
    a: for (; 0 < c4; ) {
      var d = c4 - 1 >>> 1, e2 = a[d];
      if (0 < g(e2, b)) a[d] = b, a[c4] = e2, c4 = d;
      else break a;
    }
  }
  function h(a) {
    return 0 === a.length ? null : a[0];
  }
  function k2(a) {
    if (0 === a.length) return null;
    var b = a[0], c4 = a.pop();
    if (c4 !== b) {
      a[0] = c4;
      a: for (var d = 0, e2 = a.length, w2 = e2 >>> 1; d < w2; ) {
        var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
        if (0 > g(C2, c4)) n2 < e2 && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c4, d = n2) : (a[d] = C2, a[m2] = c4, d = m2);
        else if (n2 < e2 && 0 > g(x2, c4)) a[d] = x2, a[n2] = c4, d = n2;
        else break a;
      }
    }
    return b;
  }
  function g(a, b) {
    var c4 = a.sortIndex - b.sortIndex;
    return 0 !== c4 ? c4 : a.id - b.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a) {
    for (var b = h(t2); null !== b; ) {
      if (null === b.callback) k2(t2);
      else if (b.startTime <= a) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
      else break;
      b = h(t2);
    }
  }
  function H2(a) {
    B2 = false;
    G2(a);
    if (!A2) if (null !== h(r2)) A2 = true, I2(J2);
    else {
      var b = h(t2);
      null !== b && K2(H2, b.startTime - a);
    }
  }
  function J2(a, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c4 = y2;
    try {
      G2(b);
      for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
        var d = v2.callback;
        if ("function" === typeof d) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e2 = d(v2.expirationTime <= b);
          b = exports.unstable_now();
          "function" === typeof e2 ? v2.callback = e2 : v2 === h(r2) && k2(r2);
          G2(b);
        } else k2(r2);
        v2 = h(r2);
      }
      if (null !== v2) var w2 = true;
      else {
        var m2 = h(t2);
        null !== m2 && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c4, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a = exports.unstable_now();
      Q2 = a;
      var b = true;
      try {
        b = O2(true, a);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else N2 = false;
  }
  var S2;
  if ("function" === typeof F2) S2 = function() {
    F2(R2);
  };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else S2 = function() {
    D2(R2, 0);
  };
  function I2(a) {
    O2 = a;
    N2 || (N2 = true, S2());
  }
  function K2(a, b) {
    L2 = D2(function() {
      a(exports.unstable_now());
    }, b);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h(r2);
  };
  exports.unstable_next = function(a) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c4 = y2;
    y2 = b;
    try {
      return a();
    } finally {
      y2 = c4;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c4 = y2;
    y2 = a;
    try {
      return b();
    } finally {
      y2 = c4;
    }
  };
  exports.unstable_scheduleCallback = function(a, b, c4) {
    var d = exports.unstable_now();
    "object" === typeof c4 && null !== c4 ? (c4 = c4.delay, c4 = "number" === typeof c4 && 0 < c4 ? d + c4 : d) : c4 = d;
    switch (a) {
      case 1:
        var e2 = -1;
        break;
      case 2:
        e2 = 250;
        break;
      case 5:
        e2 = 1073741823;
        break;
      case 4:
        e2 = 1e4;
        break;
      default:
        e2 = 5e3;
    }
    e2 = c4 + e2;
    a = { id: u2++, callback: b, priorityLevel: a, startTime: c4, expirationTime: e2, sortIndex: -1 };
    c4 > d ? (a.sortIndex = c4, f2(t2, a), null === h(r2) && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c4 - d))) : (a.sortIndex = e2, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
    return a;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a) {
    var b = y2;
    return function() {
      var c4 = y2;
      y2 = b;
      try {
        return a.apply(this, arguments);
      } finally {
        y2 = c4;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p$2(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c4 = 1; c4 < arguments.length; c4++) b += "&args[]=" + encodeURIComponent(arguments[c4]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a, b) {
  ha(a, b);
  ha(a + "Capture", b);
}
function ha(a, b) {
  ea[a] = b;
  for (a = 0; a < b.length; a++) da.add(b[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a) {
  if (ja.call(ma, a)) return true;
  if (ja.call(la, a)) return false;
  if (ka.test(a)) return ma[a] = true;
  la[a] = true;
  return false;
}
function pa(a, b, c4, d) {
  if (null !== c4 && 0 === c4.type) return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d) return false;
      if (null !== c4) return !c4.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function qa(a, b, c4, d) {
  if (null === b || "undefined" === typeof b || pa(a, b, c4, d)) return true;
  if (d) return false;
  if (null !== c4) switch (c4.type) {
    case 3:
      return !b;
    case 4:
      return false === b;
    case 5:
      return isNaN(b);
    case 6:
      return isNaN(b) || 1 > b;
  }
  return false;
}
function v(a, b, c4, d, e2, f2, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e2;
  this.mustUseProperty = c4;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z[a] = new v(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b = a[0];
  z[b] = new v(b, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z[a] = new v(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z[a] = new v(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z[a] = new v(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z[a] = new v(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b = a.replace(
    ra,
    sa
  );
  z[b] = new v(b, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
});
z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
});
function ta(a, b, c4, d) {
  var e2 = z.hasOwnProperty(b) ? z[b] : null;
  if (null !== e2 ? 0 !== e2.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c4, e2, d) && (c4 = null), d || null === e2 ? oa(b) && (null === c4 ? a.removeAttribute(b) : a.setAttribute(b, "" + c4)) : e2.mustUseProperty ? a[e2.propertyName] = null === c4 ? 3 === e2.type ? false : "" : c4 : (b = e2.attributeName, d = e2.attributeNamespace, null === c4 ? a.removeAttribute(b) : (e2 = e2.type, c4 = 3 === e2 || 4 === e2 && true === c4 ? "" : "" + c4, d ? a.setAttributeNS(d, b, c4) : a.setAttribute(b, c4)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a) return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A = Object.assign, La;
function Ma(a) {
  if (void 0 === La) try {
    throw Error();
  } catch (c4) {
    var b = c4.stack.trim().match(/\n( *(at )?)/);
    La = b && b[1] || "";
  }
  return "\n" + La + a;
}
var Na = false;
function Oa(a, b) {
  if (!a || Na) return "";
  Na = true;
  var c4 = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b) if (b = function() {
      throw Error();
    }, Object.defineProperty(b.prototype, "props", { set: function() {
      throw Error();
    } }), "object" === typeof Reflect && Reflect.construct) {
      try {
        Reflect.construct(b, []);
      } catch (l2) {
        var d = l2;
      }
      Reflect.construct(a, [], b);
    } else {
      try {
        b.call();
      } catch (l2) {
        d = l2;
      }
      a.call(b.prototype);
    }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a();
    }
  } catch (l2) {
    if (l2 && d && "string" === typeof l2.stack) {
      for (var e2 = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e2.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e2[g] !== f2[h]; ) h--;
      for (; 1 <= g && 0 <= h; g--, h--) if (e2[g] !== f2[h]) {
        if (1 !== g || 1 !== h) {
          do
            if (g--, h--, 0 > h || e2[g] !== f2[h]) {
              var k2 = "\n" + e2[g].replace(" at new ", " at ");
              a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
              return k2;
            }
          while (1 <= g && 0 <= h);
        }
        break;
      }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c4;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, false), a;
    case 11:
      return a = Oa(a.type.render, false), a;
    case 1:
      return a = Oa(a.type, true), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a) switch (a.$$typeof) {
    case Ca:
      return (a.displayName || "Context") + ".Consumer";
    case Ba:
      return (a._context.displayName || "Context") + ".Provider";
    case Da:
      var b = a.render;
      a = a.displayName;
      a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      return a;
    case Ga:
      return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
    case Ha:
      b = a._payload;
      a = a._init;
      try {
        return Qa(a(b));
      } catch (c4) {
      }
  }
  return null;
}
function Ra(a) {
  var b = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b) return b.displayName || b.name || null;
      if ("string" === typeof b) return b;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value", c4 = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
  if (!a.hasOwnProperty(b) && "undefined" !== typeof c4 && "function" === typeof c4.get && "function" === typeof c4.set) {
    var e2 = c4.get, f2 = c4.set;
    Object.defineProperty(a, b, { configurable: true, get: function() {
      return e2.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f2.call(this, a2);
    } });
    Object.defineProperty(a, b, { enumerable: c4.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a) return false;
  var b = a._valueTracker;
  if (!b) return true;
  var c4 = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c4 ? (b.setValue(a), true) : false;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c4 = b.checked;
  return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c4 ? c4 : a._wrapperState.initialChecked });
}
function Za(a, b) {
  var c4 = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
  c4 = Sa(null != b.value ? b.value : c4);
  a._wrapperState = { initialChecked: d, initialValue: c4, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function ab(a, b) {
  b = b.checked;
  null != b && ta(a, "checked", b, false);
}
function bb(a, b) {
  ab(a, b);
  var c4 = Sa(b.value), d = b.type;
  if (null != c4) if ("number" === d) {
    if (0 === c4 && "" === a.value || a.value != c4) a.value = "" + c4;
  } else a.value !== "" + c4 && (a.value = "" + c4);
  else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a, b.type, c4) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function db(a, b, c4) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c4 || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c4 = a.name;
  "" !== c4 && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c4 && (a.name = c4);
}
function cb(a, b, c4) {
  if ("number" !== b || Xa(a.ownerDocument) !== a) null == c4 ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c4 && (a.defaultValue = "" + c4);
}
var eb = Array.isArray;
function fb(a, b, c4, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e2 = 0; e2 < c4.length; e2++) b["$" + c4[e2]] = true;
    for (c4 = 0; c4 < a.length; c4++) e2 = b.hasOwnProperty("$" + a[c4].value), a[c4].selected !== e2 && (a[c4].selected = e2), e2 && d && (a[c4].defaultSelected = true);
  } else {
    c4 = "" + Sa(c4);
    b = null;
    for (e2 = 0; e2 < a.length; e2++) {
      if (a[e2].value === c4) {
        a[e2].selected = true;
        d && (a[e2].defaultSelected = true);
        return;
      }
      null !== b || a[e2].disabled || (b = a[e2]);
    }
    null !== b && (b.selected = true);
  }
}
function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(p$2(91));
  return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b) {
  var c4 = b.value;
  if (null == c4) {
    c4 = b.children;
    b = b.defaultValue;
    if (null != c4) {
      if (null != b) throw Error(p$2(92));
      if (eb(c4)) {
        if (1 < c4.length) throw Error(p$2(93));
        c4 = c4[0];
      }
      b = c4;
    }
    null == b && (b = "");
    c4 = b;
  }
  a._wrapperState = { initialValue: Sa(c4) };
}
function ib(a, b) {
  var c4 = Sa(b.value), d = Sa(b.defaultValue);
  null != c4 && (c4 = "" + c4, c4 !== a.value && (a.value = c4), null == b.defaultValue && a.defaultValue !== c4 && (a.defaultValue = c4));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var mb, nb = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c4, d, e2) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b, c4, d, e2);
    });
  } : a;
}(function(a, b) {
  if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
    for (; b.firstChild; ) a.appendChild(b.firstChild);
  }
});
function ob(a, b) {
  if (b) {
    var c4 = a.firstChild;
    if (c4 && c4 === a.lastChild && 3 === c4.nodeType) {
      c4.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a) {
  qb.forEach(function(b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b] = pb[a];
  });
});
function rb(a, b, c4) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c4 || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
}
function sb(a, b) {
  a = a.style;
  for (var c4 in b) if (b.hasOwnProperty(c4)) {
    var d = 0 === c4.indexOf("--"), e2 = rb(c4, b[c4], d);
    "float" === c4 && (c4 = "cssFloat");
    d ? a.setProperty(c4, e2) : a[c4] = e2;
  }
}
var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a, b) {
  if (b) {
    if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p$2(137, a));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(p$2(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p$2(61));
    }
    if (null != b.style && "object" !== typeof b.style) throw Error(p$2(62));
  }
}
function vb(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb) throw Error(p$2(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb() {
}
var Ib = false;
function Jb(a, b, c4) {
  if (Ib) return a(b, c4);
  Ib = true;
  try {
    return Gb(a, b, c4);
  } finally {
    if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a, b) {
  var c4 = a.stateNode;
  if (null === c4) return null;
  var d = Db(c4);
  if (null === d) return null;
  c4 = d[b];
  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;
    default:
      a = false;
  }
  if (a) return null;
  if (c4 && "function" !== typeof c4) throw Error(p$2(231, b, typeof c4));
  return c4;
}
var Lb = false;
if (ia) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", { get: function() {
    Lb = true;
  } });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a) {
  Lb = false;
}
function Nb(a, b, c4, d, e2, f2, g, h, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c4, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
  Ob = true;
  Pb = a;
} };
function Tb(a, b, c4, d, e2, f2, g, h, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b, c4, d, e2, f2, g, h, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else throw Error(p$2(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a) {
  var b = a, c4 = a;
  if (a.alternate) for (; b.return; ) b = b.return;
  else {
    a = b;
    do
      b = a, 0 !== (b.flags & 4098) && (c4 = b.return), a = b.return;
    while (a);
  }
  return 3 === b.tag ? c4 : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b) return b.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a) throw Error(p$2(188));
}
function Yb(a) {
  var b = a.alternate;
  if (!b) {
    b = Vb(a);
    if (null === b) throw Error(p$2(188));
    return b !== a ? null : a;
  }
  for (var c4 = a, d = b; ; ) {
    var e2 = c4.return;
    if (null === e2) break;
    var f2 = e2.alternate;
    if (null === f2) {
      d = e2.return;
      if (null !== d) {
        c4 = d;
        continue;
      }
      break;
    }
    if (e2.child === f2.child) {
      for (f2 = e2.child; f2; ) {
        if (f2 === c4) return Xb(e2), a;
        if (f2 === d) return Xb(e2), b;
        f2 = f2.sibling;
      }
      throw Error(p$2(188));
    }
    if (c4.return !== d.return) c4 = e2, d = f2;
    else {
      for (var g = false, h = e2.child; h; ) {
        if (h === c4) {
          g = true;
          c4 = e2;
          d = f2;
          break;
        }
        if (h === d) {
          g = true;
          d = e2;
          c4 = f2;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f2.child; h; ) {
          if (h === c4) {
            g = true;
            c4 = f2;
            d = e2;
            break;
          }
          if (h === d) {
            g = true;
            d = f2;
            c4 = e2;
            break;
          }
          h = h.sibling;
        }
        if (!g) throw Error(p$2(189));
      }
    }
    if (c4.alternate !== d) throw Error(p$2(190));
  }
  if (3 !== c4.tag) throw Error(p$2(188));
  return c4.stateNode.current === c4 ? a : b;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag) return a;
  for (a = a.child; null !== a; ) {
    var b = $b(a);
    if (null !== b) return b;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
  } catch (b) {
  }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b) {
  var c4 = a.pendingLanes;
  if (0 === c4) return 0;
  var d = 0, e2 = a.suspendedLanes, f2 = a.pingedLanes, g = c4 & 268435455;
  if (0 !== g) {
    var h = g & ~e2;
    0 !== h ? d = tc(h) : (f2 &= g, 0 !== f2 && (d = tc(f2)));
  } else g = c4 & ~e2, 0 !== g ? d = tc(g) : 0 !== f2 && (d = tc(f2));
  if (0 === d) return 0;
  if (0 !== b && b !== d && 0 === (b & e2) && (e2 = d & -d, f2 = b & -b, e2 >= f2 || 16 === e2 && 0 !== (f2 & 4194240))) return b;
  0 !== (d & 4) && (d |= c4 & 16);
  b = a.entangledLanes;
  if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c4 = 31 - oc(b), e2 = 1 << c4, d |= a[c4], b &= ~e2;
  return d;
}
function vc(a, b) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b) {
  for (var c4 = a.suspendedLanes, d = a.pingedLanes, e2 = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
    var g = 31 - oc(f2), h = 1 << g, k2 = e2[g];
    if (-1 === k2) {
      if (0 === (h & c4) || 0 !== (h & d)) e2[g] = vc(h, b);
    } else k2 <= b && (a.expiredLanes |= h);
    f2 &= ~h;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b = [], c4 = 0; 31 > c4; c4++) b.push(a);
  return b;
}
function Ac(a, b, c4) {
  a.pendingLanes |= b;
  536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b = 31 - oc(b);
  a[b] = c4;
}
function Bc(a, b) {
  var c4 = a.pendingLanes & ~b;
  a.pendingLanes = b;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b;
  a.mutableReadLanes &= b;
  a.entangledLanes &= b;
  b = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c4; ) {
    var e2 = 31 - oc(c4), f2 = 1 << e2;
    b[e2] = 0;
    d[e2] = -1;
    a[e2] = -1;
    c4 &= ~f2;
  }
}
function Cc(a, b) {
  var c4 = a.entangledLanes |= b;
  for (a = a.entanglements; c4; ) {
    var d = 31 - oc(c4), e2 = 1 << d;
    e2 & b | a[d] & b && (a[d] |= b);
    c4 &= ~e2;
  }
}
var C = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a, b, c4, d, e2, f2) {
  if (null === a || a.nativeEvent !== f2) return a = { blockedOn: b, domEventName: c4, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e2] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e2 && -1 === b.indexOf(e2) && b.push(e2);
  return a;
}
function Uc(a, b, c4, d, e2) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a, b, c4, d, e2), true;
    case "dragenter":
      return Mc = Tc(Mc, a, b, c4, d, e2), true;
    case "mouseover":
      return Nc = Tc(Nc, a, b, c4, d, e2), true;
    case "pointerover":
      var f2 = e2.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a, b, c4, d, e2));
      return true;
    case "gotpointercapture":
      return f2 = e2.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b, c4, d, e2)), true;
  }
  return false;
}
function Vc(a) {
  var b = Wc(a.target);
  if (null !== b) {
    var c4 = Vb(b);
    if (null !== c4) {
      if (b = c4.tag, 13 === b) {
        if (b = Wb(c4), null !== b) {
          a.blockedOn = b;
          Ic(a.priority, function() {
            Gc(c4);
          });
          return;
        }
      } else if (3 === b && c4.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = 3 === c4.tag ? c4.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn) return false;
  for (var b = a.targetContainers; 0 < b.length; ) {
    var c4 = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null === c4) {
      c4 = a.nativeEvent;
      var d = new c4.constructor(c4.type, c4);
      wb = d;
      c4.target.dispatchEvent(d);
      wb = null;
    } else return b = Cb(c4), null !== b && Fc(b), a.blockedOn = c4, false;
    b.shift();
  }
  return true;
}
function Zc(a, b, c4) {
  Xc(a) && c4.delete(b);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b) {
  a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b(b2) {
    return ad(b2, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c4 = 1; c4 < Kc.length; c4++) {
      var d = Kc[c4];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c4 = 0; c4 < Qc.length; c4++) d = Qc[c4], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Qc.length && (c4 = Qc[0], null === c4.blockedOn); ) Vc(c4), null === c4.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a, b, c4, d) {
  var e2 = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a, b, c4, d);
  } finally {
    C = e2, cd.transition = f2;
  }
}
function gd(a, b, c4, d) {
  var e2 = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a, b, c4, d);
  } finally {
    C = e2, cd.transition = f2;
  }
}
function fd(a, b, c4, d) {
  if (dd) {
    var e2 = Yc(a, b, c4, d);
    if (null === e2) hd(a, b, d, id, c4), Sc(a, d);
    else if (Uc(e2, a, b, c4, d)) d.stopPropagation();
    else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e2; ) {
        var f2 = Cb(e2);
        null !== f2 && Ec(f2);
        f2 = Yc(a, b, c4, d);
        null === f2 && hd(a, b, d, id, c4);
        if (f2 === e2) break;
        e2 = f2;
      }
      null !== e2 && d.stopPropagation();
    } else hd(a, b, d, null, c4);
  }
}
var id = null;
function Yc(a, b, c4, d) {
  id = null;
  a = xb(d);
  a = Wc(a);
  if (null !== a) if (b = Vb(a), null === b) a = null;
  else if (c4 = b.tag, 13 === c4) {
    a = Wb(b);
    if (null !== a) return a;
    a = null;
  } else if (3 === c4) {
    if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
    a = null;
  } else b !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md) return md;
  var a, b = ld, c4 = b.length, d, e2 = "value" in kd ? kd.value : kd.textContent, f2 = e2.length;
  for (a = 0; a < c4 && b[a] === e2[a]; a++) ;
  var g = c4 - a;
  for (d = 1; d <= g && b[c4 - d] === e2[f2 - d]; d++) ;
  return md = e2.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b(b2, d, e2, f2, g) {
    this._reactName = b2;
    this._targetInst = e2;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g;
    this.currentTarget = null;
    for (var c4 in a) a.hasOwnProperty(c4) && (b2 = a[c4], this[c4] = b2 ? b2(f2) : f2[c4]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a) return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
}
function zd() {
  return Pd;
}
var Qd = A({}, ud, { key: function(a) {
  if (a.key) {
    var b = Md[a.key] || a.key;
    if ("Unidentified" !== b) return b;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie = false;
function je(a, b) {
  switch (a) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (32 !== b.which) return null;
      fe = true;
      return ee;
    case "textInput":
      return a = b.data, a === ee && fe ? null : a;
    default:
      return null;
  }
}
function ke(a, b) {
  if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
}
function ne(a, b, c4, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c4 = new td("onChange", "change", null, c4, d), a.push({ event: c4, listeners: b }));
}
var pe = null, qe = null;
function re(a) {
  se(a, 0);
}
function te(a) {
  var b = ue(a);
  if (Wa(b)) return a;
}
function ve(a, b) {
  if ("change" === a) return b;
}
var we = false;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a) {
  if ("value" === a.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a, xb(a));
    Jb(re, b);
  }
}
function Ce(a, b, c4) {
  "focusin" === a ? (Ae(), pe = b, qe = c4, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
}
function De(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
}
function Ee(a, b) {
  if ("click" === a) return te(b);
}
function Fe(a, b) {
  if ("input" === a || "change" === a) return te(b);
}
function Ge(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a, b) {
  if (He(a, b)) return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
  var c4 = Object.keys(a), d = Object.keys(b);
  if (c4.length !== d.length) return false;
  for (d = 0; d < c4.length; d++) {
    var e2 = c4[d];
    if (!ja.call(b, e2) || !He(a[e2], b[e2])) return false;
  }
  return true;
}
function Je(a) {
  for (; a && a.firstChild; ) a = a.firstChild;
  return a;
}
function Ke(a, b) {
  var c4 = Je(a);
  a = 0;
  for (var d; c4; ) {
    if (3 === c4.nodeType) {
      d = a + c4.textContent.length;
      if (a <= b && d >= b) return { node: c4, offset: b - a };
      a = d;
    }
    a: {
      for (; c4; ) {
        if (c4.nextSibling) {
          c4 = c4.nextSibling;
          break a;
        }
        c4 = c4.parentNode;
      }
      c4 = void 0;
    }
    c4 = Je(c4);
  }
}
function Le(a, b) {
  return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
}
function Me() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
    try {
      var c4 = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c4 = false;
    }
    if (c4) a = b.contentWindow;
    else break;
    b = Xa(a.document);
  }
  return b;
}
function Ne(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
function Oe(a) {
  var b = Me(), c4 = a.focusedElem, d = a.selectionRange;
  if (b !== c4 && c4 && c4.ownerDocument && Le(c4.ownerDocument.documentElement, c4)) {
    if (null !== d && Ne(c4)) {
      if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c4) c4.selectionStart = b, c4.selectionEnd = Math.min(a, c4.value.length);
      else if (a = (b = c4.ownerDocument || document) && b.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e2 = c4.textContent.length, f2 = Math.min(d.start, e2);
        d = void 0 === d.end ? f2 : Math.min(d.end, e2);
        !a.extend && f2 > d && (e2 = d, d = f2, f2 = e2);
        e2 = Ke(c4, f2);
        var g = Ke(
          c4,
          d
        );
        e2 && g && (1 !== a.rangeCount || a.anchorNode !== e2.node || a.anchorOffset !== e2.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e2.node, e2.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
      }
    }
    b = [];
    for (a = c4; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    "function" === typeof c4.focus && c4.focus();
    for (c4 = 0; c4 < b.length; c4++) a = b[c4], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a, b, c4) {
  var d = c4.window === c4 ? c4.document : 9 === c4.nodeType ? c4 : c4.ownerDocument;
  Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c4), a.push({ event: b, listeners: d }), b.target = Qe)));
}
function Ve(a, b) {
  var c4 = {};
  c4[a.toLowerCase()] = b.toLowerCase();
  c4["Webkit" + a] = "webkit" + b;
  c4["Moz" + a] = "moz" + b;
  return c4;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a) {
  if (Xe[a]) return Xe[a];
  if (!We[a]) return a;
  var b = We[a], c4;
  for (c4 in b) if (b.hasOwnProperty(c4) && c4 in Ye) return Xe[a] = b[c4];
  return a;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b) {
  df.set(a, b);
  fa(b, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b, c4) {
  var d = a.type || "unknown-event";
  a.currentTarget = c4;
  Ub(d, b, void 0, a);
  a.currentTarget = null;
}
function se(a, b) {
  b = 0 !== (b & 4);
  for (var c4 = 0; c4 < a.length; c4++) {
    var d = a[c4], e2 = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b) for (var g = d.length - 1; 0 <= g; g--) {
        var h = d[g], k2 = h.instance, l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e2.isPropagationStopped()) break a;
        nf(e2, h, l2);
        f2 = k2;
      }
      else for (g = 0; g < d.length; g++) {
        h = d[g];
        k2 = h.instance;
        l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e2.isPropagationStopped()) break a;
        nf(e2, h, l2);
        f2 = k2;
      }
    }
  }
  if (Qb) throw a = Rb, Qb = false, Rb = null, a;
}
function D(a, b) {
  var c4 = b[of];
  void 0 === c4 && (c4 = b[of] = /* @__PURE__ */ new Set());
  var d = a + "__bubble";
  c4.has(d) || (pf(b, a, 2, false), c4.add(d));
}
function qf(a, b, c4) {
  var d = 0;
  b && (d |= 4);
  pf(c4, a, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = true;
    da.forEach(function(b2) {
      "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
    });
    var b = 9 === a.nodeType ? a : a.ownerDocument;
    null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a, b, c4, d) {
  switch (jd(b)) {
    case 1:
      var e2 = ed;
      break;
    case 4:
      e2 = gd;
      break;
    default:
      e2 = fd;
  }
  c4 = e2.bind(null, b, c4, a);
  e2 = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e2 = true);
  d ? void 0 !== e2 ? a.addEventListener(b, c4, { capture: true, passive: e2 }) : a.addEventListener(b, c4, true) : void 0 !== e2 ? a.addEventListener(b, c4, { passive: e2 }) : a.addEventListener(b, c4, false);
}
function hd(a, b, c4, d, e2) {
  var f2 = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
    if (null === d) return;
    var g = d.tag;
    if (3 === g || 4 === g) {
      var h = d.stateNode.containerInfo;
      if (h === e2 || 8 === h.nodeType && h.parentNode === e2) break;
      if (4 === g) for (g = d.return; null !== g; ) {
        var k2 = g.tag;
        if (3 === k2 || 4 === k2) {
          if (k2 = g.stateNode.containerInfo, k2 === e2 || 8 === k2.nodeType && k2.parentNode === e2) return;
        }
        g = g.return;
      }
      for (; null !== h; ) {
        g = Wc(h);
        if (null === g) return;
        k2 = g.tag;
        if (5 === k2 || 6 === k2) {
          d = f2 = g;
          continue a;
        }
        h = h.parentNode;
      }
    }
    d = d.return;
  }
  Jb(function() {
    var d2 = f2, e3 = xb(c4), g2 = [];
    a: {
      var h2 = df.get(a);
      if (void 0 !== h2) {
        var k3 = td, n2 = a;
        switch (a) {
          case "keypress":
            if (0 === od(c4)) break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c4.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
        t2 = [];
        for (var w2 = d2, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2) break;
          w2 = w2.return;
        }
        0 < t2.length && (h2 = new k3(h2, n2, null, c4, e3), g2.push({ event: h2, listeners: t2 }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h2 = "mouseover" === a || "pointerover" === a;
        k3 = "mouseout" === a || "pointerout" === a;
        if (h2 && c4 !== wb && (n2 = c4.relatedTarget || c4.fromElement) && (Wc(n2) || n2[uf])) break a;
        if (k3 || h2) {
          h2 = e3.window === e3 ? e3 : (h2 = e3.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k3) {
            if (n2 = c4.relatedTarget || c4.toElement, k3 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
          } else k3 = null, n2 = d2;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a || "pointerover" === a) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h2 : ue(k3);
            u2 = null == n2 ? h2 : ue(n2);
            h2 = new t2(F2, w2 + "leave", k3, c4, e3);
            h2.target = J2;
            h2.relatedTarget = u2;
            F2 = null;
            Wc(e3) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c4, e3), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2) b: {
              t2 = k3;
              x2 = n2;
              w2 = 0;
              for (u2 = t2; u2; u2 = vf(u2)) w2++;
              u2 = 0;
              for (F2 = x2; F2; F2 = vf(F2)) u2++;
              for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
              for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
              for (; w2--; ) {
                if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                t2 = vf(t2);
                x2 = vf(x2);
              }
              t2 = null;
            }
            else t2 = null;
            null !== k3 && wf(g2, h2, k3, t2, false);
            null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
          }
        }
      }
      a: {
        h2 = d2 ? ue(d2) : window;
        k3 = h2.nodeName && h2.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h2.type) var na = ve;
        else if (me(h2)) if (we) na = Fe;
        else {
          na = De;
          var xa = Ce;
        }
        else (k3 = h2.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
        if (na && (na = na(a, d2))) {
          ne(g2, na, c4, e3);
          break a;
        }
        xa && xa(a, h2, d2);
        "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
      }
      xa = d2 ? ue(d2) : window;
      switch (a) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g2, c4, e3);
          break;
        case "selectionchange":
          if (Pe) break;
        case "keydown":
        case "keyup":
          Ue(g2, c4, e3);
      }
      var $a;
      if (ae) b: {
        switch (a) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      }
      else ie ? ge(a, c4) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c4.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c4.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e3, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c4, e3), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c4), null !== $a && (ba.data = $a))));
      if ($a = ce ? je(a, c4) : ke(a, c4)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e3 = new Ld("onBeforeInput", "beforeinput", null, c4, e3), g2.push({ event: e3, listeners: d2 }), e3.data = $a);
    }
    se(g2, b);
  });
}
function tf(a, b, c4) {
  return { instance: a, listener: b, currentTarget: c4 };
}
function oe(a, b) {
  for (var c4 = b + "Capture", d = []; null !== a; ) {
    var e2 = a, f2 = e2.stateNode;
    5 === e2.tag && null !== f2 && (e2 = f2, f2 = Kb(a, c4), null != f2 && d.unshift(tf(a, f2, e2)), f2 = Kb(a, b), null != f2 && d.push(tf(a, f2, e2)));
    a = a.return;
  }
  return d;
}
function vf(a) {
  if (null === a) return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b, c4, d, e2) {
  for (var f2 = b._reactName, g = []; null !== c4 && c4 !== d; ) {
    var h = c4, k2 = h.alternate, l2 = h.stateNode;
    if (null !== k2 && k2 === d) break;
    5 === h.tag && null !== l2 && (h = l2, e2 ? (k2 = Kb(c4, f2), null != k2 && g.unshift(tf(c4, k2, h))) : e2 || (k2 = Kb(c4, f2), null != k2 && g.push(tf(c4, k2, h))));
    c4 = c4.return;
  }
  0 !== g.length && a.push({ event: b, listeners: g });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b, c4) {
  b = zf(b);
  if (zf(a) !== b && c4) throw Error(p$2(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a, b) {
  return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
  return Hf.resolve(null).then(a).catch(If);
} : Ff;
function If(a) {
  setTimeout(function() {
    throw a;
  });
}
function Kf(a, b) {
  var c4 = b, d = 0;
  do {
    var e2 = c4.nextSibling;
    a.removeChild(c4);
    if (e2 && 8 === e2.nodeType) if (c4 = e2.data, "/$" === c4) {
      if (0 === d) {
        a.removeChild(e2);
        bd(b);
        return;
      }
      d--;
    } else "$" !== c4 && "$?" !== c4 && "$!" !== c4 || d++;
    c4 = e2;
  } while (c4);
  bd(b);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b) break;
    if (8 === b) {
      b = a.data;
      if ("$" === b || "$!" === b || "$?" === b) break;
      if ("/$" === b) return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b = 0; a; ) {
    if (8 === a.nodeType) {
      var c4 = a.data;
      if ("$" === c4 || "$!" === c4 || "$?" === c4) {
        if (0 === b) return a;
        b--;
      } else "/$" === c4 && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b = a[Of];
  if (b) return b;
  for (var c4 = a.parentNode; c4; ) {
    if (b = c4[uf] || c4[Of]) {
      c4 = b.alternate;
      if (null !== b.child || null !== c4 && null !== c4.child) for (a = Mf(a); null !== a; ) {
        if (c4 = a[Of]) return c4;
        a = Mf(a);
      }
      return b;
    }
    a = c4;
    c4 = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(p$2(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a) {
  return { current: a };
}
function E(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a, b) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a, b) {
  var c4 = a.type.contextTypes;
  if (!c4) return Vf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e2 = {}, f2;
  for (f2 in c4) e2[f2] = b[f2];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e2);
  return e2;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E(Wf);
  E(H);
}
function ag(a, b, c4) {
  if (H.current !== Vf) throw Error(p$2(168));
  G(H, b);
  G(Wf, c4);
}
function bg(a, b, c4) {
  var d = a.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c4;
  d = d.getChildContext();
  for (var e2 in d) if (!(e2 in b)) throw Error(p$2(108, Ra(a) || "Unknown", e2));
  return A({}, c4, d);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G(H, a);
  G(Wf, Wf.current);
  return true;
}
function dg(a, b, c4) {
  var d = a.stateNode;
  if (!d) throw Error(p$2(169));
  c4 ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
  G(Wf, c4);
}
var eg = null, fg = false, gg = false;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = true;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a = 0, b = C;
    try {
      var c4 = eg;
      for (C = 1; a < c4.length; a++) {
        var d = c4[a];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e2) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e2;
    } finally {
      C = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b;
}
function ug(a, b, c4) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d = rg;
  a = sg;
  var e2 = 32 - oc(d) - 1;
  d &= ~(1 << e2);
  c4 += 1;
  var f2 = 32 - oc(b) + e2;
  if (30 < f2) {
    var g = e2 - e2 % 5;
    f2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e2 -= g;
    rg = 1 << 32 - oc(b) + e2 | c4 << e2 | d;
    sg = f2 + a;
  } else rg = 1 << f2 | c4 << e2 | d, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a, b) {
  var c4 = Bg(5, null, null, 0);
  c4.elementType = "DELETED";
  c4.stateNode = b;
  c4.return = a;
  b = a.deletions;
  null === b ? (a.deletions = [c4], a.flags |= 16) : b.push(c4);
}
function Cg(a, b) {
  switch (a.tag) {
    case 5:
      var c4 = a.type;
      b = 1 !== b.nodeType || c4.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c4 = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c4, retryLane: 1073741824 }, c4 = Bg(18, null, null, 0), c4.stateNode = b, c4.return = a, a.child = c4, xg = a, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I) {
    var b = yg;
    if (b) {
      var c4 = b;
      if (!Cg(a, b)) {
        if (Dg(a)) throw Error(p$2(418));
        b = Lf(c4.nextSibling);
        var d = xg;
        b && Cg(a, b) ? Ag(d, c4) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
      }
    } else {
      if (Dg(a)) throw Error(p$2(418));
      a.flags = a.flags & -4097 | 2;
      I = false;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg) return false;
  if (!I) return Fg(a), I = true, false;
  var b;
  (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a)) throw Hg(), Error(p$2(418));
    for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(p$2(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a; ) {
        if (8 === a.nodeType) {
          var c4 = a.data;
          if ("/$" === c4) {
            if (0 === b) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b--;
          } else "$" !== c4 && "$!" !== c4 && "$?" !== c4 || b++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a = yg; a; ) a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b, c4) {
  a = c4.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c4._owner) {
      c4 = c4._owner;
      if (c4) {
        if (1 !== c4.tag) throw Error(p$2(309));
        var d = c4.stateNode;
      }
      if (!d) throw Error(p$2(147, a));
      var e2 = d, f2 = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
      b = function(a2) {
        var b2 = e2.refs;
        null === a2 ? delete b2[f2] : b2[f2] = a2;
      };
      b._stringRef = f2;
      return b;
    }
    if ("string" !== typeof a) throw Error(p$2(284));
    if (!c4._owner) throw Error(p$2(290, a));
  }
  return a;
}
function Mg(a, b) {
  a = Object.prototype.toString.call(b);
  throw Error(p$2(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
}
function Ng(a) {
  var b = a._init;
  return b(a._payload);
}
function Og(a) {
  function b(b2, c5) {
    if (a) {
      var d2 = b2.deletions;
      null === d2 ? (b2.deletions = [c5], b2.flags |= 16) : d2.push(c5);
    }
  }
  function c4(c5, d2) {
    if (!a) return null;
    for (; null !== d2; ) b(c5, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b2) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
    return a2;
  }
  function e2(a2, b2) {
    a2 = Pg(a2, b2);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f2(b2, c5, d2) {
    b2.index = d2;
    if (!a) return b2.flags |= 1048576, c5;
    d2 = b2.alternate;
    if (null !== d2) return d2 = d2.index, d2 < c5 ? (b2.flags |= 2, c5) : d2;
    b2.flags |= 2;
    return c5;
  }
  function g(b2) {
    a && null === b2.alternate && (b2.flags |= 2);
    return b2;
  }
  function h(a2, b2, c5, d2) {
    if (null === b2 || 6 !== b2.tag) return b2 = Qg(c5, a2.mode, d2), b2.return = a2, b2;
    b2 = e2(b2, c5);
    b2.return = a2;
    return b2;
  }
  function k2(a2, b2, c5, d2) {
    var f3 = c5.type;
    if (f3 === ya) return m2(a2, b2, c5.props.children, d2, c5.key);
    if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d2 = e2(b2, c5.props), d2.ref = Lg(a2, b2, c5), d2.return = a2, d2;
    d2 = Rg(c5.type, c5.key, c5.props, null, a2.mode, d2);
    d2.ref = Lg(a2, b2, c5);
    d2.return = a2;
    return d2;
  }
  function l2(a2, b2, c5, d2) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c5.containerInfo || b2.stateNode.implementation !== c5.implementation) return b2 = Sg(c5, a2.mode, d2), b2.return = a2, b2;
    b2 = e2(b2, c5.children || []);
    b2.return = a2;
    return b2;
  }
  function m2(a2, b2, c5, d2, f3) {
    if (null === b2 || 7 !== b2.tag) return b2 = Tg(c5, a2.mode, d2, f3), b2.return = a2, b2;
    b2 = e2(b2, c5);
    b2.return = a2;
    return b2;
  }
  function q2(a2, b2, c5) {
    if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c5), b2.return = a2, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case va:
          return c5 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c5), c5.ref = Lg(a2, null, b2), c5.return = a2, c5;
        case wa:
          return b2 = Sg(b2, a2.mode, c5), b2.return = a2, b2;
        case Ha:
          var d2 = b2._init;
          return q2(a2, d2(b2._payload), c5);
      }
      if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c5, null), b2.return = a2, b2;
      Mg(a2, b2);
    }
    return null;
  }
  function r2(a2, b2, c5, d2) {
    var e3 = null !== b2 ? b2.key : null;
    if ("string" === typeof c5 && "" !== c5 || "number" === typeof c5) return null !== e3 ? null : h(a2, b2, "" + c5, d2);
    if ("object" === typeof c5 && null !== c5) {
      switch (c5.$$typeof) {
        case va:
          return c5.key === e3 ? k2(a2, b2, c5, d2) : null;
        case wa:
          return c5.key === e3 ? l2(a2, b2, c5, d2) : null;
        case Ha:
          return e3 = c5._init, r2(
            a2,
            b2,
            e3(c5._payload),
            d2
          );
      }
      if (eb(c5) || Ka(c5)) return null !== e3 ? null : m2(a2, b2, c5, d2, null);
      Mg(a2, c5);
    }
    return null;
  }
  function y2(a2, b2, c5, d2, e3) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c5) || null, h(b2, a2, "" + d2, e3);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va:
          return a2 = a2.get(null === d2.key ? c5 : d2.key) || null, k2(b2, a2, d2, e3);
        case wa:
          return a2 = a2.get(null === d2.key ? c5 : d2.key) || null, l2(b2, a2, d2, e3);
        case Ha:
          var f3 = d2._init;
          return y2(a2, b2, c5, f3(d2._payload), e3);
      }
      if (eb(d2) || Ka(d2)) return a2 = a2.get(c5) || null, m2(b2, a2, d2, e3, null);
      Mg(b2, d2);
    }
    return null;
  }
  function n2(e3, g2, h2, k3) {
    for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e3, u2, h2[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a && u2 && null === n3.alternate && b(e3, u2);
      g2 = f2(n3, g2, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h2.length) return c4(e3, u2), I && tg(e3, w2), l3;
    if (null === u2) {
      for (; w2 < h2.length; w2++) u2 = q2(e3, h2[w2], k3), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I && tg(e3, w2);
      return l3;
    }
    for (u2 = d(e3, u2); w2 < h2.length; w2++) x2 = y2(u2, e3, w2, h2[w2], k3), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a && u2.forEach(function(a2) {
      return b(e3, a2);
    });
    I && tg(e3, w2);
    return l3;
  }
  function t2(e3, g2, h2, k3) {
    var l3 = Ka(h2);
    if ("function" !== typeof l3) throw Error(p$2(150));
    h2 = l3.call(h2);
    if (null == h2) throw Error(p$2(151));
    for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e3, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a && m3 && null === t3.alternate && b(e3, m3);
      g2 = f2(t3, g2, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done) return c4(
      e3,
      m3
    ), I && tg(e3, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h2.next()) n3 = q2(e3, n3.value, k3), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I && tg(e3, w2);
      return l3;
    }
    for (m3 = d(e3, m3); !n3.done; w2++, n3 = h2.next()) n3 = y2(m3, e3, w2, n3.value, k3), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a && m3.forEach(function(a2) {
      return b(e3, a2);
    });
    I && tg(e3, w2);
    return l3;
  }
  function J2(a2, d2, f3, h2) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d2; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c4(a2, l3.sibling);
                    d2 = e2(l3, f3.props.children);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                  c4(a2, l3.sibling);
                  d2 = e2(l3, f3.props);
                  d2.ref = Lg(a2, l3, f3);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                }
                c4(a2, l3);
                break;
              } else b(a2, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d2 = Tg(f3.props.children, a2.mode, h2, f3.key), d2.return = a2, a2 = d2) : (h2 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f3), h2.return = a2, a2 = h2);
          }
          return g(a2);
        case wa:
          a: {
            for (l3 = f3.key; null !== d2; ) {
              if (d2.key === l3) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                c4(a2, d2.sibling);
                d2 = e2(d2, f3.children || []);
                d2.return = a2;
                a2 = d2;
                break a;
              } else {
                c4(a2, d2);
                break;
              }
              else b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = Sg(f3, a2.mode, h2);
            d2.return = a2;
            a2 = d2;
          }
          return g(a2);
        case Ha:
          return l3 = f3._init, J2(a2, d2, l3(f3._payload), h2);
      }
      if (eb(f3)) return n2(a2, d2, f3, h2);
      if (Ka(f3)) return t2(a2, d2, f3, h2);
      Mg(a2, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c4(a2, d2.sibling), d2 = e2(d2, f3), d2.return = a2, a2 = d2) : (c4(a2, d2), d2 = Qg(f3, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c4(a2, d2);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a) {
  var b = Wg.current;
  E(Wg);
  a._currentValue = b;
}
function bh(a, b, c4) {
  for (; null !== a; ) {
    var d = a.alternate;
    (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a === c4) break;
    a = a.return;
  }
}
function ch(a, b) {
  Xg = a;
  Zg = Yg = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
}
function eh(a) {
  var b = a._currentValue;
  if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
    if (null === Xg) throw Error(p$2(308));
    Yg = a;
    Xg.dependencies = { lanes: 0, firstContext: a };
  } else Yg = Yg.next = a;
  return b;
}
var fh = null;
function gh(a) {
  null === fh ? fh = [a] : fh.push(a);
}
function hh(a, b, c4, d) {
  var e2 = b.interleaved;
  null === e2 ? (c4.next = c4, gh(b)) : (c4.next = e2.next, e2.next = c4);
  b.interleaved = c4;
  return ih(a, d);
}
function ih(a, b) {
  a.lanes |= b;
  var c4 = a.alternate;
  null !== c4 && (c4.lanes |= b);
  c4 = a;
  for (a = a.return; null !== a; ) a.childLanes |= b, c4 = a.alternate, null !== c4 && (c4.childLanes |= b), c4 = a, a = a.return;
  return 3 === c4.tag ? c4.stateNode : null;
}
var jh = false;
function kh(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function mh(a, b) {
  return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function nh(a, b, c4) {
  var d = a.updateQueue;
  if (null === d) return null;
  d = d.shared;
  if (0 !== (K & 2)) {
    var e2 = d.pending;
    null === e2 ? b.next = b : (b.next = e2.next, e2.next = b);
    d.pending = b;
    return ih(a, c4);
  }
  e2 = d.interleaved;
  null === e2 ? (b.next = b, gh(d)) : (b.next = e2.next, e2.next = b);
  d.interleaved = b;
  return ih(a, c4);
}
function oh(a, b, c4) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c4 & 4194240))) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c4 |= d;
    b.lanes = c4;
    Cc(a, c4);
  }
}
function ph(a, b) {
  var c4 = a.updateQueue, d = a.alternate;
  if (null !== d && (d = d.updateQueue, c4 === d)) {
    var e2 = null, f2 = null;
    c4 = c4.firstBaseUpdate;
    if (null !== c4) {
      do {
        var g = { eventTime: c4.eventTime, lane: c4.lane, tag: c4.tag, payload: c4.payload, callback: c4.callback, next: null };
        null === f2 ? e2 = f2 = g : f2 = f2.next = g;
        c4 = c4.next;
      } while (null !== c4);
      null === f2 ? e2 = f2 = b : f2 = f2.next = b;
    } else e2 = f2 = b;
    c4 = { baseState: d.baseState, firstBaseUpdate: e2, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a.updateQueue = c4;
    return;
  }
  a = c4.lastBaseUpdate;
  null === a ? c4.firstBaseUpdate = b : a.next = b;
  c4.lastBaseUpdate = b;
}
function qh(a, b, c4, d) {
  var e2 = a.updateQueue;
  jh = false;
  var f2 = e2.firstBaseUpdate, g = e2.lastBaseUpdate, h = e2.shared.pending;
  if (null !== h) {
    e2.shared.pending = null;
    var k2 = h, l2 = k2.next;
    k2.next = null;
    null === g ? f2 = l2 : g.next = l2;
    g = k2;
    var m2 = a.alternate;
    null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e2.baseState;
    g = 0;
    m2 = l2 = k2 = null;
    h = f2;
    do {
      var r2 = h.lane, y2 = h.eventTime;
      if ((d & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n2 = a, t2 = h;
          r2 = b;
          y2 = c4;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2) break a;
              q2 = A({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e2.effects, null === r2 ? e2.effects = [h] : r2.push(h));
      } else y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
      h = h.next;
      if (null === h) if (h = e2.shared.pending, null === h) break;
      else r2 = h, h = r2.next, r2.next = null, e2.lastBaseUpdate = r2, e2.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e2.baseState = k2;
    e2.firstBaseUpdate = l2;
    e2.lastBaseUpdate = m2;
    b = e2.shared.interleaved;
    if (null !== b) {
      e2 = b;
      do
        g |= e2.lane, e2 = e2.next;
      while (e2 !== b);
    } else null === f2 && (e2.shared.lanes = 0);
    rh |= g;
    a.lanes = g;
    a.memoizedState = q2;
  }
}
function sh(a, b, c4) {
  a = b.effects;
  b.effects = null;
  if (null !== a) for (b = 0; b < a.length; b++) {
    var d = a[b], e2 = d.callback;
    if (null !== e2) {
      d.callback = null;
      d = c4;
      if ("function" !== typeof e2) throw Error(p$2(191, e2));
      e2.call(d);
    }
  }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a) {
  if (a === th) throw Error(p$2(174));
  return a;
}
function yh(a, b) {
  G(wh, b);
  G(vh, a);
  G(uh, th);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
  }
  E(uh);
  G(uh, b);
}
function zh() {
  E(uh);
  E(vh);
  E(wh);
}
function Ah(a) {
  xh(wh.current);
  var b = xh(uh.current);
  var c4 = lb(b, a.type);
  b !== c4 && (G(vh, a), G(uh, c4));
}
function Bh(a) {
  vh.current === a && (E(uh), E(vh));
}
var L = Uf(0);
function Ch(a) {
  for (var b = a; null !== b; ) {
    if (13 === b.tag) {
      var c4 = b.memoizedState;
      if (null !== c4 && (c4 = c4.dehydrated, null === c4 || "$?" === c4.data || "$!" === c4.data)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a) break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a) return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M$1 = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P() {
  throw Error(p$2(321));
}
function Mh(a, b) {
  if (null === b) return false;
  for (var c4 = 0; c4 < b.length && c4 < a.length; c4++) if (!He(a[c4], b[c4])) return false;
  return true;
}
function Nh(a, b, c4, d, e2, f2) {
  Hh = f2;
  M$1 = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
  a = c4(d, e2);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2) throw Error(p$2(301));
      f2 += 1;
      O = N = null;
      b.updateQueue = null;
      Fh.current = Qh;
      a = c4(d, e2);
    } while (Jh);
  }
  Fh.current = Rh;
  b = null !== N && null !== N.next;
  Hh = 0;
  O = N = M$1 = null;
  Ih = false;
  if (b) throw Error(p$2(300));
  return a;
}
function Sh() {
  var a = 0 !== Kh;
  Kh = 0;
  return a;
}
function Th() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O ? M$1.memoizedState = O = a : O = O.next = a;
  return O;
}
function Uh() {
  if (null === N) {
    var a = M$1.alternate;
    a = null !== a ? a.memoizedState : null;
  } else a = N.next;
  var b = null === O ? M$1.memoizedState : O.next;
  if (null !== b) O = b, N = a;
  else {
    if (null === a) throw Error(p$2(310));
    N = a;
    a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
    null === O ? M$1.memoizedState = O = a : O = O.next = a;
  }
  return O;
}
function Vh(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function Wh(a) {
  var b = Uh(), c4 = b.queue;
  if (null === c4) throw Error(p$2(311));
  c4.lastRenderedReducer = a;
  var d = N, e2 = d.baseQueue, f2 = c4.pending;
  if (null !== f2) {
    if (null !== e2) {
      var g = e2.next;
      e2.next = f2.next;
      f2.next = g;
    }
    d.baseQueue = e2 = f2;
    c4.pending = null;
  }
  if (null !== e2) {
    f2 = e2.next;
    d = d.baseState;
    var h = g = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h = k2 = q2, g = d) : k2 = k2.next = q2;
        M$1.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g = d : k2.next = h;
    He(d, b.memoizedState) || (dh = true);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k2;
    c4.lastRenderedState = d;
  }
  a = c4.interleaved;
  if (null !== a) {
    e2 = a;
    do
      f2 = e2.lane, M$1.lanes |= f2, rh |= f2, e2 = e2.next;
    while (e2 !== a);
  } else null === e2 && (c4.lanes = 0);
  return [b.memoizedState, c4.dispatch];
}
function Xh(a) {
  var b = Uh(), c4 = b.queue;
  if (null === c4) throw Error(p$2(311));
  c4.lastRenderedReducer = a;
  var d = c4.dispatch, e2 = c4.pending, f2 = b.memoizedState;
  if (null !== e2) {
    c4.pending = null;
    var g = e2 = e2.next;
    do
      f2 = a(f2, g.action), g = g.next;
    while (g !== e2);
    He(f2, b.memoizedState) || (dh = true);
    b.memoizedState = f2;
    null === b.baseQueue && (b.baseState = f2);
    c4.lastRenderedState = f2;
  }
  return [f2, d];
}
function Yh() {
}
function Zh(a, b) {
  var c4 = M$1, d = Uh(), e2 = b(), f2 = !He(d.memoizedState, e2);
  f2 && (d.memoizedState = e2, dh = true);
  d = d.queue;
  $h(ai.bind(null, c4, d, a), [a]);
  if (d.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
    c4.flags |= 2048;
    bi(9, ci.bind(null, c4, d, e2, b), void 0, null);
    if (null === Q) throw Error(p$2(349));
    0 !== (Hh & 30) || di(c4, b, e2);
  }
  return e2;
}
function di(a, b, c4) {
  a.flags |= 16384;
  a = { getSnapshot: b, value: c4 };
  b = M$1.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M$1.updateQueue = b, b.stores = [a]) : (c4 = b.stores, null === c4 ? b.stores = [a] : c4.push(a));
}
function ci(a, b, c4, d) {
  b.value = c4;
  b.getSnapshot = d;
  ei(b) && fi(a);
}
function ai(a, b, c4) {
  return c4(function() {
    ei(b) && fi(a);
  });
}
function ei(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var c4 = b();
    return !He(a, c4);
  } catch (d) {
    return true;
  }
}
function fi(a) {
  var b = ih(a, 1);
  null !== b && gi(b, a, 1, -1);
}
function hi(a) {
  var b = Th();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
  b.queue = a;
  a = a.dispatch = ii.bind(null, M$1, a);
  return [b.memoizedState, a];
}
function bi(a, b, c4, d) {
  a = { tag: a, create: b, destroy: c4, deps: d, next: null };
  b = M$1.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M$1.updateQueue = b, b.lastEffect = a.next = a) : (c4 = b.lastEffect, null === c4 ? b.lastEffect = a.next = a : (d = c4.next, c4.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a, b, c4, d) {
  var e2 = Th();
  M$1.flags |= a;
  e2.memoizedState = bi(1 | b, c4, void 0, void 0 === d ? null : d);
}
function li(a, b, c4, d) {
  var e2 = Uh();
  d = void 0 === d ? null : d;
  var f2 = void 0;
  if (null !== N) {
    var g = N.memoizedState;
    f2 = g.destroy;
    if (null !== d && Mh(d, g.deps)) {
      e2.memoizedState = bi(b, c4, f2, d);
      return;
    }
  }
  M$1.flags |= a;
  e2.memoizedState = bi(1 | b, c4, f2, d);
}
function mi(a, b) {
  return ki(8390656, 8, a, b);
}
function $h(a, b) {
  return li(2048, 8, a, b);
}
function ni(a, b) {
  return li(4, 2, a, b);
}
function oi(a, b) {
  return li(4, 4, a, b);
}
function pi(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function() {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
    b.current = null;
  };
}
function qi(a, b, c4) {
  c4 = null !== c4 && void 0 !== c4 ? c4.concat([a]) : null;
  return li(4, 4, pi.bind(null, b, a), c4);
}
function ri() {
}
function si(a, b) {
  var c4 = Uh();
  b = void 0 === b ? null : b;
  var d = c4.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  c4.memoizedState = [a, b];
  return a;
}
function ti(a, b) {
  var c4 = Uh();
  b = void 0 === b ? null : b;
  var d = c4.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  a = a();
  c4.memoizedState = [a, b];
  return a;
}
function ui(a, b, c4) {
  if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c4;
  He(c4, b) || (c4 = yc(), M$1.lanes |= c4, rh |= c4, a.baseState = true);
  return b;
}
function vi(a, b) {
  var c4 = C;
  C = 0 !== c4 && 4 > c4 ? c4 : 4;
  a(true);
  var d = Gh.transition;
  Gh.transition = {};
  try {
    a(false), b();
  } finally {
    C = c4, Gh.transition = d;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a, b, c4) {
  var d = yi(a);
  c4 = { lane: d, action: c4, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, c4);
  else if (c4 = hh(a, b, c4, d), null !== c4) {
    var e2 = R();
    gi(c4, a, d, e2);
    Bi(c4, b, d);
  }
}
function ii(a, b, c4) {
  var d = yi(a), e2 = { lane: d, action: c4, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, e2);
  else {
    var f2 = a.alternate;
    if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
      var g = b.lastRenderedState, h = f2(g, c4);
      e2.hasEagerState = true;
      e2.eagerState = h;
      if (He(h, g)) {
        var k2 = b.interleaved;
        null === k2 ? (e2.next = e2, gh(b)) : (e2.next = k2.next, k2.next = e2);
        b.interleaved = e2;
        return;
      }
    } catch (l2) {
    } finally {
    }
    c4 = hh(a, b, e2, d);
    null !== c4 && (e2 = R(), gi(c4, a, d, e2), Bi(c4, b, d));
  }
}
function zi(a) {
  var b = a.alternate;
  return a === M$1 || null !== b && b === M$1;
}
function Ai(a, b) {
  Jh = Ih = true;
  var c4 = a.pending;
  null === c4 ? b.next = b : (b.next = c4.next, c4.next = b);
  a.pending = b;
}
function Bi(a, b, c4) {
  if (0 !== (c4 & 4194240)) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c4 |= d;
    b.lanes = c4;
    Cc(a, c4);
  }
}
var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
  Th().memoizedState = [a, void 0 === b ? null : b];
  return a;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c4) {
  c4 = null !== c4 && void 0 !== c4 ? c4.concat([a]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b, a),
    c4
  );
}, useLayoutEffect: function(a, b) {
  return ki(4194308, 4, a, b);
}, useInsertionEffect: function(a, b) {
  return ki(4, 2, a, b);
}, useMemo: function(a, b) {
  var c4 = Th();
  b = void 0 === b ? null : b;
  a = a();
  c4.memoizedState = [a, b];
  return a;
}, useReducer: function(a, b, c4) {
  var d = Th();
  b = void 0 !== c4 ? c4(b) : b;
  d.memoizedState = d.baseState = b;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
  d.queue = a;
  a = a.dispatch = xi.bind(null, M$1, a);
  return [d.memoizedState, a];
}, useRef: function(a) {
  var b = Th();
  a = { current: a };
  return b.memoizedState = a;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
  return Th().memoizedState = a;
}, useTransition: function() {
  var a = hi(false), b = a[0];
  a = vi.bind(null, a[1]);
  Th().memoizedState = a;
  return [b, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b, c4) {
  var d = M$1, e2 = Th();
  if (I) {
    if (void 0 === c4) throw Error(p$2(407));
    c4 = c4();
  } else {
    c4 = b();
    if (null === Q) throw Error(p$2(349));
    0 !== (Hh & 30) || di(d, b, c4);
  }
  e2.memoizedState = c4;
  var f2 = { value: c4, getSnapshot: b };
  e2.queue = f2;
  mi(ai.bind(
    null,
    d,
    f2,
    a
  ), [a]);
  d.flags |= 2048;
  bi(9, ci.bind(null, d, f2, c4, b), void 0, null);
  return c4;
}, useId: function() {
  var a = Th(), b = Q.identifierPrefix;
  if (I) {
    var c4 = sg;
    var d = rg;
    c4 = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c4;
    b = ":" + b + "R" + c4;
    c4 = Kh++;
    0 < c4 && (b += "H" + c4.toString(32));
    b += ":";
  } else c4 = Lh++, b = ":" + b + "r" + c4.toString(32) + ":";
  return a.memoizedState = b;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a) {
    var b = Uh();
    return ui(b, N.memoizedState, a);
  },
  useTransition: function() {
    var a = Wh(Vh)[0], b = Uh().memoizedState;
    return [a, b];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a) {
  var b = Uh();
  return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
}, useTransition: function() {
  var a = Xh(Vh)[0], b = Uh().memoizedState;
  return [a, b];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a, b) {
  if (a && a.defaultProps) {
    b = A({}, b);
    a = a.defaultProps;
    for (var c4 in a) void 0 === b[c4] && (b[c4] = a[c4]);
    return b;
  }
  return b;
}
function Di(a, b, c4, d) {
  b = a.memoizedState;
  c4 = c4(d, b);
  c4 = null === c4 || void 0 === c4 ? b : A({}, b, c4);
  a.memoizedState = c4;
  0 === a.lanes && (a.updateQueue.baseState = c4);
}
var Ei = { isMounted: function(a) {
  return (a = a._reactInternals) ? Vb(a) === a : false;
}, enqueueSetState: function(a, b, c4) {
  a = a._reactInternals;
  var d = R(), e2 = yi(a), f2 = mh(d, e2);
  f2.payload = b;
  void 0 !== c4 && null !== c4 && (f2.callback = c4);
  b = nh(a, f2, e2);
  null !== b && (gi(b, a, e2, d), oh(b, a, e2));
}, enqueueReplaceState: function(a, b, c4) {
  a = a._reactInternals;
  var d = R(), e2 = yi(a), f2 = mh(d, e2);
  f2.tag = 1;
  f2.payload = b;
  void 0 !== c4 && null !== c4 && (f2.callback = c4);
  b = nh(a, f2, e2);
  null !== b && (gi(b, a, e2, d), oh(b, a, e2));
}, enqueueForceUpdate: function(a, b) {
  a = a._reactInternals;
  var c4 = R(), d = yi(a), e2 = mh(c4, d);
  e2.tag = 2;
  void 0 !== b && null !== b && (e2.callback = b);
  b = nh(a, e2, d);
  null !== b && (gi(b, a, d, c4), oh(b, a, d));
} };
function Fi(a, b, c4, d, e2, f2, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c4, d) || !Ie(e2, f2) : true;
}
function Gi(a, b, c4) {
  var d = false, e2 = Vf;
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e2 = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a, e2) : Vf);
  b = new b(c4, f2);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Ei;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e2, a.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function Hi(a, b, c4, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c4, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c4, d);
  b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
}
function Ii(a, b, c4, d) {
  var e2 = a.stateNode;
  e2.props = c4;
  e2.state = a.memoizedState;
  e2.refs = {};
  kh(a);
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? e2.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e2.context = Yf(a, f2));
  e2.state = a.memoizedState;
  f2 = b.getDerivedStateFromProps;
  "function" === typeof f2 && (Di(a, b, f2, c4), e2.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e2.getSnapshotBeforeUpdate || "function" !== typeof e2.UNSAFE_componentWillMount && "function" !== typeof e2.componentWillMount || (b = e2.state, "function" === typeof e2.componentWillMount && e2.componentWillMount(), "function" === typeof e2.UNSAFE_componentWillMount && e2.UNSAFE_componentWillMount(), b !== e2.state && Ei.enqueueReplaceState(e2, e2.state, null), qh(a, c4, e2, d), e2.state = a.memoizedState);
  "function" === typeof e2.componentDidMount && (a.flags |= 4194308);
}
function Ji(a, b) {
  try {
    var c4 = "", d = b;
    do
      c4 += Pa(d), d = d.return;
    while (d);
    var e2 = c4;
  } catch (f2) {
    e2 = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a, source: b, stack: e2, digest: null };
}
function Ki(a, b, c4) {
  return { value: a, source: null, stack: null != c4 ? c4 : null, digest: null != b ? b : null };
}
function Li(a, b) {
  try {
    console.error(b.value);
  } catch (c4) {
    setTimeout(function() {
      throw c4;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a, b, c4) {
  c4 = mh(-1, c4);
  c4.tag = 3;
  c4.payload = { element: null };
  var d = b.value;
  c4.callback = function() {
    Oi || (Oi = true, Pi = d);
    Li(a, b);
  };
  return c4;
}
function Qi(a, b, c4) {
  c4 = mh(-1, c4);
  c4.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e2 = b.value;
    c4.payload = function() {
      return d(e2);
    };
    c4.callback = function() {
      Li(a, b);
    };
  }
  var f2 = a.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c4.callback = function() {
    Li(a, b);
    "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c5 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c5 ? c5 : "" });
  });
  return c4;
}
function Si(a, b, c4) {
  var d = a.pingCache;
  if (null === d) {
    d = a.pingCache = new Mi();
    var e2 = /* @__PURE__ */ new Set();
    d.set(b, e2);
  } else e2 = d.get(b), void 0 === e2 && (e2 = /* @__PURE__ */ new Set(), d.set(b, e2));
  e2.has(c4) || (e2.add(c4), a = Ti.bind(null, a, b, c4), b.then(a, a));
}
function Ui(a) {
  do {
    var b;
    if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
    if (b) return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Vi(a, b, c4, d, e2) {
  if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c4.flags |= 131072, c4.flags &= -52805, 1 === c4.tag && (null === c4.alternate ? c4.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c4, b, 1))), c4.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e2;
  return a;
}
var Wi = ua.ReactCurrentOwner, dh = false;
function Xi(a, b, c4, d) {
  b.child = null === a ? Vg(b, null, c4, d) : Ug(b, a.child, c4, d);
}
function Yi(a, b, c4, d, e2) {
  c4 = c4.render;
  var f2 = b.ref;
  ch(b, e2);
  d = Nh(a, b, c4, d, f2, e2);
  c4 = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e2, Zi(a, b, e2);
  I && c4 && vg(b);
  b.flags |= 1;
  Xi(a, b, d, e2);
  return b.child;
}
function $i(a, b, c4, d, e2) {
  if (null === a) {
    var f2 = c4.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c4.compare && void 0 === c4.defaultProps) return b.tag = 15, b.type = f2, bj(a, b, f2, d, e2);
    a = Rg(c4.type, null, d, b, b.mode, e2);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  f2 = a.child;
  if (0 === (a.lanes & e2)) {
    var g = f2.memoizedProps;
    c4 = c4.compare;
    c4 = null !== c4 ? c4 : Ie;
    if (c4(g, d) && a.ref === b.ref) return Zi(a, b, e2);
  }
  b.flags |= 1;
  a = Pg(f2, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function bj(a, b, c4, d, e2) {
  if (null !== a) {
    var f2 = a.memoizedProps;
    if (Ie(f2, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f2, 0 !== (a.lanes & e2)) 0 !== (a.flags & 131072) && (dh = true);
    else return b.lanes = a.lanes, Zi(a, b, e2);
  }
  return cj(a, b, c4, d, e2);
}
function dj(a, b, c4) {
  var d = b.pendingProps, e2 = d.children, f2 = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c4;
  else {
    if (0 === (c4 & 1073741824)) return a = null !== f2 ? f2.baseLanes | c4 : c4, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
    b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
    d = null !== f2 ? f2.baseLanes : c4;
    G(ej, fj);
    fj |= d;
  }
  else null !== f2 ? (d = f2.baseLanes | c4, b.memoizedState = null) : d = c4, G(ej, fj), fj |= d;
  Xi(a, b, e2, c4);
  return b.child;
}
function gj(a, b) {
  var c4 = b.ref;
  if (null === a && null !== c4 || null !== a && a.ref !== c4) b.flags |= 512, b.flags |= 2097152;
}
function cj(a, b, c4, d, e2) {
  var f2 = Zf(c4) ? Xf : H.current;
  f2 = Yf(b, f2);
  ch(b, e2);
  c4 = Nh(a, b, c4, d, f2, e2);
  d = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e2, Zi(a, b, e2);
  I && d && vg(b);
  b.flags |= 1;
  Xi(a, b, c4, e2);
  return b.child;
}
function hj(a, b, c4, d, e2) {
  if (Zf(c4)) {
    var f2 = true;
    cg(b);
  } else f2 = false;
  ch(b, e2);
  if (null === b.stateNode) ij(a, b), Gi(b, c4, d), Ii(b, c4, d, e2), d = true;
  else if (null === a) {
    var g = b.stateNode, h = b.memoizedProps;
    g.props = h;
    var k2 = g.context, l2 = c4.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c4) ? Xf : H.current, l2 = Yf(b, l2));
    var m2 = c4.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k2 !== l2) && Hi(b, g, d, l2);
    jh = false;
    var r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e2);
    k2 = b.memoizedState;
    h !== d || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c4, m2, d), k2 = b.memoizedState), (h = jh || Fi(b, c4, h, d, r2, k2, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
  } else {
    g = b.stateNode;
    lh(a, b);
    h = b.memoizedProps;
    l2 = b.type === b.elementType ? h : Ci(b.type, h);
    g.props = l2;
    q2 = b.pendingProps;
    r2 = g.context;
    k2 = c4.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c4) ? Xf : H.current, k2 = Yf(b, k2));
    var y2 = c4.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k2) && Hi(b, g, d, k2);
    jh = false;
    r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e2);
    var n2 = b.memoizedState;
    h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c4, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c4, l2, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k2, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
  }
  return jj(a, b, c4, d, f2, e2);
}
function jj(a, b, c4, d, e2, f2) {
  gj(a, b);
  var g = 0 !== (b.flags & 128);
  if (!d && !g) return e2 && dg(b, c4, false), Zi(a, b, f2);
  d = b.stateNode;
  Wi.current = b;
  var h = g && "function" !== typeof c4.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g ? (b.child = Ug(b, a.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a, b, h, f2);
  b.memoizedState = d.state;
  e2 && dg(b, c4, true);
  return b.child;
}
function kj(a) {
  var b = a.stateNode;
  b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
  yh(a, b.containerInfo);
}
function lj(a, b, c4, d, e2) {
  Ig();
  Jg(e2);
  b.flags |= 256;
  Xi(a, b, c4, d);
  return b.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function oj(a, b, c4) {
  var d = b.pendingProps, e2 = L.current, f2 = false, g = 0 !== (b.flags & 128), h;
  (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e2 & 2));
  if (h) f2 = true, b.flags &= -129;
  else if (null === a || null !== a.memoizedState) e2 |= 1;
  G(L, e2 & 1);
  if (null === a) {
    Eg(b);
    a = b.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a = d.fallback;
    return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a = Tg(a, d, c4, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = nj(c4), b.memoizedState = mj, a) : qj(b, g);
  }
  e2 = a.memoizedState;
  if (null !== e2 && (h = e2.dehydrated, null !== h)) return rj(a, b, g, d, h, e2, c4);
  if (f2) {
    f2 = d.fallback;
    g = b.mode;
    e2 = a.child;
    h = e2.sibling;
    var k2 = { mode: "hidden", children: d.children };
    0 === (g & 1) && b.child !== e2 ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = Pg(e2, k2), d.subtreeFlags = e2.subtreeFlags & 14680064);
    null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g, c4, null), f2.flags |= 2);
    f2.return = b;
    d.return = b;
    d.sibling = f2;
    b.child = d;
    d = f2;
    f2 = b.child;
    g = a.child.memoizedState;
    g = null === g ? nj(c4) : { baseLanes: g.baseLanes | c4, cachePool: null, transitions: g.transitions };
    f2.memoizedState = g;
    f2.childLanes = a.childLanes & ~c4;
    b.memoizedState = mj;
    return d;
  }
  f2 = a.child;
  a = f2.sibling;
  d = Pg(f2, { mode: "visible", children: d.children });
  0 === (b.mode & 1) && (d.lanes = c4);
  d.return = b;
  d.sibling = null;
  null !== a && (c4 = b.deletions, null === c4 ? (b.deletions = [a], b.flags |= 16) : c4.push(a));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function qj(a, b) {
  b = pj({ mode: "visible", children: b }, a.mode, 0, null);
  b.return = a;
  return a.child = b;
}
function sj(a, b, c4, d) {
  null !== d && Jg(d);
  Ug(b, a.child, null, c4);
  a = qj(b, b.pendingProps.children);
  a.flags |= 2;
  b.memoizedState = null;
  return a;
}
function rj(a, b, c4, d, e2, f2, g) {
  if (c4) {
    if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p$2(422))), sj(a, b, g, d);
    if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
    f2 = d.fallback;
    e2 = b.mode;
    d = pj({ mode: "visible", children: d.children }, e2, 0, null);
    f2 = Tg(f2, e2, g, null);
    f2.flags |= 2;
    d.return = b;
    f2.return = b;
    d.sibling = f2;
    b.child = d;
    0 !== (b.mode & 1) && Ug(b, a.child, null, g);
    b.child.memoizedState = nj(g);
    b.memoizedState = mj;
    return f2;
  }
  if (0 === (b.mode & 1)) return sj(a, b, g, null);
  if ("$!" === e2.data) {
    d = e2.nextSibling && e2.nextSibling.dataset;
    if (d) var h = d.dgst;
    d = h;
    f2 = Error(p$2(419));
    d = Ki(f2, d, void 0);
    return sj(a, b, g, d);
  }
  h = 0 !== (g & a.childLanes);
  if (dh || h) {
    d = Q;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e2 = 2;
          break;
        case 16:
          e2 = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e2 = 32;
          break;
        case 536870912:
          e2 = 268435456;
          break;
        default:
          e2 = 0;
      }
      e2 = 0 !== (e2 & (d.suspendedLanes | g)) ? 0 : e2;
      0 !== e2 && e2 !== f2.retryLane && (f2.retryLane = e2, ih(a, e2), gi(d, a, e2, -1));
    }
    tj();
    d = Ki(Error(p$2(421)));
    return sj(a, b, g, d);
  }
  if ("$?" === e2.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e2._reactRetry = b, null;
  a = f2.treeContext;
  yg = Lf(e2.nextSibling);
  xg = b;
  I = true;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
  b = qj(b, d.children);
  b.flags |= 4096;
  return b;
}
function vj(a, b, c4) {
  a.lanes |= b;
  var d = a.alternate;
  null !== d && (d.lanes |= b);
  bh(a.return, b, c4);
}
function wj(a, b, c4, d, e2) {
  var f2 = a.memoizedState;
  null === f2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c4, tailMode: e2 } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c4, f2.tailMode = e2);
}
function xj(a, b, c4) {
  var d = b.pendingProps, e2 = d.revealOrder, f2 = d.tail;
  Xi(a, b, d.children, c4);
  d = L.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
  else {
    if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
      if (13 === a.tag) null !== a.memoizedState && vj(a, c4, b);
      else if (19 === a.tag) vj(a, c4, b);
      else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b) break a;
      for (; null === a.sibling; ) {
        if (null === a.return || a.return === b) break a;
        a = a.return;
      }
      a.sibling.return = a.return;
      a = a.sibling;
    }
    d &= 1;
  }
  G(L, d);
  if (0 === (b.mode & 1)) b.memoizedState = null;
  else switch (e2) {
    case "forwards":
      c4 = b.child;
      for (e2 = null; null !== c4; ) a = c4.alternate, null !== a && null === Ch(a) && (e2 = c4), c4 = c4.sibling;
      c4 = e2;
      null === c4 ? (e2 = b.child, b.child = null) : (e2 = c4.sibling, c4.sibling = null);
      wj(b, false, e2, c4, f2);
      break;
    case "backwards":
      c4 = null;
      e2 = b.child;
      for (b.child = null; null !== e2; ) {
        a = e2.alternate;
        if (null !== a && null === Ch(a)) {
          b.child = e2;
          break;
        }
        a = e2.sibling;
        e2.sibling = c4;
        c4 = e2;
        e2 = a;
      }
      wj(b, true, c4, null, f2);
      break;
    case "together":
      wj(b, false, null, null, void 0);
      break;
    default:
      b.memoizedState = null;
  }
  return b.child;
}
function ij(a, b) {
  0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
}
function Zi(a, b, c4) {
  null !== a && (b.dependencies = a.dependencies);
  rh |= b.lanes;
  if (0 === (c4 & b.childLanes)) return null;
  if (null !== a && b.child !== a.child) throw Error(p$2(153));
  if (null !== b.child) {
    a = b.child;
    c4 = Pg(a, a.pendingProps);
    b.child = c4;
    for (c4.return = b; null !== a.sibling; ) a = a.sibling, c4 = c4.sibling = Pg(a, a.pendingProps), c4.return = b;
    c4.sibling = null;
  }
  return b.child;
}
function yj(a, b, c4) {
  switch (b.tag) {
    case 3:
      kj(b);
      Ig();
      break;
    case 5:
      Ah(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      yh(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e2 = b.memoizedProps.value;
      G(Wg, d._currentValue);
      d._currentValue = e2;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
        if (0 !== (c4 & b.child.childLanes)) return oj(a, b, c4);
        G(L, L.current & 1);
        a = Zi(a, b, c4);
        return null !== a ? a.sibling : null;
      }
      G(L, L.current & 1);
      break;
    case 19:
      d = 0 !== (c4 & b.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d) return xj(a, b, c4);
        b.flags |= 128;
      }
      e2 = b.memoizedState;
      null !== e2 && (e2.rendering = null, e2.tail = null, e2.lastEffect = null);
      G(L, L.current);
      if (d) break;
      else return null;
    case 22:
    case 23:
      return b.lanes = 0, dj(a, b, c4);
  }
  return Zi(a, b, c4);
}
var zj, Aj, Bj, Cj;
zj = function(a, b) {
  for (var c4 = b.child; null !== c4; ) {
    if (5 === c4.tag || 6 === c4.tag) a.appendChild(c4.stateNode);
    else if (4 !== c4.tag && null !== c4.child) {
      c4.child.return = c4;
      c4 = c4.child;
      continue;
    }
    if (c4 === b) break;
    for (; null === c4.sibling; ) {
      if (null === c4.return || c4.return === b) return;
      c4 = c4.return;
    }
    c4.sibling.return = c4.return;
    c4 = c4.sibling;
  }
};
Aj = function() {
};
Bj = function(a, b, c4, d) {
  var e2 = a.memoizedProps;
  if (e2 !== d) {
    a = b.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c4) {
      case "input":
        e2 = Ya(a, e2);
        d = Ya(a, d);
        f2 = [];
        break;
      case "select":
        e2 = A({}, e2, { value: void 0 });
        d = A({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e2 = gb(a, e2);
        d = gb(a, d);
        f2 = [];
        break;
      default:
        "function" !== typeof e2.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
    }
    ub(c4, d);
    var g;
    c4 = null;
    for (l2 in e2) if (!d.hasOwnProperty(l2) && e2.hasOwnProperty(l2) && null != e2[l2]) if ("style" === l2) {
      var h = e2[l2];
      for (g in h) h.hasOwnProperty(g) && (c4 || (c4 = {}), c4[g] = "");
    } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k2 = d[l2];
      h = null != e2 ? e2[l2] : void 0;
      if (d.hasOwnProperty(l2) && k2 !== h && (null != k2 || null != h)) if ("style" === l2) if (h) {
        for (g in h) !h.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c4 || (c4 = {}), c4[g] = "");
        for (g in k2) k2.hasOwnProperty(g) && h[g] !== k2[g] && (c4 || (c4 = {}), c4[g] = k2[g]);
      } else c4 || (f2 || (f2 = []), f2.push(
        l2,
        c4
      )), c4 = k2;
      else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, null != k2 && h !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D("scroll", a), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c4 && (f2 = f2 || []).push("style", c4);
    var l2 = f2;
    if (b.updateQueue = l2) b.flags |= 4;
  }
};
Cj = function(a, b, c4, d) {
  c4 !== d && (b.flags |= 4);
};
function Dj(a, b) {
  if (!I) switch (a.tailMode) {
    case "hidden":
      b = a.tail;
      for (var c4 = null; null !== b; ) null !== b.alternate && (c4 = b), b = b.sibling;
      null === c4 ? a.tail = null : c4.sibling = null;
      break;
    case "collapsed":
      c4 = a.tail;
      for (var d = null; null !== c4; ) null !== c4.alternate && (d = c4), c4 = c4.sibling;
      null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
  }
}
function S(a) {
  var b = null !== a.alternate && a.alternate.child === a.child, c4 = 0, d = 0;
  if (b) for (var e2 = a.child; null !== e2; ) c4 |= e2.lanes | e2.childLanes, d |= e2.subtreeFlags & 14680064, d |= e2.flags & 14680064, e2.return = a, e2 = e2.sibling;
  else for (e2 = a.child; null !== e2; ) c4 |= e2.lanes | e2.childLanes, d |= e2.subtreeFlags, d |= e2.flags, e2.return = a, e2 = e2.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c4;
  return b;
}
function Ej(a, b, c4) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b), null;
    case 1:
      return Zf(b.type) && $f(), S(b), null;
    case 3:
      d = b.stateNode;
      zh();
      E(Wf);
      E(H);
      Eh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a, b);
      S(b);
      return null;
    case 5:
      Bh(b);
      var e2 = xh(wh.current);
      c4 = b.type;
      if (null !== a && null != b.stateNode) Bj(a, b, c4, d, e2), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (null === b.stateNode) throw Error(p$2(166));
          S(b);
          return null;
        }
        a = xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c4 = b.type;
          var f2 = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f2;
          a = 0 !== (b.mode & 1);
          switch (c4) {
            case "dialog":
              D("cancel", d);
              D("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", d);
              break;
            case "video":
            case "audio":
              for (e2 = 0; e2 < lf.length; e2++) D(lf[e2], d);
              break;
            case "source":
              D("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D(
                "error",
                d
              );
              D("load", d);
              break;
            case "details":
              D("toggle", d);
              break;
            case "input":
              Za(d, f2);
              D("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D("invalid", d);
              break;
            case "textarea":
              hb(d, f2), D("invalid", d);
          }
          ub(c4, f2);
          e2 = null;
          for (var g in f2) if (f2.hasOwnProperty(g)) {
            var h = f2[g];
            "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a), e2 = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
              d.textContent,
              h,
              a
            ), e2 = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
          }
          switch (c4) {
            case "input":
              Va(d);
              db(d, f2, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d.onclick = Bf);
          }
          d = e2;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e2.nodeType ? e2 : e2.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c4));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c4 ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c4, { is: d.is }) : (a = g.createElement(c4), "select" === c4 && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c4);
          a[Of] = b;
          a[Pf] = d;
          zj(a, b, false, false);
          b.stateNode = a;
          a: {
            g = vb(c4, d);
            switch (c4) {
              case "dialog":
                D("cancel", a);
                D("close", a);
                e2 = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", a);
                e2 = d;
                break;
              case "video":
              case "audio":
                for (e2 = 0; e2 < lf.length; e2++) D(lf[e2], a);
                e2 = d;
                break;
              case "source":
                D("error", a);
                e2 = d;
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  a
                );
                D("load", a);
                e2 = d;
                break;
              case "details":
                D("toggle", a);
                e2 = d;
                break;
              case "input":
                Za(a, d);
                e2 = Ya(a, d);
                D("invalid", a);
                break;
              case "option":
                e2 = d;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d.multiple };
                e2 = A({}, d, { value: void 0 });
                D("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e2 = gb(a, d);
                D("invalid", a);
                break;
              default:
                e2 = d;
            }
            ub(c4, e2);
            h = e2;
            for (f2 in h) if (h.hasOwnProperty(f2)) {
              var k2 = h[f2];
              "style" === f2 ? sb(a, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c4 || "" !== k2) && ob(a, k2) : "number" === typeof k2 && ob(a, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D("scroll", a) : null != k2 && ta(a, f2, k2, g));
            }
            switch (c4) {
              case "input":
                Va(a);
                db(a, d, false);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f2 = d.value;
                null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                  a,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e2.onClick && (a.onclick = Bf);
            }
            switch (c4) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S(b);
      return null;
    case 6:
      if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b.stateNode) throw Error(p$2(166));
        c4 = xh(wh.current);
        xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c4 = b.memoizedProps;
          d[Of] = b;
          if (f2 = d.nodeValue !== c4) {
            if (a = xg, null !== a) switch (a.tag) {
              case 3:
                Af(d.nodeValue, c4, 0 !== (a.mode & 1));
                break;
              case 5:
                true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c4, 0 !== (a.mode & 1));
            }
          }
          f2 && (b.flags |= 4);
        } else d = (9 === c4.nodeType ? c4 : c4.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S(b);
      return null;
    case 13:
      E(L);
      d = b.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
        else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a) {
            if (!f2) throw Error(p$2(318));
            f2 = b.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2) throw Error(p$2(317));
            f2[Of] = b;
          } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S(b);
          f2 = false;
        } else null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2) return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128)) return b.lanes = c4, b;
      d = null !== d;
      d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
      null !== b.updateQueue && (b.flags |= 4);
      S(b);
      return null;
    case 4:
      return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
    case 10:
      return ah(b.type._context), S(b), null;
    case 17:
      return Zf(b.type) && $f(), S(b), null;
    case 19:
      E(L);
      f2 = b.memoizedState;
      if (null === f2) return S(b), null;
      d = 0 !== (b.flags & 128);
      g = f2.rendering;
      if (null === g) if (d) Dj(f2, false);
      else {
        if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
          g = Ch(a);
          if (null !== g) {
            b.flags |= 128;
            Dj(f2, false);
            d = g.updateQueue;
            null !== d && (b.updateQueue = d, b.flags |= 4);
            b.subtreeFlags = 0;
            d = c4;
            for (c4 = b.child; null !== c4; ) f2 = c4, a = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a = g.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c4 = c4.sibling;
            G(L, L.current & 1 | 2);
            return b.child;
          }
          a = a.sibling;
        }
        null !== f2.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
      }
      else {
        if (!d) if (a = Ch(g), null !== a) {
          if (b.flags |= 128, d = true, c4 = a.updateQueue, null !== c4 && (b.updateQueue = c4, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I) return S(b), null;
        } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c4 && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c4 = f2.last, null !== c4 ? c4.sibling = g : b.child = g, f2.last = g);
      }
      if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c4 = L.current, G(L, d ? c4 & 1 | 2 : c4 & 1), b;
      S(b);
      return null;
    case 22:
    case 23:
      return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p$2(156, b.tag));
}
function Ij(a, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 3:
      return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
    case 5:
      return Bh(b), null;
    case 13:
      E(L);
      a = b.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b.alternate) throw Error(p$2(340));
        Ig();
      }
      a = b.flags;
      return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 19:
      return E(L), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Lj(a, b) {
  var c4 = a.ref;
  if (null !== c4) if ("function" === typeof c4) try {
    c4(null);
  } catch (d) {
    W(a, b, d);
  }
  else c4.current = null;
}
function Mj(a, b, c4) {
  try {
    c4();
  } catch (d) {
    W(a, b, d);
  }
}
var Nj = false;
function Oj(a, b) {
  Cf = dd;
  a = Me();
  if (Ne(a)) {
    if ("selectionStart" in a) var c4 = { start: a.selectionStart, end: a.selectionEnd };
    else a: {
      c4 = (c4 = a.ownerDocument) && c4.defaultView || window;
      var d = c4.getSelection && c4.getSelection();
      if (d && 0 !== d.rangeCount) {
        c4 = d.anchorNode;
        var e2 = d.anchorOffset, f2 = d.focusNode;
        d = d.focusOffset;
        try {
          c4.nodeType, f2.nodeType;
        } catch (F2) {
          c4 = null;
          break a;
        }
        var g = 0, h = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
        b: for (; ; ) {
          for (var y2; ; ) {
            q2 !== c4 || 0 !== e2 && 3 !== q2.nodeType || (h = g + e2);
            q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g + d);
            3 === q2.nodeType && (g += q2.nodeValue.length);
            if (null === (y2 = q2.firstChild)) break;
            r2 = q2;
            q2 = y2;
          }
          for (; ; ) {
            if (q2 === a) break b;
            r2 === c4 && ++l2 === e2 && (h = g);
            r2 === f2 && ++m2 === d && (k2 = g);
            if (null !== (y2 = q2.nextSibling)) break;
            q2 = r2;
            r2 = q2.parentNode;
          }
          q2 = y2;
        }
        c4 = -1 === h || -1 === k2 ? null : { start: h, end: k2 };
      } else c4 = null;
    }
    c4 = c4 || { start: 0, end: 0 };
  } else c4 = null;
  Df = { focusedElem: a, selectionRange: c4 };
  dd = false;
  for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
  else for (; null !== V; ) {
    b = V;
    try {
      var n2 = b.alternate;
      if (0 !== (b.flags & 1024)) switch (b.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n2) {
            var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
            x2.__reactInternalSnapshotBeforeUpdate = w2;
          }
          break;
        case 3:
          var u2 = b.stateNode.containerInfo;
          1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p$2(163));
      }
    } catch (F2) {
      W(b, b.return, F2);
    }
    a = b.sibling;
    if (null !== a) {
      a.return = b.return;
      V = a;
      break;
    }
    V = b.return;
  }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a, b, c4) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e2 = d = d.next;
    do {
      if ((e2.tag & a) === a) {
        var f2 = e2.destroy;
        e2.destroy = void 0;
        void 0 !== f2 && Mj(b, c4, f2);
      }
      e2 = e2.next;
    } while (e2 !== d);
  }
}
function Qj(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c4 = b = b.next;
    do {
      if ((c4.tag & a) === a) {
        var d = c4.create;
        c4.destroy = d();
      }
      c4 = c4.next;
    } while (c4 !== b);
  }
}
function Rj(a) {
  var b = a.ref;
  if (null !== b) {
    var c4 = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c4;
        break;
      default:
        a = c4;
    }
    "function" === typeof b ? b(a) : b.current = a;
  }
}
function Sj(a) {
  var b = a.alternate;
  null !== b && (a.alternate = null, Sj(b));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Tj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Uj(a) {
  a: for (; ; ) {
    for (; null === a.sibling; ) {
      if (null === a.return || Tj(a.return)) return null;
      a = a.return;
    }
    a.sibling.return = a.return;
    for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
      if (a.flags & 2) continue a;
      if (null === a.child || 4 === a.tag) continue a;
      else a.child.return = a, a = a.child;
    }
    if (!(a.flags & 2)) return a.stateNode;
  }
}
function Vj(a, b, c4) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c4.nodeType ? c4.parentNode.insertBefore(a, b) : c4.insertBefore(a, b) : (8 === c4.nodeType ? (b = c4.parentNode, b.insertBefore(a, c4)) : (b = c4, b.appendChild(a)), c4 = c4._reactRootContainer, null !== c4 && void 0 !== c4 || null !== b.onclick || (b.onclick = Bf));
  else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c4), a = a.sibling; null !== a; ) Vj(a, b, c4), a = a.sibling;
}
function Wj(a, b, c4) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? c4.insertBefore(a, b) : c4.appendChild(a);
  else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c4), a = a.sibling; null !== a; ) Wj(a, b, c4), a = a.sibling;
}
var X = null, Xj = false;
function Yj(a, b, c4) {
  for (c4 = c4.child; null !== c4; ) Zj(a, b, c4), c4 = c4.sibling;
}
function Zj(a, b, c4) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c4);
  } catch (h) {
  }
  switch (c4.tag) {
    case 5:
      U || Lj(c4, b);
    case 6:
      var d = X, e2 = Xj;
      X = null;
      Yj(a, b, c4);
      X = d;
      Xj = e2;
      null !== X && (Xj ? (a = X, c4 = c4.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c4) : a.removeChild(c4)) : X.removeChild(c4.stateNode));
      break;
    case 18:
      null !== X && (Xj ? (a = X, c4 = c4.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c4) : 1 === a.nodeType && Kf(a, c4), bd(a)) : Kf(X, c4.stateNode));
      break;
    case 4:
      d = X;
      e2 = Xj;
      X = c4.stateNode.containerInfo;
      Xj = true;
      Yj(a, b, c4);
      X = d;
      Xj = e2;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (d = c4.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e2 = d = d.next;
        do {
          var f2 = e2, g = f2.destroy;
          f2 = f2.tag;
          void 0 !== g && (0 !== (f2 & 2) ? Mj(c4, b, g) : 0 !== (f2 & 4) && Mj(c4, b, g));
          e2 = e2.next;
        } while (e2 !== d);
      }
      Yj(a, b, c4);
      break;
    case 1:
      if (!U && (Lj(c4, b), d = c4.stateNode, "function" === typeof d.componentWillUnmount)) try {
        d.props = c4.memoizedProps, d.state = c4.memoizedState, d.componentWillUnmount();
      } catch (h) {
        W(c4, b, h);
      }
      Yj(a, b, c4);
      break;
    case 21:
      Yj(a, b, c4);
      break;
    case 22:
      c4.mode & 1 ? (U = (d = U) || null !== c4.memoizedState, Yj(a, b, c4), U = d) : Yj(a, b, c4);
      break;
    default:
      Yj(a, b, c4);
  }
}
function ak(a) {
  var b = a.updateQueue;
  if (null !== b) {
    a.updateQueue = null;
    var c4 = a.stateNode;
    null === c4 && (c4 = a.stateNode = new Kj());
    b.forEach(function(b2) {
      var d = bk.bind(null, a, b2);
      c4.has(b2) || (c4.add(b2), b2.then(d, d));
    });
  }
}
function ck(a, b) {
  var c4 = b.deletions;
  if (null !== c4) for (var d = 0; d < c4.length; d++) {
    var e2 = c4[d];
    try {
      var f2 = a, g = b, h = g;
      a: for (; null !== h; ) {
        switch (h.tag) {
          case 5:
            X = h.stateNode;
            Xj = false;
            break a;
          case 3:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
          case 4:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
        }
        h = h.return;
      }
      if (null === X) throw Error(p$2(160));
      Zj(f2, g, e2);
      X = null;
      Xj = false;
      var k2 = e2.alternate;
      null !== k2 && (k2.return = null);
      e2.return = null;
    } catch (l2) {
      W(e2, b, l2);
    }
  }
  if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
}
function dk(a, b) {
  var c4 = a.alternate, d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b, a);
      ek(a);
      if (d & 4) {
        try {
          Pj(3, a, a.return), Qj(3, a);
        } catch (t2) {
          W(a, a.return, t2);
        }
        try {
          Pj(5, a, a.return);
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 1:
      ck(b, a);
      ek(a);
      d & 512 && null !== c4 && Lj(c4, c4.return);
      break;
    case 5:
      ck(b, a);
      ek(a);
      d & 512 && null !== c4 && Lj(c4, c4.return);
      if (a.flags & 32) {
        var e2 = a.stateNode;
        try {
          ob(e2, "");
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      if (d & 4 && (e2 = a.stateNode, null != e2)) {
        var f2 = a.memoizedProps, g = null !== c4 ? c4.memoizedProps : f2, h = a.type, k2 = a.updateQueue;
        a.updateQueue = null;
        if (null !== k2) try {
          "input" === h && "radio" === f2.type && null != f2.name && ab(e2, f2);
          vb(h, g);
          var l2 = vb(h, f2);
          for (g = 0; g < k2.length; g += 2) {
            var m2 = k2[g], q2 = k2[g + 1];
            "style" === m2 ? sb(e2, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e2, q2) : "children" === m2 ? ob(e2, q2) : ta(e2, m2, q2, l2);
          }
          switch (h) {
            case "input":
              bb(e2, f2);
              break;
            case "textarea":
              ib(e2, f2);
              break;
            case "select":
              var r2 = e2._wrapperState.wasMultiple;
              e2._wrapperState.wasMultiple = !!f2.multiple;
              var y2 = f2.value;
              null != y2 ? fb(e2, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                e2,
                !!f2.multiple,
                f2.defaultValue,
                true
              ) : fb(e2, !!f2.multiple, f2.multiple ? [] : "", false));
          }
          e2[Pf] = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 6:
      ck(b, a);
      ek(a);
      if (d & 4) {
        if (null === a.stateNode) throw Error(p$2(162));
        e2 = a.stateNode;
        f2 = a.memoizedProps;
        try {
          e2.nodeValue = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 3:
      ck(b, a);
      ek(a);
      if (d & 4 && null !== c4 && c4.memoizedState.isDehydrated) try {
        bd(b.containerInfo);
      } catch (t2) {
        W(a, a.return, t2);
      }
      break;
    case 4:
      ck(b, a);
      ek(a);
      break;
    case 13:
      ck(b, a);
      ek(a);
      e2 = a.child;
      e2.flags & 8192 && (f2 = null !== e2.memoizedState, e2.stateNode.isHidden = f2, !f2 || null !== e2.alternate && null !== e2.alternate.memoizedState || (fk = B()));
      d & 4 && ak(a);
      break;
    case 22:
      m2 = null !== c4 && null !== c4.memoizedState;
      a.mode & 1 ? (U = (l2 = U) || m2, ck(b, a), U = l2) : ck(b, a);
      ek(a);
      if (d & 8192) {
        l2 = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1)) for (V = a, m2 = a.child; null !== m2; ) {
          for (q2 = V = m2; null !== V; ) {
            r2 = V;
            y2 = r2.child;
            switch (r2.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pj(4, r2, r2.return);
                break;
              case 1:
                Lj(r2, r2.return);
                var n2 = r2.stateNode;
                if ("function" === typeof n2.componentWillUnmount) {
                  d = r2;
                  c4 = r2.return;
                  try {
                    b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                  } catch (t2) {
                    W(d, c4, t2);
                  }
                }
                break;
              case 5:
                Lj(r2, r2.return);
                break;
              case 22:
                if (null !== r2.memoizedState) {
                  gk(q2);
                  continue;
                }
            }
            null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
          }
          m2 = m2.sibling;
        }
        a: for (m2 = null, q2 = a; ; ) {
          if (5 === q2.tag) {
            if (null === m2) {
              m2 = q2;
              try {
                e2 = q2.stateNode, l2 ? (f2 = e2.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = rb("display", g));
              } catch (t2) {
                W(a, a.return, t2);
              }
            }
          } else if (6 === q2.tag) {
            if (null === m2) try {
              q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
            } catch (t2) {
              W(a, a.return, t2);
            }
          } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
            q2.child.return = q2;
            q2 = q2.child;
            continue;
          }
          if (q2 === a) break a;
          for (; null === q2.sibling; ) {
            if (null === q2.return || q2.return === a) break a;
            m2 === q2 && (m2 = null);
            q2 = q2.return;
          }
          m2 === q2 && (m2 = null);
          q2.sibling.return = q2.return;
          q2 = q2.sibling;
        }
      }
      break;
    case 19:
      ck(b, a);
      ek(a);
      d & 4 && ak(a);
      break;
    case 21:
      break;
    default:
      ck(
        b,
        a
      ), ek(a);
  }
}
function ek(a) {
  var b = a.flags;
  if (b & 2) {
    try {
      a: {
        for (var c4 = a.return; null !== c4; ) {
          if (Tj(c4)) {
            var d = c4;
            break a;
          }
          c4 = c4.return;
        }
        throw Error(p$2(160));
      }
      switch (d.tag) {
        case 5:
          var e2 = d.stateNode;
          d.flags & 32 && (ob(e2, ""), d.flags &= -33);
          var f2 = Uj(a);
          Wj(a, f2, e2);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h = Uj(a);
          Vj(a, h, g);
          break;
        default:
          throw Error(p$2(161));
      }
    } catch (k2) {
      W(a, a.return, k2);
    }
    a.flags &= -3;
  }
  b & 4096 && (a.flags &= -4097);
}
function hk(a, b, c4) {
  V = a;
  ik(a);
}
function ik(a, b, c4) {
  for (var d = 0 !== (a.mode & 1); null !== V; ) {
    var e2 = V, f2 = e2.child;
    if (22 === e2.tag && d) {
      var g = null !== e2.memoizedState || Jj;
      if (!g) {
        var h = e2.alternate, k2 = null !== h && null !== h.memoizedState || U;
        h = Jj;
        var l2 = U;
        Jj = g;
        if ((U = k2) && !l2) for (V = e2; null !== V; ) g = V, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e2) : null !== k2 ? (k2.return = g, V = k2) : jk(e2);
        for (; null !== f2; ) V = f2, ik(f2), f2 = f2.sibling;
        V = e2;
        Jj = h;
        U = l2;
      }
      kk(a);
    } else 0 !== (e2.subtreeFlags & 8772) && null !== f2 ? (f2.return = e2, V = f2) : kk(a);
  }
}
function kk(a) {
  for (; null !== V; ) {
    var b = V;
    if (0 !== (b.flags & 8772)) {
      var c4 = b.alternate;
      try {
        if (0 !== (b.flags & 8772)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            U || Qj(5, b);
            break;
          case 1:
            var d = b.stateNode;
            if (b.flags & 4 && !U) if (null === c4) d.componentDidMount();
            else {
              var e2 = b.elementType === b.type ? c4.memoizedProps : Ci(b.type, c4.memoizedProps);
              d.componentDidUpdate(e2, c4.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
            }
            var f2 = b.updateQueue;
            null !== f2 && sh(b, f2, d);
            break;
          case 3:
            var g = b.updateQueue;
            if (null !== g) {
              c4 = null;
              if (null !== b.child) switch (b.child.tag) {
                case 5:
                  c4 = b.child.stateNode;
                  break;
                case 1:
                  c4 = b.child.stateNode;
              }
              sh(b, g, c4);
            }
            break;
          case 5:
            var h = b.stateNode;
            if (null === c4 && b.flags & 4) {
              c4 = h;
              var k2 = b.memoizedProps;
              switch (b.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k2.autoFocus && c4.focus();
                  break;
                case "img":
                  k2.src && (c4.src = k2.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b.memoizedState) {
              var l2 = b.alternate;
              if (null !== l2) {
                var m2 = l2.memoizedState;
                if (null !== m2) {
                  var q2 = m2.dehydrated;
                  null !== q2 && bd(q2);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p$2(163));
        }
        U || b.flags & 512 && Rj(b);
      } catch (r2) {
        W(b, b.return, r2);
      }
    }
    if (b === a) {
      V = null;
      break;
    }
    c4 = b.sibling;
    if (null !== c4) {
      c4.return = b.return;
      V = c4;
      break;
    }
    V = b.return;
  }
}
function gk(a) {
  for (; null !== V; ) {
    var b = V;
    if (b === a) {
      V = null;
      break;
    }
    var c4 = b.sibling;
    if (null !== c4) {
      c4.return = b.return;
      V = c4;
      break;
    }
    V = b.return;
  }
}
function jk(a) {
  for (; null !== V; ) {
    var b = V;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c4 = b.return;
          try {
            Qj(4, b);
          } catch (k2) {
            W(b, c4, k2);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e2 = b.return;
            try {
              d.componentDidMount();
            } catch (k2) {
              W(b, e2, k2);
            }
          }
          var f2 = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, f2, k2);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, g, k2);
          }
      }
    } catch (k2) {
      W(b, b.return, k2);
    }
    if (b === a) {
      V = null;
      break;
    }
    var h = b.sibling;
    if (null !== h) {
      h.return = b.return;
      V = h;
      break;
    }
    V = b.return;
  }
}
var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R() {
  return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
}
function yi(a) {
  if (0 === (a.mode & 1)) return 1;
  if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
  if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
  a = C;
  if (0 !== a) return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function gi(a, b, c4, d) {
  if (50 < yk) throw yk = 0, zk = null, Error(p$2(185));
  Ac(a, c4, d);
  if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c4), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c4 && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
}
function Dk(a, b) {
  var c4 = a.callbackNode;
  wc(a, b);
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) null !== c4 && bc(c4), a.callbackNode = null, a.callbackPriority = 0;
  else if (b = d & -d, a.callbackPriority !== b) {
    null != c4 && bc(c4);
    if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
      0 === (K & 6) && jg();
    }), c4 = null;
    else {
      switch (Dc(d)) {
        case 1:
          c4 = fc;
          break;
        case 4:
          c4 = gc;
          break;
        case 16:
          c4 = hc;
          break;
        case 536870912:
          c4 = jc;
          break;
        default:
          c4 = hc;
      }
      c4 = Fk(c4, Gk.bind(null, a));
    }
    a.callbackPriority = b;
    a.callbackNode = c4;
  }
}
function Gk(a, b) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K & 6)) throw Error(p$2(327));
  var c4 = a.callbackNode;
  if (Hk() && a.callbackNode !== c4) return null;
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) return null;
  if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
  else {
    b = d;
    var e2 = K;
    K |= 2;
    var f2 = Jk();
    if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
    do
      try {
        Lk();
        break;
      } catch (h) {
        Mk(a, h);
      }
    while (1);
    $g();
    mk.current = f2;
    K = e2;
    null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
  }
  if (0 !== b) {
    2 === b && (e2 = xc(a), 0 !== e2 && (d = e2, b = Nk(a, e2)));
    if (1 === b) throw c4 = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c4;
    if (6 === b) Ck(a, d);
    else {
      e2 = a.current.alternate;
      if (0 === (d & 30) && !Ok(e2) && (b = Ik(a, d), 2 === b && (f2 = xc(a), 0 !== f2 && (d = f2, b = Nk(a, f2))), 1 === b)) throw c4 = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c4;
      a.finishedWork = e2;
      a.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p$2(345));
        case 2:
          Pk(a, tk, uk);
          break;
        case 3:
          Ck(a, d);
          if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
            if (0 !== uc(a, 0)) break;
            e2 = a.suspendedLanes;
            if ((e2 & d) !== d) {
              R();
              a.pingedLanes |= a.suspendedLanes & e2;
              break;
            }
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 4:
          Ck(a, d);
          if ((d & 4194240) === d) break;
          b = a.eventTimes;
          for (e2 = -1; 0 < d; ) {
            var g = 31 - oc(d);
            f2 = 1 << g;
            g = b[g];
            g > e2 && (e2 = g);
            d &= ~f2;
          }
          d = e2;
          d = B() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 5:
          Pk(a, tk, uk);
          break;
        default:
          throw Error(p$2(329));
      }
    }
  }
  Dk(a, B());
  return a.callbackNode === c4 ? Gk.bind(null, a) : null;
}
function Nk(a, b) {
  var c4 = sk;
  a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
  a = Ik(a, b);
  2 !== a && (b = tk, tk = c4, null !== b && Fj(b));
  return a;
}
function Fj(a) {
  null === tk ? tk = a : tk.push.apply(tk, a);
}
function Ok(a) {
  for (var b = a; ; ) {
    if (b.flags & 16384) {
      var c4 = b.updateQueue;
      if (null !== c4 && (c4 = c4.stores, null !== c4)) for (var d = 0; d < c4.length; d++) {
        var e2 = c4[d], f2 = e2.getSnapshot;
        e2 = e2.value;
        try {
          if (!He(f2(), e2)) return false;
        } catch (g) {
          return false;
        }
      }
    }
    c4 = b.child;
    if (b.subtreeFlags & 16384 && null !== c4) c4.return = b, b = c4;
    else {
      if (b === a) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a) return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Ck(a, b) {
  b &= ~rk;
  b &= ~qk;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b; ) {
    var c4 = 31 - oc(b), d = 1 << c4;
    a[c4] = -1;
    b &= ~d;
  }
}
function Ek(a) {
  if (0 !== (K & 6)) throw Error(p$2(327));
  Hk();
  var b = uc(a, 0);
  if (0 === (b & 1)) return Dk(a, B()), null;
  var c4 = Ik(a, b);
  if (0 !== a.tag && 2 === c4) {
    var d = xc(a);
    0 !== d && (b = d, c4 = Nk(a, d));
  }
  if (1 === c4) throw c4 = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c4;
  if (6 === c4) throw Error(p$2(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Pk(a, tk, uk);
  Dk(a, B());
  return null;
}
function Qk(a, b) {
  var c4 = K;
  K |= 1;
  try {
    return a(b);
  } finally {
    K = c4, 0 === K && (Gj = B() + 500, fg && jg());
  }
}
function Rk(a) {
  null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
  var b = K;
  K |= 1;
  var c4 = ok.transition, d = C;
  try {
    if (ok.transition = null, C = 1, a) return a();
  } finally {
    C = d, ok.transition = c4, K = b, 0 === (K & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E(ej);
}
function Kk(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c4 = a.timeoutHandle;
  -1 !== c4 && (a.timeoutHandle = -1, Gf(c4));
  if (null !== Y) for (c4 = Y.return; null !== c4; ) {
    var d = c4;
    wg(d);
    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && $f();
        break;
      case 3:
        zh();
        E(Wf);
        E(H);
        Eh();
        break;
      case 5:
        Bh(d);
        break;
      case 4:
        zh();
        break;
      case 13:
        E(L);
        break;
      case 19:
        E(L);
        break;
      case 10:
        ah(d.type._context);
        break;
      case 22:
      case 23:
        Hj();
    }
    c4 = c4.return;
  }
  Q = a;
  Y = a = Pg(a.current, null);
  Z = fj = b;
  T = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b = 0; b < fh.length; b++) if (c4 = fh[b], d = c4.interleaved, null !== d) {
      c4.interleaved = null;
      var e2 = d.next, f2 = c4.pending;
      if (null !== f2) {
        var g = f2.next;
        f2.next = e2;
        d.next = g;
      }
      c4.pending = d;
    }
    fh = null;
  }
  return a;
}
function Mk(a, b) {
  do {
    var c4 = Y;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d = M$1.memoizedState; null !== d; ) {
          var e2 = d.queue;
          null !== e2 && (e2.pending = null);
          d = d.next;
        }
        Ih = false;
      }
      Hh = 0;
      O = N = M$1 = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c4 || null === c4.return) {
        T = 1;
        pk = b;
        Y = null;
        break;
      }
      a: {
        var f2 = a, g = c4.return, h = c4, k2 = b;
        b = Z;
        h.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g, h, f2, b);
            y2.mode & 1 && Si(f2, l2, b);
            b = y2;
            k2 = l2;
            var n2 = b.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b.updateQueue = t2;
            } else n2.add(k2);
            break a;
          } else {
            if (0 === (b & 1)) {
              Si(f2, l2, b);
              tj();
              break a;
            }
            k2 = Error(p$2(426));
          }
        } else if (I && h.mode & 1) {
          var J2 = Ui(g);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g, h, f2, b);
            Jg(Ji(k2, h));
            break a;
          }
        }
        f2 = k2 = Ji(k2, h);
        4 !== T && (T = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b &= -b;
              f2.lanes |= b;
              var x2 = Ni(f2, k2, b);
              ph(f2, x2);
              break a;
            case 1:
              h = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var F2 = Qi(f2, h, b);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c4);
    } catch (na) {
      b = na;
      Y === c4 && null !== c4 && (Y = c4 = c4.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a = mk.current;
  mk.current = Rh;
  return null === a ? Rh : a;
}
function tj() {
  if (0 === T || 3 === T || 2 === T) T = 4;
  null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
}
function Ik(a, b) {
  var c4 = K;
  K |= 2;
  var d = Jk();
  if (Q !== a || Z !== b) uk = null, Kk(a, b);
  do
    try {
      Tk();
      break;
    } catch (e2) {
      Mk(a, e2);
    }
  while (1);
  $g();
  K = c4;
  mk.current = d;
  if (null !== Y) throw Error(p$2(261));
  Q = null;
  Z = 0;
  return T;
}
function Tk() {
  for (; null !== Y; ) Uk(Y);
}
function Lk() {
  for (; null !== Y && !cc(); ) Uk(Y);
}
function Uk(a) {
  var b = Vk(a.alternate, a, fj);
  a.memoizedProps = a.pendingProps;
  null === b ? Sk(a) : Y = b;
  nk.current = null;
}
function Sk(a) {
  var b = a;
  do {
    var c4 = b.alternate;
    a = b.return;
    if (0 === (b.flags & 32768)) {
      if (c4 = Ej(c4, b, fj), null !== c4) {
        Y = c4;
        return;
      }
    } else {
      c4 = Ij(c4, b);
      if (null !== c4) {
        c4.flags &= 32767;
        Y = c4;
        return;
      }
      if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        T = 6;
        Y = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y = b;
      return;
    }
    Y = b = a;
  } while (null !== b);
  0 === T && (T = 5);
}
function Pk(a, b, c4) {
  var d = C, e2 = ok.transition;
  try {
    ok.transition = null, C = 1, Wk(a, b, c4, d);
  } finally {
    ok.transition = e2, C = d;
  }
  return null;
}
function Wk(a, b, c4, d) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K & 6)) throw Error(p$2(327));
  c4 = a.finishedWork;
  var e2 = a.finishedLanes;
  if (null === c4) return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c4 === a.current) throw Error(p$2(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f2 = c4.lanes | c4.childLanes;
  Bc(a, f2);
  a === Q && (Y = Q = null, Z = 0);
  0 === (c4.subtreeFlags & 2064) && 0 === (c4.flags & 2064) || vk || (vk = true, Fk(hc, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c4.flags & 15990);
  if (0 !== (c4.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g = C;
    C = 1;
    var h = K;
    K |= 4;
    nk.current = null;
    Oj(a, c4);
    dk(c4, a);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c4;
    hk(c4);
    dc();
    K = h;
    C = g;
    ok.transition = f2;
  } else a.current = c4;
  vk && (vk = false, wk = a, xk = e2);
  f2 = a.pendingLanes;
  0 === f2 && (Ri = null);
  mc(c4.stateNode);
  Dk(a, B());
  if (null !== b) for (d = a.onRecoverableError, c4 = 0; c4 < b.length; c4++) e2 = b[c4], d(e2.value, { componentStack: e2.stack, digest: e2.digest });
  if (Oi) throw Oi = false, a = Pi, Pi = null, a;
  0 !== (xk & 1) && 0 !== a.tag && Hk();
  f2 = a.pendingLanes;
  0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a = Dc(xk), b = ok.transition, c4 = C;
    try {
      ok.transition = null;
      C = 16 > a ? 16 : a;
      if (null === wk) var d = false;
      else {
        a = wk;
        wk = null;
        xk = 0;
        if (0 !== (K & 6)) throw Error(p$2(331));
        var e2 = K;
        K |= 4;
        for (V = a.current; null !== V; ) {
          var f2 = V, g = f2.child;
          if (0 !== (V.flags & 16)) {
            var h = f2.deletions;
            if (null !== h) {
              for (var k2 = 0; k2 < h.length; k2++) {
                var l2 = h[k2];
                for (V = l2; null !== V; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2) q2.return = m2, V = q2;
                  else for (; null !== V; ) {
                    m2 = V;
                    var r2 = m2.sibling, y2 = m2.return;
                    Sj(m2);
                    if (m2 === l2) {
                      V = null;
                      break;
                    }
                    if (null !== r2) {
                      r2.return = y2;
                      V = r2;
                      break;
                    }
                    V = y2;
                  }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V = g;
          else b: for (; null !== V; ) {
            f2 = V;
            if (0 !== (f2.flags & 2048)) switch (f2.tag) {
              case 0:
              case 11:
              case 15:
                Pj(9, f2, f2.return);
            }
            var x2 = f2.sibling;
            if (null !== x2) {
              x2.return = f2.return;
              V = x2;
              break b;
            }
            V = f2.return;
          }
        }
        var w2 = a.current;
        for (V = w2; null !== V; ) {
          g = V;
          var u2 = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V = u2;
          else b: for (g = w2; null !== V; ) {
            h = V;
            if (0 !== (h.flags & 2048)) try {
              switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  Qj(9, h);
              }
            } catch (na) {
              W(h, h.return, na);
            }
            if (h === g) {
              V = null;
              break b;
            }
            var F2 = h.sibling;
            if (null !== F2) {
              F2.return = h.return;
              V = F2;
              break b;
            }
            V = h.return;
          }
        }
        K = e2;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a);
        } catch (na) {
        }
        d = true;
      }
      return d;
    } finally {
      C = c4, ok.transition = b;
    }
  }
  return false;
}
function Xk(a, b, c4) {
  b = Ji(c4, b);
  b = Ni(a, b, 1);
  a = nh(a, b, 1);
  b = R();
  null !== a && (Ac(a, 1, b), Dk(a, b));
}
function W(a, b, c4) {
  if (3 === a.tag) Xk(a, a, c4);
  else for (; null !== b; ) {
    if (3 === b.tag) {
      Xk(b, a, c4);
      break;
    } else if (1 === b.tag) {
      var d = b.stateNode;
      if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
        a = Ji(c4, a);
        a = Qi(b, a, 1);
        b = nh(b, a, 1);
        a = R();
        null !== b && (Ac(b, 1, a), Dk(b, a));
        break;
      }
    }
    b = b.return;
  }
}
function Ti(a, b, c4) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = R();
  a.pingedLanes |= a.suspendedLanes & c4;
  Q === a && (Z & c4) === c4 && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c4);
  Dk(a, b);
}
function Yk(a, b) {
  0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c4 = R();
  a = ih(a, b);
  null !== a && (Ac(a, b, c4), Dk(a, c4));
}
function uj(a) {
  var b = a.memoizedState, c4 = 0;
  null !== b && (c4 = b.retryLane);
  Yk(a, c4);
}
function bk(a, b) {
  var c4 = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e2 = a.memoizedState;
      null !== e2 && (c4 = e2.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p$2(314));
  }
  null !== d && d.delete(b);
  Yk(a, c4);
}
var Vk;
Vk = function(a, b, c4) {
  if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
  else {
    if (0 === (a.lanes & c4) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c4);
    dh = 0 !== (a.flags & 131072) ? true : false;
  }
  else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      ij(a, b);
      a = b.pendingProps;
      var e2 = Yf(b, H.current);
      ch(b, c4);
      e2 = Nh(null, b, d, a, e2, c4);
      var f2 = Sh();
      b.flags |= 1;
      "object" === typeof e2 && null !== e2 && "function" === typeof e2.render && void 0 === e2.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e2.state && void 0 !== e2.state ? e2.state : null, kh(b), e2.updater = Ei, b.stateNode = e2, e2._reactInternals = b, Ii(b, d, a, c4), b = jj(null, b, d, true, f2, c4)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e2, c4), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        ij(a, b);
        a = b.pendingProps;
        e2 = d._init;
        d = e2(d._payload);
        b.type = d;
        e2 = b.tag = Zk(d);
        a = Ci(d, a);
        switch (e2) {
          case 0:
            b = cj(null, b, d, a, c4);
            break a;
          case 1:
            b = hj(null, b, d, a, c4);
            break a;
          case 11:
            b = Yi(null, b, d, a, c4);
            break a;
          case 14:
            b = $i(null, b, d, Ci(d.type, a), c4);
            break a;
        }
        throw Error(p$2(
          306,
          d,
          ""
        ));
      }
      return b;
    case 0:
      return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), cj(a, b, d, e2, c4);
    case 1:
      return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), hj(a, b, d, e2, c4);
    case 3:
      a: {
        kj(b);
        if (null === a) throw Error(p$2(387));
        d = b.pendingProps;
        f2 = b.memoizedState;
        e2 = f2.element;
        lh(a, b);
        qh(b, d, null, c4);
        var g = b.memoizedState;
        d = g.element;
        if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
          e2 = Ji(Error(p$2(423)), b);
          b = lj(a, b, d, c4, e2);
          break a;
        } else if (d !== e2) {
          e2 = Ji(Error(p$2(424)), b);
          b = lj(a, b, d, c4, e2);
          break a;
        } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c4 = Vg(b, null, d, c4), b.child = c4; c4; ) c4.flags = c4.flags & -3 | 4096, c4 = c4.sibling;
        else {
          Ig();
          if (d === e2) {
            b = Zi(a, b, c4);
            break a;
          }
          Xi(a, b, d, c4);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Ah(b), null === a && Eg(b), d = b.type, e2 = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g = e2.children, Ef(d, e2) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c4), b.child;
    case 6:
      return null === a && Eg(b), null;
    case 13:
      return oj(a, b, c4);
    case 4:
      return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c4) : Xi(a, b, d, c4), b.child;
    case 11:
      return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), Yi(a, b, d, e2, c4);
    case 7:
      return Xi(a, b, b.pendingProps, c4), b.child;
    case 8:
      return Xi(a, b, b.pendingProps.children, c4), b.child;
    case 12:
      return Xi(a, b, b.pendingProps.children, c4), b.child;
    case 10:
      a: {
        d = b.type._context;
        e2 = b.pendingProps;
        f2 = b.memoizedProps;
        g = e2.value;
        G(Wg, d._currentValue);
        d._currentValue = g;
        if (null !== f2) if (He(f2.value, g)) {
          if (f2.children === e2.children && !Wf.current) {
            b = Zi(a, b, c4);
            break a;
          }
        } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
          var h = f2.dependencies;
          if (null !== h) {
            g = f2.child;
            for (var k2 = h.firstContext; null !== k2; ) {
              if (k2.context === d) {
                if (1 === f2.tag) {
                  k2 = mh(-1, c4 & -c4);
                  k2.tag = 2;
                  var l2 = f2.updateQueue;
                  if (null !== l2) {
                    l2 = l2.shared;
                    var m2 = l2.pending;
                    null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                    l2.pending = k2;
                  }
                }
                f2.lanes |= c4;
                k2 = f2.alternate;
                null !== k2 && (k2.lanes |= c4);
                bh(
                  f2.return,
                  c4,
                  b
                );
                h.lanes |= c4;
                break;
              }
              k2 = k2.next;
            }
          } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
          else if (18 === f2.tag) {
            g = f2.return;
            if (null === g) throw Error(p$2(341));
            g.lanes |= c4;
            h = g.alternate;
            null !== h && (h.lanes |= c4);
            bh(g, c4, b);
            g = f2.sibling;
          } else g = f2.child;
          if (null !== g) g.return = f2;
          else for (g = f2; null !== g; ) {
            if (g === b) {
              g = null;
              break;
            }
            f2 = g.sibling;
            if (null !== f2) {
              f2.return = g.return;
              g = f2;
              break;
            }
            g = g.return;
          }
          f2 = g;
        }
        Xi(a, b, e2.children, c4);
        b = b.child;
      }
      return b;
    case 9:
      return e2 = b.type, d = b.pendingProps.children, ch(b, c4), e2 = eh(e2), d = d(e2), b.flags |= 1, Xi(a, b, d, c4), b.child;
    case 14:
      return d = b.type, e2 = Ci(d, b.pendingProps), e2 = Ci(d.type, e2), $i(a, b, d, e2, c4);
    case 15:
      return bj(a, b, b.type, b.pendingProps, c4);
    case 17:
      return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c4), Gi(b, d, e2), Ii(b, d, e2, c4), jj(null, b, d, true, a, c4);
    case 19:
      return xj(a, b, c4);
    case 22:
      return dj(a, b, c4);
  }
  throw Error(p$2(156, b.tag));
};
function Fk(a, b) {
  return ac(a, b);
}
function $k(a, b, c4, d) {
  this.tag = a;
  this.key = c4;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b, c4, d) {
  return new $k(a, b, c4, d);
}
function aj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function Zk(a) {
  if ("function" === typeof a) return aj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da) return 11;
    if (a === Ga) return 14;
  }
  return 2;
}
function Pg(a, b) {
  var c4 = a.alternate;
  null === c4 ? (c4 = Bg(a.tag, b, a.key, a.mode), c4.elementType = a.elementType, c4.type = a.type, c4.stateNode = a.stateNode, c4.alternate = a, a.alternate = c4) : (c4.pendingProps = b, c4.type = a.type, c4.flags = 0, c4.subtreeFlags = 0, c4.deletions = null);
  c4.flags = a.flags & 14680064;
  c4.childLanes = a.childLanes;
  c4.lanes = a.lanes;
  c4.child = a.child;
  c4.memoizedProps = a.memoizedProps;
  c4.memoizedState = a.memoizedState;
  c4.updateQueue = a.updateQueue;
  b = a.dependencies;
  c4.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c4.sibling = a.sibling;
  c4.index = a.index;
  c4.ref = a.ref;
  return c4;
}
function Rg(a, b, c4, d, e2, f2) {
  var g = 2;
  d = a;
  if ("function" === typeof a) aj(a) && (g = 1);
  else if ("string" === typeof a) g = 5;
  else a: switch (a) {
    case ya:
      return Tg(c4.children, e2, f2, b);
    case za:
      g = 8;
      e2 |= 8;
      break;
    case Aa:
      return a = Bg(12, c4, b, e2 | 2), a.elementType = Aa, a.lanes = f2, a;
    case Ea:
      return a = Bg(13, c4, b, e2), a.elementType = Ea, a.lanes = f2, a;
    case Fa:
      return a = Bg(19, c4, b, e2), a.elementType = Fa, a.lanes = f2, a;
    case Ia:
      return pj(c4, e2, f2, b);
    default:
      if ("object" === typeof a && null !== a) switch (a.$$typeof) {
        case Ba:
          g = 10;
          break a;
        case Ca:
          g = 9;
          break a;
        case Da:
          g = 11;
          break a;
        case Ga:
          g = 14;
          break a;
        case Ha:
          g = 16;
          d = null;
          break a;
      }
      throw Error(p$2(130, null == a ? a : typeof a, ""));
  }
  b = Bg(g, c4, b, e2);
  b.elementType = a;
  b.type = d;
  b.lanes = f2;
  return b;
}
function Tg(a, b, c4, d) {
  a = Bg(7, a, d, b);
  a.lanes = c4;
  return a;
}
function pj(a, b, c4, d) {
  a = Bg(22, a, d, b);
  a.elementType = Ia;
  a.lanes = c4;
  a.stateNode = { isHidden: false };
  return a;
}
function Qg(a, b, c4) {
  a = Bg(6, a, null, b);
  a.lanes = c4;
  return a;
}
function Sg(a, b, c4) {
  b = Bg(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c4;
  b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b;
}
function al(a, b, c4, d, e2) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e2;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a, b, c4, d, e2, f2, g, h, k2) {
  a = new al(a, b, c4, h, k2);
  1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
  f2 = Bg(3, null, null, b);
  a.current = f2;
  f2.stateNode = a;
  f2.memoizedState = { element: d, isDehydrated: c4, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a;
}
function cl(a, b, c4) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c4 };
}
function dl(a) {
  if (!a) return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag) throw Error(p$2(170));
    var b = a;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p$2(171));
  }
  if (1 === a.tag) {
    var c4 = a.type;
    if (Zf(c4)) return bg(a, c4, b);
  }
  return b;
}
function el(a, b, c4, d, e2, f2, g, h, k2) {
  a = bl(c4, d, true, a, e2, f2, g, h, k2);
  a.context = dl(null);
  c4 = a.current;
  d = R();
  e2 = yi(c4);
  f2 = mh(d, e2);
  f2.callback = void 0 !== b && null !== b ? b : null;
  nh(c4, f2, e2);
  a.current.lanes = e2;
  Ac(a, e2, d);
  Dk(a, d);
  return a;
}
function fl(a, b, c4, d) {
  var e2 = b.current, f2 = R(), g = yi(e2);
  c4 = dl(c4);
  null === b.context ? b.context = c4 : b.pendingContext = c4;
  b = mh(f2, g);
  b.payload = { element: a };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a = nh(e2, b, g);
  null !== a && (gi(a, e2, g, f2), oh(a, e2, g));
  return g;
}
function gl(a) {
  a = a.current;
  if (!a.child) return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function hl(a, b) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c4 = a.retryLane;
    a.retryLane = 0 !== c4 && c4 < b ? c4 : b;
  }
}
function il(a, b) {
  hl(a, b);
  (a = a.alternate) && hl(a, b);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a) {
  console.error(a);
};
function ll(a) {
  this._internalRoot = a;
}
ml.prototype.render = ll.prototype.render = function(a) {
  var b = this._internalRoot;
  if (null === b) throw Error(p$2(409));
  fl(a, b, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b = a.containerInfo;
    Rk(function() {
      fl(null, a, null, null);
    });
    b[uf] = null;
  }
};
function ml(a) {
  this._internalRoot = a;
}
ml.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b = Hc();
    a = { blockedOn: null, target: a, priority: b };
    for (var c4 = 0; c4 < Qc.length && 0 !== b && b < Qc[c4].priority; c4++) ;
    Qc.splice(c4, 0, a);
    0 === c4 && Vc(a);
  }
};
function nl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function pl() {
}
function ql(a, b, c4, d, e2) {
  if (e2) {
    if ("function" === typeof d) {
      var f2 = d;
      d = function() {
        var a2 = gl(g);
        f2.call(a2);
      };
    }
    var g = el(b, d, a, 0, null, false, false, "", pl);
    a._reactRootContainer = g;
    a[uf] = g.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk();
    return g;
  }
  for (; e2 = a.lastChild; ) a.removeChild(e2);
  if ("function" === typeof d) {
    var h = d;
    d = function() {
      var a2 = gl(k2);
      h.call(a2);
    };
  }
  var k2 = bl(a, 0, false, null, null, false, false, "", pl);
  a._reactRootContainer = k2;
  a[uf] = k2.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Rk(function() {
    fl(b, k2, c4, d);
  });
  return k2;
}
function rl(a, b, c4, d, e2) {
  var f2 = c4._reactRootContainer;
  if (f2) {
    var g = f2;
    if ("function" === typeof e2) {
      var h = e2;
      e2 = function() {
        var a2 = gl(g);
        h.call(a2);
      };
    }
    fl(b, g, a, e2);
  } else g = ql(c4, b, a, e2, d);
  return gl(g);
}
Ec = function(a) {
  switch (a.tag) {
    case 3:
      var b = a.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c4 = tc(b.pendingLanes);
        0 !== c4 && (Cc(b, c4 | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b2 = ih(a, 1);
        if (null !== b2) {
          var c5 = R();
          gi(b2, a, 1, c5);
        }
      }), il(a, 1);
  }
};
Fc = function(a) {
  if (13 === a.tag) {
    var b = ih(a, 134217728);
    if (null !== b) {
      var c4 = R();
      gi(b, a, 134217728, c4);
    }
    il(a, 134217728);
  }
};
Gc = function(a) {
  if (13 === a.tag) {
    var b = yi(a), c4 = ih(a, b);
    if (null !== c4) {
      var d = R();
      gi(c4, a, b, d);
    }
    il(a, b);
  }
};
Hc = function() {
  return C;
};
Ic = function(a, b) {
  var c4 = C;
  try {
    return C = a, b();
  } finally {
    C = c4;
  }
};
yb = function(a, b, c4) {
  switch (b) {
    case "input":
      bb(a, c4);
      b = c4.name;
      if ("radio" === c4.type && null != b) {
        for (c4 = a; c4.parentNode; ) c4 = c4.parentNode;
        c4 = c4.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c4.length; b++) {
          var d = c4[b];
          if (d !== a && d.form === a.form) {
            var e2 = Db(d);
            if (!e2) throw Error(p$2(90));
            Wa(d);
            bb(d, e2);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c4);
      break;
    case "select":
      b = c4.value, null != b && fb(a, !!c4.multiple, b, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Zb(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    kc = vl.inject(ul), lc = vl;
  } catch (a) {
  }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
reactDom_production_min.createPortal = function(a, b) {
  var c4 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b)) throw Error(p$2(200));
  return cl(a, b, null, c4);
};
reactDom_production_min.createRoot = function(a, b) {
  if (!nl(a)) throw Error(p$2(299));
  var c4 = false, d = "", e2 = kl;
  null !== b && void 0 !== b && (true === b.unstable_strictMode && (c4 = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e2 = b.onRecoverableError));
  b = bl(a, 1, false, null, null, c4, false, d, e2);
  a[uf] = b.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ll(b);
};
reactDom_production_min.findDOMNode = function(a) {
  if (null == a) return null;
  if (1 === a.nodeType) return a;
  var b = a._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a.render) throw Error(p$2(188));
    a = Object.keys(a).join(",");
    throw Error(p$2(268, a));
  }
  a = Zb(b);
  a = null === a ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a) {
  return Rk(a);
};
reactDom_production_min.hydrate = function(a, b, c4) {
  if (!ol(b)) throw Error(p$2(200));
  return rl(null, a, b, true, c4);
};
reactDom_production_min.hydrateRoot = function(a, b, c4) {
  if (!nl(a)) throw Error(p$2(405));
  var d = null != c4 && c4.hydratedSources || null, e2 = false, f2 = "", g = kl;
  null !== c4 && void 0 !== c4 && (true === c4.unstable_strictMode && (e2 = true), void 0 !== c4.identifierPrefix && (f2 = c4.identifierPrefix), void 0 !== c4.onRecoverableError && (g = c4.onRecoverableError));
  b = el(b, null, a, 1, null != c4 ? c4 : null, e2, false, f2, g);
  a[uf] = b.current;
  sf(a);
  if (d) for (a = 0; a < d.length; a++) c4 = d[a], e2 = c4._getVersion, e2 = e2(c4._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c4, e2] : b.mutableSourceEagerHydrationData.push(
    c4,
    e2
  );
  return new ml(b);
};
reactDom_production_min.render = function(a, b, c4) {
  if (!ol(b)) throw Error(p$2(200));
  return rl(null, a, b, false, c4);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!ol(a)) throw Error(p$2(40));
  return a._reactRootContainer ? (Rk(function() {
    rl(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c4, d) {
  if (!ol(c4)) throw Error(p$2(200));
  if (null == a || void 0 === a._reactInternals) throw Error(p$2(38));
  return rl(a, b, c4, false, d);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
const ReactDOM = /* @__PURE__ */ getDefaultExportFromCjs(reactDomExports);
var createRoot;
var m = reactDomExports;
{
  createRoot = m.createRoot;
  m.hydrateRoot;
}
const __vite_import_meta_env__$1 = {};
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api = { setState, getState, getInitialState, subscribe, destroy };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
var withSelector = { exports: {} };
var withSelector_production = {};
var shim$2 = { exports: {} };
var useSyncExternalStoreShim_production = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React$1 = reactExports;
function is$1(x2, y2) {
  return x2 === y2 && (0 !== x2 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
}
var objectIs$1 = "function" === typeof Object.is ? Object.is : is$1, useState = React$1.useState, useEffect$1 = React$1.useEffect, useLayoutEffect = React$1.useLayoutEffect, useDebugValue$2 = React$1.useDebugValue;
function useSyncExternalStore$2(subscribe, getSnapshot) {
  var value = getSnapshot(), _useState = useState({ inst: { value, getSnapshot } }), inst = _useState[0].inst, forceUpdate = _useState[1];
  useLayoutEffect(
    function() {
      inst.value = value;
      inst.getSnapshot = getSnapshot;
      checkIfSnapshotChanged(inst) && forceUpdate({ inst });
    },
    [subscribe, value, getSnapshot]
  );
  useEffect$1(
    function() {
      checkIfSnapshotChanged(inst) && forceUpdate({ inst });
      return subscribe(function() {
        checkIfSnapshotChanged(inst) && forceUpdate({ inst });
      });
    },
    [subscribe]
  );
  useDebugValue$2(value);
  return value;
}
function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  inst = inst.value;
  try {
    var nextValue = latestGetSnapshot();
    return !objectIs$1(inst, nextValue);
  } catch (error) {
    return true;
  }
}
function useSyncExternalStore$1(subscribe, getSnapshot) {
  return getSnapshot();
}
var shim$1 = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
useSyncExternalStoreShim_production.useSyncExternalStore = void 0 !== React$1.useSyncExternalStore ? React$1.useSyncExternalStore : shim$1;
{
  shim$2.exports = useSyncExternalStoreShim_production;
}
var shimExports = shim$2.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React = reactExports, shim = shimExports;
function is(x2, y2) {
  return x2 === y2 && (0 !== x2 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
}
var objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = shim.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue$1 = React.useDebugValue;
withSelector_production.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
  var instRef = useRef(null);
  if (null === instRef.current) {
    var inst = { hasValue: false, value: null };
    instRef.current = inst;
  } else inst = instRef.current;
  instRef = useMemo(
    function() {
      function memoizedSelector(nextSnapshot) {
        if (!hasMemo) {
          hasMemo = true;
          memoizedSnapshot = nextSnapshot;
          nextSnapshot = selector(nextSnapshot);
          if (void 0 !== isEqual && inst.hasValue) {
            var currentSelection = inst.value;
            if (isEqual(currentSelection, nextSnapshot))
              return memoizedSelection = currentSelection;
          }
          return memoizedSelection = nextSnapshot;
        }
        currentSelection = memoizedSelection;
        if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
        var nextSelection = selector(nextSnapshot);
        if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
          return memoizedSnapshot = nextSnapshot, currentSelection;
        memoizedSnapshot = nextSnapshot;
        return memoizedSelection = nextSelection;
      }
      var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
      return [
        function() {
          return memoizedSelector(getSnapshot());
        },
        null === maybeGetServerSnapshot ? void 0 : function() {
          return memoizedSelector(maybeGetServerSnapshot());
        }
      ];
    },
    [getSnapshot, getServerSnapshot, selector, isEqual]
  );
  var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
  useEffect(
    function() {
      inst.hasValue = true;
      inst.value = value;
    },
    [value]
  );
  useDebugValue$1(value);
  return value;
};
{
  withSelector.exports = withSelector_production;
}
var withSelectorExports = withSelector.exports;
const useSyncExternalStoreExports = /* @__PURE__ */ getDefaultExportFromCjs(withSelectorExports);
const __vite_import_meta_env__ = {};
const { useDebugValue } = React$2;
const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;
let didWarnAboutEqualityFn = false;
const identity$1 = (arg) => arg;
function useStore(api, selector = identity$1, equalityFn) {
  if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && equalityFn && !didWarnAboutEqualityFn) {
    console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
    );
    didWarnAboutEqualityFn = true;
  }
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getInitialState,
    selector,
    equalityFn
  );
  useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && typeof createState !== "function") {
    console.warn(
      "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
    );
  }
  const api = typeof createState === "function" ? createStore(createState) : createState;
  const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
const defaultPalette = {
  primary: "#6366f1",
  secondary: "#ec4899",
  accent: "#22c55e",
  tertiary: "#a855f7",
  background: "#0b0b0c",
  surface: "#1f2937",
  surfaceAlt: "#243045",
  surfaceElevated: "#2d3a52",
  surfaceInverted: "#f8fafc",
  text: "#e5e7eb",
  textMuted: "#94a3b8",
  textInverted: "#0f172a",
  textOnPrimary: "#ffffff",
  textOnSuccess: "#052e16",
  textOnDanger: "#450a0a",
  border: "#374151",
  borderSubtle: "#2a3446",
  borderStrong: "#475569",
  outline: "#475569",
  muted: "#94a3b8",
  link: "#3b82f6",
  neutral: "#9ca3af",
  highlight: "#fde047",
  overlay: "#111827",
  backdrop: "rgba(15,23,42,0.6)",
  shadow: "#000000",
  success: "#22c55e",
  successHover: "#16a34a",
  successActive: "#15803d",
  successSubtle: "#dcfce7",
  successSubtleHover: "#bbf7d0",
  successFg: "#052e16",
  danger: "#ef4444",
  dangerHover: "#dc2626",
  dangerActive: "#b91c1c",
  dangerSubtle: "#fee2e2",
  dangerSubtleHover: "#fecaca",
  dangerFg: "#450a0a",
  warning: "#f59e0b",
  warningHover: "#d97706",
  warningActive: "#b45309",
  warningSubtle: "#fef9c3",
  warningSubtleHover: "#fde68a",
  warningFg: "#442a03",
  info: "#3b82f6",
  infoHover: "#2563eb",
  infoActive: "#1d4ed8",
  infoSubtle: "#e0f2fe",
  infoSubtleHover: "#bae6fd",
  infoFg: "#082f49",
  focus: "#818cf8",
  focusRing: "#818cf8",
  active: "#6366f1",
  disabled: "#d1d5db",
  error: "#ef4444",
  successBg: "#dcfce7",
  successBgStrong: "#bbf7d0",
  dangerBg: "#fee2e2",
  dangerBgStrong: "#fecaca",
  warningBg: "#fef9c3",
  warningBgStrong: "#fde68a",
  infoBg: "#e0f2fe",
  infoBgStrong: "#bae6fd",
  selection: "#f3f4f6",
  selectionFg: "#1e293b",
  placeholder: "#9ca3af",
  skeleton: "#1e2532",
  primaryHover: "#4f46e5",
  primaryActive: "#4338ca",
  primarySubtle: "#eef2ff",
  primarySubtleHover: "#e0e7ff",
  primaryFg: "#ffffff"
};
function safeHex$2(val) {
  if (typeof val !== "string" || !val.trim()) return "#000000";
  let v2 = val.trim();
  if (!v2.startsWith("#")) v2 = "#" + v2;
  if (/^#([0-9a-fA-F]{8})$/.test(v2)) v2 = "#" + v2.slice(1, 7);
  const short = /^#([0-9a-fA-F]{3})$/;
  const long = /^#([0-9a-fA-F]{6})$/;
  if (short.test(v2)) {
    const m2 = v2.slice(1);
    v2 = "#" + m2.split("").map((ch2) => ch2 + ch2).join("");
  }
  if (!long.test(v2)) return "#000000";
  return v2.toLowerCase();
}
function hexToRgb(hex2) {
  const v2 = safeHex$2(hex2);
  if (!/^#([0-9a-fA-F]{6})$/.test(v2)) return { r: 0, g: 0, b: 0 };
  const n2 = v2.slice(1);
  const bigint = Number.parseInt(n2, 16);
  if (Number.isNaN(bigint)) return { r: 0, g: 0, b: 0 };
  return { r: bigint >> 16 & 255, g: bigint >> 8 & 255, b: bigint & 255 };
}
function luminance(hex2) {
  const { r: r2, g, b } = hexToRgb(hex2);
  const [R2, G2, B2] = [r2, g, b].map((v2) => {
    const x2 = v2 / 255;
    return x2 <= 0.03928 ? x2 / 12.92 : Math.pow((x2 + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * R2 + 0.7152 * G2 + 0.0722 * B2;
}
function contrastRatio(hex1, hex2) {
  const L1 = luminance(hex1);
  const L2 = luminance(hex2);
  const [hi2, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi2 + 0.05) / (lo + 0.05);
}
function clamp01$1(x2) {
  return Math.min(1, Math.max(0, x2));
}
function rgbToHex(r2, g, b) {
  const to = (n2) => n2.toString(16).padStart(2, "0");
  return "#" + to(r2) + to(g) + to(b);
}
function lighten(hex2, amt) {
  const { r: r2, g, b } = hexToRgb(hex2);
  const k2 = clamp01$1(amt);
  return rgbToHex(
    Math.round(r2 + (255 - r2) * k2),
    Math.round(g + (255 - g) * k2),
    Math.round(b + (255 - b) * k2)
  );
}
function darken(hex2, amt) {
  const { r: r2, g, b } = hexToRgb(hex2);
  const k2 = clamp01$1(amt);
  return rgbToHex(
    Math.round(r2 * (1 - k2)),
    Math.round(g * (1 - k2)),
    Math.round(b * (1 - k2))
  );
}
function mix(hex1, hex2, ratio) {
  const k2 = clamp01$1(ratio);
  const a = hexToRgb(hex1);
  const b = hexToRgb(hex2);
  return rgbToHex(
    Math.round(a.r + (b.r - a.r) * k2),
    Math.round(a.g + (b.g - a.g) * k2),
    Math.round(a.b + (b.b - a.b) * k2)
  );
}
function ensureContrast(fg2, bg2, target) {
  let cFg = safeHex$2(fg2), cBg = safeHex$2(bg2);
  let current = contrastRatio(cFg, cBg);
  if (current >= target) return cFg;
  const towardWhite = contrastRatio("#ffffff", cBg) > contrastRatio("#000000", cBg);
  const extreme = towardWhite ? "#ffffff" : "#000000";
  let lo = 0, hi2 = 0, step = 0.25, candidate = cFg;
  while (hi2 < 1) {
    const test = mix(cFg, extreme, hi2);
    const c4 = contrastRatio(test, cBg);
    if (c4 >= target) {
      candidate = test;
      break;
    }
    hi2 += step;
  }
  if (hi2 >= 1) {
    return extreme;
  }
  lo = hi2 - step;
  for (let i = 0; i < 7; i++) {
    const mid = (lo + hi2) / 2;
    const test = mix(cFg, extreme, mid);
    const c4 = contrastRatio(test, cBg);
    if (c4 >= target) {
      candidate = test;
      hi2 = mid;
    } else {
      lo = mid;
    }
  }
  return candidate;
}
function rgbDistance(a, b) {
  const A2 = hexToRgb(a), B2 = hexToRgb(b);
  const dr = A2.r - B2.r, dg2 = A2.g - B2.g, db2 = A2.b - B2.b;
  return Math.sqrt(dr * dr + dg2 * dg2 + db2 * db2);
}
function srgbToLinear$1(c4) {
  const x2 = c4 / 255;
  return x2 <= 0.04045 ? x2 / 12.92 : Math.pow((x2 + 0.055) / 1.055, 2.4);
}
function linearToOklab(r2, g, b) {
  const l2 = 0.4122214708 * r2 + 0.5363325363 * g + 0.0514459929 * b;
  const m2 = 0.2119034982 * r2 + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r2 + 0.2817188376 * g + 0.6299787005 * b;
  const l_ = Math.cbrt(l2);
  const m_ = Math.cbrt(m2);
  const s_ = Math.cbrt(s);
  return {
    L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_
  };
}
function deltaE(a, b) {
  const A2 = hexToRgb(a), B2 = hexToRgb(b);
  const la2 = linearToOklab(srgbToLinear$1(A2.r), srgbToLinear$1(A2.g), srgbToLinear$1(A2.b));
  const lb2 = linearToOklab(srgbToLinear$1(B2.r), srgbToLinear$1(B2.g), srgbToLinear$1(B2.b));
  const dL = la2.L - lb2.L;
  const da2 = la2.a - lb2.a;
  const db2 = la2.b - lb2.b;
  return Math.sqrt(dL * dL + da2 * da2 + db2 * db2);
}
const parseNumber = (color, len) => {
  if (typeof color !== "number") return;
  if (len === 3) {
    return {
      mode: "rgb",
      r: (color >> 8 & 15 | color >> 4 & 240) / 255,
      g: (color >> 4 & 15 | color & 240) / 255,
      b: (color & 15 | color << 4 & 240) / 255
    };
  }
  if (len === 4) {
    return {
      mode: "rgb",
      r: (color >> 12 & 15 | color >> 8 & 240) / 255,
      g: (color >> 8 & 15 | color >> 4 & 240) / 255,
      b: (color >> 4 & 15 | color & 240) / 255,
      alpha: (color & 15 | color << 4 & 240) / 255
    };
  }
  if (len === 6) {
    return {
      mode: "rgb",
      r: (color >> 16 & 255) / 255,
      g: (color >> 8 & 255) / 255,
      b: (color & 255) / 255
    };
  }
  if (len === 8) {
    return {
      mode: "rgb",
      r: (color >> 24 & 255) / 255,
      g: (color >> 16 & 255) / 255,
      b: (color >> 8 & 255) / 255,
      alpha: (color & 255) / 255
    };
  }
};
const named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  // Added in CSS Colors Level 4:
  // https://drafts.csswg.org/css-color/#changes-from-3
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
const parseNamed = (color) => {
  return parseNumber(named[color.toLowerCase()], 6);
};
const hex = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i;
const parseHex = (color) => {
  let match;
  return (match = color.match(hex)) ? parseNumber(parseInt(match[1], 16), match[1].length) : void 0;
};
const num$1 = "([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)";
const per = `${num$1}%`;
const num_per = `(?:${num$1}%|${num$1})`;
const hue$1 = `(?:${num$1}(deg|grad|rad|turn)|${num$1})`;
const c = `\\s*,\\s*`;
const rgb_num_old = new RegExp(
  `^rgba?\\(\\s*${num$1}${c}${num$1}${c}${num$1}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
);
const rgb_per_old = new RegExp(
  `^rgba?\\(\\s*${per}${c}${per}${c}${per}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
);
const parseRgbLegacy = (color) => {
  let res = { mode: "rgb" };
  let match;
  if (match = color.match(rgb_num_old)) {
    if (match[1] !== void 0) {
      res.r = match[1] / 255;
    }
    if (match[2] !== void 0) {
      res.g = match[2] / 255;
    }
    if (match[3] !== void 0) {
      res.b = match[3] / 255;
    }
  } else if (match = color.match(rgb_per_old)) {
    if (match[1] !== void 0) {
      res.r = match[1] / 100;
    }
    if (match[2] !== void 0) {
      res.g = match[2] / 100;
    }
    if (match[3] !== void 0) {
      res.b = match[3] / 100;
    }
  } else {
    return void 0;
  }
  if (match[4] !== void 0) {
    res.alpha = match[4] / 100;
  } else if (match[5] !== void 0) {
    res.alpha = +match[5];
  }
  return res;
};
const prepare = (color, mode) => color === void 0 ? void 0 : typeof color !== "object" ? parse(color) : color.mode !== void 0 ? color : mode ? { ...color, mode } : void 0;
const converter = (target_mode = "rgb") => (color) => (color = prepare(color, target_mode)) !== void 0 ? (
  // if the color's mode corresponds to our target mode
  color.mode === target_mode ? (
    // then just return the color
    color
  ) : (
    // otherwise check to see if we have a dedicated
    // converter for the target mode
    converters[color.mode][target_mode] ? (
      // and return its result...
      converters[color.mode][target_mode](color)
    ) : (
      // ...otherwise pass through RGB as an intermediary step.
      // if the target mode is RGB...
      target_mode === "rgb" ? (
        // just return the RGB
        converters[color.mode].rgb(color)
      ) : (
        // otherwise convert color.mode -> RGB -> target_mode
        converters.rgb[target_mode](converters[color.mode].rgb(color))
      )
    )
  )
) : void 0;
const converters = {};
const modes = {};
const parsers = [];
const colorProfiles = {};
const identity = (v2) => v2;
const useMode = (definition2) => {
  converters[definition2.mode] = {
    ...converters[definition2.mode],
    ...definition2.toMode
  };
  Object.keys(definition2.fromMode || {}).forEach((k2) => {
    if (!converters[k2]) {
      converters[k2] = {};
    }
    converters[k2][definition2.mode] = definition2.fromMode[k2];
  });
  if (!definition2.ranges) {
    definition2.ranges = {};
  }
  if (!definition2.difference) {
    definition2.difference = {};
  }
  definition2.channels.forEach((channel) => {
    if (definition2.ranges[channel] === void 0) {
      definition2.ranges[channel] = [0, 1];
    }
    if (!definition2.interpolate[channel]) {
      throw new Error(`Missing interpolator for: ${channel}`);
    }
    if (typeof definition2.interpolate[channel] === "function") {
      definition2.interpolate[channel] = {
        use: definition2.interpolate[channel]
      };
    }
    if (!definition2.interpolate[channel].fixup) {
      definition2.interpolate[channel].fixup = identity;
    }
  });
  modes[definition2.mode] = definition2;
  (definition2.parse || []).forEach((parser) => {
    useParser(parser, definition2.mode);
  });
  return converter(definition2.mode);
};
const getMode = (mode) => modes[mode];
const useParser = (parser, mode) => {
  if (typeof parser === "string") {
    if (!mode) {
      throw new Error(`'mode' required when 'parser' is a string`);
    }
    colorProfiles[parser] = mode;
  } else if (typeof parser === "function") {
    if (parsers.indexOf(parser) < 0) {
      parsers.push(parser);
    }
  }
};
const IdentStartCodePoint = /[^\x00-\x7F]|[a-zA-Z_]/;
const IdentCodePoint = /[^\x00-\x7F]|[-\w]/;
const Tok = {
  Function: "function",
  Ident: "ident",
  Number: "number",
  Percentage: "percentage",
  ParenClose: ")",
  None: "none",
  Hue: "hue",
  Alpha: "alpha"
};
let _i = 0;
function is_num(chars) {
  let ch2 = chars[_i];
  let ch1 = chars[_i + 1];
  if (ch2 === "-" || ch2 === "+") {
    return /\d/.test(ch1) || ch1 === "." && /\d/.test(chars[_i + 2]);
  }
  if (ch2 === ".") {
    return /\d/.test(ch1);
  }
  return /\d/.test(ch2);
}
function is_ident(chars) {
  if (_i >= chars.length) {
    return false;
  }
  let ch2 = chars[_i];
  if (IdentStartCodePoint.test(ch2)) {
    return true;
  }
  if (ch2 === "-") {
    if (chars.length - _i < 2) {
      return false;
    }
    let ch1 = chars[_i + 1];
    if (ch1 === "-" || IdentStartCodePoint.test(ch1)) {
      return true;
    }
    return false;
  }
  return false;
}
const huenits = {
  deg: 1,
  rad: 180 / Math.PI,
  grad: 9 / 10,
  turn: 360
};
function num(chars) {
  let value = "";
  if (chars[_i] === "-" || chars[_i] === "+") {
    value += chars[_i++];
  }
  value += digits(chars);
  if (chars[_i] === "." && /\d/.test(chars[_i + 1])) {
    value += chars[_i++] + digits(chars);
  }
  if (chars[_i] === "e" || chars[_i] === "E") {
    if ((chars[_i + 1] === "-" || chars[_i + 1] === "+") && /\d/.test(chars[_i + 2])) {
      value += chars[_i++] + chars[_i++] + digits(chars);
    } else if (/\d/.test(chars[_i + 1])) {
      value += chars[_i++] + digits(chars);
    }
  }
  if (is_ident(chars)) {
    let id2 = ident(chars);
    if (id2 === "deg" || id2 === "rad" || id2 === "turn" || id2 === "grad") {
      return { type: Tok.Hue, value: value * huenits[id2] };
    }
    return void 0;
  }
  if (chars[_i] === "%") {
    _i++;
    return { type: Tok.Percentage, value: +value };
  }
  return { type: Tok.Number, value: +value };
}
function digits(chars) {
  let v2 = "";
  while (/\d/.test(chars[_i])) {
    v2 += chars[_i++];
  }
  return v2;
}
function ident(chars) {
  let v2 = "";
  while (_i < chars.length && IdentCodePoint.test(chars[_i])) {
    v2 += chars[_i++];
  }
  return v2;
}
function identlike(chars) {
  let v2 = ident(chars);
  if (chars[_i] === "(") {
    _i++;
    return { type: Tok.Function, value: v2 };
  }
  if (v2 === "none") {
    return { type: Tok.None, value: void 0 };
  }
  return { type: Tok.Ident, value: v2 };
}
function tokenize(str = "") {
  let chars = str.trim();
  let tokens = [];
  let ch2;
  _i = 0;
  while (_i < chars.length) {
    ch2 = chars[_i++];
    if (ch2 === "\n" || ch2 === "	" || ch2 === " ") {
      while (_i < chars.length && (chars[_i] === "\n" || chars[_i] === "	" || chars[_i] === " ")) {
        _i++;
      }
      continue;
    }
    if (ch2 === ",") {
      return void 0;
    }
    if (ch2 === ")") {
      tokens.push({ type: Tok.ParenClose });
      continue;
    }
    if (ch2 === "+") {
      _i--;
      if (is_num(chars)) {
        tokens.push(num(chars));
        continue;
      }
      return void 0;
    }
    if (ch2 === "-") {
      _i--;
      if (is_num(chars)) {
        tokens.push(num(chars));
        continue;
      }
      if (is_ident(chars)) {
        tokens.push({ type: Tok.Ident, value: ident(chars) });
        continue;
      }
      return void 0;
    }
    if (ch2 === ".") {
      _i--;
      if (is_num(chars)) {
        tokens.push(num(chars));
        continue;
      }
      return void 0;
    }
    if (ch2 === "/") {
      while (_i < chars.length && (chars[_i] === "\n" || chars[_i] === "	" || chars[_i] === " ")) {
        _i++;
      }
      let alpha;
      if (is_num(chars)) {
        alpha = num(chars);
        if (alpha.type !== Tok.Hue) {
          tokens.push({ type: Tok.Alpha, value: alpha });
          continue;
        }
      }
      if (is_ident(chars)) {
        if (ident(chars) === "none") {
          tokens.push({
            type: Tok.Alpha,
            value: { type: Tok.None, value: void 0 }
          });
          continue;
        }
      }
      return void 0;
    }
    if (/\d/.test(ch2)) {
      _i--;
      tokens.push(num(chars));
      continue;
    }
    if (IdentStartCodePoint.test(ch2)) {
      _i--;
      tokens.push(identlike(chars));
      continue;
    }
    return void 0;
  }
  return tokens;
}
function parseColorSyntax(tokens) {
  tokens._i = 0;
  let token = tokens[tokens._i++];
  if (!token || token.type !== Tok.Function || token.value !== "color") {
    return void 0;
  }
  token = tokens[tokens._i++];
  if (token.type !== Tok.Ident) {
    return void 0;
  }
  const mode = colorProfiles[token.value];
  if (!mode) {
    return void 0;
  }
  const res = { mode };
  const coords = consumeCoords(tokens, false);
  if (!coords) {
    return void 0;
  }
  const channels = getMode(mode).channels;
  for (let ii2 = 0, c4; ii2 < channels.length; ii2++) {
    c4 = coords[ii2];
    if (c4.type !== Tok.None) {
      res[channels[ii2]] = c4.type === Tok.Number ? c4.value : c4.value / 100;
    }
  }
  return res;
}
function consumeCoords(tokens, includeHue) {
  const coords = [];
  let token;
  while (tokens._i < tokens.length) {
    token = tokens[tokens._i++];
    if (token.type === Tok.None || token.type === Tok.Number || token.type === Tok.Alpha || token.type === Tok.Percentage || includeHue && token.type === Tok.Hue) {
      coords.push(token);
      continue;
    }
    if (token.type === Tok.ParenClose) {
      if (tokens._i < tokens.length) {
        return void 0;
      }
      continue;
    }
    return void 0;
  }
  if (coords.length < 3 || coords.length > 4) {
    return void 0;
  }
  if (coords.length === 4) {
    if (coords[3].type !== Tok.Alpha) {
      return void 0;
    }
    coords[3] = coords[3].value;
  }
  if (coords.length === 3) {
    coords.push({ type: Tok.None, value: void 0 });
  }
  return coords.every((c4) => c4.type !== Tok.Alpha) ? coords : void 0;
}
function parseModernSyntax(tokens, includeHue) {
  tokens._i = 0;
  let token = tokens[tokens._i++];
  if (!token || token.type !== Tok.Function) {
    return void 0;
  }
  let coords = consumeCoords(tokens, includeHue);
  if (!coords) {
    return void 0;
  }
  coords.unshift(token.value);
  return coords;
}
const parse = (color) => {
  if (typeof color !== "string") {
    return void 0;
  }
  const tokens = tokenize(color);
  const parsed = tokens ? parseModernSyntax(tokens, true) : void 0;
  let result = void 0;
  let i = 0;
  let len = parsers.length;
  while (i < len) {
    if ((result = parsers[i++](color, parsed)) !== void 0) {
      return result;
    }
  }
  return tokens ? parseColorSyntax(tokens) : void 0;
};
function parseRgb(color, parsed) {
  if (!parsed || parsed[0] !== "rgb" && parsed[0] !== "rgba") {
    return void 0;
  }
  const res = { mode: "rgb" };
  const [, r2, g, b, alpha] = parsed;
  if (r2.type === Tok.Hue || g.type === Tok.Hue || b.type === Tok.Hue) {
    return void 0;
  }
  if (r2.type !== Tok.None) {
    res.r = r2.type === Tok.Number ? r2.value / 255 : r2.value / 100;
  }
  if (g.type !== Tok.None) {
    res.g = g.type === Tok.Number ? g.value / 255 : g.value / 100;
  }
  if (b.type !== Tok.None) {
    res.b = b.type === Tok.Number ? b.value / 255 : b.value / 100;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
  }
  return res;
}
const parseTransparent = (c4) => c4 === "transparent" ? { mode: "rgb", r: 0, g: 0, b: 0, alpha: 0 } : void 0;
const lerp = (a, b, t2) => a + t2 * (b - a);
const get_classes = (arr) => {
  let classes = [];
  for (let i = 0; i < arr.length - 1; i++) {
    let a = arr[i];
    let b = arr[i + 1];
    if (a === void 0 && b === void 0) {
      classes.push(void 0);
    } else if (a !== void 0 && b !== void 0) {
      classes.push([a, b]);
    } else {
      classes.push(a !== void 0 ? [a, a] : [b, b]);
    }
  }
  return classes;
};
const interpolatorPiecewise = (interpolator) => (arr) => {
  let classes = get_classes(arr);
  return (t2) => {
    let cls = t2 * classes.length;
    let idx = t2 >= 1 ? classes.length - 1 : Math.max(Math.floor(cls), 0);
    let pair = classes[idx];
    return pair === void 0 ? void 0 : interpolator(pair[0], pair[1], cls - idx);
  };
};
const interpolatorLinear = interpolatorPiecewise(lerp);
const fixupAlpha = (arr) => {
  let some_defined = false;
  let res = arr.map((v2) => {
    if (v2 !== void 0) {
      some_defined = true;
      return v2;
    }
    return 1;
  });
  return some_defined ? res : arr;
};
const definition$q = {
  mode: "rgb",
  channels: ["r", "g", "b", "alpha"],
  parse: [
    parseRgb,
    parseHex,
    parseRgbLegacy,
    parseNamed,
    parseTransparent,
    "srgb"
  ],
  serialize: "srgb",
  interpolate: {
    r: interpolatorLinear,
    g: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  gamut: true
};
const linearize$2 = (v2) => Math.pow(Math.abs(v2), 563 / 256) * Math.sign(v2);
const convertA98ToXyz65 = (a98) => {
  let r2 = linearize$2(a98.r);
  let g = linearize$2(a98.g);
  let b = linearize$2(a98.b);
  let res = {
    mode: "xyz65",
    x: 0.5766690429101305 * r2 + 0.1855582379065463 * g + 0.1882286462349947 * b,
    y: 0.297344975250536 * r2 + 0.6273635662554661 * g + 0.0752914584939979 * b,
    z: 0.0270313613864123 * r2 + 0.0706888525358272 * g + 0.9913375368376386 * b
  };
  if (a98.alpha !== void 0) {
    res.alpha = a98.alpha;
  }
  return res;
};
const gamma$2 = (v2) => Math.pow(Math.abs(v2), 256 / 563) * Math.sign(v2);
const convertXyz65ToA98 = ({ x: x2, y: y2, z: z2, alpha }) => {
  let res = {
    mode: "a98",
    r: gamma$2(
      x2 * 2.0415879038107465 - y2 * 0.5650069742788597 - 0.3447313507783297 * z2
    ),
    g: gamma$2(
      x2 * -0.9692436362808798 + y2 * 1.8759675015077206 + 0.0415550574071756 * z2
    ),
    b: gamma$2(
      x2 * 0.0134442806320312 - y2 * 0.1183623922310184 + 1.0151749943912058 * z2
    )
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const fn$3 = (c4) => {
  const abs2 = Math.abs(c4);
  if (abs2 <= 0.04045) {
    return c4 / 12.92;
  }
  return (Math.sign(c4) || 1) * Math.pow((abs2 + 0.055) / 1.055, 2.4);
};
const convertRgbToLrgb = ({ r: r2, g, b, alpha }) => {
  let res = {
    mode: "lrgb",
    r: fn$3(r2),
    g: fn$3(g),
    b: fn$3(b)
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const convertRgbToXyz65 = (rgb) => {
  let { r: r2, g, b, alpha } = convertRgbToLrgb(rgb);
  let res = {
    mode: "xyz65",
    x: 0.4123907992659593 * r2 + 0.357584339383878 * g + 0.1804807884018343 * b,
    y: 0.2126390058715102 * r2 + 0.715168678767756 * g + 0.0721923153607337 * b,
    z: 0.0193308187155918 * r2 + 0.119194779794626 * g + 0.9505321522496607 * b
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const fn$2 = (c4) => {
  const abs2 = Math.abs(c4);
  if (abs2 > 31308e-7) {
    return (Math.sign(c4) || 1) * (1.055 * Math.pow(abs2, 1 / 2.4) - 0.055);
  }
  return c4 * 12.92;
};
const convertLrgbToRgb = ({ r: r2, g, b, alpha }, mode = "rgb") => {
  let res = {
    mode,
    r: fn$2(r2),
    g: fn$2(g),
    b: fn$2(b)
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const convertXyz65ToRgb = ({ x: x2, y: y2, z: z2, alpha }) => {
  let res = convertLrgbToRgb({
    r: x2 * 3.2409699419045226 - y2 * 1.537383177570094 - 0.4986107602930034 * z2,
    g: x2 * -0.9692436362808796 + y2 * 1.8759675015077204 + 0.0415550574071756 * z2,
    b: x2 * 0.0556300796969936 - y2 * 0.2039769588889765 + 1.0569715142428784 * z2
  });
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const definition$p = {
  ...definition$q,
  mode: "a98",
  parse: ["a98-rgb"],
  serialize: "a98-rgb",
  fromMode: {
    rgb: (color) => convertXyz65ToA98(convertRgbToXyz65(color)),
    xyz65: convertXyz65ToA98
  },
  toMode: {
    rgb: (color) => convertXyz65ToRgb(convertA98ToXyz65(color)),
    xyz65: convertA98ToXyz65
  }
};
const normalizeHue = (hue2) => (hue2 = hue2 % 360) < 0 ? hue2 + 360 : hue2;
const hue = (hues, fn2) => {
  return hues.map((hue2, idx, arr) => {
    if (hue2 === void 0) {
      return hue2;
    }
    let normalized = normalizeHue(hue2);
    if (idx === 0 || hues[idx - 1] === void 0) {
      return normalized;
    }
    return fn2(normalized - normalizeHue(arr[idx - 1]));
  }).reduce((acc, curr) => {
    if (!acc.length || curr === void 0 || acc[acc.length - 1] === void 0) {
      acc.push(curr);
      return acc;
    }
    acc.push(curr + acc[acc.length - 1]);
    return acc;
  }, []);
};
const fixupHueShorter = (arr) => hue(arr, (d) => Math.abs(d) <= 180 ? d : d - 360 * Math.sign(d));
const M = [-0.14861, 1.78277, -0.29227, -0.90649, 1.97294, 0];
const degToRad = Math.PI / 180;
const radToDeg = 180 / Math.PI;
let DE = M[3] * M[4];
let BE = M[1] * M[4];
let BCAD = M[1] * M[2] - M[0] * M[3];
const convertRgbToCubehelix = ({ r: r2, g, b, alpha }) => {
  let l2 = (BCAD * b + r2 * DE - g * BE) / (BCAD + DE - BE);
  let x2 = b - l2;
  let y2 = (M[4] * (g - l2) - M[2] * x2) / M[3];
  let res = {
    mode: "cubehelix",
    l: l2,
    s: l2 === 0 || l2 === 1 ? void 0 : Math.sqrt(x2 * x2 + y2 * y2) / (M[4] * l2 * (1 - l2))
  };
  if (res.s) res.h = Math.atan2(y2, x2) * radToDeg - 120;
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const convertCubehelixToRgb = ({ h, s, l: l2, alpha }) => {
  let res = { mode: "rgb" };
  h = (h === void 0 ? 0 : h + 120) * degToRad;
  let amp = s === void 0 ? 0 : s * l2 * (1 - l2);
  let cosh = Math.cos(h);
  let sinh = Math.sin(h);
  res.r = l2 + amp * (M[0] * cosh + M[1] * sinh);
  res.g = l2 + amp * (M[2] * cosh + M[3] * sinh);
  res.b = l2 + amp * (M[4] * cosh + M[5] * sinh);
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const differenceHueSaturation = (std, smp) => {
  if (std.h === void 0 || smp.h === void 0 || !std.s || !smp.s) {
    return 0;
  }
  let std_h = normalizeHue(std.h);
  let smp_h = normalizeHue(smp.h);
  let dH = Math.sin((smp_h - std_h + 360) / 2 * Math.PI / 180);
  return 2 * Math.sqrt(std.s * smp.s) * dH;
};
const differenceHueNaive = (std, smp) => {
  if (std.h === void 0 || smp.h === void 0) {
    return 0;
  }
  let std_h = normalizeHue(std.h);
  let smp_h = normalizeHue(smp.h);
  if (Math.abs(smp_h - std_h) > 180) {
    return std_h - (smp_h - 360 * Math.sign(smp_h - std_h));
  }
  return smp_h - std_h;
};
const differenceHueChroma = (std, smp) => {
  if (std.h === void 0 || smp.h === void 0 || !std.c || !smp.c) {
    return 0;
  }
  let std_h = normalizeHue(std.h);
  let smp_h = normalizeHue(smp.h);
  let dH = Math.sin((smp_h - std_h + 360) / 2 * Math.PI / 180);
  return 2 * Math.sqrt(std.c * smp.c) * dH;
};
const averageAngle = (val) => {
  let sum = val.reduce(
    (sum2, val2) => {
      if (val2 !== void 0) {
        let rad = val2 * Math.PI / 180;
        sum2.sin += Math.sin(rad);
        sum2.cos += Math.cos(rad);
      }
      return sum2;
    },
    { sin: 0, cos: 0 }
  );
  return Math.atan2(sum.sin, sum.cos) * 180 / Math.PI;
};
const definition$o = {
  mode: "cubehelix",
  channels: ["h", "s", "l", "alpha"],
  parse: ["--cubehelix"],
  serialize: "--cubehelix",
  ranges: {
    h: [0, 360],
    s: [0, 4.614],
    l: [0, 1]
  },
  fromMode: {
    rgb: convertRgbToCubehelix
  },
  toMode: {
    rgb: convertCubehelixToRgb
  },
  interpolate: {
    h: {
      use: interpolatorLinear,
      fixup: fixupHueShorter
    },
    s: interpolatorLinear,
    l: interpolatorLinear,
    alpha: {
      use: interpolatorLinear,
      fixup: fixupAlpha
    }
  },
  difference: {
    h: differenceHueSaturation
  },
  average: {
    h: averageAngle
  }
};
const convertLabToLch = ({ l: l2, a, b, alpha }, mode = "lch") => {
  let c4 = Math.sqrt(a * a + b * b);
  let res = { mode, l: l2, c: c4 };
  if (c4) res.h = normalizeHue(Math.atan2(b, a) * 180 / Math.PI);
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const convertLchToLab = ({ l: l2, c: c4, h, alpha }, mode = "lab") => {
  let res = {
    mode,
    l: l2,
    a: c4 ? c4 * Math.cos(h / 180 * Math.PI) : 0,
    b: c4 ? c4 * Math.sin(h / 180 * Math.PI) : 0
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const k$1 = Math.pow(29, 3) / Math.pow(3, 3);
const e$1 = Math.pow(6, 3) / Math.pow(29, 3);
const D50 = {
  X: 0.3457 / 0.3585,
  Y: 1,
  Z: (1 - 0.3457 - 0.3585) / 0.3585
};
const D65 = {
  X: 0.3127 / 0.329,
  Y: 1,
  Z: (1 - 0.3127 - 0.329) / 0.329
};
let fn$1 = (v2) => Math.pow(v2, 3) > e$1 ? Math.pow(v2, 3) : (116 * v2 - 16) / k$1;
const convertLab65ToXyz65 = ({ l: l2, a, b, alpha }) => {
  let fy = (l2 + 16) / 116;
  let fx = a / 500 + fy;
  let fz = fy - b / 200;
  let res = {
    mode: "xyz65",
    x: fn$1(fx) * D65.X,
    y: fn$1(fy) * D65.Y,
    z: fn$1(fz) * D65.Z
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertLab65ToRgb = (lab) => convertXyz65ToRgb(convertLab65ToXyz65(lab));
const f$1 = (value) => value > e$1 ? Math.cbrt(value) : (k$1 * value + 16) / 116;
const convertXyz65ToLab65 = ({ x: x2, y: y2, z: z2, alpha }) => {
  let f0 = f$1(x2 / D65.X);
  let f1 = f$1(y2 / D65.Y);
  let f2 = f$1(z2 / D65.Z);
  let res = {
    mode: "lab65",
    l: 116 * f1 - 16,
    a: 500 * (f0 - f1),
    b: 200 * (f1 - f2)
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertRgbToLab65 = (rgb) => {
  let res = convertXyz65ToLab65(convertRgbToXyz65(rgb));
  if (rgb.r === rgb.b && rgb.b === rgb.g) {
    res.a = res.b = 0;
  }
  return res;
};
const kE = 1;
const kCH = 1;
const θ = 26 / 180 * Math.PI;
const cosθ = Math.cos(θ);
const sinθ = Math.sin(θ);
const factor = 100 / Math.log(139 / 100);
const convertDlchToLab65 = ({ l: l2, c: c4, h, alpha }) => {
  let res = {
    mode: "lab65",
    l: (Math.exp(l2 * kE / factor) - 1) / 39e-4
  };
  if (h === void 0) {
    res.a = res.b = 0;
  } else {
    let G2 = (Math.exp(0.0435 * c4 * kCH * kE) - 1) / 0.075;
    let e2 = G2 * Math.cos(h / 180 * Math.PI - θ);
    let f2 = G2 * Math.sin(h / 180 * Math.PI - θ);
    res.a = e2 * cosθ - f2 / 0.83 * sinθ;
    res.b = e2 * sinθ + f2 / 0.83 * cosθ;
  }
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const convertLab65ToDlch = ({ l: l2, a, b, alpha }) => {
  let e2 = a * cosθ + b * sinθ;
  let f2 = 0.83 * (b * cosθ - a * sinθ);
  let G2 = Math.sqrt(e2 * e2 + f2 * f2);
  let res = {
    mode: "dlch",
    l: factor / kE * Math.log(1 + 39e-4 * l2),
    c: Math.log(1 + 0.075 * G2) / (0.0435 * kCH * kE)
  };
  if (res.c) {
    res.h = normalizeHue((Math.atan2(f2, e2) + θ) / Math.PI * 180);
  }
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const convertDlabToLab65 = (c4) => convertDlchToLab65(convertLabToLch(c4, "dlch"));
const convertLab65ToDlab = (c4) => convertLchToLab(convertLab65ToDlch(c4), "dlab");
const definition$n = {
  mode: "dlab",
  parse: ["--din99o-lab"],
  serialize: "--din99o-lab",
  toMode: {
    lab65: convertDlabToLab65,
    rgb: (c4) => convertLab65ToRgb(convertDlabToLab65(c4))
  },
  fromMode: {
    lab65: convertLab65ToDlab,
    rgb: (c4) => convertLab65ToDlab(convertRgbToLab65(c4))
  },
  channels: ["l", "a", "b", "alpha"],
  ranges: {
    l: [0, 100],
    a: [-40.09, 45.501],
    b: [-40.469, 44.344]
  },
  interpolate: {
    l: interpolatorLinear,
    a: interpolatorLinear,
    b: interpolatorLinear,
    alpha: {
      use: interpolatorLinear,
      fixup: fixupAlpha
    }
  }
};
const definition$m = {
  mode: "dlch",
  parse: ["--din99o-lch"],
  serialize: "--din99o-lch",
  toMode: {
    lab65: convertDlchToLab65,
    dlab: (c4) => convertLchToLab(c4, "dlab"),
    rgb: (c4) => convertLab65ToRgb(convertDlchToLab65(c4))
  },
  fromMode: {
    lab65: convertLab65ToDlch,
    dlab: (c4) => convertLabToLch(c4, "dlch"),
    rgb: (c4) => convertLab65ToDlch(convertRgbToLab65(c4))
  },
  channels: ["l", "c", "h", "alpha"],
  ranges: {
    l: [0, 100],
    c: [0, 51.484],
    h: [0, 360]
  },
  interpolate: {
    l: interpolatorLinear,
    c: interpolatorLinear,
    h: {
      use: interpolatorLinear,
      fixup: fixupHueShorter
    },
    alpha: {
      use: interpolatorLinear,
      fixup: fixupAlpha
    }
  },
  difference: {
    h: differenceHueChroma
  },
  average: {
    h: averageAngle
  }
};
function convertHsiToRgb({ h, s, i, alpha }) {
  h = normalizeHue(h);
  let f2 = Math.abs(h / 60 % 2 - 1);
  let res;
  switch (Math.floor(h / 60)) {
    case 0:
      res = {
        r: i * (1 + s * (3 / (2 - f2) - 1)),
        g: i * (1 + s * (3 * (1 - f2) / (2 - f2) - 1)),
        b: i * (1 - s)
      };
      break;
    case 1:
      res = {
        r: i * (1 + s * (3 * (1 - f2) / (2 - f2) - 1)),
        g: i * (1 + s * (3 / (2 - f2) - 1)),
        b: i * (1 - s)
      };
      break;
    case 2:
      res = {
        r: i * (1 - s),
        g: i * (1 + s * (3 / (2 - f2) - 1)),
        b: i * (1 + s * (3 * (1 - f2) / (2 - f2) - 1))
      };
      break;
    case 3:
      res = {
        r: i * (1 - s),
        g: i * (1 + s * (3 * (1 - f2) / (2 - f2) - 1)),
        b: i * (1 + s * (3 / (2 - f2) - 1))
      };
      break;
    case 4:
      res = {
        r: i * (1 + s * (3 * (1 - f2) / (2 - f2) - 1)),
        g: i * (1 - s),
        b: i * (1 + s * (3 / (2 - f2) - 1))
      };
      break;
    case 5:
      res = {
        r: i * (1 + s * (3 / (2 - f2) - 1)),
        g: i * (1 - s),
        b: i * (1 + s * (3 * (1 - f2) / (2 - f2) - 1))
      };
      break;
    default:
      res = { r: i * (1 - s), g: i * (1 - s), b: i * (1 - s) };
  }
  res.mode = "rgb";
  if (alpha !== void 0) res.alpha = alpha;
  return res;
}
function convertRgbToHsi({ r: r2, g, b, alpha }) {
  let M2 = Math.max(r2, g, b), m2 = Math.min(r2, g, b);
  let res = {
    mode: "hsi",
    s: r2 + g + b === 0 ? 0 : 1 - 3 * m2 / (r2 + g + b),
    i: (r2 + g + b) / 3
  };
  if (M2 - m2 !== 0)
    res.h = (M2 === r2 ? (g - b) / (M2 - m2) + (g < b) * 6 : M2 === g ? (b - r2) / (M2 - m2) + 2 : (r2 - g) / (M2 - m2) + 4) * 60;
  if (alpha !== void 0) res.alpha = alpha;
  return res;
}
const definition$l = {
  mode: "hsi",
  toMode: {
    rgb: convertHsiToRgb
  },
  parse: ["--hsi"],
  serialize: "--hsi",
  fromMode: {
    rgb: convertRgbToHsi
  },
  channels: ["h", "s", "i", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    s: interpolatorLinear,
    i: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueSaturation
  },
  average: {
    h: averageAngle
  }
};
function convertHslToRgb({ h, s, l: l2, alpha }) {
  h = normalizeHue(h);
  let m1 = l2 + s * (l2 < 0.5 ? l2 : 1 - l2);
  let m2 = m1 - (m1 - l2) * 2 * Math.abs(h / 60 % 2 - 1);
  let res;
  switch (Math.floor(h / 60)) {
    case 0:
      res = { r: m1, g: m2, b: 2 * l2 - m1 };
      break;
    case 1:
      res = { r: m2, g: m1, b: 2 * l2 - m1 };
      break;
    case 2:
      res = { r: 2 * l2 - m1, g: m1, b: m2 };
      break;
    case 3:
      res = { r: 2 * l2 - m1, g: m2, b: m1 };
      break;
    case 4:
      res = { r: m2, g: 2 * l2 - m1, b: m1 };
      break;
    case 5:
      res = { r: m1, g: 2 * l2 - m1, b: m2 };
      break;
    default:
      res = { r: 2 * l2 - m1, g: 2 * l2 - m1, b: 2 * l2 - m1 };
  }
  res.mode = "rgb";
  if (alpha !== void 0) res.alpha = alpha;
  return res;
}
function convertRgbToHsl({ r: r2, g, b, alpha }) {
  let M2 = Math.max(r2, g, b), m2 = Math.min(r2, g, b);
  let res = {
    mode: "hsl",
    s: M2 === m2 ? 0 : (M2 - m2) / (1 - Math.abs(M2 + m2 - 1)),
    l: 0.5 * (M2 + m2)
  };
  if (M2 - m2 !== 0)
    res.h = (M2 === r2 ? (g - b) / (M2 - m2) + (g < b) * 6 : M2 === g ? (b - r2) / (M2 - m2) + 2 : (r2 - g) / (M2 - m2) + 4) * 60;
  if (alpha !== void 0) res.alpha = alpha;
  return res;
}
const hueToDeg = (val, unit) => {
  switch (unit) {
    case "deg":
      return +val;
    case "rad":
      return val / Math.PI * 180;
    case "grad":
      return val / 10 * 9;
    case "turn":
      return val * 360;
  }
};
const hsl_old = new RegExp(
  `^hsla?\\(\\s*${hue$1}${c}${per}${c}${per}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
);
const parseHslLegacy = (color) => {
  let match = color.match(hsl_old);
  if (!match) return;
  let res = { mode: "hsl" };
  if (match[3] !== void 0) {
    res.h = +match[3];
  } else if (match[1] !== void 0 && match[2] !== void 0) {
    res.h = hueToDeg(match[1], match[2]);
  }
  if (match[4] !== void 0) {
    res.s = Math.min(Math.max(0, match[4] / 100), 1);
  }
  if (match[5] !== void 0) {
    res.l = Math.min(Math.max(0, match[5] / 100), 1);
  }
  if (match[6] !== void 0) {
    res.alpha = match[6] / 100;
  } else if (match[7] !== void 0) {
    res.alpha = +match[7];
  }
  return res;
};
function parseHsl(color, parsed) {
  if (!parsed || parsed[0] !== "hsl" && parsed[0] !== "hsla") {
    return void 0;
  }
  const res = { mode: "hsl" };
  const [, h, s, l2, alpha] = parsed;
  if (h.type !== Tok.None) {
    if (h.type === Tok.Percentage) {
      return void 0;
    }
    res.h = h.value;
  }
  if (s.type !== Tok.None) {
    if (s.type === Tok.Hue) {
      return void 0;
    }
    res.s = s.type === Tok.Number ? s.value : s.value / 100;
  }
  if (l2.type !== Tok.None) {
    if (l2.type === Tok.Hue) {
      return void 0;
    }
    res.l = l2.type === Tok.Number ? l2.value : l2.value / 100;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
  }
  return res;
}
const definition$k = {
  mode: "hsl",
  toMode: {
    rgb: convertHslToRgb
  },
  fromMode: {
    rgb: convertRgbToHsl
  },
  channels: ["h", "s", "l", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  parse: [parseHsl, parseHslLegacy],
  serialize: (c4) => `hsl(${c4.h || 0} ${c4.s !== void 0 ? c4.s * 100 + "%" : "none"} ${c4.l !== void 0 ? c4.l * 100 + "%" : "none"}${c4.alpha < 1 ? ` / ${c4.alpha}` : ""})`,
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    s: interpolatorLinear,
    l: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueSaturation
  },
  average: {
    h: averageAngle
  }
};
function convertHsvToRgb({ h, s, v: v2, alpha }) {
  h = normalizeHue(h);
  let f2 = Math.abs(h / 60 % 2 - 1);
  let res;
  switch (Math.floor(h / 60)) {
    case 0:
      res = { r: v2, g: v2 * (1 - s * f2), b: v2 * (1 - s) };
      break;
    case 1:
      res = { r: v2 * (1 - s * f2), g: v2, b: v2 * (1 - s) };
      break;
    case 2:
      res = { r: v2 * (1 - s), g: v2, b: v2 * (1 - s * f2) };
      break;
    case 3:
      res = { r: v2 * (1 - s), g: v2 * (1 - s * f2), b: v2 };
      break;
    case 4:
      res = { r: v2 * (1 - s * f2), g: v2 * (1 - s), b: v2 };
      break;
    case 5:
      res = { r: v2, g: v2 * (1 - s), b: v2 * (1 - s * f2) };
      break;
    default:
      res = { r: v2 * (1 - s), g: v2 * (1 - s), b: v2 * (1 - s) };
  }
  res.mode = "rgb";
  if (alpha !== void 0) res.alpha = alpha;
  return res;
}
function convertRgbToHsv({ r: r2, g, b, alpha }) {
  let M2 = Math.max(r2, g, b), m2 = Math.min(r2, g, b);
  let res = {
    mode: "hsv",
    s: M2 === 0 ? 0 : 1 - m2 / M2,
    v: M2
  };
  if (M2 - m2 !== 0)
    res.h = (M2 === r2 ? (g - b) / (M2 - m2) + (g < b) * 6 : M2 === g ? (b - r2) / (M2 - m2) + 2 : (r2 - g) / (M2 - m2) + 4) * 60;
  if (alpha !== void 0) res.alpha = alpha;
  return res;
}
const definition$j = {
  mode: "hsv",
  toMode: {
    rgb: convertHsvToRgb
  },
  parse: ["--hsv"],
  serialize: "--hsv",
  fromMode: {
    rgb: convertRgbToHsv
  },
  channels: ["h", "s", "v", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    s: interpolatorLinear,
    v: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueSaturation
  },
  average: {
    h: averageAngle
  }
};
function convertHwbToRgb({ h, w: w2, b, alpha }) {
  if (w2 + b > 1) {
    let s = w2 + b;
    w2 /= s;
    b /= s;
  }
  return convertHsvToRgb({
    h,
    s: b === 1 ? 1 : 1 - w2 / (1 - b),
    v: 1 - b,
    alpha
  });
}
function convertRgbToHwb(rgba) {
  let hsv = convertRgbToHsv(rgba);
  if (hsv === void 0) return void 0;
  let res = {
    mode: "hwb",
    w: (1 - hsv.s) * hsv.v,
    b: 1 - hsv.v
  };
  if (hsv.h !== void 0) res.h = hsv.h;
  if (hsv.alpha !== void 0) res.alpha = hsv.alpha;
  return res;
}
function ParseHwb(color, parsed) {
  if (!parsed || parsed[0] !== "hwb") {
    return void 0;
  }
  const res = { mode: "hwb" };
  const [, h, w2, b, alpha] = parsed;
  if (h.type !== Tok.None) {
    if (h.type === Tok.Percentage) {
      return void 0;
    }
    res.h = h.value;
  }
  if (w2.type !== Tok.None) {
    if (w2.type === Tok.Hue) {
      return void 0;
    }
    res.w = w2.type === Tok.Number ? w2.value : w2.value / 100;
  }
  if (b.type !== Tok.None) {
    if (b.type === Tok.Hue) {
      return void 0;
    }
    res.b = b.type === Tok.Number ? b.value : b.value / 100;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
  }
  return res;
}
const definition$i = {
  mode: "hwb",
  toMode: {
    rgb: convertHwbToRgb
  },
  fromMode: {
    rgb: convertRgbToHwb
  },
  channels: ["h", "w", "b", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  parse: [ParseHwb],
  serialize: (c4) => `hwb(${c4.h || 0} ${c4.w * 100}% ${c4.b * 100}%${c4.alpha < 1 ? ` / ${c4.alpha}` : ""})`,
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    w: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueNaive
  },
  average: {
    h: averageAngle
  }
};
const n$1 = 0.1593017578125;
const p$1 = 134.03437499999998;
const c1$1 = 0.8359375;
const c2$1 = 18.8515625;
const c3$1 = 18.6875;
const d0$1 = 16295499532821565e-27;
const pq = (v2) => {
  let vn2 = Math.pow(v2 / 1e4, n$1);
  return Math.pow((c1$1 + c2$1 * vn2) / (1 + c3$1 * vn2), p$1) || 0;
};
const abs = (v2) => Math.max(v2 * 203, 0);
const convertXyz65ToJab = ({ x: x2, y: y2, z: z2, alpha }) => {
  x2 = abs(x2);
  y2 = abs(y2);
  z2 = abs(z2);
  let xp = 1.15 * x2 - 0.15 * z2;
  let yp = 0.66 * y2 + 0.34 * x2;
  let l2 = pq(0.41478972 * xp + 0.579999 * yp + 0.014648 * z2);
  let m2 = pq(-0.20151 * xp + 1.120649 * yp + 0.0531008 * z2);
  let s = pq(-0.0166008 * xp + 0.2648 * yp + 0.6684799 * z2);
  let i = (l2 + m2) / 2;
  let res = {
    mode: "jab",
    j: 0.44 * i / (1 - 0.56 * i) - d0$1,
    a: 3.524 * l2 - 4.066708 * m2 + 0.542708 * s,
    b: 0.199076 * l2 + 1.096799 * m2 - 1.295875 * s
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const n = 0.1593017578125;
const p = 134.03437499999998;
const c1 = 0.8359375;
const c2 = 18.8515625;
const c3 = 18.6875;
const d0 = 16295499532821565e-27;
const pq_inv = (v2) => {
  let vp = Math.pow(v2, 1 / p);
  return 1e4 * Math.pow((c1 - vp) / (c3 * vp - c2), 1 / n) || 0;
};
const rel = (v2) => v2 / 203;
const convertJabToXyz65 = ({ j, a, b, alpha }) => {
  let i = (j + d0) / (0.44 + 0.56 * (j + d0));
  let l2 = pq_inv(i + 0.13860504 * a + 0.058047316 * b);
  let m2 = pq_inv(i - 0.13860504 * a - 0.058047316 * b);
  let s = pq_inv(i - 0.096019242 * a - 0.8118919 * b);
  let res = {
    mode: "xyz65",
    x: rel(
      1.661373024652174 * l2 - 0.914523081304348 * m2 + 0.23136208173913045 * s
    ),
    y: rel(
      -0.3250758611844533 * l2 + 1.571847026732543 * m2 - 0.21825383453227928 * s
    ),
    z: rel(-0.090982811 * l2 - 0.31272829 * m2 + 1.5227666 * s)
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertRgbToJab = (rgb) => {
  let res = convertXyz65ToJab(convertRgbToXyz65(rgb));
  if (rgb.r === rgb.b && rgb.b === rgb.g) {
    res.a = res.b = 0;
  }
  return res;
};
const convertJabToRgb = (color) => convertXyz65ToRgb(convertJabToXyz65(color));
const definition$h = {
  mode: "jab",
  channels: ["j", "a", "b", "alpha"],
  parse: ["--jzazbz"],
  serialize: "--jzazbz",
  fromMode: {
    rgb: convertRgbToJab,
    xyz65: convertXyz65ToJab
  },
  toMode: {
    rgb: convertJabToRgb,
    xyz65: convertJabToXyz65
  },
  ranges: {
    j: [0, 0.222],
    a: [-0.109, 0.129],
    b: [-0.185, 0.134]
  },
  interpolate: {
    j: interpolatorLinear,
    a: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
const convertJabToJch = ({ j, a, b, alpha }) => {
  let c4 = Math.sqrt(a * a + b * b);
  let res = {
    mode: "jch",
    j,
    c: c4
  };
  if (c4) {
    res.h = normalizeHue(Math.atan2(b, a) * 180 / Math.PI);
  }
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertJchToJab = ({ j, c: c4, h, alpha }) => {
  let res = {
    mode: "jab",
    j,
    a: c4 ? c4 * Math.cos(h / 180 * Math.PI) : 0,
    b: c4 ? c4 * Math.sin(h / 180 * Math.PI) : 0
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const definition$g = {
  mode: "jch",
  parse: ["--jzczhz"],
  serialize: "--jzczhz",
  toMode: {
    jab: convertJchToJab,
    rgb: (c4) => convertJabToRgb(convertJchToJab(c4))
  },
  fromMode: {
    rgb: (c4) => convertJabToJch(convertRgbToJab(c4)),
    jab: convertJabToJch
  },
  channels: ["j", "c", "h", "alpha"],
  ranges: {
    j: [0, 0.221],
    c: [0, 0.19],
    h: [0, 360]
  },
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    c: interpolatorLinear,
    j: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueChroma
  },
  average: {
    h: averageAngle
  }
};
const k = Math.pow(29, 3) / Math.pow(3, 3);
const e = Math.pow(6, 3) / Math.pow(29, 3);
let fn = (v2) => Math.pow(v2, 3) > e ? Math.pow(v2, 3) : (116 * v2 - 16) / k;
const convertLabToXyz50 = ({ l: l2, a, b, alpha }) => {
  let fy = (l2 + 16) / 116;
  let fx = a / 500 + fy;
  let fz = fy - b / 200;
  let res = {
    mode: "xyz50",
    x: fn(fx) * D50.X,
    y: fn(fy) * D50.Y,
    z: fn(fz) * D50.Z
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertXyz50ToRgb = ({ x: x2, y: y2, z: z2, alpha }) => {
  let res = convertLrgbToRgb({
    r: x2 * 3.1341359569958707 - y2 * 1.6173863321612538 - 0.4906619460083532 * z2,
    g: x2 * -0.978795502912089 + y2 * 1.916254567259524 + 0.03344273116131949 * z2,
    b: x2 * 0.07195537988411677 - y2 * 0.2289768264158322 + 1.405386058324125 * z2
  });
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertLabToRgb = (lab) => convertXyz50ToRgb(convertLabToXyz50(lab));
const convertRgbToXyz50 = (rgb) => {
  let { r: r2, g, b, alpha } = convertRgbToLrgb(rgb);
  let res = {
    mode: "xyz50",
    x: 0.436065742824811 * r2 + 0.3851514688337912 * g + 0.14307845442264197 * b,
    y: 0.22249319175623702 * r2 + 0.7168870538238823 * g + 0.06061979053616537 * b,
    z: 0.013923904500943465 * r2 + 0.09708128566574634 * g + 0.7140993584005155 * b
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const f = (value) => value > e ? Math.cbrt(value) : (k * value + 16) / 116;
const convertXyz50ToLab = ({ x: x2, y: y2, z: z2, alpha }) => {
  let f0 = f(x2 / D50.X);
  let f1 = f(y2 / D50.Y);
  let f2 = f(z2 / D50.Z);
  let res = {
    mode: "lab",
    l: 116 * f1 - 16,
    a: 500 * (f0 - f1),
    b: 200 * (f1 - f2)
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertRgbToLab = (rgb) => {
  let res = convertXyz50ToLab(convertRgbToXyz50(rgb));
  if (rgb.r === rgb.b && rgb.b === rgb.g) {
    res.a = res.b = 0;
  }
  return res;
};
function parseLab(color, parsed) {
  if (!parsed || parsed[0] !== "lab") {
    return void 0;
  }
  const res = { mode: "lab" };
  const [, l2, a, b, alpha] = parsed;
  if (l2.type === Tok.Hue || a.type === Tok.Hue || b.type === Tok.Hue) {
    return void 0;
  }
  if (l2.type !== Tok.None) {
    res.l = l2.value;
  }
  if (a.type !== Tok.None) {
    res.a = a.type === Tok.Number ? a.value : a.value * 125 / 100;
  }
  if (b.type !== Tok.None) {
    res.b = b.type === Tok.Number ? b.value : b.value * 125 / 100;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
  }
  return res;
}
const definition$f = {
  mode: "lab",
  toMode: {
    xyz50: convertLabToXyz50,
    rgb: convertLabToRgb
  },
  fromMode: {
    xyz50: convertXyz50ToLab,
    rgb: convertRgbToLab
  },
  channels: ["l", "a", "b", "alpha"],
  ranges: {
    l: [0, 100],
    a: [-100, 100],
    b: [-100, 100]
  },
  parse: [parseLab],
  serialize: (c4) => `lab(${c4.l !== void 0 ? c4.l : "none"} ${c4.a !== void 0 ? c4.a : "none"} ${c4.b !== void 0 ? c4.b : "none"}${c4.alpha < 1 ? ` / ${c4.alpha}` : ""})`,
  interpolate: {
    l: interpolatorLinear,
    a: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
const definition$e = {
  ...definition$f,
  mode: "lab65",
  parse: ["--lab-d65"],
  serialize: "--lab-d65",
  toMode: {
    xyz65: convertLab65ToXyz65,
    rgb: convertLab65ToRgb
  },
  fromMode: {
    xyz65: convertXyz65ToLab65,
    rgb: convertRgbToLab65
  },
  ranges: {
    l: [0, 100],
    a: [-86.182, 98.234],
    b: [-107.86, 94.477]
  }
};
function parseLch(color, parsed) {
  if (!parsed || parsed[0] !== "lch") {
    return void 0;
  }
  const res = { mode: "lch" };
  const [, l2, c4, h, alpha] = parsed;
  if (l2.type !== Tok.None) {
    if (l2.type === Tok.Hue) {
      return void 0;
    }
    res.l = l2.value;
  }
  if (c4.type !== Tok.None) {
    res.c = Math.max(
      0,
      c4.type === Tok.Number ? c4.value : c4.value * 150 / 100
    );
  }
  if (h.type !== Tok.None) {
    if (h.type === Tok.Percentage) {
      return void 0;
    }
    res.h = h.value;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
  }
  return res;
}
const definition$d = {
  mode: "lch",
  toMode: {
    lab: convertLchToLab,
    rgb: (c4) => convertLabToRgb(convertLchToLab(c4))
  },
  fromMode: {
    rgb: (c4) => convertLabToLch(convertRgbToLab(c4)),
    lab: convertLabToLch
  },
  channels: ["l", "c", "h", "alpha"],
  ranges: {
    l: [0, 100],
    c: [0, 150],
    h: [0, 360]
  },
  parse: [parseLch],
  serialize: (c4) => `lch(${c4.l !== void 0 ? c4.l : "none"} ${c4.c !== void 0 ? c4.c : "none"} ${c4.h || 0}${c4.alpha < 1 ? ` / ${c4.alpha}` : ""})`,
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    c: interpolatorLinear,
    l: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueChroma
  },
  average: {
    h: averageAngle
  }
};
const definition$c = {
  ...definition$d,
  mode: "lch65",
  parse: ["--lch-d65"],
  serialize: "--lch-d65",
  toMode: {
    lab65: (c4) => convertLchToLab(c4, "lab65"),
    rgb: (c4) => convertLab65ToRgb(convertLchToLab(c4, "lab65"))
  },
  fromMode: {
    rgb: (c4) => convertLabToLch(convertRgbToLab65(c4), "lch65"),
    lab65: (c4) => convertLabToLch(c4, "lch65")
  },
  ranges: {
    l: [0, 100],
    c: [0, 133.807],
    h: [0, 360]
  }
};
const convertLuvToLchuv = ({ l: l2, u: u2, v: v2, alpha }) => {
  let c4 = Math.sqrt(u2 * u2 + v2 * v2);
  let res = {
    mode: "lchuv",
    l: l2,
    c: c4
  };
  if (c4) {
    res.h = normalizeHue(Math.atan2(v2, u2) * 180 / Math.PI);
  }
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertLchuvToLuv = ({ l: l2, c: c4, h, alpha }) => {
  let res = {
    mode: "luv",
    l: l2,
    u: c4 ? c4 * Math.cos(h / 180 * Math.PI) : 0,
    v: c4 ? c4 * Math.sin(h / 180 * Math.PI) : 0
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const u_fn$1 = (x2, y2, z2) => 4 * x2 / (x2 + 15 * y2 + 3 * z2);
const v_fn$1 = (x2, y2, z2) => 9 * y2 / (x2 + 15 * y2 + 3 * z2);
const un$1 = u_fn$1(D50.X, D50.Y, D50.Z);
const vn$1 = v_fn$1(D50.X, D50.Y, D50.Z);
const l_fn = (value) => value <= e ? k * value : 116 * Math.cbrt(value) - 16;
const convertXyz50ToLuv = ({ x: x2, y: y2, z: z2, alpha }) => {
  let l2 = l_fn(y2 / D50.Y);
  let u2 = u_fn$1(x2, y2, z2);
  let v2 = v_fn$1(x2, y2, z2);
  if (!isFinite(u2) || !isFinite(v2)) {
    l2 = u2 = v2 = 0;
  } else {
    u2 = 13 * l2 * (u2 - un$1);
    v2 = 13 * l2 * (v2 - vn$1);
  }
  let res = {
    mode: "luv",
    l: l2,
    u: u2,
    v: v2
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const u_fn = (x2, y2, z2) => 4 * x2 / (x2 + 15 * y2 + 3 * z2);
const v_fn = (x2, y2, z2) => 9 * y2 / (x2 + 15 * y2 + 3 * z2);
const un = u_fn(D50.X, D50.Y, D50.Z);
const vn = v_fn(D50.X, D50.Y, D50.Z);
const convertLuvToXyz50 = ({ l: l2, u: u2, v: v2, alpha }) => {
  let up = u2 / (13 * l2) + un;
  let vp = v2 / (13 * l2) + vn;
  let y2 = D50.Y * (l2 <= 8 ? l2 / k : Math.pow((l2 + 16) / 116, 3));
  let x2 = y2 * (9 * up) / (4 * vp);
  let z2 = y2 * (12 - 3 * up - 20 * vp) / (4 * vp);
  let res = { mode: "xyz50", x: x2, y: y2, z: z2 };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertRgbToLchuv = (rgb) => convertLuvToLchuv(convertXyz50ToLuv(convertRgbToXyz50(rgb)));
const convertLchuvToRgb = (lchuv) => convertXyz50ToRgb(convertLuvToXyz50(convertLchuvToLuv(lchuv)));
const definition$b = {
  mode: "lchuv",
  toMode: {
    luv: convertLchuvToLuv,
    rgb: convertLchuvToRgb
  },
  fromMode: {
    rgb: convertRgbToLchuv,
    luv: convertLuvToLchuv
  },
  channels: ["l", "c", "h", "alpha"],
  parse: ["--lchuv"],
  serialize: "--lchuv",
  ranges: {
    l: [0, 100],
    c: [0, 176.956],
    h: [0, 360]
  },
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    c: interpolatorLinear,
    l: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueChroma
  },
  average: {
    h: averageAngle
  }
};
const definition$a = {
  ...definition$q,
  mode: "lrgb",
  toMode: {
    rgb: convertLrgbToRgb
  },
  fromMode: {
    rgb: convertRgbToLrgb
  },
  parse: ["srgb-linear"],
  serialize: "srgb-linear"
};
const definition$9 = {
  mode: "luv",
  toMode: {
    xyz50: convertLuvToXyz50,
    rgb: (luv) => convertXyz50ToRgb(convertLuvToXyz50(luv))
  },
  fromMode: {
    xyz50: convertXyz50ToLuv,
    rgb: (rgb) => convertXyz50ToLuv(convertRgbToXyz50(rgb))
  },
  channels: ["l", "u", "v", "alpha"],
  parse: ["--luv"],
  serialize: "--luv",
  ranges: {
    l: [0, 100],
    u: [-84.936, 175.042],
    v: [-125.882, 87.243]
  },
  interpolate: {
    l: interpolatorLinear,
    u: interpolatorLinear,
    v: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
const convertLrgbToOklab = ({ r: r2, g, b, alpha }) => {
  let L2 = Math.cbrt(
    0.41222147079999993 * r2 + 0.5363325363 * g + 0.0514459929 * b
  );
  let M2 = Math.cbrt(
    0.2119034981999999 * r2 + 0.6806995450999999 * g + 0.1073969566 * b
  );
  let S2 = Math.cbrt(
    0.08830246189999998 * r2 + 0.2817188376 * g + 0.6299787005000002 * b
  );
  let res = {
    mode: "oklab",
    l: 0.2104542553 * L2 + 0.793617785 * M2 - 0.0040720468 * S2,
    a: 1.9779984951 * L2 - 2.428592205 * M2 + 0.4505937099 * S2,
    b: 0.0259040371 * L2 + 0.7827717662 * M2 - 0.808675766 * S2
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertRgbToOklab = (rgb) => {
  let res = convertLrgbToOklab(convertRgbToLrgb(rgb));
  if (rgb.r === rgb.b && rgb.b === rgb.g) {
    res.a = res.b = 0;
  }
  return res;
};
const convertOklabToLrgb = ({ l: l2, a, b, alpha }) => {
  let L2 = Math.pow(
    l2 * 0.9999999984505198 + 0.39633779217376786 * a + 0.2158037580607588 * b,
    3
  );
  let M2 = Math.pow(
    l2 * 1.0000000088817609 - 0.10556134232365635 * a - 0.06385417477170591 * b,
    3
  );
  let S2 = Math.pow(
    l2 * 1.0000000546724108 - 0.08948418209496575 * a - 1.2914855378640917 * b,
    3
  );
  let res = {
    mode: "lrgb",
    r: 4.076741661347994 * L2 - 3.307711590408193 * M2 + 0.230969928729428 * S2,
    g: -1.2684380040921763 * L2 + 2.6097574006633715 * M2 - 0.3413193963102197 * S2,
    b: -0.004196086541837188 * L2 - 0.7034186144594493 * M2 + 1.7076147009309444 * S2
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertOklabToRgb = (c4) => convertLrgbToRgb(convertOklabToLrgb(c4));
function toe(x2) {
  const k_1 = 0.206;
  const k_2 = 0.03;
  const k_3 = (1 + k_1) / (1 + k_2);
  return 0.5 * (k_3 * x2 - k_1 + Math.sqrt((k_3 * x2 - k_1) * (k_3 * x2 - k_1) + 4 * k_2 * k_3 * x2));
}
function toe_inv(x2) {
  const k_1 = 0.206;
  const k_2 = 0.03;
  const k_3 = (1 + k_1) / (1 + k_2);
  return (x2 * x2 + k_1 * x2) / (k_3 * (x2 + k_2));
}
function compute_max_saturation(a, b) {
  let k0, k1, k2, k3, k4, wl, wm, ws;
  if (-1.88170328 * a - 0.80936493 * b > 1) {
    k0 = 1.19086277;
    k1 = 1.76576728;
    k2 = 0.59662641;
    k3 = 0.75515197;
    k4 = 0.56771245;
    wl = 4.0767416621;
    wm = -3.3077115913;
    ws = 0.2309699292;
  } else if (1.81444104 * a - 1.19445276 * b > 1) {
    k0 = 0.73956515;
    k1 = -0.45954404;
    k2 = 0.08285427;
    k3 = 0.1254107;
    k4 = 0.14503204;
    wl = -1.2684380046;
    wm = 2.6097574011;
    ws = -0.3413193965;
  } else {
    k0 = 1.35733652;
    k1 = -915799e-8;
    k2 = -1.1513021;
    k3 = -0.50559606;
    k4 = 692167e-8;
    wl = -0.0041960863;
    wm = -0.7034186147;
    ws = 1.707614701;
  }
  let S2 = k0 + k1 * a + k2 * b + k3 * a * a + k4 * a * b;
  let k_l = 0.3963377774 * a + 0.2158037573 * b;
  let k_m = -0.1055613458 * a - 0.0638541728 * b;
  let k_s = -0.0894841775 * a - 1.291485548 * b;
  {
    let l_ = 1 + S2 * k_l;
    let m_ = 1 + S2 * k_m;
    let s_ = 1 + S2 * k_s;
    let l2 = l_ * l_ * l_;
    let m2 = m_ * m_ * m_;
    let s = s_ * s_ * s_;
    let l_dS = 3 * k_l * l_ * l_;
    let m_dS = 3 * k_m * m_ * m_;
    let s_dS = 3 * k_s * s_ * s_;
    let l_dS2 = 6 * k_l * k_l * l_;
    let m_dS2 = 6 * k_m * k_m * m_;
    let s_dS2 = 6 * k_s * k_s * s_;
    let f2 = wl * l2 + wm * m2 + ws * s;
    let f1 = wl * l_dS + wm * m_dS + ws * s_dS;
    let f22 = wl * l_dS2 + wm * m_dS2 + ws * s_dS2;
    S2 = S2 - f2 * f1 / (f1 * f1 - 0.5 * f2 * f22);
  }
  return S2;
}
function find_cusp(a, b) {
  let S_cusp = compute_max_saturation(a, b);
  let rgb = convertOklabToLrgb({ l: 1, a: S_cusp * a, b: S_cusp * b });
  let L_cusp = Math.cbrt(1 / Math.max(rgb.r, rgb.g, rgb.b));
  let C_cusp = L_cusp * S_cusp;
  return [L_cusp, C_cusp];
}
function find_gamut_intersection(a, b, L1, C1, L0, cusp = null) {
  if (!cusp) {
    cusp = find_cusp(a, b);
  }
  let t2;
  if ((L1 - L0) * cusp[1] - (cusp[0] - L0) * C1 <= 0) {
    t2 = cusp[1] * L0 / (C1 * cusp[0] + cusp[1] * (L0 - L1));
  } else {
    t2 = cusp[1] * (L0 - 1) / (C1 * (cusp[0] - 1) + cusp[1] * (L0 - L1));
    {
      let dL = L1 - L0;
      let dC = C1;
      let k_l = 0.3963377774 * a + 0.2158037573 * b;
      let k_m = -0.1055613458 * a - 0.0638541728 * b;
      let k_s = -0.0894841775 * a - 1.291485548 * b;
      let l_dt = dL + dC * k_l;
      let m_dt = dL + dC * k_m;
      let s_dt = dL + dC * k_s;
      {
        let L2 = L0 * (1 - t2) + t2 * L1;
        let C2 = t2 * C1;
        let l_ = L2 + C2 * k_l;
        let m_ = L2 + C2 * k_m;
        let s_ = L2 + C2 * k_s;
        let l2 = l_ * l_ * l_;
        let m2 = m_ * m_ * m_;
        let s = s_ * s_ * s_;
        let ldt = 3 * l_dt * l_ * l_;
        let mdt = 3 * m_dt * m_ * m_;
        let sdt = 3 * s_dt * s_ * s_;
        let ldt2 = 6 * l_dt * l_dt * l_;
        let mdt2 = 6 * m_dt * m_dt * m_;
        let sdt2 = 6 * s_dt * s_dt * s_;
        let r2 = 4.0767416621 * l2 - 3.3077115913 * m2 + 0.2309699292 * s - 1;
        let r1 = 4.0767416621 * ldt - 3.3077115913 * mdt + 0.2309699292 * sdt;
        let r22 = 4.0767416621 * ldt2 - 3.3077115913 * mdt2 + 0.2309699292 * sdt2;
        let u_r = r1 / (r1 * r1 - 0.5 * r2 * r22);
        let t_r = -r2 * u_r;
        let g = -1.2684380046 * l2 + 2.6097574011 * m2 - 0.3413193965 * s - 1;
        let g1 = -1.2684380046 * ldt + 2.6097574011 * mdt - 0.3413193965 * sdt;
        let g2 = -1.2684380046 * ldt2 + 2.6097574011 * mdt2 - 0.3413193965 * sdt2;
        let u_g = g1 / (g1 * g1 - 0.5 * g * g2);
        let t_g = -g * u_g;
        let b2 = -0.0041960863 * l2 - 0.7034186147 * m2 + 1.707614701 * s - 1;
        let b1 = -0.0041960863 * ldt - 0.7034186147 * mdt + 1.707614701 * sdt;
        let b22 = -0.0041960863 * ldt2 - 0.7034186147 * mdt2 + 1.707614701 * sdt2;
        let u_b = b1 / (b1 * b1 - 0.5 * b2 * b22);
        let t_b = -b2 * u_b;
        t_r = u_r >= 0 ? t_r : 1e6;
        t_g = u_g >= 0 ? t_g : 1e6;
        t_b = u_b >= 0 ? t_b : 1e6;
        t2 += Math.min(t_r, Math.min(t_g, t_b));
      }
    }
  }
  return t2;
}
function get_ST_max(a_, b_, cusp = null) {
  if (!cusp) {
    cusp = find_cusp(a_, b_);
  }
  let L2 = cusp[0];
  let C2 = cusp[1];
  return [C2 / L2, C2 / (1 - L2)];
}
function get_Cs(L2, a_, b_) {
  let cusp = find_cusp(a_, b_);
  let C_max = find_gamut_intersection(a_, b_, L2, 1, L2, cusp);
  let ST_max = get_ST_max(a_, b_, cusp);
  let S_mid = 0.11516993 + 1 / (7.4477897 + 4.1590124 * b_ + a_ * (-2.19557347 + 1.75198401 * b_ + a_ * (-2.13704948 - 10.02301043 * b_ + a_ * (-4.24894561 + 5.38770819 * b_ + 4.69891013 * a_))));
  let T_mid = 0.11239642 + 1 / (1.6132032 - 0.68124379 * b_ + a_ * (0.40370612 + 0.90148123 * b_ + a_ * (-0.27087943 + 0.6122399 * b_ + a_ * (299215e-8 - 0.45399568 * b_ - 0.14661872 * a_))));
  let k2 = C_max / Math.min(L2 * ST_max[0], (1 - L2) * ST_max[1]);
  let C_a = L2 * S_mid;
  let C_b = (1 - L2) * T_mid;
  let C_mid = 0.9 * k2 * Math.sqrt(
    Math.sqrt(
      1 / (1 / (C_a * C_a * C_a * C_a) + 1 / (C_b * C_b * C_b * C_b))
    )
  );
  C_a = L2 * 0.4;
  C_b = (1 - L2) * 0.8;
  let C_0 = Math.sqrt(1 / (1 / (C_a * C_a) + 1 / (C_b * C_b)));
  return [C_0, C_mid, C_max];
}
function convertOklabToOkhsl(lab) {
  const ret = { mode: "okhsl", l: toe(lab.l) };
  if (lab.alpha !== void 0) {
    ret.alpha = lab.alpha;
  }
  let c4 = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
  if (!c4) {
    ret.s = 0;
    return ret;
  }
  let [C_0, C_mid, C_max] = get_Cs(lab.l, lab.a / c4, lab.b / c4);
  let s;
  if (c4 < C_mid) {
    let k_0 = 0;
    let k_1 = 0.8 * C_0;
    let k_2 = 1 - k_1 / C_mid;
    let t2 = (c4 - k_0) / (k_1 + k_2 * (c4 - k_0));
    s = t2 * 0.8;
  } else {
    let k_0 = C_mid;
    let k_1 = 0.2 * C_mid * C_mid * 1.25 * 1.25 / C_0;
    let k_2 = 1 - k_1 / (C_max - C_mid);
    let t2 = (c4 - k_0) / (k_1 + k_2 * (c4 - k_0));
    s = 0.8 + 0.2 * t2;
  }
  if (s) {
    ret.s = s;
    ret.h = normalizeHue(Math.atan2(lab.b, lab.a) * 180 / Math.PI);
  }
  return ret;
}
function convertOkhslToOklab(hsl) {
  let l2 = toe_inv(hsl.l);
  const ret = { mode: "oklab", l: l2 };
  if (hsl.alpha !== void 0) {
    ret.alpha = hsl.alpha;
  }
  if (!hsl.s || hsl.l === 1) {
    ret.a = ret.b = 0;
    return ret;
  }
  let a_ = Math.cos(hsl.h / 180 * Math.PI);
  let b_ = Math.sin(hsl.h / 180 * Math.PI);
  let [C_0, C_mid, C_max] = get_Cs(l2, a_, b_);
  let t2, k_0, k_1, k_2;
  if (hsl.s < 0.8) {
    t2 = 1.25 * hsl.s;
    k_0 = 0;
    k_1 = 0.8 * C_0;
    k_2 = 1 - k_1 / C_mid;
  } else {
    t2 = 5 * (hsl.s - 0.8);
    k_0 = C_mid;
    k_1 = 0.2 * C_mid * C_mid * 1.25 * 1.25 / C_0;
    k_2 = 1 - k_1 / (C_max - C_mid);
  }
  let C2 = k_0 + t2 * k_1 / (1 - k_2 * t2);
  ret.a = C2 * a_;
  ret.b = C2 * b_;
  return ret;
}
const modeOkhsl = {
  ...definition$k,
  mode: "okhsl",
  channels: ["h", "s", "l", "alpha"],
  parse: ["--okhsl"],
  serialize: "--okhsl",
  fromMode: {
    oklab: convertOklabToOkhsl,
    rgb: (c4) => convertOklabToOkhsl(convertRgbToOklab(c4))
  },
  toMode: {
    oklab: convertOkhslToOklab,
    rgb: (c4) => convertOklabToRgb(convertOkhslToOklab(c4))
  }
};
function convertOklabToOkhsv(lab) {
  let c4 = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
  let l2 = lab.l;
  let a_ = c4 ? lab.a / c4 : 1;
  let b_ = c4 ? lab.b / c4 : 1;
  let [S_max, T2] = get_ST_max(a_, b_);
  let S_0 = 0.5;
  let k2 = 1 - S_0 / S_max;
  let t2 = T2 / (c4 + l2 * T2);
  let L_v = t2 * l2;
  let C_v = t2 * c4;
  let L_vt = toe_inv(L_v);
  let C_vt = C_v * L_vt / L_v;
  let rgb_scale = convertOklabToLrgb({ l: L_vt, a: a_ * C_vt, b: b_ * C_vt });
  let scale_L = Math.cbrt(
    1 / Math.max(rgb_scale.r, rgb_scale.g, rgb_scale.b, 0)
  );
  l2 = l2 / scale_L;
  c4 = c4 / scale_L * toe(l2) / l2;
  l2 = toe(l2);
  const ret = {
    mode: "okhsv",
    s: c4 ? (S_0 + T2) * C_v / (T2 * S_0 + T2 * k2 * C_v) : 0,
    v: l2 ? l2 / L_v : 0
  };
  if (ret.s) {
    ret.h = normalizeHue(Math.atan2(lab.b, lab.a) * 180 / Math.PI);
  }
  if (lab.alpha !== void 0) {
    ret.alpha = lab.alpha;
  }
  return ret;
}
function convertOkhsvToOklab(hsv) {
  const ret = { mode: "oklab" };
  if (hsv.alpha !== void 0) {
    ret.alpha = hsv.alpha;
  }
  const h = hsv.h || 0;
  const a_ = Math.cos(h / 180 * Math.PI);
  const b_ = Math.sin(h / 180 * Math.PI);
  const [S_max, T2] = get_ST_max(a_, b_);
  const S_0 = 0.5;
  const k2 = 1 - S_0 / S_max;
  const L_v = 1 - hsv.s * S_0 / (S_0 + T2 - T2 * k2 * hsv.s);
  const C_v = hsv.s * T2 * S_0 / (S_0 + T2 - T2 * k2 * hsv.s);
  const L_vt = toe_inv(L_v);
  const C_vt = C_v * L_vt / L_v;
  const rgb_scale = convertOklabToLrgb({
    l: L_vt,
    a: a_ * C_vt,
    b: b_ * C_vt
  });
  const scale_L = Math.cbrt(
    1 / Math.max(rgb_scale.r, rgb_scale.g, rgb_scale.b, 0)
  );
  const L_new = toe_inv(hsv.v * L_v);
  const C2 = C_v * L_new / L_v;
  ret.l = L_new * scale_L;
  ret.a = C2 * a_ * scale_L;
  ret.b = C2 * b_ * scale_L;
  return ret;
}
const modeOkhsv = {
  ...definition$j,
  mode: "okhsv",
  channels: ["h", "s", "v", "alpha"],
  parse: ["--okhsv"],
  serialize: "--okhsv",
  fromMode: {
    oklab: convertOklabToOkhsv,
    rgb: (c4) => convertOklabToOkhsv(convertRgbToOklab(c4))
  },
  toMode: {
    oklab: convertOkhsvToOklab,
    rgb: (c4) => convertOklabToRgb(convertOkhsvToOklab(c4))
  }
};
function parseOklab(color, parsed) {
  if (!parsed || parsed[0] !== "oklab") {
    return void 0;
  }
  const res = { mode: "oklab" };
  const [, l2, a, b, alpha] = parsed;
  if (l2.type === Tok.Hue || a.type === Tok.Hue || b.type === Tok.Hue) {
    return void 0;
  }
  if (l2.type !== Tok.None) {
    res.l = l2.type === Tok.Number ? l2.value : l2.value / 100;
  }
  if (a.type !== Tok.None) {
    res.a = a.type === Tok.Number ? a.value : a.value * 0.4 / 100;
  }
  if (b.type !== Tok.None) {
    res.b = b.type === Tok.Number ? b.value : b.value * 0.4 / 100;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
  }
  return res;
}
const definition$8 = {
  ...definition$f,
  mode: "oklab",
  toMode: {
    lrgb: convertOklabToLrgb,
    rgb: convertOklabToRgb
  },
  fromMode: {
    lrgb: convertLrgbToOklab,
    rgb: convertRgbToOklab
  },
  ranges: {
    l: [0, 1],
    a: [-0.4, 0.4],
    b: [-0.4, 0.4]
  },
  parse: [parseOklab],
  serialize: (c4) => `oklab(${c4.l !== void 0 ? c4.l : "none"} ${c4.a !== void 0 ? c4.a : "none"} ${c4.b !== void 0 ? c4.b : "none"}${c4.alpha < 1 ? ` / ${c4.alpha}` : ""})`
};
function parseOklch(color, parsed) {
  if (!parsed || parsed[0] !== "oklch") {
    return void 0;
  }
  const res = { mode: "oklch" };
  const [, l2, c4, h, alpha] = parsed;
  if (l2.type !== Tok.None) {
    if (l2.type === Tok.Hue) {
      return void 0;
    }
    res.l = l2.type === Tok.Number ? l2.value : l2.value / 100;
  }
  if (c4.type !== Tok.None) {
    res.c = Math.max(
      0,
      c4.type === Tok.Number ? c4.value : c4.value * 0.4 / 100
    );
  }
  if (h.type !== Tok.None) {
    if (h.type === Tok.Percentage) {
      return void 0;
    }
    res.h = h.value;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
  }
  return res;
}
const definition$7 = {
  ...definition$d,
  mode: "oklch",
  toMode: {
    oklab: (c4) => convertLchToLab(c4, "oklab"),
    rgb: (c4) => convertOklabToRgb(convertLchToLab(c4, "oklab"))
  },
  fromMode: {
    rgb: (c4) => convertLabToLch(convertRgbToOklab(c4), "oklch"),
    oklab: (c4) => convertLabToLch(c4, "oklch")
  },
  parse: [parseOklch],
  serialize: (c4) => `oklch(${c4.l !== void 0 ? c4.l : "none"} ${c4.c !== void 0 ? c4.c : "none"} ${c4.h || 0}${c4.alpha < 1 ? ` / ${c4.alpha}` : ""})`,
  ranges: {
    l: [0, 1],
    c: [0, 0.4],
    h: [0, 360]
  }
};
const convertP3ToXyz65 = (rgb) => {
  let { r: r2, g, b, alpha } = convertRgbToLrgb(rgb);
  let res = {
    mode: "xyz65",
    x: 0.486570948648216 * r2 + 0.265667693169093 * g + 0.1982172852343625 * b,
    y: 0.2289745640697487 * r2 + 0.6917385218365062 * g + 0.079286914093745 * b,
    z: 0 * r2 + 0.0451133818589026 * g + 1.043944368900976 * b
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertXyz65ToP3 = ({ x: x2, y: y2, z: z2, alpha }) => {
  let res = convertLrgbToRgb(
    {
      r: x2 * 2.4934969119414263 - y2 * 0.9313836179191242 - 0.402710784450717 * z2,
      g: x2 * -0.8294889695615749 + y2 * 1.7626640603183465 + 0.0236246858419436 * z2,
      b: x2 * 0.0358458302437845 - y2 * 0.0761723892680418 + 0.9568845240076871 * z2
    },
    "p3"
  );
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const definition$6 = {
  ...definition$q,
  mode: "p3",
  parse: ["display-p3"],
  serialize: "display-p3",
  fromMode: {
    rgb: (color) => convertXyz65ToP3(convertRgbToXyz65(color)),
    xyz65: convertXyz65ToP3
  },
  toMode: {
    rgb: (color) => convertXyz65ToRgb(convertP3ToXyz65(color)),
    xyz65: convertP3ToXyz65
  }
};
const gamma$1 = (v2) => {
  let abs2 = Math.abs(v2);
  if (abs2 >= 1 / 512) {
    return Math.sign(v2) * Math.pow(abs2, 1 / 1.8);
  }
  return 16 * v2;
};
const convertXyz50ToProphoto = ({ x: x2, y: y2, z: z2, alpha }) => {
  let res = {
    mode: "prophoto",
    r: gamma$1(
      x2 * 1.3457868816471585 - y2 * 0.2555720873797946 - 0.0511018649755453 * z2
    ),
    g: gamma$1(
      x2 * -0.5446307051249019 + y2 * 1.5082477428451466 + 0.0205274474364214 * z2
    ),
    b: gamma$1(x2 * 0 + y2 * 0 + 1.2119675456389452 * z2)
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const linearize$1 = (v2) => {
  let abs2 = Math.abs(v2);
  if (abs2 >= 16 / 512) {
    return Math.sign(v2) * Math.pow(abs2, 1.8);
  }
  return v2 / 16;
};
const convertProphotoToXyz50 = (prophoto) => {
  let r2 = linearize$1(prophoto.r);
  let g = linearize$1(prophoto.g);
  let b = linearize$1(prophoto.b);
  let res = {
    mode: "xyz50",
    x: 0.7977666449006423 * r2 + 0.1351812974005331 * g + 0.0313477341283922 * b,
    y: 0.2880748288194013 * r2 + 0.7118352342418731 * g + 899369387256e-16 * b,
    z: 0 * r2 + 0 * g + 0.8251046025104602 * b
  };
  if (prophoto.alpha !== void 0) {
    res.alpha = prophoto.alpha;
  }
  return res;
};
const definition$5 = {
  ...definition$q,
  mode: "prophoto",
  parse: ["prophoto-rgb"],
  serialize: "prophoto-rgb",
  fromMode: {
    xyz50: convertXyz50ToProphoto,
    rgb: (color) => convertXyz50ToProphoto(convertRgbToXyz50(color))
  },
  toMode: {
    xyz50: convertProphotoToXyz50,
    rgb: (color) => convertXyz50ToRgb(convertProphotoToXyz50(color))
  }
};
const α$1 = 1.09929682680944;
const β$1 = 0.018053968510807;
const gamma = (v2) => {
  const abs2 = Math.abs(v2);
  if (abs2 > β$1) {
    return (Math.sign(v2) || 1) * (α$1 * Math.pow(abs2, 0.45) - (α$1 - 1));
  }
  return 4.5 * v2;
};
const convertXyz65ToRec2020 = ({ x: x2, y: y2, z: z2, alpha }) => {
  let res = {
    mode: "rec2020",
    r: gamma(
      x2 * 1.7166511879712683 - y2 * 0.3556707837763925 - 0.2533662813736599 * z2
    ),
    g: gamma(
      x2 * -0.6666843518324893 + y2 * 1.6164812366349395 + 0.0157685458139111 * z2
    ),
    b: gamma(
      x2 * 0.0176398574453108 - y2 * 0.0427706132578085 + 0.9421031212354739 * z2
    )
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const α = 1.09929682680944;
const β = 0.018053968510807;
const linearize = (v2) => {
  let abs2 = Math.abs(v2);
  if (abs2 < β * 4.5) {
    return v2 / 4.5;
  }
  return (Math.sign(v2) || 1) * Math.pow((abs2 + α - 1) / α, 1 / 0.45);
};
const convertRec2020ToXyz65 = (rec2020) => {
  let r2 = linearize(rec2020.r);
  let g = linearize(rec2020.g);
  let b = linearize(rec2020.b);
  let res = {
    mode: "xyz65",
    x: 0.6369580483012911 * r2 + 0.1446169035862083 * g + 0.1688809751641721 * b,
    y: 0.262700212011267 * r2 + 0.6779980715188708 * g + 0.059301716469862 * b,
    z: 0 * r2 + 0.0280726930490874 * g + 1.0609850577107909 * b
  };
  if (rec2020.alpha !== void 0) {
    res.alpha = rec2020.alpha;
  }
  return res;
};
const definition$4 = {
  ...definition$q,
  mode: "rec2020",
  fromMode: {
    xyz65: convertXyz65ToRec2020,
    rgb: (color) => convertXyz65ToRec2020(convertRgbToXyz65(color))
  },
  toMode: {
    xyz65: convertRec2020ToXyz65,
    rgb: (color) => convertXyz65ToRgb(convertRec2020ToXyz65(color))
  },
  parse: ["rec2020"],
  serialize: "rec2020"
};
const bias = 0.0037930732552754493;
const bias_cbrt = Math.cbrt(bias);
const transfer$1 = (v2) => Math.cbrt(v2) - bias_cbrt;
const convertRgbToXyb = (color) => {
  const { r: r2, g, b, alpha } = convertRgbToLrgb(color);
  const l2 = transfer$1(0.3 * r2 + 0.622 * g + 0.078 * b + bias);
  const m2 = transfer$1(0.23 * r2 + 0.692 * g + 0.078 * b + bias);
  const s = transfer$1(
    0.2434226892454782 * r2 + 0.2047674442449682 * g + 0.5518098665095535 * b + bias
  );
  const res = {
    mode: "xyb",
    x: (l2 - m2) / 2,
    y: (l2 + m2) / 2,
    /* Apply default chroma from luma (subtract Y from B) */
    b: s - (l2 + m2) / 2
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const transfer = (v2) => Math.pow(v2 + bias_cbrt, 3);
const convertXybToRgb = ({ x: x2, y: y2, b, alpha }) => {
  const l2 = transfer(x2 + y2) - bias;
  const m2 = transfer(y2 - x2) - bias;
  const s = transfer(b + y2) - bias;
  const res = convertLrgbToRgb({
    r: 11.031566904639861 * l2 - 9.866943908131562 * m2 - 0.16462299650829934 * s,
    g: -3.2541473810744237 * l2 + 4.418770377582723 * m2 - 0.16462299650829934 * s,
    b: -3.6588512867136815 * l2 + 2.7129230459360922 * m2 + 1.9459282407775895 * s
  });
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const definition$3 = {
  mode: "xyb",
  channels: ["x", "y", "b", "alpha"],
  parse: ["--xyb"],
  serialize: "--xyb",
  toMode: {
    rgb: convertXybToRgb
  },
  fromMode: {
    rgb: convertRgbToXyb
  },
  ranges: {
    x: [-0.0154, 0.0281],
    y: [0, 0.8453],
    b: [-0.2778, 0.388]
  },
  interpolate: {
    x: interpolatorLinear,
    y: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
const definition$2 = {
  mode: "xyz50",
  parse: ["xyz-d50"],
  serialize: "xyz-d50",
  toMode: {
    rgb: convertXyz50ToRgb,
    lab: convertXyz50ToLab
  },
  fromMode: {
    rgb: convertRgbToXyz50,
    lab: convertLabToXyz50
  },
  channels: ["x", "y", "z", "alpha"],
  ranges: {
    x: [0, 0.964],
    y: [0, 0.999],
    z: [0, 0.825]
  },
  interpolate: {
    x: interpolatorLinear,
    y: interpolatorLinear,
    z: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
const convertXyz65ToXyz50 = (xyz65) => {
  let { x: x2, y: y2, z: z2, alpha } = xyz65;
  let res = {
    mode: "xyz50",
    x: 1.0479298208405488 * x2 + 0.0229467933410191 * y2 - 0.0501922295431356 * z2,
    y: 0.0296278156881593 * x2 + 0.990434484573249 * y2 - 0.0170738250293851 * z2,
    z: -0.0092430581525912 * x2 + 0.0150551448965779 * y2 + 0.7518742899580008 * z2
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertXyz50ToXyz65 = (xyz50) => {
  let { x: x2, y: y2, z: z2, alpha } = xyz50;
  let res = {
    mode: "xyz65",
    x: 0.9554734527042182 * x2 - 0.0230985368742614 * y2 + 0.0632593086610217 * z2,
    y: -0.0283697069632081 * x2 + 1.0099954580058226 * y2 + 0.021041398966943 * z2,
    z: 0.0123140016883199 * x2 - 0.0205076964334779 * y2 + 1.3303659366080753 * z2
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const definition$1 = {
  mode: "xyz65",
  toMode: {
    rgb: convertXyz65ToRgb,
    xyz50: convertXyz65ToXyz50
  },
  fromMode: {
    rgb: convertRgbToXyz65,
    xyz50: convertXyz50ToXyz65
  },
  ranges: {
    x: [0, 0.95],
    y: [0, 1],
    z: [0, 1.088]
  },
  channels: ["x", "y", "z", "alpha"],
  parse: ["xyz", "xyz-d65"],
  serialize: "xyz-d65",
  interpolate: {
    x: interpolatorLinear,
    y: interpolatorLinear,
    z: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
const convertRgbToYiq = ({ r: r2, g, b, alpha }) => {
  const res = {
    mode: "yiq",
    y: 0.29889531 * r2 + 0.58662247 * g + 0.11448223 * b,
    i: 0.59597799 * r2 - 0.2741761 * g - 0.32180189 * b,
    q: 0.21147017 * r2 - 0.52261711 * g + 0.31114694 * b
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const convertYiqToRgb = ({ y: y2, i, q: q2, alpha }) => {
  const res = {
    mode: "rgb",
    r: y2 + 0.95608445 * i + 0.6208885 * q2,
    g: y2 - 0.27137664 * i - 0.6486059 * q2,
    b: y2 - 1.10561724 * i + 1.70250126 * q2
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const definition = {
  mode: "yiq",
  toMode: {
    rgb: convertYiqToRgb
  },
  fromMode: {
    rgb: convertRgbToYiq
  },
  channels: ["y", "i", "q", "alpha"],
  parse: ["--yiq"],
  serialize: "--yiq",
  ranges: {
    i: [-0.595, 0.595],
    q: [-0.522, 0.522]
  },
  interpolate: {
    y: interpolatorLinear,
    i: interpolatorLinear,
    q: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
const clamp$1 = (value) => Math.max(0, Math.min(1, value));
const fixup = (value) => Math.round(clamp$1(value) * 255);
const serializeHex = (color) => {
  if (color === void 0) {
    return void 0;
  }
  let r2 = fixup(color.r);
  let g = fixup(color.g);
  let b = fixup(color.b);
  return "#" + (1 << 24 | r2 << 16 | g << 8 | b).toString(16).slice(1);
};
const formatHex = (c4) => serializeHex(converter("rgb")(c4));
useMode(definition$p);
useMode(definition$o);
useMode(definition$n);
useMode(definition$m);
useMode(definition$l);
useMode(definition$k);
useMode(definition$j);
useMode(definition$i);
useMode(definition$h);
useMode(definition$g);
useMode(definition$f);
useMode(definition$e);
useMode(definition$d);
useMode(definition$c);
useMode(definition$b);
useMode(definition$a);
useMode(definition$9);
useMode(modeOkhsl);
useMode(modeOkhsv);
useMode(definition$8);
useMode(definition$7);
useMode(definition$6);
useMode(definition$5);
useMode(definition$4);
useMode(definition$q);
useMode(definition$3);
useMode(definition$2);
useMode(definition$1);
useMode(definition);
const toHex = (c4) => formatHex(c4) || "#000000";
const uniqueName = (existing, base = "custom") => {
  let i = 1;
  let name = base;
  while (existing.includes(name)) {
    name = `${base}${i++}`;
  }
  return name;
};
const rotateHue = (hex2, deg) => {
  const c4 = parse(hex2);
  if (!c4) return hex2;
  const toHsl2 = converter("hsl");
  const fromHsl = converter("rgb");
  const hsl = toHsl2(c4);
  hsl.h = (((hsl.h || 0) + deg) % 360 + 360) % 360;
  return toHex(fromHsl(hsl));
};
const sanitizeSwiftName = (s) => {
  const cleaned = s.replace(/[^A-Za-z0-9_]/g, "_");
  return /[A-Za-z_]/.test(cleaned[0]) ? cleaned : `c_${cleaned}`;
};
const sanitizeXmlName = (s) => {
  let cleaned = s.toLowerCase().replace(/[^a-z0-9_]/g, "_");
  if (!/[a-z_]/.test(cleaned[0])) cleaned = `c_${cleaned}`;
  return cleaned;
};
const usePaletteStore = create((set, get2) => ({
  theme: "dark",
  themeMode: "dark",
  palettes: { light: defaultPalette, dark: defaultPalette },
  palette: defaultPalette,
  paletteVersion: 0,
  groups: [
    { id: "core", name: "Système" },
    { id: "brand", name: "Marque" },
    { id: "semantic", name: "Sémantique" },
    { id: "neutrals", name: "Neutres" },
    { id: "custom", name: "Personnalisé" }
  ],
  tokenGroups: {
    background: "core",
    surface: "core",
    text: "core",
    border: "core",
    primary: "brand",
    secondary: "brand",
    accent: "brand",
    tertiary: "brand",
    link: "brand",
    success: "semantic",
    danger: "semantic",
    warning: "semantic",
    info: "semantic",
    muted: "neutrals"
  },
  imageDataUrl: null,
  history: [],
  future: [],
  setTheme: (t2) => set((s) => ({ theme: t2, palette: s.palettes[t2], paletteVersion: (s.paletteVersion || 0) + 1 })),
  setThemeMode: (m2, systemTheme) => {
    if (m2 === "auto") {
      const sys = systemTheme || (typeof window !== "undefined" ? document.documentElement.classList.contains("dark") ? "dark" : "light" : "dark");
      set((s) => ({ themeMode: "auto", theme: sys, palette: s.palettes[sys], paletteVersion: (s.paletteVersion || 0) + 1 }));
    } else {
      set((s) => ({ themeMode: m2, theme: m2, palette: s.palettes[m2], paletteVersion: (s.paletteVersion || 0) + 1 }));
    }
  },
  setToken: (name, hex2) => set((s) => {
    const prev = s.palette;
    const next = { ...prev, [name]: safeHex$2(hex2) };
    const palettes = { ...s.palettes, [s.theme]: next };
    return { palette: next, palettes, history: [...s.history, prev], future: [], paletteVersion: (s.paletteVersion || 0) + 1 };
  }),
  addToken: (name, hex2) => set((s) => {
    const key = name && !s.palette[name] ? name : uniqueName(Object.keys(s.palette));
    const next = { ...s.palette, [key]: safeHex$2(hex2 || "#888888") };
    const palettes = { ...s.palettes, [s.theme]: next };
    const tokenGroups = { ...s.tokenGroups, [key]: s.tokenGroups[key] ?? "custom" };
    return { palette: next, palettes, tokenGroups, history: [...s.history, s.palette], future: [], paletteVersion: (s.paletteVersion || 0) + 1 };
  }),
  removeToken: (name) => set((s) => {
    const next = { ...s.palette };
    delete next[name];
    const tg2 = { ...s.tokenGroups };
    delete tg2[name];
    const palettes = { ...s.palettes, [s.theme]: next };
    return { palette: next, palettes, tokenGroups: tg2, history: [...s.history, s.palette], future: [], paletteVersion: (s.paletteVersion || 0) + 1 };
  }),
  renameToken: (oldName, newName) => set((s) => {
    const trimmed = (newName || "").trim();
    if (!trimmed || trimmed === oldName || s.palette[trimmed]) return s;
    const next = {};
    for (const [k2, v2] of Object.entries(s.palette)) next[k2 === oldName ? trimmed : k2] = v2;
    const palettes = { ...s.palettes, [s.theme]: next };
    const tokenGroups = { ...s.tokenGroups };
    if (tokenGroups[oldName] !== void 0) {
      tokenGroups[trimmed] = tokenGroups[oldName] || null;
      delete tokenGroups[oldName];
    }
    return { palette: next, palettes, tokenGroups, history: [...s.history, s.palette], future: [], paletteVersion: (s.paletteVersion || 0) + 1 };
  }),
  setPalette: (p2) => set((s) => ({ palette: p2, history: [...s.history, s.palette], future: [], paletteVersion: (s.paletteVersion || 0) + 1 })),
  undo: () => set((s) => {
    const prev = s.history[s.history.length - 1];
    if (!prev) return s;
    const history = s.history.slice(0, -1);
    const future = [s.palette, ...s.future];
    const palettes = { ...s.palettes, [s.theme]: prev };
    return { palette: prev, palettes, history, future, paletteVersion: (s.paletteVersion || 0) + 1 };
  }),
  redo: () => set((s) => {
    const next = s.future[0];
    if (!next) return s;
    const future = s.future.slice(1);
    const history = [...s.history, s.palette];
    const palettes = { ...s.palettes, [s.theme]: next };
    return { palette: next, palettes, history, future, paletteVersion: (s.paletteVersion || 0) + 1 };
  }),
  generateHarmony: (mode, base) => {
    const p2 = { ...get2().palette };
    switch (mode) {
      case "complementary":
        p2.secondary = rotateHue(base, 180);
        p2.accent = rotateHue(base, 0);
        break;
      case "analogous":
        p2.secondary = rotateHue(base, -30);
        p2.accent = rotateHue(base, 30);
        break;
      case "triadic":
        p2.secondary = rotateHue(base, 120);
        p2.accent = rotateHue(base, -120);
        break;
      case "tetradic":
        p2.secondary = rotateHue(base, 60);
        p2.accent = rotateHue(base, 180);
        p2.info = rotateHue(base, -120);
        break;
      case "monochrome":
        p2.secondary = rotateHue(base, 0);
        p2.accent = rotateHue(base, 0);
        break;
    }
    set((s) => ({ palette: p2, palettes: { ...s.palettes, [s.theme]: p2 }, history: [...s.history, s.palette], future: [], paletteVersion: (s.paletteVersion || 0) + 1 }));
  },
  addGroup: (name) => {
    const id2 = uniqueName(get2().groups.map((g2) => g2.id), "group");
    const g = { id: id2, name: name || "Groupe" };
    set((s) => ({ groups: [...s.groups, g] }));
    return id2;
  },
  renameGroup: (id2, name) => set((s) => ({ groups: s.groups.map((g) => g.id === id2 ? { ...g, name } : g) })),
  reorderGroups: (ids) => set((s) => {
    const existing = new Map(s.groups.map((g) => [g.id, g]));
    const ordered = ids.map((id2) => existing.get(id2)).filter(Boolean);
    s.groups.forEach((g) => {
      if (!ids.includes(g.id)) ordered.push(g);
    });
    return { groups: ordered };
  }),
  removeGroup: (id2) => set((s) => {
    const groups = s.groups.filter((g) => g.id !== id2);
    const tokenGroups = Object.fromEntries(
      Object.entries(s.tokenGroups).map(([t2, gid]) => [t2, gid === id2 ? null : gid])
    );
    return { groups, tokenGroups };
  }),
  assignTokenToGroup: (token, groupId) => set((s) => ({ tokenGroups: { ...s.tokenGroups, [token]: groupId } })),
  setImageDataUrl: (url) => set(() => ({ imageDataUrl: url })),
  exportCSS: () => {
    const p2 = get2().palette;
    const body = Object.entries(p2).map(([k2, v2]) => `  --color-${k2}: ${v2};`).join("\n");
    return `:root{
${body}
}`;
  },
  exportCSSThemes: () => {
    const { palettes } = get2();
    const formatBlock = (selector, pal) => {
      const lines = Object.entries(pal).map(([k2, v2]) => `  --color-${k2}: ${v2};`).join("\n");
      return `${selector} {
${lines}
}`;
    };
    const light = formatBlock(":root", palettes.light);
    const dark = formatBlock(".dark", palettes.dark);
    return `${light}

${dark}
`;
  },
  exportJSON: () => JSON.stringify(get2().palette, null, 2),
  exportStyleDictionary: () => {
    const { palettes } = get2();
    const wrap = (pal) => Object.fromEntries(Object.entries(pal).map(([k2, v2]) => [k2, { value: v2 }]));
    const out = {
      color: {
        light: wrap(palettes.light),
        dark: wrap(palettes.dark)
      }
    };
    return JSON.stringify(out, null, 2);
  },
  tailwindConfig: () => {
    const p2 = get2().palette;
    return {
      theme: {
        extend: {
          colors: Object.fromEntries(Object.entries(p2))
        }
      }
    };
  },
  exportSCSS: () => {
    const p2 = get2().palette;
    const lines = Object.entries(p2).map(([k2, v2]) => `$${k2}: ${v2};`);
    const map = `
$colors: (
${Object.entries(p2).map(([k2, v2]) => `  ${k2}: ${v2}`).join(",\n")}
);`;
    return lines.join("\n") + map + "\n";
  },
  exportXAML: () => {
    const p2 = get2().palette;
    const toARGB = (hex2) => {
      const h = hex2.replace("#", "");
      const r2 = h.substring(0, 2), g = h.substring(2, 4), b = h.substring(4, 6);
      return `#FF${r2}${g}${b}`;
    };
    const entries = Object.entries(p2).map(([k2, v2]) => `  <SolidColorBrush x:Key="${k2}" Color="${toARGB(v2)}" />`).join("\n");
    return `<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
  xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
${entries}
</ResourceDictionary>
`;
  },
  exportGIMP: () => {
    const p2 = get2().palette;
    const header = `GIMP Palette
Name: Crimson
Columns: 4
#
`;
    const toLine = (name, hex2) => {
      const { r: r2, g, b } = hexToRgb(hex2);
      return `${r2} ${g} ${b}	${name}`;
    };
    const body = Object.entries(p2).map(([k2, v2]) => toLine(k2, v2)).join("\n");
    return header + body + "\n";
  },
  exportSwiftUI: () => {
    const p2 = get2().palette;
    const lines = Object.entries(p2).map(([k2, v2]) => `    static let ${sanitizeSwiftName(k2)} = Color(hex: "${v2}")`);
    return `import SwiftUI

extension Color {
${lines.join("\n")}
}

// Hex init helper
extension Color {
    init(hex: String) {
        var hex = hex
        if hex.hasPrefix("#") { hex.removeFirst() }
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let r = Double((int >> 16) & 0xff) / 255.0
        let g = Double((int >> 8) & 0xff) / 255.0
        let b = Double(int & 0xff) / 255.0
        self = Color(red: r, green: g, blue: b)
    }
}
`;
  },
  exportAndroidXML: () => {
    const p2 = get2().palette;
    const items = Object.entries(p2).map(([k2, v2]) => `    <color name="${sanitizeXmlName(k2)}">${v2}</color>`).join("\n");
    return `<?xml version="1.0" encoding="utf-8"?>
<resources>
${items}
</resources>
`;
  },
  exportASE: () => {
    const p2 = get2().palette;
    const entries = Object.entries(p2);
    const chunks = [];
    const concat = (parts) => {
      const len = parts.reduce((a, b) => a + b.length, 0);
      const out = new Uint8Array(len);
      let o = 0;
      for (const part of parts) {
        out.set(part, o);
        o += part.length;
      }
      return out;
    };
    const u16be = (n2) => new Uint8Array([n2 >> 8 & 255, n2 & 255]);
    const u32be = (n2) => new Uint8Array([n2 >>> 24 & 255, n2 >>> 16 & 255, n2 >>> 8 & 255, n2 & 255]);
    const ascii = (s) => new TextEncoder().encode(s);
    const utf16be = (s) => {
      const out = new Uint8Array(s.length * 2);
      for (let i = 0; i < s.length; i++) {
        const code = s.charCodeAt(i);
        out[i * 2] = code >> 8 & 255;
        out[i * 2 + 1] = code & 255;
      }
      return out;
    };
    const f32be = (x2) => {
      const buf = new ArrayBuffer(4);
      new DataView(buf).setFloat32(0, x2, false);
      return new Uint8Array(buf);
    };
    chunks.push(ascii("ASEF"));
    chunks.push(u16be(1));
    chunks.push(u16be(0));
    chunks.push(u32be(entries.length));
    for (const [name, hex2] of entries) {
      chunks.push(u16be(1));
      const bodyParts = [];
      bodyParts.push(u16be(name.length + 1));
      bodyParts.push(utf16be(name));
      bodyParts.push(u16be(0));
      bodyParts.push(ascii("RGB "));
      const { r: r2, g, b } = hexToRgb(hex2);
      bodyParts.push(f32be(r2 / 255));
      bodyParts.push(f32be(g / 255));
      bodyParts.push(f32be(b / 255));
      bodyParts.push(u16be(0));
      const body = concat(bodyParts);
      chunks.push(u32be(body.length));
      chunks.push(body);
    }
    const aseBytes = concat(chunks);
    let bin = "";
    for (let i = 0; i < aseBytes.length; i++) bin += String.fromCharCode(aseBytes[i]);
    const b64 = btoa(bin);
    return b64;
  },
  // Contrast helper now respects sandbox effective palette if active
  contrastToBackground: (hex2) => {
    const ep = get2().effectivePalette ? get2().effectivePalette() : get2().palette;
    return contrastRatio(hex2, ep.background);
  },
  generateVariantsFor: (base) => {
    const s = get2();
    const p2 = { ...s.palette };
    const color = p2[base];
    if (!color) return;
    const ensure = (name, val) => {
      if (!p2[name]) p2[name] = val;
    };
    const bg2 = p2.background || "#0b0b0c";
    const L2 = luminance(color);
    const scaleLight = L2 > 0.75 ? 0.04 : L2 > 0.6 ? 0.06 : L2 > 0.4 ? 0.08 : L2 > 0.25 ? 0.1 : 0.12;
    const scaleDark = L2 < 0.15 ? 0.08 : L2 < 0.25 ? 0.1 : L2 < 0.4 ? 0.12 : L2 < 0.6 ? 0.14 : 0.16;
    const hover = lighten(color, scaleLight);
    const active = darken(color, scaleDark);
    const toLch = converter("lch");
    const toRgb2 = converter("rgb");
    const lchMix = (a, b, ratio) => {
      const ca2 = parse(a) && toLch(parse(a));
      const cb2 = parse(b) && toLch(parse(b));
      if (!ca2 || !cb2) return mix(a, b, ratio);
      const r2 = Math.max(0, Math.min(1, ratio));
      let h1 = ca2.h ?? 0, h2 = cb2.h ?? h1, dh2 = h2 - h1;
      if (dh2 > 180) dh2 -= 360;
      if (dh2 < -180) dh2 += 360;
      const out = { mode: "lch", l: ca2.l + (cb2.l - ca2.l) * r2, c: ca2.c + (cb2.c - ca2.c) * r2, h: (h1 + dh2 * r2 + 360) % 360 };
      const rgb = toRgb2(out);
      return formatHex(rgb) || mix(a, b, ratio);
    };
    const subtle = lchMix(bg2, color, 0.12);
    const subtleHover = lchMix(bg2, color, 0.18);
    const fgWhite = ensureContrast("#ffffff", color, 4.5);
    const fgBlack = ensureContrast("#111111", color, 4.5);
    const fg2 = contrastRatio(fgWhite, color) >= contrastRatio(fgBlack, color) ? fgWhite : fgBlack;
    base.charAt(0).toUpperCase() + base.slice(1);
    ensure(`${base}Hover`, hover);
    ensure(`${base}Active`, active);
    ensure(`${base}Subtle`, subtle);
    ensure(`${base}SubtleHover`, subtleHover);
    ensure(`${base}Fg`, fg2);
    set((st) => ({ palette: p2, palettes: { ...st.palettes, [st.theme]: p2 }, history: [...st.history, st.palette], future: [], paletteVersion: (st.paletteVersion || 0) + 1 }));
  },
  generateAllVariants: () => {
    const bases = ["primary", "success", "danger", "warning", "info"];
    bases.forEach((b) => get2().generateVariantsFor(b));
  },
  detectConflicts: () => {
    const p2 = get2().effectivePalette ? get2().effectivePalette() : get2().palette;
    const entries = Object.entries(p2);
    const out = [];
    for (const [name, hex2] of entries) {
      if (/Fg$/.test(name)) {
        const base = name.replace(/Fg$/, "");
        const baseHex = p2[base];
        if (baseHex) {
          const ratio = contrastRatio(hex2, baseHex);
          if (ratio < 4.5) out.push({ token: name, issue: "Contraste insuffisant", a: hex2, b: baseHex, ratio: Math.round(ratio * 100) / 100 });
        }
      }
    }
    const semantic = entries.filter(([n2]) => /^(primary|success|danger|warning|info)$/.test(n2));
    for (let i = 0; i < semantic.length; i++) {
      for (let j = i + 1; j < semantic.length; j++) {
        const [ni2, hi2] = semantic[i];
        const [nj2, hj2] = semantic[j];
        const dist = rgbDistance(hi2, hj2);
        const dE = deltaE(hi2, hj2);
        if (dist < 24 || dE < 5) out.push({ token: ni2, issue: `Très proche de ${nj2}`, a: hi2, b: hj2, deltaE: Math.round(dE * 100) / 100 });
      }
    }
    return out;
  },
  evaluationTarget: "background",
  targetContrast: 4.5,
  setEvaluationTarget: (t2) => set({ evaluationTarget: t2 }),
  setTargetContrast: (v2) => set({ targetContrast: Math.max(1, Math.min(21, v2)) }),
  focusMode: false,
  focusGroupId: null,
  setFocusMode: (on) => set({ focusMode: on }),
  setFocusGroup: (id2) => set({ focusGroupId: id2 }),
  cvdMode: "none",
  setCvdMode: (m2) => set({ cvdMode: m2 }),
  sandboxActive: false,
  sandbox: {},
  setSandboxActive: (on) => set({ sandboxActive: on }),
  setSandboxToken: (name, hex2) => set((s) => {
    if (!s.sandboxActive) return s;
    const next = { ...s.sandbox || {}, [name]: safeHex$2(hex2) };
    return { sandbox: next, paletteVersion: (s.paletteVersion || 0) + 1 };
  }),
  applySandbox: () => set((s) => {
    if (!s.sandboxActive || !s.sandbox || Object.keys(s.sandbox).length === 0) return s;
    const prev = s.palette;
    const merged = { ...s.palette, ...s.sandbox };
    const palettes = { ...s.palettes, [s.theme]: merged };
    return { palette: merged, palettes, history: [...s.history, prev], future: [], sandbox: {}, sandboxActive: false, paletteVersion: (s.paletteVersion || 0) + 1 };
  }),
  discardSandbox: () => set((s) => ({ sandbox: {}, sandboxActive: false, paletteVersion: (s.paletteVersion || 0) + 1 })),
  effectivePalette: () => {
    const s = get2();
    if (!s.sandboxActive) return s.palette;
    return { ...s.palette, ...s.sandbox };
  },
  applySnapshot: (p2) => set((s) => {
    const prev = s.palette;
    const palettes = { ...s.palettes, [s.theme]: p2 };
    return { palette: p2, palettes, history: [...s.history, prev], future: [], sandbox: {}, sandboxActive: false, paletteVersion: (s.paletteVersion || 0) + 1 };
  }),
  // Reset project to a fresh Crimson base palette derived from #990000
  newProject: () => {
    const crimsonBase = "#990000";
    const base = { ...defaultPalette };
    base.primary = crimsonBase;
    const L2 = luminance(crimsonBase);
    const scaleLight = L2 > 0.75 ? 0.04 : L2 > 0.6 ? 0.06 : L2 > 0.4 ? 0.08 : L2 > 0.25 ? 0.1 : 0.12;
    const scaleDark = L2 < 0.15 ? 0.08 : L2 < 0.25 ? 0.1 : L2 < 0.4 ? 0.12 : L2 < 0.6 ? 0.14 : 0.16;
    base.primaryHover = lighten(crimsonBase, scaleLight);
    base.primaryActive = darken(crimsonBase, scaleDark);
    const bg2 = base.background || "#0b0b0c";
    base.primarySubtle = mix(bg2, crimsonBase, 0.12);
    base.primarySubtleHover = mix(bg2, crimsonBase, 0.18);
    const fgWhite = ensureContrast("#ffffff", crimsonBase, 4.5);
    const fgBlack = ensureContrast("#111111", crimsonBase, 4.5);
    base.primaryFg = contrastRatio(fgWhite, crimsonBase) >= contrastRatio(fgBlack, crimsonBase) ? fgWhite : fgBlack;
    set((s) => ({
      palettes: { light: base, dark: base },
      palette: base,
      history: [],
      future: [],
      sandbox: {},
      sandboxActive: false,
      paletteVersion: (s.paletteVersion || 0) + 1
    }));
  },
  recommendFor: (token) => {
    const storeAny = usePaletteStore;
    if (!storeAny._recCache) storeAny._recCache = /* @__PURE__ */ new Map();
    const version = get2().paletteVersion || 0;
    const cacheKey = token + "|" + version + "|" + get2().evaluationTarget + "|" + get2().targetContrast;
    if (storeAny._recCache.has(cacheKey)) {
      return storeAny._recCache.get(cacheKey);
    }
    const palette = get2().effectivePalette ? get2().effectivePalette() : get2().palette;
    const bg2 = palette.background || "#0b0b0c";
    const primary = palette.primary || "#6366f1";
    const surface = palette.surface || "#1f2937";
    const evaluationTarget = get2().evaluationTarget;
    const targetContrast = get2().targetContrast;
    const toLch = converter("lch");
    const toRgb2 = converter("rgb");
    const lchMix = (a, b, ratio) => {
      const ca2 = toLch(parse(a));
      const cb2 = toLch(parse(b));
      if (!ca2 || !cb2) return mix(a, b, ratio);
      const ra2 = Math.max(0, Math.min(1, ratio));
      let h1 = ca2.h ?? 0;
      let h2 = cb2.h ?? h1;
      let dh2 = h2 - h1;
      if (dh2 > 180) dh2 -= 360;
      if (dh2 < -180) dh2 += 360;
      const out2 = {
        mode: "lch",
        l: ca2.l + (cb2.l - ca2.l) * ra2,
        c: ca2.c + (cb2.c - ca2.c) * ra2,
        h: (h1 + dh2 * ra2 + 360) % 360
      };
      const rgb = toRgb2(out2);
      return formatHex(rgb) || mix(a, b, ratio);
    };
    const out = [];
    const push = (label, value, score, variantLabel, reason, metrics) => {
      if (!value) return;
      const v2 = value.toLowerCase();
      if (out.find((r2) => r2.value.toLowerCase() === v2)) return;
      out.push({ label, value, score, variant: variantLabel, reason, metrics });
    };
    const tokenLower = token.toLowerCase();
    const baseMatch = tokenLower.match(/^(primary|success|danger|warning|info)/);
    const variantMatch = tokenLower.match(/(hover|active|subtlehover|subtle|fg)$/);
    const baseToken = baseMatch ? baseMatch[1] : "primary";
    const variant = variantMatch ? variantMatch[1] : "base";
    const baseColor = palette[baseToken] || primary;
    const gen = {
      hover: (c4) => {
        const L2 = luminance(c4);
        const scaleLight = L2 > 0.75 ? 0.04 : L2 > 0.6 ? 0.06 : L2 > 0.4 ? 0.08 : L2 > 0.25 ? 0.1 : 0.12;
        return lighten(c4, scaleLight);
      },
      active: (c4) => {
        const L2 = luminance(c4);
        const scaleDark = L2 < 0.15 ? 0.08 : L2 < 0.25 ? 0.1 : L2 < 0.4 ? 0.12 : L2 < 0.6 ? 0.14 : 0.16;
        return darken(c4, scaleDark);
      },
      subtle: (c4) => mix(bg2, c4, 0.12),
      subtlehover: (c4) => mix(bg2, c4, 0.18),
      fg: (c4) => {
        const white = ensureContrast("#ffffff", c4, 4.5);
        const black = ensureContrast("#111111", c4, 4.5);
        return contrastRatio(white, c4) >= contrastRatio(black, c4) ? white : black;
      }
    };
    const semanticBases = {
      success: ["#22c55e", "#16a34a", "#15803d"],
      danger: ["#ef4444", "#dc2626", "#b91c1c"],
      warning: ["#f59e0b", "#d97706", "#b45309"],
      info: ["#3b82f6", "#2563eb", "#1d4ed8"],
      primary: [baseColor, lighten(baseColor, 0.1), darken(baseColor, 0.15)]
    };
    const candidates = [];
    const bases = semanticBases[baseToken] || [baseColor];
    for (const b of bases) {
      if (variant === "base") candidates.push(b);
      else if (variant === "hover") candidates.push(gen.hover(b));
      else if (variant === "active") candidates.push(gen.active(b));
      else if (variant === "subtle") {
        const standard = gen.subtle(b);
        const perceptual = lchMix(bg2, b, 0.12);
        candidates.push(standard);
        if (perceptual.toLowerCase() !== standard.toLowerCase()) candidates.push(perceptual);
      } else if (variant === "subtlehover") {
        const baseSubtle = gen.subtle(b);
        const standard = gen.subtlehover(baseSubtle);
        const perceptual = lchMix(bg2, b, 0.18);
        candidates.push(standard);
        if (perceptual.toLowerCase() !== standard.toLowerCase()) candidates.push(perceptual);
      } else if (variant === "fg") candidates.push(gen.fg(b));
    }
    if (variant === "base") {
      const altLight = lighten(baseColor, 0.15);
      const altDark = darken(baseColor, 0.2);
      candidates.push(altLight, altDark);
    }
    const needHighContrast = /text|fg$|on/.test(tokenLower);
    const evalBg = evaluationTarget === "background" ? bg2 : evaluationTarget === "surface" ? surface : baseColor;
    for (const c4 of candidates) {
      const contrastBg = contrastRatio(c4, bg2);
      const contrastSurface = contrastRatio(c4, surface);
      const contrastBase = contrastRatio(c4, baseColor);
      const contrastEval = contrastRatio(c4, evalBg);
      const ideal = needHighContrast ? targetContrast : 2.5;
      const contrastScore = 1 - Math.min(1, Math.abs(ideal - contrastEval) / ideal);
      const dE = deltaE(c4, baseColor);
      const distinctScore = Math.min(1, dE / 0.5);
      const balance = needHighContrast ? contrastScore * 0.7 + distinctScore * 0.3 : contrastScore * 0.5 + distinctScore * 0.5;
      const reason = needHighContrast ? `Optimisé contraste ${contrastEval.toFixed(2)} vs ${evaluationTarget}` : `Contraste ${contrastEval.toFixed(2)} / ΔE ${dE.toFixed(2)}`;
      const metrics = { contrastBg, contrastSurface, contrastBase, contrastEval, target: ideal, deltaE: Number(dE.toFixed(3)) };
      push(c4 === baseColor ? "Base" : c4, c4, balance, variant, reason, metrics);
    }
    if (!out.length) {
      const simple = [
        { label: "Base", value: baseColor },
        { label: "Lighten", value: lighten(baseColor, 0.15) },
        { label: "Darken", value: darken(baseColor, 0.2) },
        { label: "Subtle", value: mix(bg2, baseColor, 0.12) }
      ];
      return simple;
    }
    out.sort((a, b) => b.score - a.score);
    const labeled = out.map((r2) => ({
      label: r2.label,
      value: r2.value,
      variant: r2.variant,
      reason: r2.reason,
      metrics: r2.metrics,
      score: Number(r2.score.toFixed(3))
    }));
    const result = labeled.slice(0, 8);
    storeAny._recCache.set(cacheKey, result);
    return result;
  },
  applyRecommendation: (token, value) => {
    const options = get2().recommendFor(token);
    const chosen = value || options[0]?.value;
    if (chosen) get2().setToken(token, chosen);
  },
  applyAutoContrast: (token) => {
    const s = get2();
    const p2 = s.palette;
    const target = s.targetContrast || 4.5;
    const value = p2[token];
    if (!value) return;
    let baseBg = p2.background || "#0b0b0c";
    if (/Fg$/.test(token)) {
      const base = token.replace(/Fg$/, "");
      if (p2[base]) baseBg = p2[base];
    }
    const corrected = ensureContrast(value, baseBg, target);
    if (corrected.toLowerCase() !== value.toLowerCase()) {
      s.setToken(token, corrected);
    }
  },
  generateSemanticPack: (pivot) => {
    const s = get2();
    const base = pivot && s.palette[pivot] ? s.palette[pivot] : s.palette.primary || "#6366f1";
    const toHsl2 = converter("hsl");
    const toRgb2 = converter("rgb");
    const src = parse(base);
    if (!src) return;
    const hsl = toHsl2(src);
    const mk2 = (deg, satDelta = 0, lightDelta = 0) => {
      const clone = { ...hsl };
      clone.h = (((clone.h || 0) + deg) % 360 + 360) % 360;
      clone.s = Math.min(1, Math.max(0, (clone.s || 0) + satDelta));
      clone.l = Math.min(1, Math.max(0, (clone.l || 0) + lightDelta));
      return formatHex(toRgb2(clone)) || base;
    };
    const next = { ...s.palette };
    const assign = (k2, v2) => {
      if (!next[k2]) next[k2] = v2;
    };
    assign("success", mk2(120, 0, 0));
    assign("danger", mk2(300, 0, -0.05));
    assign("warning", mk2(45, 0.05, 0.05));
    assign("info", mk2(-60, 0, 0));
    usePaletteStore.setState((st) => ({
      palette: next,
      palettes: { ...st.palettes, [st.theme]: next },
      history: [...st.history, st.palette],
      future: [],
      paletteVersion: (st.paletteVersion || 0) + 1
    }));
  },
  // Redundancy report (palette similarity) uses effective palette
  redundancyReport: () => {
    const p2 = get2().effectivePalette ? get2().effectivePalette() : get2().palette;
    const entries = Object.entries(p2);
    const bases = entries.filter(([n2]) => !/(Hover|Active|Subtle|SubtleHover|Fg)$/.test(n2));
    const out = [];
    for (let i = 0; i < bases.length; i++) {
      let best = null;
      for (let j = 0; j < bases.length; j++) {
        if (i === j) continue;
        const d = deltaE(bases[i][1], bases[j][1]);
        if (!best || d < best.d) best = { name: bases[j][0], d };
      }
      if (best && best.d < 2) out.push({ token: bases[i][0], closest: best.name, deltaE: Number(best.d.toFixed(3)) });
    }
    return out.sort((a, b) => a.deltaE - b.deltaE);
  },
  // Align one token exactly to another (copy value)
  alignTokenTo: (source, target) => {
    const s = get2();
    const p2 = get2().effectivePalette ? get2().effectivePalette() : s.palette;
    if (!p2[source] || !p2[target]) return;
    if (p2[source].toLowerCase() === p2[target].toLowerCase()) return;
    s.setToken(source, p2[target]);
  },
  // Differentiate token from reference by adjusting hue/lightness until ΔE >= ~5
  differentiateToken: (token, reference) => {
    const s = get2();
    const p2 = get2().effectivePalette ? get2().effectivePalette() : s.palette;
    const base = p2[token];
    const ref = p2[reference];
    if (!base || !ref) return;
    if (deltaE(base, ref) >= 5) return;
    const parsed = parse(base);
    if (!parsed) return;
    const toHsl2 = converter("hsl");
    const toRgb2 = converter("rgb");
    const hsl = toHsl2(parsed);
    let hash = 0;
    for (let i = 0; i < token.length; i++) hash = hash * 31 + token.charCodeAt(i) & 4294967295;
    const jitter = hash % 11 - 5;
    hsl.h = (((hsl.h || 0) + 15 + jitter) % 360 + 360) % 360;
    const refParsed = parse(ref);
    if (refParsed) {
      const refHsl = toHsl2(refParsed);
      if (refHsl && typeof refHsl.l === "number" && typeof hsl.l === "number") {
        if (refHsl.l >= hsl.l) hsl.l = Math.max(0, hsl.l - 0.12);
        else hsl.l = Math.min(1, hsl.l + 0.12);
      }
    }
    let candidate = formatHex(toRgb2(hsl)) || base;
    if (deltaE(candidate, ref) < 5) {
      candidate = luminance(candidate) > 0.5 ? darken(candidate, 0.2) : lighten(candidate, 0.2);
    }
    s.setToken(token, candidate);
  }
}));
const HistoryBar = () => {
  const history = usePaletteStore((s) => s.history);
  const current = usePaletteStore((s) => s.palette);
  const applySnapshot = usePaletteStore((s) => s.applySnapshot);
  const [snapshots, setSnapshots] = React$2.useState([]);
  const [mountedAt] = React$2.useState(Date.now());
  React$2.useEffect(() => {
    const items = [];
    history.forEach((pal, idx) => {
      items.push({ id: "h" + idx, palette: pal, timestamp: mountedAt + idx });
    });
    items.push({ id: "current", palette: current, timestamp: Date.now() });
    const trimmed = items.slice(-20);
    setSnapshots(trimmed);
  }, [history, current, mountedAt]);
  if (!snapshots.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm", children: "Historique" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted", children: [
        snapshots.length,
        " états"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto scrollbar-thin pb-1", role: "list", "aria-label": "Historique palettes", children: snapshots.map((s, i) => {
      const isCurrent = i === snapshots.length - 1;
      const keys = Object.keys(s.palette).slice(0, 6);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          role: "listitem",
          "aria-label": `Snapshot ${i + 1}${isCurrent ? " (actuel)" : ""}`,
          title: isCurrent ? "État actuel" : "Revenir à ce snapshot",
          className: `relative group border rounded-md p-1 flex flex-col gap-1 min-w-[64px] outline-none focus:ring-2 focus:ring-primary/70 transition ${isCurrent ? "border-primary/70 bg-primary/10" : "border-default/50 hover:border-primary/60 hover:bg-primary/5"}`,
          disabled: isCurrent,
          onClick: () => {
            if (!isCurrent) applySnapshot?.(s.palette);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-[2px] w-full h-full", children: [
              keys.map((k2) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded border border-black/10", style: { background: s.palette[k2] } }, k2)),
              keys.length < 6 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full text-[10px] text-muted text-center py-1", children: s.palette.primary?.replace("#", "") })
            ] }),
            !isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 text-[9px] bg-surface border border-default rounded px-1 opacity-0 group-hover:opacity-100 transition", children: "↩" })
          ]
        },
        s.id
      );
    }) })
  ] });
};
function safeHex$1(val) {
  if (!val) return "#000000";
  let v2 = val.trim();
  if (!v2.startsWith("#")) v2 = "#" + v2;
  const short = /^#([0-9a-fA-F]{3})$/;
  const long = /^#([0-9a-fA-F]{6})$/;
  if (short.test(v2)) {
    const m2 = v2.slice(1);
    v2 = "#" + m2.split("").map((c4) => c4 + c4).join("");
  }
  if (!long.test(v2)) return "#000000";
  return v2.toLowerCase();
}
async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta2 = document.createElement("textarea");
    ta2.value = text;
    document.body.appendChild(ta2);
    ta2.select();
    try {
      document.execCommand("copy");
    } catch {
    } finally {
      document.body.removeChild(ta2);
    }
  }
}
function nextName(existing, base) {
  if (!existing.includes(base)) return base;
  let i = 2;
  while (existing.includes(`${base}${i}`)) i++;
  return `${base}${i}`;
}
const PalettePanel = () => {
  const palette = usePaletteStore((s) => s.palette);
  const effectivePalette = usePaletteStore((s) => s.effectivePalette?.()) || palette;
  const theme = usePaletteStore((s) => s.theme);
  const setToken = usePaletteStore((s) => s.setToken);
  const addToken = usePaletteStore((s) => s.addToken);
  const removeToken = usePaletteStore((s) => s.removeToken);
  const renameToken = usePaletteStore((s) => s.renameToken);
  const generateVariantsFor = usePaletteStore((s) => s.generateVariantsFor);
  const applyAutoContrast = usePaletteStore((s) => s.applyAutoContrast);
  const sandboxActive = usePaletteStore((s) => s.sandboxActive);
  const setSandboxActive = usePaletteStore((s) => s.setSandboxActive);
  const setSandboxToken = usePaletteStore((s) => s.setSandboxToken);
  const applySandbox = usePaletteStore((s) => s.applySandbox);
  const discardSandbox = usePaletteStore((s) => s.discardSandbox);
  const sandbox = usePaletteStore((s) => s.sandbox);
  const groups = usePaletteStore((s) => s.groups);
  const tokenGroups = usePaletteStore((s) => s.tokenGroups);
  const [active, setActive] = React$2.useState("primary");
  const [hexInput, setHexInput] = React$2.useState("");
  const listRef = React$2.useRef(null);
  const [search, setSearch] = React$2.useState("");
  const [groupFilter, setGroupFilter] = React$2.useState("");
  const [renaming, setRenaming] = React$2.useState(null);
  const [collapsed, setCollapsed] = React$2.useState(/* @__PURE__ */ new Set());
  const [customVariants, setCustomVariants] = React$2.useState({});
  const [panelSide, setPanelSide] = React$2.useState("right");
  const [panelWidth, setPanelWidth] = React$2.useState(256);
  const [panelCompact, setPanelCompact] = React$2.useState(false);
  const resizing = React$2.useRef(null);
  const [tokenHistory, setTokenHistory] = React$2.useState({});
  React$2.useEffect(() => {
    setHexInput(effectivePalette[active] || "");
  }, [effectivePalette, active]);
  const allTokens = React$2.useMemo(() => Object.keys(palette).sort(), [palette]);
  React$2.useEffect(() => {
    if (!allTokens.includes(active)) {
      const fallback = allTokens.includes("primary") ? "primary" : allTokens[0] || "";
      if (fallback) setActive(fallback);
    }
  }, [allTokens, active]);
  const baseSet = React$2.useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    for (const t2 of allTokens) set.add(t2);
    for (const t2 of allTokens) {
      for (const b of allTokens) {
        if (b === t2) continue;
        if (t2.startsWith(b) && t2.length > b.length && /[A-Z]/.test(t2.charAt(b.length))) {
          set.delete(t2);
          break;
        }
      }
    }
    return set;
  }, [allTokens]);
  const variantMap = React$2.useMemo(() => {
    const map = {};
    for (const t2 of allTokens) {
      for (const b of baseSet) {
        if (t2.startsWith(b) && t2.length > b.length && /[A-Z]/.test(t2.charAt(b.length))) {
          if (!map[b]) map[b] = [];
          map[b].push(t2);
          break;
        }
      }
    }
    for (const b of Object.keys(map)) map[b].sort();
    return map;
  }, [allTokens, baseSet]);
  const visibleBases = Array.from(baseSet).filter((base) => {
    if (groupFilter && tokenGroups[base] !== groupFilter) return false;
    if (!search) return true;
    const lc2 = search.toLowerCase();
    if (base.toLowerCase().includes(lc2)) return true;
    const vars = variantMap[base] || [];
    return vars.some((v2) => v2.toLowerCase().includes(lc2));
  }).sort();
  const commitHex = (value) => {
    if (!active) return;
    const v2 = safeHex$1(value);
    const current = effectivePalette[active];
    if (current && current.toLowerCase() !== v2.toLowerCase()) {
      setTokenHistory((h) => {
        const prev = h[active] || [];
        if (prev[0]?.toLowerCase() === current.toLowerCase()) return h;
        const nextArr = [current, ...prev].slice(0, 10);
        return { ...h, [active]: nextArr };
      });
    }
    if (sandboxActive) setSandboxToken?.(active, v2);
    else setToken(active, v2);
  };
  const onHexChange = (val) => {
    setHexInput(val);
    if (/^#?[0-9a-fA-F]{6}$/.test(val.replace("#", ""))) commitHex(val);
  };
  const duplicate = () => {
    if (!active) return;
    const next = nextName(allTokens, active + "Copy");
    addToken(next, effectivePalette[active]);
    setActive(next);
  };
  const genVariants = () => generateVariantsFor?.(active);
  const autoContrast = () => applyAutoContrast?.(active);
  const activeValue = effectivePalette[active] || "#000000";
  const ratioToBg = contrastRatio(activeValue, effectivePalette.background || "#000");
  const startRename = (t2) => setRenaming(t2);
  const finishRename = (oldName, next) => {
    const trimmed = next.trim();
    if (trimmed && trimmed !== oldName && !palette[trimmed]) {
      renameToken(oldName, trimmed);
      if (active === oldName) setActive(trimmed);
    }
    setRenaming(null);
  };
  const inSandbox = (token) => sandboxActive && sandbox && sandbox[token] && sandbox[token] !== palette[token];
  const isDark = theme === "dark";
  const panelBg = isDark ? "bg-neutral-950/70 border-neutral-800" : "bg-white/70 border-neutral-200";
  const cardBase = isDark ? "bg-neutral-900/40" : "bg-white";
  const cardBorder = isDark ? "border-neutral-800 hover:border-neutral-600" : "border-neutral-300 hover:border-neutral-400";
  const activeBorder = isDark ? "border-amber-400" : "border-amber-500";
  const toggleCollapse = (b) => setCollapsed((s) => {
    const n2 = new Set(s);
    n2.has(b) ? n2.delete(b) : n2.add(b);
    return n2;
  });
  const addCustomVariant = (base) => {
    const raw = prompt("Nom du variant (ex: Strong, Alt, Outline)")?.trim();
    if (!raw) return;
    const suf = raw.replace(/\s+/g, "").replace(/[^A-Za-z0-9]/g, "");
    if (!suf) return;
    const token = base + suf.charAt(0).toUpperCase() + suf.slice(1);
    if (palette[token]) {
      alert("Existe déjà");
      return;
    }
    const baseColor = palette[base];
    const color = lighten(baseColor, 0.08);
    setToken(token, color);
    setCustomVariants((m2) => ({ ...m2, [base]: [...m2[base] || [], suf] }));
  };
  React$2.useEffect(() => {
    (async () => {
      try {
        const side = await window.crimson.storeGet("palettePanel.side");
        const width = await window.crimson.storeGet("palettePanel.width");
        const compact = await window.crimson.storeGet("palettePanel.compact");
        if (side === "left" || side === "right") setPanelSide(side);
        if (typeof width === "number" && width >= 220 && width <= 420) setPanelWidth(width);
        if (typeof compact === "boolean") setPanelCompact(compact);
      } catch {
      }
    })();
  }, []);
  React$2.useEffect(() => {
    window.crimson.storeSet("palettePanel.side", panelSide);
  }, [panelSide]);
  React$2.useEffect(() => {
    window.crimson.storeSet("palettePanel.compact", panelCompact);
  }, [panelCompact]);
  React$2.useEffect(() => {
    const id2 = setTimeout(() => {
      window.crimson.storeSet("palettePanel.width", panelWidth);
    }, 300);
    return () => clearTimeout(id2);
  }, [panelWidth]);
  useResizeEffect(resizing, setPanelWidth, panelSide);
  const revertToken = (hex2) => {
    if (!active) return;
    commitHex(hex2);
  };
  const renderHistory = () => {
    const hist = tokenHistory[active] || [];
    if (!hist.length) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-medium opacity-70", children: "Historique" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: hist.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => revertToken(h), className: `px-2 py-0.5 rounded text-[10px] font-mono border ${isDark ? "border-neutral-700 hover:border-neutral-500" : "border-neutral-300 hover:border-neutral-400"}`, children: h.replace("#", "") }, h)) })
    ] });
  };
  const renderPreviews = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 text-[10px]", children: [
    { label: "Light", bg: "#ffffff", fg: "#111111" },
    { label: "Dark", bg: "#0b0b0c", fg: "#ffffff" }
  ].map((p2) => {
    const cr = contrastRatio(activeValue, p2.bg).toFixed(2);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => copy(activeValue), className: "flex flex-col gap-1 items-center group focus:outline-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-12 rounded border border-neutral-300 dark:border-neutral-700 flex items-center justify-center relative overflow-hidden", style: { background: p2.bg }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded shadow-inner border border-black/10", style: { background: activeValue } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 text-[9px] text-center bg-black/30 text-white opacity-0 group-hover:opacity-100 transition", children: [
          cr,
          ":1"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-60 group-hover:text-amber-400 transition", children: p2.label })
    ] }, p2.label);
  }) });
  const renderSidePanel = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-2 sm:px-2 py-2 border-b flex items-center gap-1 sticky top-0 z-10 backdrop-blur-md ${isDark ? "border-neutral-800 bg-neutral-950/70" : "border-neutral-200 bg-white/70"}`, children: [
      !panelCompact && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-xs truncate max-w-[120px]", title: active, children: active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPanelCompact((c4) => !c4), title: panelCompact ? "Étendre" : "Réduire", className: `ml-auto w-7 h-7 flex items-center justify-center rounded text-[13px] ${isDark ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-200 hover:bg-neutral-300"}`, children: panelCompact ? "›" : "‹" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPanelSide((s) => s === "right" ? "left" : "right"), title: "Changer côté", className: `w-7 h-7 flex items-center justify-center rounded text-[13px] ${isDark ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-200 hover:bg-neutral-300"}`, children: "⇆" })
    ] }),
    !panelCompact && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col gap-4 overflow-auto text-xs flex-1 min-h-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: safeHex$1(activeValue), onChange: (e2) => commitHex(e2.target.value), className: "w-10 h-10 p-0 border rounded cursor-pointer bg-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: hexInput, onChange: (e2) => onHexChange(e2.target.value), className: `px-2 py-1 rounded font-mono text-[11px] ${isDark ? "bg-neutral-800 border border-neutral-700" : "bg-neutral-100 border border-neutral-300"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] opacity-70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Contrast bg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", children: ratioToBg.toFixed(2) })
          ] })
        ] })
      ] }),
      renderPreviews(),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-[11px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: genVariants, className: `${isDark ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-200 hover:bg-neutral-300"} rounded px-2 py-1`, children: "Variants" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: autoContrast, className: `${isDark ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-200 hover:bg-neutral-300"} rounded px-2 py-1`, children: "AutoCtr" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: duplicate, className: `${isDark ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-200 hover:bg-neutral-300"} rounded px-2 py-1`, children: "Dupliquer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => addToken(), className: `${isDark ? "bg-neutral-800 hover:bg-neutral-700" : "bg-neutral-200 hover:bg-neutral-300"} rounded px-2 py-1`, children: "+ Token" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[11px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Sandbox" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSandboxActive?.(!sandboxActive), className: `px-2 py-0.5 rounded border ${sandboxActive ? "border-amber-500 text-amber-400" : isDark ? "border-neutral-700 hover:border-neutral-500" : "border-neutral-300 hover:border-neutral-400"}`, children: sandboxActive ? "Actif" : "Off" })
        ] }),
        sandboxActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => applySandbox?.(), className: "flex-1 px-2 py-1 rounded bg-green-600 hover:bg-green-500 text-white text-[11px]", children: "Appliquer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => discardSandbox?.(), className: "flex-1 px-2 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-[11px]", children: "Annuler" })
        ] })
      ] }),
      renderHistory(),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] opacity-60 leading-snug", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Double-clic: renommer. Variants auto: bouton Variants." }) })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-3 border-b flex flex-wrap gap-2 items-center ${panelBg}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "palette-search", value: search, onChange: (e2) => setSearch(e2.target.value), placeholder: "Rechercher token…", className: `px-2 py-1 rounded text-xs ${isDark ? "bg-neutral-800 border border-neutral-700" : "bg-neutral-100 border border-neutral-300"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: groupFilter, onChange: (e2) => setGroupFilter(e2.target.value), className: `px-2 py-1 rounded text-xs ${isDark ? "bg-neutral-800 border border-neutral-700" : "bg-neutral-100 border border-neutral-300"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Groupes: Tous" }),
          groups.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: g.id, children: g.name }, g.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HistoryBar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 min-h-0 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ref: listRef,
          className: "flex-1 overflow-auto p-4 space-y-4",
          style: panelSide === "right" ? { marginRight: panelCompact ? 40 : panelWidth } : { marginLeft: panelCompact ? 40 : panelWidth },
          children: [
            visibleBases.map((base) => {
              const baseVal = effectivePalette[base];
              const variants2 = (variantMap[base] || []).sort();
              const isCollapsed = collapsed.has(base);
              const isActiveBase = active === base;
              return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-dashed border-transparent rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `border rounded p-3 ${cardBase} cursor-pointer select-none text-[11px] flex flex-col gap-2 transition ${isActiveBase ? activeBorder : cardBorder}`,
                  onClick: () => setActive(base),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: (e2) => {
                            e2.stopPropagation();
                            toggleCollapse(base);
                          },
                          className: `w-5 h-5 inline-flex items-center justify-center text-[10px] rounded ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`,
                          children: isCollapsed ? "+" : "–"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-5 h-5 rounded border ${isDark ? "border-neutral-600" : "border-neutral-300"}`, style: { background: baseVal } }),
                      renaming === base ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          autoFocus: true,
                          defaultValue: base,
                          onBlur: (e2) => finishRename(base, e2.target.value),
                          onKeyDown: (e2) => {
                            if (e2.key === "Enter") finishRename(base, e2.target.value);
                            if (e2.key === "Escape") setRenaming(null);
                          },
                          className: `px-1 py-0.5 rounded flex-1 ${isDark ? "bg-neutral-800 border border-neutral-700" : "bg-neutral-100 border border-neutral-300"}`
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate flex-1", onDoubleClick: () => startRename(base), children: base }),
                      inSandbox(base) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400 text-[9px]", title: "Modifié dans sandbox", children: "*" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e2) => {
                        e2.stopPropagation();
                        removeToken(base);
                      }, className: "text-xs text-red-400 hover:text-red-300", title: "Supprimer", children: "✕" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-8 rounded border ${isDark ? "border-neutral-700" : "border-neutral-300"}`, style: { background: baseVal } }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-neutral-500 text-[10px] truncate", children: baseVal }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] text-neutral-500", children: [
                          contrastRatio(baseVal, effectivePalette.background || "#000").toFixed(1),
                          ":1"
                        ] })
                      ] }),
                      !isCollapsed && variants2.map((v2) => {
                        const vVal = effectivePalette[v2];
                        const isActiveVar = active === v2;
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            onClick: (e2) => {
                              e2.stopPropagation();
                              setActive(v2);
                            },
                            className: `relative flex flex-col gap-1 border rounded p-1 pt-4 ${cardBase} ${isActiveVar ? activeBorder : cardBorder}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "button",
                                {
                                  onClick: (e2) => {
                                    e2.stopPropagation();
                                    removeToken(v2);
                                    if (active === v2) setActive(base);
                                  },
                                  title: "Supprimer variant",
                                  className: "absolute top-0 right-0 text-[10px] px-1 text-red-400 hover:text-red-300",
                                  children: "✕"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-6 rounded border ${isDark ? "border-neutral-700" : "border-neutral-300"}`, style: { background: vVal } }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate", title: v2, children: v2 }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-neutral-500 text-[10px] truncate", children: vVal })
                            ]
                          },
                          v2
                        );
                      }),
                      !isCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: (e2) => {
                            e2.stopPropagation();
                            addCustomVariant(base);
                          },
                          className: `h-8 border border-dashed rounded text-[10px] flex items-center justify-center ${isDark ? "border-neutral-700 hover:border-neutral-500" : "border-neutral-300 hover:border-neutral-400"}`,
                          children: "+ variant"
                        }
                      )
                    ] })
                  ]
                }
              ) }, base);
            }),
            visibleBases.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-neutral-500", children: "Aucun token ne correspond aux filtres." })
          ]
        }
      ) })
    ] }),
    ReactDOM.createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `fixed top-[var(--panel-offset,96px)] ${panelSide === "right" ? "right-0" : "left-0"} h-[calc(100vh-var(--panel-offset,96px))] flex flex-col shadow-lg ${panelSide === "right" ? "border-l" : "border-r"} ${isDark ? "border-neutral-800 bg-neutral-950/70" : "border-neutral-200 bg-white/80"} backdrop-blur-md transition-[width] duration-200`,
          style: { width: panelCompact ? 40 : panelWidth, zIndex: 40 },
          children: [
            renderSidePanel(),
            !panelCompact && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                onMouseDown: (e2) => {
                  resizing.current = { startX: e2.clientX, startW: panelWidth };
                  e2.preventDefault();
                },
                className: `absolute top-0 ${panelSide === "right" ? "left-0" : "right-0"} w-1 cursor-ew-resize h-full opacity-0 hover:opacity-60 bg-amber-500/40`
              }
            )
          ]
        }
      ),
      document.body
    )
  ] });
  function useResizeEffect(resizingRef, setPanelWidth2, side) {
    React$2.useEffect(() => {
      const onMove = (e2) => {
        if (!resizingRef.current) return;
        e2.preventDefault();
        const { startX, startW } = resizingRef.current;
        const delta = e2.clientX - startX;
        const raw = side === "right" ? startW - delta : startW + delta;
        const next = Math.min(420, Math.max(220, raw));
        setPanelWidth2(next);
      };
      const onUp = () => {
        resizingRef.current = null;
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
    }, [resizingRef, setPanelWidth2, side]);
  }
};
const matrices = {
  protanopia: [
    [0.56667, 0.43333, 0],
    [0.55833, 0.44167, 0],
    [0, 0.24167, 0.75833]
  ],
  deuteranopia: [
    [0.625, 0.375, 0],
    [0.7, 0.3, 0],
    [0, 0.3, 0.7]
  ],
  tritanopia: [
    [0.95, 0.05, 0],
    [0, 0.43333, 0.56667],
    [0, 0.475, 0.525]
  ]
};
const clamp = (x2, lo = 0, hi2 = 1) => Math.max(lo, Math.min(hi2, x2));
function hexToRgb01(hex2) {
  const h = hex2.replace("#", "");
  const r2 = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return [r2, g, b];
}
function rgb01ToHex([r2, g, b]) {
  const to = (n2) => Math.round(clamp(n2) * 255).toString(16).padStart(2, "0");
  return `#${to(r2)}${to(g)}${to(b)}`;
}
function simulateCvd(hex2, mode) {
  const m2 = matrices[mode];
  const [r2, g, b] = hexToRgb01(hex2);
  const R2 = clamp(m2[0][0] * r2 + m2[0][1] * g + m2[0][2] * b);
  const G2 = clamp(m2[1][0] * r2 + m2[1][1] * g + m2[1][2] * b);
  const B2 = clamp(m2[2][0] * r2 + m2[2][1] * g + m2[2][2] * b);
  return rgb01ToHex([R2, G2, B2]);
}
const Section = ({ title, description, children, right }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold tracking-wide uppercase text-[rgb(var(--color-foreground))]/90", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted mt-0.5 max-w-prose leading-snug", children: description })
      ] }),
      right && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex items-center gap-2", children: right })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-default/60 bg-surface/40 p-4 backdrop-blur-sm shadow-inner", children })
  ] });
};
const TokensBar = ({ simulated }) => {
  const paletteStore = usePaletteStore((s) => s.palette);
  const palette = simulated || paletteStore;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: Object.entries(palette).slice(0, 60).map(([k2, v2]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[10px] px-2 py-1 rounded border border-default/40 bg-background/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded", style: { background: v2 } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: k2 })
  ] }, k2)) });
};
const variants = [
  { key: "primary", label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "accent", label: "Accent" },
  { key: "success", label: "Success" },
  { key: "danger", label: "Danger" },
  { key: "warning", label: "Warning" },
  { key: "info", label: "Info" }
];
const ButtonsShowcase = ({ simulated }) => {
  const storePalette = usePaletteStore((s) => s.palette);
  const palette = simulated || storePalette;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: variants.map((v2) => {
    const base = palette[v2.key];
    const hover = palette[`${v2.key}Hover`] || base;
    const active = palette[`${v2.key}Active`] || hover;
    const fg2 = palette[`${v2.key}Fg`] || palette.text;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 min-w-[130px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-medium tracking-wide uppercase text-muted", children: v2.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "rounded text-xs font-medium px-3 py-2 border border-default/40 shadow-sm",
          style: { background: base, color: fg2 },
          children: "Normal"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "rounded text-xs font-medium px-3 py-2 border border-default/40 shadow-sm",
          style: { background: hover, color: fg2 },
          children: "Hover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "rounded text-xs font-medium px-3 py-2 border border-default/40 shadow-sm",
          style: { background: active, color: fg2 },
          children: "Active"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "rounded text-xs font-medium px-3 py-2 border border-dashed border-default/40 shadow-inner opacity-60",
          style: { background: palette.disabled, color: palette.textMuted },
          children: "Disabled"
        }
      )
    ] }, v2.key);
  }) });
};
const kinds = ["success", "danger", "warning", "info"];
const AlertsShowcase = ({ simulated }) => {
  const store = usePaletteStore((s) => s.palette);
  const p2 = simulated || store;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 w-full", children: kinds.map((k2) => {
    const subtle = p2[`${k2}Subtle`] || p2.surface;
    const fg2 = p2[`${k2}Fg`] || p2.text;
    const border = p2[k2];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded px-3 py-2 text-xs flex items-start gap-2 border", style: { background: subtle, color: fg2, borderColor: border }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5", children: "⚑" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold capitalize", children: k2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "opacity-80 leading-snug", children: [
          "Message d'alerte de type ",
          k2,
          ". Exemple de description multi-ligne."
        ] })
      ] })
    ] }, k2);
  }) });
};
const SurfacesShowcase = ({ simulated }) => {
  const store = usePaletteStore((s) => s.palette);
  const p2 = simulated || store;
  const surfaces = [
    { name: "Background", color: p2.background },
    { name: "Surface", color: p2.surface },
    { name: "Surface Alt", color: p2.surfaceAlt || p2.surface },
    { name: "Surface Elevated", color: p2.surfaceElevated || p2.surface },
    { name: "Surface Inverted", color: p2.surfaceInverted || "#ffffff", fg: p2.textInverted || "#0f172a" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", style: { gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))" }, children: surfaces.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded p-3 text-[10px] border border-default/50 space-y-1 shadow-inner", style: { background: s.color, color: s.fg || p2.text }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: s.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-70 break-all", children: s.color })
  ] }, s.name)) });
};
function safeHex(val) {
  if (!val || typeof val !== "string") return "#000000";
  let v2 = val.trim();
  if (!v2.startsWith("#")) v2 = "#" + v2;
  const short = /^#([0-9a-fA-F]{3})$/;
  const long = /^#([0-9a-fA-F]{6})$/;
  if (short.test(v2)) {
    const m2 = v2.slice(1);
    v2 = "#" + m2.split("").map((c4) => c4 + c4).join("");
  }
  if (!long.test(v2)) return "#000000";
  return v2.toLowerCase();
}
const safeContrast = (a, b) => {
  try {
    return contrastRatio(a, b);
  } catch {
    return 0;
  }
};
const AccessibilityReport = () => {
  const ep = usePaletteStore((s) => s.effectivePalette?.());
  const p2 = ep || usePaletteStore.getState().palette || {};
  const text = safeHex(p2.text);
  const background = safeHex(p2.background);
  const surface = safeHex(p2.surface);
  const primary = safeHex(p2.primary);
  const success = safeHex(p2.success);
  const danger = safeHex(p2.danger);
  const warning = safeHex(p2.warning);
  const info = safeHex(p2.info);
  const primaryFg = safeHex(p2.primaryFg || text);
  const successFg = safeHex(p2.successFg || text);
  const dangerFg = safeHex(p2.dangerFg || text);
  const warningFg = safeHex(p2.warningFg || text);
  const infoFg = safeHex(p2.infoFg || text);
  const pairs = [
    { label: "Texte sur background", fg: text, bg: background },
    { label: "Texte sur surface", fg: text, bg: surface },
    { label: "Primary Fg", fg: primaryFg, bg: primary },
    { label: "Success Fg", fg: successFg, bg: success },
    { label: "Danger Fg", fg: dangerFg, bg: danger },
    { label: "Warning Fg", fg: warningFg, bg: warning },
    { label: "Info Fg", fg: infoFg, bg: info }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", style: { gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }, children: pairs.map((pr) => {
    const cr = safeContrast(pr.fg, pr.bg);
    const badge2 = cr >= 7 ? "AAA" : cr >= 4.5 ? "AA" : cr >= 3 ? "AA*" : "⛔";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded border border-default/50 p-2 text-[11px] space-y-1", style: { background: pr.bg, color: pr.fg }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: pr.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] px-1 rounded bg-background/40", style: { color: pr.fg }, children: badge2 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "opacity-80", children: [
        "Contraste: ",
        cr.toFixed(2),
        ":1"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "opacity-60 break-all", children: [
        "FG ",
        pr.fg,
        " / BG ",
        pr.bg
      ] })
    ] }, pr.label);
  }) });
};
const PreviewPanel = () => {
  const palette = usePaletteStore((s) => s.palette);
  const effective = usePaletteStore((s) => s.effectivePalette?.());
  const cvdMode = usePaletteStore((s) => s.cvdMode);
  const basePalette = effective || palette;
  const simulated = React$2.useMemo(() => {
    if (!cvdMode || cvdMode === "none") return basePalette;
    const out = {};
    for (const [k2, v2] of Object.entries(basePalette)) out[k2] = simulateSafe(v2, cvdMode);
    return out;
  }, [basePalette, cvdMode]);
  const [density, setDensity] = React$2.useState("comfortable");
  const [showA11y, setShowA11y] = React$2.useState(true);
  const [showTokens, setShowTokens] = React$2.useState(true);
  const baseBg = simulated.background || "#0b0b0c";
  const baseText = simulated.text || simulated.foreground || "#e5e7eb";
  const cr = contrastRatio(baseText, baseBg).toFixed(2);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Prévisualisation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-px bg-border/60 mx-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `btn ${density === "compact" ? "btn-primary" : ""}`, onClick: () => setDensity(density === "compact" ? "comfortable" : "compact"), children: density === "compact" ? "Densité large" : "Densité compacte" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `btn ${showA11y ? "btn-primary" : ""}`, onClick: () => setShowA11y((v2) => !v2), children: showA11y ? "Masquer a11y" : "Voir a11y" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `btn ${showTokens ? "btn-primary" : ""}`, onClick: () => setShowTokens((v2) => !v2), children: showTokens ? "Masquer tokens" : "Tokens" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-xs text-muted", children: [
        "Contraste texte/back: ",
        cr,
        ":1"
      ] })
    ] }),
    showTokens && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Tokens", description: "Aperçu rapide des variables.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TokensBar, { simulated }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Surfaces", description: "Variantes clés de surfaces.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SurfacesShowcase, { simulated }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Actions", description: "États multi-variants.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ButtonsShowcase, { simulated }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Alertes & Feedback", description: "Statuts basés sur les tokens sémantiques.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertsShowcase, { simulated }) }),
    showA11y && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Accessibilité", description: "Ratios de contraste.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccessibilityReport, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Hero & Gradient", description: "Démo gradient primary→secondary + accent.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GradientHero, { simulated }) })
  ] });
};
const GradientHero = ({ simulated }) => {
  const p2 = simulated || usePaletteStore.getState().palette;
  const gradient = `linear-gradient(135deg, ${p2.primary} 0%, ${p2.secondary} 50%, ${p2.accent} 100%)`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-lg overflow-hidden border border-default/60 shadow-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-90", style: { background: gradient } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-10 space-y-4 backdrop-blur-[2px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-black tracking-tight", style: { color: p2.textOnPrimary || "#fff" }, children: "Design Systems Instantanés" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-lg text-sm leading-relaxed", style: { color: p2.textOnPrimary || "#fff" }, children: "Affinez la palette et observez en direct les surfaces, actions et alertes s'adapter." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", children: "Commencer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", style: { background: p2.surfaceAlt, color: p2.text }, children: "En savoir plus" })
      ] })
    ] })
  ] });
};
function simulateSafe(hex2, mode) {
  try {
    return simulateCvd(hex2, mode);
  } catch {
    return hex2;
  }
}
const ExportPanel = () => {
  const exportJSON = usePaletteStore((s) => s.exportJSON);
  const exportCSS = usePaletteStore((s) => s.exportCSS);
  const exportCSSThemes = usePaletteStore((s) => s.exportCSSThemes);
  const exportSCSS = usePaletteStore((s) => s.exportSCSS);
  const exportXAML = usePaletteStore((s) => s.exportXAML);
  const exportGIMP = usePaletteStore((s) => s.exportGIMP);
  const exportSwiftUI = usePaletteStore((s) => s.exportSwiftUI);
  const exportAndroidXML = usePaletteStore((s) => s.exportAndroidXML);
  const exportASE = usePaletteStore((s) => s.exportASE);
  const exportStyleDictionary = usePaletteStore((s) => s.exportStyleDictionary);
  const [selected, setSelected] = React$2.useState({ css: true, json: true });
  const exportAll = async () => {
    const files = [];
    if (selected.json) files.push({ name: "palette.json", content: exportJSON() });
    if (selected.css) files.push({ name: "palette.css", content: exportCSS() });
    if (selected.cssThemes) files.push({ name: "palette.themes.css", content: exportCSSThemes() });
    if (selected.scss) files.push({ name: "palette.scss", content: exportSCSS() });
    if (selected.tailwind) files.push({ name: "tailwind.json", content: JSON.stringify(usePaletteStore.getState().tailwindConfig(), null, 2) });
    if (selected.xaml) files.push({ name: "palette.xaml", content: exportXAML() });
    if (selected.gimp) files.push({ name: "palette.gpl", content: exportGIMP() });
    if (selected.swiftui) files.push({ name: "Palette.swift", content: exportSwiftUI() });
    if (selected.android) files.push({ name: "colors.xml", content: exportAndroidXML() });
    if (selected.ase) files.push({ name: "palette.ase", content: exportASE(), encoding: "base64" });
    if (selected.styleDictionary) files.push({ name: "style-dictionary.json", content: exportStyleDictionary() });
    if (files.length === 0) return;
    await window.crimson.exportMany(files);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Export" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 max-w-xl", children: [
      { key: "xaml", label: "XAML" },
      { key: "css", label: "CSS Variables (actif)" },
      { key: "cssThemes", label: "CSS Multi-thèmes" },
      { key: "scss", label: "SCSS" },
      { key: "tailwind", label: "Tailwind Config" },
      { key: "json", label: "JSON Tokens" },
      { key: "styleDictionary", label: "Style Dictionary" },
      { key: "ase", label: "ASE (Adobe)" },
      { key: "gimp", label: "GIMP Palette" },
      { key: "swiftui", label: "SwiftUI" },
      { key: "android", label: "Android XML" }
    ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: !!selected[item.key], onChange: (e2) => setSelected((s) => ({ ...s, [item.key]: e2.target.checked })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
    ] }, item.key)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: exportAll, children: "Exporter la palette" }) })
  ] });
};
const Listbox = ({ options, value, onChange, placeholder = "Sélectionner…", className }) => {
  const [open, setOpen] = React$2.useState(false);
  const btnRef = React$2.useRef(null);
  const listRef = React$2.useRef(null);
  const [activeIndex, setActiveIndex] = React$2.useState(-1);
  const selected = options.find((o) => o.value === value);
  React$2.useEffect(() => {
    const onDocClick = (e2) => {
      if (!open) return;
      if (btnRef.current?.contains(e2.target)) return;
      if (listRef.current?.contains(e2.target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);
  const toggle = () => setOpen((o) => !o);
  const close = () => setOpen(false);
  const onKeyDown = (e2) => {
    if (!open) {
      if (e2.key === "ArrowDown" || e2.key === "Enter" || e2.key === " ") {
        e2.preventDefault();
        setOpen(true);
        setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)));
      }
      return;
    }
    if (e2.key === "Escape") {
      e2.preventDefault();
      close();
      btnRef.current?.focus();
      return;
    }
    if (e2.key === "ArrowDown") {
      e2.preventDefault();
      setActiveIndex((i) => Math.min(options.length - 1, i + 1));
    }
    if (e2.key === "ArrowUp") {
      e2.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    }
    if (e2.key === "Enter" || e2.key === " ") {
      e2.preventDefault();
      const opt = options[activeIndex];
      if (opt) {
        onChange(opt.value);
        close();
        btnRef.current?.focus();
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `listbox relative ${className || ""}`, onKeyDown, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { ref: btnRef, type: "button", className: "btn w-full justify-between", onClick: toggle, "aria-haspopup": "listbox", "aria-expanded": open, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selected ? selected.label : placeholder }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "▾" })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { ref: listRef, role: "listbox", className: "listbox-options card absolute z-50 mt-1 w-full max-h-60 overflow-auto", children: options.map((o, idx) => {
      const selected2 = o.value === value;
      const active = idx === activeIndex;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          role: "option",
          "aria-selected": selected2,
          className: `listbox-option px-3 py-2 cursor-pointer flex items-center gap-2 ${selected2 ? "selected" : ""} ${active ? "active" : ""}`,
          onMouseEnter: () => setActiveIndex(idx),
          onClick: () => {
            onChange(o.value);
            close();
          },
          children: [
            selected2 ? "✓" : "",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: o.label })
          ]
        },
        o.value
      );
    }) })
  ] });
};
function badge(ok2) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `ml-2 text-xs px-2 py-0.5 rounded ${ok2 ? "bg-green-600" : "bg-red-600"}`, children: ok2 ? "OK" : "NOK" });
}
const A11yPanel = () => {
  const palette = usePaletteStore((s) => s.palette);
  const contrastToBg = usePaletteStore((s) => s.contrastToBackground);
  const setToken = usePaletteStore((s) => s.setToken);
  const detectConflicts = usePaletteStore((s) => s.detectConflicts);
  const redundancyReport = usePaletteStore((s) => s.redundancyReport);
  const alignTokenTo = usePaletteStore((s) => s.alignTokenTo);
  const differentiateToken = usePaletteStore((s) => s.differentiateToken);
  const applyAutoContrast = usePaletteStore((s) => s.applyAutoContrast);
  const storeCvd = usePaletteStore((s) => s.cvdMode);
  const setStoreCvd = usePaletteStore((s) => s.setCvdMode);
  const [cvd, setCvd] = React$2.useState(storeCvd || "none");
  const [showConflicts, setShowConflicts] = React$2.useState(true);
  const [showRedundancy, setShowRedundancy] = React$2.useState(true);
  const baseTokens = ["text", "primary", "secondary", "accent", "success", "danger", "warning", "info"];
  const items = baseTokens.filter((t2) => palette[t2]).map((label) => ({ label, color: palette[label], ratio: Number(contrastToBg(palette[label]).toFixed(2)) }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Accessibilité" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Simulateur daltonisme:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Listbox,
        {
          options: [
            { value: "none", label: "Aucun" },
            { value: "protanopia", label: "Protanopie" },
            { value: "deuteranopia", label: "Deutéranopie" },
            { value: "tritanopia", label: "Tritanopie" }
          ],
          value: cvd,
          onChange: (v2) => {
            setCvd(v2);
            setStoreCvd?.(v2);
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => autoFixContrast(palette, setToken), children: "Corriger contraste (table)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => applyAutoContrast?.("text"), children: "Auto texte" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn text-xs", onClick: () => setShowConflicts((s) => !s), children: showConflicts ? "🧹 Masquer conflits" : "⚠️ Voir conflits" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn text-xs", onClick: () => setShowRedundancy((s) => !s), children: showRedundancy ? "🧹 Masquer redondances" : "🧬 Voir redondances" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-[400px] w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Token" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Couleur" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Ratio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "AA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "AAA" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((it) => {
        const AA = it.ratio >= 4.5;
        const AAA = it.ratio >= 7;
        const sim = cvd === "none" ? it.color : simulateCvd(it.color, cvd);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: it.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-6 h-6 rounded", style: { background: sim } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
            it.ratio,
            ":1"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: badge(AA) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: badge(AAA) })
        ] }, it.label);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      showConflicts && /* @__PURE__ */ jsxRuntimeExports.jsx(ConflictsSection, { detectConflicts, palette, onDifferentiate: (t2, ref) => differentiateToken?.(t2, ref), onFixContrast: (t2) => applyAutoContrast?.(t2) }),
      showRedundancy && /* @__PURE__ */ jsxRuntimeExports.jsx(RedundancySection, { report: redundancyReport?.(), onAlign: (a, b) => alignTokenTo?.(a, b), onDifferentiate: (a, b) => differentiateToken?.(a, b) })
    ] })
  ] });
};
function autoFixContrast(palette, setToken) {
  const bg2 = palette.background || "#0b0b0c";
  const targets = ["text", "primary"];
  for (const key of targets) {
    const start = palette[key] || "#ffffff";
    let c4 = start;
    let tries = 0;
    while (contrastRatio(c4, bg2) < 4.5 && tries < 50) {
      c4 = nudgeBrightness(c4, bg2);
      tries++;
    }
    setToken(key, c4);
  }
}
function nudgeBrightness(hex2, bgHex) {
  try {
    const toHsl2 = converter("hsl");
    const toRgb2 = converter("rgb");
    const c4 = parse(hex2);
    const bg2 = parse(bgHex);
    if (!c4 || !bg2) return hex2;
    const hsl = toHsl2(c4);
    const bgHsl = toHsl2(bg2);
    const dir = (bgHsl.l || 0.1) > 0.5 ? -1 : 1;
    const next = { ...hsl, l: Math.max(0, Math.min(1, (hsl.l || 0.5) + dir * 0.02)) };
    return formatHex(toRgb2(next)) || hex2;
  } catch {
    return hex2;
  }
}
const ConflictsSection = ({ palette, detectConflicts, onDifferentiate, onFixContrast }) => {
  const issues = detectConflicts ? detectConflicts() : [];
  if (!issues.length) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded border border-default/60 bg-background/40 text-sm text-muted", children: "Aucun conflit détecté ✅" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium flex items-center gap-2", children: [
      "Conflits ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-1 rounded bg-red-700 text-white", children: issues.length })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-sm max-h-48 overflow-auto pr-1", children: issues.map((c4, i) => {
      const isContrast = c4.ratio !== void 0;
      const ref = c4.b ? c4.b : void 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 px-2 py-1 rounded border border-default/50 bg-background/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "⚠️" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs bg-background/50 px-1 rounded", children: c4.token }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1", children: [
          c4.issue,
          c4.ratio ? ` (ratio ${c4.ratio})` : "",
          c4.deltaE !== void 0 ? ` ΔE ${c4.deltaE}` : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded border border-default", style: { background: c4.a } }),
          c4.b && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded border border-default", style: { background: c4.b } })
        ] }),
        isContrast && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn text-[10px] px-2", title: "Corriger contraste", onClick: () => onFixContrast?.(c4.token), children: "⚙️" }),
        !isContrast && ref && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn text-[10px] px-2", title: "Différencier (ajuster teinte)", onClick: () => onDifferentiate?.(c4.token, c4.token === ref ? ref : ref.replace(/(Hover|Active|Subtle|SubtleHover|Fg)$/, "")), children: "🎨" })
      ] }, i);
    }) })
  ] });
};
const RedundancySection = ({ report, onAlign, onDifferentiate }) => {
  if (!report) return null;
  if (!report.length) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded border border-default/60 bg-background/40 text-sm text-muted", children: "Aucune redondance ΔE < 2 détectée ✅" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium flex items-center gap-2", children: [
      "Redondances ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-1 rounded bg-amber-600/70 text-black", children: report.length })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 max-h-40 overflow-auto pr-1 text-sm", children: report.map((r2, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 px-2 py-1 rounded border border-default/50 bg-background/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs bg-background/50 px-1 rounded", children: r2.token }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", children: "≈" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs bg-background/50 px-1 rounded", children: r2.closest }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] ml-auto px-1 rounded bg-amber-600/70 text-black", children: [
        "ΔE ",
        r2.deltaE
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn text-[10px] px-2", title: "Aligner (copier la couleur cible)", onClick: () => onAlign?.(r2.token, r2.closest), children: "⇄" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn text-[10px] px-2", title: "Différencier (éloigner perceptuellement)", onClick: () => onDifferentiate?.(r2.token, r2.closest), children: "🎨" })
    ] }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted", children: "Fusion ou différenciation recommandée pour épurer la palette." })
  ] });
};
const ProjectPanel = () => {
  const palette = usePaletteStore((s) => s.palette);
  const setPalette = usePaletteStore((s) => s.setPalette);
  const undo = usePaletteStore((s) => s.undo);
  const redo = usePaletteStore((s) => s.redo);
  const saveProject = async () => {
    await window.crimson.saveText({ defaultPath: "crimson-project.json", content: JSON.stringify({ palette }, null, 2) });
  };
  const loadProject = async () => {
    const file = await window.crimson.openText();
    if (!file) return;
    try {
      const data = JSON.parse(file.content);
      if (data.palette) setPalette(data.palette);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Projet" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: saveProject, children: "Sauvegarder projet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: loadProject, children: "Charger projet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: undo, children: "Undo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: redo, children: "Redo" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface p-4 rounded border border-default", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium mb-2", children: "Favoris (à venir)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted", children: "Enregistrez vos palettes favorites pour les réutiliser." })
    ] })
  ] });
};
class ErrorBoundary extends React$2.Component {
  state = { error: null, info: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    this.setState({ error, info });
    console.error("[ErrorBoundary]", error, info?.componentStack);
  }
  handleReset = () => {
    window.location.reload();
  };
  render() {
    if (this.state.error) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 text-sm flex flex-col gap-4 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-red-500", children: "Une erreur est survenue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-80", children: "Le rendu de la vue a échoué. Vous pouvez recharger l'application. L'historique de palette est conservé via le store." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("pre", { className: "max-h-40 overflow-auto w-full bg-black/30 p-2 rounded text-red-300 text-[11px] whitespace-pre-wrap", children: [
          this.state.error?.message,
          "\\n",
          this.state.info?.componentStack
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: this.handleReset, className: "btn btn-primary", children: "Recharger" }) })
      ] });
    }
    return this.props.children;
  }
}
const useUIStore = create((set, get2) => ({
  onboardingVisible: false,
  onboardingStep: 0,
  totalSteps: 7,
  // welcome, palette, preview, a11y, sandbox, focus, fin
  completed: false,
  showOnboarding: () => set({ onboardingVisible: true, onboardingStep: 0 }),
  hideOnboarding: () => set({ onboardingVisible: false }),
  resetOnboarding: () => set({ onboardingVisible: true, onboardingStep: 0, completed: false }),
  nextStep: () => {
    set((s) => {
      const next = Math.min(s.totalSteps - 1, s.onboardingStep + 1);
      return { onboardingStep: next };
    });
  },
  prevStep: () => set((s) => ({ onboardingStep: Math.max(0, s.onboardingStep - 1) })),
  gotoStep: (i) => set((s) => ({ onboardingStep: Math.max(0, Math.min(s.totalSteps - 1, i)) })),
  markCompleted: async () => {
    set({ completed: true, onboardingVisible: false });
    try {
      await window.crimson.storeSet("onboardingCompleted", true);
    } catch {
    }
  },
  hydrateCompleted: async () => {
    try {
      const done = await window.crimson.storeGet("onboardingCompleted");
      if (done) set({ completed: true });
      else set({ onboardingVisible: true, onboardingStep: 0 });
    } catch {
      set({ onboardingVisible: true, onboardingStep: 0 });
    }
  }
}));
const steps = [
  { title: "Bienvenue dans Crimson", body: "Affinez et auditez vos palettes en temps réel. Cette mini visite vous montre les zones clés." },
  { title: "Éditeur de Palette", body: "Ajoutez, modifiez, regroupez des tokens. Génération d’harmonies et variantes perceptuelles.", highlight: "#palette-root" },
  { title: "Prévisualisation UI", body: "Composants et surfaces reflètent instantanément la palette (et la simulation daltonisme).", highlight: "#preview-root" },
  { title: "Accessibilité", body: "Mesures de contraste, conflits et redondances. Ajustez avant export.", highlight: "#a11y-root" },
  { title: "Sandbox What‑If", body: "Testez des modifications sans les engager. Appliquez ou annulez quand prêt.", highlight: "#palette-root" },
  { title: "Mode Focus", body: "Isole un groupe de tokens pour réduire le bruit visuel et éditer plus vite.", highlight: "#palette-root" },
  { title: "C’est tout !", body: "Vous pouvez relancer cette visite via le bouton Aide (?). Bonne création ✨" }
];
const OnboardingOverlay = () => {
  const { onboardingVisible, onboardingStep, totalSteps, nextStep, prevStep, hideOnboarding, markCompleted } = useUIStore((s) => ({
    onboardingVisible: s.onboardingVisible,
    onboardingStep: s.onboardingStep,
    totalSteps: s.totalSteps,
    nextStep: s.nextStep,
    prevStep: s.prevStep,
    hideOnboarding: s.hideOnboarding,
    markCompleted: s.markCompleted
  }));
  const step = steps[onboardingStep] || steps[0];
  if (!onboardingVisible) return null;
  const root2 = document.getElementById("onboarding-root");
  if (!root2) return null;
  const isLast = onboardingStep === totalSteps - 1;
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[200] pointer-events-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/50 backdrop-blur-sm", onClick: hideOnboarding }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-8 left-1/2 -translate-x-1/2 w-[480px] max-w-[90%] bg-surface border border-default rounded-lg shadow-xl p-5 space-y-4 animate-[fadeIn_0.25s_ease]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-1", children: step.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted whitespace-pre-line leading-relaxed", children: step.body })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", title: "Fermer", onClick: hideOnboarding, children: "✕" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 flex-1", children: steps.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1 rounded flex-1 ${i === onboardingStep ? "bg-primary" : "bg-default/40"}` }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          onboardingStep > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: prevStep, children: "◀" }),
          !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: nextStep, children: "Suivant ▶" }),
          isLast && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", onClick: async () => {
            await markCompleted();
          }, children: "Terminer ✓" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px] text-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "underline", onClick: async () => {
          await markCompleted();
        }, children: "Ignorer (marquer comme vu)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Étape ",
          onboardingStep + 1,
          "/",
          totalSteps
        ] })
      ] })
    ] }) }) })
  ] });
  return reactDomExports.createPortal(content, root2);
};
const defaultSeeds = ["#990000"];
const emptyDraft = () => ({ light: {}, dark: {} });
const useNewProjectWizard = create((set, get2) => ({
  open: false,
  step: "context",
  // Ordered wizard steps (no duplicates). 'context' covers style/profile inputs.
  steps: ["context", "seeds", "options", "accessibility", "themes", "naming", "semantics", "components", "preview", "summary"],
  profile: null,
  keywords: "",
  seeds: defaultSeeds,
  mode: "single",
  saturation: 0.85,
  internalContrast: 0.55,
  neutralLevels: 9,
  includeSemantic: true,
  variantScope: ["primary", "success", "danger", "warning", "info"],
  minContrast: 4.5,
  highContrastMode: false,
  themes: { light: true, dark: true, auto: false },
  tokenPrefix: "",
  mergeStrategy: "replace",
  prefixOnMerge: "new",
  generateNeutrals: true,
  enforceSemanticDistance: true,
  distanceThreshold: 5,
  contrastPolicy: "wcagAA",
  foregroundHeuristic: "auto",
  overlayOptions: { enable: false, opacity: 0.5, blend: "overlay" },
  backgroundLayers: [{ id: "base", role: "base" }],
  minimalMode: false,
  exportPresets: { css: true, tailwind: false, json: true },
  tokenGroupSelections: {},
  cvdSimulations: { protanopia: false, deuteranopia: false, tritanopia: false },
  autosaveEnabled: false,
  styleKeywordsMapping: {},
  draft: emptyDraft(),
  applying: false,
  error: null,
  confirmReplace: false,
  history: [],
  future: [],
  renameSuggestions: [],
  openWizard: () => set({ open: true }),
  closeWizard: () => set({ open: false }),
  next: () => set((s) => {
    const i = s.steps.indexOf(s.step);
    return { step: s.steps[Math.min(s.steps.length - 1, i + 1)] };
  }),
  prev: () => set((s) => {
    const i = s.steps.indexOf(s.step);
    return { step: s.steps[Math.max(0, i - 1)] };
  }),
  go: (st) => set((s) => s.steps.includes(st) ? { step: st } : {}),
  setSeeds: (v2) => set({ seeds: v2.map((s) => safeHex$2(s)) }),
  setKeywords: (v2) => set({ keywords: v2 }),
  setProfile: (p2) => set({ profile: p2 }),
  setMode: (m2) => set({ mode: m2 }),
  setSaturation: (n2) => set({ saturation: Math.min(1, Math.max(0, n2)) }),
  setInternalContrast: (n2) => set({ internalContrast: Math.min(1, Math.max(0, n2)) }),
  setNeutralLevels: (n2) => set({ neutralLevels: n2 }),
  toggleSemantic: () => set((s) => ({ includeSemantic: !s.includeSemantic })),
  toggleVariant: (v2) => set((s) => ({ variantScope: s.variantScope.includes(v2) ? s.variantScope.filter((x2) => x2 !== v2) : [...s.variantScope, v2] })),
  setMinContrast: (n2) => set({ minContrast: Math.max(1, Math.min(21, n2)) }),
  toggleThemeFlag: (k2) => set((s) => ({ themes: { ...s.themes, [k2]: !s.themes[k2] } })),
  setTokenPrefix: (p2) => set({ tokenPrefix: p2 }),
  setMergeStrategy: (m2) => set({ mergeStrategy: m2 }),
  setPrefixOnMerge: (p2) => set({ prefixOnMerge: p2 }),
  setGenerateNeutrals: (on) => set({ generateNeutrals: on }),
  setEnforceSemanticDistance: (on) => set({ enforceSemanticDistance: on }),
  setDistanceThreshold: (n2) => set({ distanceThreshold: n2 }),
  setDraft: (draft) => set((s) => {
    const prev = s.draft || emptyDraft();
    const eq = (a, b) => {
      const ak2 = Object.keys(a);
      const bk2 = Object.keys(b);
      if (ak2.length !== bk2.length) return false;
      for (const k2 of ak2) if (a[k2] !== b[k2]) return false;
      return true;
    };
    if (eq(prev.light, draft.light) && eq(prev.dark, draft.dark)) return s;
    const nextHistory = [...s.history, prev];
    const limited = nextHistory.length > 30 ? nextHistory.slice(nextHistory.length - 30) : nextHistory;
    return { draft, history: limited, future: [] };
  }),
  regenDraft: () => {
    const base = { light: {}, dark: {} };
    set((s) => ({ draft: base, history: [...s.history, s.draft || emptyDraft()], future: [] }));
  },
  undo: () => set((s) => {
    const prev = s.history[s.history.length - 1];
    if (!prev) return s;
    const history = s.history.slice(0, -1);
    const future = [s.draft, ...s.future];
    return { draft: prev, history, future };
  }),
  redo: () => set((s) => {
    const next = s.future[0];
    if (!next) return s;
    const future = s.future.slice(1);
    const history = [...s.history, s.draft];
    return { draft: next, history, future };
  }),
  apply: async (toSandbox) => {
    const { draft, mergeStrategy, tokenPrefix, prefixOnMerge, themes, confirmReplace } = get2();
    if (!draft) return;
    if (mergeStrategy === "mergeWithPrefix" && !prefixOnMerge.trim()) {
      set({ error: "Préfixe requis pour mergeWithPrefix" });
      return;
    }
    if (mergeStrategy === "replace" && !confirmReplace) {
      set({ error: "Confirmation requise pour remplacement total (cliquer à nouveau Appliquer Direct)", confirmReplace: true });
      return;
    }
    const palStore = usePaletteStore.getState();
    const targetThemes = { light: themes.light ? draft.light : palStore.palettes.light, dark: themes.dark ? draft.dark : palStore.palettes.dark };
    const merge = (base, incoming) => {
      if (mergeStrategy === "replace") return { ...incoming };
      if (mergeStrategy === "merge") return { ...base, ...incoming };
      const withPrefix = Object.fromEntries(Object.entries(incoming).map(([k2, v2]) => [`${prefixOnMerge}${k2.charAt(0).toUpperCase()}${k2.slice(1)}`, v2]));
      return { ...base, ...withPrefix };
    };
    const nextLight = merge(palStore.palettes.light, targetThemes.light);
    const nextDark = merge(palStore.palettes.dark, targetThemes.dark);
    if (toSandbox) {
      const active = palStore.theme === "dark" ? nextDark : nextLight;
      usePaletteStore.setState((s) => ({ sandbox: active, sandboxActive: true }));
    } else {
      usePaletteStore.setState((s) => ({ palettes: { light: nextLight, dark: nextDark }, palette: s.theme === "dark" ? nextDark : nextLight, history: [...s.history, s.palette], future: [], paletteVersion: (s.paletteVersion || 0) + 1 }));
    }
    set({ open: false, confirmReplace: false, error: null });
  },
  resetConfirmation: () => set({ confirmReplace: false, error: null }),
  setContrastPolicy: (p2) => set({ contrastPolicy: p2 }),
  setForegroundHeuristic: (f2) => set({ foregroundHeuristic: f2 }),
  setOverlayOptions: (o) => set({ overlayOptions: o }),
  addBackgroundLayer: (role) => set((s) => ({ backgroundLayers: [...s.backgroundLayers || [], { id: "layer_" + Date.now().toString(36), role: role || "bg" }] })),
  updateBackgroundLayer: (id2, patch) => set((s) => ({ backgroundLayers: (s.backgroundLayers || []).map((l2) => l2.id === id2 ? { ...l2, ...patch } : l2) })),
  removeBackgroundLayer: (id2) => set((s) => ({ backgroundLayers: (s.backgroundLayers || []).filter((l2) => l2.id !== id2) })),
  toggleMinimalMode: () => set((s) => ({ minimalMode: !s.minimalMode })),
  toggleExportPreset: (k2) => set((s) => ({ exportPresets: { css: s.exportPresets?.css ?? false, tailwind: s.exportPresets?.tailwind ?? false, json: s.exportPresets?.json ?? false, [k2]: !s.exportPresets?.[k2] } })),
  toggleTokenGroup: (group) => set((s) => ({ tokenGroupSelections: { ...s.tokenGroupSelections || {}, [group]: !s.tokenGroupSelections?.[group] } })),
  toggleSimulation: (k2) => set((s) => ({ cvdSimulations: { protanopia: s.cvdSimulations?.protanopia ?? false, deuteranopia: s.cvdSimulations?.deuteranopia ?? false, tritanopia: s.cvdSimulations?.tritanopia ?? false, [k2]: !s.cvdSimulations?.[k2] } })),
  setAutosaveEnabled: (on) => set({ autosaveEnabled: on }),
  hydrate: async () => {
    try {
      const raw = await window?.crimson?.storeGet?.("newProjectWizardState");
      if (raw && typeof raw === "object") {
        const allowed = ["profile", "keywords", "seeds", "mode", "saturation", "internalContrast", "neutralLevels", "includeSemantic", "variantScope", "minContrast", "highContrastMode", "themes", "tokenPrefix", "mergeStrategy", "prefixOnMerge", "generateNeutrals", "enforceSemanticDistance", "distanceThreshold", "contrastPolicy", "foregroundHeuristic", "overlayOptions", "backgroundLayers", "minimalMode", "exportPresets", "tokenGroupSelections", "cvdSimulations", "autosaveEnabled"];
        const patch = {};
        for (const k2 of allowed) if (k2 in raw) patch[k2] = raw[k2];
        set(patch);
      }
    } catch (e2) {
    }
  },
  getAdjustedParams: () => {
    const s = get2();
    let saturation = s.saturation;
    let internalContrast = s.internalContrast;
    const kw = s.keywords.toLowerCase().split(/[,\s]+/).filter(Boolean);
    const apply = (deltaSat, deltaContrast) => {
      saturation = Math.min(1, Math.max(0, saturation + deltaSat));
      internalContrast = Math.min(1, Math.max(0, internalContrast + deltaContrast));
    };
    for (const k2 of kw) {
      if (["warm", "chaleur", "chaud"].includes(k2)) apply(0.05, 0);
      if (["cool", "froid", "cold"].includes(k2)) apply(-0.05, 0);
      if (["vivid", "punchy", "vif"].includes(k2)) apply(0.1, 0.05);
      if (["pastel", "soft", "doux"].includes(k2)) apply(-0.2, -0.05);
      if (["minimal", "calm", "sobre"].includes(k2)) apply(-0.15, 0);
      if (["highcontrast", "accessible"].includes(k2)) apply(0, 0.15);
      if (["vibrant"].includes(k2)) apply(0.12, 0.02);
    }
    switch (s.profile) {
      case "Pastel":
        apply(-0.25, -0.05);
        break;
      case "Vivid":
        apply(0.1, 0.05);
        break;
      case "Monochrome":
        apply(-0.4, 0.1);
        break;
      case "Nord":
        apply(-0.15, -0.02);
        break;
      case "Solarized":
        apply(-0.05, 0);
        break;
      case "Corporate":
        apply(-0.1, 0.05);
        break;
      case "Material":
        apply(0.05, 0);
        break;
      case "Fluent":
        apply(-0.05, 0);
        break;
    }
    return { saturation, internalContrast };
  },
  generateRenameSuggestions: () => {
    const s = get2();
    const draft = s.draft;
    if (!draft) return;
    const light = draft.light;
    const suggestions = [];
    const mapping = {
      primary: "brand",
      secondary: "accent",
      accent: "highlight",
      success: "positive",
      danger: "negative",
      warning: "caution",
      info: "notice"
    };
    for (const [from, to] of Object.entries(mapping)) {
      if (light[from] && !light[to]) {
        suggestions.push({ from, to, reason: `Alias proposé pour ${from}` });
      }
    }
    Object.keys(light).forEach((k2) => {
      if (/^primary[A-Z]/.test(k2)) return;
      if (/^brand/.test(k2)) return;
      if (k2.startsWith("primary") && !light["brand"]) {
        suggestions.push({ from: "primary", to: "brand", reason: "Standardisation brand vs primary" });
      }
    });
    set({ renameSuggestions: suggestions });
  }
}));
let __wizard_unsub = null;
if (typeof window !== "undefined") {
  const attemptBind = () => {
    const st = useNewProjectWizard.getState();
    if (!__wizard_unsub) {
      let timeout = null;
      __wizard_unsub = useNewProjectWizard.subscribe((s, prev) => {
        if (!s.autosaveEnabled) return;
        const keys = ["profile", "keywords", "seeds", "mode", "saturation", "internalContrast", "neutralLevels", "includeSemantic", "variantScope", "minContrast", "highContrastMode", "themes", "tokenPrefix", "mergeStrategy", "prefixOnMerge", "generateNeutrals", "enforceSemanticDistance", "distanceThreshold", "contrastPolicy", "foregroundHeuristic", "overlayOptions", "backgroundLayers", "minimalMode", "exportPresets", "tokenGroupSelections", "cvdSimulations", "autosaveEnabled"];
        const changed = keys.some((k2) => s[k2] !== prev[k2]);
        if (!changed) return;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          try {
            const payload = {};
            for (const k2 of keys) payload[k2] = s[k2](window)?.crimson?.storeSet?.("newProjectWizardState", payload);
          } catch {
          }
        }, 400);
      });
    }
    st.hydrate?.();
  };
  setTimeout(attemptBind, 1e3);
}
const toHsl = converter("hsl");
const toRgb = converter("rgb");
const clamp01 = (n2) => Math.min(1, Math.max(0, n2));
function adjustSaturation(hex2, sat) {
  const p2 = parse(hex2);
  if (!p2) return hex2;
  const h = toHsl(p2);
  h.s = clamp01((h.s ?? 0) * sat);
  return formatHex(toRgb(h)) || hex2;
}
function deriveSeeds(params) {
  const base = params.seeds[0] || "#990000";
  const p2 = parse(base);
  if (!p2) return [base];
  const h = toHsl(p2);
  const mk2 = (d) => {
    const clone = { ...h };
    clone.h = (((clone.h || 0) + d) % 360 + 360) % 360;
    return formatHex(toRgb(clone)) || base;
  };
  switch (params.mode) {
    case "dual":
      return [base, mk2(180)];
    case "triad":
      return [base, mk2(120), mk2(-120)];
    case "mono":
      return [base];
    default:
      return [base];
  }
}
function hexToRgbLocal(hex2) {
  const v2 = /#?([0-9a-fA-F]{6})/.exec(hex2)?.[1] || "000000";
  const n2 = parseInt(v2, 16);
  return { r: n2 >> 16 & 255, g: n2 >> 8 & 255, b: n2 & 255 };
}
function srgbToLinear(c4) {
  const x2 = c4 / 255;
  return x2 <= 0.04045 ? x2 / 12.92 : Math.pow((x2 + 0.055) / 1.055, 2.4);
}
function linearToSrgb(x2) {
  return x2 <= 31308e-7 ? x2 * 12.92 : 1.055 * Math.pow(x2, 1 / 2.4) - 0.055;
}
function toOklab(r2, g, b) {
  const l2 = 0.4122214708 * r2 + 0.5363325363 * g + 0.0514459929 * b, m2 = 0.2119034982 * r2 + 0.6806995451 * g + 0.1073969566 * b, s = 0.0883024619 * r2 + 0.2817188376 * g + 0.6299787005 * b, l_ = Math.cbrt(l2), m_ = Math.cbrt(m2), s_ = Math.cbrt(s);
  return { L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_, a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_, b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * b };
}
function fromOklab(L2, a, b) {
  const l_ = L2 + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L2 - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L2 - 0.0894841775 * a - 1.291485548 * b;
  const l2 = l_ * l_ * l_;
  const m2 = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  return { r: 4.0767416621 * l2 - 3.3077115913 * m2 + 0.2309699292 * s, g: -1.2684380046 * l2 + 2.6097574011 * m2 - 0.3413193965 * s, b: -0.0041960863 * l2 - 0.7034186147 * m2 + 1.707614701 * s };
}
function rgbToHexLocal(r2, g, b) {
  const cl2 = (x2) => Math.min(255, Math.max(0, Math.round(x2 * 255)));
  return "#" + [cl2(r2), cl2(g), cl2(b)].map((v2) => v2.toString(16).padStart(2, "0")).join("");
}
function mixOklab(aHex, bHex, t2) {
  const a = hexToRgbLocal(aHex), b = hexToRgbLocal(bHex);
  const la2 = toOklab(srgbToLinear(a.r), srgbToLinear(a.g), srgbToLinear(a.b));
  const lb2 = toOklab(srgbToLinear(b.r), srgbToLinear(b.g), srgbToLinear(b.b));
  const L2 = la2.L + (lb2.L - la2.L) * t2;
  const A2 = la2.a + (lb2.a - la2.a) * t2;
  const B2 = la2.b + (lb2.b - la2.b) * t2;
  const { r: r2, g, b: bb2 } = fromOklab(L2, A2, B2);
  return rgbToHexLocal(linearToSrgb(r2), linearToSrgb(g), linearToSrgb(bb2));
}
function buildNeutralScale(levels, baseBg, baseFg) {
  const out = {};
  for (let i = 0; i < levels; i++) {
    const t2 = i / (levels - 1);
    out[`neutral${(i + 1) * Math.round(1e3 / levels) / 10}`] = mixOklab(baseBg, baseFg, t2);
  }
  return out;
}
function ensureFg(background, minContrast) {
  const white = ensureContrast("#ffffff", background, minContrast);
  const black = ensureContrast("#111111", background, minContrast);
  return contrastRatio(white, background) >= contrastRatio(black, background) ? white : black;
}
function variantsFor(baseName, baseHex, bg2, internalContrast) {
  const L2 = luminance(baseHex);
  const baseLight = L2 > 0.75 ? 0.04 : L2 > 0.6 ? 0.06 : L2 > 0.4 ? 0.08 : L2 > 0.25 ? 0.1 : 0.12;
  const baseDark = L2 < 0.15 ? 0.08 : L2 < 0.25 ? 0.1 : L2 < 0.4 ? 0.12 : L2 < 0.6 ? 0.14 : 0.16;
  const scaleLight = baseLight + 0.06 * internalContrast;
  const scaleDark = baseDark + 0.06 * internalContrast;
  const subtleBase = 0.1 + 0.06 * internalContrast;
  const subtleHover = subtleBase + 0.06;
  return {
    [`${baseName}Hover`]: lighten(baseHex, scaleLight),
    [`${baseName}Active`]: darken(baseHex, scaleDark),
    [`${baseName}Subtle`]: mix(bg2, baseHex, subtleBase),
    [`${baseName}SubtleHover`]: mix(bg2, baseHex, subtleHover)
  };
}
function generatePalette(params) {
  const warnings = [];
  const notes = [];
  const seeds = deriveSeeds(params).map((s) => adjustSaturation(s, params.saturation));
  const primary = seeds[0];
  const lightBase = "#f7f8fa";
  let lightBg = lightBase;
  if (params.backgroundLayers && params.backgroundLayers.length > 1) {
    lightBg = params.backgroundLayers.reduce((acc, _l, i) => i === 0 ? acc : mix(acc, primary, 0.02 * i), lightBase);
  }
  const lightSurface = mix(lightBg, "#000000", 0.04);
  const lightText = ensureFg(lightBg, params.minContrast);
  const lightBorder = mix(lightBg, lightText, 0.18);
  const darkBase = "#0b0b0c";
  let darkBg = darkBase;
  if (params.backgroundLayers && params.backgroundLayers.length > 1) {
    darkBg = params.backgroundLayers.reduce((acc, _l, i) => i === 0 ? acc : mix(acc, primary, 0.03 * i), darkBase);
  }
  const darkSurface = mix(darkBg, "#ffffff", 0.06);
  const darkText = ensureFg(darkBg, params.minContrast);
  const darkBorder = mix(darkBg, darkText, 0.22);
  const baseLight = { primary, background: lightBg, surface: lightSurface, text: lightText, border: lightBorder };
  const baseDark = { primary, background: darkBg, surface: darkSurface, text: darkText, border: darkBorder };
  if (params.includeSemantic) {
    const p2 = parse(primary);
    if (p2) {
      const hsl = toHsl(p2);
      const mk2 = (deg, satDelta = 0, lDelta = 0) => {
        const clone = { ...hsl };
        clone.h = (((clone.h || 0) + deg) % 360 + 360) % 360;
        clone.s = clamp01((clone.s || 0) + satDelta);
        clone.l = clamp01((clone.l || 0) + lDelta);
        return formatHex(toRgb(clone)) || primary;
      };
      const semantic = {
        success: mk2(120, 0, 0),
        danger: mk2(300, 0, -0.05),
        warning: mk2(45, 0.05, 0.05),
        info: mk2(-60, 0, 0)
      };
      Object.assign(baseLight, semantic);
      Object.assign(baseDark, semantic);
    }
  }
  if (params.generateNeutrals) {
    Object.assign(baseLight, buildNeutralScale(params.neutralLevels, lightBg, lightText));
    Object.assign(baseDark, buildNeutralScale(params.neutralLevels, darkBg, darkText));
  }
  const applyFgs = (obj, bg22) => {
    for (const k2 of Object.keys(obj)) {
      if (!/(background|surface|border)/.test(k2)) {
        let mc2 = params.minContrast;
        if (params.contrastPolicy === "wcagAAA") mc2 = Math.max(mc2, 7);
        else if (params.contrastPolicy === "wcagAA") mc2 = Math.max(mc2, 4.5);
        const fg2 = ensureFg(obj[k2], mc2);
        obj[`${k2}Fg`] = fg2;
      }
    }
  };
  applyFgs(baseLight);
  applyFgs(baseDark);
  params.variantScope.forEach((tok) => {
    const exists = !!(baseLight[tok] || baseDark[tok]);
    if (!exists) {
      warnings.push(`Variant ignoré: token '${tok}' absent`);
      return;
    }
    if (baseLight[tok]) Object.assign(baseLight, variantsFor(tok, baseLight[tok], lightBg, params.internalContrast));
    if (baseDark[tok]) Object.assign(baseDark, variantsFor(tok, baseDark[tok], darkBg, params.internalContrast));
  });
  if (params.overlayOptions?.enable) {
    const layer = (hex2) => mix(hex2, params.foregroundHeuristic === "luminance" ? "#ffffff" : primary, params.overlayOptions.opacity);
    baseLight.overlay = layer(lightBg);
    baseDark.overlay = layer(darkBg);
  }
  if (params.includeSemantic && params.enforceSemanticDistance) {
    const semas = ["success", "danger", "warning", "info"];
    const adjustHue = (hex2, degrees) => {
      const p2 = parse(hex2);
      if (!p2) return hex2;
      const hsl = toHsl(p2);
      hsl.h = (((hsl.h || 0) + degrees) % 360 + 360) % 360;
      return formatHex(toRgb(hsl)) || hex2;
    };
    for (let i = 0; i < semas.length; i++) {
      for (let j = i + 1; j < semas.length; j++) {
        const a = semas[i], b = semas[j];
        if (baseLight[a] && baseLight[b]) {
          let d = deltaE(baseLight[a], baseLight[b]), attempts = 0;
          while (d < params.distanceThreshold && attempts < 12) {
            const step = 10 + attempts * 5;
            baseLight[b] = adjustHue(baseLight[b], step);
            baseDark[b] = baseLight[b];
            d = deltaE(baseLight[a], baseLight[b]);
            attempts++;
          }
          if (d < params.distanceThreshold) {
            warnings.push(`Distance sémantique encore faible (${a}/${b}) ΔE=${d.toFixed(2)} après ajustements`);
          } else if (attempts > 0) {
            notes.push(`Ajustement ${b} (${attempts} itérations) pour ΔE=${d.toFixed(2)}`);
          }
        }
      }
    }
  }
  if (!params.internalContrast) {
    notes.push("internalContrast=0 => variants proches de la couleur de base");
  }
  const candidates = ["primary", "success", "danger", "warning", "info"].filter((k2) => baseLight[k2]);
  for (let i = 0; i < candidates.length; i++) {
    for (let j = i + 1; j < candidates.length; j++) {
      const a = candidates[i], b = candidates[j];
      const dE = deltaE(baseLight[a], baseLight[b]);
      deltaE(baseDark[a] || baseLight[a], baseDark[b] || baseLight[b]);
      const rgbDist = (() => {
        const hexTo = (h) => {
          const m2 = /#?([0-9a-fA-F]{6})/.exec(h)?.[1] || "000000";
          const n2 = parseInt(m2, 16);
          return { r: n2 >> 16 & 255, g: n2 >> 8 & 255, b: n2 & 255 };
        };
        const A2 = hexTo(baseLight[a]), B2 = hexTo(baseLight[b]);
        const dr = A2.r - B2.r, dg2 = A2.g - B2.g, db2 = A2.b - B2.b;
        return Math.sqrt(dr * dr + dg2 * dg2 + db2 * db2);
      })();
      if (dE < 5 || rgbDist < 24) {
        warnings.push(`Collision chromatique ${a}/${b} ΔE=${dE.toFixed(2)} rgbDist=${Math.round(rgbDist)}`);
      }
    }
  }
  const metric = {};
  const values = candidates.map((k2) => baseLight[k2]);
  let sumDE = 0, pairs = 0;
  for (let i = 0; i < values.length; i++) for (let j = i + 1; j < values.length; j++) {
    sumDE += deltaE(values[i], values[j]);
    pairs++;
  }
  if (pairs) metric.semanticDiversity = sumDE / pairs;
  const bg2 = baseLight.background;
  const getL = (hex2) => {
    const v2 = /#?([0-9a-fA-F]{6})/.exec(hex2)?.[1] || "000000";
    const n2 = parseInt(v2, 16);
    const r2 = n2 >> 16 & 255, g = n2 >> 8 & 255, b = n2 & 255;
    const srgb = (c4) => {
      const x2 = c4 / 255;
      return x2 <= 0.03928 ? x2 / 12.92 : Math.pow((x2 + 0.055) / 1.055, 2.4);
    };
    const R2 = srgb(r2), G2 = srgb(g), B2 = srgb(b);
    return 0.2126 * R2 + 0.7152 * G2 + 0.0722 * B2;
  };
  const contrast = (a, b) => {
    const L1 = getL(a), L2 = getL(b);
    const [hi2, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
    return (hi2 + 0.05) / (lo + 0.05);
  };
  const fgTokens = Object.keys(baseLight).filter((k2) => k2.endsWith("Fg"));
  if (fgTokens.length) {
    metric.avgFgContrast = fgTokens.reduce((acc, k2) => acc + contrast(baseLight[k2], bg2), 0) / fgTokens.length;
  }
  if (metric.semanticDiversity && metric.avgFgContrast) {
    metric.accessibilityScore = metric.avgFgContrast / params.minContrast * 0.6 + Math.min(1, metric.semanticDiversity / 20) * 0.4;
  }
  return { light: baseLight, dark: baseDark, meta: { warnings, notes, metrics: metric } };
}
function useFocusTrap(ref, active, onEscape) {
  reactExports.useEffect(() => {
    if (!active) return;
    const root2 = ref.current;
    if (!root2) return;
    const selector = 'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])';
    const getFocusable = () => Array.from(root2.querySelectorAll(selector)).filter((el2) => !el2.hasAttribute("disabled"));
    const handleKey = (e2) => {
      if (e2.key === "Escape") {
        onEscape?.();
      } else if (e2.key === "Tab") {
        const list2 = getFocusable();
        if (!list2.length) return;
        const first = list2[0];
        const last = list2[list2.length - 1];
        if (e2.shiftKey && document.activeElement === first) {
          e2.preventDefault();
          last.focus();
        } else if (!e2.shiftKey && document.activeElement === last) {
          e2.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    const list = getFocusable();
    if (list[0]) list[0].focus();
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [active, onEscape]);
}
const fr = {
  wizard_title: "Nouveau Projet",
  step_context: "Contexte",
  step_context_sub: "Définissez le cadre et l'intention esthétique.",
  step_seeds: "Seeds",
  step_seeds_sub: "Choisissez les couleurs de départ qui structurent la palette.",
  step_options: "Options",
  step_options_sub: "Paramètres de génération & variantes.",
  step_access: "Accessibilité",
  step_access_sub: "Contrastes & objectifs de lisibilité.",
  step_themes: "Thèmes",
  step_themes_sub: "Activer les modes clair / sombre ou auto.",
  step_naming: "Nom & Fusion",
  step_naming_sub: "Stratégie d'intégration dans la palette actuelle.",
  step_preview: "Prévisualisation",
  step_preview_sub: "Aperçu des principaux tokens générés.",
  step_summary: "Résumé",
  step_summary_sub: "Diff et application finale.",
  label_keywords: "Mots-clés style",
  label_profile: "Profil (optionnel)",
  beta: "beta",
  add_seed: "+ seed",
  remove_seed: "Retirer",
  saturation: "Saturation",
  internal_contrast: "Contraste interne",
  neutral_levels: "Niveaux neutres",
  include_semantic: "Sémantiques (success/danger...)",
  generate_neutrals: "Générer neutrals",
  variant_scope: "Variants scope",
  min_contrast: "Contraste minimum",
  enforce_semantic_distance: "Distances sémantiques (ΔE ≥ {threshold})",
  token_prefix: "Préfixe tokens",
  prefix_merge: "Prefix merge",
  apply_sandbox: "Appliquer (Sandbox)",
  apply_direct: "Appliquer Direct",
  regenerate: "Régénérer",
  close: "Fermer",
  previous: "Précédent",
  next: "Suivant",
  undo: "Undo",
  redo: "Redo",
  added: "Ajoutés",
  replaced: "Remplacés",
  unchanged: "Inchangés",
  show_diff: "Voir Diff",
  hide_diff: "Masquer Diff",
  warnings: "Warnings",
  notes: "Notes",
  generated_tokens: "Tokens générés",
  confirm_replace_needed: "Confirmation requise pour remplacement total (cliquer à nouveau Appliquer Direct)",
  prefix_required: "Préfixe requis pour mergeWithPrefix",
  exports: "Exports",
  mode_minimal: "Mode Minimal",
  mode_complet: "Mode Complet",
  metrics: "Métriques",
  simulation: "Simulation",
  generate_suggestions: "Générer suggestions",
  suggestions: "Suggestions",
  apply: "Appliquer",
  no_selection: "Aucune sélection"
};
function t(key, vars) {
  let str = fr[key];
  if (vars) {
    for (const [k2, v2] of Object.entries(vars)) str = str.replace(new RegExp(`{${k2}}`, "g"), String(v2));
  }
  return str;
}
const StepHeader = ({ title, subtitle }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: title }),
  subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-70 mt-1 leading-snug", children: subtitle })
] });
const StepContext = () => {
  const w2 = useNewProjectWizard();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepHeader, { title: t("step_context"), subtitle: t("step_context_sub") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs flex flex-col gap-1", title: "Les mots-clés ajustent saturation et contraste interne (heuristiques basiques).", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-2", children: t("label_keywords") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: w2.keywords, onChange: (e2) => w2.setKeywords(e2.target.value), className: "px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-xs", placeholder: "ex: warm, fintech, minimal" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs flex flex-col gap-1", title: "Le profil applique des deltas sur saturation & contraste (Pastel, Vivid, Nord…).", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-2", children: t("label_profile") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: w2.profile || "", onChange: (e2) => w2.setProfile(e2.target.value || null), className: "px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "(aucun)" }),
          ["Material", "Fluent", "Nord", "Solarized", "Pastel", "Corporate", "Vivid", "Monochrome"].map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: p2 }, p2))
        ] })
      ] })
    ] })
  ] });
};
const StepSeeds = () => {
  const w2 = useNewProjectWizard();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepHeader, { title: t("step_seeds"), subtitle: t("step_seeds_sub") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [
      w2.seeds.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: s, onChange: (e2) => {
          const arr = [...w2.seeds];
          arr[i] = e2.target.value;
          w2.setSeeds(arr);
        }, className: "w-12 h-12 p-0 bg-transparent border border-neutral-700 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: s, onChange: (e2) => {
          const arr = [...w2.seeds];
          arr[i] = e2.target.value;
          w2.setSeeds(arr);
        }, className: "w-20 px-1 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-[10px] font-mono" })
      ] }, i)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => w2.setSeeds([...w2.seeds, "#3366ff"]), className: "px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-xs", children: t("add_seed") }),
      w2.seeds.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => w2.setSeeds(w2.seeds.slice(0, -1)), className: "px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-xs", children: t("remove_seed") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 text-xs", children: ["single", "dual", "triad", "mono"].map((m2) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => w2.setMode(m2), className: `px-2 py-1 rounded border text-xs ${w2.mode === m2 ? "border-amber-500 text-amber-400" : "border-neutral-700"}`, children: m2 }, m2)) })
  ] });
};
const StepOptions = () => {
  const w2 = useNewProjectWizard();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepHeader, { title: t("step_options"), subtitle: t("step_options_sub") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-1", children: [
        t("saturation"),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { "aria-label": "Saturation", type: "range", min: 0, max: 1, step: 0.01, value: w2.saturation, onChange: (e2) => w2.setSaturation(parseFloat(e2.target.value)), "aria-valuemin": 0, "aria-valuemax": 1, "aria-valuenow": w2.saturation }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-14 px-1 py-0.5 text-right rounded bg-neutral-800 border border-neutral-700 text-[11px]", type: "number", min: 0, max: 1, step: 0.01, value: w2.saturation, onChange: (e2) => w2.setSaturation(parseFloat(e2.target.value) || 0) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-1", children: [
        t("internal_contrast"),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { "aria-label": "Contraste interne", type: "range", min: 0, max: 1, step: 0.01, value: w2.internalContrast, onChange: (e2) => w2.setInternalContrast(parseFloat(e2.target.value)), "aria-valuemin": 0, "aria-valuemax": 1, "aria-valuenow": w2.internalContrast }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-14 px-1 py-0.5 text-right rounded bg-neutral-800 border border-neutral-700 text-[11px]", type: "number", min: 0, max: 1, step: 0.01, value: w2.internalContrast, onChange: (e2) => w2.setInternalContrast(parseFloat(e2.target.value) || 0) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-1 col-span-2", children: [
        t("neutral_levels"),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: w2.neutralLevels, onChange: (e2) => w2.setNeutralLevels(Number(e2.target.value)), className: "px-2 py-1 rounded bg-neutral-800 border border-neutral-700", children: [5, 7, 9, 12].map((n2) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: n2, children: n2 }, n2)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: w2.includeSemantic, onChange: () => w2.toggleSemantic() }),
        " ",
        t("include_semantic")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: w2.generateNeutrals, onChange: (e2) => w2.setGenerateNeutrals(e2.target.checked) }),
        " ",
        t("generate_neutrals")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1", children: t("variant_scope") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["primary", "success", "danger", "warning", "info"].map((v2) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => w2.toggleVariant(v2), className: `px-2 py-0.5 rounded border text-[11px] ${w2.variantScope.includes(v2) ? "border-amber-500 text-amber-400" : "border-neutral-700"}`, children: v2 }, v2)) })
      ] })
    ] })
  ] });
};
const StepAccessibility = () => {
  const w2 = useNewProjectWizard();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepHeader, { title: t("step_access"), subtitle: t("step_access_sub") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-1 text-xs max-w-xs", children: [
      t("min_contrast"),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { "aria-label": "Contraste minimum", type: "range", min: 3, max: 10, step: 0.1, value: w2.minContrast, onChange: (e2) => w2.setMinContrast(parseFloat(e2.target.value)), "aria-valuemin": 3, "aria-valuemax": 10, "aria-valuenow": w2.minContrast }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "w-16 px-1 py-0.5 text-right rounded bg-neutral-800 border border-neutral-700 text-[11px]", type: "number", min: 3, max: 10, step: 0.1, value: w2.minContrast, onChange: (e2) => w2.setMinContrast(parseFloat(e2.target.value) || 3) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] opacity-70", children: [
        w2.minContrast.toFixed(2),
        ":1"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: w2.enforceSemanticDistance, onChange: (e2) => w2.setEnforceSemanticDistance(e2.target.checked) }),
      " ",
      t("enforce_semantic_distance", { threshold: w2.distanceThreshold })
    ] })
  ] });
};
const StepThemes = () => {
  const w2 = useNewProjectWizard();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepHeader, { title: t("step_themes"), subtitle: t("step_themes_sub") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 text-xs", children: ["light", "dark", "auto"].map((k2) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => w2.toggleThemeFlag(k2), className: `px-3 py-1 rounded border ${w2.themes[k2] ? "border-amber-500 text-amber-400" : "border-neutral-700"}`, children: k2 }, k2)) })
  ] });
};
const StepNaming = () => {
  const w2 = useNewProjectWizard();
  usePaletteStore();
  const hasSuggestions = (w2.renameSuggestions || []).length > 0;
  const applySuggestion = (from, to) => {
    if (!w2.draft) return;
    const light = { ...w2.draft.light };
    const dark = { ...w2.draft.dark };
    if (light[from] && !light[to]) light[to] = light[from];
    if (dark[from] && !dark[to]) dark[to] = dark[from];
    w2.setDraft({ light, dark });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepHeader, { title: t("step_naming"), subtitle: t("step_naming_sub") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-1 text-xs max-w-xs", children: [
      t("token_prefix"),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: w2.tokenPrefix, onChange: (e2) => w2.setTokenPrefix(e2.target.value), className: "px-2 py-1 rounded bg-neutral-800 border border-neutral-700" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 text-xs", children: ["replace", "merge", "mergeWithPrefix"].map((m2) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => w2.setMergeStrategy(m2), className: `px-2 py-1 rounded border ${w2.mergeStrategy === m2 ? "border-amber-500 text-amber-400" : "border-neutral-700"}`, children: m2 }, m2)) }),
    w2.mergeStrategy === "mergeWithPrefix" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-1 text-xs max-w-xs", children: [
      t("prefix_merge"),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: w2.prefixOnMerge, onChange: (e2) => w2.setPrefixOnMerge(e2.target.value), className: "px-2 py-1 rounded bg-neutral-800 border border-neutral-700" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => w2.generateRenameSuggestions(), className: "px-2 py-1 rounded border border-neutral-700 bg-neutral-800 hover:border-neutral-500", children: "Générer suggestions" }),
      hasSuggestions && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-60", children: [
        w2.renameSuggestions.length,
        " suggestion(s)"
      ] })
    ] }),
    hasSuggestions && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 space-y-1 max-h-40 overflow-auto text-[11px] border border-neutral-800 rounded p-2 bg-neutral-900/40", children: w2.renameSuggestions.map((sug) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
        sug.from,
        " → ",
        sug.to
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-50 truncate", children: sug.reason }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => applySuggestion(sug.from, sug.to), className: "ml-auto px-1.5 py-0.5 rounded border border-neutral-700 hover:border-neutral-500", children: "Appliquer" })
    ] }, sug.from + "=>" + sug.to)) })
  ] });
};
const StepPreview = () => {
  const w2 = useNewProjectWizard();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepHeader, { title: t("step_preview"), subtitle: t("step_preview_sub") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 text-[10px]", children: Object.entries(w2.draft?.light || {}).slice(0, 30).map(([k2, v2]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 p-2 rounded border border-neutral-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 rounded border border-neutral-600", style: { background: v2 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate", title: k2, children: k2 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-neutral-400 truncate", children: v2 })
    ] }, k2)) })
  ] });
};
const StepSummary = () => {
  const w2 = useNewProjectWizard();
  const warnings = w2.draft?.meta?.warnings || [];
  const notes = w2.draft?.meta?.notes || [];
  const metrics = w2.draft?.meta?.metrics;
  const pal = usePaletteStore();
  const currentLight = pal.palettes.light;
  const draftLight = w2.draft?.light || {};
  const added = [];
  const replaced = [];
  const unchanged = [];
  Object.entries(draftLight).forEach(([k2, v2]) => {
    if (!(k2 in currentLight)) added.push(k2);
    else if (currentLight[k2] !== v2) replaced.push(k2);
    else unchanged.push(k2);
  });
  const [showDiff, setShowDiff] = React$2.useState(false);
  const bg2 = draftLight.background || "#ffffff";
  const tokensForNearest = Object.entries(draftLight).filter(([k2]) => !k2.endsWith("Fg") && k2 !== "background");
  const nearestCache = {};
  function nearest(name, value) {
    if (nearestCache[name]) return nearestCache[name];
    let bestKey = "", best = Infinity;
    for (const [k2, v2] of tokensForNearest) {
      if (k2 === name) continue;
      const d = deltaE(value, v2);
      if (d < best) {
        best = d;
        bestKey = k2;
      }
    }
    return nearestCache[name] = { key: bestKey, dE: best };
  }
  const renderList = (arr, labelKey, colorClass) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-semibold mb-1 ${colorClass}`, children: t(labelKey) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-0.5", children: [
      arr.slice(0, 60).map((k2) => {
        const v2 = draftLight[k2];
        if (!v2) return null;
        const cr = contrastRatio(v2, bg2).toFixed(2), near = nearest(k2, v2);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-[10px] truncate", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded border border-neutral-600", style: { background: v2 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", title: k2, children: k2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono opacity-70", children: v2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-60", children: [
            "CR ",
            cr
          ] }),
          near.key && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-50", children: [
            "ΔE ",
            near.dE.toFixed(1),
            "→",
            near.key
          ] })
        ] }, k2);
      }),
      arr.length > 60 && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "opacity-50", children: [
        "… ",
        arr.length - 60,
        " autres"
      ] })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepHeader, { title: t("step_summary"), subtitle: t("step_summary_sub") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs opacity-80", children: [
      t("generated_tokens"),
      ": ",
      Object.keys(w2.draft?.light || {}).length
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] flex gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowDiff((s) => !s), className: "px-2 py-0.5 rounded border border-neutral-700 bg-neutral-800 hover:border-neutral-500", children: showDiff ? t("hide_diff") : t("show_diff") }),
      showDiff && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-1.5 py-0.5 rounded bg-green-700/30 border border-green-600/40", children: [
          "Ajoutés ",
          added.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-1.5 py-0.5 rounded bg-amber-700/30 border border-amber-600/40", children: [
          "Remplacés ",
          replaced.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-1.5 py-0.5 rounded bg-neutral-700/30 border border-neutral-600/40", children: [
          "Inchangés ",
          unchanged.length
        ] })
      ] })
    ] }),
    showDiff && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-[10px] max-h-72 overflow-auto border border-neutral-800 rounded p-2 bg-neutral-900/40", children: [
      added.length > 0 && renderList(added, "added", "text-green-300"),
      replaced.length > 0 && renderList(replaced, "replaced", "text-amber-300"),
      unchanged.length > 0 && renderList(unchanged, "unchanged", "text-neutral-300")
    ] }),
    (warnings.length > 0 || notes.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-[11px]", children: [
      warnings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-red-700/60 bg-red-900/20 rounded p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-red-300 mb-1", children: t("warnings") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc pl-4 space-y-0.5", children: warnings.map((m2, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: m2 }, i)) })
      ] }),
      notes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-amber-600/50 bg-amber-900/10 rounded p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-amber-300 mb-1", children: t("notes") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc pl-4 space-y-0.5", children: notes.map((m2, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: m2 }, i)) })
      ] }),
      metrics && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-neutral-700/60 bg-neutral-800/30 rounded p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-neutral-200 mb-1", children: "Metrics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-2 gap-1 text-[10px]", children: Object.entries(metrics).map(([k2, v2]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70 truncate", children: k2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: v2.toFixed(2) })
        ] }, k2)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap text-[11px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mr-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70", children: "Exports:" }),
        ["css", "tailwind", "json"].map((k2) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => w2.toggleExportPreset(k2), className: `px-2 py-0.5 rounded border ${w2.exportPresets?.[k2] ? "border-amber-500 text-amber-400" : "border-neutral-700"}`, children: k2 }, k2))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => w2.apply(true), className: "px-3 py-1 rounded bg-neutral-800 border border-neutral-700 hover:border-neutral-500", children: t("apply_sandbox") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => w2.apply(false), className: "px-3 py-1 rounded bg-green-600 hover:bg-green-500 text-white", children: t("apply_direct") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => w2.regenDraft(), className: "px-3 py-1 rounded bg-neutral-800 border border-neutral-700 hover:border-neutral-500", children: t("regenerate") })
    ] })
  ] });
};
const StepSimulation = () => {
  const w2 = useNewProjectWizard();
  const modes2 = [
    { key: "protanopia", label: "Protanopia" },
    { key: "deuteranopia", label: "Deuteranopia" },
    { key: "tritanopia", label: "Tritanopia" }
  ];
  const light = w2.draft?.light || {};
  const sampleKeys = Object.keys(light).filter((k2) => !k2.endsWith("Fg")).slice(0, 24);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepHeader, { title: t("step_preview"), subtitle: t("step_preview_sub") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 flex-wrap text-xs", children: modes2.map((m2) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => w2.toggleSimulation(m2.key), className: `px-2 py-1 rounded border ${w2.cvdSimulations?.[m2.key] ? "border-amber-500 text-amber-400" : "border-neutral-700"}`, children: m2.label }, m2.key)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-4 text-[10px]", children: modes2.filter((m2) => w2.cvdSimulations?.[m2.key]).map((m2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-neutral-300", children: m2.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: sampleKeys.map((k2) => {
        const orig = light[k2];
        const sim = simulateCvd(orig, m2.key);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 p-1 rounded border border-neutral-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 rounded", style: { background: sim } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate", title: k2, children: k2 })
        ] }, k2 + m2.key);
      }) })
    ] }, m2.key)) }),
    !modes2.some((m2) => w2.cvdSimulations?.[m2.key]) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] opacity-60", children: "Sélectionnez au moins un mode pour voir la simulation." })
  ] });
};
function get(p2, key, fallback) {
  return p2[key] || fallback;
}
const StepComponentsPreview = () => {
  const w2 = useNewProjectWizard();
  const pal = w2.draft?.light || {};
  const bg2 = get(pal, "background", "#f7f7f7");
  const surface = get(pal, "surface", bg2);
  const text = get(pal, "text", "#111111");
  const primary = get(pal, "primary", "#3366ff");
  const primaryFg = get(pal, "primaryFg", "#ffffff");
  const success = get(pal, "success", "#22c55e");
  const danger = get(pal, "danger", "#ef4444");
  const border = get(pal, "border", "#cccccc");
  const info = get(pal, "info", "#3b82f6");
  const radius = 4;
  const cardStyle = { background: surface, border: `1px solid ${border}`, borderRadius: radius, padding: "12px", display: "flex", flexDirection: "column", gap: 8 };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepHeader, { title: "Components", subtitle: "Aperçu micro UI avec tokens actuels (light)." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", style: { background: bg2, padding: 12, borderRadius: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold opacity-70", children: "Boutons" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: { background: primary, color: primaryFg, borderRadius: radius, padding: "6px 12px", fontSize: 12, border: "none" }, children: "Primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: { background: success, color: get(pal, "successFg", "#052e16"), borderRadius: radius, padding: "6px 12px", fontSize: 12, border: "none" }, children: "Success" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: { background: danger, color: get(pal, "dangerFg", "#450a0a"), borderRadius: radius, padding: "6px 12px", fontSize: 12, border: "none" }, children: "Danger" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: { background: "transparent", color: primary, border: `1px solid ${primary}`, borderRadius: radius, padding: "6px 12px", fontSize: 12 }, children: "Outline" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold opacity-70", children: "Alertes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 text-[11px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: get(pal, "successSubtle", "#dcfce7"), color: get(pal, "successFg", "#052e16"), border: `1px solid ${success}`, borderRadius: radius, padding: "6px 8px" }, children: "Succès: opération complétée." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: get(pal, "dangerSubtle", "#fee2e2"), color: get(pal, "dangerFg", "#450a0a"), border: `1px solid ${danger}`, borderRadius: radius, padding: "6px 8px" }, children: "Erreur: action échouée." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: get(pal, "warningSubtle", "#fef9c3"), color: get(pal, "warningFg", "#442a03"), border: `1px solid ${get(pal, "warning", "#f59e0b")}`, borderRadius: radius, padding: "6px 8px" }, children: "Avertissement: vérifiez vos paramètres." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: get(pal, "infoSubtle", "#e0f2fe"), color: get(pal, "infoFg", "#082f49"), border: `1px solid ${info}`, borderRadius: radius, padding: "6px 8px" }, children: "Info: aperçu informatif." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold opacity-70", children: "Badges" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap text-[10px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { background: primary, color: primaryFg, padding: "3px 8px", borderRadius: 999 }, children: "Primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { background: success, color: get(pal, "successFg", "#052e16"), padding: "3px 8px", borderRadius: 999 }, children: "Success" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { background: danger, color: get(pal, "dangerFg", "#450a0a"), padding: "3px 8px", borderRadius: 999 }, children: "Danger" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { background: info, color: get(pal, "infoFg", "#082f49"), padding: "3px 8px", borderRadius: 999 }, children: "Info" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold opacity-70", children: "Formulaire" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { display: "flex", flexDirection: "column", gap: 4, fontSize: 12 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { opacity: 0.7 }, children: "Label" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Saisir…", style: { background: surface, color: text, border: `1px solid ${border}`, padding: "6px 8px", borderRadius: radius, fontSize: 12 } })
        ] })
      ] })
    ] })
  ] });
};
const NewProjectWizard = () => {
  const wizard = useNewProjectWizard();
  const { step } = wizard;
  const regenerate = () => {
    const adj = wizard.getAdjustedParams ? wizard.getAdjustedParams() : { saturation: wizard.saturation, internalContrast: wizard.internalContrast };
    const draft = generatePalette({
      seeds: wizard.seeds,
      mode: wizard.mode,
      saturation: adj.saturation,
      internalContrast: adj.internalContrast,
      neutralLevels: wizard.neutralLevels,
      includeSemantic: wizard.includeSemantic,
      variantScope: wizard.variantScope,
      minContrast: wizard.minContrast,
      generateNeutrals: wizard.generateNeutrals,
      enforceSemanticDistance: wizard.enforceSemanticDistance,
      distanceThreshold: wizard.distanceThreshold,
      baseKeywords: wizard.keywords,
      profile: wizard.profile
    });
    wizard.setDraft(draft);
  };
  React$2.useEffect(() => {
    if (!wizard.draft || Object.keys(wizard.draft.light).length === 0) regenerate();
  }, []);
  const stepRender = {
    context: /* @__PURE__ */ jsxRuntimeExports.jsx(StepContext, {}),
    seeds: /* @__PURE__ */ jsxRuntimeExports.jsx(StepSeeds, {}),
    options: /* @__PURE__ */ jsxRuntimeExports.jsx(StepOptions, {}),
    accessibility: /* @__PURE__ */ jsxRuntimeExports.jsx(StepAccessibility, {}),
    themes: /* @__PURE__ */ jsxRuntimeExports.jsx(StepThemes, {}),
    naming: /* @__PURE__ */ jsxRuntimeExports.jsx(StepNaming, {}),
    semantics: /* @__PURE__ */ jsxRuntimeExports.jsx(StepOptions, {}),
    simulation: /* @__PURE__ */ jsxRuntimeExports.jsx(StepSimulation, {}),
    components: /* @__PURE__ */ jsxRuntimeExports.jsx(StepComponentsPreview, {}),
    preview: /* @__PURE__ */ jsxRuntimeExports.jsx(StepPreview, {}),
    summary: /* @__PURE__ */ jsxRuntimeExports.jsx(StepSummary, {})
  };
  const minimalHidden = /* @__PURE__ */ new Set(["accessibility", "simulation", "semantics"]);
  const visibleSteps = wizard.minimalMode ? wizard.steps.filter((s) => !minimalHidden.has(s)) : wizard.steps;
  const dialogRef = React$2.useRef(null);
  useFocusTrap(dialogRef, wizard.open, () => wizard.closeWizard());
  const warnings = wizard.draft?.meta?.warnings || [];
  return wizard.open ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex", role: "dialog", "aria-modal": "true", "aria-label": t("wizard_title"), "aria-describedby": "wizard-steps", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-sm", onClick: () => wizard.closeWizard() }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: dialogRef, className: "relative w-[880px] max-w-full mx-auto my-8 bg-neutral-950/90 border border-neutral-800 rounded-lg shadow-xl flex flex-col overflow-hidden", tabIndex: -1, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-neutral-800 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-semibold text-sm", children: t("wizard_title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "wizard-steps", className: "flex gap-1 flex-wrap text-[10px]", children: visibleSteps.map((s) => {
          const current = wizard.step === s;
          let badge2 = null;
          if (warnings.length && (s === "accessibility" || s === "summary")) badge2 = String(warnings.length);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              "aria-current": current ? "step" : void 0,
              onClick: () => wizard.go(s),
              className: `relative px-2 py-1 rounded border ${current ? "border-amber-500 text-amber-400" : "border-neutral-700 hover:border-neutral-500"}`,
              children: [
                s,
                badge2 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 bg-red-600 text-[9px] leading-none px-1 py-[2px] rounded-full text-white", children: badge2 })
              ]
            },
            s
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => wizard.toggleMinimalMode(), className: "px-2 py-1 rounded text-[11px] bg-neutral-800 border border-neutral-700 hover:border-neutral-500", children: wizard.minimalMode ? "Mode Complet" : "Mode Minimal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => regenerate(), className: "px-2 py-1 rounded text-[11px] bg-neutral-800 border border-neutral-700 hover:border-neutral-500", children: t("regenerate") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => wizard.closeWizard(), className: "px-2 py-1 rounded text-[11px] bg-neutral-800 border border-neutral-700 hover:border-neutral-500", children: t("close") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto p-6 space-y-6 text-neutral-200 text-sm", children: stepRender[step] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-t border-neutral-800 flex items-center gap-2 text-xs bg-neutral-900/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => wizard.prev(), disabled: wizard.step === visibleSteps[0], className: "px-3 py-1 rounded bg-neutral-800 border border-neutral-700 disabled:opacity-40", children: t("previous") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => wizard.next(), disabled: wizard.step === visibleSteps[visibleSteps.length - 1], className: "px-3 py-1 rounded bg-neutral-800 border border-neutral-700 disabled:opacity-40", children: t("next") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => wizard.undo(), disabled: !wizard.history.length, className: "px-2 py-1 rounded bg-neutral-800 border border-neutral-700 disabled:opacity-30", children: t("undo") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => wizard.redo(), disabled: !wizard.future.length, className: "px-2 py-1 rounded bg-neutral-800 border border-neutral-700 disabled:opacity-30", children: t("redo") })
        ] })
      ] })
    ] })
  ] }) : null;
};
const App = () => {
  const [tab, setTab] = reactExports.useState("palette");
  const theme = usePaletteStore((s) => s.theme);
  const themeMode = usePaletteStore((s) => s.themeMode);
  const setTheme = usePaletteStore((s) => s.setTheme);
  const setThemeMode = usePaletteStore((s) => s.setThemeMode);
  const palette = usePaletteStore((s) => s.palette);
  const effectivePalette = usePaletteStore((s) => s.effectivePalette?.());
  const sandboxActive = usePaletteStore((s) => s.sandboxActive);
  usePaletteStore((s) => s.setPalette);
  const palettes = usePaletteStore((s) => s.palettes);
  const undo = usePaletteStore((s) => s.undo);
  const redo = usePaletteStore((s) => s.redo);
  const focusMode = usePaletteStore((s) => s.focusMode);
  const setFocusMode = usePaletteStore((s) => s.setFocusMode);
  const cvdMode = usePaletteStore((s) => s.cvdMode);
  const onboardingVisible = useUIStore((s) => s.onboardingVisible);
  const hydrateCompleted = useUIStore((s) => s.hydrateCompleted);
  const showOnboarding = useUIStore((s) => s.showOnboarding);
  const openWizard = useNewProjectWizard((s) => s.openWizard);
  reactExports.useMemo(() => {
    const cls = theme === "dark" ? "dark" : "light";
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(cls);
  }, [theme]);
  reactExports.useEffect(() => {
    const root2 = document.documentElement;
    const active = effectivePalette || palette;
    const setRgbVar = (key, hex2) => {
      let c4 = hex2 || "#000000";
      if (cvdMode && cvdMode !== "none") {
        try {
          c4 = simulateCvd(c4, cvdMode);
        } catch {
        }
      }
      const { r: r2, g, b } = hexToRgb(c4);
      root2.style.setProperty(key, `${r2} ${g} ${b}`);
    };
    setRgbVar("--color-primary", active.primary);
    setRgbVar("--color-secondary", active.secondary);
    setRgbVar("--color-accent", active.accent);
    setRgbVar("--color-background", active.background);
    setRgbVar("--color-surface", active.surface);
    setRgbVar("--color-foreground", active.text);
    setRgbVar("--color-border", active.border);
    setRgbVar("--color-success", active.success);
    setRgbVar("--color-danger", active.danger);
    setRgbVar("--color-warning", active.warning);
    setRgbVar("--color-info", active.info);
  }, [palette, effectivePalette, cvdMode]);
  reactExports.useEffect(() => {
    (async () => {
      const savedPalettes = await window.crimson.storeGet("palettes");
      const savedTheme = await window.crimson.storeGet("theme");
      const savedLegacy = await window.crimson.storeGet("palette");
      if (savedPalettes && savedPalettes.light && savedPalettes.dark) {
        usePaletteStore.setState({ palettes: savedPalettes, theme: savedTheme || "dark", palette: savedPalettes[savedTheme || "dark"] });
      } else if (savedLegacy && typeof savedLegacy === "object") {
        usePaletteStore.setState({ palettes: { light: savedLegacy, dark: savedLegacy }, theme: "dark", palette: savedLegacy });
        await window.crimson.storeSet("palettes", { light: savedLegacy, dark: savedLegacy });
        await window.crimson.storeSet("theme", "dark");
      }
    })();
  }, []);
  reactExports.useEffect(() => {
    window.crimson.storeSet("palettes", palettes);
  }, [palettes]);
  reactExports.useEffect(() => {
    window.crimson.storeSet("theme", theme);
    window.crimson.storeSet("themeMode", themeMode || "dark");
  }, [theme, themeMode]);
  reactExports.useEffect(() => {
    const handler = (e2) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const mod = isMac ? e2.metaKey : e2.ctrlKey;
      if (!mod) return;
      if (e2.key.toLowerCase() === "z" && !e2.shiftKey && !e2.altKey) {
        e2.preventDefault();
        undo();
        return;
      }
      if (e2.key.toLowerCase() === "y" || e2.key.toLowerCase() === "z" && e2.shiftKey) {
        e2.preventDefault();
        redo();
        return;
      }
      if (e2.key.toLowerCase() === "t") {
        e2.preventDefault();
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        return;
      }
      if (e2.key.toLowerCase() === "k") {
        e2.preventDefault();
        setFocusMode?.(!focusMode);
        return;
      }
      if (e2.key.toLowerCase() === "f") {
        const el2 = document.getElementById("palette-search");
        if (el2) {
          e2.preventDefault();
          el2.focus();
          el2.select?.();
        }
        return;
      }
      if (e2.key.toLowerCase() === "e") {
        if (tab !== "export") {
          e2.preventDefault();
          setTab("export");
        }
        return;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo, theme, setTheme, tab]);
  reactExports.useEffect(() => {
    (async () => {
      const savedMode = await window.crimson.storeGet("themeMode");
      const sys = await window.crimson.systemTheme?.();
      if (savedMode === "auto") {
        setThemeMode?.("auto", sys);
      } else if (savedMode === "light" || savedMode === "dark") {
        setThemeMode?.(savedMode);
      }
      window.crimson.onSystemTheme?.((t2) => {
        if (usePaletteStore.getState().themeMode === "auto") {
          setThemeMode?.("auto", t2);
        }
      });
    })();
  }, []);
  reactExports.useEffect(() => {
    hydrateCompleted();
  }, [hydrateCompleted]);
  reactExports.useEffect(() => {
    window.crimson.onNewProject?.(async () => {
      openWizard();
      setTab("palette");
    });
  }, [openWizard]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "bg-surface/60 backdrop-blur-md px-4 py-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-semibold text-xl title-gradient flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/icon.png", alt: "Crimson", className: "w-6 h-6" }),
        "Crimson"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        sandboxActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-1 rounded bg-warningSubtle text-warningFg border border-warning/40 animate-pulse", title: "Sandbox actif – modifications non appliquées", children: "Sandbox" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", title: "Aide / Revoir l'onboarding", onClick: () => showOnboarding(), children: "?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex rounded overflow-hidden", role: "group", "aria-label": "Choix du thème", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `btn ${themeMode === "light" ? "btn-primary" : ""}`,
              "aria-pressed": themeMode === "light",
              onClick: () => setThemeMode?.("light"),
              children: "Light"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `btn ${themeMode === "dark" ? "btn-primary" : ""}`,
              "aria-pressed": themeMode === "dark",
              onClick: () => setThemeMode?.("dark"),
              children: "Dark"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `btn ${themeMode === "auto" ? "btn-primary" : ""}`,
              "aria-pressed": themeMode === "auto",
              onClick: () => setThemeMode?.("auto"),
              children: "Auto"
            }
          )
        ] })
      ] })
    ] }),
    !focusMode && /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "bg-surface/60 backdrop-blur-md px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "flex gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `btn underline-animated ${tab === "palette" ? "active" : ""}`, onClick: () => setTab("palette"), children: "Palette" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `btn underline-animated ${tab === "preview" ? "active" : ""}`, onClick: () => setTab("preview"), children: "Preview" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `btn underline-animated ${tab === "export" ? "active" : ""}`, onClick: () => setTab("export"), children: "Export" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `btn underline-animated ${tab === "a11y" ? "active" : ""}`, onClick: () => setTab("a11y"), children: "Accessibilité" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `btn underline-animated ${tab === "project" ? "active" : ""}`, onClick: () => setTab("project"), children: "Projet" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-4 fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ErrorBoundary, { children: [
      tab === "palette" && /* @__PURE__ */ jsxRuntimeExports.jsx(PalettePanel, {}),
      tab === "preview" && /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewPanel, {}),
      tab === "export" && /* @__PURE__ */ jsxRuntimeExports.jsx(ExportPanel, {}),
      tab === "a11y" && /* @__PURE__ */ jsxRuntimeExports.jsx(A11yPanel, {}),
      tab === "project" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectPanel, {})
    ] }) }),
    onboardingVisible && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "onboarding-root" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OnboardingOverlay, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewProjectWizard, {})
  ] });
};
const root = createRoot(document.getElementById("root"));
root.render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
