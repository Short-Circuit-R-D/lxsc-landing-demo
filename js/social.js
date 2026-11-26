/* Social fan button (About page): the toggle opens three links around it.
   Addresses come from window.LX.social in js/config.js. */
(function () {
  var box = document.getElementById('social'); if (!box) return;
  var tg = document.getElementById('social-toggle'), S = (window.LX && window.LX.social) || {};
  box.querySelectorAll('[data-net]').forEach(function (a) {
    var u = S[a.dataset.net];
    if (u) a.href = u; else a.addEventListener('click', function (e) { e.preventDefault(); });   /* not set yet: do nothing */
  });
  function set(o) { box.classList.toggle('open', o); tg.setAttribute('aria-expanded', o); }
  tg.addEventListener('click', function () { set(!box.classList.contains('open')); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('open')) { set(false); tg.focus(); } });
  document.addEventListener('click', function (e) { if (!box.contains(e.target)) set(false); });
})();
