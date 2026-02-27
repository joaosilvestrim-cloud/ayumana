
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AuthButton({ children, loading, className, ...props }) {
  return (
    <Button 
      className={cn(
        "w-full bg-[#6BA644] hover:bg-[#5a8c39] text-white font-medium h-11 transition-all shadow-sm",
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : children}
    </Button>
  );
}
