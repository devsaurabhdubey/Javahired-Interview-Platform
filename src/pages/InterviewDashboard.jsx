import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AnimatedLogo from "../components/AnimatedLogo";
import CompanyHeader from "../components/interview/CompanyHeader";
import RoundCard from "../components/interview/RoundCard";
import { INTERVIEW_DATA, RECENT_QUESTIONS, toCompanyKey, computeOverall } from "../data/mockInterviewData";

/* ── Window size hook ──────────────────────────────────────────────── */
function useWindowSize() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn); fn();
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

/* ── Diff badge ────────────────────────────────────────────────────── */
const DIFF = {
  easy:   { bg:"#dcfce7", color:"#15803d" },
  medium: { bg:"#fef9c3", color:"#a16207" },
  hard:   { bg:"#fee2e2", color:"#b91c1c" },
};

/* ── Process step ──────────────────────────────────────────────────── */
function ProcessStep({ step, index, total, color }) {
  return (
    <div style={{ display:"flex", alignItems:"center", flex: index < total - 1 ? 1 : "none", minWidth: 0 }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, flexShrink:0 }}>
        <div style={{ width:34, height:34, borderRadius:"50%", background:`${color}14`, border:`2px solid ${color}40`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:13, color }}>
          {index + 1}
        </div>
        <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:600, color:"#4b5563", textAlign:"center", maxWidth:80, lineHeight:1.3 }}>{step}</span>
      </div>
      {index < total - 1 && (
        <div style={{ flex:1, height:2, background:`linear-gradient(90deg,${color}40,${color}15)`, margin:"0 4px", marginBottom:22, borderRadius:1 }} />
      )}
    </div>
  );
}

/* ── Global CSS ────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Outfit:wght@300;400;500;600;700;800&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#fafafa;color:#111827;font-family:'Outfit',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.bg{font-family:'Bricolage Grotesque',sans-serif!important}
.ot{font-family:'Outfit',sans-serif!important}

@keyframes rup{from{opacity:0;transform:translateY(22px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)}}
.rv{opacity:0} .rv.in{animation:rup .65s cubic-bezier(.22,.68,0,1.18) forwards}

@keyframes blob{
  0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%;transform:translate(0,0)}
  50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%;transform:translate(20px,-15px)}
}
.blob{animation:blob 14s ease-in-out infinite;position:absolute;pointer-events:none}

.stag{display:inline-flex;align-items:center;gap:7px;padding:5px 14px;border-radius:999px;font-family:'Outfit',sans-serif;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.14em}

/* Cards grid */
.rounds-grid{display:grid;gap:20px;grid-template-columns:repeat(4,1fr)}
@media(max-width:1100px){.rounds-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:580px) {.rounds-grid{grid-template-columns:1fr}}

/* Recent questions */
.rq-grid{display:grid;gap:12px;grid-template-columns:repeat(2,1fr)}
@media(max-width:720px){.rq-grid{grid-template-columns:1fr}}

/* Wrap */
.wrap{max-width:1200px;margin:0 auto;padding:0 32px}
@media(max-width:768px){.wrap{padding:0 20px}}
@media(max-width:480px){.wrap{padding:0 14px}}

/* Process scroll on mobile */
.process-scroll{display:flex;overflow-x:auto;padding-bottom:4px;gap:0}
.process-scroll::-webkit-scrollbar{height:4px}
.process-scroll::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:2px}

/* Nav link */
.nav-tab{padding:7px 18px;border-radius:10px;font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;background:transparent;border:none;cursor:pointer;transition:all .2s;text-decoration:none;display:inline-block}
.nav-tab:hover{background:#0a7c6e0d;color:#0a7c6e}
.nav-tab.active{background:#0a7c6e0f;color:#0a7c6e}

/* Fade bg blob */
@keyframes gpulse{0%,100%{opacity:.1}50%{opacity:.18}}
.gpulse{animation:gpulse 7s ease-in-out infinite}
`;

/* ── Main Page ─────────────────────────────────────────────────────── */
export default function InterviewDashboard() {
  const { company: companyParam, role, experience } = useParams();
  const navigate = useNavigate();
  const windowWidth = useWindowSize();
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const [vis, setVis] = useState(false);
  const [activeNav, setActiveNav] = useState("interview");

  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t); }, []);

  /* ── Resolve company data ── */
  const key  = toCompanyKey(companyParam || "");
  const data = INTERVIEW_DATA[key] || INTERVIEW_DATA["google"];
  const { meta, rounds } = data;
  const recentQs = RECENT_QUESTIONS[key] || RECENT_QUESTIONS["google"];

  /* ── Navigate to round detail ── */
  const handleRoundStart = (roundId) => {
    navigate(`/interview/${companyParam}/${role}/${experience}/${roundId}`);
  };

  const d = (s) => ({ animationDelay: `${s}s` });

  return (
    <div style={{ background:"#fafafa", minHeight:"100vh", overflowX:"hidden" }}>
      <style>{CSS}</style>

      {/* ── Fixed bg blobs ── */}
      <div style={{ position:"fixed", inset:0, zIndex:0, overflow:"hidden", pointerEvents:"none" }}>
        <div className="blob gpulse" style={{ width:400, height:400, background:"radial-gradient(circle,#0a7c6e0c,transparent 70%)", top:-100, left:-80 }} />
        <div className="blob gpulse" style={{ width:300, height:300, background:"radial-gradient(circle,#f59e0b0a,transparent 70%)", bottom:-60, right:-60, animationDelay:"5s" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(#0a7c6e10 1px,transparent 1px)", backgroundSize:"28px 28px", opacity:.5 }} />
      </div>

      {/* ══════════════════ NAVBAR ══════════════════ */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(250,250,250,0.93)", backdropFilter:"blur(24px)", borderBottom:"1.5px solid #e5e7eb", boxShadow:"0 1px 0 rgba(10,124,110,0.07)" }}>
        <div className="wrap" style={{ height:isMobile?60:68, display:"flex", alignItems:"center", justifyContent:"space-between" }}>

          {/* Logo + back breadcrumb */}
          <div style={{ display:"flex", alignItems:"center", gap:isMobile?8:16 }}>
            <Link to="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
              <AnimatedLogo size={isMobile?32:38} />
              <span className="bg" style={{ fontSize:isMobile?16:19, fontWeight:800 }}>
                <span style={{ color:"#0a7c6e" }}>Java</span><span style={{ color:"#ff6b35" }}>Hired</span>
              </span>
            </Link>
            {!isMobile && (
              <>
                <div style={{ width:1, height:20, background:"#e5e7eb" }} />
                {/* Breadcrumb */}
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <Link to="/" className="ot" style={{ fontSize:12.5, fontWeight:600, color:"#9ca3af", textDecoration:"none" }}>Home</Link>
                  <span style={{ color:"#d1d5db", fontSize:12 }}>›</span>
                  <span className="ot" style={{ fontSize:12.5, fontWeight:600, color:"#9ca3af" }}>Interview</span>
                  <span style={{ color:"#d1d5db", fontSize:12 }}>›</span>
                  <span className="ot" style={{ fontSize:12.5, fontWeight:700, color:"#0a7c6e" }}>{meta.name}</span>
                </div>
              </>
            )}
          </div>

          {/* Nav tabs */}
          <div style={{ display:"flex", alignItems:"center", gap:4, background:"#f3f4f6", padding:"4px", borderRadius:12, border:"1.5px solid #e5e7eb" }}>
            {[{id:"interview",label:"🎯 Interview"},{id:"resources",label:"📚 Resources"}].map(t => (
              <button key={t.id} onClick={()=>setActiveNav(t.id)} className="ot"
                style={{ padding:isMobile?"7px 12px":"8px 18px", borderRadius:9, fontSize:isMobile?12:13.5, fontWeight:700, border:"none", cursor:"pointer", transition:"all .25s",
                  background:activeNav===t.id?"#fff":"transparent", color:activeNav===t.id?"#0a7c6e":"#6b7280",
                  boxShadow:activeNav===t.id?"0 1px 6px rgba(0,0,0,0.08)":"none" }}>
                {isMobile ? t.label.split(" ")[0] : t.label}
              </button>
            ))}
          </div>

          {/* Auth buttons */}
          <div style={{ display:"flex", gap:8 }}>
            {!isMobile && (
              <button className="ot" style={{ padding:"8px 18px", borderRadius:12, border:"1.5px solid #e5e7eb", background:"transparent", color:"#374151", fontSize:13.5, fontWeight:700, cursor:"pointer" }}>
                Log In
              </button>
            )}
            <button style={{ padding:isMobile?"8px 14px":"9px 20px", borderRadius:12, border:"none", background:"linear-gradient(135deg,#0a7c6e,#0e9988)", color:"#fff", fontSize:isMobile?12:13.5, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* ══════════════════ MAIN CONTENT ══════════════════ */}
      <main style={{ position:"relative", zIndex:10 }}>
        <div className="wrap" style={{ paddingTop:isMobile?24:36, paddingBottom:80 }}>

          {/* Company Header */}
          <div className={`rv ${vis?"in":""}`} style={d(.05)}>
            <CompanyHeader
              meta={meta}
              rounds={rounds}
              role={role}
              experience={experience}
              windowWidth={windowWidth}
            />
          </div>

          {/* ── Section: Round Cards ── */}
          <div className={`rv ${vis?"in":""}`} style={{ marginBottom:isMobile?28:40, ...d(.12) }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18, flexWrap:"wrap", gap:10 }}>
              <div>
                <h2 className="bg" style={{ fontSize:isMobile?"1.3rem":"1.8rem", fontWeight:800, color:"#111827", letterSpacing:"-0.5px" }}>
                  Interview Rounds
                </h2>
                <p className="ot" style={{ fontSize:13, color:"#9ca3af", marginTop:3 }}>
                  Click any round to start practicing
                </p>
              </div>
              <div className="stag" style={{ background:"#0a7c6e0e", border:"1.5px solid #0a7c6e28", color:"#0a7c6e" }}>
                {rounds.length} Rounds · {rounds.reduce((s,r)=>s+r.totalQuestions,0)} Questions
              </div>
            </div>

            <div className="rounds-grid">
              {rounds.map((round, i) => (
                <div key={round.id} className={`rv ${vis?"in":""}`} style={d(.15 + i * 0.07)}>
                  <RoundCard
                    round={round}
                    companyName={meta.name}
                    onStart={handleRoundStart}
                    windowWidth={windowWidth}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── Section: Interview Process Timeline ── */}
          <div className={`rv ${vis?"in":""}`} style={{ background:"#fff", borderRadius:22, border:"1.5px solid #f3f4f6", padding:isMobile?"20px 18px":"28px 28px", marginBottom:isMobile?24:32, boxShadow:"0 2px 12px rgba(0,0,0,0.05)", ...d(.40) }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"#0a7c6e0e", border:"1.5px solid #0a7c6e28", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🗺️</div>
              <div>
                <div className="bg" style={{ fontWeight:800, fontSize:"1.05rem", color:"#111827" }}>{meta.name} Interview Process</div>
                <div className="ot" style={{ fontSize:12, color:"#9ca3af" }}>Typical hiring pipeline for this company</div>
              </div>
            </div>
            <div className="process-scroll">
              {meta.processSteps.map((step, i) => (
                <ProcessStep key={i} step={step} index={i} total={meta.processSteps.length} color={meta.accentColor} />
              ))}
            </div>
          </div>

          {/* ── Section: Recently Asked Questions ── */}
          <div className={`rv ${vis?"in":""}`} style={d(.48)}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:8 }}>
              <div>
                <h2 className="bg" style={{ fontSize:isMobile?"1.2rem":"1.6rem", fontWeight:800, color:"#111827", letterSpacing:"-0.4px" }}>
                  Recently Asked at {meta.name}
                </h2>
                <p className="ot" style={{ fontSize:12.5, color:"#9ca3af", marginTop:3 }}>Verified from 2023–2024 interviews</p>
              </div>
              <button className="ot" style={{ padding:"8px 18px", borderRadius:12, border:"1.5px solid #0a7c6e30", background:"#0a7c6e0a", color:"#0a7c6e", fontSize:13, fontWeight:700, cursor:"pointer" }}>
                View All →
              </button>
            </div>

            <div className="rq-grid">
              {recentQs.map((q, i) => (
                <div key={i}
                  style={{ background:"#fff", borderRadius:16, border:"1.5px solid #f3f4f6", padding:"16px 18px", boxShadow:"0 1px 8px rgba(0,0,0,0.05)", cursor:"pointer", transition:"all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="#0a7c6e30"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(10,124,110,0.10)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="#f3f4f6"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 1px 8px rgba(0,0,0,0.05)"; }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10, marginBottom:10 }}>
                    <p className="ot" style={{ fontSize:14, fontWeight:600, color:"#111827", lineHeight:1.55, flex:1 }}>{q.text}</p>
                    <div style={{ padding:"3px 9px", borderRadius:999, fontSize:10.5, fontWeight:700, flexShrink:0, fontFamily:"'Outfit',sans-serif",
                      background: DIFF[q.difficulty]?.bg || "#f3f4f6",
                      color:      DIFF[q.difficulty]?.color || "#6b7280" }}>
                      {q.difficulty}
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:999, background:meta.accentColor+"12", color:meta.accentColor, border:`1px solid ${meta.accentColor}22` }}>
                      {q.round}
                    </span>
                    <span className="ot" style={{ fontSize:11, color:"#9ca3af", fontWeight:600 }}>Asked in {q.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer style={{ borderTop:"1.5px solid #e5e7eb", padding:isMobile?"20px 16px":"28px 32px", textAlign:"center", background:"#fff", marginTop:20 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:8 }}>
          <AnimatedLogo size={24} />
          <span className="bg" style={{ fontSize:15, fontWeight:800 }}>
            <span style={{ color:"#0a7c6e" }}>Java</span><span style={{ color:"#ff6b35" }}>Hired</span>
          </span>
        </div>
        <p className="ot" style={{ color:"#9ca3af", fontSize:12 }}>© 2025 JavaHired · AI-powered Java interview preparation</p>
      </footer>
    </div>
  );
}