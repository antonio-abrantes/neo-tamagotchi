import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function HelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setOpen(true)} 
        className="cursor-pointer p-2 rounded-[20%] bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        title="Ajuda"
      >
        <HelpCircle className="h-5 w-5 text-gray-600" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="modal-help">
          <DialogHeader>
            <DialogTitle>Como usar as configurações</DialogTitle>
          </DialogHeader>
          <div className="pt-4 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Nome do Tamagotchi</h3>
              <p>Digite o nome que você deseja dar ao seu Tamagotchi. Este nome será exibido acima da imagem do seu pet virtual.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Tempo de Evolução</h3>
              <p>Defina quanto tempo seu Tamagotchi levará para evoluir para o próximo estágio. Você pode escolher entre minutos, horas, dias ou meses.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Cor dos Ícones</h3>
              <p>Personalize a cor dos ícones de status do seu Tamagotchi para combinar com seu estilo.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Cor do Fundo</h3>
              <p>Escolha a cor do fundo da tela principal para criar o ambiente perfeito para seu pet.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Pausar/Retomar</h3>
              <p>Use esta opção para pausar temporariamente o jogo quando precisar se ausentar.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Resetar Tudo</h3>
              <p>Esta opção irá reiniciar completamente o jogo, incluindo todas as configurações e o progresso do seu Tamagotchi.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 