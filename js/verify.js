/* Verify a report: scan a code (or type the project ID), check it with the API, show the result.
   Settings live in js/config.js (window.LX.verify). */
(function () {
  var card = document.getElementById('vcard'); if (!card) return;
  var C = (window.LX && window.LX.verify) || {}, video = document.getElementById('vvideo'), msg = document.getElementById('vmsg');
  var input = document.getElementById('vid'), stream = null, timer = null, zx = null, busy = false;
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  function set(s) { card.dataset.state = s; }
  function say(t) { msg.textContent = t || ''; }
  function stopCam() {
    clearInterval(timer); timer = null;
    if (zx) { try { zx.reset(); } catch (e) {} zx = null; }
    if (stream) { stream.getTracks().forEach(function (t) { t.stop(); }); stream = null; }
    video.srcObject = null;
  }
  /* A code may hold the plain ID or a link that contains it */
  function parseId(v) {
    v = String(v || '').trim();
    try { var u = new URL(v); v = u.searchParams.get('id') || u.pathname.split('/').filter(Boolean).pop() || ''; } catch (e) {}
    return /^[A-Za-z0-9_-]{1,64}$/.test(v) ? v : '';
  }
  function lookup(id) {
    if (C.mock) {            /* demo mode: public-demo, private-demo, anything else is not found */
      return new Promise(function (ok) { setTimeout(function () { ok(id === 'public-demo' ? 'public' : id === 'private-demo' ? 'private' : 'none'); }, 800); });
    }
    if (!C.api) return Promise.reject(new Error('no api'));
    return fetch(C.api.replace('{id}', encodeURIComponent(id)), { headers: { Accept: 'application/json' } }).then(function (r) {
      if (r.status === 404) return 'none';
      if (r.status === 401 || r.status === 403) return 'private';
      if (!r.ok) throw new Error('bad status');
      return r.json().then(function (j) {
        var v = j.visibility || (j.is_public === true || j.public === true ? 'public' : 'private');
        return v === 'public' ? 'public' : 'private';   /* anything unclear is treated as private */
      });
    });
  }
  function check(raw) {
    var id = parseId(raw);
    if (!id) { say('That does not look like a project ID.'); return; }
    if (busy) return; busy = true; stopCam(); say(''); set('checking');
    lookup(id).then(function (res) {
      busy = false;
      if (res === 'none') return set('none');
      if (res === 'private') { if (C.signIn) document.getElementById('vsign').href = C.signIn.replace('{id}', encodeURIComponent(id)); return set('locked'); }
      var enc = encodeURIComponent(id), open = document.getElementById('vopen'), note = document.getElementById('vokmsg');
      var url = (C.reportPage || '').replace('{id}', enc);
      if (!/^(https?:\/\/|\/)/.test(url)) {   /* no report page configured: never navigate (an empty link would reload this page) */
        open.hidden = true;
        note.textContent = C.mock ? 'Demo mode: set verify.reportPage in js/config.js to open the report.' : 'The report page is not set up yet.';
        return set('ok');
      }
      open.hidden = false; open.href = url; note.textContent = 'Report found. Opening it now…';
      set('ok');
      setTimeout(function () { if (card.dataset.state === 'ok') location.href = url; }, reduce ? 600 : 1800);
    }).catch(function () { busy = false; set('err'); });
  }
  function startCam() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { say('Camera scanning is not available here. Type the ID instead.'); return; }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function (s) {
      stream = s; video.srcObject = s; video.play(); set('scan'); say('');
      if ('BarcodeDetector' in window) {
        var det = new BarcodeDetector();
        timer = setInterval(function () {
          if (video.readyState < 2) return;
          det.detect(video).then(function (r) { if (r.length) check(r[0].rawValue); }).catch(function () {});
        }, 250);
      } else if (C.fallbackScript) {
        var go = function () {
          zx = new ZXing.BrowserMultiFormatReader();
          zx.decodeFromVideoElement(video, function (res) { if (res) check(res.getText()); });
        };
        if (window.ZXing) go(); else { var sc = document.createElement('script'); sc.src = C.fallbackScript; sc.onload = go; sc.onerror = function () { say('Scanning is not supported in this browser. Type the ID instead.'); }; document.head.appendChild(sc); }
      } else say('Scanning is not supported in this browser. Type the ID instead.');
    }).catch(function () { say('Camera access was blocked. You can type the ID instead.'); });
  }
  function reset() { stopCam(); busy = false; say(''); set('idle'); }
  document.getElementById('vscan').addEventListener('click', startCam);
  document.getElementById('vform').addEventListener('submit', function (e) { e.preventDefault(); check(input.value); });
  card.querySelectorAll('[data-vreset]').forEach(function (b) { b.addEventListener('click', reset); });
  document.addEventListener('visibilitychange', function () { if (document.hidden && card.dataset.state === 'scan') reset(); });
  if (C.mock) document.getElementById('vdemo').hidden = false;
})();
