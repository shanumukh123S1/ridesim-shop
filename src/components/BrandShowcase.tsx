import React from 'react';
import { motion } from 'framer-motion';
import { brands } from '@/data/motorcycles';

const BrandShowcase: React.FC = () => {
  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-foreground">
          Trusted by <span className="gradient-text">World-Class</span> Brands
        </h2>
      </div>

      {/* Infinite scroll animation */}
      <div className="relative">
        <div className="flex animate-scroll">
          {[...brands, ...brands].map((brand, index) => (
            <motion.div
              key={`${brand}-${index}`}
              className="flex-shrink-0 px-8 py-4"
              whileHover={{ scale: 1.1 }}
            >
              <div className="px-8 py-4 glass rounded-lg text-lg font-display font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                {brand}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default BrandShowcase;
