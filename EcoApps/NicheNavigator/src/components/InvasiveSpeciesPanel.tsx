import React from 'react';
import { Species } from '@/types/game';
import { SpeciesCard } from './SpeciesCard';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { AlertTriangle } from 'lucide-react';

interface InvasiveSpeciesPanelProps {
  invasives: Species[];
  selectedSpecies: Species | null;
  onSpeciesSelect: (species: Species) => void;
  onSpeciesInfo: (species: Species) => void;
}

const availableInvasives = [
  'burmese-python',
  'brown-anole', 
  'wild-boar',
  'cattle-egret',
  'water-hyacinth',
  'brazilian-pepper'
];

export function InvasiveSpeciesPanel({ 
  invasives, 
  selectedSpecies, 
  onSpeciesSelect, 
  onSpeciesInfo
}: InvasiveSpeciesPanelProps) {
  return (
    <div className="w-80 bg-destructive/5 border-l border-destructive/20 p-6 overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <h2 className="text-xl font-bold text-destructive">Invasive Species</h2>
        </div>
        <Alert className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Invasive species displace natives and reduce biodiversity. They cause severe niche conflicts.
          </AlertDescription>
        </Alert>
      </div>


      <div className="space-y-4">
        {invasives.map((invasive) => (
          <SpeciesCard
            key={invasive.id}
            species={invasive}
            isSelected={selectedSpecies?.id === invasive.id}
            onSelect={() => onSpeciesSelect(invasive)}
            onInfo={() => onSpeciesInfo(invasive)}
            placementCount={invasive.placedInHabitats ? invasive.placedInHabitats.length : 0}
          />
        ))}
      </div>

      {selectedSpecies?.isInvasive && (
        <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <h3 className="font-semibold text-destructive mb-2">
            Invasion Impact
          </h3>
          <p className="text-sm text-destructive/80 mb-3">
            {selectedSpecies.invasionImpact}
          </p>
          <div className="space-y-2">
            <p className="text-xs font-medium text-destructive">Competes with:</p>
            <div className="flex flex-wrap gap-1">
              {selectedSpecies.competesWith?.map((competitorId) => (
                <span
                  key={competitorId}
                  className="text-xs px-2 py-1 bg-destructive text-destructive-foreground rounded-full"
                >
                  {competitorId.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}