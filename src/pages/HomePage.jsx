import { useEffect, useRef, useState } from "react";
import StepwiseProgress from "./StepwiseProgress";

// ── Marquee companies with logo URLs ──────────────────────────────────────────
const marqueeCompanies = [
  { name: "Google",       logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft",    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Amazon",       logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Oracle",       logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
  { name: "IBM",          logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Meta",         logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Netflix",      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Uber",         logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" },
  { name: "Adobe",        logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png" },
  { name: "LinkedIn",     logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" },
  { name: "PayPal",       logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  { name: "Cisco",        logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg" },
  { name: "Infosys",      logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
  { name: "TCS",          logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg" },
  { name: "Wipro",        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" },
  { name: "Goldman Sachs",logo: "https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg" },
  { name: "Capgemini",    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Capgemini_201x_logo.svg" },
  { name: "Accenture",    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" },
  { name: "Intuit",       logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Intuit_Logo.svg" },
];

// ── Tech pills ────────────────────────────────────────────────────────────────
const techPills = [
  { label: "Java",          icon: "☕" },
  { label: "Spring Boot",   icon: "🌱" },
  { label: "Microservices", icon: "🔗" },
  { label: "System Design", icon: "🏗️" },
  { label: "DSA",           icon: "🧠" },
  { label: "React",         icon: "⚛️" },
  { label: "SQL",           icon: "🗄️" },
  { label: "Kafka",         icon: "📨" },
  { label: "Docker",        icon: "🐳" },
  { label: "AWS",           icon: "☁️" },
];

// ── Company cards ─────────────────────────────────────────────────────────────
const featuredCompanies = [
  {
    name: "Mphasis",
    desc: "Java backend, Spring Boot, banking domain, SQL & microservices interview prep.",
    gradient: "from-violet-600 via-purple-600 to-indigo-700",
    accent: "#a78bfa",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Mphasis_new_logo.jpg",
    logoFallback: "M",
  },
  {
    name: "JPMorgan",
    desc: "Enterprise Java, multithreading, low-latency systems & fintech interviews.",
    gradient: "from-slate-800 via-gray-900 to-zinc-900",
    accent: "#94a3b8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/J_P_Morgan_Logo_2008_1.svg",
    logoFallback: "JP",
  },
  {
    name: "Wells Fargo",
    desc: "Banking technology interviews, REST APIs, Java backend & production support.",
    gradient: "from-red-700 via-rose-700 to-amber-600",
    accent: "#fbbf24",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Wells_Fargo_Bank.svg",
    logoFallback: "WF",
  },
  {
    name: "Deloitte",
    desc: "Java full stack, consulting projects, React + Spring Boot interview prep.",
    gradient: "from-emerald-700 via-teal-700 to-cyan-700",
    accent: "#34d399",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg",
    logoFallback: "D",
  },
];

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
  { value: "50K+", label: "Developers Prepared" },
  { value: "200+", label: "Companies Covered" },
  { value: "10K+", label: "Interview Questions" },
  { value: "98%",  label: "Success Rate" },
];

// ── Floating background icons ─────────────────────────────────────────────────
const floatingIcons = ["☕","💻","⚡","🚀","🧠","🖥️","📦","🔧","☁️","🧩","⚙️","🔗"];

// ── Marquee Item Component ─────────────────────────────────────────────────────
const MarqueeItem = ({ company }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="flex-shrink-0 flex items-center gap-3 bg-white/90 backdrop-blur border border-slate-100 shadow-md px-6 py-3 rounded-2xl mx-3 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
      <div className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl overflow-hidden flex-shrink-0">
        {!imgError ? (
          <img
            src={company.logo}
            alt={company.name}
            className="max-w-8 max-h-7 object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-sm font-black text-slate-700">{company.name.charAt(0)}</span>
        )}
      </div>
      <span className="font-bold text-slate-700 text-sm whitespace-nowrap group-hover:text-blue-600 transition-colors">{company.name}</span>
    </div>
  );
};

// ── Company Logo (with fallback) ──────────────────────────────────────────────
const CompanyLogo = ({ src, fallback, alt }) => {
  const [err, setErr] = useState(false);
  return (
    <div className="bg-white rounded-2xl p-3 w-14 h-14 flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden">
      {!err ? (
        <img src={src} alt={alt} className="max-w-10 max-h-8 object-contain" onError={() => setErr(true)} />
      ) : (
        <span className="text-lg font-black text-slate-800">{fallback}</span>
      )}
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────
const HomePage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after mount
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#060917] overflow-hidden relative font-body">

      {/* ── CSS INJECTED STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; }

        .font-display { font-family: 'Syne', sans-serif !important; }
        .font-body    { font-family: 'DM Sans', sans-serif !important; }

        /* ── Marquee ── */
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 32s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }

        /* ── Marquee reverse ── */
        @keyframes marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track-reverse {
          display: flex;
          width: max-content;
          animation: marquee-reverse 28s linear infinite;
        }
        .marquee-track-reverse:hover { animation-play-state: paused; }

        /* ── Float icons ── */
        @keyframes floatUp {
          0%,100% { transform: translateY(0) rotate(0deg); opacity: 0.07; }
          50%      { transform: translateY(-22px) rotate(8deg); opacity: 0.13; }
        }

        /* ── Glow pulse ── */
        @keyframes glowPulse {
          0%,100% { opacity: 0.18; transform: scale(1); }
          50%      { opacity: 0.32; transform: scale(1.12); }
        }

        /* ── Badge shimmer ── */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .badge-shimmer {
          background: linear-gradient(90deg, #3b82f680, #60a5fa, #818cf8, #60a5fa, #3b82f680);
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* ── Entrance ── */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .reveal { opacity: 0; }
        .reveal.in {
          animation: fadeSlideUp 0.7s cubic-bezier(.22,.68,0,1.2) forwards;
        }

        /* ── Card hover glow ── */
        .card-glow {
          transition: box-shadow 0.4s, transform 0.4s;
        }
        .card-glow:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 0 40px rgba(139,92,246,0.3);
        }

        /* ── Stat counter style ── */
        .stat-number {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* ── Mesh gradient orbs ── */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          animation: glowPulse 6s ease-in-out infinite;
          pointer-events: none;
        }

        /* ── Grid lines overlay ── */
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* ── Pill tags ── */
        .pill-tag {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
        }
        .pill-tag:hover {
          background: rgba(96,165,250,0.15);
          border-color: rgba(96,165,250,0.5);
          transform: translateY(-3px);
        }

        /* ── CTA button ── */
        .btn-cta {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          position: relative;
          overflow: hidden;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .btn-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-cta:hover { transform: scale(1.03); box-shadow: 0 0 32px rgba(139,92,246,0.5); }
        .btn-cta:hover::before { opacity: 1; }
        .btn-cta span { position: relative; z-index: 1; }

        /* ── Select dark style ── */
        .dark-select {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          color: #e2e8f0;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 18px;
          transition: border-color 0.2s, background-color 0.2s;
        }
        .dark-select option { background: #0f1629; color: #e2e8f0; }
        .dark-select:focus { outline: none; border-color: #60a5fa; background-color: rgba(255,255,255,0.1); }

        /* ── Noise grain ── */
        .noise::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          border-radius: inherit;
        }
      `}</style>

      {/* ── Background orbs ── */}
      <div className="orb" style={{ width:500, height:500, background:"#3b82f6", top:-120, left:-100, opacity:0.12, animationDelay:"0s" }} />
      <div className="orb" style={{ width:400, height:400, background:"#8b5cf6", bottom:-80, right:-80, opacity:0.14, animationDelay:"2s" }} />
      <div className="orb" style={{ width:300, height:300, background:"#06b6d4", top:"40%", left:"55%", opacity:0.08, animationDelay:"4s" }} />
      <div className="grid-overlay" />

      {/* ── Floating icons ── */}
      {floatingIcons.map((icon, i) => (
        <div key={i} className="absolute text-4xl select-none pointer-events-none" style={{
          top: `${8 + (i * 7.5) % 85}%`,
          left: `${(i * 13 + 5) % 95}%`,
          animation: `floatUp ${5 + (i % 4)}s ease-in-out infinite`,
          animationDelay: `${i * 0.6}s`,
          opacity: 0.07,
        }}>{icon}</div>
      ))}

      {/* ════════════════════ NAVBAR ════════════════════ */}
      <nav className="relative z-20 flex justify-between items-center px-8 py-5 border-b border-white/5 backdrop-blur-xl bg-[#060917]/70">
        <div className={`reveal ${mounted ? "in" : ""}`} style={{ animationDelay:"0s" }}>
          <h1 className="font-display text-3xl font-black tracking-tight text-white">
            Java<span className="text-blue-400">Hired</span>
          </h1>
          <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase mt-0.5">AI Interview Platform</p>
        </div>
        <div className="flex gap-3 items-center">
          <button className="text-slate-400 hover:text-white transition px-4 py-2 text-sm font-medium">Browse</button>
          <button className="btn-cta text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg">
            <span>Get Started →</span>
          </button>
        </div>
      </nav>

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">

        {/* Badge */}
        <div className={`reveal ${mounted ? "in" : ""} inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-8 backdrop-blur`} style={{ animationDelay:"0.1s" }}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="badge-shimmer text-sm font-semibold">AI Powered Interview Preparation Platform</span>
        </div>

        {/* Headline */}
        <h1 className={`reveal ${mounted ? "in" : ""} font-display font-black text-white leading-[1.08] tracking-tight`}
          style={{ fontSize:"clamp(2.8rem,6vw,5.5rem)", animationDelay:"0.2s" }}>
          Crack Java Interviews
          <br />
          <span style={{
            background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #34d399 100%)",
            WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent"
          }}>Like A Pro</span>
        </h1>

        <p className={`reveal ${mounted ? "in" : ""} mt-6 text-slate-400 max-w-2xl mx-auto leading-relaxed`}
          style={{ fontSize:"1.15rem", animationDelay:"0.3s" }}>
          Master Java Backend, Spring Boot, System Design, Microservices &amp; Real Company Interview Questions — powered by AI.
        </p>

        {/* Stats row */}
        <div className={`reveal ${mounted ? "in" : ""} flex flex-wrap justify-center gap-8 mt-10`} style={{ animationDelay:"0.4s" }}>
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="stat-number text-3xl">{s.value}</div>
              <div className="text-slate-500 text-xs font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Search Container ── */}
        <div className={`reveal ${mounted ? "in" : ""} relative mt-14 max-w-4xl mx-auto`} style={{ animationDelay:"0.5s" }}>
          {/* Glow border */}
          <div className="absolute -inset-px rounded-3xl" style={{
            background: "linear-gradient(135deg, #3b82f640, #8b5cf640, #06b6d440)",
            filter: "blur(2px)"
          }} />
          <div className="relative rounded-3xl p-8 border border-white/10 backdrop-blur-2xl" style={{ background:"rgba(15,22,50,0.85)" }}>
            <p className="text-slate-400 text-sm font-medium mb-5 text-left">Customize your interview plan</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label:"Company", options:["Select Company","Oracle","Amazon","Google","Microsoft","Infosys","TCS","Deloitte","JPMorgan"] },
                { label:"Experience", options:["Years of Experience","0–1 Years","1–3 Years","3–5 Years","5–8 Years","8+ Years"] },
                { label:"Focus Area", options:["Interview Type","Java Backend","Java Full Stack","Spring Boot","System Design","DSA"] },
              ].map((sel, i) => (
                <div key={i} className="relative">
                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5 block">{sel.label}</label>
                  <select className="dark-select w-full rounded-xl px-4 py-4 text-sm font-medium pr-10">
                    {sel.options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <button className="btn-cta w-full mt-6 text-white text-lg font-bold py-4 rounded-2xl shadow-2xl">
              <span>Generate My Interview Plan 🚀</span>
            </button>
          </div>
        </div>

        {/* ── Tech Pills ── */}
        <div className={`reveal ${mounted ? "in" : ""} flex flex-wrap justify-center gap-3 mt-10`} style={{ animationDelay:"0.6s" }}>
          {techPills.map((t, i) => (
            <div key={t.label} className="pill-tag flex items-center gap-2 px-5 py-2.5 rounded-full cursor-pointer"
              style={{ animationDelay: `${0.6 + i * 0.05}s` }}>
              <span>{t.icon}</span>
              <span className="text-slate-300 text-sm font-semibold">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════ FEATURED COMPANIES ════════════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold uppercase tracking-widest mb-4">
            🎯 Top Companies
          </div>
          <h2 className="font-display font-black text-white" style={{ fontSize:"clamp(1.8rem,4vw,3.2rem)" }}>
            Prepare For Top Companies
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
            Company-specific roadmaps with real interview questions, AI-powered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCompanies.map((co, i) => (
            <div key={co.name}
              className={`card-glow reveal ${mounted ? "in" : ""} relative rounded-3xl p-7 cursor-pointer overflow-hidden group`}
              style={{
                background: `linear-gradient(145deg, rgba(15,22,50,0.95), rgba(20,30,60,0.9))`,
                border:"1px solid rgba(255,255,255,0.07)",
                animationDelay: `${0.7 + i * 0.1}s`,
              }}>
              {/* Accent glow top-right */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ background: co.accent, filter:"blur(24px)" }} />

              {/* Gradient stripe at top */}
              <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r ${co.gradient}`} />

              <CompanyLogo src={co.logo} fallback={co.logoFallback} alt={co.name} />

              <h3 className="font-display font-bold text-white text-2xl mt-6">{co.name}</h3>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">{co.desc}</p>

              <button className="mt-7 w-full py-3 rounded-xl text-sm font-bold text-white border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group-hover:border-opacity-40">
                Explore Questions →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════ STEPWISE PROGRESS ════════════════════ */}
      <StepwiseProgress />

      {/* ════════════════════ MARQUEE STRIP ════════════════════ */}
      <section className="relative z-10 py-16 overflow-hidden">
        {/* Section label */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-3">
            🌐 Industry Coverage
          </div>
          <h2 className="font-display font-black text-white text-3xl">Companies Developers Prepare For</h2>
          <p className="mt-3 text-slate-500">Curated preparation for 200+ top companies worldwide.</p>
        </div>

        {/* Fade edges */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background:"linear-gradient(90deg, #060917, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background:"linear-gradient(-90deg, #060917, transparent)" }} />

          {/* Row 1 — left to right */}
          <div className="overflow-hidden mb-4">
            <div className="marquee-track">
              {[...marqueeCompanies, ...marqueeCompanies].map((co, i) => (
                <MarqueeItem key={`r1-${i}`} company={co} />
              ))}
            </div>
          </div>

          {/* Row 2 — right to left */}
          <div className="overflow-hidden">
            <div className="marquee-track-reverse">
              {[...marqueeCompanies.slice().reverse(), ...marqueeCompanies.slice().reverse()].map((co, i) => (
                <MarqueeItem key={`r2-${i}`} company={co} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ FEATURE HIGHLIGHTS ════════════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon:"🎯", title:"Tailored Roadmaps", desc:"AI builds a personalized prep plan based on your target company, role, and experience level." },
            { icon:"🧠", title:"Real Interview Questions", desc:"Access actual questions asked at top companies, updated regularly from verified sources." },
            { icon:"⚡", title:"AI-Powered Feedback", desc:"Get instant feedback on your answers with detailed explanations and better approaches." },
          ].map((f, i) => (
            <div key={i} className="relative rounded-3xl p-8 border border-white/7 hover:border-blue-500/30 transition-all duration-300 group cursor-pointer"
              style={{ background:"rgba(15,22,50,0.6)", backdropFilter:"blur(16px)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                style={{ background:"linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))", border:"1px solid rgba(59,130,246,0.2)" }}>
                {f.icon}
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-3">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background:"linear-gradient(90deg, #3b82f6, #8b5cf6)" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════ CTA BANNER ════════════════════ */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-12 mb-16">
        <div className="relative rounded-3xl p-12 text-center overflow-hidden"
          style={{ background:"linear-gradient(135deg, #1e3a5f, #2d1b69, #0f3460)" }}>
          <div className="orb" style={{ width:300, height:300, background:"#8b5cf6", top:-100, left:-50, opacity:0.2, filter:"blur(80px)", position:"absolute", animation:"none" }} />
          <div className="orb" style={{ width:200, height:200, background:"#3b82f6", bottom:-60, right:-40, opacity:0.2, filter:"blur(60px)", position:"absolute", animation:"none" }} />
          <div className="relative z-10">
            <h2 className="font-display font-black text-white text-4xl mb-4">Ready to Land Your Dream Job?</h2>
            <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">Join 50,000+ developers who cracked their Java interviews with JavaHired.</p>
            <button className="btn-cta text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-2xl">
              <span>Start Preparing for Free →</span>
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════ FOOTER ════════════════════ */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-slate-600 text-sm">
        <span className="font-display font-bold text-slate-500">Java<span className="text-blue-500">Hired</span></span>
        <span className="mx-3">·</span>
        © 2025 All rights reserved
      </footer>

    </div>
  );
};

export default HomePage;