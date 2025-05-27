
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { LogStock, CreateLogStockData } from '@/api/logStockApi';
import { WoodSpecies, fetchWoodSpecies } from '@/api/woodSpeciesApi';

interface LogStockFormProps {
  logStock?: LogStock;
  onSubmit: (data: CreateLogStockData) => Promise<void>;
  onCancel: () => void;
}

const LogStockForm: React.FC<LogStockFormProps> = ({ logStock, onSubmit, onCancel }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [woodSpecies, setWoodSpecies] = useState<WoodSpecies[]>([]);
  const [formData, setFormData] = useState<CreateLogStockData>({
    species_id: 0,
    date_acquired: '',
    source_location_text: '',
    source_location_gis_latitude: undefined,
    source_location_gis_longitude: undefined,
    diameter_at_base_inches: undefined,
    length_feet: undefined,
    estimated_yield_board_feet: undefined,
    moisture_content_initial: undefined,
    date_milled_into_slabs: '',
    storage_location_in_yard: '',
    story_of_origin: '',
    acquisition_cost: undefined,
    supplier_notes: '',
  });

  useEffect(() => {
    loadWoodSpecies();
  }, []);

  useEffect(() => {
    if (logStock) {
      setFormData({
        species_id: logStock.species_id,
        date_acquired: logStock.date_acquired,
        source_location_text: logStock.source_location_text || '',
        source_location_gis_latitude: logStock.source_location_gis_latitude,
        source_location_gis_longitude: logStock.source_location_gis_longitude,
        diameter_at_base_inches: logStock.diameter_at_base_inches,
        length_feet: logStock.length_feet,
        estimated_yield_board_feet: logStock.estimated_yield_board_feet,
        moisture_content_initial: logStock.moisture_content_initial,
        date_milled_into_slabs: logStock.date_milled_into_slabs || '',
        storage_location_in_yard: logStock.storage_location_in_yard || '',
        story_of_origin: logStock.story_of_origin || '',
        acquisition_cost: logStock.acquisition_cost,
        supplier_notes: logStock.supplier_notes || '',
      });
    }
  }, [logStock]);

  const loadWoodSpecies = async () => {
    try {
      const species = await fetchWoodSpecies();
      setWoodSpecies(species);
    } catch (error) {
      console.error('Error loading wood species:', error);
      toast({
        title: "Error",
        description: "Failed to load wood species",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof CreateLogStockData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.species_id || !formData.date_acquired) {
      toast({
        title: "Validation Error",
        description: "Species and acquisition date are required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      toast({
        title: "Success",
        description: `Log stock ${logStock ? 'updated' : 'created'} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${logStock ? 'update' : 'create'} log stock`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{logStock ? 'Edit' : 'Add New'} Log Stock Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="species_id">Wood Species *</Label>
              <Select value={formData.species_id.toString()} onValueChange={(value) => handleInputChange('species_id', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select wood species" />
                </SelectTrigger>
                <SelectContent>
                  {woodSpecies.map((species) => (
                    <SelectItem key={species.species_id} value={species.species_id.toString()}>
                      {species.common_name} {species.scientific_name && `(${species.scientific_name})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date_acquired">Date Acquired *</Label>
              <Input
                id="date_acquired"
                type="date"
                value={formData.date_acquired}
                onChange={(e) => handleInputChange('date_acquired', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="source_location_text">Source Location</Label>
            <Input
              id="source_location_text"
              value={formData.source_location_text}
              onChange={(e) => handleInputChange('source_location_text', e.target.value)}
              placeholder="e.g., North Gwillimbury Forest, Lot 12 Concession 5"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="latitude">GPS Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="0.000001"
                value={formData.source_location_gis_latitude || ''}
                onChange={(e) => handleInputChange('source_location_gis_latitude', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="44.123456"
              />
            </div>
            <div>
              <Label htmlFor="longitude">GPS Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="0.000001"
                value={formData.source_location_gis_longitude || ''}
                onChange={(e) => handleInputChange('source_location_gis_longitude', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="-79.123456"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="diameter">Diameter at Base (inches)</Label>
              <Input
                id="diameter"
                type="number"
                step="0.01"
                value={formData.diameter_at_base_inches || ''}
                onChange={(e) => handleInputChange('diameter_at_base_inches', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="24.5"
              />
            </div>
            <div>
              <Label htmlFor="length">Length (feet)</Label>
              <Input
                id="length"
                type="number"
                step="0.01"
                value={formData.length_feet || ''}
                onChange={(e) => handleInputChange('length_feet', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="12.0"
              />
            </div>
            <div>
              <Label htmlFor="yield">Estimated Yield (board feet)</Label>
              <Input
                id="yield"
                type="number"
                value={formData.estimated_yield_board_feet || ''}
                onChange={(e) => handleInputChange('estimated_yield_board_feet', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="150"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="moisture">Initial Moisture Content (%)</Label>
              <Input
                id="moisture"
                type="number"
                step="0.01"
                value={formData.moisture_content_initial || ''}
                onChange={(e) => handleInputChange('moisture_content_initial', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="25.50"
              />
            </div>
            <div>
              <Label htmlFor="milled_date">Date Milled into Slabs</Label>
              <Input
                id="milled_date"
                type="date"
                value={formData.date_milled_into_slabs}
                onChange={(e) => handleInputChange('date_milled_into_slabs', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="storage">Storage Location in Yard</Label>
              <Input
                id="storage"
                value={formData.storage_location_in_yard}
                onChange={(e) => handleInputChange('storage_location_in_yard', e.target.value)}
                placeholder="e.g., Bay 3, Rack D"
              />
            </div>
            <div>
              <Label htmlFor="cost">Acquisition Cost ($)</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                value={formData.acquisition_cost || ''}
                onChange={(e) => handleInputChange('acquisition_cost', e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="250.00"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="story">Story of Origin</Label>
            <Textarea
              id="story"
              value={formData.story_of_origin}
              onChange={(e) => handleInputChange('story_of_origin', e.target.value)}
              placeholder="Rich text field for detailed narrative of the tree/log's history..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="supplier_notes">Supplier Notes</Label>
            <Textarea
              id="supplier_notes"
              value={formData.supplier_notes}
              onChange={(e) => handleInputChange('supplier_notes', e.target.value)}
              placeholder="Additional notes about the supplier or acquisition..."
              rows={3}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown"
            >
              {isSubmitting ? 'Saving...' : (logStock ? 'Update' : 'Create')} Log Stock
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LogStockForm;
