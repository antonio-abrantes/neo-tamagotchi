import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TamagotchiState, TamagotchiStage, TamagotchiGender } from '@/types/tamagotchi';
import { useCallback, useState } from 'react';

export const initialState: TamagotchiState = {
  name: 'Meu Tamagotchi',
  gender: undefined as unknown as TamagotchiGender,
  stage: 'egg' as TamagotchiStage,
  imageIndex: 1,
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
};

export function useGameState() {
  const [gameState, setGameState] = useLocalStorage<TamagotchiState>('tamagotchi-game-state', initialState);
  const [isPaused, setIsPaused] = useState(false);

  const resetGameState = useCallback(() => {
    // Remove TUDO do localStorage
    localStorage.removeItem('tamagotchi-game-state');
    localStorage.removeItem('tamagotchi-settings');
    
    // Força um estado inicial limpo
    const freshState = {
      ...initialState,
      gender: undefined as unknown as TamagotchiGender,
      lastInteraction: new Date(),
      birthDate: new Date(),
    };

    // Atualiza o estado
    setGameState(freshState);

    // Força a verificação do localStorage
    window.dispatchEvent(new Event('storage'));
  }, [setGameState]);

  return {
    gameState,
    setGameState,
    resetGameState,
    isPaused: !gameState.gender || isPaused,
    setIsPaused,
    initialState,
  };
}