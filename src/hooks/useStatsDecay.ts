import { useEffect } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { DECAY_RATES } from '@/contexts/SettingsContext';

export function useStatsDecay(
  isSleeping: boolean,
  isAlive: boolean,
  isPaused: boolean,
  onDecay: (decayValues: { hunger: number; happiness: number; energy: number; hygiene: number }) => void
) {
  const { settings } = useSettings();
  const decayRate = DECAY_RATES[settings.decaySpeed];

  useEffect(() => {
    if (!isAlive || isPaused) return;

    const interval = setInterval(() => {
      const baseDecay = decayRate;
      
      onDecay({
        hunger: isSleeping ? baseDecay * 0.5 : baseDecay,
        happiness: isSleeping ? baseDecay * 0.3 : baseDecay,
        energy: isSleeping ? 0 : baseDecay * 1.2,
        hygiene: baseDecay * 0.8,
      });
    }, 1000); // Atualiza a cada segundo

    return () => clearInterval(interval);
  }, [isAlive, isSleeping, isPaused, decayRate, onDecay]);
} 