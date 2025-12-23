import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MotorcycleCard from '@/components/MotorcycleCard';
import { motorcycles, categories, brands } from '@/data/motorcycles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';

const MotorcyclesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [engineRange, setEngineRange] = useState([0, 1500]);
  const [fuelType, setFuelType] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredMotorcycles = useMemo(() => {
    let result = motorcycles.filter((m) => {
      if (search && !`${m.brand} ${m.model} ${m.category}`.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (selectedCategory && m.category !== selectedCategory) return false;
      if (selectedBrand && m.brand !== selectedBrand) return false;
      if (m.price < priceRange[0] || m.price > priceRange[1]) return false;
      if (m.engine_cc < engineRange[0] || m.engine_cc > engineRange[1]) return false;
      if (fuelType && m.fuel_type !== fuelType) return false;
      return true;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'power':
        result.sort((a, b) => b.power_hp - a.power_hp);
        break;
      case 'newest':
        result.sort((a, b) => b.launch_year - a.launch_year);
        break;
      default:
        break;
    }

    return result;
  }, [search, selectedCategory, selectedBrand, priceRange, engineRange, fuelType, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceRange([0, 50000]);
    setEngineRange([0, 1500]);
    setFuelType('');
    setSortBy('featured');
    setSearchParams({});
  };

  const activeFiltersCount = [
    selectedCategory,
    selectedBrand,
    fuelType,
    priceRange[0] > 0 || priceRange[1] < 50000,
    engineRange[0] > 0 || engineRange[1] < 1500,
  ].filter(Boolean).length;

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Label className="text-foreground mb-2 block">Search</Label>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search motorcycles..."
          className="bg-secondary border-border"
        />
      </div>

      {/* Category */}
      <div>
        <Label className="text-foreground mb-2 block">Category</Label>
        <Select value={selectedCategory || "all"} onValueChange={(val) => setSelectedCategory(val === "all" ? "" : val)}>
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brand */}
      <div>
        <Label className="text-foreground mb-2 block">Brand</Label>
        <Select value={selectedBrand || "all"} onValueChange={(val) => setSelectedBrand(val === "all" ? "" : val)}>
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-foreground mb-2 block">
          Price: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
        </Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={50000}
          step={1000}
          className="mt-4"
        />
      </div>

      {/* Engine Range */}
      <div>
        <Label className="text-foreground mb-2 block">
          Engine: {engineRange[0]}cc - {engineRange[1]}cc
        </Label>
        <Slider
          value={engineRange}
          onValueChange={setEngineRange}
          min={0}
          max={1500}
          step={50}
          className="mt-4"
        />
      </div>

      {/* Fuel Type */}
      <div>
        <Label className="text-foreground mb-2 block">Fuel Type</Label>
        <Select value={fuelType || "all"} onValueChange={(val) => setFuelType(val === "all" ? "" : val)}>
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Petrol">Petrol</SelectItem>
            <SelectItem value="Electric">Electric</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full">
        <X className="w-4 h-4 mr-2" />
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Browse Motorcycles | MotoSim</title>
        <meta name="description" content="Explore our complete collection of motorcycles from top global brands. Filter by category, price, engine size, and more." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-24 lg:pt-28 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              All <span className="gradient-text">Motorcycles</span>
            </h1>
            <p className="text-muted-foreground">
              Showing {filteredMotorcycles.length} of {motorcycles.length} motorcycles
            </p>
          </motion.div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-28 card-gradient rounded-xl border border-border/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
                    <Filter className="w-5 h-5 text-primary" />
                    Filters
                  </h2>
                  {activeFiltersCount > 0 && (
                    <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
                      {activeFiltersCount} active
                    </span>
                  )}
                </div>
                <FiltersContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                <div className="flex items-center gap-2">
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        Filters
                        {activeFiltersCount > 0 && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                            {activeFiltersCount}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 bg-card border-border">
                      <SheetHeader>
                        <SheetTitle className="font-display">Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FiltersContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* View Mode */}
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-secondary border-border">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="power">Most Powerful</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results */}
              <AnimatePresence mode="wait">
                {filteredMotorcycles.length > 0 ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                        : 'space-y-4'
                    }
                  >
                    {filteredMotorcycles.map((motorcycle, index) => (
                      <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} index={index} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-20"
                  >
                    <div className="text-6xl mb-4">🏍️</div>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                      No motorcycles found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search terms
                    </p>
                    <Button onClick={clearFilters}>Clear Filters</Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default MotorcyclesPage;
