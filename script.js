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
$("logoInitials").textContent = DATA.initials;
$("heroName").textContent = DATA.name;
$("heroLocation").textContent = DATA.location;
$("heroTagline").textContent = DATA.tagline;
$("footerName").textContent = "© " + new Date().getFullYear() + " " + DATA.name;
document.title = DATA.name + " — " + DATA.roles[0];

$("heroStats").innerHTML = DATA.stats.map(s => `
  <div class="stat">
    <div class="stat-value">${esc(s.value)}</div>
    <div class="stat-label">${esc(s.label)}</div>
  </div>
`).join("");

/* ---------- typing effect ---------- */
(function typeLoop(){
  const el = $("typed");
  const words = DATA.roles;
  let w = 0, c = 0, deleting = false;

  function tick(){
    const word = words[w];
    c += deleting ? -1 : 1;
    el.textContent = word.slice(0, c);

    let wait = deleting ? 45 : 85;

    if (!deleting && c === word.length){
      wait = 1800;            // pause on a full word
      deleting = true;
    } else if (deleting && c === 0){
      deleting = false;
      w = (w + 1) % words.length;
      wait = 320;
    }
    setTimeout(tick, wait);
  }
  tick();
})();

/* ============================================================
   2. MARQUEE — duplicated once so the loop is seamless
   ============================================================ */
(function(){
  const one = DATA.marquee
    .map(s => `<span class="marquee-item">${esc(s)}</span>`).join("");
  $("marquee").innerHTML = one + one;
})();

/* ============================================================
   3. PROJECTS — bento grid
   ============================================================ */
$("bento").innerHTML = DATA.projects.map(p => {
  const tags = p.tags.map(t => `<span>${esc(t)}</span>`).join("");
  const links = [
    p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener">Live demo</a>` : "",
    p.code ? `<a href="${esc(p.code)}" target="_blank" rel="noopener">Source code</a>` : ""
  ].join("");

  return `
  <article class="card ${p.size === "large" ? "large" : ""} reveal">
    <div class="card-top">
      <h3>${esc(p.title)}</h3>
      <span class="card-date">${esc(p.date)}</span>
    </div>
    <p>${esc(p.blurb)}</p>
    <div class="card-tags">${tags}</div>
    ${links ? `<div class="card-links">${links}</div>` : ""}
  </article>`;
}).join("");

/* ---------- cursor-following glow on cards ---------- */
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("pointermove", e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", (e.clientX - r.left) + "px");
    card.style.setProperty("--my", (e.clientY - r.top) + "px");
  });
});

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

/* sticky nav background */
const nav = $("nav");
const progress = $("progress");

function onScroll(){
  nav.classList.toggle("stuck", window.scrollY > 24);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* mobile menu */
const toggle = $("navToggle");
const links = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

links.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

/* highlight the section you're currently reading */
(function(){
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-links a")];

  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(l =>
        l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id)
      );
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach(s => spy.observe(s));
})();

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
