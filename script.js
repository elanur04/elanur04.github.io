/* Elanur Beycan — portföy etkileşimleri (kütüphanesiz) */
(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const $ = (s, el = document) => el.querySelector(s);
    const $$ = (s, el = document) => [...el.querySelectorAll(s)];
    const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

    /* ---------- Header ---------- */
    const header = $('.header');
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const nav = $('#nav');
    const menuBtn = $('.menu-btn');
    const setMenu = (open) => {
        nav.classList.toggle('is-open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.textContent = open ? 'Kapat' : 'Menü';
    };
    menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
    $$('a', nav).forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); } });

    const navLinks = $$('a[href^="#"]', nav);
    const spy = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(a => { const t = $(a.getAttribute('href')); if (t) spy.observe(t); });

    /* ---------- Hafif belirme ---------- */
    const items = $$('.demo, .section-head, .section > h2, .project, .steps li, .tools > div, .refs, .contact > *');
    if ('IntersectionObserver' in window && !reduce) {
        items.forEach(el => el.classList.add('reveal'));
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
        }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
        items.forEach(el => io.observe(el));
    }

    /* ---------- Proje filtresi ---------- */
    const projects = $$('.project');
    const countEl = $('#work-count');
    $$('.chip').forEach(chip => chip.addEventListener('click', () => {
        const f = chip.dataset.filter;
        $$('.chip').forEach(c => { const on = c === chip; c.classList.toggle('is-on', on); c.setAttribute('aria-pressed', String(on)); });
        let n = 0;
        projects.forEach(p => {
            const show = f === 'all' || p.dataset.cat.split(' ').includes(f);
            p.hidden = !show;
            if (show) {
                n++;
                p.classList.add('is-in');
                if (!reduce) { p.classList.remove('is-entering'); void p.offsetWidth; p.classList.add('is-entering'); }
            }
        });
        countEl.textContent = n + ' proje gösteriliyor.';
    }));

    /* ---------- Ayrıntılar penceresi ---------- */
    const dialog = $('#case');
    const content = $('#case-content');
    $$('[data-open]').forEach(btn => btn.addEventListener('click', () => {
        const tpl = document.getElementById('case-' + btn.dataset.open);
        if (!tpl || typeof dialog.showModal !== 'function') return;
        content.replaceChildren(tpl.content.cloneNode(true));
        dialog.showModal();
        dialog.scrollTop = 0;
        document.documentElement.style.overflow = 'hidden';
    }));
    $('.case-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => { document.documentElement.style.overflow = ''; });

    /* ---------- Araçlar ---------- */
    const readout = $('#tool-readout');
    const tools = $$('.tool[data-used]');
    const showTool = (t) => {
        tools.forEach(x => x.classList.toggle('is-picked', x === t));
        readout.textContent = '';
        const b = document.createElement('strong');
        b.textContent = t.textContent;
        readout.append(b, document.createTextNode(': ' + t.dataset.used));
    };
    tools.forEach(t => {
        t.addEventListener('click', () => showTool(t));
        t.addEventListener('focus', () => showTool(t));
        if (fine) t.addEventListener('pointerenter', () => showTool(t));
    });

    /* ---------- E-posta kopyala ---------- */
    const copyBtn = $('#copy-mail');
    const copyStatus = $('#copy-status');
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText('beycanelanur@gmail.com');
            copyStatus.textContent = 'Kopyalandı.';
        } catch {
            copyStatus.textContent = 'Kopyalanamadı; adresi seçip kopyalayabilirsiniz.';
        }
        setTimeout(() => { copyStatus.textContent = ''; }, 2500);
    });

    /* ======================================================
       Hero altı: açık tonlu, yavaş bir segmentasyon çizimi
       ====================================================== */
    const canvas = $('#scan');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const COL = {
        ground: '#f6f7f6', road: '#ffffff', roof: '#e9ece9', roofEdge: '#d7dbd7',
        park: '#e4eee8', tree: '#cfe2d7', accent: '#1f7a55'
    };
    const ANGLE = -0.18, cosA = Math.cos(ANGLE), sinA = Math.sin(ANGLE);
    let seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    let W = 0, H = 0, dpr = 1, ext = 0, buildings = [], parks = [], roadsX = [], roadsY = [];
    const toScreen = (x, y) => [W / 2 + x * cosA - y * sinA, H / 2 + x * sinA + y * cosA];

    const generate = () => {
        seed = 7; buildings = []; parks = []; roadsX = []; roadsY = [];
        ext = Math.hypot(W, H) / 2 + 60;
        const mk = (arr) => { let p = -ext; while (p < ext) { const w = 10 + rnd() * 6; arr.push([p, w]); p += 100 + rnd() * 90; } };
        mk(roadsX); mk(roadsY);
        for (let i = 0; i < roadsX.length - 1; i++) for (let j = 0; j < roadsY.length - 1; j++) {
            const x0 = roadsX[i][0] + roadsX[i][1], x1 = roadsX[i + 1][0];
            const y0 = roadsY[j][0] + roadsY[j][1], y1 = roadsY[j + 1][0];
            if (rnd() < 0.08) { parks.push({ x0, y0, x1, y1, trees: Array.from({ length: 5 + Math.floor(rnd() * 6) }, () => [x0 + 8 + rnd() * (x1 - x0 - 16), y0 + 8 + rnd() * (y1 - y0 - 16), 3 + rnd() * 5]) }); continue; }
            const cols = 1 + Math.floor(rnd() * 3), rows = 1 + Math.floor(rnd() * 2);
            const cw = (x1 - x0) / cols, rh = (y1 - y0) / rows;
            for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
                if (rnd() < 0.12) continue;
                const m = 5 + rnd() * 5, bx = x0 + c * cw + m, by = y0 + r * rh + m;
                const bw = cw - m * 2 - rnd() * cw * 0.2, bh = rh - m * 2 - rnd() * rh * 0.2;
                if (bw < 12 || bh < 12) continue;
                const [sx, sy] = toScreen(bx + bw / 2, by + bh / 2);
                if (sx < -50 || sx > W + 50 || sy < -50 || sy > H + 50) continue;
                buildings.push({ x: bx, y: by, w: bw, h: bh, sx, sy, area: bw * bh, conf: (0.86 + rnd() * 0.12).toFixed(2), det: -1 });
            }
        }
        const sorted = [...buildings].sort((a, b) => b.area - a.area);
        const cut = sorted[Math.floor(sorted.length * 0.12)];
        buildings.forEach(b => { b.labeled = cut ? b.area >= cut.area : false; });
    };

    const resize = () => {
        const r = canvas.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = r.width; H = r.height;
        canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
        generate();
        if (reduce) { const now = performance.now(); buildings.forEach(b => { if (b.sx < W * 0.65) b.det = now - 2000; }); draw(now, null, 1); }
    };

    const world = () => ctx.setTransform(dpr * cosA, dpr * sinA, -dpr * sinA, dpr * cosA, dpr * W / 2, dpr * H / 2);
    const screen = () => ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    function draw(now, beamX, fade) {
        screen();
        ctx.fillStyle = COL.ground; ctx.fillRect(0, 0, W, H);
        world();
        ctx.fillStyle = COL.road;
        roadsX.forEach(([p, w]) => ctx.fillRect(p, -ext, w, ext * 2));
        roadsY.forEach(([p, w]) => ctx.fillRect(-ext, p, ext * 2, w));
        parks.forEach(pk => {
            ctx.fillStyle = COL.park; ctx.fillRect(pk.x0, pk.y0, pk.x1 - pk.x0, pk.y1 - pk.y0);
            ctx.fillStyle = COL.tree; pk.trees.forEach(([tx, ty, tr]) => { ctx.beginPath(); ctx.arc(tx, ty, tr, 0, Math.PI * 2); ctx.fill(); });
        });
        buildings.forEach(b => {
            ctx.fillStyle = COL.roof; ctx.fillRect(b.x, b.y, b.w, b.h);
            ctx.strokeStyle = COL.roofEdge; ctx.lineWidth = 1; ctx.strokeRect(b.x + .5, b.y + .5, b.w - 1, b.h - 1);
            if (beamX !== null && b.det < 0 && b.sx < beamX) b.det = now;
            const a = b.det < 0 ? 0 : clamp((now - b.det) / 500, 0, 1) * fade;
            if (a > 0.01) {
                ctx.fillStyle = `rgba(31,122,85,${(0.16 * a).toFixed(3)})`; ctx.fillRect(b.x, b.y, b.w, b.h);
                ctx.strokeStyle = `rgba(31,122,85,${(0.85 * a).toFixed(3)})`; ctx.lineWidth = 1.4; ctx.strokeRect(b.x, b.y, b.w, b.h);
            }
        });
        screen();
        if (beamX !== null && beamX > -20 && beamX < W + 20) {
            ctx.fillStyle = 'rgba(31,122,85,.5)'; ctx.fillRect(beamX - .5, 0, 1, H);
        }
        ctx.font = '500 10.5px Geist, system-ui, sans-serif';
        buildings.forEach(b => {
            if (!b.labeled || b.det < 0) return;
            const a = clamp((now - b.det - 300) / 500, 0, 1) * fade;
            if (a <= 0) return;
            const [lx, ly] = toScreen(b.x, b.y);
            const txt = 'bina ' + b.conf, w = ctx.measureText(txt).width + 8;
            ctx.globalAlpha = a;
            ctx.fillStyle = COL.accent; ctx.fillRect(lx, ly - 15, w, 15);
            ctx.fillStyle = '#ffffff'; ctx.fillText(txt, lx + 4, ly - 4);
            ctx.globalAlpha = 1;
        });
    }

    new ResizeObserver(resize).observe(canvas);
    resize();
    if (reduce) return;

    const SWEEP = 7000, HOLD = 3500;
    const start = performance.now() + 400;
    let running = false, raf = 0, lastT = 0;
    const loop = (now) => {
        let beamX = null, fade = 1;
        if (now >= start) {
            const t = (now - start) % (SWEEP + HOLD);
            if (t < lastT) buildings.forEach(b => { b.det = -1; });
            lastT = t;
            beamX = t < SWEEP ? (t / SWEEP) * (W + 40) - 20 : W + 40;
            const from = SWEEP + HOLD - 900;
            if (t > from) fade = 1 - (t - from) / 900;
        }
        draw(now, beamX, fade);
        if (running) raf = requestAnimationFrame(loop);
    };
    new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !running) { running = true; raf = requestAnimationFrame(loop); }
        else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
    }).observe(canvas);
})();
