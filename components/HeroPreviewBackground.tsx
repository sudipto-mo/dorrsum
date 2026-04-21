"use client";

import { useEffect, useRef } from "react";

/** ~16 fractional positions in an ecosystem-style network (0–1). */
const NODE_BASE: { x: number; y: number; r: number; large?: boolean }[] = [
  { x: 0.08, y: 0.12, r: 5.5, large: true },
  { x: 0.22, y: 0.08, r: 3 },
  { x: 0.38, y: 0.1, r: 3 },
  { x: 0.52, y: 0.07, r: 5.5, large: true },
  { x: 0.68, y: 0.11, r: 3 },
  { x: 0.1, y: 0.35, r: 3 },
  { x: 0.08, y: 0.52, r: 3 },
  { x: 0.18, y: 0.62, r: 3 },
  { x: 0.32, y: 0.45, r: 5.5, large: true },
  { x: 0.48, y: 0.38, r: 3 },
  { x: 0.42, y: 0.58, r: 3 },
  { x: 0.58, y: 0.52, r: 3 },
  { x: 0.72, y: 0.42, r: 5.5, large: true },
  { x: 0.78, y: 0.62, r: 3 },
  { x: 0.88, y: 0.35, r: 3 },
  { x: 0.9, y: 0.72, r: 3 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [5, 6],
  [6, 7],
  [1, 8],
  [8, 9],
  [9, 10],
  [8, 11],
  [11, 12],
  [12, 13],
  [3, 12],
  [9, 14],
  [14, 15],
  [10, 11],
  [7, 10],
];

const AMP = 0.007;
const OMEGA = 0.00045;
const COLOR = "rgb(28, 52, 110)";

export default function HeroPreviewBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const draw = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dpr = canvas.width / Math.max(w, 1);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      angleRef.current += OMEGA;
      const t = angleRef.current;

      const positions = NODE_BASE.map((n, i) => ({
        x: n.x * w + AMP * Math.sin(t + i * 0.7) * w,
        y: n.y * h + AMP * Math.cos(t * 1.1 + i * 0.5) * h,
        r: n.r,
      }));

      ctx.strokeStyle = COLOR;
      ctx.globalAlpha = 0.055;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      for (const [a, b] of EDGES) {
        const pa = positions[a];
        const pb = positions[b];
        if (!pa || !pb) continue;
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      for (let i = 0; i < positions.length; i++) {
        const p = positions[i];
        const op = 0.07 + 0.03 * (0.5 + 0.5 * Math.sin(t * 2 + i));
        ctx.fillStyle = COLOR;
        ctx.globalAlpha = op;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 min-h-full w-full overflow-hidden"
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
