import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Truck, CreditCard, Headphones, RotateCcw, Award } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Purchase',
    description: 'Protected transactions with SSL encryption and buyer protection.',
  },
  {
    icon: Truck,
    title: 'Worldwide Shipping',
    description: 'We deliver your dream motorcycle anywhere in the world.',
  },
  {
    icon: CreditCard,
    title: 'Flexible Financing',
    description: 'Easy EMI options and multiple payment methods available.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Expert assistance available around the clock for all queries.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day return policy for a hassle-free shopping experience.',
  },
  {
    icon: Award,
    title: 'Certified Quality',
    description: 'All motorcycles undergo rigorous quality checks and certifications.',
  },
];

const Features: React.FC = () => {
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
            ✨ Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            The <span className="gradient-text">MotoSim</span> Advantage
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing you with the best motorcycle buying experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 card-gradient rounded-xl border border-border/50 hover-lift"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
