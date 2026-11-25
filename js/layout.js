/* Shared header and footer for inner pages. Works from file:// (no fetch).
   Each page sets <body data-base="../" data-page="contact">. Edit the links here once. */
(function () {
  var b = document.body.dataset.base || '', cur = document.body.dataset.page || '';
  var nav = [['guides/getting-started.html', 'Quick start', 'quick'], ['pages/standards.html', 'Standards', 'standards'],
             ['pages/about.html', 'About', 'about'], ['pages/contact.html', 'Contact', 'contact']];
  var links = nav.map(function (n) { return '<a href="' + b + n[0] + '"' + (n[2] === cur ? ' aria-current="page"' : '') + '>' + n[1] + '</a>'; }).join('');
  var h = document.getElementById('site-header'), f = document.getElementById('site-footer');
  if (h) h.outerHTML = '<header><div class="w"><a class="logo" href="' + b + 'index.html" aria-label="LuxScale home">' +
    '<img class="logo-light" src="' + b + 'assets/logo/lxscale_logo_light.svg" alt="lxscale">' +
    '<img class="logo-dark" src="' + b + 'assets/logo/lxscale_logo_dark.svg" alt="" aria-hidden="true"></a>' +
    '<nav aria-label="Main">' + links + '</nav><button id="theme" aria-label="Toggle theme">◐</button>' +
    '<a class="btn" data-studio href="https://studio.lxscale.com/projects">Open Studio</a></div></header>';
  if (f) f.outerHTML = '<footer><div class="w"><a href="' + b + 'guides/getting-started.html">Quick start</a>' +
    '<a href="' + b + 'pages/standards.html">Standards</a><a href="' + b + 'pages/about.html">About</a>' +
    '<a href="' + b + 'pages/contact.html">Contact</a><span class="r">© LuxScale · Short Circuit Company</span></div></footer>';
})();
