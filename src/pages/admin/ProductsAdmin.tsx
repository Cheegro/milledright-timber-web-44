import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Search, Plus, Image } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { fetchProducts, deleteProduct } from '@/api/adminProductApi';
import { addProductsFromUploadedImages } from '@/utils/addProductsFromImages';

const ProductsAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [isAddingImages, setIsAddingImages] = useState(false);
  
  // Fetch products using React Query
  const { data: products = [], isLoading, error, refetch } = useQuery({
    queryKey: ['adminProducts'],
    queryFn: fetchProducts,
  });
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive",
      });
    }
  }, [error]);

  // Get unique categories from products
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category || 'Uncategorized')))];
  
  // Filter products based on search query and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = currentCategory === 'All' || product.category === currentCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle product deletion
  const handleDeleteProduct = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProduct(id);
        toast({
          title: "Success",
          description: `Product "${name}" has been deleted.`,
        });
        // Refresh the product list
        refetch();
      } catch (err) {
        console.error("Error deleting product:", err);
        toast({
          title: "Error",
          description: "Failed to delete product. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  // Handle adding uploaded images as products
  const handleAddUploadedImages = async () => {
    setIsAddingImages(true);
    try {
      const { results, errors } = await addProductsFromUploadedImages();
      
      toast({
        title: 'Images Added as Products',
        description: `Successfully added ${results.length} products from uploaded images`,
      });

      if (errors.length > 0) {
        console.error('Some products failed to add:', errors);
      }

      refetch();
    } catch (error) {
      console.error('Error adding images as products:', error);
      toast({
        title: 'Error',
        description: 'Failed to add images as products',
        variant: 'destructive',
      });
    } finally {
      setIsAddingImages(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">Lumber Products</h1>
        <div className="flex gap-2">
          <Button 
            onClick={handleAddUploadedImages}
            disabled={isAddingImages}
            variant="outline"
            className="flex items-center gap-2"
          >
            {isAddingImages ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Image className="h-4 w-4" />
            )}
            Add Uploaded Images
          </Button>
          <Button className="bg-sawmill-orange hover:bg-sawmill-auburn">
            <Link to="/admin/products/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Lumber
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search lumber products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={currentCategory === category ? "default" : "outline"}
              onClick={() => setCurrentCategory(category)}
              className={currentCategory === category ? "bg-sawmill-dark-brown hover:bg-sawmill-medium-brown" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="rounded-md border">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-sawmill-dark-brown" />
          </div>
        ) : (
          <Table>
            <TableCaption>A list of your lumber products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id.substring(0, 8)}...</TableCell>
                    <TableCell>
                      <Link 
                        to={`/admin/products/${product.id}/edit`}
                        className="text-sawmill-dark-brown hover:underline font-medium"
                      >
                        {product.name}
                      </Link>
                    </TableCell>
                    <TableCell>{product.category || 'Uncategorized'}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        Active
                      </span>
                    </TableCell>
                    <TableCell>{new Date(product.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link 
                          to={`/admin/products/${product.id}/edit`}
                          className="text-sawmill-orange hover:underline text-sm"
                        >
                          Edit
                        </Link>
                        <button 
                          className="text-red-500 hover:underline text-sm"
                          onClick={() => handleDeleteProduct(product.id, product.name)}
                        >
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ProductsAdmin;
