import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Icons } from '@/components/icons';
import { useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { useGameState } from '@/hooks/useGameState';
import { DecaySpeed } from '@/types/tamagotchi';
import { useToast } from '@/hooks/use-toast';

const colorOptions = [
  { label: 'Azul', value: 'text-blue-500' },
  { label: 'Verde', value: 'text-green-500' },
  { label: 'Roxo', value: 'text-purple-500' },
  { label: 'Rosa', value: 'text-pink-500' },
];

const backgroundOptions = [
  { label: 'Rosa para Roxo', value: 'from-pink-100 to-purple-100' },
  { label: 'Azul para Verde', value: 'from-blue-100 to-green-100' },
  { label: 'Amarelo para Laranja', value: 'from-yellow-100 to-orange-100' },
  { label: 'Verde para Azul', value: 'from-green-100 to-blue-100' },
];

const timeUnitOptions = [
  { label: 'Minutos', value: 'minutes' },
  { label: 'Horas', value: 'hours' },
  { label: 'Dias', value: 'days' },
  { label: 'Meses', value: 'months' },
];

const decaySpeedOptions = [
  { label: 'Lento', value: 'slow' as DecaySpeed },
  { label: 'Médio', value: 'medium' as DecaySpeed },
  { label: 'Rápido', value: 'fast' as DecaySpeed },
];

export function SettingsButton() {
  const [open, setOpen] = useState(false);
  const { settings, updateSettings, resetSettings, togglePause } = useSettings();
  const { resetGameState } = useGameState();
  const { toast } = useToast();

  const handleReset = () => {
    // Primeiro limpa TUDO do localStorage
    localStorage.clear();
    
    // Reseta as configurações
    resetSettings();
    
    // Reseta o estado do jogo
    resetGameState();
    
    // Mostra o toast
    toast({
      title: "Tudo Resetado!",
      description: "Todas as configurações e progresso foram resetados com sucesso.",
    });
    
    // Fecha o modal
    setOpen(false);
  };

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer p-2 rounded-[20%] bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50">
        <Icons.Settings className="h-5 w-5 text-gray-600" />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurações</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Nome do Tamagotchi */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Nome do Tamagotchi</h4>
              <Input
                value={settings.name}
                onChange={(e) => updateSettings({ name: e.target.value })}
                placeholder="Digite o nome do seu Tamagotchi"
                className="w-full"
              />
            </div>

            {/* Tempo de Evolução */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Tempo para Evolução</h4>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  value={settings.evolutionTime}
                  onChange={(e) => updateSettings({ evolutionTime: Number(e.target.value) })}
                  min={1}
                  className="w-full"
                />
                <Select
                  value={settings.evolutionTimeUnit}
                  onValueChange={(value: any) => updateSettings({ evolutionTimeUnit: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeUnitOptions.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Velocidade de Decaimento */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Velocidade de Decaimento</h4>
              <div className="grid grid-cols-3 gap-2">
                {decaySpeedOptions.map(({ label, value }) => (
                  <Button
                    key={value}
                    variant={settings.decaySpeed === value ? 'default' : 'outline'}
                    onClick={() => updateSettings({ decaySpeed: value })}
                    className="w-full"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Cor dos ícones */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Cor dos ícones</h4>
              <div className="grid grid-cols-2 gap-2">
                {colorOptions.map(({ label, value }) => (
                  <Button
                    key={value}
                    variant={settings.iconColor === value ? 'default' : 'outline'}
                    onClick={() => updateSettings({ iconColor: value })}
                    className="w-full"
                  >
                    <span className={value}>{label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Cor do fundo */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Cor do fundo</h4>
              <div className="grid grid-cols-2 gap-2">
                {backgroundOptions.map(({ label, value }) => (
                  <Button
                    key={value}
                    variant={settings.backgroundColor === value ? 'default' : 'outline'}
                    onClick={() => updateSettings({ backgroundColor: value })}
                    className="w-full"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Botão de Pause/Play */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Controle de Progresso</h4>
              <Button
                variant="outline"
                onClick={() => togglePause()}
                className="w-full"
              >
                {settings.isPaused ? (
                  <>
                    <Icons.Play className="w-4 h-4 mr-2" />
                    Retomar Progresso
                  </>
                ) : (
                  <>
                    <Icons.Pause className="w-4 h-4 mr-2" />
                    Pausar Progresso
                  </>
                )}
              </Button>
            </div>

            {/* Botão de Reset */}
            <div className="pt-4 border-t">
              <Button
                variant="destructive"
                onClick={handleReset}
                className="w-full"
              >
                <Icons.Trash2 className="w-4 h-4 mr-2" />
                Resetar Tudo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 