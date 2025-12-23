import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoriesGrid from '@/components/CategoriesGrid';
import FeaturedMotorcycles from '@/components/FeaturedMotorcycles';
import BrandShowcase from '@/components/BrandShowcase';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>MotoSim - World's #1 Motorcycle Simulation & E-Commerce Platform</title>
        <meta name="description" content="Explore, simulate, and purchase motorcycles from the world's finest brands. Visualize your dream ride in stunning 3D before making it yours." />
      </Helmet>

      <Navbar />
      
      <main>
        <Hero />
        <CategoriesGrid />
        <FeaturedMotorcycles />
        <BrandShowcase />
        <Features />
      </main>

      <Footer />
    </>
  );
};

export default Index;
