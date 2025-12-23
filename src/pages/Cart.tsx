import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Heart, 
  MapPin, 
  Truck, 
  Shield, 
  Tag,
  ChevronRight,
  Package,
  Clock,
  CheckCircle2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'MOTO10') {
      setAppliedCoupon('MOTO10');
      toast({ title: 'Coupon applied!', description: '10% discount applied to your order.' });
    } else {
      toast({ title: 'Invalid coupon', description: 'Please enter a valid coupon code.', variant: 'destructive' });
    }
    setCouponCode('');
  };

  const handleSaveForLater = (item: typeof items[0]) => {
    if (!isInWishlist(item.motorcycle.id)) {
      addToWishlist(item.motorcycle);
    }
    removeFromCart(item.motorcycle.id);
    toast({ title: 'Saved for later', description: 'Item moved to your wishlist.' });
  };

  const discount = appliedCoupon === 'MOTO10' ? totalPrice * 0.1 : 0;
  const finalPrice = totalPrice - discount;

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 flex items-center justify-center bg-background">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center px-4"
          >
            <div className="w-24 h-24 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6 max-w-sm">Looks like you haven't added any motorcycles yet. Start exploring!</p>
            <Link to="/motorcycles">
              <Button size="lg" className="bg-primary text-primary-foreground">
                Explore Motorcycles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Shopping Cart <span className="text-muted-foreground text-lg font-normal">({items.length} {items.length === 1 ? 'item' : 'items'})</span>
              </h1>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-4">
              {/* Delivery Location Banner */}
              <div className="card-gradient rounded-xl p-4 border border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Deliver to</p>
                    <p className="font-medium text-foreground">San Francisco, CA 94105</p>
                  </div>
                </div>
                <Button variant="link" className="text-primary p-0">
                  Change
                </Button>
              </div>

              {/* Cart Items */}
              <div className="card-gradient rounded-xl border border-border/50 overflow-hidden">
                <AnimatePresence>
                  {items.map((item, index) => {
                    const variant = item.motorcycle.variants.find(v => v.name === item.selectedVariant);
                    const itemPrice = variant?.price || item.motorcycle.price;
                    
                    return (
                      <motion.div 
                        key={item.motorcycle.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className={`p-4 md:p-6 ${index !== items.length - 1 ? 'border-b border-border/50' : ''}`}
                      >
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <Link to={`/motorcycle/${item.motorcycle.id}`} className="flex-shrink-0">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-secondary">
                              <img 
                                src={item.motorcycle.images[0]} 
                                alt={item.motorcycle.model} 
                                className="w-full h-full object-cover hover:scale-105 transition-transform"
                              />
                            </div>
                          </Link>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col md:flex-row md:justify-between gap-2">
                              <div className="flex-1">
                                <Link to={`/motorcycle/${item.motorcycle.id}`}>
                                  <h3 className="font-display font-semibold text-foreground hover:text-primary transition-colors text-base md:text-lg">
                                    {item.motorcycle.brand} {item.motorcycle.model}
                                  </h3>
                                </Link>
                                <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <div 
                                      className="w-3 h-3 rounded-full border border-border"
                                      style={{ backgroundColor: item.motorcycle.colors.find(c => c.name === item.selectedColor)?.hex }}
                                    />
                                    {item.selectedColor}
                                  </span>
                                  <span>•</span>
                                  <span>{item.selectedVariant}</span>
                                </div>

                                {/* Delivery Info */}
                                <div className="flex items-center gap-2 mt-2">
                                  <Truck className="w-4 h-4 text-primary" />
                                  <span className="text-sm text-primary font-medium">Free Delivery</span>
                                  <span className="text-sm text-muted-foreground">by Mon, Jan 15</span>
                                </div>

                                {/* Stock Status */}
                                <div className="flex items-center gap-1 mt-1">
                                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                                  <span className="text-xs text-green-500">In Stock</span>
                                </div>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <p className="text-xl md:text-2xl font-display font-bold text-foreground">
                                  ${(itemPrice * item.quantity).toLocaleString()}
                                </p>
                                {item.quantity > 1 && (
                                  <p className="text-sm text-muted-foreground">
                                    ${itemPrice.toLocaleString()} each
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Actions Row */}
                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/30">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-8 w-8 hover:bg-background"
                                  onClick={() => updateQuantity(item.motorcycle.id, item.quantity - 1)}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-10 text-center font-medium text-foreground">{item.quantity}</span>
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-8 w-8 hover:bg-background"
                                  onClick={() => updateQuantity(item.motorcycle.id, item.quantity + 1)}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center gap-2 md:gap-4">
                                <button 
                                  onClick={() => handleSaveForLater(item)}
                                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                >
                                  <Heart className="w-4 h-4" />
                                  <span className="hidden md:inline">Save for later</span>
                                </button>
                                <span className="text-border">|</span>
                                <button 
                                  onClick={() => removeFromCart(item.motorcycle.id)}
                                  className="text-sm text-destructive hover:text-destructive/80 transition-colors flex items-center gap-1"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span className="hidden md:inline">Remove</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Clear Cart */}
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear entire cart
                </Button>
              </div>
            </div>

            {/* Order Summary - Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Coupon Section */}
                <div className="card-gradient rounded-xl p-4 border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-5 h-5 text-primary" />
                    <h3 className="font-display font-semibold text-foreground">Apply Coupon</h3>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="bg-secondary border-border"
                    />
                    <Button onClick={handleApplyCoupon} variant="outline" className="shrink-0">
                      Apply
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <div className="flex items-center gap-2 mt-3 text-sm text-primary">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Coupon "{appliedCoupon}" applied</span>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">Try: MOTO10 for 10% off</p>
                </div>

                {/* Price Details */}
                <div className="card-gradient rounded-xl p-4 border border-border/50">
                  <h3 className="font-display font-semibold text-foreground mb-4 pb-3 border-b border-border/50">
                    Price Details
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Price ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span>${totalPrice.toLocaleString()}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-green-500">
                        <span>Coupon Discount</span>
                        <span>-${discount.toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery Charges</span>
                      <span className="text-green-500">FREE</span>
                    </div>
                    
                    <div className="flex justify-between text-muted-foreground">
                      <span>Platform Fee</span>
                      <span className="text-green-500">FREE</span>
                    </div>
                  </div>

                  <div className="border-t border-border/50 mt-4 pt-4">
                    <div className="flex justify-between text-lg font-display font-bold text-foreground">
                      <span>Total Amount</span>
                      <span className="gradient-text">${finalPrice.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                      <p className="text-sm text-green-500 mt-1">
                        You'll save ${discount.toLocaleString()} on this order
                      </p>
                    )}
                  </div>
                </div>

                {/* Checkout Button */}
                <Button 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
                  size="lg"
                >
                  <span className="flex-1">Place Order</span>
                  <ChevronRight className="w-5 h-5" />
                </Button>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/30 text-center">
                    <Shield className="w-5 h-5 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">Safe Payment</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/30 text-center">
                    <Package className="w-5 h-5 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">Easy Returns</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/30 text-center">
                    <Clock className="w-5 h-5 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
