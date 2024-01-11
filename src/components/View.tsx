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

  /**
   * 캔버스 내 변경된 컴포넌트 데이터 업데이트
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

  /**
   * 캔버스 내 모든 컴포넌트 저장 함수
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

  /**
   * 선택된 컴포넌트 핸들링
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

  /**
   * 캔버스 내 텍스트 컴포넌트 추가 함수
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

    /**
     * 기존에 저장된 컴포넌트가 있는지 확인해서 화면에 출력
     */
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

  /**
   * 캔버스 내부 및 선택지 옵션 컴포넌트 삭제
   */
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
