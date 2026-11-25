/* Contact form. Set contactEndpoint (POST JSON) or contactEmail (opens the mail app) in js/config.js. */
(function () {
  var f = document.getElementById('contact-form'); if (!f) return;
  var msg = document.getElementById('form-msg');
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = Object.fromEntries(new FormData(f).entries()), L = window.LX || {};
    if (L.contactEndpoint) {
      fetch(L.contactEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) })
        .then(function (r) { if (!r.ok) throw 0; f.reset(); msg.textContent = 'Thanks. We received your message.'; })
        .catch(function () { msg.textContent = 'Could not send your message. Please try again.'; });
    } else if (L.contactEmail) {
      location.href = 'mailto:' + L.contactEmail + '?subject=' + encodeURIComponent('[' + d.topic + '] ' + d.name) +
        '&body=' + encodeURIComponent(d.message + '\n\n' + d.name + ' <' + d.email + '>');
    } else { msg.textContent = 'The contact form is not connected yet.'; }
  });
})();
