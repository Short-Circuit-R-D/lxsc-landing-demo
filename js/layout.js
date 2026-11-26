/* Shared header and footer for every page. Works from file:// (no fetch).
   Each page sets <body data-base="../" data-page="contact">. Edit the links here once. */
(function () {
  var b = document.body.dataset.base || '', cur = document.body.dataset.page || '';
  var nav = [['pages/features.html', 'Features', 'features'], ['guides/getting-started.html', 'Quick start', 'quick'],
             ['pages/standards.html', 'Standards', 'standards'], ['pages/verify.html', 'Verify', 'verify'],
             ['pages/about.html', 'About', 'about'], ['pages/contact.html', 'Contact', 'contact']];
  var links = nav.map(function (n) { return '<a href="' + b + n[0] + '"' + (n[2] === cur ? ' aria-current="page"' : '') + '>' + n[1] + '</a>'; }).join('');
  var studio = 'https://studio.lxscale.com/projects';
  var h = document.getElementById('site-header'), f = document.getElementById('site-footer');
  if (h) h.outerHTML = '<header id="top-bar"><div class="w"><a class="logo" href="' + b + 'index.html" aria-label="LuxScale home">' +
    '<img class="logo-light" src="' + b + 'assets/logo/lxscale_logo_light.svg" alt="lxscale">' +
    '<img class="logo-dark" src="' + b + 'assets/logo/lxscale_logo_dark.svg" alt="" aria-hidden="true"></a>' +
    '<nav id="nav" aria-label="Main">' + links + '<a class="btn nav-studio" data-studio href="' + studio + '">Open Studio</a></nav>' +
    '<div class="hd-actions"><button id="lang" class="ic" type="button" aria-label="Switch language">AR</button>' +
    '<button id="theme" type="button" aria-label="Toggle theme">◐</button>' +
    '<a class="btn hd-studio" data-studio href="' + studio + '">Open Studio</a>' +
    '<button id="menu" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav">☰</button></div></div></header>';
  // if (f) f.outerHTML = '<footer><div class="w"><span>© LuxScale</span>' +
  //   '<a class="pwr" href="https://shortcircuit.company" aria-label="Short Circuit Company"><span>Powered by</span>' +
  //   '<img class="sc-light" src="https://shortcircuit.company/assets/img/logo.svg" alt="" height="26"><img class="sc-dark" src="https://shortcircuit.company/assets/img/logo-dark.svg" alt="" aria-hidden="true" height="26"></a></div></footer>';
  if (f) f.outerHTML = '<footer><div class="w"><span>© LuxScale</span>';
  var pw = document.querySelector('.ph .w');
  if (pw) pw.insertAdjacentHTML('beforeend', '<div class="ph-logo" aria-hidden="true"><img class="logo-light" src="' + b + 'assets/logo/lxscale_logo_light.svg" alt=""><img class="logo-dark" src="' + b + 'assets/logo/lxscale_logo_dark.svg" alt=""></div>');
  var hd = document.getElementById('top-bar'), mb = document.getElementById('menu');
  if (hd && mb) {
    function set(o) { hd.classList.toggle('open', o); mb.setAttribute('aria-expanded', o); }
    mb.addEventListener('click', function () { set(!hd.classList.contains('open')); });
    hd.querySelectorAll('nav a').forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    document.addEventListener('click', function (e) { if (!hd.contains(e.target)) set(false); });
  }
})();
