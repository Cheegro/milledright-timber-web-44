
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Pencil, Trash2, Plus, Archive } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import LogStockForm from '@/components/admin/LogStockForm';
import { LogStock, fetchLogStock, createLogStock, updateLogStock, deleteLogStock, CreateLogStockData } from '@/api/logStockApi';
import { format } from 'date-fns';

const LogStockAdmin = () => {
  const { toast } = useToast();
  const [logStock, setLogStock] = useState<LogStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLog, setEditingLog] = useState<LogStock | undefined>();

  useEffect(() => {
    loadLogStock();
  }, []);

  const loadLogStock = async () => {
    try {
      setLoading(true);
      const data = await fetchLogStock();
      setLogStock(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load log stock",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: CreateLogStockData) => {
    await createLogStock(data);
    await loadLogStock();
    setShowForm(false);
  };

  const handleUpdate = async (data: CreateLogStockData) => {
    if (editingLog) {
      await updateLogStock(editingLog.log_id, data);
      await loadLogStock();
      setShowForm(false);
      setEditingLog(undefined);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteLogStock(id);
      await loadLogStock();
      toast({
        title: "Success",
        description: "Log stock entry deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete log stock entry",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (log: LogStock) => {
    setEditingLog(log);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingLog(undefined);
  };

  if (showForm) {
    return (
      <LogStockForm
        logStock={editingLog}
        onSubmit={editingLog ? handleUpdate : handleCreate}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Archive className="h-6 w-6 text-sawmill-dark-brown" />
          <h1 className="text-3xl font-bold text-sawmill-dark-brown">Log Stock Management</h1>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-sawmill-dark-brown hover:bg-sawmill-medium-brown"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Log
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Log Stock Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading log stock...</div>
          ) : logStock.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No log stock entries found. Add your first log to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Species</TableHead>
                  <TableHead>Date Acquired</TableHead>
                  <TableHead>Source Location</TableHead>
                  <TableHead>Diameter (in)</TableHead>
                  <TableHead>Length (ft)</TableHead>
                  <TableHead>Est. Yield (bf)</TableHead>
                  <TableHead>Storage Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logStock.map((log) => (
                  <TableRow key={log.log_id}>
                    <TableCell className="font-medium">
                      {log.wood_species?.common_name || 'Unknown'}
                    </TableCell>
                    <TableCell>{format(new Date(log.date_acquired), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{log.source_location_text || '-'}</TableCell>
                    <TableCell>{log.diameter_at_base_inches || '-'}</TableCell>
                    <TableCell>{log.length_feet || '-'}</TableCell>
                    <TableCell>{log.estimated_yield_board_feet || '-'}</TableCell>
                    <TableCell>{log.storage_location_in_yard || '-'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(log)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Log Stock Entry</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this log stock entry? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(log.log_id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LogStockAdmin;
