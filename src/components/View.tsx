import {
  TargetComponent,
  addComponentAtom,
  addSelectedImagesAtom,
  entireComponentAtom,
  selectedImagesAtom,
  targetComponentAtom,
} from '@/atoms/component';
import { fabric } from 'fabric';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const View = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const entireComponent = useAtomValue(entireComponentAtom);
  const targetComponent = useAtomValue(targetComponentAtom);

  const setTargetComponent = useSetAtom(targetComponentAtom);

  const [selectedImages, setSelectedImages] = useAtom(selectedImagesAtom);
  const [addSelectedImages, setAddSelectedImages] = useAtom(
    addSelectedImagesAtom
  );
  const [addComponent, setAddComponent] = useAtom(addComponentAtom);

  /**
   * 선택된 컴포넌트 핸들링
   */
  const addTargetComponent = (targetComponent: TargetComponent) => {
    setTargetComponent(prevTargetComponent => [
      ...prevTargetComponent,
      targetComponent,
    ]);
  };

  const deleteTargetComponent = (targetComponent: TargetComponent) => {
    setTargetComponent(prevTargetComponent => {
      return prevTargetComponent.filter(
        component => component.name !== targetComponent.name
      );
    });
  };

  if (canvasRef.current !== null) {
    canvasRef.current.on('selection:created', () => {
      console.log('created targetComponent', targetComponent);
    });

    canvasRef.current.on('selection:cleared', () => {
      console.log('cleared targetComponent', targetComponent);
    });
  }

  /**
   * 캔버스 내 line 컴포넌트 추가 함수
   */
  const addLineComponent = () => {
    const newLine = new fabric.Polyline(
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

    newLine.set('data', newLine.toDataURL(newLine.data));

    newLine.on('selected', () => addTargetComponent(newLine));
    newLine.on('selected', () => deleteTargetComponent(newLine));

    if (canvasRef.current !== null) {
      canvasRef.current.add(newLine);
      canvasRef.current.requestRenderAll();
    }
    setAddComponent(null);
  };

  /**
   * 캔버스 내 Circle 컴포넌트 추가 함수
   */
  const addCircleComponent = () => {
    const newCircle = new fabric.Ellipse({
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
    newCircle.set('data', newCircle.toDataURL(newCircle.data));

    newCircle.on('selected', () => addTargetComponent(newCircle));
    newCircle.on('selected', () => deleteTargetComponent(newCircle));

    if (canvasRef.current !== null) {
      canvasRef.current.add(newCircle);
      canvasRef.current.requestRenderAll();
    }
    setAddComponent(null);
  };

  /**
   * 캔버스 내 Rect 컴포넌트 추가 함수
   */
  const addRectComponent = () => {
    const newRect = new fabric.Rect({
      name: uuidv4(),
      width: 100,
      height: 100,
      fill: '#ffffff',
      stroke: '#3c3c3c',
      top: 10,
      left: 10,
    });

    newRect.set('data', newRect.toDataURL(newRect));

    newRect.on('selected', () => addTargetComponent(newRect));
    newRect.on('selected', () => deleteTargetComponent(newRect));

    if (canvasRef.current !== null) {
      canvasRef.current.add(newRect);
      canvasRef.current.requestRenderAll();
    }
    setAddComponent(null);
  };

  /**
   * 캔버스 내 텍스트 컴포넌트 추가 함수
   */
  const addTextComponent = () => {
    const newText = new fabric.Textbox('Text', {
      name: uuidv4(),
      stroke: '#3c3c3c',
      width: 100,
      height: 100,
      top: 10,
      left: 10,
      fontFamily: 'SUIT-Regular',
    });

    newText.set('data', newText.toDataURL(newText.data));

    newText.on('selected', () => addTargetComponent(newText));
    newText.on('selected', () => deleteTargetComponent(newText));

    if (canvasRef.current !== null) {
      canvasRef.current.add(newText);
      canvasRef.current.requestRenderAll();
    }

    setAddComponent(null);
  };

  /**
   * 캔버스 내 이미지 컴포넌트 추가 함수
   */
  const addImageComponent = () => {
    selectedImages.map((imagePath: string) => {
      fabric.Image.fromURL(
        imagePath,
        function (img) {
          img.scaleToWidth(200);
          img.scaleToHeight(200);

          img.set('top', 100);
          img.set('left', 100);
          img.set('name', uuidv4());

          img.set('data', img.toDataURL(img.data));

          img.on('selected', () => addTargetComponent(img));
          img.on('deselected', () => deleteTargetComponent(img));

          if (canvasRef.current !== null) {
            canvasRef.current.add(img);
            canvasRef.current.requestRenderAll();
          }
        },
        {
          crossOrigin: 'Anonymous',
        }
      );
    });

    setSelectedImages([]);
    setAddSelectedImages(false);
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
   * 캔버스 내 컴포넌트 추가
   */
  useEffect(() => {
    switch (addComponent) {
      case 'image':
        addImageComponent();
        break;

      case 'text':
        addTextComponent();
        break;

      case 'rect':
        addRectComponent();
        break;

      case 'circle':
        addCircleComponent();
        break;

      case 'line':
        addLineComponent();
        break;

      default:
        break;
    }
    setAddComponent(null);
  }, [addComponent, addSelectedImages]);

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
