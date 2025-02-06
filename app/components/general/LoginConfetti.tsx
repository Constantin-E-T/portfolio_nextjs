"use client";

import { useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import ReactCanvasConfetti from 'react-canvas-confetti';

interface ConfettiOptions {
  spread?: number;
  startVelocity?: number;
  decay?: number;
  scalar?: number;
  origin?: {
    x?: number;
    y?: number;
  };
  particleCount?: number;
}

interface ConfettiFunction {
  confetti: (options: ConfettiOptions) => void;
}

export function LoginConfetti() {
  const refAnimationInstance = useRef<ConfettiFunction | null>(null);
  const searchParams = useSearchParams();

  const getInstance = useCallback((confettiInstance: { confetti: (options: ConfettiOptions) => void }) => {
    refAnimationInstance.current = confettiInstance;
  }, []);

  const makeShot = useCallback((particleRatio: number, opts: ConfettiOptions) => {
    refAnimationInstance.current?.confetti({
      ...opts,
      origin: { y: 0.7 },
      particleCount: Math.floor(200 * particleRatio),
    });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  useEffect(() => {
    const justLoggedIn = searchParams.get('login') === 'success';
    
    if (justLoggedIn && refAnimationInstance.current) {
      fire();
    }
  }, [searchParams, fire]);

  return (
    <ReactCanvasConfetti
      onInit={getInstance}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 50,
      }}
    />
  );
}