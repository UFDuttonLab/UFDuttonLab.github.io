import React from 'react';
import { Species } from '@/types/game';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface SpeciesInfoModalProps {
  species: Species | null;
  isOpen: boolean;
  onClose: () => void;
}

const rarityColors = {
  common: 'bg-species-common text-white',
  uncommon: 'bg-species-uncommon text-white',
  rare: 'bg-species-rare text-white',
  endangered: 'bg-species-endangered text-white'
};

export function SpeciesInfoModal({ species, isOpen, onClose }: SpeciesInfoModalProps) {
  if (!species) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <img
              src={species.image}
              alt={species.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl">{species.name}</h2>
              <p className="text-sm text-muted-foreground italic">
                {species.scientificName}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Conservation Status */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">Conservation Status</h3>
              <Badge className={rarityColors[species.rarity]}>
                {species.rarity.toUpperCase()}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {species.conservationStatus}
            </p>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-sm leading-relaxed">{species.description}</p>
          </div>

          <Separator />

          {/* Fundamental Niche */}
          <div>
            <h3 className="font-semibold mb-2">Fundamental Niche</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Habitats where this species could potentially thrive without competition or environmental constraints:
            </p>
            <div className="flex flex-wrap gap-2">
              {species.fundamentalNiche.map((habitat) => (
                <Badge key={habitat} variant="secondary">
                  {habitat.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Preferred Resources */}
          <div>
            <h3 className="font-semibold mb-2">Preferred Resources</h3>
            <div className="flex flex-wrap gap-2">
              {species.preferredResources.map((resource) => (
                <Badge key={resource} variant="outline">
                  {resource.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Competition Factors */}
          <div>
            <h3 className="font-semibold mb-2">Factors Limiting Realized Niche</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Real-world factors that restrict where this species can actually live:
            </p>
            <div className="space-y-2">
              {species.competitionFactors.map((factor) => (
                <div key={factor} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-game-warning" />
                  <span className="text-sm">{factor.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Realized Niche Impact */}
          {species.realizedNicheImpact && (
            <>
              <div>
                <h3 className="font-semibold mb-2">Realized Niche Impact from Invasive Species</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  How invasive species restrict where this native species can actually survive:
                </p>
                <div className="p-4 bg-game-warning/10 rounded-lg border border-game-warning/20 space-y-3">
                  <div className="text-sm leading-relaxed whitespace-pre-line">
                    {species.realizedNicheImpact}
                  </div>
                  
                  {/* What If Scenarios */}
                  <div className="mt-4 p-3 bg-background/50 rounded border border-game-warning/30">
                    <h4 className="font-medium text-sm mb-2">💡 What If Scenarios:</h4>
                    <div className="text-xs space-y-1 text-muted-foreground">
                      <div>• <strong>Early Intervention:</strong> Removing invasives within 2 years could restore 80% of original habitat</div>
                      <div>• <strong>Delayed Action:</strong> Waiting 5+ years may require decades for ecosystem recovery</div>
                      <div>• <strong>Multiple Invasives:</strong> Synergistic effects can accelerate habitat loss exponentially</div>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Threats */}
          <div>
            <h3 className="font-semibold mb-2">Primary Threats</h3>
            <div className="space-y-2">
              {species.threats.map((threat) => (
                <div key={threat} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-game-conflict" />
                  <span className="text-sm">{threat.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}