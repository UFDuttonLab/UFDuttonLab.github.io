import React from 'react';
import { Habitat, Species } from '@/types/game';
import { HabitatTile } from './HabitatTile';
import { cn } from '@/lib/utils';

interface GameBoardProps {
  habitats: Habitat[];
  onHabitatClick: (habitat: Habitat) => void;
  selectedSpecies: Species | null;
  onSpeciesPlace: (speciesId: string, habitatId: string) => void;
  onRemoveSpecies: (speciesId: string, habitatId: string) => void;
  onCompetitionClick: (habitat: Habitat) => void;
}

export function GameBoard({ habitats, onHabitatClick, selectedSpecies, onSpeciesPlace, onRemoveSpecies, onCompetitionClick }: GameBoardProps) {
  const handleDrop = (e: React.DragEvent, habitatId: string) => {
    e.preventDefault();
    const speciesId = e.dataTransfer.getData('species-id');
    if (speciesId && selectedSpecies) {
      onSpeciesPlace(speciesId, habitatId);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex-1 p-6 bg-background">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Florida Ecosystems</h2>
        <p className="text-muted-foreground">
          Drag species to their preferred habitats. Watch how competition affects their realized niches!
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
        {habitats.map((habitat) => (
          <HabitatTile
            key={habitat.id}
            habitat={habitat}
            onClick={() => onHabitatClick(habitat)}
            onDrop={(e) => handleDrop(e, habitat.id)}
            onDragOver={handleDragOver}
            canAcceptSpecies={selectedSpecies ? 
              selectedSpecies.fundamentalNiche.includes(habitat.type) && habitat.currentOccupants.length < habitat.capacity : false
            }
            onRemoveSpecies={onRemoveSpecies}
            onCompetitionClick={onCompetitionClick}
          />
        ))}
      </div>
    </div>
  );
}