
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Pencil, Trash2, Plus, TreePine } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import WoodSpeciesForm from '@/components/admin/WoodSpeciesForm';
import { WoodSpecies, fetchWoodSpecies, createWoodSpecies, updateWoodSpecies, deleteWoodSpecies, CreateWoodSpeciesData } from '@/api/woodSpeciesApi';

const WoodSpeciesAdmin = () => {
  const { toast } = useToast();
  const [species, setSpecies] = useState<WoodSpecies[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSpecies, setEditingSpecies] = useState<WoodSpecies | undefined>();

  useEffect(() => {
    loadSpecies();
  }, []);

  const loadSpecies = async () => {
    try {
      setLoading(true);
      const data = await fetchWoodSpecies();
      setSpecies(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load wood species",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: CreateWoodSpeciesData) => {
    await createWoodSpecies(data);
    await loadSpecies();
    setShowForm(false);
  };

  const handleUpdate = async (data: CreateWoodSpeciesData) => {
    if (editingSpecies) {
      await updateWoodSpecies(editingSpecies.species_id, data);
      await loadSpecies();
      setShowForm(false);
      setEditingSpecies(undefined);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteWoodSpecies(id);
      await loadSpecies();
      toast({
        title: "Success",
        description: "Wood species deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete wood species",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (species: WoodSpecies) => {
    setEditingSpecies(species);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSpecies(undefined);
  };

  if (showForm) {
    return (
      <WoodSpeciesForm
        species={editingSpecies}
        onSubmit={editingSpecies ? handleUpdate : handleCreate}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TreePine className="h-6 w-6 text-sawmill-dark-brown" />
          <h1 className="text-3xl font-bold text-sawmill-dark-brown">Wood Species Management</h1>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Species
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wood Species Database</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading wood species...</div>
          ) : species.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No wood species found. Add your first species to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Common Name</TableHead>
                  <TableHead>Scientific Name</TableHead>
                  <TableHead>Janka Hardness</TableHead>
                  <TableHead>Typical Uses</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {species.map((item) => (
                  <TableRow key={item.species_id}>
                    <TableCell className="font-medium">{item.common_name}</TableCell>
                    <TableCell className="italic">{item.scientific_name || '-'}</TableCell>
                    <TableCell>{item.hardness_janka || '-'}</TableCell>
                    <TableCell>
                      {item.typical_uses?.slice(0, 2).join(', ')}
                      {item.typical_uses && item.typical_uses.length > 2 && '...'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Wood Species</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{item.common_name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(item.species_id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WoodSpeciesAdmin;
