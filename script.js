/* ============================================================
   SITE ENGINE
   ------------------------------------------------------------
   This reads everything from data.js and builds the page.
   You normally do NOT need to edit this file.
   ============================================================ */

/* ---------- small helpers ---------- */
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ============================================================
   1. BASICS + HERO
   ============================================================ */
/* ---------- quote banner: shows on first scroll, flies into the logo, reopens on logo click ---------- */
(function(){
  const textEl = $("quoteText"), authorEl = $("quoteAuthor"), banner = $("quoteBanner");
  const logo = document.querySelector(".logo-mark");
  if (!textEl || !banner || typeof QUOTES === "undefined" || !QUOTES.length) return;

  let bag = [];
  function refillBag(){
    bag = QUOTES.map((_, i) => i);
    for (let i = bag.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
  }
  function fitSingleLine(){
    const MAX = 14.5, MIN = 9.5;
    textEl.style.fontSize = MAX + "px";
    let size = MAX;
    // shrink in small steps until the text no longer needs to wrap/clip
    while (textEl.scrollWidth > textEl.clientWidth && size > MIN){
      size -= 0.5;
      textEl.style.fontSize = size + "px";
    }
  }

  function pickQuote(){
    if (!bag.length) refillBag();
    const q = QUOTES[bag.pop()];
    textEl.textContent = q.text;
    authorEl.textContent = q.author;
    fitSingleLine();
  }

  let state = "hidden"; // hidden → shown → collapsing → hidden (repeat)

  function show(){
    if (state === "shown") return;
    pickQuote();
    banner.classList.remove("collapsing");
    void banner.offsetWidth; // reset transition
    banner.classList.add("in");
    state = "shown";
  }

  function collapseIntoLogo(){
    if (state !== "shown" || !logo) return;
    const b = banner.getBoundingClientRect();
    const l = logo.getBoundingClientRect();
    const dx = (l.left + l.width / 2) - (b.left + b.width / 2);
    const dy = (l.top + l.height / 2) - (b.top + b.height / 2);
    banner.style.setProperty("--dx", dx + "px");
    banner.style.setProperty("--dy", dy + "px");
    banner.classList.remove("in");
    banner.classList.add("collapsing");
    state = "collapsing";
    setTimeout(() => { state = "hidden"; }, 560);
  }

  refillBag();

  // scroll within the hero: a little scroll reveals it, more scroll collapses it in
  const heroEl = $("hero");
  function onScroll(){
    if (!heroEl) return;
    const heroBottom = heroEl.getBoundingClientRect().bottom;
    const y = window.scrollY;

    if (y > 24 && y < 260 && state === "hidden"){
      show();
    } else if ((heroBottom < window.innerHeight * 0.6 || y >= 260) && state === "shown"){
      collapseIntoLogo();
    } else if (y <= 10 && state !== "hidden"){
      // back at the very top — reset so it can play again next time
      banner.classList.remove("in", "collapsing");
      state = "hidden";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // clicking the logo brings the quote back, any time
  if (logo){
    logo.addEventListener("click", (e) => {
      if (state === "shown") return;
      e.preventDefault();
      show();
      setTimeout(collapseIntoLogo, 4500); // auto-collapse back into the logo after a read
    });
  }
})();

$("footerName").textContent = "© " + new Date().getFullYear() + " " + DATA.name;
document.title = DATA.name + " — " + DATA.roles[0];

/* ---------- hero role loop, replaces the old "Scroll down" line ---------- */
const roleOrder = ["Python Developer", "Deep Learning Learner", "NLP Enthusiast", "AI/ML Engineer"];
const heroRole = $("heroRole");
let roleIdx = 0;
heroRole.textContent = roleOrder[0];
setInterval(() => {
  heroRole.classList.add("swap");
  setTimeout(() => {
    roleIdx = (roleIdx + 1) % roleOrder.length;
    heroRole.textContent = roleOrder[roleIdx];
    heroRole.classList.remove("swap");
  }, 320);
}, 2400);

/* ---------- hero stat bars ---------- */
$("heroStats").innerHTML = DATA.stats.map(s => `
  <div class="stat">
    <div class="stat-value">${esc(s.value)}</div>
    <div class="stat-label">${esc(s.label)}</div>
  </div>
`).join("");

/* ============================================================
   2. MARQUEE — duplicated once so the loop is seamless
   ============================================================ */
(function(){
  const one = DATA.marquee
    .map(s => `<span class="marquee-item">${esc(s)}</span>`).join("");
  $("marquee").innerHTML = one + one;
})();

/* ============================================================
   3. PROJECTS — Netflix-style horizontal carousel
   ============================================================ */
const track = $("carouselTrack");
track.innerHTML = DATA.projects.map((p, i) => {
  const tags = p.tags.map(t => `<span>${esc(t)}</span>`).join("");
  const links = [
    p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener">Live demo</a>` : "",
    p.code ? `<a href="${esc(p.code)}" target="_blank" rel="noopener">Source code</a>` : ""
  ].join("");

  return `
  <article class="card reveal" data-index="${i}">
    <div class="card-top">
      <h3>${esc(p.title)}</h3>
      <span class="card-date">${esc(p.date)}</span>
    </div>
    <p>${esc(p.blurb)}</p>
    <div class="card-tags">${tags}</div>
    ${links ? `<div class="card-links">${links}</div>` : ""}
  </article>`;
}).join("");

/* ---------- carousel: one card on stage, next/prev slides directionally, loops forever ---------- */
(function(){
  const cards = [...track.children];
  const prevBtn = $("workPrev"), nextBtn = $("workNext");
  const dotsEl = $("carouselDots");
  const AUTOPLAY_MS = 6000;
  const n = cards.length;
  let current = 0;
  let animating = false;

  dotsEl.innerHTML = cards.map((_, i) => `<button aria-label="Go to project ${i + 1}"></button>`).join("");
  const dots = [...dotsEl.children];

  // initial positions: card 0 on stage, everything else parked off to the right, invisible
  cards.forEach((card, i) => {
    card.style.transform = i === 0 ? "translateX(0)" : "translateX(8%)";
    card.style.opacity = i === 0 ? "1" : "0";
    card.style.pointerEvents = i === 0 ? "auto" : "none";
    card.style.zIndex = i === 0 ? "2" : "1";
  });
  dots[0].classList.add("active");

  function slide(targetIndex, dir){
    // dir: +1 = next (new card enters from the right, old exits left)
    //      -1 = prev (new card enters from the left, old exits right)
    if (animating || targetIndex === current) return;
    animating = true;

    const oldCard = cards[current];
    const newCard = cards[targetIndex];

    newCard.style.transition = "none";
    newCard.style.transform = `translateX(${dir > 0 ? "100%" : "-100%"})`;
    newCard.style.opacity = "0";
    newCard.style.zIndex = "3";
    newCard.style.pointerEvents = "none";
    void newCard.offsetWidth; // force reflow so the "none" transition actually applies first
    newCard.style.transition = "";

    requestAnimationFrame(() => {
      oldCard.style.transform = `translateX(${dir > 0 ? "-100%" : "100%"})`;
      oldCard.style.opacity = "0";
      oldCard.style.zIndex = "1";
      newCard.style.transform = "translateX(0)";
      newCard.style.opacity = "1";
    });

    setTimeout(() => {
      oldCard.style.pointerEvents = "none";
      newCard.style.pointerEvents = "auto";
      animating = false;
    }, 560);

    current = targetIndex;
    dots.forEach((d, idx) => d.classList.toggle("active", idx === current));
  }

  function next(){ slide((current + 1) % n, 1); }
  function prev(){ slide((current - 1 + n) % n, -1); }

  let timer = null;
  function startAutoplay(){ stopAutoplay(); timer = setInterval(next, AUTOPLAY_MS); }
  function stopAutoplay(){ if (timer) clearInterval(timer); }

  nextBtn.addEventListener("click", () => { next(); startAutoplay(); });
  prevBtn.addEventListener("click", () => { prev(); startAutoplay(); });
  dots.forEach((d, i) => d.addEventListener("click", () => {
    if (i === current) return;
    slide(i, i > current ? 1 : -1);
    startAutoplay();
  }));

  startAutoplay();
})();

/* ============================================================
   4. EXPERIENCE TIMELINE
   ============================================================ */
$("timeline").innerHTML = DATA.experience.map(j => `
  <div class="job ${j.current ? "current" : ""} reveal">
    <div class="job-head">
      <h3>${esc(j.role)} <span class="job-org">· ${esc(j.org)}</span></h3>
      <span class="job-date">${esc(j.date)} · ${esc(j.place)}</span>
    </div>
    <ul>${j.points.map(pt => `<li>${esc(pt)}</li>`).join("")}</ul>
  </div>
`).join("");

/* ============================================================
   5. ABOUT
   ============================================================ */
$("aboutText").innerHTML = DATA.about
  .map(p => `<p class="reveal">${esc(p)}</p>`).join("");

(function(){
  const frame = $("photoFrame");
  // Try to load the photo; fall back to initials if it isn't there.
  frame.innerHTML = `<div class="photo-fallback">${esc(DATA.initials)}</div>
    <div class="photo-hint">Save a photo as "${esc(DATA.photo)}" next to index.html</div>`;

  const img = new Image();
  img.onload = () => {
    frame.innerHTML = "";
    img.alt = DATA.name;
    frame.appendChild(img);
  };
  img.src = DATA.photo;
})();

$("photoMeta").innerHTML = [
  ["Based in", DATA.location],
  ["Email", DATA.email],
  ["Phone", DATA.phone],
  ["Status", "Open to remote roles"]
].map(([k, v]) => `
  <div class="meta-row"><span>${esc(k)}</span><span>${esc(v)}</span></div>
`).join("");

/* ============================================================
   6. SKILLS + EDUCATION
   ============================================================ */
$("skillGrid").innerHTML = DATA.skillGroups.map(g => `
  <div class="skill-card reveal">
    <h3>${esc(g.title)}</h3>
    <ul>${g.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
  </div>
`).join("");

$("education").innerHTML = DATA.education.map(e => `
  <div class="edu-item">
    <strong>${esc(e.degree)}</strong>
    <span>${esc(e.school)}</span>
    <em>${esc(e.date)}</em>
  </div>
`).join("");

$("certs").innerHTML = DATA.certifications.map(c => `
  <div class="edu-item">
    <strong>${esc(c.name)}</strong>
    <span>${esc(c.issuer)}</span>
    <em>${esc(c.date)}</em>
  </div>
`).join("");

/* ============================================================
   7. CONTACT FOOTER
   ============================================================ */
$("contactHeading").textContent = DATA.contactHeading;
$("contactBlurb").textContent = DATA.contactBlurb;

(function(){
  // pull the handle straight out of your GitHub URL
  const handle = "@" + DATA.links.github.replace(/\/+$/, "").split("/").pop();

  const rows = [
    { label: "Email",    value: DATA.email,         href: "mailto:" + DATA.email },
    { label: "GitHub",   value: handle,             href: DATA.links.github },
    { label: "LinkedIn", value: "Connect with me",  href: DATA.links.linkedin },
    { label: "LeetCode", value: "See my solutions", href: DATA.links.leetcode },
    { label: "Résumé",   value: "Download PDF",     href: DATA.links.resume }
  ].filter(r => r.href && r.href !== "#");

  $("contactLinks").innerHTML = rows.map(r => `
    <a href="${esc(r.href)}" ${r.href.startsWith("mailto:") ? "" : 'target="_blank" rel="noopener"'}>
      <span>${esc(r.label)}</span>
      <span class="cl-val">${esc(r.value)}</span>
    </a>
  `).join("");
})();

/* ============================================================
   8. INTERACTIONS — nav, progress bar, scroll reveal
   ============================================================ */

/* scroll progress bar */
const progress = $("progress");
function onProgress(){
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
}
window.addEventListener("scroll", onProgress, { passive: true });
onProgress();


/* mobile menu */
const toggle = $("navToggle");
const mobileLinks = $("mobileLinks");

toggle.addEventListener("click", () => {
  const open = mobileLinks.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

mobileLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mobileLinks.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

/* reveal elements as they scroll into view */
(function(){
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = Math.min(i % 6, 5) * 55 + "ms";
    io.observe(el);
  });
})();
