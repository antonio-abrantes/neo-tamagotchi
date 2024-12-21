import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

interface GameOverModalProps {
  open: boolean;
  onReset: () => void;
}

export function GameOverModal({ open, onReset }: GameOverModalProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="text-center">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-500">Game Over</DialogTitle>
          <DialogDescription className="text-lg mt-4">
            Seu Tamagotchi não resistiu à falta de cuidados...
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <Icons.Ghost className="w-24 h-24 mx-auto text-gray-400 animate-bounce" />
        </div>

        <div className="space-y-2">
          <p className="text-gray-600">
            Lembre-se de manter todos os status do seu Tamagotchi em bons níveis para que ele viva uma vida longa e feliz!
          </p>
          <Button 
            onClick={onReset} 
            className="w-full mt-4"
          >
            Começar Novamente
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 