import React, { useState } from 'react';
import { Section } from './ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "CommIT Enterprise transformed our IT infrastructure. Their professionalism and attention to detail are unmatched in the region. We saw immediate improvements in our network stability.",
    author: "Modou Cham",
    role: "Technical Director, Gamtel",
    rating: 5
  },
  {
    id: 2,
    quote: "The most professional ICT procurement service we have experienced in Banjul. They delivered high-end hardware ahead of schedule and under budget.",
    author: "Aisatou Bojang",
    role: "CEO, Bojang Group",
    rating: 5
  },
  {
    id: 3,
    quote: "Their strategic advisory helped us navigate complex PPP regulations seamlessly. A partner that truly understands the Gambian landscape.",
    author: "David Smith",
    role: "Regional Manager, NGO Connect",
    rating: 5
  },
  {
    id: 4,
    quote: "Exceptional service from start to finish. The fiber optic installation was executed with precision and world-class standards.",
    author: "Lamin Drammeh",
    role: "IT Head, Zenith Bank Gambia",
    rating: 5
  }
];

export const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <Section id="testimonials" bg="white" className="relative">
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 w-96 h-96 bg-brand-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
       <div className="absolute bottom-0 left-0 w-72 h-72 bg-slate-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50"></div>

       <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <h2 className="text-brand-600 font-semibold uppercase tracking-wider mb-3">Testimonials</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
              Trusted by Industry Leaders
          </h3>
       </div>

       <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-16 relative overflow-hidden min-h-[400px] flex flex-col justify-center">
             <div className="absolute top-8 left-8 text-brand-100">
                <Quote size={80} fill="currentColor" />
             </div>
             
             <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                     <div className="flex justify-center gap-1 mb-8">
                        {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                           <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                        ))}
                     </div>
                     <p className="text-2xl md:text-3xl font-display font-medium text-slate-800 leading-relaxed mb-10">
                        "{TESTIMONIALS[currentIndex].quote}"
                     </p>
                     <div>
                        <h4 className="text-xl font-bold text-slate-900">{TESTIMONIALS[currentIndex].author}</h4>
                        <p className="text-brand-600 font-medium">{TESTIMONIALS[currentIndex].role}</p>
                     </div>
                  </motion.div>
                </AnimatePresence>
             </div>

             {/* Navigation Buttons */}
             <div className="flex justify-between items-center absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 md:px-8 pointer-events-none">
                <button 
                  onClick={prev}
                  className="w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-brand-600 hover:scale-110 transition-all pointer-events-auto"
                >
                   <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={next}
                  className="w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-brand-600 hover:scale-110 transition-all pointer-events-auto"
                >
                   <ChevronRight size={24} />
                </button>
             </div>

             {/* Dots */}
             <div className="flex justify-center gap-2 absolute bottom-8 left-0 right-0">
                {TESTIMONIALS.map((_, idx) => (
                   <button
                     key={idx}
                     onClick={() => setCurrentIndex(idx)}
                     className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-brand-600 w-8' : 'bg-slate-300 hover:bg-brand-400'}`}
                   />
                ))}
             </div>
          </div>
       </div>
    </Section>
  );
};