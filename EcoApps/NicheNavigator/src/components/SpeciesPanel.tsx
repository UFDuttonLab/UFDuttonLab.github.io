import React from 'react';
import { Species } from '@/types/game';
import { SpeciesCard } from './SpeciesCard';

interface SpeciesPanelProps {
  species: Species[];
  selectedSpecies: Species | null;
  onSpeciesSelect: (species: Species) => void;
  onSpeciesInfo: (species: Species) => void;
}

export function SpeciesPanel({ 
  species, 
  selectedSpecies, 
  onSpeciesSelect, 
  onSpeciesInfo 
}: SpeciesPanelProps) {
  return (
    <div className="w-80 bg-card border-r border-border p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-card-foreground mb-2">Florida Species</h2>
        <p className="text-sm text-muted-foreground">
          Select a species to learn about its niche requirements and place it in suitable habitats.
        </p>
      </div>

      <div className="space-y-4">
        {species.map((animal) => (
          <SpeciesCard
            key={animal.id}
            species={animal}
            isSelected={selectedSpecies?.id === animal.id}
            onSelect={() => onSpeciesSelect(animal)}
            onInfo={() => onSpeciesInfo(animal)}
            placementCount={animal.placedInHabitats ? animal.placedInHabitats.length : 0}
          />
        ))}
      </div>

      {selectedSpecies && (
        <div className="mt-6 p-4 bg-secondary rounded-lg">
          <h3 className="font-semibold text-secondary-foreground mb-2">
            Fundamental Niche
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {selectedSpecies.name} can potentially live in:
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedSpecies.fundamentalNiche.map((habitat) => (
              <span
                key={habitat}
                className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded-full"
              >
                {habitat}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}