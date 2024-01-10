import {
  TargetComponent,
  addComponentAtom,
  addGroupComponentAtom,
  addSelectedImagesAtom,
  entireComponentAtom,
  selectedImagesAtom,
  targetComponentAtom,
} from '@/atoms/component';
import {
  SelectedBorderSize,
  SelectedColor,
  selectedBorderSizeAtom,
  selectedBorderStyleAtom,
  selectedColorAtom,
  typeOfPaintAtom,
} from '@/atoms/style';
import fabric from '@/controller/fabric';
import { Ellipse, Image, Polyline, Rect, Textbox } from 'fabric/fabric-impl';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const View = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const [selectedImages, setSelectedImages] = useAtom(selectedImagesAtom);
  const [addSelectedImages, setAddSelectedImages] = useAtom(
    addSelectedImagesAtom
  );
  const [addComponent, setAddComponent] = useAtom(addComponentAtom);
  const [addGroupComponent, setAddGroupComponent] = useAtom(
    addGroupComponentAtom
  );
  const [selectedColor, setSelectedColor] = useAtom(selectedColorAtom);
  const [typeOfPaint, setTypeOfPaint] = useAtom(typeOfPaintAtom);

  const setTargetComponent = useSetAtom(targetComponentAtom);
  const setEntireComponent = useSetAtom(entireComponentAtom);

  const selectedBorderSize = useAtomValue(selectedBorderSizeAtom);
  const selectedBorderStyle = useAtomValue(selectedBorderStyleAtom);

  /**
   * 캔버스 내 변경된 컴포넌트 데이터 업데이트
   */
  const updateEntireComponent = (
    currentActiveObjects: fabric.Object[] | undefined
  ) => {
    currentActiveObjects?.forEach(object => {
      setEntireComponent(prevEntireComponent => {
        prevEntireComponent.map(component => {
          return component.name === object.name ? object : component;
        });
        return prevEntireComponent;
      });
    });
  };

  /**
   * 캔버스 내 모든 컴포넌트 저장 함수
   */
  const addEntireComponent = (currentAddedComponent: TargetComponent) => {
    setEntireComponent(prevEntireComponent => [
      ...prevEntireComponent,
      currentAddedComponent,
    ]);
  };

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

  /**
   * 캔버스 내 line 컴포넌트 추가 함수
   */
  const addLineComponent = (data?: Polyline) => {
    const newLine = new fabric.Polyline(
      data
        ? data.points!
        : [
            { x: 10, y: 10 },
            { x: 100, y: 100 },
          ],
      {
        name: data ? data.name : uuidv4(),
        width: data ? data.width : 100,
        height: data ? data.height : 100,
        stroke: data ? data.stroke : '#3c3c3c',
        top: data ? data.top : 10,
        left: data ? data.left : 10,
        type: 'line',
      }
    );

    newLine.set('data', newLine.toDataURL(newLine.data));

    newLine.on('selected', () => addTargetComponent(newLine));
    newLine.on('deselected', () => deleteTargetComponent(newLine));

    if (canvasRef.current !== null) {
      canvasRef.current.add(newLine);
      canvasRef.current.requestRenderAll();
    }

    addEntireComponent(newLine);
    setAddComponent(null);
  };

  /**
   * 캔버스 내 Circle 컴포넌트 추가 함수
   */
  const addCircleComponent = (data?: Ellipse) => {
    const newCircle = new fabric.Ellipse({
      name: data ? data.name : uuidv4(),
      width: data ? data.width : 100,
      height: data ? data.height : 100,
      fill: data ? data.fill : '#ffffff',
      stroke: data ? data.stroke : '#3c3c3c',
      top: data ? data.top : 10,
      left: data ? data.left : 10,
      rx: data ? data.rx : 50,
      ry: data ? data.ry : 50,
      type: 'circle',
    });
    newCircle.set('data', newCircle.toDataURL(newCircle.data));

    newCircle.on('selected', () => addTargetComponent(newCircle));
    newCircle.on('deselected', () => deleteTargetComponent(newCircle));

    if (canvasRef.current !== null) {
      canvasRef.current.add(newCircle);
      canvasRef.current.requestRenderAll();
    }

    addEntireComponent(newCircle);
    setAddComponent(null);
  };

  /**
   * 캔버스 내 Rect 컴포넌트 추가 함수
   */
  const addRectComponent = (data?: Rect) => {
    const newRect = new fabric.Rect({
      name: data ? data.name : uuidv4(),
      width: data ? data.width : 100,
      height: data ? data.height : 100,
      fill: data ? data.fill : '#ffffff',
      stroke: data ? data.stroke : '#3c3c3c',
      top: data ? data.top : 10,
      left: data ? data.left : 10,
      type: 'rect',
    });

    newRect.set('data', newRect.toDataURL(newRect));

    newRect.on('selected', () => addTargetComponent(newRect));
    newRect.on('deselected', () => deleteTargetComponent(newRect));

    if (canvasRef.current !== null) {
      canvasRef.current.add(newRect);
      canvasRef.current.requestRenderAll();
    }

    addEntireComponent(newRect);
    setAddComponent(null);
  };

  /**
   * 캔버스 내 텍스트 컴포넌트 추가 함수
   */
  const addTextComponent = (data?: Textbox) => {
    const newText = new fabric.Textbox('Text', {
      name: data ? data.name : uuidv4(),
      stroke: data ? data.stroke : '#3c3c3c',
      width: data ? data.width : 100,
      height: data ? data.height : 100,
      top: data ? data.top : 10,
      left: data ? data.left : 10,
      fontFamily: 'SUIT-Regular',
      type: 'text',
    });

    newText.set('data', newText.toDataURL(newText.data));

    newText.on('selected', () => addTargetComponent(newText));
    newText.on('deselected', () => deleteTargetComponent(newText));

    if (canvasRef.current !== null) {
      canvasRef.current.add(newText);
      canvasRef.current.requestRenderAll();
    }

    addEntireComponent(newText);
    setAddComponent(null);
  };

  /**
   * 캔버스 내 이미지 컴포넌트 추가 함수
   */
  const addImageComponent = (data?: Image) => {
    selectedImages.map((imagePath: string) => {
      fabric.Image.fromURL(
        imagePath,
        function (img) {
          img.scaleToWidth(200);
          img.scaleToHeight(200);

          img.set('top', data ? data.top : 100);
          img.set('left', data ? data.left : 100);
          img.set('name', data ? data.name : uuidv4());

          img.set('data', img.toDataURL(img.data));

          img.on('selected', () => addTargetComponent(img));
          img.on('deselected', () => deleteTargetComponent(img));

          addEntireComponent(img);

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

  const createGroupComponent = () => {
    if (canvasRef.current !== null) {
      // 그룹 컴포넌트 생성

      // 그룹화에 사용된 컴포넌트 제거
      canvasRef.current.getActiveObjects().map(component => {
        setEntireComponent(prevEntireComponent => {
          return prevEntireComponent.filter(
            entireComponent => entireComponent.name !== component.name
          );
        });
        return component;
      });

      const activatedObjects = canvasRef.current.getActiveObject();

      // 그룹화 생성
      if (activatedObjects instanceof fabric.ActiveSelection) {
        const createdGroup = activatedObjects.toGroup();

        createdGroup.set('name', uuidv4());
        createdGroup.set('data', createdGroup.toDataURL(createdGroup.data));

        createdGroup.on('selected', () => addTargetComponent(createdGroup));
        createdGroup.on('deselected', () =>
          deleteTargetComponent(createdGroup)
        );

        addEntireComponent(createdGroup);

        canvasRef.current.add(createdGroup);
        canvasRef.current.requestRenderAll();
      }
    }
    setTargetComponent([]);
    setAddGroupComponent(false);
  };

  /**
   * 그룹 컴포넌트 생성
   */
  useEffect(() => {
    if (addGroupComponent) {
      createGroupComponent();
    }
  }, [addGroupComponent, createGroupComponent]);

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
   * 스타일 변경
   */
  useEffect(() => {
    if (selectedColor || selectedBorderSize || selectedBorderStyle) {
      if (canvasRef.current !== null) {
        const activeObjects = canvasRef.current?.getActiveObjects();

        switch (typeOfPaint) {
          case 'fill':
            activeObjects.map(object => {
              object.set('fill', selectedColor as SelectedColor);
              object.set('data', object.toDataURL(object.data));
              return object;
            });
            break;
          case 'border':
            activeObjects.map(object => {
              object.set('stroke', selectedColor as SelectedColor);

              object.set('data', object.toDataURL(object.data));
              return object;
            });
            break;
          case 'strokeWidth':
            activeObjects.map(object => {
              object.set('strokeUniform', true);
              object.set(
                'strokeWidth',
                selectedBorderSize as SelectedBorderSize
              );
              object.set('data', object.toDataURL(object.data));
              return object;
            });
            break;
          case 'strokeStyle':
            let dashArray: number[] = [];

            switch (selectedBorderStyle) {
              case 'solid':
                dashArray = [];
                break;
              case 'dashed':
                dashArray = [5, 5];
                break;
              case 'dotted':
                dashArray = [1, 3];
                break;
            }

            activeObjects.map(object => {
              object.set('strokeDashArray', dashArray);
              object.set('data', object.toDataURL(object.data));
              return object;
            });
            break;

          default:
            break;
        }
        updateEntireComponent(activeObjects);
        canvasRef.current.renderAll();
      }
      setTypeOfPaint(null);
      setSelectedColor('');
    }
  }, [canvasRef, selectedColor, typeOfPaint, selectedBorderSize]);

  /**
   * 캔버스 생성
   */
  useEffect(() => {
    canvasRef.current = new fabric.Canvas('view-canvas', {
      width: 800,
      height: 700,
      backgroundColor: '#ffffff',
    });
    // 캔버스 내 객체 변경 시 데이터 변경
    canvasRef.current.on('object:modified', () => {
      const activeObjects = canvasRef.current?.getActiveObjects();

      activeObjects?.map(object =>
        object.set('data', object.toDataURL(object.data))
      );

      updateEntireComponent(activeObjects);
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
