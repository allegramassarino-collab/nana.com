/* ============================================
   nanà — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- preloader ---------- */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hide'), 700);
    });
    // fallback in case 'load' already fired
    setTimeout(() => preloader.classList.add('hide'), 2200);
  }

  /* ---------- nav shrink on scroll ---------- */
  const nav = document.querySelector('header.nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  const burger = document.querySelector('.burger');
  const mobilePanel = document.querySelector('.mobile-panel');
  if (burger && mobilePanel) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobilePanel.classList.toggle('open');
    });
    mobilePanel.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobilePanel.classList.remove('open');
      });
    });
  }

  /* ---------- custom cursor (desktop only) ---------- */
  if (window.matchMedia('(hover: hover)').matches) {
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.append(ring);

    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
    });
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    };
    loop();

    document.querySelectorAll('a, button, .card, .filter-pill').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('is-active'));
      el.addEventListener('mouseleave', () => ring.classList.remove('is-active'));
    });
  }

  /* ---------- split hero title into animated words/letters ---------- */
  document.querySelectorAll('[data-split]').forEach(el => {
    const words = el.textContent.trim().split(' ');
    el.innerHTML = words.map((w, wi) => {
      const letters = w.split('').map((ch, li) => {
        const delay = (wi * 0.1 + li * 0.03).toFixed(2);
        return `<span style="animation-delay:${delay}s">${ch}</span>`;
      }).join('');
      return `<span class="word">${letters}</span>`;
    }).join(' ');
  });

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- 3D tilt on product cards ---------- */
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(700px) rotateY(0) rotateX(0) translateY(0)';
    });
  });

  /* ---------- magnetic buttons ---------- */
  document.querySelectorAll('.magnetic').forEach(m => {
    m.addEventListener('mousemove', (e) => {
      const r = m.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      m.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    m.addEventListener('mouseleave', () => { m.style.transform = 'translate(0,0)'; });
  });

  /* ---------- marquee: duplicate content for seamless loop ---------- */
  document.querySelectorAll('.marquee-track').forEach(track => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- color filters (collezione page) ---------- */
  const pills = document.querySelectorAll('.filter-pill');
  const products = document.querySelectorAll('[data-color]');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;
      products.forEach(p => {
        const match = filter === 'all' || p.dataset.color === filter;
        p.classList.toggle('product-hide', !match);
      });
    });
  });

  /* preselect a collezione filter from ?colore=xxx (e.g. coming from the quiz) */
  const urlColor = new URLSearchParams(location.search).get('colore');
  if (urlColor) {
    const matchPill = document.querySelector(`.filter-pill[data-filter="${urlColor}"]`);
    if (matchPill) matchPill.click();
  }

  /* ---------- stack builder (collezione page) ---------- */
  const stackPreview = document.getElementById('stack-preview');
  if (stackPreview) {
    const stack = [];
    const emptyHint = document.getElementById('stack-empty-hint');
    const sendBtn = document.getElementById('stack-send');
    const colorLabels = { orange:'Arancio', red:'Rosso', pink:'Fucsia', teal:'Turchese', green:'Verde', blue:'Blu', purple:'Lilla' };
    const diamondLabels = { large:'con diamante grande', small:'con diamante piccolo', multi:'con più diamanti piccoli', none:'senza diamante' };
    const MAX_RINGS = 6;
    let currentDiamond = 'large';

    const diamondButtons = document.querySelectorAll('.diamond-option');
    diamondButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        diamondButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDiamond = btn.dataset.size;
      });
    });

    const renderStack = () => {
      stackPreview.querySelectorAll('.stack-ring-bar').forEach(el => el.remove());
      stack.forEach(item => {
        const bar = document.createElement('div');
        bar.className = `stack-ring-bar swatch-${item.color}`;
        if (item.diamond === 'large' || item.diamond === 'small') {
          const diamond = document.createElement('div');
          diamond.className = `stack-diamond diamond-${item.diamond}`;
          bar.appendChild(diamond);
        } else if (item.diamond === 'multi') {
          const row = document.createElement('div');
          row.className = 'stack-diamonds-row';
          for (let i = 0; i < 5; i++) {
            const d = document.createElement('div');
            d.className = 'stack-diamond diamond-small';
            row.appendChild(d);
          }
          bar.appendChild(row);
        }
        stackPreview.appendChild(bar);
      });
      emptyHint.hidden = stack.length > 0;
      if (stack.length > 0) {
        const labels = stack.map(item => `${colorLabels[item.color]} (${diamondLabels[item.diamond]})`).join(', ');
        const text = encodeURIComponent(`Ciao nanà! Mi piacerebbe uno stack con: ${labels} 💕`);
        sendBtn.href = `https://wa.me/393498881684?text=${text}`;
        sendBtn.style.pointerEvents = 'auto';
        sendBtn.style.opacity = '1';
      } else {
        sendBtn.href = '#';
        sendBtn.style.pointerEvents = 'none';
        sendBtn.style.opacity = '.5';
      }
    };

    document.querySelectorAll('.stack-swatch').forEach(btn => {
      btn.addEventListener('click', () => {
        if (stack.length >= MAX_RINGS) return;
        stack.push({ color: btn.dataset.color, diamond: currentDiamond });
        renderStack();
      });
    });
    const undoBtn = document.getElementById('stack-undo');
    const clearBtn = document.getElementById('stack-clear');
    if (undoBtn) undoBtn.addEventListener('click', () => { stack.pop(); renderStack(); });
    if (clearBtn) clearBtn.addEventListener('click', () => { stack.length = 0; renderStack(); });
  }

  /* ---------- quiz "che colore sei" (quiz page) ---------- */
  const quizCard = document.querySelector('.quiz-card');
  if (quizCard) {
    const questions = Array.from(quizCard.querySelectorAll('.quiz-question'));
    const progressBar = document.getElementById('quiz-progress-bar');
    const resultBox = document.getElementById('quiz-result');
    const scores = {};
    let current = 0;

    const results = {
      orange: { name: 'Arancio', ring: 'Anello Mandarino', text: 'Sei energia pura: hai voglia di brillare e trascinare chi ti sta intorno. Il tuo anello è il Mandarino, smalto arancio acceso per chi non passa mai inosservata.' },
      red:    { name: 'Rosso', ring: 'Anello Ciliegia', text: 'Sei carattere e decisione. Il tuo colore è il Rosso: l’Anello Ciliegia, intenso e sicuro di sé, esattamente come te.' },
      pink:   { name: 'Fucsia', ring: 'Anello Fucsia', text: 'Sei IL colore nanà: audace, originale, mai banale. Il tuo anello è il Fucsia, il più iconico della collezione.' },
      teal:   { name: 'Turchese', ring: 'Anello Turchese', text: 'Sei leggerezza e libertà, ti porti dietro l’estate ovunque tu vada. Il tuo anello è il Turchese.' },
      green:  { name: 'Verde', ring: 'Anello Lime', text: 'Sei energia naturale, vivace e originale. Il tuo anello è il Lime.' },
      blue:   { name: 'Blu', ring: 'Anello Oceano', text: 'Sei profondità e calma, con un fondo di mistero. Il tuo anello è l’Oceano.' },
      purple: { name: 'Lilla', ring: 'Anello Lilla', text: 'Sei eleganza discreta con un tocco sognante. Il tuo anello è il Lilla.' },
    };

    const showQuestion = (i) => {
      questions.forEach((q, idx) => { q.hidden = idx !== i; });
      progressBar.style.width = `${(i / questions.length) * 100}%`;
    };

    const finish = () => {
      progressBar.style.width = '100%';
      questions.forEach(q => { q.hidden = true; });
      const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
      const r = results[winner];
      document.getElementById('quiz-result-swatch').className = `quiz-result-swatch swatch-${winner}`;
      document.getElementById('quiz-result-name').textContent = r.name;
      document.getElementById('quiz-result-text').textContent = r.text;
      const waText = encodeURIComponent(`Ciao nanà! Il quiz mi ha detto che il mio colore è ${r.name} 💕 Vorrei info sul ${r.ring}!`);
      document.getElementById('quiz-result-wa').href = `https://wa.me/393498881684?text=${waText}`;
      document.getElementById('quiz-result-collection').href = `collezione.html?colore=${winner}`;
      resultBox.hidden = false;
    };

    quizCard.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const color = btn.dataset.color;
        scores[color] = (scores[color] || 0) + 1;
        current++;
        if (current < questions.length) showQuestion(current);
        else finish();
      });
    });

    const restartBtn = document.getElementById('quiz-restart');
    if (restartBtn) restartBtn.addEventListener('click', () => {
      Object.keys(scores).forEach(k => delete scores[k]);
      current = 0;
      resultBox.hidden = true;
      showQuestion(0);
    });
  }

  /* ---------- animated counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString('it-IT');
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString('it-IT');
      };
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => cio.observe(c));

  /* ---------- accordion ---------- */
  document.querySelectorAll('.accordion-item').forEach(item => {
    const head = item.querySelector('.accordion-head');
    const body = item.querySelector('.accordion-body');
    head.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-body').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* ---------- contact form -> WhatsApp ---------- */
  const waForm = document.getElementById('wa-form');
  if (waForm) {
    waForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('f-name').value.trim();
      const message = document.getElementById('f-message').value.trim();
      const text = encodeURIComponent(`Ciao nanà! Sono ${name}. ${message}`);
      window.open(`https://wa.me/393498881684?text=${text}`, '_blank');
    });
  }

});
