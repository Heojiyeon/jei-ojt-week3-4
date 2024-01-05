import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';

class FabricText {
  private FabricText: fabric.Text;

  constructor() {
    this.FabricText = new fabric.Textbox('Text', {
      name: uuidv4(),
      stroke: '#3c3c3c',
      width: 100,
      height: 100,
      top: 10,
      left: 10,
      fontFamily: 'SUIT-Regular',
    });
  }
  render(): fabric.Text {
    return this.FabricText;
  }
}

export default FabricText;
