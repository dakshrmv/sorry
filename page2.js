/* ===================================================
   page2.js — Interactive Experience
   For Kratika — written with care by Daksh
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -------- AMBIENT CANVAS -------- */
  const canvas = document.getElementById('ambient-canvas-p2');
  const ctx    = canvas.getContext('2d');
  let W, H;

  function resizeCanvas() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = [];
  const COUNT     = 45;

  for (let i = 0; i < COUNT; i++) particles.push(mkParticle(true));

  function mkParticle(rand) {
    const hues = [340, 290, 200, 55, 320];
    return {
      x:     Math.random() * W,
      y:     rand ? Math.random() * H : H + 10,
      vx:    (Math.random() - 0.5) * 0.2,
      vy:    -(Math.random() * 0.35 + 0.12),
      r:     Math.random() * 1.8 + 0.4,
      alpha: 0,
      maxA:  Math.random() * 0.2 + 0.04,
      hue:   hues[Math.floor(Math.random() * hues.length)],
      phase: Math.random() * Math.PI * 2,
    };
  }

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      p.x += p.vx + Math.sin(p.phase + Date.now() * 0.0006) * 0.15;
      p.y += p.vy;
      p.phase += 0.008;
      if (p.alpha < p.maxA) p.alpha += 0.002;
      if (p.y < -10) { particles[i] = mkParticle(false); return; }
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${p.hue}, 55%, 76%)`;
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  /* -------- SCROLL REVEAL -------- */
  const fadeEls = document.querySelectorAll('.p2-fade');

  const revObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  fadeEls.forEach(el => revObs.observe(el));

  /* -------- 1. MEMORY CARDS -------- */
  const memCards = document.querySelectorAll('.memory-card-wrap');

  function flipCard(wrap) {
    const card = wrap.querySelector('.memory-card');
    card.classList.toggle('flipped');
    const isFlipped = card.classList.contains('flipped');
    wrap.setAttribute('aria-pressed', isFlipped ? 'true' : 'false');
  }

  memCards.forEach(wrap => {
    wrap.addEventListener('click', () => flipCard(wrap));
    wrap.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flipCard(wrap); }
    });
  });

  /* -------- 2. FLOATING HEARTS -------- */
  const cloud   = document.getElementById('hearts-cloud');
  const MESSAGES = [
    "Your smile.",
    "Your voice.",
    "Your little 'bure ho aap' moments.",
    "Your caring side.",
    "Your random messages.",
    "The way you make ordinary moments special.",
    "How you care even when you're annoyed.",
    "Your little reactions.",
    "Your warmth.",
    "The way you say my name.",
  ];

  const HEART_STYLES = [
    { bg: 'rgba(242,212,208,0.55)', border: 'rgba(232,180,173,0.5)', symbol: '♡', color: '#d4888a' },
    { bg: 'rgba(228,221,240,0.55)', border: 'rgba(200,184,224,0.5)', symbol: '❋', color: '#9a7fbf' },
    { bg: 'rgba(232,213,168,0.45)', border: 'rgba(201,169,110,0.4)', symbol: '✿', color: '#c9a96e' },
    { bg: 'rgba(242,212,208,0.45)', border: 'rgba(212,136,138,0.4)', symbol: '✦', color: '#d4888a' },
    { bg: 'rgba(228,221,240,0.45)', border: 'rgba(196,180,228,0.4)', symbol: '˚', color: '#b8a0e0' },
  ];

  // Position hearts in a scattered cloud layout
  const positions = [
    { left: '10%', top: '15%' }, { left: '35%', top: '5%' },  { left: '60%', top: '12%' },
    { left: '80%', top: '20%' }, { left: '20%', top: '45%' }, { left: '48%', top: '40%' },
    { left: '70%', top: '48%' }, { left: '5%',  top: '70%' }, { left: '38%', top: '72%' },
    { left: '65%', top: '75%' },
  ];

  MESSAGES.forEach((msg, i) => {
    const style   = HEART_STYLES[i % HEART_STYLES.length];
    const pos     = positions[i] || { left: `${Math.random()*80+5}%`, top: `${Math.random()*80+5}%` };
    const durSec  = (Math.random() * 3 + 3).toFixed(1);
    const delaySec = (Math.random() * 2).toFixed(1);

    const el  = document.createElement('div');
    el.className  = 'float-heart';
    el.style.cssText = `
      left: ${pos.left};
      top: ${pos.top};
      background: ${style.bg};
      border: 1px solid ${style.border};
      box-shadow: 0 4px 16px ${style.border};
      animation-duration: ${durSec}s;
      animation-delay: ${delaySec}s;
    `;
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `Heart: ${msg}`);

    const sym = document.createElement('span');
    sym.className = 'fh-symbol';
    sym.textContent = style.symbol;
    sym.style.color = style.color;

    const bubble = document.createElement('div');
    bubble.className = 'fh-message-bubble';
    bubble.textContent = msg;

    el.appendChild(sym);
    el.appendChild(bubble);

    const reveal = () => {
      el.classList.toggle('revealed');
    };

    el.addEventListener('click', reveal);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reveal(); } });

    cloud.appendChild(el);
  });

  /* -------- 3. PROMISE SIGNATURE -------- */
  const sigKratika = document.getElementById('sig-kratika');

  if (sigKratika) {
    const triggerSign = () => {
      if (sigKratika.classList.contains('signed')) return;
      sigKratika.classList.add('signed');

      // Tiny heart burst from signature
      const rect = sigKratika.getBoundingClientRect();
      const cx   = rect.left + rect.width / 2;
      const cy   = rect.top  + rect.height / 2;
      spawnHeartBurst(cx, cy, 10);
    };

    sigKratika.addEventListener('click', triggerSign);
    sigKratika.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); triggerSign(); }
    });
  }

  /* -------- 4. ENVELOPE SURPRISE -------- */
  const envelope  = document.getElementById('surprise-envelope');
  const envBtn    = document.getElementById('env-open-btn');
  const burstEl   = document.getElementById('hearts-burst');

  let envelopeOpened = false;

  function openEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;

    envelope.classList.add('opened');
    document.getElementById('surprise-note').setAttribute('aria-hidden', 'false');

    // Hide button
    envBtn.classList.add('opened-state');

    // Float hearts upward from envelope position
    const rect = envelope.getBoundingClientRect();
    const cx   = rect.left + rect.width / 2;
    const cy   = rect.top;

    floatHeartsUpward(cx, cy, 18);
  }

  if (envelope) {
    envelope.addEventListener('click', openEnvelope);
    envelope.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnvelope(); }
    });
  }

  if (envBtn) {
    envBtn.addEventListener('click', openEnvelope);
  }

  function floatHeartsUpward(cx, cy, count) {
    const items = ['♡', '❤', '✦', '✿', '·', '˚'];
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'burst-heart';
        const sx = cx + (Math.random() - 0.5) * 80;
        const ey = cy - (Math.random() * 250 + 80);
        const ex = cx + (Math.random() - 0.5) * 160;
        el.textContent = items[Math.floor(Math.random() * items.length)];
        el.style.setProperty('--sx', `${sx}px`);
        el.style.setProperty('--sy', `${cy}px`);
        el.style.setProperty('--ex', `${ex}px`);
        el.style.setProperty('--ey', `${ey}px`);
        el.style.setProperty('--dur', `${Math.random() * 0.8 + 0.9}s`);
        el.style.cssText += `
          color: hsl(${Math.random() * 60 + 320}, 60%, 65%);
          font-size: ${Math.random() * 1.2 + 0.8}rem;
        `;
        burstEl.appendChild(el);
        setTimeout(() => el.remove(), 1800);
      }, i * 80);
    }
  }

  /* -------- 5. FINAL HEART -------- */
  const bigHeartBtn   = document.getElementById('big-heart-btn');
  const finalReveal   = document.getElementById('final-reveal');
  const screenBurst   = document.getElementById('screen-burst');
  let heartClicked    = false;

  if (bigHeartBtn) {
    bigHeartBtn.addEventListener('click', () => {
      if (heartClicked) return;
      heartClicked = true;

      // Show the reveal text
      finalReveal.classList.add('shown');

      // Full-screen soft heart burst
      triggerScreenBurst();

      // Gently pulse the heart symbol
      const sym = bigHeartBtn.querySelector('.big-heart-symbol');
      if (sym) {
        sym.style.filter = 'drop-shadow(0 0 40px rgba(212,136,138,0.85))';
        sym.style.animation = 'none';
        sym.style.transform = 'scale(1.15)';
        setTimeout(() => {
          sym.style.transform = '';
          sym.style.animation = '';
        }, 800);
      }
    });
  }

  function triggerScreenBurst() {
    const items = ['♡', '✦', '❤', '✿', '˚', '·', '❋'];
    const count = 40;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'burst-heart';
        const sx = Math.random() * window.innerWidth;
        const sy = window.innerHeight + 10;
        const ex = sx + (Math.random() - 0.5) * 200;
        const ey = Math.random() * window.innerHeight * 0.6 + 40;
        const dur = (Math.random() * 1.2 + 0.8).toFixed(2);
        el.textContent = items[Math.floor(Math.random() * items.length)];
        el.style.setProperty('--sx', `${sx}px`);
        el.style.setProperty('--sy', `${sy}px`);
        el.style.setProperty('--ex', `${ex}px`);
        el.style.setProperty('--ey', `${ey}px`);
        el.style.setProperty('--dur', `${dur}s`);
        el.style.cssText += `
          color: hsl(${Math.random() * 60 + 310}, 55%, 68%);
          font-size: ${Math.random() * 1.4 + 0.9}rem;
        `;
        screenBurst.appendChild(el);
        setTimeout(() => el.remove(), parseFloat(dur) * 1000 + 200);
      }, i * 75);
    }

    // Soft background glow overlay
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed; inset: 0;
      background: radial-gradient(ellipse at center, rgba(242,212,208,0.35) 0%, transparent 70%);
      pointer-events: none; z-index: 8999;
      opacity: 0; transition: opacity 0.6s ease;
    `;
    document.body.appendChild(glow);
    requestAnimationFrame(() => { glow.style.opacity = '1'; });
    setTimeout(() => {
      glow.style.opacity = '0';
      setTimeout(() => glow.remove(), 700);
    }, 1800);
  }

  /* -------- HELPER: tiny heart burst at point -------- */
  function spawnHeartBurst(cx, cy, count) {
    const items = ['♡', '✦', '✿', '❤'];
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed;
        left: ${cx}px; top: ${cy}px;
        font-size: ${Math.random() * 0.8 + 0.7}rem;
        pointer-events: none;
        z-index: 9500;
        transform: translate(-50%, -50%);
        color: hsl(${Math.random()*40+320}, 60%, 68%);
        transition: none;
      `;
      el.textContent = items[Math.floor(Math.random() * items.length)];
      document.body.appendChild(el);

      const angle = (Math.PI * 2 / count) * i;
      const dist  = Math.random() * 55 + 25;
      const tx    = Math.cos(angle) * dist;
      const ty    = Math.sin(angle) * dist - 30;

      el.animate([
        { transform: 'translate(-50%,-50%) scale(0)', opacity: 1 },
        { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.2)`, opacity: 0 }
      ], { duration: Math.random() * 400 + 500, easing: 'cubic-bezier(0.25, 1, 0.5, 1)', fill: 'forwards' });

      setTimeout(() => el.remove(), 1000);
    }
  }

});
