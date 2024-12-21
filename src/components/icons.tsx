import {
  Apple,
  Candy,
  Carrot,
  Cookie,
  PlayCircle,
  Moon,
  Bath,
  Egg,
  Baby,
  User,
  UserCog,
  Heart,
  Droplets,
  Settings,
  Trash2,
  Ghost,
  Play,
  Pause,
  Shuffle,
  LucideProps
} from 'lucide-react';
import { FC } from 'react';

interface IconsType {
  [key: string]: FC<LucideProps>;
}

export const Icons: IconsType = {
  Apple,
  Candy,
  Carrot,
  Cookie,
  PlayCircle,
  Moon,
  Shower: Bath,
  Egg,
  Baby,
  Child: Baby,
  User,
  UserCog,
  Heart,
  Droplets,
  Settings,
  Trash2,
  Ghost,
  Play,
  Pause,
  Shuffle
}; 