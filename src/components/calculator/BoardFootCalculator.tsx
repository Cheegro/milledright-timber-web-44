
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Plus, Trash2, Download, History, Eye, Save } from 'lucide-react';

interface BoardCalculation {
  id: number;
  length: number;
  lengthUnit: string;
  width: number;
  widthUnit: string;
  thickness: number;
  thicknessUnit: string;
  quantity: number;
  boardFeet: number;
}

interface CalculationHistory {
  id: string;
  timestamp: Date;
  calculations: BoardCalculation[];
  totalBoardFeet: number;
  totalPrice: number;
  pricePerBoardFoot: number;
}

const BoardFootCalculator = () => {
  const [calculations, setCalculations] = useState<BoardCalculation[]>([
    { 
      id: 1, 
      length: 0, 
      lengthUnit: 'ft',
      width: 0, 
      widthUnit: 'in',
      thickness: 0, 
      thicknessUnit: 'in',
      quantity: 1, 
      boardFeet: 0 
    }
  ]);
  const [pricePerBoardFoot, setPricePerBoardFoot] = useState<number>(0);
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showVisualization, setShowVisualization] = useState(true);

  const convertToInches = (value: number, unit: string): number => {
    switch (unit) {
      case 'ft':
        return value * 12;
      case 'in':
        return value;
      default:
        return value;
    }
  };

  const calculateBoardFeet = (length: number, lengthUnit: string, width: number, widthUnit: string, thickness: number, thicknessUnit: string, quantity: number): number => {
    const lengthInInches = convertToInches(length, lengthUnit);
    const widthInInches = convertToInches(width, widthUnit);
    const thicknessInInches = convertToInches(thickness, thicknessUnit);
    
    return (lengthInInches * widthInInches * thicknessInInches * quantity) / 144;
  };

  const updateCalculation = (id: number, field: keyof BoardCalculation, value: number | string) => {
    setCalculations(prev => prev.map(calc => {
      if (calc.id === id) {
        const updated = { ...calc, [field]: value };
        if (field !== 'boardFeet') {
          updated.boardFeet = calculateBoardFeet(
            updated.length, 
            updated.lengthUnit,
            updated.width, 
            updated.widthUnit,
            updated.thickness, 
            updated.thicknessUnit,
            updated.quantity
          );
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
      lengthUnit: 'ft',
      width: 0, 
      widthUnit: 'in',
      thickness: 0, 
      thicknessUnit: 'in',
      quantity: 1, 
      boardFeet: 0 
    }]);
  };

  const removeCalculation = (id: number) => {
    if (calculations.length > 1) {
      setCalculations(prev => prev.filter(calc => calc.id !== id));
    }
  };

  const saveToHistory = () => {
    if (totalBoardFeet > 0) {
      const newEntry: CalculationHistory = {
        id: Date.now().toString(),
        timestamp: new Date(),
        calculations: [...calculations],
        totalBoardFeet,
        totalPrice,
        pricePerBoardFoot
      };
      setHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
    }
  };

  const exportCalculation = () => {
    const data = {
      calculations,
      totalBoardFeet,
      totalPrice: pricePerBoardFoot > 0 ? totalPrice : null,
      pricePerBoardFoot: pricePerBoardFoot > 0 ? pricePerBoardFoot : null,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `board-feet-calculation-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const totalBoardFeet = calculations.reduce((sum, calc) => sum + calc.boardFeet, 0);
  const totalPrice = totalBoardFeet * pricePerBoardFoot;

  // Visual representation of lumber
  const LumberVisualization = ({ calc }: { calc: BoardCalculation }) => {
    const scale = 0.1;
    const maxWidth = 200;
    const maxHeight = 150;
    
    const lengthInInches = convertToInches(calc.length, calc.lengthUnit);
    const widthInInches = convertToInches(calc.width, calc.widthUnit);
    const thicknessInInches = convertToInches(calc.thickness, calc.thicknessUnit);
    
    const visualWidth = Math.min(lengthInInches * scale, maxWidth);
    const visualHeight = Math.min(widthInInches * scale, maxHeight);
    const visualThickness = Math.max(thicknessInInches * 2, 4);
    
    if (lengthInInches === 0 || widthInInches === 0 || thicknessInInches === 0) {
      return (
        <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          <span className="text-sm">Enter dimensions to see visualization</span>
        </div>
      );
    }
    
    return (
      <div className="w-full h-32 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg flex items-center justify-center relative overflow-hidden">
        <div 
          className="bg-gradient-to-br from-amber-700 to-amber-900 rounded shadow-lg border border-amber-800"
          style={{
            width: `${Math.max(visualWidth, 20)}px`,
            height: `${Math.max(visualHeight, 20)}px`,
            boxShadow: `${visualThickness}px ${visualThickness}px 0 rgba(146, 64, 14, 0.3)`
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-amber-600 to-amber-800 rounded opacity-80"></div>
        </div>
        <div className="absolute bottom-2 right-2 text-xs text-amber-800 font-semibold bg-white/80 px-2 py-1 rounded">
          {calc.boardFeet.toFixed(2)} BF
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Main Calculator Card */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-sawmill-dark-brown to-sawmill-medium-brown text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calculator className="h-6 w-6 text-sawmill-orange" />
              <span className="text-xl font-bold">Professional Board Foot Calculator</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowVisualization(!showVisualization)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Eye className="h-4 w-4 mr-1" />
                {showVisualization ? 'Hide' : 'Show'} Visual
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <History className="h-4 w-4 mr-1" />
                History
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={saveToHistory}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportCalculation}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          {calculations.map((calc, index) => (
            <div key={calc.id} className="p-6 border-2 border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50 hover:border-sawmill-orange/30 transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-bold text-sawmill-dark-brown">Piece #{index + 1}</h4>
                {calculations.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeCalculation(calc.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Fields */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Length */}
                    <div className="space-y-2">
                      <Label htmlFor={`length-${calc.id}`} className="text-sm font-semibold text-gray-700">Length</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`length-${calc.id}`}
                          type="number"
                          min="0"
                          step="0.25"
                          value={calc.length || ''}
                          onChange={(e) => updateCalculation(calc.id, 'length', parseFloat(e.target.value) || 0)}
                          placeholder="8"
                          className="flex-1 border-gray-300 focus:border-sawmill-orange focus:ring-sawmill-orange"
                        />
                        <Select 
                          value={calc.lengthUnit} 
                          onValueChange={(value) => updateCalculation(calc.id, 'lengthUnit', value)}
                        >
                          <SelectTrigger className="w-16 border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ft">ft</SelectItem>
                            <SelectItem value="in">in</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Width */}
                    <div className="space-y-2">
                      <Label htmlFor={`width-${calc.id}`} className="text-sm font-semibold text-gray-700">Width</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`width-${calc.id}`}
                          type="number"
                          min="0"
                          step="0.25"
                          value={calc.width || ''}
                          onChange={(e) => updateCalculation(calc.id, 'width', parseFloat(e.target.value) || 0)}
                          placeholder="6"
                          className="flex-1 border-gray-300 focus:border-sawmill-orange focus:ring-sawmill-orange"
                        />
                        <Select 
                          value={calc.widthUnit} 
                          onValueChange={(value) => updateCalculation(calc.id, 'widthUnit', value)}
                        >
                          <SelectTrigger className="w-16 border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ft">ft</SelectItem>
                            <SelectItem value="in">in</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Thickness */}
                    <div className="space-y-2">
                      <Label htmlFor={`thickness-${calc.id}`} className="text-sm font-semibold text-gray-700">Thickness</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`thickness-${calc.id}`}
                          type="number"
                          min="0"
                          step="0.125"
                          value={calc.thickness || ''}
                          onChange={(e) => updateCalculation(calc.id, 'thickness', parseFloat(e.target.value) || 0)}
                          placeholder="1"
                          className="flex-1 border-gray-300 focus:border-sawmill-orange focus:ring-sawmill-orange"
                        />
                        <Select 
                          value={calc.thicknessUnit} 
                          onValueChange={(value) => updateCalculation(calc.id, 'thicknessUnit', value)}
                        >
                          <SelectTrigger className="w-16 border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in">in</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Quantity */}
                    <div className="space-y-2">
                      <Label htmlFor={`quantity-${calc.id}`} className="text-sm font-semibold text-gray-700">Quantity</Label>
                      <Input
                        id={`quantity-${calc.id}`}
                        type="number"
                        min="1"
                        value={calc.quantity || 1}
                        onChange={(e) => updateCalculation(calc.id, 'quantity', parseInt(e.target.value) || 1)}
                        className="border-gray-300 focus:border-sawmill-orange focus:ring-sawmill-orange"
                      />
                    </div>
                  </div>
                  
                  {/* Board Feet Result */}
                  <div className="bg-gradient-to-r from-sawmill-orange/10 to-sawmill-auburn/10 p-4 rounded-lg border border-sawmill-orange/20">
                    <Label className="text-sm font-semibold text-sawmill-dark-brown">Board Feet Result</Label>
                    <div className="text-2xl font-bold text-sawmill-dark-brown mt-1">
                      {calc.boardFeet.toFixed(2)} BF
                    </div>
                  </div>
                </div>
                
                {/* Visualization */}
                {showVisualization && (
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Visual Representation</Label>
                    <LumberVisualization calc={calc} />
                  </div>
                )}
              </div>
            </div>
          ))}
          
          <Button
            onClick={addCalculation}
            variant="outline"
            className="w-full border-2 border-dashed border-sawmill-orange/50 hover:border-sawmill-orange hover:bg-sawmill-orange/5 text-sawmill-dark-brown font-semibold py-3"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Another Piece
          </Button>
          
          {/* Summary Section */}
          <div className="border-t-2 border-gray-200 pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label htmlFor="price-per-bf" className="text-lg font-semibold text-gray-700">Price per Board Foot (Optional)</Label>
                <Input
                  id="price-per-bf"
                  type="number"
                  min="0"
                  step="0.01"
                  value={pricePerBoardFoot || ''}
                  onChange={(e) => setPricePerBoardFoot(parseFloat(e.target.value) || 0)}
                  placeholder="5.50"
                  className="text-lg p-4 border-gray-300 focus:border-sawmill-orange focus:ring-sawmill-orange"
                />
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-sawmill-dark-brown to-sawmill-medium-brown text-white p-6 rounded-xl">
                  <div className="flex justify-between items-center text-xl font-bold mb-2">
                    <span>Total Board Feet:</span>
                    <span className="text-sawmill-orange">{totalBoardFeet.toFixed(2)} BF</span>
                  </div>
                  {pricePerBoardFoot > 0 && (
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Estimated Cost:</span>
                      <span className="text-sawmill-orange">${totalPrice.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Panel */}
      {showHistory && history.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-sawmill-orange" />
              Calculation History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {history.map((entry) => (
                <div key={entry.id} className="p-3 bg-gray-50 rounded-lg border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {entry.timestamp.toLocaleDateString()} {entry.timestamp.toLocaleTimeString()}
                    </span>
                    <span className="font-semibold text-sawmill-dark-brown">
                      {entry.totalBoardFeet.toFixed(2)} BF
                      {entry.totalPrice > 0 && ` - $${entry.totalPrice.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {entry.calculations.length} piece{entry.calculations.length !== 1 ? 's' : ''}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BoardFootCalculator;
