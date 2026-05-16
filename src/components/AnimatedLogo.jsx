export default function AnimatedLogo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", flexShrink: 0 }}
    >
      <style>{`
        @keyframes logo-steam1 {
          0%   { transform: translateY(0)   scaleX(1);   opacity: .9; }
          50%  { transform: translateY(-6px) scaleX(1.2); opacity: .5; }
          100% { transform: translateY(-12px) scaleX(.8); opacity: 0; }
        }
        @keyframes logo-steam2 {
          0%   { transform: translateY(0)   scaleX(1);   opacity: .7; }
          50%  { transform: translateY(-5px) scaleX(1.3); opacity: .35; }
          100% { transform: translateY(-10px) scaleX(.7); opacity: 0; }
        }
        @keyframes logo-steam3 {
          0%   { transform: translateY(0)   scaleX(1);   opacity: .8; }
          50%  { transform: translateY(-7px) scaleX(1.1); opacity: .4; }
          100% { transform: translateY(-13px) scaleX(.9); opacity: 0; }
        }
        @keyframes logo-glow {
          0%,100% { filter: drop-shadow(0 0 3px #0a7c6e60); }
          50%      { filter: drop-shadow(0 0 9px #0a7c6eaa); }
        }
        @keyframes logo-ring {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .ls1 { animation: logo-steam1 2s ease-in-out infinite; transform-origin: center bottom; }
        .ls2 { animation: logo-steam2 2s ease-in-out .45s infinite; transform-origin: center bottom; }
        .ls3 { animation: logo-steam3 2s ease-in-out .9s  infinite; transform-origin: center bottom; }
        .lg  { animation: logo-glow 3s ease-in-out infinite; }
        .lr  { animation: logo-ring 8s linear infinite; transform-origin: 22px 28px; }
      `}</style>

      {/* Outer spinning dashed ring */}
      <circle className="lr" cx="22" cy="28" r="17" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4 5" strokeLinecap="round" opacity=".35" />

      {/* Cup body */}
      <g className="lg">
        <rect x="9" y="24" width="22" height="14" rx="4" fill="#0a7c6e" />
        {/* Cup highlight */}
        <rect x="9" y="24" width="22" height="5" rx="3" fill="#0e9988" opacity=".5" />
        {/* Cup handle */}
        <path d="M31 27 Q38 27 38 31 Q38 35 31 35" stroke="#0a7c6e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Saucer */}
        <ellipse cx="20" cy="38.5" rx="13" ry="2.5" fill="#f59e0b" opacity=".85" />
        {/* Java "J" letter on cup */}
        <text x="15.5" y="34" fontFamily="'Unbounded',sans-serif" fontWeight="900" fontSize="8" fill="#fafafa" letterSpacing="-0.5">JH</text>
      </g>

      {/* Steam strands */}
      <g>
        <path className="ls2" d="M15 23 Q13 20 15 17" stroke="#ff6b35" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path className="ls1" d="M20 22 Q18 18 20 14" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path className="ls3" d="M25 23 Q23 19 25 15" stroke="#ff6b35" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}