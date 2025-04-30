var go = Object.defineProperty, mo = Object.defineProperties;
var ko = Object.getOwnPropertyDescriptors;
var Tn = Object.getOwnPropertySymbols;
var So = Object.prototype.hasOwnProperty, yo = Object.prototype.propertyIsEnumerable;
var vn = (t, e, n) => e in t ? go(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, W = (t, e) => {
  for (var n in e || (e = {}))
    So.call(e, n) && vn(t, n, e[n]);
  if (Tn)
    for (var n of Tn(e))
      yo.call(e, n) && vn(t, n, e[n]);
  return t;
}, q = (t, e) => mo(t, ko(e));
var bo = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var R = (t, e, n) => new Promise((s, r) => {
  var o = (u) => {
    try {
      l(n.next(u));
    } catch (i) {
      r(i);
    }
  }, a = (u) => {
    try {
      l(n.throw(u));
    } catch (i) {
      r(i);
    }
  }, l = (u) => u.done ? s(u.value) : Promise.resolve(u.value).then(o, a);
  l((n = n.apply(t, e)).next());
});
var Hp = bo((ce) => {
  const Ze = Math.min, Vt = Math.max, Ce = Math.round, he = Math.floor, kt = (t) => ({
    x: t,
    y: t
  });
  function xo(t, e) {
    return typeof t == "function" ? t(e) : t;
  }
  function Co(t) {
    return W({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }, t);
  }
  function wo(t) {
    return typeof t != "number" ? Co(t) : {
      top: t,
      right: t,
      bottom: t,
      left: t
    };
  }
  function we(t) {
    const {
      x: e,
      y: n,
      width: s,
      height: r
    } = t;
    return {
      width: s,
      height: r,
      top: n,
      left: e,
      right: e + s,
      bottom: n + r,
      x: e,
      y: n
    };
  }
  function Ao(t, e) {
    return R(this, null, function* () {
      var n;
      e === void 0 && (e = {});
      const {
        x: s,
        y: r,
        platform: o,
        rects: a,
        elements: l,
        strategy: u
      } = t, {
        boundary: i = "clippingAncestors",
        rootBoundary: c = "viewport",
        elementContext: h = "floating",
        altBoundary: f = !1,
        padding: p = 0
      } = xo(e, t), d = wo(p), S = l[f ? h === "floating" ? "reference" : "floating" : h], b = we(yield o.getClippingRect({
        element: (n = yield o.isElement == null ? void 0 : o.isElement(S)) == null || n ? S : S.contextElement || (yield o.getDocumentElement == null ? void 0 : o.getDocumentElement(l.floating)),
        boundary: i,
        rootBoundary: c,
        strategy: u
      })), C = h === "floating" ? {
        x: s,
        y: r,
        width: a.floating.width,
        height: a.floating.height
      } : a.reference, v = yield o.getOffsetParent == null ? void 0 : o.getOffsetParent(l.floating), M = (yield o.isElement == null ? void 0 : o.isElement(v)) ? (yield o.getScale == null ? void 0 : o.getScale(v)) || {
        x: 1,
        y: 1
      } : {
        x: 1,
        y: 1
      }, k = we(o.convertOffsetParentRelativeRectToViewportRelativeRect ? yield o.convertOffsetParentRelativeRectToViewportRelativeRect({
        elements: l,
        rect: C,
        offsetParent: v,
        strategy: u
      }) : C);
      return {
        top: (b.top - k.top + d.top) / M.y,
        bottom: (k.bottom - b.bottom + d.bottom) / M.y,
        left: (b.left - k.left + d.left) / M.x,
        right: (k.right - b.right + d.right) / M.x
      };
    });
  }
  function Oe() {
    return typeof window != "undefined";
  }
  function Zt(t) {
    return Rs(t) ? (t.nodeName || "").toLowerCase() : "#document";
  }
  function rt(t) {
    var e;
    return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
  }
  function yt(t) {
    var e;
    return (e = (Rs(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
  }
  function Rs(t) {
    return Oe() ? t instanceof Node || t instanceof rt(t).Node : !1;
  }
  function lt(t) {
    return Oe() ? t instanceof Element || t instanceof rt(t).Element : !1;
  }
  function St(t) {
    return Oe() ? t instanceof HTMLElement || t instanceof rt(t).HTMLElement : !1;
  }
  function En(t) {
    return !Oe() || typeof ShadowRoot == "undefined" ? !1 : t instanceof ShadowRoot || t instanceof rt(t).ShadowRoot;
  }
  function le(t) {
    const {
      overflow: e,
      overflowX: n,
      overflowY: s,
      display: r
    } = ct(t);
    return /auto|scroll|overlay|hidden|clip/.test(e + s + n) && !["inline", "contents"].includes(r);
  }
  function To(t) {
    return ["table", "td", "th"].includes(Zt(t));
  }
  function Pe(t) {
    return [":popover-open", ":modal"].some((e) => {
      try {
        return t.matches(e);
      } catch (n) {
        return !1;
      }
    });
  }
  function dn(t) {
    const e = gn(), n = lt(t) ? ct(t) : t;
    return ["transform", "translate", "scale", "rotate", "perspective"].some((s) => n[s] ? n[s] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((s) => (n.willChange || "").includes(s)) || ["paint", "layout", "strict", "content"].some((s) => (n.contain || "").includes(s));
  }
  function vo(t) {
    let e = Lt(t);
    for (; St(e) && !Kt(e); ) {
      if (dn(e))
        return e;
      if (Pe(e))
        return null;
      e = Lt(e);
    }
    return null;
  }
  function gn() {
    return typeof CSS == "undefined" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
  }
  function Kt(t) {
    return ["html", "body", "#document"].includes(Zt(t));
  }
  function ct(t) {
    return rt(t).getComputedStyle(t);
  }
  function Re(t) {
    return lt(t) ? {
      scrollLeft: t.scrollLeft,
      scrollTop: t.scrollTop
    } : {
      scrollLeft: t.scrollX,
      scrollTop: t.scrollY
    };
  }
  function Lt(t) {
    if (Zt(t) === "html")
      return t;
    const e = (
      // Step into the shadow DOM of the parent of a slotted node.
      t.assignedSlot || // DOM Element detected.
      t.parentNode || // ShadowRoot detected.
      En(t) && t.host || // Fallback.
      yt(t)
    );
    return En(e) ? e.host : e;
  }
  function Is(t) {
    const e = Lt(t);
    return Kt(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : St(e) && le(e) ? e : Is(e);
  }
  function ie(t, e, n) {
    var s;
    e === void 0 && (e = []), n === void 0 && (n = !0);
    const r = Is(t), o = r === ((s = t.ownerDocument) == null ? void 0 : s.body), a = rt(r);
    if (o) {
      const l = tn(a);
      return e.concat(a, a.visualViewport || [], le(r) ? r : [], l && n ? ie(l) : []);
    }
    return e.concat(r, ie(r, [], n));
  }
  function tn(t) {
    return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
  }
  function _s(t) {
    const e = ct(t);
    let n = parseFloat(e.width) || 0, s = parseFloat(e.height) || 0;
    const r = St(t), o = r ? t.offsetWidth : n, a = r ? t.offsetHeight : s, l = Ce(n) !== o || Ce(s) !== a;
    return l && (n = o, s = a), {
      width: n,
      height: s,
      $: l
    };
  }
  function mn(t) {
    return lt(t) ? t : t.contextElement;
  }
  function Gt(t) {
    const e = mn(t);
    if (!St(e))
      return kt(1);
    const n = e.getBoundingClientRect(), {
      width: s,
      height: r,
      $: o
    } = _s(e);
    let a = (o ? Ce(n.width) : n.width) / s, l = (o ? Ce(n.height) : n.height) / r;
    return (!a || !Number.isFinite(a)) && (a = 1), (!l || !Number.isFinite(l)) && (l = 1), {
      x: a,
      y: l
    };
  }
  const Eo = /* @__PURE__ */ kt(0);
  function Ns(t) {
    const e = rt(t);
    return !gn() || !e.visualViewport ? Eo : {
      x: e.visualViewport.offsetLeft,
      y: e.visualViewport.offsetTop
    };
  }
  function $o(t, e, n) {
    return e === void 0 && (e = !1), !n || e && n !== rt(t) ? !1 : e;
  }
  function Nt(t, e, n, s) {
    e === void 0 && (e = !1), n === void 0 && (n = !1);
    const r = t.getBoundingClientRect(), o = mn(t);
    let a = kt(1);
    e && (s ? lt(s) && (a = Gt(s)) : a = Gt(t));
    const l = $o(o, n, s) ? Ns(o) : kt(0);
    let u = (r.left + l.x) / a.x, i = (r.top + l.y) / a.y, c = r.width / a.x, h = r.height / a.y;
    if (o) {
      const f = rt(o), p = s && lt(s) ? rt(s) : s;
      let d = f, m = tn(d);
      for (; m && s && p !== d; ) {
        const S = Gt(m), b = m.getBoundingClientRect(), C = ct(m), v = b.left + (m.clientLeft + parseFloat(C.paddingLeft)) * S.x, M = b.top + (m.clientTop + parseFloat(C.paddingTop)) * S.y;
        u *= S.x, i *= S.y, c *= S.x, h *= S.y, u += v, i += M, d = rt(m), m = tn(d);
      }
    }
    return we({
      width: c,
      height: h,
      x: u,
      y: i
    });
  }
  function kn(t, e) {
    const n = Re(t).scrollLeft;
    return e ? e.left + n : Nt(yt(t)).left + n;
  }
  function Ds(t, e, n) {
    n === void 0 && (n = !1);
    const s = t.getBoundingClientRect(), r = s.left + e.scrollLeft - (n ? 0 : (
      // RTL <body> scrollbar.
      kn(t, s)
    )), o = s.top + e.scrollTop;
    return {
      x: r,
      y: o
    };
  }
  function Lo(t) {
    let {
      elements: e,
      rect: n,
      offsetParent: s,
      strategy: r
    } = t;
    const o = r === "fixed", a = yt(s), l = e ? Pe(e.floating) : !1;
    if (s === a || l && o)
      return n;
    let u = {
      scrollLeft: 0,
      scrollTop: 0
    }, i = kt(1);
    const c = kt(0), h = St(s);
    if ((h || !h && !o) && ((Zt(s) !== "body" || le(a)) && (u = Re(s)), St(s))) {
      const p = Nt(s);
      i = Gt(s), c.x = p.x + s.clientLeft, c.y = p.y + s.clientTop;
    }
    const f = a && !h && !o ? Ds(a, u, !0) : kt(0);
    return {
      width: n.width * i.x,
      height: n.height * i.y,
      x: n.x * i.x - u.scrollLeft * i.x + c.x + f.x,
      y: n.y * i.y - u.scrollTop * i.y + c.y + f.y
    };
  }
  function Oo(t) {
    return Array.from(t.getClientRects());
  }
  function Po(t) {
    const e = yt(t), n = Re(t), s = t.ownerDocument.body, r = Vt(e.scrollWidth, e.clientWidth, s.scrollWidth, s.clientWidth), o = Vt(e.scrollHeight, e.clientHeight, s.scrollHeight, s.clientHeight);
    let a = -n.scrollLeft + kn(t);
    const l = -n.scrollTop;
    return ct(s).direction === "rtl" && (a += Vt(e.clientWidth, s.clientWidth) - r), {
      width: r,
      height: o,
      x: a,
      y: l
    };
  }
  function Ro(t, e) {
    const n = rt(t), s = yt(t), r = n.visualViewport;
    let o = s.clientWidth, a = s.clientHeight, l = 0, u = 0;
    if (r) {
      o = r.width, a = r.height;
      const i = gn();
      (!i || i && e === "fixed") && (l = r.offsetLeft, u = r.offsetTop);
    }
    return {
      width: o,
      height: a,
      x: l,
      y: u
    };
  }
  function Io(t, e) {
    const n = Nt(t, !0, e === "fixed"), s = n.top + t.clientTop, r = n.left + t.clientLeft, o = St(t) ? Gt(t) : kt(1), a = t.clientWidth * o.x, l = t.clientHeight * o.y, u = r * o.x, i = s * o.y;
    return {
      width: a,
      height: l,
      x: u,
      y: i
    };
  }
  function $n(t, e, n) {
    let s;
    if (e === "viewport")
      s = Ro(t, n);
    else if (e === "document")
      s = Po(yt(t));
    else if (lt(e))
      s = Io(e, n);
    else {
      const r = Ns(t);
      s = {
        x: e.x - r.x,
        y: e.y - r.y,
        width: e.width,
        height: e.height
      };
    }
    return we(s);
  }
  function Fs(t, e) {
    const n = Lt(t);
    return n === e || !lt(n) || Kt(n) ? !1 : ct(n).position === "fixed" || Fs(n, e);
  }
  function _o(t, e) {
    const n = e.get(t);
    if (n)
      return n;
    let s = ie(t, [], !1).filter((l) => lt(l) && Zt(l) !== "body"), r = null;
    const o = ct(t).position === "fixed";
    let a = o ? Lt(t) : t;
    for (; lt(a) && !Kt(a); ) {
      const l = ct(a), u = dn(a);
      !u && l.position === "fixed" && (r = null), (o ? !u && !r : !u && l.position === "static" && !!r && ["absolute", "fixed"].includes(r.position) || le(a) && !u && Fs(t, a)) ? s = s.filter((c) => c !== a) : r = l, a = Lt(a);
    }
    return e.set(t, s), s;
  }
  function No(t) {
    let {
      element: e,
      boundary: n,
      rootBoundary: s,
      strategy: r
    } = t;
    const a = [...n === "clippingAncestors" ? Pe(e) ? [] : _o(e, this._c) : [].concat(n), s], l = a[0], u = a.reduce((i, c) => {
      const h = $n(e, c, r);
      return i.top = Vt(h.top, i.top), i.right = Ze(h.right, i.right), i.bottom = Ze(h.bottom, i.bottom), i.left = Vt(h.left, i.left), i;
    }, $n(e, l, r));
    return {
      width: u.right - u.left,
      height: u.bottom - u.top,
      x: u.left,
      y: u.top
    };
  }
  function Do(t) {
    const {
      width: e,
      height: n
    } = _s(t);
    return {
      width: e,
      height: n
    };
  }
  function Fo(t, e, n) {
    const s = St(e), r = yt(e), o = n === "fixed", a = Nt(t, !0, o, e);
    let l = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const u = kt(0);
    if (s || !s && !o)
      if ((Zt(e) !== "body" || le(r)) && (l = Re(e)), s) {
        const f = Nt(e, !0, o, e);
        u.x = f.x + e.clientLeft, u.y = f.y + e.clientTop;
      } else r && (u.x = kn(r));
    const i = r && !s && !o ? Ds(r, l) : kt(0), c = a.left + l.scrollLeft - u.x - i.x, h = a.top + l.scrollTop - u.y - i.y;
    return {
      x: c,
      y: h,
      width: a.width,
      height: a.height
    };
  }
  function _e(t) {
    return ct(t).position === "static";
  }
  function Ln(t, e) {
    if (!St(t) || ct(t).position === "fixed")
      return null;
    if (e)
      return e(t);
    let n = t.offsetParent;
    return yt(t) === n && (n = n.ownerDocument.body), n;
  }
  function Ms(t, e) {
    const n = rt(t);
    if (Pe(t))
      return n;
    if (!St(t)) {
      let r = Lt(t);
      for (; r && !Kt(r); ) {
        if (lt(r) && !_e(r))
          return r;
        r = Lt(r);
      }
      return n;
    }
    let s = Ln(t, e);
    for (; s && To(s) && _e(s); )
      s = Ln(s, e);
    return s && Kt(s) && _e(s) && !dn(s) ? n : s || vo(t) || n;
  }
  const Mo = function(t) {
    return R(this, null, function* () {
      const e = this.getOffsetParent || Ms, n = this.getDimensions, s = yield n(t.floating);
      return {
        reference: Fo(t.reference, yield e(t.floating), t.strategy),
        floating: {
          x: 0,
          y: 0,
          width: s.width,
          height: s.height
        }
      };
    });
  };
  function jo(t) {
    return ct(t).direction === "rtl";
  }
  const H = {
    convertOffsetParentRelativeRectToViewportRelativeRect: Lo,
    getDocumentElement: yt,
    getClippingRect: No,
    getOffsetParent: Ms,
    getElementRects: Mo,
    getClientRects: Oo,
    getDimensions: Do,
    getScale: Gt,
    isElement: lt,
    isRTL: jo
  };
  function js(t, e) {
    return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
  }
  function Bo(t, e) {
    let n = null, s;
    const r = yt(t);
    function o() {
      var l;
      clearTimeout(s), (l = n) == null || l.disconnect(), n = null;
    }
    function a(l, u) {
      l === void 0 && (l = !1), u === void 0 && (u = 1), o();
      const i = t.getBoundingClientRect(), {
        left: c,
        top: h,
        width: f,
        height: p
      } = i;
      if (l || e(), !f || !p)
        return;
      const d = he(h), m = he(r.clientWidth - (c + f)), S = he(r.clientHeight - (h + p)), b = he(c), v = {
        rootMargin: -d + "px " + -m + "px " + -S + "px " + -b + "px",
        threshold: Vt(0, Ze(1, u)) || 1
      };
      let M = !0;
      function k(P) {
        const w = P[0].intersectionRatio;
        if (w !== u) {
          if (!M)
            return a();
          w ? a(!1, w) : s = setTimeout(() => {
            a(!1, 1e-7);
          }, 1e3);
        }
        w === 1 && !js(i, t.getBoundingClientRect()) && a(), M = !1;
      }
      try {
        n = new IntersectionObserver(k, q(W({}, v), {
          // Handle <iframe>s
          root: r.ownerDocument
        }));
      } catch (P) {
        n = new IntersectionObserver(k, v);
      }
      n.observe(t);
    }
    return a(!0), o;
  }
  function en(t, e, n, s) {
    s === void 0 && (s = {});
    const {
      ancestorScroll: r = !0,
      ancestorResize: o = !0,
      elementResize: a = typeof ResizeObserver == "function",
      layoutShift: l = typeof IntersectionObserver == "function",
      animationFrame: u = !1
    } = s, i = mn(t), c = r || o ? [...i ? ie(i) : [], ...ie(e)] : [];
    c.forEach((b) => {
      r && b.addEventListener("scroll", n, {
        passive: !0
      }), o && b.addEventListener("resize", n);
    });
    const h = i && l ? Bo(i, n) : null;
    let f = -1, p = null;
    a && (p = new ResizeObserver((b) => {
      let [C] = b;
      C && C.target === i && p && (p.unobserve(e), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
        var v;
        (v = p) == null || v.observe(e);
      })), n();
    }), i && !u && p.observe(i), p.observe(e));
    let d, m = u ? Nt(t) : null;
    u && S();
    function S() {
      const b = Nt(t);
      m && !js(m, b) && n(), m = b, d = requestAnimationFrame(S);
    }
    return n(), () => {
      var b;
      c.forEach((C) => {
        r && C.removeEventListener("scroll", n), o && C.removeEventListener("resize", n);
      }), h == null || h(), (b = p) == null || b.disconnect(), p = null, u && cancelAnimationFrame(d);
    };
  }
  const Uo = Ao, { hasOwnProperty: Sn } = Object.prototype, ee = function() {
  };
  function On(t) {
    return typeof t == "function" ? t : ee;
  }
  function Pn(t, e) {
    return function(n, s, r) {
      n.type === e && t.call(this, n, s, r);
    };
  }
  function Wo(t, e) {
    const n = e.structure, s = [];
    for (const r in n) {
      if (Sn.call(n, r) === !1)
        continue;
      let o = n[r];
      const a = {
        name: r,
        type: !1,
        nullable: !1
      };
      Array.isArray(o) || (o = [o]);
      for (const l of o)
        l === null ? a.nullable = !0 : typeof l == "string" ? a.type = "node" : Array.isArray(l) && (a.type = "list");
      a.type && s.push(a);
    }
    return s.length ? {
      context: e.walkContext,
      fields: s
    } : null;
  }
  function zo(t) {
    const e = {};
    for (const n in t.node)
      if (Sn.call(t.node, n)) {
        const s = t.node[n];
        if (!s.structure)
          throw new Error("Missed `structure` field in `" + n + "` node type definition");
        e[n] = Wo(n, s);
      }
    return e;
  }
  function Rn(t, e) {
    const n = t.fields.slice(), s = t.context, r = typeof s == "string";
    return e && n.reverse(), function(o, a, l, u) {
      let i;
      r && (i = a[s], a[s] = o);
      for (const c of n) {
        const h = o[c.name];
        if (!c.nullable || h) {
          if (c.type === "list") {
            if (e ? h.reduceRight(u, !1) : h.reduce(u, !1))
              return !0;
          } else if (l(h))
            return !0;
        }
      }
      r && (a[s] = i);
    };
  }
  function In({
    StyleSheet: t,
    Atrule: e,
    Rule: n,
    Block: s,
    DeclarationList: r
  }) {
    return {
      Atrule: {
        StyleSheet: t,
        Atrule: e,
        Rule: n,
        Block: s
      },
      Rule: {
        StyleSheet: t,
        Atrule: e,
        Rule: n,
        Block: s
      },
      Declaration: {
        StyleSheet: t,
        Atrule: e,
        Rule: n,
        Block: s,
        DeclarationList: r
      }
    };
  }
  function Ho(t) {
    const e = zo(t), n = {}, s = {}, r = Symbol("break-walk"), o = Symbol("skip-node");
    for (const i in e)
      Sn.call(e, i) && e[i] !== null && (n[i] = Rn(e[i], !1), s[i] = Rn(e[i], !0));
    const a = In(n), l = In(s), u = function(i, c) {
      function h(b, C, v) {
        const M = f.call(S, b, C, v);
        return M === r ? !0 : M === o ? !1 : !!(d.hasOwnProperty(b.type) && d[b.type](b, S, h, m) || p.call(S, b, C, v) === r);
      }
      let f = ee, p = ee, d = n, m = (b, C, v, M) => b || h(C, v, M);
      const S = {
        break: r,
        skip: o,
        root: i,
        stylesheet: null,
        atrule: null,
        atrulePrelude: null,
        rule: null,
        selector: null,
        block: null,
        declaration: null,
        function: null
      };
      if (typeof c == "function")
        f = c;
      else if (c && (f = On(c.enter), p = On(c.leave), c.reverse && (d = s), c.visit)) {
        if (a.hasOwnProperty(c.visit))
          d = c.reverse ? l[c.visit] : a[c.visit];
        else if (!e.hasOwnProperty(c.visit))
          throw new Error("Bad value `" + c.visit + "` for `visit` option (should be: " + Object.keys(e).sort().join(", ") + ")");
        f = Pn(f, c.visit), p = Pn(p, c.visit);
      }
      if (f === ee && p === ee)
        throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
      h(i);
    };
    return u.break = r, u.skip = o, u.find = function(i, c) {
      let h = null;
      return u(i, function(f, p, d) {
        if (c.call(this, f, p, d))
          return h = f, r;
      }), h;
    }, u.findLast = function(i, c) {
      let h = null;
      return u(i, {
        reverse: !0,
        enter(f, p, d) {
          if (c.call(this, f, p, d))
            return h = f, r;
        }
      }), h;
    }, u.findAll = function(i, c) {
      const h = [];
      return u(i, function(f, p, d) {
        c.call(this, f, p, d) && h.push(f);
      }), h;
    }, u;
  }
  const Tt = 0, g = 1, A = 2, z = 3, N = 4, wt = 5, Vo = 6, Q = 7, ot = 8, O = 9, x = 10, F = 11, $ = 12, U = 13, Ie = 14, et = 15, X = 16, tt = 17, ht = 18, te = 19, oe = 20, I = 21, y = 22, ut = 23, Qt = 24, Y = 25, Go = 0;
  function st(t) {
    return t >= 48 && t <= 57;
  }
  function Yt(t) {
    return st(t) || // 0 .. 9
    t >= 65 && t <= 70 || // A .. F
    t >= 97 && t <= 102;
  }
  function yn(t) {
    return t >= 65 && t <= 90;
  }
  function qo(t) {
    return t >= 97 && t <= 122;
  }
  function Ko(t) {
    return yn(t) || qo(t);
  }
  function Qo(t) {
    return t >= 128;
  }
  function Ae(t) {
    return Ko(t) || Qo(t) || t === 95;
  }
  function Bs(t) {
    return Ae(t) || st(t) || t === 45;
  }
  function Yo(t) {
    return t >= 0 && t <= 8 || t === 11 || t >= 14 && t <= 31 || t === 127;
  }
  function Te(t) {
    return t === 10 || t === 13 || t === 12;
  }
  function Dt(t) {
    return Te(t) || t === 32 || t === 9;
  }
  function mt(t, e) {
    return !(t !== 92 || Te(e) || e === Go);
  }
  function Ne(t, e, n) {
    return t === 45 ? Ae(e) || e === 45 || mt(e, n) : Ae(t) ? !0 : t === 92 ? mt(t, e) : !1;
  }
  function De(t, e, n) {
    return t === 43 || t === 45 ? st(e) ? 2 : e === 46 && st(n) ? 3 : 0 : t === 46 ? st(e) ? 2 : 0 : st(t) ? 1 : 0;
  }
  function Us(t) {
    return t === 65279 || t === 65534 ? 1 : 0;
  }
  const nn = new Array(128), Xo = 128, ke = 130, Ws = 131, bn = 132, zs = 133;
  for (let t = 0; t < nn.length; t++)
    nn[t] = Dt(t) && ke || st(t) && Ws || Ae(t) && bn || Yo(t) && zs || t || Xo;
  function Fe(t) {
    return t < 128 ? nn[t] : bn;
  }
  function qt(t, e) {
    return e < t.length ? t.charCodeAt(e) : 0;
  }
  function sn(t, e, n) {
    return n === 13 && qt(t, e + 1) === 10 ? 2 : 1;
  }
  function Hs(t, e, n) {
    let s = t.charCodeAt(e);
    return yn(s) && (s = s | 32), s === n;
  }
  function ve(t, e, n, s) {
    if (n - e !== s.length || e < 0 || n > t.length)
      return !1;
    for (let r = e; r < n; r++) {
      const o = s.charCodeAt(r - e);
      let a = t.charCodeAt(r);
      if (yn(a) && (a = a | 32), a !== o)
        return !1;
    }
    return !0;
  }
  function Jo(t, e) {
    for (; e >= 0 && Dt(t.charCodeAt(e)); e--)
      ;
    return e + 1;
  }
  function fe(t, e) {
    for (; e < t.length && Dt(t.charCodeAt(e)); e++)
      ;
    return e;
  }
  function Me(t, e) {
    for (; e < t.length && st(t.charCodeAt(e)); e++)
      ;
    return e;
  }
  function Xt(t, e) {
    if (e += 2, Yt(qt(t, e - 1))) {
      for (const s = Math.min(t.length, e + 5); e < s && Yt(qt(t, e)); e++)
        ;
      const n = qt(t, e);
      Dt(n) && (e += sn(t, e, n));
    }
    return e;
  }
  function pe(t, e) {
    for (; e < t.length; e++) {
      const n = t.charCodeAt(e);
      if (!Bs(n)) {
        if (mt(n, qt(t, e + 1))) {
          e = Xt(t, e) - 1;
          continue;
        }
        break;
      }
    }
    return e;
  }
  function Vs(t, e) {
    let n = t.charCodeAt(e);
    if ((n === 43 || n === 45) && (n = t.charCodeAt(e += 1)), st(n) && (e = Me(t, e + 1), n = t.charCodeAt(e)), n === 46 && st(t.charCodeAt(e + 1)) && (e += 2, e = Me(t, e)), Hs(
      t,
      e,
      101
      /* e */
    )) {
      let s = 0;
      n = t.charCodeAt(e + 1), (n === 45 || n === 43) && (s = 1, n = t.charCodeAt(e + 2)), st(n) && (e = Me(t, e + 1 + s + 1));
    }
    return e;
  }
  function je(t, e) {
    for (; e < t.length; e++) {
      const n = t.charCodeAt(e);
      if (n === 41) {
        e++;
        break;
      }
      mt(n, qt(t, e + 1)) && (e = Xt(t, e));
    }
    return e;
  }
  function Gs(t) {
    if (t.length === 1 && !Yt(t.charCodeAt(0)))
      return t[0];
    let e = parseInt(t, 16);
    return (e === 0 || // If this number is zero,
    e >= 55296 && e <= 57343 || // or is for a surrogate,
    e > 1114111) && (e = 65533), String.fromCodePoint(e);
  }
  const qs = [
    "EOF-token",
    "ident-token",
    "function-token",
    "at-keyword-token",
    "hash-token",
    "string-token",
    "bad-string-token",
    "url-token",
    "bad-url-token",
    "delim-token",
    "number-token",
    "percentage-token",
    "dimension-token",
    "whitespace-token",
    "CDO-token",
    "CDC-token",
    "colon-token",
    "semicolon-token",
    "comma-token",
    "[-token",
    "]-token",
    "(-token",
    ")-token",
    "{-token",
    "}-token",
    "comment-token"
  ], Zo = 16 * 1024;
  function Ee(t = null, e) {
    return t === null || t.length < e ? new Uint32Array(Math.max(e + 1024, Zo)) : t;
  }
  const _n = 10, ta = 12, Nn = 13;
  function Dn(t) {
    const e = t.source, n = e.length, s = e.length > 0 ? Us(e.charCodeAt(0)) : 0, r = Ee(t.lines, n), o = Ee(t.columns, n);
    let a = t.startLine, l = t.startColumn;
    for (let u = s; u < n; u++) {
      const i = e.charCodeAt(u);
      r[u] = a, o[u] = l++, (i === _n || i === Nn || i === ta) && (i === Nn && u + 1 < n && e.charCodeAt(u + 1) === _n && (u++, r[u] = a, o[u] = l), a++, l = 1);
    }
    r[n] = a, o[n] = l, t.lines = r, t.columns = o, t.computed = !0;
  }
  class ea {
    constructor(e, n, s, r) {
      this.setSource(e, n, s, r), this.lines = null, this.columns = null;
    }
    setSource(e = "", n = 0, s = 1, r = 1) {
      this.source = e, this.startOffset = n, this.startLine = s, this.startColumn = r, this.computed = !1;
    }
    getLocation(e, n) {
      return this.computed || Dn(this), {
        source: n,
        offset: this.startOffset + e,
        line: this.lines[e],
        column: this.columns[e]
      };
    }
    getLocationRange(e, n, s) {
      return this.computed || Dn(this), {
        source: s,
        start: {
          offset: this.startOffset + e,
          line: this.lines[e],
          column: this.columns[e]
        },
        end: {
          offset: this.startOffset + n,
          line: this.lines[n],
          column: this.columns[n]
        }
      };
    }
  }
  const pt = 16777215, dt = 24, Ft = new Uint8Array(32);
  Ft[A] = y;
  Ft[I] = y;
  Ft[te] = oe;
  Ft[ut] = Qt;
  function Fn(t) {
    return Ft[t] !== 0;
  }
  class na {
    constructor(e, n) {
      this.setSource(e, n);
    }
    reset() {
      this.eof = !1, this.tokenIndex = -1, this.tokenType = 0, this.tokenStart = this.firstCharOffset, this.tokenEnd = this.firstCharOffset;
    }
    setSource(e = "", n = () => {
    }) {
      e = String(e || "");
      const s = e.length, r = Ee(this.offsetAndType, e.length + 1), o = Ee(this.balance, e.length + 1);
      let a = 0, l = -1, u = 0, i = e.length;
      this.offsetAndType = null, this.balance = null, o.fill(0), n(e, (c, h, f) => {
        const p = a++;
        if (r[p] = c << dt | f, l === -1 && (l = h), o[p] = i, c === u) {
          const d = o[i];
          o[i] = p, i = d, u = Ft[r[d] >> dt];
        } else Fn(c) && (i = p, u = Ft[c]);
      }), r[a] = Tt << dt | s, o[a] = a;
      for (let c = 0; c < a; c++) {
        const h = o[c];
        if (h <= c) {
          const f = o[h];
          f !== c && (o[c] = f);
        } else h > a && (o[c] = a);
      }
      this.source = e, this.firstCharOffset = l === -1 ? 0 : l, this.tokenCount = a, this.offsetAndType = r, this.balance = o, this.reset(), this.next();
    }
    lookupType(e) {
      return e += this.tokenIndex, e < this.tokenCount ? this.offsetAndType[e] >> dt : Tt;
    }
    lookupTypeNonSC(e) {
      for (let n = this.tokenIndex; n < this.tokenCount; n++) {
        const s = this.offsetAndType[n] >> dt;
        if (s !== U && s !== Y && e-- === 0)
          return s;
      }
      return Tt;
    }
    lookupOffset(e) {
      return e += this.tokenIndex, e < this.tokenCount ? this.offsetAndType[e - 1] & pt : this.source.length;
    }
    lookupOffsetNonSC(e) {
      for (let n = this.tokenIndex; n < this.tokenCount; n++) {
        const s = this.offsetAndType[n] >> dt;
        if (s !== U && s !== Y && e-- === 0)
          return n - this.tokenIndex;
      }
      return Tt;
    }
    lookupValue(e, n) {
      return e += this.tokenIndex, e < this.tokenCount ? ve(
        this.source,
        this.offsetAndType[e - 1] & pt,
        this.offsetAndType[e] & pt,
        n
      ) : !1;
    }
    getTokenStart(e) {
      return e === this.tokenIndex ? this.tokenStart : e > 0 ? e < this.tokenCount ? this.offsetAndType[e - 1] & pt : this.offsetAndType[this.tokenCount] & pt : this.firstCharOffset;
    }
    substrToCursor(e) {
      return this.source.substring(e, this.tokenStart);
    }
    isBalanceEdge(e) {
      return this.balance[this.tokenIndex] < e;
    }
    isDelim(e, n) {
      return n ? this.lookupType(n) === O && this.source.charCodeAt(this.lookupOffset(n)) === e : this.tokenType === O && this.source.charCodeAt(this.tokenStart) === e;
    }
    skip(e) {
      let n = this.tokenIndex + e;
      n < this.tokenCount ? (this.tokenIndex = n, this.tokenStart = this.offsetAndType[n - 1] & pt, n = this.offsetAndType[n], this.tokenType = n >> dt, this.tokenEnd = n & pt) : (this.tokenIndex = this.tokenCount, this.next());
    }
    next() {
      let e = this.tokenIndex + 1;
      e < this.tokenCount ? (this.tokenIndex = e, this.tokenStart = this.tokenEnd, e = this.offsetAndType[e], this.tokenType = e >> dt, this.tokenEnd = e & pt) : (this.eof = !0, this.tokenIndex = this.tokenCount, this.tokenType = Tt, this.tokenStart = this.tokenEnd = this.source.length);
    }
    skipSC() {
      for (; this.tokenType === U || this.tokenType === Y; )
        this.next();
    }
    skipUntilBalanced(e, n) {
      let s = e, r = 0, o = 0;
      t:
        for (; s < this.tokenCount; s++) {
          if (r = this.balance[s], r < e)
            break t;
          switch (o = s > 0 ? this.offsetAndType[s - 1] & pt : this.firstCharOffset, n(this.source.charCodeAt(o))) {
            case 1:
              break t;
            case 2:
              s++;
              break t;
            default:
              Fn(this.offsetAndType[s] >> dt) && (s = r);
          }
        }
      this.skip(s - this.tokenIndex);
    }
    forEachToken(e) {
      for (let n = 0, s = this.firstCharOffset; n < this.tokenCount; n++) {
        const r = s, o = this.offsetAndType[n], a = o & pt, l = o >> dt;
        s = a, e(l, r, a, n);
      }
    }
    dump() {
      const e = new Array(this.tokenCount);
      return this.forEachToken((n, s, r, o) => {
        e[o] = {
          idx: o,
          type: qs[n],
          chunk: this.source.substring(s, r),
          balance: this.balance[o]
        };
      }), e;
    }
  }
  function Ks(t, e) {
    function n(h) {
      return h < l ? t.charCodeAt(h) : 0;
    }
    function s() {
      if (i = Vs(t, i), Ne(n(i), n(i + 1), n(i + 2))) {
        c = $, i = pe(t, i);
        return;
      }
      if (n(i) === 37) {
        c = F, i++;
        return;
      }
      c = x;
    }
    function r() {
      const h = i;
      if (i = pe(t, i), ve(t, h, i, "url") && n(i) === 40) {
        if (i = fe(t, i + 1), n(i) === 34 || n(i) === 39) {
          c = A, i = h + 4;
          return;
        }
        a();
        return;
      }
      if (n(i) === 40) {
        c = A, i++;
        return;
      }
      c = g;
    }
    function o(h) {
      for (h || (h = n(i++)), c = wt; i < t.length; i++) {
        const f = t.charCodeAt(i);
        switch (Fe(f)) {
          // ending code point
          case h:
            i++;
            return;
          // EOF
          // case EofCategory:
          // This is a parse error. Return the <string-token>.
          // return;
          // newline
          case ke:
            if (Te(f)) {
              i += sn(t, i, f), c = Vo;
              return;
            }
            break;
          // U+005C REVERSE SOLIDUS (\)
          case 92:
            if (i === t.length - 1)
              break;
            const p = n(i + 1);
            Te(p) ? i += sn(t, i + 1, p) : mt(f, p) && (i = Xt(t, i) - 1);
            break;
        }
      }
    }
    function a() {
      for (c = Q, i = fe(t, i); i < t.length; i++) {
        const h = t.charCodeAt(i);
        switch (Fe(h)) {
          // U+0029 RIGHT PARENTHESIS ())
          case 41:
            i++;
            return;
          // EOF
          // case EofCategory:
          // This is a parse error. Return the <url-token>.
          // return;
          // whitespace
          case ke:
            if (i = fe(t, i), n(i) === 41 || i >= t.length) {
              i < t.length && i++;
              return;
            }
            i = je(t, i), c = ot;
            return;
          // U+0022 QUOTATION MARK (")
          // U+0027 APOSTROPHE (')
          // U+0028 LEFT PARENTHESIS (()
          // non-printable code point
          case 34:
          case 39:
          case 40:
          case zs:
            i = je(t, i), c = ot;
            return;
          // U+005C REVERSE SOLIDUS (\)
          case 92:
            if (mt(h, n(i + 1))) {
              i = Xt(t, i) - 1;
              break;
            }
            i = je(t, i), c = ot;
            return;
        }
      }
    }
    t = String(t || "");
    const l = t.length;
    let u = Us(n(0)), i = u, c;
    for (; i < l; ) {
      const h = t.charCodeAt(i);
      switch (Fe(h)) {
        // whitespace
        case ke:
          c = U, i = fe(t, i + 1);
          break;
        // U+0022 QUOTATION MARK (")
        case 34:
          o();
          break;
        // U+0023 NUMBER SIGN (#)
        case 35:
          Bs(n(i + 1)) || mt(n(i + 1), n(i + 2)) ? (c = N, i = pe(t, i + 1)) : (c = O, i++);
          break;
        // U+0027 APOSTROPHE (')
        case 39:
          o();
          break;
        // U+0028 LEFT PARENTHESIS (()
        case 40:
          c = I, i++;
          break;
        // U+0029 RIGHT PARENTHESIS ())
        case 41:
          c = y, i++;
          break;
        // U+002B PLUS SIGN (+)
        case 43:
          De(h, n(i + 1), n(i + 2)) ? s() : (c = O, i++);
          break;
        // U+002C COMMA (,)
        case 44:
          c = ht, i++;
          break;
        // U+002D HYPHEN-MINUS (-)
        case 45:
          De(h, n(i + 1), n(i + 2)) ? s() : n(i + 1) === 45 && n(i + 2) === 62 ? (c = et, i = i + 3) : Ne(h, n(i + 1), n(i + 2)) ? r() : (c = O, i++);
          break;
        // U+002E FULL STOP (.)
        case 46:
          De(h, n(i + 1), n(i + 2)) ? s() : (c = O, i++);
          break;
        // U+002F SOLIDUS (/)
        case 47:
          n(i + 1) === 42 ? (c = Y, i = t.indexOf("*/", i + 2), i = i === -1 ? t.length : i + 2) : (c = O, i++);
          break;
        // U+003A COLON (:)
        case 58:
          c = X, i++;
          break;
        // U+003B SEMICOLON (;)
        case 59:
          c = tt, i++;
          break;
        // U+003C LESS-THAN SIGN (<)
        case 60:
          n(i + 1) === 33 && n(i + 2) === 45 && n(i + 3) === 45 ? (c = Ie, i = i + 4) : (c = O, i++);
          break;
        // U+0040 COMMERCIAL AT (@)
        case 64:
          Ne(n(i + 1), n(i + 2), n(i + 3)) ? (c = z, i = pe(t, i + 1)) : (c = O, i++);
          break;
        // U+005B LEFT SQUARE BRACKET ([)
        case 91:
          c = te, i++;
          break;
        // U+005C REVERSE SOLIDUS (\)
        case 92:
          mt(h, n(i + 1)) ? r() : (c = O, i++);
          break;
        // U+005D RIGHT SQUARE BRACKET (])
        case 93:
          c = oe, i++;
          break;
        // U+007B LEFT CURLY BRACKET ({)
        case 123:
          c = ut, i++;
          break;
        // U+007D RIGHT CURLY BRACKET (})
        case 125:
          c = Qt, i++;
          break;
        // digit
        case Ws:
          s();
          break;
        // name-start code point
        case bn:
          r();
          break;
        // EOF
        // case EofCategory:
        // Return an <EOF-token>.
        // break;
        // anything else
        default:
          c = O, i++;
      }
      e(c, u, u = i);
    }
  }
  const gt = 43, nt = 45, Se = 110, Rt = !0, sa = !1;
  function ye(t, e) {
    let n = this.tokenStart + t;
    const s = this.charCodeAt(n);
    for ((s === gt || s === nt) && (e && this.error("Number sign is not allowed"), n++); n < this.tokenEnd; n++)
      st(this.charCodeAt(n)) || this.error("Integer is expected", n);
  }
  function zt(t) {
    return ye.call(this, 0, t);
  }
  function At(t, e) {
    if (!this.cmpChar(this.tokenStart + t, e)) {
      let n = "";
      switch (e) {
        case Se:
          n = "N is expected";
          break;
        case nt:
          n = "HyphenMinus is expected";
          break;
      }
      this.error(n, this.tokenStart + t);
    }
  }
  function Be() {
    let t = 0, e = 0, n = this.tokenType;
    for (; n === U || n === Y; )
      n = this.lookupType(++t);
    if (n !== x)
      if (this.isDelim(gt, t) || this.isDelim(nt, t)) {
        e = this.isDelim(gt, t) ? gt : nt;
        do
          n = this.lookupType(++t);
        while (n === U || n === Y);
        n !== x && (this.skip(t), zt.call(this, Rt));
      } else
        return null;
    return t > 0 && this.skip(t), e === 0 && (n = this.charCodeAt(this.tokenStart), n !== gt && n !== nt && this.error("Number sign is expected")), zt.call(this, e !== 0), e === nt ? "-" + this.consume(x) : this.consume(x);
  }
  const ra = "AnPlusB", ia = {
    a: [String, null],
    b: [String, null]
  };
  function Qs() {
    const t = this.tokenStart;
    let e = null, n = null;
    if (this.tokenType === x)
      zt.call(this, sa), n = this.consume(x);
    else if (this.tokenType === g && this.cmpChar(this.tokenStart, nt))
      switch (e = "-1", At.call(this, 1, Se), this.tokenEnd - this.tokenStart) {
        // -n
        // -n <signed-integer>
        // -n ['+' | '-'] <signless-integer>
        case 2:
          this.next(), n = Be.call(this);
          break;
        // -n- <signless-integer>
        case 3:
          At.call(this, 2, nt), this.next(), this.skipSC(), zt.call(this, Rt), n = "-" + this.consume(x);
          break;
        // <dashndashdigit-ident>
        default:
          At.call(this, 2, nt), ye.call(this, 3, Rt), this.next(), n = this.substrToCursor(t + 2);
      }
    else if (this.tokenType === g || this.isDelim(gt) && this.lookupType(1) === g) {
      let s = 0;
      switch (e = "1", this.isDelim(gt) && (s = 1, this.next()), At.call(this, 0, Se), this.tokenEnd - this.tokenStart) {
        // '+'? n
        // '+'? n <signed-integer>
        // '+'? n ['+' | '-'] <signless-integer>
        case 1:
          this.next(), n = Be.call(this);
          break;
        // '+'? n- <signless-integer>
        case 2:
          At.call(this, 1, nt), this.next(), this.skipSC(), zt.call(this, Rt), n = "-" + this.consume(x);
          break;
        // '+'? <ndashdigit-ident>
        default:
          At.call(this, 1, nt), ye.call(this, 2, Rt), this.next(), n = this.substrToCursor(t + s + 1);
      }
    } else if (this.tokenType === $) {
      const s = this.charCodeAt(this.tokenStart), r = s === gt || s === nt;
      let o = this.tokenStart + r;
      for (; o < this.tokenEnd && st(this.charCodeAt(o)); o++)
        ;
      o === this.tokenStart + r && this.error("Integer is expected", this.tokenStart + r), At.call(this, o - this.tokenStart, Se), e = this.substring(t, o), o + 1 === this.tokenEnd ? (this.next(), n = Be.call(this)) : (At.call(this, o - this.tokenStart + 1, nt), o + 2 === this.tokenEnd ? (this.next(), this.skipSC(), zt.call(this, Rt), n = "-" + this.consume(x)) : (ye.call(this, o - this.tokenStart + 2, Rt), this.next(), n = this.substrToCursor(o + 1)));
    } else
      this.error();
    return e !== null && e.charCodeAt(0) === gt && (e = e.substr(1)), n !== null && n.charCodeAt(0) === gt && (n = n.substr(1)), {
      type: "AnPlusB",
      loc: this.getLocation(t, this.tokenStart),
      a: e,
      b: n
    };
  }
  function Ys(t) {
    if (t.a) {
      const e = t.a === "+1" && "n" || t.a === "1" && "n" || t.a === "-1" && "-n" || t.a + "n";
      if (t.b) {
        const n = t.b[0] === "-" || t.b[0] === "+" ? t.b : "+" + t.b;
        this.tokenize(e + n);
      } else
        this.tokenize(e);
    } else
      this.tokenize(t.b);
  }
  const oa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Ys,
    name: ra,
    parse: Qs,
    structure: ia
  }, Symbol.toStringTag, { value: "Module" }));
  function Mn() {
    return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon, !0);
  }
  function aa() {
    for (let t = 1, e; e = this.lookupType(t); t++) {
      if (e === Qt)
        return !0;
      if (e === ut || e === z)
        return !1;
    }
    return !1;
  }
  const la = "Atrule", ca = "atrule", ua = {
    name: String,
    prelude: ["AtrulePrelude", "Raw", null],
    block: ["Block", null]
  };
  function Xs(t = !1) {
    const e = this.tokenStart;
    let n, s, r = null, o = null;
    switch (this.eat(z), n = this.substrToCursor(e + 1), s = n.toLowerCase(), this.skipSC(), this.eof === !1 && this.tokenType !== ut && this.tokenType !== tt && (this.parseAtrulePrelude ? r = this.parseWithFallback(this.AtrulePrelude.bind(this, n, t), Mn) : r = Mn.call(this, this.tokenIndex), this.skipSC()), this.tokenType) {
      case tt:
        this.next();
        break;
      case ut:
        hasOwnProperty.call(this.atrule, s) && typeof this.atrule[s].block == "function" ? o = this.atrule[s].block.call(this, t) : o = this.Block(aa.call(this));
        break;
    }
    return {
      type: "Atrule",
      loc: this.getLocation(e, this.tokenStart),
      name: n,
      prelude: r,
      block: o
    };
  }
  function Js(t) {
    this.token(z, "@" + t.name), t.prelude !== null && this.node(t.prelude), t.block ? this.node(t.block) : this.token(tt, ";");
  }
  const ha = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Js,
    name: la,
    parse: Xs,
    structure: ua,
    walkContext: ca
  }, Symbol.toStringTag, { value: "Module" })), fa = "AtrulePrelude", pa = "atrulePrelude", da = {
    children: [[]]
  };
  function Zs(t) {
    let e = null;
    return t !== null && (t = t.toLowerCase()), this.skipSC(), hasOwnProperty.call(this.atrule, t) && typeof this.atrule[t].prelude == "function" ? e = this.atrule[t].prelude.call(this) : e = this.readSequence(this.scope.AtrulePrelude), this.skipSC(), this.eof !== !0 && this.tokenType !== ut && this.tokenType !== tt && this.error("Semicolon or block is expected"), {
      type: "AtrulePrelude",
      loc: this.getLocationFromList(e),
      children: e
    };
  }
  function tr(t) {
    this.children(t);
  }
  const ga = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: tr,
    name: fa,
    parse: Zs,
    structure: da,
    walkContext: pa
  }, Symbol.toStringTag, { value: "Module" })), ma = 36, er = 42, be = 61, ka = 94, rn = 124, Sa = 126;
  function ya() {
    this.eof && this.error("Unexpected end of input");
    const t = this.tokenStart;
    let e = !1;
    return this.isDelim(er) ? (e = !0, this.next()) : this.isDelim(rn) || this.eat(g), this.isDelim(rn) ? this.charCodeAt(this.tokenStart + 1) !== be ? (this.next(), this.eat(g)) : e && this.error("Identifier is expected", this.tokenEnd) : e && this.error("Vertical line is expected"), {
      type: "Identifier",
      loc: this.getLocation(t, this.tokenStart),
      name: this.substrToCursor(t)
    };
  }
  function ba() {
    const t = this.tokenStart, e = this.charCodeAt(t);
    return e !== be && // =
    e !== Sa && // ~=
    e !== ka && // ^=
    e !== ma && // $=
    e !== er && // *=
    e !== rn && this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"), this.next(), e !== be && (this.isDelim(be) || this.error("Equal sign is expected"), this.next()), this.substrToCursor(t);
  }
  const xa = "AttributeSelector", Ca = {
    name: "Identifier",
    matcher: [String, null],
    value: ["String", "Identifier", null],
    flags: [String, null]
  };
  function nr() {
    const t = this.tokenStart;
    let e, n = null, s = null, r = null;
    return this.eat(te), this.skipSC(), e = ya.call(this), this.skipSC(), this.tokenType !== oe && (this.tokenType !== g && (n = ba.call(this), this.skipSC(), s = this.tokenType === wt ? this.String() : this.Identifier(), this.skipSC()), this.tokenType === g && (r = this.consume(g), this.skipSC())), this.eat(oe), {
      type: "AttributeSelector",
      loc: this.getLocation(t, this.tokenStart),
      name: e,
      matcher: n,
      value: s,
      flags: r
    };
  }
  function sr(t) {
    this.token(O, "["), this.node(t.name), t.matcher !== null && (this.tokenize(t.matcher), this.node(t.value)), t.flags !== null && this.token(g, t.flags), this.token(O, "]");
  }
  const wa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: sr,
    name: xa,
    parse: nr,
    structure: Ca
  }, Symbol.toStringTag, { value: "Module" })), Aa = 38;
  function rr() {
    return this.Raw(null, !0);
  }
  function jn() {
    return this.parseWithFallback(this.Rule, rr);
  }
  function Bn() {
    return this.Raw(this.consumeUntilSemicolonIncluded, !0);
  }
  function Ta() {
    if (this.tokenType === tt)
      return Bn.call(this, this.tokenIndex);
    const t = this.parseWithFallback(this.Declaration, Bn);
    return this.tokenType === tt && this.next(), t;
  }
  const va = "Block", Ea = "block", $a = {
    children: [[
      "Atrule",
      "Rule",
      "Declaration"
    ]]
  };
  function ir(t) {
    const e = t ? Ta : jn, n = this.tokenStart;
    let s = this.createList();
    this.eat(ut);
    t:
      for (; !this.eof; )
        switch (this.tokenType) {
          case Qt:
            break t;
          case U:
          case Y:
            this.next();
            break;
          case z:
            s.push(this.parseWithFallback(this.Atrule.bind(this, t), rr));
            break;
          default:
            t && this.isDelim(Aa) ? s.push(jn.call(this)) : s.push(e.call(this));
        }
    return this.eof || this.eat(Qt), {
      type: "Block",
      loc: this.getLocation(n, this.tokenStart),
      children: s
    };
  }
  function or(t) {
    this.token(ut, "{"), this.children(t, (e) => {
      e.type === "Declaration" && this.token(tt, ";");
    }), this.token(Qt, "}");
  }
  const La = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: or,
    name: va,
    parse: ir,
    structure: $a,
    walkContext: Ea
  }, Symbol.toStringTag, { value: "Module" })), Oa = "Brackets", Pa = {
    children: [[]]
  };
  function ar(t, e) {
    const n = this.tokenStart;
    let s = null;
    return this.eat(te), s = t.call(this, e), this.eof || this.eat(oe), {
      type: "Brackets",
      loc: this.getLocation(n, this.tokenStart),
      children: s
    };
  }
  function lr(t) {
    this.token(O, "["), this.children(t), this.token(O, "]");
  }
  const Ra = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: lr,
    name: Oa,
    parse: ar,
    structure: Pa
  }, Symbol.toStringTag, { value: "Module" })), Ia = "CDC", _a = [];
  function cr() {
    const t = this.tokenStart;
    return this.eat(et), {
      type: "CDC",
      loc: this.getLocation(t, this.tokenStart)
    };
  }
  function ur() {
    this.token(et, "-->");
  }
  const Na = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: ur,
    name: Ia,
    parse: cr,
    structure: _a
  }, Symbol.toStringTag, { value: "Module" })), Da = "CDO", Fa = [];
  function hr() {
    const t = this.tokenStart;
    return this.eat(Ie), {
      type: "CDO",
      loc: this.getLocation(t, this.tokenStart)
    };
  }
  function fr() {
    this.token(Ie, "<!--");
  }
  const Ma = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: fr,
    name: Da,
    parse: hr,
    structure: Fa
  }, Symbol.toStringTag, { value: "Module" })), ja = 46, Ba = "ClassSelector", Ua = {
    name: String
  };
  function pr() {
    return this.eatDelim(ja), {
      type: "ClassSelector",
      loc: this.getLocation(this.tokenStart - 1, this.tokenEnd),
      name: this.consume(g)
    };
  }
  function dr(t) {
    this.token(O, "."), this.token(g, t.name);
  }
  const Wa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: dr,
    name: Ba,
    parse: pr,
    structure: Ua
  }, Symbol.toStringTag, { value: "Module" })), za = 43, Un = 47, Ha = 62, Va = 126, Ga = "Combinator", qa = {
    name: String
  };
  function gr() {
    const t = this.tokenStart;
    let e;
    switch (this.tokenType) {
      case U:
        e = " ";
        break;
      case O:
        switch (this.charCodeAt(this.tokenStart)) {
          case Ha:
          case za:
          case Va:
            this.next();
            break;
          case Un:
            this.next(), this.eatIdent("deep"), this.eatDelim(Un);
            break;
          default:
            this.error("Combinator is expected");
        }
        e = this.substrToCursor(t);
        break;
    }
    return {
      type: "Combinator",
      loc: this.getLocation(t, this.tokenStart),
      name: e
    };
  }
  function mr(t) {
    this.tokenize(t.name);
  }
  const Ka = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: mr,
    name: Ga,
    parse: gr,
    structure: qa
  }, Symbol.toStringTag, { value: "Module" })), Qa = 42, Ya = 47, Xa = "Comment", Ja = {
    value: String
  };
  function kr() {
    const t = this.tokenStart;
    let e = this.tokenEnd;
    return this.eat(Y), e - t + 2 >= 2 && this.charCodeAt(e - 2) === Qa && this.charCodeAt(e - 1) === Ya && (e -= 2), {
      type: "Comment",
      loc: this.getLocation(t, this.tokenStart),
      value: this.substring(t + 2, e)
    };
  }
  function Sr(t) {
    this.token(Y, "/*" + t.value + "*/");
  }
  const Za = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Sr,
    name: Xa,
    parse: kr,
    structure: Ja
  }, Symbol.toStringTag, { value: "Module" })), tl = /* @__PURE__ */ new Set([X, y, Tt]), el = "Condition", nl = {
    kind: String,
    children: [[
      "Identifier",
      "Feature",
      "FeatureFunction",
      "FeatureRange",
      "SupportsDeclaration"
    ]]
  };
  function Wn(t) {
    return this.lookupTypeNonSC(1) === g && tl.has(this.lookupTypeNonSC(2)) ? this.Feature(t) : this.FeatureRange(t);
  }
  const sl = {
    media: Wn,
    container: Wn,
    supports() {
      return this.SupportsDeclaration();
    }
  };
  function yr(t = "media") {
    const e = this.createList();
    t: for (; !this.eof; )
      switch (this.tokenType) {
        case Y:
        case U:
          this.next();
          continue;
        case g:
          e.push(this.Identifier());
          break;
        case I: {
          let n = this.parseWithFallback(
            () => sl[t].call(this, t),
            () => null
          );
          n || (n = this.parseWithFallback(
            () => {
              this.eat(I);
              const s = this.Condition(t);
              return this.eat(y), s;
            },
            () => this.GeneralEnclosed(t)
          )), e.push(n);
          break;
        }
        case A: {
          let n = this.parseWithFallback(
            () => this.FeatureFunction(t),
            () => null
          );
          n || (n = this.GeneralEnclosed(t)), e.push(n);
          break;
        }
        default:
          break t;
      }
    return e.isEmpty && this.error("Condition is expected"), {
      type: "Condition",
      loc: this.getLocationFromList(e),
      kind: t,
      children: e
    };
  }
  function br(t) {
    t.children.forEach((e) => {
      e.type === "Condition" ? (this.token(I, "("), this.node(e), this.token(y, ")")) : this.node(e);
    });
  }
  const rl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: br,
    name: el,
    parse: yr,
    structure: nl
  }, Symbol.toStringTag, { value: "Module" })), zn = 45;
  function il(t, e) {
    return e = e || 0, t.length - e >= 2 && t.charCodeAt(e) === zn && t.charCodeAt(e + 1) === zn;
  }
  const xr = 33, ol = 35, al = 36, ll = 38, cl = 42, ul = 43, Hn = 47;
  function hl() {
    return this.Raw(this.consumeUntilExclamationMarkOrSemicolon, !0);
  }
  function fl() {
    return this.Raw(this.consumeUntilExclamationMarkOrSemicolon, !1);
  }
  function pl() {
    const t = this.tokenIndex, e = this.Value();
    return e.type !== "Raw" && this.eof === !1 && this.tokenType !== tt && this.isDelim(xr) === !1 && this.isBalanceEdge(t) === !1 && this.error(), e;
  }
  const dl = "Declaration", gl = "declaration", ml = {
    important: [Boolean, String],
    property: String,
    value: ["Value", "Raw"]
  };
  function Cr() {
    const t = this.tokenStart, e = this.tokenIndex, n = kl.call(this), s = il(n), r = s ? this.parseCustomProperty : this.parseValue, o = s ? fl : hl;
    let a = !1, l;
    this.skipSC(), this.eat(X);
    const u = this.tokenIndex;
    if (s || this.skipSC(), r ? l = this.parseWithFallback(pl, o) : l = o.call(this, this.tokenIndex), s && l.type === "Value" && l.children.isEmpty) {
      for (let i = u - this.tokenIndex; i <= 0; i++)
        if (this.lookupType(i) === U) {
          l.children.appendData({
            type: "WhiteSpace",
            loc: null,
            value: " "
          });
          break;
        }
    }
    return this.isDelim(xr) && (a = Sl.call(this), this.skipSC()), this.eof === !1 && this.tokenType !== tt && this.isBalanceEdge(e) === !1 && this.error(), {
      type: "Declaration",
      loc: this.getLocation(t, this.tokenStart),
      important: a,
      property: n,
      value: l
    };
  }
  function wr(t) {
    this.token(g, t.property), this.token(X, ":"), this.node(t.value), t.important && (this.token(O, "!"), this.token(g, t.important === !0 ? "important" : t.important));
  }
  function kl() {
    const t = this.tokenStart;
    if (this.tokenType === O)
      switch (this.charCodeAt(this.tokenStart)) {
        case cl:
        case al:
        case ul:
        case ol:
        case ll:
          this.next();
          break;
        // TODO: not sure we should support this hack
        case Hn:
          this.next(), this.isDelim(Hn) && this.next();
          break;
      }
    return this.tokenType === N ? this.eat(N) : this.eat(g), this.substrToCursor(t);
  }
  function Sl() {
    this.eat(O), this.skipSC();
    const t = this.consume(g);
    return t === "important" ? !0 : t;
  }
  const yl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: wr,
    name: dl,
    parse: Cr,
    structure: ml,
    walkContext: gl
  }, Symbol.toStringTag, { value: "Module" })), bl = 38;
  function Ue() {
    return this.Raw(this.consumeUntilSemicolonIncluded, !0);
  }
  const xl = "DeclarationList", Cl = {
    children: [[
      "Declaration",
      "Atrule",
      "Rule"
    ]]
  };
  function Ar() {
    const t = this.createList();
    for (; !this.eof; )
      switch (this.tokenType) {
        case U:
        case Y:
        case tt:
          this.next();
          break;
        case z:
          t.push(this.parseWithFallback(this.Atrule.bind(this, !0), Ue));
          break;
        default:
          this.isDelim(bl) ? t.push(this.parseWithFallback(this.Rule, Ue)) : t.push(this.parseWithFallback(this.Declaration, Ue));
      }
    return {
      type: "DeclarationList",
      loc: this.getLocationFromList(t),
      children: t
    };
  }
  function Tr(t) {
    this.children(t, (e) => {
      e.type === "Declaration" && this.token(tt, ";");
    });
  }
  const wl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Tr,
    name: xl,
    parse: Ar,
    structure: Cl
  }, Symbol.toStringTag, { value: "Module" })), Al = "Dimension", Tl = {
    value: String,
    unit: String
  };
  function vr() {
    const t = this.tokenStart, e = this.consumeNumber($);
    return {
      type: "Dimension",
      loc: this.getLocation(t, this.tokenStart),
      value: e,
      unit: this.substring(t + e.length, this.tokenStart)
    };
  }
  function Er(t) {
    this.token($, t.value + t.unit);
  }
  const vl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Er,
    name: Al,
    parse: vr,
    structure: Tl
  }, Symbol.toStringTag, { value: "Module" })), El = 47, $l = "Feature", Ll = {
    kind: String,
    name: String,
    value: ["Identifier", "Number", "Dimension", "Ratio", "Function", null]
  };
  function $r(t) {
    const e = this.tokenStart;
    let n, s = null;
    if (this.eat(I), this.skipSC(), n = this.consume(g), this.skipSC(), this.tokenType !== y) {
      switch (this.eat(X), this.skipSC(), this.tokenType) {
        case x:
          this.lookupNonWSType(1) === O ? s = this.Ratio() : s = this.Number();
          break;
        case $:
          s = this.Dimension();
          break;
        case g:
          s = this.Identifier();
          break;
        case A:
          s = this.parseWithFallback(
            () => {
              const r = this.Function(this.readSequence, this.scope.Value);
              return this.skipSC(), this.isDelim(El) && this.error(), r;
            },
            () => this.Ratio()
          );
          break;
        default:
          this.error("Number, dimension, ratio or identifier is expected");
      }
      this.skipSC();
    }
    return this.eof || this.eat(y), {
      type: "Feature",
      loc: this.getLocation(e, this.tokenStart),
      kind: t,
      name: n,
      value: s
    };
  }
  function Lr(t) {
    this.token(I, "("), this.token(g, t.name), t.value !== null && (this.token(X, ":"), this.node(t.value)), this.token(y, ")");
  }
  const Ol = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Lr,
    name: $l,
    parse: $r,
    structure: Ll
  }, Symbol.toStringTag, { value: "Module" })), Pl = "FeatureFunction", Rl = {
    kind: String,
    feature: String,
    value: ["Declaration", "Selector"]
  };
  function Il(t, e) {
    const s = (this.features[t] || {})[e];
    return typeof s != "function" && this.error(`Unknown feature ${e}()`), s;
  }
  function Or(t = "unknown") {
    const e = this.tokenStart, n = this.consumeFunctionName(), s = Il.call(this, t, n.toLowerCase());
    this.skipSC();
    const r = this.parseWithFallback(
      () => {
        const o = this.tokenIndex, a = s.call(this);
        return this.eof === !1 && this.isBalanceEdge(o) === !1 && this.error(), a;
      },
      () => this.Raw(null, !1)
    );
    return this.eof || this.eat(y), {
      type: "FeatureFunction",
      loc: this.getLocation(e, this.tokenStart),
      kind: t,
      feature: n,
      value: r
    };
  }
  function Pr(t) {
    this.token(A, t.feature + "("), this.node(t.value), this.token(y, ")");
  }
  const _l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Pr,
    name: Pl,
    parse: Or,
    structure: Rl
  }, Symbol.toStringTag, { value: "Module" })), Vn = 47, Nl = 60, Gn = 61, Dl = 62, Fl = "FeatureRange", Ml = {
    kind: String,
    left: ["Identifier", "Number", "Dimension", "Ratio", "Function"],
    leftComparison: String,
    middle: ["Identifier", "Number", "Dimension", "Ratio", "Function"],
    rightComparison: [String, null],
    right: ["Identifier", "Number", "Dimension", "Ratio", "Function", null]
  };
  function We() {
    switch (this.skipSC(), this.tokenType) {
      case x:
        return this.isDelim(Vn, this.lookupOffsetNonSC(1)) ? this.Ratio() : this.Number();
      case $:
        return this.Dimension();
      case g:
        return this.Identifier();
      case A:
        return this.parseWithFallback(
          () => {
            const t = this.Function(this.readSequence, this.scope.Value);
            return this.skipSC(), this.isDelim(Vn) && this.error(), t;
          },
          () => this.Ratio()
        );
      default:
        this.error("Number, dimension, ratio or identifier is expected");
    }
  }
  function qn(t) {
    if (this.skipSC(), this.isDelim(Nl) || this.isDelim(Dl)) {
      const e = this.source[this.tokenStart];
      return this.next(), this.isDelim(Gn) ? (this.next(), e + "=") : e;
    }
    if (this.isDelim(Gn))
      return "=";
    this.error(`Expected ${t ? '":", ' : ""}"<", ">", "=" or ")"`);
  }
  function Rr(t = "unknown") {
    const e = this.tokenStart;
    this.skipSC(), this.eat(I);
    const n = We.call(this), s = qn.call(this, n.type === "Identifier"), r = We.call(this);
    let o = null, a = null;
    return this.lookupNonWSType(0) !== y && (o = qn.call(this), a = We.call(this)), this.skipSC(), this.eat(y), {
      type: "FeatureRange",
      loc: this.getLocation(e, this.tokenStart),
      kind: t,
      left: n,
      leftComparison: s,
      middle: r,
      rightComparison: o,
      right: a
    };
  }
  function Ir(t) {
    this.token(I, "("), this.node(t.left), this.tokenize(t.leftComparison), this.node(t.middle), t.right && (this.tokenize(t.rightComparison), this.node(t.right)), this.token(y, ")");
  }
  const jl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Ir,
    name: Fl,
    parse: Rr,
    structure: Ml
  }, Symbol.toStringTag, { value: "Module" })), Bl = "Function", Ul = "function", Wl = {
    name: String,
    children: [[]]
  };
  function _r(t, e) {
    const n = this.tokenStart, s = this.consumeFunctionName(), r = s.toLowerCase();
    let o;
    return o = e.hasOwnProperty(r) ? e[r].call(this, e) : t.call(this, e), this.eof || this.eat(y), {
      type: "Function",
      loc: this.getLocation(n, this.tokenStart),
      name: s,
      children: o
    };
  }
  function Nr(t) {
    this.token(A, t.name + "("), this.children(t), this.token(y, ")");
  }
  const zl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Nr,
    name: Bl,
    parse: _r,
    structure: Wl,
    walkContext: Ul
  }, Symbol.toStringTag, { value: "Module" })), Hl = "GeneralEnclosed", Vl = {
    kind: String,
    function: [String, null],
    children: [[]]
  };
  function Dr(t) {
    const e = this.tokenStart;
    let n = null;
    this.tokenType === A ? n = this.consumeFunctionName() : this.eat(I);
    const s = this.parseWithFallback(
      () => {
        const r = this.tokenIndex, o = this.readSequence(this.scope.Value);
        return this.eof === !1 && this.isBalanceEdge(r) === !1 && this.error(), o;
      },
      () => this.createSingleNodeList(
        this.Raw(null, !1)
      )
    );
    return this.eof || this.eat(y), {
      type: "GeneralEnclosed",
      loc: this.getLocation(e, this.tokenStart),
      kind: t,
      function: n,
      children: s
    };
  }
  function Fr(t) {
    t.function ? this.token(A, t.function + "(") : this.token(I, "("), this.children(t), this.token(y, ")");
  }
  const Gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Fr,
    name: Hl,
    parse: Dr,
    structure: Vl
  }, Symbol.toStringTag, { value: "Module" })), ql = "XXX", Kl = "Hash", Ql = {
    value: String
  };
  function Mr() {
    const t = this.tokenStart;
    return this.eat(N), {
      type: "Hash",
      loc: this.getLocation(t, this.tokenStart),
      value: this.substrToCursor(t + 1)
    };
  }
  function jr(t) {
    this.token(N, "#" + t.value);
  }
  const Yl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: jr,
    name: Kl,
    parse: Mr,
    structure: Ql,
    xxx: ql
  }, Symbol.toStringTag, { value: "Module" })), Xl = "Identifier", Jl = {
    name: String
  };
  function Br() {
    return {
      type: "Identifier",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      name: this.consume(g)
    };
  }
  function Ur(t) {
    this.token(g, t.name);
  }
  const Zl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Ur,
    name: Xl,
    parse: Br,
    structure: Jl
  }, Symbol.toStringTag, { value: "Module" })), tc = "IdSelector", ec = {
    name: String
  };
  function Wr() {
    const t = this.tokenStart;
    return this.eat(N), {
      type: "IdSelector",
      loc: this.getLocation(t, this.tokenStart),
      name: this.substrToCursor(t + 1)
    };
  }
  function zr(t) {
    this.token(O, "#" + t.name);
  }
  const nc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: zr,
    name: tc,
    parse: Wr,
    structure: ec
  }, Symbol.toStringTag, { value: "Module" })), sc = 46, rc = "Layer", ic = {
    name: String
  };
  function Hr() {
    let t = this.tokenStart, e = this.consume(g);
    for (; this.isDelim(sc); )
      this.eat(O), e += "." + this.consume(g);
    return {
      type: "Layer",
      loc: this.getLocation(t, this.tokenStart),
      name: e
    };
  }
  function Vr(t) {
    this.tokenize(t.name);
  }
  const oc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Vr,
    name: rc,
    parse: Hr,
    structure: ic
  }, Symbol.toStringTag, { value: "Module" })), ac = "LayerList", lc = {
    children: [[
      "Layer"
    ]]
  };
  function Gr() {
    const t = this.createList();
    for (this.skipSC(); !this.eof && (t.push(this.Layer()), this.lookupTypeNonSC(0) === ht); )
      this.skipSC(), this.next(), this.skipSC();
    return {
      type: "LayerList",
      loc: this.getLocationFromList(t),
      children: t
    };
  }
  function qr(t) {
    this.children(t, () => this.token(ht, ","));
  }
  const cc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: qr,
    name: ac,
    parse: Gr,
    structure: lc
  }, Symbol.toStringTag, { value: "Module" })), uc = "MediaQuery", hc = {
    modifier: [String, null],
    mediaType: [String, null],
    condition: ["Condition", null]
  };
  function Kr() {
    const t = this.tokenStart;
    let e = null, n = null, s = null;
    if (this.skipSC(), this.tokenType === g && this.lookupTypeNonSC(1) !== I) {
      const r = this.consume(g), o = r.toLowerCase();
      switch (o === "not" || o === "only" ? (this.skipSC(), e = o, n = this.consume(g)) : n = r, this.lookupTypeNonSC(0)) {
        case g: {
          this.skipSC(), this.eatIdent("and"), s = this.Condition("media");
          break;
        }
        case ut:
        case tt:
        case ht:
        case Tt:
          break;
        default:
          this.error("Identifier or parenthesis is expected");
      }
    } else
      switch (this.tokenType) {
        case g:
        case I:
        case A: {
          s = this.Condition("media");
          break;
        }
        case ut:
        case tt:
        case Tt:
          break;
        default:
          this.error("Identifier or parenthesis is expected");
      }
    return {
      type: "MediaQuery",
      loc: this.getLocation(t, this.tokenStart),
      modifier: e,
      mediaType: n,
      condition: s
    };
  }
  function Qr(t) {
    t.mediaType ? (t.modifier && this.token(g, t.modifier), this.token(g, t.mediaType), t.condition && (this.token(g, "and"), this.node(t.condition))) : t.condition && this.node(t.condition);
  }
  const fc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Qr,
    name: uc,
    parse: Kr,
    structure: hc
  }, Symbol.toStringTag, { value: "Module" })), pc = "MediaQueryList", dc = {
    children: [[
      "MediaQuery"
    ]]
  };
  function Yr() {
    const t = this.createList();
    for (this.skipSC(); !this.eof && (t.push(this.MediaQuery()), this.tokenType === ht); )
      this.next();
    return {
      type: "MediaQueryList",
      loc: this.getLocationFromList(t),
      children: t
    };
  }
  function Xr(t) {
    this.children(t, () => this.token(ht, ","));
  }
  const gc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Xr,
    name: pc,
    parse: Yr,
    structure: dc
  }, Symbol.toStringTag, { value: "Module" })), mc = 38, kc = "NestingSelector", Sc = {};
  function Jr() {
    const t = this.tokenStart;
    return this.eatDelim(mc), {
      type: "NestingSelector",
      loc: this.getLocation(t, this.tokenStart)
    };
  }
  function Zr() {
    this.token(O, "&");
  }
  const yc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Zr,
    name: kc,
    parse: Jr,
    structure: Sc
  }, Symbol.toStringTag, { value: "Module" })), bc = "Nth", xc = {
    nth: ["AnPlusB", "Identifier"],
    selector: ["SelectorList", null]
  };
  function ti() {
    this.skipSC();
    const t = this.tokenStart;
    let e = t, n = null, s;
    return this.lookupValue(0, "odd") || this.lookupValue(0, "even") ? s = this.Identifier() : s = this.AnPlusB(), e = this.tokenStart, this.skipSC(), this.lookupValue(0, "of") && (this.next(), n = this.SelectorList(), e = this.tokenStart), {
      type: "Nth",
      loc: this.getLocation(t, e),
      nth: s,
      selector: n
    };
  }
  function ei(t) {
    this.node(t.nth), t.selector !== null && (this.token(g, "of"), this.node(t.selector));
  }
  const Cc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: ei,
    name: bc,
    parse: ti,
    structure: xc
  }, Symbol.toStringTag, { value: "Module" })), wc = "Number", Ac = {
    value: String
  };
  function ni() {
    return {
      type: "Number",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      value: this.consume(x)
    };
  }
  function si(t) {
    this.token(x, t.value);
  }
  const Tc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: si,
    name: wc,
    parse: ni,
    structure: Ac
  }, Symbol.toStringTag, { value: "Module" })), vc = "Operator", Ec = {
    value: String
  };
  function ri() {
    const t = this.tokenStart;
    return this.next(), {
      type: "Operator",
      loc: this.getLocation(t, this.tokenStart),
      value: this.substrToCursor(t)
    };
  }
  function ii(t) {
    this.tokenize(t.value);
  }
  const $c = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: ii,
    name: vc,
    parse: ri,
    structure: Ec
  }, Symbol.toStringTag, { value: "Module" })), Lc = "Parentheses", Oc = {
    children: [[]]
  };
  function oi(t, e) {
    const n = this.tokenStart;
    let s = null;
    return this.eat(I), s = t.call(this, e), this.eof || this.eat(y), {
      type: "Parentheses",
      loc: this.getLocation(n, this.tokenStart),
      children: s
    };
  }
  function ai(t) {
    this.token(I, "("), this.children(t), this.token(y, ")");
  }
  const Pc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: ai,
    name: Lc,
    parse: oi,
    structure: Oc
  }, Symbol.toStringTag, { value: "Module" })), Rc = "Percentage", Ic = {
    value: String
  };
  function li() {
    return {
      type: "Percentage",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      value: this.consumeNumber(F)
    };
  }
  function ci(t) {
    this.token(F, t.value + "%");
  }
  const _c = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: ci,
    name: Rc,
    parse: li,
    structure: Ic
  }, Symbol.toStringTag, { value: "Module" })), Nc = "PseudoClassSelector", Dc = "function", Fc = {
    name: String,
    children: [["Raw"], null]
  };
  function ui() {
    const t = this.tokenStart;
    let e = null, n, s;
    return this.eat(X), this.tokenType === A ? (n = this.consumeFunctionName(), s = n.toLowerCase(), this.lookupNonWSType(0) == y ? e = this.createList() : hasOwnProperty.call(this.pseudo, s) ? (this.skipSC(), e = this.pseudo[s].call(this), this.skipSC()) : (e = this.createList(), e.push(
      this.Raw(null, !1)
    )), this.eat(y)) : n = this.consume(g), {
      type: "PseudoClassSelector",
      loc: this.getLocation(t, this.tokenStart),
      name: n,
      children: e
    };
  }
  function hi(t) {
    this.token(X, ":"), t.children === null ? this.token(g, t.name) : (this.token(A, t.name + "("), this.children(t), this.token(y, ")"));
  }
  const Mc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: hi,
    name: Nc,
    parse: ui,
    structure: Fc,
    walkContext: Dc
  }, Symbol.toStringTag, { value: "Module" })), jc = "PseudoElementSelector", Bc = "function", Uc = {
    name: String,
    children: [["Raw"], null]
  };
  function fi() {
    const t = this.tokenStart;
    let e = null, n, s;
    return this.eat(X), this.eat(X), this.tokenType === A ? (n = this.consumeFunctionName(), s = n.toLowerCase(), this.lookupNonWSType(0) == y ? e = this.createList() : hasOwnProperty.call(this.pseudo, s) ? (this.skipSC(), e = this.pseudo[s].call(this), this.skipSC()) : (e = this.createList(), e.push(
      this.Raw(null, !1)
    )), this.eat(y)) : n = this.consume(g), {
      type: "PseudoElementSelector",
      loc: this.getLocation(t, this.tokenStart),
      name: n,
      children: e
    };
  }
  function pi(t) {
    this.token(X, ":"), this.token(X, ":"), t.children === null ? this.token(g, t.name) : (this.token(A, t.name + "("), this.children(t), this.token(y, ")"));
  }
  const Wc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: pi,
    name: jc,
    parse: fi,
    structure: Uc,
    walkContext: Bc
  }, Symbol.toStringTag, { value: "Module" })), Kn = 47;
  function Qn() {
    switch (this.skipSC(), this.tokenType) {
      case x:
        return this.Number();
      case A:
        return this.Function(this.readSequence, this.scope.Value);
      default:
        this.error("Number of function is expected");
    }
  }
  const zc = "Ratio", Hc = {
    left: ["Number", "Function"],
    right: ["Number", "Function", null]
  };
  function di() {
    const t = this.tokenStart, e = Qn.call(this);
    let n = null;
    return this.skipSC(), this.isDelim(Kn) && (this.eatDelim(Kn), n = Qn.call(this)), {
      type: "Ratio",
      loc: this.getLocation(t, this.tokenStart),
      left: e,
      right: n
    };
  }
  function gi(t) {
    this.node(t.left), this.token(O, "/"), t.right ? this.node(t.right) : this.node(x, 1);
  }
  const Vc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: gi,
    name: zc,
    parse: di,
    structure: Hc
  }, Symbol.toStringTag, { value: "Module" }));
  function Gc() {
    return this.tokenIndex > 0 && this.lookupType(-1) === U ? this.tokenIndex > 1 ? this.getTokenStart(this.tokenIndex - 1) : this.firstCharOffset : this.tokenStart;
  }
  const qc = "Raw", Kc = {
    value: String
  };
  function mi(t, e) {
    const n = this.getTokenStart(this.tokenIndex);
    let s;
    return this.skipUntilBalanced(this.tokenIndex, t || this.consumeUntilBalanceEnd), e && this.tokenStart > n ? s = Gc.call(this) : s = this.tokenStart, {
      type: "Raw",
      loc: this.getLocation(n, s),
      value: this.substring(n, s)
    };
  }
  function ki(t) {
    this.tokenize(t.value);
  }
  const Qc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: ki,
    name: qc,
    parse: mi,
    structure: Kc
  }, Symbol.toStringTag, { value: "Module" }));
  function Yn() {
    return this.Raw(this.consumeUntilLeftCurlyBracket, !0);
  }
  function Yc() {
    const t = this.SelectorList();
    return t.type !== "Raw" && this.eof === !1 && this.tokenType !== ut && this.error(), t;
  }
  const Xc = "Rule", Jc = "rule", Zc = {
    prelude: ["SelectorList", "Raw"],
    block: ["Block"]
  };
  function Si() {
    const t = this.tokenIndex, e = this.tokenStart;
    let n, s;
    return this.parseRulePrelude ? n = this.parseWithFallback(Yc, Yn) : n = Yn.call(this, t), s = this.Block(!0), {
      type: "Rule",
      loc: this.getLocation(e, this.tokenStart),
      prelude: n,
      block: s
    };
  }
  function yi(t) {
    this.node(t.prelude), this.node(t.block);
  }
  const tu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: yi,
    name: Xc,
    parse: Si,
    structure: Zc,
    walkContext: Jc
  }, Symbol.toStringTag, { value: "Module" })), eu = "Scope", nu = {
    root: ["SelectorList", "Raw", null],
    limit: ["SelectorList", "Raw", null]
  };
  function bi() {
    let t = null, e = null;
    this.skipSC();
    const n = this.tokenStart;
    return this.tokenType === I && (this.next(), this.skipSC(), t = this.parseWithFallback(
      this.SelectorList,
      () => this.Raw(!1, !0)
    ), this.skipSC(), this.eat(y)), this.lookupNonWSType(0) === g && (this.skipSC(), this.eatIdent("to"), this.skipSC(), this.eat(I), this.skipSC(), e = this.parseWithFallback(
      this.SelectorList,
      () => this.Raw(!1, !0)
    ), this.skipSC(), this.eat(y)), {
      type: "Scope",
      loc: this.getLocation(n, this.tokenStart),
      root: t,
      limit: e
    };
  }
  function xi(t) {
    t.root && (this.token(I, "("), this.node(t.root), this.token(y, ")")), t.limit && (this.token(g, "to"), this.token(I, "("), this.node(t.limit), this.token(y, ")"));
  }
  const su = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: xi,
    name: eu,
    parse: bi,
    structure: nu
  }, Symbol.toStringTag, { value: "Module" })), ru = "Selector", iu = {
    children: [[
      "TypeSelector",
      "IdSelector",
      "ClassSelector",
      "AttributeSelector",
      "PseudoClassSelector",
      "PseudoElementSelector",
      "Combinator"
    ]]
  };
  function Ci() {
    const t = this.readSequence(this.scope.Selector);
    return this.getFirstListNode(t) === null && this.error("Selector is expected"), {
      type: "Selector",
      loc: this.getLocationFromList(t),
      children: t
    };
  }
  function wi(t) {
    this.children(t);
  }
  const ou = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: wi,
    name: ru,
    parse: Ci,
    structure: iu
  }, Symbol.toStringTag, { value: "Module" })), au = "SelectorList", lu = "selector", cu = {
    children: [[
      "Selector",
      "Raw"
    ]]
  };
  function Ai() {
    const t = this.createList();
    for (; !this.eof; ) {
      if (t.push(this.Selector()), this.tokenType === ht) {
        this.next();
        continue;
      }
      break;
    }
    return {
      type: "SelectorList",
      loc: this.getLocationFromList(t),
      children: t
    };
  }
  function Ti(t) {
    this.children(t, () => this.token(ht, ","));
  }
  const uu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Ti,
    name: au,
    parse: Ai,
    structure: cu,
    walkContext: lu
  }, Symbol.toStringTag, { value: "Module" })), on = 92, vi = 34, hu = 39;
  function Ei(t) {
    const e = t.length, n = t.charCodeAt(0), s = n === vi || n === hu ? 1 : 0, r = s === 1 && e > 1 && t.charCodeAt(e - 1) === n ? e - 2 : e - 1;
    let o = "";
    for (let a = s; a <= r; a++) {
      let l = t.charCodeAt(a);
      if (l === on) {
        if (a === r) {
          a !== e - 1 && (o = t.substr(a + 1));
          break;
        }
        if (l = t.charCodeAt(++a), mt(on, l)) {
          const u = a - 1, i = Xt(t, u);
          a = i - 1, o += Gs(t.substring(u + 1, i));
        } else
          l === 13 && t.charCodeAt(a + 1) === 10 && a++;
      } else
        o += t[a];
    }
    return o;
  }
  function fu(t, e) {
    const n = '"', s = vi;
    let r = "", o = !1;
    for (let a = 0; a < t.length; a++) {
      const l = t.charCodeAt(a);
      if (l === 0) {
        r += "�";
        continue;
      }
      if (l <= 31 || l === 127) {
        r += "\\" + l.toString(16), o = !0;
        continue;
      }
      l === s || l === on ? (r += "\\" + t.charAt(a), o = !1) : (o && (Yt(l) || Dt(l)) && (r += " "), r += t.charAt(a), o = !1);
    }
    return n + r + n;
  }
  const pu = "String", du = {
    value: String
  };
  function $i() {
    return {
      type: "String",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      value: Ei(this.consume(wt))
    };
  }
  function Li(t) {
    this.token(wt, fu(t.value));
  }
  const gu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Li,
    name: pu,
    parse: $i,
    structure: du
  }, Symbol.toStringTag, { value: "Module" })), mu = 33;
  function Xn() {
    return this.Raw(null, !1);
  }
  const ku = "StyleSheet", Su = "stylesheet", yu = {
    children: [[
      "Comment",
      "CDO",
      "CDC",
      "Atrule",
      "Rule",
      "Raw"
    ]]
  };
  function Oi() {
    const t = this.tokenStart, e = this.createList();
    let n;
    for (; !this.eof; ) {
      switch (this.tokenType) {
        case U:
          this.next();
          continue;
        case Y:
          if (this.charCodeAt(this.tokenStart + 2) !== mu) {
            this.next();
            continue;
          }
          n = this.Comment();
          break;
        case Ie:
          n = this.CDO();
          break;
        case et:
          n = this.CDC();
          break;
        // CSS Syntax Module Level 3
        // §2.2 Error handling
        // At the "top level" of a stylesheet, an <at-keyword-token> starts an at-rule.
        case z:
          n = this.parseWithFallback(this.Atrule, Xn);
          break;
        // Anything else starts a qualified rule ...
        default:
          n = this.parseWithFallback(this.Rule, Xn);
      }
      e.push(n);
    }
    return {
      type: "StyleSheet",
      loc: this.getLocation(t, this.tokenStart),
      children: e
    };
  }
  function Pi(t) {
    this.children(t);
  }
  const bu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Pi,
    name: ku,
    parse: Oi,
    structure: yu,
    walkContext: Su
  }, Symbol.toStringTag, { value: "Module" })), xu = "SupportsDeclaration", Cu = {
    declaration: "Declaration"
  };
  function Ri() {
    const t = this.tokenStart;
    this.eat(I), this.skipSC();
    const e = this.Declaration();
    return this.eof || this.eat(y), {
      type: "SupportsDeclaration",
      loc: this.getLocation(t, this.tokenStart),
      declaration: e
    };
  }
  function Ii(t) {
    this.token(I, "("), this.node(t.declaration), this.token(y, ")");
  }
  const wu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Ii,
    name: xu,
    parse: Ri,
    structure: Cu
  }, Symbol.toStringTag, { value: "Module" })), Au = 42, Jn = 124;
  function ze() {
    this.tokenType !== g && this.isDelim(Au) === !1 && this.error("Identifier or asterisk is expected"), this.next();
  }
  const Tu = "TypeSelector", vu = {
    name: String
  };
  function _i() {
    const t = this.tokenStart;
    return this.isDelim(Jn) ? (this.next(), ze.call(this)) : (ze.call(this), this.isDelim(Jn) && (this.next(), ze.call(this))), {
      type: "TypeSelector",
      loc: this.getLocation(t, this.tokenStart),
      name: this.substrToCursor(t)
    };
  }
  function Ni(t) {
    this.tokenize(t.name);
  }
  const Eu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Ni,
    name: Tu,
    parse: _i,
    structure: vu
  }, Symbol.toStringTag, { value: "Module" })), Di = 43, Fi = 45, an = 63;
  function ne(t, e) {
    let n = 0;
    for (let s = this.tokenStart + t; s < this.tokenEnd; s++) {
      const r = this.charCodeAt(s);
      if (r === Fi && e && n !== 0)
        return ne.call(this, t + n + 1, !1), -1;
      Yt(r) || this.error(
        e && n !== 0 ? "Hyphen minus" + (n < 6 ? " or hex digit" : "") + " is expected" : n < 6 ? "Hex digit is expected" : "Unexpected input",
        s
      ), ++n > 6 && this.error("Too many hex digits", s);
    }
    return this.next(), n;
  }
  function de(t) {
    let e = 0;
    for (; this.isDelim(an); )
      ++e > t && this.error("Too many question marks"), this.next();
  }
  function $u(t) {
    this.charCodeAt(this.tokenStart) !== t && this.error((t === Di ? "Plus sign" : "Hyphen minus") + " is expected");
  }
  function Lu() {
    let t = 0;
    switch (this.tokenType) {
      case x:
        if (t = ne.call(this, 1, !0), this.isDelim(an)) {
          de.call(this, 6 - t);
          break;
        }
        if (this.tokenType === $ || this.tokenType === x) {
          $u.call(this, Fi), ne.call(this, 1, !1);
          break;
        }
        break;
      case $:
        t = ne.call(this, 1, !0), t > 0 && de.call(this, 6 - t);
        break;
      default:
        if (this.eatDelim(Di), this.tokenType === g) {
          t = ne.call(this, 0, !0), t > 0 && de.call(this, 6 - t);
          break;
        }
        if (this.isDelim(an)) {
          this.next(), de.call(this, 5);
          break;
        }
        this.error("Hex digit or question mark is expected");
    }
  }
  const Ou = "UnicodeRange", Pu = {
    value: String
  };
  function Mi() {
    const t = this.tokenStart;
    return this.eatIdent("u"), Lu.call(this), {
      type: "UnicodeRange",
      loc: this.getLocation(t, this.tokenStart),
      value: this.substrToCursor(t)
    };
  }
  function ji(t) {
    this.tokenize(t.value);
  }
  const Ru = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: ji,
    name: Ou,
    parse: Mi,
    structure: Pu
  }, Symbol.toStringTag, { value: "Module" })), Iu = 32, ln = 92, _u = 34, Nu = 39, Du = 40, Bi = 41;
  function Fu(t) {
    const e = t.length;
    let n = 4, s = t.charCodeAt(e - 1) === Bi ? e - 2 : e - 1, r = "";
    for (; n < s && Dt(t.charCodeAt(n)); )
      n++;
    for (; n < s && Dt(t.charCodeAt(s)); )
      s--;
    for (let o = n; o <= s; o++) {
      let a = t.charCodeAt(o);
      if (a === ln) {
        if (o === s) {
          o !== e - 1 && (r = t.substr(o + 1));
          break;
        }
        if (a = t.charCodeAt(++o), mt(ln, a)) {
          const l = o - 1, u = Xt(t, l);
          o = u - 1, r += Gs(t.substring(l + 1, u));
        } else
          a === 13 && t.charCodeAt(o + 1) === 10 && o++;
      } else
        r += t[o];
    }
    return r;
  }
  function Mu(t) {
    let e = "", n = !1;
    for (let s = 0; s < t.length; s++) {
      const r = t.charCodeAt(s);
      if (r === 0) {
        e += "�";
        continue;
      }
      if (r <= 31 || r === 127) {
        e += "\\" + r.toString(16), n = !0;
        continue;
      }
      r === Iu || r === ln || r === _u || r === Nu || r === Du || r === Bi ? (e += "\\" + t.charAt(s), n = !1) : (n && Yt(r) && (e += " "), e += t.charAt(s), n = !1);
    }
    return "url(" + e + ")";
  }
  const ju = "Url", Bu = {
    value: String
  };
  function Ui() {
    const t = this.tokenStart;
    let e;
    switch (this.tokenType) {
      case Q:
        e = Fu(this.consume(Q));
        break;
      case A:
        this.cmpStr(this.tokenStart, this.tokenEnd, "url(") || this.error("Function name must be `url`"), this.eat(A), this.skipSC(), e = Ei(this.consume(wt)), this.skipSC(), this.eof || this.eat(y);
        break;
      default:
        this.error("Url or Function is expected");
    }
    return {
      type: "Url",
      loc: this.getLocation(t, this.tokenStart),
      value: e
    };
  }
  function Wi(t) {
    this.token(Q, Mu(t.value));
  }
  const Uu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Wi,
    name: ju,
    parse: Ui,
    structure: Bu
  }, Symbol.toStringTag, { value: "Module" })), Wu = "Value", zu = {
    children: [[]]
  };
  function zi() {
    const t = this.tokenStart, e = this.readSequence(this.scope.Value);
    return {
      type: "Value",
      loc: this.getLocation(t, this.tokenStart),
      children: e
    };
  }
  function Hi(t) {
    this.children(t);
  }
  const Hu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Hi,
    name: Wu,
    parse: zi,
    structure: zu
  }, Symbol.toStringTag, { value: "Module" })), Vu = Object.freeze({
    type: "WhiteSpace",
    loc: null,
    value: " "
  }), Gu = "WhiteSpace", qu = {
    value: String
  };
  function Vi() {
    return this.eat(U), Vu;
  }
  function Gi(t) {
    this.token(U, t.value);
  }
  const Ku = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    generate: Gi,
    name: Gu,
    parse: Vi,
    structure: qu
  }, Symbol.toStringTag, { value: "Module" })), Qu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    AnPlusB: oa,
    Atrule: ha,
    AtrulePrelude: ga,
    AttributeSelector: wa,
    Block: La,
    Brackets: Ra,
    CDC: Na,
    CDO: Ma,
    ClassSelector: Wa,
    Combinator: Ka,
    Comment: Za,
    Condition: rl,
    Declaration: yl,
    DeclarationList: wl,
    Dimension: vl,
    Feature: Ol,
    FeatureFunction: _l,
    FeatureRange: jl,
    Function: zl,
    GeneralEnclosed: Gl,
    Hash: Yl,
    IdSelector: nc,
    Identifier: Zl,
    Layer: oc,
    LayerList: cc,
    MediaQuery: fc,
    MediaQueryList: gc,
    NestingSelector: yc,
    Nth: Cc,
    Number: Tc,
    Operator: $c,
    Parentheses: Pc,
    Percentage: _c,
    PseudoClassSelector: Mc,
    PseudoElementSelector: Wc,
    Ratio: Vc,
    Raw: Qc,
    Rule: tu,
    Scope: su,
    Selector: ou,
    SelectorList: uu,
    String: gu,
    StyleSheet: bu,
    SupportsDeclaration: wu,
    TypeSelector: Eu,
    UnicodeRange: Ru,
    Url: Uu,
    Value: Hu,
    WhiteSpace: Ku
  }, Symbol.toStringTag, { value: "Module" })), Yu = {
    node: Qu
  }, Et = Ho(Yu), xn = [
    "left",
    "right",
    "top",
    "bottom",
    "inset-block-start",
    "inset-block-end",
    "inset-inline-start",
    "inset-inline-end",
    "inset-block",
    "inset-inline",
    "inset"
  ];
  function ae(t) {
    return xn.includes(t);
  }
  const Cn = [
    "margin-block-start",
    "margin-block-end",
    "margin-block",
    "margin-inline-start",
    "margin-inline-end",
    "margin-inline",
    "margin-bottom",
    "margin-left",
    "margin-right",
    "margin-top",
    "margin"
  ];
  function Xu(t) {
    return Cn.includes(t);
  }
  const wn = [
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "block-size",
    "inline-size",
    "min-block-size",
    "min-inline-size",
    "max-block-size",
    "max-inline-size"
  ];
  function qi(t) {
    return wn.includes(t);
  }
  const Ki = [
    "justify-self",
    "align-self",
    "place-self"
  ];
  function Ju(t) {
    return Ki.includes(t);
  }
  const Qi = [
    ...xn,
    ...Cn,
    ...wn,
    ...Ki,
    "position-anchor",
    "position-area"
  ], Zu = [
    ...wn,
    ...xn,
    ...Cn
  ];
  function Yi(t) {
    return Zu.includes(
      t
    );
  }
  const th = [
    "top",
    "left",
    "right",
    "bottom",
    "start",
    "end",
    "self-start",
    "self-end",
    "center",
    "inside",
    "outside"
  ];
  function Xi(t) {
    return th.includes(t);
  }
  const eh = [
    "width",
    "height",
    "block",
    "inline",
    "self-block",
    "self-inline"
  ];
  function nh(t) {
    return eh.includes(t);
  }
  const Zn = /* @__PURE__ */ new Set(["Atrule", "Selector", "Declaration"]);
  function sh(t) {
    const e = new SourceMapGenerator(), n = {
      line: 1,
      column: 0
    }, s = {
      line: 0,
      // should be zero to add first mapping
      column: 0
    }, r = {
      line: 1,
      column: 0
    }, o = {
      generated: r
    };
    let a = 1, l = 0, u = !1;
    const i = t.node;
    t.node = function(f) {
      if (f.loc && f.loc.start && Zn.has(f.type)) {
        const p = f.loc.start.line, d = f.loc.start.column - 1;
        (s.line !== p || s.column !== d) && (s.line = p, s.column = d, n.line = a, n.column = l, u && (u = !1, (n.line !== r.line || n.column !== r.column) && e.addMapping(o)), u = !0, e.addMapping({
          source: f.loc.source,
          original: s,
          generated: n
        }));
      }
      i.call(this, f), u && Zn.has(f.type) && (r.line = a, r.column = l);
    };
    const c = t.emit;
    t.emit = function(f, p, d) {
      for (let m = 0; m < f.length; m++)
        f.charCodeAt(m) === 10 ? (a++, l = 0) : l++;
      c(f, p, d);
    };
    const h = t.result;
    return t.result = function() {
      return u && e.addMapping(o), {
        css: h(),
        map: e
      };
    }, t;
  }
  const rh = 43, ih = 45, He = (t, e) => {
    if (t === O && (t = e), typeof t == "string") {
      const n = t.charCodeAt(0);
      return n > 127 ? 32768 : n << 8;
    }
    return t;
  }, Ji = [
    [g, g],
    [g, A],
    [g, Q],
    [g, ot],
    [g, "-"],
    [g, x],
    [g, F],
    [g, $],
    [g, et],
    [g, I],
    [z, g],
    [z, A],
    [z, Q],
    [z, ot],
    [z, "-"],
    [z, x],
    [z, F],
    [z, $],
    [z, et],
    [N, g],
    [N, A],
    [N, Q],
    [N, ot],
    [N, "-"],
    [N, x],
    [N, F],
    [N, $],
    [N, et],
    [$, g],
    [$, A],
    [$, Q],
    [$, ot],
    [$, "-"],
    [$, x],
    [$, F],
    [$, $],
    [$, et],
    ["#", g],
    ["#", A],
    ["#", Q],
    ["#", ot],
    ["#", "-"],
    ["#", x],
    ["#", F],
    ["#", $],
    ["#", et],
    // https://github.com/w3c/csswg-drafts/pull/6874
    ["-", g],
    ["-", A],
    ["-", Q],
    ["-", ot],
    ["-", "-"],
    ["-", x],
    ["-", F],
    ["-", $],
    ["-", et],
    // https://github.com/w3c/csswg-drafts/pull/6874
    [x, g],
    [x, A],
    [x, Q],
    [x, ot],
    [x, x],
    [x, F],
    [x, $],
    [x, "%"],
    [x, et],
    // https://github.com/w3c/csswg-drafts/pull/6874
    ["@", g],
    ["@", A],
    ["@", Q],
    ["@", ot],
    ["@", "-"],
    ["@", et],
    // https://github.com/w3c/csswg-drafts/pull/6874
    [".", x],
    [".", F],
    [".", $],
    ["+", x],
    ["+", F],
    ["+", $],
    ["/", "*"]
  ], oh = Ji.concat([
    [g, N],
    [$, N],
    [N, N],
    [z, I],
    [z, wt],
    [z, X],
    [F, F],
    [F, $],
    [F, A],
    [F, "-"],
    [y, g],
    [y, A],
    [y, F],
    [y, $],
    [y, N],
    [y, "-"]
  ]);
  function Zi(t) {
    const e = new Set(
      t.map(([n, s]) => He(n) << 16 | He(s))
    );
    return function(n, s, r) {
      const o = He(s, r), a = r.charCodeAt(0);
      return (a === ih && s !== g && s !== A && s !== et || a === rh ? e.has(n << 16 | a << 8) : e.has(n << 16 | o)) && this.emit(" ", U, !0), o;
    };
  }
  const ah = Zi(Ji), to = Zi(oh), ts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    safe: to,
    spec: ah
  }, Symbol.toStringTag, { value: "Module" })), lh = 92;
  function ch(t, e) {
    if (typeof e == "function") {
      let n = null;
      t.children.forEach((s) => {
        n !== null && e.call(this, n), this.node(s), n = s;
      });
      return;
    }
    t.children.forEach(this.node, this);
  }
  function uh(t) {
    Ks(t, (e, n, s) => {
      this.token(e, t.slice(n, s));
    });
  }
  function hh(t) {
    const e = /* @__PURE__ */ new Map();
    for (let [n, s] of Object.entries(t.node))
      typeof (s.generate || s) == "function" && e.set(n, s.generate || s);
    return function(n, s) {
      let r = "", o = 0, a = {
        node(u) {
          if (e.has(u.type))
            e.get(u.type).call(l, u);
          else
            throw new Error("Unknown node type: " + u.type);
        },
        tokenBefore: to,
        token(u, i) {
          o = this.tokenBefore(o, u, i), this.emit(i, u, !1), u === O && i.charCodeAt(0) === lh && this.emit(`
`, U, !0);
        },
        emit(u) {
          r += u;
        },
        result() {
          return r;
        }
      };
      s && (typeof s.decorator == "function" && (a = s.decorator(a)), s.sourceMap && (a = sh(a)), s.mode in ts && (a.tokenBefore = ts[s.mode]));
      const l = {
        node: (u) => a.node(u),
        children: ch,
        token: (u, i) => a.token(u, i),
        tokenize: uh
      };
      return a.node(n), a.result();
    };
  }
  const fh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    AnPlusB: Ys,
    Atrule: Js,
    AtrulePrelude: tr,
    AttributeSelector: sr,
    Block: or,
    Brackets: lr,
    CDC: ur,
    CDO: fr,
    ClassSelector: dr,
    Combinator: mr,
    Comment: Sr,
    Condition: br,
    Declaration: wr,
    DeclarationList: Tr,
    Dimension: Er,
    Feature: Lr,
    FeatureFunction: Pr,
    FeatureRange: Ir,
    Function: Nr,
    GeneralEnclosed: Fr,
    Hash: jr,
    IdSelector: zr,
    Identifier: Ur,
    Layer: Vr,
    LayerList: qr,
    MediaQuery: Qr,
    MediaQueryList: Xr,
    NestingSelector: Zr,
    Nth: ei,
    Number: si,
    Operator: ii,
    Parentheses: ai,
    Percentage: ci,
    PseudoClassSelector: hi,
    PseudoElementSelector: pi,
    Ratio: gi,
    Raw: ki,
    Rule: yi,
    Scope: xi,
    Selector: wi,
    SelectorList: Ti,
    String: Li,
    StyleSheet: Pi,
    SupportsDeclaration: Ii,
    TypeSelector: Ni,
    UnicodeRange: ji,
    Url: Wi,
    Value: Hi,
    WhiteSpace: Gi
  }, Symbol.toStringTag, { value: "Module" })), ph = {
    node: fh
  }, dh = hh(ph);
  let Wt = null;
  class K {
    static createItem(e) {
      return {
        prev: null,
        next: null,
        data: e
      };
    }
    constructor() {
      this.head = null, this.tail = null, this.cursor = null;
    }
    createItem(e) {
      return K.createItem(e);
    }
    // cursor helpers
    allocateCursor(e, n) {
      let s;
      return Wt !== null ? (s = Wt, Wt = Wt.cursor, s.prev = e, s.next = n, s.cursor = this.cursor) : s = {
        prev: e,
        next: n,
        cursor: this.cursor
      }, this.cursor = s, s;
    }
    releaseCursor() {
      const { cursor: e } = this;
      this.cursor = e.cursor, e.prev = null, e.next = null, e.cursor = Wt, Wt = e;
    }
    updateCursors(e, n, s, r) {
      let { cursor: o } = this;
      for (; o !== null; )
        o.prev === e && (o.prev = n), o.next === s && (o.next = r), o = o.cursor;
    }
    *[Symbol.iterator]() {
      for (let e = this.head; e !== null; e = e.next)
        yield e.data;
    }
    // getters
    get size() {
      let e = 0;
      for (let n = this.head; n !== null; n = n.next)
        e++;
      return e;
    }
    get isEmpty() {
      return this.head === null;
    }
    get first() {
      return this.head && this.head.data;
    }
    get last() {
      return this.tail && this.tail.data;
    }
    // convertors
    fromArray(e) {
      let n = null;
      this.head = null;
      for (let s of e) {
        const r = K.createItem(s);
        n !== null ? n.next = r : this.head = r, r.prev = n, n = r;
      }
      return this.tail = n, this;
    }
    toArray() {
      return [...this];
    }
    toJSON() {
      return [...this];
    }
    // array-like methods
    forEach(e, n = this) {
      const s = this.allocateCursor(null, this.head);
      for (; s.next !== null; ) {
        const r = s.next;
        s.next = r.next, e.call(n, r.data, r, this);
      }
      this.releaseCursor();
    }
    forEachRight(e, n = this) {
      const s = this.allocateCursor(this.tail, null);
      for (; s.prev !== null; ) {
        const r = s.prev;
        s.prev = r.prev, e.call(n, r.data, r, this);
      }
      this.releaseCursor();
    }
    reduce(e, n, s = this) {
      let r = this.allocateCursor(null, this.head), o = n, a;
      for (; r.next !== null; )
        a = r.next, r.next = a.next, o = e.call(s, o, a.data, a, this);
      return this.releaseCursor(), o;
    }
    reduceRight(e, n, s = this) {
      let r = this.allocateCursor(this.tail, null), o = n, a;
      for (; r.prev !== null; )
        a = r.prev, r.prev = a.prev, o = e.call(s, o, a.data, a, this);
      return this.releaseCursor(), o;
    }
    some(e, n = this) {
      for (let s = this.head; s !== null; s = s.next)
        if (e.call(n, s.data, s, this))
          return !0;
      return !1;
    }
    map(e, n = this) {
      const s = new K();
      for (let r = this.head; r !== null; r = r.next)
        s.appendData(e.call(n, r.data, r, this));
      return s;
    }
    filter(e, n = this) {
      const s = new K();
      for (let r = this.head; r !== null; r = r.next)
        e.call(n, r.data, r, this) && s.appendData(r.data);
      return s;
    }
    nextUntil(e, n, s = this) {
      if (e === null)
        return;
      const r = this.allocateCursor(null, e);
      for (; r.next !== null; ) {
        const o = r.next;
        if (r.next = o.next, n.call(s, o.data, o, this))
          break;
      }
      this.releaseCursor();
    }
    prevUntil(e, n, s = this) {
      if (e === null)
        return;
      const r = this.allocateCursor(e, null);
      for (; r.prev !== null; ) {
        const o = r.prev;
        if (r.prev = o.prev, n.call(s, o.data, o, this))
          break;
      }
      this.releaseCursor();
    }
    // mutation
    clear() {
      this.head = null, this.tail = null;
    }
    copy() {
      const e = new K();
      for (let n of this)
        e.appendData(n);
      return e;
    }
    prepend(e) {
      return this.updateCursors(null, e, this.head, e), this.head !== null ? (this.head.prev = e, e.next = this.head) : this.tail = e, this.head = e, this;
    }
    prependData(e) {
      return this.prepend(K.createItem(e));
    }
    append(e) {
      return this.insert(e);
    }
    appendData(e) {
      return this.insert(K.createItem(e));
    }
    insert(e, n = null) {
      if (n !== null)
        if (this.updateCursors(n.prev, e, n, e), n.prev === null) {
          if (this.head !== n)
            throw new Error("before doesn't belong to list");
          this.head = e, n.prev = e, e.next = n, this.updateCursors(null, e);
        } else
          n.prev.next = e, e.prev = n.prev, n.prev = e, e.next = n;
      else
        this.updateCursors(this.tail, e, null, e), this.tail !== null ? (this.tail.next = e, e.prev = this.tail) : this.head = e, this.tail = e;
      return this;
    }
    insertData(e, n) {
      return this.insert(K.createItem(e), n);
    }
    remove(e) {
      if (this.updateCursors(e, e.prev, e, e.next), e.prev !== null)
        e.prev.next = e.next;
      else {
        if (this.head !== e)
          throw new Error("item doesn't belong to list");
        this.head = e.next;
      }
      if (e.next !== null)
        e.next.prev = e.prev;
      else {
        if (this.tail !== e)
          throw new Error("item doesn't belong to list");
        this.tail = e.prev;
      }
      return e.prev = null, e.next = null, e;
    }
    push(e) {
      this.insert(K.createItem(e));
    }
    pop() {
      return this.tail !== null ? this.remove(this.tail) : null;
    }
    unshift(e) {
      this.prepend(K.createItem(e));
    }
    shift() {
      return this.head !== null ? this.remove(this.head) : null;
    }
    prependList(e) {
      return this.insertList(e, this.head);
    }
    appendList(e) {
      return this.insertList(e);
    }
    insertList(e, n) {
      return e.head === null ? this : (n != null ? (this.updateCursors(n.prev, e.tail, n, e.head), n.prev !== null ? (n.prev.next = e.head, e.head.prev = n.prev) : this.head = e.head, n.prev = e.tail, e.tail.next = n) : (this.updateCursors(this.tail, e.tail, null, e.head), this.tail !== null ? (this.tail.next = e.head, e.head.prev = this.tail) : this.head = e.head, this.tail = e.tail), e.head = null, e.tail = null, this);
    }
    replace(e, n) {
      "head" in n ? this.insertList(n, e) : this.insert(n, e), this.remove(e);
    }
  }
  function gh(t, e) {
    const n = Object.create(SyntaxError.prototype), s = new Error();
    return Object.assign(n, {
      name: t,
      message: e,
      get stack() {
        return (s.stack || "").replace(/^(.+\n){1,3}/, `${t}: ${e}
`);
      }
    });
  }
  const Ve = 100, es = 60, ns = "    ";
  function ss({ source: t, line: e, column: n, baseLine: s, baseColumn: r }, o) {
    function a(d, m) {
      return i.slice(d, m).map(
        (S, b) => String(d + b + 1).padStart(f) + " |" + S
      ).join(`
`);
    }
    const l = `
`.repeat(Math.max(s - 1, 0)), u = " ".repeat(Math.max(r - 1, 0)), i = (l + u + t).split(/\r\n?|\n|\f/), c = Math.max(1, e - o) - 1, h = Math.min(e + o, i.length + 1), f = Math.max(4, String(h).length) + 1;
    let p = 0;
    n += (ns.length - 1) * (i[e - 1].substr(0, n - 1).match(/\t/g) || []).length, n > Ve && (p = n - es + 3, n = es - 2);
    for (let d = c; d <= h; d++)
      d >= 0 && d < i.length && (i[d] = i[d].replace(/\t/g, ns), i[d] = (p > 0 && i[d].length > p ? "…" : "") + i[d].substr(p, Ve - 2) + (i[d].length > p + Ve - 1 ? "…" : ""));
    return [
      a(c, e),
      new Array(n + f + 2).join("-") + "^",
      a(e, h)
    ].filter(Boolean).join(`
`).replace(/^(\s+\d+\s+\|\n)+/, "").replace(/\n(\s+\d+\s+\|)+$/, "");
  }
  function rs(t, e, n, s, r, o = 1, a = 1) {
    return Object.assign(gh("SyntaxError", t), {
      source: e,
      offset: n,
      line: s,
      column: r,
      sourceFragment(u) {
        return ss({ source: e, line: s, column: r, baseLine: o, baseColumn: a }, isNaN(u) ? 0 : u);
      },
      get formattedMessage() {
        return `Parse error: ${t}
` + ss({ source: e, line: s, column: r, baseLine: o, baseColumn: a }, 2);
      }
    });
  }
  function mh(t) {
    const e = this.createList();
    let n = !1;
    const s = {
      recognizer: t
    };
    for (; !this.eof; ) {
      switch (this.tokenType) {
        case Y:
          this.next();
          continue;
        case U:
          n = !0, this.next();
          continue;
      }
      let r = t.getNode.call(this, s);
      if (r === void 0)
        break;
      n && (t.onWhiteSpace && t.onWhiteSpace.call(this, r, e, s), n = !1), e.push(r);
    }
    return n && t.onWhiteSpace && t.onWhiteSpace.call(this, null, e, s), e;
  }
  const is = () => {
  }, kh = 33, Sh = 35, Ge = 59, os = 123, as = 0;
  function yh(t) {
    return function() {
      return this[t]();
    };
  }
  function qe(t) {
    const e = /* @__PURE__ */ Object.create(null);
    for (const n of Object.keys(t)) {
      const s = t[n], r = s.parse || s;
      r && (e[n] = r);
    }
    return e;
  }
  function bh(t) {
    const e = {
      context: /* @__PURE__ */ Object.create(null),
      features: Object.assign(/* @__PURE__ */ Object.create(null), t.features),
      scope: Object.assign(/* @__PURE__ */ Object.create(null), t.scope),
      atrule: qe(t.atrule),
      pseudo: qe(t.pseudo),
      node: qe(t.node)
    };
    for (const [n, s] of Object.entries(t.parseContext))
      switch (typeof s) {
        case "function":
          e.context[n] = s;
          break;
        case "string":
          e.context[n] = yh(s);
          break;
      }
    return W(W({
      config: e
    }, e), e.node);
  }
  function xh(t) {
    let e = "", n = "<unknown>", s = !1, r = is, o = !1;
    const a = new ea(), l = Object.assign(new na(), bh(t || {}), {
      parseAtrulePrelude: !0,
      parseRulePrelude: !0,
      parseValue: !0,
      parseCustomProperty: !1,
      readSequence: mh,
      consumeUntilBalanceEnd: () => 0,
      consumeUntilLeftCurlyBracket(i) {
        return i === os ? 1 : 0;
      },
      consumeUntilLeftCurlyBracketOrSemicolon(i) {
        return i === os || i === Ge ? 1 : 0;
      },
      consumeUntilExclamationMarkOrSemicolon(i) {
        return i === kh || i === Ge ? 1 : 0;
      },
      consumeUntilSemicolonIncluded(i) {
        return i === Ge ? 2 : 0;
      },
      createList() {
        return new K();
      },
      createSingleNodeList(i) {
        return new K().appendData(i);
      },
      getFirstListNode(i) {
        return i && i.first;
      },
      getLastListNode(i) {
        return i && i.last;
      },
      parseWithFallback(i, c) {
        const h = this.tokenIndex;
        try {
          return i.call(this);
        } catch (f) {
          if (o)
            throw f;
          this.skip(h - this.tokenIndex);
          const p = c.call(this);
          return o = !0, r(f, p), o = !1, p;
        }
      },
      lookupNonWSType(i) {
        let c;
        do
          if (c = this.lookupType(i++), c !== U && c !== Y)
            return c;
        while (c !== as);
        return as;
      },
      charCodeAt(i) {
        return i >= 0 && i < e.length ? e.charCodeAt(i) : 0;
      },
      substring(i, c) {
        return e.substring(i, c);
      },
      substrToCursor(i) {
        return this.source.substring(i, this.tokenStart);
      },
      cmpChar(i, c) {
        return Hs(e, i, c);
      },
      cmpStr(i, c, h) {
        return ve(e, i, c, h);
      },
      consume(i) {
        const c = this.tokenStart;
        return this.eat(i), this.substrToCursor(c);
      },
      consumeFunctionName() {
        const i = e.substring(this.tokenStart, this.tokenEnd - 1);
        return this.eat(A), i;
      },
      consumeNumber(i) {
        const c = e.substring(this.tokenStart, Vs(e, this.tokenStart));
        return this.eat(i), c;
      },
      eat(i) {
        if (this.tokenType !== i) {
          const c = qs[i].slice(0, -6).replace(/-/g, " ").replace(/^./, (p) => p.toUpperCase());
          let h = `${/[[\](){}]/.test(c) ? `"${c}"` : c} is expected`, f = this.tokenStart;
          switch (i) {
            case g:
              this.tokenType === A || this.tokenType === Q ? (f = this.tokenEnd - 1, h = "Identifier is expected but function found") : h = "Identifier is expected";
              break;
            case N:
              this.isDelim(Sh) && (this.next(), f++, h = "Name is expected");
              break;
            case F:
              this.tokenType === x && (f = this.tokenEnd, h = "Percent sign is expected");
              break;
          }
          this.error(h, f);
        }
        this.next();
      },
      eatIdent(i) {
        (this.tokenType !== g || this.lookupValue(0, i) === !1) && this.error(`Identifier "${i}" is expected`), this.next();
      },
      eatDelim(i) {
        this.isDelim(i) || this.error(`Delim "${String.fromCharCode(i)}" is expected`), this.next();
      },
      getLocation(i, c) {
        return s ? a.getLocationRange(
          i,
          c,
          n
        ) : null;
      },
      getLocationFromList(i) {
        if (s) {
          const c = this.getFirstListNode(i), h = this.getLastListNode(i);
          return a.getLocationRange(
            c !== null ? c.loc.start.offset - a.startOffset : this.tokenStart,
            h !== null ? h.loc.end.offset - a.startOffset : this.tokenStart,
            n
          );
        }
        return null;
      },
      error(i, c) {
        const h = typeof c != "undefined" && c < e.length ? a.getLocation(c) : this.eof ? a.getLocation(Jo(e, e.length - 1)) : a.getLocation(this.tokenStart);
        throw new rs(
          i || "Unexpected input",
          e,
          h.offset,
          h.line,
          h.column,
          a.startLine,
          a.startColumn
        );
      }
    });
    return Object.assign(function(i, c) {
      e = i, c = c || {}, l.setSource(e, Ks), a.setSource(
        e,
        c.offset,
        c.line,
        c.column
      ), n = c.filename || "<unknown>", s = !!c.positions, r = typeof c.onParseError == "function" ? c.onParseError : is, o = !1, l.parseAtrulePrelude = "parseAtrulePrelude" in c ? !!c.parseAtrulePrelude : !0, l.parseRulePrelude = "parseRulePrelude" in c ? !!c.parseRulePrelude : !0, l.parseValue = "parseValue" in c ? !!c.parseValue : !0, l.parseCustomProperty = "parseCustomProperty" in c ? !!c.parseCustomProperty : !1;
      const { context: h = "default", onComment: f } = c;
      if (!(h in l.context))
        throw new Error("Unknown context `" + h + "`");
      typeof f == "function" && l.forEachToken((d, m, S) => {
        if (d === Y) {
          const b = l.getLocation(m, S), C = ve(e, S - 2, S, "*/") ? e.slice(m + 2, S - 2) : e.slice(m + 2, S);
          f(C, b);
        }
      });
      const p = l.context[h].call(l, c);
      return l.eof || l.error(), p;
    }, {
      SyntaxError: rs,
      config: l.config
    });
  }
  const Ch = 35, wh = 42, ls = 43, Ah = 45, Th = 47, vh = 117;
  function eo(t) {
    switch (this.tokenType) {
      case N:
        return this.Hash();
      case ht:
        return this.Operator();
      case I:
        return this.Parentheses(this.readSequence, t.recognizer);
      case te:
        return this.Brackets(this.readSequence, t.recognizer);
      case wt:
        return this.String();
      case $:
        return this.Dimension();
      case F:
        return this.Percentage();
      case x:
        return this.Number();
      case A:
        return this.cmpStr(this.tokenStart, this.tokenEnd, "url(") ? this.Url() : this.Function(this.readSequence, t.recognizer);
      case Q:
        return this.Url();
      case g:
        return this.cmpChar(this.tokenStart, vh) && this.cmpChar(this.tokenStart + 1, ls) ? this.UnicodeRange() : this.Identifier();
      case O: {
        const e = this.charCodeAt(this.tokenStart);
        if (e === Th || e === wh || e === ls || e === Ah)
          return this.Operator();
        e === Ch && this.error("Hex or identifier is expected", this.tokenStart + 1);
        break;
      }
    }
  }
  const Eh = {
    getNode: eo
  }, $h = 35, Lh = 38, Oh = 42, Ph = 43, Rh = 47, cs = 46, Ih = 62, _h = 124, Nh = 126;
  function Dh(t, e) {
    e.last !== null && e.last.type !== "Combinator" && t !== null && t.type !== "Combinator" && e.push({
      // FIXME: this.Combinator() should be used instead
      type: "Combinator",
      loc: null,
      name: " "
    });
  }
  function Fh() {
    switch (this.tokenType) {
      case te:
        return this.AttributeSelector();
      case N:
        return this.IdSelector();
      case X:
        return this.lookupType(1) === X ? this.PseudoElementSelector() : this.PseudoClassSelector();
      case g:
        return this.TypeSelector();
      case x:
      case F:
        return this.Percentage();
      case $:
        this.charCodeAt(this.tokenStart) === cs && this.error("Identifier is expected", this.tokenStart + 1);
        break;
      case O: {
        switch (this.charCodeAt(this.tokenStart)) {
          case Ph:
          case Ih:
          case Nh:
          case Rh:
            return this.Combinator();
          case cs:
            return this.ClassSelector();
          case Oh:
          case _h:
            return this.TypeSelector();
          case $h:
            return this.IdSelector();
          case Lh:
            return this.NestingSelector();
        }
        break;
      }
    }
  }
  const Mh = {
    onWhiteSpace: Dh,
    getNode: Fh
  };
  function jh() {
    return this.createSingleNodeList(
      this.Raw(null, !1)
    );
  }
  function Bh() {
    const t = this.createList();
    if (this.skipSC(), t.push(this.Identifier()), this.skipSC(), this.tokenType === ht) {
      t.push(this.Operator());
      const e = this.tokenIndex, n = this.parseCustomProperty ? this.Value(null) : this.Raw(this.consumeUntilExclamationMarkOrSemicolon, !1);
      if (n.type === "Value" && n.children.isEmpty) {
        for (let s = e - this.tokenIndex; s <= 0; s++)
          if (this.lookupType(s) === U) {
            n.children.appendData({
              type: "WhiteSpace",
              loc: null,
              value: " "
            });
            break;
          }
      }
      t.push(n);
    }
    return t;
  }
  function us(t) {
    return t !== null && t.type === "Operator" && (t.value[t.value.length - 1] === "-" || t.value[t.value.length - 1] === "+");
  }
  const Uh = {
    getNode: eo,
    onWhiteSpace(t, e) {
      us(t) && (t.value = " " + t.value), us(e.last) && (e.last.value += " ");
    },
    expression: jh,
    var: Bh
  }, Wh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    AtrulePrelude: Eh,
    Selector: Mh,
    Value: Uh
  }, Symbol.toStringTag, { value: "Module" })), zh = /* @__PURE__ */ new Set(["none", "and", "not", "or"]), Hh = {
    parse: {
      prelude() {
        const t = this.createList();
        if (this.tokenType === g) {
          const e = this.substring(this.tokenStart, this.tokenEnd);
          zh.has(e.toLowerCase()) || t.push(this.Identifier());
        }
        return t.push(this.Condition("container")), t;
      },
      block(t = !1) {
        return this.Block(t);
      }
    }
  }, Vh = {
    parse: {
      prelude: null,
      block() {
        return this.Block(!0);
      }
    }
  };
  function Ke(t, e) {
    return this.parseWithFallback(
      () => {
        try {
          return t.call(this);
        } finally {
          this.skipSC(), this.lookupNonWSType(0) !== y && this.error();
        }
      },
      e || (() => this.Raw(null, !0))
    );
  }
  const hs = {
    layer() {
      this.skipSC();
      const t = this.createList(), e = Ke.call(this, this.Layer);
      return (e.type !== "Raw" || e.value !== "") && t.push(e), t;
    },
    supports() {
      this.skipSC();
      const t = this.createList(), e = Ke.call(
        this,
        this.Declaration,
        () => Ke.call(this, () => this.Condition("supports"))
      );
      return (e.type !== "Raw" || e.value !== "") && t.push(e), t;
    }
  }, Gh = {
    parse: {
      prelude() {
        const t = this.createList();
        switch (this.tokenType) {
          case wt:
            t.push(this.String());
            break;
          case Q:
          case A:
            t.push(this.Url());
            break;
          default:
            this.error("String or url() is expected");
        }
        return this.skipSC(), this.tokenType === g && this.cmpStr(this.tokenStart, this.tokenEnd, "layer") ? t.push(this.Identifier()) : this.tokenType === A && this.cmpStr(this.tokenStart, this.tokenEnd, "layer(") && t.push(this.Function(null, hs)), this.skipSC(), this.tokenType === A && this.cmpStr(this.tokenStart, this.tokenEnd, "supports(") && t.push(this.Function(null, hs)), (this.lookupNonWSType(0) === g || this.lookupNonWSType(0) === I) && t.push(this.MediaQueryList()), t;
      },
      block: null
    }
  }, qh = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.LayerList()
        );
      },
      block() {
        return this.Block(!1);
      }
    }
  }, Kh = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.MediaQueryList()
        );
      },
      block(t = !1) {
        return this.Block(t);
      }
    }
  }, Qh = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.SelectorList()
        );
      },
      block() {
        return this.Block(!0);
      }
    }
  }, Yh = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.SelectorList()
        );
      },
      block() {
        return this.Block(!0);
      }
    }
  }, Xh = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.Scope()
        );
      },
      block(t = !1) {
        return this.Block(t);
      }
    }
  }, Jh = {
    parse: {
      prelude: null,
      block(t = !1) {
        return this.Block(t);
      }
    }
  }, Zh = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.Condition("supports")
        );
      },
      block(t = !1) {
        return this.Block(t);
      }
    }
  }, tf = {
    container: Hh,
    "font-face": Vh,
    import: Gh,
    layer: qh,
    media: Kh,
    nest: Qh,
    page: Yh,
    scope: Xh,
    "starting-style": Jh,
    supports: Zh
  };
  function ef() {
    const t = this.createList();
    this.skipSC();
    t: for (; !this.eof; ) {
      switch (this.tokenType) {
        case g:
          t.push(this.Identifier());
          break;
        case wt:
          t.push(this.String());
          break;
        case ht:
          t.push(this.Operator());
          break;
        case y:
          break t;
        default:
          this.error("Identifier, string or comma is expected");
      }
      this.skipSC();
    }
    return t;
  }
  const Pt = {
    parse() {
      return this.createSingleNodeList(
        this.SelectorList()
      );
    }
  }, Qe = {
    parse() {
      return this.createSingleNodeList(
        this.Selector()
      );
    }
  }, nf = {
    parse() {
      return this.createSingleNodeList(
        this.Identifier()
      );
    }
  }, sf = {
    parse: ef
  }, ge = {
    parse() {
      return this.createSingleNodeList(
        this.Nth()
      );
    }
  }, rf = {
    dir: nf,
    has: Pt,
    lang: sf,
    matches: Pt,
    is: Pt,
    "-moz-any": Pt,
    "-webkit-any": Pt,
    where: Pt,
    not: Pt,
    "nth-child": ge,
    "nth-last-child": ge,
    "nth-last-of-type": ge,
    "nth-of-type": ge,
    slotted: Qe,
    host: Qe,
    "host-context": Qe
  }, of = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    AnPlusB: Qs,
    Atrule: Xs,
    AtrulePrelude: Zs,
    AttributeSelector: nr,
    Block: ir,
    Brackets: ar,
    CDC: cr,
    CDO: hr,
    ClassSelector: pr,
    Combinator: gr,
    Comment: kr,
    Condition: yr,
    Declaration: Cr,
    DeclarationList: Ar,
    Dimension: vr,
    Feature: $r,
    FeatureFunction: Or,
    FeatureRange: Rr,
    Function: _r,
    GeneralEnclosed: Dr,
    Hash: Mr,
    IdSelector: Wr,
    Identifier: Br,
    Layer: Hr,
    LayerList: Gr,
    MediaQuery: Kr,
    MediaQueryList: Yr,
    NestingSelector: Jr,
    Nth: ti,
    Number: ni,
    Operator: ri,
    Parentheses: oi,
    Percentage: li,
    PseudoClassSelector: ui,
    PseudoElementSelector: fi,
    Ratio: di,
    Raw: mi,
    Rule: Si,
    Scope: bi,
    Selector: Ci,
    SelectorList: Ai,
    String: $i,
    StyleSheet: Oi,
    SupportsDeclaration: Ri,
    TypeSelector: _i,
    UnicodeRange: Mi,
    Url: Ui,
    Value: zi,
    WhiteSpace: Vi
  }, Symbol.toStringTag, { value: "Module" })), af = {
    parseContext: {
      default: "StyleSheet",
      stylesheet: "StyleSheet",
      atrule: "Atrule",
      atrulePrelude(t) {
        return this.AtrulePrelude(t.atrule ? String(t.atrule) : null);
      },
      mediaQueryList: "MediaQueryList",
      mediaQuery: "MediaQuery",
      condition(t) {
        return this.Condition(t.kind);
      },
      rule: "Rule",
      selectorList: "SelectorList",
      selector: "Selector",
      block() {
        return this.Block(!0);
      },
      declarationList: "DeclarationList",
      declaration: "Declaration",
      value: "Value"
    },
    features: {
      supports: {
        selector() {
          return this.Selector();
        }
      },
      container: {
        style() {
          return this.Declaration();
        }
      }
    },
    scope: Wh,
    atrule: tf,
    pseudo: rf,
    node: of
  }, lf = xh(af);
  function $e(t) {
    const e = {};
    for (const n of Object.keys(t)) {
      let s = t[n];
      s && (Array.isArray(s) || s instanceof K ? s = s.map($e) : s.constructor === Object && (s = $e(s))), e[n] = s;
    }
    return e;
  }
  let cf = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", at = (t = 21) => {
    let e = "", n = t | 0;
    for (; n--; )
      e += cf[Math.random() * 64 | 0];
    return e;
  };
  const no = at();
  function Le(t) {
    return !!(t && t.type === "Function" && t.name === "anchor");
  }
  function $t(t) {
    return lf(t, {
      parseAtrulePrelude: !1,
      parseCustomProperty: !0
    });
  }
  function Z(t) {
    return dh(t, {
      // Default `safe` adds extra (potentially breaking) spaces for compatibility
      // with old browsers.
      mode: "spec"
    });
  }
  function uf(t) {
    return t.type === "Declaration";
  }
  function hf(t) {
    return t.toArray().reduce(
      (e, n) => n.type === "Operator" && n.value === "," ? (e.push([]), e) : (n.type === "Identifier" && e[e.length - 1].push(n), e),
      [[]]
    );
  }
  function cn(t) {
    return t ? t.children.map((e) => {
      var r;
      let n;
      ((r = e.children.last) == null ? void 0 : r.type) === "PseudoElementSelector" && (e = $e(e), n = Z(e.children.last), e.children.pop());
      const s = Z(e);
      return {
        selector: s + (n != null ? n : ""),
        elementPart: s,
        pseudoElementPart: n
      };
    }).toArray() : [];
  }
  const un = [
    ...Qi,
    "anchor-scope",
    "anchor-name"
  ].reduce(
    (t, e) => (t[e] = `--${e}-${no}`, t),
    {}
  );
  function ff(t, e) {
    return uf(t) && un[t.property] && e ? (e.children.appendData(q(W({}, t), {
      property: un[t.property]
    })), { updated: !0 }) : {};
  }
  function pf(t) {
    for (const e of t) {
      let n = !1;
      const s = $t(e.css);
      Et(s, {
        visit: "Declaration",
        enter(r) {
          var l;
          const o = (l = this.rule) == null ? void 0 : l.block, { updated: a } = ff(r, o);
          a && (n = !0);
        }
      }), n && (e.css = Z(s), e.changed = !0);
    }
    return t.some((e) => e.changed === !0);
  }
  var so = /* @__PURE__ */ ((t) => (t.All = "all", t.None = "none", t))(so || {});
  function it(t, e) {
    var s;
    return e = (s = un[e]) != null ? s : e, (t instanceof HTMLElement ? getComputedStyle(t) : t.computedStyle).getPropertyValue(e).trim();
  }
  function Jt(t, e, n) {
    return it(t, e) === n;
  }
  function df(t, { selector: e, pseudoElementPart: n }) {
    const s = getComputedStyle(t, n), r = document.createElement("div"), o = document.createElement("style");
    r.id = `fake-pseudo-element-${at()}`;
    for (const l of Array.from(s)) {
      const u = s.getPropertyValue(l);
      r.style.setProperty(l, u);
    }
    o.textContent += `#${r.id}${n} { content: ${s.content}; }`, o.textContent += `${e} { display: none !important; }`, document.head.append(o);
    const a = n === "::before" ? "afterbegin" : "beforeend";
    return t.insertAdjacentElement(a, r), { fakePseudoElement: r, sheet: o, computedStyle: s };
  }
  function gf(t) {
    let e = t;
    for (; e; ) {
      if (Jt(e, "overflow", "scroll"))
        return e;
      e = e.parentElement;
    }
    return e;
  }
  function mf(t) {
    let e = gf(t);
    return e === document.documentElement && (e = null), e != null ? e : { scrollTop: 0, scrollLeft: 0 };
  }
  function kf(t) {
    const { elementPart: e, pseudoElementPart: n } = t, s = [];
    if (n && !(n === "::before" || n === "::after")) return s;
    const a = Array.from(
      document.querySelectorAll(e)
    );
    if (!n)
      return s.push(...a), s;
    for (const l of a) {
      const { fakePseudoElement: u, sheet: i, computedStyle: c } = df(
        l,
        t
      ), h = u.getBoundingClientRect(), { scrollY: f, scrollX: p } = globalThis, d = mf(l);
      s.push({
        fakePseudoElement: u,
        computedStyle: c,
        removeFakePseudoElement() {
          u.remove(), i.remove();
        },
        // For https://floating-ui.com/docs/autoupdate#ancestorscroll to work on
        // `VirtualElement`s.
        contextElement: l,
        // https://floating-ui.com/docs/virtual-elements
        getBoundingClientRect() {
          const { scrollY: m, scrollX: S } = globalThis, { scrollTop: b, scrollLeft: C } = d;
          return DOMRect.fromRect({
            y: h.y + (f - m) + (d.scrollTop - b),
            x: h.x + (p - S) + (d.scrollLeft - C),
            width: h.width,
            height: h.height
          });
        }
      });
    }
    return s;
  }
  function Sf(t, e) {
    const n = it(t, "anchor-name");
    return e ? n.split(",").map((s) => s.trim()).includes(e) : !n;
  }
  function yf(t, e) {
    const n = it(t, "anchor-scope");
    return n === e || n === "all";
  }
  const An = (t) => R(ce, null, function* () {
    var n, s, r;
    let e = yield (n = H.getOffsetParent) == null ? void 0 : n.call(H, t);
    return (yield (s = H.isElement) == null ? void 0 : s.call(H, e)) || (e = (yield (r = H.getDocumentElement) == null ? void 0 : r.call(H, t)) || window.document.documentElement), e;
  }), fs = "InvalidMimeType";
  function bf(t) {
    return !!((t.type === "text/css" || t.rel === "stylesheet") && t.href);
  }
  function xf(t) {
    const e = new URL(t.href, document.baseURI);
    if (bf(t) && e.origin === location.origin)
      return e;
  }
  function Cf(t) {
    return R(this, null, function* () {
      return (yield Promise.all(
        t.map((n) => R(this, null, function* () {
          var s;
          if (!n.url)
            return n;
          if ((s = n.el) != null && s.disabled)
            return null;
          try {
            const r = yield fetch(n.url.toString()), o = r.headers.get("content-type");
            if (!(o != null && o.startsWith("text/css"))) {
              const l = new Error(
                `Error loading ${n.url}: expected content-type "text/css", got "${o}".`
              );
              throw l.name = fs, l;
            }
            const a = yield r.text();
            return q(W({}, n), { css: a });
          } catch (r) {
            if (r instanceof Error && r.name === fs)
              return console.warn(r), null;
            throw r;
          }
        }))
      )).filter((n) => n !== null);
    });
  }
  const ps = '[style*="anchor"]', ds = '[style*="position-area"]';
  function wf(t) {
    const e = t ? t.filter(
      (s) => s instanceof HTMLElement && (s.matches(ps) || s.matches(ds))
    ) : Array.from(
      document.querySelectorAll(
        [
          ps,
          ds
        ].join(",")
      )
    ), n = [];
    return e.filter((s) => s instanceof HTMLElement).forEach((s) => {
      const r = at(12), o = "data-has-inline-styles";
      s.setAttribute(o, r);
      const a = s.getAttribute("style"), l = `[${o}="${r}"] { ${a} }`;
      n.push({ el: s, css: l });
    }), n;
  }
  function Af(t, e) {
    return R(this, null, function* () {
      const n = t != null ? t : Array.from(document.querySelectorAll("link, style")), s = [];
      n.filter((a) => a instanceof HTMLElement).forEach((a) => {
        if (a.tagName.toLowerCase() === "link") {
          const l = xf(a);
          l && s.push({ el: a, url: l });
        }
        a.tagName.toLowerCase() === "style" && s.push({ el: a, css: a.innerHTML });
      });
      const r = e ? t != null ? t : [] : void 0, o = wf(r);
      return yield Cf([...s, ...o]);
    });
  }
  const Tf = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  let ro = (t = 21) => {
    let e = "", n = crypto.getRandomValues(new Uint8Array(t |= 0));
    for (; t--; )
      e += Tf[n[t] & 63];
    return e;
  };
  const io = "--pa-cascade-property", oo = "data-anchor-position-wrapper", ao = "data-pa-wrapper-for-", gs = "POLYFILL-POSITION-AREA", vf = [
    "left",
    "center",
    "right",
    "span-left",
    "span-right",
    "x-start",
    "x-end",
    "span-x-start",
    "span-x-end",
    "x-self-start",
    "x-self-end",
    "span-x-self-start",
    "span-x-self-end",
    "span-all",
    "top",
    "bottom",
    "span-top",
    "span-bottom",
    "y-start",
    "y-end",
    "span-y-start",
    "span-y-end",
    "y-self-start",
    "y-self-end",
    "span-y-self-start",
    "span-y-self-end",
    "block-start",
    "block-end",
    "span-block-start",
    "span-block-end",
    "inline-start",
    "inline-end",
    "span-inline-start",
    "span-inline-end",
    "self-block-start",
    "self-block-end",
    "span-self-block-start",
    "span-self-block-end",
    "self-inline-start",
    "self-inline-end",
    "span-self-inline-start",
    "span-self-inline-end",
    "start",
    "end",
    "span-start",
    "span-end",
    "self-start",
    "self-end",
    "span-self-start",
    "span-self-end"
  ];
  function lo(t) {
    return vf.includes(t);
  }
  const ms = {
    left: [
      0,
      1,
      "Irrelevant"
      /* Irrelevant */
    ],
    center: [
      1,
      2,
      "Irrelevant"
      /* Irrelevant */
    ],
    right: [
      2,
      3,
      "Irrelevant"
      /* Irrelevant */
    ],
    "span-left": [
      0,
      2,
      "Irrelevant"
      /* Irrelevant */
    ],
    "span-right": [
      1,
      3,
      "Irrelevant"
      /* Irrelevant */
    ],
    "x-start": [
      0,
      1,
      "Physical"
      /* Physical */
    ],
    "x-end": [
      2,
      3,
      "Physical"
      /* Physical */
    ],
    "span-x-start": [
      0,
      2,
      "Physical"
      /* Physical */
    ],
    "span-x-end": [
      1,
      3,
      "Physical"
      /* Physical */
    ],
    "x-self-start": [
      0,
      1,
      "PhysicalSelf"
      /* PhysicalSelf */
    ],
    "x-self-end": [
      2,
      3,
      "PhysicalSelf"
      /* PhysicalSelf */
    ],
    "span-x-self-start": [
      0,
      2,
      "PhysicalSelf"
      /* PhysicalSelf */
    ],
    "span-x-self-end": [
      1,
      3,
      "PhysicalSelf"
      /* PhysicalSelf */
    ],
    "span-all": [
      0,
      3,
      "Irrelevant"
      /* Irrelevant */
    ],
    top: [
      0,
      1,
      "Irrelevant"
      /* Irrelevant */
    ],
    bottom: [
      2,
      3,
      "Irrelevant"
      /* Irrelevant */
    ],
    "span-top": [
      0,
      2,
      "Irrelevant"
      /* Irrelevant */
    ],
    "span-bottom": [
      1,
      3,
      "Irrelevant"
      /* Irrelevant */
    ],
    "y-start": [
      0,
      1,
      "Physical"
      /* Physical */
    ],
    "y-end": [
      2,
      3,
      "Physical"
      /* Physical */
    ],
    "span-y-start": [
      0,
      2,
      "Physical"
      /* Physical */
    ],
    "span-y-end": [
      1,
      3,
      "Physical"
      /* Physical */
    ],
    "y-self-start": [
      0,
      1,
      "PhysicalSelf"
      /* PhysicalSelf */
    ],
    "y-self-end": [
      2,
      3,
      "PhysicalSelf"
      /* PhysicalSelf */
    ],
    "span-y-self-start": [
      0,
      2,
      "PhysicalSelf"
      /* PhysicalSelf */
    ],
    "span-y-self-end": [
      1,
      3,
      "PhysicalSelf"
      /* PhysicalSelf */
    ],
    "block-start": [
      0,
      1,
      "Logical"
      /* Logical */
    ],
    "block-end": [
      2,
      3,
      "Logical"
      /* Logical */
    ],
    "span-block-start": [
      0,
      2,
      "Logical"
      /* Logical */
    ],
    "span-block-end": [
      1,
      3,
      "Logical"
      /* Logical */
    ],
    "inline-start": [
      0,
      1,
      "Logical"
      /* Logical */
    ],
    "inline-end": [
      2,
      3,
      "Logical"
      /* Logical */
    ],
    "span-inline-start": [
      0,
      2,
      "Logical"
      /* Logical */
    ],
    "span-inline-end": [
      1,
      3,
      "Logical"
      /* Logical */
    ],
    "self-block-start": [
      0,
      1,
      "LogicalSelf"
      /* LogicalSelf */
    ],
    "self-block-end": [
      2,
      3,
      "LogicalSelf"
      /* LogicalSelf */
    ],
    "span-self-block-start": [
      0,
      2,
      "LogicalSelf"
      /* LogicalSelf */
    ],
    "span-self-block-end": [
      1,
      3,
      "LogicalSelf"
      /* LogicalSelf */
    ],
    "self-inline-start": [
      0,
      1,
      "LogicalSelf"
      /* LogicalSelf */
    ],
    "self-inline-end": [
      2,
      3,
      "LogicalSelf"
      /* LogicalSelf */
    ],
    "span-self-inline-start": [
      0,
      2,
      "LogicalSelf"
      /* LogicalSelf */
    ],
    "span-self-inline-end": [
      1,
      3,
      "LogicalSelf"
      /* LogicalSelf */
    ],
    start: [
      0,
      1,
      "Logical"
      /* Logical */
    ],
    end: [
      2,
      3,
      "Logical"
      /* Logical */
    ],
    "span-start": [
      0,
      2,
      "Logical"
      /* Logical */
    ],
    "span-end": [
      1,
      3,
      "Logical"
      /* Logical */
    ],
    "self-start": [
      0,
      1,
      "LogicalSelf"
      /* LogicalSelf */
    ],
    "self-end": [
      2,
      3,
      "LogicalSelf"
      /* LogicalSelf */
    ],
    "span-self-start": [
      0,
      2,
      "LogicalSelf"
      /* LogicalSelf */
    ],
    "span-self-end": [
      1,
      3,
      "LogicalSelf"
      /* LogicalSelf */
    ]
  }, Ef = [
    "left",
    "center",
    "right",
    "span-left",
    "span-right",
    "x-start",
    "x-end",
    "span-x-start",
    "span-x-end",
    "x-self-start",
    "x-self-end",
    "span-x-self-start",
    "span-x-self-end",
    "span-all"
  ], $f = [
    "top",
    "center",
    "bottom",
    "span-top",
    "span-bottom",
    "y-start",
    "y-end",
    "span-y-start",
    "span-y-end",
    "y-self-start",
    "y-self-end",
    "span-y-self-start",
    "span-y-self-end",
    "span-all"
  ], Lf = [
    "block-start",
    "center",
    "block-end",
    "span-block-start",
    "span-block-end",
    "span-all"
  ], Of = [
    "inline-start",
    "center",
    "inline-end",
    "span-inline-start",
    "span-inline-end",
    "span-all"
  ], Pf = [
    "self-block-start",
    "center",
    "self-block-end",
    "span-self-block-start",
    "span-self-block-end",
    "span-all"
  ], Rf = [
    "self-inline-start",
    "center",
    "self-inline-end",
    "span-self-inline-start",
    "span-self-inline-end",
    "span-all"
  ], ks = [
    "start",
    "center",
    "end",
    "span-start",
    "span-end",
    "span-all"
  ], Ss = [
    "self-start",
    "center",
    "self-end",
    "span-self-start",
    "span-self-end",
    "span-all"
  ], If = ["block", "top", "bottom", "y"], _f = ["inline", "left", "right", "x"];
  function hn(t) {
    const e = t.split("-");
    for (const n of e) {
      if (If.includes(n)) return "block";
      if (_f.includes(n)) return "inline";
    }
    return "ambiguous";
  }
  function Nf(t, e) {
    return e[0].includes(t[0]) && e[1].includes(t[1]) || e[0].includes(t[1]) && e[1].includes(t[0]);
  }
  const Df = [
    [Ef, $f],
    [Lf, Of],
    [Pf, Rf],
    [ks, ks],
    [Ss, Ss]
  ];
  function Ff(t) {
    for (const e of Df)
      if (Nf(t, e)) return !0;
    return !1;
  }
  const ys = (t) => {
    const e = getComputedStyle(t);
    return {
      writingMode: e.writingMode,
      direction: e.direction
    };
  }, Mf = (t, e) => R(ce, null, function* () {
    const n = yield An(t);
    switch (e) {
      case "Logical":
      case "Physical":
        return ys(n);
      case "LogicalSelf":
      case "PhysicalSelf":
        return ys(t);
      default:
        return null;
    }
  }), Ye = (t) => t.reverse().map((e) => 3 - e), co = (t, e) => t === "Irrelevant" ? e : t, jf = (s, r) => R(ce, [s, r], function* ({
    block: t,
    inline: e
  }, n) {
    const o = co(t[2], e[2]), a = yield Mf(n, o), l = {
      block: [t[0], t[1]],
      inline: [e[0], e[1]]
    };
    if (a) {
      if (a.direction === "rtl" && (l.inline = Ye(l.inline)), a.writingMode.startsWith("vertical")) {
        const u = l.block;
        l.block = l.inline, l.inline = u;
      }
      if (a.writingMode.startsWith("sideways")) {
        const u = l.block;
        l.block = l.inline, l.inline = u, a.writingMode.endsWith("lr") && (l.block = Ye(l.block));
      }
      a.writingMode.endsWith("rl") && (l.inline = Ye(l.inline));
    }
    return l;
  }), Bf = ({
    block: t,
    inline: e
  }) => {
    const n = [0, "top", "bottom", 0], s = [0, "left", "right", 0];
    return {
      block: [n[t[0]], n[t[1]]],
      inline: [s[e[0]], s[e[1]]]
    };
  };
  function bs([t, e]) {
    return t === 0 && e === 3 ? "center" : t === 0 ? "end" : e === 3 ? "start" : "center";
  }
  function Uf(t) {
    return t.type === "Declaration" && t.property === "position-area";
  }
  function Wf(t) {
    const e = t.value.children.toArray().map(({ name: n }) => n);
    return e.length === 1 && (hn(e[0]) === "ambiguous" ? e.push(e[0]) : e.push("span-all")), e;
  }
  function zf(t) {
    if (!Uf(t)) return;
    const e = Wf(t);
    if (!Ff(e)) return;
    const n = {};
    switch (hn(e[0])) {
      case "block":
        n.block = e[0], n.inline = e[1];
        break;
      case "inline":
        n.inline = e[0], n.block = e[1];
        break;
      case "ambiguous":
        hn(e[1]) == "block" ? (n.block = e[1], n.inline = e[0]) : (n.inline = e[1], n.block = e[0]);
        break;
    }
    const s = {
      block: ms[n.block],
      inline: ms[n.inline]
    }, r = `--pa-declaration-${ro(12)}`;
    return {
      values: n,
      grid: s,
      selectorUUID: r
    };
  }
  function Hf(t, e) {
    [
      // Insets are applied to a wrapping element
      "justify-self",
      "align-self"
    ].forEach((n) => {
      e.children.appendData({
        type: "Declaration",
        property: n,
        value: { type: "Raw", value: `var(--pa-value-${n})` },
        important: !1
      });
    }), e.children.appendData({
      type: "Declaration",
      property: io,
      value: { type: "Raw", value: t.selectorUUID },
      important: !1
    });
  }
  function Vf(t, e) {
    var s, r;
    let n;
    if (((s = t.parentElement) == null ? void 0 : s.tagName) === gs)
      n = t.parentElement;
    else {
      n = document.createElement(gs), n.style.display = "grid", n.style.position = "absolute";
      const o = getComputedStyle(t).pointerEvents;
      n.style.pointerEvents = "none", t.style.pointerEvents = o, ["top", "left", "right", "bottom"].forEach((a) => {
        n.style.setProperty(a, `var(--pa-value-${a})`);
      }), (r = t.parentElement) == null || r.insertBefore(n, t), n.appendChild(t);
    }
    return n.setAttribute(
      `${ao}${e}`,
      ""
    ), n;
  }
  function Gf(t, e, n) {
    return R(this, null, function* () {
      const s = `--pa-target-${ro(12)}`, r = yield jf(
        e.grid,
        t
      ), o = Bf(r), a = co(
        e.grid.block[2],
        e.grid.inline[2]
      ), l = [
        "LogicalSelf",
        "PhysicalSelf"
        /* PhysicalSelf */
      ].includes(a) ? r : e.grid, u = {
        block: bs([l.block[0], l.block[1]]),
        inline: bs([
          l.inline[0],
          l.inline[1]
        ])
      };
      return {
        insets: o,
        alignments: u,
        targetUUID: s,
        targetEl: t,
        anchorEl: n,
        wrapperEl: Vf(t, s),
        values: e.values,
        grid: e.grid,
        selectorUUID: e.selectorUUID
      };
    });
  }
  function qf(t, e) {
    return `
    [${oo}="${e}"][${ao}${t}] {
      --pa-value-top: var(${t}-top);
      --pa-value-left: var(${t}-left);
      --pa-value-right: var(${t}-right);
      --pa-value-bottom: var(${t}-bottom);
      --pa-value-justify-self: var(${t}-justify-self);
      --pa-value-align-self: var(${t}-align-self);
    }
  `.replaceAll(`
`, "");
  }
  const Kf = [
    "normal",
    "most-width",
    "most-height",
    "most-block-size",
    "most-inline-size"
  ], Qf = [
    "flip-block",
    "flip-inline",
    "flip-start"
  ];
  function Yf(t) {
    return t.type === "Declaration";
  }
  function Xf(t) {
    return t.type === "Declaration" && t.property === "position-try-fallbacks";
  }
  function Jf(t) {
    return t.type === "Declaration" && t.property === "position-try-order";
  }
  function Zf(t) {
    return t.type === "Declaration" && t.property === "position-try";
  }
  function tp(t) {
    return t.type === "Atrule" && t.name === "position-try";
  }
  function ep(t) {
    return Qf.includes(t);
  }
  function np(t) {
    return Kf.includes(t);
  }
  function sp(t, e) {
    const n = document.querySelector(t);
    if (n) {
      let s = ip(n);
      return e.forEach((r) => {
        s = uo(s, r);
      }), s;
    }
  }
  function rp(t, e) {
    let n = t.declarations;
    return e.forEach((s) => {
      n = uo(n, s);
    }), n;
  }
  function ip(t) {
    const e = {};
    return Qi.forEach((n) => {
      const s = it(t, `--${n}-${no}`);
      s && (e[n] = s);
    }), e;
  }
  const op = {
    "flip-block": {
      top: "bottom",
      bottom: "top",
      "inset-block-start": "inset-block-end",
      "inset-block-end": "inset-block-start",
      "margin-top": "margin-bottom",
      "margin-bottom": "margin-top"
    },
    "flip-inline": {
      left: "right",
      right: "left",
      "inset-inline-start": "inset-inline-end",
      "inset-inline-end": "inset-inline-start",
      "margin-left": "margin-right",
      "margin-right": "margin-left"
    },
    "flip-start": {
      left: "top",
      right: "bottom",
      top: "left",
      bottom: "right",
      "inset-block-start": "inset-block-end",
      "inset-block-end": "inset-block-start",
      "inset-inline-start": "inset-inline-end",
      "inset-inline-end": "inset-inline-start",
      "inset-block": "inset-inline",
      "inset-inline": "inset-block"
    }
  }, ap = {
    "flip-block": {
      top: "bottom",
      bottom: "top",
      start: "end",
      end: "start",
      "self-end": "self-start",
      "self-start": "self-end"
    },
    "flip-inline": {
      left: "right",
      right: "left",
      start: "end",
      end: "start",
      "self-end": "self-start",
      "self-start": "self-end"
    },
    "flip-start": {
      top: "left",
      left: "top",
      right: "bottom",
      bottom: "right"
    }
  }, lp = {
    "flip-block": {
      top: "bottom",
      bottom: "top",
      start: "end",
      end: "start"
    },
    "flip-inline": {
      left: "right",
      right: "left",
      start: "end",
      end: "start"
    },
    "flip-start": {
      // TODO: Requires fuller logic
    }
  };
  function cp(t, e) {
    return op[e][t] || t;
  }
  function up(t, e) {
    return ap[e][t] || t;
  }
  function hp(t, e) {
    if (e === "flip-start")
      return t;
    {
      const n = lp[e];
      return t.split("-").map((s) => n[s] || s).join("-");
    }
  }
  function fp(t, e, n) {
    if (t === "margin") {
      const [s, r, o, a] = e.children.toArray();
      n === "flip-block" ? a ? e.children.fromArray([o, r, s, a]) : o && e.children.fromArray([o, r, s]) : n === "flip-inline" && a && e.children.fromArray([s, a, o, r]);
    } else if (t === "margin-block") {
      const [s, r] = e.children.toArray();
      n === "flip-block" && r && e.children.fromArray([r, s]);
    } else if (t === "margin-inline") {
      const [s, r] = e.children.toArray();
      n === "flip-inline" && r && e.children.fromArray([r, s]);
    }
  }
  const pp = (t, e) => {
    var r;
    return ((r = $t(`#id{${t}: ${e};}`).children.first) == null ? void 0 : r.block.children.first).value;
  };
  function uo(t, e) {
    const n = {};
    return Object.entries(t).forEach(([s, r]) => {
      var u;
      const o = s, a = pp(o, r), l = cp(o, e);
      l !== o && ((u = n[o]) != null || (n[o] = "revert")), Et(a, {
        visit: "Function",
        enter(i) {
          Le(i) && i.children.forEach((c) => {
            se(c) && Xi(c.name) && (c.name = up(c.name, e));
          });
        }
      }), o === "position-area" && a.children.forEach((i) => {
        se(i) && lo(i.name) && (i.name = hp(i.name, e));
      }), o.startsWith("margin") && fp(o, a, e), n[l] = Z(a);
    }), n;
  }
  function ho(t) {
    const e = hf(t), n = [];
    return e.forEach((s) => {
      const r = {
        atRules: [],
        tactics: [],
        positionAreas: []
      };
      s.forEach((o) => {
        ep(o.name) ? r.tactics.push(o.name) : o.name.startsWith("--") ? r.atRules.push(o.name) : lo(o.name) && r.positionAreas.push(o.name);
      }), r.positionAreas.length ? n.push({
        positionArea: r.positionAreas[0],
        type: "position-area"
      }) : r.atRules.length && r.tactics.length ? n.push({
        tactics: r.tactics,
        atRule: r.atRules[0],
        type: "at-rule-with-try-tactic"
      }) : r.atRules.length ? n.push({
        atRule: r.atRules[0],
        type: "at-rule"
      }) : r.tactics.length && n.push({
        tactics: r.tactics,
        type: "try-tactic"
      });
    }), n;
  }
  function dp(t) {
    return Xf(t) && t.value.children.first ? ho(t.value.children) : [];
  }
  function gp(t) {
    if (Zf(t) && t.value.children.first) {
      const e = $e(t);
      let n;
      const s = e.value.children.first.name;
      s && np(s) && (n = s, e.value.children.shift());
      const r = ho(e.value.children);
      return { order: n, options: r };
    }
    return {};
  }
  function mp(t) {
    return Jf(t) && t.value.children.first ? {
      order: t.value.children.first.name
    } : {};
  }
  function kp(t) {
    const { order: e, options: n } = gp(t);
    if (e || n)
      return { order: e, options: n };
    const { order: s } = mp(t), r = dp(t);
    return s || r ? { order: s, options: r } : {};
  }
  function Sp(t) {
    return ae(t.property) || Xu(t.property) || qi(t.property) || Ju(t.property) || ["position-anchor", "position-area"].includes(t.property);
  }
  function yp(t) {
    var e, n;
    if (tp(t) && ((e = t.prelude) != null && e.value) && ((n = t.block) != null && n.children)) {
      const s = t.prelude.value, r = t.block.children.filter(
        (a) => Yf(a) && Sp(a)
      ), o = {
        uuid: `${s}-try-${at(12)}`,
        declarations: Object.fromEntries(
          r.map((a) => [a.property, Z(a.value)])
        )
      };
      return { name: s, tryBlock: o };
    }
    return {};
  }
  function bp(t) {
    const e = {}, n = {}, s = {};
    for (const r of t) {
      const o = $t(r.css);
      Et(o, {
        visit: "Atrule",
        enter(a) {
          const { name: l, tryBlock: u } = yp(a);
          l && u && (e[l] = u);
        }
      });
    }
    for (const r of t) {
      let o = !1;
      const a = /* @__PURE__ */ new Set(), l = $t(r.css);
      Et(l, {
        visit: "Declaration",
        enter(u) {
          var d;
          const i = (d = this.rule) == null ? void 0 : d.prelude, c = cn(i);
          if (!c.length) return;
          const { order: h, options: f } = kp(u), p = {};
          h && (p.order = h), c.forEach(({ selector: m }) => {
            var S, b;
            f == null || f.forEach((C) => {
              var M, k, P;
              let v;
              if (C.type === "at-rule")
                v = C.atRule;
              else if (C.type === "try-tactic") {
                v = `${m}-${C.tactics.join("-")}`;
                const w = sp(
                  m,
                  C.tactics
                );
                w && (e[v] = {
                  uuid: `${m}-${C.tactics.join("-")}-try-${at(12)}`,
                  declarations: w
                });
              } else if (C.type === "at-rule-with-try-tactic") {
                v = `${m}-${C.atRule}-${C.tactics.join("-")}`;
                const w = e[C.atRule], E = rp(
                  w,
                  C.tactics
                );
                E && (e[v] = {
                  uuid: `${m}-${C.atRule}-${C.tactics.join("-")}-try-${at(12)}`,
                  declarations: E
                });
              }
              if (v && e[v]) {
                const w = `[data-anchor-polyfill="${e[v].uuid}"]`;
                (M = n[w]) != null || (n[w] = []), n[w].push(m), a.has(v) || ((k = p.fallbacks) != null || (p.fallbacks = []), p.fallbacks.push(e[v]), a.add(v), (P = this.stylesheet) == null || P.children.prependData({
                  type: "Rule",
                  prelude: {
                    type: "Raw",
                    value: w
                  },
                  block: {
                    type: "Block",
                    children: new K().fromArray(
                      Object.entries(e[v].declarations).map(
                        ([E, _]) => ({
                          type: "Declaration",
                          important: !0,
                          property: E,
                          value: {
                            type: "Raw",
                            value: _
                          }
                        })
                      )
                    )
                  }
                }), o = !0);
              }
            }), Object.keys(p).length > 0 && (s[m] ? (p.order && (s[m].order = p.order), p.fallbacks && ((b = (S = s[m]).fallbacks) != null || (S.fallbacks = []), s[m].fallbacks.push(
              ...p.fallbacks
            ))) : s[m] = p);
          });
        }
      }), o && (r.css = Z(l), r.changed = !0);
    }
    return { fallbackTargets: n, validPositions: s };
  }
  function xp(t, e) {
    return !t || t === e ? !1 : fo(t) ? t.document.contains(e) : t.contains(e);
  }
  function fo(t) {
    return !!(t && t === t.window);
  }
  function Cp(t) {
    return Jt(t, "position", "fixed");
  }
  function fn(t) {
    return !!(t && (Cp(t) || Jt(t, "position", "absolute")));
  }
  function xs(t, e) {
    return t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING;
  }
  function wp(t) {
    return R(this, null, function* () {
      return yield H.getOffsetParent(t);
    });
  }
  function Xe(t) {
    return R(this, null, function* () {
      if (!["absolute", "fixed"].includes(it(t, "position")))
        return yield wp(t);
      let e = t.parentElement;
      for (; e; ) {
        if (!Jt(e, "position", "static") && Jt(e, "display", "block"))
          return e;
        e = e.parentElement;
      }
      return window;
    });
  }
  function Ap(t, e, n, s) {
    return R(this, null, function* () {
      const r = yield Xe(t), o = yield Xe(n);
      if (!(xp(o, t) || fo(o)) || r === o && !(!fn(t) || xs(t, n)))
        return !1;
      if (r !== o) {
        let a;
        const l = [];
        for (a = r; a && a !== o && a !== window; )
          l.push(a), a = yield Xe(a);
        const u = l[l.length - 1];
        if (u instanceof HTMLElement && !(!fn(u) || xs(u, n)))
          return !1;
      }
      {
        let a = t.parentElement;
        for (; a; ) {
          if (Jt(a, "content-visibility", "hidden"))
            return !1;
          a = a.parentElement;
        }
      }
      return !(e && s && Cs(t, e, s) !== Cs(n, e, s));
    });
  }
  function Cs(t, e, n) {
    for (; !(t.matches(n) && yf(t, e)); ) {
      if (!t.parentElement)
        return null;
      t = t.parentElement;
    }
    return t;
  }
  function Tp(t, e, n, s) {
    return R(this, null, function* () {
      if (!(t instanceof HTMLElement && n.length && fn(t)))
        return null;
      const r = n.flatMap(kf).filter((a) => Sf(a, e)), o = s.map((a) => a.selector).join(",") || null;
      for (let a = r.length - 1; a >= 0; a--) {
        const l = r[a], u = "fakePseudoElement" in l;
        if (yield Ap(
          u ? l.fakePseudoElement : l,
          e,
          t,
          o
        ))
          return u && l.removeFakePseudoElement(), l;
      }
      return null;
    });
  }
  function vp(t) {
    return t.type === "Declaration" && t.property === "anchor-name";
  }
  function Ep(t) {
    return t.type === "Declaration" && t.property === "anchor-scope";
  }
  function pn(t) {
    return !!(t && t.type === "Function" && t.name === "anchor-size");
  }
  function xe(t) {
    return !!(t && t.type === "Function" && t.name === "var");
  }
  function se(t) {
    return !!(t.type === "Identifier" && t.name);
  }
  function $p(t) {
    return !!(t.type === "Percentage" && t.value);
  }
  function ws(t, e) {
    let n, s, r, o = "", a = !1, l;
    const u = [];
    t.children.toArray().forEach((f) => {
      if (a) {
        o = `${o}${Z(f)}`;
        return;
      }
      if (f.type === "Operator" && f.value === ",") {
        a = !0;
        return;
      }
      u.push(f);
    });
    let [i, c] = u;
    if (c || (c = i, i = void 0), i && (se(i) && i.name.startsWith("--") ? n = i.name : xe(i) && i.children.first && (l = i.children.first.name)), c)
      if (Le(t)) {
        if (se(c) && Xi(c.name))
          s = c.name;
        else if ($p(c)) {
          const f = Number(c.value);
          s = Number.isNaN(f) ? void 0 : f;
        }
      } else pn(t) && se(c) && nh(c.name) && (r = c.name);
    const h = `--anchor-${at(12)}`;
    return Object.assign(t, {
      type: "Raw",
      value: `var(${h})`,
      children: null
    }), Reflect.deleteProperty(t, "name"), {
      anchorName: n,
      anchorSide: s,
      anchorSize: r,
      fallbackValue: o || "0px",
      customPropName: l,
      uuid: h
    };
  }
  function As(t) {
    return t.value.children.map(({ name: e }) => e);
  }
  let Ht = {}, vt = {}, _t = {}, re = {}, It = {};
  function Lp() {
    Ht = {}, vt = {}, _t = {}, re = {}, It = {};
  }
  function Op(t, e) {
    var n;
    if ((Le(t) || pn(t)) && e) {
      if (e.property.startsWith("--")) {
        const s = Z(e.value), r = ws(t);
        return re[r.uuid] = s, _t[e.property] = [
          ...(n = _t[e.property]) != null ? n : [],
          r
        ], { changed: !0 };
      }
      if (Le(t) && ae(e.property) || pn(t) && Yi(e.property)) {
        const s = ws(t);
        return { prop: e.property, data: s, changed: !0 };
      }
    }
    return {};
  }
  function Ts(t, e) {
    return R(this, null, function* () {
      let n = e == null ? void 0 : e.anchorName;
      const s = e == null ? void 0 : e.customPropName;
      if (t && !n) {
        const l = it(
          t,
          "position-anchor"
        );
        l ? n = l : s && (n = it(t, s));
      }
      const r = n ? Ht[n] || [] : [], o = n ? vt[so.All] || [] : [], a = n ? vt[n] || [] : [];
      return yield Tp(
        t,
        n || null,
        r,
        [...o, ...a]
      );
    });
  }
  function Pp(t) {
    return R(this, null, function* () {
      var c, h, f, p, d, m, S, b, C, v, M;
      const e = {}, n = {};
      Lp();
      const { fallbackTargets: s, validPositions: r } = bp(t);
      for (const k of t) {
        let P = !1;
        const w = $t(k.css);
        Et(w, function(E) {
          var J, bt, Ot, xt, ft, Ct;
          const _ = (J = this.rule) == null ? void 0 : J.prelude, L = cn(_);
          if (vp(E) && L.length)
            for (const B of As(E))
              (bt = Ht[B]) != null || (Ht[B] = []), Ht[B].push(...L);
          if (Ep(E) && L.length)
            for (const B of As(E))
              (Ot = vt[B]) != null || (vt[B] = []), vt[B].push(...L);
          const {
            prop: T,
            data: j,
            changed: D
          } = Op(E, this.declaration);
          if (T && j && L.length)
            for (const { selector: B } of L)
              e[B] = q(W({}, e[B]), {
                [T]: [...(ft = (xt = e[B]) == null ? void 0 : xt[T]) != null ? ft : [], j]
              });
          let V;
          if (this.block && (V = zf(E), V)) {
            Hf(
              V,
              this.block
            );
            for (const { selector: B } of L)
              n[B] = [
                ...(Ct = n[B]) != null ? Ct : [],
                V
              ];
          }
          (D || V) && (P = !0);
        }), P && (k.css = Z(w), k.changed = !0);
      }
      const o = new Set(Object.keys(_t)), a = {}, l = (k) => {
        var E, _, L, T, j;
        const P = [], w = new Set((_ = (E = a[k]) == null ? void 0 : E.names) != null ? _ : []);
        for (; w.size > 0; )
          for (const D of w)
            P.push(...(L = _t[D]) != null ? L : []), w.delete(D), (j = (T = a[D]) == null ? void 0 : T.names) != null && j.length && a[D].names.forEach((V) => w.add(V));
        return P;
      };
      for (; o.size > 0; ) {
        const k = [];
        for (const P of t) {
          let w = !1;
          const E = $t(P.css);
          Et(E, {
            visit: "Function",
            enter(_) {
              var D, V;
              const L = (D = this.rule) == null ? void 0 : D.prelude, T = this.declaration, j = T == null ? void 0 : T.property;
              if ((L == null ? void 0 : L.children.isEmpty) === !1 && xe(_) && T && j && _.children.first && o.has(_.children.first.name) && // For now, we only want assignments to other CSS custom properties
              j.startsWith("--")) {
                const J = _.children.first, bt = (V = _t[J.name]) != null ? V : [], Ot = l(J.name);
                if (!(bt.length || Ot.length))
                  return;
                const xt = `${J.name}-anchor-${at(12)}`, ft = Z(T.value);
                re[xt] = ft, a[j] || (a[j] = { names: [], uuids: [] });
                const Ct = a[j];
                Ct.names.includes(J.name) || Ct.names.push(J.name), Ct.uuids.push(xt), k.push(j), J.name = xt, w = !0;
              }
            }
          }), w && (P.css = Z(E), P.changed = !0);
        }
        o.clear(), k.forEach((P) => o.add(P));
      }
      for (const k of t) {
        let P = !1;
        const w = $t(k.css);
        Et(w, {
          visit: "Function",
          enter(E) {
            var j, D, V, J, bt, Ot, xt;
            const _ = (j = this.rule) == null ? void 0 : j.prelude, L = this.declaration, T = L == null ? void 0 : L.property;
            if ((_ == null ? void 0 : _.children.isEmpty) === !1 && xe(E) && L && T && E.children.first && // Now we only want assignments to inset/sizing properties
            (ae(T) || qi(T))) {
              const ft = E.children.first, Ct = (D = _t[ft.name]) != null ? D : [], B = l(ft.name);
              if (!(Ct.length || B.length))
                return;
              const ue = `${T}-${at(12)}`;
              if (B.length) {
                const Mt = /* @__PURE__ */ new Set([ft.name]);
                for (; Mt.size > 0; )
                  for (const jt of Mt) {
                    const G = a[jt];
                    if ((V = G == null ? void 0 : G.names) != null && V.length && ((J = G == null ? void 0 : G.uuids) != null && J.length))
                      for (const Bt of G.names)
                        for (const Ut of G.uuids)
                          It[Ut] = q(W({}, It[Ut]), {
                            // - `key` (`propUuid`) is the property-specific
                            //   uuid to append to the new custom property name
                            // - `value` is the new property-specific custom
                            //   property value to use
                            [ue]: `${Bt}-${ue}`
                          });
                    Mt.delete(jt), (bt = G == null ? void 0 : G.names) != null && bt.length && G.names.forEach((Bt) => Mt.add(Bt));
                  }
              }
              const po = cn(_);
              for (const Mt of [...Ct, ...B]) {
                const jt = W({}, Mt), G = `--anchor-${at(12)}-${T}`, Bt = jt.uuid;
                jt.uuid = G;
                for (const { selector: Ut } of po)
                  e[Ut] = q(W({}, e[Ut]), {
                    [T]: [...(xt = (Ot = e[Ut]) == null ? void 0 : Ot[T]) != null ? xt : [], jt]
                  });
                It[Bt] = q(W({}, It[Bt]), {
                  // - `key` (`propUuid`) is the property-specific
                  //   uuid to append to the new custom property name
                  // - `value` is the new property-specific custom
                  //   property value to use
                  [ue]: G
                });
              }
              ft.name = `${ft.name}-${ue}`, P = !0;
            }
          }
        }), P && (k.css = Z(w), k.changed = !0);
      }
      if (Object.keys(It).length > 0)
        for (const k of t) {
          let P = !1;
          const w = $t(k.css);
          Et(w, {
            visit: "Function",
            enter(E) {
              var _, L, T, j;
              if (xe(E) && ((L = (_ = E.children.first) == null ? void 0 : _.name) != null && L.startsWith("--")) && ((j = (T = this.declaration) == null ? void 0 : T.property) != null && j.startsWith("--")) && this.block) {
                const D = E.children.first, V = It[D.name];
                if (V)
                  for (const [J, bt] of Object.entries(V))
                    this.block.children.appendData({
                      type: "Declaration",
                      important: !1,
                      property: `${this.declaration.property}-${J}`,
                      value: {
                        type: "Raw",
                        value: Z(this.declaration.value).replace(
                          `var(${D.name})`,
                          `var(${bt})`
                        )
                      }
                    }), P = !0;
                re[D.name] && (this.declaration.value = {
                  type: "Raw",
                  value: re[D.name]
                }, P = !0);
              }
            }
          }), P && (k.css = Z(w), k.changed = !0);
        }
      const u = /* @__PURE__ */ new Map();
      for (const [k, P] of Object.entries(e)) {
        let w;
        k.startsWith("[data-anchor-polyfill=") && ((c = s[k]) != null && c.length) ? w = document.querySelectorAll(s[k].join(",")) : w = document.querySelectorAll(k);
        for (const [E, _] of Object.entries(P))
          for (const L of _)
            for (const T of w) {
              const j = yield Ts(T, L), D = `--anchor-${at(12)}`;
              u.set(T, q(W({}, (h = u.get(T)) != null ? h : {}), {
                [L.uuid]: D
              })), T.setAttribute(
                "style",
                `${L.uuid}: var(${D}); ${(f = T.getAttribute("style")) != null ? f : ""}`
              ), r[k] = q(W({}, r[k]), {
                declarations: q(W({}, (p = r[k]) == null ? void 0 : p.declarations), {
                  [E]: [
                    ...(S = (m = (d = r[k]) == null ? void 0 : d.declarations) == null ? void 0 : m[E]) != null ? S : [],
                    q(W({}, L), { anchorEl: j, targetEl: T, uuid: D })
                  ]
                })
              });
            }
      }
      const i = {
        el: document.createElement("link"),
        changed: !1,
        created: !0,
        css: ""
      };
      t.push(i);
      for (const [k, P] of Object.entries(n)) {
        const w = document.querySelectorAll(k);
        for (const E of w) {
          const _ = yield Ts(E);
          for (const L of P) {
            const T = yield Gf(
              E,
              L,
              _
            );
            i.css += qf(
              T.targetUUID,
              L.selectorUUID
            ), i.changed = !0, r[k] = q(W({}, r[k]), {
              declarations: q(W({}, (b = r[k]) == null ? void 0 : b.declarations), {
                "position-area": [
                  ...(M = (v = (C = r[k]) == null ? void 0 : C.declarations) == null ? void 0 : v["position-area"]) != null ? M : [],
                  T
                ]
              })
            });
          }
        }
      }
      return { rules: r, inlineStyles: u, anchorScopes: vt };
    });
  }
  const Rp = [
    "crossorigin",
    "href",
    "integrity",
    "referrerpolicy"
  ];
  function vs(t, e, n = !1) {
    return R(this, null, function* () {
      const s = [];
      for (const { el: r, css: o, changed: a, created: l = !1 } of t) {
        const u = { el: r, css: o, changed: !1 };
        if (a) {
          if (r.tagName.toLowerCase() === "style")
            r.innerHTML = o;
          else if (r instanceof HTMLLinkElement) {
            const i = new Blob([o], { type: "text/css" }), c = URL.createObjectURL(i), h = document.createElement("link");
            for (const p of r.getAttributeNames())
              if (!p.startsWith("on") && !Rp.includes(p)) {
                const d = r.getAttribute(p);
                d !== null && h.setAttribute(p, d);
              }
            h.setAttribute("href", c);
            const f = new Promise((p) => {
              h.onload = p;
            });
            l ? (h.rel = "stylesheet", document.head.insertAdjacentElement("beforeend", h), yield f) : (r.insertAdjacentElement("beforebegin", h), yield f, r.remove()), u.el = h;
          } else if (r.hasAttribute("data-has-inline-styles")) {
            const i = r.getAttribute("data-has-inline-styles");
            if (i) {
              const c = `[data-has-inline-styles="${i}"]{`;
              let f = o.slice(c.length, 0 - "}".length);
              const p = e == null ? void 0 : e.get(r);
              if (p)
                for (const [d, m] of Object.entries(p))
                  f = `${d}: var(${m}); ${f}`;
              r.setAttribute("style", f);
            }
          }
        }
        n && r.hasAttribute("data-has-inline-styles") && r.removeAttribute("data-has-inline-styles"), s.push(u);
      }
      return s;
    });
  }
  const Ip = q(W({}, H), { _c: /* @__PURE__ */ new Map() }), _p = (t, e) => {
    let n;
    switch (t) {
      case "start":
      case "self-start":
        n = 0;
        break;
      case "end":
      case "self-end":
        n = 100;
        break;
      default:
        typeof t == "number" && !Number.isNaN(t) && (n = t);
    }
    if (n !== void 0)
      return e ? 100 - n : n;
  }, Np = (t, e) => {
    let n;
    switch (t) {
      case "block":
      case "self-block":
        n = e ? "width" : "height";
        break;
      case "inline":
      case "self-inline":
        n = e ? "height" : "width";
        break;
    }
    return n;
  }, Es = (t) => {
    switch (t) {
      case "top":
      case "bottom":
        return "y";
      case "left":
      case "right":
        return "x";
    }
    return null;
  }, Dp = (t) => {
    switch (t) {
      case "x":
        return "width";
      case "y":
        return "height";
    }
    return null;
  }, $s = (t) => it(t, "display") === "inline", Ls = (t, e) => (e === "x" ? ["border-left-width", "border-right-width"] : ["border-top-width", "border-bottom-width"]).reduce(
    (s, r) => s + parseInt(it(t, r), 10),
    0
  ) || 0, me = (t, e) => parseInt(it(t, `margin-${e}`), 10) || 0, Fp = (t) => ({
    top: me(t, "top"),
    right: me(t, "right"),
    bottom: me(t, "bottom"),
    left: me(t, "left")
  }), Je = (a) => R(ce, [a], function* ({
    targetEl: t,
    targetProperty: e,
    anchorRect: n,
    anchorSide: s,
    anchorSize: r,
    fallback: o = null
  }) {
    var l;
    if (!((r || s !== void 0) && t && n))
      return o;
    if (r) {
      if (!Yi(e))
        return o;
      let u;
      switch (r) {
        case "width":
        case "height":
          u = r;
          break;
        default: {
          let i = !1;
          const c = it(t, "writing-mode");
          i = c.startsWith("vertical-") || c.startsWith("sideways-"), u = Np(r, i);
        }
      }
      return u ? `${n[u]}px` : o;
    }
    if (s !== void 0) {
      let u, i;
      const c = Es(e);
      if (!(ae(e) && c && (!ae(s) || c === Es(s))))
        return o;
      const h = ["top", "left"];
      switch (s) {
        case "left":
        case "top":
          u = 0;
          break;
        case "right":
        case "bottom":
          u = 100;
          break;
        case "center":
          u = 50;
          break;
        case "inside":
          u = h.includes(e) ? 0 : 100;
          break;
        case "outside":
          u = h.includes(e) ? 100 : 0;
          break;
        default:
          if (t) {
            const d = (yield (l = H.isRTL) == null ? void 0 : l.call(H, t)) || !1;
            u = _p(s, d);
          }
      }
      const f = typeof u == "number" && !Number.isNaN(u), p = Dp(c);
      if (f && p) {
        (e === "bottom" || e === "right") && (i = yield An(t));
        let d = n[c] + n[p] * (u / 100);
        switch (e) {
          case "bottom": {
            if (!i)
              break;
            let m = i.clientHeight;
            if (m === 0 && $s(i)) {
              const S = Ls(i, c);
              m = i.offsetHeight - S;
            }
            d = m - d;
            break;
          }
          case "right": {
            if (!i)
              break;
            let m = i.clientWidth;
            if (m === 0 && $s(i)) {
              const S = Ls(i, c);
              m = i.offsetWidth - S;
            }
            d = m - d;
            break;
          }
        }
        return `${d}px`;
      }
    }
    return o;
  }), Mp = (t) => "wrapperEl" in t, jp = (t) => "uuid" in t;
  function Bp(t, e = !1) {
    return R(this, null, function* () {
      const n = document.documentElement;
      for (const [s, r] of Object.entries(t))
        for (const o of r) {
          const a = o.anchorEl, l = o.targetEl;
          if (a && l)
            if (Mp(o)) {
              const u = o.wrapperEl, i = (c, h, f) => R(this, null, function* () {
                return c === 0 ? "0px" : yield Je({
                  targetEl: u,
                  targetProperty: h,
                  anchorRect: f,
                  anchorSide: c
                });
              });
              en(
                a,
                u,
                () => R(this, null, function* () {
                  const c = it(
                    l,
                    io
                  );
                  u.setAttribute(oo, c);
                  const h = yield H.getElementRects({
                    reference: a,
                    floating: u,
                    strategy: "absolute"
                  }), f = o.insets, p = yield i(
                    f.block[0],
                    "top",
                    h.reference
                  ), d = yield i(
                    f.block[1],
                    "bottom",
                    h.reference
                  ), m = yield i(
                    f.inline[0],
                    "left",
                    h.reference
                  ), S = yield i(
                    f.inline[1],
                    "right",
                    h.reference
                  );
                  n.style.setProperty(
                    `${o.targetUUID}-top`,
                    p || null
                  ), n.style.setProperty(
                    `${o.targetUUID}-left`,
                    m || null
                  ), n.style.setProperty(
                    `${o.targetUUID}-right`,
                    S || null
                  ), n.style.setProperty(
                    `${o.targetUUID}-bottom`,
                    d || null
                  ), n.style.setProperty(
                    `${o.targetUUID}-justify-self`,
                    o.alignments.inline
                  ), n.style.setProperty(
                    `${o.targetUUID}-align-self`,
                    o.alignments.block
                  );
                }),
                { animationFrame: e }
              );
            } else
              en(
                a,
                l,
                () => R(this, null, function* () {
                  const u = yield H.getElementRects({
                    reference: a,
                    floating: l,
                    strategy: "absolute"
                  }), i = yield Je({
                    targetEl: l,
                    targetProperty: s,
                    anchorRect: u.reference,
                    anchorSide: o.anchorSide,
                    anchorSize: o.anchorSize,
                    fallback: o.fallbackValue
                  });
                  n.style.setProperty(o.uuid, i);
                }),
                { animationFrame: e }
              );
          else if (jp(o)) {
            const u = yield Je({
              targetProperty: s,
              anchorSide: o.anchorSide,
              anchorSize: o.anchorSize,
              fallback: o.fallbackValue
            });
            n.style.setProperty(o.uuid, u);
          }
        }
    });
  }
  function Os(t, e) {
    return R(this, null, function* () {
      const n = yield H.getElementRects({
        reference: t,
        floating: t,
        strategy: "absolute"
      });
      return yield Uo(
        {
          x: t.offsetLeft,
          y: t.offsetTop,
          platform: Ip,
          rects: n,
          elements: {
            floating: t,
            reference: e
          },
          strategy: "absolute"
        },
        {
          padding: Fp(t)
        }
      );
    });
  }
  function Up(t, e, n = !1) {
    return R(this, null, function* () {
      if (!e.length)
        return;
      const s = document.querySelectorAll(t);
      for (const r of s) {
        let o = !1;
        const a = yield An(r);
        en(
          // We're just checking whether the target element overflows, so we don't
          // care about the position of the anchor element in this case. Passing in
          // an empty object instead of a reference element avoids unnecessarily
          // watching for irrelevant changes.
          {},
          r,
          () => R(this, null, function* () {
            if (o)
              return;
            o = !0, r.removeAttribute("data-anchor-polyfill");
            const l = yield Os(r, a);
            if (Object.values(l).every((u) => u <= 0)) {
              r.removeAttribute("data-anchor-polyfill-last-successful"), o = !1;
              return;
            }
            for (const [u, { uuid: i }] of e.entries()) {
              r.setAttribute("data-anchor-polyfill", i);
              const c = yield Os(r, a);
              if (Object.values(c).every((h) => h <= 0)) {
                r.setAttribute("data-anchor-polyfill-last-successful", i), o = !1;
                break;
              }
              if (u === e.length - 1) {
                const h = r.getAttribute(
                  "data-anchor-polyfill-last-successful"
                );
                h ? r.setAttribute("data-anchor-polyfill", h) : r.removeAttribute("data-anchor-polyfill"), o = !1;
                break;
              }
            }
          }),
          { animationFrame: n, layoutShift: !1 }
        );
      }
    });
  }
  function Wp(t, e = !1) {
    return R(this, null, function* () {
      var n, s;
      for (const r of Object.values(t))
        yield Bp((n = r.declarations) != null ? n : {}, e);
      for (const [r, o] of Object.entries(t))
        yield Up(
          r,
          (s = o.fallbacks) != null ? s : [],
          e
        );
    });
  }
  function zp(t = {}) {
    const e = typeof t == "boolean" ? { useAnimationFrame: t } : t, n = e.useAnimationFrame === void 0 ? !!window.UPDATE_ANCHOR_ON_ANIMATION_FRAME : e.useAnimationFrame;
    return Array.isArray(e.elements) || (e.elements = void 0), Object.assign(e, { useAnimationFrame: n });
  }
  function Ps(t) {
    return R(this, null, function* () {
      const e = zp(
        window.ANCHOR_POSITIONING_POLYFILL_OPTIONS
      );
      let n = yield Af(e.elements, e.excludeInlineStyles);
      pf(n) && (n = yield vs(n));
      const { rules: r, inlineStyles: o } = yield Pp(n);
      return Object.values(r).length && (yield vs(n, o, !0), yield Wp(r, e.useAnimationFrame)), r;
    });
  }
  document.readyState !== "complete" ? window.addEventListener("load", () => {
    Ps();
  }) : Ps();
});
export default Hp();
//# sourceMappingURL=css-anchor-positioning.js.map
