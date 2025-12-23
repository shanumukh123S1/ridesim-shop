import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Start adding some amazing motorcycles!</p>
            <Link to="/motorcycles"><Button>Browse Motorcycles</Button></Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-display font-bold text-foreground mb-8">Shopping <span className="gradient-text">Cart</span></h1>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <motion.div key={item.motorcycle.id} layout className="card-gradient rounded-xl p-4 border border-border/50 flex gap-4">
                  <img src={item.motorcycle.images[0]} alt={item.motorcycle.model} className="w-32 h-24 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-foreground">{item.motorcycle.brand} {item.motorcycle.model}</h3>
                    <p className="text-sm text-muted-foreground">{item.selectedColor} • {item.selectedVariant}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.motorcycle.id, item.quantity - 1)}><Minus className="w-4 h-4" /></Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.motorcycle.id, item.quantity + 1)}><Plus className="w-4 h-4" /></Button>
                      </div>
                      <Button size="icon" variant="ghost" className="text-destructive" onClick={() => removeFromCart(item.motorcycle.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  <p className="text-xl font-display font-bold text-foreground">${(item.motorcycle.price * item.quantity).toLocaleString()}</p>
                </motion.div>
              ))}
            </div>
            <div className="card-gradient rounded-xl p-6 border border-border/50 h-fit sticky top-28">
              <h2 className="font-display font-semibold text-foreground mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${totalPrice.toLocaleString()}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>Free</span></div>
              </div>
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between text-xl font-display font-bold text-foreground"><span>Total</span><span className="gradient-text">${totalPrice.toLocaleString()}</span></div>
              </div>
              <Button className="w-full bg-primary text-primary-foreground" size="lg">Checkout <ArrowRight className="w-4 h-4 ml-2" /></Button>
              <Button variant="ghost" className="w-full mt-2" onClick={clearCart}>Clear Cart</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
