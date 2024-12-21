import { useEffect, useRef } from 'react';
import { TamagotchiStage } from '@/types/tamagotchi';
import { useSettings } from '@/contexts/SettingsContext';
import { useTamagotchiImage } from './useTamagotchiImage';

export function useEvolution(
  stats: { hunger: number; happiness: number; energy: number; hygiene: number },
  currentStage: TamagotchiStage,
  setStage: (stage: TamagotchiStage, imageIndex: number) => void,
  setIsAlive: (isAlive: boolean) => void
) {
  const { settings } = useSettings();
  const lastEvolutionTime = useRef<number>(Date.now());
  const { getRandomImageIndex } = useTamagotchiImage();

  // Verifica se o Tamagotchi morreu
  useEffect(() => {
    const statsArray = Object.values(stats);
    const isAnyStatZero = statsArray.some(stat => stat <= 0);
    const areAllStatsLow = statsArray.every(stat => stat <= 20);

    if (isAnyStatZero || areAllStatsLow) {
      setIsAlive(false);
    }
  }, [stats, setIsAlive]);

  // Gerencia a evolução do Tamagotchi
  useEffect(() => {
    if (!settings.evolutionTime || settings.isPaused) return;

    const stages: TamagotchiStage[] = ['egg', 'baby', 'child', 'teen', 'adult'];
    const currentIndex = stages.indexOf(currentStage);
    
    if (currentIndex >= stages.length - 1) return;

    const timeInMs = settings.evolutionTime * (
      settings.evolutionTimeUnit === 'minutes' ? 60000 :
      settings.evolutionTimeUnit === 'hours' ? 3600000 :
      settings.evolutionTimeUnit === 'days' ? 86400000 :
      2592000000 // meses
    );

    const checkEvolution = () => {
      const now = Date.now();
      const timePassed = now - lastEvolutionTime.current;
      
      if (timePassed >= timeInMs) {
        const averageStats = Object.values(stats).reduce((a, b) => a + b, 0) / 4;
        
        // Só evolui se a média dos status for boa
        if (averageStats > 50) {
          const nextStage = stages[currentIndex + 1];
          const newImageIndex = getRandomImageIndex(nextStage);
          setStage(nextStage, newImageIndex);
          lastEvolutionTime.current = now;
        }
      }
    };

    const evolutionInterval = setInterval(checkEvolution, 1000); // Checa a cada segundo

    return () => clearInterval(evolutionInterval);
  }, [currentStage, settings.evolutionTime, settings.evolutionTimeUnit, settings.isPaused, stats, setStage, getRandomImageIndex]);
} 