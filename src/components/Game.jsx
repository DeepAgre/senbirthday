import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Lock, Unlock, Sparkles, MousePointer2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const Game = ({ onUnlock }) => {
  const [clearedPercent, setClearedPercent] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  // Track how many "petals" have been hovered/clicked
  const [activePetals, setActivePetals] = useState(new Set());
  const totalPetals = 24; // Grid size for clearing

  const handleInteraction = (id) => {
    if (isUnlocked) return;
    
    setActivePetals((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      
      const newPercent = (newSet.size / totalPetals) * 100;
      setClearedPercent(newPercent);

      if (newSet.size === totalPetals && !isUnlocked) {
        triggerUnlock();
      }
      return newSet;
    });
  };

  const triggerUnlock = () => {
    setIsUnlocked(true);
    onUnlock();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#1b2e1c', '#88e788']
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-xl rounded-[3rem] p-10 border border-white/30 text-center shadow-2xl">
        
        <div className="mb-6 flex justify-center">
          <motion.div
            animate={isUnlocked ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
          >
            {isUnlocked ? (
              <Unlock size={64} className="text-[#1b2e1c]" />
            ) : (
              <Lock size={64} className="text-[#1b2e1c] opacity-50 animate-pulse" />
            )}
          </motion.div>
        </div>

        <h2 className="text-3xl font-serif italic mb-2 text-[#1b2e1c]">Clear the Garden</h2>
        <p className="mb-8 text-[#1b2e1c]/70 text-sm italic flex items-center justify-center gap-2">
          <MousePointer2 size={14} /> Rub away the haze to reveal our story...
        </p>

        {/* Game Container */}
        <div className="relative aspect-square max-w-[300px] mx-auto bg-[#1b2e1c]/5 rounded-3xl border-4 border-white/50 overflow-hidden shadow-inner group">
          
          {/* Progress Indicator */}
          <div className="absolute top-2 left-0 right-0 z-30">
             <span className="text-[10px] font-bold uppercase tracking-widest text-[#1b2e1c]/40">
               Discovery: {Math.round(clearedPercent)}%
             </span>
          </div>

          {/* The Hidden Content (visible as you clear) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <Sparkles size={40} className="text-[#1b2e1c] mb-4 opacity-80" />
            <p className="text-[#1b2e1c] font-serif italic font-bold">
              {isUnlocked ? "Memories Unlocked!" : "Keep going, babybird..."}
            </p>
          </div>

          {/* The "Scratch" Grid */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-6 z-20">
            {[...Array(totalPetals)].map((_, i) => (
              <motion.div
                key={i}
                onMouseEnter={() => handleInteraction(i)}
                onTouchStart={() => handleInteraction(i)}
                animate={{ 
                  opacity: activePetals.has(i) ? 0 : 1,
                  scale: activePetals.has(i) ? 0.8 : 1 
                }}
                className="bg-[#1b2e1c] border border-white/10 cursor-crosshair m-[1px] rounded-sm shadow-sm"
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>

          {/* Success Overlay */}
          {isUnlocked && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-40 bg-[#88e788] flex items-center justify-center"
            >
              <p className="text-[#1b2e1c] font-bold italic text-xl animate-bounce">
                niche scroll kar laadle 💚
              </p>
            </motion.div>
          )}
        </div>

        <div className="mt-8">
           <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#1b2e1c]" 
                animate={{ width: `${clearedPercent}%` }}
              />
           </div>
        </div>
      </div>
    </section>
  );
};

export default Game;