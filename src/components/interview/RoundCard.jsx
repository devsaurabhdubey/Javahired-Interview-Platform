/* ── RoundCard.jsx ──────────────────────────────────────────────── */

const STATUS_CONFIG = {
  not_started: { label: "Not Started", bg: "#f3f4f6", color: "#6b7280",  dot: "#d1d5db"  },
  in_progress:  { label: "In Progress", bg: "#fef9c3", color: "#a16207",  dot: "#f59e0b"  },
  completed:    { label: "Completed",   bg: "#dcfce7", color: "#15803d",  dot: "#22c55e"  },
};

const DIFF_MAP = {
  easy:   { label: "Easy",   color: "#15803d" },
  medium: { label: "Med",    color: "#a16207" },
  hard:   { label: "Hard",   color: "#b91c1c" },
};

export default function RoundCard({ round, companyName, onStart, windowWidth }) {
  const isMobile = windowWidth < 640;
  const cfg    = STATUS_CONFIG[round.status] || STATUS_CONFIG.not_started;
  const pct    = round.totalQuestions > 0
    ? Math.round((round.completedQuestions / round.totalQuestions) * 100) : 0;
  const btnLabel = round.status === "in_progress" ? "Continue →"
    : round.status === "completed" ? "Review →" : "Start →";

  /* top 3 topics to preview */
  const previewTopics = (round.topics || []).slice(0, 3);

  return (
    <div
      onClick={() => onStart(round.id)}
      style={{
        borderRadius: 22, overflow: "hidden", background: "#fff",
        border: `1.5px solid ${round.status === "not_started" ? "#f3f4f6" : `${round.accentColor}35`}`,
        boxShadow: round.status === "not_started"
          ? "0 2px 12px rgba(0,0,0,0.06)"
          : `0 8px 32px ${round.accentColor}18`,
        cursor: "pointer", transition: "transform .35s cubic-bezier(.22,.68,0,1.2), box-shadow .35s",
        display: "flex", flexDirection: "column",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-6px) scale(1.015)";
        e.currentTarget.style.borderColor = `${round.accentColor}55`;
        e.currentTarget.style.boxShadow = `0 16px 48px ${round.accentColor}22`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.borderColor = round.status === "not_started" ? "#f3f4f6" : `${round.accentColor}35`;
        e.currentTarget.style.boxShadow = round.status === "not_started" ? "0 2px 12px rgba(0,0,0,0.06)" : `0 8px 32px ${round.accentColor}18`;
      }}
    >
      {/* Accent top bar */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${round.accentColor}, ${round.accentColor}80)` }} />

      <div style={{ padding: isMobile ? "20px 18px" : "24px 22px", flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Header row: icon + title + status badge */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Icon bubble */}
            <div style={{
              width: 50, height: 50, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, background: `${round.accentColor}12`, border: `1.5px solid ${round.accentColor}28`, flexShrink: 0,
            }}>
              {round.icon}
            </div>
            <div>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: isMobile ? "1rem" : "1.1rem", color: "#111827", letterSpacing: "-0.3px" }}>
                {round.title}
              </div>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, color: "#9ca3af", marginTop: 2 }}>
                {round.subtitle}
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 999, flexShrink: 0,
            background: cfg.bg, border: `1px solid ${cfg.dot}40`,
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.dot, boxShadow: round.status === "in_progress" ? `0 0 6px ${cfg.dot}` : "none" }} />
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 700, color: cfg.color }}>{cfg.label}</span>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 16 }}>
          {[
            { v: round.totalQuestions,          l: "Questions"    },
            { v: round.totalTopics,              l: "Topics"       },
            { v: `~${round.estimatedHours}h`,    l: "Est. Time"    },
          ].map(s => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: "1.15rem", color: round.accentColor, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10.5, color: "#9ca3af", fontWeight: 600, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {round.completedQuestions} / {round.totalQuestions} questions
            </span>
            <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 13, fontWeight: 800, color: round.accentColor }}>{pct}%</span>
          </div>
          <div style={{ height: 7, borderRadius: 999, background: "#f3f4f6", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${round.accentColor},${round.accentColor}aa)`, borderRadius: 999, transition: "width 1s cubic-bezier(.22,.68,0,1.2)", boxShadow: pct > 0 ? `0 0 8px ${round.accentColor}60` : "none" }} />
          </div>
        </div>

        {/* Preview topics */}
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10.5, fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 8 }}>
            Topics inside
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {previewTopics.map(t => (
              <div key={t.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 10px", borderRadius: 9, background: "#f9fafb" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: t.status === "completed" ? "#22c55e" : t.status === "in_progress" ? round.accentColor : "#d1d5db", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12.5, fontWeight: 600, color: "#4b5563" }}>{t.title}</span>
                </div>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 700, color: "#9ca3af" }}>{t.questionCount}q</span>
              </div>
            ))}
            {(round.topics?.length || 0) > 3 && (
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, color: round.accentColor, fontWeight: 700, textAlign: "center", paddingTop: 2 }}>
                +{round.topics.length - 3} more topics
              </div>
            )}
          </div>
        </div>

        {/* CTA button */}
        <button
          style={{
            width: "100%", padding: "13px", borderRadius: 14, border: "none",
            background: round.status === "completed"
              ? "#f0fdf4"
              : `linear-gradient(135deg, ${round.accentColor}, ${round.accentColor}cc)`,
            color: round.status === "completed" ? "#15803d" : "#fff",
            fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 14,
            cursor: "pointer", transition: "all .25s",
            boxShadow: round.status !== "completed" ? `0 4px 16px ${round.accentColor}30` : "none",
            border: round.status === "completed" ? "1.5px solid #bbf7d0" : "none",
          }}
          onClick={e => { e.stopPropagation(); onStart(round.id); }}
          onMouseEnter={e => { e.target.style.transform = "scale(1.03)"; }}
          onMouseLeave={e => { e.target.style.transform = "scale(1)"; }}
        >
          {btnLabel}
        </button>
      </div>
    </div>
  );
}