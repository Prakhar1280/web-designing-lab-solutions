document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('runAudit');
  const out = document.getElementById('result');
  const q = (s) => document.querySelector(s);
  const len = (s) => (q(s)?.getAttribute('content') || '').length;

  function headingsInOrder() {
    const levels = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => +h.tagName[1]);
    return levels.every((l, i) => i === 0 || l - levels[i - 1] <= 1);
  }

  function checks() {
    const t = document.title.length;
    const d = len('meta[name="description"]');
    return [
      ['Language set on <html>', document.documentElement.lang !== ''],
      ['Title is 30 to 65 characters (' + t + ')', t >= 30 && t <= 65],
      ['Meta description is 70 to 160 characters (' + d + ')', d >= 70 && d <= 160],
      ['Viewport meta tag present', !!q('meta[name="viewport"]')],
      ['Canonical link present', !!q('link[rel="canonical"]')],
      ['Open Graph tags present', !!q('meta[property="og:title"]') && !!q('meta[property="og:description"]')],
      ['Structured data (JSON-LD) present', !!q('script[type="application/ld+json"]')],
      ['Exactly one h1', document.querySelectorAll('h1').length === 1],
      ['Heading levels never skip', headingsInOrder()],
      ['Landmarks: header, nav, main, footer', ['header', 'nav', 'main', 'footer'].every(s => q(s))],
      ['Skip link is the first link', q('a')?.getAttribute('href') === '#main'],
      ['All images have alt text', [...document.images].every(i => i.hasAttribute('alt'))],
      ['All links have readable text', [...document.links].every(a => a.textContent.trim().length > 0)],
      ['Tables have caption and header cells', [...document.querySelectorAll('table')].every(t => t.caption && t.querySelector('th'))],
      ['No clickable divs or spans', !q('div[onclick],span[onclick]')]
    ];
  }

  btn.addEventListener('click', () => {
    btn.disabled = true;
    btn.textContent = 'Auditing…';
    setTimeout(() => {
      const list = checks();
      const passed = list.filter(c => c[1]).length;
      const pct = Math.round(passed / list.length * 100);
      out.innerHTML = '<p class="score">' + pct + '%<small>' + passed + ' of ' + list.length + ' checks passed</small></p><ul class="checks">' +
        list.map(([name, ok]) => '<li class="' + (ok ? 'pass' : 'fail') + '"><b>' + (ok ? 'Pass' : 'Fix') + '</b><span></span></li>').join('') + '</ul>';
      out.querySelectorAll('span').forEach((s, i) => { s.textContent = list[i][0]; });
      btn.disabled = false;
      btn.textContent = 'Run audit again';
    }, 400);
  });
});
