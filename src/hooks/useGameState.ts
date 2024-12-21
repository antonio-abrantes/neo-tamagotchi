import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TamagotchiState, TamagotchiStage } from '@/types/tamagotchi';
import { useCallback, useState } from 'react';

const initialState: TamagotchiState = {
  name: 'Meu Tamagotchi',
  stage: 'egg' as TamagotchiStage,
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
    // Força a limpeza do localStorage
    localStorage.removeItem('tamagotchi-game-state');
    localStorage.removeItem('tamagotchi-settings');
    
    // Força um reload do estado inicial
    const freshState: TamagotchiState = {
      ...initialState,
      stats: {
        hunger: 100,
        happiness: 100,
        energy: 100,
        hygiene: 100,
      },
      lastInteraction: new Date(),
      birthDate: new Date(),
      isAlive: true,
      isSleeping: false,
      stage: 'egg' as TamagotchiStage,
    };

    // Força a atualização do estado
    setGameState(freshState);

    // Força um reload da página após um breve delay
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }, [setGameState]);

  return {
    gameState,
    setGameState,
    resetGameState,
    isPaused,
  };
}