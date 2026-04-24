"use client";

import { useEffect, useRef, useState } from "react";

const VB_W = 300;
const VB_H = 200;

type NodeDef = {
  id: string;
  label: string;
  xp: number;
  yp: number;
  r: number;
  fill: string;
  glow: string;
};

const NODES: NodeDef[] = [
  { id: "si", label: "Silicon", xp: 14, yp: 34, r: 15, fill: "#a78bfa", glow: "#7c3aed" },
  { id: "hw", label: "Hardware", xp: 14, yp: 54, r: 14, fill: "#a78bfa", glow: "#7c3aed" },
  { id: "cp", label: "Cooling", xp: 14, yp: 72, r: 14, fill: "#a78bfa", glow: "#7c3aed" },
  { id: "ls", label: "Land & Site", xp: 30, yp: 64, r: 13, fill: "#a78bfa", glow: "#7c3aed" },
  { id: "co", label: "Connect.", xp: 30, yp: 80, r: 12, fill: "#818cf8", glow: "#6366f1" },
  { id: "dc", label: "DC Dev.", xp: 47, yp: 57, r: 23, fill: "#818cf8", glow: "#4f46e5" },
  { id: "pc", label: "Private Credit", xp: 34, yp: 15, r: 18, fill: "#34d399", glow: "#059669" },
  { id: "pe", label: "PE & Infra", xp: 58, yp: 12, r: 18, fill: "#34d399", glow: "#059669" },
  { id: "cl", label: "Colocation", xp: 70, yp: 37, r: 21, fill: "#34d399", glow: "#059669" },
  { id: "hy", label: "Hyperscalers", xp: 70, yp: 66, r: 21, fill: "#34d399", glow: "#059669" },
  { id: "ai", label: "AI Cos", xp: 88, yp: 27, r: 13, fill: "#94a3b8", glow: "#64748b" },
  { id: "en", label: "Enterprise", xp: 88, yp: 52, r: 13, fill: "#94a3b8", glow: "#64748b" },
  { id: "sv", label: "Sovereign AI", xp: 88, yp: 76, r: 12, fill: "#94a3b8", glow: "#64748b" },
];

const EDGES: { from: string; to: string; capital: boolean }[] = [
  { from: "si", to: "dc", capital: false },
  { from: "hw", to: "dc", capital: false },
  { from: "cp", to: "dc", capital: false },
  { from: "ls", to: "dc", capital: false },
  { from: "co", to: "dc", capital: false },
  { from: "dc", to: "cl", capital: false },
  { from: "dc", to: "hy", capital: false },
  { from: "pc", to: "dc", capital: true },
  { from: "pe", to: "cl", capital: true },
  { from: "pe", to: "hy", capital: true },
  { from: "cl", to: "ai", capital: false },
  { from: "cl", to: "en", capital: false },
  { from: "hy", to: "en", capital: false },
  { from: "hy", to: "sv", capital: false },
];

function pos(n: NodeDef, t: number) {
  const baseX = (n.xp / 100) * VB_W;
  const baseY = (n.yp / 100) * VB_H;
  const phase = n.id.charCodeAt(0) * 0.15;
  const dx = Math.sin(t * 0.08 + phase) * 1.4;
  const dy = Math.cos(t * 0.07 + phase * 1.3) * 1.1;
  return { x: baseX + dx, y: baseY + dy };
}

export default function EcosystemWebCardVisual() {
  const [t, setT] = useState(0);
  const tickRef = useRef(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      tickRef.current += 1;
      setT(tickRef.current * 0.045);
    }, 40);
    return () => window.clearInterval(id);
  }, []);

  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <div className="box-border flex h-full min-h-0 flex-col bg-[oklch(95%_0.014_82)] p-[14px]">
      <div
        className="flex min-h-0 flex-1 items-stretch overflow-hidden rounded-md border border-black/10"
        style={{ background: "oklch(11% 0.05 260)" }}
      >
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="h-full w-full min-h-[120px]"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Ecosystem network preview"
          role="img"
        >
          <defs>
            <filter id="hero-eco-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
              </feMerge>
            </filter>
            {NODES.map((n) => (
              <radialGradient key={n.id} id={`grad-${n.id}`} cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor={n.fill} stopOpacity="0.95" />
                <stop offset="100%" stopColor={n.glow} stopOpacity="0.85" />
              </radialGradient>
            ))}
          </defs>

          {EDGES.map((e, i) => {
            const a = nodeMap[e.from];
            const b = nodeMap[e.to];
            if (!a || !b) return null;
            const pa = pos(a, t);
            const pb = pos(b, t);
            return (
              <line
                key={`${e.from}-${e.to}-${i}`}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke={e.capital ? "rgba(52,211,153,0.55)" : "rgba(34,197,94,0.65)"}
                strokeWidth={e.capital ? 0.85 : 1}
                strokeDasharray={e.capital ? "2.5 3" : undefined}
              />
            );
          })}

          {NODES.map((n) => {
            const p = pos(n, t);
            const pulse = 0.1 + 0.06 * (0.5 + 0.5 * Math.sin(t * 3 + n.id.charCodeAt(0)));
            return (
              <g key={n.id}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={n.r + 6}
                  fill={n.glow}
                  opacity={pulse}
                  filter="url(#hero-eco-soft)"
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={n.r}
                  fill={`url(#grad-${n.id})`}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="0.5"
                />
                <text
                  x={p.x}
                  y={p.y + 3}
                  textAnchor="middle"
                  fill="white"
                  fontSize={n.r > 18 ? 7 : 6}
                  fontWeight="600"
                  fontFamily="var(--font-brand), 'Space Grotesk', system-ui, sans-serif"
                  style={{ pointerEvents: "none" }}
                >
                  {n.label.length > 10 ? n.label.slice(0, 9) + "…" : n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
