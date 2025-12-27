import React from 'react';
import { useForm } from 'react-hook-form';
import { Motorcycle, categories, brands } from '@/data/motorcycles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';

interface MotorcycleFormProps {
  motorcycle?: Motorcycle;
  onSubmit: (data: Omit<Motorcycle, 'id'>) => void;
  onCancel: () => void;
}

const MotorcycleForm: React.FC<MotorcycleFormProps> = ({ motorcycle, onSubmit, onCancel }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: motorcycle ? {
      brand: motorcycle.brand,
      model: motorcycle.model,
      category: motorcycle.category,
      engine_cc: motorcycle.engine_cc,
      engine_type: motorcycle.engine_type,
      power_hp: motorcycle.power_hp,
      torque_nm: motorcycle.torque_nm,
      top_speed: motorcycle.top_speed,
      mileage: motorcycle.mileage,
      fuel_type: motorcycle.fuel_type,
      transmission: motorcycle.transmission,
      price: motorcycle.price,
      country_origin: motorcycle.country_origin,
      launch_year: motorcycle.launch_year,
      images: motorcycle.images.join(', '),
      colors: JSON.stringify(motorcycle.colors),
      variants: JSON.stringify(motorcycle.variants),
      description: motorcycle.description,
      features: motorcycle.features.join(', '),
    } : {
      brand: '',
      model: '',
      category: '',
      engine_cc: 0,
      engine_type: '',
      power_hp: 0,
      torque_nm: 0,
      top_speed: 0,
      mileage: '',
      fuel_type: 'Petrol',
      transmission: '6-speed',
      price: 0,
      country_origin: '',
      launch_year: new Date().getFullYear(),
      images: '',
      colors: '[{"name": "Black", "hex": "#000000"}]',
      variants: '[{"name": "Standard", "price": 0}]',
      description: '',
      features: '',
    }
  });

  const handleFormSubmit = (data: any) => {
    const formattedData: Omit<Motorcycle, 'id'> = {
      brand: data.brand,
      model: data.model,
      category: data.category,
      engine_cc: Number(data.engine_cc),
      engine_type: data.engine_type,
      power_hp: Number(data.power_hp),
      torque_nm: Number(data.torque_nm),
      top_speed: Number(data.top_speed),
      mileage: data.mileage,
      fuel_type: data.fuel_type,
      transmission: data.transmission,
      price: Number(data.price),
      country_origin: data.country_origin,
      launch_year: Number(data.launch_year),
      images: data.images.split(',').map((s: string) => s.trim()).filter(Boolean),
      colors: JSON.parse(data.colors || '[]'),
      variants: JSON.parse(data.variants || '[]'),
      description: data.description,
      features: data.features.split(',').map((s: string) => s.trim()).filter(Boolean),
    };
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Brand</Label>
          <Select defaultValue={watch('brand')} onValueChange={(v) => setValue('brand', v)}>
            <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Select brand" /></SelectTrigger>
            <SelectContent>
              {brands.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Model</Label>
          <Input {...register('model', { required: true })} className="bg-secondary border-border" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Category</Label>
          <Select defaultValue={watch('category')} onValueChange={(v) => setValue('category', v)}>
            <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
              {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Fuel Type</Label>
          <Select defaultValue={watch('fuel_type')} onValueChange={(v) => setValue('fuel_type', v)}>
            <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Petrol">Petrol</SelectItem>
              <SelectItem value="Electric">Electric</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <Label>Engine (cc)</Label>
          <Input type="number" {...register('engine_cc')} className="bg-secondary border-border" />
        </div>
        <div>
          <Label>Power (HP)</Label>
          <Input type="number" {...register('power_hp')} className="bg-secondary border-border" />
        </div>
        <div>
          <Label>Torque (Nm)</Label>
          <Input type="number" {...register('torque_nm')} className="bg-secondary border-border" />
        </div>
        <div>
          <Label>Top Speed</Label>
          <Input type="number" {...register('top_speed')} className="bg-secondary border-border" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Price ($)</Label>
          <Input type="number" {...register('price')} className="bg-secondary border-border" />
        </div>
        <div>
          <Label>Launch Year</Label>
          <Input type="number" {...register('launch_year')} className="bg-secondary border-border" />
        </div>
        <div>
          <Label>Country</Label>
          <Input {...register('country_origin')} className="bg-secondary border-border" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Engine Type</Label>
          <Input {...register('engine_type')} placeholder="e.g., V4, Inline-4" className="bg-secondary border-border" />
        </div>
        <div>
          <Label>Mileage</Label>
          <Input {...register('mileage')} placeholder="e.g., 15-20 km/l" className="bg-secondary border-border" />
        </div>
      </div>

      <div>
        <Label>Image URLs (comma-separated)</Label>
        <Input {...register('images')} className="bg-secondary border-border" />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea {...register('description')} className="bg-secondary border-border" rows={2} />
      </div>

      <div>
        <Label>Features (comma-separated)</Label>
        <Input {...register('features')} placeholder="ABS, Traction Control, Quick Shift" className="bg-secondary border-border" />
      </div>

      <div>
        <Label>Colors (JSON)</Label>
        <Textarea {...register('colors')} className="bg-secondary border-border font-mono text-xs" rows={2} />
      </div>

      <div>
        <Label>Variants (JSON)</Label>
        <Textarea {...register('variants')} className="bg-secondary border-border font-mono text-xs" rows={2} />
      </div>

      <DialogFooter className="pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" className="bg-primary text-primary-foreground">{motorcycle ? 'Update' : 'Add'} Motorcycle</Button>
      </DialogFooter>
    </form>
  );
};

export default MotorcycleForm;
