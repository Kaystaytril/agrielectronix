// ------- mobile nav -------
const burger = document.querySelector('.burger');
if (burger) burger.addEventListener('click', () => document.body.classList.toggle('nav-open'));
document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('nav-open')));

// ------- header hide on scroll down -------
let lastY = 0;
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (document.body.classList.contains('nav-open')) return;
  if (y > 140 && y > lastY) header.classList.add('hide');
  else header.classList.remove('hide');
  lastY = y;
}, { passive: true });

// ------- reveal on scroll -------
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ------- animated counters -------
const cio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur = 1600, start = performance.now();
    const step = now => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = (target % 1 ? val.toFixed(1) : Math.round(val)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    cio.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

// ------- contact form -> WhatsApp -------
const form = document.querySelector('#quoteForm');
if (form) {
  form.addEventListener('submit', ev => {
    ev.preventDefault();
    const d = new FormData(form);
    const msg = `Hi Agri Electronix! I'd like a free quote.%0A%0AName: ${encodeURIComponent(d.get('name'))}%0AProperty: ${encodeURIComponent(d.get('type'))}%0AAvg monthly bill: ${encodeURIComponent(d.get('bill'))}%0A%0A${encodeURIComponent(d.get('msg') || '')}`;
    window.open(`https://wa.me/27729627928?text=${msg}`, '_blank');
  });
}
