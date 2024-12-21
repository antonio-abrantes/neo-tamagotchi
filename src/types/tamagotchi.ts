export type TamagotchiStage = 'egg' | 'baby' | 'child' | 'teen' | 'adult';
export type TamagotchiGender = 'boy' | 'girl';

export type GameAction = 'feed' | 'play' | 'sleep' | 'clean';

export type DecaySpeed = 'slow' | 'medium' | 'fast';

export interface TamagotchiStats {
  hunger: number;
  happiness: number;
  energy: number;
  hygiene: number;
}

export interface TamagotchiState {
  name: string;
  gender: TamagotchiGender;
  stage: TamagotchiStage;
  imageIndex: number;
  stats: TamagotchiStats;
  isAlive: boolean;
  isSleeping: boolean;
  lastInteraction: Date;
  birthDate: Date;
}