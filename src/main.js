import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "@fontsource-variable/inter";
import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { profile, services, about, projects, gallery, orbitImages, experience, tools, coreSkills, industries } from "./content.js";

gsap.registerPlugin(ScrollTrigger);
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const mobile = matchMedia("(max-width: 760px), (pointer: coarse)").matches;
document.documentElement.classList.toggle("reduced", reduced);

const pad = (n) => String(n).padStart(2, "0");
const split = (txt, cls = "ch") => [...txt].map((c) => `<span class="${cls}">${c === " " ? "&nbsp;" : c}</span>`).join("");
const words = (txt) => txt.split(" ").map((w) => `<span class="w"><span>${w}</span></span>`).join(" ");

const coverHTML = (p) => p.img
  ? `<img src="${p.img}" alt="${p.title} — ${p.sub}" loading="lazy" />`
  : `<div class="gen-cover" style="--from:${p.cover.from};--to:${p.cover.to};--ink:${p.cover.ink}"><span>${p.cover.word}</span><small>${p.cat}</small></div>`;

document.querySelector("#app").innerHTML = `
<div class="preloader" aria-hidden="true">
  <div class="pl-top"><span>AK©</span><span>Portfolio ’26</span></div>
  <div class="pl-count"><span class="pl-num">000</span></div>
  <div class="pl-bar"><i></i></div>
</div>
<canvas class="webgl" aria-hidden="true"></canvas>
<div class="grain" aria-hidden="true"></div>
<div class="cursor" aria-hidden="true"><span class="cursor-label"></span></div>

<header class="nav">
  <a href="#top" class="logo" data-cursor>AK<sup>©</sup></a>
  <nav aria-label="Primary">
    <a href="#about" data-cursor>About</a><a href="#work" data-cursor>Work</a><a href="#experience" data-cursor>Experience</a><a href="#skills" data-cursor>Skills</a>
  </nav>
  <div class="nav-right"><span class="clock" title="Ludhiana local time">LDH <b class="time">--:--</b></span>
  <a href="#contact" class="pill magnetic" data-cursor><span>Let’s talk</span></a></div>
</header>

<main id="top">
  <section class="hero" aria-label="Intro">
    <div class="hero-meta top">
      <p><span class="dot"></span> Available for freelance &amp; full-time</p>
      <p>${profile.location}</p>
    </div>
    <h1 class="hero-title fit" data-max="260" aria-label="${profile.first} ${profile.last}">
      <span class="line l1">${split(profile.first.toUpperCase())}</span>
      <span class="line l2">${split(profile.last.toUpperCase())}</span>
    </h1>
    <div class="hero-meta bottom">
      <p class="role">${profile.role}<br/><em>Branding · Social · UI</em></p>
      <p class="mantra">${profile.mantra}</p>
      <a href="#about" class="scroll-hint" data-cursor aria-label="Scroll to about"><span>Scroll</span><i></i></a>
    </div>
  </section>

  <div class="marquee" aria-hidden="true"><div class="mq-track">${[...services, ...services].map((s) => `<span>${s}</span><b>✦</b>`).join("")}</div></div>

  <section id="about" class="about">
    <p class="kicker">(01) — About</p>
    <h2 class="reveal-words">${words(about.lead)}</h2>
    <div class="about-grid">
      <figure class="about-img clip"><img src="${about.image}" alt="Amit sketching a layout on paper" loading="lazy" /></figure>
      <div class="about-copy">
        ${about.paragraphs.map((p) => `<p class="fade-up">${p}</p>`).join("")}
        <ul class="stats">${about.stats.map((s) => `<li class="fade-up"><b data-count="${s.value}">0</b><i>${s.suffix}</i><span>${s.label}</span></li>`).join("")}</ul>
      </div>
    </div>
  </section>

  <section id="work" class="work">
    <div class="sec-head"><p class="kicker">(02) — Selected work</p><h2 class="big">Work<sup>${pad(projects.length)}</sup></h2></div>
    <ol class="work-list">
      ${projects.map((p, i) => `
      <li class="work-row" data-cursor="View" data-index="${i}" tabindex="0">
        <span class="wr-i">${pad(i + 1)}</span>
        <span class="wr-t">${p.title}<em>${p.sub}</em></span>
        <span class="wr-c">${p.cat}</span>
        <span class="wr-y">${p.year}</span>
        <div class="wr-mobile">${coverHTML(p)}</div>
      </li>`).join("")}
    </ol>
    <div class="work-preview" aria-hidden="true">${projects.map((p) => `<div class="wp-item">${coverHTML(p)}</div>`).join("")}</div>
  </section>

  <section class="gallery" aria-label="Gallery of creatives">
    <div class="gallery-pin">
      <div class="g-track">
        <div class="g-head"><p class="kicker">(03) — Creatives</p><h2 class="big">Feed &amp; Reels</h2><p class="g-note">Posters, packaging, logos, events and AI reels — keep scrolling.</p></div>
        ${gallery.map((g, i) => `
        <figure class="g-card ${g.type}" data-cursor="${g.type === "video" ? "Play" : "View"}" style="--r:${((i % 3) - 1) * 1.5}deg">
          ${g.type === "video" ? `<video src="${g.src}" poster="${g.poster}" muted loop playsinline preload="none"></video>` : `<img src="${g.src}" alt="${g.cat} design by Amit Kashyap" loading="lazy" />`}
          <figcaption><span>${pad(i + 1)}</span>${g.cat}</figcaption>
        </figure>`).join("")}
      </div>
    </div>
  </section>

  <section id="experience" class="experience">
    <div class="sec-head"><p class="kicker">(04) — Experience</p><h2 class="big">4+ Years</h2></div>
    <div class="xp-list">
      ${experience.map((x) => `
      <article class="xp-row fade-up">
        <p class="xp-p">${x.period}</p>
        <div class="xp-main"><h3>${x.company}${x.place ? ` <small>· ${x.place}</small>` : ""}</h3><p class="xp-role">${x.role}</p></div>
        <ul class="xp-pts">${x.points.map((p) => `<li>${p}</li>`).join("")}</ul>
      </article>`).join("")}
    </div>
  </section>

  <section id="skills" class="skills">
    <div class="sec-head"><p class="kicker">(05) — Toolkit</p><h2 class="big">Tools &amp; Skills</h2></div>
    <div class="tools">
      ${tools.map((t) => `<div class="tool fade-up" data-cursor style="--c:${t.color};--bg:${t.bg}"><span class="tool-ic">${t.short}</span><span>${t.name}</span></div>`).join("")}
    </div>
    <div class="skills-grid">
      <ul class="core">${coreSkills.map((s, i) => `<li class="fade-up"><span>${pad(i + 1)}</span>${s}</li>`).join("")}</ul>
      <div class="inds"><p class="kicker">Industries</p><div class="chips">${industries.map((s) => `<span class="chip">${s}</span>`).join("")}</div></div>
    </div>
  </section>

  <section id="contact" class="contact">
    <p class="kicker">(06) — Contact</p>
    <h2 class="contact-title fit" data-max="200"><span class="line">Let’s make</span><span class="line"><em>something</em> bold</span></h2>
    <a class="mail magnetic" href="mailto:${profile.email}" data-cursor="Email"><span>${profile.email}</span><i>↗</i></a>
    <div class="contact-meta">
      <p>${profile.phones.map((p) => `<a href="tel:${p.replace(/[^+\d]/g, "")}" data-cursor>${p}</a>`).join("<br/>")}</p>
      <p>${profile.location}<br/>Remote &amp; on-site</p>
      <p><a href="#top" class="to-top" data-cursor>Back to top ↑</a></p>
    </div>
  </section>
</main>
<footer class="footer"><span>© 2026 Amit Kashyap</span><span>Designed by Amit · Built with Three.js</span></footer>
`;

/* ---------- fit giant type to the viewport ---------- */
const fitType = () => document.querySelectorAll(".fit").forEach((el) => {
  el.style.fontSize = "100px";
  const lines = [...el.querySelectorAll(".line")];
  const widest = Math.max(...lines.map((l) => { const r = document.createRange(); r.selectNodeContents(l); return r.getBoundingClientRect().width; }));
  const avail = el.parentElement.clientWidth - parseFloat(getComputedStyle(el.parentElement).paddingLeft) * 2;
  el.style.fontSize = Math.min(100 * (avail / widest) * 0.98, +el.dataset.max || 300) + "px";
});
fitType();
document.fonts && Promise.all([document.fonts.load('800 100px "Syne"'), document.fonts.load('700 100px "Syne"')]).then(() => document.fonts.ready).then(() => { fitType(); ScrollTrigger.refresh(); });
addEventListener("resize", fitType);

/* ---------- clock ---------- */
const clock = document.querySelector(".time");
const tick = () => (clock.textContent = new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }));
tick(); setInterval(tick, 20000);

/* ---------- smooth scroll ---------- */
let lenis = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
  const id = a.getAttribute("href"); const el = id === "#top" ? 0 : document.querySelector(id);
  if (el === null) return; e.preventDefault();
  lenis ? lenis.scrollTo(el, { duration: 1.4 }) : (el === 0 ? scrollTo(0, 0) : el.scrollIntoView());
}));

/* ---------- WebGL ---------- */
let three = null;
const canvas = document.querySelector(".webgl");
const ready = new Promise((res) => {
  import("./scene.js").then(({ createScene }) => {
    try { three = createScene(canvas, { images: orbitImages, reduced, mobile, onReady: res }); }
    catch (err) { console.warn("WebGL unavailable", err); document.documentElement.classList.add("no-webgl"); res(); }
  });
  setTimeout(res, 4000); // never block the intro
});

/* ---------- preloader + intro ---------- */
const pl = document.querySelector(".preloader");
const num = pl.querySelector(".pl-num");
const intro = () => {
  const tl = gsap.timeline();
  tl.to(pl, { yPercent: -100, duration: reduced ? 0 : 1.1, ease: "expo.inOut" })
    .from(".hero-title .ch", { yPercent: 110, rotate: 8, duration: reduced ? 0 : 1.2, ease: "expo.out", stagger: 0.04 }, "-=0.45")
    .from(".hero-meta p, .hero-meta a, .nav > *", { y: 20, opacity: 0, duration: reduced ? 0 : 0.8, ease: "power3.out", stagger: 0.06 }, "-=0.9")
    .add(() => pl.remove());
  if (three && !reduced) tl.from(three.state, { camZ: 13, blobScale: 0.2, duration: 2, ease: "expo.out" }, 0.3);
};
if (reduced) { ready.then(intro); }
else {
  const c = { v: 0 };
  gsap.to(c, { v: 100, duration: 1.8, ease: "power2.inOut", onUpdate: () => { num.textContent = String(Math.round(c.v)).padStart(3, "0"); pl.querySelector(".pl-bar i").style.transform = `scaleX(${c.v / 100})`; },
    onComplete: () => ready.then(intro) });
}

/* ---------- scroll choreography: camera move ---------- */
ready.then(() => {
  if (!three) return;
  const s = three.state;
  const vh = () => innerHeight;
  if (!reduced) {
    // hero -> about: dolly through the orbit, tilt the ring, push the blob aside
    gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", endTrigger: ".about", end: "bottom top", scrub: 1.2 } })
      .to(s, { camZ: 3.6, camY: 0.9, lookY: -0.2, ringTilt: 0.55, ringSpin: Math.PI * 0.6, amp: 0.45, ease: "none" }, 0)
      .to(s, { worldX: mobile ? 0 : -2.3, camZ: mobile ? 9 : 6, camY: 0.2, dim: mobile ? 0.45 : 0.85, ease: "none" }, 0.5);
    gsap.timeline({ scrollTrigger: { trigger: ".work", start: "top bottom", endTrigger: ".experience", end: "top top", scrub: 1.2 } })
      .to(s, { dim: 0.3, cardDim: 0.3, worldX: mobile ? 0 : 2.4, ringSpin: Math.PI * 1.6, camZ: 8, ease: "none" });
    gsap.timeline({ scrollTrigger: { trigger: ".contact", start: "top bottom", end: "bottom bottom", scrub: 1.2 } })
      .to(s, { dim: mobile ? 0.6 : 1, cardDim: 0, ringScale: 1.9, worldX: mobile ? 0 : 2.4, camZ: mobile ? 9 : 6.5, camY: -0.2, lookY: 0, ringTilt: -0.2, blobScale: mobile ? 0.8 : 1.1, ease: "none" });
    ScrollTrigger.create({ onUpdate: (st) => three.setVelocity(st.getVelocity()) });
  } else {
    gsap.set(s, { worldX: 0, dim: 0.8 });
  }
  ScrollTrigger.refresh();
});

/* ---------- reveals ---------- */
if (!reduced) {
  gsap.utils.toArray(".reveal-words").forEach((h) => {
    gsap.fromTo(h.querySelectorAll(".w > span"), { opacity: 0.12 }, { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: h, start: "top 80%", end: "bottom 45%", scrub: true } });
  });
  gsap.utils.toArray(".fade-up").forEach((el) => gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } }));
  gsap.utils.toArray(".clip").forEach((el) => gsap.fromTo(el, { clipPath: "inset(18% 12% 18% 12% round 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 24px)", ease: "none", scrollTrigger: { trigger: el, start: "top 90%", end: "center 55%", scrub: true } }));
  gsap.utils.toArray(".big").forEach((el) => gsap.from(el, { yPercent: 40, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } }));
  gsap.from(".contact-title .line", { yPercent: 100, opacity: 0, stagger: 0.12, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".contact", start: "top 70%" } });
  gsap.utils.toArray(".work-row").forEach((el, i) => gsap.from(el, { opacity: 0, y: 30, duration: 0.8, ease: "power3.out", delay: (i % 4) * 0.04, scrollTrigger: { trigger: el, start: "top 92%" } }));
  gsap.to(".hero-title", { yPercent: -35, opacity: 0.15, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
}

/* counters */
document.querySelectorAll("[data-count]").forEach((el) => {
  const to = +el.dataset.count;
  if (reduced) { el.textContent = to; return; }
  ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to({ v: 0 }, { v: to, duration: 1.6, ease: "power3.out", onUpdate() { el.textContent = Math.round(this.targets()[0].v); } }) });
});

/* ---------- horizontal gallery ---------- */
const mmq = gsap.matchMedia();
mmq.add("(min-width: 761px) and (prefers-reduced-motion: no-preference)", () => {
  const track = document.querySelector(".g-track");
  const dist = () => track.scrollWidth - innerWidth + 64;
  gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: ".gallery", start: "top top", end: () => "+=" + dist(), pin: ".gallery-pin", scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } });
});
document.querySelectorAll(".g-card.video").forEach((f) => {
  const v = f.querySelector("video");
  f.addEventListener("pointerenter", () => v.play().catch(() => {}));
  f.addEventListener("pointerleave", () => v.pause());
});

/* ---------- work list hover preview ---------- */
const preview = document.querySelector(".work-preview");
const items = [...preview.children];
if (!mobile) {
  const xTo = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3" });
  const yTo = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3" });
  const rTo = gsap.quickTo(preview, "rotate", { duration: 0.8, ease: "power3" });
  let lastX = 0;
  const list = document.querySelector(".work-list");
  list.addEventListener("pointermove", (e) => { xTo(e.clientX); yTo(e.clientY); rTo(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6)); lastX = e.clientX; });
  const show = (i) => { preview.classList.add("on"); items.forEach((it, j) => it.classList.toggle("on", i === j)); };
  document.querySelectorAll(".work-row").forEach((row) => {
    row.addEventListener("pointerenter", () => show(+row.dataset.index));
    row.addEventListener("focus", () => show(+row.dataset.index));
  });
  list.addEventListener("pointerleave", () => preview.classList.remove("on"));
}

/* ---------- cursor + magnetic ---------- */
if (!mobile && !reduced) {
  const cur = document.querySelector(".cursor"), label = cur.querySelector(".cursor-label");
  const cx = gsap.quickTo(cur, "x", { duration: 0.35, ease: "power3" }), cy = gsap.quickTo(cur, "y", { duration: 0.35, ease: "power3" });
  addEventListener("pointermove", (e) => { cx(e.clientX); cy(e.clientY); }, { passive: true });
  document.addEventListener("pointerover", (e) => {
    const t = e.target.closest("[data-cursor]");
    cur.classList.toggle("hover", !!t);
    const l = t && t.dataset.cursor; label.textContent = l || "";
    cur.classList.toggle("label", !!l);
  });
  document.querySelectorAll(".magnetic").forEach((m) => {
    const mx = gsap.quickTo(m, "x", { duration: 0.5, ease: "elastic.out(1,0.4)" }), my = gsap.quickTo(m, "y", { duration: 0.5, ease: "elastic.out(1,0.4)" });
    m.addEventListener("pointermove", (e) => { const r = m.getBoundingClientRect(); mx((e.clientX - r.left - r.width / 2) * 0.3); my((e.clientY - r.top - r.height / 2) * 0.4); });
    m.addEventListener("pointerleave", () => { mx(0); my(0); });
  });
} else document.querySelector(".cursor").remove();

addEventListener("load", () => ScrollTrigger.refresh());
