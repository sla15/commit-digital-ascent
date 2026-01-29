import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';
import { RotatingTextContainer, RotatingText } from './animate-ui/primitives/texts/rotating';

// Split the phrases into two arrays for the block layout
const WORDS_TOP = ["Digital", "Tech", "Sustainable"];
const WORDS_BOTTOM = ["Future", "Solutions", "Growth"];

export const Hero: React.FC = () => {
  const containerRef = useRef(null);
  
  // Scroll Parallax
  const { scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX - window.innerWidth / 2;
        const y = e.clientY - window.innerHeight / 2;
        mouseX.set(x);
        mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const mouseXSpring = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 40, damping: 30 });

  // Parallax mappings for content
  const yContent = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityContent = useTransform(scrollY, [0, 400], [1, 0]);

  // --- 3D Shape Animations (Scroll + Mouse) ---
  
  // Shape 1 (Cube - Top Left)
  const yShape1 = useTransform(scrollY, [0, 600], [0, -300]);
  const xShape1 = useTransform(mouseXSpring, [-500, 500], [30, -30]); // Move opposite to mouse
  const rotateShape1 = useTransform(scrollY, [0, 600], [12, -90]);
  const opacityShape1 = useTransform(scrollY, [0, 400], [0.15, 0]);

  // Shape 2 (Globe - Top Right)
  const yShape2 = useTransform(scrollY, [0, 600], [0, -400]);
  const xShape2 = useTransform(mouseXSpring, [-500, 500], [-40, 40]); // Move with mouse slightly
  const rotateShape2 = useTransform(scrollY, [0, 600], [0, 180]);
  const opacityShape2 = useTransform(scrollY, [0, 400], [0.1, 0]);

  // Shape 3 (Pyramid - Bottom Left)
  const yShape3 = useTransform(scrollY, [0, 600], [0, 200]);
  const xShape3 = useTransform(mouseXSpring, [-500, 500], [20, -20]);
  const rotateShape3 = useTransform(scrollY, [0, 600], [-10, -120]);
  const opacityShape3 = useTransform(scrollY, [0, 300], [0.1, 0]);

  // Shape 4 (Torus/Donut - Bottom Right)
  const yShape4 = useTransform(scrollY, [0, 600], [0, -150]);
  const xShape4 = useTransform(mouseXSpring, [-500, 500], [-50, 50]);
  const rotateShape4 = useTransform(scrollY, [0, 600], [45, 225]);
  const opacityShape4 = useTransform(scrollY, [0, 400], [0.08, 0]);

  // Shape 5 (Icosahedron/Hex - Middle Left)
  const yShape5 = useTransform(scrollY, [0, 600], [0, -100]);
  const xShape5 = useTransform(mouseXSpring, [-500, 500], [25, -25]);
  const opacityShape5 = useTransform(scrollY, [0, 400], [0.05, 0]);

  // Shape 6 (Helix/Wave - Middle Right - NEW)
  const yShape6 = useTransform(scrollY, [0, 600], [0, -250]);
  const xShape6 = useTransform(mouseXSpring, [-500, 500], [-35, 35]);
  const rotateShape6 = useTransform(scrollY, [0, 600], [0, 45]);
  const opacityShape6 = useTransform(scrollY, [0, 400], [0.06, 0]);

  // Shape 7 (Capsule/Cylinder - Top Center - NEW)
  const yShape7 = useTransform(scrollY, [0, 600], [0, -350]);
  const xShape7 = useTransform(mouseXSpring, [-500, 500], [15, -15]);
  const rotateShape7 = useTransform(scrollY, [0, 600], [30, -60]);
  const opacityShape7 = useTransform(scrollY, [0, 400], [0.07, 0]);

  // Background Parallax
  const bgX = useTransform(mouseXSpring, [-500, 500], [10, -10]);
  const bgY = useTransform(mouseYSpring, [-500, 500], [10, -10]);

  return (
    <div ref={containerRef} className="relative min-h-[110vh] flex items-center pt-32 pb-24 overflow-hidden bg-brand-950 perspective-[2000px]">
      
      {/* Dynamic Background Layer with Parallax */}
      <motion.div 
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-brand-950 to-brand-950 opacity-100"></div>
        
        {/* --- 3D Geometric Shapes Layer --- */}
        
        {/* Shape 1: Wireframe Cube (Floating Top Left) */}
        <motion.div 
            style={{ y: yShape1, x: xShape1, rotate: rotateShape1, opacity: opacityShape1 }}
            className="absolute top-[10%] left-[2%] md:left-[10%] w-48 h-48 md:w-64 md:h-64 text-brand-300 pointer-events-none z-10"
        >
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
                <path d="M100 20L180 60V140L100 180L20 140V60L100 20Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M100 20V100M180 60L100 100M20 60L100 100M100 100V180" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M100 50L150 75V125L100 150L50 125V75L100 50Z" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5"/>
            </svg>
        </motion.div>

        {/* Shape 2: Geodesic Sphere / Network (Floating Top Right) */}
        <motion.div 
            style={{ y: yShape2, x: xShape2, rotate: rotateShape2, opacity: opacityShape2 }}
            className="absolute top-[5%] right-[5%] w-56 h-56 md:w-80 md:h-80 text-brand-500 pointer-events-none z-10"
        >
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5"/>
                <ellipse cx="100" cy="100" rx="90" ry="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                <ellipse cx="100" cy="100" rx="90" ry="30" transform="rotate(60 100 100)" stroke="currentColor" strokeWidth="0.5" />
                <ellipse cx="100" cy="100" rx="90" ry="30" transform="rotate(120 100 100)" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="10" fill="currentColor" opacity="0.2" />
            </svg>
        </motion.div>

        {/* Shape 3: Tetrahedron / Pyramid (Floating Bottom Left) */}
        <motion.div 
            style={{ y: yShape3, x: xShape3, rotate: rotateShape3, opacity: opacityShape3 }}
            className="absolute bottom-[10%] left-[5%] w-32 h-32 md:w-48 md:h-48 text-white pointer-events-none z-10"
        >
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                 <path d="M100 20L180 160H20L100 20Z" stroke="currentColor" strokeWidth="0.8" />
                 <path d="M100 20L100 160" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4"/>
                 <path d="M100 160L160 120" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
                 <path d="M100 160L40 120" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
            </svg>
        </motion.div>

        {/* Shape 4: Torus / Rings (Floating Bottom Right) */}
        <motion.div 
            style={{ y: yShape4, x: xShape4, rotate: rotateShape4, opacity: opacityShape4 }}
            className="absolute bottom-[20%] right-[10%] w-40 h-40 md:w-60 md:h-60 text-brand-200 pointer-events-none z-10"
        >
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                 {/* Multiple rotating ellipses to form a wireframe torus */}
                 <ellipse cx="100" cy="100" rx="80" ry="20" stroke="currentColor" strokeWidth="0.5" />
                 <ellipse cx="100" cy="100" rx="80" ry="20" transform="rotate(45 100 100)" stroke="currentColor" strokeWidth="0.5" />
                 <ellipse cx="100" cy="100" rx="80" ry="20" transform="rotate(90 100 100)" stroke="currentColor" strokeWidth="0.5" />
                 <ellipse cx="100" cy="100" rx="80" ry="20" transform="rotate(135 100 100)" stroke="currentColor" strokeWidth="0.5" />
                 <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
            </svg>
        </motion.div>

         {/* Shape 5: Icosahedron / Abstract Structure (Floating Middle Left) */}
         <motion.div 
            style={{ y: yShape5, x: xShape5, rotate: -15, opacity: opacityShape5 }}
            className="absolute top-[40%] left-[15%] w-24 h-24 md:w-32 md:h-32 text-brand-600 pointer-events-none z-10"
        >
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                 <path d="M100 20 L170 60 L170 140 L100 180 L30 140 L30 60 Z" stroke="currentColor" strokeWidth="1" />
                 <path d="M100 100 L100 20 M100 100 L170 60 M100 100 L170 140 M100 100 L100 180 M100 100 L30 140 M100 100 L30 60" stroke="currentColor" strokeWidth="0.5" />
            </svg>
        </motion.div>

        {/* Shape 6: Helix / DNA (Floating Middle Right - NEW) */}
        <motion.div 
            style={{ y: yShape6, x: xShape6, rotate: rotateShape6, opacity: opacityShape6 }}
            className="absolute top-[60%] right-[20%] w-32 h-64 md:w-40 md:h-80 text-brand-400 pointer-events-none z-10"
        >
            <svg viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                 <path d="M30 10 Q 70 35, 30 60 T 30 110 T 30 160" stroke="currentColor" strokeWidth="1" />
                 <path d="M70 10 Q 30 35, 70 60 T 70 110 T 70 160" stroke="currentColor" strokeWidth="1" />
                 <line x1="30" y1="35" x2="70" y2="35" stroke="currentColor" strokeWidth="0.5" />
                 <line x1="30" y1="85" x2="70" y2="85" stroke="currentColor" strokeWidth="0.5" />
                 <line x1="30" y1="135" x2="70" y2="135" stroke="currentColor" strokeWidth="0.5" />
            </svg>
        </motion.div>

        {/* Shape 7: Wireframe Capsule (Floating Top Center - NEW) */}
        <motion.div 
            style={{ y: yShape7, x: xShape7, rotate: rotateShape7, opacity: opacityShape7 }}
            className="absolute top-[20%] left-[45%] w-24 h-48 md:w-32 md:h-64 text-slate-400 pointer-events-none z-10"
        >
            <svg viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                 <ellipse cx="50" cy="30" rx="40" ry="15" stroke="currentColor" strokeWidth="1" />
                 <ellipse cx="50" cy="170" rx="40" ry="15" stroke="currentColor" strokeWidth="1" />
                 <line x1="10" y1="30" x2="10" y2="170" stroke="currentColor" strokeWidth="1" />
                 <line x1="90" y1="30" x2="90" y2="170" stroke="currentColor" strokeWidth="1" />
                 <ellipse cx="50" cy="100" rx="40" ry="15" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
            </svg>
        </motion.div>


        {/* SVG 1: Fiber Optic Curves */}
        <div className="absolute inset-0 w-full h-full opacity-30">
            <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="fiber-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
                        <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.path 
                    d="M-100 600 C 400 800, 600 200, 1540 500"
                    fill="none"
                    stroke="url(#fiber-gradient)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 3, ease: "easeOut" }}
                />
                <motion.path 
                    d="M-100 650 C 400 850, 700 250, 1540 550"
                    fill="none"
                    stroke="url(#fiber-gradient)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 3.5, delay: 0.5, ease: "easeOut" }}
                />
            </svg>
        </div>

        {/* SVG 2: Tech Schematic */}
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[80%] opacity-[0.07] text-brand-300">
             <svg viewBox="0 0 800 800" fill="none" className="w-full h-full rotate-12">
                <pattern id="tech-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <rect width="1" height="1" fill="currentColor" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#tech-grid)" opacity="0.5"/>
                <path d="M400 0 V 400 H 800" stroke="currentColor" strokeWidth="2" />
                <path d="M600 0 V 200 H 800" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" />
             </svg>
        </div>

        {/* Drifting Blobs */}
        <motion.div 
            animate={{
                x: [0, 50, -30, 0],
                y: [0, -50, 30, 0],
                scale: [1, 1.1, 0.95, 1],
                opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-brand-900/30 rounded-full blur-[100px] mix-blend-screen"
        ></motion.div>
        
        <motion.div 
            animate={{
                x: [0, -40, 30, 0],
                y: [0, 60, -20, 0],
                scale: [1, 1.2, 0.9, 1],
                opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[120px] mix-blend-overlay"
        ></motion.div>

        {/* Noise & Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="relative z-20 max-w-[90rem] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-40 items-center">
        
        {/* Left Column: Text Content */}
        <motion.div style={{ y: yContent, opacity: opacityContent }} className="flex flex-col items-start text-left w-full">
             
             <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-900/50 border border-brand-500/30 backdrop-blur-md mb-8"
              >
                 <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></div>
                 <span className="text-xs font-bold text-brand-200 tracking-widest uppercase">CommIT Enterprise</span>
              </motion.div>

              <div className="relative mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight leading-[1.05]"
                >
                  Building the <br />
                  <div className="flex flex-col items-start mt-2 gap-0">
                    {/* First Line of Rotating Text */}
                    <span className="text-brand-400 leading-[0.95] block h-[1.1em] overflow-visible">
                        <RotatingTextContainer
                            text={WORDS_TOP}
                            y="130%" // Increased clearance
                            duration={4000}
                            delay={0}
                            mainClassName="min-w-[300px]"
                            className="text-brand-400"
                            stiffness={120}
                            damping={25}
                        >
                            <RotatingText />
                        </RotatingTextContainer>
                    </span>
                    
                    {/* Second Line of Rotating Text */}
                    <span className="text-brand-400 leading-[0.95] block h-[1.1em] overflow-visible">
                        <RotatingTextContainer
                            text={WORDS_BOTTOM}
                            y="130%" // Increased clearance
                            duration={4000}
                            delay={200} 
                            mainClassName="min-w-[300px]"
                            className="text-brand-400"
                            stiffness={120}
                            damping={25}
                        >
                            <RotatingText />
                        </RotatingTextContainer>
                    </span>
                  </div>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-xl border-l-2 border-brand-500 pl-6"
              >
                CommIT Enterprise bridges technology and development with world-class infrastructure, procurement, and advisory services.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
              >
                <Link to="/contact">
                    <Button 
                        variant="secondary"
                        className="w-full sm:w-auto border-0 px-8 py-4 rounded-2xl font-extrabold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all text-lg transform hover:-translate-y-1"
                    >
                        Start Your Project
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </Link>
                <Link to="/services">
                    <Button variant="outline" className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 px-8 py-4 rounded-2xl text-lg font-semibold">
                        Explore Services
                    </Button>
                </Link>
              </motion.div>
        </motion.div>

        {/* Right Column: Visual Composition */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative h-[600px] lg:h-[800px] w-full flex items-center justify-center lg:justify-end lg:translate-x-48 xl:translate-x-60"
        >
             <div className="relative w-full max-w-lg lg:max-w-none h-full perspective-[1000px]">
                
                {/* Main Image Frame - Wrapper for Static Rotation */}
                <div 
                  className="absolute inset-0 rounded-[3rem] shadow-2xl bg-slate-900/50"
                  style={{ transform: "rotateY(-5deg) rotateX(2deg)" }}
                >
                    {/* Inner Motion Div for Floating Animation */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="w-full h-full rounded-[3rem] overflow-hidden border border-white/10"
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                            alt="Enterprise Infrastructure"
                            className="w-full h-full object-cover opacity-70 mix-blend-overlay hover:scale-105 transition-transform duration-[2s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent opacity-60"></div>
                    </motion.div>
                </div>
                
                {/* Floating Card 1: Speed */}
                <motion.div
                    animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-16 -right-4 md:-right-8 lg:-right-12 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-xl w-48 z-10"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-500 rounded-lg text-white shadow-lg shadow-brand-500/30"><Zap size={20} /></div>
                        <div>
                            <p className="text-[10px] text-brand-100 uppercase tracking-wider font-bold">Speed</p>
                            <p className="font-bold text-white text-sm">Fiber Optic</p>
                        </div>
                    </div>
                </motion.div>

                {/* Floating Card 2: Security */}
                <motion.div
                    animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute bottom-16 -left-4 md:-left-8 lg:-left-12 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-xl w-56 z-10"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-500 rounded-lg text-white shadow-lg shadow-green-500/30"><ShieldCheck size={20} /></div>
                        <div>
                            <p className="text-[10px] text-green-100 uppercase tracking-wider font-bold">Security</p>
                            <p className="font-bold text-white text-sm">Enterprise Grade</p>
                        </div>
                    </div>
                     <div className="flex gap-1.5 mt-2 opacity-80">
                       <div className="h-1 flex-1 bg-green-400 rounded-full"></div>
                       <div className="h-1 flex-1 bg-green-400 rounded-full"></div>
                       <div className="h-1 flex-1 bg-green-400/30 rounded-full"></div>
                   </div>
                </motion.div>

             </div>
        </motion.div>
      </div>
    </div>
  );
};