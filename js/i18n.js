/* English / Arabic switch. Arabic strings live in js/lang-ar.js (window.LX_AR), keyed by the English text.
   Text with inline markup (bold, chips) is translated as one unit. Add a new language the same way. */
(function () {
  var KEY = 'lx-lang', AR = window.LX_AR || {}, lang = 'en';
  try { lang = localStorage.getItem(KEY) || 'en'; } catch (e) {}
  var norm = function (s) { return s.replace(/\s+/g, ' ').trim(); };
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1 }, ATTR = ['placeholder', 'aria-label', 'alt', 'title'];
  var INLINE = { B: 1, STRONG: 1, I: 1, EM: 1, SPAN: 1, A: 1, CODE: 1, SMALL: 1, KBD: 1, BDI: 1 };
  var items = [];
  function walk(el) {
    if (SKIP[el.tagName]) return;
    var t = false, e = false, bad = false, i, c;
    for (i = 0; i < el.childNodes.length; i++) {
      c = el.childNodes[i];
      if (c.nodeType === 3 && c.nodeValue.trim()) t = true; else if (c.nodeType === 1 && c.tagName !== 'BR') { e = true; if (!INLINE[c.tagName]) bad = true; }
    }
    ATTR.forEach(function (a) { if (el.hasAttribute(a)) items.push({ k: 'a', el: el, a: a, o: el.getAttribute(a), key: norm(el.getAttribute(a)) }); });
    if (t && e && !bad) { items.push({ k: 'u', el: el, o: el.innerHTML, key: norm(el.textContent) }); return; }
    for (i = 0; i < el.childNodes.length; i++) {
      c = el.childNodes[i];
      if (c.nodeType === 3 && c.nodeValue.trim()) items.push({ k: 't', n: c, o: c.nodeValue, key: norm(c.nodeValue) });
      else if (c.nodeType === 1) walk(c);
    }
  }
  walk(document.body);
  var title = { o: document.title, key: norm(document.title) };
  function apply(l) {
    var ar = l === 'ar';
    items.forEach(function (it) {
      var v = ar && AR[it.key];
      if (it.k === 't') it.n.nodeValue = v ? it.o.match(/^\s*/)[0] + v + it.o.match(/\s*$/)[0] : it.o;
      else if (it.k === 'u') it.el.innerHTML = v || it.o;
      else it.el.setAttribute(it.a, v || it.o);
    });
    document.title = ar && AR[title.key] ? AR[title.key] : title.o;
    document.documentElement.lang = l; document.documentElement.dir = ar ? 'rtl' : 'ltr';
    var b = document.getElementById('lang'); if (b) b.textContent = ar ? 'EN' : 'AR';
    var m = document.getElementById('menu'); if (m && ar) m.setAttribute('aria-label', AR['Menu'] || 'Menu');
  }
  window.LX_t = function (s) { return lang === 'ar' && AR[norm(s)] ? AR[norm(s)] : s; };
  apply(lang);
  var btn = document.getElementById('lang');
  if (btn) btn.addEventListener('click', function () {
    lang = lang === 'ar' ? 'en' : 'ar';
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    apply(lang);
  });
})();
