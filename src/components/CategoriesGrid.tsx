import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '@/data/motorcycles';
import CategoryCard from './CategoryCard';

const CategoriesGrid: React.FC = () => {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-primary text-sm font-medium mb-4">
            🏍️ Explore
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Browse by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From sport bikes to cruisers, find the perfect motorcycle that matches your riding style
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
