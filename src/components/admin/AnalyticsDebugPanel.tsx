import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { clearAllAnalyticsData, checkAnalyticsTablesExist } from '@/utils/clearAnalyticsData';
import { Loader2, AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';
const AnalyticsDebugPanel: React.FC = () => {
  const [isClearing, setIsClearing] = useState(false);
  const [clearResult, setClearResult] = useState<any>(null);
  const [tableStatus, setTableStatus] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);
  const handleClearData = async () => {
    setIsClearing(true);
    setClearResult(null);
    try {
      const result = await clearAllAnalyticsData();
      setClearResult(result);
      console.log('Clear analytics result:', result);
    } catch (error) {
      setClearResult({
        error
      });
      console.error('Error clearing analytics:', error);
    }
    setIsClearing(false);
  };
  const handleCheckTables = async () => {
    setIsChecking(true);
    setTableStatus(null);
    try {
      const status = await checkAnalyticsTablesExist();
      setTableStatus(status);
      console.log('Table status:', status);
    } catch (error) {
      setTableStatus({
        error
      });
      console.error('Error checking tables:', error);
    }
    setIsChecking(false);
  };
  return <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="text-lg text-red-800 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Analytics Debug Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-red-700">
          <p className="mb-2">If you're seeing fake analytics data that doesn't change, use these tools to diagnose and fix the issue:</p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button onClick={handleCheckTables} disabled={isChecking} variant="outline" size="sm">
            {isChecking ? <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Checking...
              </> : 'Check Tables'}
          </Button>
          
          <Button onClick={handleClearData} disabled={isClearing} variant="destructive" size="sm">
            {isClearing ? <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Clearing...
              </> : <>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All Analytics Data
              </>}
          </Button>
        </div>

        {tableStatus && <div className="text-sm p-3 rounded border bg-zinc-950">
            <h4 className="font-semibold mb-2 text-zinc-200">Table Status:</h4>
            <div className="space-y-1">
              <p className="flex items-center gap-2">
                {tableStatus.pageViewsTableExists ? <CheckCircle className="h-4 w-4 text-green-600" /> : <AlertTriangle className="h-4 w-4 text-red-600" />}
                Page Views Table: {tableStatus.pageViewsTableExists ? 'Exists' : 'Missing'}
                {tableStatus.pageViewsError && <span className="text-red-600">({tableStatus.pageViewsError})</span>}
              </p>
              <p className="flex items-center gap-2">
                {tableStatus.eventsTableExists ? <CheckCircle className="h-4 w-4 text-green-600" /> : <AlertTriangle className="h-4 w-4 text-red-600" />}
                Events Table: {tableStatus.eventsTableExists ? 'Exists' : 'Missing'}
                {tableStatus.eventsError && <span className="text-red-600">({tableStatus.eventsError})</span>}
              </p>
            </div>
          </div>}

        {clearResult && <div className="text-sm bg-white p-3 rounded border">
            <h4 className="font-semibold mb-2">Clear Result:</h4>
            {clearResult.error ? <p className="text-red-600">Error: {JSON.stringify(clearResult.error)}</p> : <div className="space-y-1">
                <p className="flex items-center gap-2">
                  {clearResult.pageViewsDeleted ? <CheckCircle className="h-4 w-4 text-green-600" /> : <AlertTriangle className="h-4 w-4 text-red-600" />}
                  Page Views: {clearResult.pageViewsDeleted ? 'Cleared' : 'Failed'}
                </p>
                <p className="flex items-center gap-2">
                  {clearResult.eventsDeleted ? <CheckCircle className="h-4 w-4 text-green-600" /> : <AlertTriangle className="h-4 w-4 text-red-600" />}
                  Events: {clearResult.eventsDeleted ? 'Cleared' : 'Failed'}
                </p>
                {(clearResult.errors?.pageViews || clearResult.errors?.events) && <div className="text-red-600 text-xs mt-2">
                    Errors: {JSON.stringify(clearResult.errors)}
                  </div>}
              </div>}
          </div>}

        <div className="text-xs text-red-600">
          <p><strong>Note:</strong> After clearing data, you should start seeing real analytics as users visit your site. Make sure analytics tracking is enabled on the public pages.</p>
        </div>
      </CardContent>
    </Card>;
};
export default AnalyticsDebugPanel;