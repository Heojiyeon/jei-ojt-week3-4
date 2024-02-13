import {
  SavedComponent,
  TargetComponent,
  addComponentAtom,
  addGroupComponentAtom,
  addSelectedImagesAtom,
  addedGroup,
  addedImage,
  choiceComponentAtom,
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
import {
  addExistedCircleComponent,
  addExistedGroupComponent,
  addExistedImageComponent,
  addExistedLineComponent,
  addExistedRectComponent,
  addExistedTextComponent,
} from '@/utils/handleComponent';
import { Ellipse, Polyline, Rect, Textbox } from 'fabric/fabric-impl';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 *
 * @returns 뷰 컴포넌트
 */
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

  const [targetComponent, setTargetComponent] = useAtom(targetComponentAtom);
  const setEntireComponent = useSetAtom(entireComponentAtom);
  const setChoiceComponent = useSetAtom(choiceComponentAtom);

  const selectedBorderSize = useAtomValue(selectedBorderSizeAtom);
  const selectedBorderStyle = useAtomValue(selectedBorderStyleAtom);

  /** @function
   * @param currentActiveObjects 현재 활성화된 패브릭 객체 배열
   * @description 캔버스 내 모든 패브릭 객체 중 활성화된 페브릭 객체 데이터 업데이트 함수
   */
  const updateEntireComponent = (
    currentActiveObjects: fabric.Object[] | undefined
  ) => {
    currentActiveObjects?.forEach(object => {
      setEntireComponent(prevEntireComponent => {
        return prevEntireComponent.map(component => {
          return component.name === object.name
            ? {
                name: object.name,
                info: object,
              }
            : component;
        }) as SavedComponent[];
      });
    });
  };

  /** @function
   * @param currentAddedComponent 현재 추가된 컴포넌트 정보
   * @description 캔버스 내 모든 컴포넌트를 저장하는 함수
   */
  const addEntireComponent = (currentAddedComponent: TargetComponent) => {
    setEntireComponent(prevEntireComponent => [
      ...prevEntireComponent,
      {
        name: currentAddedComponent.name,
        info: currentAddedComponent,
      },
    ]);
  };

  /** @function
   * @param targetComponent 현재 선택된 패브릭 컴포넌트
   * @description 선택된 패브릭 컴포넌트를 활성화 컴포넌트 배열에 추가하는 함수
   */
  const addTargetComponent = (targetComponent: TargetComponent) => {
    setTargetComponent(prevTargetComponent => [
      ...prevTargetComponent,
      {
        name: targetComponent.name,
        info: targetComponent,
      },
    ]);
  };

  /** @function
   * @param targetComponent 현재 선택된 패브릭 컴포넌트
   * @description 선택된 패브릭 컴포넌트를 활성화 컴포넌트 배열 내에서 제거하는 함수
   */
  const deleteTargetComponent = (targetComponent: TargetComponent) => {
    setTargetComponent(prevTargetComponent => {
      return prevTargetComponent.filter(
        component => component.name !== targetComponent.name
      );
    });
  };

  /** @function
   * @description 캔버스 내 라인 컴포넌트 추가 함수
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

  /** @function
   * @description 캔버스 내 원 컴포넌트 추가 함수
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

  /** @function
   * @description 캔버스 내 사각형 컴포넌트 추가 함수
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

  /** @function
   * @description 캔버스 내 텍스트 컴포넌트 추가 함수
   */
  const addTextComponent = () => {
    const newText = new fabric.Textbox('텍스트를 입력해주세요.', {
      name: uuidv4(),
      stroke: '#3c3c3c',
      width: 300,
      height: 100,
      top: 10,
      left: 10,
      fontSize: 30,
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

  /** @function
   * @description 캔버스 내 이미지 컴포넌트 추가 함수
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

          addEntireComponent(img);

          if (canvasRef.current !== null) {
            canvasRef.current.add(img);
            canvasRef.current.requestRenderAll();
          }
        },
        {
          crossOrigin: imagePath,
        }
      );
    });

    setSelectedImages([]);
    setAddSelectedImages(false);
  };

  /** @function
   * @description 캔버스 내 그룹 컴포넌트 추가 함수
   */
  const createGroupComponent = () => {
    if (canvasRef.current !== null) {
      canvasRef.current.getActiveObjects().map(component => {
        setEntireComponent(prevEntireComponent => {
          return prevEntireComponent.filter(
            entireComponent => entireComponent.name !== component.name
          );
        });
        return component;
      });

      const activatedObjects = canvasRef.current.getActiveObject();

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

  useEffect(() => {
    if (addGroupComponent) {
      createGroupComponent();
    }
  }, [addGroupComponent, createGroupComponent]);

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

  useEffect(() => {
    canvasRef.current = new fabric.Canvas('view-canvas', {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    });

    const entireComponentData = window.localStorage.getItem('entireComponent');

    if (entireComponentData) {
      setEntireComponent(JSON.parse(entireComponentData));

      JSON.parse(entireComponentData).map(async (component: SavedComponent) => {
        switch (component.info.type) {
          case 'group':
            const createdGroup = addExistedGroupComponent(
              component.info as addedGroup
            );
            createdGroup.set('name', component.name);
            createdGroup.set('selectable', true);

            canvasRef.current?.add(createdGroup as addedGroup);
            canvasRef.current?.requestRenderAll();
            break;

          case 'image':
            const createdImage = (await addExistedImageComponent(
              component.info as addedImage
            )) as addedImage;
            createdImage.set('name', component.name);
            createdImage.set('selectable', true);

            canvasRef.current?.add(createdImage as addedImage);
            canvasRef.current?.requestRenderAll();
            break;

          case 'text':
            const createdText = addExistedTextComponent(
              component.info as Textbox
            );
            createdText.set('name', component.name);
            createdText.set('selectable', true);

            canvasRef.current?.add(createdText as Textbox);
            canvasRef.current?.requestRenderAll();
            break;

          case 'rect':
            const createdRect = addExistedRectComponent(component.info as Rect);
            createdRect.set('name', component.name);
            createdRect.set('selectable', true);

            canvasRef.current?.add(createdRect as Rect);
            canvasRef.current?.requestRenderAll();
            break;

          case 'circle':
            const createdCircle = addExistedCircleComponent(
              component.info as Ellipse
            );
            createdCircle.set('name', component.name);
            createdCircle.set('selectable', true);

            canvasRef.current?.add(createdCircle as Ellipse);
            canvasRef.current?.requestRenderAll();
            break;

          case 'line':
            const createdLine = addExistedLineComponent(
              component.info as Polyline
            );
            createdLine.set('name', component.name);
            createdLine.set('selectable', true);

            canvasRef.current?.add(createdLine as Polyline);
            canvasRef.current?.requestRenderAll();
            break;

          default:
            break;
        }
        canvasRef.current?.renderAll();
      });
    }

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

  useEffect(() => {
    document.onkeydown = e => {
      if (targetComponent.length !== 0 && e.key === 'Backspace') {
        const targets = canvasRef.current?.getActiveObjects();

        targets?.map((target: TargetComponent) => {
          if (target.type === 'text' && target instanceof fabric.Textbox) {
            if (!target.isEditing) {
              canvasRef.current?.remove(target);
            }
            return;
          } else if (
            target.type === 'group' &&
            target instanceof fabric.Group
          ) {
            canvasRef.current?.remove(target);
          }

          canvasRef.current?.remove(target);
          canvasRef.current?.renderAll();

          setChoiceComponent(prevChoiceComponent => {
            return prevChoiceComponent.filter(
              choiceComponent => choiceComponent.name !== target.name
            );
          });
        });

        targetComponent.map(component => {
          setEntireComponent(prevEntireComponent => {
            return prevEntireComponent.filter(
              entireComponent => entireComponent.name !== component.name
            );
          });

          return component;
        });

        setTargetComponent([]);
      }
    };
  }, [document, targetComponent]);

  return <canvas id="view-canvas"></canvas>;
};

export default View;
