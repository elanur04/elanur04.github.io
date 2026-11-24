/* Elanur Beycan — portföy etkileşimleri (kütüphanesiz) */
(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Giriş animasyonu ---------- */
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('is-loaded')));

    /* ---------- Header: kaydırınca zemin ---------- */
    const header = document.querySelector('.header');
    const onScrollHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    onScrollHeader();
    window.addEventListener('scroll', onScrollHeader, { passive: true });

    /* ---------- Mobil menü ---------- */
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('site-nav');
    const setMenu = (open) => {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) nav.querySelector('a').focus({ preventScroll: true });
    };
    toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 861px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

    /* ---------- Aktif bölümü menüde işaretle ---------- */
    const links = [...nav.querySelectorAll('a[href^="#"]')];
    const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));

    /* ---------- Kaydırınca beliren öğeler ---------- */
    const reveals = document.querySelectorAll('.reveal');
    // Aynı gruptaki kardeşlere küçük gecikme ver
    reveals.forEach(el => {
        const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
        const i = siblings.indexOf(el);
        if (i > 0) el.style.setProperty('--d', Math.min(i * 0.08, 0.4) + 's');
    });
    if ('IntersectionObserver' in window && !reduceMotion) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
        reveals.forEach(el => io.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('is-in'));
    }

    /* ---------- Zaman çizelgesi: kaydırdıkça dolan çizgi ---------- */
    const timeline = document.querySelector('.timeline');
    const tlItems = [...document.querySelectorAll('.tl-item')];
    let tlTicking = false;
    const updateTimeline = () => {
        tlTicking = false;
        const rect = timeline.getBoundingClientRect();
        const anchor = window.innerHeight * 0.6;
        const p = Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1);
        timeline.style.setProperty('--progress', p.toFixed(3));
        tlItems.forEach(item => {
            item.classList.toggle('is-passed', item.getBoundingClientRect().top + 8 < anchor);
        });
    };
    window.addEventListener('scroll', () => {
        if (!tlTicking) { tlTicking = true; requestAnimationFrame(updateTimeline); }
    }, { passive: true });
    window.addEventListener('resize', updateTimeline);
    updateTimeline();

    /* ---------- İletişim formu (e-posta uygulamasını açar) ---------- */
    const form = document.getElementById('contact-form');
    const note = document.getElementById('form-note');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const name = String(data.get('name') || '').trim();
        const email = String(data.get('email') || '').trim();
        const subject = String(data.get('subject') || '').trim() || 'Portföy üzerinden mesaj';
        const message = String(data.get('message') || '').trim();

        const fields = { name: !!name, email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), message: !!message };
        Object.entries(fields).forEach(([key, ok]) => {
            form.elements[key].setAttribute('aria-invalid', String(!ok));
        });
        const firstBad = Object.keys(fields).find(k => !fields[k]);
        if (firstBad) {
            note.classList.remove('is-ok');
            note.textContent = firstBad === 'email'
                ? 'Geçerli bir e-posta adresi girin; dönüşü bu adrese yapacağım.'
                : 'Adınızı ve mesajınızı yazın, ardından tekrar deneyin.';
            form.elements[firstBad].focus();
            return;
        }
        const body = [`Ad: ${name}`, `E-posta: ${email}`, '', message].join('\n');
        window.location.href = `mailto:beycanelanur@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        note.classList.add('is-ok');
        note.textContent = 'E-posta uygulamanız açıldı. Açılmadıysa doğrudan beycanelanur@gmail.com adresine yazabilirsiniz.';
    });

    /* ======================================================
       Hero: izometrik dijital ikiz
       Binalar yükselir, araçlar yol ağında ilerler, parlayan
       çerçeveler "yapay zekâ tespiti"ni temsil eder.
       ====================================================== */
    const canvas = document.getElementById('city');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');

    const C = {
        ground: '#e1e8e9',
        block: '#d6dfe1',
        road: '#f7f9f8',
        roadLine: 'rgba(227, 162, 58, .45)',
        top: '#ffffff',
        left: '#c8d5da',
        right: '#a7bbc5',
        edge: 'rgba(20, 34, 51, .22)',
        water: '#0d7580',
        park: '#b7dcd6',
        tree: '#4fa39a',
        car: '#e3a23a',
        ink: '#142233'
    };

    // Basit tohumlu rastgele sayı üreteci: şehir her açılışta aynı görünsün
    let seed = 7;
    const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

    const N = 13;                 // ızgara boyutu
    const isRoad = (i) => i % 4 === 0;
    const buildings = [];
    const parks = [];
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (isRoad(i) || isRoad(j)) continue;
            const dc = Math.hypot(i - N / 2, j - N / 2);
            if (rand() < 0.1) { parks.push({ i, j, trees: 1 + Math.floor(rand() * 3), r: rand() }); continue; }
            const centerBoost = Math.max(0, 1 - dc / (N * 0.55));
            const h = 0.5 + rand() * 1.6 + centerBoost * centerBoost * 3.2;
            buildings.push({
                i, j, target: h, h: 0, boost: 0, det: 0,
                inset: 0.1 + rand() * 0.08,
                delay: dc * 70 + rand() * 180
            });
        }
    }

    // Araçlar: her yol hattında iki yön
    const cars = [];
    for (let r = 0; r < N; r += 4) {
        for (const axis of ['x', 'y']) {
            const count = 2 + Math.floor(rand() * 2);
            for (let k = 0; k < count; k++) {
                const dir = rand() < 0.5 ? 1 : -1;
                cars.push({ axis, line: r, dir, t: rand() * N, v: 0.9 + rand() * 0.9 });
            }
        }
    }

    let W = 0, H = 0, tw = 0, th = 0, ox = 0, oy = 0, dpr = 1;
    const resize = () => {
        const rect = canvas.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = rect.width; H = rect.height;
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        tw = Math.min(W / (N + 0.4), (H / (N + 6)) * 2);
        th = tw / 2;
        ox = W / 2;
        oy = (H - (N + 5.8) * th) / 2 + 5.8 * th;
        if (reduceMotion) draw(performance.now());
    };

    const iso = (gx, gy, z = 0) => [ox + (gx - gy) * tw / 2, oy + (gx + gy) * th / 2 - z];

    const poly = (pts, fill, stroke, lw = 1) => {
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let k = 1; k < pts.length; k++) ctx.lineTo(pts[k][0], pts[k][1]);
        ctx.closePath();
        if (fill) { ctx.fillStyle = fill; ctx.fill(); }
        if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
    };

    const drawGround = () => {
        poly([iso(0, 0), iso(N, 0), iso(N, N), iso(0, N)], C.road);
        for (let bi = 0; bi < N; bi += 4) {
            for (let bj = 0; bj < N; bj += 4) {
                const x0 = bi + 1, y0 = bj + 1, x1 = Math.min(bi + 4, N), y1 = Math.min(bj + 4, N);
                if (x0 >= N || y0 >= N) continue;
                poly([iso(x0, y0), iso(x1, y0), iso(x1, y1), iso(x0, y1)], C.block);
            }
        }
        // yol orta çizgileri
        ctx.save();
        ctx.setLineDash([tw * 0.18, tw * 0.22]);
        ctx.strokeStyle = C.roadLine;
        ctx.lineWidth = 1;
        for (let r = 0; r < N; r += 4) {
            let a = iso(r + 0.5, 0), b = iso(r + 0.5, N);
            ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
            a = iso(0, r + 0.5); b = iso(N, r + 0.5);
            ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
        }
        ctx.restore();
        // parklar
        parks.forEach(p => {
            poly([iso(p.i + .08, p.j + .08), iso(p.i + .92, p.j + .08), iso(p.i + .92, p.j + .92), iso(p.i + .08, p.j + .92)], C.park);
        });
    };

    const drawPark = (p) => {
        for (let k = 0; k < p.trees; k++) {
            const gx = p.i + 0.3 + ((k * 0.37 + p.r) % 0.45);
            const gy = p.j + 0.3 + ((k * 0.53 + p.r * 0.7) % 0.45);
            const [x, y] = iso(gx, gy);
            ctx.fillStyle = 'rgba(20,34,51,.12)';
            ctx.beginPath(); ctx.ellipse(x, y, th * .22, th * .11, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = C.tree;
            ctx.beginPath(); ctx.arc(x, y - th * .3, th * .2, 0, Math.PI * 2); ctx.fill();
        }
    };

    const drawBuilding = (b) => {
        const z = (b.h + b.boost) * th;
        if (z < 0.5) return;
        const x0 = b.i + b.inset, y0 = b.j + b.inset, x1 = b.i + 1 - b.inset, y1 = b.j + 1 - b.inset;
        const g = [iso(x0, y0), iso(x1, y0), iso(x1, y1), iso(x0, y1)];
        const t = [iso(x0, y0, z), iso(x1, y0, z), iso(x1, y1, z), iso(x0, y1, z)];
        poly([g[3], g[2], t[2], t[3]], C.left, C.edge);   // +y yüzü
        poly([g[1], g[2], t[2], t[1]], C.right, C.edge);  // +x yüzü
        // pencere bantları
        if (b.h > 1.2) {
            ctx.strokeStyle = 'rgba(255,255,255,.35)';
            ctx.lineWidth = 1;
            for (let f = th * 0.6; f < z - th * 0.3; f += th * 0.55) {
                ctx.beginPath();
                const a = iso(x1, y0 + .1, f), c = iso(x1, y1 - .1, f);
                ctx.moveTo(a[0], a[1]); ctx.lineTo(c[0], c[1]); ctx.stroke();
            }
        }
        poly(t, C.top, C.edge);
        if (b.det > 0.01) {
            ctx.save();
            ctx.globalAlpha = Math.min(b.det, 1);
            poly(t, 'rgba(13,117,128,.16)', C.water, 2);
            // köşe işaretleri: tespit kutusu hissi
            const [cx, cy] = iso((x0 + x1) / 2, (y0 + y1) / 2, z);
            ctx.fillStyle = C.water;
            ctx.beginPath(); ctx.arc(cx, cy, 2.4, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        }
    };

    const carPos = (c) => {
        const lane = c.line + 0.5 + c.dir * 0.17;
        return c.axis === 'x' ? [c.t, lane] : [lane, c.t];
    };
    const drawCar = (c) => {
        const [gx, gy] = carPos(c);
        const [x, y] = iso(gx, gy);
        const tail = c.axis === 'x' ? iso(gx - c.dir * 0.45, gy) : iso(gx, gy - c.dir * 0.45);
        const grad = ctx.createLinearGradient(tail[0], tail[1], x, y);
        grad.addColorStop(0, 'rgba(227,162,58,0)');
        grad.addColorStop(1, 'rgba(227,162,58,.55)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(tail[0], tail[1]); ctx.lineTo(x, y); ctx.stroke();
        ctx.fillStyle = C.car;
        ctx.beginPath(); ctx.ellipse(x, y - 1.5, Math.max(3.2, tw * .09), Math.max(2.2, tw * .06), 0, 0, Math.PI * 2); ctx.fill();
    };

    // İmleç etkileşimi
    const pointer = { x: -9999, y: -9999, active: false };
    canvas.addEventListener('pointermove', (e) => {
        const r = canvas.getBoundingClientRect();
        pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.active = true;
    });
    canvas.addEventListener('pointerleave', () => { pointer.active = false; });

    let start = performance.now();
    let last = start;
    let nextDetect = start + 1800;

    const step = (now) => {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        const elapsed = now - start;

        buildings.forEach(b => {
            const k = Math.min(Math.max((elapsed - b.delay) / 900, 0), 1);
            const ease = 1 - Math.pow(1 - k, 3);
            b.h = b.target * ease;
            let want = 0;
            if (pointer.active) {
                const [cx, cy] = iso(b.i + .5, b.j + .5, b.h * th);
                const d = Math.hypot(cx - pointer.x, cy - pointer.y);
                want = Math.max(0, 1 - d / (tw * 2.2)) * 1.6;
            }
            b.boost += (want - b.boost) * Math.min(dt * 8, 1);
            b.det = Math.max(0, b.det - dt * 0.55);
        });

        if (now > nextDetect && elapsed > 1400) {
            const b = buildings[Math.floor(Math.random() * buildings.length)];
            b.det = 1.4;
            nextDetect = now + 700 + Math.random() * 900;
        }

        if (elapsed > 900) {
            cars.forEach(c => {
                // kavşağa yaklaşırken hafif yavaşlama
                const toCross = Math.abs(((c.t % 4) + 4) % 4 - 0.5);
                const slow = toCross < 0.6 ? 0.55 + toCross * 0.75 : 1;
                c.t += c.dir * c.v * slow * dt;
                if (c.t > N) c.t -= N;
                if (c.t < 0) c.t += N;
            });
        }
    };

    function draw(now) {
        ctx.clearRect(0, 0, W, H);
        drawGround();
        const items = [];
        buildings.forEach(b => items.push({ d: b.i + b.j + 1, f: () => drawBuilding(b) }));
        parks.forEach(p => items.push({ d: p.i + p.j + 0.9, f: () => drawPark(p) }));
        if (now - start > 900 || reduceMotion) {
            cars.forEach(c => { const [gx, gy] = carPos(c); items.push({ d: gx + gy, f: () => drawCar(c) }); });
        }
        items.sort((a, b) => a.d - b.d);
        items.forEach(it => it.f());
    }

    let running = false, rafId = 0;
    const loop = (now) => {
        step(now);
        draw(now);
        if (running) rafId = requestAnimationFrame(loop);
    };

    if (reduceMotion) {
        buildings.forEach(b => { b.h = b.target; });
        start = -10000;
        new ResizeObserver(resize).observe(canvas);
        resize();
        return;
    }

    new ResizeObserver(resize).observe(canvas);
    resize();

    // Ekranda değilken çizmeyi durdur
    new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !running) {
            running = true; last = performance.now(); rafId = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && running) {
            running = false; cancelAnimationFrame(rafId);
        }
    }).observe(canvas);
})();
