import FabricEllipse from '@/components/Fabric/FabricEllipse';
import FabricPolyLine from '@/components/Fabric/FabricLine';
import { Point } from '@/components/Fabric/FabricPolygon';
import FabricRect from '@/components/Fabric/FabricRect';
import FabricText from '@/components/Fabric/FabricText';
import { atom } from 'jotai';

const entireComponentAtom = atom<
  (FabricText | FabricRect | FabricEllipse | FabricPolyLine)[]
>([]);
const targetComponentAtom = atom([]);

const isPolygonAtom = atom(false);
const polygonPointsAtom = atom<Point[]>([]);

export {
  entireComponentAtom,
  targetComponentAtom,
  isPolygonAtom,
  polygonPointsAtom,
};