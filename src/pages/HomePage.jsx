// src/pages/HomePage.jsx  — top of file

import { useState, useEffect } from "react";
import StepwiseProgress from "../components/StepwiseProgress";  // ✅
import AnimatedLogo     from "../components/AnimatedLogo";       // ✅

/* ─── Palette ─────────────────────────────────────────
   #0a7c6e  teal (primary)
   #f59e0b  amber (secondary)
   #ff6b35  orange (accent / CTA)
   #fafafa  warm white (bg)
──────────────────────────────────────────────────── */

const MARQUEE = [
  { name:"Google",        logo:"https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name:"Microsoft",     logo:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name:"Amazon",        logo:"https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name:"Oracle",        logo:"https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
  { name:"IBM",           logo:"https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name:"Meta",          logo:"https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name:"Netflix",       logo:"https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name:"Adobe",         logo:"https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png" },
  { name:"PayPal",        logo:"https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  { name:"Cisco",         logo:"https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg" },
  { name:"LinkedIn",      logo:"https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" },
  { name:"Infosys",       logo:"https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
  { name:"TCS",           logo:"https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg" },
  { name:"Wipro",         logo:"https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" },
  { name:"Goldman Sachs", logo:"https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg" },
  { name:"Accenture",     logo:"https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" },
  { name:"Capgemini",     logo:"https://upload.wikimedia.org/wikipedia/commons/7/7e/Capgemini_201x_logo.svg" },
  { name:"Deloitte",      logo:"https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg" },
  { name:"JPMorgan",      logo:"https://upload.wikimedia.org/wikipedia/commons/a/af/J_P_Morgan_Logo_2008_1.svg" },
  { name:"Wells Fargo",   logo:"https://upload.wikimedia.org/wikipedia/commons/b/b3/Wells_Fargo_Bank.svg" },
];

const CARDS = [
  { name:"JPMorgan",    tag:"FinTech Giant",       desc:"Enterprise Java, multithreading, low-latency systems & fintech interviews.", col:"#0a7c6e", logo:"https://upload.wikimedia.org/wikipedia/commons/a/af/J_P_Morgan_Logo_2008_1.svg", fb:"JP", q:"340+" },
  { name:"Deloitte",    tag:"Big Four Consulting", desc:"Java full stack, consulting projects, React + Spring Boot interview prep.",  col:"#f59e0b", logo:"https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg",             fb:"D",  q:"280+" },
  { name:"Mphasis",     tag:"Banking Tech",        desc:"Java backend, Spring Boot, banking domain, SQL & microservices prep.",       col:"#ff6b35", logo:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Mphasis_new_logo.jpg",     fb:"M",  q:"210+" },
  { name:"Wells Fargo", tag:"Financial Services",  desc:"Banking technology, REST APIs, Java backend & production support prep.",     col:"#0a7c6e", logo:"https://upload.wikimedia.org/wikipedia/commons/b/b3/Wells_Fargo_Bank.svg",     fb:"WF", q:"195+" },
];

const STATS = [
  { n:"50K+", l:"Developers Trained" },
  { n:"200+", l:"Companies Covered"  },
  { n:"10K+", l:"Interview Questions" },
  { n:"98%",  l:"Success Rate"       },
];

const PILLS = [
  {t:"Java 21",i:"☕"}, {t:"Spring Boot",i:"🌱"}, {t:"Microservices",i:"🔗"},
  {t:"System Design",i:"🏗️"}, {t:"DSA",i:"🧠"}, {t:"React",i:"⚛️"},
  {t:"PostgreSQL",i:"🐘"}, {t:"Kafka",i:"📨"}, {t:"Docker/K8s",i:"🐳"}, {t:"AWS",i:"☁️"},
];

const FEATURES = [
  { icon:"🎯", title:"Tailored Roadmaps",       desc:"AI builds a plan based on your target company, role, and experience — updated weekly with fresh interview data.", col:"#0a7c6e" },
  { icon:"🤖", title:"AI Mock Interviews",       desc:"Simulate real pressure. The AI asks follow-ups, evaluates reasoning, and scores communication like a seasoned interviewer.", col:"#f59e0b" },
  { icon:"📊", title:"Live Progress Tracking",  desc:"A live readiness score climbs as you complete sessions. A heatmap reveals weak spots so you study what matters.", col:"#ff6b35" },
];

/* ── Helpers ──────────────────────────────────────────── */
function LogoImg({ src, fb }) {
  const [err, setErr] = useState(false);
  return err
    ? <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:12, color:"#374151" }}>{fb}</span>
    : <img src={src} alt={fb} style={{ maxHeight:30, maxWidth:"100%", objectFit:"contain" }} onError={()=>setErr(true)} />;
}

function MarqItem({ c }) {
  const [err, setErr] = useState(false);
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ margin:"0 10px", flexShrink:0, display:"flex", alignItems:"center", gap:10, padding:"10px 20px", borderRadius:14,
        border:`1.5px solid ${hov?"#0a7c6e40":"#e5e7eb"}`,
        background:hov?"#f0fdf9":"#ffffff",
        transform:hov?"translateY(-3px)":"translateY(0)",
        boxShadow:hov?"0 8px 24px rgba(10,124,110,0.12)":"0 1px 4px rgba(0,0,0,0.06)",
        transition:"all .3s", cursor:"pointer" }}>
      <div style={{ width:32, height:32, borderRadius:9, background:"#f9fafb", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", flexShrink:0, border:"1px solid #f3f4f6" }}>
        {!err ? <img src={c.logo} alt={c.name} style={{ maxWidth:20, maxHeight:16, objectFit:"contain" }} onError={()=>setErr(true)} />
               : <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:9, color:"#374151" }}>{c.name[0]}</span>}
      </div>
      <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:13, color:"#4b5563", whiteSpace:"nowrap" }}>{c.name}</span>
    </div>
  );
}

/* ── Global CSS ─────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Outfit:wght@300;400;500;600;700;800&display=swap');

:root {
  --teal:   #0a7c6e;
  --teal2:  #0e9988;
  --amber:  #f59e0b;
  --orange: #ff6b35;
  --bg:     #fafafa;
  --card:   #ffffff;
  --tx:     #111827;
  --tx2:    #4b5563;
  --mu:     #9ca3af;
  --brd:    #e5e7eb;
  --brd2:   #f3f4f6;
}
*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; }
body { background:var(--bg); color:var(--tx); font-family:'Outfit',sans-serif; -webkit-font-smoothing:antialiased; overflow-x:hidden; }
.bg  { font-family:'Bricolage Grotesque',sans-serif !important; }
.ot  { font-family:'Outfit',sans-serif !important; }

/* ── Marquee ── */
@keyframes mq  { from{transform:translateX(0)}  to{transform:translateX(-50%)} }
@keyframes mqr { from{transform:translateX(-50%)} to{transform:translateX(0)} }
.mq  { display:flex; width:max-content; animation:mq  32s linear infinite; }
.mqr { display:flex; width:max-content; animation:mqr 26s linear infinite; }
.mq:hover,.mqr:hover { animation-play-state:paused; }

/* ── Reveal ── */
@keyframes rup { from{opacity:0;transform:translateY(28px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
.rv { opacity:0; }
.rv.in { animation:rup .72s cubic-bezier(.22,.68,0,1.18) forwards; }

/* ── Float ── */
@keyframes fl { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
.float { animation:fl 5s ease-in-out infinite; }

/* ── Shimmer ── */
@keyframes shim { 0%{background-position:-200% center} 100%{background-position:200% center} }
.shim {
  background:linear-gradient(90deg,#0a7c6e,#f59e0b,#ff6b35,#f59e0b,#0a7c6e);
  background-size:200% auto;
  animation:shim 4s linear infinite;
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
}

/* ── Dot pulse ── */
@keyframes dpulse { 0%,100%{transform:scale(1);opacity:.8} 50%{transform:scale(1.5);opacity:1} }
.dpulse { animation:dpulse 2s ease-in-out infinite; }

/* ── Spin ── */
@keyframes spin  { to{transform:rotate(360deg)} }
@keyframes spinr { to{transform:rotate(-360deg)} }

/* ── Blob ── */
@keyframes blob {
  0%,100% { border-radius:60% 40% 30% 70%/60% 30% 70% 40%; transform:translate(0,0) scale(1); }
  33%      { border-radius:30% 60% 70% 40%/50% 60% 30% 60%; transform:translate(30px,-20px) scale(1.05); }
  66%      { border-radius:40% 60% 30% 70%/40% 40% 70% 50%; transform:translate(-20px,15px) scale(.95); }
}
.blob { animation:blob 14s ease-in-out infinite; position:absolute; pointer-events:none; }

/* ── Pill hover ── */
.pill { border:1.5px solid #e5e7eb; background:#ffffff; transition:all .25s; cursor:pointer; }
.pill:hover { background:#f0fdf9; border-color:#0a7c6e50; transform:translateY(-4px); box-shadow:0 8px 24px rgba(10,124,110,0.12); }

/* ── Select ── */
.csel {
  background:#f9fafb; border:1.5px solid #e5e7eb; color:#111827; appearance:none; -webkit-appearance:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat:no-repeat; background-position:right 14px center; background-size:18px;
  font-family:'Outfit',sans-serif; font-weight:600; transition:border-color .2s, background .2s;
}
.csel:focus { outline:none; border-color:#0a7c6e; background:#f0fdf9; }
.csel option { background:#fff; }

/* ── Button primary ── */
.btn-teal {
  background:linear-gradient(135deg,#0a7c6e,#0e9988);
  border:none; color:#fff; cursor:pointer; font-family:'Bricolage Grotesque',sans-serif; font-weight:700;
  transition:transform .25s, box-shadow .25s; position:relative; overflow:hidden;
}
.btn-teal::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,#0e9988,#14b8a6); opacity:0; transition:opacity .3s; }
.btn-teal:hover  { transform:scale(1.03); box-shadow:0 0 32px rgba(10,124,110,0.45); }
.btn-teal:hover::after { opacity:1; }
.btn-teal > span { position:relative; z-index:1; }

/* ── Button orange ── */
.btn-orange {
  background:linear-gradient(135deg,#ff6b35,#f59e0b);
  border:none; color:#fff; cursor:pointer; font-family:'Bricolage Grotesque',sans-serif; font-weight:700;
  transition:transform .25s, box-shadow .25s; position:relative; overflow:hidden;
}
.btn-orange::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,#f97316,#fbbf24); opacity:0; transition:opacity .3s; }
.btn-orange:hover  { transform:scale(1.03); box-shadow:0 0 32px rgba(255,107,53,0.45); }
.btn-orange:hover::after { opacity:1; }
.btn-orange > span { position:relative; z-index:1; }

/* ── Card ── */
.hcard { transition:transform .38s cubic-bezier(.22,.68,0,1.2), box-shadow .38s; cursor:pointer; }
.hcard:hover { transform:translateY(-10px) scale(1.015); }

/* ── Fade edges ── */
.fle { background:linear-gradient(90deg,var(--bg),transparent); }
.fre { background:linear-gradient(-90deg,var(--bg),transparent); }

/* ── Section tag ── */
.stag {
  display:inline-flex; align-items:center; gap:8px; padding:5px 16px; border-radius:999px;
  font-family:'Outfit',sans-serif; font-weight:700; font-size:11px; text-transform:uppercase; letter-spacing:.16em;
}

/* ── Underline accent ── */
.u-teal { position:relative; display:inline-block; }
.u-teal::after {
  content:''; position:absolute; bottom:-4px; left:0; right:0; height:4px; border-radius:2px;
  background:linear-gradient(90deg,#0a7c6e,#f59e0b); transform:scaleX(0); transform-origin:left;
  transition:transform .5s cubic-bezier(.22,.68,0,1.2);
}
.u-teal:hover::after { transform:scaleX(1); }
`;

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function HomePage() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);
  const d = s => ({ animationDelay:`${s}s` });

  return (
    <div style={{ background:"#fafafa", minHeight:"100vh", overflowX:"hidden" }}>
      <style>{CSS}</style>

      {/* ── Background blobs ── */}
      <div style={{ position:"fixed", inset:0, zIndex:0, overflow:"hidden", pointerEvents:"none" }}>
        <div className="blob" style={{ width:500, height:500, background:"radial-gradient(circle,#0a7c6e12,transparent 70%)", top:-100, left:-100 }} />
        <div className="blob" style={{ width:400, height:400, background:"radial-gradient(circle,#f59e0b10,transparent 70%)", bottom:-80, right:-80, animationDelay:"5s" }} />
        <div className="blob" style={{ width:320, height:320, background:"radial-gradient(circle,#ff6b3510,transparent 70%)", top:"40%", left:"55%", animationDelay:"9s" }} />
        {/* Dot pattern */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(#0a7c6e18 1px,transparent 1px)", backgroundSize:"28px 28px", opacity:.55 }} />
      </div>

      {/* ════════════ NAVBAR ════════════ */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(250,250,250,0.88)", backdropFilter:"blur(24px)", borderBottom:"1px solid #e5e7eb", boxShadow:"0 1px 0 rgba(10,124,110,0.07)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 36px", height:70, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          {/* Animated Logo + Wordmark */}
          <div className={`rv ${vis?"in":""}`} style={{ display:"flex", alignItems:"center", gap:12, ...d(.02) }}>
            <AnimatedLogo size={42} />
            <div>
              <div style={{ display:"flex", alignItems:"baseline", gap:0 }}>
                <span className="bg" style={{ fontSize:22, fontWeight:800, color:"#0a7c6e", letterSpacing:"-0.5px" }}>Java</span>
                <span className="bg" style={{ fontSize:22, fontWeight:800, color:"#ff6b35", letterSpacing:"-0.5px" }}>Hired</span>
              </div>
              <div className="ot" style={{ fontSize:9, fontWeight:700, letterSpacing:"0.25em", color:"#9ca3af", textTransform:"uppercase", marginTop:1 }}>AI Interview Platform</div>
            </div>
          </div>

          {/* Links */}
          <div style={{ display:"flex", alignItems:"center", gap:4 }}>
            {["Companies","Questions","Roadmaps"].map(l => (
              <button key={l} className="ot u-teal" style={{ padding:"8px 16px", fontSize:13.5, fontWeight:600, color:"#4b5563", background:"transparent", border:"none", cursor:"pointer", borderRadius:10, transition:"color .2s" }}
                onMouseEnter={e=>e.target.style.color="#0a7c6e"} onMouseLeave={e=>e.target.style.color="#4b5563"}>{l}</button>
            ))}
            <div style={{ width:1, height:24, background:"#e5e7eb", margin:"0 6px" }} />
            <button className="btn-teal" style={{ padding:"10px 24px", borderRadius:14, fontSize:13.5 }}>
              <span>Get Started →</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ════════════ HERO ════════════ */}
      <section style={{ position:"relative", zIndex:10, maxWidth:1280, margin:"0 auto", padding:"100px 36px 80px", textAlign:"center" }}>

        {/* Eyebrow */}
        <div className={`rv ${vis?"in":""}`} style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"7px 20px", borderRadius:999, border:"1.5px solid #0a7c6e30", background:"#0a7c6e0c", marginBottom:40, ...d(.04) }}>
          <span className="dpulse" style={{ width:8, height:8, borderRadius:"50%", background:"#ff6b35", boxShadow:"0 0 10px #ff6b35", display:"inline-block" }} />
          <span className="shim bg" style={{ fontSize:12, fontWeight:700, letterSpacing:"0.06em" }}>AI-Powered Java Interview Preparation</span>
        </div>

        {/* H1 */}
        <div className={`rv ${vis?"in":""}`} style={d(.10)}>
          <h1 className="bg" style={{ fontSize:"clamp(3rem,7vw,6rem)", fontWeight:800, lineHeight:1.05, letterSpacing:"-2.5px", color:"#111827" }}>
            Crack Java Interviews
          </h1>
          <h1 className="bg" style={{ fontSize:"clamp(3rem,7vw,6rem)", fontWeight:800, lineHeight:1.05, letterSpacing:"-2.5px", marginBottom:32,
            background:"linear-gradient(135deg,#0a7c6e 0%,#f59e0b 50%,#ff6b35 100%)", WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Like A Pro
          </h1>
        </div>

        <p className={`rv ot ${vis?"in":""}`} style={{ fontSize:"1.15rem", lineHeight:1.8, color:"#6b7280", maxWidth:560, margin:"0 auto 60px", fontWeight:400, ...d(.18) }}>
          Master Java, Spring Boot, System Design &amp; Microservices with personalized AI roadmaps and real interview questions from top companies.
        </p>

        {/* Stats */}
        <div className={`rv ${vis?"in":""}`} style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:52, marginBottom:68, ...d(.26) }}>
          {STATS.map(s => (
            <div key={s.l} style={{ textAlign:"center" }}>
              <div className="bg" style={{ fontSize:"2.4rem", fontWeight:800, lineHeight:1,
                background:"linear-gradient(135deg,#0a7c6e,#f59e0b)", WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent" }}>{s.n}</div>
              <div className="ot" style={{ fontSize:11, color:"#9ca3af", fontWeight:700, marginTop:6, textTransform:"uppercase", letterSpacing:"0.1em" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* ── Search card ── */}
        <div className={`rv ${vis?"in":""}`} style={{ position:"relative", maxWidth:900, margin:"0 auto", ...d(.34) }}>
          {/* Outer tinted shadow */}
          <div style={{ position:"absolute", inset:-2, borderRadius:30, background:"linear-gradient(135deg,#0a7c6e30,#f59e0b25,#ff6b3520)", zIndex:-1, filter:"blur(3px)" }} />
          <div style={{ background:"#ffffff", borderRadius:28, border:"1.5px solid #e5e7eb", padding:"44px 40px", boxShadow:"0 24px 80px rgba(10,124,110,0.10)" }}>
            {/* Card header accent */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
              <p className="ot" style={{ fontSize:11, fontWeight:800, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.2em" }}>Build your personalized plan</p>
              <div style={{ display:"flex", gap:5 }}>
                {["#0a7c6e","#f59e0b","#ff6b35"].map((c,i)=>(
                  <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c, opacity:.8 }} />
                ))}
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18, marginBottom:22 }}>
              {[
                { label:"Target Company",  opts:["Select Company","Oracle","Amazon","Google","Microsoft","Infosys","TCS","Deloitte","JPMorgan","Wells Fargo","Mphasis"] },
                { label:"Experience Level", opts:["Years of Experience","0–1 Years","1–3 Years","3–5 Years","5–8 Years","8+ Years"] },
                { label:"Focus Area",       opts:["Interview Type","Java Backend","Full Stack","Spring Boot","System Design","DSA & Algo","Microservices"] },
              ].map(({label,opts}) => (
                <div key={label}>
                  <label className="ot" style={{ display:"block", fontSize:10.5, fontWeight:800, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.14em", marginBottom:9 }}>{label}</label>
                  <select className="csel" style={{ width:"100%", borderRadius:14, padding:"14px 42px 14px 16px", fontSize:14 }}>
                    {opts.map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <button className="btn-orange" style={{ width:"100%", padding:"19px", borderRadius:16, fontSize:17 }}>
              <span>Generate My Interview Plan 🚀</span>
            </button>
          </div>
        </div>

        {/* Pills */}
        <div className={`rv ${vis?"in":""}`} style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:10, marginTop:40, ...d(.42) }}>
          {PILLS.map(p => (
            <div key={p.t} className="pill ot" style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 20px", borderRadius:999, fontSize:13, fontWeight:600, color:"#4b5563" }}>
              <span style={{ fontSize:14 }}>{p.i}</span>{p.t}
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ height:1.5, background:"linear-gradient(90deg,transparent,#0a7c6e30,#f59e0b30,#ff6b3520,transparent)", margin:"0 36px" }} />

      {/* ════════════ COMPANY CARDS ════════════ */}
      <section style={{ position:"relative", zIndex:10, maxWidth:1280, margin:"0 auto", padding:"96px 36px" }}>
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <div className="stag" style={{ background:"#0a7c6e0f", border:"1.5px solid #0a7c6e28", color:"#0a7c6e", marginBottom:22 }}>
            🎯 Top Company Prep
          </div>
          <h2 className="bg" style={{ fontSize:"clamp(1.9rem,4vw,3.1rem)", fontWeight:800, color:"#111827", letterSpacing:"-1.2px", lineHeight:1.12 }}>
            Prepare For Top Companies
          </h2>
          <p className="ot" style={{ marginTop:16, color:"#6b7280", fontSize:"1rem", lineHeight:1.75, maxWidth:460, margin:"16px auto 0" }}>
            Company-specific roadmaps with real questions, verified by developers who cracked those interviews.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))", gap:22 }}>
          {CARDS.map(c => (
            <div key={c.name} className="hcard"
              style={{ position:"relative", borderRadius:24, overflow:"hidden", background:"#ffffff", border:"1.5px solid #f3f4f6", boxShadow:"0 4px 20px rgba(0,0,0,0.06)" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${c.col}40`; e.currentTarget.style.boxShadow=`0 20px 60px ${c.col}18`; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="#f3f4f6"; e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.06)"; }}>
              {/* Top accent */}
              <div style={{ height:4, background:`linear-gradient(90deg,${c.col},${c.col === "#0a7c6e" ? "#f59e0b" : "#ff6b35"})` }} />
              <div style={{ padding:"26px 26px 28px" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20 }}>
                  <div style={{ width:52, height:52, borderRadius:14, background:"#f9fafb", border:"1.5px solid #f3f4f6", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", flexShrink:0 }}>
                    <LogoImg src={c.logo} fb={c.fb} />
                  </div>
                  <div className="ot" style={{ padding:"4px 12px", borderRadius:999, fontSize:11, fontWeight:700, background:`${c.col}10`, color:c.col, border:`1.5px solid ${c.col}25` }}>{c.tag}</div>
                </div>
                <h3 className="bg" style={{ fontSize:"1.4rem", fontWeight:800, color:"#111827", marginBottom:10, letterSpacing:"-0.4px" }}>{c.name}</h3>
                <p className="ot" style={{ fontSize:13.5, color:"#6b7280", lineHeight:1.7, marginBottom:22 }}>{c.desc}</p>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:18, borderTop:"1.5px solid #f3f4f6" }}>
                  <div>
                    <div className="bg" style={{ fontSize:"1.5rem", fontWeight:800, color:c.col }}>{c.q}</div>
                    <div className="ot" style={{ fontSize:11, color:"#9ca3af", fontWeight:700 }}>Questions</div>
                  </div>
                  <button className="ot" style={{ padding:"10px 20px", borderRadius:12, border:`1.5px solid ${c.col}35`, background:`${c.col}0d`, color:c.col, fontSize:13, fontWeight:700, cursor:"pointer", transition:"all .25s" }}
                    onMouseEnter={e=>{ e.target.style.background=`${c.col}1a`; e.target.style.transform="scale(1.05)"; }}
                    onMouseLeave={e=>{ e.target.style.background=`${c.col}0d`; e.target.style.transform="scale(1)"; }}>
                    Explore →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ STEPWISE ════════════ */}
      <StepwiseProgress />

      {/* ════════════ MARQUEE ════════════ */}
      <section style={{ position:"relative", zIndex:10, padding:"80px 0" }}>
        <div style={{ height:1.5, background:"linear-gradient(90deg,transparent,#0a7c6e25,transparent)", marginBottom:60 }} />
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div className="stag" style={{ background:"#0a7c6e0f", border:"1.5px solid #0a7c6e25", color:"#0a7c6e", marginBottom:18 }}>
            🌐 Industry Coverage
          </div>
          <h2 className="bg" style={{ fontSize:"clamp(1.7rem,3.5vw,2.7rem)", fontWeight:800, color:"#111827", letterSpacing:"-1px" }}>
            Trusted by Developers Everywhere
          </h2>
        </div>
        {[MARQUEE, [...MARQUEE].reverse()].map((list,ri) => (
          <div key={ri} style={{ position:"relative", overflow:"hidden", marginBottom:ri===0?12:0 }}>
            <div className="fle" style={{ position:"absolute", left:0, top:0, bottom:0, width:200, zIndex:10, pointerEvents:"none" }} />
            <div className="fre" style={{ position:"absolute", right:0, top:0, bottom:0, width:200, zIndex:10, pointerEvents:"none" }} />
            <div className={ri===0?"mq":"mqr"}>
              {[...list,...list].map((c,i)=><MarqItem key={i} c={c} />)}
            </div>
          </div>
        ))}
      </section>

      {/* ════════════ FEATURES ════════════ */}
      <section style={{ position:"relative", zIndex:10, maxWidth:1280, margin:"0 auto", padding:"72px 36px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:22 }}>
          {FEATURES.map(f => (
            <div key={f.title} className="hcard"
              style={{ borderRadius:22, padding:"36px 32px", border:"1.5px solid #f3f4f6", background:"#ffffff", position:"relative", overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${f.col}35`; e.currentTarget.style.boxShadow=`0 16px 48px ${f.col}14`; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="#f3f4f6"; e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.05)"; }}>
              <div style={{ position:"absolute", bottom:-40, right:-40, width:160, height:160, borderRadius:"50%", background:`${f.col}08`, filter:"blur(40px)", pointerEvents:"none" }} />
              <div style={{ width:58, height:58, borderRadius:18, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, marginBottom:26, background:`${f.col}10`, border:`1.5px solid ${f.col}22` }}>{f.icon}</div>
              <h3 className="bg" style={{ fontSize:"1.2rem", fontWeight:800, color:"#111827", marginBottom:12, letterSpacing:"-0.3px" }}>{f.title}</h3>
              <p className="ot" style={{ fontSize:14, color:"#6b7280", lineHeight:1.8 }}>{f.desc}</p>
              <div style={{ height:3, background:`linear-gradient(90deg,${f.col},${f.col}40)`, borderRadius:2, marginTop:28, width:44, transition:"width .5s" }}
                onMouseEnter={e=>e.target.style.width="100%"} onMouseLeave={e=>e.target.style.width="44px"} />
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ CTA BANNER ════════════ */}
      <section style={{ position:"relative", zIndex:10, maxWidth:1100, margin:"0 auto 96px", padding:"0 36px" }}>
        <div style={{ position:"relative", borderRadius:32, overflow:"hidden", padding:"88px 64px", textAlign:"center", background:"linear-gradient(135deg,#0a7c6e,#0e9988 40%,#0a7c6e 100%)", boxShadow:"0 32px 96px rgba(10,124,110,0.3)" }}>
          {/* Pattern overlay */}
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,0.07) 1px,transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />
          {/* Decorative circles */}
          <div style={{ position:"absolute", width:320, height:320, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.12)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", animation:"spin 20s linear infinite" }} />
          <div style={{ position:"absolute", width:220, height:220, borderRadius:"50%", border:"1px dashed rgba(255,255,255,0.09)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", animation:"spinr 14s linear infinite" }} />
          {/* Orange blob accent */}
          <div style={{ position:"absolute", top:-40, right:-40, width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,107,53,0.3),transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:-40, left:-40, width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,158,11,0.25),transparent 70%)", pointerEvents:"none" }} />

          <div style={{ position:"relative", zIndex:2 }}>
            <div className="stag" style={{ background:"rgba(255,255,255,0.15)", border:"1.5px solid rgba(255,255,255,0.3)", color:"#fff", marginBottom:26 }}>
              ✨ Join 50,000+ Developers
            </div>
            <h2 className="bg" style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:800, color:"#ffffff", letterSpacing:"-1.5px", lineHeight:1.08, marginBottom:20 }}>
              Ready to Land Your<br/>
              <span style={{ color:"#f59e0b", WebkitTextFillColor:"#f59e0b" }}>Dream Java Role?</span>
            </h2>
            <p className="ot" style={{ fontSize:"1.05rem", color:"rgba(255,255,255,0.8)", maxWidth:500, margin:"0 auto 44px", lineHeight:1.8 }}>
              Start with a free personalized roadmap. No credit card required. Your next offer is closer than you think.
            </p>
            <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              <button className="btn-orange" style={{ padding:"17px 44px", borderRadius:16, fontSize:16 }}>
                <span>Start Free Today →</span>
              </button>
              <button className="ot" style={{ padding:"17px 34px", borderRadius:16, border:"1.5px solid rgba(255,255,255,0.3)", background:"rgba(255,255,255,0.12)", color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", transition:"all .25s", backdropFilter:"blur(8px)" }}
                onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.22)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.12)"; }}>
                View Sample Questions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer style={{ borderTop:"1.5px solid #e5e7eb", padding:"36px", textAlign:"center", background:"#ffffff" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:12 }}>
          <AnimatedLogo size={30} />
          <span className="bg" style={{ fontSize:18, fontWeight:800 }}>
            <span style={{ color:"#0a7c6e" }}>Java</span>
            <span style={{ color:"#ff6b35" }}>Hired</span>
          </span>
        </div>
        <p className="ot" style={{ color:"#9ca3af", fontSize:13 }}>© 2025 JavaHired · AI-powered Java interview preparation</p>
      </footer>
    </div>
  );
}