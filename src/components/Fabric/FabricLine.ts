import { fabric } from 'fabric';

class FabricPolyLine {
  private FabricPolyline: fabric.Polyline;

  constructor() {
    this.FabricPolyline = new fabric.Polyline(
      [
        { x: 10, y: 10 },
        { x: 100, y: 100 },
      ],
      {
        width: 100,
        height: 100,
        stroke: '#3c3c3c',
        top: 10,
        left: 10,
      }
    );
  }
  render(): fabric.Polyline {
    return this.FabricPolyline;
  }
}

export default FabricPolyLine;
