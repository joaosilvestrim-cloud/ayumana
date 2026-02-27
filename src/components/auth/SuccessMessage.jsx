
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessMessage({ message }) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-2 p-3 bg-green-50 text-[#6BA644] rounded-md text-sm border border-green-100">
      <CheckCircle2 size={16} className="shrink-0" />
      <p>{message}</p>
    </div>
  );
}
