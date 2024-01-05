import {
  addSelectedImagesAtom,
  entireComponentAtom,
  selectedImagesAtom,
  targetComponentAtom,
} from '@/atoms/component';
import { fabric } from 'fabric';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const View = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const entireComponent = useAtomValue(entireComponentAtom);
  const targetComponent = useAtomValue(targetComponentAtom);

  const [selectedImages, setSelectedImages] = useAtom(selectedImagesAtom);
  const [addSelectedImages, setAddSelectedImages] = useAtom(
    addSelectedImagesAtom
  );

  if (canvasRef.current !== null) {
    canvasRef.current.on('selection:created', () => {
      console.log('created targetComponent', targetComponent);
    });

    canvasRef.current.on('selection:cleared', () => {
      console.log('cleared targetComponent', targetComponent);
    });
  }

  /**
   * 캔버스 내 이미지 컴포넌트 추가 함수
   */
  const addImage = () => {
    selectedImages.map((imagePath: string) => {
      fabric.Image.fromURL(imagePath, function (img) {
        img.scaleToWidth(200);
        img.scaleToHeight(200);

        img.set('top', 100);
        img.set('left', 100);
        img.set('name', uuidv4());

        if (canvasRef.current !== null) {
          canvasRef.current.add(img);
          canvasRef.current.requestRenderAll();
        }
      });
    });

    setAddSelectedImages(false);
    setSelectedImages([]);
  };

  /**
   * 캔버스 내 전체 컴포넌트 추가
   */
  useEffect(() => {
    entireComponent.map(component => {
      if (canvasRef.current !== null) {
        canvasRef.current.add(component.render());
        canvasRef.current.renderAll();
      }
    });
  }, [entireComponent]);

  /**
   * 캔버스 내 이미지 컴포넌트 추가
   */
  useEffect(() => {
    if (addSelectedImages === true) {
      addImage();
    }
  }, [addImage, addSelectedImages]);

  /**
   * 캔버스 생성
   */
  useEffect(() => {
    canvasRef.current = new fabric.Canvas('view-canvas', {
      width: 1008,
      height: 970,
      backgroundColor: '#ffffff',
    });

    return () => {
      if (canvasRef.current !== null) {
        canvasRef.current.dispose();
      }
    };
  }, [canvasRef]);

  return <canvas id="view-canvas"></canvas>;
};

export default View;
