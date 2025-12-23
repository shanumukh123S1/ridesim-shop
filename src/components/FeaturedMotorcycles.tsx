import React from 'react';
import { motion } from 'framer-motion';
import { motorcycles } from '@/data/motorcycles';
import MotorcycleCard from './MotorcycleCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const FeaturedMotorcycles: React.FC = () => {
  const featured = motorcycles.slice(0, 6);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-primary text-sm font-medium mb-4">
            ⚡ Top Picks
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Featured <span className="gradient-text">Motorcycles</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handpicked selection of the most sought-after motorcycles from around the world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featured.map((motorcycle, index) => (
            <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/motorcycles">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View All Motorcycles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMotorcycles;
