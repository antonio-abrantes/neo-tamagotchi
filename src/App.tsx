import { useState, useCallback, useEffect } from 'react';
import { TamagotchiDisplay } from '@/components/TamagotchiDisplay';
import { GameControls } from '@/components/GameControls';
import { FeedModal } from '@/components/modals/FeedModal';
import { PlayModal } from '@/components/modals/PlayModal';
import { GameOverModal } from '@/components/modals/GameOverModal';
import { GameAction, TamagotchiGender, TamagotchiStage } from '@/types/tamagotchi';
import { useToast } from '@/hooks/use-toast';
import { useGameState } from '@/hooks/useGameState';
import { Toaster } from '@/components/ui/toaster';
import { updateStats } from '@/lib/game-actions';
import { SettingsButton } from './components/SettingsButton';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useStatsDecay } from '@/hooks/useStatsDecay';
import { useEvolution } from '@/hooks/useEvolution';
import { GenderSelectModal } from '@/components/modals/GenderSelectModal';
import { HelpButton } from './components/HelpButton';
import { Github } from 'lucide-react';

function GameContainer() {
  const { gameState, setGameState, resetGameState, initialState } = useGameState();
  const [showFeedModal, setShowFeedModal] = useState(false);
  const [showPlayModal, setShowPlayModal] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const { settings } = useSettings();
  const { toast } = useToast();

  // Verifica se precisa mostrar o modal de gênero
  useEffect(() => {
    const checkGenderModal = () => {
      const hasGameState = localStorage.getItem('tamagotchi-game-state');
      const shouldShowModal = !hasGameState || !gameState.gender;
      
      if (shouldShowModal) {
        setShowGenderModal(true);
      }
    };

    checkGenderModal();
    window.addEventListener('storage', checkGenderModal);
    
    return () => {
      window.removeEventListener('storage', checkGenderModal);
    };
  }, [gameState.gender]);

  const handleGenderSelect = useCallback((gender: TamagotchiGender | 'random') => {
    const selectedGender = gender === 'random' 
      ? (Math.random() < 0.5 ? 'boy' : 'girl') as TamagotchiGender
      : gender;

    // Reseta TUDO com o gênero selecionado
    setGameState({
      ...initialState,
      gender: selectedGender,
      stats: {
        hunger: 100,
        happiness: 100,
        energy: 100,
        hygiene: 100,
      },
      lastInteraction: new Date(),
      birthDate: new Date(),
      isAlive: true,
      isSleeping: false,
      stage: 'egg' as TamagotchiStage,
      imageIndex: 1,
    });
    
    setShowGenderModal(false);

    toast({
      title: 'Gênero Selecionado!',
      description: `Seu Tamagotchi será ${selectedGender === 'boy' ? 'um menino' : 'uma menina'}!`,
    });
  }, [setGameState, toast]);

  // Adiciona o hook de evolução
  useEvolution(
    gameState.stats,
    gameState.stage,
    (newStage, newImageIndex) => {
      setGameState(prev => ({
        ...prev,
        stage: newStage,
        imageIndex: newImageIndex,
      }));
      toast({
        title: 'Evolução!',
        description: `Seu Tamagotchi evoluiu para ${newStage}!`,
      });
    },
    (isAlive) => {
      if (!isAlive && gameState.isAlive) {
        setGameState(prev => ({
          ...prev,
          isAlive: false,
        }));
      }
    }
  );

  // Usando o hook de decaimento com o estado de pausa das configurações
  useStatsDecay(
    gameState.isSleeping,
    gameState.isAlive,
    settings.isPaused,
    useCallback((decayValues) => {
      setGameState(prev => ({
        ...prev,
        stats: {
          hunger: Math.max(0, prev.stats.hunger - decayValues.hunger),
          happiness: Math.max(0, prev.stats.happiness - decayValues.happiness),
          energy: Math.max(0, prev.stats.energy - decayValues.energy),
          hygiene: Math.max(0, prev.stats.hygiene - decayValues.hygiene),
        }
      }));
    }, [setGameState])
  );

  const handleAction = useCallback((action: GameAction) => {
    if (settings.isPaused) {
      toast({
        title: 'Jogo Pausado',
        description: 'Despause o jogo para realizar ações.',
        variant: 'destructive',
      });
      return;
    }

    if (!gameState.isAlive) {
      toast({
        title: 'Game Over',
        description: 'Seu Tamagotchi não está mais vivo. Reinicie o jogo.',
        variant: 'destructive',
      });
      return;
    }

    if (gameState.stats.energy <= 0 && action !== 'sleep') {
      toast({
        title: 'Sem Energia',
        description: 'Seu Tamagotchi precisa dormir para recuperar energia!',
        variant: 'destructive',
      });
      return;
    }

    switch (action) {
      case 'feed':
        setShowFeedModal(true);
        break;
      case 'play':
        setShowPlayModal(true);
        break;
      case 'sleep':
        setGameState(prev => ({
          ...prev,
          isSleeping: !prev.isSleeping,
          stats: {
            ...prev.stats,
            energy: prev.isSleeping ? prev.stats.energy : Math.min(100, prev.stats.energy + 50),
          },
        }));
        toast({
          title: gameState.isSleeping ? 'Acordou!' : 'Dormindo...',
          description: gameState.isSleeping
            ? 'Seu Tamagotchi está pronto para brincar!'
            : 'Seu Tamagotchi está descansando.',
        });
        break;
      case 'clean':
        setGameState(prev => updateStats(prev, { 
          hygiene: Math.min(100, prev.stats.hygiene + 50) 
        }));
        toast({
          title: 'Limpeza concluída!',
          description: 'Seu Tamagotchi está limpo e feliz.',
        });
        break;
    }
  }, [gameState.isSleeping, gameState.isAlive, gameState.stats.energy, setGameState, toast, settings.isPaused]);

  const handleFeed = useCallback((hungerIncrease: number, happinessIncrease: number) => {
    setGameState((prev) => 
      updateStats(prev, {
        hunger: Math.min(100, prev.stats.hunger + hungerIncrease),
        happiness: Math.min(100, prev.stats.happiness + happinessIncrease),
      })
    );
    setShowFeedModal(false);
    toast({
      title: 'Alimentado com sucesso!',
      description: 'Seu Tamagotchi está mais feliz e satisfeito.',
    });
  }, [setGameState, toast]);

  const handlePlay = useCallback((happinessIncrease: number, energyDecrease: number) => {
    setGameState((prev) => 
      updateStats(prev, {
        happiness: Math.min(100, prev.stats.happiness + happinessIncrease),
        energy: Math.max(0, prev.stats.energy - energyDecrease),
      })
    );
    toast({
      title: 'Brincadeira concluída!',
      description: 'Seu Tamagotchi se divertiu muito!',
    });
  }, [setGameState, toast]);

  const handleReset = useCallback(() => {
    // Primeiro limpa o estado
    resetGameState();
    // Força o modal a aparecer
    setShowGenderModal(true);
    // Mostra o toast
    toast({
      title: 'Jogo Reiniciado',
      description: 'Seu Tamagotchi voltou ao estágio inicial.',
    });
  }, [resetGameState, toast]);

  return (
    <div className={`fixed inset-0 bg-gradient-to-b ${settings.backgroundColor} flex items-center justify-center p-4`}>
      <a
        href="https://github.com/antonio-abrantes/neo-tamagotchi"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
      >
        <Github className="h-5 w-5" />
        <span className="text-sm font-medium">Star on GitHub</span>
      </a>

      <div className="w-full max-w-[550px] bg-white rounded-lg relative shadow-lg">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <HelpButton />
          <SettingsButton />
        </div>

        <div className="p-8">
          <div className="mb-8">
            <TamagotchiDisplay
              name={settings.name}
              gender={gameState.gender}
              stage={gameState.stage}
              imageIndex={gameState.imageIndex}
              stats={gameState.stats}
              isSleeping={gameState.isSleeping}
            />
          </div>

          <div>
            <GameControls
              onAction={handleAction}
              disabled={!gameState.isAlive}
            />
          </div>
        </div>

        <FeedModal
          open={showFeedModal}
          onClose={() => setShowFeedModal(false)}
          onFeed={handleFeed}
        />

        <PlayModal
          open={showPlayModal}
          onClose={() => setShowPlayModal(false)}
          onPlay={handlePlay}
        />

        <GameOverModal
          open={!gameState.isAlive}
          onReset={handleReset}
        />

        <GenderSelectModal
          open={showGenderModal}
          onSelect={handleGenderSelect}
        />

        <Toaster />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <GameContainer />
    </SettingsProvider>
  );
}