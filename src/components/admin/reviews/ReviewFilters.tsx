
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Filter, CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

interface ReviewFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  ratingFilter: number | null;
  setRatingFilter: (rating: number | null) => void;
}

const ReviewFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  statusFilter, 
  setStatusFilter,
  dateRange,
  setDateRange,
  ratingFilter,
  setRatingFilter
}: ReviewFiltersProps) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleReset = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setDateRange(undefined);
    setRatingFilter(null);
  };

  return (
    <div className="space-y-4">
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
          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            {showAdvancedFilters ? "Hide Filters" : "More Filters"}
          </Button>
        </div>
      </div>
      
      {showAdvancedFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-md bg-slate-50">
          <div>
            <label className="text-sm font-medium mb-2 block">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left">
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM dd, yyyy")} - {format(dateRange.to, "MMM dd, yyyy")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM dd, yyyy")
                    )
                  ) : (
                    "Select date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Rating</label>
            <Select 
              value={ratingFilter?.toString() || ''} 
              onValueChange={(value) => setRatingFilter(value ? parseInt(value) : null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any rating</SelectItem>
                <SelectItem value="5">5 stars</SelectItem>
                <SelectItem value="4">4+ stars</SelectItem>
                <SelectItem value="3">3+ stars</SelectItem>
                <SelectItem value="2">2+ stars</SelectItem>
                <SelectItem value="1">1+ star</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            <Button onClick={handleReset} variant="ghost" className="w-full">
              Reset All Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewFilters;
