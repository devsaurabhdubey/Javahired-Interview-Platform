import { useState } from "react";

/* ── Difficulty badge ────────────────────────────────────────────── */
const DIFF_COLORS = {
  easy:   { bg:"#dcfce7", color:"#15803d", label:"Easy"   },
  medium: { bg:"#fef9c3", color:"#a16207", label:"Medium" },
  hard:   { bg:"#fee2e2", color:"#b91c1c", label:"Hard"   },
};

/* ── Logo with fallback ──────────────────────────────────────────── */
function CompanyLogo({ src, name, size = 72 }) {
  const [err, setErr] = useState(false);
  const initials = name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div style={{
      width: size, height: size, borderRadius: 20, overflow: "hidden",
      background: "#fff", border: "3px solid rgba(255,255,255,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    }}>
      {!err
        ? <img src={src} alt={name} style={{ maxWidth: size - 18, maxHeight: size - 24, objectFit: "contain" }} onError={() => setErr(true)} />
        : <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 900, fontSize: size * 0.28, color: "#0a7c6e" }}>{initials}</span>
      }
    </div>
  );
}

/* ── Single stat chip ────────────────────────────────────────────── */
function StatChip({ value, label, icon }) {
  return (
    <div style={{ textAlign: "center", padding: "10px 16px", borderRadius: 14, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)", minWidth: 80 }}>
      <div style={{ fontSize: 16, marginBottom: 2 }}>{icon}</div>
      <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: "1.25rem", color: "#fff", lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 10.5, color: "rgba(255,255,255,0.72)", marginTop: 3, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
    </div>
  );
}

/* ── Main Component ───────────────────────────────────────────────── */
export default function CompanyHeader({ meta, rounds, role, experience, windowWidth }) {
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const totalQs    = rounds.reduce((s, r) => s + r.totalQuestions, 0);
  const completedQs = rounds.reduce((s, r) => s + r.completedQuestions, 0);
  const overallPct = totalQs > 0 ? Math.round((completedQs / totalQs) * 100) : 0;
  const inProgress = rounds.filter(r => r.status === "in_progress").length;
  const completed  = rounds.filter(r => r.status === "completed").length;

  const readinessLabel =
    overallPct === 0   ? "Not Started" :
    overallPct < 30    ? "Just Starting" :
    overallPct < 60    ? "Building Up" :
    overallPct < 85    ? "Almost Ready" :
                         "Interview Ready! 🎉";

  const readinessColor =
    overallPct === 0 ? "#94a3b8" :
    overallPct < 30  ? "#f87171" :
    overallPct < 60  ? "#f59e0b" :
    overallPct < 85  ? "#60a5fa" :
                       "#34d399";

  return (
    <div style={{ borderRadius: isMobile ? 20 : 28, overflow: "hidden", marginBottom: isMobile ? 24 : 36, boxShadow: "0 16px 64px rgba(10,124,110,0.22)" }}>

      {/* ── Gradient banner ── */}
      <div style={{
        background: `linear-gradient(135deg, ${meta.accentColor} 0%, #0e9988 60%, #0a7c6e 100%)`,
        padding: isMobile ? "28px 20px 24px" : "40px 40px 32px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Pattern overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px,transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />
        {/* Glow orbs */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,107,53,0.2),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: "30%", width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,158,11,0.15),transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2 }}>
          {/* Company identity row */}
          <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 14 : 20, marginBottom: 24, flexWrap: "wrap" }}>
            <CompanyLogo src={meta.logo} name={meta.name} size={isMobile ? 56 : 72} />
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: isMobile ? "1.6rem" : "2.2rem", color: "#fff", letterSpacing: "-1px", lineHeight: 1.1 }}>
                {meta.name}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                {[
                  { label: role?.replace(/-/g, " ") || "Java Backend Developer" },
                  { label: experience?.replace(/-/g, "–") + " Yrs" || "3–5 Yrs" },
                  { label: meta.industry },
                ].map((b, i) => (
                  <span key={i} style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 12, padding: "4px 12px", borderRadius: 999, background: "rgba(255,255,255,0.18)", color: "#fff", border: "1px solid rgba(255,255,255,0.28)" }}>
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
            <StatChip value={totalQs}    label="Total Questions" icon="📋" />
            <StatChip value={completedQs} label="Completed"      icon="✅" />
            <StatChip value={rounds.length} label="Rounds"       icon="🎯" />
            <StatChip value="0🔥"        label="Day Streak"      icon="" />
          </div>

          {/* Overall progress */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 12, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Overall Readiness</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 14, color: readinessColor }}>{readinessLabel}</span>
                <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 900, fontSize: 18, color: "#fff" }}>{overallPct}%</span>
              </div>
            </div>
            <div style={{ height: 10, borderRadius: 999, background: "rgba(0,0,0,0.2)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${overallPct}%`, background: "linear-gradient(90deg,#f59e0b,#ff6b35)", borderRadius: 999, transition: "width 1s cubic-bezier(.22,.68,0,1.2)", boxShadow: "0 0 10px rgba(245,158,11,0.6)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Company tip strip ── */}
      <div style={{ background: "#fff7ed", borderTop: "2px solid #fed7aa", padding: isMobile ? "12px 20px" : "14px 40px", display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>💡</span>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13.5, color: "#7c2d12", lineHeight: 1.65, fontWeight: 500 }}>
          <strong style={{ fontFamily: "'Bricolage Grotesque',sans-serif", color: "#c2410c" }}>Pro Tip: </strong>
          {meta.tip}
        </p>
      </div>
    </div>
  );
}