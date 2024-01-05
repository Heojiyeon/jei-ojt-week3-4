import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';

class FabricEllipse {
  private FabricEllipse: fabric.Ellipse;

  constructor() {
    this.FabricEllipse = new fabric.Ellipse({
      name: uuidv4(),
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
