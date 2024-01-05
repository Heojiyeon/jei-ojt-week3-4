import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';

export interface Point {
  x: number;
  y: number;
}

type FabricPolygonProp = {
  points: Point[];
};

class FabricPolygon {
  private FabricPolygon: fabric.Polygon;

  constructor({ points }: FabricPolygonProp) {
    this.FabricPolygon = new fabric.Polygon(points, {
      name: uuidv4(),
      width: 100,
      height: 100,
      stroke: '#3c3c3c',
      top: 10,
      left: 10,
    });
  }
  render(): fabric.Polygon {
    return this.FabricPolygon;
  }
}

export default FabricPolygon;
