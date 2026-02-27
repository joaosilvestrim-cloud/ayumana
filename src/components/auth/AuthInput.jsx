
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function AuthInput({ label, id, icon: Icon, error, className, ...props }) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor={id} className="text-slate-700 font-medium">{label}</Label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={18} />
          </div>
        )}
        <Input 
          id={id}
          className={cn(
            Icon ? "pl-10" : "",
            error ? "border-[#DC2626] focus-visible:ring-[#DC2626]" : "focus-visible:ring-[#6BA644]",
            "bg-slate-50 text-slate-900"
          )}
          {...props} 
        />
      </div>
      {error && <p className="text-sm text-[#DC2626] mt-1">{error}</p>}
    </div>
  );
}
