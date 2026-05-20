import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════════
   MOCK DATA  (move to src/data/mockInterviewData.js in Sprint 4)
═══════════════════════════════════════════════════════════════ */
const MOCK = {
  google: {
    name: "Google", industry: "Product / Cloud", accentColor: "#0a7c6e",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    tip: "Google focuses heavily on System Design & DSA. Expect 2–3 coding rounds and at least one system design round for 3–5 yr experience.",
    process: ["Online Coding Test","Technical Round 1 (DSA)","Technical Round 2 (Java)","System Design Round","Googliness / HR","Offer"],
    rounds: [
      { id:"technical",    icon:"💻", title:"Technical Round",    subtitle:"Core Java, Spring Boot & Microservices", accentColor:"#0a7c6e", totalQ:42, doneQ:0, totalT:7, estimatedH:12,
        topics:[{t:"OOPs & Design Principles",q:6},{t:"Java Collections",q:8},{t:"Multithreading & Concurrency",q:7},{t:"Spring Boot",q:8},{t:"Microservices",q:6},{t:"JVM Internals",q:4},{t:"Java 8+ Streams",q:3}] },
      { id:"coding",       icon:"🧮", title:"Coding Round",        subtitle:"DSA, Algorithms & Problem Solving",     accentColor:"#f59e0b", totalQ:30, doneQ:0, totalT:6, estimatedH:20,
        topics:[{t:"Arrays & Strings",q:8},{t:"Trees & Graphs",q:6},{t:"Dynamic Programming",q:6},{t:"Recursion",q:4},{t:"Hashing",q:3},{t:"Sorting",q:3}] },
      { id:"system-design",icon:"🏗️", title:"System Design",       subtitle:"HLD, LLD & Scalability",               accentColor:"#ff6b35", totalQ:18, doneQ:0, totalT:4, estimatedH:15,
        topics:[{t:"High Level Design",q:5},{t:"Low Level Design",q:5},{t:"Database Design",q:4},{t:"API Design & REST",q:4}] },
      { id:"hr",           icon:"🤝", title:"Behavioral & HR",     subtitle:"Googliness, Culture Fit & Process",    accentColor:"#64748b", totalQ:10, doneQ:0, totalT:3, estimatedH:3,
        topics:[{t:"Behavioral Questions",q:4},{t:"Googliness & Culture",q:3},{t:"Salary & Process",q:3}] },
    ],
    recent:[
      {q:"How does HashMap work internally?",       round:"Technical",     diff:"medium", year:2024},
      {q:"Design a URL shortener like bit.ly",      round:"System Design", diff:"hard",   year:2024},
      {q:"Find all pairs in array with sum = K",    round:"Coding",        diff:"medium", year:2024},
      {q:"Explain ConcurrentHashMap vs Hashtable",  round:"Technical",     diff:"hard",   year:2023},
    ],
  },
  jpmorgan: {
    name: "JPMorgan", industry: "FinTech / Banking", accentColor: "#f59e0b",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/J_P_Morgan_Logo_2008_1.svg",
    tip: "JPMorgan focuses on Java concurrency, low-latency systems, and fintech domain knowledge. SQL and multithreading are critical.",
    process: ["HireVue Video Interview","Technical Phone Screen","Technical Round (Java + Concurrency)","Domain Round (FinTech)","HR / Cultural Fit","Offer"],
    rounds: [
      { id:"technical",    icon:"💻", title:"Technical Round",    subtitle:"Java Concurrency, Spring Boot & SQL",    accentColor:"#0a7c6e", totalQ:38, doneQ:0, totalT:6, estimatedH:10,
        topics:[{t:"Java Concurrency",q:10},{t:"Spring Boot & REST",q:8},{t:"Advanced SQL",q:7},{t:"Java Collections",q:6},{t:"Design Patterns",q:4},{t:"JVM & Performance",q:3}] },
      { id:"coding",       icon:"🧮", title:"Coding Round",        subtitle:"DSA & SQL Problem Solving",             accentColor:"#f59e0b", totalQ:20, doneQ:0, totalT:4, estimatedH:12,
        topics:[{t:"Arrays & Strings",q:6},{t:"Hashing & Maps",q:5},{t:"SQL Problems",q:5},{t:"Dynamic Programming",q:4}] },
      { id:"domain",       icon:"🏦", title:"Domain Round",        subtitle:"FinTech, Banking & Low Latency",        accentColor:"#ff6b35", totalQ:14, doneQ:0, totalT:3, estimatedH:5,
        topics:[{t:"FinTech Concepts",q:5},{t:"Low Latency Systems",q:5},{t:"Banking System Design",q:4}] },
      { id:"hr",           icon:"🤝", title:"HR & Culture",        subtitle:"Behavioral & Culture Fit",              accentColor:"#64748b", totalQ:8,  doneQ:0, totalT:2, estimatedH:2,
        topics:[{t:"Behavioral Questions",q:5},{t:"Process & Salary",q:3}] },
    ],
    recent:[
      {q:"Implement a thread-safe singleton",        round:"Technical", diff:"medium", year:2024},
      {q:"Design a payment processing system",       round:"Domain",    diff:"hard",   year:2024},
      {q:"SQL for running total per group",          round:"Coding",    diff:"medium", year:2024},
      {q:"Explain ExecutorService & thread pools",   round:"Technical", diff:"hard",   year:2023},
    ],
  },
  tcs: {
    name: "TCS", industry: "IT Services", accentColor: "#ff6b35",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
    tip: "TCS follows NQT + Technical + Managerial + HR. Focus on Core Java, OOPs, and basic SQL for a strong foundation.",
    process: ["TCS NQT (Online Test)","Technical Interview (Java + OOPs)","Managerial Round","HR Round","Offer"],
    rounds: [
      { id:"technical",    icon:"💻", title:"Technical Round",    subtitle:"Core Java, OOPs & Basics",              accentColor:"#0a7c6e", totalQ:35, doneQ:0, totalT:5, estimatedH:8,
        topics:[{t:"OOPs Concepts",q:10},{t:"Core Java Fundamentals",q:10},{t:"Java Collections",q:6},{t:"Spring MVC Basics",q:5},{t:"SQL Fundamentals",q:4}] },
      { id:"aptitude",     icon:"🔢", title:"Aptitude Round",      subtitle:"Logical, Verbal & Quantitative",        accentColor:"#f59e0b", totalQ:20, doneQ:0, totalT:3, estimatedH:6,
        topics:[{t:"Quantitative Aptitude",q:8},{t:"Logical Reasoning",q:7},{t:"Verbal Ability",q:5}] },
      { id:"coding",       icon:"🧮", title:"Coding Round",        subtitle:"Easy–Medium DSA & SQL",                 accentColor:"#ff6b35", totalQ:15, doneQ:0, totalT:3, estimatedH:8,
        topics:[{t:"Arrays & Strings",q:6},{t:"Patterns & Basic Logic",q:5},{t:"SQL Queries",q:4}] },
      { id:"hr",           icon:"🤝", title:"HR & Managerial",     subtitle:"Behavioral, Career & Culture",          accentColor:"#64748b", totalQ:12, doneQ:0, totalT:3, estimatedH:2,
        topics:[{t:"Behavioral Questions",q:5},{t:"Managerial Round Qs",q:4},{t:"Career Goals & Salary",q:3}] },
    ],
    recent:[
      {q:"Difference between abstract class & interface", round:"Technical", diff:"easy",   year:2024},
      {q:"Reverse a string without built-in methods",     round:"Coding",    diff:"easy",   year:2024},
      {q:"Difference between == and equals()?",           round:"Technical", diff:"easy",   year:2024},
      {q:"SQL to find 2nd highest salary",                round:"Coding",    diff:"easy",   year:2023},
    ],
  },
  deloitte: {
    name: "Deloitte", industry: "Consulting / IT", accentColor: "#0a7c6e",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg",
    tip: "Deloitte focuses on full-stack Java with React. Expect Spring Boot REST API, React hooks, and consulting scenario questions.",
    process: ["Online Aptitude + Coding Test","Technical Round 1 (Java + Spring Boot)","Technical Round 2 (React + APIs)","Case Study Round","HR Round","Offer"],
    rounds: [
      { id:"technical",    icon:"💻", title:"Technical Round",    subtitle:"Java, Spring Boot & REST APIs",          accentColor:"#0a7c6e", totalQ:38, doneQ:0, totalT:6, estimatedH:10,
        topics:[{t:"Spring Boot",q:10},{t:"REST API Design",q:8},{t:"Java Collections",q:7},{t:"OOPs",q:6},{t:"Hibernate/JPA",q:5},{t:"Exception Handling",q:2}] },
      { id:"frontend",     icon:"⚛️", title:"Frontend Round",      subtitle:"React, JavaScript & UI Concepts",       accentColor:"#f59e0b", totalQ:22, doneQ:0, totalT:4, estimatedH:8,
        topics:[{t:"React Hooks",q:7},{t:"JavaScript ES6+",q:6},{t:"State Management",q:5},{t:"CSS & Responsive",q:4}] },
      { id:"coding",       icon:"🧮", title:"Coding Round",        subtitle:"Medium DSA & SQL",                      accentColor:"#ff6b35", totalQ:18, doneQ:0, totalT:3, estimatedH:10,
        topics:[{t:"Arrays & Strings",q:7},{t:"SQL Problems",q:6},{t:"Trees & Graphs",q:5}] },
      { id:"hr",           icon:"🤝", title:"HR & Case Study",     subtitle:"Behavioral & Consulting Scenarios",     accentColor:"#64748b", totalQ:10, doneQ:0, totalT:2, estimatedH:3,
        topics:[{t:"Behavioral Questions",q:6},{t:"Consulting Scenarios",q:4}] },
    ],
    recent:[
      {q:"How does Spring Boot auto-configuration work?", round:"Technical", diff:"medium", year:2024},
      {q:"Design a REST API for an e-commerce cart",      round:"Technical", diff:"medium", year:2024},
      {q:"Explain React hooks – useState vs useEffect",   round:"Frontend",  diff:"medium", year:2024},
      {q:"Tell me about a project you led end-to-end",    round:"HR",        diff:"easy",   year:2024},
    ],
  },
  infosys: {
    name: "Infosys", industry: "IT Services", accentColor: "#f59e0b",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
    tip: "Infosys InfyTQ platform is key. Focus on Core Java, Spring MVC, Hibernate, and basic DSA. Aptitude carries significant weight.",
    process: ["InfyTQ / HackWithInfy Test","Technical Interview (Java + Spring)","HR Interview","Offer"],
    rounds: [
      { id:"technical",    icon:"💻", title:"Technical Round",    subtitle:"Core Java, Spring & Hibernate",          accentColor:"#0a7c6e", totalQ:32, doneQ:0, totalT:5, estimatedH:9,
        topics:[{t:"Core Java",q:10},{t:"Spring MVC",q:8},{t:"Hibernate & JPA",q:6},{t:"SQL & JDBC",q:5},{t:"OOPs",q:3}] },
      { id:"aptitude",     icon:"🔢", title:"Aptitude Round",      subtitle:"InfyTQ Aptitude & Reasoning",           accentColor:"#f59e0b", totalQ:18, doneQ:0, totalT:3, estimatedH:5,
        topics:[{t:"Quantitative Aptitude",q:7},{t:"Logical Reasoning",q:6},{t:"Verbal Ability",q:5}] },
      { id:"coding",       icon:"🧮", title:"Coding Round",        subtitle:"Easy DSA Problems",                     accentColor:"#ff6b35", totalQ:12, doneQ:0, totalT:2, estimatedH:6,
        topics:[{t:"Arrays & Strings",q:7},{t:"Basic Patterns",q:5}] },
      { id:"hr",           icon:"🤝", title:"HR Round",            subtitle:"Behavioral & Career Goals",             accentColor:"#64748b", totalQ:8,  doneQ:0, totalT:2, estimatedH:2,
        topics:[{t:"Behavioral Questions",q:5},{t:"Career & Salary",q:3}] },
    ],
    recent:[
      {q:"Explain the Spring MVC request lifecycle",     round:"Technical", diff:"medium", year:2024},
      {q:"Hibernate session vs session factory?",        round:"Technical", diff:"medium", year:2024},
      {q:"Find duplicates in an array in O(n)",          round:"Coding",    diff:"easy",   year:2024},
      {q:"Why do you want to join Infosys?",             round:"HR",        diff:"easy",   year:2024},
    ],
  },
};

/* Resolve company key from any URL param format */
function resolveCompany(param = "") {
  const raw = param.toLowerCase().replace(/[^a-z]/g, "");
  // direct match
  if (MOCK[raw]) return raw;
  // partial match
  const keys = Object.keys(MOCK);
  const found = keys.find(k => raw.includes(k) || k.includes(raw));
  return found || "google";
}

/* ═══════════════════════════════════════════════════════════════
   INLINE SUBCOMPONENTS
═══════════════════════════════════════════════════════════════ */

/* ── Logo with text fallback ── */
function Logo({ src, name, size = 64 }) {
  const [err, setErr] = useState(false);
  const initials = (name || "").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{ width: size, height: size, borderRadius: 18, background: "#fff", border: "3px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
      {!err
        ? <img src={src} alt={name} style={{ maxWidth: size - 16, maxHeight: size - 20, objectFit: "contain" }} onError={() => setErr(true)} />
        : <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 900, fontSize: size * 0.3, color: "#0a7c6e" }}>{initials}</span>
      }
    </div>
  );
}

/* ── Difficulty pill ── */
const DIFF = { easy: ["#dcfce7","#15803d"], medium: ["#fef9c3","#a16207"], hard: ["#fee2e2","#b91c1c"] };
function DiffBadge({ d }) {
  const [bg, col] = DIFF[d] || ["#f3f4f6","#6b7280"];
  return <span style={{ padding:"2px 9px", borderRadius:999, fontSize:10.5, fontWeight:700, background:bg, color:col, fontFamily:"'Outfit',sans-serif" }}>{d}</span>;
}

/* ── Round Card ── */
function RoundCard({ round, isMobile, onClick }) {
  const [hov, setHov] = useState(false);
  const pct = round.totalQ > 0 ? Math.round((round.doneQ / round.totalQ) * 100) : 0;
  const preview = (round.topics || []).slice(0, 3);
  return (
    <div
      onClick={() => onClick(round.id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 20, background: "#fff", cursor: "pointer", display: "flex", flexDirection: "column",
        border: `1.5px solid ${hov ? round.accentColor + "50" : "#f3f4f6"}`,
        boxShadow: hov ? `0 14px 44px ${round.accentColor}20` : "0 2px 12px rgba(0,0,0,0.06)",
        transform: hov ? "translateY(-6px) scale(1.012)" : "translateY(0) scale(1)",
        transition: "all .35s cubic-bezier(.22,.68,0,1.2)", overflow: "hidden",
      }}
    >
      <div style={{ height: 4, background: `linear-gradient(90deg,${round.accentColor},${round.accentColor}80)` }} />
      <div style={{ padding: isMobile ? "18px 16px" : "22px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
          <div style={{ width:48, height:48, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, background:`${round.accentColor}12`, border:`1.5px solid ${round.accentColor}28`, flexShrink:0 }}>{round.icon}</div>
          <div>
            <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.05rem", color:"#111827", letterSpacing:"-0.3px" }}>{round.title}</div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:11.5, color:"#9ca3af", marginTop:2 }}>{round.subtitle}</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:"flex", gap:16 }}>
          {[{v:round.totalQ,l:"Questions"},{v:round.totalT,l:"Topics"},{v:`~${round.estimatedH}h`,l:"Est. Time"}].map(s=>(
            <div key={s.l} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.1rem", color:round.accentColor, lineHeight:1 }}>{s.v}</div>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, color:"#9ca3af", fontWeight:600, marginTop:2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
            <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:10.5, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.08em" }}>{round.doneQ}/{round.totalQ} done</span>
            <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:12, fontWeight:800, color:round.accentColor }}>{pct}%</span>
          </div>
          <div style={{ height:6, borderRadius:999, background:"#f3f4f6", overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${round.accentColor},${round.accentColor}aa)`, borderRadius:999 }} />
          </div>
        </div>

        {/* Topic previews */}
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, fontWeight:800, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.14em", marginBottom:7 }}>Topics inside</div>
          <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
            {preview.map((t,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"5px 9px", borderRadius:8, background:"#f9fafb" }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:"#d1d5db", flexShrink:0 }} />
                  <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, fontWeight:600, color:"#4b5563" }}>{t.t}</span>
                </div>
                <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:10.5, color:"#9ca3af", fontWeight:700 }}>{t.q}q</span>
              </div>
            ))}
            {round.topics.length > 3 && (
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:11.5, color:round.accentColor, fontWeight:700, textAlign:"center", paddingTop:2 }}>+{round.topics.length - 3} more topics</div>
            )}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={e=>{ e.stopPropagation(); onClick(round.id); }}
          style={{ width:"100%", padding:"12px", borderRadius:12, border:"none", color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:14, cursor:"pointer",
            background:`linear-gradient(135deg,${round.accentColor},${round.accentColor}cc)`,
            boxShadow:`0 4px 14px ${round.accentColor}30`, transition:"transform .2s" }}
          onMouseEnter={e=>e.target.style.transform="scale(1.03)"}
          onMouseLeave={e=>e.target.style.transform="scale(1)"}
        >
          Start →
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Outfit:wght@300;400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#fafafa;color:#111827;font-family:'Outfit',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.bg{font-family:'Bricolage Grotesque',sans-serif!important}
.ot{font-family:'Outfit',sans-serif!important}
@keyframes rup{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.rv{opacity:0}.rv.in{animation:rup .65s cubic-bezier(.22,.68,0,1.18) forwards}
.wrap{max-width:1200px;margin:0 auto;padding:0 32px}
@media(max-width:768px){.wrap{padding:0 18px}}
@media(max-width:480px){.wrap{padding:0 12px}}
.rounds-grid{display:grid;gap:18px;grid-template-columns:repeat(4,1fr)}
@media(max-width:1100px){.rounds-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.rounds-grid{grid-template-columns:1fr}}
.rq-grid{display:grid;gap:12px;grid-template-columns:repeat(2,1fr)}
@media(max-width:700px){.rq-grid{grid-template-columns:1fr}}
.proc-wrap{display:flex;overflow-x:auto;gap:0;padding-bottom:6px}
.proc-wrap::-webkit-scrollbar{height:4px}
.proc-wrap::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:2px}
@keyframes blob{0%,100%{transform:translate(0,0)}50%{transform:translate(18px,-12px)}}
.blob{animation:blob 14s ease-in-out infinite;position:absolute;pointer-events:none;border-radius:50%}
@keyframes gpulse{0%,100%{opacity:.1}50%{opacity:.2}}.gpulse{animation:gpulse 6s ease-in-out infinite}
`;

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
export default function InterviewDashboard() {
  const { company: cParam, role, experience } = useParams();
  const navigate = useNavigate();
  const [vis, setVis] = useState(false);
  const [w, setW] = useState(window.innerWidth);

  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const isMobile = w < 640;
  const key  = resolveCompany(cParam);
  const data = MOCK[key];

  /* Pretty-print URL params for display */
  const displayRole = (role || "java-backend").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const displayExp  = (experience || "3-5").replace(/-/g, "–") + (experience?.includes("plus") ? "+" : " Years");

  const totalQ    = data.rounds.reduce((s,r)=>s+r.totalQ, 0);
  const doneQ     = data.rounds.reduce((s,r)=>s+r.doneQ,  0);
  const overallPct = totalQ > 0 ? Math.round((doneQ/totalQ)*100) : 0;

  const handleRound = (roundId) => {
    navigate(`/interview/${cParam}/${role}/${experience}/${roundId}`);
  };

  const d = s => ({ animationDelay:`${s}s` });

  return (
    <div style={{ background:"#fafafa", minHeight:"100vh" }}>
      <style>{CSS}</style>

      {/* bg blobs */}
      <div style={{ position:"fixed", inset:0, zIndex:0, overflow:"hidden", pointerEvents:"none" }}>
        <div className="blob gpulse" style={{ width:400, height:400, background:"radial-gradient(circle,#0a7c6e0c,transparent 70%)", top:-100, left:-80, filter:"blur(80px)" }} />
        <div className="blob gpulse" style={{ width:320, height:320, background:"radial-gradient(circle,#f59e0b0a,transparent 70%)", bottom:-60, right:-60, filter:"blur(80px)", animationDelay:"5s" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(#0a7c6e0f 1px,transparent 1px)", backgroundSize:"28px 28px", opacity:.5 }} />
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(250,250,250,0.93)", backdropFilter:"blur(24px)", borderBottom:"1.5px solid #e5e7eb" }}>
        <div className="wrap" style={{ height:isMobile?60:66, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          {/* Logo + breadcrumb */}
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <Link to="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
              <div style={{ width:32, height:32, borderRadius:10, background:"linear-gradient(135deg,#0a7c6e,#0e9988)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:16 }}>☕</span>
              </div>
              <span className="bg" style={{ fontSize:18, fontWeight:800 }}>
                <span style={{ color:"#0a7c6e" }}>Java</span><span style={{ color:"#ff6b35" }}>Hired</span>
              </span>
            </Link>
            {!isMobile && <>
              <span style={{ color:"#d1d5db", margin:"0 4px" }}>›</span>
              <Link to="/" className="ot" style={{ fontSize:12.5, fontWeight:600, color:"#9ca3af", textDecoration:"none" }}>Home</Link>
              <span style={{ color:"#d1d5db", margin:"0 4px" }}>›</span>
              <span className="ot" style={{ fontSize:12.5, fontWeight:700, color:"#0a7c6e" }}>{data.name}</span>
            </>}
          </div>
          {/* Nav pills */}
          <div style={{ display:"flex", gap:4, background:"#f3f4f6", padding:"4px", borderRadius:12, border:"1.5px solid #e5e7eb" }}>
            {[{l:"🎯 Interview",active:true},{l:"📚 Resources",active:false}].map(t=>(
              <button key={t.l} className="ot" style={{ padding:isMobile?"7px 10px":"7px 16px", borderRadius:9, fontSize:isMobile?12:13, fontWeight:700, border:"none", cursor:"pointer",
                background:t.active?"#fff":"transparent", color:t.active?"#0a7c6e":"#6b7280",
                boxShadow:t.active?"0 1px 6px rgba(0,0,0,0.08)":"none" }}>{isMobile?t.l.split(" ")[0]:t.l}</button>
            ))}
          </div>
          {/* Auth */}
          <div style={{ display:"flex", gap:8 }}>
            {!isMobile && <button className="ot" style={{ padding:"8px 16px", borderRadius:10, border:"1.5px solid #e5e7eb", background:"transparent", color:"#374151", fontSize:13, fontWeight:700, cursor:"pointer" }}>Log In</button>}
            <button style={{ padding:isMobile?"8px 12px":"9px 20px", borderRadius:11, border:"none", background:"linear-gradient(135deg,#0a7c6e,#0e9988)", color:"#fff", fontSize:isMobile?12:13, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>Sign Up</button>
          </div>
        </div>
      </nav>

      <main style={{ position:"relative", zIndex:10 }}>
        <div className="wrap" style={{ paddingTop:isMobile?20:32, paddingBottom:80 }}>

          {/* ══ COMPANY HEADER BANNER ══ */}
          <div className={`rv ${vis?"in":""}`} style={{ borderRadius:isMobile?18:24, overflow:"hidden", marginBottom:isMobile?22:32, boxShadow:"0 16px 56px rgba(10,124,110,0.2)", ...d(.05) }}>
            {/* Gradient banner */}
            <div style={{ background:`linear-gradient(135deg,${data.accentColor} 0%,#0e9988 60%,#0a7c6e 100%)`, padding:isMobile?"24px 18px 20px":"36px 36px 28px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,0.07) 1px,transparent 1px)", backgroundSize:"22px 22px", pointerEvents:"none" }} />
              <div style={{ position:"absolute", top:-50, right:-50, width:180, height:180, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,107,53,0.18),transparent 70%)", pointerEvents:"none" }} />
              <div style={{ position:"relative", zIndex:2 }}>
                {/* Identity row */}
                <div style={{ display:"flex", alignItems:isMobile?"flex-start":"center", gap:isMobile?14:20, marginBottom:20, flexWrap:"wrap" }}>
                  <Logo src={data.logo} name={data.name} size={isMobile?52:68} />
                  <div>
                    <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:isMobile?"1.5rem":"2rem", color:"#fff", letterSpacing:"-1px", lineHeight:1.1 }}>{data.name}</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginTop:8 }}>
                      {[displayRole, displayExp, data.industry].map((b,i)=>(
                        <span key={i} style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:11.5, padding:"4px 12px", borderRadius:999, background:"rgba(255,255,255,0.18)", color:"#fff", border:"1px solid rgba(255,255,255,0.28)" }}>{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Stats chips */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:20 }}>
                  {[{v:totalQ,l:"Questions",i:"📋"},{v:doneQ,l:"Completed",i:"✅"},{v:data.rounds.length,l:"Rounds",i:"🎯"},{v:"0🔥",l:"Streak",i:""}].map(s=>(
                    <div key={s.l} style={{ textAlign:"center", padding:"9px 14px", borderRadius:12, background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.25)", minWidth:72 }}>
                      <div style={{ fontSize:14, marginBottom:2 }}>{s.i}</div>
                      <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.15rem", color:"#fff", lineHeight:1 }}>{s.v}</div>
                      <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:10, color:"rgba(255,255,255,0.7)", marginTop:2, textTransform:"uppercase", letterSpacing:"0.08em" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                {/* Progress bar */}
                <div>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
                    <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:11.5, color:"rgba(255,255,255,0.72)", textTransform:"uppercase", letterSpacing:"0.1em" }}>Overall Readiness</span>
                    <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:900, fontSize:16, color:"#fff" }}>{overallPct}%</span>
                  </div>
                  <div style={{ height:9, borderRadius:999, background:"rgba(0,0,0,0.2)", overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${overallPct}%`, minWidth: overallPct > 0 ? 8 : 0, background:"linear-gradient(90deg,#f59e0b,#ff6b35)", borderRadius:999, boxShadow:"0 0 10px rgba(245,158,11,0.6)" }} />
                  </div>
                </div>
              </div>
            </div>
            {/* Tip strip */}
            <div style={{ background:"#fff7ed", borderTop:"2px solid #fed7aa", padding:isMobile?"11px 18px":"13px 36px", display:"flex", alignItems:"flex-start", gap:9 }}>
              <span style={{ fontSize:15, flexShrink:0, marginTop:1 }}>💡</span>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:"#7c2d12", lineHeight:1.65, fontWeight:500 }}>
                <strong style={{ fontFamily:"'Bricolage Grotesque',sans-serif", color:"#c2410c" }}>Pro Tip: </strong>{data.tip}
              </p>
            </div>
          </div>

          {/* ══ ROUND CARDS ══ */}
          <div className={`rv ${vis?"in":""}`} style={{ marginBottom:isMobile?24:36, ...d(.12) }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:8 }}>
              <div>
                <h2 className="bg" style={{ fontSize:isMobile?"1.2rem":"1.7rem", fontWeight:800, color:"#111827", letterSpacing:"-0.5px" }}>Interview Rounds</h2>
                <p className="ot" style={{ fontSize:12.5, color:"#9ca3af", marginTop:3 }}>Click any round to start practicing</p>
              </div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"5px 14px", borderRadius:999, background:"#0a7c6e0e", border:"1.5px solid #0a7c6e28", fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:".14em", color:"#0a7c6e" }}>
                {data.rounds.length} Rounds · {totalQ} Questions
              </div>
            </div>
            <div className="rounds-grid">
              {data.rounds.map((r,i)=>(
                <div key={r.id} className={`rv ${vis?"in":""}`} style={d(.16+i*.07)}>
                  <RoundCard round={r} isMobile={isMobile} onClick={handleRound} />
                </div>
              ))}
            </div>
          </div>

          {/* ══ INTERVIEW PROCESS TIMELINE ══ */}
          <div className={`rv ${vis?"in":""}`} style={{ background:"#fff", borderRadius:20, border:"1.5px solid #f3f4f6", padding:isMobile?"18px 16px":"26px 26px", marginBottom:isMobile?22:28, boxShadow:"0 2px 10px rgba(0,0,0,0.05)", ...d(.40) }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
              <div style={{ width:34, height:34, borderRadius:10, background:"#0a7c6e0d", border:"1.5px solid #0a7c6e25", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>🗺️</div>
              <div>
                <div className="bg" style={{ fontWeight:800, fontSize:"1rem", color:"#111827" }}>{data.name} Interview Process</div>
                <div className="ot" style={{ fontSize:11.5, color:"#9ca3af" }}>Typical hiring pipeline</div>
              </div>
            </div>
            <div className="proc-wrap">
              {data.process.map((step,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", flex:i<data.process.length-1?1:"none" }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, flexShrink:0 }}>
                    <div style={{ width:32, height:32, borderRadius:"50%", background:`${data.accentColor}12`, border:`2px solid ${data.accentColor}35`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:12.5, color:data.accentColor }}>{i+1}</div>
                    <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:10.5, fontWeight:600, color:"#4b5563", textAlign:"center", maxWidth:84, lineHeight:1.35, whiteSpace:"normal" }}>{step}</span>
                  </div>
                  {i<data.process.length-1 && <div style={{ flex:1, height:2, background:`linear-gradient(90deg,${data.accentColor}35,${data.accentColor}10)`, margin:"0 4px", marginBottom:22, borderRadius:1, minWidth:12 }} />}
                </div>
              ))}
            </div>
          </div>

          {/* ══ RECENTLY ASKED ══ */}
          <div className={`rv ${vis?"in":""}`} style={d(.48)}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14, flexWrap:"wrap", gap:8 }}>
              <div>
                <h2 className="bg" style={{ fontSize:isMobile?"1.1rem":"1.5rem", fontWeight:800, color:"#111827", letterSpacing:"-0.4px" }}>Recently Asked at {data.name}</h2>
                <p className="ot" style={{ fontSize:12, color:"#9ca3af", marginTop:3 }}>Verified from 2023–2024 interviews</p>
              </div>
              <button className="ot" style={{ padding:"7px 16px", borderRadius:11, border:"1.5px solid #0a7c6e28", background:"#0a7c6e09", color:"#0a7c6e", fontSize:13, fontWeight:700, cursor:"pointer" }}>View All →</button>
            </div>
            <div className="rq-grid">
              {data.recent.map((q,i)=>(
                <div key={i} style={{ background:"#fff", borderRadius:14, border:"1.5px solid #f3f4f6", padding:"15px 16px", boxShadow:"0 1px 6px rgba(0,0,0,0.05)", cursor:"pointer", transition:"all .25s" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#0a7c6e28";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 6px 18px rgba(10,124,110,0.09)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="#f3f4f6";e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 1px 6px rgba(0,0,0,0.05)";}}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10, marginBottom:10 }}>
                    <p className="ot" style={{ fontSize:13.5, fontWeight:600, color:"#111827", lineHeight:1.55, flex:1 }}>{q.q}</p>
                    <DiffBadge d={q.diff} />
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                    <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:999, background:`${data.accentColor}10`, color:data.accentColor, border:`1px solid ${data.accentColor}20` }}>{q.round}</span>
                    <span className="ot" style={{ fontSize:11, color:"#9ca3af", fontWeight:600 }}>Asked in {q.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:"1.5px solid #e5e7eb", padding:isMobile?"18px":"26px 32px", textAlign:"center", background:"#fff" }}>
        <span className="bg" style={{ fontSize:15, fontWeight:800 }}>
          <span style={{ color:"#0a7c6e" }}>Java</span><span style={{ color:"#ff6b35" }}>Hired</span>
        </span>
        <span className="ot" style={{ color:"#9ca3af", fontSize:12, marginLeft:12 }}>© 2025 JavaHired</span>
      </footer>
    </div>
  );
}