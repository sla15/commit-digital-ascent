import React, { useState } from 'react';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { CONTACT_INFO } from '../constants';
import { Mail, Phone, MapPin, MessageSquare, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getEntranceOffset } from '../utils/animationHelpers';
import { useSiteContent } from '../hooks/useSiteContent';

export const ContactPage: React.FC = () => {
  const { content } = useSiteContent('contact');
  const info = content.info || {};
  const email = info.email || CONTACT_INFO.email;
  const phone = info.phone || CONTACT_INFO.phone;
  const address = info.address || CONTACT_INFO.address;

  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('https://msowbpgiogzxyedaqicf.supabase.co/functions/v1/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
    setSubmitting(false);
  };

  const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="pt-20">
      <section className="relative bg-brand-950 py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.span initial={{ opacity: 0, y: getEntranceOffset(60, 10) }} animate={{ opacity: 1, y: 0 }} className="text-brand-300 font-semibold tracking-wider uppercase text-sm mb-4 block">Get in Touch</motion.span>
          <motion.h1 initial={{ opacity: 0, y: getEntranceOffset(80, 20) }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Let's Discuss Your Project</motion.h1>
          <motion.p initial={{ opacity: 0, y: getEntranceOffset(80, 20) }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether you need strategic advisory, infrastructure procurement, or a partnership framework, our team is ready to assist.
          </motion.p>
        </div>
      </section>

      <Section className="min-h-screen -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <motion.div initial={{ opacity: 0, x: -20, y: getEntranceOffset(80, 0) }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 h-fit">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 font-display">Contact Information</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300"><MapPin size={24} /></div>
                <div><h4 className="font-bold text-slate-900 mb-1">Our Office</h4><p className="text-slate-600 leading-relaxed">{address}</p></div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300"><Phone size={24} /></div>
                <div><h4 className="font-bold text-slate-900 mb-1">Phone</h4><p className="text-slate-600">{phone}</p><p className="text-sm text-slate-400 mt-1">Available Mon-Fri, 9am-5pm</p></div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300"><Mail size={24} /></div>
                <div><h4 className="font-bold text-slate-900 mb-1">Email</h4><a href={`mailto:${email}`} className="text-slate-600 hover:text-brand-600 transition-colors">{email}</a></div>
              </div>
            </div>

            <div className="mt-12 rounded-2xl overflow-hidden h-64 shadow-inner border border-slate-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3881.238293236072!2d-16.717278888921857!3d13.397566205341013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec29935733710e3%3A0xb60468aaf09169ae!2sCommIT!5e0!3m2!1sen!2sgm!4v1769715366131!5m2!1sen!2sgm"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="CommIT Enterprise Location"
              ></iframe>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: getEntranceOffset(80, 20) }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-brand-50 rounded-full text-brand-600"><MessageSquare size={24} /></div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">Send us a Message</h3>
                <p className="text-slate-500">We usually respond within 24 hours.</p>
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-green-500" /></div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Message Sent!</h3>
                <p className="text-slate-600">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">First Name</label>
                    <input type="text" required value={form.first_name} onChange={e => updateField('first_name', e.target.value)} className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all duration-300" placeholder="Jane" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Last Name</label>
                    <input type="text" required value={form.last_name} onChange={e => updateField('last_name', e.target.value)} className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all duration-300" placeholder="Cooper" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                    <input type="email" required value={form.email} onChange={e => updateField('email', e.target.value)} className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all duration-300" placeholder="jane@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Phone Number (Optional)</label>
                    <input type="tel" value={form.phone} onChange={e => updateField('phone', e.target.value)} className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all duration-300" placeholder="+220 ..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Subject</label>
                  <select value={form.subject} onChange={e => updateField('subject', e.target.value)} className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all duration-300 text-slate-600">
                    <option>General Inquiry</option>
                    <option>ICT Supply & Infrastructure</option>
                    <option>Project Consulting</option>
                    <option>Public-Private Partnership</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Message</label>
                  <textarea rows={6} required value={form.message} onChange={e => updateField('message', e.target.value)} className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all duration-300 resize-none" placeholder="Tell us about your project requirements..."></textarea>
                </div>
                <div className="pt-4">
                  <Button className="w-full md:w-auto px-10" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </Section>
    </div>
  );
};
