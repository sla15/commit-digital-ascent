import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';

const RotatingTextContext = createContext<{
  currentText: string;
  transition?: Transition;
  initial?: any;
  animate?: any;
  exit?: any;
  className?: string;
} | null>(null);

interface RotatingTextContainerProps {
  text: string[];
  children: React.ReactNode;
  duration?: number;
  delay?: number; // Delay in milliseconds before rotation starts
  y?: number | string; // y offset for animation, support % for responsive height
  className?: string;
  mainClassName?: string;
  stiffness?: number;
  damping?: number;
}

export const RotatingTextContainer = ({
  text,
  children,
  duration = 4000,
  delay = 0,
  y = "120%", // Increased default clearance to prevent overlap
  className = "",
  mainClassName = "",
  stiffness = 200,
  damping = 20,
}: RotatingTextContainerProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setIndex((prev) => (prev + 1) % text.length);
      }, duration);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, duration, delay]);

  const transition: Transition = { type: 'spring', damping, stiffness, mass: 0.8 };
  
  // Use simple variants that work with both numbers and strings
  const initial = { y: y, opacity: 0, filter: "blur(8px)" };
  const animate = { y: 0, opacity: 1, filter: "blur(0px)" };
  // Faster exit transition for opacity to clean up overlap quickly
  const exit = { 
    y: typeof y === 'string' && y.includes('%') ? `-${y}` : (typeof y === 'number' ? -y : -100), 
    opacity: 0, 
    filter: "blur(8px)",
    transition: { duration: 0.2 } 
  };

  const value = useMemo(() => ({
      currentText: text[index],
      transition,
      initial,
      animate,
      exit,
      className
  }), [text, index, transition, initial, animate, exit, className]);

  // Find the longest text to reserve width in the layout
  const longestText = text.reduce((a, b) => (a.length > b.length ? a : b), "");

  return (
    <RotatingTextContext.Provider value={value}>
       <div className={`relative inline-flex items-center justify-start overflow-hidden align-top ${mainClassName}`}>
          {/* Invisible spacer to maintain width/height */}
          <span className={`invisible opacity-0 ${className} whitespace-nowrap`}>{longestText}</span>
          {children}
       </div>
    </RotatingTextContext.Provider>
  );
};

export const RotatingText = () => {
    const context = useContext(RotatingTextContext);
    if (!context) throw new Error("RotatingText must be used within RotatingTextContainer");

    const { currentText, initial, animate, exit, transition, className } = context;

    return (
        <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
                key={currentText}
                className={`absolute left-0 top-0 whitespace-nowrap ${className}`}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={transition}
            >
                {currentText}
            </motion.span>
        </AnimatePresence>
    );
};