import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import { categories } from '@/data/motorcycles';

const Categories: React.FC = () => {
  return (
    <>
      <Helmet><title>Categories | MotoSim</title></Helmet>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Browse by <span className="gradient-text">Category</span></h1>
            <p className="text-muted-foreground">Find the perfect motorcycle that matches your riding style</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (<CategoryCard key={category.id} category={category} index={index} />))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Categories;
