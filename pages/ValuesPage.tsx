import React from 'react';
import { Section } from '../components/ui/Section';
import { VALUES, COMPANY_INFO } from '../constants';
import { motion } from 'framer-motion';

export const ValuesPage: React.FC = () => {
  return (
    <div className="pt-20">
      <Section bg="light">
        <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-slate-900 mb-6">
                Our Values & Culture
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
                At CommIT Enterprise, we believe that technology is only as good as the people and principles behind it.
            </p>
        </div>
      </Section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
            <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">A Commitment to Excellence</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                    {COMPANY_INFO.overview}
                </p>
                <p className="text-slate-600 leading-relaxed">
                    Our team is composed of industry experts who share a common vision: to be the most trusted ICT partner in the region. We don't just deliver projects; we build lasting legacies.
                </p>
            </div>
            <div className="bg-brand-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                    <p className="text-brand-100 text-lg leading-relaxed italic">
                        "{COMPANY_INFO.vision}"
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-700/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((value, index) => (
                <motion.div
                    key={value.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-8 rounded-2xl border border-slate-100 shadow-card hover:shadow-lg transition-all"
                >
                    <div className="h-1 w-12 bg-brand-500 rounded-full mb-6"></div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h4>
                    <p className="text-slate-600 leading-relaxed">
                        {value.description} We ensure this value is embedded in every contract, meeting, and deliverable we produce.
                    </p>
                </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
};