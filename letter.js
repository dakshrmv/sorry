/* ===================================================
   letter.js — Page 1 Script
   For Kratika — written with care by Daksh
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -------- AMBIENT PARTICLE CANVAS -------- */
  const canvas = document.getElementById('ambient-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H;

  function resizeCanvas() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Soft floating particles (tiny dots + occasional petal chars)
  const particles = [];
  const PARTICLE_COUNT = 55;
  const PETAL_CHARS    = ['✦', '·', '˙', '○', '◦'];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle(true));
  }

  function createParticle(random) {
    const isChar  = Math.random() < 0.3;
    const char    = PETAL_CHARS[Math.floor(Math.random() * PETAL_CHARS.length)];
    const hues    = [340, 300, 220, 50, 330];
    const hue     = hues[Math.floor(Math.random() * hues.length)];
    return {
      x:     Math.random() * W,
      y:     random ? Math.random() * H : H + 10,
      vx:    (Math.random() - 0.5) * 0.25,
      vy:    -(Math.random() * 0.4 + 0.15),
      r:     Math.random() * 2 + 0.5,
      alpha: 0,
      maxA:  Math.random() * 0.25 + 0.05,
      hue,
      isChar,
      char,
      size:  Math.random() * 10 + 7,
      phase: Math.random() * Math.PI * 2,
    };
  }

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      p.x += p.vx + Math.sin(p.phase + Date.now() * 0.0008) * 0.18;
      p.y += p.vy;
      p.phase += 0.01;
      p.alpha += 0.003;
      if (p.alpha > p.maxA) p.alpha = p.maxA;

      if (p.y < -20) {
        particles[i] = createParticle(false);
        return;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      if (p.isChar) {
        ctx.fillStyle = `hsl(${p.hue}, 55%, 70%)`;
        ctx.font      = `${p.size}px serif`;
        ctx.fillText(p.char, p.x, p.y);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${p.hue}, 60%, 78%)`;
        ctx.fill();
      }
      ctx.restore();
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  /* -------- HERO PETALS -------- */
  const petalContainer = document.getElementById('hero-petals');
  const PETAL_EMOJIS   = ['✿', '❀', '✾', '⊹'];

  function spawnPetal() {
    const el  = document.createElement('span');
    el.className = 'petal';
    el.textContent = PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)];
    const left = Math.random() * 100;
    const dur  = Math.random() * 10 + 12;
    const delay = Math.random() * 5;
    const size = Math.random() * 0.7 + 0.5;
    const col  = `hsl(${Math.random() * 50 + 320}, 50%, 75%)`;
    el.style.cssText = `
      left: ${left}%;
      top: 0;
      font-size: ${size}rem;
      color: ${col};
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
    `;
    petalContainer.appendChild(el);
    setTimeout(() => el.remove(), (dur + delay) * 1000);
  }

  // Initial batch
  for (let i = 0; i < 12; i++) spawnPetal();
  setInterval(spawnPetal, 1800);

  /* -------- OPEN SLOWLY BUTTON -------- */
  const openBtn    = document.getElementById('open-slowly-btn');
  const heroSection = document.getElementById('hero');
  const letterMain  = document.getElementById('letter-main');

  openBtn.addEventListener('click', () => {
    // Fade hero softly
    heroSection.style.transition = 'opacity 1.2s ease';
    heroSection.style.opacity    = '0';
    heroSection.style.pointerEvents = 'none';

    letterMain.classList.remove('hidden-main');
    letterMain.style.opacity = '0';
    letterMain.setAttribute('aria-hidden', 'false');

    setTimeout(() => {
      heroSection.style.display = 'none';
      letterMain.style.transition = 'opacity 1s ease';
      letterMain.style.opacity    = '1';
      // Scroll to top of letter
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  });

  /* -------- SCROLL REVEAL (Intersection Observer) -------- */
  const fadeEls = document.querySelectorAll('.fade-in-up');

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  fadeEls.forEach(el => revealObs.observe(el));

  /* -------- PHOTO LIGHTBOX -------- */
  const galleryItems  = document.querySelectorAll('.gallery-item');
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxCap   = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(imgSrc, caption) {
    lightboxImg.src = imgSrc;
    lightboxCap.textContent = caption;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 400);
  }

  galleryItems.forEach(item => {
    const trigger = () => {
      const img     = item.querySelector('img');
      const caption = item.dataset.caption;
      if (img && img.src) openLightbox(img.src, caption);
    };
    item.addEventListener('click', trigger);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  /* -------- CALM HEART (glowing heart in calm section) -------- */
  const calmHeart = document.getElementById('calm-heart');
  if (calmHeart) {
    calmHeart.addEventListener('click', () => {
      calmHeart.style.color = 'var(--blush-deep)';
      calmHeart.textContent = '❤';
      calmHeart.style.textShadow = '0 0 40px rgba(212,136,138,0.7)';
      setTimeout(() => {
        calmHeart.textContent = '♡';
        calmHeart.style.color  = '';
        calmHeart.style.textShadow = '';
      }, 2000);
    });
  }

  /* -------- OPTIONAL AMBIENT MUSIC -------- */
  const musicBtn  = document.getElementById('music-btn');
  const musicIcon = document.getElementById('music-icon');
  const bgAudio   = document.getElementById('bg-audio');
  let musicPlaying = false;

  if (musicBtn && bgAudio && bgAudio.querySelector('source')) {
    musicBtn.addEventListener('click', () => {
      if (musicPlaying) {
        bgAudio.pause();
        musicIcon.textContent = '♪';
        musicPlaying = false;
      } else {
        bgAudio.play().catch(() => {});
        musicIcon.textContent = '♫';
        musicPlaying = true;
      }
    });
  } else if (musicBtn) {
    // No audio source provided — hide control
    document.querySelector('.music-control').style.display = 'none';
  }

});
