import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Loader2 } from 'lucide-react';

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  // TEMPLATE: Your photos and messages
  const photos = [
    { id: 1, url: '/photo1.jpg', message: "This was the day we first..." },
    { id: 2, url: '/photo2.jpg', message: "I love how you look in this one." },
    { id: 3, url: '/photo3.jpg', message: "Our favorite spot in Thane!" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-serif italic text-[#1b2e1c]">Our Memories Together</h2>
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
            <div className="aspect-square overflow-hidden bg-gray-100 mb-2 relative flex items-center justify-center">
              {!loadedImages[photo.id] && (
                <Loader2 className="animate-spin text-[#1b2e1c]/20 absolute" size={24} />
              )}
              <img 
                src={photo.url} 
                alt="Memory" 
                className={`w-full h-full object-cover transition-opacity duration-500 ${loadedImages[photo.id] ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => handleImageLoad(photo.id)}
              />
            </div>
            <div className="flex justify-center text-[#1b2e1c]/30">
              <Heart size={16} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Optimized Animation Overlay */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full bg-white p-3 rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col">
                {/* Image Container with max-height constraint */}
                <div className="w-full max-h-[60vh] overflow-hidden rounded-2xl flex items-center justify-center bg-gray-50">
                  <img 
                    src={selectedPhoto.url} 
                    className="max-w-full max-h-full object-contain" 
                    alt="Selected" 
                  />
                </div>

                {/* Message Section - Always visible now */}
                <div className="p-6 text-center">
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Heart className="mx-auto mb-3 text-red-500 fill-red-500" size={20} />
                    <p className="text-xl md:text-2xl font-serif italic text-[#1b2e1c] leading-relaxed">
                      {selectedPhoto.message}
                    </p>
                  </motion.div>
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