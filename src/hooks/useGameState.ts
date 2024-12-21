import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TamagotchiState, TamagotchiStage, TamagotchiGender } from '@/types/tamagotchi';
import { useCallback, useState } from 'react';
import { useTamagotchiImage } from './useTamagotchiImage';

const initialState: TamagotchiState = {
  name: 'Meu Tamagotchi',
  gender: 'boy' as TamagotchiGender,
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
  const { getRandomImageIndex } = useTamagotchiImage();

  const resetGameState = useCallback(() => {
    // Força a limpeza do localStorage
    localStorage.removeItem('tamagotchi-game-state');
    localStorage.removeItem('tamagotchi-settings');
    
    // Gera um gênero aleatório e uma imagem aleatória
    const randomGender: TamagotchiGender = Math.random() < 0.5 ? 'boy' : 'girl';
    const randomImageIndex = getRandomImageIndex('egg');

    // Força um reload do estado inicial
    const freshState: TamagotchiState = {
      ...initialState,
      gender: randomGender,
      imageIndex: randomImageIndex,
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
  }, [setGameState, getRandomImageIndex]);

  return {
    gameState,
    setGameState,
    resetGameState,
    isPaused,
  };
}