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
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.append(dot, ring);

    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
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
