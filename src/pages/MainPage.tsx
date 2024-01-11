import {
  SavedComponent,
  addComponentAtom,
  addedGroup,
  addedImage,
  choiceComponentAtom,
  selectedImagesAtom,
} from '@/atoms/component';
import {
  isOpenModalAtom,
  isOpenPreviewModalAtom,
  modalContentAtom,
  modalTitleAtom,
} from '@/atoms/modal';
import Choice from '@/components/Choice';
import Format from '@/components/Format';
import Pagination from '@/components/Pagination';
import Toolbar from '@/components/Toolbar';
import View from '@/components/View';
import Modal from '@/components/common/Modal';
import {
  addExistedCircleComponent,
  addExistedGroupComponent,
  addExistedLineComponent,
  addExistedRectComponent,
  addExistedTextComponent,
} from '@/utils/handleComponent';
import { fabric } from 'fabric';
import { Ellipse, Polyline, Rect, Textbox } from 'fabric/fabric-impl';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';

const MainPage = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const modalTitle = useAtomValue(modalTitleAtom);
  const modalContent = useAtomValue(modalContentAtom);

  const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom);
  const isOpenPreviewModal = useAtomValue(isOpenPreviewModalAtom);

  const selectedImages = useAtomValue(selectedImagesAtom);
  const setAddComponent = useSetAtom(addComponentAtom);

  const [choiceComponent, setChoiceComponent] = useAtom(choiceComponentAtom);

  const handleAddImagesButton = () => {
    if (selectedImages.length !== null) {
      setAddComponent('image');
    }
    setIsOpenModal(prevIsOpenModal => !prevIsOpenModal);
  };

  const handlePreviewComponent = (
    currentComponentName: string,
    currentTop: number,
    currentLeft: number
  ) => {
    const correctComponentName = choiceComponent.filter(
      component => component.isCorrect === true
    )[0].name;

    if (correctComponentName && correctComponentName === currentComponentName) {
      const bubbleText = new fabric.Text('정답입니다!', {
        fontSize: 30,
        fill: '#0000FF',
        fontFamily: 'SUIT-Regular',
        top: currentTop,
        left: currentLeft,
      });
      canvasRef.current?.add(bubbleText);
      setTimeout(() => {
        canvasRef.current?.remove(bubbleText);
      }, 500);
    } else {
      const bubbleText = new fabric.Text('오답입니다!', {
        fontSize: 30,
        fill: '#E5001A',
        fontFamily: 'SUIT-Regular',
        top: currentTop,
        left: currentLeft,
      });
      canvasRef.current?.add(bubbleText);
      setTimeout(() => {
        canvasRef.current?.remove(bubbleText);
      }, 500);
    }
  };

  useEffect(() => {
    const alreadyExistedChoices = window.localStorage.getItem('choices');

    if (alreadyExistedChoices) {
      setChoiceComponent(JSON.parse(alreadyExistedChoices));
    }
  }, []);

  useEffect(() => {
    if (isOpenPreviewModal) {
      canvasRef.current = new fabric.Canvas('preview-canvas', {
        width: 800,
        height: 700,
        backgroundColor: '#ffffff',
        selection: false,
      });

      /**
       * 기존에 저장된 컴포넌트가 있는지 확인해서 화면에 출력
       */
      const entireComponentData =
        window.localStorage.getItem('entireComponent');

      if (entireComponentData) {
        JSON.parse(entireComponentData).map(
          async (component: SavedComponent) => {
            switch (component.info.type) {
              case 'group':
                const createdGroup = addExistedGroupComponent(
                  component.info as addedGroup
                );
                createdGroup.set('name', component.name);
                createdGroup.set('selectable', false);

                createdGroup.on('mousedown', () =>
                  handlePreviewComponent(
                    createdGroup.name!,
                    createdGroup.top!,
                    createdGroup.left!
                  )
                );

                canvasRef.current?.add(createdGroup as addedGroup);
                canvasRef.current?.requestRenderAll();
                break;

              case 'image':
                const {
                  src,
                  top,
                  left,
                  angle,
                  scaleX,
                  scaleY,
                  strokeWidth,
                  strokeDashArray,
                } = component.info as addedImage;
                fabric.Image.fromURL(
                  src,
                  function (img) {
                    img.set('name', component.name);
                    img.set('top', top);
                    img.set('left', left);

                    // 추가적인 속성에 따른 생성
                    if (angle) {
                      img.set('angle', angle);
                    }
                    if (scaleX) {
                      img.set('scaleX', scaleX);
                      img.set('scaleY', scaleY);
                    }
                    if (strokeWidth) {
                      img.set('strokeWidth', strokeWidth);
                    }
                    if (strokeDashArray) {
                      img.set('strokeDashArray', strokeDashArray);
                    }

                    img.set('selectable', false);
                    img.on('mousedown', () =>
                      handlePreviewComponent(img.name!, img.top!, img.left!)
                    );
                    canvasRef.current?.add(img as addedImage);
                    canvasRef.current?.requestRenderAll();
                  },
                  {
                    crossOrigin: 'Anonymous',
                  }
                );
                break;

              case 'text':
                const createdText = addExistedTextComponent(
                  component.info as Textbox
                );
                createdText.set('name', component.name);
                createdText.on('mousedown', () =>
                  handlePreviewComponent(
                    createdText.name!,
                    createdText.top!,
                    createdText.left!
                  )
                );
                canvasRef.current?.add(createdText as Textbox);
                canvasRef.current?.requestRenderAll();
                break;

              case 'rect':
                const createdRect = addExistedRectComponent(
                  component.info as Rect
                );
                createdRect.set('name', component.name);
                createdRect.set('selectable', false);

                createdRect.on('mousedown', () =>
                  handlePreviewComponent(
                    createdRect.name!,
                    createdRect.top!,
                    createdRect.left!
                  )
                );
                canvasRef.current?.add(createdRect as Rect);
                canvasRef.current?.requestRenderAll();
                break;

              case 'circle':
                const createdCircle = addExistedCircleComponent(
                  component.info as Ellipse
                );
                createdCircle.set('name', component.name);
                createdCircle.set('selectable', false);

                createdCircle.on('mousedown', () =>
                  handlePreviewComponent(
                    createdCircle.name!,
                    createdCircle.top!,
                    createdCircle.left!
                  )
                );
                canvasRef.current?.add(createdCircle as Ellipse);
                canvasRef.current?.requestRenderAll();
                break;

              case 'line':
                const createdLine = addExistedLineComponent(
                  component.info as Polyline
                );
                createdLine.set('name', component.name);
                createdLine.set('selectable', false);

                createdLine.on('mousedown', () =>
                  handlePreviewComponent(
                    createdLine.name!,
                    createdLine.top!,
                    createdLine.left!
                  )
                );
                canvasRef.current?.add(createdLine as Polyline);
                canvasRef.current?.requestRenderAll();
                break;

              default:
                break;
            }
            canvasRef.current?.renderAll();
          }
        );
      }

      return () => {
        if (canvasRef.current !== null) {
          canvasRef.current.dispose();
        }
      };
    }
  }, [canvasRef, isOpenPreviewModal]);

  return (
    <>
      {isOpenModal && (
        <Modal title={modalTitle}>
          {modalTitle === 'Image List' && (
            <div>
              <div id="modal-image-content">{modalContent}</div>
              <Pagination />
              <button onClick={handleAddImagesButton}>추가</button>
            </div>
          )}
        </Modal>
      )}
      {isOpenPreviewModal && (
        <Modal title={modalTitle}>
          {modalTitle === 'Preview' && <canvas id="preview-canvas"></canvas>}
        </Modal>
      )}
      <Toolbar />
      <Format />
      <View />
      <Choice />
    </>
  );
};

export default MainPage;
