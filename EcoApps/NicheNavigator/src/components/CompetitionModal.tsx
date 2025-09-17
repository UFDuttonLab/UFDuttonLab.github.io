import React from 'react';
import { Species, Habitat, Conflict } from '@/types/game';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Users, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CompetitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  habitat: Habitat;
  conflicts: Conflict[];
}

export function CompetitionModal({ isOpen, onClose, habitat, conflicts }: CompetitionModalProps) {
  const nativeSpecies = habitat.currentOccupants.filter(s => !s.isInvasive);
  const invasiveSpecies = habitat.currentOccupants.filter(s => s.isInvasive);
  
  const generateCompetitionAnalysis = () => {
    const analysis = [];
    
    // Resource Competition Analysis
    if (habitat.currentOccupants.length > 1) {
      const resourceConflicts = conflicts.filter(c => c.type === 'resource');
      if (resourceConflicts.length > 0) {
        analysis.push({
          type: 'Resource Competition',
          icon: <Users className="w-5 h-5 text-game-warning" />,
          severity: 'medium',
          description: `Multiple species are competing for limited resources in ${habitat.name}. This competition reduces the available resources per individual, potentially leading to decreased survival rates and reproductive success.`,
          predictions: [
            "1 Year: 15-25% reduction in individual fitness",
            "5 Years: Weaker species may show 40-60% population decline", 
            "10 Years: Possible local extinction of least competitive species"
          ]
        });
      }
    }

    // Space/Capacity Competition
    if (habitat.currentOccupants.length > habitat.capacity) {
      analysis.push({
        type: 'Overcrowding',
        icon: <AlertTriangle className="w-5 h-5 text-game-conflict" />,
        severity: 'high',
        description: `${habitat.name} is overcrowded with ${habitat.currentOccupants.length} species exceeding its capacity of ${habitat.capacity}. This creates intense territorial competition and stress.`,
        predictions: [
          "1 Year: Increased mortality rates by 30-50%",
          "5 Years: Habitat degradation and reduced carrying capacity",
          "10 Years: Ecosystem collapse without intervention"
        ]
      });
    }

    // Invasive Species Impact
    if (invasiveSpecies.length > 0 && nativeSpecies.length > 0) {
      invasiveSpecies.forEach(invasive => {
        const competingNatives = nativeSpecies.filter(native => 
          invasive.competesWith?.includes(native.id)
        );
        
        if (competingNatives.length > 0) {
          analysis.push({
            type: 'Invasive Displacement',
            icon: <TrendingDown className="w-5 h-5 text-destructive" />,
            severity: 'critical',
            description: `${invasive.name} is actively displacing native species through superior competitive ability, aggressive behavior, or resource monopolization.`,
            species: competingNatives.map(n => n.name),
            predictions: [
              "1 Year: Native species populations decline by 20-40%",
              "5 Years: 60-80% reduction in native populations",
              "10 Years: Potential complete displacement without management"
            ],
            managementOptions: [
              "Targeted removal of invasive species",
              "Habitat restoration to favor natives",
              "Controlled population management"
            ]
          });
        }
      });
    }

    return analysis;
  };

  const competitionAnalysis = generateCompetitionAnalysis();

  const getSeverityBadge = (severity: string) => {
    const variants = {
      'medium': 'default',
      'high': 'destructive',
      'critical': 'destructive'
    } as const;
    
    return <Badge variant={variants[severity as keyof typeof variants] || 'default'}>{severity.toUpperCase()}</Badge>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-game-warning" />
            Competition Analysis: {habitat.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Species Overview */}
          <div className="bg-secondary/50 rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Current Occupants ({habitat.currentOccupants.length}/{habitat.capacity})
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Native Species</p>
                <div className="space-y-1">
                  {nativeSpecies.map(species => (
                    <div key={species.id} className="text-sm">{species.name}</div>
                  ))}
                  {nativeSpecies.length === 0 && <div className="text-sm text-muted-foreground">None</div>}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Invasive Species</p>
                <div className="space-y-1">
                  {invasiveSpecies.map(species => (
                    <div key={species.id} className="text-sm text-destructive">{species.name}</div>
                  ))}
                  {invasiveSpecies.length === 0 && <div className="text-sm text-muted-foreground">None</div>}
                </div>
              </div>
            </div>
          </div>

          {/* Competition Analysis */}
          {competitionAnalysis.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Competition Analysis</h3>
              {competitionAnalysis.map((analysis, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {analysis.icon}
                      <h4 className="font-semibold">{analysis.type}</h4>
                    </div>
                    {getSeverityBadge(analysis.severity)}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{analysis.description}</p>
                  
                  {analysis.species && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Affected Native Species:</p>
                      <div className="flex flex-wrap gap-2">
                        {analysis.species.map(species => (
                          <Badge key={species} variant="secondary">{species}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Population Impact Predictions:</p>
                    <ul className="text-sm space-y-1">
                      {analysis.predictions.map((prediction, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-game-warning" />
                          {prediction}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {analysis.managementOptions && (
                    <div>
                      <p className="text-sm font-medium mb-2">Management Recommendations:</p>
                      <ul className="text-sm space-y-1">
                        {analysis.managementOptions.map((option, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-game-success" />
                            {option}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🌿</div>
              <h3 className="text-lg font-semibold mb-2">No Competition Detected</h3>
              <p className="text-muted-foreground">
                {habitat.currentOccupants.length === 0 
                  ? "This habitat is currently empty."
                  : "Species in this habitat are coexisting peacefully with minimal competition."}
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={onClose}>Close Analysis</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}