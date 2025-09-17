import React from 'react';
import { Species } from '@/types/game';
import { X } from 'lucide-react';

interface SpeciesChipProps {
  species: Species;
  onRemove?: () => void;
  showRemove?: boolean;
}

export function SpeciesChip({ species, onRemove, showRemove = false }: SpeciesChipProps) {
  const isInvasive = species.isInvasive;
  
  return (
    <div
      className={`
        inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
        ${isInvasive 
          ? 'bg-species-invasive text-white' 
          : 'bg-species-chip text-species-chip-foreground'
        }
        border transition-all duration-200 hover:shadow-sm
      `}
    >
      <img
        src={species.image}
        alt={species.name}
        className="w-4 h-4 rounded-full object-cover"
      />
      <span className="truncate max-w-24">{species.name}</span>
      {showRemove && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 p-0.5 rounded-full hover:bg-white/20 transition-colors"
          aria-label={`Remove ${species.name}`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}