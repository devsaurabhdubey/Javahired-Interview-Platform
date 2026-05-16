import { useState, useEffect, useRef } from "react";

const STEPS = [
  {
    id:1, icon:"🎯", label:"Target Setup", title:"Define Your Goal",
    subtitle:"Company · Role · Experience",
    col:"#0a7c6e", glow:"rgba(10,124,110,0.25)", light:"#0a7c6e18",
    topics:["Select target company","Choose job role (Backend / Full Stack)","Set experience level","Pick interview focus"],
    detail:"We start by understanding exactly what you're preparing for. Your company, role, and experience level let us laser-focus the plan — no wasted time on irrelevant content.",
    cta:"Set My Target",
  },
  {
    id:2, icon:"🗺️", label:"Roadmap", title:"Get Your AI Roadmap",
    subtitle:"Custom · Priority-ranked · Scheduled",
    col:"#f59e0b", glow:"rgba(245,158,11,0.25)", light:"#f59e0b18",
    topics:["Custom topic sequence","Priority-ranked concepts","Week-by-week schedule","Resource recommendations"],
    detail:"Our AI generates a day-by-day plan tailored to your deadline and skill gaps. Topics are ranked by frequency in real interviews at your target company.",
    cta:"Generate Roadmap",
  },
  {
    id:3, icon:"📚", label:"Learn & Practice", title:"Study Core Concepts",
    subtitle:"Deep dives · Code · Spaced repetition",
    col:"#ff6b35", glow:"rgba(255,107,53,0.22)", light:"#ff6b3518",
    topics:["Java core deep dives","Spring Boot patterns","System design frameworks","DSA problem sets"],
    detail:"Rich explanations, code snippets, and analogies for every topic. Built-in spaced repetition surfaces weak areas automatically so you never forget what you've learned.",
    cta:"Start Learning",
  },
  {
    id:4, icon:"🤖", label:"Mock Interviews", title:"Practice with AI Interviewer",
    subtitle:"Real-time · Follow-ups · Scored",
    col:"#0a7c6e", glow:"rgba(10,124,110,0.25)", light:"#0a7c6e18",
    topics:["Company-specific Q&A","Live answer evaluation","Follow-up question drill","Communication scoring"],
    detail:"Simulate real interview pressure. The AI asks follow-up questions, points out reasoning gaps, and scores your communication — just like a seasoned human interviewer.",
    cta:"Start Mock Interview",
  },
  {
    id:5, icon:"📊", label:"Track Progress", title:"Monitor & Improve",
    subtitle:"Analytics · Heatmap · Readiness score",
    col:"#f59e0b", glow:"rgba(245,158,11,0.25)", light:"#f59e0b18",
    topics:["Topic mastery scores","Weak-area heatmap","Session history timeline","Interview readiness score"],
    detail:"A live dashboard shows exactly where you stand. Watch your readiness score climb as you complete sessions. Get notified when you're truly ready for the real interview.",
    cta:"View Dashboard",
  },
];

const CSS = `
@keyframes sp-fadeup { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
.sp-fadeup { animation:sp-fadeup .55s cubic-bezier(.22,.68,0,1.18) forwards }

@keyframes sp-orbit { from{transform:rotate(0deg) translateX(88px) rotate(0deg)} to{transform:rotate(360deg) translateX(88px) rotate(-360deg)} }
@keyframes sp-orbit2 { from{transform:rotate(0deg) translateX(118px) rotate(0deg)} to{transform:rotate(-360deg) translateX(118px) rotate(360deg)} }
.sp-orb1 { animation:sp-orbit  9s linear infinite }
.sp-orb2 { animation:sp-orbit2 13s linear infinite }

@keyframes sp-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2.4);opacity:0} }
.sp-ring { animation:sp-ring 2.4s ease-out infinite }

@keyframes sp-pill { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
.sp-pill { animation:sp-pill .42s cubic-bezier(.22,.68,0,1.15) forwards; opacity:0 }

@keyframes sp-timer { from{width:0} to{width:100%} }
.sp-timerbar { animation:sp-timer 4s linear forwards }

@keyframes sp-float {
  0%,100% { transform:translateY(0) rotate(0deg) }
  50%      { transform:translateY(-8px) rotate(3deg) }
}
.sp-float { animation:sp-float 5s ease-in-out infinite }

.sp-stepbtn { background:none; border:none; padding:0; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:8px; transition:transform .3s cubic-bezier(.22,.68,0,1.2) }
.sp-stepbtn:hover { transform:translateY(-4px) }
`;

function Pill({ text, col, delay }) {
  return (
    <div className="sp-pill" style={{ animationDelay:`${delay}ms`,
      display:"flex", alignItems:"center", gap:10, padding:"10px 15px", borderRadius:12,
      background:`${col}12`, border:`1.5px solid ${col}28`,
      fontFamily:"'Bricolage Grotesque','Outfit',sans-serif", fontWeight:600, fontSize:13, color:"#374151" }}>
      <span style={{ width:7, height:7, borderRadius:"50%", background:col, flexShrink:0, boxShadow:`0 0 8px ${col}99` }} />
      {text}
    </div>
  );
}

function Connector({ filled, col }) {
  return (
    <div style={{ flex:1, height:3, borderRadius:2, background:"#e5e7eb", overflow:"hidden", margin:"0 4px", marginBottom:28 }}>
      <div style={{ height:"100%", width:filled?"100%":"0%", background:`linear-gradient(90deg,${col},${col}90)`, borderRadius:2, transition:"width .6s ease", boxShadow:filled?`0 0 8px ${col}60`:"none" }} />
    </div>
  );
}

export default function StepwiseProgress() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [pk, setPk] = useState(0);
  const [tk, setTk] = useState(0);
  const ivRef = useRef(null);
  const cur = STEPS[active];

  useEffect(() => {
    if (!auto) return;
    ivRef.current = setInterval(() => {
      setActive(s => { const n=(s+1)%5; setPk(k=>k+1); setTk(k=>k+1); return n; });
    }, 4000);
    return () => clearInterval(ivRef.current);
  }, [auto]);

  const goTo = i => {
    setAuto(false); clearInterval(ivRef.current);
    setActive(i); setPk(k=>k+1); setTk(k=>k+1);
  };

  const pct = ((active+1)/5)*100;

  return (
    <section style={{ position:"relative", background:"#f0fdf9", padding:"96px 0", overflow:"hidden" }}>
      <style>{CSS}</style>

      {/* Decorative bg shapes */}
      <div style={{ position:"absolute", top:-80, right:-80, width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,#0a7c6e18,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-60, left:-60, width:240, height:240, borderRadius:"50%", background:"radial-gradient(circle,#f59e0b15,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(#0a7c6e18 1px,transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none", opacity:.6 }} />

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 36px" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 18px", borderRadius:999, background:`${cur.col}14`, border:`1.5px solid ${cur.col}30`, marginBottom:20, transition:"all .4s" }}>
            <span style={{ fontFamily:"'Bricolage Grotesque','Outfit',sans-serif", fontWeight:800, fontSize:11, textTransform:"uppercase", letterSpacing:"0.18em", color:cur.col }}>How It Works</span>
          </div>
          <h2 style={{ fontFamily:"'Bricolage Grotesque','Outfit',sans-serif", fontWeight:800, fontSize:"clamp(1.9rem,4vw,3rem)", color:"#111827", letterSpacing:"-1px", lineHeight:1.12 }}>
            Your Path to Interview{" "}
            <span style={{ color:cur.col, transition:"color .5s" }}>Success</span>
          </h2>
          <p style={{ fontFamily:"'Outfit',sans-serif", marginTop:14, color:"#6b7280", fontSize:"1rem", maxWidth:440, margin:"14px auto 0", lineHeight:1.75 }}>
            Five focused steps take you from zero to offer-ready — tracked, adaptive, AI-powered.
          </p>
        </div>

        {/* Step nav */}
        <div style={{ display:"flex", alignItems:"flex-end", marginBottom:16, padding:"0 8px" }}>
          {STEPS.map((s,i) => (
            <div key={s.id} style={{ display:"flex", alignItems:"flex-end", flex:i<4?1:"none" }}>
              <button className="sp-stepbtn" onClick={()=>goTo(i)}>
                <div style={{ position:"relative" }}>
                  {i===active && <div className="sp-ring" style={{ position:"absolute", inset:-5, borderRadius:"50%", background:s.col, pointerEvents:"none" }} />}
                  <div style={{ width:48, height:48, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:900,
                    background: i<active?"#0a7c6e" : i===active?`linear-gradient(135deg,${s.col},${s.col}cc)`:"#ffffff",
                    border:`2px solid ${i<=active?s.col:"#d1d5db"}`,
                    boxShadow: i===active?`0 4px 20px ${s.glow}, 0 0 0 4px ${s.col}18`:"0 2px 8px rgba(0,0,0,0.08)",
                    transition:"all .45s", position:"relative" }}>
                    {i<active
                      ? <svg viewBox="0 0 20 20" fill="white" style={{ width:18 }}><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15 3.293 9.879a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      : i===active ? s.icon
                      : <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:14, color:"#9ca3af" }}>{i+1}</span>}
                  </div>
                </div>
                <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:11.5, fontWeight:700, color:i===active?s.col:"#9ca3af", transition:"color .4s", letterSpacing:"0.01em" }}>{s.label}</span>
              </button>
              {i<4 && <Connector filled={i<active} col={STEPS[i+1].col} />}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom:40, padding:"0 8px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.1em" }}>Overall Progress</span>
            <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:12, fontWeight:800, color:cur.col, transition:"color .5s" }}>{Math.round(pct)}% Complete</span>
          </div>
          <div style={{ height:8, borderRadius:999, background:"#e5e7eb", overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${cur.col},${cur.col}aa)`, borderRadius:999, boxShadow:`0 0 12px ${cur.glow}`, transition:"width .7s cubic-bezier(.22,.68,0,1.2), background .5s" }} />
          </div>
        </div>

        {/* Main card */}
        <div key={active} className="sp-fadeup"
          style={{ borderRadius:28, overflow:"hidden", border:`1.5px solid ${cur.col}25`, background:"#ffffff", boxShadow:`0 20px 64px ${cur.glow}, 0 4px 24px rgba(0,0,0,0.06)`, position:"relative", transition:"border-color .5s, box-shadow .5s" }}>
          {/* Top accent bar */}
          <div style={{ height:4, background:`linear-gradient(90deg,${cur.col},${cur.col === "#ff6b35" ? "#f59e0b" : "#ff6b35"})` }} />

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.35fr" }}>
            {/* Left visual */}
            <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center", padding:"56px 40px", minHeight:380, borderRight:`1.5px solid ${cur.col}15`, background:`${cur.col}05`, overflow:"hidden" }}>
              {/* Rings */}
              {[180,250,320].map((s,i) => (
                <div key={i} style={{ position:"absolute", width:s, height:s, borderRadius:"50%", border:`1.5px solid ${cur.col}${20-i*5}`, top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} />
              ))}
              {/* Orbiting dots */}
              <div style={{ position:"absolute", width:176, height:176, top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}>
                <div className="sp-orb1" style={{ position:"absolute", width:11, height:11, borderRadius:"50%", background:cur.col, boxShadow:`0 0 16px ${cur.col}`, top:"50%", left:"50%", marginTop:-5.5, marginLeft:-5.5 }} />
              </div>
              <div style={{ position:"absolute", width:236, height:236, top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}>
                <div className="sp-orb2" style={{ position:"absolute", width:7, height:7, borderRadius:"50%", background:"#f59e0b", boxShadow:"0 0 10px #f59e0b", top:"50%", left:"50%", marginTop:-3.5, marginLeft:-3.5 }} />
              </div>
              {/* Center icon */}
              <div className="sp-float" style={{ position:"relative", zIndex:2, textAlign:"center" }}>
                <div style={{ width:108, height:108, borderRadius:30, display:"flex", alignItems:"center", justifyContent:"center", fontSize:52, margin:"0 auto 22px",
                  background:`linear-gradient(145deg,${cur.col}22,${cur.col}0c)`,
                  border:`2px solid ${cur.col}35`,
                  boxShadow:`0 8px 40px ${cur.glow}, inset 0 0 20px ${cur.col}0c` }}>
                  {cur.icon}
                </div>
                <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.5rem", color:"#111827", marginBottom:8 }}>{cur.title}</div>
                <div style={{ fontFamily:"'Outfit',sans-serif", color:"#9ca3af", fontSize:13 }}>{cur.subtitle}</div>
                <div style={{ display:"inline-flex", marginTop:16, padding:"5px 16px", borderRadius:999, background:`${cur.col}14`, border:`1.5px solid ${cur.col}30`,
                  fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:700, color:cur.col }}>
                  Step {cur.id} of 5
                </div>
              </div>
            </div>

            {/* Right content */}
            <div style={{ padding:"44px 42px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
              <div>
                <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10.5, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.2em", marginBottom:18 }}>What's covered</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:11, marginBottom:28 }}>
                  {cur.topics.map((t,i) => <Pill key={`${pk}-${i}`} text={t} col={cur.col} delay={i*65} />)}
                </div>
                <div style={{ borderRadius:16, padding:"18px 20px", background:`${cur.col}0c`, border:`1.5px solid ${cur.col}1e` }}>
                  <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:14, color:"#4b5563", lineHeight:1.8 }}>{cur.detail}</p>
                </div>
              </div>
              <div style={{ marginTop:32, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                <button style={{ padding:"14px 32px", borderRadius:14, border:"none", color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer",
                  fontFamily:"'Bricolage Grotesque',sans-serif",
                  background:`linear-gradient(135deg,${cur.col},${cur.col}cc)`,
                  boxShadow:`0 4px 20px ${cur.glow}`,
                  transition:"transform .25s, box-shadow .25s" }}
                  onMouseEnter={e=>{e.target.style.transform="scale(1.05)";e.target.style.boxShadow=`0 8px 32px ${cur.glow}`;}}
                  onMouseLeave={e=>{e.target.style.transform="scale(1)";e.target.style.boxShadow=`0 4px 20px ${cur.glow}`;}}>
                  {cur.cta} →
                </button>
                <button onClick={()=>setAuto(v=>!v)}
                  style={{ display:"flex", alignItems:"center", gap:7, padding:"10px 18px", borderRadius:12, border:`1.5px solid ${auto?`${cur.col}40`:"#e5e7eb"}`,
                    background:auto?`${cur.col}0f`:"#f9fafb", color:auto?cur.col:"#9ca3af",
                    fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"all .3s" }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:auto?cur.col:"#d1d5db", boxShadow:auto?`0 0 8px ${cur.col}99`:"none", transition:"all .3s", flexShrink:0 }} />
                  {auto?"Auto-advancing":"Manual mode"}
                </button>
              </div>
            </div>
          </div>

          {/* Timer strip */}
          <div style={{ height:3, background:"#f3f4f6" }}>
            {auto && <div key={tk} className="sp-timerbar" style={{ height:"100%", background:`linear-gradient(90deg,${cur.col},${cur.col}70)`, boxShadow:`0 0 8px ${cur.glow}` }} />}
          </div>
        </div>

        {/* Thumbnail grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginTop:16 }}>
          {STEPS.map((s,i) => (
            <button key={s.id} onClick={()=>goTo(i)}
              style={{ textAlign:"left", borderRadius:16, padding:"16px 15px", border:`1.5px solid ${i===active?`${s.col}40`:"#e5e7eb"}`,
                background:i===active?`${s.col}0f`:"#ffffff",
                cursor:"pointer", transition:"all .3s", boxShadow:i===active?`0 4px 20px ${s.glow}`:"0 1px 4px rgba(0,0,0,0.05)" }}
              onMouseEnter={e=>{ if(i!==active){e.currentTarget.style.borderColor="#d1d5db";e.currentTarget.style.transform="translateY(-2px)";} }}
              onMouseLeave={e=>{ if(i!==active){e.currentTarget.style.borderColor="#e5e7eb";e.currentTarget.style.transform="translateY(0)";} }}>
              <div style={{ fontSize:20, marginBottom:8 }}>{s.icon}</div>
              <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:11.5, color:i===active?s.col:"#6b7280", marginBottom:3 }}>{s.label}</div>
              <div style={{ height:2.5, borderRadius:999, background:"#f3f4f6", overflow:"hidden", marginTop:10 }}>
                <div style={{ height:"100%", width:i<=active?"100%":"0%", background:s.col, transition:"width .7s ease", borderRadius:999 }} />
              </div>
            </button>
          ))}
        </div>
        {/* Mobile dots */}
        <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:16 }}>
          {STEPS.map((s,i) => (
            <button key={s.id} onClick={()=>goTo(i)} style={{ height:8, borderRadius:999, background:i===active?cur.col:"#d1d5db", width:i===active?28:8, border:"none", cursor:"pointer", transition:"all .35s" }} />
          ))}
        </div>
      </div>
    </section>
  );
}