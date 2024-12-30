'use client'
import { useEffect, useState, useRef, useCallback } from 'react';

interface MatrixSymbol {
  x: number;
  y: number;
  value: string;
  speed: number;
  opacity: number;
  fontSize: number;
}

const MATRIX_CHARACTERS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

export function BackgroundElements() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const symbolsRef = useRef<MatrixSymbol[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const { clientWidth, clientHeight } = canvasRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
        canvasRef.current.width = clientWidth;
        canvasRef.current.height = clientHeight;
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const symbolCount = Math.floor(dimensions.width / 45);
    symbolsRef.current = Array(symbolCount).fill(null).map(() => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      value: MATRIX_CHARACTERS[Math.floor(Math.random() * MATRIX_CHARACTERS.length)],
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.2,
      fontSize: Math.random() * 6 + 12
    }));
  }, [dimensions]);

  const animate = useCallback(() => {
    if (!canvasRef.current || symbolsRef.current.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = document.documentElement.classList.contains('dark');
    
    // Clear canvas with different backgrounds for dark/light mode
    ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    symbolsRef.current = symbolsRef.current.map(symbol => {
      const newY = symbol.y + symbol.speed;
      const resetY = newY > dimensions.height ? -20 : newY;

      const newValue = Math.random() < 0.02 
        ? MATRIX_CHARACTERS[Math.floor(Math.random() * MATRIX_CHARACTERS.length)]
        : symbol.value;

      if (isDark) {
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(0, 255, 170, 0.5)';
        ctx.fillStyle = `rgba(0, 255, 170, ${symbol.opacity})`;
      } else {
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(0, 0, 128, 0.5)';
        ctx.fillStyle = `rgba(0, 0, 128, ${symbol.opacity})`;
      }

      ctx.font = `${symbol.fontSize}px "Fira Code", monospace`;
      ctx.fillText(symbol.value, symbol.x, symbol.y);
      
      ctx.shadowBlur = 0;

      return {
        ...symbol,
        y: resetY,
        value: newValue
      };
    });

    requestAnimationFrame(animate);
  }, [dimensions]);

  useEffect(() => {
    let animationFrameId: number;
    if (dimensions.width > 0 && dimensions.height > 0) {
      animationFrameId = requestAnimationFrame(animate);
    }
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [animate, dimensions]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-white dark:bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}