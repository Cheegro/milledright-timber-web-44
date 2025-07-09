
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const BlogCategoryManager = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  
  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);
  
  // Fetch categories from the database
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: 'Error',
        description: 'Failed to load categories',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Create a new category
  const createCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    try {
      // Generate slug from name
      const slug = newCategoryName.trim().toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
      
      const { data, error } = await supabase
        .from('blog_categories')
        .insert([{ name: newCategoryName.trim(), slug }])
        .select();
      
      if (error) throw error;
      
      setCategories([...categories, data[0]]);
      setNewCategoryName('');
      toast({
        title: 'Success',
        description: 'Category created successfully',
      });
    } catch (error) {
      console.error('Error creating category:', error);
      toast({
        title: 'Error',
        description: 'Failed to create category',
        variant: 'destructive',
      });
    }
  };
  
  // Update an existing category
  const updateCategory = async () => {
    if (!editingCategory || !editingCategory.name.trim()) return;
    
    try {
      const { error } = await supabase
        .from('blog_categories')
        .update({ name: editingCategory.name.trim() })
        .eq('id', editingCategory.id);
      
      if (error) throw error;
      
      // Update local state
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? editingCategory : cat
      ));
      
      setEditingCategory(null);
      setOpen(false);
      
      toast({
        title: 'Success',
        description: 'Category updated successfully',
      });
    } catch (error) {
      console.error('Error updating category:', error);
      toast({
        title: 'Error',
        description: 'Failed to update category',
        variant: 'destructive',
      });
    }
  };
  
  // Delete a category
  const deleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? This may affect blog posts using this category.')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('blog_categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setCategories(categories.filter(cat => cat.id !== id));
      
      toast({
        title: 'Success',
        description: 'Category deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete category',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold">Blog Categories</h2>
        <div className="flex gap-2">
          <Input
            className="w-64"
            placeholder="New category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createCategory()}
          />
          <Button onClick={createCategory} className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown">
            Add Category
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-4">Loading categories...</TableCell>
              </TableRow>
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-4">No categories found.</TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog open={open && editingCategory?.id === category.id} onOpenChange={
                        (o) => {
                          setOpen(o);
                          if (!o) setEditingCategory(null);
                        }
                      }>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setEditingCategory(category);
                              setOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                            <DialogDescription>
                              Update the category name below.
                            </DialogDescription>
                          </DialogHeader>
                          <Input 
                            value={editingCategory?.name || ''}
                            onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                            className="mt-4"
                          />
                          <DialogFooter className="mt-4">
                            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button onClick={updateCategory}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => deleteCategory(category.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BlogCategoryManager;
