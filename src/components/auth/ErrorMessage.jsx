
import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-2 p-3 bg-red-50 text-[#DC2626] rounded-md text-sm border border-red-100">
      <AlertCircle size={16} className="shrink-0" />
      <p>{message}</p>
    </div>
  );
}
