
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Plus, Trash2, FileText, DollarSign } from 'lucide-react';
import jsPDF from 'jspdf';

interface BoardCalculation {
  id: number;
  title: string;
  woodSpecies: string;
  length: number;
  lengthUnit: string;
  width: number;
  widthUnit: string;
  thickness: number;
  thicknessUnit: string;
  quantity: number;
  boardFeet: number;
  customPrice?: number;
  useCustomPrice: boolean;
}

const BoardFootCalculator = () => {
  const [calculations, setCalculations] = useState<BoardCalculation[]>([{
    id: 1,
    title: '',
    woodSpecies: '',
    length: 0,
    lengthUnit: 'ft',
    width: 0,
    widthUnit: 'in',
    thickness: 0,
    thicknessUnit: 'in',
    quantity: 1,
    boardFeet: 0,
    customPrice: undefined,
    useCustomPrice: false
  }]);
  const [defaultPricePerBoardFoot, setDefaultPricePerBoardFoot] = useState<number>(0);

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
    return lengthInInches * widthInInches * thicknessInInches * quantity / 144;
  };

  const updateCalculation = (id: number, field: keyof BoardCalculation, value: number | string | boolean) => {
    setCalculations(prev => prev.map(calc => {
      if (calc.id === id) {
        const updated = {
          ...calc,
          [field]: value
        };
        if (field !== 'boardFeet' && field !== 'customPrice' && field !== 'useCustomPrice' && field !== 'title' && field !== 'woodSpecies') {
          updated.boardFeet = calculateBoardFeet(updated.length, updated.lengthUnit, updated.width, updated.widthUnit, updated.thickness, updated.thicknessUnit, updated.quantity);
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
      title: '',
      woodSpecies: '',
      length: 0,
      lengthUnit: 'ft',
      width: 0,
      widthUnit: 'in',
      thickness: 0,
      thicknessUnit: 'in',
      quantity: 1,
      boardFeet: 0,
      customPrice: undefined,
      useCustomPrice: false
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

  const getItemPrice = (calc: BoardCalculation): number => {
    return calc.useCustomPrice && calc.customPrice ? calc.customPrice : defaultPricePerBoardFoot;
  };

  const generateProfessionalPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 25;
    let currentY = 30;

    // Sophisticated Header
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(32);
    doc.setTextColor(45, 45, 45);
    doc.text('LUMBER CALCULATION', pageWidth / 2, currentY, { align: 'center' });
    
    currentY += 12;
    doc.setFontSize(14);
    doc.setTextColor(120, 120, 120);
    doc.text('Material Estimate & Specifications', pageWidth / 2, currentY, { align: 'center' });
    
    // Elegant minimal line
    currentY += 20;
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(margin + 50, currentY, pageWidth - margin - 50, currentY);
    
    // Document details in clean layout
    currentY += 25;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(90, 90, 90);
    
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const timeString = currentDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Left aligned info
    doc.text(`Document Date: ${dateString}`, margin, currentY);
    doc.text(`Generated: ${timeString}`, margin, currentY + 8);
    doc.text(`Reference: LC-${Date.now().toString().slice(-8)}`, margin, currentY + 16);
    
    currentY += 40;

    // Sophisticated table header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setFillColor(248, 249, 250);
    
    const headerHeight = 12;
    doc.rect(margin, currentY - 8, pageWidth - 2 * margin, headerHeight, 'F');
    
    // Subtle header border
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.3);
    doc.rect(margin, currentY - 8, pageWidth - 2 * margin, headerHeight);
    
    const colWidths = [15, 50, 30, 18, 18, 22, 27];
    const colX = [margin + 5];
    for (let i = 1; i < colWidths.length; i++) {
      colX.push(colX[i - 1] + colWidths[i - 1]);
    }
    
    doc.setTextColor(70, 70, 70);
    doc.text('ITEM', colX[0], currentY - 2);
    doc.text('DESCRIPTION', colX[1], currentY - 2);
    doc.text('DIMENSIONS', colX[2], currentY - 2);
    doc.text('QTY', colX[3], currentY - 2);
    doc.text('BD.FT', colX[4], currentY - 2);
    doc.text('RATE', colX[5], currentY - 2);
    doc.text('AMOUNT', colX[6], currentY - 2);
    
    currentY += 8;

    // Clean table rows
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    let itemNumber = 1;
    
    calculations.forEach(calc => {
      if (calc.boardFeet > 0) {
        const rowHeight = 18;
        
        // Subtle alternating rows
        if (itemNumber % 2 === 0) {
          doc.setFillColor(252, 253, 253);
          doc.rect(margin, currentY - 5, pageWidth - 2 * margin, rowHeight, 'F');
        }
        
        // Very light row borders
        doc.setDrawColor(245, 245, 245);
        doc.setLineWidth(0.2);
        doc.line(margin, currentY + rowHeight - 5, pageWidth - margin, currentY + rowHeight - 5);
        
        doc.setTextColor(60, 60, 60);
        
        // Item number
        doc.text(itemNumber.toString().padStart(2, '0'), colX[0], currentY);
        
        // Description
        let description = '';
        if (calc.title && calc.woodSpecies) {
          description = `${calc.title} - ${calc.woodSpecies}`;
        } else if (calc.title) {
          description = calc.title;
        } else if (calc.woodSpecies) {
          description = calc.woodSpecies;
        } else {
          description = 'Lumber Material';
        }
        
        // Wrap long descriptions
        const descLines = doc.splitTextToSize(description, colWidths[1] - 3);
        doc.text(descLines[0], colX[1], currentY);
        if (descLines.length > 1) {
          doc.setFontSize(8);
          doc.setTextColor(100, 100, 100);
          doc.text(descLines[1], colX[1], currentY + 5);
          doc.setFontSize(9);
          doc.setTextColor(60, 60, 60);
        }
        
        // Dimensions
        doc.text(formatDimensions(calc), colX[2], currentY);
        
        // Quantity
        doc.text(calc.quantity.toString(), colX[3], currentY);
        
        // Board feet
        doc.text(calc.boardFeet.toFixed(2), colX[4], currentY);
        
        // Rate and amount
        const itemPrice = getItemPrice(calc);
        if (itemPrice > 0) {
          doc.text(`$${itemPrice.toFixed(2)}`, colX[5], currentY);
          const itemTotal = calc.boardFeet * itemPrice;
          doc.setFont('helvetica', 'bold');
          doc.text(`$${itemTotal.toFixed(2)}`, colX[6], currentY);
          doc.setFont('helvetica', 'normal');
        } else {
          doc.setTextColor(150, 150, 150);
          doc.text('--', colX[5], currentY);
          doc.text('--', colX[6], currentY);
          doc.setTextColor(60, 60, 60);
        }
        
        currentY += rowHeight;
        itemNumber++;
      }
    });

    // Sophisticated summary section
    currentY += 20;
    
    // Clean separator line
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 25;

    // Summary box with clean design
    const summaryBoxY = currentY;
    const summaryBoxWidth = 75;
    const summaryBoxHeight = 45;
    
    // Clean box with subtle shadow effect
    doc.setFillColor(250, 250, 250);
    doc.rect(pageWidth - margin - summaryBoxWidth, summaryBoxY, summaryBoxWidth, summaryBoxHeight, 'F');
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.5);
    doc.rect(pageWidth - margin - summaryBoxWidth, summaryBoxY, summaryBoxWidth, summaryBoxHeight);

    // Summary content
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(90, 90, 90);
    doc.text('Total Board Feet:', pageWidth - margin - summaryBoxWidth + 8, summaryBoxY + 15);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(45, 45, 45);
    doc.text(`${totalBoardFeet.toFixed(2)} BF`, pageWidth - margin - 8, summaryBoxY + 15, { align: 'right' });

    if (totalPrice > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(90, 90, 90);
      doc.text('Estimated Total:', pageWidth - margin - summaryBoxWidth + 8, summaryBoxY + 30);
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(45, 45, 45);
      doc.text(`$${totalPrice.toFixed(2)}`, pageWidth - margin - 8, summaryBoxY + 30, { align: 'right' });
    }

    // Minimal footer with disclaimer
    const footerY = pageHeight - 30;
    
    // Disclaimer in small, subtle text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(160, 160, 160);
    doc.text('This calculation is provided for estimation purposes only. Actual requirements may vary.', pageWidth / 2, footerY, { align: 'center' });
    doc.text('Please verify all measurements and specifications independently before procurement.', pageWidth / 2, footerY + 6, { align: 'center' });

    // Clean page border
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.8);
    doc.rect(20, 20, pageWidth - 40, pageHeight - 40);

    // Save with clean filename
    const fileName = `Lumber-Calculation-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  const totalBoardFeet = calculations.reduce((sum, calc) => sum + calc.boardFeet, 0);
  const totalPrice = calculations.reduce((sum, calc) => {
    const itemPrice = getItemPrice(calc);
    return sum + (calc.boardFeet * itemPrice);
  }, 0);

  return (
    <div className="space-y-6 px-4 lg:px-0">
      {/* Main Calculator Card */}
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 relative overflow-hidden">
        {/* Renegade accent lines */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-red-600/10 to-transparent rounded-full -mb-16 -mr-16"></div>
        
        <CardHeader className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white rounded-t-lg relative overflow-hidden">
          {/* Industrial grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 20px,
                rgba(255,255,255,0.1) 20px,
                rgba(255,255,255,0.1) 21px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 20px,
                rgba(255,255,255,0.1) 20px,
                rgba(255,255,255,0.1) 21px
              )`
            }}></div>
          </div>
          
          <CardTitle className="flex flex-col lg:flex-row items-start lg:items-center justify-between relative z-10 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg">
                <Calculator className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <div>
                <span className="text-lg lg:text-xl font-bold tracking-wide">BOARD FOOT CALCULATOR</span>
                <div className="text-xs lg:text-sm text-red-300 font-mono tracking-wider">PRECISION LUMBER CALCULATIONS</div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={generateProfessionalPDF}
              disabled={totalBoardFeet === 0}
              className="bg-gradient-to-r from-red-600 to-orange-600 border-red-400 text-white hover:from-red-700 hover:to-orange-700 disabled:opacity-50 font-bold shadow-lg transform hover:scale-105 transition-all duration-200 w-full lg:w-auto"
            >
              <FileText className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">EXPORT QUOTE</span>
              <span className="sm:hidden">EXPORT</span>
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 p-4 lg:p-8 relative">
          {calculations.map((calc, index) => (
            <div key={calc.id} className="p-4 lg:p-6 border-2 border-gray-300 rounded-xl bg-gradient-to-br from-white via-gray-50 to-gray-100 hover:border-red-400 transition-all duration-300 shadow-lg relative overflow-hidden">
              {/* Industrial corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 lg:w-8 lg:h-8 border-l-4 border-t-4 border-red-500"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 lg:w-8 lg:h-8 border-r-4 border-b-4 border-orange-500"></div>
              
              <div className="flex justify-between items-center mb-4 lg:mb-6">
                <h4 className="text-base lg:text-lg font-bold text-gray-900 tracking-wide">LUMBER PIECE #{index + 1}</h4>
                {calculations.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeCalculation(calc.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300 font-bold"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="space-y-4">
                {/* Title and Wood Species */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${calc.id}`} className="text-sm font-bold text-gray-700 tracking-wide">ITEM TITLE</Label>
                    <Input
                      id={`title-${calc.id}`}
                      type="text"
                      value={calc.title}
                      onChange={(e) => updateCalculation(calc.id, 'title', e.target.value)}
                      placeholder="e.g., Table Top, Beam, Plank"
                      className="border-2 border-gray-400 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`species-${calc.id}`} className="text-sm font-bold text-gray-700 tracking-wide">WOOD SPECIES</Label>
                    <Input
                      id={`species-${calc.id}`}
                      type="text"
                      value={calc.woodSpecies}
                      onChange={(e) => updateCalculation(calc.id, 'woodSpecies', e.target.value)}
                      placeholder="e.g., Oak, Maple, Pine"
                      className="border-2 border-gray-400 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Length */}
                  <div className="space-y-2">
                    <Label htmlFor={`length-${calc.id}`} className="text-sm font-bold text-gray-700 tracking-wide">LENGTH</Label>
                    <div className="flex gap-2">
                      <Input
                        id={`length-${calc.id}`}
                        type="number"
                        min="0"
                        step="0.25"
                        value={calc.length || ''}
                        onChange={(e) => updateCalculation(calc.id, 'length', parseFloat(e.target.value) || 0)}
                        placeholder="8"
                        className="flex-1 border-2 border-gray-400 focus:border-red-500 focus:ring-red-500 font-mono text-base"
                      />
                      <Select value={calc.lengthUnit} onValueChange={(value) => updateCalculation(calc.id, 'lengthUnit', value)}>
                        <SelectTrigger className="w-16 border-2 border-gray-400 font-bold">
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
                    <Label htmlFor={`width-${calc.id}`} className="text-sm font-bold text-gray-700 tracking-wide">WIDTH</Label>
                    <div className="flex gap-2">
                      <Input
                        id={`width-${calc.id}`}
                        type="number"
                        min="0"
                        step="0.25"
                        value={calc.width || ''}
                        onChange={(e) => updateCalculation(calc.id, 'width', parseFloat(e.target.value) || 0)}
                        placeholder="6"
                        className="flex-1 border-2 border-gray-400 focus:border-red-500 focus:ring-red-500 font-mono text-base"
                      />
                      <Select value={calc.widthUnit} onValueChange={(value) => updateCalculation(calc.id, 'widthUnit', value)}>
                        <SelectTrigger className="w-16 border-2 border-gray-400 font-bold">
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
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Thickness */}
                  <div className="space-y-2">
                    <Label htmlFor={`thickness-${calc.id}`} className="text-sm font-bold text-gray-700 tracking-wide">THICKNESS</Label>
                    <div className="flex gap-2">
                      <Input
                        id={`thickness-${calc.id}`}
                        type="number"
                        min="0"
                        step="0.125"
                        value={calc.thickness || ''}
                        onChange={(e) => updateCalculation(calc.id, 'thickness', parseFloat(e.target.value) || 0)}
                        placeholder="1"
                        className="flex-1 border-2 border-gray-400 focus:border-red-500 focus:ring-red-500 font-mono text-base"
                      />
                      <Select value={calc.thicknessUnit} onValueChange={(value) => updateCalculation(calc.id, 'thicknessUnit', value)}>
                        <SelectTrigger className="w-16 border-2 border-gray-400 font-bold">
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
                    <Label htmlFor={`quantity-${calc.id}`} className="text-sm font-bold text-gray-700 tracking-wide">QUANTITY</Label>
                    <Input
                      id={`quantity-${calc.id}`}
                      type="number"
                      min="1"
                      value={calc.quantity || 1}
                      onChange={(e) => updateCalculation(calc.id, 'quantity', parseInt(e.target.value) || 1)}
                      className="border-2 border-gray-400 focus:border-red-500 focus:ring-red-500 font-mono text-base"
                    />
                  </div>
                </div>

                {/* Custom Pricing Option */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm font-bold text-gray-700 tracking-wide flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      CUSTOM PRICING FOR THIS ITEM
                    </Label>
                    <Button
                      type="button"
                      variant={calc.useCustomPrice ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateCalculation(calc.id, 'useCustomPrice', !calc.useCustomPrice)}
                      className={calc.useCustomPrice ? "bg-blue-600 hover:bg-blue-700" : "border-blue-300 text-blue-600 hover:bg-blue-50"}
                    >
                      {calc.useCustomPrice ? 'ENABLED' : 'ENABLE'}
                    </Button>
                  </div>
                  {calc.useCustomPrice && (
                    <div className="space-y-2">
                      <Label htmlFor={`custom-price-${calc.id}`} className="text-xs text-gray-600">Price per Board Foot for this item</Label>
                      <Input
                        id={`custom-price-${calc.id}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={calc.customPrice || ''}
                        onChange={(e) => updateCalculation(calc.id, 'customPrice', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                        className="border-2 border-blue-300 focus:border-blue-500 focus:ring-blue-500 font-mono"
                      />
                    </div>
                  )}
                </div>
                
                {/* Board Feet Result */}
                <div className="bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 p-4 rounded-lg border-2 border-red-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5"></div>
                  <Label className="text-sm font-bold text-gray-900 tracking-wide relative z-10">CALCULATED BOARD FEET</Label>
                  <div className="text-2xl lg:text-3xl font-black text-gray-900 mt-1 font-mono tracking-wider relative z-10">
                    {calc.boardFeet.toFixed(2)} <span className="text-lg lg:text-xl text-red-600">BF</span>
                  </div>
                  {(calc.useCustomPrice && calc.customPrice) || (!calc.useCustomPrice && defaultPricePerBoardFoot > 0) ? (
                    <div className="text-sm text-gray-700 mt-2 relative z-10">
                      @ ${getItemPrice(calc).toFixed(2)}/BF = <span className="font-bold text-green-700">${(calc.boardFeet * getItemPrice(calc)).toFixed(2)}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
          
          <Button
            onClick={addCalculation}
            variant="outline"
            className="w-full border-2 border-dashed border-red-400 hover:border-red-600 py-4 text-base tracking-wide transform hover:scale-[1.02] transition-all duration-200 lg:text-xl text-slate-50 rounded-full font-normal bg-slate-900 hover:bg-slate-800"
          >
            <Plus className="h-5 w-5 mr-2 text-red-600" />
            ADD ANOTHER PIECE
          </Button>
          
          {/* Summary Section */}
          <div className="border-t-4 border-gray-900 pt-6 lg:pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-4">
                <Label htmlFor="default-price-per-bf" className="text-base lg:text-lg font-bold text-gray-700 tracking-wide">DEFAULT PRICE PER BOARD FOOT</Label>
                <Input
                  id="default-price-per-bf"
                  type="number"
                  min="0"
                  step="0.01"
                  value={defaultPricePerBoardFoot || ''}
                  onChange={(e) => setDefaultPricePerBoardFoot(parseFloat(e.target.value) || 0)}
                  placeholder="5.50"
                  className="text-base lg:text-lg p-3 lg:p-4 border-2 border-gray-400 focus:border-red-500 focus:ring-red-500 font-mono"
                />
                <p className="text-xs text-gray-500">This applies to items without custom pricing enabled</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-4 lg:p-6 rounded-xl relative overflow-hidden shadow-2xl">
                  {/* Industrial pattern overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `conic-gradient(from 45deg, transparent 30%, rgba(255,0,0,0.3) 50%, transparent 70%)`
                    }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-lg lg:text-xl font-bold mb-2 relative z-10">
                    <span className="tracking-wide">TOTAL BOARD FEET:</span>
                    <span className="text-red-400 font-mono text-xl lg:text-2xl">{totalBoardFeet.toFixed(2)} BF</span>
                  </div>
                  {totalPrice > 0 && (
                    <div className="flex justify-between items-center text-lg lg:text-xl font-bold relative z-10">
                      <span className="tracking-wide">ESTIMATED COST:</span>
                      <span className="text-orange-400 font-mono text-xl lg:text-2xl">${totalPrice.toFixed(2)}</span>
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
