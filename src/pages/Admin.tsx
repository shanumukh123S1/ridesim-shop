import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Search, LayoutDashboard, Bike, Package, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MotorcycleForm from '@/components/admin/MotorcycleForm';
import { useMotorcycles } from '@/context/MotorcycleContext';
import { Motorcycle } from '@/data/motorcycles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Admin: React.FC = () => {
  const { motorcycles, addMotorcycle, updateMotorcycle, deleteMotorcycle } = useMotorcycles();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingMotorcycle, setEditingMotorcycle] = useState<Motorcycle | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = motorcycles.filter(m =>
    `${m.brand} ${m.model}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (data: Omit<Motorcycle, 'id'>) => {
    addMotorcycle(data);
    setIsAddOpen(false);
    toast({ title: 'Motorcycle added successfully' });
  };

  const handleUpdate = (data: Omit<Motorcycle, 'id'>) => {
    if (editingMotorcycle) {
      updateMotorcycle(editingMotorcycle.id, data);
      setEditingMotorcycle(null);
      toast({ title: 'Motorcycle updated successfully' });
    }
  };

  const handleDelete = () => {
    if (deletingId) {
      deleteMotorcycle(deletingId);
      setDeletingId(null);
      toast({ title: 'Motorcycle deleted successfully' });
    }
  };

  const stats = [
    { label: 'Total Vehicles', value: motorcycles.length, icon: Bike, color: 'text-primary' },
    { label: 'Categories', value: 10, icon: Package, color: 'text-accent' },
    { label: 'Total Value', value: `$${(motorcycles.reduce((sum, m) => sum + m.price, 0) / 1000000).toFixed(1)}M`, icon: TrendingUp, color: 'text-green-500' },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <LayoutDashboard className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-display font-bold text-foreground">Admin <span className="gradient-text">Dashboard</span></h1>
            </div>
            <p className="text-muted-foreground">Manage your motorcycle inventory</p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-gradient rounded-xl p-6 border border-border/50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-display font-bold text-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-10 h-10 ${stat.color}`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search motorcycles..."
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <Button onClick={() => setIsAddOpen(true)} className="bg-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" /> Add Motorcycle
            </Button>
          </div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-gradient rounded-xl border border-border/50 overflow-hidden"
          >
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Image</TableHead>
                  <TableHead className="text-muted-foreground">Brand / Model</TableHead>
                  <TableHead className="text-muted-foreground">Category</TableHead>
                  <TableHead className="text-muted-foreground">Engine</TableHead>
                  <TableHead className="text-muted-foreground">Power</TableHead>
                  <TableHead className="text-muted-foreground">Price</TableHead>
                  <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((m) => (
                  <TableRow key={m.id} className="border-border hover:bg-secondary/50">
                    <TableCell>
                      <img src={m.images[0]} alt={m.model} className="w-16 h-12 object-cover rounded-lg" />
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-foreground">{m.brand}</p>
                      <p className="text-sm text-muted-foreground">{m.model}</p>
                    </TableCell>
                    <TableCell className="capitalize text-muted-foreground">{m.category}</TableCell>
                    <TableCell className="text-muted-foreground">{m.engine_cc}cc</TableCell>
                    <TableCell className="text-muted-foreground">{m.power_hp} HP</TableCell>
                    <TableCell className="font-medium text-foreground">${m.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost" onClick={() => setEditingMotorcycle(m)}>
                          <Pencil className="w-4 h-4 text-primary" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => setDeletingId(m.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">No motorcycles found</div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Add New Motorcycle</DialogTitle></DialogHeader>
          <MotorcycleForm onSubmit={handleAdd} onCancel={() => setIsAddOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingMotorcycle} onOpenChange={() => setEditingMotorcycle(null)}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Edit Motorcycle</DialogTitle></DialogHeader>
          {editingMotorcycle && (
            <MotorcycleForm motorcycle={editingMotorcycle} onSubmit={handleUpdate} onCancel={() => setEditingMotorcycle(null)} />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Motorcycle?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Admin;
