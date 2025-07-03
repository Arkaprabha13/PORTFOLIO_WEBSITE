import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useCallback } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "framer-motion";

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
  rangeHue?: number;
  noiseSteps?: number;
  enableGlow?: boolean;
  enableInteraction?: boolean;
}

export const Vortex: React.FC<VortexProps> = ({
  children,
  className = "",
  containerClassName = "",
  particleCount = 800,
  rangeY = 120,
  baseHue = 220,
  rangeHue = 120,
  baseSpeed = 0.1,
  rangeSpeed = 2.0,
  baseRadius = 1,
  rangeRadius = 3,
  backgroundColor = "transparent",
  noiseSteps = 4,
  enableGlow = true,
  enableInteraction = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const isHoveredRef = useRef(false);
  
  // Performance optimizations
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const baseTTL = 60;
  const rangeTTL = 180;
  const xOff = 0.0015;
  const yOff = 0.0015;
  const zOff = 0.0008;
  
  let tick = 0;
  const noise3D = createNoise3D();
  let particleProps = new Float32Array(particlePropsLength);
  let center: [number, number] = [0, 0];

  const HALF_PI = 0.5 * Math.PI;
  const TAU = 2 * Math.PI;
  
  // Utility functions
  const rand = (n: number): number => n * Math.random();
  const randRange = (n: number): number => n - rand(2 * n);
  const fadeInOut = (t: number, m: number): number => {
    const hm = 0.5 * m;
    return Math.abs(((t + hm) % m) - hm) / hm;
  };
  const lerp = (n1: number, n2: number, speed: number): number =>
    (1 - speed) * n1 + speed * n2;

  const initParticle = useCallback((i: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const x = rand(canvas.width);
    const y = center[1] + randRange(rangeY);
    const vx = 0;
    const vy = 0;
    const life = 0;
    const ttl = baseTTL + rand(rangeTTL);
    const speed = baseSpeed + rand(rangeSpeed);
    const radius = baseRadius + rand(rangeRadius);
    const hue = baseHue + rand(rangeHue);

    particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
  }, [baseHue, baseRadius, baseSpeed, rangeHue, rangeRadius, rangeSpeed, rangeY]);

  const initParticles = useCallback(() => {
    tick = 0;
    particleProps = new Float32Array(particlePropsLength);
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
  }, [initParticle, particlePropsLength]);

  const drawParticle = (
    x: number,
    y: number,
    x2: number,
    y2: number,
    life: number,
    ttl: number,
    radius: number,
    hue: number,
    ctx: CanvasRenderingContext2D,
  ) => {
    const alpha = fadeInOut(life, ttl);
    const interactionAlpha = isHoveredRef.current ? 0.8 : 0.6;
    
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = radius;
    ctx.strokeStyle = `hsla(${hue}, 85%, 65%, ${alpha * interactionAlpha})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  };

  const updateParticle = (i: number, ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i,
          i6 = 5 + i, i7 = 6 + i, i8 = 7 + i, i9 = 8 + i;

    const x = particleProps[i];
    const y = particleProps[i2];
    
    // Enhanced noise with mouse interaction
    let noiseInput = noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU;
    
    if (enableInteraction && isHoveredRef.current) {
      const dx = mouseRef.current.x - x;
      const dy = mouseRef.current.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - distance / 200);
      noiseInput += influence * 0.5;
    }

    const vx = lerp(particleProps[i3], Math.cos(noiseInput), 0.4);
    const vy = lerp(particleProps[i4], Math.sin(noiseInput), 0.4);
    const life = particleProps[i5];
    const ttl = particleProps[i6];
    const speed = particleProps[i7];
    const x2 = x + vx * speed;
    const y2 = y + vy * speed;
    const radius = particleProps[i8];
    const hue = particleProps[i9];

    drawParticle(x, y, x2, y2, life, ttl, radius, hue, ctx);

    particleProps[i] = x2;
    particleProps[i2] = y2;
    particleProps[i3] = vx;
    particleProps[i4] = vy;
    particleProps[i5] = life + 1;

    if (x2 > canvas.width || x2 < 0 || y2 > canvas.height || y2 < 0 || life > ttl) {
      initParticle(i);
    }
  };

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      updateParticle(i, ctx);
    }
  };

  const renderGlow = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    if (!enableGlow) return;
    
    ctx.save();
    ctx.filter = "blur(12px) brightness(180%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.filter = "blur(6px) brightness(150%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  };

  const renderToScreen = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  };

  const draw = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    tick++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (backgroundColor !== "transparent") {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawParticles(ctx);
    renderGlow(canvas, ctx);
    renderToScreen(canvas, ctx);

    animationFrameId.current = requestAnimationFrame(() => draw(canvas, ctx));
  }, [backgroundColor, enableGlow]);

  const resize = useCallback((canvas: HTMLCanvasElement) => {
    const { innerWidth, innerHeight } = window;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    center[0] = 0.5 * canvas.width;
    center[1] = 0.5 * canvas.height;
  }, []);

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        resize(canvas);
        initParticles();
        draw(canvas, ctx);
      }
    }
  }, [draw, initParticles, resize]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      resize(canvas);
    }
  }, [resize]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!enableInteraction) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }
  }, [enableInteraction]);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
  }, []);

  useEffect(() => {
    setup();
    window.addEventListener("resize", handleResize);
    
    const container = containerRef.current;
    if (container && enableInteraction) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container && enableInteraction) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [setup, handleResize, handleMouseMove, handleMouseEnter, handleMouseLeave, enableInteraction]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", containerClassName)} ref={containerRef}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full"
          style={{ display: "block" }}
        />
      </motion.div>
      <div className={cn("relative z-10", className)}>
        {children}
      </div>
    </div>
  );
};

export default Vortex;
