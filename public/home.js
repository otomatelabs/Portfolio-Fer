// Home page behaviour: language-aware rotating word and flow diagram, service tabs, case filters, scroll-spy nav.
(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var lang = function () { return root.lang === 'es' ? 'es' : 'en'; };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var onLang = [];
  new MutationObserver(function () { onLang.forEach(function (f) { f(); }); }).observe(root, { attributes: true, attributeFilter: ['lang'] });

  // ── Scroll reveal
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  $$('.rv').forEach(function (e) { io.observe(e); });

  // ── Nav: scroll-spy + mobile menu
  var links = $$('#menu a'), menu = $('#menu'), burger = $('#burger'), secs = $$('[data-spy]');
  var spyTick = false;
  function spy() {
    spyTick = false;
    var line = innerHeight * 0.35, cur = null;
    secs.forEach(function (s) { var r = s.getBoundingClientRect(); if (r.top <= line && r.bottom > line) cur = s.dataset.spy; });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = 'contacto';
    links.forEach(function (a) { a.setAttribute('aria-current', a.dataset.k === cur ? 'true' : 'false'); });
  }
  addEventListener('scroll', function () { if (!spyTick) { spyTick = true; requestAnimationFrame(spy); } }, { passive: true });
  addEventListener('resize', spy);
  spy();
  function closeMenu() { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function () { burger.setAttribute('aria-expanded', String(menu.classList.toggle('open'))); });
  links.forEach(function (a) { a.addEventListener('click', closeMenu); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  // ── Rotating word (own line, fixed height, so nothing around it moves)
  var rot = $('#rot');
  if (rot) {
    var words = JSON.parse(rot.dataset.words), wi = 0;
    var mk = function (w, c) { var s = document.createElement('span'); s.className = 'rot-word ' + c; s.textContent = w[lang()]; s._w = w; return s; };
    rot.textContent = '';
    rot.appendChild(mk(words[0], ''));
    onLang.push(function () { $$('.rot-word', rot).forEach(function (s) { s.textContent = s._w[lang()]; }); });
    if (!reduce) setInterval(function () {
      var old = $('.rot-word:not(.is-out)', rot);
      old.className = 'rot-word is-out';
      wi = (wi + 1) % words.length;
      rot.appendChild(mk(words[wi], 'is-in'));
      setTimeout(function () { old.remove(); }, 520);
    }, 2600);
  }

  // ── Service tabs
  var tabs = $$('#svtabs [role=tab]');
  function showTab(i, focus) {
    tabs.forEach(function (t, j) {
      t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1;
      var p = document.getElementById(t.getAttribute('aria-controls'));
      p.hidden = i !== j;
      if (i === j) { p.classList.remove('sw'); void p.offsetWidth; p.classList.add('sw'); }
    });
    if (focus) tabs[i].focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { showTab(i); });
    t.addEventListener('keydown', function (e) {
      var k = e.key;
      if (k === 'ArrowDown' || k === 'ArrowRight') { e.preventDefault(); showTab((i + 1) % tabs.length, true); }
      if (k === 'ArrowUp' || k === 'ArrowLeft') { e.preventDefault(); showTab((i + tabs.length - 1) % tabs.length, true); }
    });
  });

  // ── Case filters (also driven by the "related work" button of a service)
  var fbtns = $$('#grid-work .filters button'), cards = $$('#grid-work .wc');
  function setFilter(k) {
    fbtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.k === k)); });
    cards.forEach(function (c) { c.hidden = !(k === 'all' || c.dataset.c === k); });
  }
  fbtns.forEach(function (b) { b.addEventListener('click', function () { setFilter(b.dataset.k); }); });
  $$('[data-filter]').forEach(function (a) {
    a.addEventListener('click', function () {
      var k = a.dataset.filter;
      setFilter(fbtns.some(function (b) { return b.dataset.k === k; }) ? k : 'all');
    });
  });

  // ── Flow diagram: one clock (a class that restarts every animation), results rotate in the chosen language
  var flow = $('#flow'), stack = $('#stack');
  if (flow && stack) {
    var results = JSON.parse(flow.dataset.results), q = 0, timer = null;
    var fill = function (el, r) { el.innerHTML = '<b></b><span></span>'; el.firstChild.textContent = r[0][lang()].toUpperCase(); el.lastChild.textContent = r[1][lang()]; };
    onLang.push(function () { $$('.fl-res', stack).forEach(function (el) { fill(el, results[+el.dataset.r]); }); });
    var push = function (idx) {
      $$('.fl-res', stack).forEach(function (e) {
        var i = +e.style.getPropertyValue('--i') + 1;
        e.style.setProperty('--i', i);
        if (i > 2) setTimeout(function () { e.remove(); }, 560);
      });
      var d = document.createElement('div');
      d.className = 'fl-res new'; d.dataset.r = idx; d.style.setProperty('--i', 0);
      fill(d, results[idx]); stack.appendChild(d);
    };
    var cycle = function () {
      flow.classList.remove('run'); void flow.offsetWidth; flow.classList.add('run');
      var idx = q++ % results.length;
      setTimeout(function () { push(idx); }, 3200);
    };
    if (reduce) { [0, 1, 2].forEach(push); }
    else new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !timer) { cycle(); timer = setInterval(cycle, 5200); }
        else if (!e.isIntersecting && timer) { clearInterval(timer); timer = null; }
      });
    }, { threshold: 0.3 }).observe(flow);
  }
})();
