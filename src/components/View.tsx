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
import { ENTIRE_COMPONENT } from '@/constants/game';
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
import { SetStateAction, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 *
 * @returns 뷰 컴포넌트
 */
const View = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const [selectedImages, setSelectedImages] = useAtom(selectedImagesAtom);
  const [addComponent, setAddComponent] = useAtom(addComponentAtom);
  const [addGroupComponent, setAddGroupComponent] = useAtom(
    addGroupComponentAtom
  );
  const [selectedColor, setSelectedColor] = useAtom(selectedColorAtom);
  const [typeOfPaint, setTypeOfPaint] = useAtom(typeOfPaintAtom);
  const [targetComponent, setTargetComponent] = useAtom(targetComponentAtom);

  const setAddSelectedImages = useSetAtom(addSelectedImagesAtom);
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
   * @param currentComponent 현재 선택된 패브릭 컴포넌트
   * @param setCurrentComponent 배열에 추가하는 함수
   * @description 선택된 패브릭 컴포넌트를 특정 배열에 추가하는 함수
   */
  const addCurrentComponent = (
    currentComponent: TargetComponent,
    setCurrentComponent: (args_0: SetStateAction<SavedComponent[]>) => void
  ) => {
    setCurrentComponent(prevTargetComponent => [
      ...prevTargetComponent,
      {
        name: currentComponent.name,
        info: currentComponent,
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
   * @param fabricComponent 현재 패브릭 컴포넌트
   * @param currentCanvasRef 패브릭 컴포넌트를 생성할 캔버스 Ref
   * @description 현재 패브릭 컴포넌트의 속성을 추가하고, 캔버스에 생성하는 함수
   */
  const addFabricComponent = (
    isExisted: boolean,
    fabricComponent: fabric.Object,
    currentCanvasRef: React.MutableRefObject<fabric.Canvas | null>,
    name?: string
  ) => {
    if (!isExisted) {
      fabricComponent.set({
        data: fabricComponent.toDataURL(fabricComponent.data),
      });

      fabricComponent.on('selected', () =>
        addCurrentComponent(fabricComponent, setTargetComponent)
      );
      fabricComponent.on('deselected', () => deleteTargetComponent);
    } else {
      fabricComponent.set('name', name);
      fabricComponent.set('selectable', true);
    }

    if (currentCanvasRef.current !== null) {
      currentCanvasRef.current.add(fabricComponent);
      currentCanvasRef.current.requestRenderAll();
    }

    addCurrentComponent(fabricComponent, setEntireComponent);
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

          addFabricComponent(false, img, canvasRef);
        },
        {
          crossOrigin: imagePath,
        }
      );
    });

    setSelectedImages([]);
    setAddSelectedImages(false);
  };

  useEffect(() => {
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

          addFabricComponent(false, createdGroup, canvasRef);
        }
      }
      setTargetComponent([]);
      setAddGroupComponent(false);
    };

    if (addGroupComponent) {
      createGroupComponent();
    }
  }, [addGroupComponent]);

  useEffect(() => {
    let currentComponent: fabric.Object | undefined;

    switch (addComponent) {
      case 'image':
        addImageComponent();
        break;

      case 'text':
        currentComponent = new fabric.Textbox('텍스트를 입력해주세요.', {
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
        break;

      case 'rect':
        currentComponent = new fabric.Rect({
          name: uuidv4(),
          width: 100,
          height: 100,
          fill: '#ffffff',
          stroke: '#3c3c3c',
          top: 10,
          left: 10,
          type: 'rect',
        });
        break;

      case 'circle':
        currentComponent = new fabric.Ellipse({
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

        break;

      case 'line':
        currentComponent = new fabric.Polyline(
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
        break;

      default:
        break;
    }
    if (currentComponent) {
      addFabricComponent(false, currentComponent, canvasRef);
    }
  }, [addComponent, addImageComponent, addFabricComponent]);

  useEffect(() => {
    if (
      canvasRef.current !== null &&
      (selectedColor || selectedBorderSize || selectedBorderStyle)
    ) {
      const activeObjects = canvasRef.current?.getActiveObjects();

      activeObjects.map(object => {
        object.set('data', object.toDataURL(object.data));

        switch (typeOfPaint) {
          case 'fill':
            object.set('fill', selectedColor as SelectedColor);
            break;

          case 'stroke':
            object.set('stroke', selectedColor as SelectedColor);
            break;

          case 'strokeWidth':
            object.set('strokeUniform', true);
            object.set('strokeWidth', selectedBorderSize as SelectedBorderSize);
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

            object.set('strokeDashArray', dashArray);
            break;

          default:
            break;
        }
      });

      updateEntireComponent(activeObjects);
      canvasRef.current.renderAll();

      setTypeOfPaint(null);
      setSelectedColor('');
    }
  }, [
    canvasRef,
    selectedColor,
    selectedBorderSize,
    typeOfPaint,
    updateEntireComponent,
    setTypeOfPaint,
    setSelectedColor,
  ]);

  useEffect(() => {
    canvasRef.current = new fabric.Canvas('view-canvas', {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    });

    const entireComponentData = window.localStorage.getItem(ENTIRE_COMPONENT);

    if (entireComponentData) {
      setEntireComponent(JSON.parse(entireComponentData));

      JSON.parse(entireComponentData).map(async (component: SavedComponent) => {
        let currentExistedComponent: fabric.Object | undefined;

        switch (component.info.type) {
          case 'group':
            currentExistedComponent = addExistedGroupComponent(
              component.info as addedGroup
            );
            break;

          case 'image':
            currentExistedComponent = (await addExistedImageComponent(
              component.info as addedImage
            )) as addedImage;
            break;

          case 'text':
            currentExistedComponent = addExistedTextComponent(
              component.info as Textbox
            );
            break;

          case 'rect':
            currentExistedComponent = addExistedRectComponent(
              component.info as Rect
            );
            break;

          case 'circle':
            currentExistedComponent = addExistedCircleComponent(
              component.info as Ellipse
            );
            break;

          case 'line':
            currentExistedComponent = addExistedLineComponent(
              component.info as Polyline
            );
            break;

          default:
            break;
        }
        if (currentExistedComponent !== undefined) {
          addFabricComponent(true, currentExistedComponent, canvasRef);

          canvasRef.current?.renderAll();
        }
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
