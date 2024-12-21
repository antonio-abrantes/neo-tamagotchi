import { Progress } from '@/components/ui/progress';
import { Icons } from '@/components/icons';
import { TamagotchiStage, TamagotchiStats } from '@/types/tamagotchi';
import { useSettings } from '@/contexts/SettingsContext';
import { cn } from '@/lib/utils';

interface TamagotchiDisplayProps {
  name: string;
  stage: TamagotchiStage;
  stats: TamagotchiStats;
  isSleeping: boolean;
}

const stageIcons = {
  egg: Icons.Egg,
  baby: Icons.Baby,
  child: Icons.Child,
  teen: Icons.User,
  adult: Icons.UserCog,
} as const;

const stats = [
  { id: 'hunger', label: 'Fome', icon: 'Cookie' },
  { id: 'happiness', label: 'Felicidade', icon: 'Heart' },
  { id: 'energy', label: 'Energia', icon: 'Moon' },
  { id: 'hygiene', label: 'Higiene', icon: 'Droplets' },
] as const;

export function TamagotchiDisplay({ name, stage, stats: statsValues, isSleeping }: TamagotchiDisplayProps) {
  const StageIcon = stageIcons[stage];
  const { settings } = useSettings();

  return (
    <div className="space-y-8">
      {/* Nome e Avatar */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <div className="relative flex justify-center mb-6">
          {StageIcon && (
            <div className={cn(
              "w-[45px] h-[45px]",
              "flex items-center justify-center",
              "transition-all duration-300",
              "relative",
              isSleeping && "opacity-50",
              settings.iconColor
            )}>
              <StageIcon className="w-full h-full" />
              {isSleeping && (
                <div className="absolute -top-2 -right-2 transform -rotate-12">
                  <Icons.Moon className="w-[13px] h-[13px] text-blue-500 animate-pulse" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="grid grid-cols-1 gap-3">
        {stats.map(({ id, label, icon }) => {
          const Icon = Icons[icon];
          const value = statsValues[id as keyof TamagotchiStats];
          return (
            <div 
              key={id} 
              className={cn(
                "flex items-center gap-3",
                "bg-white",
                "border border-gray-200",
                "rounded-xl",
                "p-3",
                "shadow-sm",
                "hover:border-gray-300",
                "transition-all duration-200"
              )}
            >
              <div className={cn(
                "w-8 h-8",
                "rounded-lg",
                "bg-gray-50",
                "flex items-center justify-center",
                settings.iconColor
              )}>
                {Icon && <Icon className="w-4 h-4" />}
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{label}</span>
                  <span className="text-gray-500">{Math.round(value)}%</span>
                </div>
                <Progress 
                  value={value} 
                  className="h-2 bg-gray-100" 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}