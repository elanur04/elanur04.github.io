/* Elanur Beycan — portföy etkileşimleri (kütüphanesiz) */
(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const desktopMQ = window.matchMedia('(min-width: 961px)');
    const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
    const $ = (s, el = document) => el.querySelector(s);
    const $$ = (s, el = document) => [...el.querySelectorAll(s)];

    /* ---------- Karşılama perdesi ---------- */
    const curtain = $('#curtain');
    let introResolve;
    const introDone = new Promise(r => { introResolve = r; });
    let finished = false;
    const finishIntro = () => {
        if (finished) return;
        finished = true;
        if (curtain) curtain.classList.add('is-done');
        setTimeout(() => { root.classList.add('is-loaded'); introResolve(); }, 300);
        setTimeout(() => curtain && curtain.remove(), 1400);
    };
    if (curtain && !reduce) {
        const num = $('#curtain-num');
        const t0 = performance.now();
        const tick = (now) => {
            const k = clamp((now - t0) / 1150, 0, 1);
            num.textContent = Math.round((1 - Math.pow(1 - k, 3)) * 100);
            if (k < 1) requestAnimationFrame(tick); else setTimeout(finishIntro, 120);
        };
        requestAnimationFrame(tick);
        curtain.addEventListener('click', finishIntro);
    } else {
        requestAnimationFrame(finishIntro);
    }

    /* ---------- Başlıkları kelimelere böl ---------- */
    $$('[data-split]').forEach(el => {
        const words = el.textContent.trim().split(/\s+/);
        el.setAttribute('aria-label', words.join(' '));
        el.textContent = '';
        words.forEach((w, i) => {
            const outer = document.createElement('span');
            outer.className = 'w';
            outer.setAttribute('aria-hidden', 'true');
            const inner = document.createElement('span');
            inner.style.setProperty('--i', i);
            inner.textContent = w;
            outer.appendChild(inner);
            el.appendChild(outer);
            if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
        });
    });

    /* ---------- Kaydırınca beliren öğeler ---------- */
    const revealSel = '.hero-lead, .facts > div, .hero-actions, .tool-row, .ref, .refs-note, .contact-lead, .mail-row, .contact-links';
    $$(revealSel).forEach(el => {
        el.classList.add('reveal');
        const sib = [...el.parentElement.children].filter(c => c.matches(revealSel));
        const i = sib.indexOf(el);
        if (i > 0) el.style.setProperty('--d', Math.min(i * 0.08, 0.4) + 's');
    });
    const toReveal = $$('.reveal, [data-split]');
    if ('IntersectionObserver' in window && !reduce) {
        const revealIO = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); revealIO.unobserve(e.target); } });
        }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
        toReveal.forEach(el => revealIO.observe(el));
    } else {
        toReveal.forEach(el => el.classList.add('is-in'));
    }

    /* ---------- Header ve menü ---------- */
    const header = $('.header');
    const nav = $('#nav');
    const menuBtn = $('.menu-btn');
    const heroStage = $('.hero-stage');
    const setMenu = (open) => {
        nav.classList.toggle('is-open', open);
        header.classList.toggle('menu-open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
        document.body.style.overflow = open ? 'hidden' : '';
    };
    menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
    $$('a', nav).forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); } });
    window.matchMedia('(min-width: 761px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

    const navLinks = $$('a[href^="#"]', nav);
    const spy = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(a => { const t = $(a.getAttribute('href')); if (t) spy.observe(t); });

    /* ---------- İşler: yatay 3B galeri ve filtre ---------- */
    const pin = $('.work-pin');
    const track = $('.work-track');
    const panels = $$('.panel');
    let dist = 0;
    const layoutGallery = () => {
        if (desktopMQ.matches) {
            dist = Math.max(0, track.scrollWidth - window.innerWidth);
            pin.style.height = (window.innerHeight + dist) + 'px';
        } else {
            dist = 0;
            pin.style.height = '';
        }
    };
    window.addEventListener('resize', layoutGallery);
    desktopMQ.addEventListener('change', layoutGallery);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutGallery);
    layoutGallery();

    // Mobilde şemaları görünür olunca çiz
    const litIO = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting && !desktopMQ.matches) e.target.classList.add('is-lit'); });
    }, { threshold: 0.35 });
    panels.forEach(p => litIO.observe(p));
    if (reduce) panels.forEach(p => p.classList.add('is-lit'));

    const countEl = $('#work-count');
    $$('.chip').forEach(chip => chip.addEventListener('click', () => {
        const f = chip.dataset.filter;
        $$('.chip').forEach(c => { const on = c === chip; c.classList.toggle('is-on', on); c.setAttribute('aria-pressed', String(on)); });
        let n = 0;
        panels.forEach(p => {
            const show = f === 'all' || p.dataset.cat.split(' ').includes(f);
            p.hidden = !show;
            if (show) {
                n++;
                p.classList.remove('is-entering');
                void p.offsetWidth;
                p.classList.add('is-entering');
            }
        });
        countEl.textContent = n + ' proje gösteriliyor.';
        layoutGallery();
        const top = $('#work').getBoundingClientRect().top + window.scrollY;
        if (window.scrollY > top + 200) window.scrollTo({ top: top - 20, behavior: reduce ? 'auto' : 'smooth' });
    }));
    panels.forEach(p => p.addEventListener('animationend', () => p.classList.remove('is-entering')));

    /* ---------- Vaka çalışması penceresi ---------- */
    const dialog = $('#case');
    const caseContent = $('#case-content');
    $$('[data-open]').forEach(btn => btn.addEventListener('click', () => {
        const tpl = document.getElementById('case-' + btn.dataset.open);
        if (!tpl) return;
        caseContent.replaceChildren(tpl.content.cloneNode(true));
        if (typeof dialog.showModal === 'function') {
            dialog.showModal();
            root.style.overflow = 'hidden';
            dialog.querySelector('.case-card').scrollTop = 0;
        }
    }));
    $('.case-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => { root.style.overflow = ''; });

    /* ---------- Araç kutusu: araç → proje ---------- */
    const readout = $('#tool-readout');
    const tools = $$('.tool-row li[data-used]');
    const showTool = (li) => {
        tools.forEach(t => t.classList.toggle('is-picked', t === li));
        readout.textContent = '';
        const b = document.createElement('strong');
        b.textContent = li.textContent;
        readout.appendChild(b);
        readout.appendChild(document.createTextNode(' kullanıldığı proje: ' + li.dataset.used));
    };
    tools.forEach(li => {
        li.addEventListener('pointerenter', () => showTool(li));
        li.addEventListener('focus', () => showTool(li));
        li.addEventListener('click', () => showTool(li));
    });

    /* ---------- E-posta kopyala ---------- */
    const copyBtn = $('#copy-mail');
    const copyStatus = $('#copy-status');
    copyBtn.addEventListener('click', async () => {
        const mail = 'beycanelanur@gmail.com';
        try {
            await navigator.clipboard.writeText(mail);
            copyStatus.textContent = 'Adres kopyalandı.';
            copyBtn.textContent = 'Kopyalandı';
        } catch {
            copyStatus.textContent = 'Kopyalanamadı; adresi seçip kopyalayabilirsiniz: ' + mail;
        }
        setTimeout(() => { copyBtn.textContent = 'Adresi kopyala'; }, 2400);
    });

    /* ---------- Ana döngü: ilerleme, hero, galeri, imleç ---------- */
    const bar = $('.progress span');
    const hero = $('.hero');
    const cursor = $('.cursor');
    let cx = -100, cy = -100, tcx = -100, tcy = -100;

    const frame = () => {
        const vh = window.innerHeight, vw = window.innerWidth, y = window.scrollY;
        const max = document.documentElement.scrollHeight - vh;
        bar.style.setProperty('--sp', max > 0 ? (y / max).toFixed(4) : 0);

        const stageH = heroStage.offsetHeight;
        hero.style.setProperty('--hp', clamp(y / stageH, 0, 1).toFixed(4));
        header.classList.toggle('is-solid', y > stageH - 80);

        if (desktopMQ.matches && dist > 0) {
            const r = pin.getBoundingClientRect();
            const span = pin.offsetHeight - vh;
            const p = span > 0 ? clamp(-r.top / span, 0, 1) : 0;
            const x = -p * dist;
            track.style.setProperty('--x', x.toFixed(1) + 'px');
            panels.forEach(pn => {
                if (pn.hidden) return;
                const c = pn.offsetLeft + x + pn.offsetWidth / 2;
                const off = (c - vw / 2) / vw;
                const a = Math.abs(off);
                pn.style.setProperty('--ry', clamp(-off * 42, -38, 38).toFixed(2) + 'deg');
                pn.style.setProperty('--tz', (-a * 260).toFixed(1) + 'px');
                pn.style.setProperty('--po', (1 - Math.min(a * 0.25, 0.2)).toFixed(3));
                if (a < 0.32 && r.top < vh * 0.5) pn.classList.add('is-lit');
            });
        }

        if (fine && cursor) {
            cx += (tcx - cx) * 0.22;
            cy += (tcy - cy) * 0.22;
            cursor.style.setProperty('--cx', cx.toFixed(1) + 'px');
            cursor.style.setProperty('--cy', cy.toFixed(1) + 'px');
        }
        requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);

    /* ---------- İmleç, eğilen kartlar, mıknatıslı butonlar ---------- */
    if (fine && !reduce) {
        window.addEventListener('pointermove', e => { tcx = e.clientX; tcy = e.clientY; cursor.classList.remove('is-hidden'); }, { passive: true });
        document.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));
        document.addEventListener('pointerover', e => {
            cursor.classList.toggle('is-hover', !!e.target.closest('a, button, [data-tilt], .tool-row li[data-used], canvas'));
        });

        $$('[data-tilt]').forEach(el => {
            el.addEventListener('pointermove', e => {
                const r = el.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width, yy = (e.clientY - r.top) / r.height;
                el.classList.add('is-tilting');
                el.style.setProperty('--tx', ((x - 0.5) * 16).toFixed(2) + 'deg');
                el.style.setProperty('--ty', ((0.5 - yy) * 16).toFixed(2) + 'deg');
            });
            el.addEventListener('pointerleave', () => {
                el.classList.remove('is-tilting');
                el.style.setProperty('--tx', '0deg');
                el.style.setProperty('--ty', '0deg');
            });
        });

        $$('[data-magnet]').forEach(el => {
            el.addEventListener('pointermove', e => {
                const r = el.getBoundingClientRect();
                el.classList.add('is-pulling');
                el.style.setProperty('--bx', ((e.clientX - r.left - r.width / 2) * 0.3).toFixed(1) + 'px');
                el.style.setProperty('--by', ((e.clientY - r.top - r.height / 2) * 0.4).toFixed(1) + 'px');
            });
            el.addEventListener('pointerleave', () => {
                el.classList.remove('is-pulling');
                el.style.setProperty('--bx', '0px');
                el.style.setProperty('--by', '0px');
            });
        });
    }

    /* ======================================================
       Hero: uydu görüntüsü üzerinde canlı segmentasyon
       Tarama ışını geçtikçe binalar maskelenir; imleçle
       yakındaki tespitler incelenir.
       ====================================================== */
    const canvas = $('#scan');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const COL = {
        ground: '#0b1f4b', road: '#12285b', lane: 'rgba(120,150,220,.18)',
        roof: '#17326f', roofEdge: '#26468a', shadow: '#071431',
        park: '#103462', tree: '#1c4c80',
        mag: '#e0115f', label: '#ffffff'
    };
    const ANGLE = -0.21;
    const cosA = Math.cos(ANGLE), sinA = Math.sin(ANGLE);

    let seed = 11;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

    let W = 0, H = 0, dpr = 1, buildings = [], parks = [], roadsX = [], roadsY = [], ext = 0;

    const toScreen = (x, y) => [W / 2 + x * cosA - y * sinA, H / 2 + x * sinA + y * cosA];

    const generate = () => {
        seed = 11;
        buildings = []; parks = []; roadsX = []; roadsY = [];
        ext = Math.hypot(W, H) / 2 + 80;
        const mk = (arr) => { let p = -ext; while (p < ext) { const w = 12 + rnd() * 10; arr.push([p, w]); p += 120 + rnd() * 110; } };
        mk(roadsX); mk(roadsY);
        for (let i = 0; i < roadsX.length - 1; i++) {
            for (let j = 0; j < roadsY.length - 1; j++) {
                const x0 = roadsX[i][0] + roadsX[i][1], x1 = roadsX[i + 1][0];
                const y0 = roadsY[j][0] + roadsY[j][1], y1 = roadsY[j + 1][0];
                if (x1 - x0 < 30 || y1 - y0 < 30) continue;
                if (rnd() < 0.09) { parks.push({ x0, y0, x1, y1, trees: Array.from({ length: 6 + Math.floor(rnd() * 8) }, () => [x0 + 8 + rnd() * (x1 - x0 - 16), y0 + 8 + rnd() * (y1 - y0 - 16), 4 + rnd() * 6]) }); continue; }
                // bloğu parsellere böl
                const cols = 1 + Math.floor(rnd() * 3), rows = 1 + Math.floor(rnd() * 2);
                const cw = (x1 - x0) / cols, rh = (y1 - y0) / rows;
                for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
                    if (rnd() < 0.12) continue;
                    const m = 5 + rnd() * 6;
                    const bx = x0 + c * cw + m, by = y0 + r * rh + m;
                    const bw = cw - m * 2 - rnd() * cw * 0.25, bh = rh - m * 2 - rnd() * rh * 0.25;
                    if (bw < 14 || bh < 14) continue;
                    const [sx, sy] = toScreen(bx + bw / 2, by + bh / 2);
                    if (sx < -60 || sx > W + 60 || sy < -60 || sy > H + 60) continue;
                    buildings.push({ x: bx, y: by, w: bw, h: bh, sx, sy, area: bw * bh, conf: (0.86 + rnd() * 0.12).toFixed(2), det: -1, hov: 0 });
                }
            }
        }
        const sorted = [...buildings].sort((a, b) => b.area - a.area);
        const cut = sorted[Math.floor(sorted.length * 0.18)];
        buildings.forEach(b => { b.labeled = cut ? b.area >= cut.area : false; });
    };

    const resize = () => {
        const r = canvas.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = r.width; H = r.height;
        canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
        generate();
        if (reduce) drawStatic();
    };

    const pointer = { x: -999, y: -999, on: false };
    canvas.addEventListener('pointermove', e => { const r = canvas.getBoundingClientRect(); pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.on = true; });
    canvas.addEventListener('pointerdown', e => { const r = canvas.getBoundingClientRect(); pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.on = true; });
    canvas.addEventListener('pointerleave', () => { pointer.on = false; });
    if (!fine) { const cap = $('.hero-caption'); if (cap) cap.textContent = 'Canlı demo: uydu görüntüsü üzerinde bina segmentasyonu. Haritaya dokunarak tespitleri inceleyin.'; }

    let beamStart = Infinity;
    const SWEEP = 5200, HOLD = 3800;
    introDone.then(() => { beamStart = performance.now(); });

    const label = (text, x, y, strong) => {
        ctx.font = '600 11px "Red Hat Text", sans-serif';
        const w = ctx.measureText(text).width + 10;
        ctx.fillStyle = strong ? '#ffffff' : COL.mag;
        ctx.fillRect(x, y - 16, w, 16);
        ctx.fillStyle = strong ? COL.mag : '#ffffff';
        ctx.fillText(text, x + 5, y - 4.5);
    };

    const drawScene = (now, beamX, fade = 1) => {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = COL.ground;
        ctx.fillRect(0, 0, W, H);

        // dünya koordinatları (döndürülmüş)
        ctx.setTransform(dpr * cosA, dpr * sinA, -dpr * sinA, dpr * cosA, dpr * W / 2, dpr * H / 2);
        ctx.fillStyle = COL.road;
        roadsX.forEach(([p, w]) => ctx.fillRect(p, -ext, w, ext * 2));
        roadsY.forEach(([p, w]) => ctx.fillRect(-ext, p, ext * 2, w));
        ctx.strokeStyle = COL.lane; ctx.lineWidth = 1; ctx.setLineDash([10, 12]);
        ctx.beginPath();
        roadsX.forEach(([p, w]) => { ctx.moveTo(p + w / 2, -ext); ctx.lineTo(p + w / 2, ext); });
        roadsY.forEach(([p, w]) => { ctx.moveTo(-ext, p + w / 2); ctx.lineTo(ext, p + w / 2); });
        ctx.stroke(); ctx.setLineDash([]);

        parks.forEach(pk => {
            ctx.fillStyle = COL.park; ctx.fillRect(pk.x0, pk.y0, pk.x1 - pk.x0, pk.y1 - pk.y0);
            ctx.fillStyle = COL.tree;
            pk.trees.forEach(([tx, ty, tr]) => { ctx.beginPath(); ctx.arc(tx, ty, tr, 0, Math.PI * 2); ctx.fill(); });
        });

        let nearest = null, nd = 1e9;
        buildings.forEach(b => {
            ctx.fillStyle = COL.shadow; ctx.fillRect(b.x + 4, b.y + 5, b.w, b.h);
            ctx.fillStyle = COL.roof; ctx.fillRect(b.x, b.y, b.w, b.h);
            ctx.strokeStyle = COL.roofEdge; ctx.lineWidth = 1; ctx.strokeRect(b.x + .5, b.y + .5, b.w - 1, b.h - 1);

            if (beamX !== null && b.sx < beamX && b.det < 0) b.det = now;
            const age = b.det < 0 ? -1 : now - b.det;
            const a = age < 0 ? 0 : clamp(age / 350, 0, 1) * fade;
            if (pointer.on) {
                const d = Math.hypot(b.sx - pointer.x, b.sy - pointer.y);
                if (d < nd) { nd = d; nearest = b; }
                b.hov += ((d < 130 ? 1 : 0) - b.hov) * 0.18;
            } else b.hov *= 0.85;
            const vis = Math.max(a, b.hov);
            if (vis > 0.01) {
                ctx.fillStyle = `rgba(224,17,95,${(0.34 * vis).toFixed(3)})`;
                ctx.fillRect(b.x, b.y, b.w, b.h);
                ctx.strokeStyle = b.hov > a ? `rgba(255,255,255,${vis.toFixed(3)})` : `rgba(224,17,95,${vis.toFixed(3)})`;
                ctx.lineWidth = 1.8; ctx.strokeRect(b.x, b.y, b.w, b.h);
            }
        });

        // ekran koordinatları: ışın ve etiketler
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (beamX !== null && beamX > -50 && beamX < W + 50) {
            const g = ctx.createLinearGradient(beamX - 220, 0, beamX, 0);
            g.addColorStop(0, 'rgba(224,17,95,0)'); g.addColorStop(1, 'rgba(224,17,95,.22)');
            ctx.fillStyle = g; ctx.fillRect(beamX - 220, 0, 220, H);
            ctx.fillStyle = COL.mag; ctx.fillRect(beamX - 1, 0, 2, H);
        }
        buildings.forEach(b => {
            const age = b.det < 0 ? -1 : now - b.det;
            if ((b.labeled && age > 200) || b.hov > 0.6) {
                const [lx, ly] = toScreen(b.x, b.y);
                ctx.globalAlpha = Math.max(clamp((age - 200) / 400, 0, 1) * (b.labeled ? fade : 0), b.hov);
                label('bina ' + b.conf, lx, ly, b.hov > 0.6);
                ctx.globalAlpha = 1;
            }
        });
        if (pointer.on && nearest && nd < 160) {
            // köşe işaretleri
            ctx.setTransform(dpr * cosA, dpr * sinA, -dpr * sinA, dpr * cosA, dpr * W / 2, dpr * H / 2);
            const b = nearest, k = 8, p = 6;
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath();
            [[b.x - p, b.y - p, 1, 1], [b.x + b.w + p, b.y - p, -1, 1], [b.x - p, b.y + b.h + p, 1, -1], [b.x + b.w + p, b.y + b.h + p, -1, -1]]
                .forEach(([x, y, dx, dy]) => { ctx.moveTo(x, y + dy * k); ctx.lineTo(x, y); ctx.lineTo(x + dx * k, y); });
            ctx.stroke();
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
    };

    const drawStatic = () => {
        const now = performance.now();
        buildings.forEach(b => { if (b.sx < W * 0.62) b.det = now - 2000; });
        drawScene(now, W * 0.62);
    };

    let running = false, raf = 0, lastT = 0;
    const loop = (now) => {
        let beamX = null, fade = 1;
        if (now >= beamStart) {
            const t = (now - beamStart) % (SWEEP + HOLD);
            if (t < lastT) buildings.forEach(b => { b.det = -1; });   // yeni tarama
            lastT = t;
            beamX = t < SWEEP ? -40 + (t / SWEEP) * (W + 80) : W + 100;
            const fadeFrom = SWEEP + HOLD - 700;
            if (t > fadeFrom) fade = 1 - (t - fadeFrom) / 700;    // maskeler yavaşça söner
        }
        drawScene(now, beamX, fade);
        if (running) raf = requestAnimationFrame(loop);
    };

    new ResizeObserver(resize).observe(canvas);
    resize();
    if (reduce) return;
    new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !running) { running = true; raf = requestAnimationFrame(loop); }
        else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
    }).observe(canvas);
})();
