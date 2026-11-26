/* Hero: the brand pattern lit by two lights.
   1) a light that drifts on its own at a medium pace, always
   2) a light that follows the mouse (or a finger) with a soft delay, fading in and out */
(function () {
  var c = document.getElementById('cv'), x = c.getContext('2d'), S = 36, W, H, running = true;
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var SPEED = 1;                 /* 1 = medium; change to speed up or slow down the drifting light */
  var base = 'rgba(57,87,96,.38)';
  var mx = null, my = null, fx = 0, fy = 0, mk = 0;   /* mouse target, smoothed position, strength 0..1 */
  var stops = [[0, [244, 121, 55]], [.265, [247, 222, 101]], [.468, [251, 243, 207]], [1, [58, 177, 212]]];
  function col(p) {
    for (var i = 1; i < 4; i++) if (p <= stops[i][0]) {
      var a = stops[i - 1][0], b = stops[i][0], A = stops[i - 1][1], B = stops[i][1], k = (p - a) / (b - a);
      return A.map(function (v, j) { return Math.round(v + (B[j] - v) * k); });
    }
    return stops[3][1];
  }
  function theme() {   /* idle shapes follow the theme: dark teal on dark, warm sand on light */
    var d = document.documentElement.dataset.theme;
    var dark = d ? d === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches;
    base = dark ? 'rgba(57,87,96,.38)' : 'rgba(215,202,193,.7)';
    if (reduce) draw(0);
  }
  function size() {
    var r = c.getBoundingClientRect(), d = devicePixelRatio || 1;
    W = r.width; H = r.height; c.width = W * d; c.height = H * d; x.setTransform(d, 0, 0, d, 0, 0);
  }
  function draw(ts) {
    var t = ts / 1000 * SPEED;
    var on = reduce ? 1 : Math.min(1, t / 2.6);                 /* the light switches on once, then keeps moving */
    var R = Math.max(W, H) * .34 * (1 - Math.pow(1 - on, 3));
    var ax = W * (.62 + .22 * Math.sin(t * .5)), ay = H * (.5 + .28 * Math.sin(t * .8 + 1));   /* drifting light */
    if (!reduce) {                                               /* mouse light: smooth follow and fade */
      if (mx !== null) { if (mk < .05) { fx = mx; fy = my; } fx += (mx - fx) * .12; fy += (my - fy) * .12; mk = Math.min(1, mk + .06); }
      else mk = Math.max(0, mk - .04);
    }
    var Rm = Math.max(W, H) * .22 * mk;
    x.clearRect(0, 0, W, H);
    for (var i = 0; i < Math.ceil(W / S); i++) for (var j = 0; j < Math.ceil(H / S); j++) {
      var cx = i * S + S / 2, cy = j * S + S / 2;
      var k1 = Math.max(0, 1 - Math.hypot(cx - ax, cy - ay) / R);
      var k2 = Rm > 1 ? Math.max(0, 1 - Math.hypot(cx - fx, cy - fy) / Rm) : 0;
      var k = Math.max(k1, k2), q = k * k, s = S * (.2 + .32 * q);
      var rgb = col(.12 + .88 * (1 - k));
      x.fillStyle = k > 0 ? 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + (.22 + .78 * q) + ')' : base;
      x.beginPath();
      var m = (i + j) % 3;
      if (m === 0) x.rect(cx - s, cy - s, s * 2, s * 2);
      else if (m === 1) { x.moveTo(cx, cy - s * 1.3); x.lineTo(cx + s * 1.3, cy); x.lineTo(cx, cy + s * 1.3); x.lineTo(cx - s * 1.3, cy); }
      else x.arc(cx, cy, s * 1.1, 0, 7);
      x.fill();
    }
    if (!reduce && running) requestAnimationFrame(draw);
  }
  var hero = c.parentElement;
  hero.addEventListener('pointermove', function (e) { var r = c.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
  hero.addEventListener('pointerleave', function () { mx = my = null; });
  new MutationObserver(theme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme:dark)').addEventListener('change', theme);
  addEventListener('resize', function () { size(); if (reduce) draw(0); });
  new IntersectionObserver(function (es) {            /* pause when the hero is off screen */
    var vis = es[0].isIntersecting;
    if (vis && !running && !reduce) { running = true; requestAnimationFrame(draw); }
    running = vis;
  }).observe(c);
  size(); theme();
  requestAnimationFrame(draw);
})();
