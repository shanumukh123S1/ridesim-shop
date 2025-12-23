import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, GitCompare, ShoppingCart, Zap } from 'lucide-react';
import { Motorcycle } from '@/data/motorcycles';
import { useCart } from '@/context/CartContext';
import { useCompare } from '@/context/CompareContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface MotorcycleCardProps {
  motorcycle: Motorcycle;
  index?: number;
}

const MotorcycleCard: React.FC<MotorcycleCardProps> = ({ motorcycle, index = 0 }) => {
  const { addToCart } = useCart();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(motorcycle, motorcycle.colors[0].name, motorcycle.variants[0].name);
    toast({
      title: "Added to cart",
      description: `${motorcycle.brand} ${motorcycle.model} has been added to your cart.`,
    });
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInCompare(motorcycle.id)) {
      removeFromCompare(motorcycle.id);
      toast({ title: "Removed from compare" });
    } else {
      const added = addToCompare(motorcycle);
      if (added) {
        toast({ title: "Added to compare" });
      } else {
        toast({
          title: "Compare limit reached",
          description: "You can only compare up to 3 motorcycles.",
          variant: "destructive",
        });
      }
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(motorcycle.id)) {
      removeFromWishlist(motorcycle.id);
      toast({ title: "Removed from wishlist" });
    } else {
      addToWishlist(motorcycle);
      toast({ title: "Added to wishlist" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/motorcycle/${motorcycle.id}`}>
        <div className="group relative card-gradient rounded-xl overflow-hidden border border-border/50 hover-lift">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={motorcycle.images[0]}
              alt={`${motorcycle.brand} ${motorcycle.model}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

            {/* Quick actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleWishlist}
                className={`w-9 h-9 rounded-full glass flex items-center justify-center ${
                  isInWishlist(motorcycle.id) ? 'text-accent' : 'text-foreground/80 hover:text-accent'
                }`}
              >
                <Heart className="w-4 h-4" fill={isInWishlist(motorcycle.id) ? 'currentColor' : 'none'} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleCompare}
                className={`w-9 h-9 rounded-full glass flex items-center justify-center ${
                  isInCompare(motorcycle.id) ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                }`}
              >
                <GitCompare className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 text-xs font-medium glass rounded-full text-primary capitalize">
                {motorcycle.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <p className="text-sm text-primary font-medium">{motorcycle.brand}</p>
                <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                  {motorcycle.model}
                </h3>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Zap className="w-4 h-4 text-primary" />
                {motorcycle.power_hp} HP
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span>{motorcycle.engine_cc}cc</span>
              <span>•</span>
              <span>{motorcycle.top_speed} km/h</span>
              <span>•</span>
              <span>{motorcycle.fuel_type}</span>
            </div>

            {/* Colors preview */}
            <div className="flex items-center gap-1 mb-4">
              {motorcycle.colors.slice(0, 4).map((color) => (
                <div
                  key={color.name}
                  className="w-5 h-5 rounded-full border-2 border-border"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {motorcycle.colors.length > 4 && (
                <span className="text-xs text-muted-foreground ml-1">
                  +{motorcycle.colors.length - 4}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-display font-bold text-foreground">
                  ${motorcycle.price.toLocaleString()}
                </span>
              </div>
              
              <Button
                variant="default"
                size="sm"
                onClick={handleAddToCart}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MotorcycleCard;
