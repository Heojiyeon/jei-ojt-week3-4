import { fabric } from 'fabric';

class FabricText {
  private FabricText: fabric.Text;

  constructor() {
    this.FabricText = new fabric.Text('Text', {
      stroke: '#3c3c3c',
      width: 100,
      height: 100,
      top: 10,
      left: 10,
    });
  }
  render(): fabric.Text {
    return this.FabricText;
  }
}

export default FabricText;
