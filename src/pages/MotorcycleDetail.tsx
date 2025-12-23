import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Heart, 
  GitCompare, 
  ShoppingCart, 
  Zap, 
  Gauge, 
  Fuel, 
  Settings,
  MapPin,
  Calendar,
  Check
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getMotorcycleById } from '@/data/motorcycles';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCompare } from '@/context/CompareContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MotorcycleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const motorcycle = getMotorcycleById(id || '');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const { toast } = useToast();

  const [selectedColor, setSelectedColor] = useState(motorcycle?.colors[0] || null);
  const [selectedVariant, setSelectedVariant] = useState(motorcycle?.variants[0] || null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!motorcycle) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold text-foreground mb-4">
              Motorcycle not found
            </h1>
            <Link to="/motorcycles">
              <Button>Browse Motorcycles</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    if (selectedColor && selectedVariant) {
      addToCart(motorcycle, selectedColor.name, selectedVariant.name);
      toast({
        title: "Added to cart",
        description: `${motorcycle.brand} ${motorcycle.model} has been added to your cart.`,
      });
    }
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(motorcycle.id)) {
      removeFromWishlist(motorcycle.id);
      toast({ title: "Removed from wishlist" });
    } else {
      addToWishlist(motorcycle);
      toast({ title: "Added to wishlist" });
    }
  };

  const handleToggleCompare = () => {
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

  const specs = [
    { icon: Zap, label: 'Power', value: `${motorcycle.power_hp} HP` },
    { icon: Gauge, label: 'Top Speed', value: `${motorcycle.top_speed} km/h` },
    { icon: Fuel, label: 'Engine', value: `${motorcycle.engine_cc}cc` },
    { icon: Settings, label: 'Torque', value: `${motorcycle.torque_nm} Nm` },
    { icon: MapPin, label: 'Origin', value: motorcycle.country_origin },
    { icon: Calendar, label: 'Year', value: motorcycle.launch_year.toString() },
  ];

  return (
    <>
      <Helmet>
        <title>{`${motorcycle.brand} ${motorcycle.model} | MotoSim`}</title>
        <meta name="description" content={motorcycle.description} />
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-24 lg:pt-28 pb-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link 
              to="/motorcycles" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Motorcycles
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden card-gradient border border-border/50">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={motorcycle.images[selectedImageIndex]}
                    alt={`${motorcycle.brand} ${motorcycle.model}`}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Color indicator */}
                {selectedColor && (
                  <div 
                    className="absolute top-4 right-4 w-8 h-8 rounded-full border-4 border-background shadow-lg"
                    style={{ backgroundColor: selectedColor.hex }}
                    title={selectedColor.name}
                  />
                )}
              </div>

              {/* Thumbnails */}
              {motorcycle.images.length > 1 && (
                <div className="flex gap-4">
                  {motorcycle.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-[4/3] w-24 rounded-lg overflow-hidden border-2 transition-all ${
                        index === selectedImageIndex 
                          ? 'border-primary' 
                          : 'border-border/50 hover:border-primary/50'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Header */}
              <div>
                <p className="text-primary font-medium mb-1">{motorcycle.brand}</p>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  {motorcycle.model}
                </h1>
                <p className="text-muted-foreground">{motorcycle.description}</p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-3 gap-4">
                {specs.slice(0, 3).map((spec) => (
                  <div key={spec.label} className="card-gradient rounded-xl p-4 border border-border/50 text-center">
                    <spec.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">{spec.label}</p>
                    <p className="font-display font-semibold text-foreground">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="font-display font-semibold text-foreground mb-3">
                  Color: {selectedColor?.name}
                </h3>
                <div className="flex gap-3">
                  {motorcycle.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor?.name === color.name 
                          ? 'border-primary scale-110' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Variant Selection */}
              <div>
                <h3 className="font-display font-semibold text-foreground mb-3">Variant</h3>
                <div className="flex flex-wrap gap-3">
                  {motorcycle.variants.map((variant) => (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        selectedVariant?.name === variant.name
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border hover:border-primary text-foreground'
                      }`}
                    >
                      <span className="font-medium">{variant.name}</span>
                      <span className="ml-2 text-sm opacity-80">
                        ${variant.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Actions */}
              <div className="card-gradient rounded-xl p-6 border border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Starting at</p>
                    <p className="text-3xl font-display font-bold gradient-text">
                      ${(selectedVariant?.price || motorcycle.price).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleToggleWishlist}
                      className={isInWishlist(motorcycle.id) ? 'text-accent border-accent' : ''}
                    >
                      <Heart 
                        className="w-5 h-5" 
                        fill={isInWishlist(motorcycle.id) ? 'currentColor' : 'none'} 
                      />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleToggleCompare}
                      className={isInCompare(motorcycle.id) ? 'text-primary border-primary' : ''}
                    >
                      <GitCompare className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="specs" className="w-full">
                <TabsList className="w-full bg-secondary">
                  <TabsTrigger value="specs" className="flex-1">Specifications</TabsTrigger>
                  <TabsTrigger value="features" className="flex-1">Features</TabsTrigger>
                </TabsList>
                
                <TabsContent value="specs" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    {specs.map((spec) => (
                      <div key={spec.label} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                        <spec.icon className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">{spec.label}</p>
                          <p className="font-medium text-foreground">{spec.value}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <Settings className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Engine Type</p>
                        <p className="font-medium text-foreground">{motorcycle.engine_type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <Fuel className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Mileage</p>
                        <p className="font-medium text-foreground">{motorcycle.mileage}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="mt-4">
                  <ul className="space-y-3">
                    {motorcycle.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-foreground">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default MotorcycleDetail;
