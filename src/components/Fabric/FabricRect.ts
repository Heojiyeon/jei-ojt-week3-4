import { TargetComponent } from '@/atoms/component';
import fabric from '@/controller/fabric';
import { v4 as uuidv4 } from 'uuid';

type FabricRectProp = {
  addTargetComponent: (targetComponent: TargetComponent) => void;
  deleteTargetComponent: (targetComponent: TargetComponent) => void;
};

/**
 * 패브릭 사각형 컴포넌트
 */
class FabricRect {
  private FabricRect: fabric.Rect;

  constructor({ addTargetComponent, deleteTargetComponent }: FabricRectProp) {
    this.FabricRect = new fabric.Rect({
      name: uuidv4(),
      width: 100,
      height: 100,
      fill: '#ffffff',
      stroke: '#3c3c3c',
      top: 10,
      left: 10,
    });

    this.FabricRect.set(
      'data',
      this.FabricRect.toDataURL(this.FabricRect.data)
    );

    this.FabricRect.on('selected', () => {
      addTargetComponent(this.FabricRect);
    });

    this.FabricRect.on('deselected', () => {
      deleteTargetComponent(this.FabricRect);
    });
  }
  render(): fabric.Rect {
    return this.FabricRect;
  }
}

export default FabricRect;
