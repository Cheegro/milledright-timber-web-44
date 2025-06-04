
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Ruler, DollarSign } from 'lucide-react';

const BoardFootEducation = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-sawmill-orange" />
            What is a Board Foot?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            A board foot is a unit of measurement for lumber volume. One board foot equals a piece of lumber 
            that is 1 inch thick, 12 inches wide, and 12 inches long (144 cubic inches).
          </p>
          
          <div className="bg-sawmill-orange/10 p-4 rounded-lg">
            <h4 className="font-semibold text-sawmill-dark-brown mb-2">Formula:</h4>
            <p className="text-sawmill-dark-brown">
              <strong>Board Feet = (Length × Width × Thickness) ÷ 144</strong>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              All measurements converted to inches before calculation
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Ruler className="h-5 w-5 text-sawmill-orange" />
              Common Examples
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>2×4×8 ft</span>
                <span className="font-semibold">5.33 BF</span>
              </div>
              <div className="flex justify-between">
                <span>2×6×10 ft</span>
                <span className="font-semibold">10.00 BF</span>
              </div>
              <div className="flex justify-between">
                <span>1×12×6 ft</span>
                <span className="font-semibold">6.00 BF</span>
              </div>
              <div className="flex justify-between">
                <span>2×10×12 ft</span>
                <span className="font-semibold">20.00 BF</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5 text-sawmill-orange" />
              Why Use Board Feet?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-2 text-gray-700">
              <li>• Standard lumber pricing unit</li>
              <li>• Compare costs across different sizes</li>
              <li>• Calculate material needs accurately</li>
              <li>• Industry standard measurement</li>
              <li>• Simplifies lumber ordering</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Tips for Accurate Calculations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Unit Conversions</h4>
              <p className="text-sm text-gray-600">
                Our calculator automatically converts feet to inches for accurate calculations. 
                Use feet for length when it's more convenient (8 ft vs 96 in).
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Nominal vs. Actual Size</h4>
              <p className="text-sm text-gray-600">
                Remember that lumber is sold by nominal size (2×4) but actual dimensions are smaller 
                (1.5×3.5). For board foot calculations, use the nominal dimensions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Fractional Measurements</h4>
              <p className="text-sm text-gray-600">
                Common fractions: 1/4 = 0.25, 1/2 = 0.5, 3/4 = 0.75, 1/8 = 0.125, 3/8 = 0.375, 
                5/8 = 0.625, 7/8 = 0.875
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Multiple Pieces</h4>
              <p className="text-sm text-gray-600">
                Use the quantity field for multiple identical pieces, or add separate entries 
                for different sizes to get accurate totals.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BoardFootEducation;
