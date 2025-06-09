
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Shield, Eye, EyeOff, Info } from 'lucide-react';
import { toast } from 'sonner';
import { 
  disableAnalytics, 
  enableAnalytics, 
  setAdminAnalyticsExclusion, 
  getAnalyticsStatus 
} from '@/utils/analytics';

const AnalyticsExclusionControls = () => {
  const [status, setStatus] = useState(getAnalyticsStatus());

  useEffect(() => {
    const updateStatus = () => setStatus(getAnalyticsStatus());
    
    // Update status when localStorage changes
    window.addEventListener('storage', updateStatus);
    
    // Update status periodically
    const interval = setInterval(updateStatus, 1000);
    
    return () => {
      window.removeEventListener('storage', updateStatus);
      clearInterval(interval);
    };
  }, []);

  const handleDisableAnalytics = () => {
    disableAnalytics();
    setStatus(getAnalyticsStatus());
    toast.success('Analytics completely disabled');
  };

  const handleEnableAnalytics = () => {
    enableAnalytics();
    setStatus(getAnalyticsStatus());
    toast.success('Analytics enabled');
  };

  const handleAdminExclusion = (exclude: boolean) => {
    setAdminAnalyticsExclusion(exclude);
    setStatus(getAnalyticsStatus());
    toast.success(exclude ? 'Admin traffic will be excluded' : 'Admin traffic will be tracked');
  };

  const isTracking = !status.disabled && !status.adminExcluded && !status.onAdminPage;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-sawmill-orange" />
          Analytics Exclusion Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            {isTracking ? (
              <>
                <Eye className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Currently Tracking</span>
              </>
            ) : (
              <>
                <EyeOff className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Not Tracking</span>
              </>
            )}
          </div>
          <Badge variant={isTracking ? "default" : "secondary"}>
            {isTracking ? "Active" : "Disabled"}
          </Badge>
        </div>

        {/* Status Details */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>On Admin Page:</span>
            <Badge variant={status.onAdminPage ? "destructive" : "outline"}>
              {status.onAdminPage ? "Yes (Auto-excluded)" : "No"}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Admin Exclusion:</span>
            <Badge variant={status.adminExcluded ? "destructive" : "outline"}>
              {status.adminExcluded ? "Enabled" : "Disabled"}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Completely Disabled:</span>
            <Badge variant={status.disabled ? "destructive" : "outline"}>
              {status.disabled ? "Yes" : "No"}
            </Badge>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Exclude Admin Traffic</Label>
              <p className="text-xs text-muted-foreground">
                Automatically exclude your visits from analytics when logged in as admin
              </p>
            </div>
            <Switch
              checked={status.adminExcluded}
              onCheckedChange={handleAdminExclusion}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDisableAnalytics}
              disabled={status.disabled}
            >
              Disable All Analytics
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleEnableAnalytics}
              disabled={!status.disabled}
            >
              Enable Analytics
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
          <Info className="h-4 w-4 text-blue-500 mt-0.5" />
          <div className="text-xs text-blue-700">
            <p className="font-medium mb-1">How exclusion works:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Admin pages are automatically excluded</li>
              <li>Admin exclusion applies to all pages when enabled</li>
              <li>Disabling all analytics stops all tracking completely</li>
              <li>Changes take effect immediately</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsExclusionControls;
