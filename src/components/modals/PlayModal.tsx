import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

interface PlayModalProps {
  open: boolean;
  onClose: () => void;
  onPlay: (happinessIncrease: number, energyDecrease: number) => void;
}

const playOptions = [
  {
    icon: <Icons.PlayCircle className="w-6 h-6" />,
    label: 'Brincar de Pega-Pega',
    description: 'Correr e se divertir!',
    happinessIncrease: 30,
    energyDecrease: 20,
  },
  {
    icon: <Icons.Heart className="w-6 h-6" />,
    label: 'Fazer Carinho',
    description: 'Um momento de afeto',
    happinessIncrease: 20,
    energyDecrease: 5,
  },
  {
    icon: <Icons.Baby className="w-6 h-6" />,
    label: 'Dançar Junto',
    description: 'Momento musical!',
    happinessIncrease: 25,
    energyDecrease: 15,
  },
];

export function PlayModal({ open, onClose, onPlay }: PlayModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Escolha uma brincadeira</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          {playOptions.map((option) => (
            <Button
              key={option.label}
              variant="outline"
              className="w-full flex items-center justify-start gap-4 p-4 h-auto"
              onClick={() => {
                onPlay(option.happinessIncrease, option.energyDecrease);
                onClose();
              }}
            >
              <div className="text-blue-500">
                {option.icon}
              </div>
              <div className="text-left">
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-500">{option.description}</div>
                <div className="text-sm text-gray-500 mt-1">
                  +{option.happinessIncrease} Felicidade | -{option.energyDecrease} Energia
                </div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
} 