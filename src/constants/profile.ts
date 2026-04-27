import { MEDALS } from "../utils/medal";

export const ALL_MEDALS = MEDALS.map(m => ({
  id: m.id,
  name: m.nameMg,
  color: m.color,
  icon: m.icon
}));

export const PROFILE_GEMS_CONFIG = [
  { xRatio: 0.04, size: 12, delay: 0, duration: 8000, opacity: 0.45 },
  { xRatio: 0.25, size: 9, delay: 2000, duration: 7000, opacity: 0.35 },
  { xRatio: 0.55, size: 14, delay: 1000, duration: 9000, opacity: 0.5 },
  { xRatio: 0.8, size: 10, delay: 3000, duration: 7500, opacity: 0.4 },
];