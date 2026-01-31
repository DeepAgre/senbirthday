import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Flower } from 'lucide-react';
import confetti from 'canvas-confetti';

const Game = ({ onUnlock }) => {
  const [score, setScore] = useState(0);

  const handleClick = () => {
    if (score < 4) {
      setScore(s => s + 1);
    } else {
      setScore(5);
      onUnlock();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#ffffff', '#6fc276'] });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full bg-white/10 backdrop-blur-md rounded-[3rem] p-12 border border-white/20 text-center text-white">
        <div className="mb-8 flex justify-center">
          {score < 5 ? <Lock size={48} className="animate-pulse" /> : <Unlock size={48} />}
        </div>
        
        <h2 className="text-4xl font-serif italic mb-4">The Lily Quest</h2>
        <p className="mb-10 text-white/70">Catch 5 floating lilies to reveal the memories.</p>

        <div className="relative h-64 bg-black/20 rounded-3xl border-2 border-dashed border-white/20 overflow-hidden shadow-inner">
          <p className="absolute top-4 left-0 right-0 z-20 font-bold tracking-widest uppercase text-[10px]">Found: {score} / 5</p>
          
          {[...Array(5)].map((_, i) => (
            <motion.button
              key={i}
              onClick={handleClick}
              animate={{ 
                x: [Math.random() * 100, Math.random() * 300, Math.random() * 100],
                y: [Math.random() * 50, Math.random() * 150, Math.random() * 50]
              }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "linear" }}
              className={`absolute p-3 bg-white text-green-900 rounded-full shadow-lg ${score > i ? 'hidden' : 'flex'}`}
            >
              <Flower size={24} />
            </motion.button>
          ))}
          {score === 5 && <p className="flex items-center justify-center h-full text-2xl italic">Damnn boi u fast af chalo scroll karo niche</p>}
        </div>
      </div>
    </section>
  );
};

export default Game;