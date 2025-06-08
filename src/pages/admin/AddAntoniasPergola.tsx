
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus, Check } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { addAntoniasPergola } from '@/utils/addAntoniasPergola';

const AddAntoniasPergola = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddProject = async () => {
    try {
      setIsAdding(true);
      await addAntoniasPergola();
      setIsAdded(true);
      toast({
        title: "Project Added Successfully",
        description: "Antonia's Pergola has been added to the customer projects showcase.",
      });
    } catch (error: any) {
      toast({
        title: "Error Adding Project",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-sawmill-dark-brown">
            Add Antonia's Pergola Project
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="/lovable-uploads/6a52ecd5-44a6-42cc-b309-7650be549f3d.png"
                alt="Antonia's Pergola - View 1"
                className="w-full rounded-lg shadow-md"
              />
              <img
                src="/lovable-uploads/2550e733-8563-432e-82a2-5da99c5c7903.png"
                alt="Antonia's Pergola - View 2"
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="space-y-4">
              <img
                src="/lovable-uploads/eb3cb574-ad14-479b-bf33-c2a9616b853a.png"
                alt="Antonia's Pergola - View 3"
                className="w-full rounded-lg shadow-md"
              />
              <img
                src="/lovable-uploads/d3859876-1a91-4338-a8a0-db471a8924b9.png"
                alt="Antonia's Pergola - View 4"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Project Details:</h3>
            <ul className="space-y-1 text-sm">
              <li><strong>Title:</strong> Antonia's Pergola</li>
              <li><strong>Wood Type:</strong> White Pine</li>
              <li><strong>Category:</strong> Outdoor Structures</li>
              <li><strong>Features:</strong> 12x12 supporting beams, traditional lattice work</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleAddProject}
              disabled={isAdding || isAdded}
              className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown"
            >
              {isAdding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isAdded && <Check className="mr-2 h-4 w-4" />}
              {isAdded ? 'Project Added' : 'Add to Customer Projects'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddAntoniasPergola;
