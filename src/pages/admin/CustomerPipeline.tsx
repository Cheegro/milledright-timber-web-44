
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchCustomers, fetchConversations, updateConversationStatus } from '@/api/customerApi';
import { useToast } from '@/hooks/use-toast';

const CustomerPipeline = () => {
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

  const {
    data: customers = [],
    isLoading: isLoadingCustomers,
    refetch: refetchCustomers
  } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });

  const {
    data: conversations = [],
    isLoading: isLoadingConversations,
    refetch: refetchConversations
  } = useQuery({
    queryKey: ['conversations', selectedCustomer],
    queryFn: () => fetchConversations(selectedCustomer || undefined),
  });

  const handleStatusUpdate = async (conversationId: number, newStatus: string) => {
    try {
      await updateConversationStatus(conversationId, newStatus);
      toast({
        title: "Status Updated",
        description: "Conversation status has been updated successfully.",
      });
      refetchConversations();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update conversation status.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New Inquiry': return 'bg-blue-100 text-blue-800';
      case 'In Discussion': return 'bg-yellow-100 text-yellow-800';
      case 'Proposal Sent': return 'bg-purple-100 text-purple-800';
      case 'Project In Progress': return 'bg-green-100 text-green-800';
      case 'Project Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoadingCustomers) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-sawmill-dark-brown">
          Customer Pipeline
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage customer relationships and track project conversations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customers List */}
        <Card>
          <CardHeader>
            <CardTitle>Customers ({customers.length})</CardTitle>
            <CardDescription>Click on a customer to view their conversations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {customers.map((customer) => (
              <div
                key={customer.customer_id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedCustomer === customer.customer_id
                    ? 'bg-sawmill-orange/10 border-sawmill-orange'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCustomer(customer.customer_id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{customer.name}</h3>
                    <p className="text-sm text-gray-600">{customer.email}</p>
                    {customer.phone && (
                      <p className="text-sm text-gray-600">{customer.phone}</p>
                    )}
                    {customer.location_city_preference && (
                      <p className="text-xs text-gray-500 mt-1">
                        Location: {customer.location_city_preference}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Conversations */}
        <Card>
          <CardHeader>
            <CardTitle>
              Conversations {selectedCustomer && `(${conversations.length})`}
            </CardTitle>
            <CardDescription>
              {selectedCustomer 
                ? 'Manage project discussions and status updates'
                : 'Select a customer to view their conversations'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedCustomer ? (
              isLoadingConversations ? (
                <div className="space-y-3">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ) : conversations.length > 0 ? (
                <div className="space-y-4">
                  {conversations.map((conversation) => (
                    <div key={conversation.conversation_id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{conversation.subject}</h4>
                        <Badge className={getStatusColor(conversation.status)}>
                          {conversation.status}
                        </Badge>
                      </div>
                      
                      {conversation.estimated_budget_range && (
                        <p className="text-sm text-gray-600 mb-2">
                          Budget: {conversation.estimated_budget_range}
                        </p>
                      )}
                      
                      <div className="flex gap-2 flex-wrap">
                        {['In Discussion', 'Proposal Sent', 'Project In Progress', 'Project Completed'].map((status) => (
                          <Button
                            key={status}
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusUpdate(conversation.conversation_id, status)}
                            disabled={conversation.status === status}
                          >
                            {status}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No conversations found for this customer
                </p>
              )
            ) : (
              <p className="text-gray-500 text-center py-8">
                Select a customer to view their conversations
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerPipeline;
