import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type EvolutionTimeUnit = 'minutes' | 'hours' | 'days' | 'months';
type DecaySpeed = 'slow' | 'medium' | 'fast';

interface Settings {
  name: string;
  iconColor: string;
  backgroundColor: string;
  evolutionTime: number;
  evolutionTimeUnit: EvolutionTimeUnit;
  decaySpeed: DecaySpeed;
  isPaused: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  resetSettings: () => void;
  togglePause: () => void;
}

const defaultSettings: Settings = {
  name: 'Meu Tamagotchi',
  iconColor: 'text-blue-500',
  backgroundColor: 'from-pink-100 to-purple-100',
  evolutionTime: 5,
  evolutionTimeUnit: 'minutes',
  decaySpeed: 'medium',
  isPaused: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useLocalStorage<Settings>('tamagotchi-settings', defaultSettings);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const togglePause = () => {
    setSettings(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings, togglePause }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
// Constantes para velocidade de decaimento (por segundo)
export const DECAY_RATES = {
  slow: 0.05,    // 0.05% por segundo
  medium: 0.1,   // 0.1% por segundo
  fast: 0.2,     // 0.2% por segundo
} as const; 
