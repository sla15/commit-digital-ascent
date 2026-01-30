import React from 'react';
import { Section } from '../components/ui/Section';
import { VALUES, COMPANY_INFO } from '../constants';
import { motion, Variants } from 'framer-motion';
import { Linkedin, Twitter, Mail, Facebook } from 'lucide-react';
import { getEntranceOffset } from '../utils/animationHelpers';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    mail?: string;
  };
}

const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Amadou Scattrel",
    role: "Founder & CEO",
    bio: "Amadou drives the strategic vision of CommIT Enterprise. With over 15 years in ICT and project management, he is dedicated to transforming The Gambia's digital landscape through sustainable innovation.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop",
    socials: { linkedin: "#", twitter: "#", facebook: "#", mail: "mailto:amadou@commit.gm" }
  },
  {
    id: 2,
    name: "Fatou Jallow",
    role: "Director of Operations",
    bio: "Fatou ensures our projects run seamlessly. Her background in public administration and logistics makes her a key pillar in our engagement with government sectors.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
    socials: { linkedin: "#", facebook: "#", mail: "mailto:fatou@commit.gm" }
  },
  {
    id: 3,
    name: "Lamin Ceesay",
    role: "Lead Infrastructure Engineer",
    bio: "An expert in fiber optics and network architecture, Lamin leads our technical deployments, ensuring every cable and server meets global standards.",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0f19?q=80&w=1887&auto=format&fit=crop",
    socials: { linkedin: "#", twitter: "#" }
  },
  {
    id: 4,
    name: "Mariama Touray",
    role: "Project Manager",
    bio: "Mariama specializes in PPP and structured partnerships. She bridges the gap between technical requirements and stakeholder expectations.",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1886&auto=format&fit=crop",
    socials: { linkedin: "#", facebook: "#", mail: "mailto:mariama@commit.gm" }
  },
  {
    id: 5,
    name: "Ousman Sowe",
    role: "Senior ICT Consultant",
    bio: "With deep knowledge of software systems and procurement, Ousman advises clients on the best technology stacks for long-term growth.",
    image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=2080&auto=format&fit=crop",
    socials: { linkedin: "#", twitter: "#" }
  }
];

const TIMELINE_EVENTS = [
    { year: "2010", title: "CommIT Enterprise founded in Banjul" },
    { year: "2014", title: "First major government contract secured" },
    { year: "2018", title: "Expanded services to include training programs" },
    { year: "2021", title: "Achieved 50+ successful project deliveries" },
    { year: "2024", title: "Launched digital transformation practice" },
];

const FlipCard = ({ member }: { member: TeamMember }) => {
  return (
    <div className="group h-[450px] w-full [perspective:1000px] cursor-pointer">
      <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full rounded-[2rem] overflow-hidden shadow-2xl [backface-visibility:hidden] border border-white/20 bg-slate-900">
          <img 
            src={member.image} 
            alt={member.name} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/20 to-transparent opacity-90"></div>
          
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <h3 className="text-2xl font-bold text-white font-display mb-1">{member.name}</h3>
            <p className="text-brand-300 font-medium tracking-wide text-sm uppercase mb-4">{member.role}</p>
            
            {/* Front Social Links */}
            <div className="flex gap-3 relative z-20" onClick={(e) => e.stopPropagation()}>
               {member.socials.linkedin && (
                  <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-brand-500 hover:text-white text-white/80 transition-all border border-white/10 hover:border-brand-400">
                      <Linkedin size={16} />
                  </a>
               )}
               {member.socials.twitter && (
                  <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-brand-500 hover:text-white text-white/80 transition-all border border-white/10 hover:border-brand-400">
                      <Twitter size={16} />
                  </a>
               )}
               {member.socials.facebook && (
                  <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-brand-500 hover:text-white text-white/80 transition-all border border-white/10 hover:border-brand-400">
                      <Facebook size={16} />
                  </a>
               )}
                {member.socials.mail && (
                  <a href={member.socials.mail} className="p-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-brand-500 hover:text-white text-white/80 transition-all border border-white/10 hover:border-brand-400">
                      <Mail size={16} />
                  </a>
               )}
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full rounded-[2rem] bg-brand-950 p-8 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center text-center shadow-2xl border border-brand-800">
           {/* Decorative background */}
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
           
           <div className="relative z-10 flex flex-col items-center">
             <div className="w-16 h-16 bg-brand-800 rounded-2xl flex items-center justify-center mb-6 text-brand-300 font-bold text-xl border border-brand-600 shadow-inner">
                {member.name.charAt(0)}{member.name.split(' ')[1]?.charAt(0)}
             </div>
             <h3 className="text-2xl font-bold mb-2 font-display">{member.name}</h3>
             <p className="text-brand-400 font-medium mb-6 text-xs uppercase tracking-widest">{member.role}</p>
             <p className="text-brand-100 text-sm leading-relaxed mb-8 max-w-xs">
               {member.bio}
             </p>
             <div className="flex gap-3">
               {member.socials.linkedin && (
                  <a href={member.socials.linkedin} className="p-3 bg-brand-900 rounded-xl hover:bg-brand-700 transition-colors border border-brand-800 hover:border-brand-600 group/icon">
                      <Linkedin size={18} className="text-brand-300 group-hover/icon:text-white transition-colors" />
                  </a>
               )}
               {member.socials.twitter && (
                  <a href={member.socials.twitter} className="p-3 bg-brand-900 rounded-xl hover:bg-brand-700 transition-colors border border-brand-800 hover:border-brand-600 group/icon">
                      <Twitter size={18} className="text-brand-300 group-hover/icon:text-white transition-colors" />
                  </a>
               )}
               {member.socials.facebook && (
                  <a href={member.socials.facebook} className="p-3 bg-brand-900 rounded-xl hover:bg-brand-700 transition-colors border border-brand-800 hover:border-brand-600 group/icon">
                      <Facebook size={18} className="text-brand-300 group-hover/icon:text-white transition-colors" />
                  </a>
               )}
                {member.socials.mail && (
                  <a href={member.socials.mail} className="p-3 bg-brand-900 rounded-xl hover:bg-brand-700 transition-colors border border-brand-800 hover:border-brand-600 group/icon">
                      <Mail size={18} className="text-brand-300 group-hover/icon:text-white transition-colors" />
                  </a>
               )}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Section bg="light">
        <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: getEntranceOffset(80, 20) }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-display font-bold text-slate-900 mb-6"
            >
                About CommIT
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: getEntranceOffset(80, 20) }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-slate-600 leading-relaxed"
            >
                We are more than just an ICT provider; we are partners in national development, built on a foundation of integrity and innovation.
            </motion.p>
        </div>
      </Section>

      {/* Story & Timeline Section */}
      <Section className="overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <motion.div
                initial={{ opacity: 0, x: -30, y: getEntranceOffset(80, 0) }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="sticky top-32 self-start"
              >
                  <h3 className="text-brand-600 font-bold uppercase tracking-wider mb-2">Our Story</h3>
                  <h2 className="text-4xl font-display font-bold text-slate-900 mb-6 leading-tight">From Local Roots to <br/>Regional Impact</h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                      CommIT Enterprise began as a small consultancy in Banjul, driven by a team of passionate ICT professionals who saw the immense potential for technology to transform businesses and government services in The Gambia.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-6">
                      Over the years, we've grown to become a trusted partner for dozens of organizations, from small businesses to major government ministries. Our success is built on a foundation of technical expertise, unwavering commitment to client success, and deep understanding of the local context.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                      Today, we continue to expand our capabilities and reach, always staying true to our core values of integrity, excellence, and innovation.
                  </p>
              </motion.div>

              <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-slate-100"></div>

                  <div className="space-y-12">
                      {TIMELINE_EVENTS.map((event, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: 30, y: getEntranceOffset(80, 0) }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="flex items-center gap-8 relative group"
                          >
                              <div className="w-14 h-14 bg-brand-950 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg z-10 shrink-0 border-4 border-white group-hover:scale-110 group-hover:bg-brand-600 transition-all duration-300">
                                  {event.year}
                              </div>
                              <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-100 shadow-card group-hover:shadow-lg transition-all">
                                  <h4 className="text-slate-800 font-semibold">{event.title}</h4>
                              </div>
                          </motion.div>
                      ))}
                  </div>
              </div>
          </div>
      </Section>

      {/* Values & Culture Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 bg-slate-50/50 rounded-[3rem] my-12">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30, y: getEntranceOffset(80, 0) }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
                <h3 className="text-brand-600 font-bold uppercase tracking-wider mb-2">Our Mission & Vision</h3>
                <h2 className="text-4xl font-display font-bold text-slate-900 mb-6">Driving Sustainable Growth</h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                    {COMPANY_INFO.overview}
                </p>
                <div className="pl-6 border-l-4 border-brand-500 italic text-slate-700 bg-white p-6 rounded-r-2xl shadow-sm">
                    "{COMPANY_INFO.mission}"
                </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-brand-950 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl"
            >
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-6 border-b border-brand-800 pb-4">Our Core Values</h3>
                    <ul className="space-y-4">
                        {VALUES.map((val) => (
                            <li key={val.id} className="flex items-start gap-3">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-brand-400 shrink-0"></div>
                                <div>
                                    <strong className="text-brand-200 block">{val.title}</strong>
                                    <span className="text-sm text-slate-400">{val.description}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </motion.div>
         </div>

         {/* Meet Our Team Section */}
         <div className="mb-20">
            <motion.div 
              initial={{ opacity: 0, y: getEntranceOffset(80, 20) }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
                <h2 className="text-brand-600 font-bold uppercase tracking-wider mb-3">Meet The Team</h2>
                <h3 className="text-4xl font-display font-bold text-slate-900">
                    The Minds Behind Our Success
                </h3>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {TEAM.map((member) => (
                   <motion.div key={member.id} variants={itemVariants}>
                      <FlipCard member={member} />
                   </motion.div>
                ))}
            </motion.div>
         </div>
      </div>
    </div>
  );
};