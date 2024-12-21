import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useState } from 'react';

interface FoodOption {
  id: string;
  name: string;
  icon: keyof typeof Icons;
  hungerIncrease: number;
  happinessIncrease: number;
}

const foodOptions: FoodOption[] = [
  { id: 'fruit', name: 'Fruta', icon: 'Apple', hungerIncrease: 30, happinessIncrease: 10 },
  { id: 'candy', name: 'Doce', icon: 'Candy', hungerIncrease: 10, happinessIncrease: 40 },
  { id: 'vegetable', name: 'Legume', icon: 'Carrot', hungerIncrease: 50, happinessIncrease: 5 },
];

interface FeedModalProps {
  open: boolean;
  onClose: () => void;
  onFeed: (hungerIncrease: number, happinessIncrease: number) => void;
}

export function FeedModal({ open, onClose, onFeed }: FeedModalProps) {
  const [selectedFood, setSelectedFood] = useState<FoodOption | null>(null);

  const handleFeed = () => {
    if (selectedFood) {
      onFeed(selectedFood.hungerIncrease, selectedFood.happinessIncrease);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Escolha um alimento</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 p-4">
          {foodOptions.map((food) => {
            const Icon = Icons[food.icon];
            return (
              <Button
                key={food.id}
                variant={selectedFood?.id === food.id ? 'default' : 'outline'}
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => setSelectedFood(food)}
              >
                <Icon className="w-8 h-8 mb-2" />
                <span className="text-sm">{food.name}</span>
              </Button>
            );
          })}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleFeed} disabled={!selectedFood}>
            Alimentar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}