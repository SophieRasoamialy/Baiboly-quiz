export interface MedalInfo {
  id: string;
  name: string;
  nameMg: string; // Malagasy name
  color: string;
  icon: string;
  minPoints: number;
  description: string;
}

export const MEDALS: MedalInfo[] = [
  { 
    id: "alimo",
    name: "Alimo", 
    nameMg: "Alimo",
    color: "#CD7F32", 
    icon: "shield-star", 
    minPoints: 300,
    description: "Mpanatara-baovao" 
  },
  { 
    id: "volafotsy",
    name: "Volafotsy", 
    nameMg: "Volafotsy",
    color: "#C0C0C0", 
    icon: "star-four-points", 
    minPoints: 600,
    description: "Mpanatara-tsondrano" 
  },
  { 
    id: "volamena",
    name: "Volamena", 
    nameMg: "Volamena",
    color: "#FFD700", 
    icon: "star-circle", 
    minPoints: 900,
    description: "Mpanatara-tsofina" 
  },
  { 
    id: "daimanta",
    name: "Daimanta", 
    nameMg: "Daimanta",
    color: "#E5E4E2", 
    icon: "diamond-stone", 
    minPoints: 1200,
    description: "Mpanatara-bolamena" 
  },
  { 
    id: "safira",
    name: "Safira", 
    nameMg: "Safira",
    color: "#0F52BA", 
    icon: "gem", 
    minPoints: 1500,
    description: "Mpanatara-tehina" 
  },
  { 
    id: "robinja",
    name: "Rubi", 
    nameMg: "Robinja",
    color: "#E0115F", 
    icon: "heart-circle", 
    minPoints: 1800,
    description: "Mpanatara-maso" 
  },
  { 
    id: "esmeralda",
    name: "Esmeralda", 
    nameMg: "Esmeralda",
    color: "#50C878", 
    icon: "clover", 
    minPoints: 2100,
    description: "Mpanatara-loha" 
  },
  { 
    id: "tanora",
    name: "Tanora", 
    nameMg: "Tanora",
    color: "#9B111E", 
    icon: "fire", 
    minPoints: 2400,
    description: "Mpanatara-tanana" 
  },
  { 
    id: "mpanotso",
    name: "Mpanotso", 
    nameMg: "Mpanotso",
    color: "#9966CC", 
    icon: "crown", 
    minPoints: 2700,
    description: "Mpanatara-ain" 
  },
  { 
    id: "mpitari-dahy",
    name: "Mpitari-dahy", 
    nameMg: "Mpitari-dahy",
    color: "#FFD700", 
    icon: "trophy", 
    minPoints: 3000,
    description: "Mpanjaka Tsara indrindra" 
  },
];

// Get all medals earned based on points
export const getMedalsForPoints = (points: number): MedalInfo[] => {
  return MEDALS.filter(m => points >= m.minPoints);
};

// Get the highest medal for points
export const getMedalForPoints = (points: number): MedalInfo | null => {
  const sortedMedals = [...MEDALS].sort((a, b) => b.minPoints - a.minPoints);
  return sortedMedals.find(m => points >= m.minPoints) || null;
};

// Get next medal to unlock
export const getNextMedal = (points: number): MedalInfo | null => {
  return MEDALS.find(m => points < m.minPoints) || null;
};

// Check if a specific medal is unlocked
export const isMedalUnlocked = (points: number, medalId: string): boolean => {
  const medal = MEDALS.find(m => m.id === medalId);
  return medal ? points >= medal.minPoints : false;
};

// Get progress to next medal (0-100)
export const getMedalProgress = (points: number): number => {
  const nextMedal = getNextMedal(points);
  const currentMedal = getMedalForPoints(points);
  
  if (!nextMedal) return 100; // All medals unlocked
  if (!currentMedal) {
    // No medal yet, progress from 0 to first medal
    const firstMedal = MEDALS[0];
    return Math.min(100, (points / firstMedal.minPoints) * 100);
  }
  
  const currentMin = currentMedal.minPoints;
  const nextMin = nextMedal.minPoints;
  const progress = ((points - currentMin) / (nextMin - currentMin)) * 100;
  return Math.min(100, Math.max(0, progress));
};
