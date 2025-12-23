import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Gauge, Fuel } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motorcycles } from '@/data/motorcycles';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  const featuredBikes = motorcycles.slice(0, 3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentBike = featuredBikes[currentIndex];

  const nextBike = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredBikes.length);
  };

  const prevBike = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredBikes.length) % featuredBikes.length);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 lg:pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Speed lines */}
        <div className="absolute inset-0 speed-lines opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 glass rounded-full text-primary text-sm font-medium mb-6">
              🏍️ World's #1 Motorcycle Simulation Platform
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight mb-6">
              Experience <br />
              <span className="gradient-text">Pure Power</span> <br />
              Before You Ride
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Explore, simulate, and purchase motorcycles from the world's finest brands. 
              Visualize your dream ride in stunning 3D before making it yours.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/motorcycles">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                  Explore Motorcycles
                </Button>
              </Link>
              <Link to="/categories">
                <Button size="lg" variant="outline" className="border-border hover:bg-secondary">
                  Browse Categories
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-display font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Motorcycles</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-foreground">50+</p>
                <p className="text-sm text-muted-foreground">Global Brands</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground">Happy Riders</p>
              </div>
            </div>
          </motion.div>

          {/* Featured Bike Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-2xl" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBike.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <img
                      src={currentBike.images[0]}
                      alt={`${currentBike.brand} ${currentBike.model}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>

                  {/* Bike info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="glass rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-primary text-sm font-medium">{currentBike.brand}</p>
                          <h3 className="text-2xl font-display font-bold text-foreground">
                            {currentBike.model}
                          </h3>
                        </div>
                        <p className="text-2xl font-display font-bold gradient-text">
                          ${currentBike.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{currentBike.power_hp} HP</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Gauge className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{currentBike.top_speed} km/h</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Fuel className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{currentBike.engine_cc}cc</span>
                        </div>
                      </div>

                      <Link to={`/motorcycle/${currentBike.id}`}>
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevBike}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-foreground hover:text-primary transition-colors pointer-events-auto"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextBike}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-foreground hover:text-primary transition-colors pointer-events-auto"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {featuredBikes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'w-8 bg-primary' 
                        : 'bg-muted-foreground/50 hover:bg-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
