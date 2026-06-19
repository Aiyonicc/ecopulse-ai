"use client";

import React, { useEffect, useRef, useState } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  color?: string;
  intensity?: number; // for Section 9 heat points
}

interface EarthCanvasProps {
  score?: number; // 0 to 100
  interactiveMode?: boolean; // Section 9 map version or Section 1 calculator version
}

export default function EarthCanvas({ score = 45, interactiveMode = false }: EarthCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  
  // Animation states
  const targetRotationX = useRef(0);
  const targetRotationY = useRef(0);
  const currentRotationX = useRef(0);
  const currentRotationY = useRef(0);
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);

  // Generate sphere points
  const points = useRef<Point3D[]>([]);
  const leaves = useRef<{ x: number; y: number; size: number; speedX: number; speedY: number; angle: number; rotSpeed: number }[]>([]);

  // Calculate colors based on carbon score
  const getCarbonColor = (intensity: number) => {
    // 0 is green, 50 is yellow, 100 is orange-red
    if (intensity < 40) return `rgba(16, 185, 129, ${0.4 + (1 - intensity / 40) * 0.4})`; // emerald green
    if (intensity < 70) return `rgba(234, 179, 8, ${0.5})`; // yellow
    return `rgba(239, 68, 68, ${0.6})`; // red
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Generate Points on Sphere (Fibonacci Lattice for even distribution)
    const count = interactiveMode ? 600 : 400;
    points.current = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const r = 1;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      // Define some specific geographic "hotspots" for the interactive map (renewable adoption vs carbon intensity)
      let intensity = 20; // default low
      if (interactiveMode) {
        // Mocking some country coordinates
        if (Math.abs(y - 0.2) < 0.3 && x > 0.4) intensity = 85; // Area A (high carbon)
        if (Math.abs(y + 0.3) < 0.2 && x < -0.3) intensity = 10; // Area B (high renewable)
        if (z > 0.5 && y > 0.3) intensity = 55; // Area C (medium)
      } else {
        intensity = score;
      }

      points.current.push({ x, y, z, intensity });
    }

    // Generate Floating Leaves
    leaves.current = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 4,
      speedX: Math.random() * 0.6 - 0.3,
      speedY: Math.random() * 0.8 + 0.2,
      angle: Math.random() * Math.PI * 2,
      rotSpeed: Math.random() * 0.02 - 0.01,
    }));

    // Handle resizing
    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Render loop
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * (interactiveMode ? 0.35 : 0.38);

      // Draw Atmospheric Glow behind Earth
      const glowGrad = ctx.createRadialGradient(cx, cy, r * 0.8, cx, cy, r * 1.3);
      const scoreColor = score < 40 ? "0, 255, 102" : score < 75 ? "234, 179, 8" : "239, 68, 68";
      glowGrad.addColorStop(0, `rgba(${scoreColor}, 0.12)`);
      glowGrad.addColorStop(0.5, `rgba(${scoreColor}, 0.05)`);
      glowGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Apply rotation math
      if (!isDragging.current) {
        targetRotationY.current += 0.003; // Auto slow rotation
      }

      currentRotationX.current += (targetRotationX.current - currentRotationX.current) * 0.1;
      currentRotationY.current += (targetRotationY.current - currentRotationY.current) * 0.1;

      const cosX = Math.cos(currentRotationX.current);
      const sinX = Math.sin(currentRotationX.current);
      const cosY = Math.cos(currentRotationY.current);
      const sinY = Math.sin(currentRotationY.current);

      // Project and Sort Points by Z depth so we render background dots first
      const projected = points.current.map((pt) => {
        // Rotate Y
        const x1 = pt.x * cosY - pt.z * sinY;
        const z1 = pt.x * sinY + pt.z * cosY;

        // Rotate X
        const y2 = pt.y * cosX - z1 * sinX;
        const z2 = pt.y * sinX + z1 * cosX;

        // Perspective projection
        const dist = 2.5;
        const scale = dist / (dist + z2);
        const px = cx + x1 * r * scale;
        const py = cy + y2 * r * scale;

        return {
          px,
          py,
          scale,
          z2,
          intensity: pt.intensity || 0,
        };
      });

      // Sort points (back to front)
      projected.sort((a, b) => b.z2 - a.z2);

      // Draw Grid connections for premium cyber look
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        const pt1 = projected[i];
        if (pt1.z2 > 0) continue; // Skip front grid lines to avoid cluttering

        let connections = 0;
        for (let j = i + 1; j < projected.length && connections < 2; j++) {
          const pt2 = projected[j];
          const distSq = Math.pow(pt1.px - pt2.px, 2) + Math.pow(pt1.py - pt2.py, 2);
          if (distSq < Math.pow(r * 0.15, 2)) {
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.08 * pt1.scale})`;
            ctx.beginPath();
            ctx.moveTo(pt1.px, pt1.py);
            ctx.lineTo(pt2.px, pt2.py);
            ctx.stroke();
            connections++;
          }
        }
      }

      // Draw points
      projected.forEach((pt) => {
        const size = (pt.z2 > 0 ? 1.2 : 2.5) * pt.scale;
        const color = getCarbonColor(pt.intensity);

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(pt.px, pt.py, size, 0, Math.PI * 2);
        ctx.fill();

        // Draw outer glow for hotspot sites
        if (interactiveMode && pt.intensity > 70 && pt.z2 < 0) {
          ctx.strokeStyle = `rgba(239, 68, 68, ${0.15 * pt.scale})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(pt.px, pt.py, size * 2.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Draw Floating Leaves (Section 1 / Hero mode)
      if (!interactiveMode) {
        leaves.current.forEach((leaf) => {
          leaf.y += leaf.speedY;
          leaf.x += leaf.speedX;
          leaf.angle += leaf.rotSpeed;

          // Wrap around edges
          if (leaf.y > h) {
            leaf.y = -10;
            leaf.x = Math.random() * w;
          }
          if (leaf.x < -10 || leaf.x > w + 10) {
            leaf.speedX = -leaf.speedX;
          }

          ctx.save();
          ctx.translate(leaf.x, leaf.y);
          ctx.rotate(leaf.angle);
          ctx.fillStyle = `rgba(52, 211, 153, ${0.25})`; // Soft transparent emerald
          
          // Draw leaf shape
          ctx.beginPath();
          ctx.moveTo(0, -leaf.size);
          ctx.quadraticCurveTo(leaf.size / 2, 0, 0, leaf.size);
          ctx.quadraticCurveTo(-leaf.size / 2, 0, 0, -leaf.size);
          ctx.fill();
          ctx.restore();
        });
      }

      // Draw Hover Tooltips in interactive map mode
      if (interactiveMode && hoveredPoint) {
        ctx.fillStyle = "rgba(15, 35, 25, 0.85)";
        ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(cx - 90, cy + r + 20, 180, 50, 10);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 11px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(hoveredPoint, cx, cy + r + 38);

        ctx.fillStyle = "rgba(16, 185, 129, 1)";
        ctx.font = "10px sans-serif";
        ctx.fillText("Renewables: 64% | Carbon intensity: Low", cx, cy + r + 56);
      }

      // Draw center core light
      const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, r * 0.95);
      coreGrad.addColorStop(0, "rgba(5, 40, 20, 0.85)");
      coreGrad.addColorStop(0.8, "rgba(5, 25, 15, 0.9)");
      coreGrad.addColorStop(1, "rgba(4, 15, 8, 0.95)");
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      // Draw thin glowing atmosphere stroke
      ctx.strokeStyle = `rgba(${scoreColor}, 0.25)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [score, interactiveMode, hoveredPoint]);

  // Drag handlers for mouse interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMouseX.current = e.clientX;
    lastMouseY.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) {
      // Handle interactive map hover tooltip triggers
      if (interactiveMode) {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dist = Math.sqrt(Math.pow(mx - cx, 2) + Math.pow(my - cy, 2));
        const r = Math.min(rect.width, rect.height) * 0.35;

        if (dist <= r) {
          if (mx < cx && my < cy) setHoveredPoint("North America Region");
          else if (mx >= cx && my < cy) setHoveredPoint("Europe / Asia Region");
          else if (mx < cx && my >= cy) setHoveredPoint("South America Region");
          else setHoveredPoint("Australia / Oceania Region");
        } else {
          setHoveredPoint(null);
        }
      }
      return;
    }

    const deltaX = e.clientX - lastMouseX.current;
    const deltaY = e.clientY - lastMouseY.current;

    targetRotationY.current += deltaX * 0.007;
    targetRotationX.current += deltaY * 0.007;

    // Limit X rotation to avoid flipping upside down
    targetRotationX.current = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, targetRotationX.current));

    lastMouseX.current = e.clientX;
    lastMouseY.current = e.clientY;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full" 
        role="img"
        aria-label="Interactive 3D particle globe representing Earth's carbon score and regional renewable energy intensity."
      />
    </div>
  );
}
