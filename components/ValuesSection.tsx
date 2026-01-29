import React from 'react';
import { Section } from './ui/Section';
import { VALUES } from '../constants';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ValuesSection: React.FC = () => {
  return (
    <Section id="values" bg="dark" className="bg-brand-950 text-white relative overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              className="text-brand-400 font-bold uppercase tracking-[0.2em] text-sm mb-4"
            >
              Our Foundation
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight"
            >
              Built on Professional <br/> Integrity
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              className="text-brand-100 text-xl leading-relaxed"
            >
              Our values drive every solution we build and every partnership we cultivate.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
            <Link to="/about" className="group inline-flex items-center gap-4 px-10 py-5 bg-brand-600 hover:bg-brand-500 rounded-3xl transition-all text-white font-bold shadow-2xl shadow-brand-600/30">
              Meet Our Team <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {VALUES.map((value, index) => (
            <motion.div 
              key={value.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ y: -10, backgroundColor: 'rgba(12, 74, 110, 0.7)' }}
              className="bg-brand-900/40 backdrop-blur-md border border-brand-800 p-10 rounded-[2rem] transition-all duration-500 group"
            >
              <div className="h-1.5 w-14 bg-brand-400 rounded-full mb-8 group-hover:w-20 transition-all duration-500"></div>
              <h4 className="text-2xl font-bold mb-5 font-display tracking-tight">{value.title}</h4>
              <p className="text-brand-200 text-lg leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};