import { TargetComponent } from '@/atoms/component';
import fabric from '@/controller/fabric';
import { v4 as uuidv4 } from 'uuid';

type FabricEllipseProp = {
  addTargetComponent: (targetComponent: TargetComponent) => void;
  deleteTargetComponent: (targetComponent: TargetComponent) => void;
};

/**
 * 패브릭 원 컴포넌트
 */
class FabricEllipse {
  private FabricEllipse: fabric.Ellipse;

  constructor({
    addTargetComponent,
    deleteTargetComponent,
  }: FabricEllipseProp) {
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

    this.FabricEllipse.set(
      'data',
      this.FabricEllipse.toDataURL(this.FabricEllipse.data)
    );

    this.FabricEllipse.on('selected', () => {
      addTargetComponent(this.FabricEllipse);
    });

    this.FabricEllipse.on('deselected', () => {
      deleteTargetComponent(this.FabricEllipse);
    });
  }
  render(): fabric.Ellipse {
    return this.FabricEllipse;
  }
}

export default FabricEllipse;
