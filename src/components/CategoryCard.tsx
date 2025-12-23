import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/data/motorcycles';

interface CategoryCardProps {
  category: Category;
  index?: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/motorcycles?category=${category.id}`}>
        <div className="group relative card-gradient rounded-xl p-6 border border-border/50 hover-lift cursor-pointer overflow-hidden">
          {/* Background glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          </div>

          <div className="relative z-10">
            {/* Icon */}
            <div className="text-4xl mb-4">{category.icon}</div>

            {/* Content */}
            <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {category.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary font-medium">
                {category.count} models
              </span>
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
