/* Guided path scroll spy: the active step is the last one whose top has passed an anchor line.
   Desktop anchor = 45% of the viewport; mobile anchor = just under the sticky illustration. */
(function () {
  var stage = document.querySelector('.stage'), sec = document.getElementById('path');
  var arts = [].slice.call(document.querySelectorAll('.path article'));
  if (!stage || !sec || !arts.length) return;
  var mq = matchMedia('(max-width:860px)'), last = null, queued = false;
  function update() {
    queued = false;
    var vh = innerHeight, sr = sec.getBoundingClientRect(), idx = -1;
    if (sr.top < vh * .75 && sr.bottom > 0) {
      var anchor = mq.matches ? stage.getBoundingClientRect().bottom + 48 : vh * .45;
      idx = 0;
      arts.forEach(function (a, i) { if (a.getBoundingClientRect().top <= anchor) idx = i; });
    }
    if (idx === last) return;
    last = idx;
    stage.dataset.a = idx;
    arts.forEach(function (a, i) { a.classList.toggle('on', i === idx); });
  }
  function req() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', req);
  update();
})();
