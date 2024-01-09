import { atom } from 'jotai';

export type SelectedColor =
  | '#3c3c3c'
  | '#898989'
  | '#f5f5f5'
  | '#ffffff'
  | '#ed6276'
  | '#e885b4'
  | '#f48134'
  | '#f7c541'
  | '#4d9a4d'
  | '#20a1e2'
  | '#006898'
  | '#9467b9'
  | '';

const selectedColorAtom = atom<SelectedColor>('');

export { selectedColorAtom };
