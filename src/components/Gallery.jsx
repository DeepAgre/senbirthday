import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // TEMPLATE: Add your photos and custom messages here
  const photos = [
    { id: 1, url: '/photo1.jpg', message: "This was the day we first..." },
    { id: 2, url: '/photo2.jpg', message: "I love how you look in this one." },
    { id: 3, url: '/photo3.jpg', message: "Our favorite spot in Thane!" },
   
    // Add more as needed
  ];

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-serif italic text-[#1b2e1c]"></h2>
        <p className="text-[#1b2e1c]/60 mt-4 italic">Click a memory to reveal a secret message... ✨</p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            whileHover={{ scale: 1.02, rotate: -1 }}
            onClick={() => setSelectedPhoto(photo)}
            className="cursor-pointer bg-white p-3 shadow-xl rounded-sm border border-gray-200"
          >
            <div className="aspect-square overflow-hidden bg-gray-100 mb-2">
               <img src={photo.url} alt="Memory" className="w-full h-full object-cover" />
            </div>
            <div className="flex justify-center text-[#1b2e1c]/30">
              <Heart size={16} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Smooth Animation Overlay */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-[#1b2e1c]/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="max-w-2xl w-full bg-white p-4 rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute -top-12 -right-2 text-white hover:rotate-90 transition-transform"
                >
                  <X size={32} />
                </button>
                <img src={selectedPhoto.url} className="w-full h-auto rounded-lg" alt="Selected" />
                <div className="py-6 text-center">
                  <p className="text-2xl font-serif italic text-[#1b2e1c]">
                    {selectedPhoto.message}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;