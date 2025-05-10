
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

// Mock data for lumber products
const mockProducts = [
  { 
    id: 1, 
    name: 'Walnut Live Edge Slab', 
    category: 'Live Edge Slabs', 
    price: '$95/board ft',
    status: 'Active',
    date: 'May 10, 2025'
  },
  { 
    id: 2, 
    name: 'Maple Live Edge Slab', 
    category: 'Live Edge Slabs', 
    price: '$85/board ft',
    status: 'Active',
    date: 'May 2, 2025'
  },
  { 
    id: 3, 
    name: 'Oak Live Edge Slab', 
    category: 'Live Edge Slabs', 
    price: '$75/board ft',
    status: 'Active',
    date: 'May 8, 2025'
  },
  { 
    id: 4, 
    name: 'Cherry Live Edge Slab', 
    category: 'Live Edge Slabs', 
    price: '$90/board ft',
    status: 'Active',
    date: 'May 5, 2025'
  },
  { 
    id: 5, 
    name: 'Ash Live Edge Slab', 
    category: 'Live Edge Slabs', 
    price: '$70/board ft',
    status: 'Active',
    date: 'April 28, 2025'
  },
  { 
    id: 6, 
    name: 'Hickory Live Edge Slab', 
    category: 'Live Edge Slabs', 
    price: '$85/board ft',
    status: 'Draft',
    date: 'April 20, 2025'
  },
  { 
    id: 7, 
    name: 'Elm Live Edge Slab', 
    category: 'Live Edge Slabs', 
    price: '$80/board ft',
    status: 'Active',
    date: 'April 15, 2025'
  },
  { 
    id: 8, 
    name: 'Spalted Maple Live Edge', 
    category: 'Live Edge Slabs', 
    price: '$110/board ft',
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
        <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">Lumber Products</h1>
        <Button className="bg-sawmill-orange hover:bg-sawmill-auburn">
          <Link to="/admin/products/new">Add New Lumber</Link>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex-1">
          <Input
            placeholder="Search lumber products..."
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
