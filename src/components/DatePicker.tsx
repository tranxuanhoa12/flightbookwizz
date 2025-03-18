
import { useState, useEffect, useRef } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | null;
  onDateChange: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function DatePicker({ 
  date, 
  onDateChange, 
  label = "Select date", 
  placeholder = "Pick a date",
  className
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  
  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node) && open) {
        setOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className={cn("flex flex-col space-y-1.5", className)}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-start text-left font-normal border-2 h-12 px-4 py-2 rounded-xl",
              !date && "text-muted-foreground",
              "hover:bg-slate-50 transition-colors duration-200"
            )}
          >
            <CalendarIcon className="mr-3 h-4 w-4 opacity-70" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border-0 shadow-xl" align="start">
          <Calendar
            mode="single"
            selected={date || undefined}
            onSelect={(date) => {
              onDateChange(date);
              setOpen(false);
            }}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            initialFocus
            className="rounded-xl border"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePicker;
