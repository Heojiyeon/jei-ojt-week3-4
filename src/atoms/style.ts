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

export type SelectedBorderSize = 1 | 2 | 3 | 4 | 8 | 12 | 16 | 24;

export type SelectedBorderStyle = 'solid' | 'dashed' | 'dotted';

export type TypeOfPaint =
  | 'fill'
  | 'stroke'
  | 'strokeWidth'
  | 'strokeStyle'
  | null;

const selectedColorAtom = atom<SelectedColor>('');
const typeOfPaintAtom = atom<TypeOfPaint>(null);

const selectedBorderSizeAtom = atom<SelectedBorderSize | null>(null);
const selectedBorderStyleAtom = atom<SelectedBorderStyle | null>(null);

export {
  selectedColorAtom,
  typeOfPaintAtom,
  selectedBorderSizeAtom,
  selectedBorderStyleAtom,
};
