/* ============================================
   FOR KRATIKA — THE CUTEST LOVE WEBSITE EVER
   Every line written with all the love by Daksh 💕
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== CURSOR =====
    const cursorEmoji = document.getElementById('cursor');
    const cursorRing  = document.getElementById('cursor-dot');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
        // Set cursor emoji
        cursorEmoji.innerText = '💖';

        let mx = 0, my = 0;

        document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            // emoji cursor snaps to mouse
            cursorEmoji.style.left = mx + 'px';
            cursorEmoji.style.top  = my + 'px';
            // ring follows with lag
            cursorRing.style.left = mx + 'px';
            cursorRing.style.top  = my + 'px';
        });

        document.addEventListener('mousedown', () => {
            cursorEmoji.innerText = '💝';
            cursorEmoji.style.transform = 'translate(-50%,-50%) scale(1.4)';
            cursorRing.style.width  = '55px';
            cursorRing.style.height = '55px';
        });
        document.addEventListener('mouseup', () => {
            cursorEmoji.innerText = '💖';
            cursorEmoji.style.transform = 'translate(-50%,-50%) scale(1)';
            cursorRing.style.width  = '40px';
            cursorRing.style.height = '40px';
        });

        // Sparkle on click
        document.addEventListener('click', spawnSparkles);
    } else {
        if (cursorEmoji) cursorEmoji.style.display = 'none';
        if (cursorRing)  cursorRing.style.display  = 'none';
    }

    function spawnSparkles(e) {
        const sparks  = ['✨','💕','🌸','⭐','💫','🌷','💖'];
        const count   = 6;
        for (let i = 0; i < count; i++) {
            const el  = document.createElement('div');
            el.innerText = sparks[Math.floor(Math.random() * sparks.length)];
            el.style.cssText = `
                position:fixed;
                left:${e.clientX}px;
                top:${e.clientY}px;
                font-size:${Math.random() * 1.2 + 0.7}rem;
                pointer-events:none;
                z-index:99990;
                transform:translate(-50%,-50%);
                will-change:transform,opacity;
            `;
            document.body.appendChild(el);
            const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
            const dist  = Math.random() * 70 + 30;
            const tx    = Math.cos(angle) * dist;
            const ty    = Math.sin(angle) * dist - 40;
            el.animate([
                { transform: 'translate(-50%,-50%) scale(0) rotate(0deg)', opacity: 1 },
                { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.2) rotate(${Math.random()*360}deg)`, opacity: 0 }
            ], { duration: 700 + Math.random() * 400, easing: 'cubic-bezier(0.25,1,0.5,1)' });
            setTimeout(() => el.remove(), 1100);
        }
    }

    // ===== PRELOADER =====
    setTimeout(() => {
        const pre = document.getElementById('preloader');
        pre.style.opacity = '0';
        setTimeout(() => {
            pre.style.display = 'none';
            initBgFloaties();
            initEntryStars();
        }, 800);
    }, 2800);

    // ===== TWINKLING STARS (entry page) =====
    function initEntryStars() {
        const canvas = document.getElementById('stars-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width  = canvas.offsetWidth  || window.innerWidth;
        canvas.height = canvas.offsetHeight || window.innerHeight;

        const stars = [];
        for (let i = 0; i < 120; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2 + 0.5,
                op: Math.random(),
                speed: Math.random() * 0.015 + 0.005,
                growing: Math.random() > 0.5
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(s => {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                // Pastel colored stars
                const hues = [340, 280, 50, 200, 320];
                const hue = hues[Math.floor(Math.random() * hues.length)] || 340;
                ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${s.op})`;
                ctx.fill();
                // Twinkle
                s.op += s.growing ? s.speed : -s.speed;
                if (s.op >= 0.9) s.growing = false;
                if (s.op <= 0.05) s.growing = true;
            });
            requestAnimationFrame(draw);
        }
        draw();
    }

    // ===== BG FLOATING ELEMENTS =====
    function initBgFloaties() {
        const container = document.getElementById('bg-floaties');
        const items     = ['🌸','💕','✨','🌷','💖','⭐','🦋','💗','🌺'];

        function makeFloatie() {
            const el = document.createElement('div');
            el.innerText = items[Math.floor(Math.random() * items.length)];
            el.style.cssText = `
                position:absolute;
                left:${Math.random() * 100}vw;
                bottom:-60px;
                font-size:${Math.random() * 1.5 + 0.5}rem;
                opacity:${Math.random() * 0.2 + 0.05};
                pointer-events:none;
                will-change:transform;
            `;
            const dur  = (Math.random() * 12 + 14) + 's';
            const xMov = (Math.random() * 80 - 40) + 'px';
            el.style.transition = `transform ${dur} linear, opacity ${dur} linear`;
            container.appendChild(el);
            setTimeout(() => {
                el.style.transform = `translate(${xMov}, -115vh) rotate(${Math.random() * 720}deg)`;
                el.style.opacity   = '0';
            }, 50);
            setTimeout(() => el.remove(), parseFloat(dur) * 1000);
        }

        setInterval(makeFloatie, 1800);
    }

    // ===== HEART PARTICLES ON CANVAS (subtle bg hearts) =====
    function startParticleCanvas() {
        // Just minimal floating hearts via DOM for performance
        // Already handled by initBgFloaties
    }

    // ===== ENVELOPE OPEN =====
    const openBtn       = document.getElementById('open-btn');
    const cuteEnvelope  = document.getElementById('cute-envelope');
    const envSection    = document.getElementById('envelope-section');

    function openEnvelope() {
        cuteEnvelope.classList.add('open');
        openBtn.style.opacity       = '0';
        openBtn.style.pointerEvents = 'none';
        openBtn.style.transition    = 'opacity 0.3s';

        // Burst hearts
        burstEnvelopeHearts();

        setTimeout(() => {
            envSection.style.transition = 'opacity 1.2s ease';
            envSection.style.opacity    = '0';
            setTimeout(() => {
                envSection.style.display = 'none';

                // Reveal all sections
                document.querySelectorAll('.section.hidden').forEach(s => {
                    if (s.id !== 'celebration-section') s.classList.remove('hidden');
                });

                // Show love ticker
                const ticker = document.getElementById('love-ticker');
                ticker.classList.remove('hidden');

                startHeroTyping();
                initLoveCounter();
                initHeartbeatCounter();
                initLanguageSwitcher();
                window.scrollTo({ top: 0, behavior: 'instant' });
            }, 1200);
        }, 1800);
    }

    openBtn.addEventListener('click', openEnvelope);
    cuteEnvelope.addEventListener('click', openEnvelope);

    function burstEnvelopeHearts() {
        const rect = cuteEnvelope.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const items = ['💕','💖','💗','🌸','✨','💝','💘','🌷'];

        for (let i = 0; i < 30; i++) {
            const el = document.createElement('div');
            el.innerText = items[Math.floor(Math.random() * items.length)];
            el.style.cssText = `
                position:fixed;
                left:${cx}px; top:${cy}px;
                font-size:${Math.random() * 1.8 + 0.8}rem;
                pointer-events:none;
                z-index:99999;
                transform:translate(-50%,-50%);
            `;
            document.body.appendChild(el);

            const angle = Math.random() * Math.PI * 2;
            const dist  = Math.random() * 180 + 60;
            const tx    = Math.cos(angle) * dist;
            const ty    = Math.sin(angle) * dist - 120;

            el.animate([
                { transform: 'translate(-50%,-50%) scale(0) rotate(0deg)', opacity: 1 },
                { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.4) rotate(${Math.random()*360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 900 + 700,
                easing: 'cubic-bezier(0.25,1,0.5,1)'
            });

            setTimeout(() => el.remove(), 1600);
        }
    }

    // ===== HERO TYPING =====
    function startHeroTyping() {
        const hiEl      = document.getElementById('hero-hi');
        const taglineEl = document.getElementById('hero-tagline');
        const hiText      = "Hi Kratika... 🥹";
        const taglineText = "I made this just for you, because you mean everything to me 💕";

        hiEl.innerText = '';
        taglineEl.innerText = '';

        let i = 0;
        function typeHi() {
            if (i < hiText.length) {
                hiEl.innerText += hiText[i++];
                setTimeout(typeHi, 100);
            } else {
                setTimeout(() => {
                    let j = 0;
                    function typeTag() {
                        if (j < taglineText.length) {
                            taglineEl.innerText += taglineText[j++];
                            setTimeout(typeTag, 38);
                        }
                    }
                    typeTag();
                }, 600);
            }
        }
        setTimeout(typeHi, 300);
    }

    // ===== LOVE COUNTER =====
    function initLoveCounter() {
        const start = new Date('2026-08-08T00:00:00').getTime();

        const dEl = document.getElementById('c-days');
        const hEl = document.getElementById('c-hours');
        const mEl = document.getElementById('c-mins');
        const sEl = document.getElementById('c-secs');

        function update() {
            const diff = Date.now() - start;
            if (diff > 0) {
                const d = Math.floor(diff / 86400000);
                const h = Math.floor((diff % 86400000) / 3600000);
                const m = Math.floor((diff % 3600000) / 60000);
                const s = Math.floor((diff % 60000) / 1000);
                dEl.innerText = d;
                hEl.innerText = h < 10 ? '0' + h : h;
                mEl.innerText = m < 10 ? '0' + m : m;
                sEl.innerText = s < 10 ? '0' + s : s;
            } else {
                dEl.innerText = '0';
                hEl.innerText = '00';
                mEl.innerText = '00';
                sEl.innerText = '00';
            }
        }
        update();
        setInterval(update, 1000);
    }

    // ===== POLAROID GALLERY =====
    const slider   = document.getElementById('polaroid-slider');
    const btnPrev  = document.getElementById('g-prev');
    const btnNext  = document.getElementById('g-next');
    const cards    = document.querySelectorAll('.polaroid');
    const curEl    = document.getElementById('g-cur');
    const dotsEl   = document.getElementById('gallery-dots');

    // Build dots
    cards.forEach((_, i) => {
        const d = document.createElement('div');
        d.style.cssText = `
            width:${i===0?20:10}px; height:10px;
            border-radius:10px;
            background:${i===0?'#ff6bae':'rgba(255,107,174,0.25)'};
            display:inline-block;
            margin:0 4px;
            transition:all 0.3s ease;
            cursor:pointer;
        `;
        d.addEventListener('click', () => {
            const cw = cards[0].offsetWidth + 24;
            slider.scrollTo({ left: i * cw, behavior: 'smooth' });
        });
        dotsEl.appendChild(d);
    });

    function updateGallery() {
        const cw  = cards[0].offsetWidth + 24;
        const idx = Math.round(slider.scrollLeft / cw);
        curEl.innerText = Math.min(idx + 1, cards.length);
        const dots = dotsEl.children;
        for (let i = 0; i < dots.length; i++) {
            dots[i].style.width      = i === idx ? '20px' : '10px';
            dots[i].style.background = i === idx ? '#ff6bae' : 'rgba(255,107,174,0.25)';
        }
    }

    slider.addEventListener('scroll', updateGallery);

    btnNext.addEventListener('click', () => {
        slider.scrollBy({ left: cards[0].offsetWidth + 24, behavior: 'smooth' });
    });
    btnPrev.addEventListener('click', () => {
        slider.scrollBy({ left: -(cards[0].offsetWidth + 24), behavior: 'smooth' });
    });

    // Touch swipe
    let touchX = 0;
    slider.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', e => {
        const diff = touchX - e.changedTouches[0].clientX;
        const cw   = cards[0].offsetWidth + 24;
        if (Math.abs(diff) > 50) slider.scrollBy({ left: diff > 0 ? cw : -cw, behavior: 'smooth' });
    });

    // ===== SCROLL REVEAL =====
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll(
        '.reason-bubble, .promise-card, .sec-header, .date-card-wrap, .letter-paper, .love-counter, .date-message'
    ).forEach(el => {
        el.classList.add('reveal');
        revealObs.observe(el);
    });

    // ===== CINEMATIC PROPOSAL =====

    // Init shooting stars on proposal section
    function initPropCanvas() {
        const canvas = document.getElementById('prop-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars = [];
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.5 + 0.3,
                op: Math.random() * 0.7 + 0.2,
                speed: Math.random() * 0.008 + 0.003,
                growing: Math.random() > 0.5
            });
        }

        const shootingStars = [];
        function addShootingStar() {
            shootingStars.push({
                x: Math.random() * canvas.width * 0.7,
                y: Math.random() * canvas.height * 0.4,
                len: Math.random() * 120 + 60,
                speed: Math.random() * 8 + 6,
                alpha: 1,
                angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3
            });
        }
        setInterval(addShootingStar, 2500);

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Stars
            stars.forEach(s => {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,220,240,${s.op})`;
                ctx.fill();
                s.op += s.growing ? s.speed : -s.speed;
                if (s.op > 0.9) s.growing = false;
                if (s.op < 0.1) s.growing = true;
            });

            // Shooting stars
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const s = shootingStars[i];
                const grad = ctx.createLinearGradient(
                    s.x, s.y,
                    s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len
                );
                grad.addColorStop(0, `rgba(255,200,220,${s.alpha})`);
                grad.addColorStop(1, 'transparent');
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 2;
                ctx.stroke();

                s.x += Math.cos(s.angle) * s.speed;
                s.y += Math.sin(s.angle) * s.speed;
                s.alpha -= 0.015;
                if (s.alpha <= 0) shootingStars.splice(i, 1);
            }
            requestAnimationFrame(draw);
        }
        draw();
    }

    // Watch for proposal section entering viewport, then start phase 1
    const propSection = document.getElementById('proposal-section');
    let propStarted   = false;

    const propObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting && !propStarted) {
                propStarted = true;
                initPropCanvas();
                setTimeout(startPhase1, 400);
            }
        });
    }, { threshold: 0.3 });

    if (propSection) propObs.observe(propSection);

    // -------- PHASE 1 --------
    function startPhase1() {
        const phase1 = document.getElementById('prop-phase1');
        const l1     = document.getElementById('p1-l1');
        const l2     = document.getElementById('p1-l2');
        const l3     = document.getElementById('p1-l3');
        const btn    = document.getElementById('p1-ready');

        typeText(l1, "Kratika...", 100, () => {
            setTimeout(() => {
                typeText(l2, "I need to ask you something very important.", 55, () => {
                    setTimeout(() => {
                        typeText(l3, "My heart is literally racing right now... 🥺💗", 50, () => {
                            setTimeout(() => {
                                btn.style.display = 'block';
                                btn.style.animation = 'cardEntrance 0.5s var(--bounce) forwards';
                            }, 800);
                        });
                    }, 500);
                });
            }, 600);
        });

        btn.addEventListener('click', () => {
            phase1.style.opacity = '0';
            phase1.style.pointerEvents = 'none';
            setTimeout(() => {
                phase1.style.display = 'none';
                startPhase2();
            }, 600);
        });
    }

    // -------- PHASE 2 --------
    function startPhase2() {
        const phase2 = document.getElementById('prop-phase2');
        const l1     = document.getElementById('p2-l1');
        const l2     = document.getElementById('p2-l2');
        const btn    = document.getElementById('p2-next');

        phase2.classList.remove('hidden');
        phase2.style.opacity = '0';
        setTimeout(() => { phase2.style.opacity = '1'; }, 50);

        typeText(l1, "You walked into my life and everything changed. You make me so happy it's almost unfair.", 40, () => {
            setTimeout(() => {
                typeText(l2, "I am completely, utterly, hopelessly in love with you. 💕", 50, () => {
                    setTimeout(() => {
                        btn.style.display = 'block';
                    }, 1000);
                });
            }, 800);
        });

        btn.addEventListener('click', () => {
            phase2.style.opacity = '0';
            phase2.style.pointerEvents = 'none';
            setTimeout(() => {
                phase2.style.display = 'none';
                startPhase3();
            }, 600);
        });
    }

    // -------- PHASE 3 --------
    function startPhase3() {
        const phase3 = document.getElementById('prop-phase3');
        phase3.classList.remove('hidden');
        phase3.style.display     = 'flex';
        phase3.style.opacity     = '0';
        phase3.style.pointerEvents = 'all';
        setTimeout(() => { phase3.style.opacity = '1'; }, 50);

        // Animate love meter fill
        setTimeout(() => {
            const fill = document.getElementById('lm-fill');
            if (fill) fill.style.width = '100%';
        }, 800);

        // Rain hearts when question shows
        setTimeout(() => rainHearts(12), 600);

        // Buttons
        const btnYes = document.getElementById('btn-yes');
        const btnNo  = document.getElementById('btn-no');
        const noMsg  = document.getElementById('no-msg');

        let noCount = 0;
        const noLines = [
            "Are you sure, my kitty? 🥺",
            "Hmm... try the pink button instead 💕",
            "That button is the WRONG one, bestie 😂",
            "Daksh.exe has stopped working 💔",
            "I'll literally beg... PLEEEASE? 🐱🙏",
            "Even the stars are rooting for YES ✨",
            "Notice how the No button is getting smaller? 👀",
            "Ok I'm going to cry... is that what you want? 😭",
            "KRATIKA. CLICK. THE. PINK. BUTTON. 💕",
            "...fine, I'll make it disappear then! ✨",
        ];

        btnNo.addEventListener('mouseover', handleNo);
        btnNo.addEventListener('touchstart', handleNo, { passive: true });
        btnNo.addEventListener('click', handleNo);

        function handleNo(e) {
            if (e && e.type !== 'touchstart') e.preventDefault();
            noCount++;

            noMsg.innerText = noLines[Math.min(noCount - 1, noLines.length - 1)];

            // YES grows even more dramatically
            const sc = Math.min(1 + noCount * 0.15, 2.8);
            btnYes.style.transform = `scale(${sc})`;
            btnYes.style.transition = 'transform 0.5s var(--bounce)';

            if (noCount >= 10) { triggerYes(); return; }

            // No runs away faster and shrinks
            const mX = (Math.random() - 0.5) * (220 + noCount * 20);
            const mY = (Math.random() - 0.5) * (150 + noCount * 10);
            const noSc = Math.max(1 - noCount * 0.08, 0.15);
            btnNo.style.transform = `translate(${mX}px, ${mY}px) scale(${noSc})`;
            btnNo.style.opacity   = `${Math.max(1 - noCount * 0.09, 0.06)}`;
        }

        btnYes.addEventListener('click', triggerYes);
    }

    // -------- TYPE HELPER --------
    function typeText(el, text, speed, cb) {
        el.innerHTML = '';
        let i = 0;
        function next() {
            if (i < text.length) {
                const char = text[i++];
                el.innerHTML += (char === ' ') ? '&nbsp;' : char;
                setTimeout(next, speed + Math.random() * 20 - 10);
            } else if (cb) cb();
        }
        next();
    }

    function triggerYes() {
        // Flash white
        const flash = document.createElement('div');
        flash.style.cssText = `
            position:fixed;inset:0;background:white;z-index:99990;
            opacity:0;pointer-events:none;transition:opacity 0.3s;
        `;
        document.body.appendChild(flash);
        setTimeout(() => { flash.style.opacity = '1'; }, 10);
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), 300);

            const propSec = document.getElementById('proposal-section');
            propSec.style.display = 'none';
            const celSec = document.getElementById('celebration-section');
            celSec.classList.remove('hidden');
            setTimeout(() => {
                launchFireworks();
                launchConfetti();
                launchRoseBurst();
            }, 100);
        }, 350);
    }

    // ===== CELEBRATION =====
    function launchRoseBurst() {
        const items = ['🌸','💕','🎉','💖','🌷','✨','💗','🥳','🎊'];
        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                const el = document.createElement('div');
                el.innerText = items[Math.floor(Math.random() * items.length)];
                el.style.cssText = `
                    position:fixed;
                    left:${Math.random()*100}vw;
                    top:${Math.random()*100}vh;
                    font-size:${Math.random()*2.5+1}rem;
                    pointer-events:none;
                    z-index:9999;
                `;
                document.body.appendChild(el);
                el.animate([
                    { transform:'scale(0) rotate(0deg)', opacity:0 },
                    { transform:`scale(${Math.random()+0.5}) rotate(${Math.random()*360}deg)`, opacity:1, offset:0.4 },
                    { transform:`scale(0) rotate(${Math.random()*720}deg)`, opacity:0 }
                ], { duration: 1800 + Math.random()*1000, delay: Math.random()*600 });
                setTimeout(() => el.remove(), 2600);
            }, i * 60);
        }
    }

    function launchConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        canvas.style.cssText = `
            display:block; position:fixed;
            top:0; left:0; width:100%; height:100%;
            z-index:9997; pointer-events:none;
        `;
        const ctx = canvas.getContext('2d');
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ['#ff6bae','#ffb3d1','#c8a8e9','#ffb347','#ffd700','#82c3ff','#a8e6cf','#ffffff'];
        const pieces = [];

        for (let i = 0; i < 200; i++) {
            pieces.push({
                x:   Math.random() * canvas.width,
                y:   Math.random() * canvas.height - canvas.height,
                w:   Math.random() * 12 + 4,
                h:   Math.random() * 12 + 4,
                c:   colors[Math.floor(Math.random() * colors.length)],
                dx:  Math.random() * 4 - 2,
                dy:  Math.random() * 3 + 2,
                rot: Math.random() * 360,
                dr:  Math.random() * 8 - 4,
                shape: Math.random() > 0.4 ? 'rect' : 'circle'
            });
        }

        let active = true;
        setTimeout(() => { active = false; }, 7000);

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pieces.forEach(p => {
                ctx.save();
                ctx.translate(p.x + p.w/2, p.y + p.h/2);
                ctx.rotate(p.rot * Math.PI / 180);
                ctx.fillStyle = p.c;
                ctx.globalAlpha = 0.9;
                if (p.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
                }
                ctx.restore();
                p.y   += p.dy;
                p.x   += p.dx;
                p.rot += p.dr;
                if (p.y > canvas.height && active) {
                    p.y = -20;
                    p.x = Math.random() * canvas.width;
                }
            });
            requestAnimationFrame(draw);
        }
        draw();
    }

    function launchFireworks() {
        const canvas = document.getElementById('fireworks-canvas');
        const ctx    = canvas.getContext('2d');
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors  = ['#ff6bae','#ffb3d1','#c8a8e9','#ffd700','#fff','#82c3ff','#a8e6cf'];
        const parts   = [];

        function burst(x, y) {
            const n = 55;
            for (let i = 0; i < n; i++) {
                const ang   = (Math.PI * 2 / n) * i + Math.random() * 0.15;
                const speed = Math.random() * 6 + 2;
                parts.push({
                    x, y,
                    vx: Math.cos(ang) * speed,
                    vy: Math.sin(ang) * speed,
                    c:  colors[Math.floor(Math.random() * colors.length)],
                    life: 1,
                    decay: Math.random() * 0.022 + 0.012,
                    size: Math.random() * 3.5 + 1
                });
            }
        }

        // Initial
        setTimeout(() => burst(canvas.width/2, canvas.height/3), 300);
        setTimeout(() => burst(canvas.width*0.25, canvas.height*0.35), 700);
        setTimeout(() => burst(canvas.width*0.75, canvas.height*0.35), 1100);
        setTimeout(() => burst(canvas.width/2, canvas.height*0.55), 1500);

        const iv = setInterval(() => {
            if (document.visibilityState === 'visible') {
                burst(Math.random() * canvas.width, Math.random() * canvas.height * 0.6);
            }
        }, 1600);
        setTimeout(() => clearInterval(iv), 10000);

        function draw() {
            ctx.fillStyle = 'rgba(255,240,247,0.18)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            for (let i = parts.length - 1; i >= 0; i--) {
                const p = parts[i];
                p.x   += p.vx;
                p.y   += p.vy;
                p.vy  += 0.055;
                p.vx  *= 0.99;
                p.life -= p.decay;
                if (p.life <= 0) { parts.splice(i, 1); continue; }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle  = p.c;
                ctx.globalAlpha = p.life;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
            requestAnimationFrame(draw);
        }
        draw();
    }

    // ===== HEART CLICK EFFECT =====
    document.addEventListener('click', e => {
        if (e.target.closest('button')) return;
        const items = ['💕','💖','🌸','✨','💗'];
        const h = document.createElement('div');
        h.innerText = items[Math.floor(Math.random() * items.length)];
        h.style.cssText = `
            position:fixed;
            left:${e.clientX}px; top:${e.clientY}px;
            font-size:1.4rem;
            pointer-events:none;
            z-index:9999;
            transform:translate(-50%,-50%);
            transition:all 0.8s ease-out;
        `;
        document.body.appendChild(h);
        requestAnimationFrame(() => {
            h.style.transform = 'translate(-50%, -80px) scale(0.5)';
            h.style.opacity   = '0';
        });
        setTimeout(() => h.remove(), 800);
    });

    // ===== HEARTBEAT COUNTER =====
    function initHeartbeatCounter() {
        const start      = new Date('2026-08-08T00:00:00').getTime();
        const hbCountEl  = document.getElementById('hb-count');
        const minsEl     = document.getElementById('hb-mins-total');
        const thoughtsEl = document.getElementById('hb-thoughts');
        const smilesEl   = document.getElementById('hb-smiles');

        // Heart beats ~75 times/min on average
        // Thoughts ~every 8 minutes waking (avg 16hrs/day)
        // Smiles — at least every time Daksh sees her (let's say every ~20 mins)
        function updateHB() {
            const diff     = Math.max(0, Date.now() - start);
            const mins     = Math.floor(diff / 60000);
            const beats    = Math.floor((diff / 1000) * 1.25); // 75/min = 1.25/sec
            const thoughts = Math.floor(mins / 8);  // once every 8 mins
            const smiles   = Math.floor(mins / 20); // once every 20 mins

            hbCountEl.innerText  = beats.toLocaleString();
            minsEl.innerText     = mins.toLocaleString();
            thoughtsEl.innerText = thoughts.toLocaleString();
            smilesEl.innerText   = smiles.toLocaleString();
        }

        updateHB();
        setInterval(updateHB, 1000);
    }

    // ===== LANGUAGE SWITCHER =====
    function initLanguageSwitcher() {
        const pills    = document.querySelectorAll('.lang-pill');
        const flagEl   = document.getElementById('lang-flag');
        const ilyEl    = document.getElementById('lang-ily');
        const nameEl   = document.getElementById('lang-name');
        const cardEl   = document.getElementById('lang-display-card');

        function switchLang(pill) {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            // Animate card out then in
            cardEl.style.transition  = 'opacity 0.25s, transform 0.25s';
            cardEl.style.opacity     = '0';
            cardEl.style.transform   = 'scale(0.9) translateY(-10px)';

            setTimeout(() => {
                flagEl.innerText = pill.dataset.flag;
                ilyEl.innerText  = pill.dataset.ily;
                nameEl.innerText = pill.dataset.lang;

                cardEl.style.transition = 'opacity 0.35s, transform 0.35s';
                cardEl.style.opacity    = '1';
                cardEl.style.transform  = 'scale(1) translateY(0)';
            }, 250);
        }

        pills.forEach(pill => {
            pill.addEventListener('click', () => switchLang(pill));
        });

        // Auto-rotate every 3 seconds
        let idx = 0;
        setInterval(() => {
            idx = (idx + 1) % pills.length;
            switchLang(pills[idx]);
        }, 3000);
    }

    // ===== DREAM CARD SCROLL REVEAL =====
    const dreamObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('in-view');
                // Random heart rain when dream section enters
                if (e.target.classList.contains('dreams-grid')) {
                    setTimeout(() => rainHearts(8), 200);
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.dream-card, .dreams-grid, .hb-stat-card, .lang-display-card').forEach(el => {
        dreamObs.observe(el);
    });

    function rainHearts(count) {
        const items = ['💕','💖','🌸','✨','💗','🌷','💝'];
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const el = document.createElement('div');
                el.innerText = items[Math.floor(Math.random() * items.length)];
                el.style.cssText = `
                    position:fixed;
                    left:${Math.random()*100}vw;
                    top:-40px;
                    font-size:${Math.random()*1.5+0.8}rem;
                    pointer-events:none;
                    z-index:9998;
                    transition: transform ${2 + Math.random()}s linear, opacity 0.5s;
                    opacity: 0.8;
                `;
                document.body.appendChild(el);
                setTimeout(() => {
                    el.style.transform = `translateY(110vh) rotate(${Math.random()*360}deg)`;
                    el.style.opacity   = '0';
                }, 50);
                setTimeout(() => el.remove(), 3000);
            }, i * 120);
        }
    }

});
