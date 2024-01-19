import { atom } from 'jotai';
import { ChoiceComponent, SavedComponent } from './component';
import { Games } from '@/types/Game';

export interface Problem {
  id: string;
  content: SavedComponent[];
  choice: ChoiceComponent[];
}

const problemsAtom = atom<Problem[]>([]);
const gameTypeAtom = atom<Games>('number-game');

export { problemsAtom, gameTypeAtom };
