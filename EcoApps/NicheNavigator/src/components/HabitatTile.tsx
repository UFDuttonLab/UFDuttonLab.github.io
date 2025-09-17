import React from 'react';
import { Habitat } from '@/types/game';
import { cn } from '@/lib/utils';
import { SpeciesChip } from './SpeciesChip';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface HabitatTileProps {
  habitat: Habitat;
  onClick: () => void;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  canAcceptSpecies: boolean;
  onRemoveSpecies?: (speciesId: string, habitatId: string) => void;
  onCompetitionClick?: (habitat: Habitat) => void;
}

const habitatStyles = {
  wetland: 'bg-gradient-wetland border-wetland',
  forest: 'bg-gradient-forest border-forest',
  grassland: 'bg-habitat-grassland border-habitat-grassland',
  coastal: 'bg-habitat-coastal border-habitat-coastal',
  urban: 'bg-habitat-urban border-habitat-urban',
  mangrove: 'bg-habitat-mangrove border-habitat-mangrove'
};

const habitatIcons = {
  wetland: '🌿',
  forest: '🌲',
  grassland: '🌾',
  coastal: '🏖️',
  urban: '🏠',
  mangrove: '🌊'
};

export function HabitatTile({ 
  habitat, 
  onClick, 
  onDrop, 
  onDragOver, 
  canAcceptSpecies,
  onRemoveSpecies,
  onCompetitionClick 
}: HabitatTileProps) {
  const isNearCapacity = habitat.currentOccupants.length >= habitat.capacity;
  const hasConflict = habitat.currentOccupants.length > 1;
  const showCompetitionButton = habitat.currentOccupants.length >= 2;

  return (
    <div
      className={cn(
        'relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300',
        'hover:shadow-hover transform hover:scale-105',
        'min-h-[200px] flex flex-col',
        habitatStyles[habitat.type],
        canAcceptSpecies && 'ring-2 ring-accent ring-opacity-60',
        isNearCapacity && 'opacity-80',
        hasConflict && 'ring-2 ring-game-conflict'
      )}
      onClick={onClick}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {/* Habitat Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{habitatIcons[habitat.type]}</span>
        <div>
          <h3 className="font-semibold text-white text-shadow">{habitat.name}</h3>
          <p className="text-xs text-white/90">{habitat.description}</p>
        </div>
      </div>

      {/* Capacity Indicator */}
      <div className="flex items-center gap-1 mb-3">
        <span className="text-xs text-white/80">Capacity:</span>
        <div className="flex gap-1">
          {Array.from({ length: habitat.capacity }, (_, i) => (
            <div
              key={i}
              className={cn(
                'w-2 h-2 rounded-full border border-white/40',
                i < habitat.currentOccupants.length ? 'bg-white' : 'bg-white/20'
              )}
            />
          ))}
        </div>
        {hasConflict && (
          <span className="text-xs text-coral ml-2 font-medium">⚠️ Competition</span>
        )}
      </div>

      {/* Resources */}
      <div className="mb-4">
        <p className="text-xs text-white/70 mb-1">Resources:</p>
        <div className="flex flex-wrap gap-1">
          {habitat.resources.slice(0, 3).map((resource) => (
            <span
              key={resource}
              className="text-xs px-2 py-1 bg-white/20 text-white rounded-full"
            >
              {resource.replace('_', ' ')}
            </span>
          ))}
          {habitat.resources.length > 3 && (
            <span className="text-xs text-white/60">+{habitat.resources.length - 3}</span>
          )}
        </div>
      </div>

      {/* Current Occupants */}
      <div className="flex-1 flex flex-col justify-end">
        {habitat.currentOccupants.length > 0 && (
          <div className="space-y-2">
            {habitat.currentOccupants.map((species) => (
              <SpeciesChip 
                key={species.id} 
                species={species} 
                showRemove={true}
                onRemove={() => onRemoveSpecies?.(species.id, habitat.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Competition Button */}
      {showCompetitionButton && (
        <div className="absolute top-2 right-2">
          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 text-gray-800 border-white/50 hover:bg-white hover:text-gray-900"
            onClick={(e) => {
              e.stopPropagation();
              onCompetitionClick?.(habitat);
            }}
          >
            <AlertTriangle className="w-4 h-4 mr-1" />
            Competition
          </Button>
        </div>
      )}

      {/* Drop Zone Indicator */}
      {canAcceptSpecies && !isNearCapacity && (
        <div className="absolute inset-0 bg-accent/20 border-2 border-dashed border-accent rounded-xl flex items-center justify-center">
          <span className="text-accent font-medium">Drop here</span>
        </div>
      )}
      
      {/* Capacity Full Indicator */}
      {canAcceptSpecies && isNearCapacity && (
        <div className="absolute inset-0 bg-destructive/20 border-2 border-dashed border-destructive rounded-xl flex items-center justify-center">
          <span className="text-destructive font-medium">Capacity Full</span>
        </div>
      )}
    </div>
  );
}