
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ReviewFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const ReviewFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  statusFilter, 
  setStatusFilter 
}: ReviewFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
      <div className="flex-1">
        <Input
          placeholder="Search reviews..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      <div className="flex gap-2">
        <Button
          variant={statusFilter === 'All' ? "default" : "outline"}
          onClick={() => setStatusFilter('All')}
          className={statusFilter === 'All' ? "bg-sawmill-dark-brown hover:bg-sawmill-medium-brown" : ""}
        >
          All
        </Button>
        <Button
          variant={statusFilter === 'Published' ? "default" : "outline"}
          onClick={() => setStatusFilter('Published')}
          className={statusFilter === 'Published' ? "bg-sawmill-dark-brown hover:bg-sawmill-medium-brown" : ""}
        >
          Published
        </Button>
        <Button
          variant={statusFilter === 'Pending' ? "default" : "outline"}
          onClick={() => setStatusFilter('Pending')}
          className={statusFilter === 'Pending' ? "bg-sawmill-dark-brown hover:bg-sawmill-medium-brown" : ""}
        >
          Pending
        </Button>
      </div>
    </div>
  );
};

export default ReviewFilters;
