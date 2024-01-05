import { TargetComponent } from '@/atoms/component';
import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';

type FabricPolyLineProp = {
  addTargetComponent: (targetComponent: TargetComponent) => void;
  deleteTargetComponent: (targetComponent: TargetComponent) => void;
};
class FabricPolyLine {
  private FabricPolyline: fabric.Polyline;

  constructor({
    addTargetComponent,
    deleteTargetComponent,
  }: FabricPolyLineProp) {
    this.FabricPolyline = new fabric.Polyline(
      [
        { x: 10, y: 10 },
        { x: 100, y: 100 },
      ],
      {
        name: uuidv4(),
        width: 100,
        height: 100,
        stroke: '#3c3c3c',
        top: 10,
        left: 10,
      }
    );

    this.FabricPolyline.set(
      'data',
      this.FabricPolyline.toDataURL(this.FabricPolyline.data)
    );

    this.FabricPolyline.on('selected', () => {
      addTargetComponent(this.FabricPolyline);
    });

    this.FabricPolyline.on('deselected', () => {
      deleteTargetComponent(this.FabricPolyline);
    });
  }

  render(): fabric.Polyline {
    return this.FabricPolyline;
  }
}

export default FabricPolyLine;
