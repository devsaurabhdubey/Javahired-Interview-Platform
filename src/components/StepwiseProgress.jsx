import { useState, useEffect, useRef } from "react";

function useWindowSize() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn); fn();
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

const STEPS = [
  { id:1, icon:"🎯", label:"Target Setup",    title:"Define Your Goal",           subtitle:"Company · Role · Experience",          col:"#0a7c6e", glow:"rgba(10,124,110,0.22)",  topics:["Select target company","Choose job role (Backend / Full Stack)","Set experience level","Pick interview focus"],             detail:"We start by understanding what you're preparing for. Your company, role, and experience let us laser-focus the plan — no wasted time on irrelevant content.", cta:"Set My Target" },
  { id:2, icon:"🗺️", label:"Roadmap",         title:"Get Your AI Roadmap",        subtitle:"Custom · Priority-ranked · Scheduled", col:"#f59e0b", glow:"rgba(245,158,11,0.22)", topics:["Custom topic sequence","Priority-ranked concepts","Week-by-week schedule","Resource recommendations"],                          detail:"Our AI generates a day-by-day plan tailored to your deadline and skill gaps. Topics are ranked by frequency in real interviews at your target company.", cta:"Generate Roadmap" },
  { id:3, icon:"📚", label:"Learn & Practice", title:"Study Core Concepts",        subtitle:"Deep dives · Code · Spaced repetition", col:"#ff6b35", glow:"rgba(255,107,53,0.20)", topics:["Java core deep dives","Spring Boot patterns","System design frameworks","DSA problem sets"],                                   detail:"Rich explanations, code snippets, and analogies for every topic. Built-in spaced repetition surfaces weak areas so you never forget what you've learned.", cta:"Start Learning" },
  { id:4, icon:"🤖", label:"Mock Interviews",  title:"Practice with AI Interviewer",subtitle:"Real-time · Follow-ups · Scored",     col:"#0a7c6e", glow:"rgba(10,124,110,0.22)",  topics:["Company-specific Q&A","Live answer evaluation","Follow-up question drill","Communication scoring"],                          detail:"Simulate real interview pressure. The AI asks follow-up questions, points out reasoning gaps, and scores your communication just like a human interviewer.", cta:"Start Mock Interview" },
  { id:5, icon:"📊", label:"Track Progress",   title:"Monitor & Improve",          subtitle:"Analytics · Heatmap · Readiness score", col:"#f59e0b", glow:"rgba(245,158,11,0.22)", topics:["Topic mastery scores","Weak-area heatmap","Session history timeline","Interview readiness score"],                            detail:"A live dashboard shows exactly where you stand. Watch your readiness score climb. Get notified when you're truly ready for the real interview.", cta:"View Dashboard" },
];

const CSS = `
@keyframes sp-rup  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
@keyframes sp-ring { 0%{transform:scale(1);opacity:.65} 100%{transform:scale(2.2);opacity:0} }
@keyframes sp-pill { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
@keyframes sp-timer{ from{width:0} to{width:100%} }
@keyframes sp-float{ 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(2deg)} }
@keyframes sp-orb1 { from{transform:rotate(0deg)   translateX(78px) rotate(0deg)}   to{transform:rotate(360deg)  translateX(78px) rotate(-360deg)} }
@keyframes sp-orb2 { from{transform:rotate(0deg)   translateX(105px) rotate(0deg)}  to{transform:rotate(-360deg) translateX(105px) rotate(360deg)} }
@keyframes sp-glow { 0%,100%{opacity:.1} 50%{opacity:.22} }

.sp-rup   { animation:sp-rup .6s cubic-bezier(.22,.68,0,1.18) forwards }
.sp-ring  { animation:sp-ring 2.4s ease-out infinite }
.sp-pill  { animation:sp-pill .42s cubic-bezier(.22,.68,0,1.15) forwards; opacity:0 }
.sp-timer { animation:sp-timer 4s linear forwards }
.sp-float { animation:sp-float 5s ease-in-out infinite }
.sp-orb1  { animation:sp-orb1  9s linear infinite; position:absolute; border-radius:50% }
.sp-orb2  { animation:sp-orb2 13s linear infinite; position:absolute; border-radius:50% }
.sp-glow  { animation:sp-glow 5s ease-in-out infinite }
.sp-btn   { background:none; border:none; padding:0; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:8px; transition:transform .3s }
.sp-btn:hover{ transform:translateY(-3px) }

/* Responsive card layout */
.sp-card-inner { display:grid; grid-template-columns:1fr 1.3fr }
@media(max-width:768px){ .sp-card-inner{ grid-template-columns:1fr; } }

/* Responsive step nav */
.sp-label{ display:block; font-family:'Outfit',sans-serif; font-size:11px; font-weight:700 }
@media(max-width:480px){ .sp-label{ display:none } }

/* Responsive topic grid */
.sp-topics{ display:grid; grid-template-columns:1fr 1fr; gap:10px }
@media(max-width:480px){ .sp-topics{ grid-template-columns:1fr } }

/* Thumb grid */
.sp-thumbs{ display:grid; grid-template-columns:repeat(5,1fr); gap:12px; margin-top:16px }
@media(max-width:640px){ .sp-thumbs{ grid-template-columns:repeat(3,1fr) } }
@media(max-width:380px){ .sp-thumbs{ grid-template-columns:repeat(2,1fr) } }

/* Card left panel border */
.sp-left-border{ border-right:1.5px solid rgba(0,0,0,0.06) }
@media(max-width:768px){ .sp-left-border{ border-right:none; border-bottom:1.5px solid rgba(0,0,0,0.06) } }
`;

function Pill({ text, col, delay }) {
  return (
    <div className="sp-pill" style={{ animationDelay:`${delay}ms`, display:"flex", alignItems:"center", gap:9, padding:"10px 14px", borderRadius:12, background:`${col}10`, border:`1.5px solid ${col}25`, fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:600, fontSize:13, color:"#374151" }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:col, flexShrink:0, boxShadow:`0 0 7px ${col}99` }} />
      {text}
    </div>
  );
}

function Connector({ filled, col }) {
  return (
    <div style={{ flex:1, height:3, borderRadius:2, background:"#e5e7eb", overflow:"hidden", margin:"0 3px", marginBottom:26 }}>
      <div style={{ height:"100%", width:filled?"100%":"0%", background:`linear-gradient(90deg,${col},${col}99)`, transition:"width .6s ease", boxShadow:filled?`0 0 7px ${col}70`:"none" }} />
    </div>
  );
}

export default function StepwiseProgress() {
  const w      = useWindowSize();
  const isMob  = w < 640;
  const isTab  = w >= 640 && w < 1024;

  const [active, setActive] = useState(0);
  const [auto,   setAuto]   = useState(true);
  const [pk,     setPk]     = useState(0);
  const [tk,     setTk]     = useState(0);
  const iv = useRef(null);
  const cur = STEPS[active];

  useEffect(() => {
    if (!auto) return;
    iv.current = setInterval(() => {
      setActive(s => { const n=(s+1)%5; setPk(k=>k+1); setTk(k=>k+1); return n; });
    }, 4000);
    return () => clearInterval(iv.current);
  }, [auto]);

  const goTo = i => {
    setAuto(false); clearInterval(iv.current);
    setActive(i); setPk(k=>k+1); setTk(k=>k+1);
  };

  const pct = ((active+1)/5)*100;

  return (
    <section style={{ position:"relative", background:"#f0fdf9", padding:isMob?"56px 0":"88px 0", overflow:"hidden" }}>
      <style>{CSS}</style>

      {/* bg glow */}
      <div className="sp-glow" style={{ position:"absolute", width:"min(700px,120vw)", height:"min(700px,120vw)", borderRadius:"50%", background:cur.col, filter:"blur(140px)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", opacity:.09, transition:"background .7s", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(#0a7c6e15 1px,transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none", opacity:.55 }} />

      <div style={{ maxWidth:1200, margin:"0 auto", padding:isMob?"0 16px":"0 32px" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:isMob?36:56 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 16px", borderRadius:999, background:`${cur.col}12`, border:`1.5px solid ${cur.col}28`, marginBottom:16, transition:"all .4s" }}>
            <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:11, textTransform:"uppercase", letterSpacing:"0.18em", color:cur.col }}>How It Works</span>
          </div>
          <h2 style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:isMob?"1.7rem":"2.8rem", color:"#111827", letterSpacing:"-1px", lineHeight:1.12 }}>
            Your Path to Interview{" "}
            <span style={{ color:cur.col, transition:"color .5s" }}>Success</span>
          </h2>
          <p style={{ fontFamily:"'Outfit',sans-serif", marginTop:12, color:"#6b7280", fontSize:isMob?"0.9rem":"1rem", maxWidth:420, margin:"12px auto 0", lineHeight:1.75 }}>
            Five focused steps take you from zero to offer-ready — tracked, adaptive, AI-powered.
          </p>
        </div>

        {/* Step navigator */}
        <div style={{ display:"flex", alignItems:"flex-end", marginBottom:14, padding:"0 4px" }}>
          {STEPS.map((s,i) => (
            <div key={s.id} style={{ display:"flex", alignItems:"flex-end", flex:i<4?1:"none" }}>
              <button className="sp-btn" onClick={()=>goTo(i)}>
                <div style={{ position:"relative" }}>
                  {i===active && <div className="sp-ring" style={{ position:"absolute", inset:-5, borderRadius:"50%", background:s.col, pointerEvents:"none" }} />}
                  <div style={{ width:isMob?38:46, height:isMob?38:46, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:isMob?16:18, fontWeight:900,
                    background:i<active?"#0a7c6e":i===active?`linear-gradient(135deg,${s.col},${s.col}cc)`:"#fff",
                    border:`2px solid ${i<=active?s.col:"#d1d5db"}`,
                    boxShadow:i===active?`0 4px 18px ${s.glow}, 0 0 0 4px ${s.col}16`:"0 2px 8px rgba(0,0,0,0.07)",
                    transition:"all .45s" }}>
                    {i<active
                      ? <svg viewBox="0 0 20 20" fill="white" style={{ width:16 }}><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15 3.293 9.879a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      : i===active ? s.icon
                      : <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:isMob?12:13, color:"#9ca3af" }}>{i+1}</span>}
                  </div>
                </div>
                <span className="sp-label" style={{ color:i===active?s.col:"#9ca3af", transition:"color .4s" }}>{s.label}</span>
              </button>
              {i<4 && <Connector filled={i<active} col={STEPS[i+1].col} />}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom:isMob?28:36, padding:"0 4px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:10.5, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.1em" }}>Overall Progress</span>
            <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:12, fontWeight:800, color:cur.col, transition:"color .5s" }}>{Math.round(pct)}% Complete</span>
          </div>
          <div style={{ height:7, borderRadius:999, background:"#e5e7eb", overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${cur.col},${cur.col}99)`, borderRadius:999, boxShadow:`0 0 10px ${cur.glow}`, transition:"width .7s cubic-bezier(.22,.68,0,1.2),background .5s" }} />
          </div>
        </div>

        {/* Main card */}
        <div key={active} className="sp-rup"
          style={{ borderRadius:isMob?20:26, overflow:"hidden", border:`1.5px solid ${cur.col}22`, background:"#fff", boxShadow:`0 16px 56px ${cur.glow}, 0 4px 20px rgba(0,0,0,0.05)`, transition:"border-color .5s,box-shadow .5s" }}>
          <div style={{ height:4, background:`linear-gradient(90deg,${cur.col},${cur.col==="ff6b35"?"#f59e0b":"#ff6b35"})` }} />

          <div className="sp-card-inner">
            {/* Visual panel */}
            <div className="sp-left-border" style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center", padding:isMob?"36px 24px":"52px 40px", background:`${cur.col}05`, minHeight:isMob?260:340, overflow:"hidden" }}>
              {[180,240,300].map((s,i) => (
                <div key={i} style={{ position:"absolute", width:s, height:s, borderRadius:"50%", border:`1.5px solid ${cur.col}${18-i*5}`, top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} />
              ))}
              <div style={{ position:"absolute", width:160, height:160, top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}>
                <div className="sp-orb1" style={{ width:10, height:10, background:cur.col, boxShadow:`0 0 14px ${cur.col}`, top:"50%", left:"50%", marginTop:-5, marginLeft:-5 }} />
              </div>
              <div style={{ position:"absolute", width:220, height:220, top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}>
                <div className="sp-orb2" style={{ width:6, height:6, background:"#f59e0b", boxShadow:"0 0 10px #f59e0b", top:"50%", left:"50%", marginTop:-3, marginLeft:-3 }} />
              </div>
              <div className="sp-float" style={{ position:"relative", zIndex:2, textAlign:"center" }}>
                <div style={{ width:isMob?88:104, height:isMob?88:104, borderRadius:isMob?24:28, display:"flex", alignItems:"center", justifyContent:"center", fontSize:isMob?44:50, margin:"0 auto 18px",
                  background:`linear-gradient(145deg,${cur.col}20,${cur.col}0c)`, border:`2px solid ${cur.col}33`, boxShadow:`0 8px 36px ${cur.glow}` }}>
                  {cur.icon}
                </div>
                <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:isMob?"1.2rem":"1.4rem", color:"#111827", marginBottom:6 }}>{cur.title}</div>
                <div style={{ fontFamily:"'Outfit',sans-serif", color:"#9ca3af", fontSize:12 }}>{cur.subtitle}</div>
                <div style={{ display:"inline-flex", marginTop:14, padding:"4px 14px", borderRadius:999, background:`${cur.col}12`, border:`1.5px solid ${cur.col}28`, fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:700, color:cur.col }}>
                  Step {cur.id} of 5
                </div>
              </div>
            </div>

            {/* Content panel */}
            <div style={{ padding:isMob?"24px 20px":"42px 40px", display:"flex", flexDirection:"column", justifyContent:"space-between", gap:20 }}>
              <div>
                <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, fontWeight:800, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.2em", marginBottom:14 }}>What's covered</p>
                <div className="sp-topics" style={{ marginBottom:20 }}>
                  {cur.topics.map((t,i) => <Pill key={`${pk}-${i}`} text={t} col={cur.col} delay={i*65} />)}
                </div>
                <div style={{ borderRadius:14, padding:"16px 18px", background:`${cur.col}0b`, border:`1.5px solid ${cur.col}1e` }}>
                  <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13.5, color:"#4b5563", lineHeight:1.8 }}>{cur.detail}</p>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                <button style={{ padding:isMob?"12px 24px":"14px 30px", borderRadius:14, border:"none", color:"#fff", fontSize:isMob?13:14, fontWeight:700, cursor:"pointer", fontFamily:"'Bricolage Grotesque',sans-serif",
                  background:`linear-gradient(135deg,${cur.col},${cur.col}cc)`, boxShadow:`0 4px 18px ${cur.glow}`, transition:"transform .25s" }}
                  onMouseEnter={e=>e.target.style.transform="scale(1.05)"}
                  onMouseLeave={e=>e.target.style.transform="scale(1)"}>
                  {cur.cta} →
                </button>
                <button onClick={()=>setAuto(v=>!v)}
                  style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 16px", borderRadius:12, border:`1.5px solid ${auto?`${cur.col}40`:"#e5e7eb"}`, background:auto?`${cur.col}0e`:"#f9fafb", color:auto?cur.col:"#9ca3af", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"all .3s" }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:auto?cur.col:"#d1d5db", flexShrink:0, transition:"all .3s", boxShadow:auto?`0 0 7px ${cur.col}99`:"none" }} />
                  {auto?"Auto-advancing":"Manual"}
                </button>
              </div>
            </div>
          </div>

          {/* Timer strip */}
          <div style={{ height:3, background:"#f3f4f6" }}>
            {auto && <div key={tk} className="sp-timer" style={{ height:"100%", background:`linear-gradient(90deg,${cur.col},${cur.col}70)` }} />}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="sp-thumbs">
          {STEPS.map((s,i) => (
            <button key={s.id} onClick={()=>goTo(i)}
              style={{ textAlign:"left", borderRadius:14, padding:isMob?"12px 12px":"15px 14px", border:`1.5px solid ${i===active?`${s.col}40`:"#e5e7eb"}`, background:i===active?`${s.col}0e`:"#fff", cursor:"pointer", transition:"all .3s", boxShadow:i===active?`0 4px 16px ${s.glow}`:"0 1px 4px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize:isMob?18:20, marginBottom:6 }}>{s.icon}</div>
              <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:isMob?10:11.5, color:i===active?s.col:"#6b7280" }}>{s.label}</div>
              <div style={{ height:2.5, borderRadius:999, background:"#f3f4f6", overflow:"hidden", marginTop:8 }}>
                <div style={{ height:"100%", width:i<=active?"100%":"0%", background:s.col, transition:"width .7s ease" }} />
              </div>
            </button>
          ))}
        </div>

        {/* Dot indicators */}
        <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:16 }}>
          {STEPS.map((s,i) => (
            <button key={s.id} onClick={()=>goTo(i)} style={{ height:8, borderRadius:999, background:i===active?cur.col:"#d1d5db", width:i===active?28:8, border:"none", cursor:"pointer", transition:"all .35s" }} />
          ))}
        </div>
      </div>
    </section>
  );
}