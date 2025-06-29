
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  Trash2, 
  Database, 
  RefreshCw, 
  CheckCircle, 
  XCircle,
  Loader2,
  Info
} from 'lucide-react';
import { clearAllAnalyticsData, checkAnalyticsTablesExist } from '@/utils/clearAnalyticsData';
import { useToast } from '@/hooks/use-toast';

const AnalyticsAdminTools = () => {
  const { toast } = useToast();
  const [isClearing, setIsClearing] = useState(false);
  const [clearResult, setClearResult] = useState<any>(null);
  const [tableStatus, setTableStatus] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleClearData = async () => {
    if (!confirm('Are you sure you want to clear ALL analytics data? This action cannot be undone.')) {
      return;
    }

    setIsClearing(true);
    setClearResult(null);
    
    try {
      const result = await clearAllAnalyticsData();
      setClearResult(result);
      
      if (result.pageViewsDeleted && result.eventsDeleted) {
        toast({
          title: "Analytics Data Cleared",
          description: "All analytics data has been successfully cleared.",
        });
      } else {
        toast({
          title: "Partial Clear",
          description: "Some data may not have been cleared. Check the results below.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setClearResult({ error });
      toast({
        title: "Error",
        description: "Failed to clear analytics data. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsClearing(false);
  };

  const handleCheckTables = async () => {
    setIsChecking(true);
    setTableStatus(null);
    
    try {
      const status = await checkAnalyticsTablesExist();
      setTableStatus(status);
      
      if (status.pageViewsTableExists && status.eventsTableExists) {
        toast({
          title: "Tables Check Complete",
          description: "All analytics tables are properly configured.",
        });
      } else {
        toast({
          title: "Table Issues Found",
          description: "Some analytics tables may be missing or misconfigured.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setTableStatus({ error });
      toast({
        title: "Error",
        description: "Failed to check table status. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsChecking(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Database className="h-6 w-6 text-sawmill-orange" />
        <h2 className="text-2xl font-bold text-sawmill-dark-brown">Analytics Admin Tools</h2>
      </div>

      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Admin Tools:</strong> These tools are for troubleshooting and maintenance. 
          Use with caution as some actions cannot be undone.
        </AlertDescription>
      </Alert>

      {/* Table Status Check */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button 
              onClick={handleCheckTables} 
              disabled={isChecking} 
              variant="outline"
            >
              {isChecking ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Check Tables
                </>
              )}
            </Button>
          </div>

          {tableStatus && (
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <h4 className="font-medium">Table Status Results:</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {tableStatus.pageViewsTableExists ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    Page Views Table
                  </span>
                  <Badge variant={tableStatus.pageViewsTableExists ? "default" : "destructive"}>
                    {tableStatus.pageViewsTableExists ? "OK" : "Missing"}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {tableStatus.eventsTableExists ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    Events Table
                  </span>
                  <Badge variant={tableStatus.eventsTableExists ? "default" : "destructive"}>
                    {tableStatus.eventsTableExists ? "OK" : "Missing"}
                  </Badge>
                </div>
              </div>

              {(tableStatus.pageViewsError || tableStatus.eventsError) && (
                <div className="mt-3 p-3 bg-red-50 rounded border border-red-200">
                  <h5 className="font-medium text-red-800 mb-2">Errors:</h5>
                  {tableStatus.pageViewsError && (
                    <p className="text-sm text-red-700">Page Views: {tableStatus.pageViewsError}</p>
                  )}
                  {tableStatus.eventsError && (
                    <p className="text-sm text-red-700">Events: {tableStatus.eventsError}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <Trash2 className="h-5 w-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Danger Zone:</strong> These actions will permanently delete data and cannot be undone.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Button 
              onClick={handleClearData} 
              disabled={isClearing} 
              variant="destructive"
            >
              {isClearing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Clearing...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Analytics Data
                </>
              )}
            </Button>
          </div>

          {clearResult && (
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <h4 className="font-medium">Clear Operation Results:</h4>
              
              {clearResult.error ? (
                <div className="p-3 bg-red-50 rounded border border-red-200">
                  <p className="text-red-700 font-medium">Error occurred:</p>
                  <p className="text-red-600 text-sm">{JSON.stringify(clearResult.error)}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {clearResult.pageViewsDeleted ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      Page Views Data
                    </span>
                    <Badge variant={clearResult.pageViewsDeleted ? "default" : "destructive"}>
                      {clearResult.pageViewsDeleted ? "Cleared" : "Failed"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {clearResult.eventsDeleted ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      Events Data
                    </span>
                    <Badge variant={clearResult.eventsDeleted ? "default" : "destructive"}>
                      {clearResult.eventsDeleted ? "Cleared" : "Failed"}
                    </Badge>
                  </div>

                  {(clearResult.errors?.pageViews || clearResult.errors?.events) && (
                    <div className="mt-3 p-3 bg-red-50 rounded border border-red-200">
                      <h5 className="font-medium text-red-800 mb-2">Operation Errors:</h5>
                      <pre className="text-xs text-red-700 overflow-auto">
                        {JSON.stringify(clearResult.errors, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>After clearing data:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Real analytics will start collecting as users visit your site</li>
                <li>It may take a few minutes for new data to appear</li>
                <li>Make sure analytics tracking is enabled in settings</li>
                <li>Visit your public pages to generate test data</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Current Session</h4>
              <div className="space-y-1">
                <p>Session ID: {sessionStorage.getItem('analytics_session_id') || 'Not set'}</p>
                <p>Start Time: {sessionStorage.getItem('session_start_time') ? 
                  new Date(parseInt(sessionStorage.getItem('session_start_time')!)).toLocaleString() : 'Not set'}</p>
                <p>Current Path: {window.location.pathname}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Storage Status</h4>
              <div className="space-y-1">
                <p>Analytics Disabled: {localStorage.getItem('disable_analytics') || 'false'}</p>
                <p>Admin Exclusion: {localStorage.getItem('exclude_admin_analytics') || 'false'}</p>
                <p>Admin Flag: {localStorage.getItem('user_is_admin') || 'false'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsAdminTools;
