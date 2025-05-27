
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { WoodSpecies, CreateWoodSpeciesData } from '@/api/woodSpeciesApi';

interface WoodSpeciesFormProps {
  species?: WoodSpecies;
  onSubmit: (data: CreateWoodSpeciesData) => Promise<void>;
  onCancel: () => void;
}

const WoodSpeciesForm: React.FC<WoodSpeciesFormProps> = ({ species, onSubmit, onCancel }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateWoodSpeciesData>({
    common_name: '',
    scientific_name: '',
    description: '',
    hardness_janka: undefined,
    typical_uses: [],
    workability_notes: '',
    image_representative_grain_url: '',
    sustainability_notes: '',
  });

  useEffect(() => {
    if (species) {
      setFormData({
        common_name: species.common_name,
        scientific_name: species.scientific_name || '',
        description: species.description || '',
        hardness_janka: species.hardness_janka || undefined,
        typical_uses: species.typical_uses || [],
        workability_notes: species.workability_notes || '',
        image_representative_grain_url: species.image_representative_grain_url || '',
        sustainability_notes: species.sustainability_notes || '',
      });
    }
  }, [species]);

  const handleInputChange = (field: keyof CreateWoodSpeciesData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTypicalUsesChange = (value: string) => {
    const uses = value.split(',').map(use => use.trim()).filter(use => use.length > 0);
    handleInputChange('typical_uses', uses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.common_name.trim()) {
      toast({
        title: "Validation Error",
        description: "Common name is required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      toast({
        title: "Success",
        description: `Wood species ${species ? 'updated' : 'created'} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${species ? 'update' : 'create'} wood species`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{species ? 'Edit' : 'Add New'} Wood Species</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="common_name">Common Name *</Label>
              <Input
                id="common_name"
                value={formData.common_name}
                onChange={(e) => handleInputChange('common_name', e.target.value)}
                placeholder="e.g., Black Walnut"
                required
              />
            </div>
            <div>
              <Label htmlFor="scientific_name">Scientific Name</Label>
              <Input
                id="scientific_name"
                value={formData.scientific_name}
                onChange={(e) => handleInputChange('scientific_name', e.target.value)}
                placeholder="e.g., Juglans nigra"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Detailed characteristics, grain patterns, common uses..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hardness_janka">Janka Hardness Rating</Label>
              <Input
                id="hardness_janka"
                type="number"
                value={formData.hardness_janka || ''}
                onChange={(e) => handleInputChange('hardness_janka', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="e.g., 1010"
              />
            </div>
            <div>
              <Label htmlFor="typical_uses">Typical Uses (comma-separated)</Label>
              <Input
                id="typical_uses"
                value={formData.typical_uses?.join(', ') || ''}
                onChange={(e) => handleTypicalUsesChange(e.target.value)}
                placeholder="Furniture, Cabinetry, Gunstocks"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="workability_notes">Workability Notes</Label>
            <Textarea
              id="workability_notes"
              value={formData.workability_notes}
              onChange={(e) => handleInputChange('workability_notes', e.target.value)}
              placeholder="How it mills, sands, finishes..."
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="image_url">Representative Grain Image URL</Label>
            <Input
              id="image_url"
              value={formData.image_representative_grain_url}
              onChange={(e) => handleInputChange('image_representative_grain_url', e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div>
            <Label htmlFor="sustainability_notes">Sustainability Notes</Label>
            <Textarea
              id="sustainability_notes"
              value={formData.sustainability_notes}
              onChange={(e) => handleInputChange('sustainability_notes', e.target.value)}
              placeholder="e.g., Locally abundant, fast-growing"
              rows={2}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown"
            >
              {isSubmitting ? 'Saving...' : (species ? 'Update' : 'Create')} Species
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

export default WoodSpeciesForm;
