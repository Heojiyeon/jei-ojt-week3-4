import { TargetComponent } from '@/atoms/component';
import fabric from '@/controller/fabric';
import { v4 as uuidv4 } from 'uuid';

type FabricImageProp = {
  imageUrl: string;
  addTargetComponent: (targetComponent: TargetComponent) => void;
  deleteTargetComponent: (targetComponent: TargetComponent) => void;
};

class FabricImage {
  private FabricImage: fabric.Image;

  constructor({
    imageUrl,
    addTargetComponent,
    deleteTargetComponent,
  }: FabricImageProp) {
    this.FabricImage = fabric.Image.fromURL(imageUrl, function (img) {
      img.set('name', uuidv4());
      img.set('width', 200);
      img.set('height', 200);
      img.set('top', 10);
      img.set('left', 10);
    });

    this.FabricImage.set(
      'data',
      this.FabricImage.toDataURL(this.FabricImage.data)
    );

    this.FabricImage.on('selected', () => {
      addTargetComponent(this.FabricImage);
    });

    this.FabricImage.on('deselected', () => {
      deleteTargetComponent(this.FabricImage);
    });
  }
  render(): fabric.Image {
    return this.FabricImage;
  }
}

export default FabricImage;
