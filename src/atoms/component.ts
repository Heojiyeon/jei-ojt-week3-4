import FabricEllipse from '@/components/Fabric/FabricEllipse';
import FabricImage from '@/components/Fabric/FabricImage';
import FabricPolyLine from '@/components/Fabric/FabricLine';
import { Point } from '@/components/Fabric/FabricPolygon';
import FabricRect from '@/components/Fabric/FabricRect';
import FabricText from '@/components/Fabric/FabricText';
import { atom } from 'jotai';

export type EntireComponent =
  | FabricText
  | FabricRect
  | FabricEllipse
  | FabricPolyLine
  | FabricImage;

export type TargetComponent =
  | fabric.Text
  | fabric.Ellipse
  | fabric.Image
  | fabric.Polyline
  | fabric.Rect
  | fabric.Group
  | fabric.ActiveSelection;

export type AddComponent = 'image' | 'text' | 'rect' | 'circle' | 'line';

const entireComponentAtom = atom<EntireComponent[]>([]);
const targetComponentAtom = atom<TargetComponent[]>([]);
const choiceComponentAtom = atom<TargetComponent[]>([]);

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
