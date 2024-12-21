import { Progress } from '@/components/ui/progress';
import { Icons } from '@/components/icons';
import { TamagotchiStage, TamagotchiStats, TamagotchiGender } from '@/types/tamagotchi';
import { useSettings } from '@/contexts/SettingsContext';
import { useTamagotchiImage } from '@/hooks/useTamagotchiImage';
import { cn } from '@/lib/utils';

interface TamagotchiDisplayProps {
  name: string;
  gender: TamagotchiGender;
  stage: TamagotchiStage;
  imageIndex: number;
  stats: TamagotchiStats;
  isSleeping: boolean;
}

const stats = [
  { id: 'hunger', label: 'Fome', icon: 'Cookie' },
  { id: 'happiness', label: 'Felicidade', icon: 'Heart' },
  { id: 'energy', label: 'Energia', icon: 'Moon' },
  { id: 'hygiene', label: 'Higiene', icon: 'Droplets' },
] as const;

export function TamagotchiDisplay({ 
  name, 
  gender,
  stage, 
  imageIndex,
  stats: statsValues, 
  isSleeping 
}: TamagotchiDisplayProps) {
  const { settings } = useSettings();
  const { getImagePath } = useTamagotchiImage();

  return (
    <div className="space-y-8">
      {/* Nome e Avatar */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <div className="relative flex justify-center mb-6">
          <div className={cn(
            "w-[65px] h-[64px]",
            "flex items-center justify-center",
            "transition-all duration-300",
            "relative",
            "animate-pulse-slow",
            isSleeping && "opacity-50"
          )}>
            <img
              src={getImagePath(gender, stage, imageIndex)}
              alt={`${name} - ${stage}`}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = getImagePath('boy', stage, 1);
              }}
            />
            {isSleeping && (
              <div className="absolute -top-2 -right-2 transform -rotate-12">
                <Icons.Moon className="w-[13px] h-[13px] text-blue-500 animate-pulse" />
              </div>
            )}
          </div>
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