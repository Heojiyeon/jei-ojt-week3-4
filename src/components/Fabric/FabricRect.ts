import { TargetComponent } from '@/atoms/component';
import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';

type FabricRectProp = {
  addTargetComponent: (targetComponent: TargetComponent) => void;
};
class FabricRect {
  private FabricRect: fabric.Rect;

  constructor({ addTargetComponent }: FabricRectProp) {
    this.FabricRect = new fabric.Rect({
      name: uuidv4(),
      width: 100,
      height: 100,
      fill: '#ffffff',
      stroke: '#3c3c3c',
      top: 10,
      left: 10,
    });

    this.FabricRect.on('selected', () => {
      addTargetComponent(this.FabricRect);
    });
  }
  render(): fabric.Rect {
    return this.FabricRect;
  }
}

export default FabricRect;
