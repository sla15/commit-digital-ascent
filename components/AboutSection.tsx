import React from 'react';
import { Section } from './ui/Section';
import { COMPANY_INFO } from '../constants';
import { Target, Eye, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { getEntranceOffset } from '../utils/animationHelpers';
import { useSiteContent } from '../hooks/useSiteContent';

export const AboutSection: React.FC = () => {
  const { content } = useSiteContent('about');
  const info = content.company_info || {};
  const overview = info.overview || COMPANY_INFO.overview;
  const mission = info.mission || COMPANY_INFO.mission;
  const vision = info.vision || COMPANY_INFO.vision;

  return (
    <Section id="overview" className="relative overflow-visible pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50, y: getEntranceOffset(80, 0) }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col gap-10"
        >
          <div>
            <h2 className="text-brand-600 font-bold uppercase tracking-[0.2em] text-sm mb-4">The CommIT Legacy</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-8 leading-[1.1]">
              Bridging Tech & <br/><span className="text-brand-600">Development</span> for <br/>The Gambia
            </h3>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 border-l-4 border-brand-500 pl-8 font-medium">
              {overview}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {["15+ Years Experience", "Public Sector Trusted", "Sustainable Focus", "Professional Advisory"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-slate-800 font-bold text-lg">
                  <div className="bg-brand-50 p-2 rounded-full shadow-sm"><CheckCircle2 className="w-5 h-5 text-brand-600" /></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Link to="/about">
              <Button variant="primary" className="px-12 py-5 text-lg rounded-2xl shadow-2xl shadow-brand-900/30 group">
                Learn More About Us <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 relative">
          <div className="absolute -z-10 -right-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-brand-50 rounded-full blur-[100px] opacity-60"></div>
          {[
            { icon: Target, title: "Our Mission", text: mission, color: "bg-blue-50 text-brand-600 shadow-blue-100" },
            { icon: Eye, title: "Our Vision", text: vision, color: "bg-indigo-50 text-indigo-600 shadow-indigo-100" }
          ].map((box, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: getEntranceOffset(80, 40) }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.3 }}
              className="bg-white p-12 rounded-squircle shadow-premium border border-slate-100 flex flex-col md:flex-row gap-8 group hover:-translate-y-3 transition-all duration-700"
            >
              <div className={`flex-shrink-0 w-20 h-20 rounded-3xl flex items-center justify-center ${box.color} shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                <box.icon size={40} />
              </div>
              <div>
                <h4 className="text-3xl font-bold text-slate-900 mb-4 font-display tracking-tight">{box.title}</h4>
                <p className="text-slate-600 text-lg leading-relaxed font-medium opacity-80">{box.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
