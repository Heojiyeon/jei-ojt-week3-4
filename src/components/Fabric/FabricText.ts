import { TargetComponent } from '@/atoms/component';
import fabric from '@/controller/fabric';
import { v4 as uuidv4 } from 'uuid';

type FabricTextProp = {
  addTargetComponent: (targetComponent: TargetComponent) => void;
  deleteTargetComponent: (targetComponent: TargetComponent) => void;
};

/**
 * 패브릭 텍스트 컴포넌트
 */
class FabricText {
  private FabricText: fabric.Text;

  constructor({ addTargetComponent, deleteTargetComponent }: FabricTextProp) {
    this.FabricText = new fabric.Textbox('Text', {
      name: uuidv4(),
      stroke: '#3c3c3c',
      width: 100,
      height: 100,
      top: 10,
      left: 10,
      fontFamily: 'SUIT-Regular',
    });

    this.FabricText.set(
      'data',
      this.FabricText.toDataURL(this.FabricText.data)
    );

    this.FabricText.on('selected', () => {
      addTargetComponent(this.FabricText);
    });

    this.FabricText.on('deselected', () => {
      deleteTargetComponent(this.FabricText);
    });
  }
  render(): fabric.Text {
    return this.FabricText;
  }
}

export default FabricText;
