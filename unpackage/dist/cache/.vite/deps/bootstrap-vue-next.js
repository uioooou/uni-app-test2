// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/composables/useBreadcrumb/index.mjs
import { inject } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/keys-CsqIkltC.mjs
var withBvnPrefix = (value, suffix = "") => {
  const suffixWithTrail = `${suffix}___`;
  return `___BVN__ID__${value}__${suffix ? suffixWithTrail : ""}`;
};
var createBvnInjectionKey = (name) => withBvnPrefix(name);
var createBvnPluginInjectionKey = (name) => withBvnPrefix(`${name}__plugin`);
var carouselInjectionKey = createBvnInjectionKey("carousel");
var tabsInjectionKey = createBvnInjectionKey("tabs");
var progressInjectionKey = createBvnInjectionKey("progress");
var listGroupInjectionKey = createBvnInjectionKey("listGroup");
var avatarGroupInjectionKey = createBvnInjectionKey("avatarGroup");
var accordionInjectionKey = createBvnInjectionKey("accordion");
var checkboxGroupKey = createBvnInjectionKey("checkboxGroup");
var radioGroupKey = createBvnInjectionKey("radioGroup");
var collapseInjectionKey = createBvnInjectionKey("collapse");
var globalCollapseStorageInjectionKey = createBvnPluginInjectionKey("globalCollapseStorage");
var dropdownInjectionKey = createBvnInjectionKey("dropdown");
var navbarInjectionKey = createBvnInjectionKey("navbar");
var rtlPluginKey = createBvnPluginInjectionKey("rtl");
var breadcrumbPluginKey = createBvnPluginInjectionKey("breadcrumbPlugin");
var modalManagerPluginKey = createBvnPluginInjectionKey("modalManager");
var defaultsKey = createBvnPluginInjectionKey("defaults");
var inputGroupKey = createBvnInjectionKey("inputGroup");
var buttonGroupKey = createBvnInjectionKey("buttonGroup");
var toastPluginKey = createBvnPluginInjectionKey("toast");
var modalControllerPluginKey = createBvnPluginInjectionKey("modalController");
var popoverPluginKey = createBvnPluginInjectionKey("popover");
var formGroupPluginKey = createBvnInjectionKey("formGroupPlugin");

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/composables/useBreadcrumb/index.mjs
var useBreadcrumb = () => ({ ...inject(breadcrumbPluginKey) });

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/index-D3jGjWWk.mjs
import { ref, isRef, watch, computed, getCurrentScope, onScopeDispose, effectScope, unref, readonly, toRef as toRef$1, customRef, onMounted, nextTick, getCurrentInstance } from "vue";
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function createSharedComposable(composable) {
  let subscribers = 0;
  let state;
  let scope;
  const dispose = () => {
    subscribers -= 1;
    if (scope && subscribers <= 0) {
      scope.stop();
      state = void 0;
      scope = void 0;
    }
  };
  return (...args) => {
    subscribers += 1;
    if (!scope) {
      scope = effectScope(true);
      state = scope.run(() => composable(...args));
    }
    tryOnScopeDispose(dispose);
    return state;
  };
}
function makeDestructurable(obj, arr) {
  if (typeof Symbol !== "undefined") {
    const clone = { ...obj };
    Object.defineProperty(clone, Symbol.iterator, {
      enumerable: false,
      value() {
        let index8 = 0;
        return {
          next: () => ({
            value: arr[index8++],
            done: index8 > arr.length
          })
        };
      }
    });
    return clone;
  } else {
    return Object.assign([...arr], obj);
  }
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var notNullish = (val) => val != null;
var toString = Object.prototype.toString;
var isObject = (val) => toString.call(val) === "[object Object]";
var timestamp = () => +Date.now();
var noop = () => {
};
var isIOS = getIsIOS();
function getIsIOS() {
  var _a, _b;
  return isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
var bypassFilter = (invoke) => {
  return invoke();
};
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = (timer2) => {
    clearTimeout(timer2);
    lastRejector();
    lastRejector = noop;
  };
  const filter = (invoke) => {
    const duration = toValue(ms);
    const maxDuration = toValue(options.maxWait);
    if (timer)
      _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = null;
      }
      return Promise.resolve(invoke());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            _clearTimeout(timer);
          maxTimer = null;
          resolve(invoke());
        }, maxDuration);
      }
      timer = setTimeout(() => {
        if (maxTimer)
          _clearTimeout(maxTimer);
        maxTimer = null;
        resolve(invoke());
      }, duration);
    });
  };
  return filter;
}
function throttleFilter(...args) {
  let lastExec = 0;
  let timer;
  let isLeading = true;
  let lastRejector = noop;
  let lastValue;
  let ms;
  let trailing;
  let leading;
  let rejectOnCancel;
  if (!isRef(args[0]) && typeof args[0] === "object")
    ({ delay: ms, trailing = true, leading = true, rejectOnCancel = false } = args[0]);
  else
    [ms, trailing = true, leading = true, rejectOnCancel = false] = args;
  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
      lastRejector();
      lastRejector = noop;
    }
  };
  const filter = (_invoke) => {
    const duration = toValue(ms);
    const elapsed = Date.now() - lastExec;
    const invoke = () => {
      return lastValue = _invoke();
    };
    clear();
    if (duration <= 0) {
      lastExec = Date.now();
      return invoke();
    }
    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now();
      invoke();
    } else if (trailing) {
      lastValue = new Promise((resolve, reject) => {
        lastRejector = rejectOnCancel ? reject : resolve;
        timer = setTimeout(() => {
          lastExec = Date.now();
          isLeading = true;
          resolve(invoke());
          clear();
        }, Math.max(0, duration - elapsed));
      });
    }
    if (!leading && !timer)
      timer = setTimeout(() => isLeading = true, duration);
    isLeading = false;
    return lastValue;
  };
  return filter;
}
function pausableFilter(extendFilter = bypassFilter) {
  const isActive = ref(true);
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter2 = (...args) => {
    if (isActive.value)
      extendFilter(...args);
  };
  return { isActive: readonly(isActive), pause, resume, eventFilter: eventFilter2 };
}
function cacheStringFunction(fn) {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
function increaseWithUnit(target, delta) {
  var _a;
  if (typeof target === "number")
    return target + delta;
  const value = ((_a = target.match(/^-?\d+\.?\d*/)) == null ? void 0 : _a[0]) || "";
  const unit = target.slice(value.length);
  const result = Number.parseFloat(value) + delta;
  if (Number.isNaN(result))
    return target;
  return result + unit;
}
function getLifeCycleTarget(target) {
  return getCurrentInstance();
}
function toRef(...args) {
  if (args.length !== 1)
    return toRef$1(...args);
  const r = args[0];
  return typeof r === "function" ? readonly(customRef(() => ({ get: r, set: noop }))) : ref(r);
}
function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(
    debounceFilter(ms, options),
    fn
  );
}
function useThrottleFn(fn, ms = 200, trailing = false, leading = true, rejectOnCancel = false) {
  return createFilterWrapper(
    throttleFilter(ms, trailing, leading, rejectOnCancel),
    fn
  );
}
function watchWithFilter(source, cb, options = {}) {
  const {
    eventFilter: eventFilter2 = bypassFilter,
    ...watchOptions
  } = options;
  return watch(
    source,
    createFilterWrapper(
      eventFilter2,
      cb
    ),
    watchOptions
  );
}
function watchPausable(source, cb, options = {}) {
  const {
    eventFilter: filter,
    ...watchOptions
  } = options;
  const { eventFilter: eventFilter2, pause, resume, isActive } = pausableFilter(filter);
  const stop = watchWithFilter(
    source,
    cb,
    {
      ...watchOptions,
      eventFilter: eventFilter2
    }
  );
  return { stop, pause, resume, isActive };
}
function syncRef(left, right, ...[options]) {
  const {
    flush = "sync",
    deep = false,
    immediate = true,
    direction = "both",
    transform = {}
  } = options || {};
  const watchers = [];
  const transformLTR = "ltr" in transform && transform.ltr || ((v) => v);
  const transformRTL = "rtl" in transform && transform.rtl || ((v) => v);
  if (direction === "both" || direction === "ltr") {
    watchers.push(watchPausable(
      left,
      (newValue) => {
        watchers.forEach((w) => w.pause());
        right.value = transformLTR(newValue);
        watchers.forEach((w) => w.resume());
      },
      { flush, deep, immediate }
    ));
  }
  if (direction === "both" || direction === "rtl") {
    watchers.push(watchPausable(
      right,
      (newValue) => {
        watchers.forEach((w) => w.pause());
        left.value = transformRTL(newValue);
        watchers.forEach((w) => w.resume());
      },
      { flush, deep, immediate }
    ));
  }
  const stop = () => {
    watchers.forEach((w) => w.stop());
  };
  return stop;
}
function tryOnMounted(fn, sync = true, target) {
  const instance = getLifeCycleTarget();
  if (instance)
    onMounted(fn, target);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function useIntervalFn(cb, interval = 1e3, options = {}) {
  const {
    immediate = true,
    immediateCallback = false
  } = options;
  let timer = null;
  const isActive = ref(false);
  function clean() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  function pause() {
    isActive.value = false;
    clean();
  }
  function resume() {
    const intervalValue = toValue(interval);
    if (intervalValue <= 0)
      return;
    isActive.value = true;
    if (immediateCallback)
      cb();
    clean();
    if (isActive.value)
      timer = setInterval(cb, intervalValue);
  }
  if (immediate && isClient)
    resume();
  if (isRef(interval) || typeof interval === "function") {
    const stopWatch = watch(interval, () => {
      if (isActive.value && isClient)
        resume();
    });
    tryOnScopeDispose(stopWatch);
  }
  tryOnScopeDispose(pause);
  return {
    isActive,
    pause,
    resume
  };
}
function useToNumber(value, options = {}) {
  const {
    method = "parseFloat",
    radix,
    nanToZero
  } = options;
  return computed(() => {
    let resolved = toValue(value);
    if (typeof resolved === "string")
      resolved = Number[method](resolved, radix);
    if (nanToZero && Number.isNaN(resolved))
      resolved = 0;
    return resolved;
  });
}

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/index-Cr5Qd2ql.mjs
import { shallowRef, computed as computed2, ref as ref2, watch as watch2, reactive, watchEffect, defineComponent, readonly as readonly2, nextTick as nextTick2, getCurrentInstance as getCurrentInstance2, onMounted as onMounted2 } from "vue";
function createReusableTemplate(options = {}) {
  const {
    inheritAttrs = true
  } = options;
  const render2 = shallowRef();
  const define = defineComponent({
    setup(_, { slots }) {
      return () => {
        render2.value = slots.default;
      };
    }
  });
  const reuse = defineComponent({
    inheritAttrs,
    setup(_, { attrs, slots }) {
      return () => {
        var _a;
        if (!render2.value && true)
          throw new Error("[VueUse] Failed to find the definition of reusable template");
        const vnode = (_a = render2.value) == null ? void 0 : _a.call(render2, { ...keysToCamelKebabCase(attrs), $slots: slots });
        return inheritAttrs && (vnode == null ? void 0 : vnode.length) === 1 ? vnode[0] : vnode;
      };
    }
  });
  return makeDestructurable(
    { define, reuse },
    [define, reuse]
  );
}
function keysToCamelKebabCase(obj) {
  const newObj = {};
  for (const key in obj)
    newObj[camelize(key)] = obj[key];
  return newObj;
}
var defaultWindow = isClient ? window : void 0;
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
function useEventListener(...args) {
  let target;
  let events;
  let listeners;
  let options;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events))
    events = [events];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch2(
    () => [unrefElement(target), toValue(options)],
    ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      const optionsClone = isObject(options2) ? { ...options2 } : options2;
      cleanups.push(
        ...events.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, optionsClone));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
var _iOSWorkaround = false;
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore = [], capture = true, detectIframe = false } = options;
  if (!window2)
    return noop;
  if (isIOS && !_iOSWorkaround) {
    _iOSWorkaround = true;
    Array.from(window2.document.body.children).forEach((el) => el.addEventListener("click", noop));
    window2.document.documentElement.addEventListener("click", noop);
  }
  let shouldListen = true;
  const shouldIgnore = (event) => {
    return toValue(ignore).some((target2) => {
      if (typeof target2 === "string") {
        return Array.from(window2.document.querySelectorAll(target2)).some((el) => el === event.target || event.composedPath().includes(el));
      } else {
        const el = unrefElement(target2);
        return el && (event.target === el || event.composedPath().includes(el));
      }
    });
  };
  const listener = (event) => {
    const el = unrefElement(target);
    if (!el || el === event.target || event.composedPath().includes(el))
      return;
    if (event.detail === 0)
      shouldListen = !shouldIgnore(event);
    if (!shouldListen) {
      shouldListen = true;
      return;
    }
    handler(event);
  };
  let isProcessingClick = false;
  const cleanup = [
    useEventListener(window2, "click", (event) => {
      if (!isProcessingClick) {
        isProcessingClick = true;
        setTimeout(() => {
          isProcessingClick = false;
        }, 0);
        listener(event);
      }
    }, { passive: true, capture }),
    useEventListener(window2, "pointerdown", (e) => {
      const el = unrefElement(target);
      shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el));
    }, { passive: true }),
    detectIframe && useEventListener(window2, "blur", (event) => {
      setTimeout(() => {
        var _a;
        const el = unrefElement(target);
        if (((_a = window2.document.activeElement) == null ? void 0 : _a.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(window2.document.activeElement))) {
          handler(event);
        }
      }, 0);
    })
  ].filter(Boolean);
  const stop = () => cleanup.forEach((fn) => fn());
  return stop;
}
function createKeyPredicate(keyFilter) {
  if (typeof keyFilter === "function")
    return keyFilter;
  else if (typeof keyFilter === "string")
    return (event) => event.key === keyFilter;
  else if (Array.isArray(keyFilter))
    return (event) => keyFilter.includes(event.key);
  return () => true;
}
function onKeyStroke(...args) {
  let key;
  let handler;
  let options = {};
  if (args.length === 3) {
    key = args[0];
    handler = args[1];
    options = args[2];
  } else if (args.length === 2) {
    if (typeof args[1] === "object") {
      key = true;
      handler = args[0];
      options = args[1];
    } else {
      key = args[0];
      handler = args[1];
    }
  } else {
    key = true;
    handler = args[0];
  }
  const {
    target = defaultWindow,
    eventName = "keydown",
    passive = false,
    dedupe = false
  } = options;
  const predicate = createKeyPredicate(key);
  const listener = (e) => {
    if (e.repeat && toValue(dedupe))
      return;
    if (predicate(e))
      handler(e);
  };
  return useEventListener(target, eventName, listener, passive);
}
function useMounted() {
  const isMounted = ref2(false);
  const instance = getCurrentInstance2();
  if (instance) {
    onMounted2(() => {
      isMounted.value = true;
    }, instance);
  }
  return isMounted;
}
function useSupported(callback) {
  const isMounted = useMounted();
  return computed2(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
function useMutationObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow, ...mutationOptions } = options;
  let observer;
  const isSupported = useSupported(() => window2 && "MutationObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const targets = computed2(() => {
    const value = toValue(target);
    const items = (Array.isArray(value) ? value : [value]).map(unrefElement).filter(notNullish);
    return new Set(items);
  });
  const stopWatch = watch2(
    () => targets.value,
    (targets2) => {
      cleanup();
      if (isSupported.value && targets2.size) {
        observer = new MutationObserver(callback);
        targets2.forEach((el) => observer.observe(el, mutationOptions));
      }
    },
    { immediate: true, flush: "post" }
  );
  const takeRecords = () => {
    return observer == null ? void 0 : observer.takeRecords();
  };
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop,
    takeRecords
  };
}
function useRafFn(fn, options = {}) {
  const {
    immediate = true,
    fpsLimit = void 0,
    window: window2 = defaultWindow
  } = options;
  const isActive = ref2(false);
  const intervalLimit = fpsLimit ? 1e3 / fpsLimit : null;
  let previousFrameTimestamp = 0;
  let rafId = null;
  function loop(timestamp2) {
    if (!isActive.value || !window2)
      return;
    if (!previousFrameTimestamp)
      previousFrameTimestamp = timestamp2;
    const delta = timestamp2 - previousFrameTimestamp;
    if (intervalLimit && delta < intervalLimit) {
      rafId = window2.requestAnimationFrame(loop);
      return;
    }
    previousFrameTimestamp = timestamp2;
    fn({ delta, timestamp: timestamp2 });
    rafId = window2.requestAnimationFrame(loop);
  }
  function resume() {
    if (!isActive.value && window2) {
      isActive.value = true;
      previousFrameTimestamp = 0;
      rafId = window2.requestAnimationFrame(loop);
    }
  }
  function pause() {
    isActive.value = false;
    if (rafId != null && window2) {
      window2.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
  if (immediate)
    resume();
  tryOnScopeDispose(pause);
  return {
    isActive: readonly2(isActive),
    pause,
    resume
  };
}
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow } = options;
  const isSupported = useSupported(() => window2 && "matchMedia" in window2 && typeof window2.matchMedia === "function");
  let mediaQuery;
  const matches2 = ref2(false);
  const handler = (event) => {
    matches2.value = event.matches;
  };
  const cleanup = () => {
    if (!mediaQuery)
      return;
    if ("removeEventListener" in mediaQuery)
      mediaQuery.removeEventListener("change", handler);
    else
      mediaQuery.removeListener(handler);
  };
  const stopWatch = watchEffect(() => {
    if (!isSupported.value)
      return;
    cleanup();
    mediaQuery = window2.matchMedia(toValue(query));
    if ("addEventListener" in mediaQuery)
      mediaQuery.addEventListener("change", handler);
    else
      mediaQuery.addListener(handler);
    matches2.value = mediaQuery.matches;
  });
  tryOnScopeDispose(() => {
    stopWatch();
    cleanup();
    mediaQuery = void 0;
  });
  return matches2;
}
var breakpointsBootstrapV5 = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
};
function useBreakpoints(breakpoints, options = {}) {
  function getValue(k, delta) {
    let v = toValue(breakpoints[toValue(k)]);
    if (delta != null)
      v = increaseWithUnit(v, delta);
    if (typeof v === "number")
      v = `${v}px`;
    return v;
  }
  const { window: window2 = defaultWindow, strategy = "min-width" } = options;
  function match(query) {
    if (!window2)
      return false;
    return window2.matchMedia(query).matches;
  }
  const greaterOrEqual = (k) => {
    return useMediaQuery(() => `(min-width: ${getValue(k)})`, options);
  };
  const smallerOrEqual = (k) => {
    return useMediaQuery(() => `(max-width: ${getValue(k)})`, options);
  };
  const shortcutMethods = Object.keys(breakpoints).reduce((shortcuts, k) => {
    Object.defineProperty(shortcuts, k, {
      get: () => strategy === "min-width" ? greaterOrEqual(k) : smallerOrEqual(k),
      enumerable: true,
      configurable: true
    });
    return shortcuts;
  }, {});
  function current() {
    const points = Object.keys(breakpoints).map((i) => [i, greaterOrEqual(i)]);
    return computed2(() => points.filter(([, v]) => v.value).map(([k]) => k));
  }
  return Object.assign(shortcutMethods, {
    greaterOrEqual,
    smallerOrEqual,
    greater(k) {
      return useMediaQuery(() => `(min-width: ${getValue(k, 0.1)})`, options);
    },
    smaller(k) {
      return useMediaQuery(() => `(max-width: ${getValue(k, -0.1)})`, options);
    },
    between(a, b) {
      return useMediaQuery(() => `(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`, options);
    },
    isGreater(k) {
      return match(`(min-width: ${getValue(k, 0.1)})`);
    },
    isGreaterOrEqual(k) {
      return match(`(min-width: ${getValue(k)})`);
    },
    isSmaller(k) {
      return match(`(max-width: ${getValue(k, -0.1)})`);
    },
    isSmallerOrEqual(k) {
      return match(`(max-width: ${getValue(k)})`);
    },
    isInBetween(a, b) {
      return match(`(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`);
    },
    current,
    active() {
      const bps = current();
      return computed2(() => bps.value.length === 0 ? "" : bps.value.at(-1));
    }
  });
}
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
var handlers = getHandlers();
function getHandlers() {
  if (!(globalKey in _global))
    _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
function usePreferredDark(options) {
  return useMediaQuery("(prefers-color-scheme: dark)", options);
}
function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
var StorageSerializers = {
  boolean: {
    read: (v) => v === "true",
    write: (v) => String(v)
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v)
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v)
  },
  any: {
    read: (v) => v,
    write: (v) => String(v)
  },
  string: {
    read: (v) => v,
    write: (v) => String(v)
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v))
  },
  date: {
    read: (v) => new Date(v),
    write: (v) => v.toISOString()
  }
};
var customStorageEventName = "vueuse-storage";
function useStorage(key, defaults, storage, options = {}) {
  var _a;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    shallow,
    window: window2 = defaultWindow,
    eventFilter: eventFilter2,
    onError = (e) => {
      console.error(e);
    },
    initOnMounted
  } = options;
  const data = (shallow ? shallowRef : ref2)(typeof defaults === "function" ? defaults() : defaults);
  if (!storage) {
    try {
      storage = getSSRHandler("getDefaultStorage", () => {
        var _a2;
        return (_a2 = defaultWindow) == null ? void 0 : _a2.localStorage;
      })();
    } catch (e) {
      onError(e);
    }
  }
  if (!storage)
    return data;
  const rawInit = toValue(defaults);
  const type = guessSerializerType(rawInit);
  const serializer = (_a = options.serializer) != null ? _a : StorageSerializers[type];
  const { pause: pauseWatch, resume: resumeWatch } = watchPausable(
    data,
    () => write(data.value),
    { flush, deep, eventFilter: eventFilter2 }
  );
  if (window2 && listenToStorageChanges) {
    tryOnMounted(() => {
      if (storage instanceof Storage)
        useEventListener(window2, "storage", update);
      else
        useEventListener(window2, customStorageEventName, updateFromCustomEvent);
      if (initOnMounted)
        update();
    });
  }
  if (!initOnMounted)
    update();
  function dispatchWriteEvent(oldValue, newValue) {
    if (window2) {
      const payload = {
        key,
        oldValue,
        newValue,
        storageArea: storage
      };
      window2.dispatchEvent(storage instanceof Storage ? new StorageEvent("storage", payload) : new CustomEvent(customStorageEventName, {
        detail: payload
      }));
    }
  }
  function write(v) {
    try {
      const oldValue = storage.getItem(key);
      if (v == null) {
        dispatchWriteEvent(oldValue, null);
        storage.removeItem(key);
      } else {
        const serialized = serializer.write(v);
        if (oldValue !== serialized) {
          storage.setItem(key, serialized);
          dispatchWriteEvent(oldValue, serialized);
        }
      }
    } catch (e) {
      onError(e);
    }
  }
  function read(event) {
    const rawValue = event ? event.newValue : storage.getItem(key);
    if (rawValue == null) {
      if (writeDefaults && rawInit != null)
        storage.setItem(key, serializer.write(rawInit));
      return rawInit;
    } else if (!event && mergeDefaults) {
      const value = serializer.read(rawValue);
      if (typeof mergeDefaults === "function")
        return mergeDefaults(value, rawInit);
      else if (type === "object" && !Array.isArray(value))
        return { ...rawInit, ...value };
      return value;
    } else if (typeof rawValue !== "string") {
      return rawValue;
    } else {
      return serializer.read(rawValue);
    }
  }
  function update(event) {
    if (event && event.storageArea !== storage)
      return;
    if (event && event.key == null) {
      data.value = rawInit;
      return;
    }
    if (event && event.key !== key)
      return;
    pauseWatch();
    try {
      if ((event == null ? void 0 : event.newValue) !== serializer.write(data.value))
        data.value = read(event);
    } catch (e) {
      onError(e);
    } finally {
      if (event)
        nextTick2(resumeWatch);
      else
        resumeWatch();
    }
  }
  function updateFromCustomEvent(event) {
    update(event.detail);
  }
  return data;
}
var CSS_DISABLE_TRANS = "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
function useColorMode(options = {}) {
  const {
    selector = "html",
    attribute = "class",
    initialValue = "auto",
    window: window2 = defaultWindow,
    storage,
    storageKey = "vueuse-color-scheme",
    listenToStorageChanges = true,
    storageRef,
    emitAuto,
    disableTransition = true
  } = options;
  const modes = {
    auto: "",
    light: "light",
    dark: "dark",
    ...options.modes || {}
  };
  const preferredDark = usePreferredDark({ window: window2 });
  const system = computed2(() => preferredDark.value ? "dark" : "light");
  const store = storageRef || (storageKey == null ? toRef(initialValue) : useStorage(storageKey, initialValue, storage, { window: window2, listenToStorageChanges }));
  const state = computed2(() => store.value === "auto" ? system.value : store.value);
  const updateHTMLAttrs = getSSRHandler(
    "updateHTMLAttrs",
    (selector2, attribute2, value) => {
      const el = typeof selector2 === "string" ? window2 == null ? void 0 : window2.document.querySelector(selector2) : unrefElement(selector2);
      if (!el)
        return;
      const classesToAdd = /* @__PURE__ */ new Set();
      const classesToRemove = /* @__PURE__ */ new Set();
      let attributeToChange = null;
      if (attribute2 === "class") {
        const current = value.split(/\s/g);
        Object.values(modes).flatMap((i) => (i || "").split(/\s/g)).filter(Boolean).forEach((v) => {
          if (current.includes(v))
            classesToAdd.add(v);
          else
            classesToRemove.add(v);
        });
      } else {
        attributeToChange = { key: attribute2, value };
      }
      if (classesToAdd.size === 0 && classesToRemove.size === 0 && attributeToChange === null)
        return;
      let style;
      if (disableTransition) {
        style = window2.document.createElement("style");
        style.appendChild(document.createTextNode(CSS_DISABLE_TRANS));
        window2.document.head.appendChild(style);
      }
      for (const c of classesToAdd) {
        el.classList.add(c);
      }
      for (const c of classesToRemove) {
        el.classList.remove(c);
      }
      if (attributeToChange) {
        el.setAttribute(attributeToChange.key, attributeToChange.value);
      }
      if (disableTransition) {
        window2.getComputedStyle(style).opacity;
        document.head.removeChild(style);
      }
    }
  );
  function defaultOnChanged(mode) {
    var _a;
    updateHTMLAttrs(selector, attribute, (_a = modes[mode]) != null ? _a : mode);
  }
  function onChanged(mode) {
    if (options.onChanged)
      options.onChanged(mode, defaultOnChanged);
    else
      defaultOnChanged(mode);
  }
  watch2(state, onChanged, { flush: "post", immediate: true });
  tryOnMounted(() => onChanged(state.value));
  const auto = computed2({
    get() {
      return emitAuto ? store.value : state.value;
    },
    set(v) {
      store.value = v;
    }
  });
  try {
    return Object.assign(auto, { store, system, state });
  } catch (e) {
    return auto;
  }
}
function useElementHover(el, options = {}) {
  const {
    delayEnter = 0,
    delayLeave = 0,
    window: window2 = defaultWindow
  } = options;
  const isHovered = ref2(false);
  let timer;
  const toggle2 = (entering) => {
    const delay3 = entering ? delayEnter : delayLeave;
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
    }
    if (delay3)
      timer = setTimeout(() => isHovered.value = entering, delay3);
    else
      isHovered.value = entering;
  };
  if (!window2)
    return isHovered;
  useEventListener(el, "mouseenter", () => toggle2(true), { passive: true });
  useEventListener(el, "mouseleave", () => toggle2(false), { passive: true });
  return isHovered;
}
function useIntersectionObserver(target, callback, options = {}) {
  const {
    root,
    rootMargin = "0px",
    threshold = 0,
    window: window2 = defaultWindow,
    immediate = true
  } = options;
  const isSupported = useSupported(() => window2 && "IntersectionObserver" in window2);
  const targets = computed2(() => {
    const _target = toValue(target);
    return (Array.isArray(_target) ? _target : [_target]).map(unrefElement).filter(notNullish);
  });
  let cleanup = noop;
  const isActive = ref2(immediate);
  const stopWatch = isSupported.value ? watch2(
    () => [targets.value, unrefElement(root), isActive.value],
    ([targets2, root2]) => {
      cleanup();
      if (!isActive.value)
        return;
      if (!targets2.length)
        return;
      const observer = new IntersectionObserver(
        callback,
        {
          root: unrefElement(root2),
          rootMargin,
          threshold
        }
      );
      targets2.forEach((el) => el && observer.observe(el));
      cleanup = () => {
        observer.disconnect();
        cleanup = noop;
      };
    },
    { immediate, flush: "post" }
  ) : noop;
  const stop = () => {
    cleanup();
    stopWatch();
    isActive.value = false;
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    isActive,
    pause() {
      cleanup();
      isActive.value = false;
    },
    resume() {
      isActive.value = true;
    },
    stop
  };
}
function useFocus(target, options = {}) {
  const { initialValue = false, focusVisible = false, preventScroll = false } = options;
  const innerFocused = ref2(false);
  const targetElement = computed2(() => unrefElement(target));
  useEventListener(targetElement, "focus", (event) => {
    var _a, _b;
    if (!focusVisible || ((_b = (_a = event.target).matches) == null ? void 0 : _b.call(_a, ":focus-visible")))
      innerFocused.value = true;
  });
  useEventListener(targetElement, "blur", () => innerFocused.value = false);
  const focused = computed2({
    get: () => innerFocused.value,
    set(value) {
      var _a, _b;
      if (!value && innerFocused.value)
        (_a = targetElement.value) == null ? void 0 : _a.blur();
      else if (value && !innerFocused.value)
        (_b = targetElement.value) == null ? void 0 : _b.focus({ preventScroll });
    }
  });
  watch2(
    targetElement,
    () => {
      focused.value = initialValue;
    },
    { immediate: true, flush: "post" }
  );
  return { focused };
}
function resolveElement(el) {
  if (typeof Window !== "undefined" && el instanceof Window)
    return el.document.documentElement;
  if (typeof Document !== "undefined" && el instanceof Document)
    return el.documentElement;
  return el;
}
var UseMouseBuiltinExtractors = {
  page: (event) => [event.pageX, event.pageY],
  client: (event) => [event.clientX, event.clientY],
  screen: (event) => [event.screenX, event.screenY],
  movement: (event) => event instanceof Touch ? null : [event.movementX, event.movementY]
};
function useMouse(options = {}) {
  const {
    type = "page",
    touch = true,
    resetOnTouchEnds = false,
    initialValue = { x: 0, y: 0 },
    window: window2 = defaultWindow,
    target = window2,
    scroll = true,
    eventFilter: eventFilter2
  } = options;
  let _prevMouseEvent = null;
  const x = ref2(initialValue.x);
  const y = ref2(initialValue.y);
  const sourceType = ref2(null);
  const extractor = typeof type === "function" ? type : UseMouseBuiltinExtractors[type];
  const mouseHandler = (event) => {
    const result = extractor(event);
    _prevMouseEvent = event;
    if (result) {
      [x.value, y.value] = result;
      sourceType.value = "mouse";
    }
  };
  const touchHandler = (event) => {
    if (event.touches.length > 0) {
      const result = extractor(event.touches[0]);
      if (result) {
        [x.value, y.value] = result;
        sourceType.value = "touch";
      }
    }
  };
  const scrollHandler = () => {
    if (!_prevMouseEvent || !window2)
      return;
    const pos = extractor(_prevMouseEvent);
    if (_prevMouseEvent instanceof MouseEvent && pos) {
      x.value = pos[0] + window2.scrollX;
      y.value = pos[1] + window2.scrollY;
    }
  };
  const reset = () => {
    x.value = initialValue.x;
    y.value = initialValue.y;
  };
  const mouseHandlerWrapper = eventFilter2 ? (event) => eventFilter2(() => mouseHandler(event), {}) : (event) => mouseHandler(event);
  const touchHandlerWrapper = eventFilter2 ? (event) => eventFilter2(() => touchHandler(event), {}) : (event) => touchHandler(event);
  const scrollHandlerWrapper = eventFilter2 ? () => eventFilter2(() => scrollHandler(), {}) : () => scrollHandler();
  if (target) {
    const listenerOptions = { passive: true };
    useEventListener(target, ["mousemove", "dragover"], mouseHandlerWrapper, listenerOptions);
    if (touch && type !== "movement") {
      useEventListener(target, ["touchstart", "touchmove"], touchHandlerWrapper, listenerOptions);
      if (resetOnTouchEnds)
        useEventListener(target, "touchend", reset, listenerOptions);
    }
    if (scroll && type === "page")
      useEventListener(window2, "scroll", scrollHandlerWrapper, { passive: true });
  }
  return {
    x,
    y,
    sourceType
  };
}
function checkOverflowScroll(ele) {
  const style = window.getComputedStyle(ele);
  if (style.overflowX === "scroll" || style.overflowY === "scroll" || style.overflowX === "auto" && ele.clientWidth < ele.scrollWidth || style.overflowY === "auto" && ele.clientHeight < ele.scrollHeight) {
    return true;
  } else {
    const parent = ele.parentNode;
    if (!parent || parent.tagName === "BODY")
      return false;
    return checkOverflowScroll(parent);
  }
}
function preventDefault(rawEvent) {
  const e = rawEvent || window.event;
  const _target = e.target;
  if (checkOverflowScroll(_target))
    return false;
  if (e.touches.length > 1)
    return true;
  if (e.preventDefault)
    e.preventDefault();
  return false;
}
var elInitialOverflow = /* @__PURE__ */ new WeakMap();
function useScrollLock(element, initialState = false) {
  const isLocked = ref2(initialState);
  let stopTouchMoveListener = null;
  let initialOverflow = "";
  watch2(toRef(element), (el) => {
    const target = resolveElement(toValue(el));
    if (target) {
      const ele = target;
      if (!elInitialOverflow.get(ele))
        elInitialOverflow.set(ele, ele.style.overflow);
      if (ele.style.overflow !== "hidden")
        initialOverflow = ele.style.overflow;
      if (ele.style.overflow === "hidden")
        return isLocked.value = true;
      if (isLocked.value)
        return ele.style.overflow = "hidden";
    }
  }, {
    immediate: true
  });
  const lock = () => {
    const el = resolveElement(toValue(element));
    if (!el || isLocked.value)
      return;
    if (isIOS) {
      stopTouchMoveListener = useEventListener(
        el,
        "touchmove",
        (e) => {
          preventDefault(e);
        },
        { passive: false }
      );
    }
    el.style.overflow = "hidden";
    isLocked.value = true;
  };
  const unlock = () => {
    const el = resolveElement(toValue(element));
    if (!el || !isLocked.value)
      return;
    if (isIOS)
      stopTouchMoveListener == null ? void 0 : stopTouchMoveListener();
    el.style.overflow = initialOverflow;
    elInitialOverflow.delete(el);
    isLocked.value = false;
  };
  tryOnScopeDispose(unlock);
  return computed2({
    get() {
      return isLocked.value;
    },
    set(v) {
      if (v)
        lock();
      else
        unlock();
    }
  });
}
function useSwipe(target, options = {}) {
  const {
    threshold = 50,
    onSwipe,
    onSwipeEnd,
    onSwipeStart,
    passive = true,
    window: window2 = defaultWindow
  } = options;
  const coordsStart = reactive({ x: 0, y: 0 });
  const coordsEnd = reactive({ x: 0, y: 0 });
  const diffX = computed2(() => coordsStart.x - coordsEnd.x);
  const diffY = computed2(() => coordsStart.y - coordsEnd.y);
  const { max: max2, abs } = Math;
  const isThresholdExceeded = computed2(() => max2(abs(diffX.value), abs(diffY.value)) >= threshold);
  const isSwiping = ref2(false);
  const direction = computed2(() => {
    if (!isThresholdExceeded.value)
      return "none";
    if (abs(diffX.value) > abs(diffY.value)) {
      return diffX.value > 0 ? "left" : "right";
    } else {
      return diffY.value > 0 ? "up" : "down";
    }
  });
  const getTouchEventCoords = (e) => [e.touches[0].clientX, e.touches[0].clientY];
  const updateCoordsStart = (x, y) => {
    coordsStart.x = x;
    coordsStart.y = y;
  };
  const updateCoordsEnd = (x, y) => {
    coordsEnd.x = x;
    coordsEnd.y = y;
  };
  let listenerOptions;
  const isPassiveEventSupported = checkPassiveEventSupport(window2 == null ? void 0 : window2.document);
  if (!passive)
    listenerOptions = isPassiveEventSupported ? { passive: false, capture: true } : { capture: true };
  else
    listenerOptions = isPassiveEventSupported ? { passive: true } : { capture: false };
  const onTouchEnd = (e) => {
    if (isSwiping.value)
      onSwipeEnd == null ? void 0 : onSwipeEnd(e, direction.value);
    isSwiping.value = false;
  };
  const stops = [
    useEventListener(target, "touchstart", (e) => {
      if (e.touches.length !== 1)
        return;
      if (listenerOptions.capture && !listenerOptions.passive)
        e.preventDefault();
      const [x, y] = getTouchEventCoords(e);
      updateCoordsStart(x, y);
      updateCoordsEnd(x, y);
      onSwipeStart == null ? void 0 : onSwipeStart(e);
    }, listenerOptions),
    useEventListener(target, "touchmove", (e) => {
      if (e.touches.length !== 1)
        return;
      const [x, y] = getTouchEventCoords(e);
      updateCoordsEnd(x, y);
      if (!isSwiping.value && isThresholdExceeded.value)
        isSwiping.value = true;
      if (isSwiping.value)
        onSwipe == null ? void 0 : onSwipe(e);
    }, listenerOptions),
    useEventListener(target, ["touchend", "touchcancel"], onTouchEnd, listenerOptions)
  ];
  const stop = () => stops.forEach((s) => s());
  return {
    isPassiveEventSupported,
    isSwiping,
    direction,
    coordsStart,
    coordsEnd,
    lengthX: diffX,
    lengthY: diffY,
    stop
  };
}
function checkPassiveEventSupport(document2) {
  if (!document2)
    return false;
  let supportsPassive = false;
  const optionsBlock = {
    get passive() {
      supportsPassive = true;
      return false;
    }
  };
  document2.addEventListener("x", noop, optionsBlock);
  document2.removeEventListener("x", noop);
  return supportsPassive;
}
function useTimestamp(options = {}) {
  const {
    controls: exposeControls = false,
    offset: offset2 = 0,
    immediate = true,
    interval = "requestAnimationFrame",
    callback
  } = options;
  const ts = ref2(timestamp() + offset2);
  const update = () => ts.value = timestamp() + offset2;
  const cb = callback ? () => {
    update();
    callback(ts.value);
  } : update;
  const controls = interval === "requestAnimationFrame" ? useRafFn(cb, { immediate }) : useIntervalFn(cb, interval, { immediate });
  if (exposeControls) {
    return {
      timestamp: ts,
      ...controls
    };
  } else {
    return ts;
  }
}

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/composables/useColorMode/index.mjs
var useColorMode2 = (opts = {}) => {
  const persist = opts.persist ?? false;
  const attribute = "data-bs-theme";
  const selector = "body";
  return useColorMode({
    attribute,
    selector,
    storageKey: persist === true ? `bv-color-${opts.attribute ?? attribute}-${opts.selector ?? selector}` : null,
    ...opts
  });
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/composables/useModal/index.mjs
import { getCurrentInstance as getCurrentInstance4, computed as computed4, toValue as toValue2 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useModalManager-Bdd3CMp-.mjs
import { getCurrentInstance as getCurrentInstance3, watch as watch3, computed as computed3, inject as inject2 } from "vue";
var modalOpenClassName = "modal-open";
var useSharedModalStack = () => {
  const modalManagerPlugin2 = inject2(modalManagerPluginKey);
  const dispose = (modal) => {
    modalManagerPlugin2 == null ? void 0 : modalManagerPlugin2.removeStack(modal);
    modalManagerPlugin2 == null ? void 0 : modalManagerPlugin2.removeRegistry(modal);
  };
  const updateHTMLAttrs = getSSRHandler("updateHTMLAttrs", (selector, attribute, value) => {
    const el = typeof selector === "string" ? window == null ? void 0 : window.document.querySelector(selector) : unrefElement(selector);
    if (!el)
      return;
    if (attribute === "class") {
      el.classList.toggle(modalOpenClassName, value === modalOpenClassName);
    } else {
      el.setAttribute(attribute, value);
    }
  });
  tryOnScopeDispose(() => {
    updateHTMLAttrs("body", "class", "");
  });
  watch3(
    () => modalManagerPlugin2 == null ? void 0 : modalManagerPlugin2.countStack.value,
    (newValue) => {
      if (newValue === void 0)
        return;
      updateHTMLAttrs("body", "class", newValue > 0 ? modalOpenClassName : "");
    }
  );
  return {
    ...modalManagerPlugin2,
    dispose
  };
};
var useModalManager = (modalOpen, initialValue) => {
  const { pushRegistry, pushStack, removeStack, stack, dispose, countStack } = useSharedModalStack();
  const currentModal = getCurrentInstance3();
  if (!currentModal || currentModal.type.__name !== "BModal") {
    throw new Error("useModalManager must only use in BModal component");
  }
  pushRegistry == null ? void 0 : pushRegistry(currentModal);
  tryOnScopeDispose(() => {
    dispose(currentModal);
  });
  const setInStack = (newValue, oldValue) => {
    if (newValue) {
      pushStack == null ? void 0 : pushStack(currentModal);
    } else if (oldValue && !newValue) {
      removeStack == null ? void 0 : removeStack(currentModal);
    }
  };
  setInStack(initialValue, initialValue);
  watch3(modalOpen, setInStack);
  return {
    activePosition: computed3(
      () => stack == null ? void 0 : stack.value.findIndex((el) => {
        var _a, _b;
        return ((_a = el.exposed) == null ? void 0 : _a.id) === ((_b = currentModal.exposed) == null ? void 0 : _b.id);
      })
    ),
    activeModalCount: countStack,
    stackWithoutSelf: computed3(
      () => (stack == null ? void 0 : stack.value.filter((el) => {
        var _a, _b;
        return ((_a = el.exposed) == null ? void 0 : _a.id) !== ((_b = currentModal.exposed) == null ? void 0 : _b.id);
      })) ?? []
    )
  };
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/composables/useModal/index.mjs
var useModal = (id = void 0) => {
  const { registry } = useSharedModalStack();
  const instance = getCurrentInstance4();
  const findBModal = (component) => {
    if (!component.parent) {
      return null;
    }
    if (component.parent.type.__name === "BModal") {
      return component.parent;
    }
    return findBModal(component.parent);
  };
  const modalComponent = computed4(() => {
    var _a;
    const resolvedId = toValue2(id);
    if (resolvedId) {
      if (!registry)
        return null;
      for (const [, modal2] of registry.value) {
        if (((_a = modal2.exposed) == null ? void 0 : _a.id.value) === resolvedId) {
          return modal2;
        }
      }
      return null;
    }
    if (!instance) {
      return null;
    }
    return findBModal(instance);
  });
  const modal = computed4(() => {
    var _a;
    return (_a = modalComponent.value) == null ? void 0 : _a.proxy;
  });
  return {
    show() {
      var _a, _b;
      (_b = (_a = modalComponent.value) == null ? void 0 : _a.exposed) == null ? void 0 : _b.show();
    },
    hide(trigger = "") {
      var _a, _b;
      (_b = (_a = modalComponent.value) == null ? void 0 : _a.exposed) == null ? void 0 : _b.hide(trigger);
    },
    modal
  };
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/composables/useModalController/index.mjs
import { inject as inject3 } from "vue";
var useModalController = () => {
  const { lastStack, stack } = useSharedModalStack();
  const modalControllerPlugin2 = inject3(modalControllerPluginKey);
  const hide2 = (trigger = "") => {
    var _a;
    if (lastStack == null ? void 0 : lastStack.value) {
      (_a = lastStack == null ? void 0 : lastStack.value.exposed) == null ? void 0 : _a.hide(trigger);
    }
  };
  const hideAll = (trigger = "") => {
    stack == null ? void 0 : stack.value.forEach((modal) => {
      var _a;
      (_a = modal.exposed) == null ? void 0 : _a.hide(trigger);
    });
  };
  return {
    ...modalControllerPlugin2,
    hide: hide2,
    hideAll
    // Todo: Supports listening events globally in the future
  };
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/composables/useScrollspy/index.mjs
import { toRef as toRef2, ref as ref3, watch as watch4, getCurrentInstance as getCurrentInstance5, nextTick as nextTick3, onMounted as onMounted3, computed as computed5, readonly as readonly3 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/getElement-D_JPfLJS.mjs
var getElement = (element) => {
  if (!element)
    return void 0;
  if (typeof element === "string") {
    if (typeof document === "undefined")
      return void 0;
    const idElement = document.getElementById(element);
    return idElement ?? document.querySelector(element) ?? void 0;
  }
  return element.$el ?? element;
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/composables/useScrollspy/index.mjs
var useScrollspy = (content, target, options = {}) => {
  const cont = toRef2(content);
  const tar = toRef2(target);
  const resolvedContent = ref3(getElement(cont.value));
  const resolvedTarget = ref3(getElement(tar.value));
  watch4([cont, tar], () => {
    updateList();
  });
  const {
    contentQuery = ":scope > [id]",
    targetQuery = "[href]",
    manual = false,
    root,
    rootMargin = "0px 0px -25%",
    threshold = [0.1, 0.5, 1],
    watchChanges = true
  } = options;
  const current = ref3(null);
  const list = ref3([]);
  const nodeList = ref3([]);
  const ctx = getCurrentInstance5();
  if (!ctx) {
    nextTick3(() => {
      updateList();
    });
  } else {
    onMounted3(() => {
      syncRef(cont, resolvedContent, {
        transform: {
          ltr: (v) => getElement(v)
        },
        direction: "ltr",
        immediate: true
      });
      syncRef(tar, resolvedTarget, {
        transform: {
          ltr: (v) => getElement(v)
        },
        direction: "ltr",
        immediate: true
      });
      updateList();
    });
  }
  const updateList = () => {
    nodeList.value = resolvedContent.value ? Array.from(resolvedContent.value.querySelectorAll(contentQuery)) : [];
    list.value = nodeList.value.map((el) => ({
      id: el.id,
      el,
      visible: false,
      text: el.textContent
    }));
  };
  let isScrollingDown = true;
  let previousScrollTop = 0;
  const scrollRoot = computed5(
    () => resolvedContent.value && getComputedStyle(resolvedContent.value).overflowY === "visible" ? null : resolvedContent.value
  );
  const iobs = useIntersectionObserver(
    nodeList,
    (entries) => {
      var _a, _b, _c, _d;
      const scrollTop = (_a = scrollRoot.value || (document == null ? void 0 : document.documentElement)) == null ? void 0 : _a.scrollTop;
      isScrollingDown = scrollTop > previousScrollTop;
      previousScrollTop = scrollTop;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          list.value.forEach((node) => {
            if (node.el === entry.target) {
              node.visible = true;
            }
          });
          return;
        }
        list.value.forEach((node) => {
          if (node.el === entry.target) {
            node.visible = false;
          }
        });
      });
      let newId = null;
      if (isScrollingDown) {
        newId = ((_b = [...list.value].reverse().find((node) => node.visible)) == null ? void 0 : _b.id) || null;
      } else {
        newId = ((_c = list.value.find((node) => node.visible)) == null ? void 0 : _c.id) || null;
      }
      if (newId !== null) {
        current.value = newId;
      }
      if (!current.value) {
        current.value = ((_d = list.value[0]) == null ? void 0 : _d.id) || null;
      }
    },
    {
      root: root ? getElement(root) : scrollRoot,
      rootMargin,
      threshold
    }
  );
  watch4(current, (newId) => {
    var _a;
    if (manual)
      return;
    const nodes = (_a = resolvedTarget.value) == null ? void 0 : _a.querySelectorAll(targetQuery);
    if (nodes === void 0)
      return;
    let foundParent = false;
    let activeElement = null;
    nodes.forEach((node) => {
      var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      const parentDropdown = node.closest(".dropdown");
      if ((_a2 = node.getAttribute("href")) == null ? void 0 : _a2.includes(`#${newId}`)) {
        activeElement = node;
        node.classList.add("active");
        if (parentDropdown) {
          (_b = parentDropdown == null ? void 0 : parentDropdown.querySelector(".dropdown-toggle")) == null ? void 0 : _b.classList.add("active");
          foundParent = true;
        }
        let parentNav = (_c = node.closest(".nav")) == null ? void 0 : _c.previousSibling;
        while ((_d = parentNav == null ? void 0 : parentNav.classList) == null ? void 0 : _d.contains("nav-item")) {
          foundParent = true;
          (_e = parentNav.querySelector(".nav-link")) == null ? void 0 : _e.classList.add("active");
          parentNav = (_f = parentNav.closest(".nav")) == null ? void 0 : _f.previousSibling;
        }
      } else {
        node.classList.remove("active");
        if (parentDropdown && !foundParent) {
          (_g = parentDropdown == null ? void 0 : parentDropdown.querySelector(".dropdown-toggle")) == null ? void 0 : _g.classList.remove("active");
        }
        if (!foundParent) {
          let parentNav = (_h = node.closest(".nav")) == null ? void 0 : _h.previousSibling;
          while ((_i = parentNav == null ? void 0 : parentNav.classList) == null ? void 0 : _i.contains("nav-item")) {
            foundParent = true;
            if (parentNav.querySelector(".nav-link") !== activeElement) {
              (_j = parentNav.querySelector(".nav-link")) == null ? void 0 : _j.classList.remove("active");
            }
            parentNav = (_k = parentNav.closest(".nav")) == null ? void 0 : _k.previousSibling;
          }
        }
      }
    });
  });
  const mobs = !watchChanges ? { stop: () => {
  } } : useMutationObserver(
    resolvedContent,
    () => {
      updateList();
    },
    {
      childList: true
    }
  );
  const scrollIntoView = (event, smooth = false) => {
    var _a, _b;
    event.preventDefault();
    const href = (_b = (_a = event.target) == null ? void 0 : _a.getAttribute) == null ? void 0 : _b.call(_a, "href");
    const el = href ? document == null ? void 0 : document.querySelector(href) : null;
    if (el && resolvedContent.value) {
      if (resolvedContent.value.scrollTo) {
        resolvedContent.value.scrollTo({ top: el.offsetTop, behavior: smooth ? "smooth" : "auto" });
      } else {
        resolvedContent.value.scrollTop = el.offsetTop;
      }
    }
  };
  const cleanup = () => {
    iobs.stop();
    mobs.stop();
  };
  return {
    current: readonly3(current),
    list,
    content: resolvedContent,
    target: resolvedTarget,
    scrollIntoView,
    updateList,
    cleanup
  };
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/composables/useToastController/index.mjs
import { inject as inject4 } from "vue";
var useToastController = () => ({ ...inject4(toastPluginKey) });

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/composables/usePopoverController/index.mjs
import { inject as inject5 } from "vue";
var usePopoverController = () => ({ ...inject5(popoverPluginKey) });

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/index-BjYm4lhC.mjs
var index = Object.freeze(Object.defineProperty({
  __proto__: null,
  useBreadcrumb,
  useColorMode: useColorMode2,
  useModal,
  useModalController,
  usePopoverController,
  useScrollspy,
  useToastController
}, Symbol.toStringTag, { value: "Module" }));

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/directives/BColorMode/index.mjs
var setTheme = (el, value) => el.setAttribute("data-bs-theme", value);
var vBColorMode = {
  mounted(el, binding) {
    setTheme(el, binding.value);
  },
  updated(el, binding) {
    setTheme(el, binding.value);
  }
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/constants-DY6pmjuU.mjs
var CODE_DOWN = "ArrowDown";
var CODE_END = "End";
var CODE_HOME = "Home";
var CODE_LEFT = "ArrowLeft";
var CODE_PAGEDOWN = "PageDown";
var CODE_PAGEUP = "PageUp";
var CODE_RIGHT = "ArrowRight";
var CODE_UP = "ArrowUp";
var RX_UNDERSCORE = /_/g;
var RX_LOWER_UPPER = /([a-z])([A-Z])/g;
var RX_NUMBER = /^[0-9]*\.?[0-9]+$/;
var RX_START_SPACE_WORD = /(\s|^)(\w)/g;
var RX_FIRST_START_SPACE_WORD = /(\s|^)(\w)/;
var RX_SPACE_SPLIT = /\s+/;
var RX_HASH = /^#/;
var RX_HASH_ID = /^#[A-Za-z]+[\w\-:.]*$/;
var RX_REGEXP_REPLACE = /[-/\\^$*+?.()|[\]{}]/g;
var RX_SPACES = /[\s\uFEFF\xA0]+/g;

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/directives/BToggle/index.mjs
var getTargets = (binding, el) => {
  const { modifiers, arg, value } = binding;
  const targets = Object.keys(modifiers || {});
  const localValue = typeof value === "string" ? value.split(RX_SPACE_SPLIT) : value;
  if (el.tagName.toLowerCase() === "a") {
    const href = el.getAttribute("href") || "";
    if (RX_HASH_ID.test(href)) {
      targets.push(href.replace(RX_HASH, ""));
    }
  }
  Array.prototype.concat.apply([], [arg, localValue]).forEach((t) => typeof t === "string" && targets.push(t));
  return targets.filter((t, index8, arr) => t && arr.indexOf(t) === index8);
};
var toggle = (targetIds, el) => {
  targetIds.forEach((targetId) => {
    const target = document.getElementById(targetId);
    if (target !== null) {
      target.dispatchEvent(new Event("bv-toggle"));
    }
  });
  setTimeout(() => checkVisibility(targetIds, el), 50);
};
var checkVisibility = (targetIds, el) => {
  let visible = false;
  targetIds.forEach((targetId) => {
    const target = document.getElementById(targetId);
    if (target == null ? void 0 : target.classList.contains("show")) {
      visible = true;
    }
    if (target == null ? void 0 : target.classList.contains("closing")) {
      visible = false;
    }
  });
  el.setAttribute("aria-expanded", visible ? "true" : "false");
  el.classList.remove(visible ? "collapsed" : "not-collapsed");
  el.classList.add(visible ? "not-collapsed" : "collapsed");
};
var handleUpdate = (el, binding) => {
  const targets = getTargets(binding, el);
  if (targets.length === 0)
    return;
  if (el.__toggle) {
    setTimeout(() => {
      el.removeEventListener("click", el.__toggle);
      el.__toggle = () => toggle(targets, el);
      el.addEventListener("click", el.__toggle);
    }, 0);
  } else {
    el.__toggle = () => toggle(targets, el);
    el.addEventListener("click", el.__toggle);
  }
  el.setAttribute("aria-controls", targets.join(" "));
  checkVisibility(targets, el);
};
var vBToggle = {
  mounted: handleUpdate,
  updated: handleUpdate,
  unmounted(el) {
    el.removeEventListener("click", el.__toggle);
    el.removeAttribute("aria-controls");
    el.removeAttribute("aria-expanded");
  }
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/directives/BPopover/index.mjs
import "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/floatingUi-DOXQNrB3.mjs
import { computed as computed9, ref as ref6, shallowRef as shallowRef3, watch as watch6, getCurrentScope as getCurrentScope2, onScopeDispose as onScopeDispose2, shallowReadonly, unref as unref2, defineComponent as defineComponent3, mergeModels, useSlots, useModel, useTemplateRef, toRef as toRef3, onMounted as onMounted5, nextTick as nextTick5, onBeforeUnmount, openBlock, createElementBlock, Fragment, createElementVNode, renderSlot, createVNode, withCtx, createBlock, Transition, mergeProps, withDirectives, normalizeClass, normalizeStyle, createTextVNode, toDisplayString, createCommentVNode, vShow, toValue as toValue$1, render, h as h2 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useDefaults-dJMhLizZ.mjs
import { inject as inject6, ref as ref4, computed as computed6, shallowRef as shallowRef2, watchEffect as watchEffect2, getCurrentInstance as getCurrentInstance$1, provide } from "vue";
function injectSelf(key, vm = getCurrentInstance6("injectSelf")) {
  const { provides } = vm;
  if (provides && key in provides) {
    return provides[key];
  }
  return void 0;
}
function getCurrentInstance6(name, message) {
  const vm = getCurrentInstance$1();
  if (!vm) {
    throw new Error(`[Bvn] ${name} ${"must be called from inside a setup function"}`);
  }
  return vm;
}
var toKebabCase = (str = "") => str.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
var isObject2 = (obj) => obj !== null && typeof obj === "object" && !Array.isArray(obj);
function mergeDeep(source = {}, target = {}, arrayFn) {
  const out = {};
  for (const key in source) {
    out[key] = source[key];
  }
  for (const key in target) {
    const sourceProperty = source[key];
    const targetProperty = target[key];
    if (isObject2(sourceProperty) && isObject2(targetProperty)) {
      out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn);
      continue;
    }
    if (Array.isArray(sourceProperty) && Array.isArray(targetProperty) && arrayFn) {
      out[key] = arrayFn(sourceProperty, targetProperty);
      continue;
    }
    out[key] = targetProperty;
  }
  return out;
}
var propIsDefined = (vnode, prop) => {
  var _a, _b;
  return typeof ((_a = vnode.props) == null ? void 0 : _a[prop]) !== "undefined" || typeof ((_b = vnode.props) == null ? void 0 : _b[toKebabCase(prop)]) !== "undefined";
};
function internalUseDefaults(props = {}, name) {
  const defaults = inject6(defaultsKey, ref4({}));
  const vm = getCurrentInstance6("useDefaults");
  name = name ?? vm.type.name ?? vm.type.__name;
  if (!name) {
    throw new Error("[Bvn] Could not determine component name");
  }
  const componentDefaults = computed6(() => {
    var _a;
    return (_a = defaults.value) == null ? void 0 : _a[props._as ?? name];
  });
  const _props = new Proxy(props, {
    get(target, prop) {
      var _a, _b, _c, _d;
      const propValue = Reflect.get(target, prop);
      if (prop === "class" || prop === "style") {
        return [(_a = componentDefaults.value) == null ? void 0 : _a[prop], propValue].filter((v) => v != null);
      } else if (typeof prop === "string" && !propIsDefined(vm.vnode, prop)) {
        return ((_b = componentDefaults.value) == null ? void 0 : _b[prop]) ?? ((_d = (_c = defaults.value) == null ? void 0 : _c.global) == null ? void 0 : _d[prop]) ?? propValue;
      }
      return propValue;
    }
  });
  const _subcomponentDefaults = shallowRef2();
  watchEffect2(() => {
    if (componentDefaults.value) {
      const subComponents = Object.entries(componentDefaults.value).filter(
        ([key]) => key.startsWith(key[0].toUpperCase())
      );
      _subcomponentDefaults.value = subComponents.length ? Object.fromEntries(subComponents) : void 0;
    } else {
      _subcomponentDefaults.value = void 0;
    }
  });
  function provideSubDefaults() {
    const injected = injectSelf(defaultsKey, vm);
    provide(
      defaultsKey,
      computed6(
        () => _subcomponentDefaults.value ? mergeDeep((injected == null ? void 0 : injected.value) ?? {}, _subcomponentDefaults.value) : injected == null ? void 0 : injected.value
      )
    );
  }
  return { props: _props, provideSubDefaults };
}
function useDefaults(props, name) {
  const { props: _props, provideSubDefaults } = internalUseDefaults(props, name);
  provideSubDefaults();
  return _props;
}

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useId-BR0P33VS.mjs
import { useId as useId$1, computed as computed7, toValue as toValue3 } from "vue";
var useId = (id, suffix) => {
  const genId = useId$1();
  return computed7(() => toValue3(id) || withBvnPrefix(genId || "", suffix));
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/ConditionalTeleport.vue_vue_type_script_lang-2PJ2jBTg.mjs
import { defineComponent as defineComponent2, h, Teleport } from "vue";
var _sfc_main = defineComponent2({
  name: "ConditionalTeleport",
  inheritAttrs: false,
  slots: Object,
  props: {
    to: {
      type: [String, Object],
      default: null
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { slots }) {
    return () => {
      var _a, _b;
      return !props.to ? (_a = slots.default) == null ? void 0 : _a.call(slots, {}) : h(Teleport, { to: props.to, disabled: props.disabled || !props.to }, [(_b = slots.default) == null ? void 0 : _b.call(slots, {})]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useShowHide-byhoPIsk.mjs
import { ref as ref5, watch as watch5, computed as computed8, onMounted as onMounted4, nextTick as nextTick4 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/classes-IC0yVJlq.mjs
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var BvEvent = class _BvEvent {
  constructor(eventType, eventInit = {}) {
    __publicField(this, "cancelable", true);
    __publicField(this, "componentId", null);
    __publicField(this, "_defaultPrevented", false);
    __publicField(this, "eventType", "");
    __publicField(this, "nativeEvent", null);
    __publicField(this, "_preventDefault");
    __publicField(this, "relatedTarget", null);
    __publicField(this, "target", null);
    if (!eventType) {
      throw new TypeError(
        `Failed to construct '${this.constructor.name}'. 1 argument required, ${arguments.length} given.`
      );
    }
    Object.assign(this, _BvEvent.Defaults, eventInit, { eventType });
    this._preventDefault = function _preventDefault() {
      if (this.cancelable) {
        this.defaultPrevented = true;
      }
    };
  }
  // Readable by everyone,
  // But only overwritten by inherrited constructors
  get defaultPrevented() {
    return this._defaultPrevented;
  }
  set defaultPrevented(prop) {
    this._defaultPrevented = prop;
  }
  // I think this is right
  // We want to be able to have it callable to everyone,
  // But only overwritten by inherrited constructors
  get preventDefault() {
    return this._preventDefault;
  }
  // This may not be correct, because it doesn't get correct type inferences in children
  // Ex overwrite this.preventDefault = () => true is valid. Could be a TS issue
  set preventDefault(setter) {
    this._preventDefault = setter;
  }
  static get Defaults() {
    return {
      cancelable: true,
      componentId: null,
      eventType: "",
      nativeEvent: null,
      relatedTarget: null,
      target: null
    };
  }
};
var BvTriggerableEvent = class extends BvEvent {
  constructor(eventType, eventInit = {}) {
    super(eventType, eventInit);
    __publicField(this, "trigger", null);
    Object.assign(this, BvEvent.Defaults, eventInit, { eventType });
  }
  static get Defaults() {
    return {
      ...super.Defaults,
      trigger: null
    };
  }
};
var BvCarouselEvent = class extends BvEvent {
  constructor(eventType, eventInit) {
    super(eventType, eventInit);
    __publicField(this, "from");
    __publicField(this, "to");
    __publicField(this, "direction");
    Object.assign(this, BvEvent.Defaults, eventInit, { eventType });
    const { from, direction, to } = eventInit;
    this.from = from;
    this.to = to;
    this.direction = direction;
  }
  static get Defaults() {
    return {
      ...super.Defaults
    };
  }
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useShowHide-byhoPIsk.mjs
var fadeBaseTransitionProps = {
  name: "fade",
  enterActiveClass: "",
  enterFromClass: "showing",
  enterToClass: "",
  leaveActiveClass: "",
  leaveFromClass: "",
  leaveToClass: "showing",
  css: true
};
var useShowHide = (modelValue, props, emit, element, computedId, options = {
  transitionProps: {},
  showFn: () => {
  },
  hideFn: () => {
  }
}) => {
  let noAction = false;
  const initialShow = !!modelValue.value && !props.initialAnimation || props.visible || false;
  const showRef = ref5(initialShow);
  const renderRef = ref5(initialShow);
  const renderBackdropRef = ref5(initialShow);
  let isCountdown = typeof modelValue.value !== "boolean";
  watch5(modelValue, () => {
    isCountdown = typeof modelValue.value !== "boolean";
    if (noAction) {
      noAction = false;
      return;
    }
    if (modelValue.value) {
      show();
    } else {
      hide2();
    }
  });
  const localNoAnimation = ref5(initialShow);
  const localTemporaryHide = ref5(false);
  const computedNoAnimation = computed8(
    () => props.noAnimation || props.noFade || localNoAnimation.value || false
  );
  onMounted4(() => {
    if (props.visible || !props.show && initialShow) {
      localNoAnimation.value = true;
      if (!modelValue.value) {
        noAction = true;
        modelValue.value = true;
      }
      nextTick4(() => {
        isVisible2.value = true;
        backdropVisible.value = true;
        backdropReady.value = true;
        show();
      });
    } else if (props.show || !!modelValue.value && props.initialAnimation) {
      show();
    }
  });
  watch5(
    () => props.visible,
    (newval) => {
      localNoAnimation.value = true;
      nextTick4(() => {
        if (newval)
          isVisible2.value = true;
        if (newval) {
          show();
        } else {
          hide2();
        }
      });
    }
  );
  watch5(
    () => props.show,
    (newval) => {
      if (newval) {
        show();
      } else {
        hide2();
      }
    }
  );
  useEventListener(element, "bv-toggle", () => {
    modelValue.value = !modelValue.value;
  });
  const buildTriggerableEvent = (type, opts = {}) => new BvTriggerableEvent(type, {
    cancelable: false,
    target: (element == null ? void 0 : element.value) || null,
    relatedTarget: null,
    trigger: null,
    ...opts,
    componentId: computedId == null ? void 0 : computedId.value
  });
  let showTimeout;
  const show = () => {
    if (showRef.value)
      return;
    const event = buildTriggerableEvent("show", { cancelable: true });
    emit("show", event);
    if (event.defaultPrevented) {
      emit("show-prevented", buildTriggerableEvent("show-prevented"));
      if (isVisible2.value) {
        isVisible2.value = false;
      }
      if (modelValue.value && !isCountdown) {
        noAction = true;
        nextTick4(() => {
          modelValue.value = false;
        });
      }
      return;
    }
    renderRef.value = true;
    renderBackdropRef.value = true;
    requestAnimationFrame(() => {
      var _a;
      showTimeout = setTimeout(
        () => {
          var _a2;
          showRef.value = true;
          (_a2 = options.showFn) == null ? void 0 : _a2.call(options);
          if (!modelValue.value) {
            noAction = true;
            nextTick4(() => {
              modelValue.value = true;
            });
          }
        },
        localNoAnimation.value ? 0 : typeof props.delay === "number" ? props.delay : ((_a = props.delay) == null ? void 0 : _a.show) || 0
      );
    });
  };
  const hide2 = (trigger) => {
    var _a;
    if (!showRef.value)
      return;
    const event = buildTriggerableEvent("hide", { cancelable: true, trigger });
    const event2 = buildTriggerableEvent(trigger || "ignore", { cancelable: true, trigger });
    if (trigger === "backdrop" && props.noCloseOnBackdrop || trigger === "esc" && props.noCloseOnEsc) {
      emit("hide-prevented", buildTriggerableEvent("hide-prevented"));
      return;
    }
    if (showTimeout) {
      clearTimeout(showTimeout);
      showTimeout = void 0;
    }
    if (trigger) {
      emit(trigger, event2);
    }
    emit("hide", event);
    if (event.defaultPrevented || event2.defaultPrevented) {
      emit("hide-prevented", buildTriggerableEvent("hide-prevented"));
      noAction = true;
      nextTick4(() => {
        modelValue.value = true;
      });
      return;
    }
    setTimeout(
      () => {
        var _a2;
        isLeaving.value = true;
        showRef.value = false;
        (_a2 = options.hideFn) == null ? void 0 : _a2.call(options);
        if (modelValue.value) {
          noAction = true;
          modelValue.value = isCountdown ? 0 : false;
        }
      },
      localNoAnimation.value ? 0 : typeof props.delay === "number" ? props.delay : ((_a = props.delay) == null ? void 0 : _a.hide) || 0
    );
  };
  const throttleHide = useThrottleFn((a) => hide2(a), 500);
  const throttleShow = useThrottleFn(() => show(), 500);
  const toggle2 = () => {
    const e = buildTriggerableEvent("toggle", { cancelable: true });
    emit("toggle", e);
    if (e.defaultPrevented) {
      emit("toggle-prevented", buildTriggerableEvent("toggle-prevented"));
      return;
    }
    if (showRef.value) {
      hide2();
    } else {
      show();
    }
  };
  const lazyLoadCompleted = ref5(false);
  const markLazyLoadCompleted = () => {
    if (props.lazy === true)
      lazyLoadCompleted.value = true;
  };
  const isLeaving = ref5(false);
  const isActive = ref5(false);
  const isVisible2 = ref5(false);
  const onBeforeEnter = (el) => {
    var _a, _b, _c, _d;
    (_b = (_a = options.transitionProps) == null ? void 0 : _a.onBeforeEnter) == null ? void 0 : _b.call(_a, el);
    (_d = (_c = props.transitionProps) == null ? void 0 : _c.onBeforeEnter) == null ? void 0 : _d.call(_c, el);
    isActive.value = true;
  };
  const onEnter = (el) => {
    var _a, _b, _c, _d;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isVisible2.value = true;
      });
    });
    (_b = (_a = options.transitionProps) == null ? void 0 : _a.onEnter) == null ? void 0 : _b.call(_a, el);
    (_d = (_c = props.transitionProps) == null ? void 0 : _c.onEnter) == null ? void 0 : _d.call(_c, el);
  };
  const onAfterEnter = (el) => {
    var _a, _b, _c, _d;
    emit("shown", buildTriggerableEvent("shown"));
    markLazyLoadCompleted();
    (_b = (_a = options.transitionProps) == null ? void 0 : _a.onAfterEnter) == null ? void 0 : _b.call(_a, el);
    (_d = (_c = props.transitionProps) == null ? void 0 : _c.onAfterEnter) == null ? void 0 : _d.call(_c, el);
    if (localNoAnimation.value) {
      requestAnimationFrame(() => {
        localNoAnimation.value = false;
      });
    }
    if (localTemporaryHide.value) {
      localTemporaryHide.value = false;
    }
  };
  const onBeforeLeave = (el) => {
    var _a, _b, _c, _d;
    if (!isLeaving.value)
      isLeaving.value = true;
    (_b = (_a = options.transitionProps) == null ? void 0 : _a.onBeforeLeave) == null ? void 0 : _b.call(_a, el);
    (_d = (_c = props.transitionProps) == null ? void 0 : _c.onBeforeLeave) == null ? void 0 : _d.call(_c, el);
  };
  const onLeave = (el) => {
    var _a, _b, _c, _d;
    isVisible2.value = false;
    (_b = (_a = options.transitionProps) == null ? void 0 : _a.onLeave) == null ? void 0 : _b.call(_a, el);
    (_d = (_c = props.transitionProps) == null ? void 0 : _c.onLeave) == null ? void 0 : _d.call(_c, el);
  };
  const onAfterLeave = (el) => {
    var _a, _b, _c, _d;
    emit("hidden", buildTriggerableEvent("hidden"));
    (_b = (_a = options.transitionProps) == null ? void 0 : _a.onAfterLeave) == null ? void 0 : _b.call(_a, el);
    (_d = (_c = props.transitionProps) == null ? void 0 : _c.onAfterLeave) == null ? void 0 : _d.call(_c, el);
    isLeaving.value = false;
    isActive.value = false;
    if (localNoAnimation.value) {
      requestAnimationFrame(() => {
        localNoAnimation.value = false;
      });
    }
    requestAnimationFrame(() => {
      if (!localTemporaryHide.value)
        renderRef.value = false;
    });
  };
  const contentShowing = computed8(
    () => localTemporaryHide.value === true || isActive.value === true || props.lazy === false || props.lazy === true && lazyLoadCompleted.value === true && props.unmountLazy === false
  );
  const trapActive = ref5(false);
  watch5(isVisible2, (val) => {
    setTimeout(() => {
      trapActive.value = val;
    }, 32);
  });
  const backdropVisible = ref5(false);
  const backdropReady = ref5(false);
  const transitionFunctions = {
    ...options.transitionProps,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onBeforeLeave,
    onLeave,
    onAfterLeave
  };
  return {
    showRef,
    renderRef,
    renderBackdropRef,
    isVisible: isVisible2,
    isActive,
    trapActive,
    show,
    hide: hide2,
    toggle: toggle2,
    throttleHide,
    throttleShow,
    buildTriggerableEvent,
    computedNoAnimation,
    localNoAnimation,
    localTemporaryHide,
    isLeaving,
    transitionProps: {
      ...fadeBaseTransitionProps,
      ...props.transitionProps,
      ...transitionFunctions
    },
    lazyLoadCompleted,
    markLazyLoadCompleted,
    contentShowing,
    backdropReady,
    backdropVisible,
    backdropTransitionProps: {
      ...fadeBaseTransitionProps,
      onBeforeEnter: () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            backdropVisible.value = true;
          });
        });
        backdropReady.value = false;
      },
      onAfterEnter: () => {
        backdropReady.value = true;
      },
      onBeforeLeave: () => {
        backdropVisible.value = false;
      },
      onAfterLeave: () => {
        backdropReady.value = false;
        requestAnimationFrame(() => {
          renderBackdropRef.value = false;
        });
      }
    }
  };
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/_plugin-vue_export-helper-1tPrXgE0.mjs
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/floatingUi-DOXQNrB3.mjs
var sides = ["top", "right", "bottom", "left"];
var alignments = ["start", "end"];
var placements = sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl)
        return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition$1 = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var arrow$2 = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = clamp(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter((placement) => getAlignment(placement) === alignment), ...allowedPlacements.filter((placement) => getAlignment(placement) !== alignment)] : allowedPlacements.filter((placement) => getSide(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter((placement) => {
    if (alignment) {
      return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
    }
    return true;
  });
}
var autoPlacement$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "autoPlacement",
    options,
    async fn(state) {
      var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
      const {
        rects,
        middlewareData,
        placement,
        platform: platform2,
        elements
      } = state;
      const {
        crossAxis = false,
        alignment,
        allowedPlacements = placements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      const placements$1 = alignment !== void 0 || allowedPlacements === placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
      const currentPlacement = placements$1[currentIndex];
      if (currentPlacement == null) {
        return {};
      }
      const alignmentSides = getAlignmentSides(currentPlacement, rects, await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)));
      if (placement !== currentPlacement) {
        return {
          reset: {
            placement: placements$1[0]
          }
        };
      }
      const currentOverflows = [overflow[getSide(currentPlacement)], overflow[alignmentSides[0]], overflow[alignmentSides[1]]];
      const allOverflows = [...((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || [], {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements$1[currentIndex + 1];
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }
      const placementsSortedByMostSpace = allOverflows.map((d) => {
        const alignment2 = getAlignment(d.placement);
        return [d.placement, alignment2 && crossAxis ? (
          // Check along the mainAxis and main crossAxis side.
          d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0)
        ) : (
          // Check only the mainAxis.
          d.overflows[0]
        ), d.overflows];
      }).sort((a, b) => a[1] - b[1]);
      const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter((d) => d[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        getAlignment(d[0]) ? 2 : 3
      ).every((v) => v <= 0));
      const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: resetPlacement
          }
        };
      }
      return {};
    }
  };
};
var flip$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
var hide$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    async fn(state) {
      const {
        rects
      } = state;
      const {
        strategy = "referenceHidden",
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
function getBoundingRect(rects) {
  const minX = min(...rects.map((rect) => rect.left));
  const minY = min(...rects.map((rect) => rect.top));
  const maxX = max(...rects.map((rect) => rect.right));
  const maxY = max(...rects.map((rect) => rect.bottom));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function getRectsByLine(rects) {
  const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
  const groups = [];
  let prevRect = null;
  for (let i = 0; i < sortedRects.length; i++) {
    const rect = sortedRects[i];
    if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
      groups.push([rect]);
    } else {
      groups[groups.length - 1].push(rect);
    }
    prevRect = rect;
  }
  return groups.map((rect) => rectToClientRect(getBoundingRect(rect)));
}
var inline$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "inline",
    options,
    async fn(state) {
      const {
        placement,
        elements,
        rects,
        platform: platform2,
        strategy
      } = state;
      const {
        padding = 2,
        x,
        y
      } = evaluate(options, state);
      const nativeClientRects = Array.from(await (platform2.getClientRects == null ? void 0 : platform2.getClientRects(elements.reference)) || []);
      const clientRects = getRectsByLine(nativeClientRects);
      const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
      const paddingObject = getPaddingObject(padding);
      function getBoundingClientRect2() {
        if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
          return clientRects.find((rect) => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
        }
        if (clientRects.length >= 2) {
          if (getSideAxis(placement) === "y") {
            const firstRect = clientRects[0];
            const lastRect = clientRects[clientRects.length - 1];
            const isTop = getSide(placement) === "top";
            const top2 = firstRect.top;
            const bottom2 = lastRect.bottom;
            const left2 = isTop ? firstRect.left : lastRect.left;
            const right2 = isTop ? firstRect.right : lastRect.right;
            const width2 = right2 - left2;
            const height2 = bottom2 - top2;
            return {
              top: top2,
              bottom: bottom2,
              left: left2,
              right: right2,
              width: width2,
              height: height2,
              x: left2,
              y: top2
            };
          }
          const isLeftSide = getSide(placement) === "left";
          const maxRight = max(...clientRects.map((rect) => rect.right));
          const minLeft = min(...clientRects.map((rect) => rect.left));
          const measureRects = clientRects.filter((rect) => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
          const top = measureRects[0].top;
          const bottom = measureRects[measureRects.length - 1].bottom;
          const left = minLeft;
          const right = maxRight;
          const width = right - left;
          const height = bottom - top;
          return {
            top,
            bottom,
            left,
            right,
            width,
            height,
            x: left,
            y: top
          };
        }
        return fallback;
      }
      const resetRects = await platform2.getElementRects({
        reference: {
          getBoundingClientRect: getBoundingClientRect2
        },
        floating: elements.floating,
        strategy
      });
      if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
        return {
          reset: {
            rects: resetRects
          }
        };
      }
      return {};
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset$1 = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
var size$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports)
    return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement$1(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement$1(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
var noOffsets = createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement$1(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
  if (ignoreScrollbarX === void 0) {
    ignoreScrollbarX = false;
  }
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 : (
    // RTL <body> scrollbar.
    getWindowScrollBarX(documentElement, htmlRect)
  ));
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement$1(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset = offset$1;
var autoPlacement = autoPlacement$1;
var shift = shift$1;
var flip = flip$1;
var size = size$1;
var hide = hide$1;
var arrow$1 = arrow$2;
var inline = inline$1;
var computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
function isComponentPublicInstance(target) {
  return target != null && typeof target === "object" && "$el" in target;
}
function unwrapElement(target) {
  if (isComponentPublicInstance(target)) {
    const element = target.$el;
    return isNode(element) && getNodeName(element) === "#comment" ? null : element;
  }
  return target;
}
function toValue4(source) {
  return typeof source === "function" ? source() : unref2(source);
}
function arrow(options) {
  return {
    name: "arrow",
    options,
    fn(args) {
      const element = unwrapElement(toValue4(options.element));
      if (element == null) {
        return {};
      }
      return arrow$1({
        element,
        padding: options.padding
      }).fn(args);
    }
  };
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useFloating(reference, floating, options) {
  if (options === void 0) {
    options = {};
  }
  const whileElementsMountedOption = options.whileElementsMounted;
  const openOption = computed9(() => {
    var _toValue;
    return (_toValue = toValue4(options.open)) != null ? _toValue : true;
  });
  const middlewareOption = computed9(() => toValue4(options.middleware));
  const placementOption = computed9(() => {
    var _toValue2;
    return (_toValue2 = toValue4(options.placement)) != null ? _toValue2 : "bottom";
  });
  const strategyOption = computed9(() => {
    var _toValue3;
    return (_toValue3 = toValue4(options.strategy)) != null ? _toValue3 : "absolute";
  });
  const transformOption = computed9(() => {
    var _toValue4;
    return (_toValue4 = toValue4(options.transform)) != null ? _toValue4 : true;
  });
  const referenceElement = computed9(() => unwrapElement(reference.value));
  const floatingElement = computed9(() => unwrapElement(floating.value));
  const x = ref6(0);
  const y = ref6(0);
  const strategy = ref6(strategyOption.value);
  const placement = ref6(placementOption.value);
  const middlewareData = shallowRef3({});
  const isPositioned = ref6(false);
  const floatingStyles = computed9(() => {
    const initialStyles = {
      position: strategy.value,
      left: "0",
      top: "0"
    };
    if (!floatingElement.value) {
      return initialStyles;
    }
    const xVal = roundByDPR(floatingElement.value, x.value);
    const yVal = roundByDPR(floatingElement.value, y.value);
    if (transformOption.value) {
      return {
        ...initialStyles,
        transform: "translate(" + xVal + "px, " + yVal + "px)",
        ...getDPR(floatingElement.value) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy.value,
      left: xVal + "px",
      top: yVal + "px"
    };
  });
  let whileElementsMountedCleanup;
  function update() {
    if (referenceElement.value == null || floatingElement.value == null) {
      return;
    }
    const open = openOption.value;
    computePosition(referenceElement.value, floatingElement.value, {
      middleware: middlewareOption.value,
      placement: placementOption.value,
      strategy: strategyOption.value
    }).then((position) => {
      x.value = position.x;
      y.value = position.y;
      strategy.value = position.strategy;
      placement.value = position.placement;
      middlewareData.value = position.middlewareData;
      isPositioned.value = open !== false;
    });
  }
  function cleanup() {
    if (typeof whileElementsMountedCleanup === "function") {
      whileElementsMountedCleanup();
      whileElementsMountedCleanup = void 0;
    }
  }
  function attach() {
    cleanup();
    if (whileElementsMountedOption === void 0) {
      update();
      return;
    }
    if (referenceElement.value != null && floatingElement.value != null) {
      whileElementsMountedCleanup = whileElementsMountedOption(referenceElement.value, floatingElement.value, update);
      return;
    }
  }
  function reset() {
    if (!openOption.value) {
      isPositioned.value = false;
    }
  }
  watch6([middlewareOption, placementOption, strategyOption, openOption], update, {
    flush: "sync"
  });
  watch6([referenceElement, floatingElement], attach, {
    flush: "sync"
  });
  watch6(openOption, reset, {
    flush: "sync"
  });
  if (getCurrentScope2()) {
    onScopeDispose2(cleanup);
  }
  return {
    x: shallowReadonly(x),
    y: shallowReadonly(y),
    strategy: shallowReadonly(strategy),
    placement: shallowReadonly(placement),
    middlewareData: shallowReadonly(middlewareData),
    isPositioned: shallowReadonly(isPositioned),
    floatingStyles,
    update
  };
}
var useMouse2 = createSharedComposable(useMouse);
var _hoisted_1 = ["id"];
var _hoisted_2 = ["id"];
var _sfc_main2 = defineComponent3({
  ...{
    inheritAttrs: false
  },
  __name: "BPopover",
  props: mergeModels({
    boundary: { default: "clippingAncestors" },
    boundaryPadding: { default: void 0 },
    click: { type: Boolean, default: false },
    closeOnHide: { type: Boolean, default: false },
    content: { default: void 0 },
    customClass: { default: "" },
    delay: { default: () => ({ show: 100, hide: 300 }) },
    floatingMiddleware: { default: void 0 },
    hideMargin: { default: 2 },
    id: { default: void 0 },
    inline: { type: Boolean, default: false },
    manual: { type: Boolean, default: false },
    noAutoClose: { type: Boolean, default: false },
    noFlip: { type: Boolean, default: false },
    noHide: { type: Boolean, default: false },
    noShift: { type: Boolean, default: false },
    noSize: { type: Boolean, default: false },
    noninteractive: { type: Boolean, default: false },
    offset: { default: null },
    placement: { default: "top" },
    realtime: { type: Boolean, default: false },
    reference: { default: null },
    strategy: { default: "absolute" },
    target: { default: null },
    title: { default: void 0 },
    tooltip: { type: Boolean, default: false },
    variant: { default: null },
    teleportDisabled: { type: Boolean, default: false },
    teleportTo: { default: void 0 },
    initialAnimation: { type: Boolean, default: false },
    noAnimation: { type: Boolean },
    noFade: { type: Boolean, default: false },
    lazy: { type: Boolean, default: false },
    unmountLazy: { type: Boolean, default: false },
    show: { type: Boolean, default: false },
    transProps: {},
    visible: { type: Boolean, default: false }
  }, {
    "modelValue": { type: Boolean, ...{
      default: false
    } },
    "modelModifiers": {}
  }),
  emits: mergeModels(["hidden", "hide", "hide-prevented", "show", "show-prevented", "shown", "pointerleave", "blur", "click-outside", "close-on-hide"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BPopover");
    const emit = __emit;
    const slots = useSlots();
    const modelValue = useModel(__props, "modelValue");
    const computedId = useId(() => props.id, "popover");
    const hidden = ref6(false);
    const element = useTemplateRef("_element");
    const content = useTemplateRef("_content");
    const arrow$12 = useTemplateRef("_arrow");
    const placeholder = useTemplateRef("_placeholder");
    const floatingTarget = ref6(null);
    const trigger = ref6(null);
    const isAutoPlacement = computed9(() => props.placement.startsWith("auto"));
    const offsetNumber = useToNumber(() => props.offset ?? NaN);
    const boundary = computed9(
      () => isBoundary(props.boundary) ? props.boundary : void 0
    );
    const rootBoundary = computed9(
      () => isRootBoundary(props.boundary) ? props.boundary : void 0
    );
    const sizeStyles = ref6({});
    const floatingMiddleware = computed9(() => {
      if (props.floatingMiddleware !== void 0) {
        return props.floatingMiddleware;
      }
      const off = props.offset !== null ? offsetNumber.value : props.tooltip ? 6 : 8;
      const arr = [offset(off)];
      if (props.noFlip === false && !isAutoPlacement.value) {
        arr.push(
          flip({
            boundary: boundary.value,
            rootBoundary: rootBoundary.value,
            padding: props.boundaryPadding
          })
        );
      }
      if (isAutoPlacement.value) {
        arr.push(
          autoPlacement({
            alignment: props.placement.split("-")[1] || void 0,
            boundary: boundary.value,
            rootBoundary: rootBoundary.value,
            padding: props.boundaryPadding
          })
        );
      }
      if (props.noShift === false) {
        arr.push(
          shift({
            boundary: boundary.value,
            rootBoundary: rootBoundary.value,
            padding: props.boundaryPadding
          })
        );
      }
      if (props.noHide === false) {
        arr.push(
          hide({
            boundary: boundary.value,
            rootBoundary: rootBoundary.value,
            padding: props.boundaryPadding
          })
        );
      }
      if (props.inline === true) {
        arr.push(inline());
      }
      arr.push(arrow({ element: arrow$12, padding: 10 }));
      if (props.noSize === false) {
        arr.push(
          size({
            boundary: boundary.value,
            rootBoundary: rootBoundary.value,
            padding: props.boundaryPadding,
            apply({ availableWidth, availableHeight }) {
              var _a, _b;
              sizeStyles.value = {
                maxHeight: availableHeight >= (((_a = content.value) == null ? void 0 : _a.scrollHeight) ?? 0) ? void 0 : availableHeight ? `${Math.max(0, availableHeight)}px` : void 0,
                maxWidth: availableWidth >= (((_b = content.value) == null ? void 0 : _b.scrollWidth) ?? 0) ? void 0 : availableWidth ? `${Math.max(0, availableWidth)}px` : void 0
              };
            }
          })
        );
      }
      return arr;
    });
    const placementRef = computed9(
      () => isAutoPlacement.value ? void 0 : props.placement
    );
    const { floatingStyles, middlewareData, placement, update } = useFloating(floatingTarget, element, {
      placement: placementRef,
      middleware: floatingMiddleware,
      strategy: toRef3(() => props.strategy),
      whileElementsMounted: (...args) => {
        const cleanup = autoUpdate(...args, { animationFrame: props.realtime });
        return cleanup;
      }
    });
    const arrowStyle = ref6({ position: "absolute" });
    watch6(middlewareData, (newValue) => {
      var _a, _b;
      if (props.noHide === false) {
        if (((_a = newValue.hide) == null ? void 0 : _a.referenceHidden) && !hidden.value && showRef.value) {
          if (props.closeOnHide && !props.noAutoClose && !props.manual) {
            throttleHide("close-on-hide");
          } else {
            localTemporaryHide.value = true;
            hidden.value = true;
          }
        } else if (localTemporaryHide.value && !((_b = newValue.hide) == null ? void 0 : _b.referenceHidden)) {
          localTemporaryHide.value = false;
          hidden.value = false;
        }
      }
      if (newValue.arrow) {
        const { x: x2, y: y2 } = newValue.arrow;
        arrowStyle.value = {
          position: "absolute",
          top: y2 ? `${y2}px` : "",
          left: x2 ? `${x2}px` : ""
        };
      }
    });
    const {
      showRef,
      hide: hide$12,
      show,
      toggle: toggle2,
      throttleHide,
      computedNoAnimation,
      transitionProps,
      contentShowing,
      isVisible: isVisible2,
      renderRef,
      localTemporaryHide
    } = useShowHide(modelValue, props, emit, element, computedId, {
      showFn: () => {
        if (hidden.value) {
          update();
        }
      }
    });
    const computedClasses = computed9(() => {
      const type = props.tooltip ? "tooltip" : "popover";
      return [
        type,
        `b-${type}`,
        {
          [`b-${type}-${props.variant}`]: props.variant !== null,
          show: isVisible2.value && !hidden.value,
          fade: !computedNoAnimation.value,
          [`${props.customClass}`]: props.customClass !== void 0,
          [`bs-${type}-${resolveBootstrapPlacement(placement.value)}`]: placement.value !== void 0
        }
      ];
    });
    const { x, y } = useMouse2();
    const isElementAndTriggerOutside = () => {
      var _a, _b;
      const triggerRect = (_a = trigger.value) == null ? void 0 : _a.getBoundingClientRect();
      const elementRect = (_b = element.value) == null ? void 0 : _b.getBoundingClientRect();
      const margin = parseInt(props.hideMargin, 10) || 0;
      const offsetX = (window == null ? void 0 : window.scrollX) || 0;
      const offsetY = (window == null ? void 0 : window.scrollY) || 0;
      const triggerIsOutside = !triggerRect || x.value < triggerRect.left + offsetX - margin || x.value > triggerRect.right + offsetX + margin || y.value < triggerRect.top + offsetY - margin || y.value > triggerRect.bottom + offsetY + margin;
      const isOutside = !elementRect || x.value < elementRect.left + offsetX - margin || x.value > elementRect.right + offsetX + margin || y.value < elementRect.top + offsetY - margin || y.value > elementRect.bottom + offsetY + margin;
      return { triggerIsOutside, isOutside };
    };
    let looptimeout;
    const tryHide = (e) => {
      var _a, _b, _c;
      const delay3 = typeof props.delay === "number" ? props.delay : ((_a = props.delay) == null ? void 0 : _a.hide) || 0;
      const { triggerIsOutside, isOutside } = isElementAndTriggerOutside();
      if (!props.noninteractive && isOutside && triggerIsOutside && !((_b = element.value) == null ? void 0 : _b.contains(document == null ? void 0 : document.activeElement)) && !((_c = trigger.value) == null ? void 0 : _c.contains(document == null ? void 0 : document.activeElement)) || props.noninteractive && triggerIsOutside) {
        hide$12(e == null ? void 0 : e.type);
      } else {
        if (looptimeout)
          clearTimeout(looptimeout);
        looptimeout = setTimeout(
          () => {
            tryHide(e);
          },
          delay3 < 50 ? 50 : delay3
        );
      }
    };
    watch6(isVisible2, () => {
      update();
    });
    __expose({
      hide: hide$12,
      show,
      toggle: toggle2
    });
    const localToggle = (e) => {
      if (showRef.value) {
        hide$12(e.type === "click" ? "click" : "toggle");
      } else {
        show();
      }
    };
    const bind22 = () => {
      var _a;
      if (props.target) {
        const elem = getElement(toValue$1(props.target));
        if (elem) {
          trigger.value = elem;
        } else {
          console.warn("Target element not found", props.target);
        }
      } else {
        trigger.value = (_a = placeholder.value) == null ? void 0 : _a.nextElementSibling;
      }
      if (props.reference) {
        const elem = getElement(toValue$1(props.reference));
        if (elem) {
          floatingTarget.value = elem;
        } else {
          console.warn("Reference element not found", props.reference);
        }
      } else {
        floatingTarget.value = trigger.value;
      }
      if (!trigger.value || props.manual) {
        return;
      }
      if (props.click) {
        trigger.value.addEventListener("click", localToggle);
        return;
      }
      trigger.value.addEventListener("pointerenter", show);
      trigger.value.addEventListener("pointerleave", tryHide);
      trigger.value.addEventListener("focus", show);
      trigger.value.addEventListener("blur", tryHide);
    };
    const unbind2 = () => {
      if (trigger.value) {
        trigger.value.removeEventListener("click", localToggle);
        trigger.value.removeEventListener("pointerenter", show);
        trigger.value.removeEventListener("pointerleave", tryHide);
        trigger.value.removeEventListener("focus", show);
        trigger.value.removeEventListener("blur", tryHide);
      }
    };
    onClickOutside(
      element,
      () => {
        if (showRef.value && props.click && !props.noAutoClose && !props.manual)
          hide$12("click-outside");
      },
      { ignore: [trigger] }
    );
    watch6([() => props.click, () => props.target, () => props.reference], () => {
      unbind2();
      bind22();
    });
    onMounted5(() => {
      bind22();
      nextTick5(() => {
        update();
      });
    });
    onBeforeUnmount(unbind2);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("span", {
          id: unref2(computedId) + "_placeholder",
          ref: "_placeholder"
        }, null, 8, _hoisted_1),
        renderSlot(_ctx.$slots, "target", {
          show: unref2(show),
          hide: unref2(hide$12),
          toggle: unref2(toggle2),
          visible: unref2(showRef)
        }, void 0, true),
        createVNode(_sfc_main, {
          to: unref2(props).teleportTo,
          disabled: !unref2(props).teleportTo || unref2(props).teleportDisabled
        }, {
          default: withCtx(() => [
            unref2(renderRef) || unref2(contentShowing) ? (openBlock(), createBlock(Transition, mergeProps({ key: 0 }, unref2(transitionProps), { appear: modelValue.value }), {
              default: withCtx(() => [
                withDirectives(createElementVNode("div", mergeProps({ id: unref2(computedId) }, _ctx.$attrs, {
                  ref: "_element",
                  class: computedClasses.value,
                  role: "tooltip",
                  tabindex: "-1",
                  style: unref2(floatingStyles)
                }), [
                  createElementVNode("div", {
                    ref: "_arrow",
                    class: normalizeClass(`${unref2(props).tooltip ? "tooltip" : "popover"}-arrow`),
                    style: normalizeStyle(arrowStyle.value),
                    "data-popper-arrow": ""
                  }, null, 6),
                  createElementVNode("div", {
                    ref: "_content",
                    class: "overflow-auto",
                    style: normalizeStyle(sizeStyles.value)
                  }, [
                    unref2(props).title || slots.title ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: normalizeClass(["position-sticky top-0", unref2(props).tooltip ? "tooltip-inner" : "popover-header"])
                    }, [
                      renderSlot(_ctx.$slots, "title", {}, () => [
                        createTextVNode(toDisplayString(unref2(props).title), 1)
                      ], true)
                    ], 2)) : createCommentVNode("", true),
                    unref2(props).tooltip && !slots.title && !unref2(props).title || !unref2(props).tooltip ? (openBlock(), createElementBlock("div", {
                      key: 1,
                      class: normalizeClass(unref2(props).tooltip ? "tooltip-inner" : "popover-body")
                    }, [
                      renderSlot(_ctx.$slots, "default", {}, () => [
                        createTextVNode(toDisplayString(unref2(props).content), 1)
                      ], true)
                    ], 2)) : createCommentVNode("", true)
                  ], 4)
                ], 16, _hoisted_2), [
                  [vShow, unref2(showRef) && !hidden.value]
                ])
              ]),
              _: 3
            }, 16, ["appear"])) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["to", "disabled"])
      ], 64);
    };
  }
});
var BPopover = _export_sfc(_sfc_main2, [["__scopeId", "data-v-7b0e229a"]]);
var resolveBootstrapPlacement = (placement) => {
  const [_placement] = placement.split("-");
  switch (_placement) {
    case "left":
      return "start";
    case "right":
      return "end";
    default:
      return _placement;
  }
};
var resolveActiveStatus = (values) => typeof values !== "object" || values.active !== false;
var resolveContent = (values, el) => {
  const isActive = resolveActiveStatus(values);
  if (!isActive)
    return {};
  const missingBindingValue = typeof values === "undefined" || typeof values === "object" && !values.title && !values.content;
  const title = el.getAttribute("title") || el.getAttribute("data-original-title");
  if (missingBindingValue) {
    if (title) {
      el.removeAttribute("title");
      el.setAttribute("data-original-title", title);
      return {
        content: title
      };
    }
    return {};
  }
  if (typeof values === "string") {
    return {
      content: values
    };
  }
  return {
    title: (values == null ? void 0 : values.title) ? values == null ? void 0 : values.title : void 0,
    content: (values == null ? void 0 : values.content) ? values == null ? void 0 : values.content : void 0
  };
};
var resolveDirectiveProps = (binding, el) => ({
  target: el,
  modelValue: binding.modifiers.show,
  inline: binding.modifiers.inline,
  click: binding.modifiers.click,
  realtime: binding.modifiers.realtime,
  lazy: binding.modifiers.lazy,
  placement: binding.modifiers.left ? "left" : binding.modifiers.right ? "right" : binding.modifiers.bottom ? "bottom" : binding.modifiers.top ? "top" : void 0,
  html: true,
  ...typeof binding.value === "object" ? binding.value : {},
  ...binding.modifiers.interactive ? { noninteractive: false } : {},
  title: null,
  content: null
});
var bind = (el, binding, props) => {
  var _a;
  const div = document.createElement("span");
  if (binding.modifiers.body)
    document.body.appendChild(div);
  else if (binding.modifiers.child)
    el.appendChild(div);
  else
    (_a = el.parentNode) == null ? void 0 : _a.insertBefore(div, el.nextSibling);
  render(h2(BPopover, props), div);
  el.$__element = div;
};
var unbind = (el) => {
  const div = el.$__element;
  if (div)
    render(null, div);
  setTimeout(() => {
    div == null ? void 0 : div.remove();
  }, 0);
  delete el.$__element;
};
var isBoundary = (input) => input === "clippingAncestors" || input instanceof Element || Array.isArray(input);
var isRootBoundary = (input) => !isBoundary(input);

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/directives/BPopover/index.mjs
var vBPopover = {
  mounted(el, binding) {
    var _a, _b, _c, _d;
    const defaults = (_d = (_c = (_b = (_a = binding.instance) == null ? void 0 : _a.$.appContext) == null ? void 0 : _b.provides) == null ? void 0 : _c[defaultsKey]) == null ? void 0 : _d.value;
    const isActive = resolveActiveStatus(binding.value);
    if (!isActive)
      return;
    const text = resolveContent(binding.value, el);
    if (!text.content && !text.title)
      return;
    el.$__binding = JSON.stringify([binding.modifiers, binding.value]);
    bind(el, binding, {
      ...defaults["BPopover"] || {},
      ...resolveDirectiveProps(binding, el),
      ...text
    });
  },
  updated(el, binding) {
    var _a, _b, _c, _d;
    const defaults = (_d = (_c = (_b = (_a = binding.instance) == null ? void 0 : _a.$.appContext) == null ? void 0 : _b.provides) == null ? void 0 : _c[defaultsKey]) == null ? void 0 : _d.value;
    const isActive = resolveActiveStatus(binding.value);
    if (!isActive)
      return;
    const text = resolveContent(binding.value, el);
    if (!text.content && !text.title)
      return;
    delete binding.oldValue;
    if (el.$__binding === JSON.stringify([binding.modifiers, binding.value]))
      return;
    unbind(el);
    bind(el, binding, {
      ...defaults["BPopover"] || {},
      ...resolveDirectiveProps(binding, el),
      ...text
    });
    el.$__binding = JSON.stringify([binding.modifiers, binding.value]);
  },
  beforeUnmount(el) {
    unbind(el);
  }
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/directives/BScrollspy/index.mjs
import "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/object-DIbMZaP9.mjs
var omit = (objToPluck, keysToPluck) => Object.keys(objToPluck).filter((key) => !keysToPluck.map((el) => el.toString()).includes(key)).reduce((result, key) => ({ ...result, [key]: objToPluck[key] }), {});
var pick = (objToPluck, keysToPluck) => [...keysToPluck].reduce(
  (memo, prop) => {
    memo[prop] = objToPluck[prop];
    return memo;
  },
  {}
);
var get = (value, path, defaultValue) => {
  const segments = path.split(/[.[\]]/g);
  let current = value;
  for (const key of segments) {
    if (current === null)
      return defaultValue;
    if (current === void 0)
      return defaultValue;
    if (key.trim() === "")
      continue;
    current = current[key];
  }
  if (current === void 0)
    return defaultValue;
  return current;
};
var set = (initial, path, value) => {
  const clone = (obj) => {
    const isPrimitive = (value2) => value2 === void 0 || value2 === null || typeof value2 !== "object" && typeof value2 !== "function";
    if (isPrimitive(obj)) {
      return obj;
    }
    if (typeof obj === "function") {
      return obj.bind({});
    }
    const newObj = new obj.constructor();
    Object.getOwnPropertyNames(obj).forEach((prop) => {
      newObj[prop] = obj[prop];
    });
    return newObj;
  };
  const toInt = (value2, defaultValue) => {
    const def = defaultValue === void 0 ? 0 : defaultValue;
    if (value2 === null || value2 === void 0) {
      return def;
    }
    const result = Number.parseInt(value2);
    return Number.isNaN(result) ? def : result;
  };
  if (!initial)
    return {};
  if (!path || value === void 0)
    return initial;
  const segments = path.split(/[.[\]]/g).filter((x) => !!x.trim());
  const _set = (node) => {
    if (segments.length > 1) {
      const key = segments.shift();
      const nextIsNum = toInt(segments[0], null) === null ? false : true;
      node[key] = node[key] === void 0 ? nextIsNum ? [] : {} : node[key];
      _set(node[key]);
    } else {
      node[segments[0]] = value;
    }
  };
  const cloned = clone(initial);
  _set(cloned);
  return cloned;
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/directives/BScrollspy/index.mjs
var bind2 = (el, binding) => {
  if (el.$__scrollspy)
    el.$__scrollspy.cleanup();
  const { arg, value } = binding;
  const isObject3 = typeof value === "object" && value !== null;
  const content = arg ? arg : typeof value === "string" ? value : isObject3 ? value.content || value.element : null;
  el.$__scrollspy = useScrollspy(content, el, isObject3 ? omit(value, ["content", "element"]) : {});
};
var vBScrollspy = {
  mounted: bind2,
  updated: bind2,
  beforeUnmount(el) {
    if (el.$__scrollspy)
      el.$__scrollspy.cleanup();
  }
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/directives/BTooltip/index.mjs
import "vue";
var vBTooltip = {
  mounted(el, binding) {
    var _a, _b, _c, _d;
    const defaults = (_d = (_c = (_b = (_a = binding.instance) == null ? void 0 : _a.$.appContext) == null ? void 0 : _b.provides) == null ? void 0 : _c[defaultsKey]) == null ? void 0 : _d.value;
    const isActive = resolveActiveStatus(binding.value);
    if (!isActive)
      return;
    const text = resolveContent(binding.value, el);
    if (!text.content && !text.title)
      return;
    el.$__binding = JSON.stringify([binding.modifiers, binding.value]);
    bind(el, binding, {
      noninteractive: true,
      ...defaults["BTooltip"] || {},
      ...resolveDirectiveProps(binding, el),
      title: text.title ?? text.content ?? "",
      tooltip: isActive
    });
  },
  updated(el, binding) {
    var _a, _b, _c, _d;
    const defaults = (_d = (_c = (_b = (_a = binding.instance) == null ? void 0 : _a.$.appContext) == null ? void 0 : _b.provides) == null ? void 0 : _c[defaultsKey]) == null ? void 0 : _d.value;
    const isActive = resolveActiveStatus(binding.value);
    if (!isActive)
      return;
    const text = resolveContent(binding.value, el);
    if (!text.content && !text.title)
      return;
    delete binding.oldValue;
    if (el.$__binding === JSON.stringify([binding.modifiers, binding.value]))
      return;
    unbind(el);
    bind(el, binding, {
      noninteractive: true,
      ...defaults["BTooltip"] || {},
      ...resolveDirectiveProps(binding, el),
      title: text.title ?? text.content ?? "",
      tooltip: isActive
    });
    el.$__binding = JSON.stringify([binding.modifiers, binding.value]);
  },
  beforeUnmount(el) {
    unbind(el);
  }
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/index-CXpBEYSc.mjs
var index2 = Object.freeze(Object.defineProperty({
  __proto__: null,
  vBColorMode,
  vBModal: vBToggle,
  vBPopover,
  vBScrollspy,
  vBToggle,
  vBTooltip
}, Symbol.toStringTag, { value: "Module" }));

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/index-i-UFv70c.mjs
var index3 = Object.freeze(Object.defineProperty({
  __proto__: null,
  BvCarouselEvent,
  BvEvent,
  BvTriggerableEvent
}, Symbol.toStringTag, { value: "Module" }));

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BAccordionItem.vue_vue_type_script_setup_true_lang-Mqtf0bUM.mjs
import { defineComponent as defineComponent5, mergeModels as mergeModels3, useModel as useModel3, computed as computed11, provide as provide3, readonly as readonly5, toRef as toRef5, openBlock as openBlock3, createElementBlock as createElementBlock3, unref as unref4, normalizeClass as normalizeClass2, renderSlot as renderSlot3, useAttrs, inject as inject8, onMounted as onMounted6, nextTick as nextTick6, watch as watch7, mergeProps as mergeProps3, createVNode as createVNode2, withCtx as withCtx3, createBlock as createBlock3, resolveDynamicComponent as resolveDynamicComponent2, createElementVNode as createElementVNode2, createTextVNode as createTextVNode2, toDisplayString as toDisplayString2 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BCollapse.vue_vue_type_script_setup_true_lang-BBjRm6fq.mjs
import { defineComponent as defineComponent4, mergeModels as mergeModels2, useModel as useModel2, useTemplateRef as useTemplateRef2, computed as computed10, readonly as readonly4, provide as provide2, toRef as toRef4, inject as inject7, onBeforeUnmount as onBeforeUnmount2, openBlock as openBlock2, createElementBlock as createElementBlock2, Fragment as Fragment2, renderSlot as renderSlot2, normalizeProps, guardReactiveProps, unref as unref3, createBlock as createBlock2, Transition as Transition2, mergeProps as mergeProps2, withCtx as withCtx2, withDirectives as withDirectives2, resolveDynamicComponent, createCommentVNode as createCommentVNode2, vShow as vShow2 } from "vue";
var _sfc_main3 = defineComponent4({
  ...{
    inheritAttrs: false
  },
  __name: "BCollapse",
  props: mergeModels2({
    horizontal: { type: Boolean, default: false },
    id: { default: void 0 },
    isNav: { type: Boolean, default: false },
    tag: { default: "div" },
    initialAnimation: { type: Boolean, default: false },
    noAnimation: { type: Boolean, default: false },
    noFade: { type: Boolean },
    lazy: { type: Boolean, default: false },
    unmountLazy: { type: Boolean, default: false },
    show: { type: Boolean, default: false },
    transProps: {},
    visible: { type: Boolean, default: false }
  }, {
    "modelValue": { type: Boolean, ...{
      default: false
    } },
    "modelModifiers": {}
  }),
  emits: mergeModels2(["hidden", "hide", "hide-prevented", "show", "show-prevented", "shown", "toggle"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    var _a;
    const _props = __props;
    const props = useDefaults(_props, "BCollapse");
    const emit = __emit;
    const modelValue = useModel2(__props, "modelValue");
    const computedId = useId(() => props.id, "collapse");
    const element = useTemplateRef2("_element");
    let inCollapse = false;
    const onEnter = (el) => {
      inCollapse = true;
      requestAnimationFrame(() => {
        if (props.horizontal) {
          el.style.width = `${el.scrollWidth}px`;
        } else {
          el.style.height = `${el.scrollHeight}px`;
        }
      });
    };
    const onBeforeLeave = (el) => {
      if (inCollapse) {
        return;
      }
      if (props.horizontal) {
        el.style.width = `${el.scrollWidth}px`;
      } else {
        el.style.height = `${el.scrollHeight}px`;
      }
      el.offsetHeight;
    };
    const onLeave = (el) => {
      requestAnimationFrame(() => {
        if (props.horizontal) {
          el.style.width = ``;
        } else {
          el.style.height = ``;
        }
      });
    };
    const onAfterEnter = (el) => {
      el.style.height = ``;
      el.style.width = ``;
      inCollapse = false;
    };
    const onAfterLeave = (el) => {
      el.style.height = ``;
      el.style.width = ``;
      inCollapse = false;
    };
    const {
      showRef,
      renderRef,
      hide: hide2,
      show,
      toggle: toggle2,
      isActive,
      computedNoAnimation,
      contentShowing,
      transitionProps
    } = useShowHide(modelValue, props, emit, element, computedId, {
      // addShowClass: false,
      transitionProps: {
        onBeforeLeave,
        onEnter,
        onLeave,
        onAfterEnter,
        onAfterLeave,
        enterToClass: "",
        leaveToClass: "",
        enterFromClass: "",
        leaveFromClass: "",
        enterActiveClass: "",
        leaveActiveClass: ""
      }
    });
    const computedClasses = computed10(() => ({
      "show": isActive.value,
      "navbar-collapse": props.isNav,
      "collapse-horizontal": props.horizontal
    }));
    const sharedSlots = computed10(() => ({
      toggle: toggle2,
      show,
      hide: hide2,
      id: computedId.value,
      visible: showRef.value
    }));
    __expose({
      hide: hide2,
      isNav: props.isNav,
      show,
      toggle: toggle2,
      visible: readonly4(showRef)
    });
    provide2(collapseInjectionKey, {
      id: computedId,
      hide: hide2,
      show,
      toggle: toggle2,
      visible: readonly4(showRef),
      isNav: toRef4(() => props.isNav)
    });
    const appRegistry = (_a = inject7(
      globalCollapseStorageInjectionKey,
      void 0
    )) == null ? void 0 : _a({
      id: computedId.value,
      toggle: toggle2,
      value: readonly4(showRef)
    });
    onBeforeUnmount2(() => {
      appRegistry == null ? void 0 : appRegistry.unregister();
    });
    return (_ctx, _cache) => {
      return openBlock2(), createElementBlock2(Fragment2, null, [
        renderSlot2(_ctx.$slots, "header", normalizeProps(guardReactiveProps(sharedSlots.value))),
        unref3(renderRef) || unref3(contentShowing) ? (openBlock2(), createBlock2(Transition2, mergeProps2({ key: 0 }, unref3(transitionProps), {
          "enter-active-class": unref3(computedNoAnimation) ? "" : "collapsing",
          "leave-active-class": unref3(computedNoAnimation) ? "" : "collapsing",
          appear: modelValue.value
        }), {
          default: withCtx2(() => [
            withDirectives2((openBlock2(), createBlock2(resolveDynamicComponent(unref3(props).tag), mergeProps2({
              id: unref3(computedId),
              ref: "_element",
              class: ["collapse", computedClasses.value],
              "is-nav": unref3(props).isNav
            }, _ctx.$attrs), {
              default: withCtx2(() => [
                unref3(contentShowing) ? renderSlot2(_ctx.$slots, "default", normalizeProps(mergeProps2({ key: 0 }, sharedSlots.value))) : createCommentVNode2("", true)
              ]),
              _: 3
            }, 16, ["id", "class", "is-nav"])), [
              [vShow2, unref3(showRef)]
            ])
          ]),
          _: 3
        }, 16, ["enter-active-class", "leave-active-class", "appear"])) : createCommentVNode2("", true),
        renderSlot2(_ctx.$slots, "footer", normalizeProps(guardReactiveProps(sharedSlots.value)))
      ], 64);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BAccordionItem.vue_vue_type_script_setup_true_lang-Mqtf0bUM.mjs
var _hoisted_1$1 = ["id"];
var _sfc_main$1 = defineComponent5({
  __name: "BAccordion",
  props: mergeModels3({
    flush: { type: Boolean, default: false },
    free: { type: Boolean, default: false },
    id: { default: void 0 },
    initialAnimation: { type: Boolean, default: false },
    lazy: { type: Boolean, default: false },
    unmountLazy: { type: Boolean, default: false }
  }, {
    "modelValue": {
      default: void 0
    },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BAccordion");
    const modelValue = useModel3(__props, "modelValue");
    const computedId = useId(() => props.id, "accordion");
    const computedClasses = computed11(() => ({
      "accordion-flush": props.flush
    }));
    provide3(accordionInjectionKey, {
      openItem: readonly5(modelValue),
      free: toRef5(() => props.free),
      initialAnimation: toRef5(() => props.initialAnimation),
      lazy: toRef5(() => props.lazy),
      unmountLazy: toRef5(() => props.unmountLazy),
      setOpenItem: (id) => {
        modelValue.value = id;
      }
    });
    return (_ctx, _cache) => {
      return openBlock3(), createElementBlock3("div", {
        id: unref4(computedId),
        class: normalizeClass2(["accordion", computedClasses.value])
      }, [
        renderSlot3(_ctx.$slots, "default")
      ], 10, _hoisted_1$1);
    };
  }
});
var _hoisted_12 = ["aria-expanded", "aria-controls", "onClick"];
var _sfc_main4 = defineComponent5({
  ...{
    inheritAttrs: false
  },
  __name: "BAccordionItem",
  props: mergeModels3({
    bodyAttrs: { default: void 0 },
    bodyClass: { default: void 0 },
    buttonAttrs: { default: void 0 },
    buttonClass: { default: void 0 },
    collapseClass: { default: void 0 },
    headerAttrs: { default: void 0 },
    headerClass: { default: void 0 },
    headerTag: { default: "h2" },
    horizontal: { type: Boolean, default: void 0 },
    id: { default: void 0 },
    isNav: { type: Boolean, default: void 0 },
    lazy: { type: Boolean, default: false },
    unmountLazy: { type: Boolean, default: false },
    tag: { default: void 0 },
    title: { default: void 0 },
    show: { type: Boolean, default: void 0 },
    visible: { type: Boolean, default: false },
    wrapperAttrs: { default: void 0 }
  }, {
    "modelValue": { type: Boolean, ...{
      default: false
    } },
    "modelModifiers": {}
  }),
  emits: mergeModels3(["hidden", "hide", "hide-prevented", "show", "show-prevented", "shown"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const { class: wrapperClass, ...collapseAttrs } = useAttrs();
    const _props = __props;
    const props = useDefaults(_props, "BAccordionItem");
    const emit = __emit;
    const parentData = inject8(accordionInjectionKey, null);
    const computedId = useId(() => props.id, "accordion_item");
    const modelValue = useModel3(__props, "modelValue");
    modelValue.value = (parentData == null ? void 0 : parentData.openItem.value) === computedId.value && !(parentData == null ? void 0 : parentData.initialAnimation.value);
    if (modelValue.value && !(parentData == null ? void 0 : parentData.free.value)) {
      parentData == null ? void 0 : parentData.setOpenItem(computedId.value);
    }
    onMounted6(() => {
      if (!modelValue.value && (parentData == null ? void 0 : parentData.openItem.value) === computedId.value) {
        nextTick6(() => {
          modelValue.value = true;
        });
      }
    });
    watch7(
      () => parentData == null ? void 0 : parentData.openItem.value,
      () => modelValue.value = (parentData == null ? void 0 : parentData.openItem.value) === computedId.value && !(parentData == null ? void 0 : parentData.free.value)
    );
    watch7(modelValue, () => {
      if (modelValue.value && !(parentData == null ? void 0 : parentData.free.value))
        parentData == null ? void 0 : parentData.setOpenItem(computedId.value);
    });
    return (_ctx, _cache) => {
      var _a, _b;
      return openBlock3(), createElementBlock3("div", mergeProps3({ class: "accordion-item" }, unref4(props).wrapperAttrs, { class: unref4(wrapperClass) }), [
        createVNode2(_sfc_main3, mergeProps3({
          id: unref4(computedId),
          modelValue: modelValue.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
          class: ["accordion-collapse", unref4(props).collapseClass],
          "aria-labelledby": `${unref4(computedId)}-heading`
        }, collapseAttrs, {
          tag: unref4(props).tag,
          show: unref4(props).show,
          horizontal: unref4(props).horizontal,
          visible: unref4(props).visible,
          "is-nav": unref4(props).isNav,
          lazy: unref4(props).lazy || ((_a = unref4(parentData)) == null ? void 0 : _a.lazy.value),
          "unmount-lazy": unref4(props).unmountLazy || ((_b = unref4(parentData)) == null ? void 0 : _b.unmountLazy.value),
          onShow: _cache[1] || (_cache[1] = ($event) => emit("show", $event)),
          onShown: _cache[2] || (_cache[2] = ($event) => emit("shown")),
          onHide: _cache[3] || (_cache[3] = ($event) => emit("hide", $event)),
          onHidden: _cache[4] || (_cache[4] = ($event) => emit("hidden")),
          onHidePrevented: _cache[5] || (_cache[5] = ($event) => emit("hide-prevented")),
          onShowPrevented: _cache[6] || (_cache[6] = ($event) => emit("show-prevented"))
        }), {
          header: withCtx3(({ visible: toggleVisible, toggle: slotToggle }) => [
            (openBlock3(), createBlock3(resolveDynamicComponent2(unref4(props).headerTag), mergeProps3({
              id: `${unref4(computedId)}-heading`,
              class: ["accordion-header", unref4(props).headerClass]
            }, unref4(props).headerAttrs), {
              default: withCtx3(() => [
                createElementVNode2("button", mergeProps3({ class: "accordion-button" }, unref4(props).buttonAttrs, {
                  class: [{ collapsed: !toggleVisible }, unref4(props).buttonClass],
                  type: "button",
                  "aria-expanded": toggleVisible ? "true" : "false",
                  "aria-controls": unref4(computedId),
                  onClick: slotToggle
                }), [
                  renderSlot3(_ctx.$slots, "title", {}, () => [
                    createTextVNode2(toDisplayString2(unref4(props).title), 1)
                  ])
                ], 16, _hoisted_12)
              ]),
              _: 2
            }, 1040, ["id", "class"]))
          ]),
          default: withCtx3(() => [
            createElementVNode2("div", mergeProps3({ class: "accordion-body" }, unref4(props).bodyAttrs, {
              class: unref4(props).bodyClass
            }), [
              renderSlot3(_ctx.$slots, "default")
            ], 16)
          ]),
          _: 3
        }, 16, ["id", "modelValue", "class", "aria-labelledby", "tag", "show", "horizontal", "visible", "is-nav", "lazy", "unmount-lazy"])
      ], 16);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BAlert-BB_bZt_q.mjs
import { defineComponent as defineComponent10, mergeModels as mergeModels5, useSlots as useSlots3, useTemplateRef as useTemplateRef4, useModel as useModel5, computed as computed19, watchEffect as watchEffect3, openBlock as openBlock8, createBlock as createBlock7, Transition as Transition3, mergeProps as mergeProps6, unref as unref9, withCtx as withCtx7, createElementBlock as createElementBlock7, normalizeClass as normalizeClass4, renderSlot as renderSlot7, Fragment as Fragment4, createTextVNode as createTextVNode5, toDisplayString as toDisplayString5, createCommentVNode as createCommentVNode5 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BCloseButton.vue_vue_type_script_setup_true_lang-cwGZUWKt.mjs
import { defineComponent as defineComponent6, openBlock as openBlock4, createElementBlock as createElementBlock4, unref as unref5 } from "vue";
var _hoisted_13 = ["type", "disabled", "aria-label"];
var _sfc_main5 = defineComponent6({
  __name: "BCloseButton",
  props: {
    ariaLabel: { default: "Close" },
    disabled: { type: Boolean, default: false },
    type: { default: "button" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BCloseButton");
    const emit = __emit;
    return (_ctx, _cache) => {
      return openBlock4(), createElementBlock4("button", {
        type: unref5(props).type,
        class: "btn-close",
        disabled: unref5(props).disabled,
        "aria-label": unref5(props).ariaLabel,
        onClick: _cache[0] || (_cache[0] = ($event) => emit("click", $event))
      }, null, 8, _hoisted_13);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BButton.vue_vue_type_script_setup_true_lang-lrwWXcOo.mjs
import { defineComponent as defineComponent9, mergeModels as mergeModels4, useTemplateRef as useTemplateRef3, useModel as useModel4, computed as computed16, openBlock as openBlock7, createBlock as createBlock6, resolveDynamicComponent as resolveDynamicComponent5, mergeProps as mergeProps5, unref as unref8, withCtx as withCtx6, renderSlot as renderSlot6, createElementBlock as createElementBlock6, Fragment as Fragment3, createTextVNode as createTextVNode4, toDisplayString as toDisplayString4, createCommentVNode as createCommentVNode4, createVNode as createVNode3 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BSpinner.vue_vue_type_script_setup_true_lang-BVOlIAJ-.mjs
import { defineComponent as defineComponent7, useSlots as useSlots2, computed as computed13, openBlock as openBlock5, createBlock as createBlock4, resolveDynamicComponent as resolveDynamicComponent3, unref as unref6, normalizeClass as normalizeClass3, withCtx as withCtx4, createElementBlock as createElementBlock5, renderSlot as renderSlot4, createTextVNode as createTextVNode3, toDisplayString as toDisplayString3, createCommentVNode as createCommentVNode3 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/dom-DSGRrOAo.mjs
var getActiveElement = (excludes = []) => {
  const { activeElement } = document;
  return activeElement && !(excludes == null ? void 0 : excludes.some((el) => el === activeElement)) ? activeElement : null;
};
var attemptFocus = (el, options = {}) => {
  const isActiveElement = (el2) => el2 === getActiveElement();
  try {
    el.focus(options);
  } catch (e) {
    console.error(e);
  }
  return isActiveElement(el);
};
var isEmptySlot = (el) => ((el == null ? void 0 : el()) ?? []).length === 0;
var isVisible = (el) => {
  if (el.getAttribute("display") === "none") {
    return false;
  }
  const bcr = el.getBoundingClientRect();
  return !!(bcr && bcr.height > 0 && bcr.width > 0);
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useColorVariantClasses-ZDE19TZw.mjs
import { computed as computed12, toValue as toValue5 } from "vue";
var useColorVariantClasses = (obj) => computed12(() => {
  let props = toValue5(obj);
  props = {
    variant: props.variant ?? null,
    bgVariant: props.bgVariant ?? null,
    textVariant: props.textVariant ?? null,
    borderVariant: props.borderVariant ?? null
  };
  return {
    [`text-bg-${props.variant}`]: props.variant !== null,
    [`text-${props.textVariant}`]: props.textVariant !== null,
    [`bg-${props.bgVariant}`]: props.bgVariant !== null,
    [`border-${props.borderVariant}`]: props.borderVariant !== null
  };
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BSpinner.vue_vue_type_script_setup_true_lang-BVOlIAJ-.mjs
var _hoisted_14 = {
  key: 0,
  class: "visually-hidden"
};
var _sfc_main6 = defineComponent7({
  __name: "BSpinner",
  props: {
    label: { default: void 0 },
    role: { default: "status" },
    small: { type: Boolean, default: false },
    tag: { default: "span" },
    type: { default: "border" },
    variant: { default: null }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BSpinner");
    const slots = useSlots2();
    const colorClasses = useColorVariantClasses(
      computed13(() => ({
        textVariant: props.variant
      }))
    );
    const computedClasses = computed13(() => [
      `spinner-${props.type}`,
      colorClasses.value,
      {
        [`spinner-${props.type}-sm`]: props.small
      }
    ]);
    const hasLabelSlot = computed13(() => !isEmptySlot(slots.label));
    return (_ctx, _cache) => {
      return openBlock5(), createBlock4(resolveDynamicComponent3(unref6(props).tag), {
        class: normalizeClass3(computedClasses.value),
        role: unref6(props).label || hasLabelSlot.value ? unref6(props).role : null,
        "aria-hidden": unref6(props).label || hasLabelSlot.value ? null : true
      }, {
        default: withCtx4(() => [
          unref6(props).label || hasLabelSlot.value ? (openBlock5(), createElementBlock5("span", _hoisted_14, [
            renderSlot4(_ctx.$slots, "label", {}, () => [
              createTextVNode3(toDisplayString3(unref6(props).label), 1)
            ])
          ])) : createCommentVNode3("", true)
        ]),
        _: 3
      }, 8, ["class", "role", "aria-hidden"]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useBLinkHelper-Bvtov_sk.mjs
import { readonly as readonly6, toRef as toRef6, computed as computed14 } from "vue";
var isLink = (props) => !!(props.href || props.to);
var useBLinkHelper = (props, pickProps) => {
  const pickPropsResolved = readonly6(toRef6(pickProps));
  const resolvedProps = readonly6(toRef6(props));
  const computedLink = computed14(() => isLink(resolvedProps.value));
  const computedLinkProps = computed14(
    () => computedLink.value ? pick(
      resolvedProps.value,
      pickPropsResolved.value ?? [
        "active",
        "activeClass",
        "append",
        "href",
        "rel",
        "replace",
        "routerComponentName",
        "target",
        "to",
        "variant",
        "opacity",
        "opacityHover",
        "underlineVariant",
        "underlineOffset",
        "underlineOffsetHover",
        "underlineOpacity",
        "underlineOpacityHover"
      ]
    ) : {}
  );
  return { computedLink, computedLinkProps };
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BLink.vue_vue_type_script_setup_true_lang-BB8hwqOG.mjs
import { computed as computed15, toValue as toValue6, defineComponent as defineComponent8, useAttrs as useAttrs2, inject as inject9, getCurrentInstance as getCurrentInstance7, openBlock as openBlock6, createBlock as createBlock5, resolveDynamicComponent as resolveDynamicComponent4, mergeProps as mergeProps4, withCtx as withCtx5, unref as unref7, renderSlot as renderSlot5 } from "vue";
var useLinkClasses = (linkProps) => computed15(() => {
  const props = toValue6(linkProps);
  return {
    [`link-${props.variant}`]: props.variant !== null,
    [`link-opacity-${props.opacity}`]: props.opacity !== void 0,
    [`link-opacity-${props.opacityHover}-hover`]: props.opacityHover !== void 0,
    [`link-underline-${props.underlineVariant}`]: props.underlineVariant !== null,
    [`link-offset-${props.underlineOffset}`]: props.underlineOffset !== void 0,
    [`link-offset-${props.underlineOffsetHover}-hover`]: props.underlineOffsetHover !== void 0,
    ["link-underline"]: props.underlineVariant === null && (props.underlineOpacity !== void 0 || props.underlineOpacityHover !== void 0),
    [`link-underline-opacity-${props.underlineOpacity}`]: props.underlineOpacity !== void 0,
    [`link-underline-opacity-${props.underlineOpacityHover}-hover`]: props.underlineOpacityHover !== void 0,
    "icon-link": props.icon === true
  };
});
var defaultActiveClass = "active";
var _sfc_main7 = defineComponent8({
  __name: "BLink",
  props: {
    active: { type: Boolean, default: void 0 },
    activeClass: { default: "router-link-active" },
    disabled: { type: Boolean, default: false },
    exactActiveClass: { default: "router-link-exact-active" },
    href: { default: void 0 },
    icon: { type: Boolean, default: false },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    rel: { default: void 0 },
    replace: { type: Boolean, default: false },
    routerComponentName: { default: "router-link" },
    routerTag: { default: "a" },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: null },
    variant: { default: null }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BLink");
    const emit = __emit;
    const attrs = useAttrs2();
    const collapseData = inject9(collapseInjectionKey, null);
    const navbarData = inject9(navbarInjectionKey, null);
    const instance = getCurrentInstance7();
    const tag = computed15(() => {
      const routerName = props.routerComponentName.split("-").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join("");
      const hasRouter = (instance == null ? void 0 : instance.appContext.app.component(routerName)) !== void 0;
      if (!hasRouter || props.disabled || !props.to) {
        return "a";
      }
      return props.routerComponentName;
    });
    const computedHref = computed15(() => {
      const toFallback = "#";
      if (props.href)
        return props.href;
      if (typeof props.to === "string")
        return props.to || toFallback;
      const { to } = props;
      if (to !== void 0 && "path" in to) {
        const path = to.path || "";
        const query = to.query ? `?${Object.keys(to.query).map((e) => {
          var _a;
          return `${e}=${(_a = to.query) == null ? void 0 : _a[e]}`;
        }).join("=")}` : "";
        const hash = !to.hash || to.hash.charAt(0) === "#" ? to.hash || "" : `#${to.hash}`;
        return `${path}${query}${hash}` || toFallback;
      }
      return toFallback;
    });
    const linkValueClasses = useLinkClasses(props);
    const computedClasses = computed15(() => [
      linkValueClasses.value,
      {
        "stretched-link": props.stretched === true
      }
    ]);
    const routerAttr = computed15(() => ({
      "class": computedClasses.value,
      "to": props.to,
      "replace": props.replace,
      "href": computedHref.value,
      "target": props.target,
      "rel": props.target === "_blank" ? props.rel ?? "noopener" : void 0,
      "tabindex": props.disabled ? "-1" : typeof attrs.tabindex === "undefined" ? null : attrs.tabindex,
      "aria-disabled": props.disabled ? true : null
    }));
    const computedLinkClasses = computed15(() => ({
      [defaultActiveClass]: props.active,
      disabled: props.disabled
    }));
    const clicked = (e) => {
      var _a, _b, _c;
      if (props.disabled) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      if (((_a = collapseData == null ? void 0 : collapseData.isNav) == null ? void 0 : _a.value) === true && navbarData === null || navbarData !== null && ((_b = navbarData.autoClose) == null ? void 0 : _b.value) === true) {
        (_c = collapseData == null ? void 0 : collapseData.hide) == null ? void 0 : _c.call(collapseData);
      }
      emit("click", e);
    };
    return (_ctx, _cache) => {
      return tag.value === "router-link" ? (openBlock6(), createBlock5(resolveDynamicComponent4(tag.value), mergeProps4({ key: 0 }, routerAttr.value, { custom: "" }), {
        default: withCtx5(({ href: localHref, navigate, isActive, isExactActive }) => [
          (openBlock6(), createBlock5(resolveDynamicComponent4(unref7(props).routerTag), mergeProps4({
            href: localHref,
            target: unref7(props).target,
            class: {
              [defaultActiveClass]: unref7(props).active,
              [unref7(props).activeClass]: isActive,
              [unref7(props).exactActiveClass]: isExactActive
            }
          }, _ctx.$attrs, {
            onClick: ($event) => {
              [navigate($event), clicked($event)];
            }
          }), {
            default: withCtx5(() => [
              renderSlot5(_ctx.$slots, "default")
            ]),
            _: 2
          }, 1040, ["href", "target", "class", "onClick"]))
        ]),
        _: 3
      }, 16)) : (openBlock6(), createBlock5(resolveDynamicComponent4(tag.value), mergeProps4({
        key: 1,
        class: computedLinkClasses.value
      }, routerAttr.value, { onClick: clicked }), {
        default: withCtx5(() => [
          renderSlot5(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["class"]));
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BButton.vue_vue_type_script_setup_true_lang-lrwWXcOo.mjs
var _sfc_main8 = defineComponent9({
  __name: "BButton",
  props: mergeModels4({
    loading: { type: Boolean, default: false },
    loadingFill: { type: Boolean, default: false },
    loadingText: { default: "Loading..." },
    pill: { type: Boolean, default: false },
    size: { default: "md" },
    squared: { type: Boolean, default: false },
    tag: { default: "button" },
    type: { default: "button" },
    variant: { default: "secondary" },
    active: { type: Boolean, default: false },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    icon: { type: Boolean, default: false },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    routerTag: { default: void 0 },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: null }
  }, {
    "pressed": { type: Boolean, ...{ default: void 0 } },
    "pressedModifiers": {}
  }),
  emits: mergeModels4(["click"], ["update:pressed"]),
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BButton");
    const emit = __emit;
    const element = useTemplateRef3("_element");
    const pressedValue = useModel4(__props, "pressed");
    const { computedLink, computedLinkProps } = useBLinkHelper(props, [
      "active-class",
      "exact-active-class",
      "replace",
      "routerComponentName",
      "routerTag"
    ]);
    const isToggle = computed16(() => typeof pressedValue.value === "boolean");
    const isButton = computed16(
      () => props.tag === "button" && props.href === void 0 && props.to === void 0
    );
    const isBLink = computed16(() => props.to !== void 0);
    const nonStandardTag = computed16(() => props.href !== void 0 ? false : !isButton.value);
    const linkProps = computed16(() => isBLink.value ? computedLinkProps.value : []);
    const computedAriaDisabled = computed16(() => {
      if (props.href === "#" && props.disabled)
        return true;
      return nonStandardTag.value ? props.disabled : null;
    });
    const variantIsLinkType = computed16(() => {
      var _a;
      return ((_a = props.variant) == null ? void 0 : _a.startsWith("link")) || false;
    });
    const variantIsLinkTypeSubset = computed16(() => {
      var _a;
      return ((_a = props.variant) == null ? void 0 : _a.startsWith("link-")) || false;
    });
    const linkValueClasses = useLinkClasses(
      computed16(() => {
        var _a;
        return {
          ...variantIsLinkType.value && {
            icon: props.icon,
            opacity: props.opacity,
            opacityHover: props.opacityHover,
            underlineOffset: props.underlineOffset,
            underlineOffsetHover: props.underlineOffsetHover,
            underlineOpacity: props.underlineOpacity,
            underlineOpacityHover: props.underlineOpacityHover,
            underlineVariant: props.underlineVariant,
            variant: variantIsLinkTypeSubset.value === true ? (_a = props.variant) == null ? void 0 : _a.slice(5) : null
          }
        };
      })
    );
    const computedClasses = computed16(() => [
      variantIsLinkType.value === true && computedLink.value === false ? linkValueClasses.value : void 0,
      [`btn-${props.size}`],
      {
        [`btn-${props.variant}`]: props.variant !== null && variantIsLinkTypeSubset.value === false,
        "active": props.active || pressedValue.value,
        "rounded-pill": props.pill,
        "rounded-0": props.squared,
        "disabled": props.disabled
      }
    ]);
    const computedTag = computed16(() => isBLink.value ? _sfc_main7 : props.href ? "a" : props.tag);
    const clicked = (e) => {
      if (props.disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      emit("click", e);
      if (isToggle.value)
        pressedValue.value = !pressedValue.value;
    };
    onKeyStroke(
      [" ", "enter"],
      (e) => {
        var _a;
        if (props.href === "#") {
          e.preventDefault();
          (_a = element.value) == null ? void 0 : _a.click();
        }
      },
      { target: element }
    );
    return (_ctx, _cache) => {
      return openBlock7(), createBlock6(resolveDynamicComponent5(computedTag.value), mergeProps5({
        ref: "_element",
        class: "btn"
      }, linkProps.value, {
        class: computedClasses.value,
        "aria-disabled": computedAriaDisabled.value,
        "aria-pressed": isToggle.value ? pressedValue.value : null,
        autocomplete: isToggle.value ? "off" : null,
        disabled: isButton.value ? unref8(props).disabled : null,
        href: unref8(props).href,
        rel: unref8(computedLink) ? unref8(props).rel : null,
        role: nonStandardTag.value || unref8(computedLink) ? "button" : null,
        target: unref8(computedLink) ? unref8(props).target : null,
        type: isButton.value ? unref8(props).type : null,
        to: !isButton.value ? unref8(props).to : null,
        onClick: clicked
      }), {
        default: withCtx6(() => [
          unref8(props).loading ? renderSlot6(_ctx.$slots, "loading", { key: 0 }, () => [
            !unref8(props).loadingFill ? (openBlock7(), createElementBlock6(Fragment3, { key: 0 }, [
              createTextVNode4(toDisplayString4(unref8(props).loadingText), 1)
            ], 64)) : createCommentVNode4("", true),
            renderSlot6(_ctx.$slots, "loading-spinner", {}, () => [
              createVNode3(_sfc_main6, {
                small: unref8(props).size !== "lg",
                label: unref8(props).loadingFill ? unref8(props).loadingText : void 0
              }, null, 8, ["small", "label"])
            ])
          ]) : renderSlot6(_ctx.$slots, "default", { key: 1 })
        ]),
        _: 3
      }, 16, ["class", "aria-disabled", "aria-pressed", "autocomplete", "disabled", "href", "rel", "role", "target", "type", "to"]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useCountdownHover-GEvDq366.mjs
import { readonly as readonly7, toRef as toRef7, ref as ref7, computed as computed17, watch as watch8, toValue as toValue7 } from "vue";
var useCountdown = (length, interval, timestampOpts = {}) => {
  const resolvedLength = readonly7(toRef7(length));
  const isPaused = ref7(false);
  const target = ref7(Date.now() + resolvedLength.value);
  const { isActive, pause, resume, timestamp: timestamp2 } = useTimestamp({
    interval,
    controls: true,
    callback: (v) => {
      if (v >= target.value) {
        isPaused.value = false;
        pause();
      }
    },
    ...timestampOpts
  });
  const value = computed17(() => target.value - timestamp2.value);
  const restart = () => {
    target.value = Date.now() + resolvedLength.value;
    resume();
  };
  watch8(resolvedLength, () => {
    restart();
  });
  const myPause = () => {
    isPaused.value = true;
    pause();
  };
  const myResume = () => {
    isPaused.value = false;
    const remainingTime = target.value - timestamp2.value;
    target.value = Date.now() + remainingTime;
    resume();
  };
  const stop = () => {
    pause();
    timestamp2.value = target.value;
    isPaused.value = false;
  };
  return {
    isActive: readonly7(isActive),
    isPaused: readonly7(isPaused),
    stop,
    pause: myPause,
    resume: myResume,
    restart,
    value
  };
};
var useCountdownHover = (element, props, actions) => {
  const isHovering = useElementHover(element);
  const onMouseEnter = () => {
    if (toValue7(props).noHoverPause)
      return;
    actions.pause();
  };
  const onMouseLeave = () => {
    if (toValue7(props).noResumeOnHoverLeave)
      return;
    actions.resume();
  };
  watch8(isHovering, (newValue) => {
    if (toValue7(props).modelValueIgnoresHover)
      return;
    if (newValue) {
      onMouseEnter();
      return;
    }
    onMouseLeave();
  });
  return {
    isHovering
  };
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useTransitions-BJccF5e-.mjs
import { computed as computed18, toValue as toValue8 } from "vue";
var useFadeTransition = (fade) => computed18(() => {
  const NO_FADE_PROPS = {
    name: "",
    enterActiveClass: "",
    enterToClass: "",
    leaveActiveClass: "",
    leaveToClass: "showing",
    enterFromClass: "showing",
    leaveFromClass: ""
  };
  const FADE_PROPS = {
    ...NO_FADE_PROPS,
    enterActiveClass: "fade showing",
    leaveActiveClass: "fade showing"
  };
  return toValue8(fade) ? FADE_PROPS : NO_FADE_PROPS;
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BAlert-BB_bZt_q.mjs
var _sfc_main9 = defineComponent10({
  __name: "BAlert",
  props: mergeModels5({
    closeClass: { default: void 0 },
    closeContent: { default: void 0 },
    closeLabel: { default: "Close" },
    closeVariant: { default: "secondary" },
    dismissible: { type: Boolean, default: false },
    fade: { type: Boolean, default: false },
    immediate: { type: Boolean, default: true },
    interval: { default: "requestAnimationFrame" },
    noHoverPause: { type: Boolean, default: false },
    noResumeOnHoverLeave: { type: Boolean, default: false },
    showOnPause: { type: Boolean, default: true },
    variant: { default: "info" }
  }, {
    "modelValue": { type: [Boolean, Number], ...{ default: false } },
    "modelModifiers": {}
  }),
  emits: mergeModels5(["close", "close-countdown", "closed"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BAlert");
    const emit = __emit;
    const slots = useSlots3();
    const fadeTransitions = useFadeTransition(() => props.fade);
    const element = useTemplateRef4("_element");
    const modelValue = useModel5(__props, "modelValue");
    const hasCloseSlot = computed19(() => !isEmptySlot(slots.close));
    const countdownLength = computed19(
      () => typeof modelValue.value === "boolean" ? 0 : modelValue.value
    );
    const computedClasses = computed19(() => ({
      [`alert-${props.variant}`]: props.variant !== null,
      "alert-dismissible": props.dismissible
    }));
    const closeClasses = computed19(() => [props.closeClass, { "btn-close-custom": hasCloseSlot.value }]);
    const {
      isActive,
      pause,
      resume,
      stop,
      isPaused,
      restart,
      value: remainingMs
    } = useCountdown(countdownLength, props.interval, {
      immediate: typeof modelValue.value === "number" && props.immediate
    });
    useCountdownHover(
      element,
      computed19(() => ({
        noHoverPause: props.noHoverPause,
        noResumeOnHoverLeave: props.noResumeOnHoverLeave,
        modelValueIgnoresHover: typeof modelValue.value === "boolean"
      })),
      { pause, resume }
    );
    const isAlertVisible = computed19(
      () => typeof modelValue.value === "boolean" ? modelValue.value : isActive.value || props.showOnPause && isPaused.value
    );
    const closeAttrs = computed19(() => ({
      variant: hasCloseSlot.value ? props.closeVariant : void 0,
      class: closeClasses.value
    }));
    watchEffect3(() => {
      emit("close-countdown", remainingMs.value);
    });
    const hide2 = () => {
      emit("close");
      if (typeof modelValue.value === "boolean") {
        modelValue.value = false;
      } else {
        modelValue.value = 0;
        stop();
      }
      emit("closed");
    };
    __expose({
      pause,
      resume,
      stop,
      restart
    });
    return (_ctx, _cache) => {
      return openBlock8(), createBlock7(Transition3, mergeProps6(unref9(fadeTransitions), { "enter-to-class": "show" }), {
        default: withCtx7(() => [
          isAlertVisible.value ? (openBlock8(), createElementBlock7("div", {
            key: 0,
            ref: "_element",
            class: normalizeClass4(["alert", computedClasses.value]),
            role: "alert",
            "aria-live": "polite",
            "aria-atomic": "true"
          }, [
            renderSlot7(_ctx.$slots, "default", {}, void 0, true),
            unref9(props).dismissible ? (openBlock8(), createElementBlock7(Fragment4, { key: 0 }, [
              hasCloseSlot.value || unref9(props).closeContent ? (openBlock8(), createBlock7(_sfc_main8, mergeProps6({ key: 0 }, closeAttrs.value, { onClick: hide2 }), {
                default: withCtx7(() => [
                  renderSlot7(_ctx.$slots, "close", {}, () => [
                    createTextVNode5(toDisplayString5(unref9(props).closeContent), 1)
                  ], true)
                ]),
                _: 3
              }, 16)) : (openBlock8(), createBlock7(_sfc_main5, mergeProps6({
                key: 1,
                "aria-label": unref9(props).closeLabel
              }, closeAttrs.value, { onClick: hide2 }), null, 16, ["aria-label"]))
            ], 64)) : createCommentVNode5("", true)
          ], 2)) : createCommentVNode5("", true)
        ]),
        _: 3
      }, 16);
    };
  }
});
var BAlert = _export_sfc(_sfc_main9, [["__scopeId", "data-v-141c4f93"]]);

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BAvatarGroup.vue_vue_type_script_setup_true_lang-Cb65-bb-.mjs
import { defineComponent as defineComponent13, ref as ref8, watch as watch9, useSlots as useSlots4, inject as inject10, computed as computed23, openBlock as openBlock10, createBlock as createBlock9, resolveDynamicComponent as resolveDynamicComponent7, mergeProps as mergeProps8, unref as unref11, withCtx as withCtx9, createElementBlock as createElementBlock8, renderSlot as renderSlot9, createElementVNode as createElementVNode3, normalizeStyle as normalizeStyle2, toDisplayString as toDisplayString6, createTextVNode as createTextVNode6, createCommentVNode as createCommentVNode6, provide as provide4, toRef as toRef8 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BBadge.vue_vue_type_script_setup_true_lang-CM3GGx38.mjs
import { defineComponent as defineComponent12, computed as computed20, openBlock as openBlock9, createBlock as createBlock8, resolveDynamicComponent as resolveDynamicComponent6, mergeProps as mergeProps7, unref as unref10, withCtx as withCtx8, createVNode as createVNode4, renderSlot as renderSlot8 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/ConditionalWrapper.vue_vue_type_script_lang-CUX3HBqw.mjs
import { defineComponent as defineComponent11, h as h3 } from "vue";
var _sfc_main10 = defineComponent11({
  name: "ConditionalWrapper",
  inheritAttrs: false,
  slots: Object,
  props: {
    tag: {
      type: String,
      default: "div"
    },
    skip: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { slots, attrs }) {
    return () => {
      var _a, _b;
      return props.skip ? (_a = slots.default) == null ? void 0 : _a.call(slots, {}) : h3(props.tag, { ...attrs }, [(_b = slots.default) == null ? void 0 : _b.call(slots, {})]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BBadge.vue_vue_type_script_setup_true_lang-CM3GGx38.mjs
var _sfc_main11 = defineComponent12({
  __name: "BBadge",
  props: {
    dotIndicator: { type: Boolean, default: false },
    pill: { type: Boolean, default: false },
    placement: { default: void 0 },
    tag: { default: "span" },
    active: { type: Boolean, default: void 0 },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    icon: { type: Boolean, default: void 0 },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: void 0 },
    variant: { default: "secondary" },
    bgVariant: { default: null },
    textVariant: { default: null }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BBadge");
    const { computedLink, computedLinkProps } = useBLinkHelper(props, [
      "active",
      "activeClass",
      "append",
      "disabled",
      "href",
      "rel",
      "replace",
      "routerComponentName",
      "target",
      "to",
      "opacity",
      "opacityHover",
      "underlineVariant",
      "underlineOffset",
      "underlineOffsetHover",
      "underlineOpacity",
      "underlineOpacityHover",
      "icon"
    ]);
    const computedTag = computed20(() => computedLink.value ? _sfc_main7 : props.tag);
    const placementClasses = computed20(() => {
      const pos = props.placement ?? (props.dotIndicator ? "top-end" : void 0);
      return [
        "position-absolute",
        "translate-middle",
        {
          "start-0 top-0": pos === "top-start",
          "start-0 top-50": pos === "start",
          "start-0 top-100": pos === "bottom-start",
          "start-50 top-0": pos === "top",
          "start-50 top-100": pos === "bottom",
          "start-100 top-0": pos === "top-end",
          "start-100 top-50": pos === "end",
          "start-100 top-100": pos === "bottom-end"
        }
      ];
    });
    const colorClasses = useColorVariantClasses(props);
    const computedClasses = computed20(() => [
      colorClasses.value,
      props.placement !== void 0 || props.dotIndicator === true ? placementClasses.value : void 0,
      {
        "active": props.active,
        "disabled": props.disabled,
        "rounded-pill": props.pill,
        "p-2 border border-light rounded-circle": props.dotIndicator,
        "text-decoration-none": computedLink.value
      }
    ]);
    return (_ctx, _cache) => {
      return openBlock9(), createBlock8(resolveDynamicComponent6(computedTag.value), mergeProps7({
        class: ["badge", computedClasses.value]
      }, unref10(computedLinkProps)), {
        default: withCtx8(() => [
          createVNode4(_sfc_main10, mergeProps7({
            skip: unref10(props).dotIndicator !== true,
            tag: "span"
          }, unref10(props).dotIndicator ? { class: "visually-hidden" } : {}), {
            default: withCtx8(() => [
              renderSlot8(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["skip"])
        ]),
        _: 3
      }, 16, ["class"]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useNumberishToStyle-BaHH1FuW.mjs
import { computed as computed21, toValue as toValue9 } from "vue";
var useNumberishToStyle = (el, unit = "px") => computed21(() => {
  const value = toValue9(el);
  const resolvedUnit = toValue9(unit);
  return RX_NUMBER.test(String(value)) ? `${Number(value)}${resolvedUnit}` : value;
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useRadiusElementClasses-DtKYQuWz.mjs
import { computed as computed22, toValue as toValue10 } from "vue";
var useRadiusElementClasses = (obj) => {
  const resolveRadiusElement = (value, str) => {
    const strValue = str === null ? "" : `-${str}`;
    return value === "circle" ? `rounded${strValue}-circle` : value === "pill" ? `rounded${strValue}-pill` : typeof value === "number" || value === "0" || value === "1" || value === "2" || value === "3" || value === "4" || value === "5" ? `rounded${strValue}-${value}` : value === "none" ? `rounded${strValue}-0` : value === "sm" ? `rounded${strValue}-1` : value === "lg" ? `rounded${strValue}-5` : `rounded${strValue}`;
  };
  return computed22(() => {
    const props = toValue10(obj);
    return {
      [`${resolveRadiusElement(props.rounded, null)}`]: !!props.rounded,
      [`${resolveRadiusElement(props.roundedTop, "top")}`]: !!props.roundedTop,
      [`${resolveRadiusElement(props.roundedBottom, "bottom")}`]: !!props.roundedBottom,
      [`${resolveRadiusElement(props.roundedStart, "start")}`]: !!props.roundedStart,
      [`${resolveRadiusElement(props.roundedEnd, "end")}`]: !!props.roundedEnd
    };
  });
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BAvatarGroup.vue_vue_type_script_setup_true_lang-Cb65-bb-.mjs
var _hoisted_15 = {
  key: 0,
  class: "b-avatar-custom"
};
var _hoisted_22 = {
  key: 1,
  class: "b-avatar-img"
};
var _hoisted_3 = ["src", "alt"];
var _hoisted_4 = {
  key: 3,
  class: "b-avatar-img"
};
var FONT_SIZE_SCALE = 0.4;
var _sfc_main$12 = defineComponent13({
  __name: "BAvatar",
  props: {
    alt: { default: "avatar" },
    badge: { type: [Boolean, String], default: false },
    badgeBgVariant: { default: null },
    badgePlacement: { default: "bottom-end" },
    badgeTextVariant: { default: null },
    badgeVariant: { default: "primary" },
    badgePill: { type: Boolean, default: false },
    badgeDotIndicator: { type: Boolean, default: false },
    button: { type: Boolean, default: false },
    buttonType: { default: "button" },
    size: { default: void 0 },
    square: { type: Boolean, default: false },
    src: { default: void 0 },
    text: { default: void 0 },
    active: { type: Boolean, default: void 0 },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: {},
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: void 0 },
    variant: { default: "secondary" },
    bgVariant: { default: null },
    textVariant: { default: null },
    rounded: { type: [Boolean, String, Number], default: "circle" },
    roundedTop: { type: [Boolean, String, Number], default: void 0 },
    roundedBottom: { type: [Boolean, String, Number], default: void 0 },
    roundedStart: { type: [Boolean, String, Number], default: void 0 },
    roundedEnd: { type: [Boolean, String, Number], default: void 0 }
  },
  emits: ["click", "img-error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const localSrc = ref8(props.src);
    watch9(
      () => props.src,
      (value) => {
        localSrc.value = value;
      }
    );
    const emit = __emit;
    const slots = useSlots4();
    const { computedLink, computedLinkProps } = useBLinkHelper(props);
    const parentData = inject10(avatarGroupInjectionKey, null);
    const SIZES = ["sm", null, "lg"];
    const BADGE_FONT_SIZE_SCALE = FONT_SIZE_SCALE * 0.7;
    const hasDefaultSlot = computed23(() => !isEmptySlot(slots.default));
    const hasBadgeSlot = computed23(() => !isEmptySlot(slots.badge));
    const showBadge = computed23(() => !!props.badge || props.badge === "" || hasBadgeSlot.value);
    const computedSquare = computed23(() => (parentData == null ? void 0 : parentData.square.value) || props.square);
    const computedPropSize = useNumberishToStyle(() => props.size);
    const computedParentSize = useNumberishToStyle(() => parentData == null ? void 0 : parentData.size.value);
    const computedSize = computed23(() => computedParentSize.value ?? computedPropSize.value);
    const computedVariant = computed23(() => (parentData == null ? void 0 : parentData.variant.value) ?? props.variant);
    const computedRounded = computed23(() => (parentData == null ? void 0 : parentData.rounded.value) ?? props.rounded);
    const computedRoundedTop = computed23(() => (parentData == null ? void 0 : parentData.roundedTop.value) ?? props.roundedTop);
    const computedRoundedBottom = computed23(() => (parentData == null ? void 0 : parentData.roundedBottom.value) ?? props.roundedBottom);
    const computedRoundedStart = computed23(() => (parentData == null ? void 0 : parentData.roundedStart.value) ?? props.roundedStart);
    const computedRoundedEnd = computed23(() => (parentData == null ? void 0 : parentData.roundedEnd.value) ?? props.roundedEnd);
    const radiusElementClasses = useRadiusElementClasses(() => ({
      rounded: computedRounded.value,
      roundedTop: computedRoundedTop.value,
      roundedBottom: computedRoundedBottom.value,
      roundedStart: computedRoundedStart.value,
      roundedEnd: computedRoundedEnd.value
    }));
    const badgeText = computed23(() => props.badge === true ? "" : props.badge);
    const badgeImplicitlyDot = computed23(() => !badgeText.value && !hasBadgeSlot.value);
    const colorClasses = useColorVariantClasses(() => ({
      bgVariant: (parentData == null ? void 0 : parentData.bgVariant.value) ?? props.bgVariant,
      textVariant: (parentData == null ? void 0 : parentData.textVariant.value) ?? props.textVariant,
      variant: computedVariant.value
    }));
    const computedClasses = computed23(() => [
      colorClasses.value,
      // Square overwrites all else
      computedSquare.value === true ? void 0 : radiusElementClasses.value,
      {
        [`b-avatar-${props.size}`]: !!props.size && SIZES.indexOf(computedPropSize.value) !== -1,
        [`btn-${computedVariant.value}`]: props.button ? computedVariant.value !== null : false,
        "badge": !props.button && computedVariant.value !== null && hasDefaultSlot.value,
        "btn": props.button,
        // Square is the same as rounded-0 class
        "rounded-0": computedSquare.value === true
      }
    ]);
    const badgeStyle = computed23(() => ({
      fontSize: (SIZES.indexOf(computedSize.value || null) === -1 ? `calc(${computedSize.value} * ${BADGE_FONT_SIZE_SCALE})` : "") || ""
    }));
    const textFontStyle = computed23(() => {
      const fontSize = SIZES.indexOf(computedSize.value || null) === -1 ? `calc(${computedSize.value} * ${FONT_SIZE_SCALE})` : null;
      return fontSize ? { fontSize } : {};
    });
    const marginStyle = computed23(() => {
      var _a;
      const overlapScale = ((_a = parentData == null ? void 0 : parentData.overlapScale) == null ? void 0 : _a.value) || 0;
      const value = computedSize.value && overlapScale ? `calc(${computedSize.value} * -${overlapScale})` : null;
      return value ? { marginLeft: value, marginRight: value } : {};
    });
    const computedTag = computed23(() => computedLink.value ? _sfc_main7 : props.button ? "button" : "span");
    const computedStyle = computed23(() => ({
      ...marginStyle.value,
      width: computedSize.value ?? void 0,
      height: computedSize.value ?? void 0
    }));
    const clicked = (e) => {
      if (!props.disabled && (computedLink.value || props.button))
        emit("click", e);
    };
    const onImgError = (e) => {
      localSrc.value = void 0;
      emit("img-error", e);
    };
    return (_ctx, _cache) => {
      return openBlock10(), createBlock9(resolveDynamicComponent7(computedTag.value), mergeProps8({
        class: ["b-avatar", computedClasses.value],
        style: computedStyle.value
      }, unref11(computedLinkProps), {
        type: props.button && !unref11(computedLink) ? props.buttonType : void 0,
        disabled: props.disabled || null,
        variant: null,
        onClick: clicked
      }), {
        default: withCtx9(() => [
          hasDefaultSlot.value ? (openBlock10(), createElementBlock8("span", _hoisted_15, [
            renderSlot9(_ctx.$slots, "default")
          ])) : !!localSrc.value ? (openBlock10(), createElementBlock8("span", _hoisted_22, [
            createElementVNode3("img", {
              src: localSrc.value,
              alt: props.alt,
              onError: onImgError
            }, null, 40, _hoisted_3)
          ])) : !!props.text ? (openBlock10(), createElementBlock8("span", {
            key: 2,
            class: "b-avatar-text",
            style: normalizeStyle2(textFontStyle.value)
          }, toDisplayString6(props.text), 5)) : (openBlock10(), createElementBlock8("span", _hoisted_4, _cache[0] || (_cache[0] = [
            createElementVNode3("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "80%",
              height: "80%",
              fill: "currentColor",
              class: "bi bi-person-fill",
              viewBox: "0 0 16 16"
            }, [
              createElementVNode3("path", { d: "M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" })
            ], -1)
          ]))),
          showBadge.value ? (openBlock10(), createBlock9(_sfc_main11, {
            key: 4,
            pill: props.badgePill,
            "dot-indicator": props.badgeDotIndicator || badgeImplicitlyDot.value,
            variant: props.badgeVariant,
            "bg-variant": props.badgeBgVariant,
            "text-variant": props.badgeTextVariant,
            style: normalizeStyle2(badgeStyle.value),
            placement: props.badgePlacement
          }, {
            default: withCtx9(() => [
              renderSlot9(_ctx.$slots, "badge", {}, () => [
                createTextVNode6(toDisplayString6(badgeText.value), 1)
              ])
            ]),
            _: 3
          }, 8, ["pill", "dot-indicator", "variant", "bg-variant", "text-variant", "style", "placement"])) : createCommentVNode6("", true)
        ]),
        _: 3
      }, 16, ["class", "style", "type", "disabled"]);
    };
  }
});
var _sfc_main12 = defineComponent13({
  __name: "BAvatarGroup",
  props: {
    overlap: { default: 0.3 },
    size: { default: void 0 },
    square: { type: Boolean, default: false },
    tag: { default: "div" },
    variant: { default: null },
    bgVariant: { default: null },
    textVariant: { default: null },
    rounded: { type: [Boolean, String, Number], default: "circle" },
    roundedTop: { type: [Boolean, String, Number], default: void 0 },
    roundedBottom: { type: [Boolean, String, Number], default: void 0 },
    roundedStart: { type: [Boolean, String, Number], default: void 0 },
    roundedEnd: { type: [Boolean, String, Number], default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BAvatarGroup");
    const overlapNumber = useToNumber(() => props.overlap);
    const computedSize = useNumberishToStyle(() => props.size);
    const overlapScale = computed23(() => Math.min(Math.max(overlapNumber.value, 0), 1) / 2);
    const paddingStyle = computed23(() => {
      const value = computedSize.value ? `calc(${computedSize.value} * ${overlapScale.value})` : null;
      return value ? { paddingLeft: value, paddingRight: value } : {};
    });
    provide4(avatarGroupInjectionKey, {
      overlapScale,
      size: toRef8(() => props.size),
      square: toRef8(() => props.square),
      rounded: toRef8(() => props.rounded),
      roundedTop: toRef8(() => props.roundedTop),
      roundedBottom: toRef8(() => props.roundedBottom),
      roundedStart: toRef8(() => props.roundedStart),
      roundedEnd: toRef8(() => props.roundedEnd),
      variant: toRef8(() => props.variant),
      bgVariant: toRef8(() => props.bgVariant),
      textVariant: toRef8(() => props.textVariant)
    });
    return (_ctx, _cache) => {
      return openBlock10(), createBlock9(resolveDynamicComponent7(unref11(props).tag), {
        class: "b-avatar-group",
        role: "group"
      }, {
        default: withCtx9(() => [
          createElementVNode3("div", {
            class: "b-avatar-group-inner",
            style: normalizeStyle2(paddingStyle.value)
          }, [
            renderSlot9(_ctx.$slots, "default")
          ], 4)
        ]),
        _: 3
      });
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BBreadcrumb.vue_vue_type_script_setup_true_lang-gm1-U7WE.mjs
import { defineComponent as defineComponent14, computed as computed24, openBlock as openBlock11, createElementBlock as createElementBlock9, normalizeClass as normalizeClass5, createBlock as createBlock10, resolveDynamicComponent as resolveDynamicComponent8, mergeProps as mergeProps9, withCtx as withCtx10, renderSlot as renderSlot10, createTextVNode as createTextVNode7, toDisplayString as toDisplayString7, unref as unref12, createElementVNode as createElementVNode4, Fragment as Fragment5, renderList } from "vue";
var _sfc_main$13 = defineComponent14({
  __name: "BBreadcrumbItem",
  props: {
    ariaCurrent: { default: "location" },
    text: { default: void 0 },
    active: { type: Boolean, default: false },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    icon: { type: Boolean, default: void 0 },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: void 0 },
    variant: { default: void 0 }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BBreadcrumbItem");
    const emit = __emit;
    const computedClasses = computed24(() => ({
      active: props.active
    }));
    const computedTag = computed24(() => props.active ? "span" : _sfc_main7);
    const computedAriaCurrent = computed24(() => props.active ? props.ariaCurrent : void 0);
    const computedLinkProps = computed24(
      () => computedTag.value !== "span" ? pick(props, [
        "active",
        "activeClass",
        "append",
        "disabled",
        "href",
        "rel",
        "replace",
        "routerComponentName",
        "target",
        "to",
        "variant",
        "opacity",
        "opacityHover",
        "underlineVariant",
        "underlineOffset",
        "underlineOffsetHover",
        "underlineOpacity",
        "underlineOpacityHover",
        "icon"
      ]) : {}
    );
    const clicked = (e) => {
      if (props.disabled || props.active) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      if (!props.disabled)
        emit("click", e);
    };
    return (_ctx, _cache) => {
      return openBlock11(), createElementBlock9("li", {
        class: normalizeClass5(["breadcrumb-item", computedClasses.value])
      }, [
        (openBlock11(), createBlock10(resolveDynamicComponent8(computedTag.value), mergeProps9({ "aria-current": computedAriaCurrent.value }, computedLinkProps.value, { onClick: clicked }), {
          default: withCtx10(() => [
            renderSlot10(_ctx.$slots, "default", {}, () => [
              createTextVNode7(toDisplayString7(unref12(props).text), 1)
            ])
          ]),
          _: 3
        }, 16, ["aria-current"]))
      ], 2);
    };
  }
});
var _hoisted_16 = { "aria-label": "breadcrumb" };
var _hoisted_23 = { class: "breadcrumb" };
var _sfc_main13 = defineComponent14({
  __name: "BBreadcrumb",
  props: {
    items: { default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BBreadcrumb");
    const breadcrumb = useBreadcrumb();
    const breadcrumbItemObjects = computed24(() => {
      var _a;
      const localItems = props.items || ((_a = breadcrumb.items) == null ? void 0 : _a.value) || [];
      let activeDefined = false;
      const items = localItems.map((item, idx) => {
        if (typeof item === "string") {
          item = { text: item };
          if (idx < localItems.length - 1)
            item.href = "#";
        }
        if (item.active)
          activeDefined = true;
        if (!item.active && !activeDefined) {
          item.active = idx + 1 === localItems.length;
        }
        return item;
      });
      return items;
    });
    return (_ctx, _cache) => {
      return openBlock11(), createElementBlock9("nav", _hoisted_16, [
        createElementVNode4("ol", _hoisted_23, [
          renderSlot10(_ctx.$slots, "prepend"),
          (openBlock11(true), createElementBlock9(Fragment5, null, renderList(breadcrumbItemObjects.value, (item, i) => {
            return openBlock11(), createBlock10(_sfc_main$13, mergeProps9({
              key: i,
              ref_for: true
            }, item), {
              default: withCtx10(() => [
                createTextVNode7(toDisplayString7(item.text), 1)
              ]),
              _: 2
            }, 1040);
          }), 128)),
          renderSlot10(_ctx.$slots, "default"),
          renderSlot10(_ctx.$slots, "append")
        ])
      ]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BButtonToolbar.vue_vue_type_script_setup_true_lang-1A6TE6rh.mjs
import { defineComponent as defineComponent15, provide as provide5, computed as computed25, openBlock as openBlock12, createBlock as createBlock11, resolveDynamicComponent as resolveDynamicComponent9, unref as unref13, normalizeClass as normalizeClass6, withCtx as withCtx11, renderSlot as renderSlot11, createElementBlock as createElementBlock10 } from "vue";
var _sfc_main$14 = defineComponent15({
  __name: "BButtonGroup",
  props: {
    ariaLabel: { default: "Group" },
    size: { default: "md" },
    tag: { default: "div" },
    vertical: { type: Boolean, default: false }
  },
  setup(__props) {
    provide5(buttonGroupKey, true);
    const _props = __props;
    const props = useDefaults(_props, "BButtonGroup");
    const computedClasses = computed25(() => ({
      "btn-group": !props.vertical,
      [`btn-group-${props.size}`]: props.size !== "md",
      "btn-group-vertical": props.vertical
    }));
    return (_ctx, _cache) => {
      return openBlock12(), createBlock11(resolveDynamicComponent9(unref13(props).tag), {
        class: normalizeClass6(computedClasses.value),
        role: "group",
        "aria-label": unref13(props).ariaLabel
      }, {
        default: withCtx11(() => [
          renderSlot11(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class", "aria-label"]);
    };
  }
});
var _hoisted_17 = ["role", "aria-label"];
var _sfc_main14 = defineComponent15({
  __name: "BButtonToolbar",
  props: {
    ariaLabel: { default: "Group" },
    justify: { type: Boolean, default: false },
    role: { default: "toolbar" }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BButtonToolbar");
    const computedClasses = computed25(() => ({
      "justify-content-between": props.justify
    }));
    return (_ctx, _cache) => {
      return openBlock12(), createElementBlock10("div", {
        class: normalizeClass6([computedClasses.value, "btn-toolbar"]),
        role: unref13(props).role,
        "aria-label": unref13(props).ariaLabel
      }, [
        renderSlot11(_ctx.$slots, "default")
      ], 10, _hoisted_17);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BCard.vue_vue_type_script_setup_true_lang-BCnS8x6G.mjs
import { defineComponent as defineComponent17, computed as computed27, openBlock as openBlock14, createBlock as createBlock13, mergeProps as mergeProps10, resolveDynamicComponent as resolveDynamicComponent11, normalizeClass as normalizeClass8, unref as unref15, withCtx as withCtx12, renderSlot as renderSlot12, createTextVNode as createTextVNode8, toDisplayString as toDisplayString8, useSlots as useSlots5, createCommentVNode as createCommentVNode7, createVNode as createVNode5, normalizeProps as normalizeProps2 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BImg.vue_vue_type_script_setup_true_lang-BVN7j33D.mjs
import { defineComponent as defineComponent16, computed as computed26, openBlock as openBlock13, createBlock as createBlock12, resolveDynamicComponent as resolveDynamicComponent10, unref as unref14, normalizeClass as normalizeClass7 } from "vue";
var _sfc_main15 = defineComponent16({
  __name: "BImg",
  props: {
    blank: { type: Boolean, default: false },
    blankColor: { default: "transparent" },
    block: { type: Boolean, default: false },
    fluid: { type: Boolean, default: false },
    fluidGrow: { type: Boolean, default: false },
    height: { default: void 0 },
    tag: { default: "img" },
    lazy: { type: Boolean, default: false },
    sizes: { default: void 0 },
    src: { default: void 0 },
    srcset: { default: void 0 },
    thumbnail: { type: Boolean, default: false },
    width: { default: void 0 },
    placement: { default: void 0 },
    rounded: { type: [Boolean, String, Number], default: false },
    roundedTop: { type: [Boolean, String, Number], default: void 0 },
    roundedBottom: { type: [Boolean, String, Number], default: void 0 },
    roundedStart: { type: [Boolean, String, Number], default: void 0 },
    roundedEnd: { type: [Boolean, String, Number], default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BImg");
    const heightNumber = useToNumber(() => props.height ?? NaN);
    const widthNumber = useToNumber(() => props.width ?? NaN);
    const radiusElementClasses = useRadiusElementClasses(() => ({
      rounded: props.rounded,
      roundedTop: props.roundedTop,
      roundedBottom: props.roundedBottom,
      roundedStart: props.roundedStart,
      roundedEnd: props.roundedEnd
    }));
    const computedSrcset = computed26(
      () => typeof props.srcset === "string" ? props.srcset.split(",").filter((x) => x).join(",") : Array.isArray(props.srcset) ? props.srcset.filter((x) => x).join(",") : void 0
    );
    const computedSizes = computed26(
      () => typeof props.sizes === "string" ? props.sizes.split(",").filter((x) => x).join(",") : Array.isArray(props.sizes) ? props.sizes.filter((x) => x).join(",") : void 0
    );
    const computedDimentions = computed26(() => {
      const width = Number.isNaN(widthNumber.value) ? void 0 : widthNumber.value;
      const height = Number.isNaN(heightNumber.value) ? void 0 : heightNumber.value;
      if (props.blank) {
        if (width !== void 0 && height === void 0)
          return { height: width, width };
        if (width === void 0 && height !== void 0)
          return { height, width: height };
        if (width === void 0 && height === void 0)
          return { height: 1, width: 1 };
      }
      return {
        width,
        height
      };
    });
    const computedBlankImgSrc = computed26(
      () => makeBlankImgSrc(computedDimentions.value.width, computedDimentions.value.height, props.blankColor)
    );
    const computedAlignment = computed26(() => ({
      "float-start": props.placement === "start",
      "float-end": props.placement === "end",
      "mx-auto": props.placement === "center"
    }));
    const computedClasses = computed26(() => [
      radiusElementClasses.value,
      computedAlignment.value,
      {
        "img-thumbnail": props.thumbnail,
        "img-fluid": props.fluid || props.fluidGrow,
        "w-100": props.fluidGrow,
        "d-block": props.block || props.placement === "center"
      }
    ]);
    const makeBlankImgSrc = (width, height, color) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
    <rect width="100%" height="100%" style="fill:${color};"></rect>
    </svg>`)}`;
    return (_ctx, _cache) => {
      return openBlock13(), createBlock12(resolveDynamicComponent10(unref14(props).tag), {
        class: normalizeClass7([computedClasses.value, "b-img"]),
        src: !unref14(props).blank ? unref14(props).src : computedBlankImgSrc.value,
        width: computedDimentions.value.width || void 0,
        height: computedDimentions.value.height || void 0,
        srcset: !unref14(props).blank ? computedSrcset.value : void 0,
        sizes: !unref14(props).blank ? computedSizes.value : void 0,
        loading: unref14(props).lazy ? "lazy" : "eager"
      }, null, 8, ["class", "src", "width", "height", "srcset", "sizes", "loading"]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BCard.vue_vue_type_script_setup_true_lang-BCnS8x6G.mjs
var _sfc_main$7 = defineComponent17({
  __name: "BCardImg",
  props: {
    placement: { default: "top" },
    blank: { type: Boolean, default: void 0 },
    blankColor: { default: void 0 },
    block: { type: Boolean, default: void 0 },
    fluid: { type: Boolean, default: void 0 },
    fluidGrow: { type: Boolean, default: void 0 },
    height: { default: void 0 },
    tag: {},
    lazy: { type: Boolean, default: void 0 },
    sizes: { default: void 0 },
    src: { default: void 0 },
    srcset: { default: void 0 },
    thumbnail: { type: Boolean, default: void 0 },
    width: { default: void 0 },
    rounded: { type: [Boolean, String, Number], default: void 0 },
    roundedTop: { type: [Boolean, String, Number], default: void 0 },
    roundedBottom: { type: [Boolean, String, Number], default: void 0 },
    roundedStart: { type: [Boolean, String, Number], default: void 0 },
    roundedEnd: { type: [Boolean, String, Number], default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BCardImg");
    const baseAlignmentClasses = computed27(() => ({
      "card-img-top": props.placement === "top",
      // TODO implement this class
      "card-img-end": props.placement === "end",
      "card-img-bottom": props.placement === "bottom",
      // TODO implement this class
      "card-img-start": props.placement === "start",
      "card-img": props.placement === "overlay"
    }));
    const computedImgProps = computed27(() => omit(props, ["placement"]));
    return (_ctx, _cache) => {
      return openBlock14(), createBlock13(_sfc_main15, mergeProps10(computedImgProps.value, { class: baseAlignmentClasses.value }), null, 16, ["class"]);
    };
  }
});
var _sfc_main$6 = defineComponent17({
  __name: "BCardHeadFoot",
  props: {
    borderVariant: { default: null },
    tag: { default: "div" },
    text: { default: void 0 },
    variant: { default: null },
    bgVariant: { default: null },
    textVariant: { default: null }
  },
  setup(__props) {
    const props = __props;
    const computedClasses = useColorVariantClasses(props);
    return (_ctx, _cache) => {
      return openBlock14(), createBlock13(resolveDynamicComponent11(_ctx.tag), {
        class: normalizeClass8(unref15(computedClasses))
      }, {
        default: withCtx12(() => [
          renderSlot12(_ctx.$slots, "default", {}, () => [
            createTextVNode8(toDisplayString8(_ctx.text), 1)
          ])
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
});
var _sfc_main$5 = defineComponent17({
  __name: "BCardHeader",
  props: {
    borderVariant: { default: void 0 },
    tag: { default: "div" },
    text: { default: void 0 },
    variant: { default: void 0 },
    bgVariant: { default: void 0 },
    textVariant: { default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BCardHeader");
    return (_ctx, _cache) => {
      return openBlock14(), createBlock13(_sfc_main$6, mergeProps10({ class: "card-header" }, unref15(props)), {
        default: withCtx12(() => [
          renderSlot12(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
var _sfc_main$4 = defineComponent17({
  __name: "BCardTitle",
  props: {
    tag: { default: "h4" },
    text: { default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BCardTitle");
    return (_ctx, _cache) => {
      return openBlock14(), createBlock13(resolveDynamicComponent11(unref15(props).tag), { class: "card-title" }, {
        default: withCtx12(() => [
          renderSlot12(_ctx.$slots, "default", {}, () => [
            createTextVNode8(toDisplayString8(unref15(props).text), 1)
          ])
        ]),
        _: 3
      });
    };
  }
});
var _sfc_main$3 = defineComponent17({
  __name: "BCardSubtitle",
  props: {
    text: { default: void 0 },
    tag: { default: "h6" },
    textVariant: { default: "body-secondary" }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BCardSubtitle");
    const computedClasses = useColorVariantClasses(props);
    return (_ctx, _cache) => {
      return openBlock14(), createBlock13(resolveDynamicComponent11(unref15(props).tag), {
        class: normalizeClass8(["card-subtitle mb-2", unref15(computedClasses)])
      }, {
        default: withCtx12(() => [
          renderSlot12(_ctx.$slots, "default", {}, () => [
            createTextVNode8(toDisplayString8(unref15(props).text), 1)
          ])
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
});
var _sfc_main$2 = defineComponent17({
  __name: "BCardBody",
  props: {
    overlay: { type: Boolean, default: false },
    subtitle: { default: void 0 },
    subtitleTag: { default: "h4" },
    subtitleTextVariant: { default: void 0 },
    tag: { default: "div" },
    text: { default: void 0 },
    title: { default: void 0 },
    titleTag: { default: "h4" },
    variant: { default: null },
    bgVariant: { default: null },
    textVariant: { default: null }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BCardBody");
    const slots = useSlots5();
    const hasTitleSlot = computed27(() => !isEmptySlot(slots.title));
    const hasSubtitleSlot = computed27(() => !isEmptySlot(slots.subtitle));
    const colorClasses = useColorVariantClasses(props);
    const computedClasses = computed27(() => [
      colorClasses.value,
      props.overlay ? "card-img-overlay" : "card-body"
    ]);
    return (_ctx, _cache) => {
      return openBlock14(), createBlock13(resolveDynamicComponent11(unref15(props).tag), {
        class: normalizeClass8(computedClasses.value)
      }, {
        default: withCtx12(() => [
          !!unref15(props).title || hasTitleSlot.value ? (openBlock14(), createBlock13(_sfc_main$4, {
            key: 0,
            tag: unref15(props).titleTag
          }, {
            default: withCtx12(() => [
              renderSlot12(_ctx.$slots, "title", {}, () => [
                createTextVNode8(toDisplayString8(unref15(props).title), 1)
              ])
            ]),
            _: 3
          }, 8, ["tag"])) : createCommentVNode7("", true),
          !!unref15(props).subtitle || hasSubtitleSlot.value ? (openBlock14(), createBlock13(_sfc_main$3, {
            key: 1,
            tag: unref15(props).subtitleTag,
            "text-variant": unref15(props).subtitleTextVariant
          }, {
            default: withCtx12(() => [
              renderSlot12(_ctx.$slots, "subtitle", {}, () => [
                createTextVNode8(toDisplayString8(unref15(props).subtitle), 1)
              ])
            ]),
            _: 3
          }, 8, ["tag", "text-variant"])) : createCommentVNode7("", true),
          renderSlot12(_ctx.$slots, "default", {}, () => [
            createTextVNode8(toDisplayString8(unref15(props).text), 1)
          ])
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
});
var _sfc_main$15 = defineComponent17({
  __name: "BCardFooter",
  props: {
    borderVariant: { default: void 0 },
    tag: { default: "div" },
    text: { default: void 0 },
    variant: { default: void 0 },
    bgVariant: { default: void 0 },
    textVariant: { default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BCardFooter");
    return (_ctx, _cache) => {
      return openBlock14(), createBlock13(_sfc_main$6, mergeProps10({ class: "card-footer" }, unref15(props)), {
        default: withCtx12(() => [
          renderSlot12(_ctx.$slots, "default", {}, () => [
            createTextVNode8(toDisplayString8(unref15(props).text), 1)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
});
var _sfc_main16 = defineComponent17({
  __name: "BCard",
  props: {
    align: { default: void 0 },
    bodyBgVariant: { default: void 0 },
    bodyClass: { default: void 0 },
    bodyTag: { default: "div" },
    bodyText: { default: "" },
    bodyTextVariant: { default: void 0 },
    borderVariant: { default: null },
    footer: { default: void 0 },
    footerBgVariant: { default: void 0 },
    footerBorderVariant: { default: void 0 },
    footerClass: { default: void 0 },
    footerTag: { default: "div" },
    footerTextVariant: { default: void 0 },
    footerVariant: { default: null },
    header: { default: void 0 },
    headerBgVariant: { default: void 0 },
    headerBorderVariant: { default: void 0 },
    headerClass: { default: void 0 },
    headerTag: { default: "div" },
    headerTextVariant: { default: void 0 },
    headerVariant: { default: null },
    imgAlt: { default: void 0 },
    imgPlacement: { default: "top" },
    imgHeight: { default: void 0 },
    imgSrc: { default: void 0 },
    imgWidth: { default: void 0 },
    noBody: { type: Boolean, default: false },
    subtitle: { default: void 0 },
    subtitleTag: { default: "h6" },
    subtitleTextVariant: { default: "body-secondary" },
    tag: { default: "div" },
    title: { default: void 0 },
    titleTag: { default: "h4" },
    variant: { default: null },
    bgVariant: { default: null },
    textVariant: { default: null }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BCard");
    const slots = useSlots5();
    const hasHeaderSlot = computed27(() => !isEmptySlot(slots.header));
    const hasFooterSlot = computed27(() => !isEmptySlot(slots.footer));
    const colorClasses = useColorVariantClasses(props);
    const computedClasses = computed27(() => [
      colorClasses.value,
      {
        [`text-${props.align}`]: props.align !== void 0,
        "flex-row": props.imgPlacement === "start",
        "flex-row-reverse": props.imgPlacement === "end"
      }
    ]);
    const imgAttr = computed27(() => ({
      src: props.imgSrc,
      alt: props.imgAlt,
      height: props.imgHeight,
      width: props.imgWidth,
      placement: props.imgPlacement
    }));
    const ReusableImg = createReusableTemplate();
    return (_ctx, _cache) => {
      return openBlock14(), createBlock13(resolveDynamicComponent11(unref15(props).tag), {
        class: normalizeClass8(["card", computedClasses.value])
      }, {
        default: withCtx12(() => [
          createVNode5(unref15(ReusableImg).define, null, {
            default: withCtx12(() => [
              renderSlot12(_ctx.$slots, "img", {}, () => [
                unref15(props).imgSrc ? (openBlock14(), createBlock13(_sfc_main$7, normalizeProps2(mergeProps10({ key: 0 }, imgAttr.value)), null, 16)) : createCommentVNode7("", true)
              ])
            ]),
            _: 3
          }),
          unref15(props).imgPlacement !== "bottom" ? (openBlock14(), createBlock13(unref15(ReusableImg).reuse, { key: 0 })) : createCommentVNode7("", true),
          unref15(props).header || hasHeaderSlot.value ? (openBlock14(), createBlock13(_sfc_main$5, {
            key: 1,
            "bg-variant": unref15(props).headerBgVariant,
            variant: unref15(props).headerVariant,
            "border-variant": unref15(props).headerBorderVariant,
            tag: unref15(props).headerTag,
            "text-variant": unref15(props).headerTextVariant,
            class: normalizeClass8(unref15(props).headerClass)
          }, {
            default: withCtx12(() => [
              renderSlot12(_ctx.$slots, "header", {}, () => [
                createTextVNode8(toDisplayString8(unref15(props).header), 1)
              ])
            ]),
            _: 3
          }, 8, ["bg-variant", "variant", "border-variant", "tag", "text-variant", "class"])) : createCommentVNode7("", true),
          !unref15(props).noBody ? (openBlock14(), createBlock13(_sfc_main$2, {
            key: 2,
            overlay: unref15(props).imgPlacement === "overlay",
            "bg-variant": unref15(props).bodyBgVariant,
            tag: unref15(props).bodyTag,
            "text-variant": unref15(props).bodyTextVariant,
            subtitle: unref15(props).subtitle,
            "subtitle-tag": unref15(props).subtitleTag,
            "subtitle-text-variant": unref15(props).subtitleTextVariant,
            title: unref15(props).title,
            "title-tag": unref15(props).titleTag,
            class: normalizeClass8(unref15(props).bodyClass)
          }, {
            default: withCtx12(() => [
              renderSlot12(_ctx.$slots, "default", {}, () => [
                createTextVNode8(toDisplayString8(unref15(props).bodyText), 1)
              ])
            ]),
            _: 3
          }, 8, ["overlay", "bg-variant", "tag", "text-variant", "subtitle", "subtitle-tag", "subtitle-text-variant", "title", "title-tag", "class"])) : renderSlot12(_ctx.$slots, "default", { key: 3 }, () => [
            createTextVNode8(toDisplayString8(unref15(props).bodyText), 1)
          ]),
          unref15(props).footer || hasFooterSlot.value ? (openBlock14(), createBlock13(_sfc_main$15, {
            key: 4,
            "bg-variant": unref15(props).footerBgVariant,
            "border-variant": unref15(props).footerBorderVariant,
            variant: unref15(props).footerVariant,
            tag: unref15(props).footerTag,
            "text-variant": unref15(props).footerTextVariant,
            class: normalizeClass8(unref15(props).footerClass)
          }, {
            default: withCtx12(() => [
              renderSlot12(_ctx.$slots, "footer", {}, () => [
                createTextVNode8(toDisplayString8(unref15(props).footer), 1)
              ])
            ]),
            _: 3
          }, 8, ["bg-variant", "border-variant", "variant", "tag", "text-variant", "class"])) : createCommentVNode7("", true),
          unref15(props).imgPlacement === "bottom" ? (openBlock14(), createBlock13(unref15(ReusableImg).reuse, { key: 5 })) : createCommentVNode7("", true)
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BCardText.vue_vue_type_script_setup_true_lang-BXeXkNEL.mjs
import { defineComponent as defineComponent18, computed as computed28, openBlock as openBlock15, createBlock as createBlock14, resolveDynamicComponent as resolveDynamicComponent12, unref as unref16, normalizeClass as normalizeClass9, withCtx as withCtx13, renderSlot as renderSlot13, createTextVNode as createTextVNode9, toDisplayString as toDisplayString9 } from "vue";
var _sfc_main$16 = defineComponent18({
  __name: "BCardGroup",
  props: {
    columns: { type: Boolean, default: false },
    deck: { type: Boolean, default: false },
    tag: { default: "div" }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BCardGroup");
    const cardTypeClass = computed28(
      () => props.deck ? "card-deck" : props.columns ? "card-columns" : "card-group"
    );
    return (_ctx, _cache) => {
      return openBlock15(), createBlock14(resolveDynamicComponent12(unref16(props).tag), {
        class: normalizeClass9(cardTypeClass.value)
      }, {
        default: withCtx13(() => [
          renderSlot13(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
});
var _sfc_main17 = defineComponent18({
  __name: "BCardText",
  props: {
    tag: { default: "p" },
    text: { default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BCardText");
    return (_ctx, _cache) => {
      return openBlock15(), createBlock14(resolveDynamicComponent12(unref16(props).tag), { class: "card-text" }, {
        default: withCtx13(() => [
          renderSlot13(_ctx.$slots, "default", {}, () => [
            createTextVNode9(toDisplayString9(unref16(props).text), 1)
          ])
        ]),
        _: 3
      });
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BCarouselSlide.vue_vue_type_script_setup_true_lang-Cirpx-_l.mjs
import { defineComponent as defineComponent19, mergeModels as mergeModels6, useSlots as useSlots6, useModel as useModel6, useTemplateRef as useTemplateRef5, ref as ref9, onMounted as onMounted7, computed as computed29, watch as watch10, provide as provide6, toRef as toRef9, openBlock as openBlock16, createElementBlock as createElementBlock11, unref as unref17, normalizeClass as normalizeClass10, Fragment as Fragment6, renderList as renderList2, createCommentVNode as createCommentVNode8, createElementVNode as createElementVNode5, createVNode as createVNode6, TransitionGroup, withCtx as withCtx14, withDirectives as withDirectives3, createBlock as createBlock15, resolveDynamicComponent as resolveDynamicComponent13, normalizeStyle as normalizeStyle3, vShow as vShow3, toDisplayString as toDisplayString10, inject as inject11, renderSlot as renderSlot14 } from "vue";
var getSlotElements = (slot, filterBy) => ((slot == null ? void 0 : slot()) ?? []).reduce((arr, slot2) => {
  if (typeof slot2.type === "symbol") {
    arr = arr.concat(slot2.children);
  } else {
    arr.push(slot2);
  }
  return arr;
}, []).filter((child) => {
  var _a;
  return ((_a = child.type) == null ? void 0 : _a.__name) === filterBy;
});
var _hoisted_1$12 = ["id"];
var _hoisted_24 = ["aria-label", "aria-owns"];
var _hoisted_32 = ["aria-current", "aria-label", "aria-controls", "aria-describedby", "onClick"];
var _hoisted_42 = {
  ref: "_relatedTarget",
  class: "carousel-inner"
};
var _hoisted_5 = { class: "visually-hidden" };
var _hoisted_6 = { class: "visually-hidden" };
var _sfc_main$17 = defineComponent19({
  __name: "BCarousel",
  props: mergeModels6({
    background: { default: void 0 },
    controls: { type: Boolean, default: false },
    controlsNextText: { default: "Next" },
    controlsPrevText: { default: "Previous" },
    fade: { type: Boolean, default: false },
    id: { default: void 0 },
    imgHeight: { default: void 0 },
    imgWidth: { default: void 0 },
    indicators: { type: Boolean, default: false },
    indicatorsButtonLabel: { default: "Slide" },
    interval: { default: 5e3 },
    labelIndicators: { default: "Select a slide to display" },
    keyboard: { type: Boolean, default: true },
    noAnimation: { type: Boolean, default: false },
    noHoverPause: { type: Boolean, default: false },
    noTouch: { type: Boolean, default: false },
    noWrap: { type: Boolean, default: false },
    ride: { type: [Boolean, String], default: false },
    rideReverse: { type: Boolean, default: false },
    touchThreshold: { default: 50 }
  }, {
    "modelValue": { default: 0 },
    "modelModifiers": {}
  }),
  emits: mergeModels6(["slide", "slid", "click:prev", "click:next"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BCarousel");
    const emit = __emit;
    const slots = useSlots6();
    const computedId = useId(() => props.id, "carousel");
    const buttonOwnership = useId(void 0, "carousel-button-ownership");
    const modelValue = useModel6(__props, "modelValue");
    const slideValues = useTemplateRef5("_slideValues");
    const touchThresholdNumber = useToNumber(() => props.touchThreshold);
    const slideInterval = ref9(null);
    onMounted7(() => {
      var _a, _b;
      slideInterval.value = ((_b = (_a = slideValues.value) == null ? void 0 : _a.find((slid) => slid.$el.style.display !== "none")) == null ? void 0 : _b._interval) ?? null;
    });
    const intervalNumber = useToNumber(() => slideInterval.value ?? props.interval);
    const isTransitioning = ref9(false);
    const rideStarted = ref9(false);
    const direction = ref9(true);
    const relatedTarget = useTemplateRef5("_relatedTarget");
    const element = useTemplateRef5("_element");
    const previousModelValue = ref9(modelValue.value);
    const isHovering = useElementHover(element);
    const enterClasses = computed29(
      () => `carousel-item carousel-item-${!direction.value ? "next" : "prev"} carousel-item-${!direction.value ? "start" : "end"}`
    );
    const leaveClasses = computed29(
      () => `carousel-item active carousel-item-${direction.value ? "start" : "end"}`
    );
    const { pause, resume } = useIntervalFn(
      () => {
        if (props.rideReverse) {
          prev();
          return;
        }
        next();
      },
      intervalNumber,
      { immediate: props.ride === "carousel" }
    );
    const isRiding = computed29(
      () => props.ride === true && rideStarted.value === true || props.ride === "carousel"
    );
    const slides = computed29(() => getSlotElements(slots.default, "BCarouselSlide"));
    const computedClasses = computed29(() => ({ "carousel-fade": props.fade }));
    const buildBvCarouselEvent = (event) => {
      var _a;
      return new BvCarouselEvent(event, {
        componentId: computedId.value,
        cancelable: false,
        target: element.value,
        direction: direction.value ? "right" : "left",
        from: previousModelValue.value,
        to: modelValue.value,
        relatedTarget: ((_a = relatedTarget.value) == null ? void 0 : _a.children[modelValue.value]) ?? null
      });
    };
    const goToValue = (value) => {
      if (isTransitioning.value === true)
        return;
      if (props.ride === true) {
        rideStarted.value = true;
      }
      if (isRiding.value === true) {
        resume();
      }
      direction.value = value < modelValue.value ? false : true;
      if (value >= slides.value.length) {
        if (props.noWrap)
          return;
        modelValue.value = 0;
        return;
      }
      if (value < 0) {
        if (props.noWrap)
          return;
        modelValue.value = slides.value.length - 1;
        return;
      }
      previousModelValue.value = modelValue.value;
      modelValue.value = value;
    };
    const prev = () => {
      goToValue(modelValue.value - 1);
    };
    const next = () => {
      goToValue(modelValue.value + 1);
    };
    const onKeydown = (fn) => {
      if (props.keyboard === false)
        return;
      fn();
    };
    const onMouseEnter = () => {
      if (props.noHoverPause)
        return;
      pause();
    };
    const onMouseLeave = () => {
      if (!isRiding.value)
        return;
      resume();
    };
    const { lengthX } = useSwipe(element, {
      passive: true,
      onSwipeStart() {
        if (props.noTouch === true)
          return;
        pause();
      },
      onSwipeEnd() {
        if (props.noTouch === true)
          return;
        const resumeRiding = () => {
          if (isRiding.value === false)
            return;
          resume();
        };
        if (lengthX.value >= touchThresholdNumber.value) {
          next();
          resumeRiding();
          return;
        }
        if (lengthX.value <= -touchThresholdNumber.value) {
          prev();
          resumeRiding();
        }
      }
    });
    const onBeforeLeave = () => {
      emit("slide", buildBvCarouselEvent("slide"));
      isTransitioning.value = true;
    };
    const onAfterLeave = () => {
      emit("slid", buildBvCarouselEvent("slid"));
      isTransitioning.value = false;
    };
    const onAfterEnter = (el) => {
      if (modelValue.value !== 0) {
        el.classList.add("carousel-item");
      }
    };
    const onEnter = (el) => {
      var _a, _b;
      slideInterval.value = ((_b = (_a = slideValues.value) == null ? void 0 : _a.find((slid) => slid.$el === el)) == null ? void 0 : _b._interval) ?? null;
    };
    onKeyStroke(
      "ArrowLeft",
      () => {
        onKeydown(prev);
      },
      { target: element }
    );
    onKeyStroke(
      "ArrowRight",
      () => {
        onKeydown(next);
      },
      { target: element }
    );
    watch10(
      () => props.ride,
      () => {
        rideStarted.value = false;
      }
    );
    watch10(isHovering, (newValue) => {
      if (newValue) {
        onMouseEnter();
        return;
      }
      onMouseLeave();
    });
    const onClickPrev = (event) => {
      emit("click:prev", event);
      if (event.defaultPrevented)
        return;
      prev();
    };
    const onClickNext = (event) => {
      emit("click:next", event);
      if (event.defaultPrevented)
        return;
      next();
    };
    __expose({
      next,
      pause,
      prev,
      resume
    });
    provide6(carouselInjectionKey, {
      background: toRef9(() => props.background),
      width: toRef9(() => props.imgWidth),
      height: toRef9(() => props.imgHeight)
    });
    return (_ctx, _cache) => {
      return openBlock16(), createElementBlock11("div", {
        id: unref17(computedId),
        ref: "_element",
        class: normalizeClass10(["carousel slide pointer-event", computedClasses.value])
      }, [
        unref17(props).indicators ? (openBlock16(), createElementBlock11("div", {
          key: 0,
          class: "carousel-indicators",
          "aria-label": unref17(props).labelIndicators,
          "aria-owns": unref17(buttonOwnership)
        }, [
          (openBlock16(true), createElementBlock11(Fragment6, null, renderList2(slides.value.length, (_, i) => {
            var _a;
            return openBlock16(), createElementBlock11("button", {
              key: i,
              type: "button",
              "data-bs-target": "",
              class: normalizeClass10(i === modelValue.value ? "active" : ""),
              "aria-current": i === modelValue.value ? true : void 0,
              "aria-label": `${unref17(props).indicatorsButtonLabel} ${i}`,
              "aria-controls": unref17(buttonOwnership),
              "aria-describedby": (_a = unref17(slideValues)) == null ? void 0 : _a[i]._id,
              onClick: ($event) => goToValue(i)
            }, null, 10, _hoisted_32);
          }), 128))
        ], 8, _hoisted_24)) : createCommentVNode8("", true),
        createElementVNode5("div", _hoisted_42, [
          createVNode6(TransitionGroup, {
            "enter-from-class": enterClasses.value,
            "enter-active-class": enterClasses.value,
            "enter-to-class": enterClasses.value,
            "leave-from-class": leaveClasses.value,
            "leave-active-class": leaveClasses.value,
            "leave-to-class": leaveClasses.value,
            onBeforeLeave,
            onAfterLeave,
            onAfterEnter,
            onEnter
          }, {
            default: withCtx14(() => [
              (openBlock16(true), createElementBlock11(Fragment6, null, renderList2(slides.value, (slide, i) => {
                return withDirectives3((openBlock16(), createBlock15(resolveDynamicComponent13(slide), {
                  key: i,
                  ref_for: true,
                  ref: "_slideValues",
                  class: normalizeClass10({ active: i === modelValue.value && isTransitioning.value === false }),
                  style: normalizeStyle3(unref17(props).noAnimation && { transition: "none" })
                }, null, 8, ["class", "style"])), [
                  [vShow3, i === modelValue.value]
                ]);
              }), 128))
            ]),
            _: 1
          }, 8, ["enter-from-class", "enter-active-class", "enter-to-class", "leave-from-class", "leave-active-class", "leave-to-class"])
        ], 512),
        unref17(props).controls ? (openBlock16(), createElementBlock11(Fragment6, { key: 1 }, [
          createElementVNode5("button", {
            class: "carousel-control-prev",
            type: "button",
            onClick: onClickPrev
          }, [
            _cache[0] || (_cache[0] = createElementVNode5("span", {
              class: "carousel-control-prev-icon",
              "aria-hidden": "true"
            }, null, -1)),
            createElementVNode5("span", _hoisted_5, toDisplayString10(unref17(props).controlsPrevText), 1)
          ]),
          createElementVNode5("button", {
            class: "carousel-control-next",
            type: "button",
            onClick: onClickNext
          }, [
            _cache[1] || (_cache[1] = createElementVNode5("span", {
              class: "carousel-control-next-icon",
              "aria-hidden": "true"
            }, null, -1)),
            createElementVNode5("span", _hoisted_6, toDisplayString10(unref17(props).controlsNextText), 1)
          ])
        ], 64)) : createCommentVNode8("", true)
      ], 10, _hoisted_1$12);
    };
  }
});
var _hoisted_18 = ["id"];
var _sfc_main18 = defineComponent19({
  __name: "BCarouselSlide",
  props: {
    background: { default: void 0 },
    caption: { default: void 0 },
    captionTag: { default: "h3" },
    contentTag: { default: "div" },
    contentVisibleUp: { default: void 0 },
    id: { default: void 0 },
    imgAlt: { default: void 0 },
    imgBlank: { type: Boolean, default: false },
    imgBlankColor: { default: "transparent" },
    imgHeight: { default: void 0 },
    imgSrc: { default: void 0 },
    imgSrcset: { default: void 0 },
    imgWidth: { default: void 0 },
    interval: { default: void 0 },
    text: { default: void 0 },
    textTag: { default: "p" }
  },
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, "BCarouselSlide");
    const slots = useSlots6();
    const computedId = useId(() => props.id, "carousel-slide");
    const parentData = inject11(carouselInjectionKey, null);
    const hasText = computed29(() => props.text || !isEmptySlot(slots.text));
    const hasCaption = computed29(() => props.caption || !isEmptySlot(slots.caption));
    const hasContent = computed29(() => hasText.value || hasCaption.value || !isEmptySlot(slots.default));
    const computedStyle = computed29(() => ({
      background: `${props.background || (parentData == null ? void 0 : parentData.background.value) || "rgb(171, 171, 171)"} none repeat scroll 0% 0%`
    }));
    const computedContentClasses = computed29(() => ({
      "d-none": props.contentVisibleUp !== void 0,
      [`d-${props.contentVisibleUp}-block`]: props.contentVisibleUp !== void 0
    }));
    __expose({
      _interval: toRef9(() => props.interval),
      _id: computedId
    });
    return (_ctx, _cache) => {
      return openBlock16(), createElementBlock11("div", {
        id: unref17(computedId),
        class: "carousel-item",
        style: normalizeStyle3(computedStyle.value)
      }, [
        renderSlot14(_ctx.$slots, "img", {}, () => {
          var _a, _b;
          return [
            createVNode6(_sfc_main15, {
              class: "d-block w-100",
              alt: unref17(props).imgAlt,
              srcset: unref17(props).imgSrcset,
              src: unref17(props).imgSrc,
              width: unref17(props).imgWidth || ((_a = unref17(parentData)) == null ? void 0 : _a.width.value),
              height: unref17(props).imgHeight || ((_b = unref17(parentData)) == null ? void 0 : _b.height.value),
              blank: unref17(props).imgBlank,
              "blank-color": unref17(props).imgBlankColor
            }, null, 8, ["alt", "srcset", "src", "width", "height", "blank", "blank-color"])
          ];
        }),
        hasContent.value ? (openBlock16(), createBlock15(resolveDynamicComponent13(unref17(props).contentTag), {
          key: 0,
          class: normalizeClass10(["carousel-caption", computedContentClasses.value])
        }, {
          default: withCtx14(() => [
            hasCaption.value ? (openBlock16(), createBlock15(resolveDynamicComponent13(unref17(props).captionTag), { key: 0 }, {
              default: withCtx14(() => [
                renderSlot14(_ctx.$slots, "caption", {}, () => [
                  createElementVNode5("span", null, toDisplayString10(unref17(props).caption), 1)
                ])
              ]),
              _: 3
            })) : createCommentVNode8("", true),
            hasText.value ? (openBlock16(), createBlock15(resolveDynamicComponent13(unref17(props).textTag), { key: 1 }, {
              default: withCtx14(() => [
                renderSlot14(_ctx.$slots, "text", {}, () => [
                  createElementVNode5("span", null, toDisplayString10(unref17(props).text), 1)
                ])
              ]),
              _: 3
            })) : createCommentVNode8("", true),
            renderSlot14(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["class"])) : createCommentVNode8("", true)
      ], 12, _hoisted_18);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BCol.vue_vue_type_script_setup_true_lang-3vCnKZsk.mjs
import { defineComponent as defineComponent20, computed as computed30, openBlock as openBlock17, createBlock as createBlock16, resolveDynamicComponent as resolveDynamicComponent14, unref as unref18, normalizeClass as normalizeClass11, withCtx as withCtx15, renderSlot as renderSlot15 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/getClasses-CsgNQabU.mjs
var getClasses = (props, els, propPrefix, classPrefix = propPrefix) => els.reduce((arr, prop) => {
  if (!props[prop])
    return arr;
  arr.push(
    [classPrefix, prop.replace(propPrefix, ""), props[prop]].filter((e) => e && typeof e !== "boolean").join("-").toLowerCase()
  );
  return arr;
}, []);

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BCol.vue_vue_type_script_setup_true_lang-3vCnKZsk.mjs
var _sfc_main19 = defineComponent20({
  __name: "BCol",
  props: {
    alignSelf: { default: void 0 },
    tag: { default: "div" },
    order: { default: void 0 },
    offset: { default: void 0 },
    cols: { default: void 0 },
    col: { type: Boolean, default: false },
    offsetSm: { default: void 0 },
    offsetMd: { default: void 0 },
    offsetLg: { default: void 0 },
    offsetXl: { default: void 0 },
    offsetXxl: { default: void 0 },
    orderSm: { default: void 0 },
    orderMd: { default: void 0 },
    orderLg: { default: void 0 },
    orderXl: { default: void 0 },
    orderXxl: { default: void 0 },
    sm: { type: [Boolean, Number, String], default: false },
    md: { type: [Boolean, Number, String], default: false },
    lg: { type: [Boolean, Number, String], default: false },
    xl: { type: [Boolean, Number, String], default: false },
    xxl: { type: [Boolean, Number, String], default: false }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BCol");
    const classList = computed30(() => [
      ...getClasses(
        {
          sm: props.sm,
          md: props.md,
          lg: props.lg,
          xl: props.xl,
          xxl: props.xxl
        },
        ["sm", "md", "lg", "xl", "xxl"],
        "col"
      ),
      ...getClasses(
        {
          order: props.order,
          orderLg: props.orderLg,
          orderMd: props.orderMd,
          orderSm: props.orderSm,
          orderXl: props.orderXl,
          orderXxl: props.orderXxl
        },
        ["order", "orderLg", "orderMd", "orderSm", "orderXl", "orderXxl"],
        "order"
      ),
      ...getClasses(
        {
          offset: props.offset,
          offsetLg: props.offsetLg,
          offsetMd: props.offsetMd,
          offsetSm: props.offsetSm,
          offsetXl: props.offsetXl,
          offsetXxl: props.offsetXxl
        },
        ["offset", "offsetLg", "offsetMd", "offsetSm", "offsetXl", "offsetXxl"],
        "offset"
      )
    ]);
    const computedClasses = computed30(() => [
      classList.value,
      {
        col: props.col || !classList.value.some((v) => v.startsWith("col-")) && !props.cols,
        [`col-${props.cols}`]: props.cols !== void 0,
        [`offset-${props.offset}`]: props.offset !== void 0,
        [`order-${props.order}`]: props.order !== void 0,
        [`align-self-${props.alignSelf}`]: props.alignSelf !== void 0
      }
    ]);
    return (_ctx, _cache) => {
      return openBlock17(), createBlock16(resolveDynamicComponent14(unref18(props).tag), {
        class: normalizeClass11(computedClasses.value)
      }, {
        default: withCtx15(() => [
          renderSlot15(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BContainer.vue_vue_type_script_setup_true_lang-B1dX8KZx.mjs
import { defineComponent as defineComponent21, computed as computed31, openBlock as openBlock18, createBlock as createBlock17, resolveDynamicComponent as resolveDynamicComponent15, unref as unref19, normalizeClass as normalizeClass12, withCtx as withCtx16, renderSlot as renderSlot16 } from "vue";
var _sfc_main20 = defineComponent21({
  __name: "BContainer",
  props: {
    fluid: { type: [Boolean, String], default: false },
    gutterX: { default: void 0 },
    gutterY: { default: void 0 },
    tag: { default: "div" }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BContainer");
    const computedClasses = computed31(() => ({
      container: props.fluid === false,
      [`container-fluid`]: props.fluid === true,
      [`container-${props.fluid}`]: typeof props.fluid === "string",
      [`gx-${props.gutterX}`]: props.gutterX !== void 0,
      [`gy-${props.gutterY}`]: props.gutterY !== void 0
    }));
    return (_ctx, _cache) => {
      return openBlock18(), createBlock17(resolveDynamicComponent15(unref19(props).tag), {
        class: normalizeClass12(computedClasses.value)
      }, {
        default: withCtx16(() => [
          renderSlot16(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BRow.vue_vue_type_script_setup_true_lang-DpYmBxeF.mjs
import { defineComponent as defineComponent22, computed as computed33, openBlock as openBlock19, createBlock as createBlock18, resolveDynamicComponent as resolveDynamicComponent16, unref as unref20, normalizeClass as normalizeClass13, withCtx as withCtx17, renderSlot as renderSlot17 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useAlignment-Cw-9AVid.mjs
import { computed as computed32, toValue as toValue11 } from "vue";
var useAlignment = (align) => computed32(() => {
  const value = toValue11(align);
  return !value ? "" : `justify-content-${value}`;
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BRow.vue_vue_type_script_setup_true_lang-DpYmBxeF.mjs
var _sfc_main21 = defineComponent22({
  __name: "BRow",
  props: {
    tag: { default: "div" },
    gutterX: { default: void 0 },
    gutterY: { default: void 0 },
    noGutters: { type: Boolean, default: false },
    alignV: { default: void 0 },
    alignH: { default: void 0 },
    alignContent: { default: void 0 },
    cols: { default: void 0 },
    colsSm: { default: void 0 },
    colsMd: { default: void 0 },
    colsLg: { default: void 0 },
    colsXl: { default: void 0 },
    colsXxl: { default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BRow");
    const alignment = useAlignment(() => props.alignH);
    const rowColsClasses = computed33(
      () => getClasses(
        {
          cols: props.cols,
          colsLg: props.colsLg,
          colsMd: props.colsMd,
          colsSm: props.colsSm,
          colsXl: props.colsXl,
          colsXxl: props.colsXxl
        },
        ["cols", "colsLg", "colsMd", "colsSm", "colsXl", "colsXxl"],
        "cols",
        "row-cols"
      )
    );
    const computedClasses = computed33(() => [
      rowColsClasses.value,
      {
        [`gx-${props.gutterX}`]: props.gutterX !== void 0,
        [`gy-${props.gutterY}`]: props.gutterY !== void 0,
        "g-0": props.noGutters,
        [`align-items-${props.alignV}`]: props.alignV !== void 0,
        [alignment.value]: props.alignH !== void 0,
        [`align-content-${props.alignContent}`]: props.alignContent !== void 0
      }
    ]);
    return (_ctx, _cache) => {
      return openBlock19(), createBlock18(resolveDynamicComponent16(unref20(props).tag), {
        class: normalizeClass13(["row", computedClasses.value])
      }, {
        default: withCtx17(() => [
          renderSlot17(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BDropdown-BYH3ZAU-.mjs
import { defineComponent as defineComponent23, mergeModels as mergeModels7, useModel as useModel7, inject as inject12, computed as computed34, useTemplateRef as useTemplateRef6, ref as ref10, toRef as toRef10, watch as watch11, provide as provide7, openBlock as openBlock20, createBlock as createBlock19, unref as unref21, normalizeClass as normalizeClass14, withCtx as withCtx18, createVNode as createVNode7, renderSlot as renderSlot18, createTextVNode as createTextVNode10, toDisplayString as toDisplayString11, createElementVNode as createElementVNode6, createCommentVNode as createCommentVNode9, Transition as Transition4, mergeProps as mergeProps11, withDirectives as withDirectives4, normalizeStyle as normalizeStyle4, vShow as vShow4, nextTick as nextTick7 } from "vue";
var _hoisted_19 = { class: "visually-hidden" };
var _hoisted_25 = ["id", "aria-labelledby", "role"];
var _sfc_main22 = defineComponent23({
  __name: "BDropdown",
  props: mergeModels7({
    ariaLabel: { default: void 0 },
    autoClose: { type: [Boolean, String], default: true },
    boundary: { default: "clippingAncestors" },
    boundaryPadding: { default: void 0 },
    disabled: { type: Boolean, default: false },
    floatingMiddleware: { default: void 0 },
    id: { default: void 0 },
    isNav: { type: Boolean, default: false },
    menuClass: { default: void 0 },
    noCaret: { type: Boolean, default: false },
    noFlip: { type: Boolean, default: false },
    noShift: { type: Boolean, default: false },
    noSize: { type: Boolean, default: false },
    offset: { default: 0 },
    role: { default: "menu" },
    size: { default: "md" },
    noWrapper: { type: Boolean, default: false },
    split: { type: Boolean, default: false },
    splitButtonType: { default: "button" },
    splitClass: { default: void 0 },
    splitDisabled: { type: Boolean, default: void 0 },
    splitHref: { default: void 0 },
    splitTo: { default: void 0 },
    splitVariant: { default: void 0 },
    strategy: { default: "absolute" },
    text: { default: void 0 },
    toggleClass: { default: void 0 },
    toggleText: { default: "Toggle dropdown" },
    variant: { default: "secondary" },
    wrapperClass: { default: void 0 },
    placement: { default: "bottom-start" },
    teleportDisabled: { type: Boolean, default: false },
    teleportTo: { default: void 0 },
    initialAnimation: { type: Boolean, default: false },
    noAnimation: { type: Boolean },
    noFade: { type: Boolean, default: false },
    lazy: { type: Boolean, default: false },
    unmountLazy: { type: Boolean, default: false },
    show: { type: Boolean, default: false },
    transProps: { default: void 0 },
    visible: { type: Boolean, default: false }
  }, {
    "modelValue": { type: Boolean, ...{ default: false } },
    "modelModifiers": {}
  }),
  emits: mergeModels7(["click", "hidden", "hide", "hide-prevented", "show", "show-prevented", "shown", "toggle", "toggle-prevented"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BDropdown");
    const emit = __emit;
    const computedId = useId(() => props.id, "dropdown");
    const modelValue = useModel7(__props, "modelValue");
    const inInputGroup = inject12(inputGroupKey, false);
    const inButtonGroup = inject12(buttonGroupKey, false);
    const computedOffset = computed34(
      () => typeof props.offset === "string" || typeof props.offset === "number" ? props.offset : NaN
    );
    const offsetToNumber = useToNumber(computedOffset);
    const floating = useTemplateRef6("_floating");
    const button = useTemplateRef6("_button");
    const splitButton = useTemplateRef6("_splitButton");
    const boundary = computed34(
      () => isBoundary(props.boundary) ? props.boundary : void 0
    );
    const rootBoundary = computed34(
      () => isRootBoundary(props.boundary) ? props.boundary : void 0
    );
    const referencePlacement = computed34(() => !props.split ? splitButton.value : button.value);
    const {
      showRef,
      renderRef,
      hide: hide2,
      show,
      toggle: toggle2,
      computedNoAnimation,
      transitionProps,
      contentShowing,
      isVisible: isVisible2
    } = useShowHide(modelValue, props, emit, referencePlacement, computedId);
    const computedMenuClasses = computed34(() => [
      {
        show: isVisible2.value,
        fade: !computedNoAnimation.value
      }
    ]);
    onKeyStroke(
      "Escape",
      () => {
        var _a;
        hide2();
        (_a = getElement(referencePlacement.value)) == null ? void 0 : _a.focus();
      },
      { target: referencePlacement }
    );
    onKeyStroke(
      "Escape",
      () => {
        var _a;
        hide2();
        (_a = getElement(referencePlacement.value)) == null ? void 0 : _a.focus();
      },
      { target: floating }
    );
    const keynav = (e, v) => {
      var _a, _b, _c, _d, _e, _f, _g;
      if ((_b = floating.value) == null ? void 0 : _b.contains((_a = e.target) == null ? void 0 : _a.closest("form")))
        return;
      if (/input|select|option|textarea|form/i.test((_c = e.target) == null ? void 0 : _c.tagName))
        return;
      e.preventDefault();
      if (!showRef.value) {
        show();
        const loop = setInterval(() => {
          if (isVisible2.value) {
            clearInterval(loop);
            nextTick7(() => keynav(e, v));
          }
        }, 16);
        return;
      }
      const list = (_d = floating.value) == null ? void 0 : _d.querySelectorAll(".dropdown-item:not(.disabled):not(:disabled)");
      if (!list)
        return;
      if ((_e = floating.value) == null ? void 0 : _e.contains(document.activeElement)) {
        const active = floating.value.querySelector(".dropdown-item:focus");
        const index8 = Array.prototype.indexOf.call(list, active) + v;
        if (index8 >= 0 && index8 < (list == null ? void 0 : list.length))
          (_f = list[index8]) == null ? void 0 : _f.focus();
      } else {
        (_g = list[v === -1 ? list.length - 1 : 0]) == null ? void 0 : _g.focus();
      }
    };
    onKeyStroke("ArrowUp", (e) => keynav(e, -1), { target: referencePlacement });
    onKeyStroke("ArrowDown", (e) => keynav(e, 1), { target: referencePlacement });
    onKeyStroke("ArrowUp", (e) => keynav(e, -1), { target: floating });
    onKeyStroke("ArrowDown", (e) => keynav(e, 1), { target: floating });
    const sizeStyles = ref10({});
    const floatingMiddleware = computed34(() => {
      if (props.floatingMiddleware !== void 0) {
        return props.floatingMiddleware;
      }
      const localOffset = typeof props.offset === "string" || typeof props.offset === "number" ? offsetToNumber.value : props.offset;
      const arr = [offset(localOffset)];
      if (props.noFlip === false) {
        arr.push(
          flip({
            boundary: boundary.value,
            rootBoundary: rootBoundary.value,
            padding: props.boundaryPadding
          })
        );
      }
      if (props.noShift === false) {
        arr.push(
          shift({
            boundary: boundary.value,
            rootBoundary: rootBoundary.value,
            padding: props.boundaryPadding
          })
        );
      }
      if (props.noSize === false) {
        arr.push(
          size({
            boundary: boundary.value,
            rootBoundary: rootBoundary.value,
            padding: props.boundaryPadding,
            apply({ availableWidth, availableHeight }) {
              var _a, _b;
              sizeStyles.value = {
                maxHeight: availableHeight >= (((_a = floating.value) == null ? void 0 : _a.scrollHeight) ?? 0) ? void 0 : availableHeight ? `${Math.max(0, availableHeight)}px` : void 0,
                maxWidth: availableWidth >= (((_b = floating.value) == null ? void 0 : _b.scrollWidth) ?? 0) ? void 0 : availableWidth ? `${Math.max(0, availableWidth)}px` : void 0
              };
            }
          })
        );
      }
      return arr;
    });
    const { update, floatingStyles } = useFloating(referencePlacement, floating, {
      placement: () => props.placement,
      middleware: floatingMiddleware,
      strategy: toRef10(() => props.strategy),
      whileElementsMounted: autoUpdate
    });
    const inButtonGroupAttributes = inButtonGroup ? {
      class: "btn-group",
      role: "group"
    } : void 0;
    const computedClasses = computed34(() => [
      inButtonGroupAttributes == null ? void 0 : inButtonGroupAttributes.class,
      props.wrapperClass,
      {
        "btn-group": !props.wrapperClass && props.split,
        "dropdown": !props.wrapperClass && !props.split,
        "position-static": props.boundary !== "clippingAncestors" && !props.isNav
      }
    ]);
    const buttonClasses = computed34(() => [
      props.split ? props.splitClass : props.toggleClass,
      {
        "nav-link": props.isNav,
        "dropdown-toggle": !props.split,
        "dropdown-toggle-no-caret": props.noCaret && !props.split,
        "show": props.split ? void 0 : showRef.value
      }
    ]);
    const onButtonClick = () => {
      toggle2();
    };
    const onSplitClick = (event) => {
      if (props.split) {
        emit("click", event);
        return;
      }
      onButtonClick();
    };
    onClickOutside(
      floating,
      () => {
        if (showRef.value && (props.autoClose === true || props.autoClose === "outside")) {
          hide2();
        }
      },
      { ignore: [button, splitButton] }
    );
    const onClickInside = () => {
      if (showRef.value && (props.autoClose === true || props.autoClose === "inside")) {
        hide2();
      }
    };
    watch11(isVisible2, () => {
      update();
    });
    __expose({
      hide: hide2,
      show,
      toggle: toggle2
    });
    provide7(dropdownInjectionKey, {
      id: computedId,
      show,
      hide: hide2,
      toggle: toggle2,
      visible: toRef10(() => showRef.value),
      isNav: toRef10(() => props.isNav)
    });
    return (_ctx, _cache) => {
      var _a;
      return openBlock20(), createBlock19(_sfc_main10, {
        skip: unref21(inInputGroup) || unref21(props).noWrapper,
        class: normalizeClass14(computedClasses.value),
        role: (_a = unref21(inButtonGroupAttributes)) == null ? void 0 : _a.role
      }, {
        default: withCtx18(() => [
          createVNode7(_sfc_main8, {
            id: unref21(computedId),
            ref: "_splitButton",
            variant: unref21(props).splitVariant || unref21(props).variant,
            size: unref21(props).size,
            class: normalizeClass14(buttonClasses.value),
            disabled: unref21(props).splitDisabled || unref21(props).disabled,
            type: unref21(props).splitButtonType,
            "aria-label": unref21(props).ariaLabel,
            "aria-expanded": unref21(props).split ? void 0 : unref21(showRef),
            "aria-haspopup": unref21(props).split ? void 0 : "menu",
            href: unref21(props).split ? unref21(props).splitHref : void 0,
            to: unref21(props).split && unref21(props).splitTo ? unref21(props).splitTo : void 0,
            onClick: onSplitClick
          }, {
            default: withCtx18(() => [
              renderSlot18(_ctx.$slots, "button-content", {}, () => [
                createTextVNode10(toDisplayString11(unref21(props).text), 1)
              ], true)
            ]),
            _: 3
          }, 8, ["id", "variant", "size", "class", "disabled", "type", "aria-label", "aria-expanded", "aria-haspopup", "href", "to"]),
          unref21(props).split ? (openBlock20(), createBlock19(_sfc_main8, {
            key: 0,
            id: unref21(computedId) + "-split",
            ref: "_button",
            variant: unref21(props).variant,
            size: unref21(props).size,
            disabled: unref21(props).disabled,
            class: normalizeClass14([[unref21(props).toggleClass, { show: unref21(showRef) }], "dropdown-toggle-split dropdown-toggle"]),
            "aria-expanded": unref21(showRef),
            "aria-haspopup": "menu",
            onClick: onButtonClick
          }, {
            default: withCtx18(() => [
              createElementVNode6("span", _hoisted_19, [
                renderSlot18(_ctx.$slots, "toggle-text", {}, () => [
                  createTextVNode10(toDisplayString11(unref21(props).toggleText), 1)
                ], true)
              ])
            ]),
            _: 3
          }, 8, ["id", "variant", "size", "disabled", "class", "aria-expanded"])) : createCommentVNode9("", true),
          createVNode7(_sfc_main, {
            to: unref21(props).teleportTo,
            disabled: !unref21(props).teleportTo || unref21(props).teleportDisabled
          }, {
            default: withCtx18(() => [
              unref21(renderRef) || unref21(contentShowing) ? (openBlock20(), createBlock19(Transition4, mergeProps11({ key: 0 }, unref21(transitionProps), { appear: modelValue.value }), {
                default: withCtx18(() => [
                  withDirectives4(createElementVNode6("ul", {
                    id: unref21(computedId) + "-menu",
                    ref: "_floating",
                    style: normalizeStyle4([unref21(floatingStyles), sizeStyles.value]),
                    class: normalizeClass14(["dropdown-menu overflow-auto", [unref21(props).menuClass, computedMenuClasses.value]]),
                    "aria-labelledby": unref21(computedId),
                    role: unref21(props).role,
                    onClick: onClickInside
                  }, [
                    unref21(contentShowing) ? renderSlot18(_ctx.$slots, "default", {
                      key: 0,
                      hide: unref21(hide2),
                      show: unref21(show),
                      visible: unref21(showRef)
                    }, void 0, true) : createCommentVNode9("", true)
                  ], 14, _hoisted_25), [
                    [vShow4, unref21(showRef)]
                  ])
                ]),
                _: 3
              }, 16, ["appear"])) : createCommentVNode9("", true)
            ]),
            _: 3
          }, 8, ["to", "disabled"])
        ]),
        _: 3
      }, 8, ["skip", "class", "role"]);
    };
  }
});
var BDropdown = _export_sfc(_sfc_main22, [["__scopeId", "data-v-ad4c333b"]]);

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BDropdownText.vue_vue_type_script_setup_true_lang-BkWZCteO.mjs
import { defineComponent as defineComponent24, useAttrs as useAttrs3, openBlock as openBlock21, createElementBlock as createElementBlock12, mergeProps as mergeProps12, unref as unref22, createBlock as createBlock20, resolveDynamicComponent as resolveDynamicComponent17, computed as computed35, createElementVNode as createElementVNode7, renderSlot as renderSlot19, normalizeClass as normalizeClass15, withCtx as withCtx19, createTextVNode as createTextVNode11, toDisplayString as toDisplayString12, inject as inject13 } from "vue";
var _sfc_main$62 = defineComponent24({
  ...{
    inheritAttrs: false
  },
  __name: "BDropdownDivider",
  props: {
    dividerClass: { default: void 0 },
    tag: { default: "hr" },
    variant: {},
    wrapperAttrs: { default: void 0 }
  },
  setup(__props) {
    const { class: wrapperClass, ...attrs } = useAttrs3();
    const _props = __props;
    const props = useDefaults(_props, "BDropdownDivider");
    return (_ctx, _cache) => {
      return openBlock21(), createElementBlock12("li", mergeProps12({
        role: "presentation",
        class: unref22(wrapperClass)
      }, _ctx.wrapperAttrs), [
        (openBlock21(), createBlock20(resolveDynamicComponent17(unref22(props).tag), mergeProps12({
          class: ["dropdown-divider", unref22(props).dividerClass],
          role: "separator",
          "aria-orientation": "horizontal"
        }, attrs), null, 16, ["class"]))
      ], 16);
    };
  }
});
var _hoisted_1$2 = ["novalidate"];
var _sfc_main$52 = defineComponent24({
  ...{
    inheritAttrs: false
  },
  __name: "BDropdownForm",
  props: {
    formClass: { default: void 0 },
    novalidate: { type: Boolean, default: void 0 },
    validated: { type: Boolean, default: void 0 },
    wrapperAttrs: { default: void 0 }
  },
  setup(__props) {
    const { class: wrapperClass, ...attrs } = useAttrs3();
    const _props = __props;
    const props = useDefaults(_props, "BDropdownForm");
    const computedClasses = computed35(() => ({
      "was-validated": props.validated,
      ...props.formClass
    }));
    return (_ctx, _cache) => {
      return openBlock21(), createElementBlock12("li", mergeProps12({
        role: "presentation",
        class: unref22(wrapperClass)
      }, unref22(props).wrapperAttrs), [
        createElementVNode7("form", mergeProps12({
          class: ["dropdown-item-text", computedClasses.value],
          novalidate: unref22(props).novalidate
        }, attrs), [
          renderSlot19(_ctx.$slots, "default")
        ], 16, _hoisted_1$2)
      ], 16);
    };
  }
});
var _hoisted_1$13 = { role: "presentation" };
var _hoisted_26 = ["id", "aria-describedby"];
var _sfc_main$42 = defineComponent24({
  ...{
    inheritAttrs: false
  },
  __name: "BDropdownGroup",
  props: {
    ariaDescribedby: { default: void 0 },
    header: { default: void 0 },
    headerClass: { default: void 0 },
    headerTag: { default: "header" },
    headerVariant: { default: null },
    id: { default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BDropdownGroup");
    const headerId = computed35(() => props.id ? `${props.id}_group_dd_header` : void 0);
    const headerRole = computed35(() => props.headerTag === "header" ? void 0 : "heading");
    const colorClasses = useColorVariantClasses(
      computed35(() => ({
        textVariant: props.headerVariant
      }))
    );
    const computedClasses = computed35(() => [props.headerClass, colorClasses.value]);
    return (_ctx, _cache) => {
      return openBlock21(), createElementBlock12("li", _hoisted_1$13, [
        (openBlock21(), createBlock20(resolveDynamicComponent17(unref22(props).headerTag), {
          id: headerId.value,
          class: normalizeClass15(["dropdown-header", computedClasses.value]),
          role: headerRole.value
        }, {
          default: withCtx19(() => [
            renderSlot19(_ctx.$slots, "header", {}, () => [
              createTextVNode11(toDisplayString12(unref22(props).header), 1)
            ])
          ]),
          _: 3
        }, 8, ["id", "class", "role"])),
        createElementVNode7("ul", mergeProps12({
          id: unref22(props).id,
          role: "group",
          class: "list-unstyled"
        }, _ctx.$attrs, {
          "aria-describedby": unref22(props).ariaDescribedby || headerId.value
        }), [
          renderSlot19(_ctx.$slots, "default")
        ], 16, _hoisted_26)
      ]);
    };
  }
});
var _sfc_main$32 = defineComponent24({
  ...{
    inheritAttrs: false
  },
  __name: "BDropdownHeader",
  props: {
    headerClass: { default: void 0 },
    tag: { default: "h6" },
    text: { default: void 0 },
    variant: { default: null },
    wrapperAttrs: { default: void 0 }
  },
  setup(__props) {
    const { class: wrapperClass, ...attrs } = useAttrs3();
    const _props = __props;
    const props = useDefaults(_props, "BDropdownHeader");
    const colorClasses = useColorVariantClasses(
      computed35(() => ({
        textVariant: props.variant
      }))
    );
    return (_ctx, _cache) => {
      return openBlock21(), createElementBlock12("li", mergeProps12({
        role: "presentation",
        class: unref22(wrapperClass)
      }, _ctx.wrapperAttrs), [
        (openBlock21(), createBlock20(resolveDynamicComponent17(unref22(props).tag), mergeProps12({
          class: ["dropdown-header", [unref22(colorClasses), unref22(props).headerClass]]
        }, attrs), {
          default: withCtx19(() => [
            renderSlot19(_ctx.$slots, "default", {}, () => [
              createTextVNode11(toDisplayString12(unref22(props).text), 1)
            ])
          ]),
          _: 3
        }, 16, ["class"]))
      ], 16);
    };
  }
});
var _sfc_main$22 = defineComponent24({
  ...{
    inheritAttrs: false
  },
  __name: "BDropdownItem",
  props: {
    linkClass: { default: void 0 },
    wrapperAttrs: { default: void 0 },
    active: { type: Boolean, default: void 0 },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    icon: { type: Boolean, default: void 0 },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: void 0 },
    variant: { default: null }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BDropdownItem");
    const emit = __emit;
    const { class: wrapperClass, ...attrs } = useAttrs3();
    const { computedLink, computedLinkProps } = useBLinkHelper(props);
    const colorClasses = useColorVariantClasses(
      computed35(() => ({
        textVariant: props.variant
      }))
    );
    const computedClasses = computed35(() => [
      props.linkClass,
      colorClasses.value,
      {
        active: props.active,
        disabled: props.disabled
      }
    ]);
    const computedTag = computed35(() => computedLink.value ? _sfc_main7 : props.href ? "a" : "button");
    const collapseData = inject13(collapseInjectionKey, null);
    const dropdownData = inject13(dropdownInjectionKey, null);
    const navbarData = inject13(navbarInjectionKey, null);
    const clicked = (e) => {
      var _a, _b, _c;
      emit("click", e);
      if (navbarData !== null && ((_a = navbarData == null ? void 0 : navbarData.autoClose) == null ? void 0 : _a.value) === true) {
        (_b = collapseData == null ? void 0 : collapseData.hide) == null ? void 0 : _b.call(collapseData);
      }
      (_c = dropdownData == null ? void 0 : dropdownData.hide) == null ? void 0 : _c.call(dropdownData);
    };
    return (_ctx, _cache) => {
      return openBlock21(), createElementBlock12("li", mergeProps12({
        role: "presentation",
        class: unref22(wrapperClass)
      }, unref22(props).wrapperAttrs), [
        (openBlock21(), createBlock20(resolveDynamicComponent17(computedTag.value), mergeProps12({
          class: ["dropdown-item", computedClasses.value],
          disabled: unref22(props).disabled,
          "aria-disabled": unref22(props).disabled ? true : null,
          "aria-current": unref22(props).active ? true : null,
          href: computedTag.value === "a" ? unref22(props).href : null,
          rel: unref22(props).rel,
          role: "menuitem",
          type: computedTag.value === "button" ? "button" : null,
          target: unref22(props).target
        }, { ...unref22(computedLinkProps), ...attrs }, { onClick: clicked }), {
          default: withCtx19(() => [
            renderSlot19(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16, ["class", "disabled", "aria-disabled", "aria-current", "href", "rel", "type", "target"]))
      ], 16);
    };
  }
});
var _hoisted_110 = ["disabled"];
var _sfc_main$18 = defineComponent24({
  ...{
    inheritAttrs: false
  },
  __name: "BDropdownItemButton",
  props: {
    active: { type: Boolean, default: false },
    activeClass: { default: "active" },
    buttonClass: { default: void 0 },
    wrapperAttrs: { default: void 0 },
    disabled: { type: Boolean, default: false },
    variant: { default: null }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BDropdownItemButton");
    const emit = __emit;
    const { class: wrapperClass, ...attrs } = useAttrs3();
    const colorClasses = useColorVariantClasses(
      computed35(() => ({
        textVariant: props.variant
      }))
    );
    const computedClasses = computed35(() => [
      props.buttonClass,
      colorClasses.value,
      {
        [props.activeClass]: props.active,
        disabled: props.disabled
      }
    ]);
    const clicked = (e) => {
      emit("click", e);
    };
    return (_ctx, _cache) => {
      return openBlock21(), createElementBlock12("li", mergeProps12({
        role: "presentation",
        class: unref22(wrapperClass)
      }, unref22(props).wrapperAttrs), [
        createElementVNode7("button", mergeProps12({
          role: "menu",
          type: "button",
          class: ["dropdown-item", computedClasses.value],
          disabled: unref22(props).disabled
        }, attrs, { onClick: clicked }), [
          renderSlot19(_ctx.$slots, "default")
        ], 16, _hoisted_110)
      ], 16);
    };
  }
});
var _sfc_main23 = defineComponent24({
  ...{
    inheritAttrs: false
  },
  __name: "BDropdownText",
  props: {
    textClass: { default: void 0 },
    tag: { default: "span" },
    text: { default: void 0 },
    variant: { default: null },
    wrapperAttrs: { default: void 0 }
  },
  setup(__props) {
    const { class: wrapperClass, ...attrs } = useAttrs3();
    const _props = __props;
    const props = useDefaults(_props, "BDropdownText");
    const colorClasses = useColorVariantClasses(
      computed35(() => ({
        textVariant: props.variant
      }))
    );
    return (_ctx, _cache) => {
      return openBlock21(), createElementBlock12("li", mergeProps12({
        role: "presentation",
        class: unref22(wrapperClass)
      }, _ctx.wrapperAttrs), [
        (openBlock21(), createBlock20(resolveDynamicComponent17(unref22(props).tag), mergeProps12({
          class: ["dropdown-item-text", [unref22(colorClasses), unref22(props).textClass]]
        }, attrs), {
          default: withCtx19(() => [
            renderSlot19(_ctx.$slots, "default", {}, () => [
              createTextVNode11(toDisplayString12(unref22(props).text), 1)
            ])
          ]),
          _: 3
        }, 16, ["class"]))
      ], 16);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BForm.vue_vue_type_script_setup_true_lang-B5bHc7eP.mjs
import { defineComponent as defineComponent25, useTemplateRef as useTemplateRef7, computed as computed36, openBlock as openBlock22, createElementBlock as createElementBlock13, unref as unref23, normalizeClass as normalizeClass16, renderSlot as renderSlot20 } from "vue";
var _hoisted_111 = ["id", "novalidate"];
var _sfc_main24 = defineComponent25({
  __name: "BForm",
  props: {
    floating: { type: Boolean, default: false },
    id: { default: void 0 },
    novalidate: { type: Boolean, default: false },
    validated: { type: Boolean, default: false }
  },
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, "BForm");
    const element = useTemplateRef7("_element");
    const computedClasses = computed36(() => ({
      "form-floating": props.floating,
      "was-validated": props.validated
    }));
    __expose({
      element
    });
    return (_ctx, _cache) => {
      return openBlock22(), createElementBlock13("form", {
        id: unref23(props).id,
        ref: "_element",
        novalidate: unref23(props).novalidate,
        class: normalizeClass16(computedClasses.value)
      }, [
        renderSlot20(_ctx.$slots, "default")
      ], 10, _hoisted_111);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BFormFloatingLabel.vue_vue_type_script_setup_true_lang-B3h-7S9g.mjs
import { defineComponent as defineComponent27, computed as computed38, openBlock as openBlock24, createElementBlock as createElementBlock15, unref as unref25, renderSlot as renderSlot22, Fragment as Fragment7, renderList as renderList3, createBlock as createBlock21, mergeProps as mergeProps13, withCtx as withCtx20, createTextVNode as createTextVNode12, toDisplayString as toDisplayString13, createElementVNode as createElementVNode8 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useFormSelect-CWgMwXP_.mjs
import { defineComponent as defineComponent26, openBlock as openBlock23, createElementBlock as createElementBlock14, unref as unref24, renderSlot as renderSlot21, computed as computed37, toValue as toValue12 } from "vue";
var _hoisted_112 = ["value", "disabled"];
var _sfc_main25 = defineComponent26({
  __name: "BFormSelectOption",
  props: {
    disabled: { type: Boolean, default: false },
    value: { default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BFormSelectOption");
    return (_ctx, _cache) => {
      return openBlock23(), createElementBlock14("option", {
        value: unref24(props).value,
        disabled: unref24(props).disabled
      }, [
        renderSlot21(_ctx.$slots, "default")
      ], 8, _hoisted_112);
    };
  }
});
var useFormSelect = (options, props) => {
  const isComplex = (option) => typeof option === "object" && option !== null && "label" in option;
  const normalizeOption = (option) => {
    const propsValue = toValue12(props);
    if (typeof option === "string") {
      return { value: option, text: option };
    }
    if (typeof option === "number") {
      return { value: option, text: `${option}` };
    }
    if (option instanceof Date) {
      return { value: option, text: option.toLocaleString() };
    }
    const value = get(option, propsValue.valueField);
    const text = get(option, propsValue.textField);
    const disabled = get(option, propsValue.disabledField);
    const opts = propsValue.optionsField ? get(option, propsValue.optionsField) : void 0;
    if (opts !== void 0) {
      return {
        label: get(option, propsValue.labelField) || text,
        options: opts
      };
    }
    return {
      ...typeof option === "object" ? option : {},
      value,
      text,
      disabled
    };
  };
  const normalizeOptions = (opts) => opts.map((option) => normalizeOption(option));
  const normalizedOptions = computed37(() => normalizeOptions(toValue12(options)));
  return { normalizedOptions, isComplex };
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BFormFloatingLabel.vue_vue_type_script_setup_true_lang-B3h-7S9g.mjs
var _hoisted_1$14 = ["id"];
var _sfc_main$19 = defineComponent27({
  __name: "BFormDatalist",
  props: {
    disabledField: { default: "disabled" },
    id: { default: void 0 },
    options: { default: () => [] },
    textField: { default: "text" },
    valueField: { default: "value" }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BFormDatalist");
    const computedId = useId(() => props.id, "datalist");
    const { normalizedOptions, isComplex } = useFormSelect(
      () => props.options,
      computed38(() => ({ ...props, optionsField: "options", labelField: "label" }))
    );
    const normalizedOptsWrapper = computed38(
      () => (
        // Datalist doesn't support complex options
        normalizedOptions.value.filter((opt) => !isComplex(opt))
      )
    );
    return (_ctx, _cache) => {
      return openBlock24(), createElementBlock15("datalist", { id: unref25(computedId) }, [
        renderSlot22(_ctx.$slots, "first"),
        (openBlock24(true), createElementBlock15(Fragment7, null, renderList3(normalizedOptsWrapper.value, (option, index8) => {
          return openBlock24(), createBlock21(_sfc_main25, mergeProps13({
            key: index8,
            ref_for: true
          }, option), {
            default: withCtx20(() => [
              renderSlot22(_ctx.$slots, "option", mergeProps13({ ref_for: true }, option), () => [
                createTextVNode12(toDisplayString13(option.text), 1)
              ])
            ]),
            _: 2
          }, 1040);
        }), 128)),
        renderSlot22(_ctx.$slots, "default")
      ], 8, _hoisted_1$14);
    };
  }
});
var _hoisted_113 = { class: "form-floating" };
var _hoisted_27 = ["for"];
var _sfc_main26 = defineComponent27({
  __name: "BFormFloatingLabel",
  props: {
    label: { default: void 0 },
    labelFor: { default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BFormFloatingLabel");
    return (_ctx, _cache) => {
      return openBlock24(), createElementBlock15("div", _hoisted_113, [
        renderSlot22(_ctx.$slots, "default"),
        createElementVNode8("label", {
          for: unref25(props).labelFor
        }, [
          renderSlot22(_ctx.$slots, "label", {}, () => [
            createTextVNode12(toDisplayString13(unref25(props).label), 1)
          ])
        ], 8, _hoisted_27)
      ]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BFormValidFeedback.vue_vue_type_script_setup_true_lang-B78G3IHv.mjs
import { defineComponent as defineComponent28, computed as computed39, openBlock as openBlock25, createBlock as createBlock22, resolveDynamicComponent as resolveDynamicComponent18, unref as unref26, normalizeClass as normalizeClass17, withCtx as withCtx21, renderSlot as renderSlot23, createTextVNode as createTextVNode13, toDisplayString as toDisplayString14 } from "vue";
var _sfc_main$33 = defineComponent28({
  __name: "BFormInvalidFeedback",
  props: {
    ariaLive: { default: void 0 },
    forceShow: { type: Boolean, default: false },
    id: { default: void 0 },
    role: { default: void 0 },
    state: { type: [Boolean, null], default: null },
    tag: { default: "div" },
    text: { default: void 0 },
    tooltip: { type: Boolean, default: false }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BFormInvalidFeedback");
    const computedShow = computed39(() => props.forceShow === true || props.state === false);
    const computedClasses = computed39(() => ({
      "d-block": computedShow.value,
      "invalid-feedback": !props.tooltip,
      "invalid-tooltip": props.tooltip
    }));
    return (_ctx, _cache) => {
      return openBlock25(), createBlock22(resolveDynamicComponent18(unref26(props).tag), {
        id: unref26(props).id,
        role: unref26(props).role,
        "aria-live": unref26(props).ariaLive,
        "aria-atomic": unref26(props).ariaLive ? true : void 0,
        class: normalizeClass17(computedClasses.value)
      }, {
        default: withCtx21(() => [
          renderSlot23(_ctx.$slots, "default", {}, () => [
            createTextVNode13(toDisplayString14(unref26(props).text), 1)
          ])
        ]),
        _: 3
      }, 8, ["id", "role", "aria-live", "aria-atomic", "class"]);
    };
  }
});
var _sfc_main$23 = defineComponent28({
  __name: "BFormRow",
  props: {
    tag: { default: "div" }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BFormRow");
    return (_ctx, _cache) => {
      return openBlock25(), createBlock22(resolveDynamicComponent18(unref26(props).tag), { class: "row d-flex flex-wrap" }, {
        default: withCtx21(() => [
          renderSlot23(_ctx.$slots, "default")
        ]),
        _: 3
      });
    };
  }
});
var _sfc_main$110 = defineComponent28({
  __name: "BFormText",
  props: {
    id: { default: void 0 },
    inline: { type: Boolean, default: false },
    tag: { default: "small" },
    text: { default: void 0 },
    textVariant: { default: "body-secondary" }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BFormText");
    const colorClasses = useColorVariantClasses(props);
    const computedClasses = computed39(() => [
      colorClasses.value,
      {
        "form-text": !props.inline
      }
    ]);
    return (_ctx, _cache) => {
      return openBlock25(), createBlock22(resolveDynamicComponent18(unref26(props).tag), {
        id: unref26(props).id,
        class: normalizeClass17(computedClasses.value)
      }, {
        default: withCtx21(() => [
          renderSlot23(_ctx.$slots, "default", {}, () => [
            createTextVNode13(toDisplayString14(unref26(props).text), 1)
          ])
        ]),
        _: 3
      }, 8, ["id", "class"]);
    };
  }
});
var _sfc_main27 = defineComponent28({
  __name: "BFormValidFeedback",
  props: {
    ariaLive: { default: void 0 },
    forceShow: { type: Boolean, default: false },
    id: { default: void 0 },
    role: { default: void 0 },
    state: { type: [Boolean, null], default: null },
    tag: { default: "div" },
    text: { default: void 0 },
    tooltip: { type: Boolean, default: false }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BFormInvalidFeedback");
    const computedShow = computed39(() => props.forceShow === true || props.state === true);
    const computedClasses = computed39(() => ({
      "d-block": computedShow.value,
      "valid-feedback": !props.tooltip,
      "valid-tooltip": props.tooltip
    }));
    return (_ctx, _cache) => {
      return openBlock25(), createBlock22(resolveDynamicComponent18(unref26(props).tag), {
        id: unref26(props).id,
        role: unref26(props).role,
        "aria-live": unref26(props).ariaLive,
        "aria-atomic": unref26(props).ariaLive ? true : void 0,
        class: normalizeClass17(computedClasses.value)
      }, {
        default: withCtx21(() => [
          renderSlot23(_ctx.$slots, "default", {}, () => [
            createTextVNode13(toDisplayString14(unref26(props).text), 1)
          ])
        ]),
        _: 3
      }, 8, ["id", "role", "aria-live", "aria-atomic", "class"]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BFormCheckboxGroup.vue_vue_type_script_setup_true_lang-C2eyYb7W.mjs
import { defineComponent as defineComponent29, mergeModels as mergeModels8, useAttrs as useAttrs4, useSlots as useSlots7, useModel as useModel8, inject as inject14, useTemplateRef as useTemplateRef8, computed as computed43, openBlock as openBlock26, createBlock as createBlock23, mergeProps as mergeProps14, unref as unref27, withCtx as withCtx22, withDirectives as withDirectives5, createElementVNode as createElementVNode9, vModelCheckbox, createElementBlock as createElementBlock16, normalizeClass as normalizeClass18, renderSlot as renderSlot24, createCommentVNode as createCommentVNode10, provide as provide8, toRef as toRef12, Fragment as Fragment8, renderList as renderList4, createTextVNode as createTextVNode14, toDisplayString as toDisplayString15 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useFormCheck-Bcx8Ea7M.mjs
import { computed as computed42, toValue as toValue15, readonly as readonly8, toRef as toRef11 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useAriaInvalid-BTUbGj3Y.mjs
import { computed as computed40, toValue as toValue13 } from "vue";
var useAriaInvalid = (ariaInvalid, state) => computed40(() => {
  const resolvedAriaInvalid = toValue13(ariaInvalid);
  const resolvedState = toValue13(state);
  const resolvedAriaInvalidValue = resolvedAriaInvalid === true ? "true" : typeof resolvedAriaInvalid === "string" ? resolvedAriaInvalid : resolvedState === false ? "true" : resolvedAriaInvalid === false ? "false" : void 0;
  return resolvedAriaInvalidValue;
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useStateClass-BGbSLWFN.mjs
import { computed as computed41, toValue as toValue14 } from "vue";
var useStateClass = (value) => computed41(() => {
  const resolvedValue = toValue14(value);
  return resolvedValue === true ? "is-valid" : resolvedValue === false ? "is-invalid" : null;
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useFormCheck-Bcx8Ea7M.mjs
var getClasses2 = (items) => computed42(() => {
  const resolvedItems = toValue15(items);
  return {
    "form-check": resolvedItems.plain === false && resolvedItems.button === false && resolvedItems.hasDefaultSlot,
    "form-check-reverse": resolvedItems.reverse === true,
    "form-check-inline": resolvedItems.inline === true,
    "form-switch": resolvedItems.switch === true,
    [`form-control-${resolvedItems.size}`]: resolvedItems.size !== void 0 && resolvedItems.size !== "md" && resolvedItems.button === false
  };
});
var getInputClasses = (items) => {
  const resolvedItems = readonly8(toRef11(items));
  const stateClass = useStateClass(() => resolvedItems.value.state ?? null);
  return computed42(() => [
    stateClass.value,
    {
      "form-check-input": resolvedItems.value.plain === false && resolvedItems.value.button === false,
      "btn-check": resolvedItems.value.button === true
    }
  ]);
};
var getLabelClasses = (items) => computed42(() => {
  const resolvedItems = toValue15(items);
  return {
    "form-check-label": resolvedItems.plain === false && resolvedItems.button === false,
    "btn": resolvedItems.button === true,
    [`btn-${resolvedItems.buttonVariant}`]: resolvedItems.button === true && resolvedItems.buttonVariant !== void 0 && resolvedItems.buttonVariant !== null,
    [`btn-${resolvedItems.size}`]: resolvedItems.button && resolvedItems.size && resolvedItems.size !== "md"
  };
});
var getGroupAttr = (items) => {
  const resolvedItems = readonly8(toRef11(items));
  const computedAriaInvalid = useAriaInvalid(
    () => resolvedItems.value.ariaInvalid,
    () => resolvedItems.value.state
  );
  return computed42(() => ({
    "aria-invalid": computedAriaInvalid.value,
    "aria-required": resolvedItems.value.required === true ? true : void 0
  }));
};
var getGroupClasses = (items) => computed42(() => {
  const resolvedItems = toValue15(items);
  return {
    "was-validated": resolvedItems.validated === true,
    "btn-group": resolvedItems.buttons === true && resolvedItems.stacked === false,
    "btn-group-vertical": resolvedItems.stacked === true && resolvedItems.buttons === true,
    [`btn-group-${resolvedItems.size}`]: resolvedItems.size !== void 0
  };
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BFormCheckboxGroup.vue_vue_type_script_setup_true_lang-C2eyYb7W.mjs
var _hoisted_1$15 = ["id", "disabled", "required", "name", "form", "aria-label", "aria-labelledby", "aria-required", "value", "true-value", "false-value", "indeterminate"];
var _hoisted_28 = ["for"];
var _sfc_main$111 = defineComponent29({
  ...{
    inheritAttrs: false
  },
  __name: "BFormCheckbox",
  props: mergeModels8({
    ariaLabel: { default: void 0 },
    ariaLabelledby: { default: void 0 },
    autofocus: { type: Boolean, default: false },
    button: { type: Boolean, default: false },
    buttonGroup: { type: Boolean, default: false },
    buttonVariant: { default: null },
    disabled: { type: Boolean, default: false },
    form: { default: void 0 },
    id: { default: void 0 },
    inline: { type: Boolean, default: false },
    name: { default: void 0 },
    plain: { type: Boolean, default: false },
    required: { type: Boolean, default: void 0 },
    reverse: { type: Boolean, default: false },
    size: { default: void 0 },
    state: { type: [Boolean, null], default: null },
    switch: { type: Boolean, default: false },
    uncheckedValue: { type: [Array, Set, String, Boolean, Object, Number, null], default: false },
    wrapperAttrs: { default: void 0 },
    inputClass: { default: void 0 },
    value: { type: [String, Boolean, Array, Set, Object, Number, null], default: true }
  }, {
    "modelValue": { type: [Array, Set, String, Boolean, Object, Number, null], ...{
      default: void 0
    } },
    "modelModifiers": {},
    "indeterminate": { type: Boolean, ...{
      default: false
    } },
    "indeterminateModifiers": {}
  }),
  emits: ["update:modelValue", "update:indeterminate"],
  setup(__props, { expose: __expose }) {
    const { class: wrapperClass, ...inputAttrs } = useAttrs4();
    const _props = __props;
    const props = useDefaults(_props, "BFormCheckbox");
    const slots = useSlots7();
    const modelValue = useModel8(__props, "modelValue");
    const indeterminate = useModel8(
      __props,
      "indeterminate"
    );
    const computedId = useId(() => props.id, "form-check");
    const parentData = inject14(checkboxGroupKey, null);
    const input = useTemplateRef8("_input");
    const { focused } = useFocus(input, {
      initialValue: props.autofocus
    });
    const hasDefaultSlot = computed43(() => !isEmptySlot(slots.default));
    const localValue = computed43({
      get: () => parentData ? parentData.modelValue.value : modelValue.value,
      set: (newVal) => {
        if (newVal === void 0)
          return;
        indeterminate.value = false;
        if (parentData !== null && Array.isArray(newVal)) {
          parentData.modelValue.value = newVal;
          return;
        }
        modelValue.value = newVal;
      }
    });
    const computedRequired = computed43(
      () => !!(props.name ?? (parentData == null ? void 0 : parentData.name.value)) && (props.required || (parentData == null ? void 0 : parentData.required.value))
    );
    const isButtonGroup = computed43(() => props.buttonGroup || ((parentData == null ? void 0 : parentData.buttons.value) ?? false));
    const classesObject = computed43(() => ({
      plain: props.plain || ((parentData == null ? void 0 : parentData.plain.value) ?? false),
      button: props.button || ((parentData == null ? void 0 : parentData.buttons.value) ?? false),
      inline: props.inline || ((parentData == null ? void 0 : parentData.inline.value) ?? false),
      reverse: props.reverse || ((parentData == null ? void 0 : parentData.reverse.value) ?? false),
      switch: props.switch || ((parentData == null ? void 0 : parentData.switch.value) ?? false),
      state: props.state === true || props.state === false ? props.state : (parentData == null ? void 0 : parentData.state.value) ?? null,
      size: props.size ?? (parentData == null ? void 0 : parentData.size.value) ?? "md",
      // This is where the true default is made
      buttonVariant: props.buttonVariant ?? (parentData == null ? void 0 : parentData.buttonVariant.value) ?? "secondary",
      // This is where the true default is made
      hasDefaultSlot: hasDefaultSlot.value
    }));
    const wrapperClasses = getClasses2(classesObject);
    const computedWrapperClasses = computed43(() => [wrapperClasses.value, wrapperClass]);
    const inputClasses = getInputClasses(classesObject);
    const computedInputClasses = computed43(() => [inputClasses.value, props.inputClass]);
    const labelClasses = getLabelClasses(classesObject);
    __expose({
      blur: () => {
        focused.value = false;
      },
      element: input,
      focus: () => {
        focused.value = true;
      }
    });
    return (_ctx, _cache) => {
      return openBlock26(), createBlock23(_sfc_main10, mergeProps14({ skip: isButtonGroup.value }, unref27(props).wrapperAttrs, { class: computedWrapperClasses.value }), {
        default: withCtx22(() => {
          var _a, _b, _c;
          return [
            withDirectives5(createElementVNode9("input", mergeProps14({
              id: unref27(computedId),
              ref: "_input",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => localValue.value = $event),
              class: computedInputClasses.value,
              type: "checkbox",
              disabled: unref27(props).disabled || ((_a = unref27(parentData)) == null ? void 0 : _a.disabled.value),
              required: computedRequired.value || void 0,
              name: unref27(props).name || ((_b = unref27(parentData)) == null ? void 0 : _b.name.value),
              form: unref27(props).form || ((_c = unref27(parentData)) == null ? void 0 : _c.form.value),
              "aria-label": unref27(props).ariaLabel,
              "aria-labelledby": unref27(props).ariaLabelledby,
              "aria-required": computedRequired.value || void 0,
              value: unref27(props).value,
              "true-value": unref27(props).value,
              "false-value": unref27(props).uncheckedValue,
              indeterminate: indeterminate.value || void 0
            }, inputAttrs), null, 16, _hoisted_1$15), [
              [vModelCheckbox, localValue.value]
            ]),
            hasDefaultSlot.value || unref27(props).plain === false ? (openBlock26(), createElementBlock16("label", {
              key: 0,
              for: unref27(computedId),
              class: normalizeClass18(unref27(labelClasses))
            }, [
              renderSlot24(_ctx.$slots, "default")
            ], 10, _hoisted_28)) : createCommentVNode10("", true)
          ];
        }),
        _: 3
      }, 16, ["skip", "class"]);
    };
  }
});
var _hoisted_114 = ["id"];
var _sfc_main28 = defineComponent29({
  __name: "BFormCheckboxGroup",
  props: mergeModels8({
    ariaInvalid: { type: [Boolean, String], default: void 0 },
    autofocus: { type: Boolean, default: false },
    buttonVariant: { default: "secondary" },
    buttons: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    disabledField: { default: "disabled" },
    form: { default: void 0 },
    id: { default: void 0 },
    name: { default: void 0 },
    options: { default: () => [] },
    plain: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    reverse: { type: Boolean, default: false },
    size: { default: "md" },
    stacked: { type: Boolean, default: false },
    state: { type: [Boolean, null], default: null },
    switches: { type: Boolean, default: false },
    textField: { default: "text" },
    validated: { type: Boolean, default: false },
    valueField: { default: "value" }
  }, {
    "modelValue": {
      default: () => []
    },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, "BFormCheckboxGroup");
    const modelValue = useModel8(__props, "modelValue");
    const computedId = useId(() => props.id, "checkbox");
    const computedName = useId(() => props.name, "checkbox");
    const element = useTemplateRef8("_element");
    const { focused } = useFocus(element, {
      initialValue: props.autofocus
    });
    provide8(checkboxGroupKey, {
      modelValue,
      switch: toRef12(() => props.switches),
      buttonVariant: toRef12(() => props.buttonVariant),
      form: toRef12(() => props.form),
      name: computedName,
      state: toRef12(() => props.state),
      plain: toRef12(() => props.plain),
      size: toRef12(() => props.size),
      inline: toRef12(() => !props.stacked),
      reverse: toRef12(() => props.reverse),
      required: toRef12(() => props.required),
      buttons: toRef12(() => props.buttons),
      disabled: toRef12(() => props.disabled)
    });
    const normalizeOptions = computed43(
      () => props.options.map(
        (el) => typeof el === "string" || typeof el === "number" ? {
          value: el,
          disabled: props.disabled,
          text: el.toString()
        } : {
          value: el[props.valueField],
          disabled: el[props.disabledField],
          ...el.props ? el.props : {},
          text: el[props.textField]
        }
      )
    );
    const classesObject = computed43(() => ({
      required: props.required,
      ariaInvalid: props.ariaInvalid,
      state: props.state,
      validated: props.validated,
      buttons: props.buttons,
      stacked: props.stacked,
      size: props.size
    }));
    const computedAttrs = getGroupAttr(classesObject);
    const computedClasses = getGroupClasses(classesObject);
    __expose({
      blur: () => {
        focused.value = false;
      },
      focus: () => {
        focused.value = true;
      }
    });
    return (_ctx, _cache) => {
      return openBlock26(), createElementBlock16("div", mergeProps14(unref27(computedAttrs), {
        id: unref27(computedId),
        ref: "_element",
        role: "group",
        class: [unref27(computedClasses), "bv-no-focus-ring"],
        tabindex: "-1"
      }), [
        renderSlot24(_ctx.$slots, "first"),
        (openBlock26(true), createElementBlock16(Fragment8, null, renderList4(normalizeOptions.value, (item, index8) => {
          return openBlock26(), createBlock23(_sfc_main$111, mergeProps14({
            key: index8,
            ref_for: true
          }, item), {
            default: withCtx22(() => [
              renderSlot24(_ctx.$slots, "option", mergeProps14({ ref_for: true }, item), () => [
                createTextVNode14(toDisplayString15(item.text), 1)
              ])
            ]),
            _: 2
          }, 1040);
        }), 128)),
        renderSlot24(_ctx.$slots, "default")
      ], 16, _hoisted_114);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BFormFile.vue_vue_type_script_setup_true_lang-ahAVeycB.mjs
import { defineComponent as defineComponent30, mergeModels as mergeModels9, useSlots as useSlots8, useModel as useModel9, useTemplateRef as useTemplateRef9, computed as computed44, watch as watch12, openBlock as openBlock27, createElementBlock as createElementBlock17, Fragment as Fragment9, unref as unref28, normalizeClass as normalizeClass19, renderSlot as renderSlot25, createTextVNode as createTextVNode15, toDisplayString as toDisplayString16, createCommentVNode as createCommentVNode11, createElementVNode as createElementVNode10, mergeProps as mergeProps15 } from "vue";
var _hoisted_115 = ["for"];
var _hoisted_29 = ["id", "form", "name", "multiple", "disabled", "capture", "accept", "required", "aria-label", "aria-labelledby", "aria-required", "directory", "webkitdirectory"];
var _sfc_main29 = defineComponent30({
  ...{
    inheritAttrs: false
  },
  __name: "BFormFile",
  props: mergeModels9({
    ariaLabel: { default: void 0 },
    ariaLabelledby: { default: void 0 },
    accept: { default: "" },
    autofocus: { type: Boolean, default: false },
    capture: { type: [Boolean, String], default: void 0 },
    directory: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    form: { default: void 0 },
    id: { default: void 0 },
    label: { default: "" },
    labelClass: { default: void 0 },
    multiple: { type: Boolean, default: false },
    name: { default: void 0 },
    noButton: { type: Boolean, default: false },
    noDrop: { type: Boolean, default: false },
    noTraverse: { type: Boolean, default: false },
    plain: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    size: { default: void 0 },
    state: { type: [Boolean, null], default: null }
  }, {
    "modelValue": {
      default: null
    },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const slots = useSlots8();
    const _props = __props;
    const props = useDefaults(_props, "BFormFile");
    const modelValue = useModel9(__props, "modelValue");
    const computedId = useId(() => props.id);
    const stateClass = useStateClass(() => props.state);
    const input = useTemplateRef9("_input");
    const { focused } = useFocus(input, { initialValue: props.autofocus });
    const hasLabelSlot = computed44(() => !isEmptySlot(slots["label"]));
    const computedAccept = computed44(
      () => typeof props.accept === "string" ? props.accept : props.accept.join(",")
    );
    const computedClasses = computed44(() => [
      stateClass.value,
      {
        [`form-control-${props.size}`]: props.size !== void 0,
        "form-control": !props.plain,
        "form-control-input-file-hide-button": props.noButton
      }
    ]);
    const onChange = () => {
      var _a, _b;
      const value = ((_a = input.value) == null ? void 0 : _a.files) === null || ((_b = input.value) == null ? void 0 : _b.files) === void 0 ? null : [...input.value.files];
      modelValue.value = value === null ? null : props.multiple === true ? value : value[0];
    };
    const onDrop = (e) => {
      if (props.noDrop === true) {
        e.preventDefault();
      }
    };
    const reset = () => {
      modelValue.value = null;
    };
    watch12(modelValue, (newValue) => {
      if (newValue === null && input.value !== null) {
        input.value.value = "";
      }
    });
    __expose({
      blur: () => {
        focused.value = false;
      },
      element: input,
      focus: () => {
        focused.value = true;
      },
      reset
    });
    return (_ctx, _cache) => {
      return openBlock27(), createElementBlock17(Fragment9, null, [
        hasLabelSlot.value || unref28(props).label ? (openBlock27(), createElementBlock17("label", {
          key: 0,
          class: normalizeClass19(["form-label", unref28(props).labelClass]),
          for: unref28(computedId)
        }, [
          renderSlot25(_ctx.$slots, "label", {}, () => [
            createTextVNode15(toDisplayString16(unref28(props).label), 1)
          ])
        ], 10, _hoisted_115)) : createCommentVNode11("", true),
        createElementVNode10("input", mergeProps15({ id: unref28(computedId) }, _ctx.$attrs, {
          ref: "_input",
          type: "file",
          class: computedClasses.value,
          form: unref28(props).form,
          name: unref28(props).name,
          multiple: unref28(props).multiple,
          disabled: unref28(props).disabled,
          capture: unref28(props).capture,
          accept: computedAccept.value || void 0,
          required: unref28(props).required || void 0,
          "aria-label": unref28(props).ariaLabel,
          "aria-labelledby": unref28(props).ariaLabelledby,
          "aria-required": unref28(props).required || void 0,
          directory: unref28(props).directory,
          webkitdirectory: unref28(props).directory,
          onChange,
          onDrop
        }), null, 16, _hoisted_29)
      ], 64);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BFormGroup.vue_vue_type_script_setup_true_lang-BOF_9paa.mjs
import { defineComponent as defineComponent31, useSlots as useSlots9, ref as ref11, provide as provide9, computed as computed45, useTemplateRef as useTemplateRef10, openBlock as openBlock28, createBlock as createBlock24, resolveDynamicComponent as resolveDynamicComponent19, unref as unref29, normalizeClass as normalizeClass20, withCtx as withCtx23, createVNode as createVNode8, renderSlot as renderSlot26, createTextVNode as createTextVNode16, toDisplayString as toDisplayString17, createCommentVNode as createCommentVNode12, createElementBlock as createElementBlock18, Fragment as Fragment10, normalizeProps as normalizeProps3, mergeProps as mergeProps16 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/stringUtils-BCx12BQM.mjs
var startCase = (str) => str.replace(RX_UNDERSCORE, " ").replace(RX_LOWER_UPPER, (_, $1, $2) => `${$1} ${$2}`).replace(RX_FIRST_START_SPACE_WORD, (_, $1, $2) => $1 + $2.toUpperCase());
var titleCase = (str) => str.replace(RX_UNDERSCORE, " ").replace(RX_LOWER_UPPER, (_, $1, $2) => `${$1} ${$2}`).replace(RX_START_SPACE_WORD, (_, $1, $2) => $1 + $2.toUpperCase());
var upperFirst = (str) => {
  const trim = str.trim();
  return trim.charAt(0).toUpperCase() + trim.slice(1);
};
var escapeRegExp = (str) => str.replace(RX_REGEXP_REPLACE, "\\$&");
var escapeRegExpChars = (str) => escapeRegExp(str).replace(RX_SPACES, "\\s");

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BFormGroup.vue_vue_type_script_setup_true_lang-BOF_9paa.mjs
var suffixPropName = (suffix, value) => value + (suffix ? upperFirst(suffix) : "");
var _hoisted_116 = {
  key: 0,
  ref: "_content",
  class: "form-floating"
};
var _sfc_main30 = defineComponent31({
  __name: "BFormGroup",
  props: {
    contentCols: { type: [Boolean, String, Number], default: void 0 },
    labelCols: { type: [Boolean, String, Number], default: void 0 },
    labelAlign: { default: void 0 },
    ariaInvalid: { type: [Boolean, String], default: void 0 },
    description: { default: void 0 },
    disabled: { type: Boolean, default: false },
    feedbackAriaLive: { default: "assertive" },
    floating: { type: Boolean, default: false },
    id: { default: void 0 },
    invalidFeedback: { default: void 0 },
    label: { default: void 0 },
    labelClass: { default: void 0 },
    labelFor: { default: void 0 },
    labelSize: { default: void 0 },
    labelVisuallyHidden: { type: Boolean, default: false },
    state: { type: [Boolean, null], default: null },
    tooltip: { type: Boolean, default: false },
    validFeedback: { default: void 0 },
    validated: { type: Boolean, default: false },
    contentColsSm: { type: [Boolean, String, Number], default: void 0 },
    contentColsMd: { type: [Boolean, String, Number], default: void 0 },
    contentColsLg: { type: [Boolean, String, Number], default: void 0 },
    contentColsXl: { type: [Boolean, String, Number], default: void 0 },
    labelColsSm: { type: [Boolean, String, Number], default: void 0 },
    labelColsMd: { type: [Boolean, String, Number], default: void 0 },
    labelColsLg: { type: [Boolean, String, Number], default: void 0 },
    labelColsXl: { type: [Boolean, String, Number], default: void 0 },
    labelAlignSm: { default: void 0 },
    labelAlignMd: { default: void 0 },
    labelAlignLg: { default: void 0 },
    labelAlignXl: { default: void 0 }
  },
  setup(__props) {
    const INPUTS = ["input", "select", "textarea"];
    const _props = __props;
    const props = useDefaults(_props, "BFormGroup");
    const slots = useSlots9();
    const LabelContentTemplate = createReusableTemplate();
    const ContentTemplate = createReusableTemplate();
    const childId = ref11([]);
    provide9(formGroupPluginKey, (id) => {
      childId.value = [id];
    });
    const computedLabelFor = computed45(() => {
      if (props.labelFor !== void 0)
        return props.labelFor;
      if (childId.value[0] && childId.value[0].value)
        return childId.value[0].value;
      return null;
    });
    const breakPoints = ["xs", "sm", "md", "lg", "xl"];
    const getColProps = (props2, prefix) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      breakPoints.reduce((result, breakpoint) => {
        const suffix = suffixPropName(breakpoint === "xs" ? "" : breakpoint, `${prefix}Cols`);
        let propValue = props2[suffix];
        propValue = propValue === "" ? true : propValue || false;
        if (!(typeof propValue === "boolean") && propValue !== "auto") {
          const val = Number.parseInt(propValue);
          propValue = Number.isNaN(val) ? 0 : val;
          propValue = propValue > 0 ? propValue : false;
        }
        if (propValue) {
          if (breakpoint === "xs") {
            result[typeof propValue === "boolean" ? "col" : "cols"] = propValue;
          } else {
            result[breakpoint || (typeof propValue === "boolean" ? "col" : "cols")] = propValue;
          }
        }
        return result;
      }, {})
    );
    const content = useTemplateRef10("_content");
    const contentColProps = computed45(() => getColProps(props, "content"));
    const labelAlignClasses = computed45(
      () => ((props2, prefix) => breakPoints.reduce((result, breakpoint) => {
        const suffix = suffixPropName(
          breakpoint === "xs" ? "" : breakpoint,
          `${prefix}Align`
        );
        const propValue = props2[suffix] || null;
        if (propValue) {
          if (breakpoint === "xs") {
            result.push(`text-${propValue}`);
          } else {
            result.push(`text-${breakpoint}-${propValue}`);
          }
        }
        return result;
      }, []))(props, "label")
    );
    const labelColProps = computed45(() => getColProps(props, "label"));
    const isHorizontal = computed45(
      () => Object.keys(contentColProps.value).length > 0 || Object.keys(labelColProps.value).length > 0
    );
    const stateClass = useStateClass(() => props.state);
    const computedAriaInvalid = useAriaInvalid(
      () => props.ariaInvalid,
      () => props.state
    );
    const onLegendClick = (event) => {
      if (computedLabelFor.value || content.value === null)
        return;
      const { target } = event;
      const tagName = target ? target.tagName : "";
      if ([...INPUTS, "a", "button", "label"].indexOf(tagName) !== -1)
        return;
      const inputs = [
        ...content.value.querySelectorAll(INPUTS.map((v) => `${v}:not([disabled])`).join())
      ].filter(isVisible);
      const [inp] = inputs;
      if (inputs.length === 1 && inp instanceof HTMLElement) {
        attemptFocus(inp);
      }
    };
    const computedId = useId(() => props.id);
    const labelId = useId(void 0, "_BV_label_");
    const labelTag = computed45(() => !computedLabelFor.value ? "legend" : "label");
    const labelClasses = computed45(() => [
      isHorizontal.value ? "col-form-label" : "form-label",
      {
        "bv-no-focus-ring": !computedLabelFor.value,
        "col-form-label": isHorizontal.value || !computedLabelFor.value,
        "pt-0": !isHorizontal.value && !computedLabelFor.value,
        "d-block": !isHorizontal.value && computedLabelFor.value,
        [`col-form-label-${props.labelSize}`]: !!props.labelSize,
        "visually-hidden": props.labelVisuallyHidden
      },
      labelAlignClasses.value,
      props.labelClass
    ]);
    const invalidFeedbackId = useId(void 0, "_BV_feedback_invalid_");
    const validFeedbackId = useId(void 0, "_BV_feedback_valid_");
    const descriptionId = useId(void 0, "_BV_description_");
    const isFieldset = computed45(() => !computedLabelFor.value);
    return (_ctx, _cache) => {
      return openBlock28(), createBlock24(resolveDynamicComponent19(isFieldset.value ? "fieldset" : "div"), {
        id: unref29(computedId),
        disabled: isFieldset.value ? unref29(props).disabled : null,
        role: isFieldset.value ? null : "group",
        "aria-invalid": unref29(computedAriaInvalid),
        "aria-labelledby": isFieldset.value && isHorizontal.value ? unref29(labelId) : null,
        class: normalizeClass20([[unref29(stateClass), { "was-validated": unref29(props).validated }], "b-form-group"])
      }, {
        default: withCtx23(() => [
          createVNode8(unref29(ContentTemplate).define, null, {
            default: withCtx23(() => [
              slots["invalid-feedback"] || unref29(props).invalidFeedback ? (openBlock28(), createBlock24(_sfc_main$33, {
                key: 0,
                id: unref29(invalidFeedbackId),
                "aria-live": unref29(props).feedbackAriaLive,
                state: unref29(props).state,
                tooltip: unref29(props).tooltip
              }, {
                default: withCtx23(() => [
                  renderSlot26(_ctx.$slots, "invalid-feedback", {}, () => [
                    createTextVNode16(toDisplayString17(unref29(props).invalidFeedback), 1)
                  ])
                ]),
                _: 3
              }, 8, ["id", "aria-live", "state", "tooltip"])) : createCommentVNode12("", true),
              slots["valid-feedback"] || unref29(props).validFeedback ? (openBlock28(), createBlock24(_sfc_main27, {
                key: 1,
                id: unref29(validFeedbackId),
                "aria-live": unref29(props).feedbackAriaLive,
                state: unref29(props).state,
                tooltip: unref29(props).tooltip
              }, {
                default: withCtx23(() => [
                  renderSlot26(_ctx.$slots, "valid-feedback", {}, () => [
                    createTextVNode16(toDisplayString17(unref29(props).validFeedback), 1)
                  ])
                ]),
                _: 3
              }, 8, ["id", "aria-live", "state", "tooltip"])) : createCommentVNode12("", true),
              slots.description || unref29(props).description ? (openBlock28(), createBlock24(_sfc_main$110, {
                key: 2,
                id: unref29(descriptionId)
              }, {
                default: withCtx23(() => [
                  renderSlot26(_ctx.$slots, "description", {}, () => [
                    createTextVNode16(toDisplayString17(unref29(props).description), 1)
                  ])
                ]),
                _: 3
              }, 8, ["id"])) : createCommentVNode12("", true)
            ]),
            _: 3
          }),
          createVNode8(unref29(LabelContentTemplate).define, null, {
            default: withCtx23(() => [
              slots.label || unref29(props).label || isHorizontal.value ? (openBlock28(), createElementBlock18(Fragment10, { key: 0 }, [
                isHorizontal.value ? (openBlock28(), createBlock24(_sfc_main19, normalizeProps3(mergeProps16({ key: 0 }, labelColProps.value)), {
                  default: withCtx23(() => [
                    (openBlock28(), createBlock24(resolveDynamicComponent19(labelTag.value), {
                      id: unref29(labelId),
                      for: computedLabelFor.value || null,
                      tabindex: isFieldset.value ? "-1" : null,
                      class: normalizeClass20(labelClasses.value),
                      onClick: _cache[0] || (_cache[0] = ($event) => isFieldset.value ? onLegendClick : null)
                    }, {
                      default: withCtx23(() => [
                        renderSlot26(_ctx.$slots, "label", {}, () => [
                          createTextVNode16(toDisplayString17(unref29(props).label), 1)
                        ])
                      ]),
                      _: 3
                    }, 8, ["id", "for", "tabindex", "class"]))
                  ]),
                  _: 3
                }, 16)) : (openBlock28(), createBlock24(resolveDynamicComponent19(labelTag.value), {
                  key: 1,
                  id: unref29(labelId),
                  for: computedLabelFor.value || null,
                  tabindex: isFieldset.value ? "-1" : null,
                  class: normalizeClass20(labelClasses.value),
                  onClick: _cache[1] || (_cache[1] = ($event) => isFieldset.value ? onLegendClick : null)
                }, {
                  default: withCtx23(() => [
                    renderSlot26(_ctx.$slots, "label", {}, () => [
                      createTextVNode16(toDisplayString17(unref29(props).label), 1)
                    ])
                  ]),
                  _: 3
                }, 8, ["id", "for", "tabindex", "class"]))
              ], 64)) : createCommentVNode12("", true)
            ]),
            _: 3
          }),
          isHorizontal.value ? (openBlock28(), createBlock24(_sfc_main$23, { key: 0 }, {
            default: withCtx23(() => [
              createVNode8(unref29(LabelContentTemplate).reuse),
              createVNode8(_sfc_main19, mergeProps16(contentColProps.value, { ref: "_content" }), {
                default: withCtx23(() => [
                  renderSlot26(_ctx.$slots, "default", {
                    id: unref29(computedId),
                    ariaDescribedby: null,
                    descriptionId: unref29(descriptionId),
                    labelId: unref29(labelId)
                  }),
                  createVNode8(unref29(ContentTemplate).reuse)
                ]),
                _: 3
              }, 16)
            ]),
            _: 3
          })) : (openBlock28(), createElementBlock18(Fragment10, { key: 1 }, [
            createVNode8(unref29(LabelContentTemplate).reuse),
            !isHorizontal.value && unref29(props).floating ? (openBlock28(), createElementBlock18("div", _hoisted_116, [
              renderSlot26(_ctx.$slots, "default", {
                id: unref29(computedId),
                ariaDescribedby: null,
                descriptionId: unref29(descriptionId),
                labelId: unref29(labelId)
              }),
              createVNode8(unref29(ContentTemplate).reuse)
            ], 512)) : (openBlock28(), createElementBlock18(Fragment10, { key: 1 }, [
              renderSlot26(_ctx.$slots, "default", {
                id: unref29(computedId),
                ariaDescribedby: null,
                descriptionId: unref29(descriptionId),
                labelId: unref29(labelId)
              }),
              createVNode8(unref29(ContentTemplate).reuse)
            ], 64))
          ], 64))
        ]),
        _: 3
      }, 8, ["id", "disabled", "role", "aria-invalid", "aria-labelledby", "class"]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BFormInput.vue_vue_type_script_setup_true_lang-D77ghldn.mjs
import { defineComponent as defineComponent32, mergeModels as mergeModels10, useModel as useModel10, useTemplateRef as useTemplateRef11, computed as computed46, openBlock as openBlock29, createElementBlock as createElementBlock19, unref as unref30, normalizeClass as normalizeClass21 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useFormInput-gFQXYZ08.mjs
import { ref as ref12, inject as inject15, onMounted as onMounted8, onActivated, nextTick as nextTick8 } from "vue";
var normalizeInput = (v, modelModifiers) => {
  if (v === null)
    return;
  let update = v;
  if (modelModifiers.number && typeof update === "string" && update !== "") {
    const parsed = Number.parseFloat(update);
    update = Number.isNaN(parsed) ? update : parsed;
  }
  return update;
};
var useFormInput = (props, input, modelValue, modelModifiers) => {
  var _a;
  const forceUpdateKey = ref12(0);
  const computedId = useId(() => props.id, "input");
  const debounceNumber = useToNumber(() => props.debounce ?? 0);
  const debounceMaxWaitNumber = useToNumber(() => props.debounceMaxWait ?? NaN);
  (_a = inject15(formGroupPluginKey, null)) == null ? void 0 : _a(computedId);
  const internalUpdateModelValue = useDebounceFn(
    (value) => {
      modelValue.value = value;
    },
    () => modelModifiers.lazy === true ? 0 : debounceNumber.value,
    { maxWait: () => modelModifiers.lazy === true ? NaN : debounceMaxWaitNumber.value }
  );
  const updateModelValue = (value, force = false) => {
    if (modelModifiers.lazy === true && force === false)
      return;
    internalUpdateModelValue(value);
  };
  const { focused } = useFocus(input, {
    initialValue: props.autofocus
  });
  const _formatValue = (value, evt, force = false) => {
    if (props.formatter !== void 0 && (!props.lazyFormatter || force)) {
      return props.formatter(value, evt);
    }
    return value;
  };
  onMounted8(() => {
    var _a2;
    if (input.value) {
      input.value.value = ((_a2 = modelValue.value) == null ? void 0 : _a2.toString()) ?? "";
    }
  });
  onActivated(() => {
    nextTick8(() => {
      if (props.autofocus) {
        focused.value = true;
      }
    });
  });
  const computedAriaInvalid = useAriaInvalid(
    () => props.ariaInvalid,
    () => props.state
  );
  const onInput = (evt) => {
    const { value } = evt.target;
    const formattedValue = _formatValue(value, evt);
    if (evt.defaultPrevented) {
      evt.preventDefault();
      return;
    }
    const nextModel = formattedValue;
    updateModelValue(nextModel);
  };
  const onChange = (evt) => {
    const { value } = evt.target;
    const formattedValue = _formatValue(value, evt);
    if (evt.defaultPrevented) {
      evt.preventDefault();
      return;
    }
    const nextModel = formattedValue;
    if (modelValue.value !== nextModel) {
      updateModelValue(formattedValue, true);
    }
  };
  const onBlur = (evt) => {
    if (!modelModifiers.lazy && !props.lazyFormatter && !modelModifiers.trim)
      return;
    const { value } = evt.target;
    const formattedValue = _formatValue(value, evt, true);
    const nextModel = modelModifiers.trim ? formattedValue.trim() : formattedValue;
    const needsForceUpdate = nextModel.length !== formattedValue.length;
    if (modelValue.value !== nextModel) {
      updateModelValue(formattedValue, true);
    }
    if (modelModifiers.trim && needsForceUpdate) {
      forceUpdateKey.value = forceUpdateKey.value + 1;
    }
  };
  const focus = () => {
    if (!props.disabled) {
      focused.value = true;
    }
  };
  const blur = () => {
    if (!props.disabled) {
      focused.value = false;
    }
  };
  return {
    input,
    computedId,
    computedAriaInvalid,
    onInput,
    onChange,
    onBlur,
    focus,
    blur,
    forceUpdateKey
  };
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BFormInput.vue_vue_type_script_setup_true_lang-D77ghldn.mjs
var _hoisted_117 = ["id", "value", "name", "form", "type", "disabled", "placeholder", "required", "autocomplete", "readonly", "min", "max", "step", "list", "aria-required", "aria-invalid"];
var _sfc_main31 = defineComponent32({
  __name: "BFormInput",
  props: mergeModels10({
    max: { default: void 0 },
    min: { default: void 0 },
    step: { default: void 0 },
    type: { default: "text" },
    ariaInvalid: { type: [Boolean, String], default: void 0 },
    autocomplete: { default: void 0 },
    autofocus: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    form: { default: void 0 },
    formatter: { type: Function, default: void 0 },
    id: { default: void 0 },
    lazyFormatter: { type: Boolean, default: false },
    list: { default: void 0 },
    name: { default: void 0 },
    placeholder: { default: void 0 },
    plaintext: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    size: { default: void 0 },
    state: { type: [Boolean, null], default: null },
    debounce: { default: 0 },
    debounceMaxWait: { default: NaN }
  }, {
    "modelValue": {
      default: ""
    },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, "BFormInput");
    const [modelValue, modelModifiers] = useModel10(__props, "modelValue", {
      set: (v) => normalizeInput(v, modelModifiers)
    });
    const input = useTemplateRef11("_input");
    const { computedId, computedAriaInvalid, onInput, onChange, onBlur, focus, blur, forceUpdateKey } = useFormInput(props, input, modelValue, modelModifiers);
    const stateClass = useStateClass(() => props.state);
    const computedClasses = computed46(() => {
      const isRange = props.type === "range";
      const isColor = props.type === "color";
      return [
        stateClass.value,
        {
          "form-range": isRange,
          "form-control": isColor || !props.plaintext && !isRange,
          "form-control-color": isColor,
          "form-control-plaintext": props.plaintext && !isRange && !isColor,
          [`form-control-${props.size}`]: !!props.size
        }
      ];
    });
    __expose({
      blur,
      element: input,
      focus
    });
    return (_ctx, _cache) => {
      return openBlock29(), createElementBlock19("input", {
        id: unref30(computedId),
        ref: "_input",
        key: unref30(forceUpdateKey),
        value: unref30(modelValue),
        class: normalizeClass21(computedClasses.value),
        name: unref30(props).name || void 0,
        form: unref30(props).form || void 0,
        type: unref30(props).type,
        disabled: unref30(props).disabled,
        placeholder: unref30(props).placeholder,
        required: unref30(props).required || void 0,
        autocomplete: unref30(props).autocomplete || void 0,
        readonly: unref30(props).readonly || unref30(props).plaintext,
        min: unref30(props).min,
        max: unref30(props).max,
        step: unref30(props).step,
        list: unref30(props).type !== "password" ? unref30(props).list : void 0,
        "aria-required": unref30(props).required || void 0,
        "aria-invalid": unref30(computedAriaInvalid),
        onInput: _cache[0] || (_cache[0] = //@ts-ignore
        (...args) => unref30(onInput) && unref30(onInput)(...args)),
        onChange: _cache[1] || (_cache[1] = //@ts-ignore
        (...args) => unref30(onChange) && unref30(onChange)(...args)),
        onBlur: _cache[2] || (_cache[2] = //@ts-ignore
        (...args) => unref30(onBlur) && unref30(onBlur)(...args))
      }, null, 42, _hoisted_117);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BFormRadioGroup.vue_vue_type_script_setup_true_lang-jWrWxJil.mjs
import { defineComponent as defineComponent33, mergeModels as mergeModels11, useSlots as useSlots10, useModel as useModel11, inject as inject16, useTemplateRef as useTemplateRef12, computed as computed47, openBlock as openBlock30, createBlock as createBlock25, normalizeClass as normalizeClass22, unref as unref31, withCtx as withCtx24, withDirectives as withDirectives6, createElementVNode as createElementVNode11, mergeProps as mergeProps17, vModelRadio, createElementBlock as createElementBlock20, renderSlot as renderSlot27, createCommentVNode as createCommentVNode13, provide as provide10, toRef as toRef13, Fragment as Fragment11, renderList as renderList5, createTextVNode as createTextVNode17, toDisplayString as toDisplayString18 } from "vue";
var _hoisted_1$16 = ["id", "disabled", "required", "name", "form", "aria-label", "aria-labelledby", "value", "aria-required"];
var _hoisted_210 = ["for"];
var _sfc_main$112 = defineComponent33({
  ...{
    inheritAttrs: false
  },
  __name: "BFormRadio",
  props: mergeModels11({
    ariaLabel: { default: void 0 },
    ariaLabelledby: { default: void 0 },
    autofocus: { type: Boolean, default: false },
    button: { type: Boolean, default: false },
    buttonGroup: { type: Boolean, default: false },
    buttonVariant: { default: null },
    disabled: { type: Boolean, default: false },
    form: { default: void 0 },
    id: { default: void 0 },
    inline: { type: Boolean, default: false },
    name: { default: void 0 },
    plain: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    reverse: { type: Boolean, default: false },
    size: { default: void 0 },
    state: { type: [Boolean, null], default: null },
    value: { type: [Boolean, String, Array, Object, Number, null], default: true }
  }, {
    "modelValue": { type: [Boolean, String, Array, Object, Number, null], ...{
      default: void 0
    } },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, "BFormRadio");
    const slots = useSlots10();
    const modelValue = useModel11(__props, "modelValue");
    const computedId = useId(() => props.id, "form-check");
    const parentData = inject16(radioGroupKey, null);
    const input = useTemplateRef12("_input");
    const { focused } = useFocus(input, {
      initialValue: props.autofocus
    });
    const hasDefaultSlot = computed47(() => !isEmptySlot(slots.default));
    const localValue = computed47({
      get: () => parentData ? parentData.modelValue.value : modelValue.value,
      set: (newValue) => {
        if (newValue === void 0)
          return;
        if (parentData !== null) {
          parentData.modelValue.value = newValue;
          return;
        }
        modelValue.value = newValue;
      }
    });
    const computedRequired = computed47(
      () => !!(props.name ?? (parentData == null ? void 0 : parentData.name.value)) && (props.required || (parentData == null ? void 0 : parentData.required.value))
    );
    const isButtonGroup = computed47(() => props.buttonGroup || ((parentData == null ? void 0 : parentData.buttons.value) ?? false));
    const classesObject = computed47(() => ({
      plain: props.plain || ((parentData == null ? void 0 : parentData.plain.value) ?? false),
      button: props.button || ((parentData == null ? void 0 : parentData.buttons.value) ?? false),
      inline: props.inline || ((parentData == null ? void 0 : parentData.inline.value) ?? false),
      state: props.state || (parentData == null ? void 0 : parentData.state.value),
      reverse: props.reverse || ((parentData == null ? void 0 : parentData.reverse.value) ?? false),
      size: props.size ?? (parentData == null ? void 0 : parentData.size.value) ?? "md",
      // This is where the true default is made
      buttonVariant: props.buttonVariant ?? (parentData == null ? void 0 : parentData.buttonVariant.value) ?? "secondary",
      // This is where the true default is made
      hasDefaultSlot: hasDefaultSlot.value
    }));
    const computedClasses = getClasses2(classesObject);
    const inputClasses = getInputClasses(classesObject);
    const labelClasses = getLabelClasses(classesObject);
    __expose({
      blur: () => {
        focused.value = false;
      },
      element: input,
      focus: () => {
        focused.value = true;
      }
    });
    return (_ctx, _cache) => {
      return openBlock30(), createBlock25(_sfc_main10, {
        skip: isButtonGroup.value,
        class: normalizeClass22(unref31(computedClasses))
      }, {
        default: withCtx24(() => {
          var _a, _b, _c;
          return [
            withDirectives6(createElementVNode11("input", mergeProps17({ id: unref31(computedId) }, _ctx.$attrs, {
              ref: "_input",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => localValue.value = $event),
              class: unref31(inputClasses),
              type: "radio",
              disabled: unref31(props).disabled || ((_a = unref31(parentData)) == null ? void 0 : _a.disabled.value),
              required: computedRequired.value || void 0,
              name: unref31(props).name || ((_b = unref31(parentData)) == null ? void 0 : _b.name.value),
              form: unref31(props).form || ((_c = unref31(parentData)) == null ? void 0 : _c.form.value),
              "aria-label": unref31(props).ariaLabel,
              "aria-labelledby": unref31(props).ariaLabelledby,
              value: unref31(props).value,
              "aria-required": computedRequired.value || void 0
            }), null, 16, _hoisted_1$16), [
              [vModelRadio, localValue.value]
            ]),
            hasDefaultSlot.value || unref31(props).plain === false ? (openBlock30(), createElementBlock20("label", {
              key: 0,
              for: unref31(computedId),
              class: normalizeClass22(unref31(labelClasses))
            }, [
              renderSlot27(_ctx.$slots, "default")
            ], 10, _hoisted_210)) : createCommentVNode13("", true)
          ];
        }),
        _: 3
      }, 8, ["skip", "class"]);
    };
  }
});
var _hoisted_118 = ["id"];
var _sfc_main32 = defineComponent33({
  __name: "BFormRadioGroup",
  props: mergeModels11({
    ariaInvalid: { type: [Boolean, String], default: void 0 },
    autofocus: { type: Boolean, default: false },
    buttonVariant: { default: "secondary" },
    buttons: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    disabledField: { default: "disabled" },
    form: { default: void 0 },
    id: { default: void 0 },
    name: { default: void 0 },
    options: { default: () => [] },
    plain: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    reverse: { type: Boolean, default: false },
    size: { default: "md" },
    stacked: { type: Boolean, default: false },
    state: { type: [Boolean, null], default: null },
    textField: { default: "text" },
    validated: { type: Boolean, default: false },
    valueField: { default: "value" }
  }, {
    "modelValue": {
      default: null
    },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, "BFormRadioGroup");
    const modelValue = useModel11(__props, "modelValue");
    const computedId = useId(() => props.id, "radio");
    const computedName = useId(() => props.name, "checkbox");
    const element = useTemplateRef12("_element");
    const { focused } = useFocus(element, {
      initialValue: props.autofocus
    });
    provide10(radioGroupKey, {
      modelValue,
      buttonVariant: toRef13(() => props.buttonVariant),
      form: toRef13(() => props.form),
      name: computedName,
      buttons: toRef13(() => props.buttons),
      state: toRef13(() => props.state),
      plain: toRef13(() => props.plain),
      size: toRef13(() => props.size),
      inline: toRef13(() => !props.stacked),
      reverse: toRef13(() => props.reverse),
      required: toRef13(() => props.required),
      disabled: toRef13(() => props.disabled)
    });
    const normalizeOptions = computed47(
      () => props.options.map(
        (el) => typeof el === "string" || typeof el === "number" ? {
          value: el,
          disabled: props.disabled,
          text: el.toString()
        } : {
          value: el[props.valueField],
          disabled: el[props.disabledField],
          ...el.props ? el.props : {},
          text: el[props.textField]
        }
      )
    );
    const classesObject = computed47(() => ({
      required: props.required,
      ariaInvalid: props.ariaInvalid,
      state: props.state,
      validated: props.validated,
      buttons: props.buttons,
      stacked: props.stacked,
      size: props.size
    }));
    const computedAttrs = getGroupAttr(classesObject);
    const computedClasses = getGroupClasses(classesObject);
    __expose({
      blur: () => {
        focused.value = false;
      },
      focus: () => {
        focused.value = true;
      }
    });
    return (_ctx, _cache) => {
      return openBlock30(), createElementBlock20("div", mergeProps17(unref31(computedAttrs), {
        id: unref31(computedId),
        ref: "_element",
        role: "radiogroup",
        class: [unref31(computedClasses), "bv-no-focus-ring"],
        tabindex: "-1"
      }), [
        renderSlot27(_ctx.$slots, "first"),
        (openBlock30(true), createElementBlock20(Fragment11, null, renderList5(normalizeOptions.value, (item, index8) => {
          return openBlock30(), createBlock25(_sfc_main$112, mergeProps17({
            key: index8,
            ref_for: true
          }, item), {
            default: withCtx24(() => [
              renderSlot27(_ctx.$slots, "option", mergeProps17({ ref_for: true }, item), () => [
                createTextVNode17(toDisplayString18(item.text), 1)
              ])
            ]),
            _: 2
          }, 1040);
        }), 128)),
        renderSlot27(_ctx.$slots, "default")
      ], 16, _hoisted_118);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BFormSelect.vue_vue_type_script_setup_true_lang-BudRyG3L.mjs
import { defineComponent as defineComponent34, computed as computed48, openBlock as openBlock31, createElementBlock as createElementBlock21, unref as unref32, renderSlot as renderSlot28, Fragment as Fragment12, renderList as renderList6, createBlock as createBlock26, mergeProps as mergeProps18, withCtx as withCtx25, createTextVNode as createTextVNode18, toDisplayString as toDisplayString19, mergeModels as mergeModels12, useModel as useModel12, useTemplateRef as useTemplateRef13, withDirectives as withDirectives7, normalizeClass as normalizeClass23, vModelSelect } from "vue";
var _hoisted_1$17 = ["label"];
var _sfc_main$113 = defineComponent34({
  __name: "BFormSelectOptionGroup",
  props: {
    disabledField: { default: "disabled" },
    label: { default: void 0 },
    options: { default: () => [] },
    textField: { default: "text" },
    valueField: { default: "value" }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BFormSelectOptionGroup");
    const { normalizedOptions } = useFormSelect(() => props.options, props);
    const normalizedOptsWrapper = computed48(() => normalizedOptions.value);
    return (_ctx, _cache) => {
      return openBlock31(), createElementBlock21("optgroup", {
        label: unref32(props).label
      }, [
        renderSlot28(_ctx.$slots, "first"),
        (openBlock31(true), createElementBlock21(Fragment12, null, renderList6(normalizedOptsWrapper.value, (option, index8) => {
          return openBlock31(), createBlock26(_sfc_main25, mergeProps18({
            key: index8,
            disabled: option.disabled,
            value: option.value,
            ref_for: true
          }, _ctx.$attrs), {
            default: withCtx25(() => [
              renderSlot28(_ctx.$slots, "option", mergeProps18({ ref_for: true }, option), () => [
                createTextVNode18(toDisplayString19(option.text), 1)
              ])
            ]),
            _: 2
          }, 1040, ["disabled", "value"]);
        }), 128)),
        renderSlot28(_ctx.$slots, "default")
      ], 8, _hoisted_1$17);
    };
  }
});
var _hoisted_119 = ["id", "name", "form", "multiple", "size", "disabled", "required", "aria-required", "aria-invalid"];
var _sfc_main33 = defineComponent34({
  __name: "BFormSelect",
  props: mergeModels12({
    ariaInvalid: { type: [Boolean, String], default: void 0 },
    autofocus: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    disabledField: { default: "disabled" },
    form: { default: void 0 },
    id: { default: void 0 },
    labelField: { default: "label" },
    multiple: { type: Boolean, default: false },
    name: { default: void 0 },
    options: { default: () => [] },
    optionsField: { default: "options" },
    plain: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    selectSize: { default: 0 },
    size: { default: "md" },
    state: { type: [Boolean, null], default: null },
    textField: { default: "text" },
    valueField: { default: "value" }
  }, {
    "modelValue": {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      default: ""
    },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, "BFormSelect");
    const modelValue = useModel12(__props, "modelValue");
    const computedId = useId(() => props.id, "input");
    const selectSizeNumber = useToNumber(() => props.selectSize);
    const stateClass = useStateClass(() => props.state);
    const input = useTemplateRef13("_input");
    const { focused } = useFocus(input, {
      initialValue: props.autofocus
    });
    const computedClasses = computed48(() => [
      stateClass.value,
      {
        "form-control": props.plain,
        [`form-control-${props.size}`]: props.size !== "md" && props.plain,
        "form-select": !props.plain,
        [`form-select-${props.size}`]: props.size !== "md" && !props.plain
      }
    ]);
    const computedSelectSize = computed48(
      () => selectSizeNumber.value || props.plain ? selectSizeNumber.value : void 0
    );
    const computedAriaInvalid = useAriaInvalid(
      () => props.ariaInvalid,
      () => props.state
    );
    const { normalizedOptions, isComplex } = useFormSelect(() => props.options, props);
    const normalizedOptsWrapper = computed48(
      () => normalizedOptions.value
    );
    const localValue = computed48({
      get: () => modelValue.value,
      set: (newValue) => {
        modelValue.value = newValue;
      }
    });
    __expose({
      blur: () => {
        focused.value = false;
      },
      element: input,
      focus: () => {
        focused.value = true;
      }
    });
    return (_ctx, _cache) => {
      return withDirectives7((openBlock31(), createElementBlock21("select", {
        id: unref32(computedId),
        ref: "_input",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => localValue.value = $event),
        class: normalizeClass23(computedClasses.value),
        name: unref32(props).name,
        form: unref32(props).form || void 0,
        multiple: unref32(props).multiple || void 0,
        size: computedSelectSize.value,
        disabled: unref32(props).disabled,
        required: unref32(props).required || void 0,
        "aria-required": unref32(props).required || void 0,
        "aria-invalid": unref32(computedAriaInvalid)
      }, [
        renderSlot28(_ctx.$slots, "first"),
        (openBlock31(true), createElementBlock21(Fragment12, null, renderList6(normalizedOptsWrapper.value, (option, index8) => {
          return openBlock31(), createElementBlock21(Fragment12, { key: index8 }, [
            unref32(isComplex)(option) ? (openBlock31(), createBlock26(_sfc_main$113, {
              key: 0,
              label: option.label,
              options: option.options,
              "value-field": unref32(props).valueField,
              "text-field": unref32(props).textField,
              "disabled-field": unref32(props).disabledField
            }, null, 8, ["label", "options", "value-field", "text-field", "disabled-field"])) : (openBlock31(), createBlock26(_sfc_main25, {
              key: 1,
              value: option.value,
              disabled: option.disabled
            }, {
              default: withCtx25(() => [
                renderSlot28(_ctx.$slots, "option", mergeProps18({ ref_for: true }, option), () => [
                  createTextVNode18(toDisplayString19(option.text), 1)
                ])
              ]),
              _: 2
            }, 1032, ["value", "disabled"]))
          ], 64);
        }), 128)),
        renderSlot28(_ctx.$slots, "default")
      ], 10, _hoisted_119)), [
        [vModelSelect, localValue.value]
      ]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BFormSpinbutton.vue_vue_type_script_setup_true_lang-Dgg3hDA4.mjs
import { inject as inject17, onMounted as onMounted9, watch as watch13, defineComponent as defineComponent35, mergeModels as mergeModels13, useModel as useModel13, useTemplateRef as useTemplateRef14, computed as computed49, openBlock as openBlock32, createElementBlock as createElementBlock22, normalizeClass as normalizeClass24, unref as unref33, renderSlot as renderSlot29, createElementVNode as createElementVNode12, mergeProps as mergeProps19, normalizeProps as normalizeProps4, guardReactiveProps as guardReactiveProps2, createCommentVNode as createCommentVNode14, toDisplayString as toDisplayString20 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/event-a_bi5ysw.mjs
var IS_BROWSER = typeof window !== "undefined" && typeof document !== "undefined" && typeof navigator !== "undefined";
var parseEventOptions = (options) => {
  const HAS_PASSIVE_EVENT_SUPPORT = (() => {
    let passiveEventSupported = false;
    if (IS_BROWSER) {
      try {
        const options2 = {
          // This function will be called when the browser
          // attempts to access the passive property
          get passive() {
            passiveEventSupported = true;
            return;
          }
        };
        WINDOW.addEventListener("test", options2, options2);
        WINDOW.removeEventListener("test", options2, options2);
      } catch {
        passiveEventSupported = false;
      }
    }
    return passiveEventSupported;
  })();
  if (HAS_PASSIVE_EVENT_SUPPORT) {
    return typeof options === "object" ? options : { capture: !!options || false };
  }
  return typeof options === "object" ? options.capture : options;
};
var eventOn = (el, eventName, handler, options) => {
  if (el && el.addEventListener) {
    el.addEventListener(eventName, handler, parseEventOptions(options));
  }
};
var eventOff = (el, eventName, handler, options) => {
  if (el && el.removeEventListener) {
    el.removeEventListener(eventName, handler, options);
  }
};
var eventOnOff = (on, eventParams) => {
  const method = on ? eventOn : eventOff;
  method(...eventParams);
};
var stopEvent = (event, { preventDefault: preventDefault2 = true, propagation = false, immediatePropagation = false } = {}) => {
  if (preventDefault2) {
    event.preventDefault();
  }
  if (propagation) {
    event.stopPropagation();
  }
  if (immediatePropagation) {
    event.stopImmediatePropagation();
  }
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BFormSpinbutton.vue_vue_type_script_setup_true_lang-Dgg3hDA4.mjs
var useRtl = () => {
  const rtlPlugin2 = inject17(rtlPluginKey);
  onMounted9(() => {
    watch13(
      () => rtlPlugin2 == null ? void 0 : rtlPlugin2.locale.value,
      (newValue) => {
        const html = document.documentElement;
        html.setAttribute("lang", newValue ?? "");
      },
      { immediate: true }
    );
    watch13(
      () => rtlPlugin2 == null ? void 0 : rtlPlugin2.isRtl.value,
      (newValue) => {
        const html = document.documentElement;
        html.setAttribute("dir", newValue ?? false ? "rtl" : "ltr");
      },
      { immediate: true }
    );
  });
  return { ...rtlPlugin2 };
};
var _hoisted_120 = ["lang", "tabindex", "title"];
var _hoisted_211 = ["name", "form", "value"];
var _hoisted_33 = ["id", "dir", "tabindex", "aria-label", "aria-invalid", "aria-required", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext"];
var defaultValues = {
  min: 1,
  max: 100,
  step: 1,
  repeatDelay: 500,
  repeatInterval: 100,
  repeatThreshold: 10,
  repeatMultiplier: 4
};
var _sfc_main34 = defineComponent35({
  __name: "BFormSpinbutton",
  props: mergeModels13({
    ariaControls: { default: void 0 },
    ariaLabel: { default: void 0 },
    disabled: { type: Boolean, default: false },
    form: { default: void 0 },
    formatterFn: { type: Function, default: void 0 },
    id: { default: void 0 },
    inline: { type: Boolean, default: false },
    labelDecrement: { default: "Decrement" },
    labelIncrement: { default: "Increment" },
    locale: { default: void 0 },
    max: { default: defaultValues.max },
    min: { default: defaultValues.min },
    name: { default: void 0 },
    placeholder: { default: void 0 },
    readonly: { type: Boolean, default: false },
    repeatDelay: { default: defaultValues.repeatDelay },
    repeatInterval: { default: defaultValues.repeatInterval },
    repeatStepMultiplier: { default: defaultValues.repeatMultiplier },
    repeatThreshold: { default: defaultValues.repeatThreshold },
    required: { type: Boolean, default: false },
    size: { default: void 0 },
    state: { type: [Boolean, null], default: null },
    step: { default: defaultValues.step },
    vertical: { type: Boolean, default: false },
    wrap: { type: Boolean, default: false }
  }, {
    "modelValue": {
      default: null
    },
    "modelModifiers": {}
  }),
  emits: mergeModels13(["change"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const KEY_CODES = [CODE_UP, CODE_DOWN, CODE_HOME, CODE_END, CODE_PAGEUP, CODE_PAGEDOWN];
    const _props = __props;
    const props = useDefaults(_props, "BFormSpinbutton");
    const emit = __emit;
    const modelValue = useModel13(__props, "modelValue");
    const element = useTemplateRef14("_element");
    const { focused } = useFocus(element);
    const computedId = useId(() => props.id, "spinbutton");
    const computedClasses = computed49(() => ({
      "disabled": props.disabled,
      "readonly": props.readonly,
      "focus": focused.value,
      "d-inline-flex": props.inline || props.vertical,
      "d-flex": !props.inline && !props.vertical,
      "align-items-stretch": !props.vertical,
      "flex-column": props.vertical,
      [`form-control-${props.size}`]: props.size !== void 0
    }));
    const computedSpinClasses = computed49(() => ({
      "d-flex": props.vertical,
      "align-self-center": !props.vertical,
      "align-items-center": props.vertical,
      "border-top": props.vertical,
      "border-bottom": props.vertical,
      "border-start": !props.vertical,
      "border-end": !props.vertical
    }));
    let $_autoDelayTimer;
    let $_autoRepeatTimer;
    let $_keyIsDown = false;
    const stepNumber = useToNumber(() => props.step);
    const computedStep = computed49(
      () => Number.isNaN(stepNumber.value) ? defaultValues.step : stepNumber.value
    );
    const minNumber = useToNumber(() => props.min);
    const computedMin = computed49(
      () => Number.isNaN(minNumber.value) ? defaultValues.min : minNumber.value
    );
    const maxNumber = useToNumber(() => props.max);
    const computedMax = computed49(() => {
      const step = computedStep.value;
      const min2 = computedMin.value;
      return Math.floor((maxNumber.value - min2) / step) * step + min2;
    });
    const repeatDelayNumber = useToNumber(() => props.repeatDelay, {
      nanToZero: true,
      method: "parseInt"
    });
    const computedDelay = computed49(
      () => repeatDelayNumber.value > 0 ? repeatDelayNumber.value : defaultValues.repeatDelay
    );
    const repeatIntervalNumber = useToNumber(() => props.repeatInterval, {
      nanToZero: true,
      method: "parseInt"
    });
    const computedInterval = computed49(
      () => repeatIntervalNumber.value > 0 ? repeatIntervalNumber.value : defaultValues.repeatInterval
    );
    const repeatThresholdNumber = useToNumber(() => props.repeatThreshold, {
      nanToZero: true,
      method: "parseInt"
    });
    const computedThreshold = computed49(
      () => Math.max(
        Number.isNaN(repeatThresholdNumber.value) ? defaultValues.repeatThreshold : repeatThresholdNumber.value,
        1
      )
    );
    const repeatStepMultiplierNumber = useToNumber(() => props.repeatStepMultiplier, {
      nanToZero: true,
      method: "parseInt"
    });
    const computedStepMultiplier = computed49(
      () => Math.max(
        Number.isNaN(repeatStepMultiplierNumber.value) ? defaultValues.repeatMultiplier : repeatStepMultiplierNumber.value,
        1
      )
    );
    const computedPrecision = computed49(() => {
      const step = computedStep.value;
      return Math.floor(step) === step ? 0 : (step.toString().split(".")[1] || "").length;
    });
    const computedMultiplier = computed49(() => Math.pow(10, computedPrecision.value || 0));
    const valueAsFixed = computed49(
      () => modelValue.value === null ? "" : modelValue.value.toFixed(computedPrecision.value)
    );
    const { isRtl, locale: globalLocale } = useRtl();
    const computedLocale = computed49(() => {
      const loc = (props.locale ?? (globalLocale == null ? void 0 : globalLocale.value)) || "locale";
      const locales = [loc];
      const nf = new Intl.NumberFormat(locales);
      return nf.resolvedOptions().locale;
    });
    const defaultFormatter = () => new Intl.NumberFormat(computedLocale.value, {
      style: "decimal",
      useGrouping: false,
      minimumIntegerDigits: 1,
      minimumFractionDigits: computedPrecision.value,
      maximumFractionDigits: computedPrecision.value,
      notation: "standard"
    }).format;
    const computedFormatter = computed49(() => props.formatterFn ?? defaultFormatter());
    const stepValue = (direction) => {
      let { value } = modelValue;
      if (!props.disabled && value !== null) {
        const step = computedStep.value * direction;
        const min2 = computedMin.value;
        const max2 = computedMax.value;
        const multiplier = computedMultiplier.value;
        const { wrap } = props;
        value = Math.round((value - min2) / step) * step + min2 + step;
        value = Math.round(value * multiplier) / multiplier;
        modelValue.value = value > max2 ? wrap ? min2 : max2 : value < min2 ? wrap ? max2 : min2 : value;
      }
    };
    const stepUp = (multiplier = 1) => {
      if (modelValue.value === null) {
        modelValue.value = computedMin.value;
        return;
      }
      stepValue(1 * multiplier);
    };
    const stepDown = (multiplier = 1) => {
      if (modelValue.value === null) {
        modelValue.value = props.wrap ? computedMax.value : computedMin.value;
        return;
      }
      stepValue(-1 * multiplier);
    };
    onKeyStroke(
      KEY_CODES,
      (event) => {
        const { code, altKey, ctrlKey, metaKey } = event;
        if (props.disabled || props.readonly || altKey || ctrlKey || metaKey)
          return;
        stopEvent(event, { immediatePropagation: true });
        if ($_keyIsDown) {
          return;
        }
        resetTimers();
        if ([CODE_UP, CODE_DOWN].includes(code)) {
          $_keyIsDown = true;
          if (code === CODE_UP) {
            handleStepRepeat(event, stepUp);
            return;
          }
          if (code === CODE_DOWN) {
            handleStepRepeat(event, stepDown);
          }
          return;
        }
        if (code === CODE_PAGEUP) {
          stepUp(computedStepMultiplier.value);
          return;
        }
        if (code === CODE_PAGEDOWN) {
          stepDown(computedStepMultiplier.value);
          return;
        }
        if (code === CODE_HOME) {
          modelValue.value = computedMin.value;
          return;
        }
        if (code === CODE_END) {
          modelValue.value = computedMax.value;
        }
      },
      { target: element, eventName: "keydown" }
    );
    onKeyStroke(
      KEY_CODES,
      (event) => {
        const { altKey, ctrlKey, metaKey } = event;
        if (props.disabled || props.readonly || altKey || ctrlKey || metaKey)
          return;
        stopEvent(event, { immediatePropagation: true });
        resetTimers();
        $_keyIsDown = false;
        emit("change", modelValue.value);
      },
      { target: element, eventName: "keyup" }
    );
    const handleStepRepeat = (event, stepper) => {
      const { type } = event || {};
      if (!props.disabled && !props.readonly) {
        if (isMouseEvent(event)) {
          if (type === "mousedown" && event.button)
            return;
        }
        resetTimers();
        stepper(1);
        const threshold = computedThreshold.value;
        const multiplier = computedStepMultiplier.value;
        const delay3 = computedDelay.value;
        const interval = computedInterval.value;
        $_autoDelayTimer = setTimeout(() => {
          let count = 0;
          $_autoRepeatTimer = setInterval(() => {
            stepper(count < threshold ? 1 : multiplier);
            count++;
          }, interval);
        }, delay3);
      }
    };
    const isMouseEvent = (evt) => evt.type === "mouseup" || evt.type === "mousedown";
    const onMouseup = (event) => {
      if (isMouseEvent(event)) {
        if (event.type === "mouseup" && event.button) {
          return;
        }
      }
      stopEvent(event, { immediatePropagation: true });
      resetTimers();
      setMouseup(false);
      emit("change", modelValue.value);
    };
    const setMouseup = (on) => {
      try {
        eventOnOff(on, [document.body, "mouseup", onMouseup, false]);
        eventOnOff(on, [document.body, "touchend", onMouseup, false]);
      } catch {
      }
    };
    const resetTimers = () => {
      clearTimeout($_autoDelayTimer);
      clearInterval($_autoRepeatTimer);
      $_autoDelayTimer = void 0;
      $_autoRepeatTimer = void 0;
    };
    const buttons = computed49(() => {
      const incrementSvgAttrs = {
        svg: {
          xmlns: "http://www.w3.org/2000/svg",
          width: "16",
          height: "16",
          fill: "currentColor",
          class: "bi bi-plus",
          viewBox: "0 0 16 16"
        },
        path: {
          d: "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
        }
      };
      const decrementSvgAttrs = {
        svg: {
          xmlns: "http://www.w3.org/2000/svg",
          width: "16",
          height: "16",
          fill: "currentColor",
          class: "bi bi-dash",
          viewBox: "0 0 16 16"
        },
        path: { d: "M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" }
      };
      const sharedButtonAttrs = {
        "class": [{ "py-0": !props.vertical }, "btn", "btn-sm", "border-0", "rounded-0"],
        "tabindex": "-1",
        "type": "button",
        "disabled": props.disabled || props.readonly,
        "aria-disabled": props.disabled || props.readonly ? true : void 0,
        "aria-controls": computedId.value
      };
      const sharedSvgAttrs = {
        "aria-hidden": true,
        "scale": focused.value ? 1.5 : 1.25
      };
      const handler = (event, stepper) => {
        if (!props.disabled && !props.readonly) {
          stopEvent(event, { immediatePropagation: true });
          setMouseup(true);
          focused.value = true;
          handleStepRepeat(event, stepper);
        }
      };
      const incrementAttrs = {
        button: {
          ...sharedButtonAttrs,
          "aria-label": props.labelIncrement || void 0,
          "aria-keyshortcuts": "ArrowUp"
        },
        svg: {
          ...sharedSvgAttrs,
          ...incrementSvgAttrs.svg
        },
        path: {
          ...incrementSvgAttrs.path
        },
        slot: {
          name: "increment"
        },
        handler: (e) => handler(e, stepUp)
      };
      const decrementAttrs = {
        button: {
          ...sharedButtonAttrs,
          "aria-label": props.labelDecrement || void 0,
          "aria-keyshortcuts": "ArrowDown"
        },
        svg: {
          ...sharedSvgAttrs,
          ...decrementSvgAttrs.svg
        },
        path: {
          ...decrementSvgAttrs.path
        },
        slot: {
          name: "decrement"
        },
        handler: (e) => handler(e, stepDown)
      };
      return {
        top: {
          ...props.vertical ? incrementAttrs : decrementAttrs
        },
        bottom: {
          ...!props.vertical ? incrementAttrs : decrementAttrs
        }
      };
    });
    return (_ctx, _cache) => {
      return openBlock32(), createElementBlock22("div", {
        ref: "_element",
        class: normalizeClass24(["b-form-spinbutton form-control", computedClasses.value]),
        role: "group",
        lang: computedLocale.value,
        tabindex: unref33(props).disabled ? void 0 : "-1",
        title: unref33(props).ariaLabel,
        onClick: _cache[4] || (_cache[4] = ($event) => focused.value = true)
      }, [
        renderSlot29(_ctx.$slots, buttons.value.top.slot.name, { hasFocus: unref33(focused) }, () => [
          createElementVNode12("button", mergeProps19(buttons.value.top.button, {
            onMousedown: _cache[0] || (_cache[0] = //@ts-ignore
            (...args) => buttons.value.top.handler && buttons.value.top.handler(...args)),
            onTouchstart: _cache[1] || (_cache[1] = //@ts-ignore
            (...args) => buttons.value.top.handler && buttons.value.top.handler(...args))
          }), [
            (openBlock32(), createElementBlock22("svg", normalizeProps4(guardReactiveProps2(buttons.value.top.svg)), [
              createElementVNode12("path", normalizeProps4(guardReactiveProps2(buttons.value.top.path)), null, 16)
            ], 16))
          ], 16)
        ]),
        unref33(props).name && !unref33(props).disabled ? (openBlock32(), createElementBlock22("input", {
          key: "hidden",
          type: "hidden",
          name: unref33(props).name,
          form: unref33(props).form,
          value: valueAsFixed.value
        }, null, 8, _hoisted_211)) : createCommentVNode14("", true),
        createElementVNode12("output", {
          id: unref33(computedId),
          key: "output",
          class: normalizeClass24(["flex-grow-1", computedSpinClasses.value]),
          dir: unref33(isRtl) ?? false ? "rtl" : "ltr",
          tabindex: unref33(props).disabled ? void 0 : "0",
          role: "spinbutton",
          "aria-live": "off",
          "aria-label": unref33(props).ariaLabel || void 0,
          "aria-invalid": unref33(props).state === false || !modelValue.value !== null && unref33(props).required ? true : void 0,
          "aria-required": unref33(props).required ? true : void 0,
          "aria-valuemin": computedMin.value,
          "aria-valuemax": computedMax.value,
          "aria-valuenow": modelValue.value !== null ? modelValue.value : void 0,
          "aria-valuetext": modelValue.value !== null ? computedFormatter.value(modelValue.value) : void 0
        }, [
          createElementVNode12("bdi", null, toDisplayString20((modelValue.value !== null ? computedFormatter.value(modelValue.value) : unref33(props).placeholder) || ""), 1)
        ], 10, _hoisted_33),
        renderSlot29(_ctx.$slots, buttons.value.bottom.slot.name, { hasFocus: unref33(focused) }, () => [
          createElementVNode12("button", mergeProps19(buttons.value.bottom.button, {
            onMousedown: _cache[2] || (_cache[2] = //@ts-ignore
            (...args) => buttons.value.bottom.handler && buttons.value.bottom.handler(...args)),
            onTouchstart: _cache[3] || (_cache[3] = //@ts-ignore
            (...args) => buttons.value.bottom.handler && buttons.value.bottom.handler(...args))
          }), [
            (openBlock32(), createElementBlock22("svg", normalizeProps4(guardReactiveProps2(buttons.value.bottom.svg)), [
              createElementVNode12("path", normalizeProps4(guardReactiveProps2(buttons.value.bottom.path)), null, 16)
            ], 16))
          ], 16)
        ])
      ], 10, _hoisted_120);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BFormTags.vue_vue_type_script_setup_true_lang-BpJRNfak.mjs
import { defineComponent as defineComponent36, useSlots as useSlots11, computed as computed50, openBlock as openBlock33, createBlock as createBlock27, resolveDynamicComponent as resolveDynamicComponent20, unref as unref34, normalizeClass as normalizeClass25, withCtx as withCtx26, createElementVNode as createElementVNode13, renderSlot as renderSlot30, createTextVNode as createTextVNode19, toDisplayString as toDisplayString21, createCommentVNode as createCommentVNode15, mergeModels as mergeModels14, useModel as useModel14, useTemplateRef as useTemplateRef15, ref as ref13, createElementBlock as createElementBlock23, normalizeProps as normalizeProps5, guardReactiveProps as guardReactiveProps3, Fragment as Fragment13, renderList as renderList7, mergeProps as mergeProps20 } from "vue";
var _hoisted_1$18 = ["id"];
var _sfc_main$114 = defineComponent36({
  __name: "BFormTag",
  props: {
    disabled: { type: Boolean, default: false },
    id: { default: void 0 },
    noRemove: { type: Boolean, default: false },
    pill: { type: Boolean, default: false },
    removeLabel: { default: "Remove tag" },
    tag: { default: "span" },
    title: { default: void 0 },
    variant: { default: "secondary" }
  },
  emits: ["remove"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BFormTag");
    const emit = __emit;
    const slots = useSlots11();
    const computedId = useId(() => props.id);
    const tagText = computed50(
      () => {
        var _a;
        return ((((_a = slots.default) == null ? void 0 : _a.call(slots, {})[0].children) ?? "").toString() || props.title) ?? "";
      }
    );
    const taglabelId = computed50(() => `${computedId.value}taglabel__`);
    const colorClasses = useColorVariantClasses(props);
    const computedClasses = computed50(() => [
      colorClasses.value,
      {
        "rounded-pill": props.pill,
        "disabled": props.disabled
      }
    ]);
    return (_ctx, _cache) => {
      return openBlock33(), createBlock27(resolveDynamicComponent20(unref34(props).tag), {
        id: unref34(computedId),
        title: tagText.value,
        class: normalizeClass25(["badge b-form-tag d-inline-flex align-items-center mw-100", computedClasses.value]),
        "aria-labelledby": taglabelId.value
      }, {
        default: withCtx26(() => [
          createElementVNode13("span", {
            id: taglabelId.value,
            class: "b-form-tag-content flex-grow-1 text-truncate"
          }, [
            renderSlot30(_ctx.$slots, "default", {}, () => [
              createTextVNode19(toDisplayString21(tagText.value), 1)
            ])
          ], 8, _hoisted_1$18),
          !unref34(props).disabled && !unref34(props).noRemove ? (openBlock33(), createBlock27(_sfc_main5, {
            key: 0,
            "aria-keyshortcuts": "Delete",
            "aria-label": unref34(props).removeLabel,
            class: "b-form-tag-remove",
            "aria-describedby": taglabelId.value,
            "aria-controls": unref34(props).id,
            onClick: _cache[0] || (_cache[0] = ($event) => emit("remove", tagText.value))
          }, null, 8, ["aria-label", "aria-describedby", "aria-controls"])) : createCommentVNode15("", true)
        ]),
        _: 3
      }, 8, ["id", "title", "class", "aria-labelledby"]);
    };
  }
});
var _hoisted_121 = ["id"];
var _hoisted_212 = ["id", "for", "aria-live"];
var _hoisted_34 = ["id", "aria-live"];
var _hoisted_43 = ["id"];
var _hoisted_52 = ["aria-controls"];
var _hoisted_62 = {
  role: "group",
  class: "d-flex"
};
var _hoisted_7 = ["id", "disabled", "value", "type", "placeholder", "form", "required", "aria-required"];
var _hoisted_8 = ["disabled"];
var _hoisted_9 = {
  "aria-live": "polite",
  "aria-atomic": "true"
};
var _hoisted_10 = {
  key: 0,
  class: "d-block invalid-feedback"
};
var _hoisted_11 = {
  key: 1,
  class: "form-text text-body-secondary"
};
var _hoisted_122 = {
  key: 2,
  class: "form-text text-body-secondary"
};
var _hoisted_132 = ["name", "value"];
var _sfc_main35 = defineComponent36({
  __name: "BFormTags",
  props: mergeModels14({
    addButtonText: { default: "Add" },
    addButtonVariant: { default: "outline-secondary" },
    addOnChange: { type: Boolean, default: false },
    autofocus: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    duplicateTagText: { default: "Duplicate tag(s)" },
    form: { default: void 0 },
    inputAttrs: { default: void 0 },
    inputClass: { default: void 0 },
    inputId: { default: void 0 },
    inputType: { default: "text" },
    invalidTagText: { default: "Invalid tag(s)" },
    limit: { default: void 0 },
    limitTagsText: { default: "Tag limit reached" },
    name: { default: void 0 },
    noAddOnEnter: { type: Boolean, default: false },
    noOuterFocus: { type: Boolean, default: false },
    noTagRemove: { type: Boolean, default: false },
    placeholder: { default: "Add tag..." },
    removeOnDelete: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    separator: { default: void 0 },
    size: { default: "md" },
    state: { type: [Boolean, null], default: null },
    tagClass: { default: void 0 },
    tagPills: { type: Boolean, default: false },
    tagRemoveLabel: { default: void 0 },
    tagRemovedLabel: { default: "Tag removed" },
    tagValidator: { type: Function, default: () => true },
    tagVariant: { default: "secondary" }
  }, {
    "modelValue": {
      default: () => []
    },
    "modelModifiers": {}
  }),
  emits: mergeModels14(["blur", "focus", "focusin", "focusout", "tag-state"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BFormTags");
    const emit = __emit;
    const modelValue = useModel14(__props, "modelValue");
    const computedId = useId();
    const limitNumber = useToNumber(() => props.limit ?? NaN);
    const stateClass = useStateClass(() => props.state);
    const input = useTemplateRef15("_input");
    const { focused } = useFocus(input, {
      initialValue: props.autofocus
    });
    const _inputId = computed50(() => props.inputId || `${computedId.value}input__`);
    const tags = ref13([...modelValue.value]);
    const inputValue = ref13("");
    const shouldRemoveOnDelete = ref13(modelValue.value.length > 0);
    const lastRemovedTag = ref13("");
    const validTags = ref13([]);
    const invalidTags = ref13([]);
    const duplicateTags = ref13([]);
    syncRef(modelValue, tags, {
      direction: "ltr",
      transform: {
        ltr: (v) => [...v]
      }
    });
    const computedClasses = computed50(() => [
      stateClass.value,
      {
        [`form-control-${props.size}`]: props.size !== "md",
        disabled: props.disabled,
        focus: focused.value
      }
    ]);
    const isDuplicate = computed50(() => tags.value.includes(inputValue.value));
    const isInvalid = computed50(
      () => inputValue.value === "" ? false : !props.tagValidator(inputValue.value)
    );
    const isLimitReached = computed50(() => tags.value.length === limitNumber.value);
    const disableAddButton = computed50(() => !isInvalid.value && !isDuplicate.value);
    const slotAttrs = computed50(() => ({
      addButtonText: props.addButtonText,
      addButtonVariant: props.addButtonVariant,
      addTag,
      disableAddButton: disableAddButton.value,
      disabled: props.disabled,
      duplicateTagText: props.duplicateTagText,
      duplicateTags: duplicateTags.value,
      form: props.form,
      inputAttrs: {
        ...props.inputAttrs,
        disabled: props.disabled,
        form: props.form,
        id: _inputId.value,
        value: inputValue.value
      },
      inputClass: props.inputClass,
      inputHandlers: {
        input: onInput,
        keydown: onKeydown,
        change: onChange
      },
      inputId: _inputId.value,
      inputType: props.inputType,
      invalidTagText: props.invalidTagText,
      invalidTags: invalidTags.value,
      isDuplicate: isDuplicate.value,
      isInvalid: isInvalid.value,
      isLimitReached: isLimitReached.value,
      limitTagsText: props.limitTagsText,
      limit: limitNumber.value,
      noTagRemove: props.noTagRemove,
      placeholder: props.placeholder,
      removeTag,
      required: props.required,
      separator: props.separator,
      size: props.size,
      state: props.state,
      tagClass: props.tagClass,
      tagPills: props.tagPills,
      tagRemoveLabel: props.tagRemoveLabel,
      tagVariant: props.tagVariant,
      tags: tags.value
    }));
    const onFocusin = (e) => {
      if (props.disabled) {
        const target = e.target;
        target.blur();
        return;
      }
      emit("focusin", e);
    };
    const onFocus = (e) => {
      if (props.disabled || props.noOuterFocus) {
        return;
      }
      focused.value = true;
      emit("focus", e);
    };
    const onBlur = (e) => {
      focused.value = false;
      emit("blur", e);
    };
    const onInput = (e) => {
      var _a, _b;
      const value = typeof e === "string" ? e : e.target.value;
      shouldRemoveOnDelete.value = false;
      if (((_a = props.separator) == null ? void 0 : _a.includes(value.charAt(0))) && value.length > 0) {
        if (input.value) {
          input.value.value = "";
        }
        return;
      }
      inputValue.value = value;
      if ((_b = props.separator) == null ? void 0 : _b.includes(value.charAt(value.length - 1))) {
        addTag(value.slice(0, value.length - 1));
        return;
      }
      validTags.value = props.tagValidator(value) && !isDuplicate.value ? [value] : [];
      invalidTags.value = props.tagValidator(value) ? [] : [value];
      duplicateTags.value = isDuplicate.value ? [value] : [];
      emit("tag-state", validTags.value, invalidTags.value, duplicateTags.value);
    };
    const onChange = (e) => {
      if (props.addOnChange) {
        onInput(e);
        if (!isDuplicate.value) {
          addTag(inputValue.value);
        }
      }
    };
    const onKeydown = (e) => {
      if (e.key === "Enter" && !props.noAddOnEnter) {
        addTag(inputValue.value);
        return;
      }
      if ((e.key === "Backspace" || e.key === "Delete") && props.removeOnDelete && inputValue.value === "" && shouldRemoveOnDelete.value && tags.value.length > 0) {
        removeTag(tags.value[tags.value.length - 1]);
      } else {
        shouldRemoveOnDelete.value = true;
      }
    };
    onKeyStroke(onKeydown, { target: input });
    const separator = computed50(() => {
      if (!props.separator) {
        return;
      }
      return typeof props.separator === "string" ? props.separator : props.separator.join("");
    });
    const separatorRegExp = computed50(() => {
      if (!separator.value) {
        return;
      }
      return new RegExp(`[${escapeRegExpChars(separator.value)}]+`);
    });
    const addTag = (tag) => {
      tag = (tag ?? inputValue.value).trim();
      const newTags = separatorRegExp.value ? tag.split(separatorRegExp.value).map((t) => t.trim()) : [tag];
      const validTags2 = [];
      for (const newTag of newTags) {
        if (newTag === "" || isDuplicate.value || !props.tagValidator(newTag)) {
          continue;
        }
        if (limitNumber.value && isLimitReached.value) {
          break;
        }
        validTags2.push(newTag);
      }
      const newValue = [...modelValue.value, ...validTags2];
      inputValue.value = "";
      shouldRemoveOnDelete.value = true;
      modelValue.value = newValue;
      focused.value = true;
    };
    const removeTag = (tag) => {
      const tagIndex = tags.value.indexOf((tag == null ? void 0 : tag.toString()) ?? "");
      if (tagIndex === -1)
        return;
      lastRemovedTag.value = tags.value.splice(tagIndex, 1).toString();
      modelValue.value = tags.value;
    };
    __expose({
      blur: () => {
        focused.value = false;
      },
      element: input,
      focus: () => {
        focused.value = true;
      }
    });
    return (_ctx, _cache) => {
      return openBlock33(), createElementBlock23("div", {
        id: unref34(computedId),
        class: normalizeClass25(["b-form-tags form-control h-auto", computedClasses.value]),
        role: "group",
        tabindex: "-1",
        onFocusin,
        onFocusout: _cache[1] || (_cache[1] = ($event) => emit("focusout", $event))
      }, [
        createElementVNode13("output", {
          id: `${unref34(computedId)}selected_tags__`,
          class: "visually-hidden",
          for: _inputId.value,
          "aria-live": unref34(focused) ? "polite" : "off",
          "aria-atomic": "true",
          "aria-relevant": "additions text"
        }, toDisplayString21(tags.value.join(", ")), 9, _hoisted_212),
        createElementVNode13("div", {
          id: `${unref34(computedId)}removed_tags__`,
          role: "status",
          "aria-live": unref34(focused) ? "assertive" : "off",
          "aria-atomic": "true",
          class: "visually-hidden"
        }, " (" + toDisplayString21(unref34(props).tagRemovedLabel) + ") " + toDisplayString21(lastRemovedTag.value), 9, _hoisted_34),
        renderSlot30(_ctx.$slots, "default", normalizeProps5(guardReactiveProps3(slotAttrs.value)), () => [
          createElementVNode13("ul", {
            id: `${unref34(computedId)}tag_list__`,
            class: "b-form-tags-list list-unstyled mb-0 d-flex flex-wrap align-items-center"
          }, [
            (openBlock33(true), createElementBlock23(Fragment13, null, renderList7(tags.value, (tag, index8) => {
              return renderSlot30(_ctx.$slots, "tag", {
                key: index8,
                tag,
                tagClass: unref34(props).tagClass,
                tagVariant: unref34(props).tagVariant,
                tagPills: unref34(props).tagPills,
                removeTag
              }, () => [
                (openBlock33(), createBlock27(_sfc_main$114, {
                  key: tag,
                  class: normalizeClass25(unref34(props).tagClass),
                  tag: "li",
                  variant: unref34(props).tagVariant,
                  pill: unref34(props).tagPills,
                  onRemove: removeTag
                }, {
                  default: withCtx26(() => [
                    createTextVNode19(toDisplayString21(tag), 1)
                  ]),
                  _: 2
                }, 1032, ["class", "variant", "pill"]))
              ]);
            }), 128)),
            createElementVNode13("li", {
              role: "none",
              "aria-live": "off",
              class: "b-from-tags-field flex-grow-1",
              "aria-controls": `${unref34(computedId)}tag_list__`
            }, [
              createElementVNode13("div", _hoisted_62, [
                createElementVNode13("input", mergeProps20({
                  id: _inputId.value,
                  ref: "_input",
                  disabled: unref34(props).disabled,
                  value: inputValue.value,
                  type: unref34(props).inputType,
                  placeholder: unref34(props).placeholder,
                  class: "b-form-tags-input w-100 flex-grow-1 p-0 m-0 bg-transparent border-0",
                  style: { "outline": "currentcolor none 0px", "min-width": "5rem" }
                }, unref34(props).inputAttrs, {
                  form: unref34(props).form,
                  required: unref34(props).required || void 0,
                  "aria-required": unref34(props).required || void 0,
                  onInput,
                  onChange,
                  onFocus,
                  onBlur
                }), null, 16, _hoisted_7),
                disableAddButton.value ? (openBlock33(), createElementBlock23("button", {
                  key: 0,
                  type: "button",
                  class: normalizeClass25(["btn b-form-tags-button py-0", [
                    _ctx.inputClass,
                    {
                      [`btn-${unref34(props).addButtonVariant}`]: unref34(props).addButtonVariant !== null,
                      "disabled invisible": inputValue.value.length === 0
                    }
                  ]]),
                  style: { "font-size": "90%" },
                  disabled: unref34(props).disabled || inputValue.value.length === 0 || isLimitReached.value,
                  onClick: _cache[0] || (_cache[0] = ($event) => addTag(inputValue.value))
                }, [
                  renderSlot30(_ctx.$slots, "add-button-text", {}, () => [
                    createTextVNode19(toDisplayString21(unref34(props).addButtonText), 1)
                  ])
                ], 10, _hoisted_8)) : createCommentVNode15("", true)
              ])
            ], 8, _hoisted_52)
          ], 8, _hoisted_43),
          createElementVNode13("div", _hoisted_9, [
            isInvalid.value ? (openBlock33(), createElementBlock23("div", _hoisted_10, toDisplayString21(unref34(props).invalidTagText) + ": " + toDisplayString21(inputValue.value), 1)) : createCommentVNode15("", true),
            isDuplicate.value ? (openBlock33(), createElementBlock23("small", _hoisted_11, toDisplayString21(unref34(props).duplicateTagText) + ": " + toDisplayString21(inputValue.value), 1)) : createCommentVNode15("", true),
            tags.value.length === unref34(props).limit ? (openBlock33(), createElementBlock23("small", _hoisted_122, toDisplayString21(unref34(props).limitTagsText), 1)) : createCommentVNode15("", true)
          ])
        ]),
        unref34(props).name ? (openBlock33(true), createElementBlock23(Fragment13, { key: 0 }, renderList7(tags.value, (tag, index8) => {
          return openBlock33(), createElementBlock23("input", {
            key: index8,
            type: "hidden",
            name: unref34(props).name,
            value: tag
          }, null, 8, _hoisted_132);
        }), 128)) : createCommentVNode15("", true)
      ], 42, _hoisted_121);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BFormTextarea.vue_vue_type_script_setup_true_lang-BtBnBQCz.mjs
import { ref as ref14, readonly as readonly9, toRef as toRef14, computed as computed51, onMounted as onMounted10, nextTick as nextTick9, defineComponent as defineComponent37, mergeModels as mergeModels15, useModel as useModel15, useTemplateRef as useTemplateRef16, openBlock as openBlock34, createElementBlock as createElementBlock24, unref as unref35, normalizeClass as normalizeClass26, normalizeStyle as normalizeStyle5 } from "vue";
var useTextareaResize = (input, props) => {
  const height = ref14(0);
  const resolvedProps = readonly9(toRef14(props));
  const maxRowsNumber = useToNumber(() => resolvedProps.value.maxRows || NaN, {
    method: "parseInt",
    nanToZero: true
  });
  const rowsNumber = useToNumber(() => resolvedProps.value.rows || NaN, {
    method: "parseInt",
    nanToZero: true
  });
  const computedMinRows = computed51(() => Math.max(rowsNumber.value || 2, 2));
  const computedMaxRows = computed51(() => Math.max(computedMinRows.value, maxRowsNumber.value || 0));
  const computedRows = computed51(
    () => computedMinRows.value === computedMaxRows.value ? computedMinRows.value : null
  );
  const handleHeightChange = async () => {
    if (!input.value || !isVisible(input.value)) {
      height.value = null;
      return;
    }
    const computedStyle = getComputedStyle(input.value);
    const lineHeight = Number.parseFloat(computedStyle.lineHeight) || 1;
    const border = (Number.parseFloat(computedStyle.borderTopWidth) || 0) + (Number.parseFloat(computedStyle.borderBottomWidth) || 0);
    const padding = (Number.parseFloat(computedStyle.paddingTop) || 0) + (Number.parseFloat(computedStyle.paddingBottom) || 0);
    const offset2 = border + padding;
    const minHeight = lineHeight * computedMinRows.value + offset2;
    const oldHeight = input.value.style.height || computedStyle.height;
    height.value = "auto";
    await nextTick9();
    const { scrollHeight } = input.value;
    height.value = oldHeight;
    await nextTick9();
    const contentRows = Math.max((scrollHeight - padding) / lineHeight, 2);
    const rows = Math.min(Math.max(contentRows, computedMinRows.value), computedMaxRows.value);
    const newHeight = Math.max(Math.ceil(rows * lineHeight + offset2), minHeight);
    if (resolvedProps.value.noAutoShrink && (Number.parseFloat(oldHeight.toString()) || 0) > newHeight) {
      height.value = oldHeight;
      return;
    }
    height.value = `${newHeight}px`;
  };
  onMounted10(handleHeightChange);
  const computedStyles = computed51(() => ({
    resize: "none",
    height: typeof height.value === "string" ? height.value : height.value ? `${height.value}px` : void 0
  }));
  return {
    onInput: handleHeightChange,
    computedStyles,
    computedRows
  };
};
var _hoisted_123 = ["id", "name", "form", "value", "disabled", "placeholder", "required", "autocomplete", "readonly", "aria-required", "aria-invalid", "rows", "wrap"];
var _sfc_main36 = defineComponent37({
  __name: "BFormTextarea",
  props: mergeModels15({
    noResize: { type: Boolean, default: false },
    rows: { default: 2 },
    wrap: { default: "soft" },
    noAutoShrink: { type: Boolean, default: false },
    maxRows: { default: void 0 },
    ariaInvalid: { type: [Boolean, String], default: void 0 },
    autocomplete: { default: void 0 },
    autofocus: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    form: { default: void 0 },
    formatter: { type: Function, default: void 0 },
    id: { default: void 0 },
    lazyFormatter: { type: Boolean, default: false },
    list: { default: void 0 },
    name: { default: void 0 },
    placeholder: { default: void 0 },
    plaintext: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    size: { default: void 0 },
    state: { type: [Boolean, null], default: null },
    debounce: { default: 0 },
    debounceMaxWait: { default: NaN }
  }, {
    "modelValue": {
      default: ""
    },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, "BFormTextarea");
    const [modelValue, modelModifiers] = useModel15(__props, "modelValue", {
      set: (v) => normalizeInput(v, modelModifiers)
    });
    const input = useTemplateRef16("_input");
    const { computedId, forceUpdateKey, computedAriaInvalid, onInput, onChange, onBlur, focus, blur } = useFormInput(props, input, modelValue, modelModifiers);
    const stateClass = useStateClass(() => props.state);
    const computedClasses = computed51(() => [
      stateClass.value,
      props.plaintext ? "form-control-plaintext" : "form-control",
      {
        [`form-control-${props.size}`]: !!props.size
      }
    ]);
    const {
      computedStyles: resizeStyles,
      onInput: handleHeightChange,
      computedRows
    } = useTextareaResize(
      input,
      computed51(() => ({
        maxRows: props.maxRows,
        rows: props.rows,
        noAutoShrink: props.noAutoShrink
      }))
    );
    const computedStyles = computed51(() => ({
      resize: props.noResize ? "none" : void 0,
      ...props.maxRows || props.noAutoShrink ? resizeStyles.value : void 0
    }));
    __expose({
      blur,
      element: input,
      focus
    });
    return (_ctx, _cache) => {
      return openBlock34(), createElementBlock24("textarea", {
        id: unref35(computedId),
        ref: "_input",
        key: unref35(forceUpdateKey),
        class: normalizeClass26(computedClasses.value),
        name: unref35(props).name || void 0,
        form: unref35(props).form || void 0,
        value: unref35(modelValue) ?? void 0,
        disabled: unref35(props).disabled,
        placeholder: unref35(props).placeholder,
        required: unref35(props).required || void 0,
        autocomplete: unref35(props).autocomplete || void 0,
        readonly: unref35(props).readonly || unref35(props).plaintext,
        "aria-required": unref35(props).required || void 0,
        "aria-invalid": unref35(computedAriaInvalid),
        rows: unref35(computedRows) || 2,
        style: normalizeStyle5(computedStyles.value),
        wrap: unref35(props).wrap || void 0,
        onInput: _cache[0] || (_cache[0] = (e) => {
          unref35(onInput)(e);
          unref35(handleHeightChange)();
        }),
        onChange: _cache[1] || (_cache[1] = //@ts-ignore
        (...args) => unref35(onChange) && unref35(onChange)(...args)),
        onBlur: _cache[2] || (_cache[2] = //@ts-ignore
        (...args) => unref35(onBlur) && unref35(onBlur)(...args))
      }, null, 46, _hoisted_123);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BInputGroupText.vue_vue_type_script_setup_true_lang-Crx2iCeq.mjs
import { defineComponent as defineComponent38, provide as provide11, computed as computed52, openBlock as openBlock35, createBlock as createBlock28, resolveDynamicComponent as resolveDynamicComponent21, unref as unref36, normalizeClass as normalizeClass27, withCtx as withCtx27, renderSlot as renderSlot31, createElementBlock as createElementBlock25, createElementVNode as createElementVNode14, toDisplayString as toDisplayString22, createCommentVNode as createCommentVNode16, createTextVNode as createTextVNode20 } from "vue";
var _hoisted_124 = {
  key: 0,
  class: "input-group-text"
};
var _hoisted_213 = {
  key: 0,
  class: "input-group-text"
};
var _sfc_main$115 = defineComponent38({
  __name: "BInputGroup",
  props: {
    append: { default: void 0 },
    id: { default: void 0 },
    prepend: { default: void 0 },
    size: { default: "md" },
    tag: { default: "div" }
  },
  setup(__props) {
    provide11(inputGroupKey, true);
    const _props = __props;
    const props = useDefaults(_props, "BInputGroup");
    const computedClasses = computed52(() => ({
      [`input-group-${props.size}`]: props.size !== "md"
    }));
    const hasAppend = computed52(() => !!props.append);
    const hasPrepend = computed52(() => !!props.prepend);
    return (_ctx, _cache) => {
      return openBlock35(), createBlock28(resolveDynamicComponent21(unref36(props).tag), {
        id: unref36(props).id,
        class: normalizeClass27(["input-group", computedClasses.value]),
        role: "group"
      }, {
        default: withCtx27(() => [
          renderSlot31(_ctx.$slots, "prepend", {}, () => [
            hasPrepend.value ? (openBlock35(), createElementBlock25("span", _hoisted_124, [
              createElementVNode14("span", null, toDisplayString22(unref36(props).prepend), 1)
            ])) : createCommentVNode16("", true)
          ]),
          renderSlot31(_ctx.$slots, "default"),
          renderSlot31(_ctx.$slots, "append", {}, () => [
            hasAppend.value ? (openBlock35(), createElementBlock25("span", _hoisted_213, [
              createElementVNode14("span", null, toDisplayString22(unref36(props).append), 1)
            ])) : createCommentVNode16("", true)
          ])
        ]),
        _: 3
      }, 8, ["id", "class"]);
    };
  }
});
var _sfc_main37 = defineComponent38({
  __name: "BInputGroupText",
  props: {
    tag: { default: "div" },
    text: { default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BInputGroupText");
    return (_ctx, _cache) => {
      return openBlock35(), createBlock28(resolveDynamicComponent21(unref36(props).tag), { class: "input-group-text" }, {
        default: withCtx27(() => [
          renderSlot31(_ctx.$slots, "default", {}, () => [
            createTextVNode20(toDisplayString22(unref36(props).text), 1)
          ])
        ]),
        _: 3
      });
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BListGroupItem.vue_vue_type_script_setup_true_lang-BmLOvsb6.mjs
import { defineComponent as defineComponent39, computed as computed53, provide as provide12, toRef as toRef15, openBlock as openBlock36, createBlock as createBlock29, resolveDynamicComponent as resolveDynamicComponent22, normalizeClass as normalizeClass28, withCtx as withCtx28, renderSlot as renderSlot32, useAttrs as useAttrs5, inject as inject18, mergeProps as mergeProps21, unref as unref37 } from "vue";
var _sfc_main$116 = defineComponent39({
  __name: "BListGroup",
  props: {
    flush: { type: Boolean, default: false },
    horizontal: { type: [Boolean, String], default: false },
    numbered: { type: Boolean, default: false },
    tag: { default: "div" }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BListGroup");
    const computedClasses = computed53(() => {
      const horizontal = props.flush ? false : props.horizontal;
      return {
        "list-group-flush": props.flush,
        "list-group-horizontal": horizontal === true,
        [`list-group-horizontal-${horizontal}`]: typeof horizontal === "string",
        "list-group-numbered": props.numbered
      };
    });
    const computedTag = computed53(() => props.numbered === true ? "ol" : props.tag);
    provide12(listGroupInjectionKey, {
      numbered: toRef15(() => props.numbered)
    });
    return (_ctx, _cache) => {
      return openBlock36(), createBlock29(resolveDynamicComponent22(computedTag.value), {
        class: normalizeClass28(["list-group", computedClasses.value])
      }, {
        default: withCtx28(() => [
          renderSlot32(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
});
var _sfc_main38 = defineComponent39({
  __name: "BListGroupItem",
  props: {
    action: { type: Boolean, default: false },
    button: { type: Boolean, default: false },
    tag: { default: "div" },
    active: { type: Boolean, default: false },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    icon: { type: Boolean, default: void 0 },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: void 0 },
    variant: { default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BListGroupItem");
    const attrs = useAttrs5();
    const parentData = inject18(listGroupInjectionKey, null);
    const { computedLink } = useBLinkHelper(props);
    const isLink2 = computed53(() => !props.button && computedLink.value);
    const tagComputed = computed53(
      () => (parentData == null ? void 0 : parentData.numbered.value) ? "li" : props.button ? "button" : !isLink2.value ? props.tag : _sfc_main7
    );
    const isAction = computed53(
      () => props.action || isLink2.value || props.button || ["a", "router-link", "button", "b-link"].includes(props.tag)
    );
    const computedClasses = computed53(() => ({
      [`list-group-item-${props.variant}`]: props.variant !== null && props.variant !== void 0,
      "list-group-item-action": isAction.value,
      "active": props.active,
      "disabled": props.disabled
    }));
    const computedAttrs = computed53(() => {
      const localAttrs = {};
      if (props.button) {
        if (!attrs || !attrs.type) {
          localAttrs.type = "button";
        }
        if (props.disabled) {
          localAttrs.disabled = true;
        }
      }
      return localAttrs;
    });
    return (_ctx, _cache) => {
      return openBlock36(), createBlock29(resolveDynamicComponent22(tagComputed.value), mergeProps21({
        class: ["list-group-item", computedClasses.value],
        "aria-current": unref37(props).active ? true : void 0,
        "aria-disabled": unref37(props).disabled ? true : void 0,
        target: isLink2.value ? unref37(props).target : void 0,
        href: !unref37(props).button ? unref37(props).href : void 0,
        to: !unref37(props).button ? unref37(props).to : void 0
      }, computedAttrs.value), {
        default: withCtx28(() => [
          renderSlot32(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "aria-current", "aria-disabled", "target", "href", "to"]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BModalOrchestrator.vue_vue_type_script_setup_true_lang-CYXOtT68.mjs
import { defineComponent as defineComponent40, mergeModels as mergeModels16, useSlots as useSlots12, useModel as useModel16, useTemplateRef as useTemplateRef17, computed as computed55, watch as watch15, openBlock as openBlock37, createBlock as createBlock30, unref as unref38, withCtx as withCtx29, Transition as Transition5, mergeProps as mergeProps22, withDirectives as withDirectives8, createElementVNode as createElementVNode15, withModifiers, normalizeClass as normalizeClass29, createElementBlock as createElementBlock26, renderSlot as renderSlot33, normalizeProps as normalizeProps6, guardReactiveProps as guardReactiveProps4, resolveDynamicComponent as resolveDynamicComponent23, createTextVNode as createTextVNode21, toDisplayString as toDisplayString23, Fragment as Fragment14, createCommentVNode as createCommentVNode17, createVNode as createVNode9, vShow as vShow5, normalizeStyle as normalizeStyle6, renderList as renderList8 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/useSafeScrollLock-DUIeABf3.mjs
import { ref as ref15, computed as computed54, watch as watch14, readonly as readonly10, toRef as toRef16, onMounted as onMounted11, nextTick as nextTick10, useId as useId2, toValue as toValue$12, onUnmounted } from "vue";
var candidateSelectors = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"];
var candidateSelector = candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
var isInert = function isInert2(node, lookUp) {
  var _node$getAttribute;
  if (lookUp === void 0) {
    lookUp = true;
  }
  var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
  var inert = inertAtt === "" || inertAtt === "true";
  var result = inert || lookUp && node && isInert2(node.parentNode);
  return result;
};
var isContentEditable = function isContentEditable2(node) {
  var _node$getAttribute2;
  var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
  return attValue === "" || attValue === "true";
};
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  if (isInert(el)) {
    return [];
  }
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (isInert(element, false)) {
      continue;
    }
    if (element.tagName === "SLOT") {
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively2(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates
        });
      }
    } else {
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }
      var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
      typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
      var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
      if (shadowRoot && validShadowRoot) {
        var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var hasTabIndex = function hasTabIndex2(node) {
  return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
};
var getTabIndex = function getTabIndex2(node) {
  if (!node) {
    throw new Error("No node provided");
  }
  if (node.tabIndex < 0) {
    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
};
var getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
  var tabIndex = getTabIndex(node);
  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
    return 0;
  }
  return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isNodeAttached = function isNodeAttached2(node) {
  var _nodeRoot;
  var nodeRoot = node && getRootNode(node);
  var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
  var attached = false;
  if (nodeRoot && nodeRoot !== node) {
    var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
    attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
    while (!attached && nodeRootHost) {
      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
      nodeRoot = getRootNode(nodeRootHost);
      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
      attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
    }
  }
  return attached;
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  if (!displayCheck || displayCheck === "full" || displayCheck === "legacy-full") {
    if (typeof getShadowRoot === "function") {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (isNodeAttached(node)) {
      return !node.getClientRects().length;
    }
    if (displayCheck !== "legacy-full") {
      return true;
    }
  } else if (displayCheck === "non-zero-area") {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          if (child.tagName === "LEGEND") {
            return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  isInert(node) || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  return false;
};
var sortByOrder = function sortByOrder2(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function(item, i) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getSortOrderTabIndex(element, isScope);
    var elements = isScope ? sortByOrder2(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var focusable = function focusable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
var isTabbable = function isTabbable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = candidateSelectors.concat("iframe").join(",");
var isFocusable = function isFocusable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorFocusable(options, node);
};
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++)
    n[e] = r[e];
  return n;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r))
    return _arrayLikeToArray(r);
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"])
    return Array.from(r);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i)
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r)
      return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
var activeFocusTraps = {
  activateTrap: function activateTrap(trapStack, trap) {
    if (trapStack.length > 0) {
      var activeTrap = trapStack[trapStack.length - 1];
      if (activeTrap !== trap) {
        activeTrap.pause();
      }
    }
    var trapIndex = trapStack.indexOf(trap);
    if (trapIndex === -1) {
      trapStack.push(trap);
    } else {
      trapStack.splice(trapIndex, 1);
      trapStack.push(trap);
    }
  },
  deactivateTrap: function deactivateTrap(trapStack, trap) {
    var trapIndex = trapStack.indexOf(trap);
    if (trapIndex !== -1) {
      trapStack.splice(trapIndex, 1);
    }
    if (trapStack.length > 0) {
      trapStack[trapStack.length - 1].unpause();
    }
  }
};
var isSelectableInput = function isSelectableInput2(node) {
  return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
};
var isEscapeEvent = function isEscapeEvent2(e) {
  return (e === null || e === void 0 ? void 0 : e.key) === "Escape" || (e === null || e === void 0 ? void 0 : e.key) === "Esc" || (e === null || e === void 0 ? void 0 : e.keyCode) === 27;
};
var isTabEvent = function isTabEvent2(e) {
  return (e === null || e === void 0 ? void 0 : e.key) === "Tab" || (e === null || e === void 0 ? void 0 : e.keyCode) === 9;
};
var isKeyForward = function isKeyForward2(e) {
  return isTabEvent(e) && !e.shiftKey;
};
var isKeyBackward = function isKeyBackward2(e) {
  return isTabEvent(e) && e.shiftKey;
};
var delay = function delay2(fn) {
  return setTimeout(fn, 0);
};
var valueOrHandler = function valueOrHandler2(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }
  return typeof value === "function" ? value.apply(void 0, params) : value;
};
var getActualTarget = function getActualTarget2(event) {
  return event.target.shadowRoot && typeof event.composedPath === "function" ? event.composedPath()[0] : event.target;
};
var internalTrapStack = [];
var createFocusTrap = function createFocusTrap2(elements, userOptions) {
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
  var trapStack = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.trapStack) || internalTrapStack;
  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true,
    isKeyForward,
    isKeyBackward
  }, userOptions);
  var state = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   posTabIndexesFound: boolean,
    //   firstTabbableNode: HTMLElement|undefined,
    //   lastTabbableNode: HTMLElement|undefined,
    //   firstDomTabbableNode: HTMLElement|undefined,
    //   lastDomTabbableNode: HTMLElement|undefined,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0
  };
  var trap;
  var getOption = function getOption2(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== void 0 ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };
  var findContainerIndex = function findContainerIndex2(element, event) {
    var composedPath = typeof (event === null || event === void 0 ? void 0 : event.composedPath) === "function" ? event.composedPath() : void 0;
    return state.containerGroups.findIndex(function(_ref) {
      var container = _ref.container, tabbableNodes = _ref.tabbableNodes;
      return container.contains(element) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (composedPath === null || composedPath === void 0 ? void 0 : composedPath.includes(container)) || tabbableNodes.find(function(node) {
        return node === element;
      });
    });
  };
  var getNodeForOption = function getNodeForOption2(optionName) {
    var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref2$hasFallback = _ref2.hasFallback, hasFallback = _ref2$hasFallback === void 0 ? false : _ref2$hasFallback, _ref2$params = _ref2.params, params = _ref2$params === void 0 ? [] : _ref2$params;
    var optionValue = config[optionName];
    if (typeof optionValue === "function") {
      optionValue = optionValue.apply(void 0, _toConsumableArray(params));
    }
    if (optionValue === true) {
      optionValue = void 0;
    }
    if (!optionValue) {
      if (optionValue === void 0 || optionValue === false) {
        return optionValue;
      }
      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }
    var node = optionValue;
    if (typeof optionValue === "string") {
      try {
        node = doc.querySelector(optionValue);
      } catch (err) {
        throw new Error("`".concat(optionName, '` appears to be an invalid selector; error="').concat(err.message, '"'));
      }
      if (!node) {
        if (!hasFallback) {
          throw new Error("`".concat(optionName, "` as selector refers to no known node"));
        }
      }
    }
    return node;
  };
  var getInitialFocusNode = function getInitialFocusNode2() {
    var node = getNodeForOption("initialFocus", {
      hasFallback: true
    });
    if (node === false) {
      return false;
    }
    if (node === void 0 || node && !isFocusable(node, config.tabbableOptions)) {
      if (findContainerIndex(doc.activeElement) >= 0) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;
        node = firstTabbableNode || getNodeForOption("fallbackFocus");
      }
    } else if (node === null) {
      node = getNodeForOption("fallbackFocus");
    }
    if (!node) {
      throw new Error("Your focus-trap needs to have at least one focusable element");
    }
    return node;
  };
  var updateTabbableNodes = function updateTabbableNodes2() {
    state.containerGroups = state.containers.map(function(container) {
      var tabbableNodes = tabbable(container, config.tabbableOptions);
      var focusableNodes = focusable(container, config.tabbableOptions);
      var firstTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[0] : void 0;
      var lastTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : void 0;
      var firstDomTabbableNode = focusableNodes.find(function(node) {
        return isTabbable(node);
      });
      var lastDomTabbableNode = focusableNodes.slice().reverse().find(function(node) {
        return isTabbable(node);
      });
      var posTabIndexesFound = !!tabbableNodes.find(function(node) {
        return getTabIndex(node) > 0;
      });
      return {
        container,
        tabbableNodes,
        focusableNodes,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function nextTabbableNode(node) {
          var forward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          var nodeIdx = tabbableNodes.indexOf(node);
          if (nodeIdx < 0) {
            if (forward) {
              return focusableNodes.slice(focusableNodes.indexOf(node) + 1).find(function(el) {
                return isTabbable(el);
              });
            }
            return focusableNodes.slice(0, focusableNodes.indexOf(node)).reverse().find(function(el) {
              return isTabbable(el);
            });
          }
          return tabbableNodes[nodeIdx + (forward ? 1 : -1)];
        }
      };
    });
    state.tabbableGroups = state.containerGroups.filter(function(group) {
      return group.tabbableNodes.length > 0;
    });
    if (state.tabbableGroups.length <= 0 && !getNodeForOption("fallbackFocus")) {
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    }
    if (state.containerGroups.find(function(g) {
      return g.posTabIndexesFound;
    }) && state.containerGroups.length > 1) {
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
    }
  };
  var _getActiveElement = function getActiveElement2(el) {
    var activeElement = el.activeElement;
    if (!activeElement) {
      return;
    }
    if (activeElement.shadowRoot && activeElement.shadowRoot.activeElement !== null) {
      return _getActiveElement(activeElement.shadowRoot);
    }
    return activeElement;
  };
  var _tryFocus = function tryFocus(node) {
    if (node === false) {
      return;
    }
    if (node === _getActiveElement(document)) {
      return;
    }
    if (!node || !node.focus) {
      _tryFocus(getInitialFocusNode());
      return;
    }
    node.focus({
      preventScroll: !!config.preventScroll
    });
    state.mostRecentlyFocusedNode = node;
    if (isSelectableInput(node)) {
      node.select();
    }
  };
  var getReturnFocusNode = function getReturnFocusNode2(previousActiveElement) {
    var node = getNodeForOption("setReturnFocus", {
      params: [previousActiveElement]
    });
    return node ? node : node === false ? false : previousActiveElement;
  };
  var findNextNavNode = function findNextNavNode2(_ref3) {
    var target = _ref3.target, event = _ref3.event, _ref3$isBackward = _ref3.isBackward, isBackward = _ref3$isBackward === void 0 ? false : _ref3$isBackward;
    target = target || getActualTarget(event);
    updateTabbableNodes();
    var destinationNode = null;
    if (state.tabbableGroups.length > 0) {
      var containerIndex = findContainerIndex(target, event);
      var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : void 0;
      if (containerIndex < 0) {
        if (isBackward) {
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (isBackward) {
        var startOfGroupIndex = state.tabbableGroups.findIndex(function(_ref4) {
          var firstTabbableNode = _ref4.firstTabbableNode;
          return target === firstTabbableNode;
        });
        if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
          startOfGroupIndex = containerIndex;
        }
        if (startOfGroupIndex >= 0) {
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = getTabIndex(target) >= 0 ? destinationGroup.lastTabbableNode : destinationGroup.lastDomTabbableNode;
        } else if (!isTabEvent(event)) {
          destinationNode = containerGroup.nextTabbableNode(target, false);
        }
      } else {
        var lastOfGroupIndex = state.tabbableGroups.findIndex(function(_ref5) {
          var lastTabbableNode = _ref5.lastTabbableNode;
          return target === lastTabbableNode;
        });
        if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
          lastOfGroupIndex = containerIndex;
        }
        if (lastOfGroupIndex >= 0) {
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = getTabIndex(target) >= 0 ? _destinationGroup.firstTabbableNode : _destinationGroup.firstDomTabbableNode;
        } else if (!isTabEvent(event)) {
          destinationNode = containerGroup.nextTabbableNode(target);
        }
      }
    } else {
      destinationNode = getNodeForOption("fallbackFocus");
    }
    return destinationNode;
  };
  var checkPointerDown = function checkPointerDown2(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target, e) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      trap.deactivate({
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked (and if not focusable, to "nothing"); by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node), whether the
        //  outside click was on a focusable node or not
        returnFocus: config.returnFocusOnDeactivate
      });
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
  };
  var checkFocusIn = function checkFocusIn2(event) {
    var target = getActualTarget(event);
    var targetContained = findContainerIndex(target, event) >= 0;
    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      event.stopImmediatePropagation();
      var nextNode;
      var navAcrossContainers = true;
      if (state.mostRecentlyFocusedNode) {
        if (getTabIndex(state.mostRecentlyFocusedNode) > 0) {
          var mruContainerIdx = findContainerIndex(state.mostRecentlyFocusedNode);
          var tabbableNodes = state.containerGroups[mruContainerIdx].tabbableNodes;
          if (tabbableNodes.length > 0) {
            var mruTabIdx = tabbableNodes.findIndex(function(node) {
              return node === state.mostRecentlyFocusedNode;
            });
            if (mruTabIdx >= 0) {
              if (config.isKeyForward(state.recentNavEvent)) {
                if (mruTabIdx + 1 < tabbableNodes.length) {
                  nextNode = tabbableNodes[mruTabIdx + 1];
                  navAcrossContainers = false;
                }
              } else {
                if (mruTabIdx - 1 >= 0) {
                  nextNode = tabbableNodes[mruTabIdx - 1];
                  navAcrossContainers = false;
                }
              }
            }
          }
        } else {
          if (!state.containerGroups.some(function(g) {
            return g.tabbableNodes.some(function(n) {
              return getTabIndex(n) > 0;
            });
          })) {
            navAcrossContainers = false;
          }
        }
      } else {
        navAcrossContainers = false;
      }
      if (navAcrossContainers) {
        nextNode = findNextNavNode({
          // move FROM the MRU node, not event-related node (which will be the node that is
          //  outside the trap causing the focus escape we're trying to fix)
          target: state.mostRecentlyFocusedNode,
          isBackward: config.isKeyBackward(state.recentNavEvent)
        });
      }
      if (nextNode) {
        _tryFocus(nextNode);
      } else {
        _tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
      }
    }
    state.recentNavEvent = void 0;
  };
  var checkKeyNav = function checkKeyNav2(event) {
    var isBackward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    state.recentNavEvent = event;
    var destinationNode = findNextNavNode({
      event,
      isBackward
    });
    if (destinationNode) {
      if (isTabEvent(event)) {
        event.preventDefault();
      }
      _tryFocus(destinationNode);
    }
  };
  var checkTabKey = function checkTabKey2(event) {
    if (config.isKeyForward(event) || config.isKeyBackward(event)) {
      checkKeyNav(event, config.isKeyBackward(event));
    }
  };
  var checkEscapeKey = function checkEscapeKey2(event) {
    if (isEscapeEvent(event) && valueOrHandler(config.escapeDeactivates, event) !== false) {
      event.preventDefault();
      trap.deactivate();
    }
  };
  var checkClick = function checkClick2(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target, e) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
  };
  var addListeners = function addListeners2() {
    if (!state.active) {
      return;
    }
    activeFocusTraps.activateTrap(trapStack, trap);
    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function() {
      _tryFocus(getInitialFocusNode());
    }) : _tryFocus(getInitialFocusNode());
    doc.addEventListener("focusin", checkFocusIn, true);
    doc.addEventListener("mousedown", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("touchstart", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("click", checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener("keydown", checkTabKey, {
      capture: true,
      passive: false
    });
    doc.addEventListener("keydown", checkEscapeKey);
    return trap;
  };
  var removeListeners = function removeListeners2() {
    if (!state.active) {
      return;
    }
    doc.removeEventListener("focusin", checkFocusIn, true);
    doc.removeEventListener("mousedown", checkPointerDown, true);
    doc.removeEventListener("touchstart", checkPointerDown, true);
    doc.removeEventListener("click", checkClick, true);
    doc.removeEventListener("keydown", checkTabKey, true);
    doc.removeEventListener("keydown", checkEscapeKey);
    return trap;
  };
  var checkDomRemoval = function checkDomRemoval2(mutations) {
    var isFocusedNodeRemoved = mutations.some(function(mutation) {
      var removedNodes = Array.from(mutation.removedNodes);
      return removedNodes.some(function(node) {
        return node === state.mostRecentlyFocusedNode;
      });
    });
    if (isFocusedNodeRemoved) {
      _tryFocus(getInitialFocusNode());
    }
  };
  var mutationObserver = typeof window !== "undefined" && "MutationObserver" in window ? new MutationObserver(checkDomRemoval) : void 0;
  var updateObservedNodes = function updateObservedNodes2() {
    if (!mutationObserver) {
      return;
    }
    mutationObserver.disconnect();
    if (state.active && !state.paused) {
      state.containers.map(function(container) {
        mutationObserver.observe(container, {
          subtree: true,
          childList: true
        });
      });
    }
  };
  trap = {
    get active() {
      return state.active;
    },
    get paused() {
      return state.paused;
    },
    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }
      var onActivate = getOption(activateOptions, "onActivate");
      var onPostActivate = getOption(activateOptions, "onPostActivate");
      var checkCanFocusTrap = getOption(activateOptions, "checkCanFocusTrap");
      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }
      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;
      onActivate === null || onActivate === void 0 || onActivate();
      var finishActivation = function finishActivation2() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }
        addListeners();
        updateObservedNodes();
        onPostActivate === null || onPostActivate === void 0 || onPostActivate();
      };
      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }
      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }
      var options = _objectSpread2({
        onDeactivate: config.onDeactivate,
        onPostDeactivate: config.onPostDeactivate,
        checkCanReturnFocus: config.checkCanReturnFocus
      }, deactivateOptions);
      clearTimeout(state.delayInitialFocusTimer);
      state.delayInitialFocusTimer = void 0;
      removeListeners();
      state.active = false;
      state.paused = false;
      updateObservedNodes();
      activeFocusTraps.deactivateTrap(trapStack, trap);
      var onDeactivate = getOption(options, "onDeactivate");
      var onPostDeactivate = getOption(options, "onPostDeactivate");
      var checkCanReturnFocus = getOption(options, "checkCanReturnFocus");
      var returnFocus = getOption(options, "returnFocus", "returnFocusOnDeactivate");
      onDeactivate === null || onDeactivate === void 0 || onDeactivate();
      var finishDeactivation = function finishDeactivation2() {
        delay(function() {
          if (returnFocus) {
            _tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }
          onPostDeactivate === null || onPostDeactivate === void 0 || onPostDeactivate();
        });
      };
      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }
      finishDeactivation();
      return this;
    },
    pause: function pause(pauseOptions) {
      if (state.paused || !state.active) {
        return this;
      }
      var onPause = getOption(pauseOptions, "onPause");
      var onPostPause = getOption(pauseOptions, "onPostPause");
      state.paused = true;
      onPause === null || onPause === void 0 || onPause();
      removeListeners();
      updateObservedNodes();
      onPostPause === null || onPostPause === void 0 || onPostPause();
      return this;
    },
    unpause: function unpause(unpauseOptions) {
      if (!state.paused || !state.active) {
        return this;
      }
      var onUnpause = getOption(unpauseOptions, "onUnpause");
      var onPostUnpause = getOption(unpauseOptions, "onPostUnpause");
      state.paused = false;
      onUnpause === null || onUnpause === void 0 || onUnpause();
      updateTabbableNodes();
      addListeners();
      updateObservedNodes();
      onPostUnpause === null || onPostUnpause === void 0 || onPostUnpause();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function(element) {
        return typeof element === "string" ? doc.querySelector(element) : element;
      });
      if (state.active) {
        updateTabbableNodes();
      }
      updateObservedNodes();
      return this;
    }
  };
  trap.updateContainerElements(elements);
  return trap;
};
function useFocusTrap(target, options = {}) {
  let trap;
  const { immediate, ...focusTrapOptions } = options;
  const hasFocus = ref15(false);
  const isPaused = ref15(false);
  const activate = (opts) => trap && trap.activate(opts);
  const deactivate = (opts) => trap && trap.deactivate(opts);
  const pause = () => {
    if (trap) {
      trap.pause();
      isPaused.value = true;
    }
  };
  const unpause = () => {
    if (trap) {
      trap.unpause();
      isPaused.value = false;
    }
  };
  const targets = computed54(() => {
    const _targets = toValue(target);
    return (Array.isArray(_targets) ? _targets : [_targets]).map((el) => {
      const _el = toValue(el);
      return typeof _el === "string" ? _el : unrefElement(_el);
    }).filter(notNullish);
  });
  watch14(
    targets,
    (els) => {
      if (!els.length)
        return;
      trap = createFocusTrap(els, {
        ...focusTrapOptions,
        onActivate() {
          hasFocus.value = true;
          if (options.onActivate)
            options.onActivate();
        },
        onDeactivate() {
          hasFocus.value = false;
          if (options.onDeactivate)
            options.onDeactivate();
        }
      });
      if (immediate)
        activate();
    },
    { flush: "post" }
  );
  tryOnScopeDispose(() => deactivate());
  return {
    hasFocus,
    isPaused,
    activate,
    deactivate,
    pause,
    unpause
  };
}
var useActivatedFocusTrap = ({
  element,
  isActive,
  noTrap,
  fallbackFocus
}, focusTrapOpts = {
  allowOutsideClick: true,
  fallbackFocus: fallbackFocus.ref.value ?? void 0,
  escapeDeactivates: false
}) => {
  const resolvedIsActive = readonly10(toRef16(isActive));
  const resolvedNoTrap = readonly10(toRef16(noTrap));
  const checkNeedsFocus = () => {
    var _a;
    const tabbableElements = (_a = element.value) == null ? void 0 : _a.querySelectorAll(
      `a, button, input, select, textarea, [tabindex]:not([tabindex="-1"]):not(.${fallbackFocus.classSelector})`
    );
    return !tabbableElements || tabbableElements.length === 0;
  };
  const needsFallback = ref15(checkNeedsFocus());
  onMounted11(() => {
    useMutationObserver(
      element,
      () => {
        needsFallback.value = checkNeedsFocus();
      },
      { childList: true, subtree: true }
    );
  });
  const trap = useFocusTrap(element, focusTrapOpts);
  watch14(resolvedIsActive, async (newValue) => {
    await nextTick10();
    if (newValue && resolvedNoTrap.value === false) {
      trap.activate();
    } else {
      trap.deactivate();
    }
  });
  watch14(resolvedNoTrap, (newValue) => {
    if (newValue === true) {
      trap.deactivate();
    }
  });
  return {
    needsFallback: readonly10(needsFallback)
  };
};
var useScrollLock2 = createSharedComposable(useScrollLock);
var prevousRightPadding = "";
var lockRegistry = /* @__PURE__ */ new Map();
var useSafeScrollLock = (isOpen, bodyScroll) => {
  const resolvedIsOpen = readonly10(toRef16(isOpen));
  const id = useId2();
  const inverseBodyScrollingValue = computed54(() => !toValue$12(bodyScroll));
  const isLocked = useScrollLock2(
    typeof document !== "undefined" ? document.body : null,
    resolvedIsOpen.value && inverseBodyScrollingValue.value
  );
  onMounted11(() => {
    if (typeof document === "undefined")
      return;
    lockRegistry.set(id, false);
    watch14(
      [resolvedIsOpen, inverseBodyScrollingValue],
      ([modelVal, bodyVal]) => {
        const scrollBarGap = window.innerWidth - document.documentElement.clientWidth;
        const hasLocked = Array.from(lockRegistry.values()).some((val) => val === true);
        const myLocked = modelVal && bodyVal;
        lockRegistry.set(id, myLocked);
        if (myLocked && !hasLocked && !isLocked.value) {
          isLocked.value = true;
          if (scrollBarGap > 0) {
            prevousRightPadding = document.body.style.paddingRight;
            document.body.style.paddingRight = `${scrollBarGap + prevousRightPadding}px`;
          }
        }
        const hasLockedAfter = Array.from(lockRegistry.values()).some((val) => val === true);
        if (hasLocked && !hasLockedAfter) {
          lockRegistry.set(id, false);
          isLocked.value = false;
          document.body.style.paddingRight = prevousRightPadding;
        }
      },
      { immediate: true }
    );
  });
  onUnmounted(() => {
    lockRegistry.delete(id);
    const hasLockedAfter = Array.from(lockRegistry.values()).some((val) => val === true);
    if (!hasLockedAfter) {
      document.body.style.paddingRight = prevousRightPadding;
      isLocked.value = false;
    }
  });
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BModalOrchestrator.vue_vue_type_script_setup_true_lang-CYXOtT68.mjs
var _hoisted_125 = ["id", "aria-labelledby", "aria-describedby"];
var _hoisted_214 = ["id"];
var fallbackClassSelector = "modal-fallback-focus";
var defaultModalDialogZIndex = 1056;
var _sfc_main$117 = defineComponent40({
  ...{
    inheritAttrs: false
  },
  __name: "BModal",
  props: mergeModels16({
    autofocus: { type: Boolean, default: true },
    autofocusButton: { default: void 0 },
    backdropFirst: { type: Boolean, default: false },
    body: { default: void 0 },
    bodyAttrs: { default: void 0 },
    bodyBgVariant: { default: null },
    bodyClass: { default: null },
    bodyScrolling: { type: Boolean, default: false },
    bodyTextVariant: { default: null },
    bodyVariant: { default: null },
    busy: { type: Boolean, default: false },
    buttonSize: { default: "md" },
    cancelDisabled: { type: Boolean, default: false },
    cancelTitle: { default: "Cancel" },
    cancelVariant: { default: "secondary" },
    centered: { type: Boolean, default: false },
    contentClass: { default: void 0 },
    dialogClass: { default: void 0 },
    footerBgVariant: { default: null },
    footerBorderVariant: { default: null },
    footerClass: { default: void 0 },
    footerTextVariant: { default: null },
    footerVariant: { default: null },
    fullscreen: { type: [Boolean, String], default: false },
    headerBgVariant: { default: null },
    headerBorderVariant: { default: null },
    headerClass: { default: void 0 },
    headerCloseClass: { default: void 0 },
    headerCloseLabel: { default: "Close" },
    headerCloseVariant: { default: "secondary" },
    headerTextVariant: { default: null },
    headerVariant: { default: null },
    noBackdrop: { type: Boolean, default: false },
    noFooter: { type: Boolean, default: false },
    noHeader: { type: Boolean, default: false },
    noHeaderClose: { type: Boolean, default: false },
    id: { default: void 0 },
    modalClass: { default: void 0 },
    noCloseOnBackdrop: { type: Boolean, default: false },
    noCloseOnEsc: { type: Boolean, default: false },
    noTrap: { type: Boolean, default: false },
    noStacking: { type: Boolean },
    okDisabled: { type: Boolean, default: false },
    okOnly: { type: Boolean, default: false },
    okTitle: { default: "OK" },
    okVariant: { default: "primary" },
    scrollable: { type: Boolean, default: false },
    size: { default: "md" },
    title: { default: void 0 },
    titleClass: { default: void 0 },
    titleVisuallyHidden: { type: Boolean, default: false },
    titleTag: { default: "h5" },
    teleportDisabled: { type: Boolean, default: false },
    teleportTo: { default: "body" },
    initialAnimation: { type: Boolean, default: false },
    noAnimation: { type: Boolean },
    noFade: { type: Boolean, default: false },
    lazy: { type: Boolean, default: false },
    unmountLazy: { type: Boolean, default: false },
    show: { type: Boolean, default: false },
    transProps: { default: void 0 },
    visible: { type: Boolean, default: false }
  }, {
    "modelValue": { type: Boolean, ...{ default: false } },
    "modelModifiers": {}
  }),
  emits: mergeModels16(["backdrop", "cancel", "close", "esc", "hidden", "hide", "hide-prevented", "ok", "show", "show-prevented", "shown"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BModal");
    const emit = __emit;
    const slots = useSlots12();
    const computedId = useId(() => props.id, "modal");
    const modelValue = useModel16(__props, "modelValue");
    const element = useTemplateRef17("_element");
    const fallbackFocusElement = useTemplateRef17("_fallbackFocusElement");
    const okButton = useTemplateRef17("_okButton");
    const cancelButton = useTemplateRef17("_cancelButton");
    const closeButton = useTemplateRef17("_closeButton");
    const pickFocusItem = () => {
      if (props.autofocus === false)
        return;
      if (props.autofocusButton === "ok") {
        okButtonFocus.value = true;
      } else if (props.autofocusButton === "close") {
        closeButtonFocus.value = true;
      } else if (props.autofocusButton === "cancel") {
        cancelButtonFocus.value = true;
      } else {
        modalFocus.value = true;
      }
    };
    const onAfterEnter = () => {
      pickFocusItem();
    };
    const {
      showRef,
      renderRef,
      renderBackdropRef,
      hide: hide2,
      show,
      toggle: toggle2,
      computedNoAnimation,
      transitionProps,
      backdropTransitionProps,
      isLeaving,
      isVisible: isVisible2,
      trapActive,
      contentShowing,
      backdropReady,
      backdropVisible
    } = useShowHide(modelValue, props, emit, element, computedId, {
      // addShowClass: false,
      transitionProps: {
        onAfterEnter
      }
    });
    const { needsFallback } = useActivatedFocusTrap({
      element,
      isActive: trapActive,
      noTrap: () => props.noTrap,
      fallbackFocus: {
        ref: fallbackFocusElement,
        classSelector: fallbackClassSelector
      }
    });
    onKeyStroke(
      "Escape",
      () => {
        hide2("esc");
      },
      { target: element }
    );
    useSafeScrollLock(showRef, () => props.bodyScrolling);
    const { focused: modalFocus } = useFocus(element, {
      initialValue: modelValue.value && props.autofocusButton === void 0 && props.autofocus === true
    });
    const { focused: okButtonFocus } = useFocus(okButton, {
      initialValue: modelValue.value && props.autofocusButton === "ok" && props.autofocus === true
    });
    const { focused: cancelButtonFocus } = useFocus(cancelButton, {
      initialValue: modelValue.value && props.autofocusButton === "cancel" && props.autofocus === true
    });
    const { focused: closeButtonFocus } = useFocus(closeButton, {
      initialValue: modelValue.value && props.autofocusButton === "close" && props.autofocus === true
    });
    const hasHeaderCloseSlot = computed55(() => !isEmptySlot(slots["header-close"]));
    const modalDialogClasses = computed55(() => [
      props.dialogClass,
      {
        "modal-fullscreen": props.fullscreen === true,
        [`modal-fullscreen-${props.fullscreen}-down`]: typeof props.fullscreen === "string",
        [`modal-${props.size}`]: props.size !== "md",
        "modal-dialog-centered": props.centered,
        "modal-dialog-scrollable": props.scrollable
      }
    ]);
    const bodyColorClasses = useColorVariantClasses(() => ({
      bgVariant: props.bodyBgVariant,
      textVariant: props.bodyTextVariant,
      variant: props.bodyVariant
    }));
    const bodyClasses = computed55(() => [props.bodyClass, bodyColorClasses.value]);
    const headerColorClasses = useColorVariantClasses(() => ({
      bgVariant: props.headerBgVariant,
      textVariant: props.headerTextVariant,
      variant: props.headerVariant,
      borderVariant: props.headerBorderVariant
    }));
    const headerClasses = computed55(() => [props.headerClass, headerColorClasses.value]);
    const headerCloseAttrs = computed55(() => ({
      variant: hasHeaderCloseSlot.value ? props.headerCloseVariant : void 0,
      class: props.headerCloseClass
    }));
    const footerColorClasses = useColorVariantClasses(() => ({
      bgVariant: props.footerBgVariant,
      textVariant: props.footerTextVariant,
      variant: props.footerVariant,
      borderVariant: props.footerBorderVariant
    }));
    const footerClasses = computed55(() => [props.footerClass, footerColorClasses.value]);
    const titleClasses = computed55(() => [
      props.titleClass,
      {
        ["visually-hidden"]: props.titleVisuallyHidden
      }
    ]);
    const disableCancel = computed55(() => props.cancelDisabled || props.busy);
    const disableOk = computed55(() => props.okDisabled || props.busy);
    const { activePosition, activeModalCount, stackWithoutSelf } = useModalManager(
      showRef,
      modelValue.value
    );
    watch15(stackWithoutSelf, (newValue, oldValue) => {
      if (newValue.length > oldValue.length && showRef.value === true && props.noStacking === true)
        hide2();
    });
    const computedZIndexNumber = computed55(
      () => (
        // Make sure that newly opened modals have a higher z-index than currently active ones.
        // All active modals have a z-index of ('defaultZIndex' - 'stackSize' - 'positionInStack').
        //
        // This means inactive modals will already be higher than active ones when opened.
        showRef.value || isLeaving.value ? (
          // Just for reference there is a single frame in which the modal is not active but still has a higher z-index than the active ones due to _when_ it calculates its position. It's a small visual effect
          defaultModalDialogZIndex - (((activeModalCount == null ? void 0 : activeModalCount.value) ?? 0) * 2 - ((activePosition == null ? void 0 : activePosition.value) ?? 0) * 2)
        ) : defaultModalDialogZIndex
      )
    );
    const computedZIndex = computed55(() => ({
      "z-index": computedZIndexNumber.value
    }));
    const computedZIndexBackdrop = computed55(() => ({
      "z-index": computedZIndexNumber.value - 1
    }));
    const sharedSlots = computed55(() => ({
      cancel: () => {
        hide2("cancel");
      },
      close: () => {
        hide2("close");
      },
      hide: hide2,
      ok: () => {
        hide2("ok");
      },
      active: showRef.value,
      visible: showRef.value
    }));
    __expose({
      hide: hide2,
      id: computedId,
      show,
      toggle: toggle2
    });
    return (_ctx, _cache) => {
      return openBlock37(), createBlock30(_sfc_main, {
        to: unref38(props).teleportTo,
        disabled: unref38(props).teleportDisabled
      }, {
        default: withCtx29(() => [
          unref38(renderRef) || unref38(contentShowing) ? (openBlock37(), createBlock30(Transition5, mergeProps22({ key: 0 }, unref38(transitionProps), {
            appear: modelValue.value,
            onAfterEnter
          }), {
            default: withCtx29(() => [
              withDirectives8(createElementVNode15("div", mergeProps22({
                id: unref38(computedId),
                ref: "_element",
                class: ["modal", [
                  unref38(props).modalClass,
                  {
                    fade: !unref38(computedNoAnimation),
                    show: unref38(isVisible2)
                  }
                ]],
                role: "dialog",
                "aria-labelledby": !unref38(props).noHeader ? `${unref38(computedId)}-label` : void 0,
                "aria-describedby": `${unref38(computedId)}-body`,
                tabindex: "-1"
              }, _ctx.$attrs, {
                style: computedZIndex.value,
                onClick: _cache[4] || (_cache[4] = withModifiers(($event) => unref38(hide2)("backdrop"), ["self"]))
              }), [
                createElementVNode15("div", {
                  class: normalizeClass29(["modal-dialog", modalDialogClasses.value])
                }, [
                  unref38(contentShowing) ? (openBlock37(), createElementBlock26("div", {
                    key: 0,
                    class: normalizeClass29(["modal-content", unref38(props).contentClass])
                  }, [
                    !unref38(props).noHeader ? (openBlock37(), createElementBlock26("div", {
                      key: 0,
                      class: normalizeClass29(["modal-header", headerClasses.value])
                    }, [
                      renderSlot33(_ctx.$slots, "header", normalizeProps6(guardReactiveProps4(sharedSlots.value)), () => [
                        (openBlock37(), createBlock30(resolveDynamicComponent23(unref38(props).titleTag), {
                          id: `${unref38(computedId)}-label`,
                          class: normalizeClass29(["modal-title", titleClasses.value])
                        }, {
                          default: withCtx29(() => [
                            renderSlot33(_ctx.$slots, "title", normalizeProps6(guardReactiveProps4(sharedSlots.value)), () => [
                              createTextVNode21(toDisplayString23(unref38(props).title), 1)
                            ], true)
                          ]),
                          _: 3
                        }, 8, ["id", "class"])),
                        !unref38(props).noHeaderClose ? (openBlock37(), createElementBlock26(Fragment14, { key: 0 }, [
                          hasHeaderCloseSlot.value ? (openBlock37(), createBlock30(_sfc_main8, mergeProps22({ key: 0 }, headerCloseAttrs.value, {
                            onClick: _cache[0] || (_cache[0] = ($event) => unref38(hide2)("close"))
                          }), {
                            default: withCtx29(() => [
                              renderSlot33(_ctx.$slots, "header-close", {}, void 0, true)
                            ]),
                            _: 3
                          }, 16)) : (openBlock37(), createBlock30(_sfc_main5, mergeProps22({
                            key: 1,
                            "aria-label": unref38(props).headerCloseLabel
                          }, headerCloseAttrs.value, {
                            onClick: _cache[1] || (_cache[1] = ($event) => unref38(hide2)("close"))
                          }), null, 16, ["aria-label"]))
                        ], 64)) : createCommentVNode17("", true)
                      ], true)
                    ], 2)) : createCommentVNode17("", true),
                    createElementVNode15("div", mergeProps22({
                      id: `${unref38(computedId)}-body`,
                      class: ["modal-body", bodyClasses.value]
                    }, unref38(props).bodyAttrs), [
                      renderSlot33(_ctx.$slots, "default", normalizeProps6(guardReactiveProps4(sharedSlots.value)), () => [
                        createTextVNode21(toDisplayString23(unref38(props).body), 1)
                      ], true)
                    ], 16, _hoisted_214),
                    !unref38(props).noFooter ? (openBlock37(), createElementBlock26("div", {
                      key: 1,
                      class: normalizeClass29(["modal-footer", footerClasses.value])
                    }, [
                      renderSlot33(_ctx.$slots, "footer", normalizeProps6(guardReactiveProps4(sharedSlots.value)), () => [
                        renderSlot33(_ctx.$slots, "cancel", normalizeProps6(guardReactiveProps4(sharedSlots.value)), () => [
                          !unref38(props).okOnly ? (openBlock37(), createBlock30(_sfc_main8, {
                            key: 0,
                            ref: "_cancelButton",
                            disabled: disableCancel.value,
                            size: unref38(props).buttonSize,
                            variant: unref38(props).cancelVariant,
                            onClick: _cache[2] || (_cache[2] = ($event) => unref38(hide2)("cancel"))
                          }, {
                            default: withCtx29(() => [
                              createTextVNode21(toDisplayString23(unref38(props).cancelTitle), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled", "size", "variant"])) : createCommentVNode17("", true)
                        ], true),
                        renderSlot33(_ctx.$slots, "ok", normalizeProps6(guardReactiveProps4(sharedSlots.value)), () => [
                          createVNode9(_sfc_main8, {
                            ref: "_okButton",
                            disabled: disableOk.value,
                            size: unref38(props).buttonSize,
                            variant: unref38(props).okVariant,
                            onClick: _cache[3] || (_cache[3] = ($event) => unref38(hide2)("ok"))
                          }, {
                            default: withCtx29(() => [
                              createTextVNode21(toDisplayString23(unref38(props).okTitle), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled", "size", "variant"])
                        ], true)
                      ], true)
                    ], 2)) : createCommentVNode17("", true)
                  ], 2)) : createCommentVNode17("", true)
                ], 2),
                unref38(needsFallback) ? (openBlock37(), createElementBlock26("div", {
                  key: 0,
                  ref: "_fallbackFocusElement",
                  class: normalizeClass29(fallbackClassSelector),
                  tabindex: "0",
                  style: { "width": "0", "height": "0", "overflow": "hidden" }
                }, null, 512)) : createCommentVNode17("", true)
              ], 16, _hoisted_125), [
                [vShow5, unref38(showRef) && (unref38(backdropReady) && unref38(props).backdropFirst || !unref38(props).backdropFirst)]
              ])
            ]),
            _: 3
          }, 16, ["appear"])) : createCommentVNode17("", true),
          !unref38(props).noBackdrop ? renderSlot33(_ctx.$slots, "backdrop", normalizeProps6(mergeProps22({ key: 1 }, sharedSlots.value)), () => [
            unref38(renderBackdropRef) ? (openBlock37(), createBlock30(Transition5, normalizeProps6(mergeProps22({ key: 0 }, unref38(backdropTransitionProps))), {
              default: withCtx29(() => [
                withDirectives8(createElementVNode15("div", {
                  class: normalizeClass29(["modal-backdrop", {
                    fade: !unref38(computedNoAnimation),
                    show: unref38(backdropVisible) || unref38(computedNoAnimation)
                  }]),
                  style: normalizeStyle6(computedZIndexBackdrop.value),
                  onClick: _cache[5] || (_cache[5] = ($event) => unref38(hide2)("backdrop"))
                }, null, 6), [
                  [vShow5, unref38(showRef) || unref38(isLeaving) && unref38(props).backdropFirst && !unref38(computedNoAnimation)]
                ])
              ]),
              _: 1
            }, 16)) : createCommentVNode17("", true)
          ], true) : createCommentVNode17("", true)
        ]),
        _: 3
      }, 8, ["to", "disabled"]);
    };
  }
});
var BModal = _export_sfc(_sfc_main$117, [["__scopeId", "data-v-6fa3fb99"]]);
var _sfc_main39 = defineComponent40({
  ...{
    inheritAttrs: false
  },
  __name: "BModalOrchestrator",
  props: {
    teleportDisabled: { type: Boolean, default: false },
    teleportTo: { default: "body" }
  },
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, "BModalOrchestrator");
    const tools = useModalController();
    __expose({
      ...tools
    });
    return (_ctx, _cache) => {
      return openBlock37(), createBlock30(_sfc_main, {
        to: unref38(props).teleportTo,
        disabled: unref38(props).teleportDisabled
      }, {
        default: withCtx29(() => {
          var _a;
          return [
            createElementVNode15("div", mergeProps22({ id: "__BVID__modal-container" }, _ctx.$attrs), [
              (openBlock37(true), createElementBlock26(Fragment14, null, renderList8((_a = unref38(tools).modals) == null ? void 0 : _a.value, ([self2, modal]) => {
                return openBlock37(), createBlock30(resolveDynamicComponent23(modal.component ?? BModal), mergeProps22({
                  key: self2,
                  ref_for: true
                }, modal.props, {
                  modelValue: modal.props._modelValue,
                  "onUpdate:modelValue": [($event) => modal.props._modelValue = $event, ($event) => {
                    var _a2, _b;
                    return (_b = (_a2 = unref38(tools)).leave) == null ? void 0 : _b.call(_a2, self2);
                  }],
                  "initial-animation": "",
                  "teleport-disabled": true,
                  onHide: (e) => {
                    if (modal.props._isConfirm === true) {
                      if (e.trigger === "ok") {
                        modal.props._promise.resolve(true);
                        return;
                      }
                      if (e.trigger === "cancel") {
                        modal.props._promise.resolve(false);
                        return;
                      }
                      modal.props._promise.resolve(null);
                    }
                    modal.props._promise.resolve(true);
                  },
                  onHidden: ($event) => {
                    var _a2, _b;
                    return (_b = (_a2 = unref38(tools)).remove) == null ? void 0 : _b.call(_a2, self2);
                  }
                }), null, 16, ["modelValue", "onUpdate:modelValue", "onHide", "onHidden"]);
              }), 128))
            ], 16)
          ];
        }),
        _: 1
      }, 8, ["to", "disabled"]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BNavText.vue_vue_type_script_setup_true_lang-BwWo3o9v.mjs
import { defineComponent as defineComponent41, computed as computed56, openBlock as openBlock38, createBlock as createBlock31, resolveDynamicComponent as resolveDynamicComponent24, unref as unref39, normalizeClass as normalizeClass30, withCtx as withCtx30, renderSlot as renderSlot34, useAttrs as useAttrs6, createElementBlock as createElementBlock27, mergeProps as mergeProps23, createVNode as createVNode10, withModifiers as withModifiers2, mergeModels as mergeModels17, useModel as useModel17, useTemplateRef as useTemplateRef18, createTextVNode as createTextVNode22, toDisplayString as toDisplayString24 } from "vue";
var _sfc_main$43 = defineComponent41({
  __name: "BNav",
  props: {
    align: { default: void 0 },
    cardHeader: { type: Boolean, default: false },
    fill: { type: Boolean, default: false },
    justified: { type: Boolean, default: false },
    pills: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    tabs: { type: Boolean, default: false },
    tag: { default: "ul" },
    underline: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BNav");
    const alignment = useAlignment(() => props.align);
    const computedClasses = computed56(() => ({
      "nav-tabs": props.tabs,
      "nav-pills": props.pills && !props.tabs,
      "card-header-tabs": !props.vertical && props.cardHeader && props.tabs,
      "card-header-pills": !props.vertical && props.cardHeader && props.pills && !props.tabs,
      "flex-column": props.vertical,
      "nav-fill": !props.vertical && props.fill,
      "nav-justified": !props.vertical && props.justified,
      [alignment.value]: !props.vertical && props.align !== void 0,
      "small": props.small,
      "nav-underline": props.underline
    }));
    return (_ctx, _cache) => {
      return openBlock38(), createBlock31(resolveDynamicComponent24(unref39(props).tag), {
        class: normalizeClass30(["nav", computedClasses.value])
      }, {
        default: withCtx30(() => [
          renderSlot34(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
});
var _sfc_main$34 = defineComponent41({
  ...{
    inheritAttrs: false
  },
  __name: "BNavForm",
  props: {
    role: { default: void 0 },
    wrapperAttrs: { default: void 0 },
    formClass: { default: void 0 },
    floating: { type: Boolean, default: void 0 },
    id: { default: void 0 },
    novalidate: { type: Boolean, default: void 0 },
    validated: { type: Boolean, default: void 0 }
  },
  emits: ["submit"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BNavForm");
    const emit = __emit;
    const { class: wrapperClass, ...attrs } = useAttrs6();
    const submitted = (e) => {
      emit("submit", e);
    };
    const liClasses = computed56(() => [
      "d-flex",
      "flex-row",
      "align-items-center",
      "flex-wrap",
      wrapperClass
    ]);
    return (_ctx, _cache) => {
      return openBlock38(), createElementBlock27("li", mergeProps23({ class: liClasses.value }, _ctx.wrapperAttrs), [
        createVNode10(_sfc_main24, mergeProps23(attrs, {
          id: unref39(props).id,
          floating: unref39(props).floating,
          role: unref39(props).role,
          novalidate: unref39(props).novalidate,
          validated: unref39(props).validated,
          class: ["d-flex", unref39(props).formClass],
          onSubmit: withModifiers2(submitted, ["prevent"])
        }), {
          default: withCtx30(() => [
            renderSlot34(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16, ["id", "floating", "role", "novalidate", "validated", "class"])
      ], 16);
    };
  }
});
var _hoisted_1$22 = { class: "nav-item" };
var _sfc_main$24 = defineComponent41({
  __name: "BNavItem",
  props: {
    linkAttrs: { default: void 0 },
    linkClass: { default: void 0 },
    active: { type: Boolean, default: void 0 },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    icon: { type: Boolean, default: void 0 },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: void 0 },
    variant: { default: void 0 }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BNavItem");
    const emit = __emit;
    const computedLinkProps = computed56(
      () => pick(props, [
        "active",
        "activeClass",
        "exactActiveClass",
        "append",
        "disabled",
        "href",
        "icon",
        "opacity",
        "opacityHover",
        "rel",
        "replace",
        "routerComponentName",
        "target",
        "to",
        "underlineOffset",
        "underlineOffsetHover",
        "underlineOpacity",
        "underlineOpacityHover",
        "underlineVariant",
        "variant"
      ])
    );
    return (_ctx, _cache) => {
      return openBlock38(), createElementBlock27("li", _hoisted_1$22, [
        createVNode10(_sfc_main7, mergeProps23({
          class: ["nav-link", _ctx.linkClass],
          tabindex: unref39(props).disabled ? -1 : void 0,
          "aria-disabled": unref39(props).disabled ? true : void 0
        }, { ...computedLinkProps.value, ..._ctx.linkAttrs }, {
          onClick: _cache[0] || (_cache[0] = ($event) => emit("click", $event))
        }), {
          default: withCtx30(() => [
            renderSlot34(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16, ["class", "tabindex", "aria-disabled"])
      ]);
    };
  }
});
var _hoisted_1$19 = { class: "nav-item dropdown" };
var _sfc_main$118 = defineComponent41({
  __name: "BNavItemDropdown",
  props: mergeModels17({
    ariaLabel: { default: void 0 },
    autoClose: { type: [Boolean, String], default: true },
    boundary: { default: "clippingAncestors" },
    boundaryPadding: { default: void 0 },
    disabled: { type: Boolean, default: false },
    floatingMiddleware: { default: void 0 },
    id: { default: void 0 },
    isNav: { type: Boolean, default: true },
    menuClass: { default: void 0 },
    noCaret: { type: Boolean, default: false },
    noFlip: { type: Boolean, default: false },
    noShift: { type: Boolean, default: false },
    noSize: { type: Boolean, default: false },
    offset: { default: 0 },
    role: { default: "menu" },
    size: { default: "md" },
    noWrapper: { type: Boolean, default: void 0 },
    split: { type: Boolean, default: false },
    splitButtonType: { default: "button" },
    splitClass: { default: void 0 },
    splitDisabled: { type: Boolean, default: void 0 },
    splitHref: { default: void 0 },
    splitTo: { default: void 0 },
    splitVariant: { default: void 0 },
    strategy: { default: "absolute" },
    text: { default: void 0 },
    toggleClass: { default: void 0 },
    toggleText: { default: "Toggle dropdown" },
    variant: { default: "link" },
    wrapperClass: { default: void 0 },
    placement: { default: void 0 },
    teleportDisabled: { type: Boolean, default: false },
    teleportTo: { default: void 0 },
    initialAnimation: { type: Boolean, default: false },
    noAnimation: { type: Boolean },
    noFade: { type: Boolean },
    lazy: { type: Boolean, default: false },
    unmountLazy: { type: Boolean },
    show: { type: Boolean },
    transProps: {},
    visible: { type: Boolean }
  }, {
    "modelValue": { type: Boolean, ...{ default: false } },
    "modelModifiers": {}
  }),
  emits: mergeModels17(["click", "hidden", "hide", "hide-prevented", "show", "show-prevented", "shown", "toggle"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BNavItemDropdown");
    const emit = __emit;
    const modelValue = useModel17(__props, "modelValue");
    const dropdown = useTemplateRef18("_dropdown");
    const hide2 = () => {
      var _a;
      (_a = dropdown.value) == null ? void 0 : _a.hide();
    };
    const show = () => {
      var _a;
      (_a = dropdown.value) == null ? void 0 : _a.show();
    };
    const toggle2 = () => {
      var _a;
      (_a = dropdown.value) == null ? void 0 : _a.toggle();
    };
    __expose({
      hide: hide2,
      show,
      toggle: toggle2
    });
    return (_ctx, _cache) => {
      return openBlock38(), createElementBlock27("li", _hoisted_1$19, [
        createVNode10(BDropdown, mergeProps23({ ref: "_dropdown" }, unref39(props), {
          modelValue: modelValue.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
          "is-nav": "",
          onShow: _cache[1] || (_cache[1] = ($event) => emit("show", $event)),
          onShown: _cache[2] || (_cache[2] = ($event) => emit("shown", $event)),
          onHide: _cache[3] || (_cache[3] = ($event) => emit("hide", $event)),
          onHidden: _cache[4] || (_cache[4] = ($event) => emit("hidden", $event)),
          onHidePrevented: _cache[5] || (_cache[5] = ($event) => emit("hide-prevented", $event)),
          onShowPrevented: _cache[6] || (_cache[6] = ($event) => emit("show-prevented", $event)),
          onClick: _cache[7] || (_cache[7] = ($event) => emit("click", $event)),
          onToggle: _cache[8] || (_cache[8] = ($event) => emit("toggle", $event))
        }), {
          "button-content": withCtx30(() => [
            renderSlot34(_ctx.$slots, "button-content")
          ]),
          "toggle-text": withCtx30(() => [
            renderSlot34(_ctx.$slots, "toggle-text")
          ]),
          default: withCtx30(() => [
            renderSlot34(_ctx.$slots, "default", {
              hide: hide2,
              show
            })
          ]),
          _: 3
        }, 16, ["modelValue"])
      ]);
    };
  }
});
var _hoisted_126 = { class: "navbar-text" };
var _sfc_main40 = defineComponent41({
  __name: "BNavText",
  props: {
    text: { default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BNavText");
    return (_ctx, _cache) => {
      return openBlock38(), createElementBlock27("li", _hoisted_126, [
        renderSlot34(_ctx.$slots, "default", {}, () => [
          createTextVNode22(toDisplayString24(unref39(props).text), 1)
        ])
      ]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BNavbarToggle.vue_vue_type_script_setup_true_lang-CHv3aBZ-.mjs
import { computed as computed57, toValue as toValue16, defineComponent as defineComponent42, provide as provide13, toRef as toRef17, openBlock as openBlock39, createBlock as createBlock32, resolveDynamicComponent as resolveDynamicComponent25, unref as unref40, normalizeClass as normalizeClass31, withCtx as withCtx31, createElementBlock as createElementBlock28, renderSlot as renderSlot35, mergeProps as mergeProps24, inject as inject19, createElementVNode as createElementVNode16 } from "vue";
var useContainerClasses = (value) => computed57(() => {
  const resolvedValue = toValue16(value);
  return {
    container: resolvedValue === true,
    [`container-${resolvedValue}`]: typeof resolvedValue === "string"
  };
});
var _sfc_main$35 = defineComponent42({
  __name: "BNavbar",
  props: {
    autoClose: { type: Boolean, default: true },
    container: { type: [Boolean, String], default: "fluid" },
    fixed: { default: void 0 },
    print: { type: Boolean, default: false },
    sticky: { default: void 0 },
    tag: { default: "nav" },
    toggleable: { type: [Boolean, String], default: false },
    variant: { default: null }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BNavbar");
    const computedRole = computed57(() => props.tag === "nav" ? void 0 : "navigation");
    const containerClass = useContainerClasses(() => props.container);
    const colorClasses = useColorVariantClasses(
      computed57(() => ({
        bgVariant: props.variant
      }))
    );
    const computedClasses = computed57(() => [
      colorClasses.value,
      {
        "d-print": props.print,
        [`sticky-${props.sticky}`]: props.sticky !== void 0,
        [`fixed-${props.fixed}`]: props.fixed !== void 0,
        "navbar-expand": props.toggleable === false,
        [`navbar-expand-${props.toggleable}`]: typeof props.toggleable === "string"
      }
    ]);
    provide13(navbarInjectionKey, {
      tag: toRef17(() => props.tag),
      autoClose: toRef17(() => props.autoClose)
    });
    return (_ctx, _cache) => {
      return openBlock39(), createBlock32(resolveDynamicComponent25(unref40(props).tag), {
        class: normalizeClass31(["navbar", computedClasses.value]),
        role: computedRole.value
      }, {
        default: withCtx31(() => [
          unref40(props).container !== false ? (openBlock39(), createElementBlock28("div", {
            key: 0,
            class: normalizeClass31(unref40(containerClass))
          }, [
            renderSlot35(_ctx.$slots, "default")
          ], 2)) : renderSlot35(_ctx.$slots, "default", { key: 1 })
        ]),
        _: 3
      }, 8, ["class", "role"]);
    };
  }
});
var _sfc_main$25 = defineComponent42({
  __name: "BNavbarBrand",
  props: {
    tag: { default: "div" },
    active: { type: Boolean, default: void 0 },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    icon: { type: Boolean, default: void 0 },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: void 0 },
    variant: { default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BNavbarBrand");
    const { computedLink, computedLinkProps } = useBLinkHelper(props, [
      "active",
      "activeClass",
      "append",
      "disabled",
      "href",
      "rel",
      "replace",
      "routerComponentName",
      "target",
      "to",
      "variant",
      "opacity",
      "opacityHover",
      "underlineVariant",
      "underlineOffset",
      "underlineOffsetHover",
      "underlineOpacity",
      "underlineOpacityHover",
      "icon"
    ]);
    const computedTag = computed57(() => computedLink.value ? _sfc_main7 : props.tag);
    return (_ctx, _cache) => {
      return openBlock39(), createBlock32(resolveDynamicComponent25(computedTag.value), mergeProps24({ class: "navbar-brand" }, unref40(computedLinkProps)), {
        default: withCtx31(() => [
          renderSlot35(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
var _sfc_main$119 = defineComponent42({
  __name: "BNavbarNav",
  props: {
    align: { default: void 0 },
    fill: { type: Boolean, default: false },
    justified: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    tag: { default: "ul" }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BNavbarNav");
    const alignment = useAlignment(() => props.align);
    const computedClasses = computed57(() => ({
      "nav-fill": props.fill,
      "nav-justified": props.justified,
      [alignment.value]: props.align !== void 0,
      "small": props.small
    }));
    return (_ctx, _cache) => {
      return openBlock39(), createElementBlock28("ul", {
        class: normalizeClass31(["navbar-nav", computedClasses.value])
      }, [
        renderSlot35(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var _hoisted_127 = ["disabled", "aria-label"];
var _sfc_main41 = defineComponent42({
  __name: "BNavbarToggle",
  props: {
    disabled: { type: Boolean, default: false },
    label: { default: "Toggle navigation" },
    target: { default: void 0 }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BNavbarToggle");
    const emit = __emit;
    const computedClasses = computed57(() => ({
      disabled: props.disabled
    }));
    const collapseData = inject19(globalCollapseStorageInjectionKey, void 0);
    const collapseExpanded = computed57(() => {
      var _a;
      if (!props.target || !collapseData)
        return false;
      if (typeof props.target === "string")
        return ((_a = collapseData.map[props.target]) == null ? void 0 : _a.value) || false;
      return props.target.some((target) => {
        var _a2;
        return (_a2 = collapseData.map[target]) == null ? void 0 : _a2.value;
      });
    });
    const toggleExpand = () => {
      var _a;
      if (!props.target || !collapseData)
        return;
      if (typeof props.target === "string") {
        (_a = collapseData.map[props.target]) == null ? void 0 : _a.toggle();
        return;
      }
      props.target.forEach((target) => {
        var _a2;
        return (_a2 = collapseData.map[target]) == null ? void 0 : _a2.toggle();
      });
    };
    const onClick = (e) => {
      if (!props.disabled) {
        emit("click", e);
        toggleExpand();
      }
    };
    return (_ctx, _cache) => {
      return openBlock39(), createElementBlock28("button", {
        class: normalizeClass31(["navbar-toggler", computedClasses.value]),
        type: "button",
        disabled: unref40(props).disabled,
        "aria-label": unref40(props).label,
        onClick
      }, [
        renderSlot35(_ctx.$slots, "default", { expanded: collapseExpanded.value }, () => [
          _cache[0] || (_cache[0] = createElementVNode16("span", { class: "navbar-toggler-icon" }, null, -1))
        ])
      ], 10, _hoisted_127);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BOffcanvas-jNrNrzFs.mjs
import { defineComponent as defineComponent43, mergeModels as mergeModels18, useSlots as useSlots13, useModel as useModel18, ref as ref16, useTemplateRef as useTemplateRef19, computed as computed58, watch as watch16, openBlock as openBlock40, createBlock as createBlock33, unref as unref41, withCtx as withCtx32, Transition as Transition6, mergeProps as mergeProps25, withDirectives as withDirectives9, createElementVNode as createElementVNode17, createElementBlock as createElementBlock29, Fragment as Fragment15, normalizeClass as normalizeClass32, renderSlot as renderSlot36, normalizeProps as normalizeProps7, guardReactiveProps as guardReactiveProps5, createTextVNode as createTextVNode23, toDisplayString as toDisplayString25, createCommentVNode as createCommentVNode18, vShow as vShow6, nextTick as nextTick11 } from "vue";
var _hoisted_128 = ["id", "aria-labelledby"];
var _hoisted_215 = ["id"];
var fallbackClassSelector2 = "offcanvas-fallback-focus";
var _sfc_main42 = defineComponent43({
  ...{
    inheritAttrs: false
  },
  __name: "BOffcanvas",
  props: mergeModels18({
    noBackdrop: { type: Boolean, default: false },
    backdropFirst: { type: Boolean, default: false },
    bodyAttrs: { default: void 0 },
    bodyClass: { default: void 0 },
    bodyScrolling: { type: Boolean, default: false },
    footerClass: { default: void 0 },
    headerClass: { default: void 0 },
    headerCloseClass: { default: void 0 },
    headerCloseLabel: { default: "Close" },
    headerCloseVariant: { default: "secondary" },
    id: { default: void 0 },
    noCloseOnBackdrop: { type: Boolean, default: false },
    noCloseOnEsc: { type: Boolean, default: false },
    noFocus: { type: Boolean, default: false },
    noHeader: { type: Boolean, default: false },
    noTrap: { type: Boolean, default: false },
    noHeaderClose: { type: Boolean, default: false },
    placement: { default: "start" },
    shadow: { type: [String, Boolean], default: false },
    title: { default: void 0 },
    responsive: {},
    width: { default: void 0 },
    teleportDisabled: { type: Boolean, default: false },
    teleportTo: { default: "body" },
    initialAnimation: { type: Boolean, default: false },
    noAnimation: { type: Boolean, default: false },
    noFade: { type: Boolean },
    lazy: { type: Boolean, default: false },
    unmountLazy: { type: Boolean, default: false },
    show: { type: Boolean, default: false },
    transProps: {},
    visible: { type: Boolean, default: false }
  }, {
    "modelValue": { type: Boolean, ...{
      default: false
    } },
    "modelModifiers": {}
  }),
  emits: mergeModels18(["close", "esc", "backdrop", "breakpoint", "hidden", "hide", "hide-prevented", "show", "show-prevented", "shown"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BOffcanvas");
    const emit = __emit;
    const slots = useSlots13();
    const modelValue = useModel18(__props, "modelValue");
    const computedId = useId(() => props.id, "offcanvas");
    const breakpoints = useBreakpoints(breakpointsBootstrapV5);
    const smallerOrEqualToBreakpoint = breakpoints.smallerOrEqual(() => props.responsive ?? "xs");
    const isOpenByBreakpoint = ref16(props.responsive !== void 0 && !smallerOrEqualToBreakpoint.value);
    const element = useTemplateRef19("_element");
    const fallbackFocusElement = useTemplateRef19("_fallbackFocusElement");
    const onAfterEnter = () => {
      nextTick11(() => {
        if (props.noFocus === false && !isOpenByBreakpoint.value) {
          focused.value = true;
        }
      });
    };
    const {
      showRef,
      renderRef,
      renderBackdropRef,
      hide: hide2,
      show,
      toggle: toggle2,
      computedNoAnimation,
      contentShowing,
      transitionProps,
      backdropReady,
      backdropTransitionProps,
      backdropVisible,
      isVisible: isVisible2,
      buildTriggerableEvent,
      localNoAnimation,
      isLeaving,
      trapActive
    } = useShowHide(modelValue, props, emit, element, computedId, {
      transitionProps: {
        onAfterEnter,
        enterToClass: "showing",
        leaveToClass: "hiding",
        enterActiveClass: "",
        leaveActiveClass: "",
        enterFromClass: "",
        leaveFromClass: ""
      }
    });
    useSafeScrollLock(showRef, () => props.bodyScrolling || isOpenByBreakpoint.value);
    onKeyStroke(
      "Escape",
      () => {
        hide2("esc");
      },
      { target: element }
    );
    const { focused } = useFocus(element, {
      initialValue: modelValue.value && props.noFocus === false && !isOpenByBreakpoint.value
    });
    const { needsFallback } = useActivatedFocusTrap({
      element,
      isActive: trapActive,
      noTrap: () => props.noTrap || isOpenByBreakpoint.value,
      fallbackFocus: {
        classSelector: fallbackClassSelector2,
        ref: fallbackFocusElement
      }
    });
    const showBackdrop = computed58(
      () => (props.responsive === void 0 || !isOpenByBreakpoint.value) && props.noBackdrop === false && (showRef.value === true || isLeaving.value && props.backdropFirst && !computedNoAnimation.value)
    );
    const hasHeaderCloseSlot = computed58(() => !isEmptySlot(slots["header-close"]));
    const headerCloseClasses = computed58(() => [
      { "text-reset": !hasHeaderCloseSlot.value },
      props.headerCloseClass
    ]);
    const headerCloseAttrs = computed58(() => ({
      variant: hasHeaderCloseSlot.value ? props.headerCloseVariant : void 0,
      class: headerCloseClasses.value
    }));
    const hasFooterSlot = computed58(() => !isEmptySlot(slots.footer));
    const computedClasses = computed58(() => [
      props.responsive === void 0 ? "offcanvas" : `offcanvas-${props.responsive}`,
      `offcanvas-${props.placement}`,
      {
        "show": isVisible2.value,
        [`shadow-${props.shadow}`]: !!props.shadow,
        "no-transition": computedNoAnimation.value
      }
    ]);
    const computedStyles = computed58(() => ({
      width: props.width
    }));
    const sharedSlots = computed58(() => ({
      visible: showRef.value,
      placement: props.placement,
      hide: hide2
    }));
    watch16(smallerOrEqualToBreakpoint, (newValue) => {
      if (props.responsive === void 0)
        return;
      if (newValue === true) {
        localNoAnimation.value = true;
        requestAnimationFrame(() => {
          isOpenByBreakpoint.value = false;
        });
        emit("breakpoint", buildTriggerableEvent("breakpoint"));
        emit("hide", buildTriggerableEvent("hide"));
      } else {
        localNoAnimation.value = true;
        requestAnimationFrame(() => {
          isOpenByBreakpoint.value = true;
        });
        emit("breakpoint", buildTriggerableEvent("breakpoint"));
        emit("show", buildTriggerableEvent("show"));
      }
    });
    __expose({
      hide: hide2,
      show,
      toggle: toggle2
    });
    return (_ctx, _cache) => {
      return openBlock40(), createBlock33(_sfc_main, {
        to: unref41(props).teleportTo,
        disabled: unref41(props).teleportDisabled || isOpenByBreakpoint.value
      }, {
        default: withCtx32(() => [
          unref41(renderRef) || unref41(contentShowing) || isOpenByBreakpoint.value ? (openBlock40(), createBlock33(Transition6, mergeProps25({ key: 0 }, unref41(transitionProps), {
            appear: modelValue.value || isOpenByBreakpoint.value
          }), {
            default: withCtx32(() => [
              withDirectives9(createElementVNode17("div", mergeProps25({
                id: unref41(computedId),
                ref: "_element",
                "aria-modal": "true",
                role: "dialog",
                class: computedClasses.value,
                style: computedStyles.value,
                tabindex: "-1",
                "aria-labelledby": `${unref41(computedId)}-offcanvas-label`,
                "data-bs-backdrop": "false"
              }, _ctx.$attrs), [
                unref41(contentShowing) || isOpenByBreakpoint.value ? (openBlock40(), createElementBlock29(Fragment15, { key: 0 }, [
                  !unref41(props).noHeader ? (openBlock40(), createElementBlock29("div", {
                    key: 0,
                    class: normalizeClass32(["offcanvas-header", unref41(props).headerClass])
                  }, [
                    renderSlot36(_ctx.$slots, "header", normalizeProps7(guardReactiveProps5(sharedSlots.value)), () => [
                      createElementVNode17("h5", {
                        id: `${unref41(computedId)}-offcanvas-label`,
                        class: "offcanvas-title"
                      }, [
                        renderSlot36(_ctx.$slots, "title", normalizeProps7(guardReactiveProps5(sharedSlots.value)), () => [
                          createTextVNode23(toDisplayString25(unref41(props).title), 1)
                        ], true)
                      ], 8, _hoisted_215),
                      !unref41(props).noHeaderClose ? (openBlock40(), createElementBlock29(Fragment15, { key: 0 }, [
                        hasHeaderCloseSlot.value ? (openBlock40(), createBlock33(_sfc_main8, mergeProps25({ key: 0 }, headerCloseAttrs.value, {
                          onClick: _cache[0] || (_cache[0] = ($event) => unref41(hide2)("close"))
                        }), {
                          default: withCtx32(() => [
                            renderSlot36(_ctx.$slots, "header-close", {}, void 0, true)
                          ]),
                          _: 3
                        }, 16)) : (openBlock40(), createBlock33(_sfc_main5, mergeProps25({
                          key: 1,
                          "aria-label": unref41(props).headerCloseLabel
                        }, headerCloseAttrs.value, {
                          onClick: _cache[1] || (_cache[1] = ($event) => unref41(hide2)("close"))
                        }), null, 16, ["aria-label"]))
                      ], 64)) : createCommentVNode18("", true)
                    ], true)
                  ], 2)) : createCommentVNode18("", true),
                  createElementVNode17("div", mergeProps25({
                    class: ["offcanvas-body", unref41(props).bodyClass]
                  }, unref41(props).bodyAttrs), [
                    renderSlot36(_ctx.$slots, "default", normalizeProps7(guardReactiveProps5(sharedSlots.value)), void 0, true)
                  ], 16),
                  hasFooterSlot.value ? (openBlock40(), createElementBlock29("div", {
                    key: 1,
                    class: normalizeClass32(unref41(props).footerClass)
                  }, [
                    renderSlot36(_ctx.$slots, "footer", normalizeProps7(guardReactiveProps5(sharedSlots.value)), void 0, true)
                  ], 2)) : createCommentVNode18("", true)
                ], 64)) : createCommentVNode18("", true),
                unref41(needsFallback) ? (openBlock40(), createElementBlock29("div", {
                  key: 1,
                  ref: "_fallbackFocusElement",
                  class: normalizeClass32(fallbackClassSelector2),
                  tabindex: "0",
                  style: { "width": "0", "height": "0", "overflow": "hidden" }
                }, null, 512)) : createCommentVNode18("", true)
              ], 16, _hoisted_128), [
                [
                  vShow6,
                  unref41(showRef) && (unref41(backdropReady) && unref41(props).backdropFirst || !unref41(props).backdropFirst) || isOpenByBreakpoint.value
                ]
              ])
            ]),
            _: 3
          }, 16, ["appear"])) : createCommentVNode18("", true),
          !unref41(props).noBackdrop ? renderSlot36(_ctx.$slots, "backdrop", normalizeProps7(mergeProps25({ key: 1 }, sharedSlots.value)), () => [
            unref41(renderBackdropRef) ? (openBlock40(), createBlock33(Transition6, normalizeProps7(mergeProps25({ key: 0 }, unref41(backdropTransitionProps))), {
              default: withCtx32(() => [
                withDirectives9(createElementVNode17("div", {
                  class: normalizeClass32(["offcanvas-backdrop", {
                    fade: !unref41(computedNoAnimation),
                    show: unref41(backdropVisible) || unref41(computedNoAnimation)
                  }]),
                  onClick: _cache[2] || (_cache[2] = ($event) => unref41(hide2)("backdrop"))
                }, null, 2), [
                  [vShow6, showBackdrop.value]
                ])
              ]),
              _: 1
            }, 16)) : createCommentVNode18("", true)
          ], true) : createCommentVNode18("", true)
        ]),
        _: 3
      }, 8, ["to", "disabled"]);
    };
  }
});
var BOffcanvas = _export_sfc(_sfc_main42, [["__scopeId", "data-v-8fe56874"]]);

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BOverlay.vue_vue_type_script_setup_true_lang-D5QxBmgl.mjs
import { defineComponent as defineComponent44, computed as computed59, openBlock as openBlock41, createBlock as createBlock34, unref as unref42, withCtx as withCtx33, renderSlot as renderSlot37, createVNode as createVNode11, Transition as Transition7, mergeProps as mergeProps26, resolveDynamicComponent as resolveDynamicComponent26, normalizeClass as normalizeClass33, normalizeStyle as normalizeStyle7, createElementVNode as createElementVNode18, normalizeProps as normalizeProps8, guardReactiveProps as guardReactiveProps6, createCommentVNode as createCommentVNode19 } from "vue";
var _sfc_main43 = defineComponent44({
  __name: "BOverlay",
  props: {
    bgColor: { default: void 0 },
    blur: { default: "2px" },
    fixed: { type: Boolean, default: false },
    noCenter: { type: Boolean, default: false },
    noFade: { type: Boolean, default: false },
    noSpinner: { type: Boolean, default: false },
    noWrap: { type: Boolean, default: false },
    opacity: { default: 0.85 },
    overlayTag: { default: "div" },
    show: { type: Boolean, default: false },
    spinnerSmall: { type: Boolean, default: false },
    spinnerType: { default: "border" },
    spinnerVariant: { default: void 0 },
    variant: { default: "light" },
    wrapTag: { default: "div" },
    zIndex: { default: 10 },
    rounded: { type: [Boolean, String, Number], default: false },
    roundedTop: { type: [Boolean, String, Number], default: void 0 },
    roundedBottom: { type: [Boolean, String, Number], default: void 0 },
    roundedStart: { type: [Boolean, String, Number], default: void 0 },
    roundedEnd: { type: [Boolean, String, Number], default: void 0 }
  },
  emits: ["click", "hidden", "shown"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BOverlay");
    const emit = __emit;
    const positionStyles = { top: 0, left: 0, bottom: 0, right: 0 };
    const fadeTransitions = useFadeTransition(() => !props.noFade);
    const radiusElementClasses = useRadiusElementClasses(() => ({
      rounded: props.rounded,
      roundedTop: props.roundedTop,
      roundedBottom: props.roundedBottom,
      roundedStart: props.roundedStart,
      roundedEnd: props.roundedEnd
    }));
    const computedAriaBusy = computed59(() => props.show ? true : null);
    const spinnerAttrs = computed59(() => ({
      type: props.spinnerType,
      variant: props.spinnerVariant,
      small: props.spinnerSmall
    }));
    const overlayStyles = computed59(() => ({
      ...positionStyles,
      zIndex: props.zIndex || 10
    }));
    const overlayClasses = computed59(() => ({
      "position-absolute": !props.noWrap || !props.fixed,
      "position-fixed": props.noWrap && props.fixed
    }));
    const colorClasses = useColorVariantClasses(
      computed59(() => ({
        bgVariant: props.variant !== null && !props.bgColor ? props.variant : null
      }))
    );
    const blurClasses = computed59(() => [colorClasses.value, radiusElementClasses.value]);
    const blurStyles = computed59(() => ({
      ...positionStyles,
      opacity: props.opacity,
      backgroundColor: props.bgColor || void 0,
      backdropFilter: props.blur ? `blur(${props.blur})` : void 0
    }));
    const spinWrapperStyles = computed59(
      () => props.noCenter ? positionStyles : {
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)"
      }
    );
    return (_ctx, _cache) => {
      return openBlock41(), createBlock34(_sfc_main10, {
        tag: unref42(props).wrapTag,
        class: "b-overlay-wrap position-relative",
        "aria-busy": computedAriaBusy.value,
        skip: unref42(props).noWrap
      }, {
        default: withCtx33(() => [
          renderSlot37(_ctx.$slots, "default"),
          createVNode11(Transition7, mergeProps26(unref42(fadeTransitions), {
            "enter-to-class": "show",
            name: "fade",
            onAfterEnter: _cache[1] || (_cache[1] = ($event) => emit("shown")),
            onAfterLeave: _cache[2] || (_cache[2] = ($event) => emit("hidden"))
          }), {
            default: withCtx33(() => [
              unref42(props).show ? (openBlock41(), createBlock34(resolveDynamicComponent26(unref42(props).overlayTag), {
                key: 0,
                class: normalizeClass33(["b-overlay", overlayClasses.value]),
                style: normalizeStyle7(overlayStyles.value),
                onClick: _cache[0] || (_cache[0] = ($event) => emit("click", $event))
              }, {
                default: withCtx33(() => [
                  createElementVNode18("div", {
                    class: normalizeClass33(["position-absolute", blurClasses.value]),
                    style: normalizeStyle7(blurStyles.value)
                  }, null, 6),
                  createElementVNode18("div", {
                    class: "position-absolute",
                    style: normalizeStyle7(spinWrapperStyles.value)
                  }, [
                    renderSlot37(_ctx.$slots, "overlay", normalizeProps8(guardReactiveProps6(spinnerAttrs.value)), () => [
                      !unref42(props).noSpinner ? (openBlock41(), createBlock34(_sfc_main6, normalizeProps8(mergeProps26({ key: 0 }, spinnerAttrs.value)), null, 16)) : createCommentVNode19("", true)
                    ])
                  ], 4)
                ]),
                _: 3
              }, 8, ["class", "style"])) : createCommentVNode19("", true)
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      }, 8, ["tag", "aria-busy", "skip"]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BPagination.vue_vue_type_script_setup_true_lang-FDkSHePk.mjs
import { defineComponent as defineComponent45, mergeModels as mergeModels19, useModel as useModel19, useTemplateRef as useTemplateRef20, computed as computed60, watch as watch17, openBlock as openBlock42, createElementBlock as createElementBlock30, normalizeClass as normalizeClass34, unref as unref43, Fragment as Fragment16, renderList as renderList9, mergeProps as mergeProps27, renderSlot as renderSlot38, createTextVNode as createTextVNode24, toDisplayString as toDisplayString26, createBlock as createBlock35, resolveDynamicComponent as resolveDynamicComponent27, withCtx as withCtx34, nextTick as nextTick12 } from "vue";
var _hoisted_129 = ["aria-disabled", "aria-label"];
var DEFAULT_PER_PAGE = 20;
var DEFAULT_TOTAL_ROWS = 0;
var _sfc_main44 = defineComponent45({
  __name: "BPagination",
  props: mergeModels19({
    align: { default: "start" },
    ariaControls: { default: void 0 },
    ariaLabel: { default: "Pagination" },
    disabled: { type: Boolean, default: false },
    ellipsisClass: { default: void 0 },
    ellipsisText: { default: "…" },
    firstClass: { default: void 0 },
    firstNumber: { type: Boolean, default: false },
    firstText: { default: "«" },
    noEllipsis: { type: Boolean, default: false },
    noGotoEndButtons: { type: Boolean, default: false },
    labelFirstPage: { default: "Go to first page" },
    labelLastPage: { default: "Go to last page" },
    labelNextPage: { default: "Go to next page" },
    labelPage: { default: "Go to page" },
    labelPrevPage: { default: "Go to previous page" },
    lastClass: { default: void 0 },
    lastNumber: { type: Boolean, default: false },
    lastText: { default: "»" },
    limit: { default: 5 },
    nextClass: { default: void 0 },
    nextText: { default: "›" },
    pageClass: { default: void 0 },
    perPage: { default: DEFAULT_PER_PAGE },
    pills: { type: Boolean, default: false },
    prevClass: { default: void 0 },
    prevText: { default: "‹" },
    size: { default: void 0 },
    totalRows: { default: DEFAULT_TOTAL_ROWS }
  }, {
    "modelValue": { default: 1 },
    "modelModifiers": {}
  }),
  emits: mergeModels19(["page-click"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const ELLIPSIS_THRESHOLD = 3;
    const FIRST_BUTTON = -1;
    const PREV_BUTTON = -2;
    const NEXT_BUTTON = -3;
    const LAST_BUTTON = -4;
    const FIRST_ELLIPSIS = -5;
    const LAST_ELLIPSIS = -6;
    const _props = __props;
    const props = useDefaults(_props, "BPagination");
    const emit = __emit;
    const modelValue = useModel19(__props, "modelValue");
    const pageElements = useTemplateRef20("_pageElements");
    const limitNumber = useToNumber(() => props.limit, { nanToZero: true, method: "parseInt" });
    const perPageNumber = useToNumber(() => props.perPage, { nanToZero: true, method: "parseInt" });
    const totalRowsNumber = useToNumber(() => props.totalRows, { nanToZero: true, method: "parseInt" });
    const modelValueNumber = useToNumber(modelValue, { nanToZero: true, method: "parseInt" });
    const perPageSanitized = computed60(() => Math.max(perPageNumber.value || DEFAULT_PER_PAGE, 1));
    const totalRowsSanitized = computed60(() => Math.max(totalRowsNumber.value || DEFAULT_TOTAL_ROWS, 0));
    const numberOfPages = computed60(() => Math.ceil(totalRowsSanitized.value / perPageSanitized.value));
    const computedFill = computed60(() => props.align === "fill");
    const justifyAlign = computed60(() => props.align === "fill" ? "start" : props.align);
    const alignment = useAlignment(justifyAlign);
    const isActivePage = (pageNumber) => pageNumber === modelValueNumber.value;
    const getTabIndex3 = (num) => props.disabled ? null : isActivePage(num) ? "0" : "-1";
    const checkDisabled = (num) => props.disabled || isActivePage(num) || modelValueNumber.value < 1 || // Check if the number is out of bounds
    num < 1 || num > numberOfPages.value;
    const firstDisabled = computed60(() => checkDisabled(1));
    const prevDisabled = computed60(() => checkDisabled(modelValueNumber.value - 1));
    const lastDisabled = computed60(() => checkDisabled(numberOfPages.value));
    const nextDisabled = computed60(() => checkDisabled(modelValueNumber.value + 1));
    const getBaseButtonProps = ({
      page,
      classVal,
      disabled,
      slotName,
      textValue,
      tabIndex,
      label,
      position,
      isActive,
      role,
      hidden,
      isSmHidden
    }) => ({
      li: {
        "class": [
          "page-item",
          {
            "active": isActive,
            disabled,
            "bv-d-sm-down-none": isSmHidden,
            "flex-fill": computedFill.value,
            "d-flex": computedFill.value && !disabled
          },
          classVal
        ],
        role,
        "aria-hidden": hidden
      },
      button: {
        "is": disabled ? "span" : "button",
        "class": ["page-link", "text-center", { "flex-grow-1": !disabled && computedFill.value }],
        "aria-label": label,
        "aria-controls": props.ariaControls || void 0,
        "aria-disabled": disabled ? true : void 0,
        "aria-posinset": position,
        "aria-setsize": position ? numberOfPages.value : void 0,
        "role": "menuitem",
        "type": disabled ? void 0 : "button",
        "tabindex": disabled ? void 0 : tabIndex
      },
      text: {
        name: slotName,
        active: isActive,
        value: textValue ?? page,
        page,
        disabled,
        index: page - 1,
        content: textValue ? void 0 : page
      },
      clickHandler: (e) => pageClick(e, page)
    });
    const getButtonProps = ({
      page,
      classVal,
      disabled,
      slotName,
      textValue,
      label
    }) => getBaseButtonProps({ page, classVal, disabled, slotName, textValue, label, tabIndex: "-1" });
    const getPageButtonProps = (page, isSmHidden) => getBaseButtonProps({
      page,
      disabled: props.disabled,
      classVal: props.pageClass,
      slotName: "page",
      label: props.labelPage ? `${props.labelPage} ${page}` : void 0,
      tabIndex: getTabIndex3(page) ?? void 0,
      position: page,
      isActive: isActivePage(page),
      isSmHidden
    });
    const firstButtonProps = computed60(
      () => getButtonProps({
        page: 1,
        disabled: firstDisabled.value,
        classVal: props.firstClass,
        slotName: "first-text",
        textValue: props.firstText,
        label: props.labelFirstPage
      })
    );
    const prevButtonProps = computed60(
      () => getButtonProps({
        page: Math.max(modelValueNumber.value - 1, 1),
        disabled: prevDisabled.value,
        classVal: props.prevClass,
        slotName: "prev-text",
        textValue: props.prevText,
        label: props.labelPrevPage
      })
    );
    const nextButtonProps = computed60(
      () => getButtonProps({
        page: Math.min(modelValueNumber.value + 1, numberOfPages.value),
        disabled: nextDisabled.value,
        classVal: props.nextClass,
        slotName: "next-text",
        textValue: props.nextText,
        label: props.labelNextPage
      })
    );
    const lastButtonProps = computed60(
      () => getButtonProps({
        page: numberOfPages.value,
        disabled: lastDisabled.value,
        classVal: props.lastClass,
        slotName: "last-text",
        textValue: props.lastText,
        label: props.labelLastPage
      })
    );
    const ellipsisProps = computed60(() => ({
      li: {
        class: [
          "page-item",
          "disabled",
          "text-center",
          "bv-d-sm-down-none",
          computedFill.value ? "flex-fill" : "",
          props.ellipsisClass
        ],
        role: "separator"
      },
      span: {
        class: ["page-link"]
      }
    }));
    const computedWrapperClasses = computed60(() => [
      alignment.value,
      {
        [`pagination-${props.size}`]: props.size !== void 0,
        "b-pagination-pills": props.pills
      }
    ]);
    const pagination = computed60(() => ({
      pageSize: perPageSanitized.value,
      totalRows: totalRowsNumber.value,
      numberOfPages: numberOfPages.value
    }));
    const pageClick = (event, pageNumber) => {
      if (pageNumber === modelValueNumber.value)
        return;
      const clickEvent = new BvEvent("page-click", {
        cancelable: true,
        target: event.target
      });
      emit("page-click", clickEvent, pageNumber);
      if (clickEvent.defaultPrevented)
        return;
      modelValue.value = pageNumber;
    };
    const isDisabled = (el) => {
      const isElement2 = !!(el && el.nodeType === Node.ELEMENT_NODE);
      const hasAttr = isElement2 ? el.hasAttribute("disabled") : null;
      const hasClass = isElement2 && el.classList ? el.classList.contains("disabled") : false;
      return !isElement2 || el.disabled || hasAttr || hasClass;
    };
    const getButtons = () => {
      var _a;
      return ((_a = pageElements.value) == null ? void 0 : _a.map((page) => page.children[0]).filter((btn) => {
        if (btn.getAttribute("display") === "none") {
          return false;
        }
        const bcr = btn.getBoundingClientRect();
        return !!(bcr && bcr.height > 0 && bcr.width > 0);
      })) ?? [];
    };
    const focusFirst = () => {
      nextTick12(() => {
        const btn = getButtons().find((el) => !isDisabled(el));
        btn == null ? void 0 : btn.focus();
      });
    };
    const focusPrev = () => {
      nextTick12(() => {
        var _a;
        const buttons = getButtons();
        const index8 = buttons.indexOf(getActiveElement());
        if (index8 > 0 && !isDisabled(buttons[index8 - 1])) {
          (_a = buttons[index8 - 1]) == null ? void 0 : _a.focus();
        }
      });
    };
    const focusLast = () => {
      nextTick12(() => {
        const btn = getButtons().reverse().find((el) => !isDisabled(el));
        btn == null ? void 0 : btn.focus();
      });
    };
    const focusNext = () => {
      nextTick12(() => {
        var _a;
        const buttons = getButtons();
        const index8 = buttons.indexOf(getActiveElement());
        if (index8 < buttons.length - 1 && !isDisabled(buttons[index8 + 1])) {
          (_a = buttons[index8 + 1]) == null ? void 0 : _a.focus();
        }
      });
    };
    const handleKeyNav = (event) => {
      const { code, shiftKey } = event;
      if (code === CODE_LEFT || code === CODE_UP) {
        stopEvent(event);
        if (shiftKey) {
          focusFirst();
        } else {
          focusPrev();
        }
      } else if (code === CODE_RIGHT || code === CODE_DOWN) {
        stopEvent(event);
        if (shiftKey) {
          focusLast();
        } else {
          focusNext();
        }
      }
    };
    watch17(modelValueNumber, (newValue) => {
      const sanitizeCurrentPage = (value, numberOfPages2) => {
        const page = value || 1;
        return page > numberOfPages2 ? numberOfPages2 : page < 1 ? 1 : page;
      };
      const calculatedValue = sanitizeCurrentPage(newValue, numberOfPages.value);
      if (calculatedValue === modelValue.value)
        return;
      modelValue.value = calculatedValue;
    });
    watch17(pagination, (oldValue, newValue) => {
      if (newValue.pageSize !== oldValue.pageSize && newValue.totalRows === oldValue.totalRows) {
        modelValue.value = 1;
      } else if (newValue.numberOfPages !== oldValue.numberOfPages && modelValueNumber.value > newValue.numberOfPages) {
        modelValue.value = 1;
      }
    });
    const noFirstButton = computed60(() => props.noGotoEndButtons && !props.firstNumber ? 1 : 0);
    const noLastButton = computed60(() => props.noGotoEndButtons && !props.lastNumber ? 1 : 0);
    const showFirstButton = computed60(() => noFirstButton.value ? 0 : 1);
    const showLastButton = computed60(() => noLastButton.value ? 0 : 1);
    const firstPage = computed60(() => props.firstNumber ? 1 : 0);
    const lastPage = computed60(() => props.lastNumber ? 1 : 0);
    const halfLimit = computed60(() => Math.floor(limitNumber.value / 2));
    const pages = computed60(() => {
      const { value } = modelValueNumber;
      const els = elements.value.map((p) => {
        switch (p) {
          case FIRST_BUTTON:
            return { id: p, ...firstButtonProps.value };
          case PREV_BUTTON:
            return { id: p, ...prevButtonProps.value };
          case NEXT_BUTTON:
            return { id: p, ...nextButtonProps.value };
          case LAST_BUTTON:
            return { id: p, ...lastButtonProps.value };
          case FIRST_ELLIPSIS:
          case LAST_ELLIPSIS:
            return { id: p, ...ellipsisProps.value };
          default:
            return { id: p, ...getPageButtonProps(p) };
        }
      });
      if (numberOfPages.value > 3) {
        if (value > numberOfPages.value - halfLimit.value - lastPage.value) {
          const idx = 2 + showFirstButton.value;
          els[idx] = { id: els[idx].id, ...getPageButtonProps(els[idx].id, true) };
        }
        if (value <= halfLimit.value + firstPage.value) {
          const idx = els.length - (3 + showLastButton.value);
          els[idx] = { id: els[idx].id, ...getPageButtonProps(els[idx].id, true) };
        }
      }
      return els;
    });
    const elements = computed60(() => {
      const pages2 = numberOfPages.value;
      const { value } = modelValueNumber;
      const limit = limitNumber.value;
      const noEllipsis = props.noEllipsis || limit <= ELLIPSIS_THRESHOLD;
      if (pages2 < limit + firstPage.value + lastPage.value) {
        return [
          !firstPage.value && !noFirstButton.value ? FIRST_BUTTON : null,
          PREV_BUTTON,
          ...Array.from({ length: pages2 }, (_, index8) => index8 + 1),
          NEXT_BUTTON,
          !lastPage.value && !noLastButton.value ? LAST_BUTTON : null
        ].filter((x) => x !== null);
      }
      const buttons = Array.from({ length: limit + 4 - (noFirstButton.value + noLastButton.value) });
      if (!noFirstButton.value) {
        if (!firstPage.value) {
          buttons[0] = FIRST_BUTTON;
          buttons[1] = PREV_BUTTON;
        } else {
          buttons[0] = PREV_BUTTON;
          buttons[1] = 1;
        }
      } else {
        buttons[0] = PREV_BUTTON;
      }
      if (!noLastButton.value) {
        if (!lastPage.value) {
          buttons[buttons.length - 1] = LAST_BUTTON;
          buttons[buttons.length - 2] = NEXT_BUTTON;
        } else {
          buttons[buttons.length - 1] = NEXT_BUTTON;
          buttons[buttons.length - 2] = pages2;
        }
      } else {
        buttons[buttons.length - 1] = NEXT_BUTTON;
      }
      if (value <= halfLimit.value + firstPage.value) {
        for (let index8 = 1; index8 <= limit; index8++) {
          buttons[index8 + 1 - noFirstButton.value] = index8 + firstPage.value;
        }
        if (!noEllipsis) {
          buttons[buttons.length - (2 + showLastButton.value)] = LAST_ELLIPSIS;
        }
      }
      if (value > pages2 - halfLimit.value - lastPage.value) {
        const start = pages2 - (limit - 1) - lastPage.value;
        for (let index8 = 0; index8 < limit; index8++) {
          buttons[index8 + 2 - noFirstButton.value] = start + index8;
        }
        if (!noEllipsis) {
          buttons[1 + showFirstButton.value] = FIRST_ELLIPSIS;
        }
      }
      if (!buttons[2]) {
        const start = value - Math.floor(limit / 2);
        for (let index8 = 0; index8 < limit; index8++) {
          buttons[index8 + 2 - noFirstButton.value] = start + index8;
        }
        if (!noEllipsis) {
          buttons[1 + showFirstButton.value] = FIRST_ELLIPSIS;
          buttons[buttons.length - (2 + showLastButton.value)] = LAST_ELLIPSIS;
        }
      }
      return buttons.filter((x) => x !== null);
    });
    return (_ctx, _cache) => {
      return openBlock42(), createElementBlock30("ul", {
        class: normalizeClass34(["pagination", computedWrapperClasses.value]),
        role: "menubar",
        "aria-disabled": unref43(props).disabled,
        "aria-label": unref43(props).ariaLabel || void 0,
        onKeydown: handleKeyNav
      }, [
        (openBlock42(true), createElementBlock30(Fragment16, null, renderList9(pages.value, (page) => {
          return openBlock42(), createElementBlock30("li", mergeProps27({
            key: `page-${page.id}`,
            ref_for: true
          }, page.li, {
            ref_for: true,
            ref: "_pageElements"
          }), [
            page.id === FIRST_ELLIPSIS || page.id === LAST_ELLIPSIS ? (openBlock42(), createElementBlock30("span", mergeProps27({
              key: 0,
              ref_for: true
            }, ellipsisProps.value.span), [
              renderSlot38(_ctx.$slots, "ellipsis-text", {}, () => [
                createTextVNode24(toDisplayString26(unref43(props).ellipsisText || "..."), 1)
              ])
            ], 16)) : (openBlock42(), createBlock35(resolveDynamicComponent27(page.button.is), mergeProps27({
              key: 1,
              ref_for: true
            }, page.button, {
              onClick: page.clickHandler
            }), {
              default: withCtx34(() => [
                renderSlot38(_ctx.$slots, page.text.name, {
                  disabled: page.text.disabled,
                  page: page.text.page,
                  index: page.text.index,
                  active: page.text.active,
                  content: page.text.value
                }, () => [
                  createTextVNode24(toDisplayString26(page.text.value), 1)
                ])
              ]),
              _: 2
            }, 1040, ["onClick"]))
          ], 16);
        }), 128))
      ], 42, _hoisted_129);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BPlaceholderWrapper.vue_vue_type_script_setup_true_lang-f9LOZG6Q.mjs
import { defineComponent as defineComponent47, computed as computed62, openBlock as openBlock44, createBlock as createBlock36, resolveDynamicComponent as resolveDynamicComponent28, unref as unref44, normalizeClass as normalizeClass36, withCtx as withCtx35, mergeProps as mergeProps29, createSlots, renderSlot as renderSlot40, createVNode as createVNode12, createElementVNode as createElementVNode20, createElementBlock as createElementBlock32, Fragment as Fragment17, renderList as renderList10, createCommentVNode as createCommentVNode20 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BTableSimple.vue_vue_type_script_setup_true_lang-BEpZo-87.mjs
import { defineComponent as defineComponent46, computed as computed61, openBlock as openBlock43, createElementBlock as createElementBlock31, normalizeClass as normalizeClass35, normalizeStyle as normalizeStyle8, createElementVNode as createElementVNode19, normalizeProps as normalizeProps9, guardReactiveProps as guardReactiveProps7, renderSlot as renderSlot39, mergeProps as mergeProps28 } from "vue";
var defaultStickyHeaderHeight = "300px";
var _sfc_main45 = defineComponent46({
  __name: "BTableSimple",
  props: {
    bordered: { type: Boolean, default: false },
    borderless: { type: Boolean, default: false },
    borderVariant: { default: null },
    captionTop: { type: Boolean, default: false },
    dark: { type: Boolean, default: false },
    fixed: { type: Boolean, default: false },
    hover: { type: Boolean, default: false },
    id: { default: void 0 },
    noBorderCollapse: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
    responsive: { type: [Boolean, String], default: false },
    small: { type: Boolean, default: false },
    stacked: { type: [Boolean, String], default: false },
    stickyHeader: { type: [Boolean, String, Number], default: false },
    striped: { type: Boolean, default: false },
    stripedColumns: { type: Boolean, default: false },
    variant: { default: null },
    tableAttrs: { default: void 0 },
    tableClass: { default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BTableSimple");
    const colorClasses = useColorVariantClasses(
      computed61(() => ({
        borderVariant: props.borderVariant
      }))
    );
    const computedClasses = computed61(() => [
      props.tableClass,
      "table",
      "b-table",
      colorClasses.value,
      {
        "table-bordered": props.bordered,
        "table-borderless": props.borderless,
        "caption-top": props.captionTop,
        "table-dark": props.dark,
        "table-hover": props.hover,
        "b-table-stacked": props.stacked === true,
        [`b-table-stacked-${props.stacked}`]: typeof props.stacked === "string",
        "table-striped": props.striped,
        "table-sm": props.small,
        [`table-${props.variant}`]: props.variant !== null,
        "table-striped-columns": props.stripedColumns
      }
    ]);
    const computedTableAttrs = computed61(() => ({
      id: props.id,
      class: computedClasses.value,
      ...props.tableAttrs
    }));
    const computedSticky = useNumberishToStyle(
      computed61(
        () => (props.stickyHeader === true ? defaultStickyHeaderHeight : props.stickyHeader) || NaN
      )
    );
    const stickyIsValid = computed61(() => props.stickyHeader !== false);
    const isResponsive = computed61(() => props.responsive !== false || stickyIsValid.value);
    const responsiveStyles = computed61(
      () => stickyIsValid.value ? { maxHeight: computedSticky.value } : void 0
    );
    const responsiveClasses = computed61(() => ({
      "table-responsive": props.responsive === true,
      [`table-responsive-${props.responsive}`]: typeof props.responsive === "string",
      "b-table-sticky-header": stickyIsValid.value
    }));
    return (_ctx, _cache) => {
      return isResponsive.value ? (openBlock43(), createElementBlock31("div", {
        key: 0,
        class: normalizeClass35(responsiveClasses.value),
        style: normalizeStyle8(responsiveStyles.value)
      }, [
        createElementVNode19("table", normalizeProps9(guardReactiveProps7(computedTableAttrs.value)), [
          renderSlot39(_ctx.$slots, "default")
        ], 16)
      ], 6)) : (openBlock43(), createElementBlock31("table", normalizeProps9(mergeProps28({ key: 1 }, computedTableAttrs.value)), [
        renderSlot39(_ctx.$slots, "default")
      ], 16));
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BPlaceholderWrapper.vue_vue_type_script_setup_true_lang-f9LOZG6Q.mjs
var _sfc_main$44 = defineComponent47({
  ...{
    inheritAttrs: false
  },
  __name: "BPlaceholder",
  props: {
    animation: { default: void 0 },
    cols: { default: 12 },
    size: { default: "md" },
    tag: { default: "span" },
    variant: { default: null },
    width: { default: void 0 },
    wrapperTag: { default: "span" }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BPlaceholder");
    const widthString = computed62(
      () => props.width === void 0 ? void 0 : typeof props.width === "number" ? props.width.toString() : props.width.replace("%", "")
    );
    const colsString = computed62(
      () => props.cols === void 0 ? void 0 : typeof props.cols === "number" ? props.cols.toString() : props.cols
    );
    const colorClasses = useColorVariantClasses(
      computed62(() => ({
        bgVariant: props.variant
      }))
    );
    const computedClasses = computed62(() => [
      colorClasses.value,
      {
        [`col-${colsString.value}`]: colsString.value !== void 0 && widthString.value === void 0,
        [`placeholder-${props.size}`]: props.size !== "md"
      }
    ]);
    const wrapperClasses = computed62(() => ({
      [`placeholder-${props.animation}`]: props.animation !== void 0
    }));
    const computedStyle = computed62(() => ({
      width: widthString.value === void 0 ? void 0 : `${widthString.value}%`
    }));
    return (_ctx, _cache) => {
      return openBlock44(), createBlock36(resolveDynamicComponent28(unref44(props).wrapperTag), {
        class: normalizeClass36(wrapperClasses.value)
      }, {
        default: withCtx35(() => [
          (openBlock44(), createBlock36(resolveDynamicComponent28(_ctx.tag), mergeProps29(_ctx.$attrs, {
            class: ["placeholder", computedClasses.value],
            style: computedStyle.value
          }), null, 16, ["class", "style"]))
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});
var _sfc_main$36 = defineComponent47({
  __name: "BPlaceholderButton",
  props: {
    animation: { default: void 0 },
    cols: { default: void 0 },
    tag: { default: "div" },
    variant: { default: "primary" },
    width: { default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BPlaceholderButton");
    const computedClasses = computed62(() => ({
      [`btn-${props.variant}`]: props.variant !== null
    }));
    return (_ctx, _cache) => {
      return openBlock44(), createBlock36(_sfc_main$44, {
        class: normalizeClass36(["btn disabled", computedClasses.value]),
        animation: unref44(props).animation,
        width: unref44(props).width,
        cols: unref44(props).cols,
        tag: unref44(props).tag,
        style: { "cursor": "wait", "pointer-events": "auto" }
      }, null, 8, ["class", "animation", "width", "cols", "tag"]);
    };
  }
});
var _sfc_main$26 = defineComponent47({
  __name: "BPlaceholderCard",
  props: {
    animation: { default: void 0 },
    footerAnimation: { default: void 0 },
    footerSize: { default: "md" },
    footerVariant: { default: void 0 },
    footerWidth: { default: 100 },
    headerAnimation: { default: void 0 },
    headerSize: { default: "md" },
    headerVariant: { default: void 0 },
    headerWidth: { default: 100 },
    imgBlankColor: { default: "#868e96" },
    imgPlacement: { default: "top" },
    imgHeight: { default: 100 },
    imgSrc: { default: void 0 },
    noButton: { type: Boolean, default: false },
    noFooter: { type: Boolean, default: false },
    noHeader: { type: Boolean, default: false },
    noImg: { type: Boolean, default: false },
    size: { default: "md" },
    variant: { default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BPlaceholderCard");
    const defaultAttrs = computed62(() => ({
      animation: props.animation,
      size: props.size,
      variant: props.variant
    }));
    const footerComponent = computed62(() => !props.noButton ? _sfc_main$36 : _sfc_main$44);
    return (_ctx, _cache) => {
      return openBlock44(), createBlock36(_sfc_main16, {
        "img-placement": unref44(props).imgPlacement
      }, createSlots({
        default: withCtx35(() => [
          renderSlot40(_ctx.$slots, "default", {}, () => [
            createVNode12(_sfc_main$44, mergeProps29({ cols: "7" }, defaultAttrs.value), null, 16),
            createVNode12(_sfc_main$44, mergeProps29({ cols: "4" }, defaultAttrs.value), null, 16),
            createVNode12(_sfc_main$44, mergeProps29({ cols: "4" }, defaultAttrs.value), null, 16),
            createVNode12(_sfc_main$44, mergeProps29({ cols: "6" }, defaultAttrs.value), null, 16),
            createVNode12(_sfc_main$44, mergeProps29({ cols: "8" }, defaultAttrs.value), null, 16)
          ])
        ]),
        _: 2
      }, [
        !unref44(props).noImg ? {
          name: "img",
          fn: withCtx35(() => [
            renderSlot40(_ctx.$slots, "img", {}, () => [
              createVNode12(_sfc_main$7, {
                blank: !unref44(props).imgSrc ? true : false,
                "blank-color": unref44(props).imgBlankColor,
                height: !unref44(props).imgSrc ? unref44(props).imgHeight : void 0,
                src: unref44(props).imgSrc,
                "img-placement": unref44(props).imgPlacement,
                style: { cursor: "wait" }
              }, null, 8, ["blank", "blank-color", "height", "src", "img-placement"])
            ])
          ]),
          key: "0"
        } : void 0,
        !unref44(props).noHeader ? {
          name: "header",
          fn: withCtx35(() => [
            renderSlot40(_ctx.$slots, "header", {}, () => [
              createVNode12(_sfc_main$44, {
                width: unref44(props).headerWidth,
                variant: unref44(props).headerVariant,
                animation: unref44(props).headerAnimation,
                size: unref44(props).headerSize
              }, null, 8, ["width", "variant", "animation", "size"])
            ])
          ]),
          key: "1"
        } : void 0,
        !unref44(props).noFooter ? {
          name: "footer",
          fn: withCtx35(() => [
            renderSlot40(_ctx.$slots, "footer", {}, () => [
              (openBlock44(), createBlock36(resolveDynamicComponent28(footerComponent.value), {
                width: unref44(props).footerWidth,
                animation: unref44(props).footerAnimation,
                size: unref44(props).noButton ? unref44(props).footerSize : void 0,
                variant: unref44(props).footerVariant
              }, null, 8, ["width", "animation", "size", "variant"]))
            ])
          ]),
          key: "2"
        } : void 0
      ]), 1032, ["img-placement"]);
    };
  }
});
var _sfc_main$120 = defineComponent47({
  __name: "BPlaceholderTable",
  props: {
    animation: { default: void 0 },
    cellWidth: { default: 100 },
    columns: { default: 5 },
    footerAnimation: { default: void 0 },
    footerCellWidth: { default: 100 },
    footerColumns: { default: void 0 },
    footerSize: { default: "md" },
    footerVariant: { default: void 0 },
    headerAnimation: { default: void 0 },
    headerCellWidth: { default: 100 },
    headerColumns: { default: void 0 },
    headerSize: { default: "md" },
    headerVariant: { default: void 0 },
    noHeader: { type: Boolean, default: false },
    rows: { default: 3 },
    showFooter: { type: Boolean, default: false },
    size: { default: "md" },
    variant: { default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BPlaceholderTable");
    const columnsToNumber = useToNumber(() => props.columns);
    const rowsToNumber = useToNumber(() => props.rows);
    const computedHeaderColumns = computed62(() => props.headerColumns ?? NaN);
    const computedFooterColumns = computed62(() => props.footerColumns ?? NaN);
    const headerColumnsNumber = useToNumber(computedHeaderColumns);
    const footerColumnsNumber = useToNumber(computedFooterColumns);
    const columnsNumber = computed62(() => columnsToNumber.value || 5);
    const rowsNumber = computed62(() => rowsToNumber.value || 3);
    const computedHeaderColumnsLength = computed62(
      () => props.headerColumns === void 0 ? columnsNumber.value : headerColumnsNumber.value
    );
    const computedFooterColumnsLength = computed62(
      () => props.footerColumns === void 0 ? columnsNumber.value : footerColumnsNumber.value
    );
    return (_ctx, _cache) => {
      return openBlock44(), createBlock36(_sfc_main45, null, {
        default: withCtx35(() => [
          !unref44(props).noHeader ? renderSlot40(_ctx.$slots, "thead", { key: 0 }, () => [
            createElementVNode20("thead", null, [
              createElementVNode20("tr", null, [
                (openBlock44(true), createElementBlock32(Fragment17, null, renderList10(computedHeaderColumnsLength.value, (_, i) => {
                  return openBlock44(), createElementBlock32("th", { key: i }, [
                    createVNode12(_sfc_main$44, {
                      size: unref44(props).headerSize,
                      variant: unref44(props).headerVariant,
                      animation: unref44(props).headerAnimation,
                      width: unref44(props).headerCellWidth
                    }, null, 8, ["size", "variant", "animation", "width"])
                  ]);
                }), 128))
              ])
            ])
          ]) : createCommentVNode20("", true),
          renderSlot40(_ctx.$slots, "default", {}, () => [
            createElementVNode20("tbody", null, [
              (openBlock44(true), createElementBlock32(Fragment17, null, renderList10(rowsNumber.value, (_, j) => {
                return openBlock44(), createElementBlock32("tr", { key: j }, [
                  (openBlock44(true), createElementBlock32(Fragment17, null, renderList10(columnsNumber.value, (__, k) => {
                    return openBlock44(), createElementBlock32("td", { key: k }, [
                      createVNode12(_sfc_main$44, {
                        size: unref44(props).size,
                        variant: unref44(props).variant,
                        animation: unref44(props).animation,
                        width: unref44(props).cellWidth
                      }, null, 8, ["size", "variant", "animation", "width"])
                    ]);
                  }), 128))
                ]);
              }), 128))
            ])
          ]),
          unref44(props).showFooter ? renderSlot40(_ctx.$slots, "tfoot", { key: 1 }, () => [
            createElementVNode20("tfoot", null, [
              createElementVNode20("tr", null, [
                (openBlock44(true), createElementBlock32(Fragment17, null, renderList10(computedFooterColumnsLength.value, (_, l) => {
                  return openBlock44(), createElementBlock32("th", { key: l }, [
                    createVNode12(_sfc_main$44, {
                      size: unref44(props).footerSize,
                      variant: unref44(props).footerVariant,
                      animation: unref44(props).footerAnimation,
                      width: unref44(props).footerCellWidth
                    }, null, 8, ["size", "variant", "animation", "width"])
                  ]);
                }), 128))
              ])
            ])
          ]) : createCommentVNode20("", true)
        ]),
        _: 3
      });
    };
  }
});
var _sfc_main46 = defineComponent47({
  __name: "BPlaceholderWrapper",
  props: {
    loading: { type: Boolean, default: false }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BPlaceholderWrapper");
    return (_ctx, _cache) => {
      return unref44(props).loading ? renderSlot40(_ctx.$slots, "loading", { key: 0 }) : renderSlot40(_ctx.$slots, "default", { key: 1 });
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BPopoverOrchestrator.vue_vue_type_script_setup_true_lang-CGcJniB3.mjs
import { defineComponent as defineComponent49, openBlock as openBlock46, createElementBlock as createElementBlock33, Fragment as Fragment18, createVNode as createVNode13, h as h4 } from "vue";

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BTooltip.vue_vue_type_script_setup_true_lang-DjQ6vJ-I.mjs
import { defineComponent as defineComponent48, mergeModels as mergeModels20, useSlots as useSlots14, useModel as useModel20, computed as computed63, useTemplateRef as useTemplateRef21, openBlock as openBlock45, createBlock as createBlock37, mergeProps as mergeProps30, createSlots as createSlots2, withCtx as withCtx36, renderSlot as renderSlot41, normalizeProps as normalizeProps10, guardReactiveProps as guardReactiveProps8 } from "vue";
var _sfc_main47 = defineComponent48({
  __name: "BTooltip",
  props: mergeModels20({
    interactive: { type: Boolean, default: void 0 },
    boundary: {},
    boundaryPadding: {},
    click: { type: Boolean, default: void 0 },
    closeOnHide: { type: Boolean },
    content: { default: void 0 },
    customClass: { default: void 0 },
    delay: { default: void 0 },
    floatingMiddleware: { default: void 0 },
    hideMargin: {},
    id: { default: void 0 },
    inline: { type: Boolean, default: void 0 },
    manual: { type: Boolean, default: void 0 },
    noAutoClose: { type: Boolean, default: void 0 },
    noFlip: { type: Boolean, default: void 0 },
    noHide: { type: Boolean, default: void 0 },
    noShift: { type: Boolean, default: void 0 },
    noSize: { type: Boolean },
    noninteractive: { type: Boolean, default: void 0 },
    offset: { default: void 0 },
    placement: { default: void 0 },
    realtime: { type: Boolean, default: void 0 },
    reference: { default: void 0 },
    strategy: { default: void 0 },
    target: { default: void 0 },
    title: { default: void 0 },
    variant: { default: void 0 },
    teleportDisabled: { type: Boolean, default: void 0 },
    teleportTo: { default: void 0 },
    initialAnimation: { type: Boolean, default: false },
    noAnimation: { type: Boolean },
    noFade: { type: Boolean, default: void 0 },
    lazy: { type: Boolean, default: void 0 },
    unmountLazy: { type: Boolean, default: void 0 },
    show: { type: Boolean, default: void 0 },
    transProps: {},
    visible: { type: Boolean, default: void 0 }
  }, {
    "modelValue": { type: Boolean, ...{ default: void 0 } },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, "BTooltip");
    const slots = useSlots14();
    const modelValue = useModel20(__props, "modelValue");
    const computedProps = computed63(() => {
      const { interactive, noninteractive, ...rest } = props;
      return { noninteractive: noninteractive !== void 0 ? noninteractive : !interactive, ...rest };
    });
    const popover = useTemplateRef21("_popover");
    __expose({
      hide: () => {
        var _a;
        (_a = popover.value) == null ? void 0 : _a.hide();
      },
      show: () => {
        var _a;
        (_a = popover.value) == null ? void 0 : _a.show();
      },
      toggle: () => {
        var _a;
        (_a = popover.value) == null ? void 0 : _a.toggle();
      }
    });
    return (_ctx, _cache) => {
      return openBlock45(), createBlock37(BPopover, mergeProps30({ ref: "_popover" }, computedProps.value, {
        modelValue: modelValue.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
        tooltip: ""
      }), createSlots2({ _: 2 }, [
        slots.default ? {
          name: "default",
          fn: withCtx36(() => [
            renderSlot41(_ctx.$slots, "default")
          ]),
          key: "0"
        } : void 0,
        slots.target ? {
          name: "target",
          fn: withCtx36((scope) => [
            renderSlot41(_ctx.$slots, "target", normalizeProps10(guardReactiveProps8(scope)))
          ]),
          key: "1"
        } : void 0,
        slots.title ? {
          name: "title",
          fn: withCtx36(() => [
            renderSlot41(_ctx.$slots, "title")
          ]),
          key: "2"
        } : void 0
      ]), 1040, ["modelValue"]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BPopoverOrchestrator.vue_vue_type_script_setup_true_lang-CGcJniB3.mjs
var _sfc_main48 = defineComponent49({
  __name: "BPopoverOrchestrator",
  setup(__props, { expose: __expose }) {
    const tools = usePopoverController();
    const PopoverList = () => {
      var _a, _b;
      return Array.from(((_b = (_a = tools.popovers) == null ? void 0 : _a.value) == null ? void 0 : _b.entries()) ?? []).map(([self2, { content, title, ...popover }]) => {
        const props = {};
        const slots = {};
        if (typeof content === "string") {
          props.content = content;
        } else {
          slots.default = content;
        }
        if (typeof title === "string") {
          props.title = title;
        } else {
          slots.title = title;
        }
        return h4(BPopover, { key: self2, ...props, ...popover }, slots);
      });
    };
    const TooltipList = () => {
      var _a, _b;
      return Array.from(((_b = (_a = tools.tooltips) == null ? void 0 : _a.value) == null ? void 0 : _b.entries()) ?? []).map(([self2, { content, title, ...popover }]) => {
        const props = {};
        const slots = {};
        if (typeof content === "string") {
          props.content = content;
        } else {
          slots.default = content;
        }
        if (typeof title === "string") {
          props.title = title;
        } else {
          slots.title = title;
        }
        return h4(_sfc_main47, { key: self2, ...props, ...popover }, slots);
      });
    };
    __expose({
      ...tools
    });
    return (_ctx, _cache) => {
      return openBlock46(), createElementBlock33(Fragment18, null, [
        createVNode13(PopoverList),
        createVNode13(TooltipList)
      ], 64);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BProgress.vue_vue_type_script_setup_true_lang-BeUxb0jI.mjs
import { defineComponent as defineComponent50, inject as inject20, computed as computed64, openBlock as openBlock47, createElementBlock as createElementBlock34, normalizeClass as normalizeClass37, normalizeStyle as normalizeStyle9, renderSlot as renderSlot42, createTextVNode as createTextVNode25, toDisplayString as toDisplayString27, provide as provide14, toRef as toRef18, unref as unref45, createVNode as createVNode14 } from "vue";
var _sfc_main$121 = defineComponent50({
  __name: "BProgressBar",
  props: {
    animated: { type: Boolean, default: false },
    label: { default: void 0 },
    max: { default: void 0 },
    precision: { default: 0 },
    showProgress: { type: Boolean, default: false },
    showValue: { type: Boolean, default: false },
    striped: { type: Boolean, default: false },
    value: { default: 0 },
    variant: { default: null },
    bgVariant: { default: null },
    textVariant: { default: null }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BProgressBar");
    const parentData = inject20(progressInjectionKey, null);
    const colorClasses = useColorVariantClasses(props);
    const computedClasses = computed64(() => [
      colorClasses.value,
      {
        "progress-bar-animated": props.animated || (parentData == null ? void 0 : parentData.animated.value),
        "progress-bar-striped": props.striped || (parentData == null ? void 0 : parentData.striped.value) || props.animated || (parentData == null ? void 0 : parentData.animated.value)
      }
    ]);
    const numberPrecision = useToNumber(() => props.precision);
    const numberValue = useToNumber(() => props.value);
    const numberMax = useToNumber(() => props.max ?? NaN);
    const parentMaxNumber = useToNumber(() => (parentData == null ? void 0 : parentData.max.value) ?? NaN);
    const computedLabel = computed64(
      () => props.showValue || (parentData == null ? void 0 : parentData.showValue.value) ? numberValue.value.toFixed(numberPrecision.value) : props.showProgress || (parentData == null ? void 0 : parentData.showProgress.value) ? (numberValue.value * 100 / (numberMax.value || 100)).toFixed(numberPrecision.value) : props.label !== void 0 ? props.label : ""
    );
    const computedWidth = computed64(
      () => parentMaxNumber.value ? `${numberValue.value * 100 / parentMaxNumber.value}%` : numberMax.value ? `${numberValue.value * 100 / numberMax.value}%` : typeof props.value === "string" ? props.value : `${props.value}%`
    );
    return (_ctx, _cache) => {
      return openBlock47(), createElementBlock34("div", {
        class: normalizeClass37(["progress-bar", computedClasses.value]),
        style: normalizeStyle9({ width: computedWidth.value })
      }, [
        renderSlot42(_ctx.$slots, "default", {}, () => [
          createTextVNode25(toDisplayString27(computedLabel.value), 1)
        ])
      ], 6);
    };
  }
});
var _hoisted_130 = ["aria-valuenow", "aria-valuemax"];
var _sfc_main49 = defineComponent50({
  __name: "BProgress",
  props: {
    height: { default: void 0 },
    animated: { type: Boolean, default: void 0 },
    max: { default: 100 },
    precision: { default: void 0 },
    showProgress: { type: Boolean, default: void 0 },
    showValue: { type: Boolean, default: void 0 },
    striped: { type: Boolean, default: void 0 },
    value: { default: void 0 },
    variant: { default: void 0 },
    bgVariant: { default: void 0 },
    textVariant: { default: void 0 }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BProgress");
    provide14(progressInjectionKey, {
      animated: toRef18(() => props.animated),
      max: toRef18(() => props.max),
      showProgress: toRef18(() => props.showProgress),
      showValue: toRef18(() => props.showValue),
      striped: toRef18(() => props.striped)
    });
    return (_ctx, _cache) => {
      return openBlock47(), createElementBlock34("div", {
        class: "progress",
        role: "progressbar",
        style: normalizeStyle9({ height: unref45(props).height }),
        "aria-valuenow": unref45(props).value,
        "aria-valuemin": "0",
        "aria-valuemax": unref45(props).max
      }, [
        renderSlot42(_ctx.$slots, "default", {}, () => [
          createVNode14(_sfc_main$121, {
            animated: unref45(props).animated,
            max: unref45(props).max,
            precision: unref45(props).precision,
            "show-progress": unref45(props).showProgress,
            "show-value": unref45(props).showValue,
            striped: unref45(props).striped,
            value: unref45(props).value,
            variant: unref45(props).variant,
            "text-variant": unref45(props).textVariant,
            "bg-variant": unref45(props).bgVariant
          }, null, 8, ["animated", "max", "precision", "show-progress", "show-value", "striped", "value", "variant", "text-variant", "bg-variant"])
        ])
      ], 12, _hoisted_130);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BTable.vue_vue_type_script_setup_true_lang-D_KV2bvr.mjs
import { defineComponent as defineComponent51, computed as computed65, openBlock as openBlock48, createElementBlock as createElementBlock35, normalizeClass as normalizeClass38, renderSlot as renderSlot43, unref as unref46, useSlots as useSlots15, ref as ref17, watch as watch18, createBlock as createBlock38, normalizeProps as normalizeProps11, guardReactiveProps as guardReactiveProps9, withCtx as withCtx37, withDirectives as withDirectives10, createVNode as createVNode15, Fragment as Fragment19, renderList as renderList11, mergeProps as mergeProps31, createTextVNode as createTextVNode26, toDisplayString as toDisplayString28, createCommentVNode as createCommentVNode21, vShow as vShow7, createElementVNode as createElementVNode21, mergeModels as mergeModels21, useModel as useModel21, onMounted as onMounted12, createSlots as createSlots3 } from "vue";
var formatItem = (item, fieldKey, formatter) => {
  const val = get(item, fieldKey);
  return formatter && typeof formatter === "function" ? formatter(val, fieldKey, item) : val;
};
var isTableItem = (value) => typeof value === "object" && value !== null;
var isTableField = (value) => typeof value === "object" && value !== null && "key" in value;
var _sfc_main$72 = defineComponent51({
  __name: "BTbody",
  props: {
    variant: { default: null }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BTbody");
    const computedClasses = computed65(() => ({
      [`thead-${props.variant}`]: props.variant !== null
    }));
    return (_ctx, _cache) => {
      return openBlock48(), createElementBlock35("tbody", {
        class: normalizeClass38(computedClasses.value)
      }, [
        renderSlot43(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var _hoisted_1$3 = ["scope", "colspan", "rowspan", "data-label"];
var _hoisted_2$3 = { key: 0 };
var _sfc_main$63 = defineComponent51({
  __name: "BTd",
  props: {
    colspan: { default: void 0 },
    rowspan: { default: void 0 },
    stackedHeading: { default: void 0 },
    stickyColumn: { type: Boolean, default: false },
    variant: { default: null }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BTd");
    const computedClasses = computed65(() => ({
      [`table-${props.variant}`]: props.variant !== null,
      "b-table-sticky-column": props.stickyColumn,
      "table-b-table-default": props.stickyColumn && props.variant === null
    }));
    const scope = computed65(() => props.colspan ? "colspan" : props.rowspan ? "rowspan" : "col");
    return (_ctx, _cache) => {
      return openBlock48(), createElementBlock35("td", {
        scope: scope.value,
        class: normalizeClass38(computedClasses.value),
        colspan: unref46(props).colspan,
        rowspan: unref46(props).rowspan,
        "data-label": unref46(props).stackedHeading
      }, [
        unref46(props).stackedHeading ? (openBlock48(), createElementBlock35("div", _hoisted_2$3, [
          renderSlot43(_ctx.$slots, "default")
        ])) : renderSlot43(_ctx.$slots, "default", { key: 1 })
      ], 10, _hoisted_1$3);
    };
  }
});
var _sfc_main$53 = defineComponent51({
  __name: "BTfoot",
  props: {
    variant: { default: null }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BTfoot");
    const computedClasses = computed65(() => ({
      [`table-${props.variant}`]: props.variant !== null
    }));
    return (_ctx, _cache) => {
      return openBlock48(), createElementBlock35("tfoot", {
        class: normalizeClass38(computedClasses.value)
      }, [
        renderSlot43(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var _hoisted_1$23 = ["scope", "colspan", "rowspan", "data-label"];
var _hoisted_2$2 = { key: 0 };
var _sfc_main$45 = defineComponent51({
  __name: "BTh",
  props: {
    colspan: { default: void 0 },
    rowspan: { default: void 0 },
    stackedHeading: { default: void 0 },
    stickyColumn: { type: Boolean, default: false },
    variant: { default: null }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BTh");
    const computedClasses = computed65(() => ({
      [`table-${props.variant}`]: props.variant !== null,
      "b-table-sticky-column": props.stickyColumn,
      "table-b-table-default": props.stickyColumn && props.variant === null
    }));
    const scope = computed65(() => props.colspan ? "colspan" : props.rowspan ? "rowspan" : "col");
    return (_ctx, _cache) => {
      return openBlock48(), createElementBlock35("th", {
        scope: scope.value,
        class: normalizeClass38(computedClasses.value),
        colspan: unref46(props).colspan,
        rowspan: unref46(props).rowspan,
        "data-label": unref46(props).stackedHeading
      }, [
        unref46(props).stackedHeading !== void 0 ? (openBlock48(), createElementBlock35("div", _hoisted_2$2, [
          renderSlot43(_ctx.$slots, "default")
        ])) : renderSlot43(_ctx.$slots, "default", { key: 1 })
      ], 10, _hoisted_1$23);
    };
  }
});
var _sfc_main$37 = defineComponent51({
  __name: "BThead",
  props: {
    variant: { default: null }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BThead");
    const computedClasses = computed65(() => ({
      [`table-${props.variant}`]: props.variant !== null
    }));
    return (_ctx, _cache) => {
      return openBlock48(), createElementBlock35("thead", {
        class: normalizeClass38(computedClasses.value)
      }, [
        renderSlot43(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var _sfc_main$27 = defineComponent51({
  __name: "BTr",
  props: {
    variant: { default: null }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BTr");
    const computedClasses = computed65(() => ({
      [`table-${props.variant}`]: props.variant !== null
    }));
    return (_ctx, _cache) => {
      return openBlock48(), createElementBlock35("tr", {
        class: normalizeClass38(computedClasses.value)
      }, [
        renderSlot43(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var getTableFieldHeadLabel = (field) => typeof field === "string" ? titleCase(field) : field.label !== void 0 ? field.label : typeof field.key === "string" ? titleCase(field.key) : field.key;
var btableSimpleProps = Object.freeze(
  Object.keys({
    bordered: 0,
    borderless: 0,
    borderVariant: 0,
    captionTop: 0,
    dark: 0,
    fixed: 0,
    hover: 0,
    id: 0,
    noBorderCollapse: 0,
    outlined: 0,
    responsive: 0,
    small: 0,
    stacked: 0,
    stickyHeader: 0,
    striped: 0,
    stripedColumns: 0,
    variant: 0,
    tableAttrs: 0,
    tableClass: 0
  })
);
var btableLiteProps = Object.freeze(
  Object.keys({
    align: 0,
    caption: 0,
    detailsTdClass: 0,
    fieldColumnClass: 0,
    fields: 0,
    footClone: 0,
    footRowVariant: 0,
    footVariant: 0,
    headRowVariant: 0,
    headVariant: 0,
    items: 0,
    labelStacked: 0,
    modelValue: 0,
    primaryKey: 0,
    tbodyClass: 0,
    tbodyTrAttrs: 0,
    tbodyTrClass: 0,
    tfootClass: 0,
    tfootTrClass: 0,
    theadClass: 0,
    theadTrClass: 0
  })
);
var TABLE_TAG_NAMES = ["TD", "TH", "TR"];
var eventFilter = [
  "a",
  "a *",
  // Include content inside links
  "button",
  "button *",
  // Include content inside buttons
  "input:not(.disabled):not([disabled])",
  "select:not(.disabled):not([disabled])",
  "textarea:not(.disabled):not([disabled])",
  '[role="link"]',
  '[role="link"] *',
  '[role="button"]',
  '[role="button"] *',
  "[tabindex]:not(.disabled):not([disabled])"
].join(",");
var filterEvent = (event) => {
  if (!event || !event.target) {
    return false;
  }
  const el = event.target;
  if ("disabled" in el && el.disabled || TABLE_TAG_NAMES.indexOf(el.tagName) !== -1) {
    return false;
  }
  if (el.closest(".dropdown-menu"))
    return true;
  const label = el.tagName === "LABEL" ? el : el.closest("label");
  if (label) {
    const labelFor = label.getAttribute("for");
    const input = labelFor ? document.getElementById(labelFor) : label.querySelector("input, select, textarea");
    if (input && !input.disabled) {
      return true;
    }
  }
  return el.matches(eventFilter);
};
var _hoisted_1$110 = {
  key: 0,
  class: "b-table-stacked-label"
};
var _hoisted_2$1 = { class: "d-inline-flex flex-nowrap align-items-center gap-1" };
var _hoisted_3$1 = { key: 2 };
var _sfc_main$122 = defineComponent51({
  __name: "BTableLite",
  props: {
    align: { default: void 0 },
    caption: { default: void 0 },
    detailsTdClass: { default: void 0 },
    fieldColumnClass: { type: [Function, String, Object, Array], default: void 0 },
    fields: { default: () => [] },
    footClone: { type: Boolean, default: false },
    footRowVariant: { default: void 0 },
    footVariant: { default: void 0 },
    headRowVariant: { default: void 0 },
    headVariant: { default: void 0 },
    items: { default: () => [] },
    labelStacked: { type: Boolean, default: false },
    modelValue: { default: void 0 },
    primaryKey: { default: void 0 },
    tbodyClass: { default: void 0 },
    tbodyTrAttrs: { type: [Function, Object], default: void 0 },
    tbodyTrClass: { type: [Function, String, Array, Object], default: void 0 },
    tfootClass: { default: void 0 },
    tfootTrClass: { default: void 0 },
    theadClass: { default: void 0 },
    theadTrClass: { default: void 0 },
    bordered: { type: Boolean, default: void 0 },
    borderless: { type: Boolean, default: void 0 },
    borderVariant: { default: void 0 },
    captionTop: { type: Boolean, default: void 0 },
    dark: { type: Boolean, default: void 0 },
    fixed: { type: Boolean, default: void 0 },
    hover: { type: Boolean, default: void 0 },
    id: { default: void 0 },
    noBorderCollapse: { type: Boolean, default: void 0 },
    outlined: { type: Boolean, default: void 0 },
    responsive: { type: [Boolean, String], default: void 0 },
    small: { type: Boolean, default: void 0 },
    stacked: { type: [Boolean, String], default: void 0 },
    stickyHeader: { type: [Boolean, String, Number], default: void 0 },
    striped: { type: Boolean, default: void 0 },
    stripedColumns: { type: Boolean, default: void 0 },
    variant: { default: void 0 },
    tableAttrs: {},
    tableClass: { default: void 0 }
  },
  emits: ["head-clicked", "row-clicked", "row-dblclicked", "row-contextmenu", "row-hovered", "row-unhovered", "row-middle-clicked"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BTableLite");
    const emit = __emit;
    const slots = useSlots15();
    const generateDetailsItem = (item) => [
      item,
      item._showDetails
    ];
    const detailsMap = ref17(/* @__PURE__ */ new WeakMap());
    watch18(
      () => props.items,
      (items) => {
        items.forEach((item) => {
          if (!isTableItem(item))
            return;
          detailsMap.value.set(...generateDetailsItem(item));
        });
      },
      { deep: true, immediate: true }
    );
    const computedTableClasses = computed65(() => [
      props.tableClass,
      {
        [`align-${props.align}`]: props.align !== void 0
      }
    ]);
    const computedFields = computed65(() => {
      if (!props.fields.length && props.items.length) {
        const [firstItem] = props.items;
        if (isTableItem(firstItem) || Array.isArray(firstItem)) {
          return Object.keys(firstItem).map((k) => {
            const label = startCase(k);
            return {
              key: k,
              label,
              tdAttr: props.stacked === true ? { "data-label": label } : void 0
            };
          });
        }
        return [{ key: "", _noHeader: true }];
      }
      return props.fields.map((f) => {
        if (isTableField(f)) {
          return {
            ...f,
            tdAttr: props.stacked === true ? { "data-label": startCase(f.key), ...f.tdAttr } : f.tdAttr
          };
        }
        const label = startCase(f);
        return {
          key: f,
          label,
          tdAttr: props.stacked === true ? { "data-label": label } : void 0
        };
      });
    });
    const computedFieldsTotal = computed65(() => computedFields.value.length);
    const showComputedHeaders = computed65(() => {
      if (computedFieldsTotal.value > 0 && computedFields.value.every((el) => el._noHeader === true))
        return false;
      return true;
    });
    const footerProps = computed65(() => ({
      variant: props.footVariant,
      class: props.tfootClass
    }));
    const itemAttributes = (item, fieldKey, attr) => {
      const val = get(item, fieldKey);
      return attr && typeof attr === "function" ? attr(val, fieldKey, item) : attr;
    };
    const callThAttr = (item, field, type) => {
      const fieldKey = String(field.key);
      const val = get(item, fieldKey);
      return field.thAttr && typeof field.thAttr === "function" ? field.thAttr(val, fieldKey, item, type) : field.thAttr;
    };
    const headerClicked = (field, event, isFooter = false) => {
      emit("head-clicked", field.key, field, event, isFooter);
    };
    const toggleRowDetails = (tr) => {
      if (isTableItem(tr)) {
        const prevValue = detailsMap.value.get(tr);
        detailsMap.value.set(tr, !prevValue);
        tr._showDetails = !prevValue;
      }
    };
    const getFieldColumnClasses = (field) => [
      field.class,
      field.thClass,
      {
        "b-table-sticky-column": field.stickyColumn
      },
      props.fieldColumnClass ? typeof props.fieldColumnClass === "function" ? props.fieldColumnClass(field) : props.fieldColumnClass : null
    ];
    const getFieldRowClasses = (field, tr) => {
      var _a, _b;
      const val = get(tr, String(field.key));
      return [
        field.class,
        typeof field.tdClass === "function" ? field.tdClass(val, String(field.key), tr) : field.tdClass,
        (isTableItem(tr) ? (_a = tr._cellVariants) == null ? void 0 : _a[field.key] : false) ? `table-${(_b = tr._cellVariants) == null ? void 0 : _b[field.key]}` : null,
        {
          "b-table-sticky-column": field.stickyColumn
        }
      ];
    };
    const handleMiddleClick = (item, itemIndex, event) => {
      if (event.button === 1 && !filterEvent(event)) {
        emit("row-middle-clicked", item, itemIndex, event);
      }
    };
    const callTbodyTrAttrs = (item, type) => props.tbodyTrAttrs ? typeof props.tbodyTrAttrs === "function" ? props.tbodyTrAttrs(item, type) : props.tbodyTrAttrs : null;
    const getRowClasses = (item, type) => props.tbodyTrClass ? typeof props.tbodyTrClass === "function" ? props.tbodyTrClass(item, type) : props.tbodyTrClass : null;
    const computedSimpleProps = computed65(() => ({
      ...pick(props, btableSimpleProps),
      tableClass: computedTableClasses.value
    }));
    return (_ctx, _cache) => {
      return openBlock48(), createBlock38(_sfc_main45, normalizeProps11(guardReactiveProps9(computedSimpleProps.value)), {
        default: withCtx37(() => [
          withDirectives10(createVNode15(_sfc_main$37, {
            variant: unref46(props).headVariant,
            class: normalizeClass38(unref46(props).theadClass)
          }, {
            default: withCtx37(() => [
              renderSlot43(_ctx.$slots, "thead-top", {
                columns: computedFieldsTotal.value,
                fields: computedFields.value
              }),
              createVNode15(_sfc_main$27, {
                variant: unref46(props).headRowVariant,
                class: normalizeClass38(unref46(props).theadTrClass)
              }, {
                default: withCtx37(() => [
                  (openBlock48(true), createElementBlock35(Fragment19, null, renderList11(computedFields.value, (field) => {
                    return openBlock48(), createBlock38(_sfc_main$45, mergeProps31({
                      key: field.key,
                      scope: "col",
                      class: getFieldColumnClasses(field),
                      title: field.headerTitle,
                      variant: field.variant,
                      abbr: field.headerAbbr,
                      style: field.thStyle,
                      ref_for: true
                    }, callThAttr(null, field, "top"), {
                      onClick: ($event) => headerClicked(field, $event)
                    }), {
                      default: withCtx37(() => [
                        renderSlot43(
                          _ctx.$slots,
                          slots[`head(${String(field.key)})`] ? `head(${String(field.key)})` : "head()",
                          {
                            label: field.label,
                            column: field.key,
                            field,
                            isFoot: false
                          },
                          () => [
                            createTextVNode26(toDisplayString28(unref46(getTableFieldHeadLabel)(field)), 1)
                          ]
                        )
                      ]),
                      _: 2
                    }, 1040, ["class", "title", "variant", "abbr", "style", "onClick"]);
                  }), 128))
                ]),
                _: 3
              }, 8, ["variant", "class"]),
              slots["thead-sub"] ? (openBlock48(), createBlock38(_sfc_main$27, { key: 0 }, {
                default: withCtx37(() => [
                  (openBlock48(true), createElementBlock35(Fragment19, null, renderList11(computedFields.value, (field) => {
                    return openBlock48(), createBlock38(_sfc_main$63, {
                      key: field.key,
                      scope: "col",
                      variant: field.variant,
                      class: normalizeClass38([field.class, field.thClass])
                    }, {
                      default: withCtx37(() => [
                        renderSlot43(_ctx.$slots, "thead-sub", {
                          items: unref46(props).items,
                          fields: computedFields.value,
                          field
                        }, () => [
                          createTextVNode26(toDisplayString28(field.label), 1)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["variant", "class"]);
                  }), 128))
                ]),
                _: 3
              })) : createCommentVNode21("", true)
            ]),
            _: 3
          }, 8, ["variant", "class"]), [
            [vShow7, showComputedHeaders.value]
          ]),
          createVNode15(_sfc_main$72, {
            class: normalizeClass38(unref46(props).tbodyClass)
          }, {
            default: withCtx37(() => [
              renderSlot43(_ctx.$slots, "custom-body", {
                fields: computedFields.value,
                items: unref46(props).items,
                columns: computedFieldsTotal.value
              }, () => [
                !unref46(props).stacked && slots["top-row"] ? (openBlock48(), createBlock38(_sfc_main$27, mergeProps31({
                  key: 0,
                  class: getRowClasses(null, "row-top")
                }, callTbodyTrAttrs(null, "row-top")), {
                  default: withCtx37(() => [
                    renderSlot43(_ctx.$slots, "top-row", {
                      columns: computedFieldsTotal.value,
                      fields: computedFields.value
                    })
                  ]),
                  _: 3
                }, 16, ["class"])) : createCommentVNode21("", true),
                (openBlock48(true), createElementBlock35(Fragment19, null, renderList11(unref46(props).items, (item, itemIndex) => {
                  return openBlock48(), createElementBlock35(Fragment19, {
                    key: unref46(props).primaryKey ? unref46(get)(item, unref46(props).primaryKey) : itemIndex
                  }, [
                    createVNode15(_sfc_main$27, mergeProps31({
                      class: getRowClasses(item, "row"),
                      variant: unref46(isTableItem)(item) ? item._rowVariant : void 0,
                      ref_for: true
                    }, callTbodyTrAttrs(item, "row"), {
                      onClick: ($event) => !unref46(filterEvent)($event) && emit("row-clicked", item, itemIndex, $event),
                      onDblclick: ($event) => !unref46(filterEvent)($event) && emit("row-dblclicked", item, itemIndex, $event),
                      onContextmenu: ($event) => !unref46(filterEvent)($event) && emit("row-contextmenu", item, itemIndex, $event),
                      onMouseenter: ($event) => !unref46(filterEvent)($event) && emit("row-hovered", item, itemIndex, $event),
                      onMouseleave: ($event) => !unref46(filterEvent)($event) && emit("row-unhovered", item, itemIndex, $event),
                      onMousedown: ($event) => handleMiddleClick(item, itemIndex, $event)
                    }), {
                      default: withCtx37(() => [
                        (openBlock48(true), createElementBlock35(Fragment19, null, renderList11(computedFields.value, (field) => {
                          var _a;
                          return openBlock48(), createBlock38(_sfc_main$63, mergeProps31({
                            key: field.key,
                            variant: (unref46(isTableItem)(item) ? (_a = item._cellVariants) == null ? void 0 : _a[field.key] : false) ? null : field.variant,
                            class: getFieldRowClasses(field, item),
                            ref_for: true
                          }, itemAttributes(item, String(field.key), field.tdAttr)), {
                            default: withCtx37(() => [
                              unref46(props).stacked && unref46(props).labelStacked ? (openBlock48(), createElementBlock35("label", _hoisted_1$110, toDisplayString28(unref46(getTableFieldHeadLabel)(field)), 1)) : createCommentVNode21("", true),
                              renderSlot43(
                                _ctx.$slots,
                                slots[`cell(${String(field.key)})`] ? `cell(${String(field.key)})` : "cell()",
                                {
                                  value: unref46(formatItem)(item, String(field.key), field.formatter),
                                  unformatted: unref46(get)(item, String(field.key)),
                                  index: itemIndex,
                                  item,
                                  field,
                                  items: _ctx.items,
                                  toggleDetails: () => toggleRowDetails(item),
                                  detailsShowing: unref46(isTableItem)(item) ? detailsMap.value.get(item) ?? false : false
                                },
                                () => [
                                  !slots[`cell(${String(field.key)})`] && !slots["cell()"] ? (openBlock48(), createElementBlock35(Fragment19, { key: 0 }, [
                                    createTextVNode26(toDisplayString28(unref46(formatItem)(item, String(field.key), field.formatter)), 1)
                                  ], 64)) : createCommentVNode21("", true)
                                ]
                              )
                            ]),
                            _: 2
                          }, 1040, ["variant", "class"]);
                        }), 128))
                      ]),
                      _: 2
                    }, 1040, ["class", "variant", "onClick", "onDblclick", "onContextmenu", "onMouseenter", "onMouseleave", "onMousedown"]),
                    unref46(isTableItem)(item) && detailsMap.value.get(item) === true && slots["row-details"] ? (openBlock48(), createElementBlock35(Fragment19, { key: 0 }, [
                      createVNode15(_sfc_main$27, {
                        "aria-hidden": "true",
                        role: "presentation",
                        class: "d-none"
                      }),
                      createVNode15(_sfc_main$27, mergeProps31({
                        class: getRowClasses(item, "row-details"),
                        variant: item._rowVariant,
                        ref_for: true
                      }, callTbodyTrAttrs(item, "row-details")), {
                        default: withCtx37(() => [
                          createVNode15(_sfc_main$63, {
                            colspan: computedFieldsTotal.value,
                            class: normalizeClass38(_ctx.detailsTdClass)
                          }, {
                            default: withCtx37(() => [
                              renderSlot43(_ctx.$slots, "row-details", {
                                item,
                                toggleDetails: () => toggleRowDetails(item),
                                fields: computedFields.value,
                                index: itemIndex
                              })
                            ]),
                            _: 2
                          }, 1032, ["colspan", "class"])
                        ]),
                        _: 2
                      }, 1040, ["class", "variant"])
                    ], 64)) : createCommentVNode21("", true)
                  ], 64);
                }), 128)),
                !unref46(props).stacked && slots["bottom-row"] ? (openBlock48(), createBlock38(_sfc_main$27, mergeProps31({
                  key: 1,
                  class: ["bottom-row", getRowClasses(null, "row-bottom")]
                }, callTbodyTrAttrs(null, "row-bottom")), {
                  default: withCtx37(() => [
                    renderSlot43(_ctx.$slots, "bottom-row", {
                      columns: computedFieldsTotal.value,
                      fields: computedFields.value
                    })
                  ]),
                  _: 3
                }, 16, ["class"])) : createCommentVNode21("", true)
              ])
            ]),
            _: 3
          }, 8, ["class"]),
          unref46(props).footClone ? (openBlock48(), createBlock38(_sfc_main$53, normalizeProps11(mergeProps31({ key: 0 }, footerProps.value)), {
            default: withCtx37(() => [
              createVNode15(_sfc_main$27, {
                variant: unref46(props).footRowVariant,
                class: normalizeClass38(unref46(props).tfootTrClass)
              }, {
                default: withCtx37(() => [
                  (openBlock48(true), createElementBlock35(Fragment19, null, renderList11(computedFields.value, (field) => {
                    return openBlock48(), createBlock38(_sfc_main$45, mergeProps31({
                      key: field.key,
                      scope: "col",
                      class: getFieldColumnClasses(field),
                      title: field.headerTitle,
                      abbr: field.headerAbbr,
                      style: field.thStyle,
                      variant: field.variant,
                      ref_for: true
                    }, callThAttr(null, field, "bottom"), {
                      onClick: ($event) => headerClicked(field, $event, true)
                    }), {
                      default: withCtx37(() => [
                        createElementVNode21("div", _hoisted_2$1, [
                          createElementVNode21("div", null, [
                            renderSlot43(
                              _ctx.$slots,
                              slots[`foot(${String(field.key)})`] ? `foot(${String(field.key)})` : "foot()",
                              {
                                label: field.label,
                                column: field.key,
                                field,
                                isFoot: true
                              },
                              () => [
                                createTextVNode26(toDisplayString28(unref46(getTableFieldHeadLabel)(field)), 1)
                              ]
                            )
                          ])
                        ])
                      ]),
                      _: 2
                    }, 1040, ["class", "title", "abbr", "style", "variant", "onClick"]);
                  }), 128))
                ]),
                _: 3
              }, 8, ["variant", "class"])
            ]),
            _: 3
          }, 16)) : slots["custom-foot"] ? (openBlock48(), createBlock38(_sfc_main$53, normalizeProps11(mergeProps31({ key: 1 }, footerProps.value)), {
            default: withCtx37(() => [
              renderSlot43(_ctx.$slots, "custom-foot", {
                fields: computedFields.value,
                items: unref46(props).items,
                columns: computedFieldsTotal.value
              })
            ]),
            _: 3
          }, 16)) : createCommentVNode21("", true),
          slots["table-caption"] || unref46(props).caption ? (openBlock48(), createElementBlock35("caption", _hoisted_3$1, [
            renderSlot43(_ctx.$slots, "table-caption", {}, () => [
              createTextVNode26(toDisplayString28(unref46(props).caption), 1)
            ])
          ])) : createCommentVNode21("", true)
        ]),
        _: 3
      }, 16);
    };
  }
});
var _hoisted_131 = {
  style: { opacity: 0.4 },
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "currentColor",
  class: "bi bi-arrow-up-short",
  viewBox: "0 0 16 16",
  "aria-hidden": ""
};
var _hoisted_216 = {
  role: "alert",
  "aria-live": "polite"
};
var _hoisted_35 = { class: "text-center my-2" };
var _sfc_main50 = defineComponent51({
  __name: "BTable",
  props: mergeModels21({
    provider: { default: void 0 },
    noProvider: { default: void 0 },
    noProviderPaging: { type: Boolean, default: false },
    noProviderSorting: { type: Boolean, default: false },
    noProviderFiltering: { type: Boolean, default: false },
    mustSort: { type: [Boolean, Array], default: false },
    selectable: { type: Boolean, default: false },
    multisort: { type: Boolean, default: false },
    stickySelect: { type: Boolean, default: false },
    selectHead: { type: [Boolean, String], default: true },
    selectMode: { default: "multi" },
    selectionVariant: { default: "primary" },
    busyLoadingText: { default: "Loading..." },
    perPage: { default: Number.POSITIVE_INFINITY },
    currentPage: { default: 1 },
    filter: { default: void 0 },
    filterable: { default: void 0 },
    noLocalSorting: { type: Boolean, default: false },
    noSelectOnClick: { type: Boolean, default: false },
    noSortableIcon: { type: Boolean, default: false },
    emptyFilteredText: { default: "There are no records matching your request" },
    emptyText: { default: "There are no records to show" },
    showEmpty: { type: Boolean, default: false },
    align: { default: void 0 },
    caption: { default: void 0 },
    detailsTdClass: { default: void 0 },
    fieldColumnClass: { type: [Function, String, Object, Array], default: void 0 },
    fields: { default: () => [] },
    footClone: { type: Boolean, default: void 0 },
    footRowVariant: { default: void 0 },
    footVariant: { default: void 0 },
    headRowVariant: { default: void 0 },
    headVariant: { default: void 0 },
    items: { default: () => [] },
    labelStacked: { type: Boolean, default: void 0 },
    modelValue: { default: void 0 },
    primaryKey: { default: void 0 },
    tbodyClass: { default: void 0 },
    tbodyTrAttrs: {},
    tbodyTrClass: { type: [Function, String, Array, Object], default: void 0 },
    tfootClass: { default: void 0 },
    tfootTrClass: { default: void 0 },
    theadClass: { default: void 0 },
    theadTrClass: { default: void 0 },
    bordered: { type: Boolean, default: void 0 },
    borderless: { type: Boolean, default: void 0 },
    borderVariant: { default: void 0 },
    captionTop: { type: Boolean, default: void 0 },
    dark: { type: Boolean, default: void 0 },
    fixed: { type: Boolean, default: void 0 },
    hover: { type: Boolean, default: void 0 },
    id: { default: void 0 },
    noBorderCollapse: { type: Boolean, default: void 0 },
    outlined: { type: Boolean, default: void 0 },
    responsive: { type: [Boolean, String], default: void 0 },
    small: { type: Boolean, default: void 0 },
    stacked: { type: [Boolean, String], default: void 0 },
    stickyHeader: { type: [Boolean, String, Number], default: void 0 },
    striped: { type: Boolean, default: void 0 },
    stripedColumns: { type: Boolean, default: void 0 },
    variant: { default: void 0 },
    tableAttrs: {}
  }, {
    "sortBy": {
      default: void 0
    },
    "sortByModifiers": {},
    "busy": { type: Boolean, ...{
      default: false
    } },
    "busyModifiers": {},
    "selectedItems": {
      default: () => []
    },
    "selectedItemsModifiers": {}
  }),
  emits: mergeModels21(["filtered", "head-clicked", "row-clicked", "row-dblclicked", "row-contextmenu", "row-hovered", "row-unhovered", "row-middle-clicked", "row-selected", "row-unselected", "sorted", "change"], ["update:sortBy", "update:busy", "update:selectedItems"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BTable");
    const emit = __emit;
    const slots = useSlots15();
    const dynamicCellSlots = computed65(
      () => Object.keys(slots).filter((key) => key.startsWith("cell("))
    );
    const dynamicFootSlots = computed65(
      () => Object.keys(slots).filter((key) => key.startsWith("foot("))
    );
    const sortByModel = useModel21(__props, "sortBy");
    const busyModel = useModel21(__props, "busy");
    const selectedItemsModel = useModel21(
      __props,
      "selectedItems"
    );
    const selectedItemsToSet = computed65({
      get: () => /* @__PURE__ */ new Set([...selectedItemsModel.value]),
      set: (val) => {
        selectedItemsModel.value = [...val];
      }
    });
    watch18(selectedItemsToSet, (newValue, oldValue) => {
      Array.from(oldValue).filter((item) => !newValue.has(item)).forEach((item) => {
        emit("row-unselected", item);
      });
      Array.from(newValue).filter((item) => !oldValue.has(item)).forEach((item) => {
        emit("row-selected", item);
      });
    });
    const selectedItemsSetUtilities = {
      add: (item) => {
        const value = new Set(selectedItemsToSet.value);
        value.add(item);
        selectedItemsToSet.value = value;
      },
      clear: () => {
        selectedItemsToSet.value.forEach((item) => {
          selectedItemsSetUtilities.delete(item);
        });
      },
      delete: (item) => {
        const value = new Set(selectedItemsToSet.value);
        if (props.primaryKey) {
          const pkey = props.primaryKey;
          selectedItemsModel.value.forEach((v, i) => {
            const selectedKey = get(v, pkey);
            const itemKey = get(item, pkey);
            if (!!selectedKey && !!itemKey && selectedKey === itemKey) {
              value.delete(selectedItemsModel.value[i]);
            }
          });
        } else {
          value.delete(item);
        }
        selectedItemsToSet.value = value;
      },
      set: (items) => {
        selectedItemsToSet.value = new Set(items);
      },
      has: (item) => {
        if (!props.primaryKey)
          return selectedItemsToSet.value.has(item);
        const pkey = props.primaryKey;
        for (const selected of selectedItemsToSet.value) {
          const selectedKey = get(selected, pkey);
          const itemKey = get(item, pkey);
          if (!!selectedKey && !!itemKey && selectedKey === itemKey)
            return true;
        }
        return false;
      }
    };
    const internalItems = ref17([]);
    const perPageNumber = useToNumber(() => props.perPage, { method: "parseInt" });
    const currentPageNumber = useToNumber(() => props.currentPage, { method: "parseInt" });
    const isFilterableTable = computed65(() => !!props.filter);
    const usesProvider = computed65(() => props.provider !== void 0);
    const isSelecting = computed65(() => selectedItemsToSet.value.size > 0);
    const isSortable = computed65(
      () => sortByModel.value !== void 0 || props.fields.some(
        (field) => typeof field === "object" && field !== null && field.sortable === true
      )
    );
    const computedFields = computed65(
      () => props.fields.map((el) => {
        var _a;
        if (!isTableField(el)) {
          const label = startCase(el);
          return {
            key: el,
            label,
            tdAttr: props.stacked === true ? { "data-label": label } : void 0
          };
        }
        const value = (_a = sortByModel.value) == null ? void 0 : _a.find((sb) => el.key === sb.key);
        const sortValue = isSortable.value === false ? void 0 : value === void 0 ? "none" : value.order === "desc" ? "descending" : value.order === "asc" ? "ascending" : "none";
        return {
          ...el,
          thAttr: {
            "aria-sort": sortValue,
            ...el.thAttr
          }
        };
      })
    );
    const tableClasses = computed65(() => ({
      "b-table-busy": busyModel.value,
      "b-table-selectable": props.selectable,
      "user-select-none": props.selectable && isSelecting.value
    }));
    const getBusyRowClasses = computed65(() => [
      props.tbodyTrClass ? typeof props.tbodyTrClass === "function" ? props.tbodyTrClass(null, "table-busy") : props.tbodyTrClass : null
    ]);
    const getFieldColumnClasses = (field) => [
      {
        "b-table-sortable-column": isSortable.value && field.sortable
      }
    ];
    const getRowClasses = (item, type) => [
      {
        [`selected table-${props.selectionVariant}`]: props.selectable && !!item && selectedItemsSetUtilities.has(item)
      },
      props.tbodyTrClass ? typeof props.tbodyTrClass === "function" ? props.tbodyTrClass(item, type) : props.tbodyTrClass : null
    ];
    const getFormatter = (value) => typeof value.sortByFormatted === "function" ? value.sortByFormatted : value.formatter;
    const computedItems = computed65(() => {
      const sortItems = (items) => {
        var _a;
        const sortByItems = (_a = sortByModel.value) == null ? void 0 : _a.filter((el) => !!el.order);
        if (!sortByItems || sortByItems.length === 0)
          return items;
        return [...items].sort((a, b) => {
          for (let i = 0; i < (sortByItems.length ?? 0); i++) {
            const sortOption = sortByItems[i];
            const realVal = (ob) => {
              if (!isTableItem(ob))
                return String(ob);
              const sortField = computedFields.value.find((el) => {
                if (isTableField(el))
                  return el.key === sortOption.key;
                return false;
              });
              const val = get(ob, sortOption.key);
              if (isTableField(sortField) && !!sortField.sortByFormatted) {
                const formatter = getFormatter(sortField);
                if (formatter) {
                  return String(formatItem(ob, String(sortField.key), formatter));
                }
              }
              return typeof val === "object" && val !== null ? JSON.stringify(val) : (val == null ? void 0 : val.toString()) ?? "";
            };
            const aValue = realVal(a);
            const bValue = realVal(b);
            const comparison = sortOption.comparer ? sortOption.comparer(aValue, bValue) : aValue.localeCompare(bValue, void 0, { numeric: true });
            if (comparison !== 0) {
              return sortOption.order === "asc" ? comparison : -comparison;
            }
          }
          return 0;
        });
      };
      const filterItems = (items) => items.filter(
        (item) => isTableItem(item) ? Object.entries(item).some(([key, val]) => {
          var _a, _b, _c;
          if (val === null || val === void 0 || key[0] === "_" || !((_a = props.filterable) == null ? void 0 : _a.includes(key)) && !!((_b = props.filterable) == null ? void 0 : _b.length))
            return false;
          const realVal = () => {
            const filterField = computedFields.value.find((el) => {
              if (isTableField(el))
                return el.key === key;
              return false;
            });
            if (isTableField(filterField) && !!filterField.filterByFormatted) {
              const formatter = getFormatter(filterField);
              if (formatter) {
                return String(formatter(val, String(filterField.key), item));
              }
            }
            return typeof val === "object" ? JSON.stringify(Object.values(val)) : val.toString();
          };
          const itemValue = realVal();
          return itemValue.toLowerCase().includes(((_c = props.filter) == null ? void 0 : _c.toLowerCase()) ?? "");
        }) : true
      );
      let mappedItems = usesProvider.value ? internalItems.value : props.items;
      mappedItems = mappedItems.map((item) => {
        if (typeof item === "object" && item !== null && Object.keys(item).some((key) => key.includes("."))) {
          let newItem = {};
          for (const key in item) {
            if (key.includes(".")) {
              newItem = set(newItem, key, item[key]);
            } else {
              newItem[key] = item[key];
            }
          }
          return newItem;
        }
        return item;
      });
      if (isFilterableTable.value === true && !usesProvider.value || isFilterableTable.value === true && usesProvider.value && props.noProviderFiltering) {
        mappedItems = filterItems(mappedItems);
      }
      if (isSortable.value === true && !usesProvider.value && !props.noLocalSorting || isSortable.value === true && usesProvider.value && props.noProviderSorting) {
        mappedItems = sortItems(mappedItems);
      }
      return mappedItems;
    });
    const emptySlotScope = computed65(() => ({
      emptyFilteredText: props.emptyFilteredText,
      emptyText: props.emptyText,
      fields: computedFields.value,
      items: computedItems.value
    }));
    const computedDisplayItems = computed65(() => {
      if (Number.isNaN(perPageNumber.value) || usesProvider.value && !props.noProviderPaging) {
        return computedItems.value;
      }
      return computedItems.value.slice(
        (currentPageNumber.value - 1) * (perPageNumber.value || Number.POSITIVE_INFINITY),
        currentPageNumber.value * (perPageNumber.value || Number.POSITIVE_INFINITY)
      );
    });
    watch18(computedDisplayItems, (v) => {
      emit("change", v);
    });
    const handleRowSelection = (row, index8, shiftClicked = false, ctrlClicked = false, metaClicked = false) => {
      if (!props.selectable)
        return;
      if (props.selectMode === "single" || props.selectMode === "multi") {
        if (shiftClicked || ctrlClicked)
          return;
        if (selectedItemsSetUtilities.has(row)) {
          selectedItemsSetUtilities.delete(row);
        } else {
          if (props.selectMode === "single") {
            selectedItemsSetUtilities.set([row]);
          } else {
            selectedItemsSetUtilities.add(row);
          }
        }
      } else {
        if (ctrlClicked || metaClicked) {
          if (selectedItemsSetUtilities.has(row)) {
            selectedItemsSetUtilities.delete(row);
          } else {
            selectedItemsSetUtilities.add(row);
          }
        } else if (shiftClicked) {
          const lastSelectedItem = [...selectedItemsToSet.value].pop();
          const lastSelectedIndex = computedItems.value.findIndex((i) => i === lastSelectedItem);
          const selectStartIndex = Math.min(lastSelectedIndex, index8);
          const selectEndIndex = Math.max(lastSelectedIndex, index8);
          const items = computedItems.value.slice(selectStartIndex, selectEndIndex + 1);
          selectedItemsSetUtilities.set(items);
        } else {
          selectedItemsSetUtilities.set([row]);
        }
      }
    };
    const onRowClick = (row, index8, e) => {
      if (props.noSelectOnClick === false) {
        handleRowSelection(row, index8, e.shiftKey, e.ctrlKey, e.metaKey);
      }
      emit("row-clicked", row, index8, e);
    };
    const handleFieldSorting = (field) => {
      var _a, _b;
      if (!isSortable.value)
        return;
      const fieldKey = typeof field === "object" && field !== null ? field.key : field;
      const fieldSortable = typeof field === "object" && field !== null ? field.sortable : false;
      if (!(isSortable.value === true && fieldSortable === true))
        return;
      const resolveOrder = (val) => {
        if (val === "asc")
          return "desc";
        if (val === void 0)
          return "asc";
        if (props.mustSort === true || Array.isArray(props.mustSort) && props.mustSort.includes(fieldKey))
          return "asc";
        return void 0;
      };
      const index8 = ((_a = sortByModel.value) == null ? void 0 : _a.findIndex((el) => el.key === fieldKey)) ?? -1;
      const originalValue = (_b = sortByModel.value) == null ? void 0 : _b[index8];
      const updatedValue = (
        // If value is new, we default to ascending
        // Otherwise we make a temp copy of the value
        index8 === -1 || !originalValue ? { key: fieldKey, order: "asc" } : { ...originalValue }
      );
      const handleMultiSort = () => {
        var _a2, _b2;
        let val = updatedValue;
        if (index8 === -1) {
          sortByModel.value = [...sortByModel.value ?? [], updatedValue];
        } else {
          const order = resolveOrder(updatedValue.order);
          val = { ...updatedValue, order };
          sortByModel.value = order ? (_a2 = sortByModel.value) == null ? void 0 : _a2.map((el) => el.key === val.key ? val : el) : (_b2 = sortByModel.value) == null ? void 0 : _b2.filter((el) => el.key !== val.key);
        }
        return val;
      };
      const handleSingleSort = () => {
        const val = {
          ...updatedValue,
          order: index8 === -1 ? updatedValue.order : resolveOrder(updatedValue.order)
        };
        sortByModel.value = [val];
        return val;
      };
      emit("sorted", props.multisort === true ? handleMultiSort() : handleSingleSort());
    };
    const onFieldHeadClick = (fieldKey, field, event, isFooter = false) => {
      emit("head-clicked", fieldKey, field, event, isFooter);
      handleFieldSorting(field);
    };
    const callItemsProvider = async () => {
      if (!usesProvider.value || props.provider === void 0 || busyModel.value)
        return;
      busyModel.value = true;
      const response = props.provider({
        currentPage: currentPageNumber.value,
        filter: props.filter,
        sortBy: sortByModel.value,
        perPage: perPageNumber.value
      });
      try {
        const items = response instanceof Promise ? await response : response;
        if (items === void 0)
          return;
        internalItems.value = items;
      } finally {
        busyModel.value = false;
      }
    };
    const providerPropsWatch = async (prop, val, oldVal) => {
      if (val === oldVal)
        return;
      const inNoProvider = (key) => {
        var _a;
        return ((_a = props.noProvider) == null ? void 0 : _a.includes(key)) === true;
      };
      const noProvideWhenPaging = (prop === "currentPage" || prop === "perPage") && (inNoProvider("paging") || props.noProviderPaging === true);
      const noProvideWhenFiltering = prop === "filter" && (inNoProvider("filtering") || props.noProviderFiltering === true);
      const noProvideWhenSorting = (prop === "sortBy" || prop === "sortDesc") && (inNoProvider("sorting") || props.noProviderSorting === true);
      if (noProvideWhenPaging || noProvideWhenFiltering || noProvideWhenSorting)
        return;
      if (usesProvider.value === true) {
        await callItemsProvider();
      }
      if (!(prop === "currentPage" || prop === "perPage")) {
        emit("filtered", [...computedItems.value]);
      }
    };
    watch18(
      () => props.filter,
      (filter, oldFilter) => {
        providerPropsWatch("filter", filter, oldFilter);
        if (filter === oldFilter || usesProvider.value)
          return;
        if (!filter) {
          emit("filtered", [...computedItems.value]);
        }
      }
    );
    watch18(currentPageNumber, (val, oldVal) => {
      providerPropsWatch("currentPage", val, oldVal);
    });
    watch18(perPageNumber, (val, oldVal) => {
      providerPropsWatch("perPage", val, oldVal);
    });
    watch18(
      sortByModel,
      (val, oldVal) => {
        providerPropsWatch("sortBy", val, oldVal);
      },
      { deep: true }
    );
    watch18(
      () => props.provider,
      (newValue) => {
        if (newValue === void 0) {
          internalItems.value = [];
          return;
        }
        callItemsProvider();
      }
    );
    onMounted12(callItemsProvider);
    const exposedSelectableUtilities = {
      clearSelected: () => {
        if (!props.selectable)
          return;
        selectedItemsSetUtilities.clear();
      },
      selectAllRows: () => {
        if (!props.selectable)
          return;
        selectedItemsToSet.value = /* @__PURE__ */ new Set([...computedItems.value]);
      },
      selectRow: (index8) => {
        if (!props.selectable)
          return;
        const item = computedItems.value[index8];
        if (!item || selectedItemsSetUtilities.has(item))
          return;
        selectedItemsSetUtilities.add(item);
      },
      unselectRow: (index8) => {
        if (!props.selectable)
          return;
        const item = computedItems.value[index8];
        if (!item || !selectedItemsSetUtilities.has(item))
          return;
        selectedItemsSetUtilities.delete(item);
      },
      isRowSelected: (index8) => {
        if (!props.selectable)
          return false;
        const item = computedItems.value[index8];
        return selectedItemsSetUtilities.has(item);
      }
    };
    const computedLiteProps = computed65(() => ({
      ...pick(props, [...btableLiteProps, ...btableSimpleProps]),
      tableAttrs: {
        ariaBusy: busyModel.value
      },
      items: computedDisplayItems.value,
      fields: computedFields.value,
      tableClass: tableClasses.value,
      tbodyTrClass: getRowClasses,
      fieldColumnClass: getFieldColumnClasses
    }));
    __expose({
      // The row selection methods are really for compat. Users should probably use the v-model though
      ...exposedSelectableUtilities,
      refresh: callItemsProvider
    });
    return (_ctx, _cache) => {
      return openBlock48(), createBlock38(_sfc_main$122, mergeProps31(computedLiteProps.value, {
        onHeadClicked: onFieldHeadClick,
        onRowClicked: onRowClick,
        onRowDblclicked: _cache[0] || (_cache[0] = (row, index8, e) => {
          emit("row-dblclicked", row, index8, e);
        }),
        onRowContextmenu: _cache[1] || (_cache[1] = (row, index8, e) => {
          emit("row-contextmenu", row, index8, e);
        }),
        onRowHovered: _cache[2] || (_cache[2] = (row, index8, e) => {
          emit("row-hovered", row, index8, e);
        }),
        onRowUnhovered: _cache[3] || (_cache[3] = (row, index8, e) => {
          emit("row-unhovered", row, index8, e);
        }),
        onRowMiddleClicked: _cache[4] || (_cache[4] = (row, index8, e) => {
          emit("row-middle-clicked", row, index8, e);
        })
      }), createSlots3({
        "custom-body": withCtx37((scope) => [
          busyModel.value && slots["table-busy"] ? (openBlock48(), createBlock38(_sfc_main$27, {
            key: 0,
            class: normalizeClass38(["b-table-busy-slot", getBusyRowClasses.value])
          }, {
            default: withCtx37(() => [
              createVNode15(_sfc_main$63, {
                colspan: scope.fields.length
              }, {
                default: withCtx37(() => [
                  renderSlot43(_ctx.$slots, "table-busy")
                ]),
                _: 2
              }, 1032, ["colspan"])
            ]),
            _: 2
          }, 1032, ["class"])) : unref46(props).showEmpty === true && computedItems.value.length === 0 ? (openBlock48(), createBlock38(_sfc_main$27, {
            key: 1,
            class: "b-table-empty-row"
          }, {
            default: withCtx37(() => [
              createVNode15(_sfc_main$63, {
                colspan: computedFields.value.length
              }, {
                default: withCtx37(() => [
                  createElementVNode21("div", _hoisted_216, [
                    createElementVNode21("div", _hoisted_35, [
                      isFilterableTable.value ? renderSlot43(_ctx.$slots, "empty-filtered", normalizeProps11(mergeProps31({ key: 0 }, emptySlotScope.value)), () => [
                        createTextVNode26(toDisplayString28(unref46(props).emptyFilteredText), 1)
                      ]) : renderSlot43(_ctx.$slots, "empty", normalizeProps11(mergeProps31({ key: 1 }, emptySlotScope.value)), () => [
                        createTextVNode26(toDisplayString28(unref46(props).emptyText), 1)
                      ])
                    ])
                  ])
                ]),
                _: 3
              }, 8, ["colspan"])
            ]),
            _: 3
          })) : createCommentVNode21("", true)
        ]),
        _: 2
      }, [
        slots["thead-top"] ? {
          name: "thead-top",
          fn: withCtx37((scope) => [
            renderSlot43(_ctx.$slots, "thead-top", mergeProps31(scope, {
              clearSelected: exposedSelectableUtilities.clearSelected,
              selectAllRows: exposedSelectableUtilities.selectAllRows,
              fields: computedFields.value
            }))
          ]),
          key: "0"
        } : void 0,
        slots["thead-sub"] ? {
          name: "thead-sub",
          fn: withCtx37((scope) => [
            renderSlot43(_ctx.$slots, "thead-sub", mergeProps31(scope, { fields: computedFields.value }))
          ]),
          key: "1"
        } : void 0,
        slots["top-row"] ? {
          name: "top-row",
          fn: withCtx37((scope) => [
            renderSlot43(_ctx.$slots, "top-row", mergeProps31(scope, { fields: computedFields.value }))
          ]),
          key: "2"
        } : void 0,
        slots["row-details"] ? {
          name: "row-details",
          fn: withCtx37((scope) => [
            renderSlot43(_ctx.$slots, "row-details", mergeProps31(scope, {
              fields: computedFields.value,
              selectRow: (index8 = scope.index) => exposedSelectableUtilities.selectRow(index8),
              unselectRow: (index8 = scope.index) => exposedSelectableUtilities.unselectRow(index8),
              rowSelected: exposedSelectableUtilities.isRowSelected(scope.index)
            }))
          ]),
          key: "3"
        } : void 0,
        slots["bottom-row"] ? {
          name: "bottom-row",
          fn: withCtx37((scope) => [
            renderSlot43(_ctx.$slots, "bottom-row", mergeProps31(scope, { fields: computedFields.value }))
          ]),
          key: "4"
        } : void 0,
        slots["custom-foot"] ? {
          name: "custom-foot",
          fn: withCtx37((scope) => [
            renderSlot43(_ctx.$slots, "custom-foot", mergeProps31(scope, { fields: computedFields.value }))
          ]),
          key: "5"
        } : void 0,
        slots["table-caption"] ? {
          name: "table-caption",
          fn: withCtx37(() => [
            renderSlot43(_ctx.$slots, "table-caption")
          ]),
          key: "6"
        } : void 0,
        renderList11(dynamicCellSlots.value, (name) => {
          return {
            name,
            fn: withCtx37((scope) => [
              renderSlot43(_ctx.$slots, name, mergeProps31(scope, {
                selectRow: (index8 = scope.index) => exposedSelectableUtilities.selectRow(index8),
                unselectRow: (index8 = scope.index) => exposedSelectableUtilities.unselectRow(index8),
                rowSelected: exposedSelectableUtilities.isRowSelected(scope.index)
              }))
            ])
          };
        }),
        renderList11(dynamicFootSlots.value, (name) => {
          return {
            name,
            fn: withCtx37((scope) => [
              renderSlot43(_ctx.$slots, name, mergeProps31(scope, {
                selectAllRows: exposedSelectableUtilities.selectAllRows,
                clearSelected: exposedSelectableUtilities.clearSelected
              }))
            ])
          };
        }),
        renderList11(computedFields.value, (field) => {
          return {
            name: `head(${String(field.key)})`,
            fn: withCtx37((scope) => {
              var _a, _b, _c, _d;
              return [
                renderSlot43(
                  _ctx.$slots,
                  slots[`head(${String(field.key)})`] ? `head(${String(field.key)})` : "head()",
                  mergeProps31(scope, {
                    selectAllRows: exposedSelectableUtilities.selectAllRows,
                    clearSelected: exposedSelectableUtilities.clearSelected
                  }),
                  () => [
                    createTextVNode26(toDisplayString28(unref46(getTableFieldHeadLabel)(field)), 1)
                  ]
                ),
                isSortable.value && !!scope.field.sortable && unref46(props).noSortableIcon === false ? (openBlock48(), createElementBlock35(Fragment19, { key: 0 }, [
                  ((_b = (_a = sortByModel.value) == null ? void 0 : _a.find((el) => el.key === scope.field.key)) == null ? void 0 : _b.order) === "asc" ? renderSlot43(
                    _ctx.$slots,
                    slots[`sortAsc(${String(scope.field.key)})`] ? `sortAsc(${String(scope.field.key)})` : "sortAsc()",
                    normalizeProps11(mergeProps31({ key: 0 }, scope)),
                    () => [
                      _cache[5] || (_cache[5] = createElementVNode21("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "24",
                        height: "24",
                        fill: "currentColor",
                        class: "bi bi-arrow-up-short",
                        viewBox: "0 0 16 16",
                        "aria-hidden": ""
                      }, [
                        createElementVNode21("path", {
                          "fill-rule": "evenodd",
                          d: "M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
                        })
                      ], -1))
                    ]
                  ) : ((_d = (_c = sortByModel.value) == null ? void 0 : _c.find((el) => el.key === scope.field.key)) == null ? void 0 : _d.order) === "desc" ? renderSlot43(
                    _ctx.$slots,
                    slots[`sortDesc(${String(scope.field.key)})`] ? `sortDesc(${String(scope.field.key)})` : "sortDesc()",
                    normalizeProps11(mergeProps31({ key: 1 }, scope)),
                    () => [
                      _cache[6] || (_cache[6] = createElementVNode21("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "24",
                        height: "24",
                        fill: "currentColor",
                        class: "bi bi-arrow-down-short",
                        viewBox: "0 0 16 16",
                        "aria-hidden": ""
                      }, [
                        createElementVNode21("path", {
                          "fill-rule": "evenodd",
                          d: "M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
                        })
                      ], -1))
                    ]
                  ) : renderSlot43(
                    _ctx.$slots,
                    slots[`sortDefault(${String(scope.field.key)})`] ? `sortDefault(${String(scope.field.key)})` : "sortDefault()",
                    normalizeProps11(mergeProps31({ key: 2 }, scope)),
                    () => [
                      (openBlock48(), createElementBlock35("svg", _hoisted_131, _cache[7] || (_cache[7] = [
                        createElementVNode21("path", {
                          "fill-rule": "evenodd",
                          d: "M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
                        }, null, -1)
                      ])))
                    ]
                  )
                ], 64)) : createCommentVNode21("", true)
              ];
            })
          };
        })
      ]), 1040);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BTabs.vue_vue_type_script_setup_true_lang-C1QBQZAw.mjs
import { defineComponent as defineComponent52, mergeModels as mergeModels22, useSlots as useSlots16, useModel as useModel22, inject as inject21, ref as ref18, useTemplateRef as useTemplateRef22, useAttrs as useAttrs7, computed as computed66, onMounted as onMounted13, onUnmounted as onUnmounted2, watch as watch19, openBlock as openBlock49, createBlock as createBlock39, resolveDynamicComponent as resolveDynamicComponent29, unref as unref47, mergeProps as mergeProps32, withCtx as withCtx38, renderSlot as renderSlot44, createCommentVNode as createCommentVNode22, nextTick as nextTick13, provide as provide15, toRef as toRef19, normalizeClass as normalizeClass39, createVNode as createVNode16, createElementVNode as createElementVNode22, createElementBlock as createElementBlock36, Fragment as Fragment20, renderList as renderList12, withKeys, withModifiers as withModifiers3, createTextVNode as createTextVNode27, toDisplayString as toDisplayString29 } from "vue";
var _sfc_main$123 = defineComponent52({
  ...{
    inheritAttrs: false
  },
  __name: "BTab",
  props: mergeModels22({
    buttonId: { default: void 0 },
    disabled: { type: Boolean, default: false },
    id: { default: void 0 },
    lazy: { type: Boolean, default: void 0 },
    lazyOnce: { type: Boolean, default: void 0 },
    noBody: { type: Boolean, default: false },
    tag: { default: "div" },
    title: { default: void 0 },
    titleItemClass: { default: void 0 },
    titleLinkAttrs: { default: void 0 },
    titleLinkClass: { default: void 0 }
  }, {
    "active": { type: Boolean, ...{
      default: false
    } },
    "activeModifiers": {}
  }),
  emits: ["update:active"],
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BTab");
    const slots = useSlots16();
    const activeModel = useModel22(__props, "active");
    const parentData = inject21(tabsInjectionKey, null);
    const computedId = useId(() => props.id, "tabpane");
    const computedButtonId = useId(() => props.buttonId, "tab");
    const lazyRenderCompleted = ref18(false);
    const el = useTemplateRef22("_el");
    const { onClick, ...attrs } = useAttrs7();
    const tab = computed66(
      () => ({
        id: computedId.value,
        buttonId: computedButtonId.value,
        disabled: props.disabled,
        title: props.title,
        titleComponent: slots.title,
        titleItemClass: () => props.titleItemClass,
        titleLinkAttrs: () => props.titleLinkAttrs,
        titleLinkClass: () => props.titleLinkClass,
        onClick,
        el: el.value
      })
    );
    onMounted13(() => {
      if (!parentData)
        return;
      parentData.registerTab(tab);
      if (activeModel.value) {
        parentData.activateTab(computedId.value);
      }
    });
    onUnmounted2(() => {
      if (!parentData)
        return;
      parentData.unregisterTab(computedId.value);
    });
    const isActive = computed66(() => (parentData == null ? void 0 : parentData.activeId.value) === computedId.value);
    const show = ref18(isActive.value);
    const computedLazy = computed66(() => !!((parentData == null ? void 0 : parentData.lazy.value) || (props.lazyOnce ?? props.lazy)));
    const computedLazyOnce = computed66(() => props.lazyOnce !== void 0);
    const computedActive = computed66(() => isActive.value && !props.disabled);
    const showSlot = computed66(
      () => computedActive.value || !computedLazy.value || computedLazy.value && computedLazyOnce.value && lazyRenderCompleted.value
    );
    watch19(isActive, (active) => {
      if (active) {
        activeModel.value = true;
        setTimeout(() => {
          show.value = true;
        }, 0);
        return;
      }
      show.value = false;
      activeModel.value = false;
    });
    watch19(activeModel, (active) => {
      if (!parentData)
        return;
      if (!active) {
        if (isActive.value) {
          parentData.activateTab(void 0);
        }
        return;
      }
      parentData.activateTab(computedId.value);
    });
    const computedClasses = computed66(() => [
      {
        "active": isActive.value,
        "show": show.value,
        "card-body": (parentData == null ? void 0 : parentData.card.value) && props.noBody === false,
        "fade": !(parentData == null ? void 0 : parentData.noFade.value)
      },
      show.value ? parentData == null ? void 0 : parentData.activeTabClass.value : parentData == null ? void 0 : parentData.inactiveTabClass.value,
      parentData == null ? void 0 : parentData.tabClass.value
    ]);
    watch19(showSlot, (shown) => {
      if (shown && !lazyRenderCompleted.value)
        lazyRenderCompleted.value = true;
    });
    return (_ctx, _cache) => {
      return openBlock49(), createBlock39(resolveDynamicComponent29(unref47(props).tag), mergeProps32({
        id: unref47(computedId),
        ref: "_el",
        class: ["tab-pane", computedClasses.value],
        role: "tabpanel",
        "aria-labelledby": unref47(computedButtonId)
      }, attrs), {
        default: withCtx38(() => [
          showSlot.value ? renderSlot44(_ctx.$slots, "default", { key: 0 }) : createCommentVNode22("", true)
        ]),
        _: 3
      }, 16, ["id", "class", "aria-labelledby"]);
    };
  }
});
var _hoisted_133 = ["aria-orientation"];
var _hoisted_217 = ["id", "aria-controls", "aria-selected", "onClick"];
var _sfc_main51 = defineComponent52({
  __name: "BTabs",
  props: mergeModels22({
    activeNavItemClass: { default: void 0 },
    activeTabClass: { default: void 0 },
    align: { default: void 0 },
    card: { type: Boolean, default: false },
    contentClass: { default: void 0 },
    end: { type: Boolean, default: false },
    fill: { type: Boolean, default: false },
    id: { default: void 0 },
    inactiveNavItemClass: { default: void 0 },
    inactiveTabClass: { default: void 0 },
    justified: { type: Boolean, default: false },
    lazy: { type: Boolean, default: false },
    navClass: { default: void 0 },
    navItemClass: { default: void 0 },
    navWrapperClass: { default: void 0 },
    noFade: { type: Boolean, default: false },
    noNavStyle: { type: Boolean, default: false },
    pills: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    tag: { default: "div" },
    tabClass: { default: void 0 },
    vertical: { type: Boolean, default: false }
  }, {
    "modelValue": {
      default: -1
    },
    "modelModifiers": {},
    "activeId": {
      default: void 0
    },
    "activeIdModifiers": {}
  }),
  emits: mergeModels22(["activate-tab", "click"], ["update:modelValue", "update:activeId"]),
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BTabs");
    const emit = __emit;
    const modelValue = useModel22(__props, "modelValue");
    const activeId = useModel22(__props, "activeId");
    const ReusableEmptyTab = createReusableTemplate();
    const tabsInternal = ref18([]);
    const tabs = computed66(
      () => tabsInternal.value.map((_tab) => {
        const tab = unref47(_tab);
        const active = tab.id === activeId.value;
        return {
          ...tab,
          active,
          navItemClasses: [
            {
              active,
              disabled: tab.disabled
            },
            active ? props.activeNavItemClass : props.inactiveNavItemClass,
            props.navItemClass
          ]
        };
      })
    );
    const showEmpty = computed66(() => !((tabs == null ? void 0 : tabs.value) && tabs.value.length > 0));
    const computedClasses = computed66(() => ({
      "d-flex": props.vertical,
      "align-items-start": props.vertical
    }));
    const alignment = useAlignment(() => props.align);
    const navTabsClasses = computed66(() => ({
      "nav-pills": props.pills,
      "flex-column me-3": props.vertical,
      [alignment.value]: props.align !== void 0,
      "nav-fill": props.fill,
      "card-header-tabs": props.card,
      "nav-justified": props.justified,
      "nav-tabs": !props.noNavStyle && !props.pills,
      "small": props.small
    }));
    const activateTab = (index8) => {
      var _a;
      if (index8 !== void 0) {
        const id = (_a = tabs.value[index8]) == null ? void 0 : _a.id;
        if (index8 > -1 && index8 < tabs.value.length && !tabs.value[index8].disabled && (modelValue.value < 0 || activeId.value !== id || modelValue.value !== index8)) {
          const tabEvent = new BvEvent("activate-tab", { cancelable: true });
          emit("activate-tab", index8, modelValue.value, tabEvent);
          if (!tabEvent.defaultPrevented) {
            if (activeId.value !== id)
              activeId.value = id;
            if (modelValue.value !== index8)
              modelValue.value = index8;
          }
        }
      }
    };
    const handleClick = (event, index8) => {
      var _a, _b, _c;
      activateTab(index8);
      if (index8 >= 0 && !tabs.value[index8].disabled && ((_a = tabs.value[index8]) == null ? void 0 : _a.onClick) && typeof tabs.value[index8].onClick === "function") {
        (_c = (_b = tabs.value[index8]).onClick) == null ? void 0 : _c.call(_b, event);
      }
    };
    const keynav = (direction) => {
      var _a, _b;
      if (tabs.value.length <= 0)
        return;
      modelValue.value = nextIndex(modelValue.value + direction, direction);
      (_b = document.getElementById((_a = tabs.value[modelValue.value]) == null ? void 0 : _a.buttonId)) == null ? void 0 : _b.focus();
    };
    const nextIndex = (start, direction) => {
      let index8 = start;
      let minIdx = -1;
      let maxIdx = -1;
      for (let i = 0; i < tabs.value.length; i++) {
        if (!tabs.value[i].disabled) {
          if (minIdx === -1)
            minIdx = i;
          maxIdx = i;
        }
      }
      while (index8 >= minIdx && index8 <= maxIdx && tabs.value[index8].disabled) {
        index8 += direction;
      }
      if (index8 < minIdx)
        index8 = minIdx;
      if (index8 > maxIdx)
        index8 = maxIdx;
      return index8;
    };
    watch19(modelValue, (newValue, oldValue) => {
      if (newValue === oldValue)
        return;
      if (tabs.value.length <= 0) {
        return;
      }
      const index8 = nextIndex(newValue, newValue > oldValue ? 1 : -1);
      nextTick13(() => {
        activateTab(index8);
      });
    });
    watch19(activeId, (newValue, oldValue) => {
      const index8 = tabs.value.findIndex((t) => t.id === newValue);
      if (newValue === oldValue)
        return;
      if (tabs.value.length <= 0) {
        return;
      }
      if (index8 === -1) {
        activateTab(nextIndex(0, 1));
        return;
      }
      activateTab(index8);
    });
    const registerTab = (tab) => {
      if (!tabsInternal.value.find((t) => t.value.id === tab.value.id)) {
        tabsInternal.value.push(tab);
      } else {
        tabsInternal.value[tabsInternal.value.findIndex((t) => t.value.id === tab.value.id)] = tab;
      }
      tabsInternal.value.sort((a, b) => {
        if (!Node || !a.value.el || !b.value.el)
          return 0;
        const position = a.value.el.compareDocumentPosition(b.value.el);
        if (position & Node.DOCUMENT_POSITION_FOLLOWING)
          return -1;
        if (position & Node.DOCUMENT_POSITION_PRECEDING)
          return 1;
        return 0;
      });
    };
    const unregisterTab = (id) => {
      tabsInternal.value = tabsInternal.value.filter((t) => t.value.id !== id);
    };
    watch19(
      tabsInternal,
      () => {
        findActive();
      },
      { deep: true }
    );
    const findActive = () => {
      var _a;
      if (tabs.value.length === 0) {
        modelValue.value = -1;
        activeId.value = void 0;
        return;
      }
      if (modelValue.value >= 0 && !activeId.value) {
        activeId.value = (_a = tabs.value[modelValue.value]) == null ? void 0 : _a.id;
      }
      if (tabs.value.find((t) => t.id === activeId.value)) {
        activateTab(tabs.value.findIndex((t) => t.id === activeId.value));
        return;
      }
      activateTab(tabs.value.map((tab) => !tab.disabled).indexOf(true));
    };
    provide15(tabsInjectionKey, {
      lazy: toRef19(() => props.lazy),
      card: toRef19(() => props.card),
      noFade: toRef19(() => props.noFade),
      activeTabClass: toRef19(() => props.activeTabClass),
      inactiveTabClass: toRef19(() => props.inactiveTabClass),
      tabClass: toRef19(() => props.tabClass),
      registerTab,
      unregisterTab,
      activeId,
      activateTab: (id) => {
        const idx = tabs.value.findIndex((t) => t.id === id);
        if (id === void 0 || idx === -1) {
          activateTab(nextIndex(0, 1));
          return;
        }
        activateTab(idx);
      }
    });
    return (_ctx, _cache) => {
      return openBlock49(), createBlock39(resolveDynamicComponent29(unref47(props).tag), {
        id: unref47(props).id,
        class: normalizeClass39(["tabs", computedClasses.value])
      }, {
        default: withCtx38(() => [
          createVNode16(unref47(ReusableEmptyTab).define, null, {
            default: withCtx38(() => [
              createElementVNode22("div", {
                class: normalizeClass39(["tab-content", unref47(props).contentClass])
              }, [
                renderSlot44(_ctx.$slots, "default"),
                showEmpty.value ? (openBlock49(), createElementBlock36("div", {
                  key: "bv-empty-tab",
                  class: normalizeClass39(["tab-pane active", { "card-body": unref47(props).card }])
                }, [
                  renderSlot44(_ctx.$slots, "empty")
                ], 2)) : createCommentVNode22("", true)
              ], 2)
            ]),
            _: 3
          }),
          unref47(props).end ? (openBlock49(), createBlock39(unref47(ReusableEmptyTab).reuse, { key: 0 })) : createCommentVNode22("", true),
          createElementVNode22("div", {
            class: normalizeClass39([
              unref47(props).navWrapperClass,
              { "card-header": unref47(props).card, "ms-auto": _ctx.vertical && unref47(props).end }
            ])
          }, [
            createElementVNode22("ul", {
              class: normalizeClass39(["nav", [navTabsClasses.value, unref47(props).navClass]]),
              role: "tablist",
              "aria-orientation": unref47(props).vertical ? "vertical" : "horizontal"
            }, [
              renderSlot44(_ctx.$slots, "tabs-start"),
              (openBlock49(true), createElementBlock36(Fragment20, null, renderList12(tabs.value, (tab, idx) => {
                var _a, _b, _c;
                return openBlock49(), createElementBlock36("li", {
                  key: tab.id,
                  class: normalizeClass39(["nav-item", (_a = tab.titleItemClass) == null ? void 0 : _a.call(tab)]),
                  role: "presentation"
                }, [
                  createElementVNode22("button", mergeProps32({
                    id: tab.buttonId,
                    class: ["nav-link", [tab.navItemClasses, (_b = tab.titleLinkClass) == null ? void 0 : _b.call(tab)]],
                    role: "tab",
                    "aria-controls": tab.id,
                    "aria-selected": tab.active,
                    ref_for: true
                  }, (_c = tab.titleLinkAttrs) == null ? void 0 : _c.call(tab), {
                    onKeydown: [
                      _cache[0] || (_cache[0] = withKeys(withModifiers3(($event) => keynav(-1), ["stop", "prevent"]), ["left"])),
                      _cache[1] || (_cache[1] = withKeys(withModifiers3(($event) => keynav(1), ["stop", "prevent"]), ["right"])),
                      _cache[2] || (_cache[2] = withKeys(withModifiers3(($event) => keynav(-999), ["stop", "prevent"]), ["page-up"])),
                      _cache[3] || (_cache[3] = withKeys(withModifiers3(($event) => keynav(999), ["stop", "prevent"]), ["page-down"]))
                    ],
                    onClick: withModifiers3((e) => handleClick(e, idx), ["stop", "prevent"])
                  }), [
                    tab.titleComponent ? (openBlock49(), createBlock39(resolveDynamicComponent29(tab.titleComponent), { key: 0 })) : (openBlock49(), createElementBlock36(Fragment20, { key: 1 }, [
                      createTextVNode27(toDisplayString29(tab.title), 1)
                    ], 64))
                  ], 16, _hoisted_217)
                ], 2);
              }), 128)),
              renderSlot44(_ctx.$slots, "tabs-end")
            ], 10, _hoisted_133)
          ], 2),
          !unref47(props).end ? (openBlock49(), createBlock39(unref47(ReusableEmptyTab).reuse, { key: 1 })) : createCommentVNode22("", true)
        ]),
        _: 3
      }, 8, ["id", "class"]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/BToastOrchestrator.vue_vue_type_style_index_0_lang-CD-aPss7.mjs
import { defineComponent as defineComponent53, mergeModels as mergeModels23, useSlots as useSlots17, useTemplateRef as useTemplateRef23, useModel as useModel23, computed as computed67, watchEffect as watchEffect4, watch as watch20, unref as unref48, openBlock as openBlock50, createBlock as createBlock40, Transition as Transition8, mergeProps as mergeProps33, withCtx as withCtx39, withDirectives as withDirectives11, createElementVNode as createElementVNode23, normalizeClass as normalizeClass40, resolveDynamicComponent as resolveDynamicComponent30, renderSlot as renderSlot45, toDisplayString as toDisplayString30, createCommentVNode as createCommentVNode23, createTextVNode as createTextVNode28, vShow as vShow8, createElementBlock as createElementBlock37, Fragment as Fragment21, renderList as renderList13, createVNode as createVNode17, TransitionGroup as TransitionGroup2 } from "vue";
var _hoisted_134 = ["id", "role", "aria-live", "aria-atomic"];
var _hoisted_218 = { class: "me-auto" };
var _sfc_main$124 = defineComponent53({
  __name: "BToast",
  props: mergeModels23({
    body: { default: void 0 },
    bodyClass: { default: void 0 },
    headerClass: { default: void 0 },
    headerTag: { default: "div" },
    id: { default: void 0 },
    interval: { default: "requestAnimationFrame" },
    isStatus: { type: Boolean, default: false },
    noCloseButton: { type: Boolean, default: false },
    noHoverPause: { type: Boolean, default: false },
    noResumeOnHoverLeave: { type: Boolean, default: false },
    progressProps: { default: void 0 },
    showOnPause: { type: Boolean, default: true },
    solid: { type: Boolean, default: false },
    title: { default: void 0 },
    toastClass: { default: void 0 },
    variant: { default: void 0 },
    bgVariant: { default: null },
    textVariant: { default: null },
    active: { type: Boolean, default: void 0 },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    icon: { type: Boolean, default: void 0 },
    noRel: { type: Boolean, default: void 0 },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: void 0 },
    initialAnimation: { type: Boolean, default: false },
    noAnimation: { type: Boolean },
    noFade: { type: Boolean, default: false },
    lazy: { type: Boolean, default: false },
    unmountLazy: { type: Boolean, default: false },
    show: { type: Boolean, default: false },
    transProps: { default: void 0 },
    visible: { type: Boolean, default: false }
  }, {
    "modelValue": { type: [Boolean, Number], ...{ default: false } },
    "modelModifiers": {}
  }),
  emits: mergeModels23(["close", "close-countdown", "hide", "hidden", "show", "shown", "show-prevented", "hide-prevented"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BToast");
    const emit = __emit;
    const slots = useSlots17();
    const element = useTemplateRef23("_element");
    const modelValue = useModel23(__props, "modelValue");
    const { computedLink, computedLinkProps } = useBLinkHelper(props);
    const computedId = useId(() => props.id, "toast");
    const {
      showRef,
      renderRef,
      hide: hide2,
      toggle: toggle2,
      show,
      buildTriggerableEvent,
      computedNoAnimation,
      isVisible: isVisible2,
      transitionProps,
      contentShowing
    } = useShowHide(modelValue, props, emit, element, computedId);
    const countdownLength = computed67(
      () => typeof modelValue.value === "boolean" ? 0 : modelValue.value
    );
    const {
      isActive,
      pause,
      restart,
      resume,
      stop,
      isPaused,
      value: remainingMs
    } = useCountdown(countdownLength, props.interval, {
      immediate: typeof modelValue.value === "number" && !!modelValue.value
    });
    useCountdownHover(
      element,
      computed67(() => ({
        noHoverPause: props.noHoverPause || typeof modelValue.value !== "number",
        noResumeOnHoverLeave: props.noResumeOnHoverLeave || typeof modelValue.value !== "number",
        modelValueIgnoresHover: typeof modelValue.value === "boolean"
      })),
      { pause, resume }
    );
    watchEffect4(() => {
      emit("close-countdown", remainingMs.value);
    });
    const computedTag = computed67(() => computedLink.value ? _sfc_main7 : "div");
    const isToastVisible = computed67(
      () => showRef.value || isActive.value || props.showOnPause && isPaused.value
    );
    const colorClasses = useColorVariantClasses(props);
    const computedClasses = computed67(() => [
      colorClasses.value,
      {
        show: isVisible2.value,
        fade: !computedNoAnimation.value
      }
    ]);
    watch20(modelValue, (newValue) => {
      if (typeof newValue === "number") {
        const event = buildTriggerableEvent("show", { cancelable: true, trigger: "model" });
        emit("show", event);
        if (event.defaultPrevented) {
          emit("show-prevented", buildTriggerableEvent("show-prevented"));
        } else {
          restart();
        }
      }
    });
    watch20(isActive, (newValue) => {
      if (newValue === false && isPaused.value === false) {
        hide2();
        modelValue.value = 0;
        stop();
      }
    });
    __expose({
      show,
      hide: hide2,
      toggle: toggle2,
      pause,
      restart,
      resume,
      stop
    });
    return (_ctx, _cache) => {
      return unref48(renderRef) || unref48(contentShowing) ? (openBlock50(), createBlock40(Transition8, mergeProps33({ key: 0 }, unref48(transitionProps), {
        appear: !!modelValue.value
      }), {
        default: withCtx39(() => [
          withDirectives11(createElementVNode23("div", {
            id: unref48(props).id,
            ref: "_element",
            class: normalizeClass40(["toast", [unref48(props).toastClass, computedClasses.value]]),
            tabindex: "0",
            role: !isToastVisible.value ? void 0 : unref48(props).isStatus ? "status" : "alert",
            "aria-live": !isToastVisible.value ? void 0 : unref48(props).isStatus ? "polite" : "assertive",
            "aria-atomic": !isToastVisible.value ? void 0 : true
          }, [
            unref48(contentShowing) && (slots.title || unref48(props).title) ? (openBlock50(), createBlock40(resolveDynamicComponent30(unref48(props).headerTag), {
              key: 0,
              class: normalizeClass40(["toast-header", unref48(props).headerClass])
            }, {
              default: withCtx39(() => [
                renderSlot45(_ctx.$slots, "title", { hide: unref48(hide2) }, () => [
                  createElementVNode23("strong", _hoisted_218, toDisplayString30(unref48(props).title), 1)
                ], true),
                !unref48(props).noCloseButton ? (openBlock50(), createBlock40(_sfc_main5, {
                  key: 0,
                  onClick: _cache[0] || (_cache[0] = ($event) => unref48(hide2)("close"))
                })) : createCommentVNode23("", true)
              ]),
              _: 3
            }, 8, ["class"])) : createCommentVNode23("", true),
            unref48(contentShowing) && (slots.default || unref48(props).body) ? (openBlock50(), createBlock40(resolveDynamicComponent30(computedTag.value), mergeProps33({
              key: 1,
              class: ["toast-body", unref48(props).bodyClass],
              style: { "display": "block" }
            }, unref48(computedLinkProps), {
              onClick: _cache[1] || (_cache[1] = ($event) => unref48(computedLink) ? unref48(hide2)() : () => {
              })
            }), {
              default: withCtx39(() => [
                renderSlot45(_ctx.$slots, "default", { hide: unref48(hide2) }, () => [
                  createTextVNode28(toDisplayString30(unref48(props).body), 1)
                ], true)
              ]),
              _: 3
            }, 16, ["class"])) : createCommentVNode23("", true),
            typeof modelValue.value === "number" && unref48(props).progressProps !== void 0 ? (openBlock50(), createBlock40(_sfc_main49, {
              key: 2,
              animated: unref48(props).progressProps.animated,
              precision: unref48(props).progressProps.precision,
              "show-progress": unref48(props).progressProps.showProgress,
              "show-value": unref48(props).progressProps.showValue,
              striped: unref48(props).progressProps.striped,
              variant: unref48(props).progressProps.variant,
              max: modelValue.value,
              value: unref48(remainingMs),
              height: "4px"
            }, null, 8, ["animated", "precision", "show-progress", "show-value", "striped", "variant", "max", "value"])) : createCommentVNode23("", true)
          ], 10, _hoisted_134), [
            [vShow8, isToastVisible.value]
          ])
        ]),
        _: 3
      }, 16, ["appear"])) : createCommentVNode23("", true);
    };
  }
});
var BToast = _export_sfc(_sfc_main$124, [["__scopeId", "data-v-025ee7e1"]]);
var positionClasses = {
  "top-start": "top-0 start-0",
  "top-center": "top-0 start-50 translate-middle-x",
  "top-end": "top-0 end-0",
  "middle-start": "top-50 start-0 translate-middle-y",
  "middle-center": "top-50 start-50 translate-middle",
  "middle-end": "top-50 end-0 translate-middle-y",
  "bottom-start": "bottom-0 start-0",
  "bottom-center": "bottom-0 start-50 translate-middle-x",
  "bottom-end": "bottom-0 end-0"
};
var _sfc_main52 = defineComponent53({
  ...{
    inheritAttrs: false
  },
  __name: "BToastOrchestrator",
  props: {
    appendToast: { type: Boolean, default: false },
    teleportDisabled: { type: Boolean, default: false },
    teleportTo: { default: "body" }
  },
  setup(__props, { expose: __expose }) {
    const _props = __props;
    const props = useDefaults(_props, "BToastOrchestrator");
    const tools = useToastController();
    watch20(
      () => props.appendToast,
      (value) => {
        var _a;
        (_a = tools._setIsAppend) == null ? void 0 : _a.call(tools, value);
      },
      { immediate: true }
    );
    __expose({
      ...tools
    });
    return (_ctx, _cache) => {
      return openBlock50(), createBlock40(_sfc_main, {
        to: unref48(props).teleportTo,
        disabled: unref48(props).teleportDisabled
      }, {
        default: withCtx39(() => [
          createElementVNode23("div", mergeProps33({ id: "__BVID__toaster-container" }, _ctx.$attrs), [
            (openBlock50(true), createElementBlock37(Fragment21, null, renderList13(unref48(positionClasses), (value, key) => {
              return openBlock50(), createElementBlock37("div", {
                key,
                class: normalizeClass40([value, "toast-container position-fixed p-3"])
              }, [
                createVNode17(TransitionGroup2, { name: "b-list" }, {
                  default: withCtx39(() => {
                    var _a;
                    return [
                      (openBlock50(true), createElementBlock37(Fragment21, null, renderList13((_a = unref48(tools).toasts) == null ? void 0 : _a.value.filter((el) => el.props.pos === key), (toast) => {
                        return openBlock50(), createElementBlock37("span", {
                          key: toast.props._self
                        }, [
                          (openBlock50(), createBlock40(resolveDynamicComponent30(toast.component ?? BToast), mergeProps33({ ref_for: true }, toast.props, {
                            "model-value": toast.props._modelValue,
                            "initial-animation": "",
                            "onUpdate:modelValue": ($event) => {
                              var _a2, _b;
                              return (_b = (_a2 = unref48(tools)).leave) == null ? void 0 : _b.call(_a2, toast.props._self);
                            },
                            onHidden: ($event) => {
                              var _a2, _b;
                              return (_b = (_a2 = unref48(tools)).remove) == null ? void 0 : _b.call(_a2, toast.props._self);
                            }
                          }), null, 16, ["model-value", "onUpdate:modelValue", "onHidden"]))
                        ]);
                      }), 128))
                    ];
                  }),
                  _: 2
                }, 1024)
              ], 2);
            }), 128))
          ], 16)
        ]),
        _: 1
      }, 8, ["to", "disabled"]);
    };
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/index-DBc_IU8a.mjs
var index4 = Object.freeze(Object.defineProperty({
  __proto__: null,
  BAccordion: _sfc_main$1,
  BAccordionItem: _sfc_main4,
  BAlert,
  BAvatar: _sfc_main$12,
  BAvatarGroup: _sfc_main12,
  BBadge: _sfc_main11,
  BBreadcrumb: _sfc_main13,
  BBreadcrumbItem: _sfc_main$13,
  BButton: _sfc_main8,
  BButtonGroup: _sfc_main$14,
  BButtonToolbar: _sfc_main14,
  BCard: _sfc_main16,
  BCardBody: _sfc_main$2,
  BCardFooter: _sfc_main$15,
  BCardGroup: _sfc_main$16,
  BCardHeader: _sfc_main$5,
  BCardImg: _sfc_main$7,
  BCardSubtitle: _sfc_main$3,
  BCardText: _sfc_main17,
  BCardTitle: _sfc_main$4,
  BCarousel: _sfc_main$17,
  BCarouselSlide: _sfc_main18,
  BCloseButton: _sfc_main5,
  BCol: _sfc_main19,
  BCollapse: _sfc_main3,
  BContainer: _sfc_main20,
  BDropdown,
  BDropdownDivider: _sfc_main$62,
  BDropdownForm: _sfc_main$52,
  BDropdownGroup: _sfc_main$42,
  BDropdownHeader: _sfc_main$32,
  BDropdownItem: _sfc_main$22,
  BDropdownItemButton: _sfc_main$18,
  BDropdownText: _sfc_main23,
  BForm: _sfc_main24,
  BFormCheckbox: _sfc_main$111,
  BFormCheckboxGroup: _sfc_main28,
  BFormDatalist: _sfc_main$19,
  BFormFile: _sfc_main29,
  BFormFloatingLabel: _sfc_main26,
  BFormGroup: _sfc_main30,
  BFormInput: _sfc_main31,
  BFormInvalidFeedback: _sfc_main$33,
  BFormRadio: _sfc_main$112,
  BFormRadioGroup: _sfc_main32,
  BFormRow: _sfc_main$23,
  BFormSelect: _sfc_main33,
  BFormSelectOption: _sfc_main25,
  BFormSelectOptionGroup: _sfc_main$113,
  BFormSpinbutton: _sfc_main34,
  BFormTag: _sfc_main$114,
  BFormTags: _sfc_main35,
  BFormText: _sfc_main$110,
  BFormTextarea: _sfc_main36,
  BFormValidFeedback: _sfc_main27,
  BImg: _sfc_main15,
  BInput: _sfc_main31,
  BInputGroup: _sfc_main$115,
  BInputGroupText: _sfc_main37,
  BLink: _sfc_main7,
  BListGroup: _sfc_main$116,
  BListGroupItem: _sfc_main38,
  BModal,
  BModalOrchestrator: _sfc_main39,
  BNav: _sfc_main$43,
  BNavForm: _sfc_main$34,
  BNavItem: _sfc_main$24,
  BNavItemDropdown: _sfc_main$118,
  BNavText: _sfc_main40,
  BNavbar: _sfc_main$35,
  BNavbarBrand: _sfc_main$25,
  BNavbarNav: _sfc_main$119,
  BNavbarToggle: _sfc_main41,
  BOffcanvas,
  BOverlay: _sfc_main43,
  BPagination: _sfc_main44,
  BPlaceholder: _sfc_main$44,
  BPlaceholderButton: _sfc_main$36,
  BPlaceholderCard: _sfc_main$26,
  BPlaceholderTable: _sfc_main$120,
  BPlaceholderWrapper: _sfc_main46,
  BPopover,
  BPopoverOrchestrator: _sfc_main48,
  BProgress: _sfc_main49,
  BProgressBar: _sfc_main$121,
  BRow: _sfc_main21,
  BSpinner: _sfc_main6,
  BTab: _sfc_main$123,
  BTable: _sfc_main50,
  BTableLite: _sfc_main$122,
  BTableSimple: _sfc_main45,
  BTabs: _sfc_main51,
  BTbody: _sfc_main$72,
  BTd: _sfc_main$63,
  BTfoot: _sfc_main$53,
  BTh: _sfc_main$45,
  BThead: _sfc_main$37,
  BToast,
  BToastOrchestrator: _sfc_main52,
  BTooltip: _sfc_main47,
  BTr: _sfc_main$27
}, Symbol.toStringTag, { value: "Module" }));

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/index-sLCKmIWG.mjs
var componentsWithExternalPath = {
  BAccordion: "/components/BAccordion",
  BAccordionItem: "/components/BAccordion",
  BAlert: "/components/BAlert",
  BAvatar: "/components/BAvatar",
  BAvatarGroup: "/components/BAvatar",
  BBadge: "/components/BBadge",
  BBreadcrumb: "/components/BBreadcrumb",
  BBreadcrumbItem: "/components/BBreadcrumb",
  BButton: "/components/BButton",
  BButtonGroup: "/components/BButton",
  BButtonToolbar: "/components/BButton",
  BCloseButton: "/components/BButton",
  BCard: "/components/BCard",
  BCardBody: "/components/BCard",
  BCardFooter: "/components/BCard",
  BCardGroup: "/components/BCard",
  BCardHeader: "/components/BCard",
  BCardImg: "/components/BCard",
  BCardSubtitle: "/components/BCard",
  BCardText: "/components/BCard",
  BCardTitle: "/components/BCard",
  BCarousel: "/components/BCarousel",
  BCarouselSlide: "/components/BCarousel",
  BCol: "/components/BContainer",
  BCollapse: "/components/BCollapse",
  BContainer: "/components/BContainer",
  BDropdown: "/components/BDropdown",
  BDropdownDivider: "/components/BDropdown",
  BDropdownForm: "/components/BDropdown",
  BDropdownGroup: "/components/BDropdown",
  BDropdownHeader: "/components/BDropdown",
  BDropdownItem: "/components/BDropdown",
  BDropdownItemButton: "/components/BDropdown",
  BDropdownText: "/components/BDropdown",
  BForm: "/components/BForm",
  BFormCheckbox: "/components/BFormCheckbox",
  BFormCheckboxGroup: "/components/BFormCheckbox",
  BFormDatalist: "/components/BForm",
  BFormFile: "/components/BFormFile",
  BFormFloatingLabel: "/components/BForm",
  BFormGroup: "/components/BFormGroup",
  BFormInput: "/components/BFormInput",
  BFormInvalidFeedback: "/components/BForm",
  BFormRadio: "/components/BFormRadio",
  BFormRadioGroup: "/components/BFormRadio",
  BFormRow: "/components/BForm",
  BFormSelect: "/components/BFormSelect",
  BFormSelectOption: "/components/BFormSelect",
  BFormSelectOptionGroup: "/components/BFormSelect",
  BFormSpinbutton: "/components/BFormSpinbutton",
  BFormTag: "/components/BFormTags",
  BFormTags: "/components/BFormTags",
  BFormText: "/components/BForm",
  BFormTextarea: "/components/BFormTextarea",
  BFormValidFeedback: "/components/BForm",
  BImg: "/components/BImg",
  BInput: "/components/BFormInput",
  BInputGroup: "/components/BInputGroup",
  BInputGroupText: "/components/BInputGroup",
  BListGroup: "/components/BListGroup",
  BListGroupItem: "/components/BListGroup",
  BModal: "/components/BModal",
  BModalOrchestrator: "/components/BModal",
  BNav: "/components/BNav",
  BNavForm: "/components/BNav",
  BNavItem: "/components/BNav",
  BNavItemDropdown: "/components/BNav",
  BNavText: "/components/BNav",
  BNavbar: "/components/BNavbar",
  BNavbarBrand: "/components/BNavbar",
  BNavbarNav: "/components/BNavbar",
  BNavbarToggle: "/components/BNavbar",
  BOffcanvas: "/components/BOffcanvas",
  BOverlay: "/components/BOverlay",
  BPagination: "/components/BPagination",
  BPlaceholder: "/components/BPlaceholder",
  BPlaceholderButton: "/components/BPlaceholder",
  BPlaceholderCard: "/components/BPlaceholder",
  BPlaceholderTable: "/components/BPlaceholder",
  BPlaceholderWrapper: "/components/BPlaceholder",
  BPopover: "/components/BPopover",
  BProgress: "/components/BProgress",
  BRow: "/components/BContainer",
  BSpinner: "/components/BSpinner",
  BTab: "/components/BTabs",
  BTabs: "/components/BTabs",
  BToast: "/components/BToast",
  BToastOrchestrator: "/components/BToast",
  BTooltip: "/components/BTooltip",
  BLink: "/components/BLink",
  BProgressBar: "/components/BProgress",
  BTableSimple: "/components/BTable",
  BTableLite: "/components/BTable",
  BTable: "/components/BTable",
  BTbody: "/components/BTable",
  BTd: "/components/BTable",
  BTh: "/components/BTable",
  BThead: "/components/BTable",
  BTfoot: "/components/BTable",
  BTr: "/components/BTable",
  BPopoverOrchestrator: "/components/BPopover"
};
var componentNames = Object.freeze(
  Object.keys(componentsWithExternalPath)
);
var directivesWithExternalPath = {
  vBColorMode: "/directives/BColorMode",
  vBModal: "/directives/BModal",
  vBPopover: "/directives/BPopover",
  vBScrollspy: "/directives/BScrollspy",
  vBToggle: "/directives/BToggle",
  vBTooltip: "/directives/BTooltip"
};
var directiveNames = Object.freeze(
  Object.keys(directivesWithExternalPath)
);
var composablesWithExternalPath = {
  useBreadcrumb: "/composables/useBreadcrumb",
  useColorMode: "/composables/useColorMode",
  useModal: "/composables/useModal",
  useModalController: "/composables/useModalController",
  useScrollspy: "/composables/useScrollspy",
  useToastController: "/composables/useToastController",
  usePopoverController: "/composables/usePopoverController"
};
var composableNames = Object.freeze(
  Object.keys(composablesWithExternalPath)
);
var bvKey = "bootstrap-vue-next";
var parseActiveImports = (options, values) => {
  const { all, ...others } = options;
  const valuesCopy = {};
  if (all) {
    values.forEach((el) => {
      valuesCopy[el] = all;
    });
  }
  const merge = { ...valuesCopy, ...others };
  return Object.entries(merge).filter(([name, value]) => !!value && values.includes(name)).map(([name]) => name);
};
var usedComponents = /* @__PURE__ */ new Set();
var usedDirectives = /* @__PURE__ */ new Set();
var BootstrapVueNextResolver = Object.assign(
  ({
    aliases = {},
    directives = true,
    components = true
  } = {}) => {
    const selectedComponents = typeof components === "boolean" ? { all: components } : components;
    const compImports = parseActiveImports(selectedComponents, componentNames).reduce(
      (map, name) => {
        map.set(name, `${bvKey}${componentsWithExternalPath[name]}`);
        return map;
      },
      /* @__PURE__ */ new Map()
    );
    const selectedDirectives = typeof directives === "boolean" ? { all: directives } : directives;
    const dirImports = parseActiveImports(selectedDirectives, directiveNames).reduce(
      (map, directive) => {
        const key = directive.toLowerCase().startsWith("v") ? directive : `v${directive}`;
        map.set(key, `${bvKey}${directivesWithExternalPath[key]}`);
        return map;
      },
      /* @__PURE__ */ new Map()
    );
    const resolvers = [
      {
        type: "component",
        resolve(name) {
          const destination = compImports.get(name);
          const aliasDestination = compImports.get(aliases[name]);
          if (aliasDestination) {
            const val = aliases[name];
            usedComponents.add(val);
            return {
              name: val,
              from: aliasDestination
            };
          }
          if (destination) {
            usedComponents.add(name);
            return {
              name,
              from: destination
            };
          }
        }
      },
      {
        type: "directive",
        resolve(name) {
          const prefixedName = `v${name}`;
          const destination = dirImports.get(prefixedName);
          if (destination) {
            usedDirectives.add(prefixedName);
            return {
              name: prefixedName,
              from: destination
            };
          }
        }
      }
    ];
    return resolvers;
  },
  {
    __usedComponents: usedComponents,
    __usedDirectives: usedDirectives
  }
);
var index5 = Object.freeze(Object.defineProperty({
  __proto__: null,
  BootstrapVueNextResolver
}, Symbol.toStringTag, { value: "Module" }));

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/plugins/bootstrap/index.mjs
import { ref as ref19 } from "vue";
var bootstrapPlugin = {
  install(app, options) {
    const val = (options == null ? void 0 : options.components) ?? {};
    app.provide(defaultsKey, ref19(val));
  }
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/plugins/breadcrumb/index.mjs
import { ref as ref20 } from "vue";
var breadcrumbPlugin = {
  install(app) {
    const items = ref20([]);
    const reset = () => {
      items.value.splice(0, items.value.length);
    };
    app.provide(breadcrumbPluginKey, { items, reset });
  }
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/plugins/modalController/index.mjs
import { ref as ref21, toRef as toRef20, markRaw, watch as watch21 } from "vue";
var modalControllerPlugin = {
  install(app) {
    const modals = ref21(/* @__PURE__ */ new Map());
    const buildPromise = () => {
      let resolveFunc = () => {
      };
      const promise = new Promise((resolve) => {
        resolveFunc = resolve;
      });
      return {
        value: promise,
        resolve: resolveFunc
      };
    };
    const buildPrereqs = (id) => [buildPromise(), id || Symbol("Modals controller"), true];
    const show = (obj = {}) => {
      var _a;
      const resolvedProps = toRef20(obj.props);
      const [_promise, _self, _modelValue] = buildPrereqs((_a = resolvedProps.value) == null ? void 0 : _a.id);
      modals.value.set(_self, {
        component: !obj.component ? void 0 : markRaw(obj.component),
        props: { ...resolvedProps.value, _isConfirm: false, _promise, _modelValue }
      });
      watch21(resolvedProps, (newValue) => {
        const previous = modals.value.get(_self);
        if (!previous)
          return;
        modals.value.set(_self, {
          component: !obj.component ? void 0 : markRaw(obj.component),
          props: { ...previous.props, ...newValue }
        });
      });
      return _promise.value;
    };
    const confirm = (obj = {}) => {
      var _a;
      const resolvedProps = toRef20(obj.props);
      const [_promise, _self, _modelValue] = buildPrereqs((_a = resolvedProps.value) == null ? void 0 : _a.id);
      modals.value.set(_self, {
        component: !obj.component ? void 0 : markRaw(obj.component),
        props: { ...resolvedProps.value, _isConfirm: true, _promise, _modelValue }
      });
      watch21(resolvedProps, (newValue) => {
        const previous = modals.value.get(_self);
        if (!previous)
          return;
        modals.value.set(_self, {
          component: !obj.component ? void 0 : markRaw(obj.component),
          props: { ...previous.props, ...newValue }
        });
      });
      return _promise.value;
    };
    const leave = (self2) => {
      const modal = modals.value.get(self2);
      if (!(modal == null ? void 0 : modal.props))
        return;
      modal.props = {
        ...modal.props,
        _modelValue: false
      };
    };
    const remove = (self2) => {
      modals.value.delete(self2);
    };
    app.provide(modalControllerPluginKey, {
      modals,
      remove,
      show,
      confirm,
      leave
    });
  }
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/plugins/modalManager/index.mjs
import { ref as ref22, computed as computed68, readonly as readonly11 } from "vue";
var modalManagerPlugin = {
  install(app) {
    const stack = ref22(/* @__PURE__ */ new Map());
    const countStack = computed68(() => stack.value.size);
    const valuesStack = computed68(() => [...stack.value.values()]);
    const lastStack = computed68(() => valuesStack.value[valuesStack.value.length - 1]);
    const pushStack = (modal) => {
      stack.value.set(modal.uid, modal);
    };
    const removeStack = (modal) => {
      stack.value.delete(modal.uid);
    };
    const registry = ref22(/* @__PURE__ */ new Map());
    const pushRegistry = (modal) => {
      registry.value.set(modal.uid, modal);
    };
    const removeRegistry = (modal) => {
      registry.value.delete(modal.uid);
    };
    app.provide(modalManagerPluginKey, {
      countStack,
      lastStack,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      registry: readonly11(registry),
      stack: valuesStack,
      pushStack,
      removeStack,
      pushRegistry,
      removeRegistry
    });
  }
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/plugins/popoverController/index.mjs
import { ref as ref23, toRef as toRef21, watch as watch22, isRef as isRef2, onScopeDispose as onScopeDispose3, toValue as toValue17 } from "vue";
var popoverPlugin = {
  install(app) {
    const popovers = ref23(/* @__PURE__ */ new Map());
    const popover = (obj) => {
      var _a;
      const resolvedProps = toRef21(obj);
      const _self = ((_a = resolvedProps.value) == null ? void 0 : _a.id) || Symbol("Popover controller");
      watch22(
        resolvedProps,
        (newValue) => {
          popovers.value.set(_self, {
            ...newValue,
            ...typeof newValue["modelValue"] !== "undefined" && isRef2(obj) ? {
              "onUpdate:modelValue": (val) => {
                var _a2;
                (_a2 = newValue["onUpdate:modelValue"]) == null ? void 0 : _a2.call(newValue, val);
                obj.value.modelValue = val;
              }
            } : {}
          });
        },
        {
          immediate: true,
          deep: true
        }
      );
      onScopeDispose3(() => popovers.value.delete(_self), true);
      return _self;
    };
    const setPopover = (self2, val) => {
      const popover2 = popovers.value.get(self2);
      if (!popover2)
        return;
      popovers.value.set(self2, {
        ...popover2,
        ...toValue17(val)
      });
    };
    const removePopover = (self2) => popovers.value.delete(self2);
    const tooltips = ref23(/* @__PURE__ */ new Map());
    const tooltip = (obj) => {
      var _a;
      const resolvedProps = toRef21(obj);
      const _self = ((_a = resolvedProps.value) == null ? void 0 : _a.id) || Symbol("Tooltip controller");
      watch22(
        resolvedProps,
        (newValue) => {
          popovers.value.set(_self, {
            ...newValue,
            ...typeof newValue["modelValue"] !== "undefined" && isRef2(obj) ? {
              "onUpdate:modelValue": (val) => {
                var _a2;
                (_a2 = newValue["onUpdate:modelValue"]) == null ? void 0 : _a2.call(newValue, val);
                obj.value.modelValue = val;
              }
            } : {}
          });
        },
        {
          immediate: true,
          deep: true
        }
      );
      onScopeDispose3(() => tooltips.value.delete(_self), true);
      return _self;
    };
    const setTooltip = (self2, val) => {
      const tooltip2 = tooltips.value.get(self2);
      if (!tooltip2)
        return;
      tooltips.value.set(self2, {
        ...tooltip2,
        ...toValue17(val)
      });
    };
    const removeTooltip = (self2) => tooltips.value.delete(self2);
    app.provide(popoverPluginKey, {
      popovers,
      tooltips,
      tooltip,
      popover,
      setPopover,
      setTooltip,
      removePopover,
      removeTooltip
    });
  }
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/plugins/rtl/index.mjs
import { ref as ref24 } from "vue";
var rtlPlugin = {
  install(app, options) {
    var _a, _b;
    const rtlDefault = false;
    const localeDefault = void 0;
    const rtlInitial = typeof (options == null ? void 0 : options.rtl) === "boolean" ? rtlDefault : ((_a = options == null ? void 0 : options.rtl) == null ? void 0 : _a.rtlInitial) ?? rtlDefault;
    const localeInitial = typeof (options == null ? void 0 : options.rtl) === "boolean" ? localeDefault : ((_b = options == null ? void 0 : options.rtl) == null ? void 0 : _b.localeInitial) ?? localeDefault;
    const isRtl = ref24(rtlInitial);
    const locale = ref24(localeInitial);
    app.provide(rtlPluginKey, { isRtl, locale });
  }
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/plugins/toastController/index.mjs
import { ref as ref25, toRef as toRef22, markRaw as markRaw2, watch as watch23 } from "vue";
var posDefault = "top-end";
var toastPlugin = {
  install(app) {
    const toasts = ref25([]);
    const _isAppend = ref25(false);
    const _setIsAppend = (value) => {
      _isAppend.value = value;
    };
    const show = (obj = {}) => {
      var _a, _b, _c, _d;
      const resolvedProps = toRef22(obj.props);
      const _self = ((_a = resolvedProps.value) == null ? void 0 : _a.id) || Symbol("Toast controller");
      const toastToAdd = {
        component: !obj.component ? void 0 : markRaw2(obj.component),
        props: {
          ...resolvedProps.value,
          pos: ((_b = resolvedProps.value) == null ? void 0 : _b.pos) || posDefault,
          _modelValue: ((_c = resolvedProps.value) == null ? void 0 : _c.value) || 5e3,
          _self
        }
      };
      if (((_d = resolvedProps.value) == null ? void 0 : _d.appendToast) !== void 0 ? resolvedProps.value.appendToast : _isAppend.value) {
        toasts.value.push(toastToAdd);
      } else {
        toasts.value.unshift(toastToAdd);
      }
      watch23(resolvedProps, (newValue) => {
        const previousIndex = toasts.value.findIndex((el) => el.props._self === _self);
        if (previousIndex === -1)
          return;
        toasts.value.splice(previousIndex, 1, {
          component: !obj.component ? void 0 : markRaw2(obj.component),
          props: {
            ...toasts.value[previousIndex].props,
            ...newValue,
            _modelValue: (newValue == null ? void 0 : newValue.value) || toasts.value[previousIndex].props._modelValue || 5e3
          }
        });
      });
      return _self;
    };
    const remove = (self2) => {
      toasts.value = toasts.value.filter((el) => el.props._self !== self2);
    };
    const leave = (self2) => {
      const toastIndex = toasts.value.findIndex((el) => el.props._self === self2);
      if (toastIndex === -1)
        return;
      toasts.value.splice(toastIndex, 1, {
        component: !toasts.value[toastIndex].component ? void 0 : markRaw2(toasts.value[toastIndex].component),
        props: {
          ...toasts.value[toastIndex].props,
          _modelValue: false
        }
      });
    };
    app.provide(toastPluginKey, {
      _setIsAppend,
      toasts,
      show,
      remove,
      leave
    });
  }
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/plugins/collapse/index.mjs
import { reactive as reactive2, readonly as readonly12, computed as computed69 } from "vue";
var collapsePlugin = {
  install(app) {
    const values = reactive2({});
    const fun = ({ id, value, toggle: toggle2 }) => {
      values[id] = computed69(() => ({ value: value.value, toggle: toggle2 }));
      return {
        unregister() {
          delete values[id];
        }
      };
    };
    fun.map = readonly12(values);
    app.provide(globalCollapseStorageInjectionKey, fun);
  }
};

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/src/plugins/createBootstrap/index.mjs
var createBootstrap = (pluginData = {}) => ({
  install(app) {
    if (pluginData.breadcrumb ?? true) {
      app.use(breadcrumbPlugin);
    }
    if (pluginData.modalController ?? true) {
      app.use(modalControllerPlugin);
    }
    if (pluginData.modalManager ?? true) {
      app.use(modalManagerPlugin);
    }
    if ((pluginData.rtl ?? true) || typeof pluginData.rtl === "object") {
      app.use(rtlPlugin, pluginData);
    }
    if (pluginData.toast ?? true) {
      app.use(toastPlugin);
    }
    if (pluginData.popover ?? true) {
      app.use(popoverPlugin);
    }
    app.use(collapsePlugin);
    app.use(bootstrapPlugin, pluginData);
  }
});

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/index-DwDHvBIQ.mjs
var index6 = Object.freeze(Object.defineProperty({
  __proto__: null,
  bootstrapPlugin,
  breadcrumbPlugin,
  createBootstrap,
  modalControllerPlugin,
  modalManagerPlugin,
  popoverPlugin,
  rtlPlugin,
  toastPlugin
}, Symbol.toStringTag, { value: "Module" }));

// ../../../../../Documents/HBuilderProjects/uni-app-test2/node_modules/bootstrap-vue-next/dist/bootstrap-vue-next.mjs
var index7 = Object.freeze(Object.defineProperty({
  __proto__: null,
  componentNames,
  componentsWithExternalPath,
  composableNames,
  composablesWithExternalPath,
  directiveNames,
  directivesWithExternalPath
}, Symbol.toStringTag, { value: "Module" }));
export {
  _sfc_main$1 as BAccordion,
  _sfc_main4 as BAccordionItem,
  BAlert,
  _sfc_main$12 as BAvatar,
  _sfc_main12 as BAvatarGroup,
  _sfc_main11 as BBadge,
  _sfc_main13 as BBreadcrumb,
  _sfc_main$13 as BBreadcrumbItem,
  _sfc_main8 as BButton,
  _sfc_main$14 as BButtonGroup,
  _sfc_main14 as BButtonToolbar,
  _sfc_main16 as BCard,
  _sfc_main$2 as BCardBody,
  _sfc_main$15 as BCardFooter,
  _sfc_main$16 as BCardGroup,
  _sfc_main$5 as BCardHeader,
  _sfc_main$7 as BCardImg,
  _sfc_main$3 as BCardSubtitle,
  _sfc_main17 as BCardText,
  _sfc_main$4 as BCardTitle,
  _sfc_main$17 as BCarousel,
  _sfc_main18 as BCarouselSlide,
  _sfc_main5 as BCloseButton,
  _sfc_main19 as BCol,
  _sfc_main3 as BCollapse,
  _sfc_main20 as BContainer,
  BDropdown,
  _sfc_main$62 as BDropdownDivider,
  _sfc_main$52 as BDropdownForm,
  _sfc_main$42 as BDropdownGroup,
  _sfc_main$32 as BDropdownHeader,
  _sfc_main$22 as BDropdownItem,
  _sfc_main$18 as BDropdownItemButton,
  _sfc_main23 as BDropdownText,
  _sfc_main24 as BForm,
  _sfc_main$111 as BFormCheckbox,
  _sfc_main28 as BFormCheckboxGroup,
  _sfc_main$19 as BFormDatalist,
  _sfc_main29 as BFormFile,
  _sfc_main26 as BFormFloatingLabel,
  _sfc_main30 as BFormGroup,
  _sfc_main31 as BFormInput,
  _sfc_main$33 as BFormInvalidFeedback,
  _sfc_main$112 as BFormRadio,
  _sfc_main32 as BFormRadioGroup,
  _sfc_main$23 as BFormRow,
  _sfc_main33 as BFormSelect,
  _sfc_main25 as BFormSelectOption,
  _sfc_main$113 as BFormSelectOptionGroup,
  _sfc_main34 as BFormSpinbutton,
  _sfc_main$114 as BFormTag,
  _sfc_main35 as BFormTags,
  _sfc_main$110 as BFormText,
  _sfc_main36 as BFormTextarea,
  _sfc_main27 as BFormValidFeedback,
  _sfc_main15 as BImg,
  _sfc_main31 as BInput,
  _sfc_main$115 as BInputGroup,
  _sfc_main37 as BInputGroupText,
  _sfc_main7 as BLink,
  _sfc_main$116 as BListGroup,
  _sfc_main38 as BListGroupItem,
  BModal,
  _sfc_main39 as BModalOrchestrator,
  _sfc_main$43 as BNav,
  _sfc_main$34 as BNavForm,
  _sfc_main$24 as BNavItem,
  _sfc_main$118 as BNavItemDropdown,
  _sfc_main40 as BNavText,
  _sfc_main$35 as BNavbar,
  _sfc_main$25 as BNavbarBrand,
  _sfc_main$119 as BNavbarNav,
  _sfc_main41 as BNavbarToggle,
  BOffcanvas,
  _sfc_main43 as BOverlay,
  _sfc_main44 as BPagination,
  _sfc_main$44 as BPlaceholder,
  _sfc_main$36 as BPlaceholderButton,
  _sfc_main$26 as BPlaceholderCard,
  _sfc_main$120 as BPlaceholderTable,
  _sfc_main46 as BPlaceholderWrapper,
  BPopover,
  _sfc_main48 as BPopoverOrchestrator,
  _sfc_main49 as BProgress,
  _sfc_main$121 as BProgressBar,
  _sfc_main21 as BRow,
  _sfc_main6 as BSpinner,
  _sfc_main$123 as BTab,
  _sfc_main50 as BTable,
  _sfc_main$122 as BTableLite,
  _sfc_main45 as BTableSimple,
  _sfc_main51 as BTabs,
  _sfc_main$72 as BTbody,
  _sfc_main$63 as BTd,
  _sfc_main$53 as BTfoot,
  _sfc_main$45 as BTh,
  _sfc_main$37 as BThead,
  BToast,
  _sfc_main52 as BToastOrchestrator,
  _sfc_main47 as BTooltip,
  _sfc_main$27 as BTr,
  BootstrapVueNextResolver,
  BvCarouselEvent,
  BvEvent,
  BvTriggerableEvent,
  index4 as Components,
  index as Composables,
  index2 as Directives,
  index6 as Plugins,
  index5 as Resolvers,
  index7 as Types,
  index3 as Utils,
  bootstrapPlugin,
  breadcrumbPlugin,
  componentNames,
  componentsWithExternalPath,
  composableNames,
  composablesWithExternalPath,
  createBootstrap,
  directiveNames,
  directivesWithExternalPath,
  modalControllerPlugin,
  modalManagerPlugin,
  popoverPlugin,
  rtlPlugin,
  toastPlugin,
  useBreadcrumb,
  useColorMode2 as useColorMode,
  useModal,
  useModalController,
  usePopoverController,
  useScrollspy,
  useToastController,
  vBColorMode,
  vBToggle as vBModal,
  vBPopover,
  vBScrollspy,
  vBToggle,
  vBTooltip
};
/*! Bundled license information:

bootstrap-vue-next/dist/useSafeScrollLock-DUIeABf3.mjs:
  (*!
  * tabbable 6.2.0
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  *)
  (*!
  * focus-trap 7.6.2
  * @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
  *)
*/
//# sourceMappingURL=bootstrap-vue-next.js.map
