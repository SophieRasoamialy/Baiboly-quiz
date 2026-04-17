import {
  HEART_PRICE_GEMS,
  HEART_REFILL_SECONDS,
  MAX_HEARTS,
} from "./user.constants";

export const getRemainingRefillTime = (lastHeartRefill: number) => {
  const now = Date.now();
  const diff = Math.floor((now - lastHeartRefill) / 1000);
  return HEART_REFILL_SECONDS - (diff % HEART_REFILL_SECONDS);
};

export const getHeartsToRefill = (lastHeartRefill: number) => {
  const now = Date.now();
  const diff = Math.floor((now - lastHeartRefill) / 1000);
  return Math.floor(diff / HEART_REFILL_SECONDS);
};

export const canBuyHeart = (gems: number, hearts: number) => {
  return gems >= HEART_PRICE_GEMS && hearts < MAX_HEARTS;
};

export const clampHearts = (hearts: number) => {
  return Math.max(0, Math.min(hearts, MAX_HEARTS));
};