
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Mock data for products
const mockProducts = [
  { 
    id: 1, 
    name: 'LT40 Portable Sawmill', 
    category: 'Portable Sawmills', 
    price: '$8,995',
    status: 'Active',
    date: 'May 10, 2025'
  },
  { 
    id: 2, 
    name: 'LT20 Portable Sawmill', 
    category: 'Portable Sawmills', 
    price: '$4,995',
    status: 'Active',
    date: 'May 2, 2025'
  },
  { 
    id: 3, 
    name: 'Industrial Bandsaw Blades', 
    category: 'Blades', 
    price: '$29.99',
    status: 'Active',
    date: 'May 8, 2025'
  },
  { 
    id: 4, 
    name: 'Log Loading Attachment', 
    category: 'Accessories', 
    price: '$1,295',
    status: 'Active',
    date: 'May 5, 2025'
  },
  { 
    id: 5, 
    name: 'Sawmill Maintenance Kit', 
    category: 'Parts & Maintenance', 
    price: '$149.99',
    status: 'Active',
    date: 'April 28, 2025'
  },
  { 
    id: 6, 
    name: 'HD50 Industrial Mill', 
    category: 'Industrial Mills', 
    price: '$24,995',
    status: 'Draft',
    date: 'April 20, 2025'
  },
  { 
    id: 7, 
    name: 'Blade Sharpening Tool', 
    category: 'Accessories', 
    price: '$89.99',
    status: 'Active',
    date: 'April 15, 2025'
  },
  { 
    id: 8, 
    name: 'Safety Gear Bundle', 
    category: 'Accessories', 
    price: '$129.99',
    status: 'Active',
    date: 'April 10, 2025'
  },
];

const ProductsAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  
  // Filter products based on search query and category
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = currentCategory === 'All' || product.category === currentCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories from products
  const categories = ['All', ...Array.from(new Set(mockProducts.map(p => p.category)))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">Products</h1>
        <Button className="bg-sawmill-orange hover:bg-sawmill-auburn">
          <Link to="/admin/products/new">Add New Product</Link>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex-1">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
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
        <Table>
          <TableCaption>A list of your products.</TableCaption>
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
            {filteredProducts.map(product => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>
                  <Link 
                    to={`/admin/products/${product.id}/edit`}
                    className="text-sawmill-dark-brown hover:underline font-medium"
                  >
                    {product.name}
                  </Link>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.status}
                  </span>
                </TableCell>
                <TableCell>{product.date}</TableCell>
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
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
                          // Handle delete operation here
                          console.log(`Delete product ${product.id}`);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsAdmin;
