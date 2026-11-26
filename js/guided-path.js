/* Guided path: a pinned, scroll-driven section.
   The text and the illustration are one unit, so they always change together. */
(function () {
  var sec = document.getElementById('path'), stage = sec && sec.querySelector('.stage');
  if (!sec || !stage) return;
  var arts = [].slice.call(sec.querySelectorAll('.sp article')), dots = [].slice.call(sec.querySelectorAll('.dots button'));
  var n = arts.length, lastT = null, lastS = null, queued = false;
  function span() { return Math.max(1, sec.offsetHeight - innerHeight); }
  function update() {
    queued = false;
    var r = sec.getBoundingClientRect(), vh = innerHeight;
    var p = Math.min(.999, Math.max(0, -r.top / span()));
    var t = Math.min(n - 1, Math.floor(p * n));                 /* current step */
    var s = r.top < vh * .4 ? t : -1;                            /* illustration starts when the section fills the screen */
    if (t !== lastT) {
      lastT = t;
      arts.forEach(function (a, i) { a.classList.toggle('on', i === t); a.classList.toggle('past', i < t); });
      dots.forEach(function (d, i) { d.classList.toggle('on', i === t); });
    }
    if (s !== lastS) { lastS = s; stage.dataset.a = s; }
  }
  function req() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  dots.forEach(function (d, i) {
    d.addEventListener('click', function () {
      var top = sec.getBoundingClientRect().top + scrollY;
      scrollTo({ top: top + (i + .5) / n * span(), behavior: 'smooth' });
    });
  });
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', req);
  update();
})();
