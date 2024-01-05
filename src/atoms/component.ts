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

const entireComponentAtom = atom<EntireComponent[]>([]);
const targetComponentAtom = atom([]);

const isPolygonAtom = atom(false);
const polygonPointsAtom = atom<Point[]>([]);

const selectedImagesAtom = atom<string[]>([]);
const addSelectedImagesAtom = atom(false);

export {
  entireComponentAtom,
  isPolygonAtom,
  polygonPointsAtom,
  selectedImagesAtom,
  targetComponentAtom,
  addSelectedImagesAtom,
};
