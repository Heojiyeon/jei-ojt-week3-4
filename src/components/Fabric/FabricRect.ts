import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';

class FabricRect {
  private FabricRect: fabric.Rect;

  constructor() {
    this.FabricRect = new fabric.Rect({
      name: uuidv4(),
      width: 100,
      height: 100,
      fill: '#ffffff',
      stroke: '#3c3c3c',
      top: 10,
      left: 10,
    });
  }
  render(): fabric.Rect {
    return this.FabricRect;
  }
}

export default FabricRect;
