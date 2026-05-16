import { useState, useEffect, useRef } from "react";

const STEPS = [
  {
    id:1, icon:"🎯", label:"Target Setup", title:"Define Your Goal", subtitle:"Company · Role · Experience",
    col:"#3b82f6", glow:"rgba(59,130,246,0.3)",
    topics:["Select target company","Choose job role (Backend / Full Stack)","Set experience level","Pick interview focus"],
    detail:"We start by understanding exactly what you're preparing for. Your company, role, and experience level let us laser-focus the plan — no wasted time on irrelevant content.",
    cta:"Set My Target",
  },
  {
    id:2, icon:"🗺️", label:"Roadmap", title:"Get Your AI Roadmap", subtitle:"Custom · Priority-ranked · Scheduled",
    col:"#8b5cf6", glow:"rgba(139,92,246,0.3)",
    topics:["Custom topic sequence","Priority-ranked concepts","Week-by-week schedule","Resource recommendations"],
    detail:"Our AI generates a day-by-day plan tailored to your deadline and skill gaps. Topics are ranked by frequency in real interviews at your target company.",
    cta:"Generate Roadmap",
  },
  {
    id:3, icon:"📚", label:"Learn & Practice", title:"Study Core Concepts", subtitle:"Deep dives · Code · Spaced repetition",
    col:"#22d3ee", glow:"rgba(34,211,238,0.28)",
    topics:["Java core deep dives","Spring Boot patterns","System design frameworks","DSA problem sets"],
    detail:"Rich explanations, code snippets, and analogies for every topic. Built-in spaced repetition surfaces weak areas automatically so you never forget what you've learned.",
    cta:"Start Learning",
  },
  {
    id:4, icon:"🤖", label:"Mock Interviews", title:"Practice with AI Interviewer", subtitle:"Real-time · Follow-ups · Scored",
    col:"#f59e0b", glow:"rgba(245,158,11,0.28)",
    topics:["Company-specific Q&A","Live answer evaluation","Follow-up question drill","Communication scoring"],
    detail:"Simulate the real interview pressure. The AI asks follow-up questions, points out gaps in your reasoning, and scores your communication — just like a human interviewer.",
    cta:"Start Mock Interview",
  },
  {
    id:5, icon:"📊", label:"Track Progress", title:"Monitor & Improve", subtitle:"Analytics · Heatmap · Readiness score",
    col:"#10b981", glow:"rgba(16,185,129,0.28)",
    topics:["Topic mastery scores","Weak-area heatmap","Session history timeline","Interview readiness score"],
    detail:"A live dashboard shows exactly where you stand. Watch your readiness score climb as you complete sessions. Get notified when you're ready for the real interview.",
    cta:"View Dashboard",
  },
];

const CSS = `
@keyframes sp-rup { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
.sp-rup { animation:sp-rup .6s cubic-bezier(.22,.68,0,1.15) forwards }

@keyframes sp-orbit { from{transform:rotate(0deg) translateX(92px) rotate(0deg)} to{transform:rotate(360deg) translateX(92px) rotate(-360deg)} }
.sp-orb1 { animation:sp-orbit 9s linear infinite }
.sp-orb2 { animation:sp-orbit 14s linear infinite reverse }

@keyframes sp-ring { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.2);opacity:0} }
.sp-ring { animation:sp-ring 2.2s cubic-bezier(.4,0,.6,1) infinite }

@keyframes sp-pill { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }

@keyframes sp-glow { 0%,100%{opacity:.12} 50%{opacity:.24} }
.sp-glow { animation:sp-glow 5s ease-in-out infinite }

@keyframes sp-timer { from{width:0} to{width:100%} }
.sp-timer-bar { animation:sp-timer 4s linear forwards }

.sp-step-btn { transition:all .3s cubic-bezier(.22,.68,0,1.2); cursor:pointer; background:none; border:none; padding:0; display:flex; flex-direction:column; align-items:center; gap:8px }
.sp-step-btn:hover { transform:translateY(-4px) }

.sp-pill-in { animation:sp-pill .45s cubic-bezier(.22,.68,0,1.15) forwards; opacity:0 }

.sp-card { transition:background .6s, border-color .6s }
`;

function TopicPill({ text, col, delay }) {
  return (
    <div className="sp-pill-in" style={{ animationDelay:`${delay}ms`,
      display:"flex", alignItems:"center", gap:10, padding:"11px 16px", borderRadius:14,
      background:`${col}12`, border:`1px solid ${col}30`, fontFamily:"'Manrope',sans-serif", fontWeight:600, fontSize:13, color:"#cbd5e1" }}>
      <div style={{ width:6, height:6, borderRadius:"50%", background:col, flexShrink:0, boxShadow:`0 0 8px ${col}` }} />
      {text}
    </div>
  );
}

function Connector({ filled, col }) {
  return (
    <div style={{ flex:1, height:2, background:"rgba(255,255,255,0.07)", borderRadius:2, overflow:"hidden", margin:"0 4px" }}>
      <div style={{ height:"100%", background:col, width:filled?"100%":"0%", transition:"width .6s ease", boxShadow:filled?`0 0 8px ${col}`:"none" }} />
    </div>
  );
}

export default function StepwiseProgress() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [pillKey, setPillKey] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const ivRef = useRef(null);
  const cur = STEPS[active];

  useEffect(() => {
    if (!auto) return;
    ivRef.current = setInterval(() => {
      setActive(s => { const n=(s+1)%STEPS.length; setPillKey(k=>k+1); setTimerKey(k=>k+1); return n; });
    }, 4000);
    return () => clearInterval(ivRef.current);
  }, [auto]);

  const goTo = i => {
    setAuto(false); clearInterval(ivRef.current);
    setActive(i); setPillKey(k=>k+1); setTimerKey(k=>k+1);
  };

  const pct = ((active+1)/STEPS.length)*100;

  return (
    <section style={{ position:"relative", background:"#03050f", padding:"96px 0", overflow:"hidden" }}>
      <style>{CSS}</style>

      {/* bg glow */}
      <div className="sp-glow" style={{ position:"absolute", width:700, height:700, borderRadius:"50%", background:cur.col, filter:"blur(150px)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", opacity:.11, transition:"background .7s", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,0.045) 1px,transparent 1px)", backgroundSize:"30px 30px", pointerEvents:"none" }} />

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 36px" }}>

        {/* Section header */}
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 16px", borderRadius:999, border:`1px solid ${cur.col}45`, background:`${cur.col}10`, marginBottom:20, transition:"all .5s" }}>
            <span style={{ fontFamily:"'Manrope',sans-serif", fontWeight:800, fontSize:11, textTransform:"uppercase", letterSpacing:"0.18em", color:cur.col, transition:"color .5s" }}>How It Works</span>
          </div>
          <h2 style={{ fontFamily:"'Unbounded',sans-serif", fontWeight:900, fontSize:"clamp(1.9rem,4vw,3rem)", color:"#f1f5f9", letterSpacing:"-1.2px", lineHeight:1.1 }}>
            Your Path to Interview{" "}
            <span style={{ background:`linear-gradient(135deg,${cur.col},#ffffff70)`, WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent", transition:"all .5s" }}>Success</span>
          </h2>
          <p style={{ fontFamily:"'Manrope',sans-serif", marginTop:16, color:"#64748b", fontSize:"1rem", maxWidth:440, margin:"16px auto 0", lineHeight:1.75 }}>
            Five focused steps take you from zero to offer-ready — tracked, adaptive, AI-powered.
          </p>
        </div>

        {/* Step navigator */}
        <div style={{ display:"flex", alignItems:"center", marginBottom:20, padding:"0 8px" }}>
          {STEPS.map((s, i) => (
            <div key={s.id} style={{ display:"flex", alignItems:"center", flex: i<STEPS.length-1?1:"none" }}>
              <button className="sp-step-btn" onClick={()=>goTo(i)}>
                <div style={{ position:"relative" }}>
                  {i===active && <div className="sp-ring" style={{ position:"absolute", inset:-6, borderRadius:"50%", background:s.col }} />}
                  <div style={{ width:48, height:48, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:900,
                    background: i<=active?`linear-gradient(135deg,${s.col},${s.col}90)`:"rgba(255,255,255,0.05)",
                    border:`2px solid ${i<=active?s.col:"rgba(255,255,255,0.1)"}`,
                    boxShadow: i===active?`0 0 28px ${s.glow}`:"none",
                    transition:"all .5s", position:"relative" }}>
                    {i<active
                      ? <svg viewBox="0 0 20 20" fill="currentColor" style={{ width:18, color:"#fff" }}><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15 3.293 9.879a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      : i===active ? s.icon
                      : <span style={{ fontFamily:"'Unbounded',sans-serif", fontWeight:900, fontSize:13, color:"#475569" }}>{i+1}</span>}
                  </div>
                </div>
                <span style={{ fontFamily:"'Manrope',sans-serif", fontSize:11, fontWeight:700, display:"none", ...(typeof window!=="undefined"&&window.innerWidth>768?{display:"block"}:{}), color: i===active?s.col:"#475569", transition:"color .4s" }}>
                  {s.label}
                </span>
              </button>
              {i<STEPS.length-1 && <Connector filled={i<active} col={STEPS[i+1].col} />}
            </div>
          ))}
        </div>

        {/* Overall progress bar */}
        <div style={{ marginBottom:44, padding:"0 8px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontFamily:"'Manrope',sans-serif", fontSize:11, fontWeight:700, color:"#475569", textTransform:"uppercase", letterSpacing:"0.1em" }}>Overall Progress</span>
            <span style={{ fontFamily:"'Unbounded',sans-serif", fontSize:11, fontWeight:800, color:cur.col, transition:"color .5s" }}>{Math.round(pct)}% Complete</span>
          </div>
          <div style={{ height:6, borderRadius:999, background:"rgba(255,255,255,0.07)", overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${cur.col},${cur.col}80)`, borderRadius:999, boxShadow:`0 0 12px ${cur.glow}`, transition:"width .7s cubic-bezier(.22,.68,0,1.2), background .5s" }} />
          </div>
        </div>

        {/* Main card */}
        <div key={active} className="sp-card sp-rup gr"
          style={{ borderRadius:28, overflow:"hidden", border:`1px solid ${cur.col}22`, background:"rgba(8,13,30,0.92)", backdropFilter:"blur(28px)", position:"relative" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.3fr" }}>

            {/* Left visual */}
            <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center", padding:"64px 48px", minHeight:400, borderRight:`1px solid ${cur.col}14`, overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at center,${cur.col}18 0%,transparent 68%)` }} />
              {/* Rings */}
              {[220, 300, 380].map((s,i) => (
                <div key={i} style={{ position:"absolute", width:s, height:s, borderRadius:"50%", border:`1px solid ${cur.col}${18-i*4}`, top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} />
              ))}
              {/* Orbiting dots */}
              <div style={{ position:"absolute", width:220, height:220, top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}>
                <div className="sp-orb1" style={{ position:"absolute", width:10, height:10, borderRadius:"50%", background:cur.col, boxShadow:`0 0 16px ${cur.col}`, top:"50%", left:"50%", marginTop:-5, marginLeft:-5 }} />
              </div>
              <div style={{ position:"absolute", width:300, height:300, top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}>
                <div className="sp-orb2" style={{ position:"absolute", width:6, height:6, borderRadius:"50%", background:"rgba(255,255,255,0.5)", top:"50%", left:"50%", marginTop:-3, marginLeft:-3 }} />
              </div>
              {/* Center */}
              <div style={{ position:"relative", zIndex:2, textAlign:"center" }}>
                <div style={{ width:112, height:112, borderRadius:28, display:"flex", alignItems:"center", justifyContent:"center", fontSize:52, margin:"0 auto 24px",
                  background:`linear-gradient(145deg,${cur.col}22,${cur.col}0d)`,
                  border:`2px solid ${cur.col}40`,
                  boxShadow:`0 0 60px ${cur.glow}, inset 0 0 30px ${cur.col}0d` }}>
                  {cur.icon}
                </div>
                <div style={{ fontFamily:"'Unbounded',sans-serif", fontWeight:900, fontSize:"1.5rem", color:"#f1f5f9", marginBottom:8 }}>{cur.title}</div>
                <div style={{ fontFamily:"'Manrope',sans-serif", color:"#64748b", fontSize:13 }}>{cur.subtitle}</div>
                <div style={{ display:"inline-flex", marginTop:18, padding:"5px 16px", borderRadius:999, background:`${cur.col}18`, border:`1px solid ${cur.col}38`, fontFamily:"'Manrope',sans-serif", fontSize:11, fontWeight:800, color:cur.col }}>
                  Step {cur.id} of {STEPS.length}
                </div>
              </div>
            </div>

            {/* Right content */}
            <div style={{ padding:"48px 44px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
              <div>
                <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:10, fontWeight:800, color:"#475569", textTransform:"uppercase", letterSpacing:"0.2em", marginBottom:18 }}>What's covered</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:28 }}>
                  {cur.topics.map((t,i) => (
                    <TopicPill key={`${pillKey}-${i}`} text={t} col={cur.col} delay={i*70} />
                  ))}
                </div>
                <div style={{ borderRadius:18, padding:"20px 22px", background:`${cur.col}0d`, border:`1px solid ${cur.col}1e` }}>
                  <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:14, color:"#94a3b8", lineHeight:1.8 }}>{cur.detail}</p>
                </div>
              </div>

              {/* Bottom row */}
              <div style={{ marginTop:36, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
                <button style={{ padding:"14px 32px", borderRadius:14, border:"none", color:"#fff", fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"'Manrope',sans-serif",
                  background:`linear-gradient(135deg,${cur.col},${cur.col}bb)`,
                  boxShadow:`0 4px 28px ${cur.glow}`,
                  transition:"transform .25s, box-shadow .25s" }}
                  onMouseEnter={e=>{ e.target.style.transform="scale(1.05)"; }}
                  onMouseLeave={e=>{ e.target.style.transform="scale(1)"; }}>
                  {cur.cta} →
                </button>
                <button onClick={()=>setAuto(v=>!v)}
                  style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 18px", borderRadius:12, border:`1px solid ${auto?`${cur.col}45`:"rgba(255,255,255,0.1)"}`,
                    background: auto?`${cur.col}12`:"transparent",
                    color: auto?cur.col:"#64748b",
                    fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Manrope',sans-serif", transition:"all .3s" }}>
                  <span style={{ width:8, height:8, borderRadius: auto?"50%":"2px", background: auto?cur.col:"#64748b", transition:"all .3s",
                    ...(auto?{boxShadow:`0 0 8px ${cur.col}`, animation:"sp-ring 2s ease-in-out infinite"}:{}) }} />
                  {auto?"Auto-advancing":"Manual mode"}
                </button>
              </div>
            </div>
          </div>

          {/* Timer strip */}
          <div style={{ height:3, background:"rgba(255,255,255,0.05)" }}>
            {auto && <div key={timerKey} className="sp-timer-bar" style={{ height:"100%", background:`linear-gradient(90deg,${cur.col},${cur.col}60)`, boxShadow:`0 0 8px ${cur.glow}` }} />}
          </div>
        </div>

        {/* All-steps thumbnail grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14, marginTop:20 }}>
          {STEPS.map((s,i) => (
            <button key={s.id} onClick={()=>goTo(i)}
              style={{ textAlign:"left", borderRadius:18, padding:"18px 16px", border:`1px solid ${i===active?`${s.col}40`:"rgba(255,255,255,0.06)"}`,
                background: i===active?`${s.col}12`:"rgba(255,255,255,0.03)",
                cursor:"pointer", transition:"all .35s", backdropFilter:"blur(12px)" }}
              onMouseEnter={e=>{ if(i!==active){ e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.transform="translateY(-3px)"; }}}
              onMouseLeave={e=>{ if(i!==active){ e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.transform="translateY(0)"; }}}>
              <div style={{ fontSize:20, marginBottom:10 }}>{s.icon}</div>
              <div style={{ fontFamily:"'Unbounded',sans-serif", fontWeight:800, fontSize:11, color: i===active?s.col:"#94a3b8", marginBottom:4, letterSpacing:"-0.2px" }}>{s.label}</div>
              <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:11, color:"#475569", lineHeight:1.5, display:"none" }}>{s.subtitle}</div>
              {/* Mini bar */}
              <div style={{ height:2, borderRadius:999, background:"rgba(255,255,255,0.08)", marginTop:14, overflow:"hidden" }}>
                <div style={{ height:"100%", width:i<=active?"100%":"0%", background:s.col, borderRadius:999, transition:"width .7s ease" }} />
              </div>
            </button>
          ))}
        </div>

        {/* Mobile dot indicators */}
        <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:20 }}>
          {STEPS.map((s,i) => (
            <button key={s.id} onClick={()=>goTo(i)}
              style={{ height:8, borderRadius:999, background:i===active?cur.col:"rgba(255,255,255,0.15)", width:i===active?28:8, border:"none", cursor:"pointer", transition:"all .35s" }} />
          ))}
        </div>

      </div>
    </section>
  );
}