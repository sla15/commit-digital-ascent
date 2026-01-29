import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', icon = false, className = "", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-brand-900 text-white hover:bg-brand-800 shadow-lg shadow-brand-900/20 hover:shadow-brand-900/30",
    secondary: "bg-white text-brand-900 hover:bg-slate-50 shadow-lg shadow-slate-200/50 border border-slate-100",
    outline: "bg-transparent border-2 border-brand-900 text-brand-900 hover:bg-brand-50"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <ArrowRight className="ml-2 w-5 h-5" />}
    </motion.button>
  );
};