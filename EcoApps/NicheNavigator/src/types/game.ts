export type HabitatType = 'wetland' | 'forest' | 'grassland' | 'coastal' | 'urban' | 'mangrove';

export type SpeciesRarity = 'common' | 'uncommon' | 'rare' | 'endangered';

export interface Habitat {
  id: string;
  type: HabitatType;
  name: string;
  description: string;
  resources: string[];
  capacity: number;
  currentOccupants: Species[];
}

export interface Species {
  id: string;
  name: string;
  scientificName: string;
  rarity: SpeciesRarity;
  image: string;
  fundamentalNiche: HabitatType[];
  preferredResources: string[];
  competitionFactors: string[];
  threats: string[];
  description: string;
  conservationStatus: string;
  placedInHabitats?: string[];
  isInvasive?: boolean;
  competesWith?: string[];
  invasionImpact?: string;
  realizedNicheImpact?: string;
}

export interface GameState {
  score: number;
  biodiversityIndex: number;
  conflicts: Conflict[];
  events: GameEvent[];
  turn: number;
}

export interface Conflict {
  id: string;
  type: 'resource' | 'space' | 'predation' | 'invasion';
  species: string[];
  habitat: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  invasiveSpecies?: string[];
}

export interface GameEvent {
  id: string;
  type: 'drought' | 'development' | 'invasive' | 'climate';
  title: string;
  description: string;
  effects: string[];
  duration: number;
  targetHabitat?: string;
  invasiveSpeciesId?: string;
}