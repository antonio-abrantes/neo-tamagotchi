import { Button } from '@/components/ui/button';
import { GameAction } from '@/types/tamagotchi';
import { Icons } from '@/components/icons';
import { useSettings } from '../contexts/SettingsContext';
import { cn } from '@/lib/utils';

interface GameControlsProps {
  onAction: (action: GameAction) => void;
  disabled?: boolean;
}

export function GameControls({ onAction, disabled }: GameControlsProps) {
  const { settings } = useSettings();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Button
        variant="outline"
        size="lg"
        onClick={() => onAction('feed')}
        disabled={disabled}
        className={cn(
          "flex flex-col items-center gap-2",
          "h-auto py-4",
          "bg-white",
          "border border-gray-200",
          "hover:bg-gray-50 hover:border-gray-300",
          settings.iconColor
        )}
      >
        <Icons.Cookie className="w-6 h-6" />
        <span className="text-sm font-medium">Alimentar</span>
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={() => onAction('play')}
        disabled={disabled}
        className={cn(
          "flex flex-col items-center gap-2",
          "h-auto py-4",
          "bg-white",
          "border border-gray-200",
          "hover:bg-gray-50 hover:border-gray-300",
          settings.iconColor
        )}
      >
        <Icons.PlayCircle className="w-6 h-6" />
        <span className="text-sm font-medium">Brincar</span>
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={() => onAction('sleep')}
        disabled={disabled}
        className={cn(
          "flex flex-col items-center gap-2",
          "h-auto py-4",
          "bg-white",
          "border border-gray-200",
          "hover:bg-gray-50 hover:border-gray-300",
          settings.iconColor
        )}
      >
        <Icons.Moon className="w-6 h-6" />
        <span className="text-sm font-medium">Dormir</span>
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={() => onAction('clean')}
        disabled={disabled}
        className={cn(
          "flex flex-col items-center gap-2",
          "h-auto py-4",
          "bg-white",
          "border border-gray-200",
          "hover:bg-gray-50 hover:border-gray-300",
          settings.iconColor
        )}
      >
        <Icons.Shower className="w-6 h-6" />
        <span className="text-sm font-medium">Limpar</span>
      </Button>
    </div>
  );
}