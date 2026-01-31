import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Heart, MousePointer2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const Game = ({ onUnlock }) => {
  const [score, setScore] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const targetScore = 10;

  const handleHeartClick = (id) => {
    if (isUnlocked) return;
    setScore((prev) => prev + 1);
  };

  useEffect(() => {
    if (score >= targetScore && !isUnlocked) {
      setIsUnlocked(true);
      onUnlock();
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#1b2e1c', '#ffffff']
      });
    }
  }, [score, isUnlocked, onUnlock]);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-xl rounded-[3rem] p-10 border border-white/30 text-center shadow-2xl overflow-hidden">
        
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

        <h2 className="text-3xl font-serif italic mb-2 text-[#1b2e1c]">Catch the Love</h2>
        <p className="mb-8 text-[#1b2e1c]/70 text-sm italic">
          Tap {targetScore} falling hearts to reveal your surprise!
        </p>

        {/* Game Area */}
        <div className="relative h-80 w-full bg-[#1b2e1c]/5 rounded-3xl border-2 border-dashed border-[#1b2e1c]/20 overflow-hidden shadow-inner cursor-crosshair">
          
          <div className="absolute top-4 left-0 right-0 z-30">
             <span className="text-[10px] font-bold uppercase tracking-widest text-[#1b2e1c]/40">
               Collected: {score} / {targetScore}
             </span>
          </div>

          <AnimatePresence>
            {!isUnlocked && [...Array(targetScore)].map((_, i) => (
              <FallingHeart 
                key={i} 
                index={i} 
                onCatch={() => handleHeartClick(i)} 
                active={score < targetScore}
              />
            ))}
          </AnimatePresence>

          {isUnlocked && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#88e788]/20"
            >
              <Heart size={48} className="text-[#1b2e1c] fill-[#1b2e1c] mb-4 animate-bounce" />
              <p className="text-[#1b2e1c] font-bold italic text-xl">
                Done! Scroll down for a surprise 💚
              </p>
            </motion.div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
           <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#1b2e1c]" 
                animate={{ width: `${(score / targetScore) * 100}%` }}
              />
           </div>
        </div>
      </div>
    </section>
  );
};

// Sub-component for individual falling hearts
const FallingHeart = ({ onCatch, index }) => {
  const [isCaught, setIsCaught] = useState(false);
  
  // Randomize starting positions and speeds
  const randomX = Math.random() * 90; // percentage
  const duration = 3 + Math.random() * 4;
  const delay = Math.random() * 5;

  const handleClick = () => {
    if (!isCaught) {
      setIsCaught(true);
      onCatch();
    }
  };

  if (isCaught) return null;

  return (
    <motion.button
      initial={{ y: -50, x: `${randomX}%`, opacity: 0 }}
      animate={{ 
        y: 400, 
        opacity: [0, 1, 1, 0],
        rotate: [0, 45, -45, 0]
      }}
      transition={{ 
        duration: duration, 
        repeat: Infinity, 
        delay: delay,
        ease: "linear"
      }}
      onClick={handleClick}
      className="absolute p-2 text-red-500 hover:scale-125 transition-transform"
    >
      <Heart fill="currentColor" size={28} />
    </motion.button>
  );
};

export default Game;