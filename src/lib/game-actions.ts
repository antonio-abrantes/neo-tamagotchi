import { TamagotchiState } from '@/types/tamagotchi';

export function updateStats(
  state: TamagotchiState,
  updates: Partial<TamagotchiState['stats']>
): TamagotchiState {
  return {
    ...state,
    stats: {
      ...state.stats,
      ...Object.fromEntries(
        Object.entries(updates).map(([key, value]) => [
          key,
          Math.min(100, Math.max(0, value)),
        ])
      ),
    },
  };
}