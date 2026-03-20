// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20 ? '0 4px 30px rgba(0,0,0,0.5)' : 'none';
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#navbar nav a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => observer.observe(s));

// ===== FADE-IN ANIMATION =====
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, _i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), _i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => fadeObserver.observe(el));

// ===== ANIMATED PARTICLES =====
const container = document.getElementById('particles');
const colors = ['#6c63ff', '#ff6584', '#43e97b', '#f7971e', '#4facfe'];

function createParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 12 + 4;
  p.style.cssText = `
    width:${size}px;
    height:${size}px;
    left:${Math.random() * 100}%;
    background:${colors[Math.floor(Math.random() * colors.length)]};
    animation-duration:${Math.random() * 14 + 8}s;
    animation-delay:${Math.random() * 8}s;
  `;
  container.appendChild(p);
  setTimeout(() => p.remove(), 22000);
}

// spawn 30 initial particles then keep adding
for (let i = 0; i < 30; i++) createParticle();
setInterval(createParticle, 600);

// ===== TYPED ROLE ANIMATION =====
const roles = ['Full-Stack Developer', 'Problem Solver', 'Open-Source Enthusiast', 'Software Engineer'];
let roleIdx = 0, charIdx = 0, deleting = false;
const roleEl = document.getElementById('typed-role');

function typeRole() {
  if (!roleEl) return;
  const current = roles[roleIdx];
  if (deleting) {
    roleEl.textContent = current.substring(0, charIdx--);
    if (charIdx < 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(typeRole, 500);
      return;
    }
  } else {
    roleEl.textContent = current.substring(0, charIdx++);
    if (charIdx > current.length) {
      deleting = true;
      setTimeout(typeRole, 2200);
      return;
    }
  }
  setTimeout(typeRole, deleting ? 55 : 90);
}

typeRole();

// ===== CONTACT FORM =====
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate async send (replace with real endpoint or EmailJS)
    setTimeout(() => {
      formMsg.textContent = "✅ Message sent! I'll get back to you soon.";
      formMsg.style.color = '#43e97b';
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }, 1400);
  });
}
