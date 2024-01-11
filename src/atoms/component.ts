import { Point } from '@/components/Fabric/FabricPolygon';
import { Group, Image } from 'fabric/fabric-impl';
import { atom } from 'jotai';

export interface addedImage extends Image {
  src: string;
}
export interface addedGroup extends Group {
  top: number;
  left: number;
  objects: TargetComponent[];
  width: number;
  height: number;
  type: 'group';
}

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
  name: string | undefined;
  data: string | undefined;
  choice: TargetComponent;
  isCorrect: boolean;
}

export interface SavedComponent {
  name: string | undefined;
  info: TargetComponent;
}

export type AddComponent = 'image' | 'text' | 'rect' | 'circle' | 'line';

// 캔버스 내 모든 컴포넌트
const entireComponentAtom = atom<SavedComponent[]>([]);
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
