import { useCallback } from 'react';
import { TamagotchiStage, TamagotchiGender } from '@/types/tamagotchi';

const IMAGES_COUNT = {
  egg: 3,
  baby: 3,
  child: 3,
  teen: 3,
  adult: 12,
} as const;

export function useTamagotchiImage() {
  const getRandomImageIndex = useCallback((stage: TamagotchiStage) => {
    const maxImages = IMAGES_COUNT[stage];
    return Math.floor(Math.random() * maxImages) + 1;
  }, []);

  const getImagePath = useCallback((gender: TamagotchiGender | undefined, stage: TamagotchiStage | undefined, imageIndex: number | undefined) => {
    // Valores padrão caso algum parâmetro seja undefined
    const safeGender = gender || 'boy';
    const safeStage = stage || 'egg';
    const safeIndex = imageIndex || 1;

    // Garante que o índice está dentro do limite para o estágio
    const maxImages = IMAGES_COUNT[safeStage];
    const validIndex = Math.min(Math.max(1, safeIndex), maxImages);

    return `/assets/${safeGender}/${safeStage}/${validIndex}.png`;
  }, []);

  return {
    getRandomImageIndex,
    getImagePath,
    IMAGES_COUNT,
  };
} 