
import React from 'react';
import { cn } from '@/lib/utils';

export default function PasswordStrength({ password = '' }) {
  if (!password) return null;

  const getStrength = (pass) => {
    let score = 0;
    if (pass.length > 5) score += 1;
    if (pass.length > 7) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score < 2) return { label: 'Fraca', color: 'bg-red-500', width: 'w-1/4' };
    if (score < 4) return { label: 'Razoável', color: 'bg-yellow-500', width: 'w-2/4' };
    if (score < 5) return { label: 'Boa', color: 'bg-green-400', width: 'w-3/4' };
    return { label: 'Forte', color: 'bg-green-600', width: 'w-full' };
  };

  const strength = getStrength(password);

  return (
    <div className="mt-2 space-y-1">
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className={cn("h-full transition-all duration-300", strength.color, strength.width)} />
      </div>
      <p className="text-xs text-slate-500 text-right font-medium">Força: {strength.label}</p>
    </div>
  );
}
