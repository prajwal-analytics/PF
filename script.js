// ============================================================
//  PRAJWAL MR — Portfolio JS
// ============================================================

// ---- Navbar scroll tint ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 30
    ? 'rgba(251,191,36,0.97)'
    : 'var(--yellow)';
}, { passive: true });

// ---- Hamburger ----
const burger   = document.getElementById('burger');
const drawer   = document.getElementById('mobDrawer');
const mobClose = document.getElementById('mobClose');
burger.addEventListener('click', () => drawer.classList.toggle('open'));
mobClose.addEventListener('click', () => drawer.classList.remove('open'));
document.querySelectorAll('.mob-a').forEach(a =>
  a.addEventListener('click', () => drawer.classList.remove('open'))
);

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      // stagger siblings
      const parent = e.target.closest('.skills-row, .projects-grid, .certs-grid, .about-wrap, .contact-grid, .contact-postits');
      const siblings = parent ? Array.from(parent.querySelectorAll('.reveal')) : [e.target];
      const idx = siblings.indexOf(e.target);
      setTimeout(() => e.target.classList.add('visible'), idx * 80);
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => ro.observe(el));

// ---- Hero staggered entry ----
document.addEventListener('DOMContentLoaded', () => {
  const heroItems = document.querySelectorAll('#hero .sticker, #hero .hero-h1, #hero .hero-sub, #hero .hero-chips, #hero .hero-btns, #hero .hero-stats, #hero .avatar-stage');
  heroItems.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 180 + i * 110);
  });
});

// ---- Skill chips random wiggle on hover ----
document.querySelectorAll('.sk-chip').forEach(chip => {
  chip.addEventListener('mouseenter', () => {
    const deg = (Math.random() - 0.5) * 6;
    chip.style.transform = `translate(-1px,-2px) rotate(${deg}deg)`;
  });
  chip.addEventListener('mouseleave', () => {
    chip.style.transform = '';
  });
});

// ---- Contact form ----
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '✅ Sent! Talk soon 🎉';
    btn.style.background = 'var(--green)';
    btn.style.borderColor = 'var(--ink)';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.style.borderColor = '';
      form.reset();
    }, 3200);
  });
}

// ---- Cursor sparkle (desktop only) ----
if (window.matchMedia('(pointer:fine)').matches) {
  document.addEventListener('click', e => {
    const colors = ['#fbbf24','#f472b6','#38bdf8','#34d399','#a78bfa'];
    for (let i = 0; i < 5; i++) {
      const dot = document.createElement('span');
      const size = 8 + Math.random() * 8;
      const angle = (Math.PI * 2 / 5) * i;
      const dist = 30 + Math.random() * 20;
      dot.style.cssText = `
        position:fixed;left:${e.clientX}px;top:${e.clientY}px;
        width:${size}px;height:${size}px;border-radius:50%;
        background:${colors[i]};border:2px solid #111;
        pointer-events:none;z-index:9999;
        transform:translate(-50%,-50%);
        transition: transform 0.5s ease, opacity 0.5s ease;
      `;
      document.body.appendChild(dot);
      requestAnimationFrame(() => {
        dot.style.transform = `translate(calc(-50% + ${Math.cos(angle)*dist}px), calc(-50% + ${Math.sin(angle)*dist}px))`;
        dot.style.opacity = '0';
      });
      setTimeout(() => dot.remove(), 520);
    }
  });
}
