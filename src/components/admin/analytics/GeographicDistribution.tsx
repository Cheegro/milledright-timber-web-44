
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Globe, MapPin } from 'lucide-react';
import type { AdvancedAnalyticsStats } from '@/api/analyticsApi';

interface GeographicDistributionProps {
  stats: AdvancedAnalyticsStats | undefined;
  getCountryFlag: (country: string) => string;
}

const GeographicDistribution: React.FC<GeographicDistributionProps> = ({ stats, getCountryFlag }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Globe className="h-5 w-5 text-sawmill-orange" />
          Geographic Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-semibold mb-2">Top Countries</h4>
            {stats?.topCountries && stats.topCountries.length > 0 ? (
              stats.topCountries.slice(0, 5).map((country, index) => (
                <div key={index} className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getCountryFlag(country.country)}</span>
                    <span className="text-sm font-medium">{country.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={country.percentage} className="w-16 h-2" />
                    <Badge className="bg-sawmill-orange text-white text-xs">
                      {country.count}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No location data recorded yet.</p>
            )}
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-2">Top Cities</h4>
            {stats?.topCities && stats.topCities.length > 0 ? (
              stats.topCities.slice(0, 3).map((city, index) => (
                <div key={index} className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-sm">{city.city}, {city.country}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {city.count}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No city data recorded yet.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeographicDistribution;
