import { atom } from 'jotai';
import { ChoiceComponent, SavedComponent } from './component';

export interface Problem {
  id: string;
  content: SavedComponent[];
  choice: ChoiceComponent[];
}

const problemsAtom = atom<Problem[]>([]);

export { problemsAtom };
