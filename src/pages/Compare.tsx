import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, GitCompare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCompare } from '@/context/CompareContext';
import { Button } from '@/components/ui/button';

const Compare: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <><Navbar /><main className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <GitCompare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">No motorcycles to compare</h1>
          <p className="text-muted-foreground mb-6">Add up to 3 motorcycles to compare</p>
          <Link to="/motorcycles"><Button>Browse Motorcycles</Button></Link>
        </div>
      </main><Footer /></>
    );
  }

  const specs = ['power_hp', 'torque_nm', 'top_speed', 'engine_cc', 'price', 'fuel_type', 'transmission'] as const;
  const specLabels: Record<string, string> = { power_hp: 'Power (HP)', torque_nm: 'Torque (Nm)', top_speed: 'Top Speed (km/h)', engine_cc: 'Engine (cc)', price: 'Price ($)', fuel_type: 'Fuel Type', transmission: 'Transmission' };

  return (
    <><Navbar /><main className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">Compare <span className="gradient-text">Motorcycles</span></h1>
          <Button variant="outline" onClick={clearCompare}>Clear All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-4 text-left text-muted-foreground">Specification</th>
                {compareList.map((m) => (
                  <th key={m.id} className="p-4 min-w-[250px]">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-gradient rounded-xl p-4 border border-border/50 relative">
                      <button onClick={() => removeFromCompare(m.id)} className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"><X className="w-4 h-4" /></button>
                      <img src={m.images[0]} alt={m.model} className="w-full h-32 object-cover rounded-lg mb-3" />
                      <p className="text-primary text-sm">{m.brand}</p>
                      <h3 className="font-display font-semibold text-foreground">{m.model}</h3>
                    </motion.div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map((spec) => (
                <tr key={spec} className="border-t border-border">
                  <td className="p-4 font-medium text-foreground">{specLabels[spec]}</td>
                  {compareList.map((m) => {
                    const val = m[spec];
                    return <td key={m.id} className="p-4 text-center text-muted-foreground">{typeof val === 'number' ? val.toLocaleString() : val}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main><Footer /></>
  );
};

export default Compare;
