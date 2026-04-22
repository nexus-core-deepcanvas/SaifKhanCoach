
// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const goal    = document.getElementById('goal').value;
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !goal || !message) {
    showFormStatus('Please fill in all fields.', 'error');
    return;
  }

  const subject = encodeURIComponent(`New Enquiry from ${name} — Saif's Studio`);
  const body = encodeURIComponent(
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Goal: ${goal}\n\n` +
    `Message:\n${message}`
  );

  window.location.href = `mailto:saif.cs.student@gmail.com?subject=${subject}&body=${body}`;

  showFormStatus("Your email client should open now. If it didn't, email saif.cs.student@gmail.com directly.", 'success');
});

function showFormStatus(msg, type) {
  const existing = document.getElementById('formStatus');
  if (existing) existing.remove();

  const el = document.createElement('p');
  el.id = 'formStatus';
  el.textContent = msg;
  el.style.cssText = `
    margin-top: 14px;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 0.88rem;
    text-align: center;
    background: ${type === 'success' ? 'rgba(232,169,35,0.12)' : 'rgba(220,50,50,0.12)'};
    color: ${type === 'success' ? '#e8a923' : '#e05555'};
    border: 1px solid ${type === 'success' ? 'rgba(232,169,35,0.3)' : 'rgba(220,50,50,0.3)'};
  `;
  contactForm.appendChild(el);
}

// ===== SCROLL REVEAL ANIMATION =====
const revealEls = document.querySelectorAll(
  '.service-card, .testimonial-card, .credential, .about-text, .contact-form'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});