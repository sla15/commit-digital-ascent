import React from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { motion, Variants } from 'framer-motion';
import { Search, PenTool, Rocket, ShieldCheck, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    id: 1,
    icon: Search,
    title: "Consultation",
    description: "In-depth analysis of technical requirements and sustainable feasibility for every institutional project."
  },
  {
    id: 2,
    icon: PenTool,
    title: "Design",
    description: "Strategic structuring of project frameworks, from PPP models to advanced networking architectures."
  },
  {
    id: 3,
    icon: Rocket,
    title: "Deployment",
    description: "Precision installation of fiber optics and systems using premium grade procurement sourcing."
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "Governance",
    description: "Ongoing advisory support to ensure compliance, transparency, and value-for-money at every stage."
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

export const ApproachSection: React.FC = () => {
  return (
    <Section id="approach" bg="white" className="overflow-visible pb-32">
      <div className="text-center max-w-3xl mx-auto mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-brand-600 font-bold uppercase tracking-[0.2em] text-sm mb-4"
        >
          Our Methodology
        </motion.h2>
        <h3 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-8 leading-tight">
          A Structured Path to <br/> Digital Excellence
        </h3>
        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
          Our approach combines global technical standards with deep local expertise for unmatched reliability.
        </p>
      </div>

      <div className="relative">
        {/* Desktop Connecting Line */}
        <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 z-0 origin-left"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-100 via-brand-400 to-brand-100 opacity-40"></div>
        </motion.div>

        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="group"
            >
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-8 relative">
                    <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-28 h-28 bg-white rounded-full border-4 border-slate-50 shadow-2xl flex items-center justify-center relative z-10 group-hover:border-brand-100 transition-colors duration-500"
                    >
                        <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 group-hover:bg-brand-900 group-hover:text-white transition-all duration-700">
                            <step.icon size={36} />
                        </div>
                    </motion.div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-brand-900 rounded-full flex items-center justify-center text-white text-lg font-bold border-4 border-white shadow-xl">
                        {step.id}
                    </div>
                </div>

                <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-700 transition-colors font-display tracking-tight">
                    {step.title}
                </h4>
                <p className="text-slate-600 text-lg leading-relaxed px-4 opacity-80">
                    {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-24 flex justify-center"
      >
        <Link to="/contact">
            <Button variant="primary" className="px-12 py-5 rounded-3xl shadow-glow">
                Start Your Consultation <ChevronRight className="ml-2 w-6 h-6" />
            </Button>
        </Link>
      </motion.div>
    </Section>
  );
};