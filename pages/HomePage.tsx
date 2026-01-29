import React from 'react';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { ApproachSection } from '../components/ApproachSection';
import { ValuesSection } from '../components/ValuesSection';
import { TestimonialSection } from '../components/TestimonialSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <TestimonialSection />
      <ApproachSection />
      <ValuesSection />
    </>
  );
};