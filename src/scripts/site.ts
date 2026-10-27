/**
 * Shared behaviour for every page. Section-specific scripts live next to their section.
 * Without JS the content is fully visible and usable; prefers-reduced-motion drops the movement (site.css).
 */

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1. Scroll reveal: [data-reveal] and .dt-lines get .is-in once they enter the viewport.
//    After the reveal has played, [data-reveal] is removed so it no longer overrides the element's own transitions.
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal], .dt-lines');
  const done = (el: HTMLElement) => {
    if (el.hasAttribute('data-reveal')) {
      el.removeAttribute('data-reveal');
      el.classList.remove('is-in');
    }
  };
  if (!('IntersectionObserver' in window) || reduceMotion) {
    els.forEach((el) => {
      el.classList.add('is-in');
      done(el);
    });
    return;
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const el = e.target as HTMLElement;
        el.classList.add('is-in');
        const i = Number(getComputedStyle(el).getPropertyValue('--i')) || 0;
        window.setTimeout(() => done(el), i * 90 + 1500);
      }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  els.forEach((el) => io.observe(el));
}

// 2. Header: solid once scrolled, hides on scroll down, returns on scroll up; mobile drawer.
function initHeader() {
  const hd = document.querySelector<HTMLElement>('[data-header]');
  if (!hd) return;
  let lastY = window.scrollY;
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    hd.classList.toggle('is-scrolled', y > 24);
    if (y > lastY + 4 && y > 520 && !hd.classList.contains('is-open')) hd.classList.add('is-hidden');
    else if (y < lastY - 4 || y < 520) hd.classList.remove('is-hidden');
    if (Math.abs(y - lastY) > 4) lastY = y;
  };
  addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();

  const burger = hd.querySelector<HTMLButtonElement>('[data-burger]');
  if (burger) {
    const set = (open: boolean) => {
      hd.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.documentElement.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => set(!hd.classList.contains('is-open')));
    hd.querySelectorAll('[data-drawer] a').forEach((a) => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hd.classList.contains('is-open')) set(false);
    });
    matchMedia('(min-width: 1001px)').addEventListener('change', (e) => e.matches && set(false));
  }

  // Active section in the menu
  const links = [...hd.querySelectorAll<HTMLAnchorElement>('[data-nav] a[href^="#"]')];
  const map = new Map<Element, HTMLAnchorElement>();
  links.forEach((a) => {
    const t = document.querySelector(a.getAttribute('href')!);
    if (t) map.set(t, a);
  });
  if (map.size && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((l) => l.removeAttribute('aria-current'));
          map.get(e.target)?.setAttribute('aria-current', 'true');
        }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    map.forEach((_, t) => io.observe(t));
  }
}

// 3. Live scenes ([data-live]) animate in CSS; here they only pause while off screen (also SMIL).
function initLive() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-live]')];
  if (!els.length || reduceMotion || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) =>
    entries.forEach((e) => {
      e.target.classList.toggle('is-paused', !e.isIntersecting);
      e.target
        .querySelectorAll<SVGSVGElement>('svg')
        .forEach((svg) => (e.isIntersecting ? svg.unpauseAnimations?.() : svg.pauseAnimations?.()));
      e.target.dispatchEvent(new CustomEvent('dt:visibility', { detail: e.isIntersecting }));
    }),
  );
  els.forEach((el) => io.observe(el));
}

// 4. Count-up numbers: <b data-count="20">20</b> counts from 0 when visible.
function initCounters() {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const el = e.target as HTMLElement;
        const to = Number(el.dataset.count);
        const dur = 1400 + Math.min(900, to * 8);
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 4))));
          if (p < 1) requestAnimationFrame(step);
        };
        el.textContent = '0';
        requestAnimationFrame(step);
      }),
    { threshold: 0.5 },
  );
  els.forEach((el) => io.observe(el));
}

// 5. Copy buttons: [data-copy="text"] copies and shows a short confirmation.
function initCopy() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy!);
        btn.classList.add('is-copied');
        window.setTimeout(() => btn.classList.remove('is-copied'), 1800);
      } catch {
        /* clipboard not available: the visible link still works */
      }
    });
  });
}

// 6. Scroll-lit words ([data-words]): fallback where CSS scroll timelines are missing (sets --p per word).
function initWords() {
  if (CSS.supports('animation-timeline: view()')) return;
  const blocks = [...document.querySelectorAll<HTMLElement>('[data-words]')];
  if (!blocks.length) return;
  const words = blocks.map((b) => [...b.querySelectorAll<HTMLElement>('.dt-w')]);
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = innerHeight;
    blocks.forEach((b, k) => {
      const r = b.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const list = words[k];
      list.forEach((w, i) => w.style.setProperty('--p', p * list.length > i ? '1' : '0.16'));
    });
  };
  addEventListener('scroll', () => !ticking && ((ticking = true), requestAnimationFrame(update)), { passive: true });
  update();
}

initReveal();
initHeader();
initLive();
initCounters();
initCopy();
initWords();
