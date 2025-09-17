import { Habitat } from '@/types/game';

export const habitats: Habitat[] = [
  {
    id: 'wetland-1',
    type: 'wetland',
    name: 'Everglades Wetland',
    description: 'Slow-moving freshwater marsh with sawgrass and cypress',
    resources: ['freshwater', 'fish', 'aquatic_plants', 'nesting_sites'],
    capacity: 4,
    currentOccupants: []
  },
  {
    id: 'wetland-2',
    type: 'wetland',
    name: 'Coastal Marsh',
    description: 'Saltwater marsh with cordgrass and tidal flows',
    resources: ['saltwater', 'crustaceans', 'marsh_grass', 'mudflats'],
    capacity: 3,
    currentOccupants: []
  },
  {
    id: 'forest-1',
    type: 'forest',
    name: 'Pine Flatwoods',
    description: 'Open longleaf pine forest with wiregrass understory',
    resources: ['pine_seeds', 'insects', 'sandy_soil', 'open_canopy'],
    capacity: 3,
    currentOccupants: []
  },
  {
    id: 'forest-2',
    type: 'forest',
    name: 'Hardwood Hammock',
    description: 'Dense tropical hardwood forest with diverse canopy',
    resources: ['fruits', 'nuts', 'dense_cover', 'rich_soil'],
    capacity: 3,
    currentOccupants: []
  },
  {
    id: 'grassland-1',
    type: 'grassland',
    name: 'Dry Prairie',
    description: 'Open grassland with scattered palmetto and wildflowers',
    resources: ['grasses', 'herbs', 'open_space', 'burrow_sites'],
    capacity: 4,
    currentOccupants: []
  },
  {
    id: 'coastal-1',
    type: 'coastal',
    name: 'Sandy Beach',
    description: 'White sand beach with dune vegetation',
    resources: ['sand', 'marine_debris', 'dune_plants', 'shoreline'],
    capacity: 3,
    currentOccupants: []
  },
  {
    id: 'coastal-2',
    type: 'coastal',
    name: 'Rocky Shore',
    description: 'Rocky coastline with tide pools and algae',
    resources: ['algae', 'shellfish', 'rock_crevices', 'tidal_pools'],
    capacity: 3,
    currentOccupants: []
  },
  {
    id: 'mangrove-1',
    type: 'mangrove',
    name: 'Red Mangrove Forest',
    description: 'Coastal mangrove forest with prop roots and brackish water',
    resources: ['brackish_water', 'mangrove_seeds', 'root_systems', 'fish_nursery'],
    capacity: 3,
    currentOccupants: []
  },
  {
    id: 'urban-1',
    type: 'urban',
    name: 'Suburban Edge',
    description: 'Human-modified landscape with gardens and buildings',
    resources: ['ornamental_plants', 'bird_feeders', 'shelter', 'water_features'],
    capacity: 3,
    currentOccupants: []
  }
];