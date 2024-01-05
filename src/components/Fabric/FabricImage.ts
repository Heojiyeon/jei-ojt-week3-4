import { TargetComponent } from '@/atoms/component';
import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';

type FabricImageProp = {
  imageUrl: string;
  addTargetComponent: (targetComponent: TargetComponent) => void;
};

class FabricImage {
  private FabricImage: fabric.Image;

  constructor({ imageUrl, addTargetComponent }: FabricImageProp) {
    this.FabricImage = fabric.Image.fromURL(imageUrl, function (img) {
      img.set('name', uuidv4());
      img.set('width', 200);
      img.set('height', 200);
      img.set('top', 10);
      img.set('left', 10);
    });

    this.FabricImage.on('selected', () => {
      addTargetComponent(this.FabricImage);
    });
  }
  render(): fabric.Image {
    return this.FabricImage;
  }
}

export default FabricImage;
