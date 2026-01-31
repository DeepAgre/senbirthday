import { motion } from 'framer-motion';
import { Flower, ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="z-10"
      >
        <Flower className="mx-auto mb-6 text-[#1b2e1c] opacity-80" size={56} />
        <h2 className="text-[12px] tracking-[1em] uppercase mb-4 font-bold text-[#1b2e1c]/60">girl its 4th of feb whahahhah</h2>
        <h1 className="text-7xl md:text-9xl font-serif italic mb-8 text-[#1b2e1c]">Happy birthday Cutiebird mwuahhhh</h1>
        <p className="text-xl md:text-2xl font-light italic text-[#1b2e1c]/70 mb-16">A special journey for a special person.</p>
        
        <motion.div 
          animate={{ y: [0, 15, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3 text-[#1b2e1c]/40"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-bold">Scroll to Begin</span>
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;