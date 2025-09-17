import { useState, useCallback } from 'react';
import { Habitat, Species, GameState, Conflict } from '@/types/game';
import { habitats as initialHabitats } from '@/data/habitats';
import { species as initialSpecies } from '@/data/species';
import { invasiveSpecies } from '@/data/invasiveSpecies';

export function useGameLogic() {
  const [habitats, setHabitats] = useState<Habitat[]>(initialHabitats);
  const [species, setSpecies] = useState<Species[]>(initialSpecies);
  const [invasives, setInvasives] = useState<Species[]>(invasiveSpecies);
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    biodiversityIndex: 0,
    conflicts: [],
    events: [],
    turn: 1
  });

  const calculateBiodiversityIndex = useCallback((habitats: Habitat[]) => {
    const totalOccupants = habitats.reduce((sum, h) => sum + h.currentOccupants.length, 0);
    const maxPossible = habitats.reduce((sum, h) => sum + h.capacity, 0);
    return (totalOccupants / maxPossible) * 100;
  }, []);

  const detectConflicts = useCallback((habitat: Habitat): Conflict[] => {
    const conflicts: Conflict[] = [];
    
    if (habitat.currentOccupants.length > 1) {
      // Check for resource competition
      const resourceOverlap = habitat.currentOccupants.some((species1, i) =>
        habitat.currentOccupants.some((species2, j) =>
          i !== j && species1.preferredResources.some(r => species2.preferredResources.includes(r))
        )
      );

      if (resourceOverlap) {
        conflicts.push({
          id: `conflict-${habitat.id}-${Date.now()}`,
          type: 'resource',
          species: habitat.currentOccupants.map(s => s.id),
          habitat: habitat.id,
          severity: habitat.currentOccupants.length > habitat.capacity ? 'high' : 'medium',
          description: `Resource competition in ${habitat.name} between ${habitat.currentOccupants.map(s => s.name).join(' and ')}`
        });
      }

      // Check for space competition if over capacity
      if (habitat.currentOccupants.length > habitat.capacity) {
        conflicts.push({
          id: `space-conflict-${habitat.id}-${Date.now()}`,
          type: 'space',
          species: habitat.currentOccupants.map(s => s.id),
          habitat: habitat.id,
          severity: 'high',
          description: `${habitat.name} is overcrowded - capacity exceeded`
        });
      }

      // Check for invasive species conflicts
      const invasiveSpeciesInHabitat = habitat.currentOccupants.filter(s => s.isInvasive);
      const nativeSpeciesInHabitat = habitat.currentOccupants.filter(s => !s.isInvasive);

      if (invasiveSpeciesInHabitat.length > 0 && nativeSpeciesInHabitat.length > 0) {
        invasiveSpeciesInHabitat.forEach(invasive => {
          const competingNatives = nativeSpeciesInHabitat.filter(native => 
            invasive.competesWith?.includes(native.id)
          );
          
          if (competingNatives.length > 0) {
            conflicts.push({
              id: `invasion-conflict-${habitat.id}-${invasive.id}-${Date.now()}`,
              type: 'invasion',
              species: [invasive.id, ...competingNatives.map(s => s.id)],
              habitat: habitat.id,
              severity: 'high',
              description: `${invasive.name} is displacing native species in ${habitat.name}`,
              invasiveSpecies: [invasive.id]
            });
          }
        });
      }
    }

    return conflicts;
  }, []);

  const placeSpecies = useCallback((speciesId: string, habitatId: string) => {
    setHabitats(prevHabitats => {
      const newHabitats = prevHabitats.map(habitat => {
        if (habitat.id === habitatId) {
          const allSpecies = [...species, ...invasives];
          const speciesData = allSpecies.find(s => s.id === speciesId);
          if (!speciesData) return habitat;

          // Check if species can live in this habitat type
          if (!speciesData.fundamentalNiche.includes(habitat.type)) {
            return habitat;
          }

          // Check capacity limits - prevent placement if at capacity
          if (habitat.currentOccupants.length >= habitat.capacity) {
            return habitat;
          }

          const updatedHabitat = {
            ...habitat,
            currentOccupants: [...habitat.currentOccupants, speciesData]
          };

          return updatedHabitat;
        }
        return habitat;
      });

      // Update species placement status
      const allSpeciesList = [...species, ...invasives];
      const targetSpecies = allSpeciesList.find(s => s.id === speciesId);
      
      if (targetSpecies?.isInvasive) {
        setInvasives(prev => 
          prev.map(s => s.id === speciesId ? { ...s, placedInHabitats: [...(s.placedInHabitats || []), habitatId] } : s)
        );
      } else {
        setSpecies(prevSpecies =>
          prevSpecies.map(s =>
            s.id === speciesId ? { ...s, placedInHabitats: [...(s.placedInHabitats || []), habitatId] } : s
          )
        );
      }

      // Detect conflicts and update game state
      const allConflicts = newHabitats.flatMap(detectConflicts);
      const newBiodiversityIndex = calculateBiodiversityIndex(newHabitats);
      const placedCount = newHabitats.reduce((sum, h) => sum + h.currentOccupants.length, 0);
      
      // Reduce score more for invasive conflicts
      const invasiveConflicts = allConflicts.filter(c => c.type === 'invasion');
      const regularConflicts = allConflicts.filter(c => c.type !== 'invasion');
      
      setGameState(prevState => ({
        ...prevState,
        conflicts: allConflicts,
        biodiversityIndex: newBiodiversityIndex,
        score: Math.max(0, placedCount * 10 - regularConflicts.length * 5 - invasiveConflicts.length * 15)
      }));

      return newHabitats;
    });
  }, [species, invasives, detectConflicts, calculateBiodiversityIndex]);

  const removeSpecies = useCallback((speciesId: string, habitatId: string) => {
    setHabitats(prevHabitats => {
      const newHabitats = prevHabitats.map(habitat => {
        if (habitat.id === habitatId) {
          return {
            ...habitat,
            currentOccupants: habitat.currentOccupants.filter(s => s.id !== speciesId)
          };
        }
        return habitat;
      });

      // Update species placement status
      const allSpeciesList = [...species, ...invasives];
      const targetSpecies = allSpeciesList.find(s => s.id === speciesId);
      
      if (targetSpecies?.isInvasive) {
        setInvasives(prev => 
          prev.map(s => s.id === speciesId ? { ...s, placedInHabitats: (s.placedInHabitats || []).filter(id => id !== habitatId) } : s)
        );
      } else {
        setSpecies(prevSpecies =>
          prevSpecies.map(s =>
            s.id === speciesId ? { ...s, placedInHabitats: (s.placedInHabitats || []).filter(id => id !== habitatId) } : s
          )
        );
      }

      // Update game state
      const allConflicts = newHabitats.flatMap(detectConflicts);
      const newBiodiversityIndex = calculateBiodiversityIndex(newHabitats);
      const placedCount = newHabitats.reduce((sum, h) => sum + h.currentOccupants.length, 0);
      
      setGameState(prevState => ({
        ...prevState,
        conflicts: allConflicts,
        biodiversityIndex: newBiodiversityIndex,
        score: Math.max(0, placedCount * 10 - allConflicts.length * 5)
      }));

      return newHabitats;
    });
  }, [species, invasives, detectConflicts, calculateBiodiversityIndex]);

  const introduceInvasiveSpecies = useCallback((invasiveSpeciesId: string) => {
    const invasiveData = invasiveSpecies.find(s => s.id === invasiveSpeciesId);
    if (invasiveData && !invasives.find(s => s.id === invasiveSpeciesId)) {
      setInvasives(prev => [...prev, invasiveData]);
    }
  }, [invasives]);

  return {
    habitats,
    species,
    invasives,
    gameState,
    placeSpecies,
    removeSpecies,
    introduceInvasiveSpecies
  };
}