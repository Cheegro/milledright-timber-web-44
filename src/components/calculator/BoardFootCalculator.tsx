
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Plus, Trash2, FileText } from 'lucide-react';
import jsPDF from 'jspdf';

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

  const formatDimensions = (calc: BoardCalculation): string => {
    const length = calc.lengthUnit === 'ft' ? `${calc.length}'` : `${calc.length}"`;
    const width = calc.widthUnit === 'ft' ? `${calc.width}'` : `${calc.width}"`;
    const thickness = `${calc.thickness}"`;
    return `${length} × ${width} × ${thickness}`;
  };

  const generateProfessionalPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    let currentY = 30;

    // Header with company branding
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(101, 67, 33); // Sawmill brown color
    doc.text('MILLEDRIGHT SAWMILL', pageWidth / 2, currentY, { align: 'center' });
    
    currentY += 10;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('16720 Hwy 48, Whitchurch-Stouffville, ON', pageWidth / 2, currentY, { align: 'center' });
    
    currentY += 8;
    doc.text('Phone: (905) 555-0123 | Email: info@milledright.com', pageWidth / 2, currentY, { align: 'center' });

    // Horizontal line
    currentY += 15;
    doc.setDrawColor(101, 67, 33);
    doc.setLineWidth(0.8);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    
    currentY += 20;

    // Receipt header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('LUMBER CALCULATION RECEIPT', pageWidth / 2, currentY, { align: 'center' });
    
    currentY += 20;

    // Date and receipt info
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    doc.text(`Date: ${dateString}`, margin, currentY);
    doc.text(`Receipt #: BF-${Date.now().toString().slice(-6)}`, pageWidth - margin, currentY, { align: 'right' });
    
    currentY += 25;

    // Table header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, currentY - 8, pageWidth - 2 * margin, 12, 'F');
    
    const colWidths = [15, 45, 25, 20, 25, 30];
    const colX = [margin + 5];
    for (let i = 1; i < colWidths.length; i++) {
      colX.push(colX[i-1] + colWidths[i-1]);
    }

    doc.text('#', colX[0], currentY);
    doc.text('DIMENSIONS', colX[1], currentY);
    doc.text('QTY', colX[2], currentY);
    doc.text('UNIT BF', colX[3], currentY);
    doc.text('TOTAL BF', colX[4], currentY);
    if (pricePerBoardFoot > 0) {
      doc.text('SUBTOTAL', colX[5], currentY);
    }

    currentY += 15;

    // Table rows
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    
    let itemNumber = 1;
    calculations.forEach((calc) => {
      if (calc.boardFeet > 0) {
        // Draw alternating row background
        if (itemNumber % 2 === 0) {
          doc.setFillColor(248, 248, 248);
          doc.rect(margin, currentY - 6, pageWidth - 2 * margin, 10, 'F');
        }

        doc.setTextColor(0, 0, 0);
        doc.text(itemNumber.toString(), colX[0], currentY);
        doc.text(formatDimensions(calc), colX[1], currentY);
        doc.text(calc.quantity.toString(), colX[2], currentY);
        doc.text((calc.boardFeet / calc.quantity).toFixed(2), colX[3], currentY);
        doc.text(calc.boardFeet.toFixed(2), colX[4], currentY);
        
        if (pricePerBoardFoot > 0) {
          const itemTotal = calc.boardFeet * pricePerBoardFoot;
          doc.text(`$${itemTotal.toFixed(2)}`, colX[5], currentY);
        }
        
        currentY += 12;
        itemNumber++;
      }
    });

    // Summary section
    currentY += 10;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 15;

    // Totals
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    
    const summaryX = pageWidth - 80;
    doc.text('TOTAL BOARD FEET:', summaryX - 50, currentY);
    doc.text(`${totalBoardFeet.toFixed(2)} BF`, summaryX + 20, currentY, { align: 'right' });
    
    if (pricePerBoardFoot > 0) {
      currentY += 12;
      doc.text('PRICE PER BOARD FOOT:', summaryX - 50, currentY);
      doc.text(`$${pricePerBoardFoot.toFixed(2)}`, summaryX + 20, currentY, { align: 'right' });
      
      currentY += 12;
      doc.setFontSize(14);
      doc.setTextColor(101, 67, 33);
      doc.text('TOTAL AMOUNT:', summaryX - 50, currentY);
      doc.text(`$${totalPrice.toFixed(2)}`, summaryX + 20, currentY, { align: 'right' });
    }

    // Footer
    currentY += 30;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('This is an estimate only. Final pricing may vary based on actual measurements and wood selection.', pageWidth / 2, currentY, { align: 'center' });
    
    currentY += 10;
    doc.text('Thank you for choosing MilledRight Sawmill for your lumber needs!', pageWidth / 2, currentY, { align: 'center' });

    // Add a subtle border around the entire receipt
    doc.setDrawColor(101, 67, 33);
    doc.setLineWidth(1.5);
    doc.rect(15, 15, pageWidth - 30, currentY + 15);

    // Save the PDF
    const fileName = `MilledRight-Lumber-Receipt-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  const totalBoardFeet = calculations.reduce((sum, calc) => sum + calc.boardFeet, 0);
  const totalPrice = totalBoardFeet * pricePerBoardFoot;

  return (
    <div className="space-y-6">
      {/* Main Calculator Card */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-sawmill-dark-brown to-sawmill-medium-brown text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calculator className="h-6 w-6 text-sawmill-orange" />
              <span className="text-xl font-bold">Board Foot Calculator</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={generateProfessionalPDF}
              disabled={totalBoardFeet === 0}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
            >
              <FileText className="h-4 w-4 mr-1" />
              Print Receipt
            </Button>
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
    </div>
  );
};

export default BoardFootCalculator;
