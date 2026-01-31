import React, { useState, useRef, useEffect } from 'react';
import Hero from './components/Hero';
import Game from './components/Game';
import Gallery from './components/Gallery';
import { Heart, Sparkles, Volume2, VolumeX, SkipForward, Music, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [isValentine, setIsValentine] = useState(false);
  const [noPos, setNoPos] = useState({ top: 'auto', left: 'auto', position: 'relative' });

  // --- Music Logic ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(1); 
  const audioRef = useRef(null);

  const songs = {
    1: '/song1.mp3', // Lover
    2: '/song2.mp3'  // Invisible String
  };

  const startExperience = () => {
    setHasStarted(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Playback failed:", e));
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeSong = () => {
    const nextSong = currentSong === 1 ? 2 : 1;
    setCurrentSong(nextSong);
    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, 50);
  };

  const handleValentine = () => {
    setIsValentine(true);
    confetti({ 
      particleCount: 200, 
      spread: 100, 
      origin: { y: 0.6 },
      colors: ['#ffffff', '#1b2e1c', '#ff69b4'] 
    });
  };

  const dodgeNo = () => {
    setNoPos({
      position: 'fixed',
      top: Math.random() * 80 + '%',
      left: Math.random() * 80 + '%'
    });
  };

  return (
    <div className="relative w-full bg-[#88e788] text-[#1b2e1c] selection:bg-[#1b2e1c] selection:text-white">
      
      <AnimatePresence>
        {!hasStarted && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[200] bg-[#1b2e1c] flex items-center justify-center p-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startExperience}
              className="bg-[#88e788] text-[#1b2e1c] px-12 py-6 rounded-full font-serif italic text-3xl flex items-center gap-4 shadow-[0_0_50px_rgba(136,231,136,0.3)]"
            >
              <Play fill="#1b2e1c" />
              Open Your Treat
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src={songs[currentSong]} loop />

      <div className="fixed bottom-6 right-6 z-[150] flex flex-col items-end gap-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 bg-white/40 backdrop-blur-2xl border border-white/60 p-3 rounded-3xl shadow-2xl"
        >
          <button 
            onClick={toggleMusic}
            className="p-4 bg-[#1b2e1c] text-white rounded-full transition-all shadow-lg hover:scale-110 active:scale-90"
          >
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
          
          <div className="flex flex-col min-w-[120px]">
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 flex items-center gap-1">
              <Music size={10} /> Swiftie Mode
            </span>
            <span className="text-sm font-serif italic font-bold">
              {currentSong === 1 ? "Invisible String" : "Kirkified"}
            </span>
          </div>

          <button 
            onClick={changeSong}
            className="group flex items-center gap-2 px-4 py-2 bg-[#1b2e1c]/10 hover:bg-[#1b2e1c] hover:text-white rounded-2xl transition-all border border-[#1b2e1c]/20"
          >
            <span className="text-xs font-bold uppercase">Change Song</span>
            <SkipForward size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-5%] w-[50%] h-[50%] bg-white/30 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-[#6fc276]/20 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-full">
        <section className="w-full">
          <Hero />
        </section>

        <section className="w-full min-h-screen py-20 flex items-center justify-center">
          <Game onUnlock={() => setUnlocked(true)} />
        </section>
        
        {/* Updated Memories Section */}
        <AnimatePresence>
          {unlocked && (
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full min-h-screen py-20"
            >
              <Gallery />
            </motion.section>
          )}
        </AnimatePresence>

        <section className="min-h-screen w-full flex items-center justify-center px-6 py-20">
          <div className="max-w-3xl w-full bg-white/20 backdrop-blur-xl border border-white/40 p-12 md:p-16 rounded-[4rem] text-center shadow-2xl">
            <Sparkles className="mx-auto mb-8 text-[#1b2e1c]" size={40} />
            <h2 className="text-4xl md:text-5xl font-serif italic mb-8 text-[#1b2e1c]">One last thing...</h2>
            <p className="text-xl mb-12 text-[#1b2e1c]/80 italic">Since you found all the lilies... <br/>Will you be my Valentine on the 14th?</p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <button 
                onClick={handleValentine}
                className="px-16 py-5 bg-[#1b2e1c] text-white rounded-3xl font-bold text-2xl hover:scale-105 transition-transform shadow-xl active:scale-95"
              >
                YES! 💚
              </button>
              <motion.button 
                animate={{ top: noPos.top, left: noPos.left, position: noPos.position }}
                onMouseEnter={dodgeNo}
                onClick={dodgeNo}
                className="px-8 py-3 border-2 border-[#1b2e1c]/20 rounded-xl text-[#1b2e1c]/60 text-sm font-medium"
              >
                No
              </motion.button>
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {isValentine && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="fixed inset-0 z-[100] bg-[#88e788] flex flex-col items-center justify-center text-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.5 }} 
              animate={{ scale: 1 }}
              className="bg-white/30 p-16 rounded-[4rem] backdrop-blur-lg border border-white/50 shadow-2xl"
            >
              <Heart size={100} fill="#1b2e1c" className="mb-10 animate-bounce mx-auto text-[#1b2e1c]" />
              <h1 className="text-6xl md:text-8xl font-serif italic mb-4 text-[#1b2e1c]">It's a Date!</h1>
              <p className="text-2xl font-light text-[#1b2e1c]/80 italic">will see you on the 14th babybird. 💚</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;