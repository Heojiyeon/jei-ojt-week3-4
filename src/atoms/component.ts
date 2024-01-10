import { Point } from '@/components/Fabric/FabricPolygon';
import { atom } from 'jotai';

export type TargetComponent =
  | fabric.Text
  | fabric.Ellipse
  | fabric.Image
  | fabric.Polyline
  | fabric.Rect
  | fabric.Group
  | fabric.Object
  | fabric.ActiveSelection;

export interface ChoiceComponent {
  id: string | undefined;
  choice: TargetComponent;
  isCorrect: boolean;
}

export type AddComponent = 'image' | 'text' | 'rect' | 'circle' | 'line';

// 캔버스 내 모든 컴포넌트
const entireComponentAtom = atom<TargetComponent[]>([]);
// 캔버스 내 활성화된 컴포넌트
const targetComponentAtom = atom<TargetComponent[]>([]);
// 선택지 옵션 컴포넌트
const choiceComponentAtom = atom<ChoiceComponent[]>([]);

const isPolygonAtom = atom(false);
const polygonPointsAtom = atom<Point[]>([]);

const selectedImagesAtom = atom<string[]>([]);
const addSelectedImagesAtom = atom(false);

const addComponentAtom = atom<AddComponent | null>(null);

const addGroupComponentAtom = atom(false);

export {
  addComponentAtom,
  addGroupComponentAtom,
  addSelectedImagesAtom,
  choiceComponentAtom,
  entireComponentAtom,
  isPolygonAtom,
  polygonPointsAtom,
  selectedImagesAtom,
  targetComponentAtom,
};
