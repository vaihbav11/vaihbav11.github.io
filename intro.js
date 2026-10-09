/* ============================================================
   INTRO — Sudarshan Chakra
   Hand rises with the chakra spinning on its raised finger →
   the chakra is thrown, loops around the screen leaving a
   golden trail → it spirals to the centre and bursts open,
   revealing the page with the name rising in.
   Click anywhere / press Esc / tap Skip to jump straight in.
   ============================================================ */
(function(){
  const root = document.documentElement;
  const intro = document.getElementById("intro");
  if (!intro) return;

  function removeNow(){
    root.classList.remove("intro-hold", "intro-lock");
    root.classList.add("intro-done");
    intro.remove();
  }

  try {
    window.scrollTo(0, 0);

    const main = document.getElementById("chakra");
    const hand = document.getElementById("vhand");
    const veil = document.getElementById("veil");
    const ring = document.getElementById("ring");
    const W = window.innerWidth, H = window.innerHeight;

    /* ---- build the chakra: 40 slanted teeth, rings, lotus petals, hub ---- */
    const N = 40, ro = 96, ri = 76, step = 2 * Math.PI / N, pts = [];
    for (let i = 0; i < N; i++){
      const a = i * step, b = a + step * .78;
      pts.push((Math.sin(a) * ri).toFixed(1) + "," + (-Math.cos(a) * ri).toFixed(1));
      pts.push((Math.sin(b) * ro).toFixed(1) + "," + (-Math.cos(b) * ro).toFixed(1));
    }
    let petals = "";
    for (let i = 0; i < 12; i++){
      const a = i * Math.PI / 6;
      petals += `<circle cx="${(Math.sin(a) * 38).toFixed(1)}" cy="${(-Math.cos(a) * 38).toFixed(1)}" r="10"/>`;
    }
    main.firstElementChild.innerHTML = `
      <polygon points="${pts.join(" ")}" fill="url(#vgold)" stroke="#5b3a0c" stroke-width="1.5" stroke-linejoin="round"/>
      <circle r="72" fill="none" stroke="#5b3a0c" stroke-width="3"/>
      <circle r="64" fill="none" stroke="#fff3c4" stroke-opacity=".7" stroke-width="1.5"/>
      <circle r="56" fill="none" stroke="#5b3a0c" stroke-width="2" stroke-dasharray="4 5"/>
      <g fill="none" stroke="#5b3a0c" stroke-width="2">${petals}</g>
      <circle r="20" fill="url(#vgold)" stroke="#5b3a0c" stroke-width="2.5"/>
      <circle r="8" fill="#5b3a0c"/>`;

    /* ---- geometry ---- */
    const handH = hand.getBoundingClientRect().height, handW = handH * 220 / 320;   // (SVG has no offsetHeight)
    const T = {                                    // fingertip, where the chakra spins
      x: (W - handW) / 2 + handW * (69 / 220),
      y: H - handH + handH * (54 / 320) - 10
    };
    const F = { x: W / 2, y: H / 2 };              // where it bursts open
    const cx = W / 2, cy = H * .44;
    const rx = Math.min(W * .36, 520), ry = Math.min(H * .30, 330);
    const E = a => ({ x: cx + rx * Math.sin(a), y: cy - ry * Math.cos(a) });
    const a0 = 2.55;

    const START = 1500, FL = 2700;                 // idle time, flight time (ms)
    const tf = (x, y, rot, s) =>
      `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) perspective(800px) rotateX(${rot.toFixed(1)}deg) scale(${s.toFixed(3)})`;

    function sample(t){
      if (t < .14){                                // thrown off the fingertip
        const u = t / .14, e = u * (2 - u), p2 = E(a0);
        const p1 = { x: T.x + (p2.x - T.x) * .15, y: T.y - H * .2 };
        const x = (1-e)*(1-e)*T.x + 2*(1-e)*e*p1.x + e*e*p2.x;
        const y = (1-e)*(1-e)*T.y + 2*(1-e)*e*p1.y + e*e*p2.y;
        return [x, y, 70 * (1 - e), .5 + .5 * e];
      }
      if (t < .78){                                // one full loop around the screen
        const u = (t - .14) / .64, p = E(a0 - u * Math.PI * 2);
        return [p.x, p.y, 14 * Math.sin(u * Math.PI * 4), 1 + .14 * Math.sin(u * Math.PI)];
      }
      const u = (t - .78) / .22, e = u * u * (3 - 2 * u);   // spiral in to the centre
      const p0 = E(a0 - Math.PI * 2), dx = p0.x - F.x, dy = p0.y - F.y;
      const th = e * Math.PI * 2, c = Math.cos(th), s = Math.sin(th), k = 1 - e;
      return [F.x + (dx * c - dy * s) * k, F.y + (dx * s + dy * c) * k, 0, 1 + .5 * e];
    }

    const M = 110, frames = [];
    for (let i = 0; i <= M; i++){
      const t = i / M, p = sample(t);
      frames.push({ transform: tf(p[0], p[1], p[2], p[3]), offset: t });
    }

    /* ---- idle: chakra spinning on the fingertip, seen edge-on ---- */
    main.style.transform = tf(T.x, T.y, 70, .5);
    main.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: 700, fill: "both" });

    const timers = [];
    timers.push(setTimeout(() => {
      main.classList.add("fast");
      hand.animate([{ transform: "none" }, { transform: "translateY(-2%) rotate(-5deg)" }, { transform: "none" }],
                   { duration: 460, easing: "ease-in-out" });
    }, START - 60));

    /* ---- the throw: main chakra + six fading trail copies ---- */
    main.animate(frames.map(f => ({ ...f, opacity: 1 })),
                 { duration: FL, delay: START, easing: "linear", fill: "forwards" });
    for (let k = 1; k <= 6; k++){
      const c = main.cloneNode(true);
      c.removeAttribute("id"); c.classList.add("fast"); c.style.opacity = 0;
      intro.appendChild(c);
      const o = .5 - k * .07;
      c.animate(frames.map((f, i) => ({
        ...f, opacity: i === 0 || i === M ? 0 : (f.offset > .92 ? o * (1 - (f.offset - .92) / .08) : o)
      })), { duration: FL, delay: START + k * 55, easing: "linear", fill: "both" });
    }

    /* ---- the burst: iris opens from the centre, revealing the page ---- */
    let revealing = false;
    function reveal(dur, skipped){
      if (revealing) return; revealing = true;
      root.classList.remove("intro-hold");
      root.classList.add("intro-done");

      if (!skipped){
        const last = frames[frames.length - 1].transform;
        main.animate([{ transform: last, opacity: 1 },
                      { transform: tf(F.x, F.y, 0, 4.6), opacity: 0 }],
                     { duration: dur * .7, easing: "ease-in", fill: "forwards" });
      }
      hand.animate([{ opacity: 1 }, { opacity: 0 }], { duration: dur * .4, fill: "forwards" });
      ring.style.opacity = 1;

      const maxR = Math.hypot(W, H) / 2 + 90, t0 = performance.now();
      (function stepFn(now){
        const u = Math.min(1, (now - t0) / dur);
        const e = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
        const R = e * maxR;
        const m = `radial-gradient(circle at ${F.x}px ${F.y}px, transparent ${R}px, #000 ${R + 46}px)`;
        veil.style.webkitMaskImage = veil.style.maskImage = m;
        ring.style.width = ring.style.height = (2 * R) + "px";
        ring.style.transform = `translate(${F.x - R}px,${F.y - R}px)`;
        ring.style.opacity = Math.max(0, 1 - u * u * 1.2);
        if (u < 1) requestAnimationFrame(stepFn);
        else { root.classList.remove("intro-lock"); intro.remove(); }
      })(t0);
    }
    timers.push(setTimeout(() => reveal(1150, false), START + FL));

    /* ---- skip ---- */
    function skip(){
      if (revealing) return;
      timers.forEach(clearTimeout);
      intro.getAnimations({ subtree: true }).forEach(a => a.cancel());
      intro.querySelectorAll(".chakra-wrap").forEach(c => { c.style.opacity = 0; });
      hand.style.opacity = 0;
      reveal(600, true);
    }
    intro.addEventListener("click", skip);
    document.addEventListener("keydown", e => { if (e.key === "Escape") skip(); });

  } catch (err){
    removeNow();   // never leave a visitor stuck behind the intro
  }
})();
