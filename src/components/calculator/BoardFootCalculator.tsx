
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Plus, Trash2 } from 'lucide-react';

interface BoardCalculation {
  id: number;
  length: number;
  width: number;
  thickness: number;
  quantity: number;
  boardFeet: number;
}

const BoardFootCalculator = () => {
  const [calculations, setCalculations] = useState<BoardCalculation[]>([
    { id: 1, length: 0, width: 0, thickness: 0, quantity: 1, boardFeet: 0 }
  ]);
  const [pricePerBoardFoot, setPricePerBoardFoot] = useState<number>(0);

  const calculateBoardFeet = (length: number, width: number, thickness: number, quantity: number): number => {
    // Board Feet = (Length × Width × Thickness) ÷ 144 × Quantity
    return (length * width * thickness * quantity) / 144;
  };

  const updateCalculation = (id: number, field: keyof BoardCalculation, value: number) => {
    setCalculations(prev => prev.map(calc => {
      if (calc.id === id) {
        const updated = { ...calc, [field]: value };
        if (field !== 'boardFeet') {
          updated.boardFeet = calculateBoardFeet(updated.length, updated.width, updated.thickness, updated.quantity);
        }
        return updated;
      }
      return calc;
    }));
  };

  const addCalculation = () => {
    const newId = Math.max(...calculations.map(c => c.id)) + 1;
    setCalculations(prev => [...prev, { 
      id: newId, 
      length: 0, 
      width: 0, 
      thickness: 0, 
      quantity: 1, 
      boardFeet: 0 
    }]);
  };

  const removeCalculation = (id: number) => {
    if (calculations.length > 1) {
      setCalculations(prev => prev.filter(calc => calc.id !== id));
    }
  };

  const totalBoardFeet = calculations.reduce((sum, calc) => sum + calc.boardFeet, 0);
  const totalPrice = totalBoardFeet * pricePerBoardFoot;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-sawmill-orange" />
            Board Foot Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {calculations.map((calc, index) => (
            <div key={calc.id} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold">Piece #{index + 1}</h4>
                {calculations.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeCalculation(calc.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor={`length-${calc.id}`}>Length (inches)</Label>
                  <Input
                    id={`length-${calc.id}`}
                    type="number"
                    min="0"
                    step="0.25"
                    value={calc.length || ''}
                    onChange={(e) => updateCalculation(calc.id, 'length', parseFloat(e.target.value) || 0)}
                    placeholder="96"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`width-${calc.id}`}>Width (inches)</Label>
                  <Input
                    id={`width-${calc.id}`}
                    type="number"
                    min="0"
                    step="0.25"
                    value={calc.width || ''}
                    onChange={(e) => updateCalculation(calc.id, 'width', parseFloat(e.target.value) || 0)}
                    placeholder="6"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`thickness-${calc.id}`}>Thickness (inches)</Label>
                  <Input
                    id={`thickness-${calc.id}`}
                    type="number"
                    min="0"
                    step="0.125"
                    value={calc.thickness || ''}
                    onChange={(e) => updateCalculation(calc.id, 'thickness', parseFloat(e.target.value) || 0)}
                    placeholder="1"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`quantity-${calc.id}`}>Quantity</Label>
                  <Input
                    id={`quantity-${calc.id}`}
                    type="number"
                    min="1"
                    value={calc.quantity || 1}
                    onChange={(e) => updateCalculation(calc.id, 'quantity', parseInt(e.target.value) || 1)}
                  />
                </div>
                
                <div>
                  <Label>Board Feet</Label>
                  <div className="h-10 flex items-center px-3 bg-sawmill-orange/10 border rounded-md font-semibold text-sawmill-dark-brown">
                    {calc.boardFeet.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <Button
            onClick={addCalculation}
            variant="outline"
            className="w-full border-dashed"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Piece
          </Button>
          
          <div className="border-t pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="price-per-bf">Price per Board Foot (Optional)</Label>
                <Input
                  id="price-per-bf"
                  type="number"
                  min="0"
                  step="0.01"
                  value={pricePerBoardFoot || ''}
                  onChange={(e) => setPricePerBoardFoot(parseFloat(e.target.value) || 0)}
                  placeholder="5.50"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Board Feet:</span>
                  <span className="text-sawmill-orange">{totalBoardFeet.toFixed(2)} BF</span>
                </div>
                {pricePerBoardFoot > 0 && (
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Estimated Cost:</span>
                    <span className="text-sawmill-orange">${totalPrice.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BoardFootCalculator;
