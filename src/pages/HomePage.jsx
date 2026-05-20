import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import StepwiseProgress from "../components/StepwiseProgress";
import AnimatedLogo from "../components/AnimatedLogo";

/* ── URL slug helpers ───────────────────────────────── */
const toSlug = (str = "") =>
  str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
const expSlug = (exp = "") => {
  const map = {
    "0\u20131 years (fresher)": "0-1", "1\u20133 years": "1-3",
    "3\u20135 years": "3-5",           "5\u20138 years": "5-8",
    "8+ years (senior)": "8-plus",
  };
  return map[exp.toLowerCase()] || toSlug(exp);
};

/* ─── Data ──────────────────────────────────────────── */
const COMPANIES = [
  "Select Company","Google","Microsoft","Amazon","Oracle","Meta",
  "JPMorgan","Wells Fargo","Goldman Sachs","Infosys","TCS","Wipro",
  "Capgemini","Accenture","Deloitte","IBM","Adobe","PayPal","Cisco",
  "Netflix","Uber","LinkedIn","Mphasis",
];
const EXPERIENCES = [
  "Select Experience","0–1 Years (Fresher)","1–3 Years",
  "3–5 Years","5–8 Years","8+ Years (Senior)",
];
const ROLES = [
  "Select Role","Java Backend Developer","Java Full Stack Developer",
  "Spring Boot Engineer","Microservices Architect","System Design Engineer",
  "DSA / Problem Solving","React Frontend Developer",
];

const CARDS = [
  { name:"Google",     tag:"Product Giant",       logo:"https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",  fb:"G",   col:"#0a7c6e", q:"420+", topics:["System Design","DSA","Java Core","Distributed Systems"], desc:"Data structures, algorithms, system design & distributed systems at scale." },
  { name:"JPMorgan",   tag:"FinTech Giant",        logo:"https://upload.wikimedia.org/wikipedia/commons/a/af/J_P_Morgan_Logo_2008_1.svg", fb:"JP",  col:"#f59e0b", q:"340+", topics:["Java Concurrency","Spring Boot","Low Latency","SQL"],      desc:"Enterprise Java, multithreading, low-latency systems & fintech." },
  { name:"Amazon",     tag:"E-Commerce / Cloud",   logo:"https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",       fb:"AMZ", col:"#ff6b35", q:"380+", topics:["Leadership Principles","DSA","System Design","AWS"],           desc:"Leadership principles, DSA, system design & AWS cloud architecture." },
  { name:"Deloitte",   tag:"Big Four Consulting",  logo:"https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg",          fb:"D",   col:"#0a7c6e", q:"280+", topics:["Java Full Stack","Spring Boot","React","REST APIs"],            desc:"Java full stack, consulting projects, React + Spring Boot prep." },
  { name:"Microsoft",  tag:"Tech Giant",           logo:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",    fb:"MS",  col:"#f59e0b", q:"360+", topics:["OOD","DSA","System Design","Azure"],                           desc:"Object-oriented design, DSA, system design & Azure cloud scenarios." },
  { name:"Infosys",    tag:"IT Services",          logo:"https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",      fb:"IN",  col:"#ff6b35", q:"310+", topics:["Core Java","OOPS","Collections","Spring MVC"],                  desc:"Core Java, OOPs, Collections, Spring MVC & database-centric rounds." },
  { name:"TCS",        tag:"IT Services",          logo:"https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg", fb:"TCS", col:"#0a7c6e", q:"290+", topics:["Java Basics","SQL","Aptitude","Behavioral"], desc:"Java fundamentals, SQL, aptitude & behavioral rounds for mass hiring." },
  { name:"Mphasis",    tag:"Banking Tech",         logo:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Mphasis_new_logo.jpg",  fb:"M",   col:"#f59e0b", q:"210+", topics:["Spring Boot","Microservices","Banking Domain","SQL"],           desc:"Java backend, Spring Boot, banking domain, SQL & microservices." },
];

const MARQUEE = [
  "Google","Microsoft","Amazon","Oracle","IBM","Meta","Netflix","Adobe",
  "PayPal","Cisco","LinkedIn","Infosys","TCS","Wipro","Goldman Sachs",
  "Accenture","Capgemini","Deloitte","JPMorgan","Wells Fargo","Uber","Mphasis",
];

/* ─── Hook: window size ─────────────────────────────── */
function useWindowSize() {
  const [size, setSize] = useState({ w: typeof window !== "undefined" ? window.innerWidth : 1200 });
  useEffect(() => {
    const fn = () => setSize({ w: window.innerWidth });
    window.addEventListener("resize", fn);
    fn();
    return () => window.removeEventListener("resize", fn);
  }, []);
  return size;
}

/* ─── Logo fallback ─────────────────────────────────── */
function LogoImg({ src, fb }) {
  const [err, setErr] = useState(false);
  return err
    ? <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:11, color:"#374151" }}>{fb}</span>
    : <img src={src} alt={fb} style={{ maxHeight:26, maxWidth:"100%", objectFit:"contain" }} onError={() => setErr(true)} />;
}

/* ─── Global CSS (all breakpoints) ─────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Outfit:wght@300;400;500;600;700;800&display=swap');

:root {
  --teal:#0a7c6e; --teal2:#0e9988; --amber:#f59e0b;
  --orange:#ff6b35; --bg:#fafafa; --tx:#111827;
  --tx2:#4b5563; --mu:#9ca3af; --brd:#e5e7eb; --brd2:#f3f4f6;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#fafafa;color:#111827;font-family:'Outfit',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.bg{font-family:'Bricolage Grotesque',sans-serif!important}
.ot{font-family:'Outfit',sans-serif!important}
img{display:block;max-width:100%}
button{font-family:'Outfit',sans-serif}

/* ── marquee ── */
@keyframes mq {from{transform:translateX(0)} to{transform:translateX(-50%)}}
@keyframes mqr{from{transform:translateX(-50%)} to{transform:translateX(0)}}
.mq {display:flex;width:max-content;animation:mq  32s linear infinite}
.mqr{display:flex;width:max-content;animation:mqr 26s linear infinite}
.mq:hover,.mqr:hover{animation-play-state:paused}

/* ── reveal ── */
@keyframes rup{from{opacity:0;transform:translateY(24px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)}}
.rv{opacity:0} .rv.in{animation:rup .7s cubic-bezier(.22,.68,0,1.18) forwards}

/* ── shimmer ── */
@keyframes shim{0%{background-position:-200% center} 100%{background-position:200% center}}
.shim{background:linear-gradient(90deg,#0a7c6e,#f59e0b,#ff6b35,#f59e0b,#0a7c6e);background-size:200% auto;animation:shim 4s linear infinite;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}

/* ── pulse ── */
@keyframes pd{0%,100%{transform:scale(1);opacity:.8} 50%{transform:scale(1.6);opacity:1}}
.pd{animation:pd 2s ease-in-out infinite}

/* ── blob ── */
@keyframes blob{
  0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%;transform:translate(0,0) scale(1)}
  33%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%;transform:translate(24px,-16px) scale(1.04)}
  66%{border-radius:40% 60% 30% 70%/40% 40% 70% 50%;transform:translate(-16px,10px) scale(.96)}
}
.blob{animation:blob 14s ease-in-out infinite;position:absolute;pointer-events:none}

/* ── grad text ── */
.grad-text{background:linear-gradient(135deg,#0a7c6e 0%,#f59e0b 50%,#ff6b35 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}

/* ── buttons ── */
.btn-teal{background:linear-gradient(135deg,#0a7c6e,#0e9988);border:none;color:#fff;cursor:pointer;font-family:'Bricolage Grotesque',sans-serif;font-weight:700;transition:transform .25s,box-shadow .25s;position:relative;overflow:hidden}
.btn-teal::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#0e9988,#14b8a6);opacity:0;transition:opacity .3s}
.btn-teal:hover{transform:scale(1.03);box-shadow:0 0 28px rgba(10,124,110,0.42)}
.btn-teal:hover::after{opacity:1}
.btn-teal>span{position:relative;z-index:1}

.btn-crack{background:linear-gradient(135deg,#ff6b35,#f59e0b);border:none;color:#fff;cursor:pointer;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;transition:transform .28s cubic-bezier(.22,.68,0,1.2),box-shadow .28s;position:relative;overflow:hidden}
.btn-crack::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#f97316,#fbbf24);opacity:0;transition:opacity .3s}
.btn-crack:hover{transform:scale(1.04);box-shadow:0 8px 36px rgba(255,107,53,0.45)}
.btn-crack:hover::after{opacity:1}
.btn-crack>span{position:relative;z-index:1}
.btn-crack:disabled{opacity:.45;cursor:not-allowed;transform:none!important;box-shadow:none!important}

/* ── select ── */
.csel{background:#f9fafb;border:1.5px solid #e5e7eb;color:#111827;appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;background-size:18px;font-family:'Outfit',sans-serif;font-weight:600;transition:border-color .2s,background .2s;width:100%}
.csel:focus{outline:none;border-color:#0a7c6e;background:#f0fdf9;box-shadow:0 0 0 3px rgba(10,124,110,0.12)}
.csel.filled{border-color:#0a7c6e;background:#f0fdf9}

/* ── card ── */
.hcard{transition:transform .35s cubic-bezier(.22,.68,0,1.2),box-shadow .35s,border-color .3s;cursor:pointer}
.hcard:hover{transform:translateY(-6px) scale(1.01)}
@media(hover:none){.hcard:hover{transform:none}}

/* ── form flash ── */
@keyframes fhl{0%,100%{box-shadow:0 20px 80px rgba(10,124,110,0.10)} 50%{box-shadow:0 20px 80px rgba(255,107,53,0.28),0 0 0 4px rgba(10,124,110,0.15)}}
.form-hl{animation:fhl .8s ease-out}

/* ── card flash ── */
@keyframes cfl{0%{box-shadow:0 0 0 0 rgba(10,124,110,0)} 40%{box-shadow:0 0 0 8px rgba(10,124,110,0.22)} 100%{box-shadow:0 0 0 0 rgba(10,124,110,0)}}
.card-flash{animation:cfl .55s ease-out}

/* ── mobile menu slide ── */
@keyframes slideDown{from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)}}
.mobile-menu{animation:slideDown .25s cubic-bezier(.22,.68,0,1.18)}

/* ── stag ── */
.stag{display:inline-flex;align-items:center;gap:8px;padding:5px 16px;border-radius:999px;font-family:'Outfit',sans-serif;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.16em}

/* ── fade edges ── */
.fle{background:linear-gradient(90deg,#fafafa,transparent)}
.fre{background:linear-gradient(-90deg,#fafafa,transparent)}

/* ── pill ── */
.pill{border:1.5px solid #e5e7eb;background:#fff;transition:all .25s;cursor:pointer}
.pill:hover{background:#f0fdf9;border-color:#0a7c6e50;transform:translateY(-3px);box-shadow:0 6px 18px rgba(10,124,110,0.10)}

/* ══════════════════════════════════════
   RESPONSIVE GRID HELPERS
══════════════════════════════════════ */

/* Cards grid */
.cards-grid{display:grid;gap:18px;grid-template-columns:repeat(4,1fr)}
@media(max-width:1100px){.cards-grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:820px) {.cards-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:520px) {.cards-grid{grid-template-columns:1fr}}

/* Form grid */
.form-grid{display:grid;gap:14px;grid-template-columns:repeat(3,1fr)}
@media(max-width:720px){.form-grid{grid-template-columns:1fr}}

/* Stats row */
.stats-row{display:flex;justify-content:center;flex-wrap:wrap;gap:40px}
@media(max-width:480px){.stats-row{gap:24px}}

/* Features grid */
.feat-grid{display:grid;gap:18px;grid-template-columns:repeat(3,1fr)}
@media(max-width:900px){.feat-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:580px){.feat-grid{grid-template-columns:1fr}}

/* Hero h1 */
.hero-h1{font-size:clamp(2.4rem,6vw,5.5rem)}

/* Section pad */
.sec{padding:80px 24px}
@media(max-width:640px){.sec{padding:56px 16px}}

/* Container */
.wrap{max-width:1200px;margin:0 auto;padding:0 32px}
@media(max-width:768px){.wrap{padding:0 20px}}
@media(max-width:480px){.wrap{padding:0 14px}}

/* Nav hide on mobile */
.nav-tabs{display:flex}
@media(max-width:768px){.nav-tabs{display:none}}
.nav-auth{display:flex}
@media(max-width:768px){.nav-auth{display:none}}
.hamburger{display:none}
@media(max-width:768px){.hamburger{display:flex}}

/* CTA banner pad */
.cta-pad{padding:80px 52px}
@media(max-width:640px){.cta-pad{padding:48px 24px}}

/* Topic pills wrap */
.topic-pills{display:flex;flex-wrap:wrap;gap:6px}

/* Marquee fade width */
.mq-fade{width:140px}
@media(max-width:640px){.mq-fade{width:60px}}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function HomePage() {
  const { w } = useWindowSize();
  const isMobile  = w < 768;
  const isTablet  = w >= 768 && w < 1024;

  const [vis,       setVis]       = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeNav, setActiveNav] = useState("interview");
  const [company,   setCompany]   = useState("Select Company");
  const [exp,       setExp]       = useState("Select Experience");
  const [role,      setRole]      = useState("Select Role");
  const [formFlash, setFormFlash] = useState(false);
  const [flashCard, setFlashCard] = useState(null);

  const formRef = useRef(null);

  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);
  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  /* Close menu on outside click */
  useEffect(() => {
    if (!menuOpen) return;
    const fn = (e) => { if (!e.target.closest("#mobile-nav")) setMenuOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [menuOpen]);

  const handleCardClick = useCallback((name) => {
    setFlashCard(name);
    setCompany(name);
    setTimeout(() => setFlashCard(null), 600);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior:"smooth", block:"center" });
      setTimeout(() => { setFormFlash(true); setTimeout(() => setFormFlash(false), 900); }, 500);
    }, 50);
  }, []);

  const canGo = company !== "Select Company" && exp !== "Select Experience" && role !== "Select Role";
  const d = (s) => ({ animationDelay:`${s}s` });

  /* ── Hamburger SVG ── */
  const HamIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      {menuOpen
        ? <><path d="M4 4l14 14M18 4L4 18" stroke="#111827" strokeWidth="2" strokeLinecap="round"/></>
        : <><rect x="2" y="5"  width="18" height="2" rx="1" fill="#111827"/><rect x="2" y="10" width="18" height="2" rx="1" fill="#111827"/><rect x="2" y="15" width="18" height="2" rx="1" fill="#111827"/></>
      }
    </svg>
  );

  return (
    <div style={{ background:"#fafafa", minHeight:"100vh", overflowX:"hidden" }}>
      <style>{CSS}</style>

      {/* ── BG blobs ── */}
      <div style={{ position:"fixed", inset:0, zIndex:0, overflow:"hidden", pointerEvents:"none" }}>
        <div className="blob" style={{ width:"min(480px,90vw)", height:"min(480px,90vw)", background:"radial-gradient(circle,#0a7c6e10,transparent 70%)", top:-120, left:-80 }} />
        <div className="blob" style={{ width:"min(380px,70vw)", height:"min(380px,70vw)", background:"radial-gradient(circle,#f59e0b0d,transparent 70%)", bottom:-80, right:-60, animationDelay:"5s" }} />
        <div className="blob" style={{ width:"min(280px,60vw)", height:"min(280px,60vw)", background:"radial-gradient(circle,#ff6b350d,transparent 70%)", top:"40%", left:"55%", animationDelay:"9s" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(#0a7c6e14 1px,transparent 1px)", backgroundSize:"28px 28px", opacity:.5 }} />
      </div>

      {/* ══════════════════════════════
          NAVBAR
      ══════════════════════════════ */}
      <nav id="mobile-nav" style={{ position:"sticky", top:0, zIndex:200, background:"rgba(250,250,250,0.93)", backdropFilter:"blur(24px)", borderBottom:"1.5px solid #e5e7eb", boxShadow:"0 1px 0 rgba(10,124,110,0.07)" }}>
        <div className="wrap" style={{ height:isMobile?60:68, display:"flex", alignItems:"center", justifyContent:"space-between" }}>

          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:isMobile?8:11, flexShrink:0 }}>
            <AnimatedLogo size={isMobile?34:40} />
            <div>
              <div style={{ display:"flex", alignItems:"baseline" }}>
                <span className="bg" style={{ fontSize:isMobile?17:21, fontWeight:800, color:"#0a7c6e", letterSpacing:"-0.4px" }}>Java</span>
                <span className="bg" style={{ fontSize:isMobile?17:21, fontWeight:800, color:"#ff6b35", letterSpacing:"-0.4px" }}>Hired</span>
              </div>
              {!isMobile && <div className="ot" style={{ fontSize:8, fontWeight:700, letterSpacing:"0.25em", color:"#9ca3af", textTransform:"uppercase" }}>AI Interview Platform</div>}
            </div>
          </div>

          {/* Desktop tabs */}
          <div className="nav-tabs" style={{ alignItems:"center", gap:4, background:"#f3f4f6", padding:"4px", borderRadius:14, border:"1.5px solid #e5e7eb" }}>
            {[{id:"interview",label:"Interview",icon:"🎯"},{id:"resources",label:"Resources",icon:"📚"}].map(t => (
              <button key={t.id} onClick={()=>setActiveNav(t.id)}
                style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 20px", borderRadius:10, fontSize:14, fontWeight:700, border:"none", cursor:"pointer", transition:"all .25s", fontFamily:"'Outfit',sans-serif",
                  background: activeNav===t.id?"#fff":"transparent",
                  color: activeNav===t.id?"#0a7c6e":"#6b7280",
                  boxShadow: activeNav===t.id?"0 1px 6px rgba(0,0,0,0.08)":"none" }}>
                <span>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="nav-auth" style={{ alignItems:"center", gap:10 }}>
            <button className="ot" style={{ padding:"9px 20px", borderRadius:12, border:"1.5px solid #e5e7eb", background:"transparent", color:"#374151", fontSize:14, fontWeight:700, cursor:"pointer", transition:"all .2s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#0a7c6e50";e.currentTarget.style.color="#0a7c6e";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#e5e7eb";e.currentTarget.style.color="#374151";}}>Log In</button>
            <button className="btn-teal" style={{ padding:"10px 22px", borderRadius:12, fontSize:14 }}><span>Sign Up Free</span></button>
          </div>

          {/* Hamburger */}
          <button className="hamburger" onClick={()=>setMenuOpen(v=>!v)}
            style={{ background:"none", border:"1.5px solid #e5e7eb", borderRadius:10, padding:"7px 10px", cursor:"pointer", alignItems:"center", justifyContent:"center" }}>
            <HamIcon />
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="mobile-menu" style={{ borderTop:"1.5px solid #e5e7eb", background:"#fff", padding:"16px 20px 20px" }}>
            {/* Tabs */}
            <div style={{ display:"flex", gap:8, marginBottom:16 }}>
              {[{id:"interview",label:"🎯 Interview"},{id:"resources",label:"📚 Resources"}].map(t => (
                <button key={t.id} onClick={()=>{setActiveNav(t.id);setMenuOpen(false);}}
                  style={{ flex:1, padding:"10px", borderRadius:12, fontSize:14, fontWeight:700, border:`1.5px solid ${activeNav===t.id?"#0a7c6e":"#e5e7eb"}`, background:activeNav===t.id?"#f0fdf9":"#f9fafb", color:activeNav===t.id?"#0a7c6e":"#4b5563", cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                  {t.label}
                </button>
              ))}
            </div>
            {/* Auth */}
            <div style={{ display:"flex", gap:10 }}>
              <button className="ot" style={{ flex:1, padding:"11px", borderRadius:12, border:"1.5px solid #e5e7eb", background:"transparent", color:"#374151", fontSize:14, fontWeight:700, cursor:"pointer" }}>Log In</button>
              <button className="btn-teal" style={{ flex:1, padding:"11px", borderRadius:12, fontSize:14 }}><span>Sign Up Free</span></button>
            </div>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="sec" style={{ position:"relative", zIndex:10, textAlign:"center" }}>
        <div className="wrap">

          {/* Eyebrow */}
          <div className={`rv ${vis?"in":""}`} style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 18px", borderRadius:999, border:"1.5px solid #0a7c6e28", background:"#0a7c6e0b", marginBottom:isMobile?28:36, ...d(.03) }}>
            <span className="pd" style={{ width:7, height:7, borderRadius:"50%", background:"#ff6b35", boxShadow:"0 0 8px #ff6b3599", display:"inline-block", flexShrink:0 }} />
            <span className="shim bg" style={{ fontSize:isMobile?11:12.5, fontWeight:700, letterSpacing:"0.04em" }}>AI-Powered Java Interview Preparation</span>
          </div>

          {/* H1 */}
          <div className={`rv ${vis?"in":""}`} style={d(.10)}>
            <h1 className="bg hero-h1" style={{ fontWeight:800, lineHeight:1.06, letterSpacing:"-2px", color:"#111827" }}>
              Crack Your Java Interview
            </h1>
            <h1 className="bg grad-text hero-h1" style={{ fontWeight:800, lineHeight:1.06, letterSpacing:"-2px", marginBottom:isMobile?20:28 }}>
              With AI Precision
            </h1>
          </div>

          <p className={`rv ot ${vis?"in":""}`} style={{ fontSize:isMobile?"1rem":"1.1rem", lineHeight:1.8, color:"#6b7280", maxWidth:520, margin:"0 auto", marginBottom:isMobile?40:52, ...d(.17) }}>
            Select your target company, experience &amp; role — our AI builds a laser-focused prep plan instantly.
          </p>

          {/* ── CENTRAL FORM ── */}
          <div ref={formRef} className={`rv ${vis?"in":""} ${formFlash?"form-hl":""}`}
            style={{ position:"relative", maxWidth:820, margin:"0 auto", ...d(.25) }}>
            {/* glow border */}
            <div style={{ position:"absolute", inset:-1.5, borderRadius:28, background:"linear-gradient(135deg,#0a7c6e35,#f59e0b28,#ff6b3522)", zIndex:-1, filter:"blur(2px)" }} />
            <div style={{ background:"#fff", borderRadius:26, border:"1.5px solid #e5e7eb", padding:isMobile?"24px 18px 22px":"40px 36px 34px", boxShadow:"0 24px 80px rgba(10,124,110,0.09)" }}>

              {/* Form header */}
              <div style={{ display:"flex", alignItems:isMobile?"flex-start":"center", justifyContent:"space-between", marginBottom:isMobile?20:26, flexDirection:isMobile?"column":"row", gap:isMobile?12:0 }}>
                <div style={{ textAlign:"left" }}>
                  <div className="bg" style={{ fontSize:isMobile?"1rem":"1.15rem", fontWeight:800, color:"#111827" }}>Generate Your Interview Plan</div>
                  <div className="ot" style={{ fontSize:12.5, color:"#9ca3af", marginTop:4 }}>Fill all three fields to unlock your personalized roadmap</div>
                </div>
                {/* Progress dots */}
                <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
                  {[company!=="Select Company", exp!=="Select Experience", role!=="Select Role"].map((done,i) => (
                    <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:done?"#0a7c6e":"#e5e7eb", transition:"background .3s, box-shadow .3s", boxShadow:done?"0 0 8px #0a7c6e80":"none" }} />
                  ))}
                  <span className="ot" style={{ fontSize:11, color:"#9ca3af", marginLeft:4 }}>
                    {[company!=="Select Company", exp!=="Select Experience", role!=="Select Role"].filter(Boolean).length}/3
                  </span>
                </div>
              </div>

              {/* Selects */}
              <div className="form-grid" style={{ marginBottom:isMobile?16:22 }}>
                {[
                  { label:"🏢 Target Company", val:company, set:setCompany, opts:COMPANIES },
                  { label:"📅 Experience",      val:exp,     set:setExp,     opts:EXPERIENCES },
                  { label:"💼 Role",             val:role,    set:setRole,    opts:ROLES },
                ].map(({ label, val, set, opts }) => (
                  <div key={label}>
                    <label className="ot" style={{ display:"block", fontSize:10.5, fontWeight:800, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.16em", marginBottom:9 }}>{label}</label>
                    <select className={`csel ${val !== opts[0] ? "filled" : ""}`}
                      style={{ borderRadius:14, padding:isMobile?"12px 38px 12px 14px":"14px 42px 14px 16px", fontSize:isMobile?14:14.5 }}
                      value={val} onChange={e => set(e.target.value)}>
                      {opts.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className="btn-crack" disabled={!canGo}
                onClick={() => {
                  if (!canGo) return;
                  navigate(`/interview/${toSlug(company)}/${toSlug(role)}/${expSlug(exp)}`);
                }}
                style={{ width:"100%", padding:isMobile?"16px":"20px", borderRadius:16, fontSize:isMobile?15:18 }}>
                <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
                  <span>⚡</span>
                  <span>{canGo ? `Crack ${company} Interview →` : "Crack Interview — Select All Fields"}</span>
                </span>
              </button>

              {!canGo && (
                <p className="ot" style={{ marginTop:10, fontSize:12, color:"#9ca3af", textAlign:"center" }}>
                  Select company, experience &amp; role to activate
                </p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className={`rv stats-row ${vis?"in":""}`} style={{ marginTop:isMobile?36:48, ...d(.34) }}>
            {[{n:"50K+",l:"Developers Trained"},{n:"200+",l:"Companies Covered"},{n:"10K+",l:"Questions"},{n:"98%",l:"Success Rate"}].map(s => (
              <div key={s.l} style={{ textAlign:"center" }}>
                <div className="bg" style={{ fontSize:isMobile?"1.7rem":"2.2rem", fontWeight:800, lineHeight:1,
                  background:"linear-gradient(135deg,#0a7c6e,#f59e0b)", WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent" }}>{s.n}</div>
                <div className="ot" style={{ fontSize:10.5, color:"#9ca3af", fontWeight:700, marginTop:5, textTransform:"uppercase", letterSpacing:"0.1em" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* divider */}
      <div style={{ height:2, background:"linear-gradient(90deg,transparent,#0a7c6e22,#f59e0b18,transparent)", margin:"0 24px" }} />

      {/* ══════════════════════════════
          COMPANY CARDS
      ══════════════════════════════ */}
      <section className="sec" style={{ position:"relative", zIndex:10 }}>
        <div className="wrap">
          <div style={{ textAlign:"center", marginBottom:isMobile?36:52 }}>
            <div className="stag" style={{ background:"#0a7c6e0e", border:"1.5px solid #0a7c6e28", color:"#0a7c6e", marginBottom:18 }}>
              🏢 Pick a Company to Get Started
            </div>
            <h2 className="bg" style={{ fontSize:isMobile?"1.6rem":"2.7rem", fontWeight:800, color:"#111827", letterSpacing:"-1px", lineHeight:1.12 }}>
              Click Any Company Card
            </h2>
            <p className="ot" style={{ marginTop:12, color:"#6b7280", fontSize:isMobile?"0.9rem":"1rem", lineHeight:1.75, maxWidth:460, margin:"12px auto 0" }}>
              We'll auto-fill the company &amp; scroll you to the interview generator.
            </p>
          </div>

          <div className="cards-grid">
            {CARDS.map(c => (
              <div key={c.name}
                className={`hcard ${flashCard===c.name?"card-flash":""}`}
                onClick={() => handleCardClick(c.name)}
                style={{ position:"relative", borderRadius:20, overflow:"hidden", background:"#fff",
                  border:`1.5px solid ${company===c.name?`${c.col}50`:"#f3f4f6"}`,
                  boxShadow: company===c.name ? `0 10px 36px ${c.col}20, 0 0 0 2px ${c.col}28` : "0 2px 10px rgba(0,0,0,0.06)" }}>
                <div style={{ height:3, background:`linear-gradient(90deg,${c.col},${c.col==="ff6b35"?"#f59e0b":"#ff6b35"})` }} />
                {company===c.name && (
                  <div style={{ position:"absolute", top:13, right:13, background:"#0a7c6e", color:"#fff", borderRadius:999, padding:"3px 10px", fontSize:10, fontWeight:800, fontFamily:"'Outfit',sans-serif", zIndex:2 }}>
                    ✓ Selected
                  </div>
                )}
                <div style={{ padding:isMobile?"18px 16px 20px":"22px 20px 24px" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:"#f9fafb", border:"1.5px solid #f3f4f6", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", flexShrink:0 }}>
                      <LogoImg src={c.logo} fb={c.fb} />
                    </div>
                    <div className="ot" style={{ padding:"3px 10px", borderRadius:999, fontSize:10, fontWeight:700, background:`${c.col}10`, color:c.col, border:`1.5px solid ${c.col}22`, whiteSpace:"nowrap" }}>{c.tag}</div>
                  </div>
                  <h3 className="bg" style={{ fontSize:isMobile?"1.1rem":"1.25rem", fontWeight:800, color:"#111827", marginBottom:8, letterSpacing:"-0.3px" }}>{c.name}</h3>
                  <p className="ot" style={{ fontSize:12.5, color:"#6b7280", lineHeight:1.65, marginBottom:14 }}>{c.desc}</p>
                  <div className="topic-pills" style={{ marginBottom:16 }}>
                    {c.topics.map(t => (
                      <span key={t} className="ot" style={{ fontSize:10.5, fontWeight:600, padding:"3px 9px", borderRadius:999, background:`${c.col}0e`, color:c.col, border:`1px solid ${c.col}20` }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:14, borderTop:"1.5px solid #f3f4f6" }}>
                    <div>
                      <span className="bg" style={{ fontSize:"1.2rem", fontWeight:800, color:c.col }}>{c.q}</span>
                      <span className="ot" style={{ fontSize:10.5, color:"#9ca3af", fontWeight:700, marginLeft:5 }}>Questions</span>
                    </div>
                    <span style={{ fontSize:12, fontWeight:700, color:c.col, fontFamily:"'Outfit',sans-serif", display:"flex", alignItems:"center", gap:4 }}>
                      Select &amp; Generate <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          STEPWISE PROGRESS
      ══════════════════════════════ */}
      <StepwiseProgress />

      {/* ══════════════════════════════
          MARQUEE
      ══════════════════════════════ */}
      <section style={{ position:"relative", zIndex:10, padding:isMobile?"48px 0":"72px 0" }}>
        <div style={{ height:1.5, background:"linear-gradient(90deg,transparent,#0a7c6e22,transparent)", marginBottom:isMobile?36:48 }} />
        <div style={{ textAlign:"center", marginBottom:36, padding:"0 20px" }}>
          <div className="stag" style={{ background:"#0a7c6e0e", border:"1.5px solid #0a7c6e25", color:"#0a7c6e", marginBottom:14 }}>
            🌐 200+ Companies
          </div>
          <h2 className="bg" style={{ fontSize:isMobile?"1.5rem":"2.5rem", fontWeight:800, color:"#111827", letterSpacing:"-0.8px" }}>
            Trusted by Developers Everywhere
          </h2>
        </div>

        {[MARQUEE, [...MARQUEE].reverse()].map((list, ri) => (
          <div key={ri} style={{ position:"relative", overflow:"hidden", marginBottom:ri===0?10:0 }}>
            <div className="fle mq-fade" style={{ position:"absolute", left:0, top:0, bottom:0, zIndex:10, pointerEvents:"none" }} />
            <div className="fre mq-fade" style={{ position:"absolute", right:0, top:0, bottom:0, zIndex:10, pointerEvents:"none" }} />
            <div className={ri===0?"mq":"mqr"}>
              {[...list,...list].map((name,i) => (
                <div key={i} style={{ margin:"0 6px", flexShrink:0 }}>
                  <button onClick={() => handleCardClick(name)} className="ot"
                    style={{ padding:isMobile?"8px 16px":"9px 22px", borderRadius:12, border:"1.5px solid #e5e7eb", background:"#fff", fontSize:isMobile?12:13, fontWeight:700, color:"#4b5563", cursor:"pointer", transition:"all .25s", whiteSpace:"nowrap" }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="#0a7c6e40";e.currentTarget.style.color="#0a7c6e";e.currentTarget.style.background="#f0fdf9";e.currentTarget.style.transform="translateY(-2px)";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="#e5e7eb";e.currentTarget.style.color="#4b5563";e.currentTarget.style.background="#fff";e.currentTarget.style.transform="translateY(0)";}}>
                    {name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ══════════════════════════════
          CTA BANNER
      ══════════════════════════════ */}
      <section style={{ position:"relative", zIndex:10, maxWidth:1100, margin:"0 auto", padding:isMobile?"0 16px 72px":"0 32px 96px" }}>
        <div className="cta-pad" style={{ position:"relative", borderRadius:isMobile?22:32, overflow:"hidden", textAlign:"center",
          background:"linear-gradient(135deg,#0a7c6e,#0e9988 50%,#0a7c6e)",
          boxShadow:"0 28px 80px rgba(10,124,110,0.28)" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,0.07) 1px,transparent 1px)", backgroundSize:"26px 26px", pointerEvents:"none" }} />
          <div style={{ position:"absolute", top:-50, right:-50, width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,107,53,0.22),transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:-40, left:-40, width:160, height:160, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,158,11,0.2),transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"relative", zIndex:2 }}>
            <div className="stag" style={{ background:"rgba(255,255,255,0.15)", border:"1.5px solid rgba(255,255,255,0.28)", color:"#fff", marginBottom:isMobile?18:24 }}>
              ✨ Join 50,000+ Developers
            </div>
            <h2 className="bg" style={{ fontSize:isMobile?"1.7rem":"3rem", fontWeight:800, color:"#fff", letterSpacing:"-1px", lineHeight:1.1, marginBottom:16 }}>
              Ready to Land Your Dream Role?
            </h2>
            <p className="ot" style={{ fontSize:isMobile?"0.9rem":"1rem", color:"rgba(255,255,255,0.78)", maxWidth:460, margin:"0 auto", marginBottom:isMobile?28:40, lineHeight:1.8 }}>
              Pick a company above, hit <strong style={{ color:"#fbbf24" }}>Crack Interview</strong> — get your AI prep plan in seconds.
            </p>
            <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
              <button className="btn-crack"
                style={{ padding:isMobile?"14px 28px":"17px 44px", borderRadius:16, fontSize:isMobile?14:16 }}
                onClick={() => formRef.current?.scrollIntoView({ behavior:"smooth", block:"center" })}>
                <span>Get My Interview Plan →</span>
              </button>
              <button className="ot" style={{ padding:isMobile?"14px 24px":"17px 34px", borderRadius:16, border:"1.5px solid rgba(255,255,255,0.3)", background:"rgba(255,255,255,0.12)", color:"#fff", fontSize:isMobile?13:15, fontWeight:700, cursor:"pointer", transition:"all .25s", backdropFilter:"blur(8px)" }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.22)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"}>
                View Sample Questions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
      <footer style={{ borderTop:"1.5px solid #e5e7eb", padding:isMobile?"24px 20px":"32px", textAlign:"center", background:"#fff" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:10 }}>
          <AnimatedLogo size={isMobile?24:28} />
          <span className="bg" style={{ fontSize:isMobile?15:17, fontWeight:800 }}>
            <span style={{ color:"#0a7c6e" }}>Java</span><span style={{ color:"#ff6b35" }}>Hired</span>
          </span>
        </div>
        <p className="ot" style={{ color:"#9ca3af", fontSize:12.5 }}>© 2025 JavaHired · AI-powered Java interview preparation</p>
      </footer>
    </div>
  );
}