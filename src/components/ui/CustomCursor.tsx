'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('a, button, [data-cursor], input, select');
      if (interactiveEl) {
        setIsPointer(true);
        const customText = interactiveEl.getAttribute('data-cursor');
        setCursorText(customText || '');
      } else {
        setIsPointer(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Outer Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center border border-[#A9472A]/70 bg-[#A9472A]/10 backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - (isPointer ? 36 : 18),
          y: mousePosition.y - (isPointer ? 36 : 18),
          width: isPointer ? 72 : 36,
          height: isPointer ? 72 : 36,
          scale: isPointer ? 1.15 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 280,
          mass: 0.5,
        }}
      >
        {cursorText && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFF8EE] bg-[#A9472A] px-2 py-0.5 rounded-full font-bold shadow-xs">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#E8A33A]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isPointer ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 450,
          mass: 0.1,
        }}
      />
    </div>
  );
}
