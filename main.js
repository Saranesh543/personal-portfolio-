/* ── TOAST (global, defined first) ──────────────────── */
console.log("JS LOADED");
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 2200);
}

(function () {

/* ── CURSOR ──────────────────────────────────────────── */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = window.innerWidth / 2, my = window.innerHeight / 2;
let rx = mx, ry = my;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function cursorLoop() {
  if (dot)  { dot.style.left = mx+'px'; dot.style.top = my+'px'; }
  if (ring) { rx += (mx-rx)*0.14; ry += (my-ry)*0.14; ring.style.left = rx+'px'; ring.style.top = ry+'px'; }
  requestAnimationFrame(cursorLoop);
})();

/* ── LOADER ──────────────────────────────────────────── */
function hideLoader() {
  const loader = document.getElementById('loader');
  if (!loader || loader.style.display === 'none') return;
  loader.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  loader.style.opacity = '0';
  loader.style.transform = 'scale(1.04)';
  setTimeout(() => { loader.style.display = 'none'; }, 850);
}

window.addEventListener('DOMContentLoaded', () => {
  const bar    = document.getElementById('loader-bar');
  const status = document.getElementById('loader-status');
  const loader = document.getElementById('loader');
  if (!bar || !status || !loader) return;

  const stages = [
    [0,   'INITIALIZING OMNITRIX...'],
    [20,  'SCANNING DNA SEQUENCES...'],
    [45,  'LOADING ABILITY MATRIX...'],
    [68,  'CALIBRATING SYSTEMS...'],
    [85,  'SYNCING NEURAL LINK...'],
    [100, 'OMNITRIX ONLINE — READY']
  ];
  let si = 0;
  const iv = setInterval(() => {
    if (si >= stages.length) { clearInterval(iv); setTimeout(hideLoader, 500); return; }
    const [pct, msg] = stages[si++];
    bar.style.width = pct + '%';
    status.textContent = msg;
  }, 380);
});

/* GUARANTEED fallback — always remove loader after 5s no matter what */
window.addEventListener('load', () => { setTimeout(hideLoader, 5000); });

/* ── TICK MARKS ──────────────────────────────────────── */
const tickRing = document.getElementById('tick-ring');
if (tickRing) {
  for (let i = 0; i < 60; i++) {
    const t = document.createElement('div');
    t.className = 'tick';
    t.style.transform = `rotate(${(i/60)*360}deg)`;
    tickRing.appendChild(t);
  }
}

/* ── TYPEWRITER ──────────────────────────────────────── */
const roles = ['Aspiring Software Engineer','UI Designer','Frontend Developer','Hackathon Enthusiast'];
let rIdx=0, cIdx=0, deleting=false;
const typedEl = document.getElementById('typed-text');
function typeLoop() {
  if (!typedEl) return;
  const cur = roles[rIdx];
  if (!deleting) {
    typedEl.textContent = cur.slice(0, ++cIdx);
    if (cIdx === cur.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    typedEl.textContent = cur.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; rIdx = (rIdx+1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 45 : 80);
}
setTimeout(typeLoop, 1600);

/* ── PARTICLES ───────────────────────────────────────── */
if (window.tsParticles) {
  tsParticles.load('particles', {
    particles: {
      number:{value:55,density:{enable:true,area:800}},
      color:{value:['#00ff88','#00e87a','#007a3d']},
      shape:{type:'circle'},
      opacity:{value:0.4,random:true,animation:{enable:true,speed:0.8,minimumValue:0.05,sync:false}},
      size:{value:{min:0.5,max:2},random:true},
      links:{enable:true,distance:140,color:'#00ff8825',opacity:0.2,width:0.5},
      move:{enable:true,speed:0.6,random:true,outModes:'bounce'}
    },
    interactivity:{
      events:{onHover:{enable:true,mode:'grab'},onClick:{enable:true,mode:'push'}},
      modes:{grab:{distance:180,links:{opacity:0.5}},push:{quantity:3}}
    },
    detectRetina:true
  });
}

/* ── SCROLL REVEAL ───────────────────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
      bar.style.width = (bar.dataset.width||'0') + '%';
    });
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── STAT COUNTER ────────────────────────────────────── */
const statObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = parseInt(el.dataset.count, 10);
    let cur = 0;
    const step = Math.ceil(target/30);
    const t = setInterval(() => { cur = Math.min(cur+step, target); el.textContent = cur; if (cur>=target) clearInterval(t); }, 50);
    statObs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => statObs.observe(el));

/* ── PROJECT FILTER ──────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(c => { c.style.display = (f==='all'||c.dataset.category===f) ? '' : 'none'; });
  });
});

/* ── HERO CORE CLICK ─────────────────────────────────── */
const heroCore = document.getElementById('hero-core');
if (heroCore) {
  heroCore.addEventListener('click', () => {
    heroCore.style.transform = 'scale(1.15)';
    showToast('⬡ OMNITRIX ACTIVATED');
    setTimeout(() => { heroCore.style.transform = ''; }, 300);
  });
}

/* ── SEND BUTTON ─────────────────────────────────────── */
const sendBtn = document.getElementById('send-btn');
if (sendBtn) { sendBtn.addEventListener('click', () => { showToast('✓ TRANSMISSION SENT SUCCESSFULLY'); }); }

/* ── CLICK RIPPLE ────────────────────────────────────── */
document.addEventListener('click', e => {
  const r = document.createElement('span');
  r.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:8px;height:8px;background:rgba(0,255,136,.35);border-radius:50%;transform:translate(-50%,-50%);pointer-events:none;z-index:9997;animation:ripple-expand .6s ease-out forwards;`;
  document.body.appendChild(r);
  setTimeout(() => r.remove(), 600);
});

/* ── CURSOR TRAIL ────────────────────────────────────── */
let trailT = 0;
document.addEventListener('mousemove', e => {
  if (Date.now()-trailT < 30) return;
  trailT = Date.now();
  const t = document.createElement('div');
  t.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:4px;height:4px;background:#00ff88;border-radius:50%;pointer-events:none;opacity:.5;transform:translate(-50%,-50%);z-index:9996;animation:trail-fade .4s ease-out forwards;`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 400);
});

})();