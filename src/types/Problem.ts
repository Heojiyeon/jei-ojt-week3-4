import { SavedComponent } from '@/atoms/component';
import { ChoiceOptionContent } from './Choice';

export interface Problem {
  id: string;
  content: string;
  choice: string;
}

export interface HandledProblem {
  id: string;
  content: SavedComponent[];
  choice: ChoiceOptionContent[];
}
