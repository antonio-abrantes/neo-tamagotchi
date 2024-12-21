import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Icons } from '@/components/icons';
import { TamagotchiGender } from '@/types/tamagotchi';
import { cn } from '@/lib/utils';

interface GenderSelectModalProps {
  open: boolean;
  onSelect: (gender: TamagotchiGender | 'random') => void;
}

export function GenderSelectModal({ open, onSelect }: GenderSelectModalProps) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Escolha o Gênero do seu Tamagotchi
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
          <button
            onClick={() => onSelect('boy')}
            className={cn(
              "flex flex-col items-center gap-4 p-6",
              "bg-white border-2 border-blue-200 rounded-xl",
              "hover:border-blue-400 hover:bg-blue-50",
              "transition-all duration-200",
              "group"
            )}
          >
            <Icons.User className="w-12 h-12 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-gray-700">Menino</span>
          </button>

          <button
            onClick={() => onSelect('girl')}
            className={cn(
              "flex flex-col items-center gap-4 p-6",
              "bg-white border-2 border-pink-200 rounded-xl",
              "hover:border-pink-400 hover:bg-pink-50",
              "transition-all duration-200",
              "group"
            )}
          >
            <Icons.User className="w-12 h-12 text-pink-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-gray-700">Menina</span>
          </button>

          <button
            onClick={() => onSelect('random')}
            className={cn(
              "flex flex-col items-center gap-4 p-6",
              "bg-white border-2 border-purple-200 rounded-xl",
              "hover:border-purple-400 hover:bg-purple-50",
              "transition-all duration-200",
              "group"
            )}
          >
            <Icons.Shuffle className="w-12 h-12 text-purple-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-gray-700">Aleatório</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 