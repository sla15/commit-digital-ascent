import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { getEntranceOffset } from '../utils/animationHelpers';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { useSiteContent } from '../hooks/useSiteContent';

export const ServicesPage: React.FC = () => {
  const { content } = useSiteContent('services');
  const dynamicServices = content.list as Array<{ id: string; title: string; description: string }> | undefined;

  const displayServices = SERVICES.map(s => {
    const dyn = dynamicServices?.find(d => d.id === s.id);
    return {
      ...s,
      title: dyn?.title || s.title,
      description: dyn?.description || s.description,
    };
  });

  return (
    <div className="pt-20">
      <Section bg="light" className="min-h-[50vh] flex items-center">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-slate-900 mb-6">Our Services</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            CommIT Enterprise delivers end-to-end technology solutions. From infrastructure to advisory, we bridge the gap between complex requirements and sustainable implementation.
          </p>
        </div>
      </Section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 space-y-32">
        {displayServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: getEntranceOffset(100, 50) }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col md:flex-row gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="flex-1">
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-700 mb-6">
                <service.icon size={32} />
              </div>
              <h2 className="text-3xl font-bold font-display text-slate-900 mb-6">{service.title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {service.description} We specialize in providing comprehensive support for this sector, ensuring compliance with international standards and local regulations.
              </p>
              <ul className="space-y-4 mb-8">
                {['Strategic Planning', 'Implementation', 'Maintenance & Support'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="gap-2">
                Request Consultation <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-[4/3] rounded-3xl bg-slate-100 border border-slate-200 shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-900/10 to-brand-500/10 opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <service.icon size={120} className="text-slate-200/50" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Section bg="dark" className="text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Infrastructure?</h2>
        <p className="text-brand-100 mb-8 max-w-2xl mx-auto">
          Contact our team today to discuss how our services can align with your organizational goals.
        </p>
        <Button variant="primary" onClick={() => window.location.href = '/#contact'}>Get in Touch</Button>
      </Section>
    </div>
  );
};
