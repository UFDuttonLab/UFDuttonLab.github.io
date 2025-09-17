import React from 'react';
import { Species } from '@/types/game';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

interface SpeciesCardProps {
  species: Species;
  isSelected: boolean;
  onSelect: () => void;
  onInfo: () => void;
  placementCount: number;
}

const rarityStyles = {
  common: 'border-species-common bg-species-common/10',
  uncommon: 'border-species-uncommon bg-species-uncommon/10',
  rare: 'border-species-rare bg-species-rare/10',
  endangered: 'border-species-endangered bg-species-endangered/10'
};

const invasiveStyles = 'border-destructive bg-destructive/10';

const rarityIndicators = {
  common: '●',
  uncommon: '●●',
  rare: '●●●',
  endangered: '●●●●'
};

export function SpeciesCard({ 
  species, 
  isSelected, 
  onSelect, 
  onInfo, 
  placementCount 
}: SpeciesCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('species-id', species.id);
    onSelect();
  };

  return (
    <div
      className={cn(
        'relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-200',
        'hover:shadow-species transform hover:scale-105',
        species.isInvasive ? invasiveStyles : rarityStyles[species.rarity],
        isSelected && 'ring-2 ring-primary',
        placementCount > 0 && 'ring-1 ring-game-success'
      )}
      onClick={onSelect}
      draggable={true}
      onDragStart={handleDragStart}
    >
      {/* Species Image */}
      <div className="flex items-start gap-3">
        <img
          src={species.image}
          alt={species.name}
          className="w-12 h-12 rounded-lg object-cover bg-muted"
        />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-card-foreground truncate">
            {species.name}
          </h3>
          <p className="text-xs text-muted-foreground italic mb-2">
            {species.scientificName}
          </p>
          
          {/* Rarity indicator */}
          <div className="flex items-center gap-2 mb-2">
            {species.isInvasive ? (
              <>
                <span className="text-xs font-bold text-destructive">⚠️</span>
                <span className="text-xs font-medium text-destructive">INVASIVE</span>
              </>
            ) : (
              <>
                <span 
                  className={cn(
                    'text-xs font-medium',
                    `text-species-${species.rarity}`
                  )}
                >
                  {rarityIndicators[species.rarity]}
                </span>
                <span className="text-xs capitalize text-muted-foreground">
                  {species.rarity}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Info button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInfo();
          }}
          className="p-1 rounded hover:bg-muted transition-colors"
        >
          <Info className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Placement status */}
      {placementCount > 0 && (
        <div className="absolute bottom-2 left-2 bg-game-success text-white text-xs px-2 py-1 rounded-full">
          In {placementCount} habitat{placementCount > 1 ? 's' : ''}
        </div>
      )}
      
      {/* Drag hint */}
      {isSelected && (
        <div className="mt-2 text-xs text-primary">
          {placementCount > 0 ? 'Drag to place in additional habitats' : 'Drag to place in habitat'}
        </div>
      )}
    </div>
  );
}