import { fabric } from 'fabric';

class FabricEllipse {
  private FabricEllipse: fabric.Ellipse;

  constructor() {
    this.FabricEllipse = new fabric.Ellipse({
      width: 100,
      height: 100,
      fill: '#ffffff',
      stroke: '#3c3c3c',
      top: 10,
      left: 10,
      rx: 50,
      ry: 50,
    });
  }
  render(): fabric.Ellipse {
    return this.FabricEllipse;
  }
}

export default FabricEllipse;
