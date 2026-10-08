/* Contact events contain only fixed page and placement labels. */
(function () {
  'use strict';
  if (window.tomContactAnalytics) return;

  window.sa_event = window.sa_event || function () {
    var args = [].slice.call(arguments);
    if (window.sa_event.q) window.sa_event.q.push(args);
    else window.sa_event.q = [args];
  };

  var projects = ['levensportretten', 'positief-nieuws', 'buurt-deze-week', 'velden-van-vroeger'];
  function pageLabel(path) {
    if (path === '/' || path === '/index.html') return 'home';
    for (var i = 0; i < projects.length; i++) {
      if (path === '/projecten/' + projects[i] + '/' ||
          path === '/projecten/' + projects[i] + '/index.html') return projects[i];
    }
    return 'other';
  }

  var page = pageLabel(window.location.pathname);
  var context = page;
  try {
    var referrer = new URL(document.referrer);
    if (page === 'home' && referrer.origin === window.location.origin) {
      var previous = pageLabel(referrer.pathname);
      if (projects.indexOf(previous) !== -1) context = previous;
    }
  } catch (_) { /* A missing referrer simply leaves the home context. */ }

  function track(name, placement) {
    try {
      var metadata = { page: page, project_context: context };
      if (placement) metadata.placement = placement;
      window.sa_event(name, metadata);
    } catch (_) { /* Analytics must never interrupt contact or submission. */ }
  }
  window.tomContactAnalytics = { track: track };

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    var target;
    try { target = new URL(link.href, window.location.href); } catch (_) { return; }
    if (target.origin !== window.location.origin || target.hash !== '#contact') return;
    if (target.pathname !== '/' && target.pathname !== '/index.html') return;
    track('contact_click', link.closest('nav') ? 'navigation' : 'page');
  });

  var form = document.getElementById('contact-form');
  if (form) {
    var started = false;
    form.addEventListener('input', function (event) {
      if (started || !['naam', 'email', 'bericht'].includes(event.target.name)) return;
      started = true;
      track('contact_form_start');
    });
  }
}());
