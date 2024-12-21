// Game constants
export const STAT_DECAY_RATE = 0.1;

export const INITIAL_GAME_STATE = {
  name: 'Tama',
  stage: 'egg',
  stats: {
    hunger: 100,
    happiness: 100,
    energy: 100,
    hygiene: 100,
  },
  isAlive: true,
  isSleeping: false,
  lastInteraction: new Date(),
  birthDate: new Date(),
} as const;