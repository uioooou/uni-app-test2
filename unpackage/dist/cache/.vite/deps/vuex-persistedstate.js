// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/vuex-persistedstate/dist/vuex-persistedstate.es.js
var r = function(r2) {
  return /* @__PURE__ */ function(r3) {
    return !!r3 && "object" == typeof r3;
  }(r2) && !function(r3) {
    var t2 = Object.prototype.toString.call(r3);
    return "[object RegExp]" === t2 || "[object Date]" === t2 || function(r4) {
      return r4.$$typeof === e;
    }(r3);
  }(r2);
};
var e = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;
function t(r2, e2) {
  return false !== e2.clone && e2.isMergeableObject(r2) ? u(Array.isArray(r2) ? [] : {}, r2, e2) : r2;
}
function n(r2, e2, n2) {
  return r2.concat(e2).map(function(r3) {
    return t(r3, n2);
  });
}
function o(r2) {
  return Object.keys(r2).concat(function(r3) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(r3).filter(function(e2) {
      return r3.propertyIsEnumerable(e2);
    }) : [];
  }(r2));
}
function c(r2, e2) {
  try {
    return e2 in r2;
  } catch (r3) {
    return false;
  }
}
function u(e2, i2, a2) {
  (a2 = a2 || {}).arrayMerge = a2.arrayMerge || n, a2.isMergeableObject = a2.isMergeableObject || r, a2.cloneUnlessOtherwiseSpecified = t;
  var f = Array.isArray(i2);
  return f === Array.isArray(e2) ? f ? a2.arrayMerge(e2, i2, a2) : function(r2, e3, n2) {
    var i3 = {};
    return n2.isMergeableObject(r2) && o(r2).forEach(function(e4) {
      i3[e4] = t(r2[e4], n2);
    }), o(e3).forEach(function(o2) {
      (function(r3, e4) {
        return c(r3, e4) && !(Object.hasOwnProperty.call(r3, e4) && Object.propertyIsEnumerable.call(r3, e4));
      })(r2, o2) || (i3[o2] = c(r2, o2) && n2.isMergeableObject(e3[o2]) ? function(r3, e4) {
        if (!e4.customMerge)
          return u;
        var t2 = e4.customMerge(r3);
        return "function" == typeof t2 ? t2 : u;
      }(o2, n2)(r2[o2], e3[o2], n2) : t(e3[o2], n2));
    }), i3;
  }(e2, i2, a2) : t(i2, a2);
}
u.all = function(r2, e2) {
  if (!Array.isArray(r2))
    throw new Error("first argument should be an array");
  return r2.reduce(function(r3, t2) {
    return u(r3, t2, e2);
  }, {});
};
var i = u;
function a(r2) {
  var e2 = (r2 = r2 || {}).storage || window && window.localStorage, t2 = r2.key || "vuex";
  function n2(r3, e3) {
    var t3 = e3.getItem(r3);
    try {
      return "string" == typeof t3 ? JSON.parse(t3) : "object" == typeof t3 ? t3 : void 0;
    } catch (r4) {
    }
  }
  function o2() {
    return true;
  }
  function c2(r3, e3, t3) {
    return t3.setItem(r3, JSON.stringify(e3));
  }
  function u2(r3, e3) {
    return Array.isArray(e3) ? e3.reduce(function(e4, t3) {
      return function(r4, e5, t4, n4) {
        return !/^(__proto__|constructor|prototype)$/.test(e5) && ((e5 = e5.split ? e5.split(".") : e5.slice(0)).slice(0, -1).reduce(function(r5, e6) {
          return r5[e6] = r5[e6] || {};
        }, r4)[e5.pop()] = t4), r4;
      }(e4, t3, (n3 = r3, void 0 === (n3 = ((o3 = t3).split ? o3.split(".") : o3).reduce(function(r4, e5) {
        return r4 && r4[e5];
      }, n3)) ? void 0 : n3));
      var n3, o3;
    }, {}) : r3;
  }
  function a2(r3) {
    return function(e3) {
      return r3.subscribe(e3);
    };
  }
  (r2.assertStorage || function() {
    e2.setItem("@@", 1), e2.removeItem("@@");
  })(e2);
  var f, s = function() {
    return (r2.getState || n2)(t2, e2);
  };
  return r2.fetchBeforeUse && (f = s()), function(n3) {
    r2.fetchBeforeUse || (f = s()), "object" == typeof f && null !== f && (n3.replaceState(r2.overwrite ? f : i(n3.state, f, { arrayMerge: r2.arrayMerger || function(r3, e3) {
      return e3;
    }, clone: false })), (r2.rehydrated || function() {
    })(n3)), (r2.subscriber || a2)(n3)(function(n4, i2) {
      (r2.filter || o2)(n4) && (r2.setState || c2)(t2, (r2.reducer || u2)(i2, r2.paths), e2);
    });
  };
}
var vuex_persistedstate_es_default = a;
export {
  vuex_persistedstate_es_default as default
};
//# sourceMappingURL=vuex-persistedstate.js.map
